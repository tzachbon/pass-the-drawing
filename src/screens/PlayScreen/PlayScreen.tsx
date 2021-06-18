import { DrawScreen } from '@screens/DrawScreen'
import { GuessWordScreen } from '@screens/GuessWordScreen'
import type { Game, Player } from '@types'
import React, { useMemo } from 'react'
import { classes, st } from './PlayScreen.st.css'

export interface PlayScreenProps {
	className?: string
	game: Game
	currentPlayer: Player
}


export const ROOT_TEST_ID = 'PlayScreen_ROOT_TEST_ID'

export const PlayScreen: React.VFC<PlayScreenProps> = (
	{
		className,
		currentPlayer,
		game,
	},
) => {
	const isLastPlayer = useMemo(
		() => game.players[ game.players.length - 1 ]?.id === currentPlayer.id,
		[ game.players, currentPlayer.id ],
	)

	return (
		<div
			data-testid={ROOT_TEST_ID}
			className={st(classes.root, className)}
		>
			{
				isLastPlayer ? (
					<GuessWordScreen game={game} />
				) : (
					<DrawScreen
						game={game}
						currentPlayer={currentPlayer}
					/>
				)
			}
		</div>
	)
}