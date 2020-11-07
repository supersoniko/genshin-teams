/* eslint-disable */

import React from 'react'
import {StylesProvider} from '@material-ui/core'
import {renderToString} from 'react-dom/server'
import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3'

import getMuiPageContext from './src/styles/mui-theme-context'

/* Setup Material UI for SSR */
export const replaceRenderer = ({bodyComponent, replaceBodyHTMLString, setHeadComponents}) => {
	// Get the context of the page to collected side effects.
	const muiPageContext = getMuiPageContext()
	const bodyHTML = renderToString(
		<StylesProvider sheetsRegistry={muiPageContext.sheetsRegistry}>{bodyComponent}</StylesProvider>
	)

	replaceBodyHTMLString(bodyHTML)
	setHeadComponents([
		<style
			type="text/css"
			id="jss-server-side"
			key="jss-server-side"
			dangerouslySetInnerHTML={{
				__html: muiPageContext.sheetsRegistry.toString()
			}}
		/>
	])
}

/* Provide app with i18n  and redux store*/
export const wrapRootElement = ({element}) => {
	return (
		<GoogleReCaptchaProvider reCaptchaKey={process.env.GATSBY_RECAPTCHA_KEY}>
			{element}
		</GoogleReCaptchaProvider>
	)
}
