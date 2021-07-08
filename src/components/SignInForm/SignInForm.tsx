import { FormEventHandler, useMemo, useReducer } from 'react'
import type React from 'react'
import { useCallback } from 'react'
import { classes, st } from './SignInForm.st.css'


export interface SignInFormProps {
	className?: string
	onSubmit: (data: FormData) => void | Promise<void>
}


export const ROOT_TEST_ID = 'SignInForm_ROOT_TEST_ID'
export const INPUT_EMAIL_TEST_ID = 'SignInForm_INPUT_EMAIL_TEST_ID'
export const INPUT_PASSWORD_TEST_ID = 'SignInForm_INPUT_PASSWORD_TEST_ID'
export const SUBMIT_BUTTON_TEST_ID = 'SignInForm_SUBMIT_BUTTON_TEST_ID'

export const SignInForm: React.FC<SignInFormProps> = (
	{
		className,
		onSubmit,
	},
) => {
	const { formData, isValid, setFormData, validationMap } = useForm()
	const formOnSubmit: FormEventHandler<HTMLFormElement> = useCallback(
		async (event) => {
			event.preventDefault()
			if (!isValid) {
				return
			}

			await onSubmit(formData as FormData)
		},
		[ onSubmit, formData, isValid ],
	)

	return (
		<form
			data-testid={ROOT_TEST_ID}
			className={st(classes.root, className)}
			onSubmit={formOnSubmit}
		>
			<div
				className={
					st(
						classes.formField,
						{
							isValid: validationMap.email,
						},
					)
				}
			>
				<label htmlFor='email'>
					Email
				</label>
				<input
					className={classes.input}
					name='email'
					required
					value={formData.email || ''}
					type='email'
					data-testid={INPUT_EMAIL_TEST_ID}
					onChange={({ target: { value } }) => setFormData({ email: value })}
					autoComplete='email'
				/>
			</div>
			<div
				className={
					st(
						classes.formField,
						{
							isValid: validationMap.password,
						},
					)
				}
			>
				<label
					htmlFor='password'
				>
					Password
				</label>
				<input
					className={classes.input}
					name='password'
					required
					value={formData.password || ''}
					type='password'
					data-testid={INPUT_PASSWORD_TEST_ID}
					onChange={({ target: { value } }) => setFormData({ password: value })}
					autoComplete='current-password'
				/>
			</div>
			<button
				className={classes.button}
				disabled={!isValid}
				data-testid={SUBMIT_BUTTON_TEST_ID}
			>
				Sign in with Email
			</button>
		</form>
	)
}

interface FormData {
	email: string
	password: string
}


function useForm() {
	const [ formData, setFormData ] = useReducer(
		(state: Partial<FormData>, action: Partial<FormData>) => ({ ...state, ...action }),
		{},
	)

	const validationMap = useMemo(() =>
		Object.fromEntries(
			Object
				.entries(formData)
				.map(([ key, value ]) => [ key, Boolean(value) ]),
		)
	, [ formData ],
	) as Record<keyof FormData, boolean>
	const isValid = useMemo(() => Object.values(validationMap).every(Boolean), [ validationMap ])

	return {
		formData,
		setFormData,
		validationMap,
		isValid,
	}
}