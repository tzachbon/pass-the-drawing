import type firebase from 'firebase/app'
import { uuid } from '@test-utils'
import { Game, Player, PlayerRoles } from '@types'
import { aUserToPlayer } from '@api'
import { GameSubjects } from '@constants'

export type FirebaseUser = Pick<firebase.User, | 'displayName' | 'uid' | 'photoURL'>

export function aPlayer({
	id = uuid(),
	image = uuid(),
	name = uuid(),
	role = PlayerRoles.Admin,
}: Partial<Player> = {}): Player {
	return {
		id,
		name,
		role,
		image,
	}
}

export function anUser({
	displayName = uuid(),
	photoURL = uuid(),
	uid = uuid(),
}: Partial<FirebaseUser> = {}): FirebaseUser {
	return {
		displayName,
		photoURL,
		uid,
	}
}

export function aGame({
	currentPlayingIndex = 0,
	id = uuid(),
	players = [ aPlayer() ],
	startTime = Date.now(),
	subject = GameSubjects.Food,
	word = uuid(),
	endTime,
	winner,
}: Partial<Game> = {}): Game {
	return {
		id,
		players,
		startTime,
		subject,
		word,
		currentPlayingIndex,
		endTime,
		winner,
	}
}


export { aUserToPlayer }