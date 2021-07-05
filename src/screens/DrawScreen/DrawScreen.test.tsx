import { aGame, aPlayer, FAKE_DRAWING_DATA, waitFor } from '@test-utils'
import { update } from '../../../tests/__mocks__/firebase'
import { drawScreenDriver } from './DrawScreen.driver'

describe('DrawScreen', () => {
	const currentPlayer = aPlayer()
	const nextPlayer = aPlayer()
	const fakeExpireTime = 3
	const game = aGame({ players: [ currentPlayer, nextPlayer ] })
	const driver = drawScreenDriver({ props: { currentPlayer, game, expireTime: fakeExpireTime } }).beforeAndAfter()

	it('show draw on canvas and save to database', async () => {
		driver.testkit().canvas().draw(5, 5)
		const expectedDraw = FAKE_DRAWING_DATA

		await waitFor(() => {
			expect(update).toBeCalledWith({
				players: [
					{
						...currentPlayer,
						draw: expectedDraw,
					},
					nextPlayer,
				],
			})
		})
	})

	it(
		'should move to next player when finished',
		async () => {
			expect(driver.testkit().timer().text()).toEqual(String(fakeExpireTime))

			await waitFor(() => {
				expect(driver.testkit().timer().text()).toEqual('1')
				expect(update).toBeCalledWith({
					currentPlayingIndex: game.currentPlayingIndex + 1,
				})
			}, { timeout: fakeExpireTime * 1000 })

		},
		20000,
	)
})