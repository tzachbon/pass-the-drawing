import { aPlayer } from '@test-utils'
import { Player, PlayerRoles } from '@types'
import { playersDriver } from './Players.driver'
import * as stylesheet from './Players.st.css'

describe('Players', () => {

	const players = [ aPlayer(), aPlayer({ role: PlayerRoles.Regular }) ]
	const [ currentPlayer, otherPlayer ] = players
	const playerWithNoImage = Object.fromEntries(Object.entries(currentPlayer!).filter(([ key ]) => key !== 'image')) as Player

	const driver = playersDriver({
		props: { currentPlayerId: currentPlayer!.id!, players },
		stylesheet,
	}).beforeAndAfter()

	it('should render players', () => {
		players.forEach((player, index) => {
			const playerTestkit = driver.testkit().player(index)

			expect(playerTestkit.image()).toHaveAttribute('src', player.image)
			expect(playerTestkit.text()).toEqual(player.name)
		})
	})

	it('should add currentPlayer state to the current user', () => {
		const playerTestkit = driver.testkit().player(0)

		expect(playerTestkit.text()).toEqual(currentPlayer!.name)
		expect(driver.styleUtils().hasStyleState(playerTestkit.element()!, 'currentPlayer')).toBeTruthy()
	})

	it('should not add currentPlayer state to the other user', () => {
		const playerTestkit = driver.testkit().player(1)

		expect(playerTestkit.text()).toEqual(otherPlayer!.name)
		expect(driver.styleUtils().hasStyleState(playerTestkit.element()!, 'currentPlayer')).toBeFalsy()
	})

	it('should show avatar component when image not defined', () => {
		driver.withProps({ players: [ playerWithNoImage ] }).render()

		expect(playerWithNoImage).not.toHaveProperty('image')
		expect(driver.testkit().player(0).image()).not.toBeInTheDocument()
		expect(driver.testkit().player(0).avatar().image().src()).toContain(encodeURI(playerWithNoImage.name))
	})
})