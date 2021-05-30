import { renderer } from 'test-utils'
import { Avatar, BASE_URL, TEST_ID } from './Avatar'

describe('Avatar',
	() => {
		const testkit = renderer(() => <Avatar name="Test" />)
			.beforeAndAfter()

		it('should have avatar src', async () => {
			expect(await testkit.container.findByTestId(TEST_ID))
				.toHaveAttribute(
					'src',
					`${BASE_URL}?name=Test&background=random`,
				)
		})

		it('should encode avatar src', async () => {
			testkit.render(<Avatar name="Test Test" />)
			expect(await testkit.container.findByTestId(TEST_ID))
				.toHaveAttribute(
					'src',
					`${BASE_URL}?name=Test%20Test&background=random`,
				)
		})

		it('should append background color', async () => {
			testkit.render(<Avatar name="Test" backgroundColor="red" />)
			expect(await testkit.container.findByTestId(TEST_ID))
				.toHaveAttribute(
					'src',
					`${BASE_URL}?name=Test&background=red`,
				)
		})
	})
