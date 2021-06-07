import { GameContainer } from '@components/GameContainer'
import { useAuth } from '@hooks/useAuth'
import { useGame } from '@hooks/useGame'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { classes, st } from './Game.st.css'

export interface GameProps {
	className?: string
}

export const ROOT_TEST_ID = 'Game_ROOT_TEST_ID'
export const LOADING_TEST_ID = 'Game_LOADING_TEST_ID'
export const NOT_FOUND_TEST_ID = 'Game_NOT_FOUND_TEST_ID'

export const Game: React.FC<GameProps> = (
	{
		className,
	},
) => {
	const { id } = useParams<{ id: string }>()
	const { game, loading } = useGame({ id })
	const { currentUser } = useAuth()

	const showGame = useMemo(
		() => game?.players?.find(player => player.id === currentUser?.uid),
		[ game?.players, currentUser?.uid ],
	)

	return (
		<div
			data-testid={ROOT_TEST_ID}
			className={st(classes.root, className)}
		>
			{
				loading ? (
					<span
						data-testid={LOADING_TEST_ID}
					>
						Loading...
					</span>
				) : showGame ? (
					<GameContainer
						game={game!}
						currentUser={currentUser!}
					/>
				) : (
					<span
						data-testid={NOT_FOUND_TEST_ID}
					>
						Cannot find any game for you, please go back and start a new one
					</span>
				)
			}
		</div>
	)
}
