import { Routes } from '@constants'
import { aGame, anUser, anUserToPlayer, wait } from '@test-utils'
import { PlayerRoles, User } from '@types'
import {
	authState,
	databaseState,
	mockFirebase,
	ref,
	update,
	useObjectValMock,
} from '../../../tests/__mocks__/firebase'
import { lobbyDriver } from './Lobby.driver'

mockFirebase()

describe('Lobby', () => {

	let resolve = (_: unknown) => { return _ }
	const gameMock = aGame()
	const initialRoute = `${Routes.LOBBY}/${gameMock.id}`

	beforeEach(() => {
		useObjectValMock()
	})

	const fakeUser = anUser()
	const driver = lobbyDriver({ initialRoute }).beforeAndAfter()

	it('should call game route', async () => {

		await wait(() => {

			expect(ref).toBeCalledWith('games/' + gameMock.id)
		})
	})

	it('should show login screen', () => {
		expect(driver.testkit().loading().message().text()).toEqual('Wait here, we are getting the game...')
	})

	it('should show game not found layout', async () => {
		useObjectValMock(null)

		driver.render()

		await wait(() => {
			expect(driver.testkit().notFound().message().text()).toEqual('We could not find this game :(')
			expect(driver.testkit().notFound().link().text()).toEqual('Create a new game')
			expect(driver.testkit().notFound().link().element()).toHaveAttribute('href', '/')
		})
	})

	it('should show the game lobby', () => {
		useObjectValMock(gameMock)

		driver.render()
		driver.testkit().login().button().click()

		authState.onAuthStateChangedCallback(fakeUser)

		expect(driver.testkit().gameLobby().element()).not.toBeNull()
		expect(driver.testkit().gameLobby().element()).toBeInTheDocument()
	})

	it('should add player', async () => {
		useObjectValMock(gameMock)

		update.mockImplementation((newGame) => Promise.resolve(databaseState.setValue(newGame)))

		driver.render()
		driver.testkit().login().button().click()

		authState.onAuthStateChangedCallback(fakeUser)

		await wait(() => {
			expect(update).toHaveBeenCalledWith({
				players: [ ...gameMock.players, anUserToPlayer(fakeUser as unknown as User, PlayerRoles.Regular) ],
			})
		})

	})

	describe('should show loading', () => {
		it('when game is loading', () => {
			expect(driver.testkit().loading().message().text()).toEqual('Wait here, we are getting the game...')
		})

		it('when adding a player', async () => {
			useObjectValMock(gameMock)
			update.mockReturnValue(new Promise(res => { resolve = res }))

			driver.render()

			await wait(() => {
				driver.testkit().login().button().click()
			})

			authState.onAuthStateChangedCallback(fakeUser)

			await wait(() => {
				expect(driver.testkit().loading().message().text()).toEqual('Wait here, we are getting the game...')
			})

			resolve({})
		})
	})
})
