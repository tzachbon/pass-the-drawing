import { aGame, anUser, anUserToPlayer, aPlayer, waitFor } from '@test-utils'
import type { User } from '@types'
import {
    authState,
    cleanup,
    on,
    useObjectValMock,
} from '../../../tests/__mocks__/firebase'
import { gameDriver } from './Game.driver'

describe('Game', () => {
    let resolve = (value: unknown) => value
    const notPlayingUser = anUser()
    const playingUser = anUser()
    const players = [ anUserToPlayer(playingUser as User), aPlayer() ]
    const game = aGame({ players })
    const driver = gameDriver().beforeAndAfter()

    it('should show loading layout', () => {
        void cleanup()
        on.mockResolvedValue(
            new Promise((res) => {
                resolve = res
            }),
        )

        driver.render()

        expect(driver.testkit().loading().text()).toEqual('Loading...')

        resolve({})
    })

    describe('not found', () => {
        beforeEach(() => {
            void cleanup()
            useObjectValMock(game)

            driver.render()
        })

        it('should not show game not found when playing user is logged in', async () => {
            await waitFor(() => {
                authState.onAuthStateChangedCallback(playingUser)
            })

            expect(
                driver.testkit().gameContainer().element(),
            ).toBeInTheDocument()
            expect(driver.testkit().loading().element()).not.toBeInTheDocument()
            expect(
                driver.testkit().notFound().element(),
            ).not.toBeInTheDocument()
        })

        it('should show game not found', async () => {
            await waitFor(() => {
                authState.onAuthStateChangedCallback(notPlayingUser)
            })

            expect(driver.testkit().notFound().text()).toEqual(
                'Cannot find any game for you, please go back and start a new one',
            )
        })

        it('should show game not found when a player does not exists', () => {
            expect(driver.testkit().notFound().text()).toEqual(
                'Cannot find any game for you, please go back and start a new one',
            )
        })
    })
})
