import { BASE_URL } from './Avatar'
import { avatarDriver } from './Avatar.driver'

describe('Avatar', () => {
    const name = 'test'
    const driver = avatarDriver({ props: { name } }).beforeAndAfter()

    it('should have avatar src', () => {
        expect(driver.testkit().image().src()).toEqual(
            `${BASE_URL}?name=test&background=random`,
        )
    })

    it('should encode avatar src', () => {
        driver.withProps({ name: 'Test Test' }).render()
        expect(driver.testkit().image().src()).toEqual(
            `${BASE_URL}?name=Test%20Test&background=random`,
        )
    })

    it('should append background color', () => {
        driver.withProps({ name: 'test', backgroundColor: 'red' }).render()
        expect(driver.testkit().image().src()).toEqual(
            `${BASE_URL}?name=test&background=red`,
        )
    })
})
