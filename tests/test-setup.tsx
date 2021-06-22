import './extends/toBeCalledWithInstance'
import 'jest-canvas-mock'
import { enableFetchMocks } from 'jest-fetch-mock'
import { cleanup as firebaseCleanup, mockFirebase } from './__mocks__/firebase'
import { cleanup } from '@test-utils'
import { cleanup as hooksCleanup } from '@testing-library/react-hooks'

enableFetchMocks()
mockFirebase()

afterEach(() => {
	void firebaseCleanup()
	void cleanup()
	void hooksCleanup()

	jest.clearAllMocks()
})

afterAll(() => {
	jest.restoreAllMocks()
})