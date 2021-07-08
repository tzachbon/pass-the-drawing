import { fireEvent, RenderResult } from '@testing-library/react'

interface Utils {
    element: () => HTMLElement | null
    notExistsError: () => Error
    _element: () => HTMLElement
    click: () => boolean
    focus: () => boolean
    type: (value: string) => boolean
    text: () => string | null
    disabled: () => boolean
    hasAttribute: (attr: string) => boolean
    getAttribute: (attr: string) => string | null
    placeholder: () => string | null
    value: () => string | null
}

type UtilsKeys = keyof Utils
interface TestUtilsOptions<K extends UtilsKeys> {
    keys?: K[]
    isSelector?: boolean
    rootElement?: HTMLElement
}

export function testUtils<K extends UtilsKeys>(
    testIdOrSelector: string,
    container: RenderResult,
    options?: TestUtilsOptions<K>,
) {
    const { keys, isSelector, rootElement } = options || {}
    const selector = isSelector
        ? testIdOrSelector
        : testIdToSelector(testIdOrSelector)

    const utils: Utils = {
        element: () =>
            (rootElement || container.container).querySelector(selector),
        notExistsError: () =>
            new Error(
                `Element does not exist: ${selector}. \nCurrent HTML: \n ${container.container.innerHTML}`,
            ),
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
        placeholder: () => utils.getAttribute('placeholder'),
        value: () => utils.getAttribute('value'),
    }

    if (keys) {
        type KeysWithElement = K | 'element'

        const filteredUtils = Object.fromEntries(
            Object.entries(utils).filter(([ key ]) =>
                ([ ...keys, 'element' ] as KeysWithElement[]).includes(key as K),
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

export function testIdToSelector(testId: string) {
    return `[data-testid="${testId}"]`
}
