import React, { FormEventHandler, useCallback } from 'react'
import type { GameSubjects } from '@constants'
import { SelectSubject } from '@components/SelectSubject'
import { useAuth } from '@hooks/useAuth'
import { useSubject } from '@hooks/useSubject'
import { useSubmit } from '@hooks/useSubmit'
import { classes, st } from './CreateGame.st.css'

export interface CreateGameProps {
	className?: string
}

export const LOGIN_BUTTON_TEST_ID = 'CreateGame_LOGIN_BUTTON_TEST_ID'
export const LOGGED_IN_MESSAGE_TEST_ID = 'CreateGame_LOGGED_IN_MESSAGE_TEST_ID'
export const SUBJECT_ERROR_TEST_ID = 'CreateGame_SUBJECT_ERROR_TEST_ID'
export const SUBMIT_BUTTON_TEST_ID = 'CreateGame_SUBMIT_BUTTON_TEST_ID'
export const SUBMIT_ERROR_TEST_ID = 'CreateGame_SUBMIT_ERROR_TEST_ID'

export const CreateGame: React.VFC<CreateGameProps> = ({ className }) => {
	const {
		error: subjectError,
		isValid,
		setSubject,
		subject,
		dirty,
		clearSubjectFromStorage,
	} = useSubject()
	const { currentUser, signInWithRedirect } = useAuth()
	const { onSubmit, loading, error } = useSubmit({
		subject: subject as GameSubjects,
		currentUser,
		isValid,
	})

	const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
		async (event) => {
			await onSubmit(event)
			clearSubjectFromStorage()
		},
		[ onSubmit, clearSubjectFromStorage ],
	)

	return (
		<form
			className={st(classes.root, className)}
			onSubmit={handleSubmit}
		>
			<SelectSubject
				subject={subject}
				setSubject={setSubject}
			/>
			{subjectError && dirty && (
				<h2 data-testid={SUBJECT_ERROR_TEST_ID}>{subjectError}</h2>
			)}
			{currentUser ? (
				<span data-testid={LOGGED_IN_MESSAGE_TEST_ID}>
					Logged in as {currentUser.displayName}
				</span>
			) : (
				<button
					data-testid={LOGIN_BUTTON_TEST_ID}
					onClick={signInWithRedirect}
				>
					Sign in with google
				</button>
			)}
			<button
				data-testid={SUBMIT_BUTTON_TEST_ID}
				disabled={loading || !currentUser}
				type="submit"
			>
				Submit
			</button>
			{error && (
				<span data-testid={SUBMIT_ERROR_TEST_ID}>
					We ran into small problem, can you please try again?
				</span>
			)}
		</form>
	)
}
