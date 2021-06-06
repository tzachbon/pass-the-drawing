import { updateGame } from '@api'
import { MINIMUM_PLAYERS_LENGTH } from '@constants'
import { useAsync } from '@hooks/useAsync'
import type { Game } from '@types'
import { useCallback, useMemo } from 'react'
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
			},
			[ id ],
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
