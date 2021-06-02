import type React from 'react'
import { FaSync } from 'react-icons/fa'
import { classes, st } from './WordBoard.st.css'

export interface WordBoardProps {
    className?: string
    word: string
    updateWord: Function
    loading?: boolean
}

export const WordBoard: React.VFC<WordBoardProps> = ({
	className,
	word,
	updateWord,
	loading,
}) => (
	<div className={st(classes.root, className)}>
		<span className={classes.text}>{loading ? 'Loading...' : word}</span>
		<button
			disabled={loading}
			className={classes.button}
			onClick={() => void updateWord()}
		>
			<FaSync />
		</button>
	</div>
)
