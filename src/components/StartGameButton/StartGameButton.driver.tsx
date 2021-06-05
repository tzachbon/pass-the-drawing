import { Driver, Options, RenderResult, testUtils } from '@test-utils'
import { BUTTON_TEST_ID, ROOT_TEST_ID, StartGameButton, StartGameButtonProps } from './StartGameButton'

interface Params {
	props: StartGameButtonProps
	stylesheet?: NonNullable<Options['stylesheet']>
}

export function startGameButtonDriver({ props, stylesheet }: Params) {
	return new StartGameButtonDriver(props, StartGameButton, { stylesheet })
}

export class StartGameButtonDriver extends Driver<Params['props']> {
	testkit() {
		return startGameButtonTestkit(this.wrapper.container)
	}
}

export function startGameButtonTestkit(container: RenderResult) {
	const utils = testUtils(ROOT_TEST_ID, container)

	const testkit = {
		element: utils.element,
		button: () => testUtils(BUTTON_TEST_ID, container, { keys: [ 'text', 'click', 'disabled' ] }),
	}

	return testkit
}
