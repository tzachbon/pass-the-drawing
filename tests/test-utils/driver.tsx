import type { ComponentType, ReactElement } from 'react'
import { StylableDOMUtil } from "@stylable/dom-test-kit";
import { renderer, Renderer } from './render'
import type * as stylesheet from '*.st.css'

export interface Options {
	stylesheet?: typeof stylesheet
}

export abstract class Driver<P extends object> {
	public wrapper: Renderer
	private getUI: (newProps: P) => () => ReactElement

	constructor(
		public props: P,
		private Component: ComponentType<P>,
		private options: Options = {},
	) {
		// eslint-disable-next-line react/display-name
		this.getUI = (newProps: P) => () => <this.Component {...newProps} />
		this.wrapper = renderer(this.getUI(this.props))
	}

	render(newProps: P = this.props) {
		return this.wrapper.render(this.getUI(newProps)())
	}

	styleUtils() {
		if (!this.options.stylesheet) {
			throw new Error(`
Driver Error: Can not get style utils when options.stylesheet is undefined.
Please import your styles and add them to the options:
import * as stylesheet from './MyStyles.st.css'`)
		}

		return new StylableDOMUtil(
			this.options.stylesheet as any,
			this.wrapper.container.container,
		)
	}

	withProps(newProps: Partial<P>) {
		this.props = {
			...this.props,
			...newProps,
		}

		return this
	}

	beforeAndAfter() {
		this.wrapper = this.render().beforeAndAfter()

		return this
	}
}
