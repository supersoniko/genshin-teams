declare namespace Styling {
	type US<T = Record<string, unknown>> = UseStyles<T>

	interface UseStyles<T = Record<string, unknown>> {
		(props?: PropsWithChildren<T>): any | null
	}

	type PropsWithChildren<T> = T
}

export = Styling
export as namespace Styling
