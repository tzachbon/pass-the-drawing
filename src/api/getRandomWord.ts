import firebase from 'firebase/app'
import type { GameSubjects } from '@constants'
import type { RandomWord, RandomWordCategory } from '@types'

export async function getRandomWord(subject: GameSubjects): Promise<RandomWord> {

	const category = await firebase
		.database()
		.ref(`words/categories/${subject}`)
		.get()
		.then(_ => _.val() as RandomWordCategory)

	const minimum = 0
	const maximum = category.entities.length - 1
	const randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum

	return category.entities[ randomNumber ]!
}