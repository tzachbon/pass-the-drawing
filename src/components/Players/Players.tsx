import type { Game } from '@types'
import type React from 'react'
import { classes, st } from './Players.st.css'

export interface PlayersProps {
	className?: string
	players: Game['players']
	currentPlayerId: string
}

export const getPlayerTestId = (id: string) => 'Players_Player_TEST_ID_' + id
export const ROOT_TEST_ID = 'Players_ROOT_TEST_ID'

export const Players: React.VFC<PlayersProps> = ({
	className,
	players,
	currentPlayerId,
}) => (
	<div
		className={st(classes.root, className)}
		data-testid={ROOT_TEST_ID}
	>
		{
			players.map((player, i) => (
				<div
					key={getPlayerTestId(String(i))}
					data-testid={getPlayerTestId(String(i))}
					className={st(classes.player, { currentPlayer: player.id === currentPlayerId })}
				>
					<img
						className={classes.image}
						src={player.image!}
						referrerPolicy='no-referrer'
					/>
					<span className={classes.playerName}>
						{player.name}
					</span>
				</div>
			))
		}
	</div>
)
