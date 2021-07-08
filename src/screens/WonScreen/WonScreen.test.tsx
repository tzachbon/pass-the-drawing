import { wonScreenDriver } from './WonScreen.driver'

describe('LostScreen', () => {
    const driver = wonScreenDriver().beforeAndAfter()

    it('should show win screen', () => {
        expect(driver.testkit().element()).toBeInTheDocument()
    })
})
