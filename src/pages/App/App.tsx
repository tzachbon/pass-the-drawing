import type React from 'react'
import { Route, Switch } from 'react-router'
import { st, classes } from './App.st.css'
import { Routes } from '../../constants'

import { Home } from '..'
import { CreateGame } from '../CreateGame'
import { Lobby } from '../Lobby'


export const App: React.VFC = () => {
	return (
		<section className={st(classes.root)}>
			<Switch>
				<Route path={`${Routes.LOBBY}/:id`} exact>
					<Lobby />
				</Route>
				<Route path={Routes.CREATE_GAME} exact>
					<CreateGame />
				</Route>
				<Route path={Routes.HOME} exact>
					<Home />
				</Route>
			</Switch>
		</section>
	)
}
