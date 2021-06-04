import { aGame, anUser, anUserToPlayer, wait } from '@test-utils'
import { PlayerRoles, User } from '@types'
import {
	authState,
	cleanup,
	databaseState,
	mockFirebase,
	ref,
	update,
	useObjectValMock,
} from '../../../tests/__mocks__/firebase'
import { lobbyDriver } from './Lobby.driver'

jest.mock('react-router', () => ({ match: jest.fn(), useParams: jest.fn().mockReturnValue({ id: '123' }) }))


mockFirebase()

describe('Lobby', () => {

	let resolve = (_: unknown) => { return _ }
	const gameMock = aGame()

	beforeEach(() => {
		useObjectValMock()
		cleanup()
	})

	const fakeUser = anUser()
	const driver = lobbyDriver({ props: {} }).beforeAndAfter()

	it('should call game route', () => {
		expect(ref).toBeCalledWith('games/123')
	})

	it('should show login screen', () => {
		expect(driver.testkit().loading().message().text()).toEqual('Wait here, we are getting the game...')
	})

	it.skip('should show game not found layout', () => {
		useObjectValMock(null)

		driver.render()

		expect(driver.testkit().notFound().message().text()).toEqual('We could not find this game :(')
		expect(driver.testkit().notFound().link().text()).toEqual('Create a new game')
		expect(driver.testkit().notFound().link().element()).toHaveAttribute('href', '/')
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
