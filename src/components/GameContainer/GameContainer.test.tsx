import { aGame, anUser, anUserToPlayer } from '@test-utils'
import type { User } from '@types'
import { gameContainerDriver } from './GameContainer.driver'

describe('GameContainer', () => {
	const currentUser = anUser() as User
	const game = aGame({ players: [ anUserToPlayer(currentUser) ] })
	const driver = gameContainerDriver({ props: { game, currentUser } }).beforeAndAfter()

	it('should render play screen when the current player is playing', () => {
		expect(driver.testkit().element()).toBeInTheDocument()
		expect(driver.testkit().playScreen().element()).toBeInTheDocument()
	})

	it('should render standby screen when the player is not currently playing', () => {
		const user = anUser() as User
		const newGame = aGame({
			currentPlayingIndex: 0,
			players: [
				anUserToPlayer(user),
				anUserToPlayer(currentUser),
			],
		})

		driver.withProps({ game: newGame, currentUser }).render()

		expect(driver.testkit().standbyScreen().element()).toBeInTheDocument()
		expect(driver.testkit().playScreen().element()).not.toBeInTheDocument()
	})
})
