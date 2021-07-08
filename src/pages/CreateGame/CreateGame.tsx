import { SelectSubject } from '@components/SelectSubject'
import { AuthModal } from '@components/AuthModal'
import type { GameSubjects } from '@constants'
import { useAuth } from '@hooks/useAuth'
import { useAuthModalState } from '@hooks/useAuthModalState'
import { useSubject } from '@hooks/useSubject'
import { useSubmitGame } from '@hooks/useSubmitGame'
import React, { FormEventHandler, useCallback } from 'react'
import { classes, st } from './CreateGame.st.css'

export interface CreateGameProps {
	className?: string
}

export const OPEN_MODAL_BUTTON_TEST_ID = 'CreateGame_OPEN_MODAL_BUTTON_TEST_ID'
export const LOGGED_IN_MESSAGE_TEST_ID = 'CreateGame_LOGGED_IN_MESSAGE_TEST_ID'
export const SUBJECT_ERROR_TEST_ID = 'CreateGame_SUBJECT_ERROR_TEST_ID'
export const SUBMIT_BUTTON_TEST_ID = 'CreateGame_SUBMIT_BUTTON_TEST_ID'
export const SUBMIT_ERROR_TEST_ID = 'CreateGame_SUBMIT_ERROR_TEST_ID'
export const FORM_TEST_ID_TEST_ID = 'CreateGame_FORM_TEST_ID_TEST_ID'

export const CreateGame: React.VFC<CreateGameProps> = ({ className }) => {
	const {
		error: subjectError,
		isValid,
		setSubject,
		subject,
		dirty,
		clearSubjectFromStorage,
		setDirty,
	} = useSubject()
	const { currentUser } = useAuth()
	const { onOpenModal, openModel, onCloseModal } = useAuthModalState()
	const { onSubmit, loading, error } = useSubmitGame({
		subject: subject as GameSubjects,
		currentUser,
		isValid,
	})

	const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
		async (event) => {
			setDirty(true)
			await onSubmit(event)
			clearSubjectFromStorage()
		},
		[ onSubmit, clearSubjectFromStorage, setDirty ],
	)

	return (
		<>
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
						Logged in as {currentUser.displayName || currentUser.email}
					</span>
				) : (
					<button
						type='button'
						data-testid={OPEN_MODAL_BUTTON_TEST_ID}
						onClick={onOpenModal}
					>
						Sign in
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
			<AuthModal
				isOpen={openModel}
				onCloseModal={onCloseModal}
			/>
		</>
	)
}
