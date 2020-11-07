/* eslint-disable @typescript-eslint/no-explicit-any */
import {prettifyFiles} from '../utils/helper'
import camelcase from 'camelcase'

const BASE_PATH = 'src/components'

interface PromptProps {
	name: string
	options: string[]
	hasStyleProps?: boolean
	pure: boolean
	addToIndex: boolean
}

export default {
	description: 'Create a reusable component',
	prompts: [
		{
			type: 'input',
			name: 'name',
			message: 'What is the name of the component?'
		},
		{
			type: 'confirm',
			name: 'hasProps',
			message: 'Would you like to add props to your component?',
			default: true
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
			message: 'Do you prefer a pure component?',
			default: false
		},
		{
			type: 'confirm',
			name: 'forwardingRefs',
			message: 'Do you prefer forwarding refs?',
			default: true
		},
		{
			type: 'confirm',
			name: 'addToIndex',
			message: 'Add an export to index.ts',
			default: true
		}
	],
	actions: ({name, options, addToIndex}: PromptProps): any[] => {
		const actions: any[] = []

		// Create component files
		actions.push('Creating the requested files...')
		actions.push({
			type: 'addMany',
			destination: `${BASE_PATH}/{{pascalCase name}}`,
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

		// Add component to index
		if (addToIndex) {
			actions.push('Adding export to index...')
			actions.push({
				type: 'append',
				path: `${BASE_PATH}/index.ts`,
				template: `export { default as {{ pascalCase name }} } from './{{ pascalCase name }}'`
			})
			actions.push('Export added to index!')
		}

		// Prettify the files who've been created
		actions.push('Prettifying files...')
		actions.push(() => prettifyFiles(BASE_PATH, camelcase(name, {pascalCase: true}), addToIndex, actions))

		return actions
	}
}
