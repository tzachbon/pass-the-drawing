import type React from 'react'
import { classes, st } from './AuthModal.st.css'
import Modal from 'react-modal'
import { SignInForm, SignInFormProps } from '@components/SignInForm'
import { useCallback } from 'react'
import { useAuth } from '@hooks/useAuth'

export interface AuthModalProps {
    className?: string
    isOpen: boolean
    onCloseModal: () => void
}

export function setModalRoot() {
    Modal.setAppElement(document.body)
}

export const ROOT_TEST_ID = 'AuthModal_ROOT_TEST_ID'
export const SIGN_IN_WITH_GOOGLE_TEST_ID =
    'AuthModal_SIGN_IN_WITH_GOOGLE_TEST_ID'

export const AuthModal: React.VFC<AuthModalProps> = ({
    className,
    isOpen,
    onCloseModal,
}) => {
    const { signInWithEmailAndPassword, signInWithRedirect, loading } =
        useAuth()
    const onSubmit: SignInFormProps['onSubmit'] = useCallback(
        async ({ email, password }) => {
            if (loading) {
                return
            }

            await signInWithEmailAndPassword(email, password)
        },
        [ loading, signInWithEmailAndPassword ],
    )

    return (
        <Modal
            isOpen={isOpen}
            testId={ROOT_TEST_ID}
            onRequestClose={() => onCloseModal()}
            overlayClassName={classes.overlay}
            className={st(classes.root, className)}
        >
            <button
                data-testid={SIGN_IN_WITH_GOOGLE_TEST_ID}
                className={classes.button}
                onClick={signInWithRedirect}
            >
                sign in with google
            </button>
            <div className={classes.divider} />
            <SignInForm onSubmit={onSubmit} />
        </Modal>
    )
}
