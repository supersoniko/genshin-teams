/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

export const WrapperDecorator: React.FC = (content: any) => {
	return <div style={{margin: '1rem'}}>{content()}</div>
}
