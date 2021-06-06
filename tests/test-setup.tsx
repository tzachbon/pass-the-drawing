import './extends/toBeCalledWithInstance'
import { enableFetchMocks } from 'jest-fetch-mock'
import { cleanup as firebaseCleanup } from './__mocks__/firebase'
import { cleanup } from '@test-utils'
import { cleanup as hooksCleanup } from '@testing-library/react-hooks'

enableFetchMocks()

afterEach(() => {
	void firebaseCleanup()
	void cleanup()
	void hooksCleanup()

	jest.clearAllMocks()
})