import { wait } from '@test-utils'
import {
	authState,
	cleanup as firebaseCleanup,
	mockFirebase,
	signInWithRedirect,
} from '../../../tests/__mocks__/firebase'
import {
	cleanup as routerCleanup,
	mockRouter,
} from '../../../tests/__mocks__/react-router-dom'
import { createGameDriver } from './CreateGame.driver'

mockRouter()
mockFirebase()

describe('CreateGame', () => {
	const fakeUser = { displayName: 'test' }
	const driver = createGameDriver({ props: {} }).beforeAndAfter()

	beforeEach(() => {
		void firebaseCleanup()
		void routerCleanup()
	})

	it('should do login process', async () => {
		driver.testkit().login().button().click()

		await wait(() => {
			expect(signInWithRedirect).toBeCalled()
		})

		authState.onAuthStateChangedCallback(fakeUser)

		expect(driver.testkit().login().button().element()).toBeNull()
		expect(driver.testkit().login().message().element()).toHaveTextContent(
			'Logged in as test',
		)
	})
})
