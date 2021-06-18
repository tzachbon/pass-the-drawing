import type React from 'react'
import type { Game, User } from '@types'
import { PlayScreen } from '@screens/PlayScreen'
import { StandbyScreen } from '@screens/StandbyScreen'
import { useCurrentPlayer } from '@hooks/useCurrentPlayer'
import { classes, st } from './GameContainer.st.css'
import { LostScreen } from '@screens/LostScreen'

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
	const {
		isPlaying,
		currentPlayer,
		currentPlayingPlayer,
	} = useCurrentPlayer({ currentUser, game })
	const { isWon, finished } = game

	return (
		<div
			data-testid={ROOT_TEST_ID}
			className={st(classes.root, className)}
		>
			{
				finished ? isWon ? (
					<div>TODO add win screen</div>
				) : (
					<LostScreen />
				) : isPlaying ? (
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