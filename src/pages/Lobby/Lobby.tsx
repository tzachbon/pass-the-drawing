import type React from 'react'
import { useParams } from 'react-router'
import { useGame } from '../../hooks/useGame'
import { classes, st } from './Lobby.st.css'

export interface LobbyProps {
	className?: string
}

export const Lobby: React.VFC<LobbyProps> = ({ className }) => {
	const { id } = useParams<{ id: string }>()
	const { game } = useGame({
		id,
	})

	return (
		<div className={st(classes.root, className)}>
			{JSON.stringify(
				game,
				null,
				3,
			)}
		</div>
	)
}
