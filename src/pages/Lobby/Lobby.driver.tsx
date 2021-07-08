import { authModalTestkit } from '@components/AuthModal/AuthModal.driver'
import { gameLobbyTestkit } from '@components/GameLobby/GameLobby.driver'
import { Routes } from '@constants'
import { Driver, Options, RenderResult, testUtils } from '@test-utils'
import { Route } from 'react-router'
import {
    LOADING_TEST_ID,
    Lobby,
    LobbyProps,
    LOGIN_MESSAGE_TEST_ID,
    NO_GAME_LINK_TEST_ID,
    NO_GAME_MESSAGE_TEST_ID,
    OPEN_MODAL_BUTTON_TEST_ID,
} from './Lobby'

interface Params {
    props?: LobbyProps
    initialRoute?: Options['initialRoute']
}

const LobbyMock: React.ComponentType<Params['props']> = (props) => (
    <Route
        path={`${Routes.LOBBY}/:id`}
        exact
    >
        <Lobby {...props} />
    </Route>
)

export function lobbyDriver({ props, initialRoute }: Params) {
    return new LobbyDriver(props || {}, LobbyMock, { initialRoute })
}

export class LobbyDriver extends Driver<NonNullable<Params['props']>> {
    testkit() {
        return lobbyTestkit(this.wrapper.container)
    }
}

export function lobbyTestkit(container: RenderResult) {
    const testkit = {
        loading: () => ({
            message: () =>
                testUtils(LOADING_TEST_ID, container, { keys: [ 'text' ] }),
        }),
        login: () => ({
            message: () =>
                testUtils(LOGIN_MESSAGE_TEST_ID, container, { keys: [ 'text' ] }),
            modal: () => {
                const { click, ...modalUtils } = testUtils(
                    OPEN_MODAL_BUTTON_TEST_ID,
                    container,
                    { keys: [ 'click' ] },
                )

                return {
                    open: click,
                    ...modalUtils,
                    ...authModalTestkit(container),
                }
            },
        }),
        notFound: () => ({
            message: () =>
                testUtils(NO_GAME_MESSAGE_TEST_ID, container, {
                    keys: [ 'text' ],
                }),
            link: () =>
                testUtils(NO_GAME_LINK_TEST_ID, container, {
                    keys: [ 'text', 'click' ],
                }),
        }),
        gameLobby: () => gameLobbyTestkit(container),
    }

    return testkit
}
