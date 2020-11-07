import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import {StylesProvider} from '@material-ui/core'
import {ThemeProvider} from '@material-ui/core/styles'

import theme from '../src/styles/mui-theme.ts'

const StylesDecorator = storyFn => (
	<React.Fragment>
		<StylesProvider injectFirst>
			<CssBaseline />
			<ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
		</StylesProvider>
	</React.Fragment>
)

export default StylesDecorator
