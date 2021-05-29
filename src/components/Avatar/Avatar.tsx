import React, { memo } from 'react'
import { st, classes } from './Avatar.st.css'

export interface HomeProps {
  className?: string
  name: string
  backgroundColor?: string
}

const BASE_URL = 'https://ui-avatars.com/api/'

// eslint-disable-next-line react/display-name
export const Avatar: React.VFC<HomeProps> = memo(({ className, name, backgroundColor }) => {
	const url = `${BASE_URL}?name=${encodeURI(name)}&background=${backgroundColor || 'random'}`
	return <img
		className={st(classes.root, className)}
		src={url}
	/>
})
