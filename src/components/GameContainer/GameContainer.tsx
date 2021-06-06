import type { Game } from '@types'
import type React from 'react'
import { classes, st } from './GameContainer.st.css'

export interface GameContainerProps {
	className?: string
	game: Game
}


export const ROOT_TEST_ID = 'GameContainer_ROOT_TEST_ID'

export const GameContainer: React.VFC<GameContainerProps> = ({ className }) => {

	return (
		<div
			data-testid={ROOT_TEST_ID}
			className={st(classes.root, className)}
		>
			Game!
		</div>
	)
}

GameContainer.displayName = 'GameContainer'