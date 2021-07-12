import { Canvas } from '@components/Canvas'
import { MAXIMUM_DRAW_PREVIEW_EXPIRE_TIME } from '@constants'
import type { Player } from '@types'
import { getExpireTimestamp } from '@utils/getExpireTimestamp'
import React, { useEffect } from 'react'
import { useTimer } from 'react-timer-hook'
import { classes, st } from './LastDrawPreviewScreen.st.css'

export interface LastDrawPreviewScreenProps {
	className?: string
	expireTime?: number
	lastPlayer: Player
	onFinished: () => void
}

export const TIMER_TEST_ID = 'LastDrawPreviewScreen_TIMER_TEST_ID'
export const ROOT_TEST_ID = 'LastDrawPreviewScreen_ROOT_TEST_ID'

export const LastDrawPreviewScreen: React.VFC<LastDrawPreviewScreenProps> = (
	{
		className,
		expireTime = MAXIMUM_DRAW_PREVIEW_EXPIRE_TIME,
		lastPlayer,
		onFinished,
	},
) => {

	const { seconds, start } = useTimer({
		expiryTimestamp: getExpireTimestamp(expireTime),
		onExpire: onFinished,
	})

	useEffect(() => {
		start()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])


	return (
		<div
			data-testid={ROOT_TEST_ID}
			className={st(classes.root, className)}
		>
			<h1
				data-testid={TIMER_TEST_ID}
			>
				{seconds}
			</h1>
			<Canvas
				initialDraw={lastPlayer.draw}
				disabled
			/>
		</div>
	)
}
