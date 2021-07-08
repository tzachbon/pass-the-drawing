import { waitFor } from '@test-utils'
import {
    GoogleAuthProvider,
    signInWithRedirect,
} from '../../../tests/__mocks__/firebase'
import { authModalDriver } from './AuthModal.driver'

describe('AuthModal', () => {
    const onCloseModal = jest.fn()
    const driver = authModalDriver({
        props: { isOpen: true, onCloseModal },
    }).beforeAndAfter()

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

    it('should render sign in with email form', () => {
        expect(driver.testkit().signInWithEmail().element()).toBeInTheDocument()
    })

    it('should do login with google', async () => {
        driver.testkit().signInWithGoogle().click()

        await waitFor(() => {
            expect(signInWithRedirect).toBeCalledWithInstance(
                GoogleAuthProvider,
            )
        })
    })
})
