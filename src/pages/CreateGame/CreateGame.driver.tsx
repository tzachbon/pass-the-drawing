import { Driver, RenderResult, testUtils } from '@test-utils'
import { selectSubjectTestkit } from '../../components/SelectSubject/SelectSubject.driver'
import { CreateGame, CreateGameProps, LOGGED_IN_MESSAGE_TEST_ID, LOGIN_BUTTON_TEST_ID, SUBMIT_BUTTON_TEST_ID } from './CreateGame'

interface Params {
	props: CreateGameProps
}

export function createGameDriver({ props }: Params) {
	return new CreateGameDriver(props, CreateGame)
}

export class CreateGameDriver extends Driver<Params['props']> {
	testkit() {
		return createGameTestkit(this.wrapper.container)
	}
}

export function createGameTestkit(container: RenderResult) {

	return {
		selectSubject: () => {
			return selectSubjectTestkit(container)
		},
		submit: () => ({
			button: () => {
				const utils = testUtils(SUBMIT_BUTTON_TEST_ID, container)

				return {
					element: utils.element,
					click: utils.click,
				}
			},
		}),
		login: () => ({
			message: () => {
				const utils = testUtils(LOGGED_IN_MESSAGE_TEST_ID, container)

				return {
					element: utils.element,
				}
			},
			button: () => {
				const utils = testUtils(LOGIN_BUTTON_TEST_ID, container)

				return {
					element: utils.element,
					click: utils.click,
				}
			},
		}),
	}
}