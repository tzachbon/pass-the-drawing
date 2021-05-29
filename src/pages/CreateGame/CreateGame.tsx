import type React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SelectSubject } from '../../components/SelectSubject'
import { GameSubjects } from '../../constants'
import { classes, st } from './CreateGame.st.css'

interface Inputs {
	name: string,
	subject: string
}

export interface CreateGameProps {
	className?: string
}

export const CreateGame: React.VFC<CreateGameProps> = ({ className }) => {

	const { register, handleSubmit, watch, formState } = useForm<Inputs>()
	const onSubmit: SubmitHandler<Inputs> = data => {
		if (!Object.keys(formState.errors).length) {
			// eslint-disable-next-line no-console
			console.log({ data })
		}
	}

	return (
		<form className={st(classes.root, className)} onSubmit={handleSubmit(onSubmit)}>
			<input
				placeholder='Enter your full name'
				required
				{...register('name', { required: true })}
			/>
			<SelectSubject
				required
				placeholder='Select a subject to draw'
				value={watch('subject')}
				{...register('subject', {
					required: true,
					validate: validateSubject
				})}
			/>
			{
				formState.errors.subject && <h2>{formState.errors.subject.message}</h2>
			}
			<input type="submit" />
		</form>
	)
}


function validateSubject(value: string) {
	return Object.values(GameSubjects).includes(value as GameSubjects) ? undefined : ('Game subject must be one of ' + Object.values(GameSubjects).toLocaleString())
}