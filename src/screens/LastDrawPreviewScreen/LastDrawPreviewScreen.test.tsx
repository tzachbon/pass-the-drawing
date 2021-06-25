import { aPlayer, FAKE_DRAWING_DATA, waitForTimeout } from '@test-utils'
import { lastDrawPreviewScreenDriver } from './LastDrawPreviewScreen.driver'

describe('LastDrawPreviewScreen', () => {
	const onFinished = jest.fn()
	const expireTime = 2
	const lastPlayer = aPlayer({ draw: FAKE_DRAWING_DATA })
	const driver = lastDrawPreviewScreenDriver({ props: { onFinished, lastPlayer, expireTime } })

	it('should call onFinished when timer stops', async () => {
		expect(onFinished).not.toHaveBeenCalled()

		await waitForTimeout(2 * 1000)

		expect(onFinished).toHaveBeenCalled()
	})

	it('should show canvas',  () => {
		expect(driver.testkit().canvas().element()).toBeInTheDocument()
	})

	it('should show timer',  () => {
		expect(driver.testkit().timer().element()).toBeInTheDocument()
	})
})