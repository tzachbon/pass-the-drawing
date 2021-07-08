import firebase from 'firebase/app'
import type { Game } from '@types'

export async function updateGame(
    id: string,
    game: Partial<Game>,
): Promise<unknown> {
    return firebase.database().ref(`games/${id}`).update(game)
}
