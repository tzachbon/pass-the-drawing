import type React from 'react'
import { st, classes } from './Home.st.css'

export interface HomeProps {
  className?: string
}

export const Home: React.VFC<HomeProps> = ({ className }) => {
	return <div className={st(classes.root, className)}>home</div>
}
