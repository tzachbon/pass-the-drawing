import type { Game } from '@types'
import React, { useCallback } from 'react'
import { WordBoard } from '@components/WordBoard'
import { getRandomWord, updateGame } from '@api'
import { useAsync } from '@hooks/useAsync'
import { classes, st } from './GameLobby.st.css'

export interface GameLobbyProps {
	className?: string
	game: Game,
}

export const ROOT_TEST_ID = 'GameLobby_ROOT_TEST_ID'

export const GameLobby: React.VFC<GameLobbyProps> = ({
	className,
	game,
}) => {
	const { id, subject, word } = game
	const { run, loading } = useAsync()
	const onUpdateGame = run(
		useCallback(async () => {
			if (!subject) {
				throw new Error('Cannot create new word when game is undefined')
			}

			const word = await getRandomWord(subject)

			await updateGame(id, { word })
		}, [ subject, id ]),
	)

	return (
		<div
			className={st(classes.root, className)}
			data-testid={ROOT_TEST_ID}
		>
			<WordBoard
				loading={loading}
				word={word}
				updateWord={onUpdateGame}
			/>
		</div>
	)
}
