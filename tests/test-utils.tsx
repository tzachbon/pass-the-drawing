import '@testing-library/jest-dom/extend-expect'
import { cleanup, render, RenderOptions } from '@testing-library/react'
import type { ReactElement } from 'react'

// const AllTheProviders: FC = ({ children }) => {
// 	return <BrowserRouter>{children}</BrowserRouter>
// }

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
	render(ui,
		{
			// wrapper: AllTheProviders,
			...options,
		})

const renderer = (getUI: () => ReactElement) => {
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

export const uuidRegexPattern = '[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}'
export * from '@testing-library/react'
export { customRender as render, renderer }
