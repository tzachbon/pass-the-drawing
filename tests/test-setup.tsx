import './extends/toBeCalledWithInstance'
import 'jest-canvas-mock'
import '@testing-library/jest-dom'
import { cleanup as firebaseCleanup, mockFirebase } from './__mocks__/firebase'
import { cleanup } from '@test-utils'
import { cleanup as hooksCleanup } from '@testing-library/react-hooks'

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
