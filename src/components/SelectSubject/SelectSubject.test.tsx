import { fireEvent, renderer } from 'test-utils'
import { GameSubjects } from '../../constants'
import { getSubjectTestId, INPUT_TEST_ID, SelectSubject } from './SelectSubject'

describe('SelectSubject',
	() => {
		let subject: string | undefined

		const setSubject = jest.fn()
			.mockImplementation((aSubject: string | undefined) => {
				subject = aSubject
			})
		const testkit = renderer(() => (
			<SelectSubject subject={subject} setSubject={setSubject} />
		))
			.beforeAndAfter()

		beforeEach(() => {
			subject = undefined
			setSubject.mockReset()
		})

		it('should render subjects', async () => {
			fireEvent.focusIn(await testkit.container.findByTestId(INPUT_TEST_ID))

			for (const subjectValue of Object.values(GameSubjects)) {
				expect(await testkit.container.findByTestId(getSubjectTestId(subjectValue)))
					.toHaveTextContent(subjectValue)
			}
		})

		it('should filter subject according to text', async () => {
			subject = 'food'
			testkit.render()

			fireEvent.focusIn(await testkit.container.findByTestId(INPUT_TEST_ID))

			expect(await testkit.container.findByTestId(getSubjectTestId(GameSubjects.Food)))
				.toBeDefined()
			expect(testkit.container.queryByTestId(getSubjectTestId(GameSubjects.Cars)))
				.toBeNull()
		})

		it('should call setSubject when clicking item', async () => {
			fireEvent.focusIn(await testkit.container.findByTestId(INPUT_TEST_ID))
			fireEvent.click(await testkit.container.findByTestId(getSubjectTestId(GameSubjects.Food)))

			expect(setSubject)
				.toHaveBeenCalledWith(GameSubjects.Food)
		})
	})
