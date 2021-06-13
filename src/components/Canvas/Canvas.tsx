import React, { useEffect, useRef } from 'react'
import CanvasDraw from 'react-canvas-draw'

export interface CanvasProps {
	onCanvasChange: (event: CanvasDraw) => Promise<unknown> | unknown
	initialDraw: string | undefined
}

export const ROOT_TEST_ID = 'Canvas_ROOT_TEST_ID'

export const Canvas: React.VFC<CanvasProps> = (
	{
		onCanvasChange,
		initialDraw,
	},
) => {
	const canvas = useRef<CanvasDraw>(null)

	useEffect(() => {
		if (initialDraw) {
			canvas.current?.loadSaveData(initialDraw)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div
			data-testid={ROOT_TEST_ID}
		>
			<CanvasDraw
				ref={canvas}
				brushRadius={5}
				lazyRadius={1}
				hideGrid
				hideInterface
				onChange={onCanvasChange}
			/>
		</div>
	)
}
