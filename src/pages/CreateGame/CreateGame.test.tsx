/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { v4 as uuid } from 'uuid'
import {
	uuidRegexPattern, wait, waitForDomChange,
} from '@test-utils'
import {
	cleanup as fetchCleanup, fetch,
} from '../../../tests/__mocks__/fetch'
import {
	authState, cleanup as firebaseCleanup, mockFirebase, set, signInWithRedirect,
} from '../../../tests/__mocks__/firebase'
import {
	cleanup as routerCleanup, mockRouter, push,
} from '../../../tests/__mocks__/react-router-dom'
import { GameSubjects } from '@constants'
import { createGameDriver } from './CreateGame.driver'

mockRouter()
mockFirebase()

describe('CreateGame', () => {
	let word = uuid()
	const fakeUser = { displayName: 'test' }
	const driver = createGameDriver().beforeAndAfter()

	beforeEach(() => {
		word = uuid()
		void fetchCleanup()
		void firebaseCleanup()
		void routerCleanup()
	})

	it('should create a game', async () => {
		const subject = GameSubjects.Food
		fetch.mockResponse(() => Promise.resolve(({ body: JSON.stringify({ dish: word }) })))

		driver.testkit().selectSubject().input().type(subject)

		driver.testkit().login().button().click()
		authState.onAuthStateChangedCallback(fakeUser)

		await waitForDomChange()

		expect(driver.testkit().submit().button().element()).not.toHaveAttribute('disabled')

		driver.testkit().submit().button().click()

		await wait(() => {
			expect(driver.testkit().submit().error().element()).toBeNull()
			expect(push).toBeCalledWith(expect.stringMatching(new RegExp(`/lobby/${uuidRegexPattern}`, 'g')))
			expect(set).toBeCalledWith(expect.objectContaining({
				'currentPlayingIndex': 0,
				'id': expect.stringMatching(new RegExp(uuidRegexPattern)),
				'players': [],
				'startTime': expect.any(Number),
				subject,
				word,
			}))
		})
	})

	it('should throw an error and show it to the user', async () => {
		fetch.mockRejectedValue(new Error())

		driver.testkit().selectSubject().input().type(GameSubjects.Food)

		driver.testkit().login().button().click()
		authState.onAuthStateChangedCallback(fakeUser)

		await waitForDomChange()

		expect(driver.testkit().submit().button().element()).not.toHaveAttribute('disabled')

		driver.testkit().submit().button().click()

		await wait(() => {
			expect(driver.testkit().submit().error().element()).toHaveTextContent('We ran into small problem, can you please try again?')
			expect(fetch).toHaveBeenCalledWith(
				'https://random-data-api.com/api/food/random_food',
				expect.objectContaining({}))
		})
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
