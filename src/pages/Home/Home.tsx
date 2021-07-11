import type React from 'react'
import { Link } from 'react-router-dom'
import { Routes } from '@constants'
import { st, classes } from './Home.st.css'

import MainImage from '../../assets/png/pencil.png'
import InfoImage from '../../assets/png/info.png'



export const ROOT_TEST_ID = 'Home_ROOT_TEST_ID'
export const HEADER_CONTAINER_TEST_ID = 'Home_HEADER_CONTAINER_TEST_ID'
export const HEADER_TEST_ID = 'Home_HEADER_TEST_ID'
export const VERSION_TEST_ID = 'Home_VERSION_TEST_ID'
export const CREATE_GAME_LINK = 'Home_CREATE_GAME_LINK'
export const IMAGE_CONTAINER = 'Home_IMAGE_CONTAINER'
export const OR = 'Home_OR'

export interface HomeProps {
	className?: string
}

export const Home: React.VFC<HomeProps> = ({ className }) => {
	return (
		<div
			data-testid={ROOT_TEST_ID}
			className={st(classes.root, className)}
		>
			<div 
			 data-testid={HEADER_CONTAINER_TEST_ID}
			 className={st(classes.headerContainer, className)}
			>
				<h1
				 data-testid={HEADER_TEST_ID}
				 className={st(classes.mainHeader, className)}
				>
					 <span>Pass</span> <br/> The Darw
				</h1>
				<h3
					data-testid={VERSION_TEST_ID}
					className={st(classes.version, className)}
				>
				ALPHA v0.1
				</h3>
			</div>
			<div
				data-testid={IMAGE_CONTAINER}
				className={st(classes.imageContainer, className)}
			>
				{/* <MainImage /> */}
				<img 
					src={MainImage} 
					alt="Pencil" 
				/>
			</div>
			<Link
				data-testid={CREATE_GAME_LINK}
				to={Routes.CREATE_GAME}
				// eslint-disable-next-line stylable/unknown-locals
				className={st(classes.createGameButton, className)}
			>
				Create New Game
			</Link>
			<h2 
				data-testid={OR}
				className={st(classes.or, className)}
			>
				or
			</h2>
			<button
				className={st(classes.moreInfoButton, className)}
			>
				<img 
					src={InfoImage}
				/>
			View Game Introduction
			</button>
		</div>
	)
}
