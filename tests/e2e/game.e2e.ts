import { Routes } from '@constants'
import { testIdToSelector, URL } from '@test-utils'
import { CREATE_GAME_LINK } from '../../src/pages/Home'

describe('Game', () => {

	beforeAll(async () => {
		await page.goto(URL)
	})

	it('should go to create a game', async () => {
		await page.click(testIdToSelector(CREATE_GAME_LINK))
		await expect(page.url()).toMatch(new RegExp(Routes.CREATE_GAME))
	})
})