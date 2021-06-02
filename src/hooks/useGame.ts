import firebase from 'firebase/app'
import { useObjectVal } from 'react-firebase-hooks/database'
import type { Game } from 'src/types'
interface Params {
	id: string
}

export function useGame({ id }: Params) {
	const [ game, loading, error ] = useObjectVal<Game>(
		firebase
			.database()
			.ref(`games/${id}`),
	)

	return {
		game,
		loading,
		error,
	}
}
