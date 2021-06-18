import { lostScreenDriver } from './LostScreen.driver'

describe('LostScreen', () => {
	const driver = lostScreenDriver().beforeAndAfter()

	it('should show lost screen', () => {
		expect(driver.testkit().element()).toBeInTheDocument()
	})
})