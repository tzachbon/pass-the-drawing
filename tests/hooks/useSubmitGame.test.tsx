/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-control-regex */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GameSubjects } from '@constants'
import { useSubmitGame } from '@hooks/useSubmitGame'
import { anUser, anUserToPlayer, uuidRegexPattern } from '@test-utils'
import { act, cleanup, renderHook } from '@testing-library/react-hooks'
import { v4 as uuid } from 'uuid'
import {
	cleanup as firebaseCleanup, mockFirebase,
	set,
} from '../__mocks__/firebase'
import {
	cleanup as routerCleanup, mockRouter, push,
} from '../__mocks__/react-router-dom'

mockRouter()
mockFirebase()

describe('useSubmitGame', () => {
	const { state } = setup().beforeAndAfter()

	it('should create game', async () => {
		const { currentUser, eventMock, isValid, subject, word, player } = state
		const { result } = renderHook((props) => useSubmitGame(props), {
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
				players: [ player ],
				createdTime: expect.any(Number),
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

			const { result } = renderHook((props) => useSubmitGame(props), {
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
	const currentUser = anUser() as any
	const payload = {

		state: {
			currentUser,
			isValid: true,
			subject: GameSubjects.Food as GameSubjects | undefined,
			word: '',
			eventMock,
			player: anUserToPlayer(currentUser),
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
				payload.state.currentUser = anUser()
				payload.state.player = anUserToPlayer(payload.state.currentUser)

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
