import type { History } from 'history'
import { StylableDOMUtil } from '@stylable/dom-test-kit'
import type { RuntimeStylesheet } from '@stylable/runtime'
import type { LocationDescriptor } from 'history'
import type { ComponentType, ReactElement } from 'react'
import type * as stylesheet from './../../src/styles/globals.st.css'
import { createRouterMockProvider } from './create-router-mock-provider'
import { renderer, Renderer } from './render'
import { AuthProvider } from '@hooks/useAuth'
import { setModalRoot } from '@components/AuthModal/AuthModal'

export interface Options {
    stylesheet?: typeof stylesheet
    initialRoute?: string
}

export interface DriverSpies {
    history: Partial<{
        push: jest.SpyInstance<void, [location: LocationDescriptor<unknown>]>
    }>
}

export abstract class Driver<P extends object> {
    public wrapper: Renderer
    public history: History | undefined
    public spies: DriverSpies = { history: {} }
    private getUI: (newProps: P) => () => ReactElement

    constructor(
        public props: P,
        private Component: ComponentType<P>,
        private options: Options = {},
    ) {
        this.getUI = (newProps: P) => {
            const { RouterWrapperMock, history, pushSpy } =
                createRouterMockProvider({
                    initialRoute: this.options.initialRoute,
                })

            this.history = history
            this.spies.history.push = pushSpy

            const component = () => (
                <RouterWrapperMock>
                    <AuthProvider>
                        <this.Component {...newProps} />
                    </AuthProvider>
                </RouterWrapperMock>
            )

            component.displayName = this.Component.displayName

            return component
        }

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
            this.options.stylesheet as unknown as RuntimeStylesheet,
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

        beforeEach(() => {
            setModalRoot()
        })

        return this
    }

    get html() {
        return this.wrapper.container.container.innerHTML
    }
}
