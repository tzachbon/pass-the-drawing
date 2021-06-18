import { updateGame } from '@api'
import { Canvas } from '@components/Canvas'
import { useAsync } from '@hooks/useAsync'
import type { Game } from '@types'
import { isWordMatch } from '@utils/isWordMatch'
import { FormEventHandler, useCallback, useState } from 'react'
import { classes, st } from './GuessWordScreen.st.css'

export const ROOT_TEST_ID = 'GuessWordScreen_ROOT_TEST_ID'
export const DRAWS_CONTAINER_TEST_ID = 'GuessWordScreen_DRAWS_CONTAINER_TEST_ID'
export const TITLE_TEST_ID = 'GuessWordScreen_TITLE_TEST_ID'
export const INPUT_TEST_ID = 'GuessWordScreen_INPUT_TEST_ID'
export const BUTTON_TEST_ID = 'GuessWordScreen_BUTTON_TEST_ID'
export const getDrawTestId = (index: string) => 'GuessWordScreen_DRAW_TEST_ID_' + index

export interface GuessWordScreenProps {
	className?: string
	game: Game
}

export const GuessWordScreen: React.VFC<GuessWordScreenProps> = (
	{
		className,
		game,
	},
) => {
	const [ word, setWord ] = useState('')
	const { run, loading } = useAsync()

	const onSubmit: FormEventHandler<HTMLFormElement> = run(
		useCallback(
			async (event) => {
				event.preventDefault()

				if (loading) return

				const match = isWordMatch(game, word)

				await updateGame(
					game.id,
					{
						finished: true,
						endTime: Date.now(),
						isWon: match,
					},
				)
			},
			[ game, word, loading ],
		),
	)

	return (
		<form
			data-testid={ROOT_TEST_ID}
			className={st(classes.root, className)}
			onSubmit={onSubmit}
		>
			<h1
				data-testid={TITLE_TEST_ID}
			>
				Guess the word!
			</h1>
			<input
				data-testid={INPUT_TEST_ID}
				disabled={loading}
				placeholder={`What can it be? It is probably relates to ${game.subject}`}
				onChange={({ target }) => setWord(target.value)}
				value={word}
			/>
			<button
				data-testid={BUTTON_TEST_ID}
				disabled={loading || !word.length}
			>
				{/* eslint-disable-next-line react/no-unescaped-entities */}
				Let's find out!
			</button>
			<div
				data-testid={DRAWS_CONTAINER_TEST_ID}
				className={classes.drawsContainer}
			>
				{
					game
						.players
						.filter(player => Boolean(player.draw))
						.map((player, i) => (
							<div
								key={`${player.id!}_${player.draw!}`}
								data-testid={getDrawTestId(String(i))}
								className={classes.draw}
							>
								<Canvas
									initialDraw={player.draw}
									disabled
								/>
							</div>
						))
				}
			</div>
		</form>
	)
}
