import type { User } from '@types'
import { aGame, anUser, anUserToPlayer } from '@test-utils'
import { gameLobbyDriver } from './GameLobby.driver'

jest.mock('react-router', () => ({
	match: jest.fn(),
}))

jest.mock('react-router-dom', () => ({
	useParams: jest.fn().mockReturnValue({ id: '123' }),
	useHistory: jest.fn().mockReturnValue({ push: jest.fn() }),
}))


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