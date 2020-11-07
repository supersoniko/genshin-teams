import * as React from 'react'
import * as PropTypes from 'prop-types'

import MuiThemeWrapper from '@styles/mui-theme-wrapper'

/**
 * TopLayout
 */
interface TopLayoutProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	children: any
}

export const TopLayout: React.FC<TopLayoutProps> = ({children}) => (
	<React.Fragment>
		<MuiThemeWrapper>{children}</MuiThemeWrapper>
	</React.Fragment>
)

TopLayout.propTypes = {
	children: PropTypes.node
}

export default TopLayout
