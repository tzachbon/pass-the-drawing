import { PlayerRoles, User } from '@types'
import { aGame, anUser, anUserToPlayer } from '@test-utils'
import { gameLobbyDriver } from './GameLobby.driver'
import { Routes } from '@constants'

const pushMock = jest.fn()
jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: pushMock,
    }),
}))

describe('GameLobby', () => {
    const currentUser = anUser() as User
    const player = anUserToPlayer(currentUser)
    let game = aGame({ players: [ player ] })
    const driver = gameLobbyDriver({
        props: { game, currentUser },
    }).beforeAndAfter()

    it('should render word board if current user is admin', () => {
        expect(player.role).toEqual(PlayerRoles.Admin)
        expect(driver.testkit().wordBoard().element()).toBeInTheDocument()
    })

    it('should not render word board if user is not admin', () => {
        const newPlayer = anUserToPlayer(currentUser, PlayerRoles.Regular)

        driver.withProps({ game: aGame({ players: [ newPlayer ] }) }).render()

        expect(driver.testkit().wordBoard().element()).not.toBeInTheDocument()
    })

    it('should render players', () => {
        expect(driver.testkit().players().element()).toBeInTheDocument()
    })

    it('should navigate to game page when the game ready', () => {
        game = aGame({
            started: true,
            players: [ anUserToPlayer(currentUser) ],
        })

        pushMock.mockClear()
        driver.withProps({ game }).render()

        expect(pushMock).toHaveBeenCalledWith(`${Routes.GAME}/${game.id}`)
    })

    it('should not navigate to game page when the game is not ready', () => {
        pushMock.mockClear()
        driver
            .withProps({
                game: aGame({
                    started: false,
                    players: [ anUserToPlayer(currentUser) ],
                }),
            })
            .render()

        expect(pushMock).not.toHaveBeenCalled()
    })

    it('should show start button if user is admin', () => {
        expect(player.role).toEqual(PlayerRoles.Admin)
        expect(driver.testkit().startGameButton().element()).toBeInTheDocument()
    })

    it('should hide start button if user is not admin', () => {
        const newPlayer = anUserToPlayer(currentUser, PlayerRoles.Regular)

        driver.withProps({ game: aGame({ players: [ newPlayer ] }) }).render()

        expect(
            driver.testkit().startGameButton().element(),
        ).not.toBeInTheDocument()
    })
})
