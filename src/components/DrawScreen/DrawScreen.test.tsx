import { aGame, aPlayer, wait } from '@test-utils'
import { mockFirebase, update } from '../../../tests/__mocks__/firebase'
import { drawScreenDriver } from './DrawScreen.driver'

mockFirebase()

describe('DrawScreen', () => {
	const currentPlayer = aPlayer()
	const nextPlayer = aPlayer()
	const fakeExpireTime = 3
	const game = aGame({ players: [ currentPlayer, nextPlayer ] })
	const driver = drawScreenDriver({ props: { currentPlayer, game, expireTime: fakeExpireTime } }).beforeAndAfter()

	it('show draw on canvas and save to database', async () => {
		driver.testkit().canvas().draw(5, 5)
		const expectedDraw = JSON.stringify({
			lines:
				[
					{
						points:
							[
								{
									x: 0.7999999999999545,
									y: 0.6000000000000227,
								},
								{
									x: 0.7999999999999545,
									y: 0.6000000000000227,
								},
								{
									x: 4.309524253317494,
									y: 4.276644455856433,
								}, {
									x: 4.309524253317494,
									y: 4.276644455856433,
								},
							],
						brushColor: '#444',
						brushRadius: 5,
					},
				],
			width: 400,
			height: 400,
		})

		await wait(() => {
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

			await wait(() => {
				expect(driver.testkit().timer().text()).toEqual('0')
				expect(update).toBeCalledWith({
					currentPlayingIndex: game.currentPlayingIndex + 1,
				})
			}, { timeout: fakeExpireTime * 1000 })

		},
		20000,
	)
})