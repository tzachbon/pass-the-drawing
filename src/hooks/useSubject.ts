import { GameSubjects } from '@constants'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useLocalStorage from 'react-use-localstorage/dist'

export function getSubjectErrorMessage() {
	return (
		'Game subject must be one of ' +
		Object.values(GameSubjects).toLocaleString()
	)
}

function validateSubject(value: string | undefined) {
	return Object.values(GameSubjects).indexOf(value as GameSubjects) >= 0
		? undefined
		: getSubjectErrorMessage()
}

export function useSubject() {
	const [ localSubject, setLocalSubject ] = useLocalStorage('subject')
	const [ subject, _setSubject ] = useState<string | undefined>(localSubject)
	const [ dirty, setDirty ] = useState(false)
	const error = useMemo(() => validateSubject(subject), [ subject ])
	const isValid = !error

	const clearSubjectFromStorage = useCallback(
		() => {
			setLocalSubject('')
		},
		[ setLocalSubject ],
	)

	const setSubject = useCallback(
		(value: Parameters<typeof _setSubject>[0]) => {
			_setSubject(value)
			setDirty(true)
		},
		[],
	)

	useEffect(() => {
		const app = { unmounted: false }

		if (subject !== localSubject) {
			!app.unmounted && setLocalSubject(subject as string)
		}

		return () => {
			app.unmounted = true
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ subject ])

	return {
		clearSubjectFromStorage,
		subject,
		setSubject,
		isValid,
		error,
		dirty,
	}
}

export type UseSubject = typeof useSubject
