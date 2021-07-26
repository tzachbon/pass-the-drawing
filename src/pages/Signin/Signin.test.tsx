/* eslint-disable spellcheck/spell-checker */
import { signinDriver } from './Signin.driver'

describe('Signin', () => {
	const driver = signinDriver({ props: {} }).beforeAndAfter()

	it('should render Signin', () => {
		expect(driver.testkit().element()).toBeInTheDocument()
	})
})
