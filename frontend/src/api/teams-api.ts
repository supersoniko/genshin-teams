import {TeamSlot} from '@utils/types'
import {consumeJson} from '@api/api-client'

const TEAMS_ENDPOINT = 'team'

export const createTeam = async ({team, token}: {team: TeamSlot[]; token: string}): Promise<string> => {
	const response = await consumeJson(`${process.env.GATSBY_API_URL}/${TEAMS_ENDPOINT}`, {
		method: 'POST',
		body: JSON.stringify({token, team})
	})

	return response.id
}

export const getTeam = async (_: string, teamId: string): Promise<TeamSlot[]> => {
	if (!teamId) {
		return undefined
	}

	return consumeJson(`${process.env.GATSBY_API_URL}/${TEAMS_ENDPOINT}/${teamId}`, {method: 'GET'})
}
