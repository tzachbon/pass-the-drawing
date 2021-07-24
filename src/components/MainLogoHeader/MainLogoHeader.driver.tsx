import { Driver, RenderResult, testUtils } from '@test-utils'
import { MainLogoHeaderProps, MainLogoHeader, HEADER_CONTAINER_TEST_ID  } from './MainLogoHeader'

interface Params {
	props?: MainLogoHeaderProps
}

export function mainLogoHeaderDriver({ props }: Params = {}) {
	return new MainLogoHeaderDriver(props || {}, MainLogoHeader)
}

export class MainLogoHeaderDriver extends Driver<MainLogoHeaderProps> {
	testkit() {
		return mainLogoHeaderTestkit(this.wrapper.container)
	}
}

export function mainLogoHeaderTestkit(container: RenderResult) {
	const testkit = {
		element: () => testUtils(HEADER_CONTAINER_TEST_ID, container, { keys: [] }).element(),
	}

	return testkit
}
