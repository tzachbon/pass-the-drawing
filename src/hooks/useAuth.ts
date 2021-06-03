import firebase from 'firebase/app'
import { useCallback, useEffect, useState } from 'react'
import { useAsync } from './useAsync'

export function useAuth() {
	const [ currentUser, setCurrentUser ] = useState<firebase.User | undefined>()
	const { run, error, loading } = useAsync()

	const signInWithRedirect = useCallback(async () => {
		const provider = new firebase.auth.GoogleAuthProvider()
		await run(async () => {
			await firebase
				.auth()
				.setPersistence(firebase.auth.Auth.Persistence.LOCAL)

			return await firebase.auth().signInWithRedirect(provider)
		})()
	}, [ run ])

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				setCurrentUser(user)
			}
		})
	}, [])

	return {
		signInWithRedirect,
		error,
		loading,
		currentUser,
	}
}
