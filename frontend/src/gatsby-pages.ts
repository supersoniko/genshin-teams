import path from 'path'

import * as dataProvider from '@utils/data-provider'

const AppPage = path.resolve('./src/templates/App/index.tsx')

const characters = dataProvider.getAllCharacters()
const weapons = dataProvider.getAllWeapons()
const flowers = dataProvider.getAllFlowers()
const plumes = dataProvider.getAllPlumes()
const eons = dataProvider.getAllEons()
const goblets = dataProvider.getAllGoblets()
const circlets = dataProvider.getAllCirclets()
const roles = dataProvider.getAllRoles()

/**
 * Create pages
 */
export const createPages = async ({actions}: any): Promise<void> => {
	const {createPage} = actions

	createPage({
		path: `/`,
		context: {
			characters,
			weapons,
			flowers,
			plumes,
			eons,
			goblets,
			circlets,
			roles
		},
		component: AppPage
	})

	createPage({
		path: `/team/:teamId`,
		matchPath: `/team/:teamId`,
		context: {
			characters,
			weapons,
			flowers,
			plumes,
			eons,
			goblets,
			circlets,
			roles
		},
		component: AppPage
	})
}
