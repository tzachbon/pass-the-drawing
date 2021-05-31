/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { GameSubjects } from '../constants'

const BASE_URL = 'https://random-data-api.com/api'

/**
 *
 * Gets a subject from type GameSubjects and returns a random word
 * Api docs - https://random-data-api.com/documentation
 *
 * @param {GameSubjects} subject
 *
 * @example
 *
 * await getRandomWord({ subject: 'Food' }) // 'Banana'
 */
export async function getRandomWord(subject: GameSubjects): Promise<string> {
	const url = `${BASE_URL}/${getPathBySubject(subject)}`
	const data = await fetch(url, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
	})
		.then(res => res.json() as Promise<unknown>)

	return getWordFromSubjectSchema(subject, data)
}

function getPathBySubject(subject: GameSubjects): string {
	switch (subject) {
	case GameSubjects.Food:
		return 'food/random_food'
	case GameSubjects.Cars:
		return 'vehicle/random_vehicle'
	case GameSubjects.Dessert:
		return 'dessert/random_dessert'
	default:
		throw new Error(`Invalid subject ${String(subject)}`)
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getWordFromSubjectSchema(subject: GameSubjects, data: any): string {
	switch (subject) {
	case GameSubjects.Food:
		return data.dish as string
	case GameSubjects.Cars:
		return data.make_and_model as string
	case GameSubjects.Dessert:
		return data.variety as string
	default:
		throw new Error(`Invalid subject ${String(subject)}`)
	}
}
