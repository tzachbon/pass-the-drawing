import { updateGame } from '@api'
import { Canvas } from '@components/Canvas'
import { LastDrawPreviewScreen } from '@screens/LastDrawPreviewScreen'
import { MAXIMUM_DRAW_EXPIRE_TIME } from '@constants'
import type { Game, Player } from '@types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import type CanvasDraw from 'react-canvas-draw'
import { useTimer } from 'react-timer-hook'
import { classes, st } from './DrawScreen.st.css'
import { getExpireTimestamp } from '@utils/getExpireTimestamp'

export interface DrawScreenProps {
	className?: string
	game: Game
	currentPlayer: Player
	expireTime?: number
	shouldShowLastPlayerDraw?: boolean
}

export const TIMER_TEST_ID = 'DrawScreen_TIMER_TEST_ID'
export const ROOT_TEST_ID = 'DrawScreen_ROOT_TEST_ID'

export const DrawScreen: React.VFC<DrawScreenProps> = (
	{
		className,
		game: { id, players, currentPlayingIndex },
		currentPlayer,
		expireTime = MAXIMUM_DRAW_EXPIRE_TIME,
		shouldShowLastPlayerDraw = true,
	},
) => {
	const [ skipLastDrawPreview, setSkipLastDrawPreview ] = useState(shouldShowLastPlayerDraw)
	const lastPlayer = players[ currentPlayingIndex - 1 ]
	const onExpire = useCallback(async () => {
		await updateGame(
			id,
			{ currentPlayingIndex: currentPlayingIndex + 1 },
		)
	}, [ id, currentPlayingIndex ])

	const { seconds, start } = useTimer({
		expiryTimestamp: getExpireTimestamp(expireTime),
		onExpire,
	})

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

	const onFinishedLastPlayerDraw = useCallback(
		() => {
			setSkipLastDrawPreview(false)
		},
		[],
	)

	const showLastDrawPreview = useMemo(() => (
		skipLastDrawPreview && lastPlayer?.draw
	), [ lastPlayer?.draw, skipLastDrawPreview ])

	useEffect(() => {
		if (!showLastDrawPreview) {
			start()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ showLastDrawPreview ])



	return (
		<div
			data-testid={ROOT_TEST_ID}
			className={st(classes.root, className)}
		>
			{
				skipLastDrawPreview && lastPlayer?.draw ? (
					<LastDrawPreviewScreen
						lastPlayer={lastPlayer}
						onFinished={onFinishedLastPlayerDraw}
					/>
				) : (
					<>
						<h1
							data-testid={TIMER_TEST_ID}
						>
							{seconds}
						</h1>
						<Canvas
							initialDraw={currentPlayer.draw}
							onCanvasChange={onCanvasChange}
						/>
					</>
				)
			}
		</div>
	)
}