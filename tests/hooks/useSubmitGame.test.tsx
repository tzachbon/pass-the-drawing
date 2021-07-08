/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-control-regex */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GameSubjects } from '@constants'
import { useSubmitGame } from '@hooks/useSubmitGame'
import { aCategory, anUser, anUserToPlayer, aWord, createRouterMockProvider, uuidRegexPattern } from '@test-utils'
import { act, renderHook } from '@testing-library/react-hooks'
import { get, set } from '../__mocks__/firebase'

describe('useSubmitGame', () => {
	const { state } = setup().beforeAndAfter()

	it('should create game', async () => {
		const { currentUser, eventMock, isValid, subject, word, player, history, RouterWrapperMock } = state
		const { result } = renderHook((props) => useSubmitGame(props as any), {
			wrapper: RouterWrapperMock,
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

		expect(history.location.pathname).toEqual(
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

			const { currentUser, isValid, subject, eventMock, RouterWrapperMock } = state

			const { result } = renderHook((props) => useSubmitGame(props as any), {
				wrapper: RouterWrapperMock,
				initialProps: {
					currentUser,
					isValid,
					subject,
				},
			})



			await act(async () => {
				await result.current.onSubmit(eventMock as any)
			})
		},
	)
})

function setup() {
	const eventMock = { preventDefault: jest.fn() }
	const currentUser = anUser() as any
	const initialHistory = createRouterMockProvider()
	const payload = {
		state: {
			...initialHistory,
			currentUser,
			isValid: true,
			subject: GameSubjects.Food as GameSubjects | undefined,
			word: aWord(),
			eventMock,
			player: anUserToPlayer(currentUser),
		},
		beforeAndAfter() {
			beforeEach(() => {

				const { RouterWrapperMock, history } = createRouterMockProvider()

				payload.state.word = aWord()
				payload.state.subject = GameSubjects.Food
				payload.state.isValid = true
				payload.state.currentUser = anUser()
				payload.state.player = anUserToPlayer(payload.state.currentUser)
				payload.state.RouterWrapperMock = RouterWrapperMock
				payload.state.history = history

				get.mockResolvedValue({ val: () => aCategory({ entities: [ payload.state.word ] }) })

			})

			return payload
		},
	}

	return payload
}
