import { AuthProvider, useAuth } from '@hooks/useAuth'
import { anUser } from '@test-utils'
import { act, renderHook } from '@testing-library/react-hooks'
import {
	authState,
	GoogleAuthProvider,
	 Persistence,
	setPersistence,
	signInWithEmailAndPassword,
	signInWithRedirect,
} from '../__mocks__/firebase'

describe('useAuth', () => {
	const fakeUser = anUser()
	const fakeUser2 = anUser()

	const renderAuth = () => renderHook(
		() => useAuth(),
		{
			wrapper: AuthProvider,
		},
	)

	describe('onAuthStateChanged', () => {
		it('should set current user', async () => {
			const { result, waitFor } = renderAuth()

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
			const { result, waitFor } = renderAuth()

			await act(async () => {
				await result.current.signInWithRedirect()
			})

			await waitFor(() => {
				expect(setPersistence).toBeCalledWith(Persistence.LOCAL)
			})
		})

		it('should use google provider for sign in', async () => {
			const { result } = renderAuth()

			await act(async () => {
				await result.current.signInWithRedirect()
			})

			expect(signInWithRedirect).toBeCalledWithInstance(
				GoogleAuthProvider,
			)
		})
	})

	describe('signInWithEmailAndPassword', () => {
		const [ email, password ] = [ 'fake@email.com', 'fake-password' ]

		it('should set persistence', async () => {
			const { result, waitFor } = renderHook(() => useAuth())

			await act(async () => {
				await result.current.signInWithEmailAndPassword(email, password)
			})

			await waitFor(() => {
				expect(setPersistence).toBeCalledWith(Persistence.LOCAL)
			})
		})

		it('should have been called with email and password', async () => {
			const { result } = renderHook(() => useAuth())

			await act(async () => {
				await result.current.signInWithEmailAndPassword(email, password)
			})

			expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
				email,
				password,
			)
		})
	})
})
