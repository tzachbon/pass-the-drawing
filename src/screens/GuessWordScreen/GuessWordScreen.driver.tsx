import { canvasTestkit } from '@components/Canvas/Canvas.driver'
import { Driver, RenderResult, testUtils } from '@test-utils'
import {
    BUTTON_TEST_ID,
    DRAWS_CONTAINER_TEST_ID,
    getDrawTestId,
    GuessWordScreen,
    GuessWordScreenProps,
    INPUT_TEST_ID,
    ROOT_TEST_ID,
    TITLE_TEST_ID,
} from './GuessWordScreen'

interface Params {
    props: GuessWordScreenProps
}

export function guessWordScreenDriver({ props }: Params) {
    return new GuessWordScreenDriver(props, GuessWordScreen)
}

export class GuessWordScreenDriver extends Driver<Params['props']> {
    testkit() {
        return guessWordScreenTestkit(this.wrapper.container)
    }
}

export function guessWordScreenTestkit(container: RenderResult) {
    const utils = testUtils(ROOT_TEST_ID, container, { keys: [ '_element' ] })
    const testkit = {
        ...utils,
        title: () =>
            testUtils(TITLE_TEST_ID, container, { keys: [ 'text', 'disabled' ] }),
        input: () =>
            testUtils(INPUT_TEST_ID, container, {
                keys: [ 'type', 'placeholder', 'disabled', 'value' ],
            }),
        button: () =>
            testUtils(BUTTON_TEST_ID, container, {
                keys: [ 'click', 'disabled' ],
            }),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        draws: () =>
            [
                ...testUtils(DRAWS_CONTAINER_TEST_ID, container)._element()
                    .children,
            ].map((_, i) => testkit.draw(i)),
        draw: (index: number) => {
            const testId = getDrawTestId(String(index))
            const drawUtils = testUtils(testId, container, { keys: [ 'text' ] })

            return {
                ...drawUtils,
                canvas: () => canvasTestkit(container, testId),
            }
        },
    }

    return testkit
}
