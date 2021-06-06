import { aGame } from '@test-utils'
import { gameContainerDriver } from './GameContainer.driver'

describe('GameContainer', () => {
	const game = aGame()
	const driver = gameContainerDriver({ props: { game } }).beforeAndAfter()

	it('should be in document', () => {
		expect(driver.testkit().element()).toBeInTheDocument()
	})
	
})
