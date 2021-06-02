import type firebase from 'firebase/app'
import { uuid } from '@test-utils'
import { Player, PlayerRoles } from '@types'

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

export function aUser({
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

export function aUserToPlayer(currentUser: FirebaseUser): Player {
	return aPlayer({
		name: currentUser.displayName || '',
		role: PlayerRoles.Admin,
		id: currentUser.uid,
		image: currentUser.photoURL,
	})
}