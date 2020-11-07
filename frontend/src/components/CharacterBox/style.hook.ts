import {makeStyles, Theme} from '@material-ui/core/styles'

/**
 * Component-scoped styles which should be used as a hook
 * inside CharacterBox functional component
 */

const useStyles = () =>
	makeStyles((theme: Theme) => ({
		root: {
			padding: theme.spacing(16 / 8),
			margin: theme.spacing(12 / 8),
			backgroundColor: theme.palette.primary.light,
			[theme.breakpoints.up('md')]: {
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'space-between'
			}
		},
		autocomplete: {
			margin: theme.spacing(12 / 8, 0),
			width: '100%',
			maxWidth: 400,
			'& .Mui-focused': {
				color: '#fff'
			}
		},
		inputLabel: {
			color: '#fff'
		},
		notchedOutline: {
			'&&&': {
				borderColor: theme.palette.primary.dark
			}
		},
		characterContainer: {
			[theme.breakpoints.up('md')]: {
				paddingRight: theme.spacing(32 / 8),
				width: '30%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between'
			}
		},
		itemsContainer: {
			[theme.breakpoints.up('md')]: {
				width: '70%',
				display: 'flex',
				flexWrap: 'wrap'
			}
		},
		levelInput: {
			width: '100%',
			marginTop: theme.spacing(24 / 8),
			maxWidth: 400,
			'& .Mui-focused': {
				color: '#fff'
			},
			[theme.breakpoints.up('md')]: {
				marginTop: theme.spacing(16 / 8)
			}
		},
		avatarContainer: {
			minHeight: 120
		}
	}))()

export default useStyles
