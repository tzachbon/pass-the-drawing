import { CreateGameParams, Game, Player, PlayerRoles, User } from '@types'
import firebase from 'firebase/app'
import { v4 as uuid } from 'uuid'

export async function createGame(
    params: CreateGameParams,
    currentUser?: User,
): Promise<Game> {
    const game: Game = {
        ...params,
        id: uuid(),
        createdTime: Date.now(),
        players: [ ...(currentUser ? [ anUserToPlayer(currentUser) ] : []) ],
        currentPlayingIndex: 0,
    }

    await firebase.database().ref(`games/${game.id}`).set(game)

    return game
}

export function anUserToPlayer(
    currentUser: User,
    role: PlayerRoles = PlayerRoles.Admin,
): Player {
    return {
        name: currentUser.displayName || currentUser.uid,
        role,
        id: currentUser.uid,
        image: currentUser.photoURL,
    }
}
