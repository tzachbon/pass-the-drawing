import { Driver, RenderResult, testUtils } from '@test-utils'
import { Avatar, AvatarProps, ROOT_TEST_ID } from './Avatar'

interface Params {
    props: AvatarProps
}

export function avatarDriver({ props }: Params) {
    return new AvatarDriver(props, Avatar)
}

export class AvatarDriver extends Driver<Params['props']> {
    testkit() {
        return avatarTestkit(this.wrapper.container)
    }
}

export function avatarTestkit(container: RenderResult) {
    const utils = testUtils(ROOT_TEST_ID, container, {
        keys: [ 'element', 'getAttribute' ],
    })
    const testkit = {
        element: () => utils.element(),
        image: () => ({
            src: () => utils.getAttribute('src'),
        }),
    }

    return testkit
}
