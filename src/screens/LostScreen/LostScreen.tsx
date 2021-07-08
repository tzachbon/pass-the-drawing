import type React from 'react'
import { classes, st } from './LostScreen.st.css'

export interface LostScreenProps {
  className?: string
}


export const ROOT_TEST_ID = 'LostScreen_ROOT_TEST_ID'

export const LostScreen: React.VFC<LostScreenProps> = (
	{
		className,
	},
) => {

	return (
		<div
			data-testid={ROOT_TEST_ID}
			className={st(classes.root, className)}
		>
			You lost!
		</div>
	)
}