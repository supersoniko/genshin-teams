import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useQuery} from 'react-query'
import {CircularProgress, Typography} from '@material-ui/core'

import {GenshinData, TeamSlot} from '@utils/types'
import {getTeam} from '@api/teams-api'

import {CreateTeam} from '@containers/index'

import useStyles from './style.hook'

/**
 * App
 */
interface AppProps {
	pageContext: {
		characters: GenshinData[]
		weapons: GenshinData[]
		flowers: GenshinData[]
		plumes: GenshinData[]
		eons: GenshinData[]
		goblets: GenshinData[]
		circlets: GenshinData[]
		roles: GenshinData[]
	}
	teamId: string
}

const App: React.FC<AppProps> = ({pageContext, teamId}) => {
	const classes = useStyles({placeholderProps: true})
	const {characters, weapons, flowers, plumes, eons, goblets, circlets, roles} = pageContext

	const {data: exisingTeam, isLoading} = useQuery(['team', teamId], getTeam)

	const [captchaToken, setCaptchaToken] = useState<string>()
	const [team, setTeam] = useState<TeamSlot[]>(new Array(4).fill(undefined))

	return (
		<div id="app-container" className={classes.root}>
			<main className={classes.content}>
				<Typography align={'center'} variant={'h4'}>
					Create & share Genshin Impact teams!
				</Typography>
				{isLoading ? (
					<CircularProgress color={'secondary'} className={classes.loadingIcon} />
				) : (
					<CreateTeam
						allCharacters={characters}
						allWeapons={weapons}
						allFlowers={flowers}
						allPlumes={plumes}
						allEons={eons}
						allGoblets={goblets}
						allCirclets={circlets}
						allRoles={roles}
						existingTeam={exisingTeam}
						teamId={teamId}
						team={team}
						captchaToken={captchaToken}
						setCaptchaToken={setCaptchaToken}
						setTeam={setTeam}
					/>
				)}
			</main>
		</div>
	)
}

App.propTypes = {
	teamId: PropTypes.string,
	pageContext: PropTypes.any
}

export default App
