import type { Game, User } from '@types'
import { useMemo } from 'react'

interface Params {
  currentUser: User
  game: Game
}

export function useCurrentPlayer(
	{
		currentUser,
		game,
	}: Params) {
	const { currentPlayerIndex, currentPlayer } = useMemo(() => {
		const index = game.players.findIndex(player => player.id === currentUser.uid)
		const player = game.players[ index ]!

		return {
			currentPlayerIndex: index,
			currentPlayer: player,
		}
	}, [ game.players, currentUser.uid ])

	const isPlaying = game.currentPlayingIndex === currentPlayerIndex
	const currentPlayingPlayer = game.players[ game.currentPlayingIndex ?? 0 ]!

	return {
		currentPlayerIndex,
		currentPlayer,
		isPlaying,
		currentPlayingPlayer,
	}
}