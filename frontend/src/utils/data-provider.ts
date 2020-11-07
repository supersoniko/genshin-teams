import fs from 'fs'
import {GenshinData} from '@utils/types'

const FILE_ENCODING = 'utf8'
const DATA_DIR = `${__dirname}/../../data`

export const getAllCharacters = (): GenshinData => {
	return JSON.parse(fs.readFileSync(`${DATA_DIR}/characters.json`, FILE_ENCODING))
}

export const getAllWeapons = (): GenshinData => {
	return JSON.parse(fs.readFileSync(`${DATA_DIR}/weapons.json`, FILE_ENCODING))
}

export const getAllFlowers = (): GenshinData => {
	return JSON.parse(fs.readFileSync(`${DATA_DIR}/flowers.json`, FILE_ENCODING))
}

export const getAllPlumes = (): GenshinData => {
	return JSON.parse(fs.readFileSync(`${DATA_DIR}/plumes.json`, FILE_ENCODING))
}

export const getAllEons = (): GenshinData => {
	return JSON.parse(fs.readFileSync(`${DATA_DIR}/eons.json`, FILE_ENCODING))
}

export const getAllGoblets = (): GenshinData => {
	return JSON.parse(fs.readFileSync(`${DATA_DIR}/goblets.json`, FILE_ENCODING))
}

export const getAllCirclets = (): GenshinData => {
	return JSON.parse(fs.readFileSync(`${DATA_DIR}/circlets.json`, FILE_ENCODING))
}

export const getAllRoles = (): GenshinData => {
	return JSON.parse(fs.readFileSync(`${DATA_DIR}/roles.json`, FILE_ENCODING))
}
