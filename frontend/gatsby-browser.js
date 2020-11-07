/* eslint-disable */
import * as React from 'react'
import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3'

/* Provide app with all providers */
export const wrapRootElement = ({element}) => {
	return (
		<GoogleReCaptchaProvider reCaptchaKey={process.env.GATSBY_RECAPTCHA_KEY}>
			{element}
		</GoogleReCaptchaProvider>
	)
}
