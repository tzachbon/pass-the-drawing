/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { aGame, aPlayer, FAKE_DRAWING_DATA } from '@test-utils'
import { update } from '../../../tests/__mocks__/firebase'
import { guessWordScreenDriver } from './GuessWordScreen.driver'

describe('GuessWordScreen', () => {
	const players = [
		aPlayer({ draw: FAKE_DRAWING_DATA }),
		aPlayer({ draw: FAKE_DRAWING_DATA }),
		aPlayer(),
	]
	const game = aGame({ players })

	const driver = guessWordScreenDriver({ props: { game } }).beforeAndAfter()

	it('should submit the game and win', () => {
		const currentWord = game.word

		driver.testkit().input().type(currentWord.toUpperCase())

		driver.testkit().button().click()

		expect(update).toBeCalledWith({
			endTime: expect.any(Number),
			finished: true,
			isWon: true,
		})
	})

	it('should submit the game and lose', () => {
		driver.testkit().input().type('123')

		driver.testkit().button().click()

		expect(update).toBeCalledWith({
			endTime: expect.any(Number),
			finished: true,
			isWon: false,
		})
	})

	it('should disabled button if the word is empty', () => {
		expect(driver.testkit().input().value()).toEqual('')
		expect(driver.testkit().button().disabled()).toBeTruthy()

		driver.testkit().input().type('123')
		
		expect(driver.testkit().input().value()).toEqual('123')
		expect(driver.testkit().button().disabled()).toBeFalsy()
	})

	it('should display the drawings', () => {
		expect(driver.testkit().draws()).toHaveLength(2)
	})
})