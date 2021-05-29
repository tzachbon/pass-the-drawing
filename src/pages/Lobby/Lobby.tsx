import type React from 'react'
import { classes, st } from './Lobby.st.css'

export interface LobbyProps {
  className?: string
}

export const Lobby: React.VFC<LobbyProps> = ({ className }) => {
	return <div className={st(classes.root, className)}>
    Lobby
	</div>
}
