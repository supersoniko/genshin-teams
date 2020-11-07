import React, {useCallback, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import copy from 'copy-to-clipboard'
import {Button, Typography} from '@material-ui/core'
import {navigate} from 'gatsby-link'
import {useMutation} from 'react-query'
import {GoogleReCaptcha, useGoogleReCaptcha} from 'react-google-recaptcha-v3'

import {GenshinData, CommonProps, TeamSlot} from '@utils/types'
import {createTeam} from '@api/teams-api'

import {CharacterBox} from '@components/index'

import useStyles from './style.hook'

interface CreateTeamComponentProps extends CommonProps {
	allCharacters: GenshinData[]
	allWeapons: GenshinData[]
	allFlowers: GenshinData[]
	allPlumes: GenshinData[]
	allEons: GenshinData[]
	allGoblets: GenshinData[]
	allCirclets: GenshinData[]
	allRoles: GenshinData[]
	existingTeam: TeamSlot[]
	teamId: string
	team: TeamSlot[]
	captchaToken: string
	setTeam: (team: TeamSlot[]) => void
	setCaptchaToken: (captchaToken: string) => void
}

/**
 * CreateTeamComponent
 */
const CreateTeamComponent: React.FC<CreateTeamComponentProps> = ({
	id,
	className,
	allCharacters,
	allWeapons,
	allFlowers,
	allPlumes,
	allEons,
	allGoblets,
	allCirclets,
	allRoles,
	existingTeam,
	teamId,
	captchaToken,
	team,
	setTeam,
	setCaptchaToken
}) => {
	// Get styles from component-scoped styles hook
	const [mutate, {data: newTeamId, isLoading, isError}] = useMutation(createTeam)
	const captchaAction = 'createTeam'
	const {executeRecaptcha} = useGoogleReCaptcha()

	const [availableCharacters, setAvailableCharacters] = useState<GenshinData[]>(allCharacters)
	const [showCopiedText, setShowCopiedText] = useState<boolean>(false)

	const classes = useStyles({isError, showCopiedText})

	const updateTeamSlot = (teamIndex: number): ((ts: TeamSlot) => void) => (teamSlot: TeamSlot): void => {
		const updatedTeam = [...team]
		updatedTeam[teamIndex] = teamSlot
		setTeam(updatedTeam)
	}

	const onCreateTeam = async (): Promise<void> => {
		await mutate({team, token: captchaToken})
		setCaptchaToken(undefined)
	}

	const handleReCaptchaVerify = useCallback(token => {
		setCaptchaToken(token)
	}, [])

	const copyUrl = (): void => {
		copy(`${process.env.GATSBY_FRONTEND_URL}/team/${teamId}`)
		setShowCopiedText(true)
		setTimeout(() => setShowCopiedText(false), 3000)
	}

	/**
	 * Set team to existing team if its given
	 */
	useEffect(() => {
		if (existingTeam && existingTeam.length) {
			setTeam(existingTeam)
		}
	}, [existingTeam])

	/**
	 * Filter already selected characters from available characters
	 */
	useEffect(() => {
		setAvailableCharacters(
			allCharacters.filter(c => !team.some(teamSlot => teamSlot?.character?.name === c.name))
		)
	}, [team])

	/**
	 * Got to created team after submit
	 */
	useEffect(() => {
		if (newTeamId) {
			navigate(`/team/${newTeamId}`)
		}
	}, [newTeamId])

	/**
	 * Reset recapcha token on error
	 */
	useEffect(() => {
		if (isError) {
			setCaptchaToken(undefined)
			executeRecaptcha(captchaAction).then(result => setCaptchaToken(result))
		}
	}, [isError])

	return (
		<div id={id} className={classNames(classes.root, className && className)}>
			{team.map((ts, i) => (
				<CharacterBox
					key={i}
					teamSlot={ts}
					allCharacters={availableCharacters}
					allWeapons={allWeapons}
					allFlowers={allFlowers}
					allPlumes={allPlumes}
					allEons={allEons}
					allGoblets={allGoblets}
					allCirclets={allCirclets}
					allRoles={allRoles}
					updateTeamSlot={updateTeamSlot(i)}
				/>
			))}
			{(teamId || newTeamId) && team === existingTeam ? (
				<div className={classes.actionButtonContainer}>
					<Typography className={classes.copiedText}>Copied!</Typography>
					<Button
						className={classes.button}
						variant={'contained'}
						color={'secondary'}
						size={'large'}
						onClick={copyUrl}
					>
						Copy URL
					</Button>
				</div>
			) : (
				<div className={classes.actionButtonContainer}>
					<Typography className={classes.errorText}>Error, try again!</Typography>
					<Button
						className={classes.button}
						variant={'contained'}
						color={'secondary'}
						size={'large'}
						disabled={isLoading || !captchaToken}
						onClick={onCreateTeam}
					>
						Create Team
					</Button>
					<GoogleReCaptcha action={captchaAction} onVerify={handleReCaptchaVerify} />
				</div>
			)}
		</div>
	)
}

CreateTeamComponent.propTypes = {
	allCharacters: PropTypes.array.isRequired,
	allWeapons: PropTypes.array.isRequired,
	allFlowers: PropTypes.array.isRequired,
	allPlumes: PropTypes.array.isRequired,
	allEons: PropTypes.array.isRequired,
	allGoblets: PropTypes.array.isRequired,
	allCirclets: PropTypes.array.isRequired,
	allRoles: PropTypes.array.isRequired,
	team: PropTypes.array.isRequired,
	setTeam: PropTypes.func.isRequired,
	setCaptchaToken: PropTypes.func.isRequired,
	teamId: PropTypes.string,
	existingTeam: PropTypes.array,
	captchaToken: PropTypes.string,
	id: PropTypes.string,
	className: PropTypes.string
}

export default CreateTeamComponent
