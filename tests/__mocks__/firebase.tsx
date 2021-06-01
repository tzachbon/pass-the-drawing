import firebase from 'firebase/app'

export const authState = {
	onAuthStateChangedCallback: (() => {
		return
	}) as Function,
}

export const databaseState = { ref: undefined as string | undefined }

export const Persistence = {
	SESSION: 'SESSION',
	LOCAL: 'LOCAL',
}
export const set = jest.fn()
export const ref = jest
	.fn()
	.mockImplementation((refValue: string | undefined) => {
		databaseState.ref = refValue

		return { set }
	})
export const GoogleAuthProvider = jest.fn()
export const setPersistence = jest.fn()
export const signInWithPopup = jest.fn()
export const signInWithRedirect = jest.fn()
export const onAuthStateChanged = jest
	.fn()
	.mockImplementation((callback: Function) => {
		authState.onAuthStateChangedCallback = callback
	})

export function firebaseAuthMock() {
	const auth = () => ({
		setPersistence,
		signInWithPopup,
		onAuthStateChanged,
		signInWithRedirect,
	})

	auth.GoogleAuthProvider = GoogleAuthProvider

	auth.Auth = { Persistence }

	return auth
}

export function firebaseDatabaseMock() {
	const database = () => ({ ref })

	return database
}

export function cleanup() {
	GoogleAuthProvider.mockClear()
	setPersistence.mockClear()
	signInWithPopup.mockClear()
	signInWithRedirect.mockClear()
	onAuthStateChanged.mockClear()
}

export function mockFirebase() {
	const mock = () => ({
		auth: firebaseAuthMock(),
		database: firebaseDatabaseMock(),
	})

	jest.doMock('firebase/app', () => mock())

	Object.assign(firebase, mock())
}
