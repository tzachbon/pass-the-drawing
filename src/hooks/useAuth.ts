import firebase from 'firebase/app'
import { useCallback, useEffect, useState } from 'react'

const CREDENTIAL_STORAGE_KEY = 'CREDENTIAL_STORAGE_KEY'


export function useAuth() {
	const [error, setError] = useState<Error | undefined>()
	const [loading, setLoading] = useState(false)
	const [currentUser, setCurrentUser] = useState<firebase.User | undefined>()

	const runAsync = useCallback(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		async <T extends any>(callback: () => T | Promise<T>) => {

			try {
				setLoading(true)
				const response = await callback()
				setLoading(false)
				return response

			} catch (error) {
				setError(error)
				setLoading(false)
			}
		},
		[],
	)
	const signInWithRedirect = useCallback(
		async () => {
			const provider = new firebase.auth.GoogleAuthProvider()
			await runAsync(async () => {
				await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
				return await firebase.auth().signInWithPopup(provider)
			})

		},
		[runAsync],
	)

	useEffect(() => {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				setCurrentUser(user)
			}
		})
	}, [currentUser])

	return {
		signInWithRedirect,
		error,
		loading,
		currentUser
	}
}

function saveCredential(credential: firebase.auth.AuthCredential) {
	localStorage.setItem(CREDENTIAL_STORAGE_KEY, JSON.stringify(credential))
}

function getCredential() {
	const credentialString = localStorage.getItem(CREDENTIAL_STORAGE_KEY)
	return credentialString ? JSON.parse(credentialString) as firebase.auth.AuthCredential : null
}