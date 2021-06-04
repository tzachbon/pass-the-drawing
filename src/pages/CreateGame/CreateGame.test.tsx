/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { GameSubjects } from '@constants'
import { anUser, anUserToPlayer, localStorageCleanup, uuidRegexPattern, wait } from '@test-utils'
import type { User } from '@types'
import { v4 as uuid } from 'uuid'
import { cleanup as fetchCleanup, fetch } from '../../../tests/__mocks__/fetch'
import {
	authState,
	cleanup as firebaseCleanup,
	mockFirebase,
	set,
	signInWithRedirect,
} from '../../../tests/__mocks__/firebase'
import {
	cleanup as routerCleanup,
	mockRouter,
	push,
} from '../../../tests/__mocks__/react-router-dom'
import { createGameDriver } from './CreateGame.driver'

mockRouter()
mockFirebase()

describe('CreateGame', () => {

	beforeEach(() => {
		word = uuid()
		void fetchCleanup()
		void firebaseCleanup()
		void routerCleanup()
		void localStorageCleanup()
	})

	let word = uuid()
	const fakeUser = anUser() as unknown as User
	const fakePlayer = anUserToPlayer(fakeUser)
	const driver = createGameDriver().beforeAndAfter()


	it('should create a game', async () => {
		const subject = GameSubjects.Food
		fetch.mockResponse(() =>
			Promise.resolve({ body: JSON.stringify({ dish: word }) }),
		)

		driver.testkit().selectSubject().input().type(subject)
		driver.testkit().login().button().click()

		await wait(() => {
			authState.onAuthStateChangedCallback(fakeUser)
		})

		expect(driver.testkit().submit().button().disabled()).toBeFalsy()

		driver.testkit().submit().button().click()

		await wait(() => {
			expect(driver.testkit().submit().error().element()).toBeNull()
			expect(push).toBeCalledWith(
				expect.stringMatching(
					new RegExp(`/lobby/${uuidRegexPattern}`, 'g'),
				),
			)
			expect(set).toBeCalledWith(
				expect.objectContaining({
					currentPlayingIndex: 0,
					id: expect.stringMatching(new RegExp(uuidRegexPattern)),
					players: [ fakePlayer ],
					startTime: expect.any(Number),
					subject,
					word,
				}),
			)
		})
	})

	it('should add subject to local storage', () => {
		driver.testkit().selectSubject().input().type('test')

		expect(driver.testkit().selectSubject().localStorage().get()).toEqual('test')
	})

	it('should show invalid subject error message when subject is invalid and submit clicked', async () => {
		driver.testkit().selectSubject().input().type('Invalid')

		await wait(() => {
			authState.onAuthStateChangedCallback(fakeUser)
		})

		driver.testkit().submit().button().click()

		await wait(() => {
			expect(driver.testkit().selectSubject().error().text()).toEqual('Game subject must be one of Food,Cars,Dessert')
		})
	})

	it('should clear local storage when submit finished', async () => {
		const subject = GameSubjects.Food
		fetch.mockResponse(() =>
			Promise.resolve({ body: JSON.stringify({ dish: word }) }),
		)

		driver.testkit().selectSubject().input().type(subject)
		driver.testkit().login().button().click()

		await wait(() => {
			authState.onAuthStateChangedCallback(fakeUser)
		})

		expect(
			driver.testkit().submit().button().element(),
		).not.toHaveAttribute('disabled')

		driver.testkit().submit().button().click()

		await wait(() => {
			expect(push).toHaveBeenCalled()
			expect(driver.testkit().selectSubject().localStorage().get()).toEqual('')
		})
	})

	it('should throw an error and show it to the user', async () => {
		fetch.mockRejectedValue(new Error())

		driver.testkit().selectSubject().input().type(GameSubjects.Food)
		driver.testkit().login().button().click()

		await wait(() => {
			authState.onAuthStateChangedCallback(fakeUser)
		})

		expect(driver.testkit().submit().button().disabled()).toBeFalsy()

		driver.testkit().submit().button().click()

		await wait(() => {
			expect(
				driver.testkit().submit().error().element(),
			).toHaveTextContent(
				'We ran into small problem, can you please try again?',
			)
			expect(fetch).toHaveBeenCalledWith(
				'https://random-data-api.com/api/food/random_food',
				expect.objectContaining({}),
			)
		})
	})

	it('should do login process', async () => {
		driver.testkit().login().button().click()

		await wait(() => {
			expect(signInWithRedirect).toBeCalled()
		})

		await wait(() => {
			authState.onAuthStateChangedCallback(fakeUser)
		})

		expect(driver.testkit().login().button().element()).toBeNull()
		expect(driver.testkit().login().message().element()).toHaveTextContent(
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			'Logged in as ' + String(fakeUser.displayName),
		)
	})
})
