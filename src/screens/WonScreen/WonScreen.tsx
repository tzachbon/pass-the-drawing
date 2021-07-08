import type React from 'react'
import { classes, st } from './WonScreen.st.css'

export interface WonScreenProps {
    className?: string
}

export const ROOT_TEST_ID = 'WonScreen_ROOT_TEST_ID'

export const WonScreen: React.VFC<WonScreenProps> = ({ className }) => {
    return (
        <div
            data-testid={ROOT_TEST_ID}
            className={st(classes.root, className)}
        >
            You won!
        </div>
    )
}
