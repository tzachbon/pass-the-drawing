import { useCurrentPlayer } from '@hooks/useCurrentPlayer'
import { aGame, anUser, anUserToPlayer, aPlayer } from '@test-utils'
import { renderHook } from '@testing-library/react-hooks'
import type { Game, User } from '@types'

describe('useCurrentPlayer', () => {
    const currentUser = anUser({ displayName: 'current' }) as User
    const currentPlayer = anUserToPlayer(currentUser)
    const anotherPlayer = aPlayer({ name: 'another' })
    let game: Game

    beforeEach(() => {
        game = aGame({ players: [ currentPlayer, anotherPlayer ] })
    })

    it('should get current player when the current user is playing', () => {
        const { result } = renderHook(() =>
            useCurrentPlayer({ currentUser, game }),
        )

        expect(game.currentPlayingIndex).toEqual(0)
        expect(result.current.currentPlayer).toEqual(currentPlayer)
        expect(result.current.currentPlayerIndex).toEqual(0)
        expect(result.current.isPlaying).toBeTruthy()
        expect(result.current.currentPlayingPlayer).toEqual(currentPlayer)
    })

    it('should get current player when another player is playing', () => {
        game.currentPlayingIndex++

        const { result } = renderHook(() =>
            useCurrentPlayer({ currentUser, game }),
        )

        expect(game.currentPlayingIndex).toEqual(1)
        expect(result.current.currentPlayer).toEqual(currentPlayer)
        expect(result.current.currentPlayerIndex).toEqual(0)
        expect(result.current.isPlaying).toBeFalsy()
        expect(result.current.currentPlayingPlayer).toEqual(anotherPlayer)
    })

    it('should get undefined when currentPlayingIndex is bigger then the amount of players', () => {
        game.currentPlayingIndex = game.players.length

        const { result } = renderHook(() =>
            useCurrentPlayer({ currentUser, game }),
        )

        expect(game.currentPlayingIndex).toEqual(2)
        expect(result.current.currentPlayer).toEqual(currentPlayer)
        expect(result.current.currentPlayerIndex).toEqual(0)
        expect(result.current.isPlaying).toBeFalsy()
        expect(result.current.currentPlayingPlayer).toBeUndefined()
    })
})
