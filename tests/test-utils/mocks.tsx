import { anUserToPlayer } from '@api'
import { GameSubjects } from '@constants'
import { uuid } from '@test-utils'
import { Game, Player, PlayerRoles, User } from '@types'

export type FirebaseUser = Pick<User, | 'displayName' | 'uid' | 'photoURL' | 'email'>

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
	email = uuid(),
}: Partial<FirebaseUser> = {}): FirebaseUser {
	return {
		displayName,
		photoURL,
		uid,
		email,
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
	finished,
	isWon,
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
		finished,
		isWon,
	}
}

export const FAKE_DRAWING_DATA = JSON.stringify({
	lines: [
		{
			points:
				[
					{
						x: 0.7999999999999545,
						y: 0.6000000000000227,
					},
					{
						x: 0.7999999999999545,
						y: 0.6000000000000227,
					},
					{
						x: 4.309524253317494,
						y: 4.276644455856433,
					},
					{
						x: 4.309524253317494,
						y: 4.276644455856433,
					},
				],
			brushColor: '#444',
			brushRadius: 5,
		},
	],
	width: 400,
	height: 400,
})


export { anUserToPlayer }
