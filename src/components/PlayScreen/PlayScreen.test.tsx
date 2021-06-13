import { aGame, aPlayer } from '@test-utils'
import { Player, PlayerRoles } from '@types'
import { playScreenDriver } from './PlayScreen.driver'

describe('PlayScreen', () => {
	const players = [ aPlayer(), aPlayer({ role: PlayerRoles.Regular }) ]
	const [ currentPlayer ] = players as [Player]
	const game = aGame({ players })

	const driver = playScreenDriver({ props: { game, currentPlayer } }).beforeAndAfter()

	it('should render draw screen when current player is not the last player', () => {
		expect(driver.testkit().element()).toBeInTheDocument()
		expect(driver.testkit().drawScreen().element()).toBeInTheDocument()
	})
})