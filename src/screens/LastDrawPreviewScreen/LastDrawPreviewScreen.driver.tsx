import { canvasTestkit } from '@components/Canvas/Canvas.driver'
import { Driver, RenderResult, testUtils } from '@test-utils'
import {
	LastDrawPreviewScreen,
	LastDrawPreviewScreenProps,
	ROOT_TEST_ID,
	TIMER_TEST_ID,
} from './LastDrawPreviewScreen'

interface Params {
	props: LastDrawPreviewScreenProps
}

export function lastDrawPreviewScreenDriver({ props }: Params) {
	return new LastDrawPreviewScreenDriver(props, LastDrawPreviewScreen)
}

export class LastDrawPreviewScreenDriver extends Driver<Params['props']> {
	testkit() {
		return lastDrawPreviewScreenTestkit(this.wrapper.container)
	}
}

export function lastDrawPreviewScreenTestkit(container: RenderResult) {
	const utils = testUtils(ROOT_TEST_ID, container)
	const testkit = {
		element: utils.element,
		timer: () => testUtils(TIMER_TEST_ID, container, { keys: [ 'text' ] }),
		canvas: () => canvasTestkit(container),
	}

	return testkit
}
