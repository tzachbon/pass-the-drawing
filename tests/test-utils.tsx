import type { FC, ReactElement } from 'react'
import { render, RenderOptions, cleanup } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'

const AllTheProviders: FC = ({ children }) => {
	return <BrowserRouter>{children}</BrowserRouter>
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
	render(ui,
		{
			wrapper: AllTheProviders,
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

export * from '@testing-library/react'

export { customRender as render, renderer }
