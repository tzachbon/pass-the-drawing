import { useEffect, useMemo, useRef, useState } from 'react'
import { GameSubjects } from '../constants'

function validateSubject(value: string | undefined) {
	return Object
		.values(GameSubjects)
		.includes(value as GameSubjects)
		? undefined
		: 'Game subject must be one of ' +
		Object
			.values(GameSubjects)
			.toLocaleString()
}

export function useSubject() {
	const [subject, setSubject] = useState<string | undefined>()
	const [dirty, setDirty] = useState(false)
	const error = useMemo(() => validateSubject(subject),
		[subject])
	const isValid = !error

	const firstChange = useRef(true)

	useEffect(() => {
		const app = {
			unmounted: false,
		}
		if (firstChange.current) {
			firstChange.current = false
		} else if (!app.unmounted) {
			setDirty(true)
		}

		return () => {
			app.unmounted = true
		}
	},
	[subject])

	return {
		subject,
		setSubject,
		isValid,
		error,
		dirty,
	}
}

export type UseSubject = typeof useSubject
