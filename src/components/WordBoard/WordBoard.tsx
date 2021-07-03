import type { RandomWord } from '@types'
import type React from 'react'
import { FaSync } from 'react-icons/fa'
import { classes, st } from './WordBoard.st.css'

export interface WordBoardProps {
	className?: string
	word: RandomWord
	updateWord: Function
	loading?: boolean
}

export const ROOT_TEST_ID = 'WordBoard_ROOT_TEST_ID'
export const WORD_TEXT_TEST_ID = 'WordBoard_WORD_TEXT_TEST_ID'
export const RESET_WORD_BUTTON_TEST_ID = 'WordBoard_RESET_WORD_BUTTON_TEST_ID'

export const WordBoard: React.VFC<WordBoardProps> = ({
	className,
	word,
	updateWord,
	loading,
}) => (
	<div
		className={st(classes.root, className)}
		data-testid={ROOT_TEST_ID}
	>
		<span
			data-testid={WORD_TEXT_TEST_ID}
			className={classes.text}
		>
			{loading ? 'Loading...' : (
				<>
					<span>{word.name}</span>
					{word.img && <img src={word.img} />}
				</>
			)}
		</span>
		<button
			data-testid={RESET_WORD_BUTTON_TEST_ID}
			disabled={loading}
			className={classes.button}
			onClick={() => void updateWord()}
		>
			<FaSync />
		</button>
	</div>
)
