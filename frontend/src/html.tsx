import React from 'react'
import PropTypes from 'prop-types'

/**
 * HTML
 */
interface Props {
	htmlAttributes: Record<string, any>
	headComponents: React.ReactNode
	bodyAttributes: Record<string, any>
	preBodyComponents: React.ReactNode
	body: string
	postBodyComponents: React.ReactNode
}

const HTML: React.FC<Props> = ({
	htmlAttributes,
	headComponents,
	bodyAttributes,
	preBodyComponents,
	body,
	postBodyComponents
}) => {
	return (
		<html lang="en" {...htmlAttributes}>
			<head>
				<title>Genshin Teams</title>
				<meta name="description" content="Create and share Genshin Impact teams!" />
				<meta charSet="utf-8" />
				<meta httpEquiv="x-ua-compatible" content="ie=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
				{headComponents}
			</head>
			<body {...bodyAttributes}>
				{preBodyComponents}
				<div key={'body'} id="___gatsby" dangerouslySetInnerHTML={{__html: body}} />
				{postBodyComponents}
			</body>
		</html>
	)
}

HTML.propTypes = {
	htmlAttributes: PropTypes.any,
	headComponents: PropTypes.any,
	bodyAttributes: PropTypes.any,
	preBodyComponents: PropTypes.any,
	body: PropTypes.string,
	postBodyComponents: PropTypes.any
}

export default HTML
