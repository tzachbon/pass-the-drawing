import type { Player } from '@types'
import type React from 'react'
import { classes, st } from './StandbyScreen.st.css'

export interface StandbyScreenProps {
  className?: string
	currentPlayingPlayer: Player
}


export const ROOT_TEST_ID = 'StandbyScreen_ROOT_TEST_ID'

export const StandbyScreen: React.VFC<StandbyScreenProps> = (
	{
		className,
		currentPlayingPlayer,
	},
) => {

	return (
		<div
			data-testid={ROOT_TEST_ID}
			className={st(classes.root, className)}
		>
			{currentPlayingPlayer.name} is playing, please wait to your turn.
		</div>
	)
}