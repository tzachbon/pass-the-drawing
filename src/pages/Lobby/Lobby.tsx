import type React from 'react'
import { useGame } from '@hooks/useGame'
import { useParams } from 'react-router'
import { classes, st } from './Lobby.st.css'
import { LobbyWithGame } from './LobbyWithGame'

export interface LobbyProps {
	className?: string
}

export const Lobby: React.VFC<LobbyProps> = ({ className }) => {
	const { id } = useParams<{ id: string }>()
	const { game, loading, error } = useGame({ id })

	if (error) {
		throw error
	}

	return (
		<div className={st(classes.root, className)}>
			{loading || !game ? (
				<span>Loading</span>
			) : (
				<LobbyWithGame game={game} />
			)}
		</div>
	)
}
