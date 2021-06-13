import { playScreenTestkit } from '@components/PlayScreen/PlayScreen.driver'
import { standbyScreenTestkit } from '@components/StandbyScreen/StandbyScreen.driver'
import { Driver, RenderResult, testUtils } from '@test-utils'
import { GameContainer, GameContainerProps, ROOT_TEST_ID } from './GameContainer'

interface Params {
	props: GameContainerProps
}

export function gameContainerDriver({ props }: Params) {
	return new GameContainerDriver(props || {}, GameContainer)
}

export class GameContainerDriver extends Driver<Params['props']> {
	testkit() {
		return gameContainerTestkit(this.wrapper.container)
	}
}

export function gameContainerTestkit(container: RenderResult) {
	const testkit = {
		element: () => testUtils(ROOT_TEST_ID, container, { keys: [] }).element(),
		standbyScreen: () => standbyScreenTestkit(container),
		playScreen: () => playScreenTestkit(container),
	}

	return testkit
}
