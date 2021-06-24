import { aGame, aPlayer, FAKE_DRAWING_DATA, wait } from '@test-utils'
import { update } from '../../../tests/__mocks__/firebase'
import { drawScreenDriver } from './DrawScreen.driver'

describe('DrawScreen', () => {
	const currentPlayer = aPlayer()
	const nextPlayer = aPlayer()
	const fakeExpireTime = 3
	const previewExpireTime = 3
	const game = aGame({ players: [ currentPlayer, nextPlayer ] })
	const driver = drawScreenDriver({
		props: {
			currentPlayer,
			game,
			expireTime: fakeExpireTime,
		},
	}).beforeAndAfter()

	it('show draw on canvas and save to database', async () => {
		driver.testkit().canvas().draw(5, 5)
		const expectedDraw = FAKE_DRAWING_DATA

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

	it('should not show last draw if it is the first player', () => {
		expect(game.currentPlayingIndex).toEqual(0)
		expect(driver.testkit().lastDrawPreview().element()).not.toBeInTheDocument()
	})

	it('should not show last draw if last player does not have draw', () => {
		driver.withProps({ game: { ...game, currentPlayingIndex: 1 } }).render()

		expect(driver.testkit().lastDrawPreview().element()).not.toBeInTheDocument()
	})

	it('should show preview draw and then switch to drawing screen', async () => {
		const lastPlayer = aPlayer({ draw: FAKE_DRAWING_DATA })
		driver
			.withProps({
				previewExpireTime,
				game: aGame({
					currentPlayingIndex: 1,
					players: [
						lastPlayer,
						currentPlayer,
					],
				}),
			})
			.render()

		expect(driver.testkit().timer().element()).not.toBeInTheDocument()
		expect(driver.testkit().lastDrawPreview().element()).toBeInTheDocument()


		await wait(() => {
			expect(driver.testkit().lastDrawPreview().element()).not.toBeInTheDocument()
			expect(driver.testkit().canvas().element()).toBeInTheDocument()
		})
	})
})