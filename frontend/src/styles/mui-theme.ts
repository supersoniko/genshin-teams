import {red} from '@material-ui/core/colors'
import {createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles'

/**
 * Theme definition to provide a global theme which overrides material-ui's default global theme
 * https://material-ui.com/customization/components/#global-theme-override
 *
 */

let theme = createMuiTheme({
	palette: {
		primary: {
			main: '#2a2a30',
			light: '#393a42',
			dark: '#1e1f22'
		},
		secondary: {
			main: '#389393'
		},
		error: {
			main: red.A400
		},
		background: {
			default: '#303138',
			paper: '#2a2a30'
		},
		text: {
			primary: '#fff'
		}
	}
})

theme = responsiveFontSizes(theme)

export default theme
