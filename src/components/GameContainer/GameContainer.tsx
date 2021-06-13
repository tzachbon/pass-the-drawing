import { PlayScreen } from '@components/PlayScreen'
import { StandbyScreen } from '@components/StandbyScreen'
import type { Game, User } from '@types'
import React, { useMemo } from 'react'
import { classes, st } from './GameContainer.st.css'

export interface GameContainerProps {
	className?: string
	game: Game
	currentUser: User
}


export const ROOT_TEST_ID = 'GameContainer_ROOT_TEST_ID'

export const GameContainer: React.VFC<GameContainerProps> = (
	{
		className,
		game,
		currentUser,
	},
) => {
	const { currentIndex, currentPlayer } = useMemo(() => {
		const index = game.players.findIndex(player => player.id === currentUser.uid)
		const player = game.players[ index ]!

		return {
			currentIndex: index,
			currentPlayer: player,
		}
	}, [ game.players, currentUser.uid ])

	const isPlaying = game.currentPlayingIndex === currentIndex
	const currentPlayingPlayer = game.players[ game.currentPlayingIndex || 0 ]!

	return (
		<div
			data-testid={ROOT_TEST_ID}
			className={st(classes.root, className)}
		>
			{
				isPlaying ? (
					<PlayScreen
						game={game}
						currentPlayer={currentPlayer}
					/>
				) : (
					<StandbyScreen currentPlayingPlayer={currentPlayingPlayer} />
				)
			}
		</div>
	)
}