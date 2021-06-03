import { aGame } from '@test-utils'
import { gameLobbyDriver } from './GameLobby.driver'


describe('GameLobby', () => {
	const game = aGame()
	const driver = gameLobbyDriver({ props: { game } }).beforeAndAfter()

	it('should render word board', () => {
		expect(driver.testkit().wordBoard().element()).toBeInTheDocument()
	})
})