import { Driver, RenderResult, testUtils } from '@test-utils'
import { INPUT_EMAIL_TEST_ID, INPUT_PASSWORD_TEST_ID, ROOT_TEST_ID, SignInForm, SignInFormProps, SUBMIT_BUTTON_TEST_ID } from './SignInForm'

interface Params {
	props: SignInFormProps
}

export function signInFormDriver({ props }: Params) {
	return new SignInFormDriver(props, SignInForm)
}

export class SignInFormDriver extends Driver<Params['props']> {
	testkit() {
		return signInFormTestkit(this.wrapper.container)
	}
}

export function signInFormTestkit(container: RenderResult) {
	const utils = testUtils(ROOT_TEST_ID, container, { keys: [] })

	const testkit = {
		...utils,
		email: () => testUtils(INPUT_EMAIL_TEST_ID, container, { keys: [ 'value', 'type' ] }),
		password: () => testUtils(INPUT_PASSWORD_TEST_ID, container, { keys: [ 'value', 'type' ] }),
		submit: () => testUtils(SUBMIT_BUTTON_TEST_ID, container, { keys: [ 'disabled', 'text', 'click' ] }),
	}

	return testkit
}
