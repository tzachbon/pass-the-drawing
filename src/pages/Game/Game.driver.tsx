import { Driver, RenderResult, testUtils } from '@test-utils'
import { Game, GameProps, LOADING_TEST_ID, NOT_FOUND_TEST_ID, ROOT_TEST_ID } from './Game'
import { gameContainerTestkit } from '@components/GameContainer/GameContainer.driver'

interface Params {
	props?: GameProps
}

export function gameDriver({ props }: Params = {}) {
	return new GameDriver(props || {}, Game)
}

export class GameDriver extends Driver<GameProps> {
	testkit() {
		return gameTestkit(this.wrapper.container)
	}
}

export function gameTestkit(container: RenderResult) {
	const testkit = {
		element: () => testUtils(ROOT_TEST_ID, container, { keys: [] }).element(),
		loading: () => testUtils(LOADING_TEST_ID, container, { keys: [ 'text' ] }),
		notFound: () => testUtils(NOT_FOUND_TEST_ID, container, { keys: [ 'text' ] }),
		gameContainer: () => gameContainerTestkit(container),
	}

	return testkit
}
