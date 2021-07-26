/* eslint-disable spellcheck/spell-checker */
import { Driver, RenderResult, testUtils } from '@test-utils'
import { Signin, SigninProps, ROOT_TEST_ID } from './Signin'

interface Params {
	props: SigninProps
}

export function signinDriver({ props }: Params) {
	return new SigninDriver(props, Signin)
}

export class SigninDriver extends Driver<Params['props']> {
	testkit() {
		return signinTestkit(this.wrapper.container)
	}
}

export function signinTestkit(container: RenderResult) {

	const testkit = {
		element: () => testUtils(ROOT_TEST_ID, container, { keys: [] }).element(),
	}

	return testkit
}
