import {Location} from 'history'

/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface CommonProps {
	id?: string
	className?: string
	children?: any
	location?: Location
}
