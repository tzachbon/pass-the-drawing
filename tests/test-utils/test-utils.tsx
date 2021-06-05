import { fireEvent, RenderResult } from '@testing-library/react'

interface Utils {
	element: () => HTMLElement | null;
	notExistsError: () => Error;
	_element: () => HTMLElement;
	click: () => boolean;
	focus: () => boolean;
	type: (value: string) => boolean;
	text: () => string | null;
	disabled: () => boolean;
	hasAttribute: (attr: string) => boolean
	getAttribute: (attr: string) => string | null
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
		notExistsError: () => new Error(`Element does not exist: ${testId}. \nCurrent HTML: \n ${container.container.innerHTML}`),
		_element: () => {
			const el = utils.element()
			if (!el) {
				throw utils.notExistsError()
			}

			return el
		},
		click: () => fireEvent.click(utils._element()),
		focus: () => fireEvent.focusIn(utils._element()),
		text: () => utils._element().textContent,
		hasAttribute: (attr: string) => utils._element().hasAttribute(attr),
		getAttribute: (attr: string) => utils._element().getAttribute(attr),
		type: (value: string) =>
			fireEvent.input(utils._element(), { target: { value } }),
		disabled: () => utils.hasAttribute('disabled'),
	}

	if (keys) {
		type KeysWithElement = K | 'element'

		const filteredUtils = Object.fromEntries(
			Object.entries(utils).filter(
				([ key ]) => ([ ...keys, 'element' ] as KeysWithElement[]).includes(key as K),
			),
		) as Pick<Utils, KeysWithElement>

		return filteredUtils
	} else {
		return utils
	}
}


export function localStorageCleanup() {
	window.localStorage.clear()
}

export function localStorageUtils(key: string) {
	return {
		get: () => localStorage.getItem(key),
		set: (value: string) => localStorage.setItem(key, value),
	}
}