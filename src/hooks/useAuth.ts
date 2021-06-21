import type { User } from '@types'
import firebase from 'firebase/app'
import { useCallback, useEffect, useState } from 'react'
import { useAsync } from './useAsync'

export function useAuth() {
	const [ currentUser, setCurrentUser ] = useState<User | undefined>()
	const { run, error, loading } = useAsync()

	const signInWithRedirect = run(
		useCallback(async () => {
			const provider = new firebase.auth.GoogleAuthProvider()
			await setPersist()

			return await firebase.auth().signInWithRedirect(provider)
		}, []),
	)

	const signInWithEmailAndPassword = run(
		useCallback(
			async (email: string, password: string) => {
				await setPersist()

				return await firebase
					.auth()
					.signInWithEmailAndPassword(email, password)
			},
			[],
		))

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				setCurrentUser(user)
			}
		})
	}, [])

	return {
		signInWithEmailAndPassword,
		signInWithRedirect,
		error,
		loading,
		currentUser,
	}
}


async function setPersist() {
	await firebase
		.auth()
		.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
}