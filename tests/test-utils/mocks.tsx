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
	draw,
}: Partial<Player> = {}): Player {
	return {
		id,
		name,
		role,
		image,
		draw,
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
	subject = GameSubjects.Food,
	createdTime = Date.now(),
	word = uuid(),
	started,
	startTime,
	endTime,
	winner,
}: Partial<Game> = {}): Game {
	return {
		started,
		createdTime,
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
