import { updateGame } from '@api'
import type { Game, Player } from '@types'
import React, { useCallback } from 'react'
import type CanvasDraw from 'react-canvas-draw'
import { Canvas } from '@components/Canvas'
import { classes, st } from './DrawScreen.st.css'

export interface DrawScreenProps {
	className?: string
	game: Game
	currentPlayer: Player
}


export const ROOT_TEST_ID = 'DrawScreen_ROOT_TEST_ID'

export const DrawScreen: React.VFC<DrawScreenProps> = (
	{
		className,
		game: { id, players },
		currentPlayer,
	},
) => {

	const onCanvasChange = useCallback(
		async (event: CanvasDraw) => {
			const draw = event.getSaveData()
			const updatedPlayers = players.map(
				(player) => player.id === currentPlayer.id ? ({
					...player,
					draw,
				}) : player,
			)

			await updateGame(
				id,
				{ players: updatedPlayers },
			)
		},
		[ id, players, currentPlayer.id ],
	)


	return (
		<div
			data-testid={ROOT_TEST_ID}
			className={st(classes.root, className)}
		>
			<Canvas
				initialDraw={currentPlayer.draw}
				onCanvasChange={onCanvasChange}
			/>
		</div>
	)
}