import {makeStyles, Theme} from '@material-ui/core/styles'

/**
 * Component-scoped styles which should be used as a hook
 * inside ItemInput functional component
 */

const useStyles = () =>
	makeStyles((theme: Theme) => ({
		root: {
			margin: theme.spacing(12 / 8, 0),
			width: '100%',
			maxWidth: 400,
			'& .Mui-focused': {
				color: '#fff'
			},
			[theme.breakpoints.up('md')]: {
				marginRight: theme.spacing(16 / 8)
			}
		},
		inputLabel: {
			color: '#fff'
		},
		notchedOutline: {
			'&&&': {
				borderColor: theme.palette.primary.dark
			}
		}
	}))()

export default useStyles
