import { Driver, RenderResult, testUtils, localStorageUtils } from '@test-utils'
import type { GameSubjects } from '@constants'
import {
	getSubjectTestId,
	INPUT_TEST_ID,
	SelectSubject,
	SelectSubjectProps,
} from './SelectSubject'

interface Params {
	props: SelectSubjectProps
}

export function selectSubjectDriver({ props }: Params) {
	return new SelectSubjectDriver(props, SelectSubject)
}

export class SelectSubjectDriver extends Driver<Params['props']> {
	testkit() {
		return selectSubjectTestkit(this.wrapper.container)
	}
}

export function selectSubjectTestkit(container: RenderResult) {
	const testkit = {
		input: () => testUtils(INPUT_TEST_ID, container, { keys: [ 'focus', 'type' ] }),
		subject: (value: GameSubjects) => testUtils(getSubjectTestId(value), container, { keys: [ 'click', 'text' ] }),
		localStorage: () => localStorageUtils('subject'),
	}

	return testkit
}
