import { Driver, fireEvent } from '@test-utils'
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
		const notExistsError = (id: string) => new Error('Element does not exists: ' + id)
		const testkit = {
			input: () => {
				const element = () => this.wrapper.container.queryByTestId(INPUT_TEST_ID)

				return {
					element,
					focus: () => {
						const el = element()
						if (!el) {
							throw notExistsError(INPUT_TEST_ID)
						}

						return fireEvent.focusIn(el)
					},
					type: (value: string) => {
						const el = element()
						if (!el) {
							throw notExistsError(INPUT_TEST_ID)
						}

						fireEvent.input(el, {
							target: {
								value,
							},
						})
					},
				}
			},

			subject: (value: GameSubjects) => {
				const element = () => this.wrapper.container.queryByTestId(getSubjectTestId(value))

				return {
					element,
					click: () => {
						const el = element()
						if (!el) {
							throw notExistsError(INPUT_TEST_ID)
						}

						fireEvent.click(el)
					},
				}
			},

		}

		return testkit
	}
}