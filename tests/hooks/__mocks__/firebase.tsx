export const authState = {
	onAuthStateChangedCallback: (() => { return }) as Function,
}

export const Persistence = {
	SESSION: 'SESSION',
}
export const GoogleAuthProvider = jest.fn()
export const setPersistence = jest.fn()
export const signInWithPopup = jest.fn()
export const onAuthStateChanged = jest.fn().mockImplementation((callback: Function) => {
	authState.onAuthStateChangedCallback = callback
})

export function firebaseAuthMock() {
	const auth = () => ({
		setPersistence,
		signInWithPopup,
		onAuthStateChanged,
	})

	auth.GoogleAuthProvider = GoogleAuthProvider

	auth.Auth = {
		Persistence,
	}

	return auth
}

export function cleanup() {
	GoogleAuthProvider.mockClear()
	setPersistence.mockClear()
	signInWithPopup.mockClear()
	onAuthStateChanged.mockClear()
}