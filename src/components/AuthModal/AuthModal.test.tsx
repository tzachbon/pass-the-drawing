import { authModalDriver } from './AuthModal.driver'

describe('AuthModal', () => {
	const onCloseModal = jest.fn()
	const driver = authModalDriver({ props: { isOpen: true, onCloseModal } }).beforeAndAfter()

	it('should show auth modal', () => {
		expect(driver.testkit().element()).toBeInTheDocument()
	})

	it('should not show auth modal', () => {
		driver.withProps({ isOpen: false }).render()

		expect(driver.testkit().element()).not.toBeInTheDocument()
	})

	it('should close the modal when clicked on the overlay', () => {
		expect(driver.testkit().element()).toBeInTheDocument()

		driver.testkit().clickOnOverlay()

		expect(onCloseModal).toHaveBeenCalled()
	})
})
