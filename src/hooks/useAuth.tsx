import type { User } from '@types'
import firebase from 'firebase/app'
import React, { createContext, useCallback, useEffect, useState } from 'react'
import { useContext } from 'react'
import { useAsync } from './useAsync'

interface IAuthContext {
	signInWithRedirect: () => Promise<void>;
	error: Error | undefined;
	loading: boolean;
	currentUser: firebase.User | undefined;
}

const AuthContext = createContext<IAuthContext>(null as unknown as IAuthContext)

export const AuthProvider: React.ComponentType = (
	{
		children,
	},
) => {
	const [ currentUser, setCurrentUser ] = useState<User | undefined>()
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

	const value = {
		signInWithRedirect,
		error,
		loading,
		currentUser,
	}

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	return useContext(AuthContext)
}
