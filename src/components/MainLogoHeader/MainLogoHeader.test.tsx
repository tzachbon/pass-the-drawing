import { mainLogoHeaderDriver } from './MainLogoHeader.driver'

describe('MainLogoHeader', () => {
	const driver = mainLogoHeaderDriver().beforeAndAfter()

	// eslint-disable-next-line spellcheck/spell-checker
	it('all elememts should render', () => {

		expect(driver.testkit().element()).toBeInTheDocument()

	})

	
})