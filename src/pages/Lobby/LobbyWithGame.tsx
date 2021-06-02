import React, { useCallback } from 'react'
import type { Game } from '@types'
import { WordBoard } from '@components/WordBoard'
import { getRandomWord, updateGame } from '@api'
import { useAsync } from '@hooks/useAsync'

export interface LobbyWithGameProps {
	className?: string
	game: Game
}

export const LobbyWithGame: React.VFC<LobbyWithGameProps> = ({
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
		<div className={className}>
			<WordBoard
				loading={loading}
				word={word}
				updateWord={onUpdateGame}
			/>
		</div>
	)
}
