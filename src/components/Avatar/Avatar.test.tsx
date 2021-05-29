import { renderer } from 'test-utils'
import { Avatar, BASE_URL } from './Avatar'

describe('Avatar', () => {
	const wrapper = renderer(() => <Avatar name="Test" />).beforeAndAfter()

	it('should have avatar src', async () => {
		expect(await wrapper.container.findByTestId('avatar')).toEqual(
			expect.objectContaining({
				src: `${BASE_URL}?name=Test&background=random`,
			})
		)
	})

	it('should encode avatar src', async () => {
		wrapper.render(<Avatar name="Test Test" />)
		expect(await wrapper.container.findByTestId('avatar')).toEqual(
			expect.objectContaining({
				src: `${BASE_URL}?name=Test%20Test&background=random`,
			})
		)
	})

	it('should append background color', async () => {
		wrapper.render(<Avatar name="Test" backgroundColor="red" />)
		expect(await wrapper.container.findByTestId('avatar')).toEqual(
			expect.objectContaining({ src: `${BASE_URL}?name=Test&background=red` })
		)
	})
})
