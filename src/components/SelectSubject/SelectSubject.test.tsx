import { GameSubjects } from '@constants'
import { selectSubjectDriver } from './SelectSubject.driver'

describe('SelectSubject', () => {
	let subject: string | undefined

	const setSubject = jest
		.fn()
		.mockImplementation((aSubject: string | undefined) => {
			subject = aSubject
		})

	const driver = selectSubjectDriver({
		props: {
			subject,
			setSubject,
		},
	}).beforeAndAfter()

	beforeEach(() => {
		subject = undefined
	})

	it('should render subjects', () => {
		driver.testkit().input().focus()

		for (const subjectValue of Object.values(GameSubjects)) {
			expect(
				driver.testkit().subject(subjectValue).element(),
			).toHaveTextContent(subjectValue)
		}
	})

	it('should filter subject according to text', () => {
		subject = 'food'
		driver.withProps({ subject }).render()

		driver.testkit().input().focus()

		expect(
			driver.testkit().subject(GameSubjects.Food).element(),
		).toBeDefined()
		expect(driver.testkit().subject(GameSubjects.Food).element()).toBeNull()
	})

	it('should call setSubject when clicking item', () => {
		driver.testkit().input().focus()
		driver.testkit().subject(GameSubjects.Food).click()

		expect(setSubject).toHaveBeenCalledWith(GameSubjects.Food)
	})
})
