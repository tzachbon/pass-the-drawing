import React, { memo } from 'react'
import { st, classes } from './Avatar.st.css'

export interface AvatarProps {
    className?: string
    name: string
    backgroundColor?: string
}

export const BASE_URL = 'https://ui-avatars.com/api/'

export const ROOT_TEST_ID = 'Avatar_ROOT_TEST_ID'

export const Avatar: React.VFC<AvatarProps> = memo(
    ({ className, name, backgroundColor }) => {
        const url = `${BASE_URL}?name=${encodeURI(name)}&background=${
            backgroundColor || 'random'
        }`

        return (
            <img
                data-testid={ROOT_TEST_ID}
                className={st(classes.root, className)}
                src={url}
            />
        )
    },
)

Avatar.displayName = 'Avatar'
