import crypto from 'crypto'
import Recaptcha from 'recaptcha-promise'

import {documentClient} from './dynamodb'

const recaptcha = Recaptcha.create({secret: process.env.RECAPTCHA_SECRET})

const DYNAMO_TABLE = process.env.TEAMS_TABLE
const INTERNAL_ERROR_RESPONSE = JSON.stringify({message: 'Internal server error'})
const BAD_REQUEST_RESPONSE = JSON.stringify({message: 'Validation failed'})
const UNAUTHORIZED_RESPONSE = JSON.stringify({message: 'Unauthorized'})
const RESPONSE_HEADERS = {
	'Access-Control-Allow-Origin': process.env.CORS_ORIGIN,
	'Access-Control-Allow-Credentials': true
}
const MAX_CREATE_OBJECT_SIZE = 5000
const ID_SIZE = 18

enum HTTP_CODE {
	SUCCESS = 200,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	NOT_FOUND = 404,
	INTERNAL_SERVER_ERROR = 500
}

module.exports.get = async event => {
	const getParams = {
		TableName: DYNAMO_TABLE,
		Key: {
			id: event.pathParameters.id
		}
	}

	try {
		const team = (await documentClient.get(getParams).promise())?.Item?.team
		const teamExists = team && Object.keys(team).length > 0

		return {
			statusCode: teamExists ? HTTP_CODE.SUCCESS : HTTP_CODE.NOT_FOUND,
			headers: RESPONSE_HEADERS,
			body: teamExists ? JSON.stringify(team) : undefined
		}
	} catch (error) {
		console.error('ERROR GETTING TEAM', error)

		return {
			statusCode: HTTP_CODE.INTERNAL_SERVER_ERROR,
			headers: RESPONSE_HEADERS,
			body: INTERNAL_ERROR_RESPONSE
		}
	}
}

module.exports.create = async event => {
	const parsedBody = JSON.parse(event.body)
	const {team, token} = parsedBody

	const validCaptcha = await recaptcha.verify(token)

	if (!validCaptcha) {
		return {
			statusCode: HTTP_CODE.UNAUTHORIZED,
			headers: RESPONSE_HEADERS,
			body: UNAUTHORIZED_RESPONSE
		}
	}

	const id = crypto.randomBytes(ID_SIZE).toString('hex')
	const teamLength = JSON.stringify(team).length

	// Prevent abuse of DynamoDB Storage
	if (teamLength > MAX_CREATE_OBJECT_SIZE) {
		return {
			statusCode: HTTP_CODE.BAD_REQUEST,
			headers: RESPONSE_HEADERS,
			body: BAD_REQUEST_RESPONSE
		}
	}

	const createParams = {
		TableName: DYNAMO_TABLE,
		Item: {
			id,
			team
		},
		// Dont overwrite existing teams
		ConditionExpression: 'id <> :id',
		ExpressionAttributeValues: {
			':id': id
		}
	}

	try {
		await documentClient.put(createParams).promise()

		return {
			statusCode: HTTP_CODE.SUCCESS,
			headers: RESPONSE_HEADERS,
			body: JSON.stringify({id})
		}
	} catch (error) {
		console.error('ERROR CREATING TEAM', error)
		const failedCondition = error.message.includes('conditional')

		return {
			statusCode: failedCondition ? HTTP_CODE.BAD_REQUEST : HTTP_CODE.INTERNAL_SERVER_ERROR,
			headers: RESPONSE_HEADERS,
			body: failedCondition ? BAD_REQUEST_RESPONSE : INTERNAL_ERROR_RESPONSE
		}
	}
}
