import firebase from 'firebase/app'
import { v4 as uuid } from 'uuid'
import { CreateGameParams, Game, Player, PlayerRoles } from '@types'

export async function createGame(
	params: CreateGameParams,
	currentUser?: firebase.User,
): Promise<Game> {
	const game: Game = {
		...params,
		id: uuid(),
		startTime: Date.now(),
		players: [
			...(
				currentUser ? [ {
					name: currentUser.displayName,
					role: PlayerRoles.Admin,
					id: currentUser.uid,
					image: currentUser.photoURL,
				} as Player ] : []
			),
		],
		currentPlayingIndex: 0,
	}

	await firebase.database().ref(`games/${game.id}`).set(game)

	return game
}
