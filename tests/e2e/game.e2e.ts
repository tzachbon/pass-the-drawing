import { INPUT_TEST_ID } from '@components/SelectSubject/SelectSubject'
import { Routes } from '@constants'
import { LOGGED_IN_MESSAGE_TEST_ID } from '@pages/CreateGame/CreateGame'
import { CREATE_GAME_LINK } from '@pages/Home/Home'
import { stubFirebaseAuth, testIdToSelector, URL } from '@test-utils'
import eventually from 'wix-eventually'

describe('Game', () => {

	beforeAll(async () => {
		await page.goto(URL)
		await stubFirebaseAuth(page)
	})

	it('should go to create a game', async () => {
		await expect(page).toClick(testIdToSelector(CREATE_GAME_LINK))

		await eventually(async () => {
			await expect(page.url()).toMatch(new RegExp(Routes.CREATE_GAME))
		})

		await expect(page).toFill(testIdToSelector(INPUT_TEST_ID), 'Food')
		await expect(page).toMatchElement(testIdToSelector(LOGGED_IN_MESSAGE_TEST_ID), { text: 'Logged in as Mock User' })
	})
})