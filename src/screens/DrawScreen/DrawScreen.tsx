import { updateGame } from '@api'
import { Canvas } from '@components/Canvas'
import { MAXIMUM_EXPIRE_TIME } from '@constants'
import type { Game, Player } from '@types'
import React, { useCallback, useEffect } from 'react'
import type CanvasDraw from 'react-canvas-draw'
import { useTimer } from 'react-timer-hook'
import { classes, st } from './DrawScreen.st.css'

export interface DrawScreenProps {
    className?: string
    game: Game
    currentPlayer: Player
    expireTime?: number
}

export const TIMER_TEST_ID = 'DrawScreen_TIMER_TEST_ID'
export const ROOT_TEST_ID = 'DrawScreen_ROOT_TEST_ID'

export const DrawScreen: React.VFC<DrawScreenProps> = ({
    className,
    game: { id, players, currentPlayingIndex },
    currentPlayer,
    expireTime = MAXIMUM_EXPIRE_TIME,
}) => {
    const onExpire = useCallback(async () => {
        await updateGame(id, { currentPlayingIndex: currentPlayingIndex + 1 })
    }, [ id, currentPlayingIndex ])

    const { seconds, start } = useTimer({
        expiryTimestamp: getExpireTime(expireTime),
        onExpire,
    })

    const onCanvasChange = useCallback(
        async (event: CanvasDraw) => {
            const draw = event.getSaveData()
            const updatedPlayers = players.map((player) =>
                player.id === currentPlayer.id
                    ? {
                        ...player,
                        draw,
                    }
                    : player,
            )

            await updateGame(id, { players: updatedPlayers })
        },
        [ id, players, currentPlayer.id ],
    )

    useEffect(() => {
        start()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div
            data-testid={ROOT_TEST_ID}
            className={st(classes.root, className)}
        >
            <h1 data-testid={TIMER_TEST_ID}>{seconds}</h1>
            <Canvas
                initialDraw={currentPlayer.draw}
                onCanvasChange={onCanvasChange}
            />
        </div>
    )
}

function getExpireTime(expireTime: number) {
    const time = new Date()
    time.setSeconds(time.getSeconds() + expireTime)

    return time.getTime()
}
