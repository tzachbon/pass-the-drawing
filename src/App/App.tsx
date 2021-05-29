import type React from 'react'
import { Route, Switch } from 'react-router'
import { st, classes } from './App.st.css'
import { Routes } from '../constants'

import { Home } from '../pages'
import { CreateGame } from '../pages/CreateGame'

export interface AppProps {
    className?: string
}

export const App: React.VFC<AppProps> = ({ className }) => {
	return (
		<section className={st(classes.root, className)}>
			<Switch>
				<Route path={Routes.HOME} exact>
					<Home />
				</Route>
				<Route path={Routes.CREATE_GAME} exact>
					<CreateGame />
				</Route>
			</Switch>
		</section>
	)
}
