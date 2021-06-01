import { renderHook, act, cleanup } from '@testing-library/react-hooks'
import { GameSubjects } from '../../src/constants'
import { getSubjectErrorMessage, useSubject } from '../../src/hooks/useSubject'

describe('useSubject', () => {
	beforeEach(() => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		void cleanup()
	})

	it('should set subject', () => {
		const { result } = renderHook(() => useSubject())

		void act(() => {
			result.current.setSubject(GameSubjects.Food)
		})

		expect(result.current.subject).toEqual(GameSubjects.Food)
	})

	it('should update dirty', () => {
		const { result } = renderHook(() => useSubject())

		expect(result.current.dirty).toBeFalsy()

		void act(() => {
			result.current.setSubject(GameSubjects.Food)
		})

		expect(result.current.dirty).toBeTruthy()
	})

	it('should handle error', () => {
		const { result } = renderHook(() => useSubject())

		expect(result.current.isValid).toBeFalsy()
		expect(result.current.error).toEqual(getSubjectErrorMessage())

		void act(() => {
			result.current.setSubject(GameSubjects.Cars)
		})

		expect(result.current.isValid).toBeTruthy
		expect(result.current.error).toBeUndefined()

		void act(() => {
			result.current.setSubject('not a valid subject')
		})

		expect(result.current.isValid).toBeFalsy()
		expect(result.current.error).toEqual(getSubjectErrorMessage())
	})

	it.each(Object.values(GameSubjects))(
		'should be valid for game subject (%s)',
		(subject: GameSubjects) => {
			const { result } = renderHook(() => useSubject())

			expect(result.current.isValid).toBeFalsy()
			expect(result.current.error).toEqual(getSubjectErrorMessage())
			expect(result.current.dirty).toBeFalsy()

			void act(() => {
				result.current.setSubject(subject)
			})

			expect(result.current.isValid).toBeTruthy()
			expect(result.current.error).toBeUndefined()
			expect(result.current.dirty).toBeTruthy()
		},
	)
})
