import { Driver, RenderResult, testUtils } from '@test-utils'
import type { GameSubjects } from 'src/constants'
import { getSubjectTestId, INPUT_TEST_ID, SelectSubject, SelectSubjectProps } from './SelectSubject'

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
		input: () => {
			const utils = testUtils(INPUT_TEST_ID, container)

			return {
				element: utils.element,
				focus: utils.focus,
				type: utils.type,
			}
		},

		subject: (value: GameSubjects) => {
			const utils = testUtils(getSubjectTestId(value), container)
			
			return {
				element: utils.element,
				click: utils.click,
			}
		},

	}

	return testkit
}