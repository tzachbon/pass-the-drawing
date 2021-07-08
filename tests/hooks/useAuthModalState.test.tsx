import { AuthProvider } from '@hooks/useAuth'
import { useAuthModalState } from '@hooks/useAuthModalState'
import { anUser } from '@test-utils'
import { renderHook, act } from '@testing-library/react-hooks'
import { authState } from '../../tests/__mocks__/firebase'

describe('useAuthModalState', () => {
    const renderAuthModalState = () =>
        renderHook(() => useAuthModalState(), { wrapper: AuthProvider })

    it('should initial with closed modal', () => {
        const { result } = renderAuthModalState()

        expect(result.current.openModel).toBeFalsy()
    })

    it('should open the modal', () => {
        const { result } = renderAuthModalState()

        act(() => {
            result.current.onOpenModal()
        })

        expect(result.current.openModel).toBeTruthy()
    })

    it('should close the modal', () => {
        const { result } = renderAuthModalState()

        act(() => {
            result.current.onOpenModal()
        })

        act(() => {
            result.current.onCloseModal()
        })

        expect(result.current.openModel).toBeFalsy()
    })

    it('should close modal when user signed in', () => {
        const { result } = renderAuthModalState()

        act(() => {
            result.current.onOpenModal()
        })

        act(() => {
            authState.onAuthStateChangedCallback(anUser())
        })

        expect(result.current.openModel).toBeFalsy()
    })
})
