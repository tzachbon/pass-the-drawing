import type { User } from '@types'
import firebase from 'firebase/app'
import React, { createContext, useCallback, useEffect, useState } from 'react'
import { useContext } from 'react'
import { useAsync } from './useAsync'

interface IAuthContext {
	signInWithEmailAndPassword: (email: string, password: string) => Promise<void>;
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

	const value = {
		signInWithEmailAndPassword,
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


async function setPersist() {
	await firebase
		.auth()
		.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
}