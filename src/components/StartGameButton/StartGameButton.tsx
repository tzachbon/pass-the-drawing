import type { Game } from '@types'
import { updateGame } from '@api'
import { MINIMUM_PLAYERS_LENGTH, Routes } from '@constants'
import { useAsync } from '@hooks/useAsync'
import { useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { classes, st } from './StartGameButton.st.css'

export interface StartGameButtonProps {
	classNames?: string
	game: Game
}

export const ROOT_TEST_ID = 'StartGameButton_ROOT_TEST_ID'
export const BUTTON_TEST_ID = 'StartGameButton_BUTTON_TEST_ID'

export const StartGameButton: React.VFC<StartGameButtonProps> = (
	{
		classNames,
		game: { id, players },
	},
) => {
	const invalidPlayersLength = useMemo(() => players.length < MINIMUM_PLAYERS_LENGTH, [ players.length ])
	const { run, loading } = useAsync()
	const { push } = useHistory()

	const onStartGame = run(
		useCallback(
			async () => {
				await updateGame(
					id,
					{
						startTime: Date.now(),
						started: true,
					},
				)
				
				push(`${Routes.GAME}/${id}`)
			},
			[ id, push ],
		),
	)

	return (
		<div
			className={st(classes.root, classNames)}
			data-testid={ROOT_TEST_ID}
		>
			<button
				data-testid={BUTTON_TEST_ID}
				className={classes.button}
				disabled={invalidPlayersLength || loading}
				onClick={onStartGame}
			>
				Start Game!
			</button>
		</div>
	)
}
