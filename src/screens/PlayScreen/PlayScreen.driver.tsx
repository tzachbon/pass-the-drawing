import { drawScreenTestkit } from '@screens/DrawScreen/DrawScreen.driver'
import { Driver, RenderResult, testUtils } from '@test-utils'
import { PlayScreen, PlayScreenProps, ROOT_TEST_ID } from './PlayScreen'

interface Params {
    props: PlayScreenProps
}

export function playScreenDriver({ props }: Params) {
    return new PlayScreenDriver(props, PlayScreen)
}

export class PlayScreenDriver extends Driver<Params['props']> {
    testkit() {
        return playScreenTestkit(this.wrapper.container)
    }
}

export function playScreenTestkit(container: RenderResult) {
    const testkit = {
        ...testUtils(ROOT_TEST_ID, container, { keys: [] }),
        drawScreen: () => drawScreenTestkit(container),
    }

    return testkit
}
