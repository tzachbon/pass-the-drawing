import { cleanup, render, RenderOptions } from '@testing-library/react'
import type { ReactElement } from 'react'

export type Renderer = ReturnType<typeof renderer>

const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, 'queries'>,
) => render(ui, { ...(options || {}) })

export const renderer = (getUI: () => ReactElement) => {
	let container = customRender(getUI())

	const payload = {
		container,
		beforeAndAfter,
		render,
	}

	function render(
		ui: ReactElement = getUI(),
		options?: Omit<RenderOptions, 'queries'>,
	) {
		cleanup()
		container = customRender(ui, options)
		payload.container = container

		return payload
	}

	function beforeAndAfter() {
		beforeEach(() => {
			render(getUI())
		})

		afterEach(() => {
			cleanup()
		})

		return payload
	}

	return payload
}

export { customRender as render }
