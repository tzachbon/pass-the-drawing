import firebase from 'firebase/app'
import type { Game } from '@types'

export async function updateGame(id: string, game: Partial<Game>) {
	return new Promise((res, rej) => {
		void firebase
			.database()
			.ref(`games/${id}`)
			.update(game)
			.then(res)
			.catch(rej)
	})
}
