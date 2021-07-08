import React, { useCallback, useEffect } from 'react'
import { AuthModal } from '@components/AuthModal'
import { useGame } from '@hooks/useGame'
import { useParams } from 'react-router'
import { classes, st } from './Lobby.st.css'
import { useAuth } from '@hooks/useAuth'
import { anUserToPlayer, updateGame } from '@api'
import { useAsync } from '@hooks/useAsync'
import { Player, PlayerRoles } from '@types'
import { GameLobby } from '@components/GameLobby'
import { NavLink } from 'react-router-dom'
import { useAuthModalState } from '@hooks/useAuthModalState'

export interface LobbyProps {
    className?: string
}

export const ROOT_TEST_ID = 'Lobby_ROOT_TEST_ID'
export const LOADING_TEST_ID = 'Lobby_LOADING_TEST_ID'
export const LOGIN_MESSAGE_TEST_ID = 'Lobby_LOGIN_MESSAGE_TEST_ID'
export const OPEN_MODAL_BUTTON_TEST_ID = 'Lobby_OPEN_MODAL_BUTTON_TEST_ID'
export const GAME_LOBBY_TEST_ID = 'Lobby_GAME_LOBBY_TEST_ID'
export const NO_GAME_MESSAGE_TEST_ID = 'Lobby_NO_GAME_MESSAGE_TEST_ID'
export const NO_GAME_LINK_TEST_ID = 'Lobby_NO_GAME_LINK_TEST_ID'

export const Lobby: React.VFC<LobbyProps> = ({ className }) => {
    const { id } = useParams<{ id: string }>()
    const { game, loading, error } = useGame({ id })
    const { currentUser } = useAuth()
    const { onCloseModal, onOpenModal, openModel } = useAuthModalState()
    const { run, error: addPlayerError, loading: addPlayerLoading } = useAsync()

    const addPlayer = run(
        useCallback(
            () =>
                game &&
                currentUser &&
                updateGame(id, {
                    players: [
                        ...game.players,
                        anUserToPlayer(currentUser, PlayerRoles.Regular),
                    ],
                }),
            [ id, game, currentUser ],
        ),
    )

    useEffect(() => {
        const isPlayerExists = game?.players.find(
            (player: Player) => player.id === currentUser?.uid,
        )

        if (game && currentUser && !isPlayerExists) {
            void addPlayer()
        }
    }, [ currentUser, addPlayer, game ])

    if (error || addPlayerError) {
        throw error || addPlayerError
    }

    return (
        <>
            <div
                className={st(classes.root, className)}
                data-testid={ROOT_TEST_ID}
            >
                {addPlayerLoading || loading || game === undefined ? (
                    <span data-testid={LOADING_TEST_ID}>
                        Wait here, we are getting the game...
                    </span>
                ) : game === null ? (
                    <>
                        <span data-testid={NO_GAME_MESSAGE_TEST_ID}>
                            We could not find this game :(
                        </span>
                        <NavLink
                            data-testid={NO_GAME_LINK_TEST_ID}
                            to="/"
                        >
                            Create a new game
                        </NavLink>
                    </>
                ) : currentUser ? (
                    <GameLobby
                        game={game}
                        currentUser={currentUser}
                    />
                ) : (
                    <>
                        <h1 data-testid={LOGIN_MESSAGE_TEST_ID}>
                            You need to be logged in to play the game :)
                        </h1>
                        <button
                            data-testid={OPEN_MODAL_BUTTON_TEST_ID}
                            onClick={onOpenModal}
                        >
                            Click here to sign in
                        </button>
                    </>
                )}
            </div>
            <AuthModal
                isOpen={openModel}
                onCloseModal={onCloseModal}
            />
        </>
    )
}
