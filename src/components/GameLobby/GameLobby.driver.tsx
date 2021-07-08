import { playersTestkit } from '@components/Players/Players.driver'
import { startGameButtonTestkit } from '@components/StartGameButton/StartGameButton.driver'
import { WordBoardTestkit } from '@components/WordBoard/WordBoard.driver'
import { Driver, RenderResult, testUtils } from '@test-utils'
import { GameLobby, GameLobbyProps, ROOT_TEST_ID } from './GameLobby'

interface Params {
    props: GameLobbyProps
}

export function gameLobbyDriver({ props }: Params) {
    return new GameLobbyDriver(props, GameLobby)
}

export class GameLobbyDriver extends Driver<Params['props']> {
    testkit() {
        return gameLobbyTestkit(this.wrapper.container)
    }
}

export function gameLobbyTestkit(container: RenderResult) {
    const testkit = {
        element: () =>
            testUtils(ROOT_TEST_ID, container, { keys: [] }).element(),
        wordBoard: () => WordBoardTestkit(container),
        players: () => playersTestkit(container),
        startGameButton: () => startGameButtonTestkit(container),
    }

    return testkit
}
