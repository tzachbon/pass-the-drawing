import { Driver, RenderResult, testUtils } from '@test-utils'
import { HomeProps, Home,  ROOT_TEST_ID, HEADER_CONTAINER_TEST_ID, CREATE_GAME_LINK_TEST_ID, MORE_INFO_BUTTON_TEST_ID, IMAGE_TEST_ID  } from './Home'

interface Params {
	props?: HomeProps
}

export function homeDriver({ props }: Params = {}) {
	return new HomeDriver(props || {}, Home)
}

export class HomeDriver extends Driver<HomeProps> {
	testkit() {
		return homeTestkit(this.wrapper.container)
	}
}

export function homeTestkit(container: RenderResult) {
	const testkit = {
		element: () => testUtils(ROOT_TEST_ID, container, { keys: [] }).element(),
		headerContainer: () => testUtils(HEADER_CONTAINER_TEST_ID, container, { keys: [] }).element(),
		createGameButton: () => testUtils(CREATE_GAME_LINK_TEST_ID, container, { keys: [] }).element(),
		image: () => testUtils(IMAGE_TEST_ID, container, { keys: [] }).element(),
		moreInfoButton: () => testUtils(MORE_INFO_BUTTON_TEST_ID, container, { keys: [] }).element(), 
	}

	return testkit
}
