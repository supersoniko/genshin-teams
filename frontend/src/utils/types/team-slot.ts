import {GenshinData} from '@utils/types/index'

export default interface TeamSlotType {
	character: GenshinData
	weapon: GenshinData
	flower: GenshinData
	plume: GenshinData
	eon: GenshinData
	goblet: GenshinData
	circlet: GenshinData
	role: GenshinData
	level: number | string
}
