import { homeDriver } from './Home.driver'

describe('Home', () => {
	const driver = homeDriver().beforeAndAfter()

	// eslint-disable-next-line spellcheck/spell-checker
	it('all elememts should render', () => {

		expect(driver.testkit().element()).toBeInTheDocument()
		// expect(driver.testkit().createGameButton()).toBeInTheDocument()
		expect(driver.testkit().image()).toBeInTheDocument()
		expect(driver.testkit().moreInfoButton()).toBeInTheDocument()

	})

	
})