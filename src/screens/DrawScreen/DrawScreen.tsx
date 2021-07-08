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
	previewExpireTime?: number
}

export const TIMER_TEST_ID = 'DrawScreen_TIMER_TEST_ID'
export const ROOT_TEST_ID = 'DrawScreen_ROOT_TEST_ID'

export const DrawScreen: React.VFC<DrawScreenProps> = (
	{
		className,
		game: { id, players, currentPlayingIndex },
		currentPlayer,
		expireTime = MAXIMUM_DRAW_EXPIRE_TIME,
		previewExpireTime,
	},
) => {
	const [ skipLastDrawPreview, setSkipLastDrawPreview ] = useState(true)
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

            await updateGame(id, { players: updatedPlayers })
        },
        [ id, players, currentPlayer.id ],
    )

    useEffect(() => {
        start()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
				showLastDrawPreview ? (
					<LastDrawPreviewScreen
						lastPlayer={lastPlayer!}
						onFinished={onFinishedLastPlayerDraw}
						expireTime={previewExpireTime}
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
