/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { aGame, aPlayer, wait } from '@test-utils'
import { PlayerRoles } from '@types'
import { databaseState, mockFirebase, update } from '../../../tests/__mocks__/firebase'
import { startGameButtonDriver } from './StartGameButton.driver'

mockFirebase()

describe('StartGameButton', () => {
	const players = [
		aPlayer(),
		aPlayer({ role: PlayerRoles.Regular }),
		aPlayer({ role: PlayerRoles.Regular }),
	]

	const game = aGame({ players })
	const driver = startGameButtonDriver({ props: { game } }).beforeAndAfter()
	
	beforeEach(() => {
		update.mockResolvedValue({})
	})

	it('should start a game', async () => {
		expect(driver.testkit().button().disabled()).toBeFalsy()

		driver.testkit().button().click()

		await wait(() => {
			
			expect(databaseState.ref).toEqual(`games/${game.id}`)
			expect(update).toBeCalledWith(expect.objectContaining({
				startTime: expect.any(Number),
				started: true,
			}))
		})
	})

	it('should not start game when not enough players', () => {
		driver.withProps({ game: aGame({ players: [ aPlayer(), aPlayer() ] }) }).render()

		expect(driver.testkit().button().disabled()).toBeTruthy()
	})
})
