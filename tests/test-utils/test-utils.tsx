import { fireEvent, RenderResult } from '@testing-library/react'

export function testUtils(testId: string, container: RenderResult) {
	const utils = {
		element: () => container.queryByTestId(testId),
		notExistsError: () => new Error('Element does not exists: ' + testId),
		_element: () => {
			const el = utils.element()
			if (!el) {
				throw utils.notExistsError()
			}

			return el
		},
		click: () => fireEvent.click(utils._element()),
		focus: () => fireEvent.focusIn(utils._element()),
		type: (value: string) =>
			fireEvent.input(utils._element(), { target: { value } }),
	}

	return utils
}
