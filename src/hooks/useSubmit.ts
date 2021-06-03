import { createGame, getRandomWord } from '@api'
import { GameSubjects, Routes } from '@constants'
import type { User } from '@types'
import { FormEventHandler, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useAsync } from './useAsync'

interface Params {
	subject: GameSubjects | undefined
	currentUser: User | undefined
	isValid: boolean
}

export function useSubmit({ subject, isValid, currentUser }: Params) {
	const { push } = useHistory()

	const _onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
		async (event) => {
			event.preventDefault()

			if (subject && currentUser && isValid) {
				const word = await getRandomWord(subject)
				const game = await createGame(
					{
						subject,
						word,
					},
					currentUser,
				)
				const path = `${Routes.LOBBY}/${game.id}`

				push(path)
			}
		},
		[ subject, currentUser, push, isValid ],
	)

	const { run, error, loading } = useAsync()

	return {
		onSubmit: run(_onSubmit),
		loading,
		error,
	}
}
