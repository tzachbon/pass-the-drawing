import type React from 'react'
import { Link } from 'react-router-dom'
import { Routes } from '@constants'
import { st, classes } from './Home.st.css'

export interface HomeProps {
    className?: string
}

export const Home: React.VFC<HomeProps> = ({ className }) => {
	return (
		<div className={st(classes.root, className)}>
			<Link to={Routes.CREATE_GAME}>Create Game</Link>
		</div>
	)
}
