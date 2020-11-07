import React, {ChangeEvent} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Autocomplete from '@material-ui/lab/Autocomplete'
import {Paper, TextField, Typography} from '@material-ui/core'

import {CommonProps, GenshinData, ItemType, TeamSlot} from '@utils/types'
import {toId} from '@utils/string-utils'

import {ItemInput} from '@components/index'

import useStyles from './style.hook'
/**
 * CharacterBoxComponent
 */
interface CharacterBoxComponentProps extends CommonProps {
	teamSlot?: TeamSlot
	allCharacters: GenshinData[]
	allWeapons: GenshinData[]
	allFlowers: GenshinData[]
	allPlumes: GenshinData[]
	allEons: GenshinData[]
	allGoblets: GenshinData[]
	allCirclets: GenshinData[]
	allRoles: GenshinData[]
	updateTeamSlot: (ts: TeamSlot) => void
}

type Ref = HTMLDivElement

const CharacterBoxComponent = React.forwardRef<Ref, CharacterBoxComponentProps>(
	(
		{
			id,
			className,
			teamSlot,
			allCharacters,
			allWeapons,
			allFlowers,
			allPlumes,
			allEons,
			allGoblets,
			allCirclets,
			allRoles,
			updateTeamSlot
		},
		ref
	) => {
		// Get styles from component-scoped styles hook
		const classes = useStyles()

		const onCharacterAutocompleteChange = (e: ChangeEvent<unknown>, newValue: GenshinData) => {
			updateTeamSlot({...teamSlot, character: newValue})
		}

		const onRoleAutocompleteChange = (e: ChangeEvent<unknown>, newValue: GenshinData) => {
			updateTeamSlot({...teamSlot, role: newValue})
		}

		const onLevelChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
			updateTeamSlot({...teamSlot, level: e.target.value})
		}

		const items = [
			{
				type: ItemType.WEAPON,
				label: 'Weapon',
				data: allWeapons,
				noOptionsText: <Typography className={classes.inputLabel}>Weapon not found</Typography>
			},
			{
				type: ItemType.FLOWER,
				label: 'Flower',
				data: allFlowers,
				noOptionsText: <Typography className={classes.inputLabel}>Flower not found</Typography>
			},
			{
				type: ItemType.PLUME,
				label: 'Plume',
				data: allPlumes,
				noOptionsText: <Typography className={classes.inputLabel}>Plume not found</Typography>
			},
			{
				type: ItemType.EON,
				label: 'Eon',
				data: allEons,
				noOptionsText: <Typography className={classes.inputLabel}>Eon not found</Typography>
			},
			{
				type: ItemType.GOBLET,
				label: 'Goblet',
				data: allGoblets,
				noOptionsText: <Typography className={classes.inputLabel}>Goblet not found</Typography>
			},
			{
				type: ItemType.CIRCLET,
				label: 'Circlet',
				data: allCirclets,
				noOptionsText: <Typography className={classes.inputLabel}>Circlet not found</Typography>
			}
		]

		return (
			<Paper id={id} ref={ref} className={classNames(classes.root, className && className)}>
				<div className={classes.characterContainer}>
					<div>
						<Autocomplete
							options={allCharacters}
							getOptionLabel={option => option?.name || ''}
							className={classes.autocomplete}
							value={{name: teamSlot?.character?.name}}
							onChange={onCharacterAutocompleteChange}
							closeIcon={false}
							forcePopupIcon={false}
							noOptionsText={<Typography className={classes.inputLabel}>Character not found</Typography>}
							renderInput={params => (
								<TextField
									{...params}
									InputProps={{
										...params.InputProps,
										classes: {
											notchedOutline: classes.notchedOutline
										}
									}}
									InputLabelProps={{className: classes.inputLabel}}
									label="Character"
									variant="outlined"
								/>
							)}
						/>
						<div className={classes.avatarContainer}>
							{teamSlot && teamSlot.character && (
								<img
									src={`/images/characters/${toId(teamSlot.character.name)}.png`}
									alt={teamSlot.character.name}
								/>
							)}
						</div>
					</div>
					<TextField
						label="Level"
						variant="outlined"
						className={classes.levelInput}
						value={teamSlot?.level}
						onChange={onLevelChange}
						InputProps={{
							classes: {
								notchedOutline: classes.notchedOutline
							}
						}}
						InputLabelProps={{className: classes.inputLabel, shrink: true}}
					/>
					<Autocomplete
						options={allRoles}
						getOptionLabel={option => option?.name || ''}
						className={classes.autocomplete}
						value={{name: teamSlot?.role?.name}}
						onChange={onRoleAutocompleteChange}
						closeIcon={false}
						forcePopupIcon={false}
						noOptionsText={<Typography className={classes.inputLabel}>Role not found</Typography>}
						renderInput={params => (
							<TextField
								{...params}
								InputProps={{
									...params.InputProps,
									classes: {
										notchedOutline: classes.notchedOutline
									}
								}}
								InputLabelProps={{className: classes.inputLabel}}
								label="Role"
								variant="outlined"
							/>
						)}
					/>
				</div>
				<div className={classes.itemsContainer}>
					{items.map((item, index) => (
						<ItemInput
							key={index}
							itemType={item.type}
							label={item.label}
							data={item.data}
							noOptionsText={item.noOptionsText}
							teamSlot={teamSlot}
							updateTeamSlot={updateTeamSlot}
						/>
					))}
				</div>
			</Paper>
		)
	}
)

CharacterBoxComponent.propTypes = {
	teamSlot: PropTypes.any,
	allCharacters: PropTypes.array.isRequired,
	allWeapons: PropTypes.array.isRequired,
	allFlowers: PropTypes.array.isRequired,
	allPlumes: PropTypes.array.isRequired,
	allEons: PropTypes.array.isRequired,
	allGoblets: PropTypes.array.isRequired,
	allCirclets: PropTypes.array.isRequired,
	allRoles: PropTypes.array.isRequired,
	updateTeamSlot: PropTypes.func.isRequired,
	id: PropTypes.string,
	className: PropTypes.string
}

export default CharacterBoxComponent
