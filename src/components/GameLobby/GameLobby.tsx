import { Game, PlayerRoles, User } from '@types'
import React, { useCallback, useEffect } from 'react'
import { WordBoard } from '@components/WordBoard'
import { getRandomWord, updateGame } from '@api'
import { useAsync } from '@hooks/useAsync'
import { classes, st } from './GameLobby.st.css'
import { Players } from '@components/Players/Players'
import { StartGameButton } from '@components/StartGameButton'
import { useHistory } from 'react-router-dom'
import { Routes } from '@constants'
import { useCurrentPlayer } from '@hooks/useCurrentPlayer'

export interface GameLobbyProps {
    className?: string
    game: Game
    currentUser: User
}

export const ROOT_TEST_ID = 'GameLobby_ROOT_TEST_ID'

export const GameLobby: React.VFC<GameLobbyProps> = ({
    className,
    game,
    currentUser,
}) => {
    const { id, subject, word, started } = game
    const { run, loading } = useAsync()
    const { push } = useHistory()
    const { role } = useCurrentPlayer({ currentUser, game })
    const onUpdateGame = run(
        useCallback(async () => {
            if (!subject) {
                throw new Error('Cannot create new word when game is undefined')
            }

            const word = await getRandomWord(subject)

            await updateGame(id, { word })
        }, [ subject, id ]),
    )

    useEffect(() => {
        if (started) {
            push(`${Routes.GAME}/${id}`)
        }
    }, [ started, id, push ])

    return (
        <div
            className={st(classes.root, className)}
            data-testid={ROOT_TEST_ID}
        >
            {role === PlayerRoles.Admin && (
                <WordBoard
                    loading={loading}
                    word={word}
                    updateWord={onUpdateGame}
                />
            )}
            <Players
                currentPlayerId={currentUser.uid}
                players={game.players}
            />
            {role === PlayerRoles.Admin && <StartGameButton game={game} />}
        </div>
    )
}
