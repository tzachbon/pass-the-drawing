import { signInFormDriver } from './SignInForm.driver'

describe('SignInForm', () => {
    const onSubmit = jest.fn()
    const driver = signInFormDriver({ props: { onSubmit } }).beforeAndAfter()
    const [ email, password ] = [ 'test@test.com', '123456' ]

    it('should submit sign in form', () => {
        driver.testkit().email().type(email)
        driver.testkit().password().type(password)

        expect(driver.testkit().submit().disabled()).toBeFalsy()

        driver.testkit().submit().click()

        expect(onSubmit).toHaveBeenCalledWith({ email, password })
    })

    it('should disable submit button when email has empty value', () => {
        expect(driver.testkit().email().value()).toEqual('')
        expect(driver.testkit().submit().disabled()).toBeFalsy()
    })

    it('should disable submit button when password has empty value', () => {
        expect(driver.testkit().email().value()).toEqual('')
        expect(driver.testkit().submit().disabled()).toBeFalsy()
    })
})
