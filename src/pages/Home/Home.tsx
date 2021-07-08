import type React from 'react'
import { Link } from 'react-router-dom'
import { Routes } from '@constants'
import { st, classes } from './Home.st.css'

export const ROOT_TEST_ID = 'Home_ROOT_TEST_ID'
export const CREATE_GAME_LINK = 'Home_CREATE_GAME_LINK'

export interface HomeProps {
    className?: string
}

export const Home: React.VFC<HomeProps> = ({ className }) => {
    return (
        <div
            data-testid={ROOT_TEST_ID}
            className={st(classes.root, className)}
        >
            <Link
                data-testid={CREATE_GAME_LINK}
                to={Routes.CREATE_GAME}
            >
                Create Game
            </Link>
        </div>
    )
}
