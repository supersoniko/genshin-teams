import {makeStyles, Theme} from '@material-ui/core/styles'

/**
 * Component-scoped styles which should be used as a hook
 * inside CreateTeam functional component
 */

export interface StyleProps {
	isError?: boolean
	showCopiedText?: boolean
}

const useStyles = ({isError, showCopiedText}: StyleProps) =>
	makeStyles((theme: Theme) => ({
		root: {
			padding: theme.spacing(8 / 8)
		},
		copyContainer: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			flexWrap: 'wrap'
		},
		copiedText: {
			width: '100%',
			textAlign: 'center',
			visibility: showCopiedText ? 'visible' : 'hidden'
		},
		actionButtonContainer: {
			width: '100%',
			display: 'flex',
			flexWrap: 'wrap',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			marginTop: theme.spacing(18 / 8),
			marginBottom: theme.spacing(50 / 8)
		},
		button: {
			marginTop: theme.spacing(8 / 8),
			maxWidth: 200,
			width: '100%'
		},
		errorText: {
			color: theme.palette.error.main,
			visibility: isError ? 'visible' : 'hidden'
		}
	}))()

export default useStyles
