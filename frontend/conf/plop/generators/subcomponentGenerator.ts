/* eslint-disable @typescript-eslint/no-explicit-any */
import camelcase from 'camelcase'
import {ActionType} from 'plop'
import {prettifyFiles, getDirectories} from '../utils/helper'

const BASE_PATH = 'src/containers'

const folders = getDirectories(`src/containers`)

const cancelPrompt = (): boolean => folders.length !== 0

interface PromptProps {
	name: string
	folder: string
	options: string[]
	hasStyleProps?: boolean
	pure: boolean
	addImport: boolean
}

export default {
	description: 'Create a subcomponent for a container',
	prompts: [
		{
			type: 'input',
			name: 'name',
			message: 'What is the name of the subcomponent?',
			when: cancelPrompt
		},
		{
			type: 'confirm',
			name: 'hasProps',
			message: 'Would you like to add props to your subcomponent?',
			default: true
		},
		{
			type: 'list',
			name: 'folder',
			message: 'Which container requires a new subcomponent?',
			choices: folders,
			when: cancelPrompt
		},
		{
			type: 'checkbox',
			name: 'options',
			message: 'Which items would you like to include?',
			default: ['style'],
			choices: [
				{
					name: 'A style module/hook',
					value: 'style'
				},
				{
					name: 'A jest test stub',
					value: 'test'
				},
				{
					name: 'A Storybook story',
					value: 'story'
				},
				{
					name: 'i18n',
					value: 'i18n'
				}
			]
		},
		{
			type: 'confirm',
			name: 'hasStyleProps',
			message: 'Would you like to add props to your style hook?',
			when: ({options}: PromptProps): boolean => options.includes('style'),
			default: true
		},
		{
			type: 'confirm',
			name: 'pure',
			message: 'Do you prefer a pure subcomponent?',
			default: false
		},
		{
			type: 'confirm',
			name: 'addImport',
			message: 'Do you like to import the subcomponent in the selected container?',
			default: true
		}
	],
	actions: ({name, folder, options, addImport}: PromptProps): any[] => {
		const actions: any[] = []

		// Create subcomponent files
		actions.push('Creating the requested files...')
		actions.push({
			type: 'addMany',
			destination: `${BASE_PATH}/${folder}/{{pascalCase name}}`,
			base: 'conf/plop/templates/component',
			templateFiles: [
				'conf/plop/templates/component/index.tsx.hbs',
				options.includes('style') && 'conf/plop/templates/component/style.hook.ts.hbs',
				options.includes('test') && 'conf/plop/templates/component/test.tsx.hbs',
				options.includes('story') && 'conf/plop/templates/component/index.stories.tsx.hbs'
			].filter(Boolean),
			data: {
				style: options.includes('style'),
				i18n: options.includes('i18n')
			}
		})
		actions.push('Created the requested files!')

		// Add import to project
		if (addImport) {
			actions.push({
				type: 'modify',
				path: `${BASE_PATH}/${folder}/index.tsx`,
				transform: (data: string): string => {
					const manipulatedData: string[] = []

					/* Split lines file */
					const lines = data.split(`\n`)

					let lastImportLineNumber = 0
					// eslint-disable-next-line array-callback-return
					lines.map((line: string, index: number): void => {
						if (line.includes('import')) {
							lastImportLineNumber = index + 1
						}
					})
					manipulatedData.push(
						...lines.slice(0, lastImportLineNumber),
						...[
							'',
							`import ${camelcase(name, {
								pascalCase: true
							})} from '@containers/${folder}/${camelcase(name, {
								pascalCase: true
							})}'`
						],
						...lines.slice(lastImportLineNumber)
					)

					return manipulatedData.join(`\n`)
				}
			} as ActionType)
		}

		// Prettify the files who've been created
		actions.push('Prettifying files...')
		actions.push(() =>
			prettifyFiles(`${BASE_PATH}/${folder}`, camelcase(name, {pascalCase: true}), false, actions)
		)

		return actions
	}
}
