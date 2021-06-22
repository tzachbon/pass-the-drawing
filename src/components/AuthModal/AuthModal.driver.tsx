import { signInFormTestkit } from '@components/SignInForm/SignInForm.driver'
import { Driver, fireEvent, RenderResult, testUtils } from '@test-utils'
import { AuthModal, AuthModalProps, ROOT_TEST_ID, SIGN_IN_WITH_GOOGLE_TEST_ID } from './AuthModal'

interface Params {
	props: AuthModalProps
}

export function authModalDriver({ props }: Params) {
	return new AuthModalDriver(props, AuthModal)
}

export class AuthModalDriver extends Driver<Params['props']> {
	testkit() {
		return authModalTestkit(this.wrapper.container)
	}
}

export function authModalTestkit(container: RenderResult) {
	const utils = testUtils(ROOT_TEST_ID, container, { keys: [ '_element' ] })

	const testkit = {
		element: utils.element,
		signInWithGoogle: () => testUtils(SIGN_IN_WITH_GOOGLE_TEST_ID, container, { keys: [ 'click' ] }),
		signInWithEmail: () => signInFormTestkit(container),
		clickOnOverlay: () => {
			const modalElement = utils._element()
			const overlayElement = modalElement.parentElement

			if (!overlayElement) {
				throw new Error(`Cannot find overlay element of ${modalElement.innerHTML}`)
			}

			fireEvent.click(overlayElement)
		},
	}

	return testkit
}
