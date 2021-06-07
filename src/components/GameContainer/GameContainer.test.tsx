import { aGame, anUser, anUserToPlayer } from '@test-utils'
import type { User } from '@types'
import { gameContainerDriver } from './GameContainer.driver'

describe('GameContainer', () => {
	const currentUser = anUser() as User
	const game = aGame({ players: [ anUserToPlayer(currentUser) ] })
	const driver = gameContainerDriver({ props: { game, currentUser } }).beforeAndAfter()

	it('should be in document', () => {
		expect(driver.testkit().element()).toBeInTheDocument()
	})

})
