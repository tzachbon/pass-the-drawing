import { aPlayer, FAKE_DRAWING_DATA } from '@test-utils'
import { with as eventuallyWith } from 'wix-eventually'
import { lastDrawPreviewScreenDriver } from './LastDrawPreviewScreen.driver'

const expireTime = 2
const eventually = eventuallyWith({ timeout: expireTime * 1000 })

describe('LastDrawPreviewScreen', () => {
	const onFinished = jest.fn()
	const lastPlayer = aPlayer({ draw: FAKE_DRAWING_DATA })
	const driver = lastDrawPreviewScreenDriver({ props: { onFinished, lastPlayer, expireTime } })

	it('should call onFinished when timer stops', async () => {
		expect(onFinished).not.toHaveBeenCalled()

		await eventually(() => {
			expect(onFinished).toHaveBeenCalled()
		})
	})

	it('should show canvas', () => {
		expect(driver.testkit().canvas().element()).toBeInTheDocument()
	})

	it('should show timer', () => {
		expect(driver.testkit().timer().element()).toBeInTheDocument()
	})
})