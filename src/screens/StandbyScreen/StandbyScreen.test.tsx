import { aPlayer } from '@test-utils'
import { standbyScreenDriver } from './StandbyScreen.driver'

describe('StandbyScreen', () => {
	const currentPlayingPlayer = aPlayer()
	const driver = standbyScreenDriver({ props: { currentPlayingPlayer } }).beforeAndAfter()

	it('should show user standby', () => {
		expect(driver.testkit().text()).toEqual(`${currentPlayingPlayer.name} is playing, please wait to your turn.`)
	})
})