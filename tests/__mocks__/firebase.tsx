import firebase from 'firebase/app'

const initialAuthState = () => ({
	onAuthStateChangedCallback: undefined as unknown as Function,
})

const initialDatabaseState = () => ({
	setValue: undefined as unknown as Function,
	ref: undefined as string | undefined,
})

export const authState = initialAuthState()

export const databaseState = initialDatabaseState()

export const Persistence = {
	SESSION: 'SESSION',
	LOCAL: 'LOCAL',
}
export const set = jest.fn().mockReturnValue(jest.fn())
export const isEqual = jest.fn().mockReturnValue(jest.fn())
export const on = jest.fn().mockImplementation((_, setValue: Function) => {
	databaseState.setValue = setValue
	
	return {}
})
export const off = jest.fn().mockReturnValue(jest.fn())
export const get = jest.fn().mockReturnValue(jest.fn())
export const update = jest.fn().mockResolvedValue(jest.fn())
export const ref = jest
	.fn()
	.mockImplementation((refValue: string | undefined) => {
		databaseState.ref = refValue

		return { set, isEqual, on, off, update, get }
	})
export const GoogleAuthProvider = jest.fn()
export const setPersistence = jest.fn()
export const signInWithPopup = jest.fn()
export const signInWithRedirect = jest.fn()
export const signInWithEmailAndPassword = jest.fn()
export const createUserWithEmailAndPassword = jest.fn()
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
		signInWithEmailAndPassword,
		createUserWithEmailAndPassword,
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
	[
		GoogleAuthProvider,
		setPersistence,
		signInWithPopup,
		signInWithRedirect,
		signInWithEmailAndPassword,
		createUserWithEmailAndPassword,
		onAuthStateChanged,
		isEqual,
		on,
		off,
		update,
		get,
	].forEach(_ => _.mockClear())

	Object.assign(authState, initialAuthState())
	Object.assign(databaseState, initialDatabaseState())
}

export function mockFirebase() {
	const mock = () => ({
		auth: firebaseAuthMock(),
		database: firebaseDatabaseMock(),
	})

	jest.doMock('firebase/app', () => mock())

	Object.assign(firebase, mock())
}

export function useObjectValMock<T extends object>(val?: T | null) {
	on.mockImplementation((_, setValue: Function) => {
		databaseState.setValue = setValue
		databaseState.setValue({ exists: true, val: () => val })

		return {}
	})
}
