import { render } from '@test-utils'
import { WordBoard } from '.'


describe('WordBoard', () => {
	it('should match snapshot', () => {
		const { getByText } = render(<WordBoard word='test' />)
		const linkElement = getByText(/WordBoard works!/i)
		expect(linkElement).toBeInTheDocument()
	})
})