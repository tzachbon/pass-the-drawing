import { Driver, RenderResult, testUtils } from '@test-utils'
import {
	WonScreen, 
	ROOT_TEST_ID,
	WonScreenProps,
} from './WonScreen'

interface Params {
	props?: WonScreenProps
}

export function wonScreenDriver({ props }: Params = {}) {
	return new WonScreenDriver(props || {}, WonScreen)
}

export class WonScreenDriver extends Driver<WonScreenProps> {
	testkit() {
		return wonScreenTestkit(this.wrapper.container)
	}
}

export function wonScreenTestkit(container: RenderResult) {
	const testkit = {
		...testUtils(ROOT_TEST_ID, container, { keys: [ 'text' ] }),
	}

	return testkit
}
