import { INPUT_TEST_ID } from '@components/SelectSubject/SelectSubject'
import { ROOT_TEST_ID, SUBMIT_BUTTON_TEST_ID as SIGN_IN_SUBMIT_BUTTON_TEST_ID } from '@components/SignInForm'
import { Routes } from '@constants'
import { LOGGED_IN_MESSAGE_TEST_ID, OPEN_MODAL_BUTTON_TEST_ID, SUBMIT_BUTTON_TEST_ID } from '@pages/CreateGame/CreateGame'
import { CREATE_GAME_LINK } from '@pages/Home/Home'
import { getFakeUsers, testIdToSelector, URL } from '@test-utils'
import eventually from 'wix-eventually'

describe('StartGame', () => {
	const [ user ] = getFakeUsers()
	beforeAll(async () => {
		await page.goto(URL)
	})

	it('should go to create a game', async () => {
		await page.click(testIdToSelector(CREATE_GAME_LINK))

		await eventually(async () => {
			await expect(page.url()).toMatch(new RegExp(Routes.CREATE_GAME))
		})

		await page.click(testIdToSelector(OPEN_MODAL_BUTTON_TEST_ID))
		await page.waitForSelector(testIdToSelector(ROOT_TEST_ID))

		await expect(page).toFillForm(testIdToSelector(ROOT_TEST_ID), { ...user })

		await page.click(testIdToSelector(SIGN_IN_SUBMIT_BUTTON_TEST_ID))
		await page.waitForSelector(testIdToSelector(ROOT_TEST_ID), { hidden: true })

		await expect(page).toMatchElement(testIdToSelector(LOGGED_IN_MESSAGE_TEST_ID), { text: `Logged in as ${user!.email}` })

		await page.type(testIdToSelector(INPUT_TEST_ID), 'Food')
		await page.click(testIdToSelector(SUBMIT_BUTTON_TEST_ID))

		await eventually(async () => {
			await expect(page.url()).toMatch(new RegExp(Routes.LOBBY))
		})
	})
})