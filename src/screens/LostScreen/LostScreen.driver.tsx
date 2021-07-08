import { Driver, RenderResult, testUtils } from '@test-utils'
import {
	LostScreen, 
	ROOT_TEST_ID,
	LostScreenProps,
} from './LostScreen'

interface Params {
	props?: LostScreenProps
}

export function lostScreenDriver({ props }: Params = {}) {
	return new LostScreenDriver(props || {}, LostScreen)
}

export class LostScreenDriver extends Driver<LostScreenProps> {
	testkit() {
		return lostScreenTestkit(this.wrapper.container)
	}
}

export function lostScreenTestkit(container: RenderResult) {
	const testkit = {
		...testUtils(ROOT_TEST_ID, container, { keys: [ 'text' ] }),
	}

	return testkit
}
