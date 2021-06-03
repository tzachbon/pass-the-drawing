import { anUserToPlayer } from '@api'
import { GameSubjects } from '@constants'
import { uuid } from '@test-utils'
import { Game, Player, PlayerRoles, User } from '@types'

export type FirebaseUser = Pick<User, | 'displayName' | 'uid' | 'photoURL'>

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


export { anUserToPlayer }
