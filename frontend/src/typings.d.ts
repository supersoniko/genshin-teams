declare module '*.scss' {
	const content: any
	export default content
}

/* eslint-disable @typescript-eslint/prefer-namespace-keyword */
declare module NodeJS {
	interface Global {
		__INIT_MATERIAL_UI__: any
	}

	interface Process {
		browser: boolean
	}
}
