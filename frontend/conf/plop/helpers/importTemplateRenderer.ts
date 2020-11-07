const importTemplateRenderer = (i18n = true, pure = false): string => {
	const hooks = []

	if (i18n) {
		hooks.push(...['useContext', 'useEffect'])
	}

	if (pure) {
		hooks.push(...['useMemo'])
	}

	return `import React${
		hooks.length === 0 ? '' : `, {${hooks.join(', ')}}`
	} from 'react'`
}

export default importTemplateRenderer
