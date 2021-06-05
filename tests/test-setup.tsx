import './extends/toBeCalledWithInstance'
import { enableFetchMocks } from 'jest-fetch-mock'
import { cleanup as firebaseCleanup } from './__mocks__/firebase'
import { cleanup as routerCleanup } from './__mocks__/react-router-dom'

enableFetchMocks()

afterEach(() => {
	void firebaseCleanup()
	void routerCleanup()

	jest.clearAllMocks()
})