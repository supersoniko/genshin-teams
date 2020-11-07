import {makeStyles} from '@material-ui/core/styles'

/**
 * Component-scoped styles which should be used as a hook
 * inside Sidebar functional component
 */

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex'
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	loadingIcon: {
		position: 'absolute',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)'
	}
}))

export default useStyles
