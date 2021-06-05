import './extends/toBeCalledWithInstance'
import { enableFetchMocks } from 'jest-fetch-mock'
import { cleanup as firebaseCleanup } from './__mocks__/firebase'
import { cleanup as routerCleanup } from './__mocks__/react-router-dom'
import { cleanup } from '@test-utils'
import { cleanup as hooksCleanup } from '@testing-library/react-hooks'

enableFetchMocks()

afterEach(() => {
	void firebaseCleanup()
	void routerCleanup()
	void cleanup
	void hooksCleanup()

	jest.clearAllMocks()
})