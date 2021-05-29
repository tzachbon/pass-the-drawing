import firebase from 'firebase'
import type { Game } from '../types'

type TGame = Game | undefined | null

export function fetchGame(id: string, callback: (game: TGame) => void) {
	const status = { shouldCall: true }

	firebase
		.database()
		.ref(`games/${id}`)
		.on('value', (spanshot: firebase.database.DataSnapshot) => {
			if (status.shouldCall) {
				callback(spanshot.val() as TGame)
			}
		})

	return {
		remove: () => {
			status.shouldCall = false
		},
	}
}
