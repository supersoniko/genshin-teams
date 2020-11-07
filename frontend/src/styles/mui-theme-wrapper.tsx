import * as React from 'react'
import {useEffect} from 'react'
import * as PropTypes from 'prop-types'
import {StylesProvider, ThemeProvider} from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import Hidden from '@material-ui/core/Hidden'

import getMuiThemeContext from '@styles/mui-theme-context'

/**
 * MuiThemeWrapper
 */
interface MuiThemeWrapperProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	children: any
}

export const MuiThemeWrapper: React.FC<MuiThemeWrapperProps> = ({children}) => {
	const muiPageContext = getMuiThemeContext()

	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side')
		if (jssStyles && jssStyles.parentNode) {
			jssStyles.parentNode.removeChild(jssStyles)
		}
	}, [])

	return (
		<StylesProvider
			generateClassName={muiPageContext.generateClassName}
			sheetsManager={muiPageContext.sheetsManager}
		>
			{/* ThemeProvider makes the theme available down the React
          tree thanks to React context. */}
			<ThemeProvider theme={muiPageContext.theme}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<Hidden implementation="css">{children}</Hidden>
			</ThemeProvider>
		</StylesProvider>
	)
}

MuiThemeWrapper.propTypes = {
	children: PropTypes.node
}

export default MuiThemeWrapper
