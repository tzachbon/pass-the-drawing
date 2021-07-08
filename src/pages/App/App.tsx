import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router'
import { st, classes } from './App.st.css'
import { Routes } from '@constants'

const Home = React.lazy(() => import('../Home'))
const CreateGame = React.lazy(() => import('../CreateGame'))
const Lobby = React.lazy(() => import('../Lobby'))
const Game = React.lazy(() => import('../Game'))

export const App: React.VFC = () => {
    return (
        <section className={st(classes.root)}>
            <Suspense fallback={'Loading...'}>
                <Switch>
                    <Route
                        path={`${Routes.GAME}/:id`}
                        exact
                    >
                        <Game />
                    </Route>
                    <Route
                        path={`${Routes.LOBBY}/:id`}
                        exact
                    >
                        <Lobby />
                    </Route>
                    <Route
                        path={Routes.CREATE_GAME}
                        exact
                    >
                        <CreateGame />
                    </Route>
                    <Route
                        path={Routes.HOME}
                        exact
                    >
                        <Home />
                    </Route>
                </Switch>
            </Suspense>
        </section>
    )
}
