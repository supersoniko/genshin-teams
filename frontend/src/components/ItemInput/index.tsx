import React, {ChangeEvent, ReactNode} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Autocomplete from '@material-ui/lab/Autocomplete'
import {TextField} from '@material-ui/core'

import {CommonProps, GenshinData, ItemType, TeamSlot} from '@utils/types'

import useStyles from './style.hook'

/**
 * ItemInputComponent
 */
interface ItemInputComponentProps extends CommonProps {
	data: GenshinData[]
	teamSlot: TeamSlot
	itemType: ItemType
	label: string
	noOptionsText: ReactNode
	updateTeamSlot: (ts: TeamSlot) => void
}

type Ref = HTMLDivElement

const ItemInputComponent = React.forwardRef<Ref, ItemInputComponentProps>(
	({id, className, data, teamSlot, itemType, label, noOptionsText, updateTeamSlot}, ref) => {
		// Get styles from component-scoped styles hook
		const classes = useStyles()

		const onItemChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
			updateTeamSlot({...teamSlot, [itemType]: {name: e.target.value}})
		}

		return (
			<Autocomplete
				id={id}
				ref={ref}
				className={classNames(classes.root, className && className)}
				options={data}
				getOptionLabel={option => option?.name || ''}
				value={{name: teamSlot?.[itemType]?.name}}
				closeIcon={false}
				freeSolo={true}
				noOptionsText={noOptionsText}
				renderInput={params => (
					<TextField
						{...params}
						InputProps={{
							...params.InputProps,
							classes: {
								notchedOutline: classes.notchedOutline
							}
						}}
						onBlur={onItemChange}
						InputLabelProps={{className: classes.inputLabel}}
						label={label}
						variant="outlined"
					/>
				)}
			/>
		)
	}
)

ItemInputComponent.propTypes = {
	data: PropTypes.array.isRequired,
	teamSlot: PropTypes.any.isRequired,
	itemType: PropTypes.any.isRequired,
	label: PropTypes.string.isRequired,
	noOptionsText: PropTypes.node.isRequired,
	updateTeamSlot: PropTypes.func.isRequired,
	id: PropTypes.string,
	className: PropTypes.string
}

export default ItemInputComponent
