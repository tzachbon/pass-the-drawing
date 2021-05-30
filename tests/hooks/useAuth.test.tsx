/* eslint-disable @typescript-eslint/no-explicit-any */
import { act, cleanup, renderHook } from '@testing-library/react-hooks'
import firebase from 'firebase/app'
import { useAuth } from '../../src/hooks/useAuth'
import {
	authState,
	cleanup as firebaseCleanup,
	firebaseAuthMock,
	GoogleAuthProvider,
	Persistence,
	setPersistence,
	signInWithPopup,
} from './__mocks__/firebase'


describe('useAuth', () => {
	const fakeUser = {
		user: 'test',
	}

	const fakeUser2 = {
		user: 'test2',
	}
  
	beforeEach(() => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		void cleanup()
		void firebaseCleanup()

		// @ts-ignore
		firebase.auth = firebaseAuthMock()
	})

	describe('onAuthStateChanged', () => {
		it('should set current user', async () => {
			const { result, waitFor } = renderHook(() => useAuth())

			void act(() => {
				authState.onAuthStateChangedCallback()
			})

			await waitFor(() => {
				expect(result.current.currentUser).toBeUndefined()
			})

			void act(() => {
				authState.onAuthStateChangedCallback(fakeUser)
			})

			await waitFor(() => {
				expect(result.current.currentUser).toEqual(fakeUser)
			})

			void act(() => {
				authState.onAuthStateChangedCallback(fakeUser2)
			})

			await waitFor(() => {
				expect(result.current.currentUser).toEqual(fakeUser2)
			})
		})
	})

	describe('signInWithRedirect', () => {
		it('should set persistence', async () => {
			const { result, waitFor } = renderHook(() => useAuth())


			await act(async () => {
				await result.current.signInWithRedirect()
			})

			await waitFor(() => {
				expect(setPersistence).toBeCalledWith(Persistence.SESSION)
			})
		})

		it('should use google provider for sign in', async () => {
			const { result } = renderHook(() => useAuth())

			await act(async () => {
				await result.current.signInWithRedirect()
			})

			expect(signInWithPopup).toBeCalledWithInstance(GoogleAuthProvider)
		})
	})
})