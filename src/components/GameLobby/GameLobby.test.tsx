import type { User } from '@types'
import { aGame, anUser, anUserToPlayer } from '@test-utils'
import { gameLobbyDriver } from './GameLobby.driver'

describe('GameLobby', () => {
	const currentUser = anUser() as User
	const game = aGame({ players: [ anUserToPlayer(currentUser) ] })
	const driver = gameLobbyDriver({ props: { game, currentUser } }).beforeAndAfter()

	it('should render word board', () => {
		expect(driver.testkit().wordBoard().element()).toBeInTheDocument()
	})

	it('should render players', () => {
		expect(driver.testkit().players().element()).toBeInTheDocument()
	})
})