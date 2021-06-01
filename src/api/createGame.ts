import firebase from 'firebase/app'
import { v4 as uuid } from 'uuid'
import type { CreateGameParams, Game } from '../types'

export async function createGame(params: CreateGameParams): Promise<Game> {
	const game: Game = {
		...params,
		id: uuid(),
		startTime: Date.now(),
		players: [],
		currentPlayingIndex: 0,
	}

	await firebase.database().ref(`games/${game.id}`).set(game)

	return game
}
