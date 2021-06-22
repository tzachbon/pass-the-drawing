import type React from 'react'
import { classes, st } from './AuthModal.st.css'
import Modal from 'react-modal'

export interface AuthModalProps {
	className?: string
	isOpen: boolean
	onCloseModal: () => void
}

Modal.setAppElement(document.body)

export const ROOT_TEST_ID = 'AuthModal_ROOT_TEST_ID'

export const AuthModal: React.VFC<AuthModalProps> = (
	{
		className,
		isOpen,
		onCloseModal,
	},
) => {


	return (
		<Modal
			isOpen={isOpen}
			testId={ROOT_TEST_ID}
			onRequestClose={() => onCloseModal()}
			overlayClassName={classes.overlay}
			className={st(classes.root, className)}
		>
			Auth!
		</Modal>
	)
}