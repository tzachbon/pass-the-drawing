import type React from 'react'
import type { GameSubjects } from '../../constants'
import { SelectSubject } from '../../components/SelectSubject'
import { useAuth } from '../../hooks/useAuth'
import { useSubject } from '../../hooks/useSubject'
import { useSubmit } from '../../hooks/useSubmit'
import { classes, st } from './CreateGame.st.css'

export interface CreateGameProps {
	className?: string
}

export const CreateGame: React.VFC<CreateGameProps> = ({ className }) => {
	const { error: subjectError, isValid, setSubject, subject, dirty } = useSubject()
	const { currentUser, signInWithRedirect } = useAuth()
	const { onSubmit, loading, error } = useSubmit({
		subject: subject as GameSubjects,
		currentUser,
		isValid,
	})

	return (
		<form
			className={st(classes.root, className)}
			onSubmit={onSubmit}
		>
			<SelectSubject
				subject={subject}
				setSubject={setSubject}
			/>
			{subjectError && dirty && <h2>{subjectError}</h2>}
			{currentUser ? (
				<span>Logged in as {currentUser.displayName}</span>
			) : (
				<button onClick={signInWithRedirect}>Sign in with google</button>
			)}
			<button
				disabled={loading || !currentUser}
				type="submit"
			>
				Submit
			</button>
			{error && (
				<span>We run into small problem, can you please try again?</span>
			)}
		</form>
	)
}
