import firebase from 'firebase/app'
import { useObject } from 'react-firebase-hooks/database'
interface Params {
    id: string
}

export function useGame({ id }: Params) {
	const [ game, loading, error ] = useObject(
		firebase.database().ref(`games/${id}`),
	)

	return {
		game,
		loading,
		error,
	}
}
