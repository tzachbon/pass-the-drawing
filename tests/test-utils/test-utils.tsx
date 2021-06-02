import { fireEvent, RenderResult } from '@testing-library/react'

interface Utils {
	element: () => HTMLElement | null;
	notExistsError: () => Error;
	_element: () => HTMLElement;
	click: () => boolean;
	focus: () => boolean;
	type: (value: string) => boolean;
	text: () => string;
}

type UtilsKeys = keyof Utils
interface TestUtilsOptions<K extends UtilsKeys> {
	keys?: K[]
}

export function testUtils<K extends UtilsKeys>(
	testId: string,
	container: RenderResult,
	options?: TestUtilsOptions<K>,
) {
	const { keys } = options || {}
	const utils: Utils = {
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
		text: () => utils._element().innerText,
		type: (value: string) =>
			fireEvent.input(utils._element(), { target: { value } }),
	}

	if (keys) {
		const filteredUtils = Object.fromEntries(
			Object.entries(utils).filter(
				([ key ]) => ([ ...keys, 'element' ] as K[]).includes(key as K),
			),
		) as Pick<Utils, K | 'element'>

		return filteredUtils
	} else {
		return utils
	}
}
