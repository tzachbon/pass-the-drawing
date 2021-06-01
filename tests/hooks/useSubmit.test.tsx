/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-control-regex */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { uuidRegexPattern } from '@test-utils'
import { act, cleanup, renderHook } from '@testing-library/react-hooks'
import { v4 as uuid } from 'uuid'
import { GameSubjects } from '../../src/constants'
import { useSubmit } from '../../src/hooks/useSubmit'
import {
	mockFirebase,
	set,
	cleanup as firebaseCleanup,
} from '../__mocks__/firebase'
import {
	push,
	mockRouter,
	cleanup as routerCleanup,
} from '../__mocks__/react-router-dom'

mockRouter()
mockFirebase()

describe('useSubmit', () => {
	const { state } = setup().beforeAndAfter()

	it('should create game', async () => {
		const { currentUser, eventMock, isValid, subject, word } = state
		const { result } = renderHook((props) => useSubmit(props), {
			initialProps: {
				currentUser,
				isValid,
				subject,
			},
		})

		await act(async () => {
			await result.current.onSubmit(eventMock as any)
		})

		expect(eventMock.preventDefault).toHaveBeenCalled()
		expect(result.current.loading).toBeFalsy()
		expect(result.current.error).toBeUndefined()

		expect(push).toBeCalledWith(
			expect.stringMatching(new RegExp(`/lobby/${uuidRegexPattern}`, 'g')),
		)
		expect(set).toBeCalledWith(
			expect.objectContaining({
				currentPlayingIndex: 0,
				id: expect.stringMatching(new RegExp(uuidRegexPattern)),
				players: [],
				startTime: expect.any(Number),
				subject,
				word,
			}),
		)
	})

	it.each([ 'subject', 'currentUser', 'isValid' ])(
		'should navigate with %s is falsy',
		async (key: string) => {
            type KeyOfState = keyof typeof state
            state[ key as KeyOfState ] = undefined as never

            const { currentUser, eventMock, isValid, subject } = state

            const { result } = renderHook((props) => useSubmit(props), {
            	initialProps: {
            		currentUser,
            		isValid,
            		subject,
            	},
            })

            await act(async () => {
            	await result.current.onSubmit(eventMock as any)
            })

            expect(push).not.toBeCalled()
		},
	)
})

function setup() {
	const eventMock = { preventDefault: jest.fn() }

	const payload = {
		state: {
			currentUser: { user: 'test' } as any,
			isValid: true,
			subject: GameSubjects.Food as GameSubjects | undefined,
			word: '',
			eventMock,
		},
		beforeAndAfter() {
			beforeEach(() => {
				void cleanup()
				void firebaseCleanup()
				void routerCleanup()

				eventMock.preventDefault.mockClear()
				payload.state.word = uuid()
				payload.state.subject = GameSubjects.Food
				payload.state.isValid = true
				payload.state.currentUser = { user: 'test' }

				fetchMock.doMock(() =>
					Promise.resolve({
						body: JSON.stringify({ dish: payload.state.word }),
					} as any),
				)
			})

			return payload
		},
	}

	return payload
}
