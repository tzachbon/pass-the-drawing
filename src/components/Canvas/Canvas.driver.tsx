import {
    Driver,
    fireEvent,
    RenderResult,
    testIdToSelector,
    testUtils,
} from '@test-utils'
import { Canvas, CanvasProps, ROOT_TEST_ID } from './Canvas'

interface Params {
    props: CanvasProps
}

export function canvasDriver({ props }: Params) {
    return new CanvasDriver(props, Canvas)
}

export class CanvasDriver extends Driver<Params['props']> {
    testkit() {
        return canvasTestkit(this.wrapper.container)
    }
}

export function canvasTestkit(
    container: RenderResult,
    testId: string = ROOT_TEST_ID,
) {
    const utils = testUtils(`${testIdToSelector(testId)} canvas`, container, {
        isSelector: true,
    })
    const testkit = {
        element: utils.element,
        draw: (
            x: number,
            y: number,
            { start }: { start?: { x: number; y: number } } = {},
        ) => {
            const element = utils._element() as HTMLCanvasElement

            fireEvent.mouseDown(element, {
                clientX: start?.x ?? 0,
                clientY: start?.y ?? 0,
            })

            fireEvent.mouseMove(element, {
                clientX: x,
                clientY: y,
            })

            fireEvent.mouseUp(element, {
                clientX: x,
                clientY: y,
            })
        },
    }

    return testkit
}
