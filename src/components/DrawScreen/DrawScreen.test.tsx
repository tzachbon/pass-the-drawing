import { aGame, aPlayer, wait } from '@test-utils'
import { mockFirebase, update } from '../../../tests/__mocks__/firebase'
import { drawScreenDriver } from './DrawScreen.driver'

mockFirebase()

describe('DrawScreen', () => {
	const currentPlayer = aPlayer()
	const game = aGame({ players: [ currentPlayer ] })
	const driver = drawScreenDriver({ props: { currentPlayer, game } }).beforeAndAfter()

	it('show draw on canvas and save to database', async () => {
		driver.testkit().canvas().draw(5, 5)

		await wait(() => {
			expect(update).toBeCalledWith({
				players: [
					{
						...currentPlayer,
						draw: '{"lines":[{"points":[{"x":0.7999999999999545,"y":0.6000000000000227},{"x":0.7999999999999545,"y":0.6000000000000227},{"x":4.309524253317494,"y":4.276644455856433},{"x":4.309524253317494,"y":4.276644455856433}],"brushColor":"#444","brushRadius":5}],"width":400,"height":400}',
					},
				],
			})
		})
	})
})