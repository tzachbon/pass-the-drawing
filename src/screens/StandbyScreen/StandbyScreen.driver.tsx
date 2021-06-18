import { Driver, RenderResult, testUtils } from '@test-utils'
import {
	StandbyScreen, ROOT_TEST_ID,
	StandbyScreenProps,
} from './StandbyScreen'

interface Params {
	props: StandbyScreenProps
}

export function standbyScreenDriver({ props }: Params) {
	return new StandbyScreenDriver(props, StandbyScreen)
}

export class StandbyScreenDriver extends Driver<Params['props']> {
	testkit() {
		return standbyScreenTestkit(this.wrapper.container)
	}
}

export function standbyScreenTestkit(container: RenderResult) {
	const testkit = {
		...testUtils(ROOT_TEST_ID, container, { keys: [ 'text' ] }),
	}

	return testkit
}
