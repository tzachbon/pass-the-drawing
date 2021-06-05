import { uuid } from '@test-utils'
import { wordBoardDriver } from './WordBoard.driver'

describe('WordBoard', () => {

	const updateWordMock = jest.fn()
	const word = uuid()
	const driver = wordBoardDriver({ props: { updateWord: updateWordMock, word } }).beforeAndAfter()

	it('should show word', () => {
		expect(driver.testkit().word().text()).toEqual(word)
	})

	it('should show loading state', () => {
		driver.withProps({ loading: true }).render()

		expect(driver.testkit().word().text()).toEqual('Loading...')
	})

	it('should call updateWord on click', () => {
		driver.testkit().button().click()

		expect(updateWordMock).toHaveBeenCalled()
	})

	it('should not call updateWord when it disabled', () => {
		driver.withProps({ loading: true }).render()

		expect(driver.testkit().button().disabled()).toBeTruthy()
		expect(updateWordMock).not.toHaveBeenCalled()
	})
})
