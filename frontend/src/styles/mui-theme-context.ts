// See https://github.com/mui-org/material-ui/tree/master/examples/gatsby
import {GenerateId, SheetsRegistry} from 'jss'
import {createGenerateClassName} from '@material-ui/core'
import {Theme} from '@material-ui/core/styles/createMuiTheme'

import theme from './mui-theme'

interface MuiThemeContext {
	theme: Theme
	sheetsManager: Map<any, any>
	sheetsRegistry: SheetsRegistry
	generateClassName: GenerateId
}

const createMuiPageContext = (): MuiThemeContext => {
	return {
		theme,
		// This is needed in order to deduplicate the injection of CSS in the page.
		sheetsManager: new Map(),
		// This is needed in order to inject the critical CSS.
		sheetsRegistry: new SheetsRegistry(),
		// The standard class name generator.
		generateClassName: createGenerateClassName()
	}
}

const getMuiThemeContext = (): MuiThemeContext => {
	// Make sure to create a new context for every server-side request so that data
	// isn't shared between connections (which would be bad).
	if (!process.browser) {
		return createMuiPageContext()
	}

	// Reuse context on the client-side.
	if (!global.__INIT_MATERIAL_UI__) {
		global.__INIT_MATERIAL_UI__ = createMuiPageContext()
	}

	return global.__INIT_MATERIAL_UI__
}

export default getMuiThemeContext
