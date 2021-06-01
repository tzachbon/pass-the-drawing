import type { ComponentType, ReactElement } from 'react'
import { renderer, Renderer } from './render'

export abstract class Driver<P extends object> {
	public wrapper: Renderer
	private getUI: (newProps: P) => () => ReactElement

	constructor(public props: P, private Component: ComponentType<P>) {
		// eslint-disable-next-line react/display-name
		this.getUI = (newProps: P) => () => (
			<this.Component  {...newProps} />
		)
		this.wrapper = renderer(this.getUI(this.props))
	}

	render(newProps: P = this.props) {
		return this.wrapper.render(this.getUI(newProps)())
	}


	withProps(newProps: Partial<P>) {
		this.props = {
			...this.props, ...newProps,
		}

		return this
	}

	beforeAndAfter() {
		this.wrapper = this.render().beforeAndAfter()

		return this
	}
}
