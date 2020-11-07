import glob from 'glob'
import prettier from 'prettier'
import fs from 'fs'
import {resolve} from 'path'

const ROOT_PATH: string = resolve(`${__dirname}/../../..`)

export const prettifyFiles = (
	basePath: string,
	target: string,
	addToIndex: boolean,
	actions: any
): string => {
	const files = findFiles(basePath, target, addToIndex)

	for (const file of files) {
		actions.push(() => format(file))
	}

	return `Found ${files.length} to format.`
}

const findFiles = (basePath: string, target: string, addedToIndex: any): string[] => {
	const files: string[] = []

	for (const file of glob.sync(`${resolve(`${ROOT_PATH}/${basePath}/${target}`)}/*`, {nodir: true})) {
		files.push(file)
	}

	if (addedToIndex) {
		files.push(`${ROOT_PATH}/${basePath}/index.ts`)
	}

	return files
}

const format = (path: string): Promise<string> =>
	prettier
		.getFileInfo(path)
		.then(({inferredParser: parser}) =>
			prettier.resolveConfig(__dirname).then(options => ({
				...options,
				parser,
				data: fs.readFileSync(path, 'utf-8')
			}))
		)
		.then(({data, ...options}: any) => fs.writeFileSync(path, prettier.format(data, options), 'utf-8'))
		.then(() => `Formatted ${path}`)

export const getDirectories = (dirname: string): any =>
	fs
		.readdirSync(dirname)
		.reduce((prev: string, current: string): string => {
			const currentStat: fs.Stats = fs.statSync(`${ROOT_PATH}/${dirname}/${current}`)
			prev = currentStat.isDirectory() ? prev.concat(`${prev === '' ? '' : ','}${current}`) : prev.concat('')
			return prev
		}, '')
		.split(',')
		.filter((item: string) => item !== '')
