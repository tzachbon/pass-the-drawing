import { useCallback, useEffect, useState } from 'react'
import { useAuth } from './useAuth'

export function useAuthModalState() {
    const { currentUser } = useAuth()
    const [ openModel, setOpenModel ] = useState(false)
    const onCloseModal = useCallback(() => {
        setOpenModel(false)
    }, [])

    const onOpenModal = useCallback(() => {
        setOpenModel(true)
    }, [])

    useEffect(() => {
        if (currentUser && openModel) {
            onCloseModal()
        }
    }, [ currentUser, openModel, onCloseModal ])

    return {
        openModel,
        onCloseModal,
        onOpenModal,
    }
}
