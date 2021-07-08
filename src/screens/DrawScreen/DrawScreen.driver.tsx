import { canvasTestkit } from '@components/Canvas/Canvas.driver'
import { Driver, RenderResult, testUtils } from '@test-utils'
import {
    DrawScreen,
    DrawScreenProps,
    ROOT_TEST_ID,
    TIMER_TEST_ID,
} from './DrawScreen'

interface Params {
    props: DrawScreenProps
}

export function drawScreenDriver({ props }: Params) {
    return new DrawScreenDriver(props, DrawScreen)
}

export class DrawScreenDriver extends Driver<Params['props']> {
    testkit() {
        return drawScreenTestkit(this.wrapper.container)
    }
}

export function drawScreenTestkit(container: RenderResult) {
    const utils = testUtils(ROOT_TEST_ID, container)
    const testkit = {
        element: utils.element,
        timer: () => testUtils(TIMER_TEST_ID, container, { keys: [ 'text' ] }),
        canvas: () => canvasTestkit(container),
    }

    return testkit
}
