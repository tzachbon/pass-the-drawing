import type firebase from 'firebase/app'
import { FormEventHandler, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { createGame, getRandomWord } from '@api'
import { GameSubjects, Routes } from '@constants'
import { useAsync } from './useAsync'

interface Params {
    subject: GameSubjects | undefined
    currentUser: firebase.User | undefined
    isValid: boolean
}

export function useSubmit({ subject, isValid, currentUser }: Params) {
	const { push } = useHistory()

	const _onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
		async (event) => {
			event.preventDefault()

			if (subject && currentUser && isValid) {
				const word = await getRandomWord(subject)
				const game = await createGame({
					subject,
					word,
				})
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
