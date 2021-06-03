import { gameLobbyTestkit } from '@components/GameLobby/GameLobby.driver'
import { Driver, RenderResult, testUtils } from '@test-utils'
import { LOADING_TEST_ID, Lobby, LobbyProps, LOGIN_BUTTON_TEST_ID, LOGIN_MESSAGE_TEST_ID, NO_GAME_MESSAGE_TEST_ID } from './Lobby'

interface Params {
	props?: LobbyProps
}

export function lobbyDriver({ props }: Params = {}) {
	return new LobbyDriver(props || {}, Lobby)
}

export class LobbyDriver extends Driver<NonNullable<Params['props']>> {
	testkit() {
		return lobbyTestkit(this.wrapper.container)
	}
}

export function lobbyTestkit(container: RenderResult) {
	const testkit = {
		loading: () => ({
			message: () => testUtils(LOADING_TEST_ID, container, { keys: [ 'text' ] }),
		}),
		login: () => ({
			message: () => testUtils(LOGIN_MESSAGE_TEST_ID, container, { keys: [ 'text' ] }),
			button: () => testUtils(LOGIN_BUTTON_TEST_ID, container, { keys: [ 'click' ] }),
		}),
		notFound: () => ({
			message: () => testUtils(NO_GAME_MESSAGE_TEST_ID, container, { keys: [ 'text' ] }),
			link: () => testUtils(NO_GAME_MESSAGE_TEST_ID, container, { keys: [ 'text', 'click' ] }),
		}),
		gameLobby: () => gameLobbyTestkit(container),
	}

	return testkit
}
