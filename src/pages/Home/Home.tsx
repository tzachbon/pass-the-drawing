import type React from 'react'
import { Link } from 'react-router-dom'
import { Routes } from '@constants'
import { st, classes } from './Home.st.css'

import MainImage from '@styles/assets/png/pencil.png'
import InfoImage from '@styles/assets/png/info.png'



export const ROOT_TEST_ID = 'Home_ROOT_TEST_ID'
export const HEADER_CONTAINER_TEST_ID = 'Home_HEADER_CONTAINER_TEST_ID'
export const HEADER_TEST_ID = 'Home_HEADER_TEST_ID'
export const VERSION_TEST_ID = 'Home_VERSION_TEST_ID'
export const CREATE_GAME_LINK_TEST_ID = 'Home_CREATE_GAME_LINK_TEST_ID'
export const IMAGE_CONTAINER_TEST_ID = 'Home_IMAGE_CONTAINER_TEST_ID'
export const IMAGE_TEST_ID = 'IMAGE_TEST_ID'
export const OR_TEST_ID = 'Home_OR_TEST_ID'
export const MORE_INFO_BUTTON_TEST_ID = 'Home_MORE_INFO_BUTTON_TEST_ID'

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
			 className={classes.headerContainer}
			>
				<h1
				 data-testid={HEADER_TEST_ID}
				 className={classes.mainHeader}
				>
					 <span>Pass</span> <br/> The Drawing
				</h1>
				<h3
					data-testid={VERSION_TEST_ID}
					className={classes.version}
				>
				ALPHA v0.1
				</h3>
			</div>
			<div
				data-testid={IMAGE_CONTAINER_TEST_ID}
				className={classes.imageContainer}
			>
				<img 
				    data-testid={IMAGE_TEST_ID}
					src={MainImage} 
					alt="Pencil" 
				/>
			</div>
			<Link
				data-testid={CREATE_GAME_LINK_TEST_ID}
				to={Routes.CREATE_GAME}
				// eslint-disable-next-line stylable/unknown-locals
				className={classes.createGameButton}
			>
				Create New Game
			</Link>
			<h2 
				data-testid={OR_TEST_ID}
				className={classes.or}
			>
				or
			</h2>
			<button
				data-testid={MORE_INFO_BUTTON_TEST_ID}
				className={classes.moreInfoButton}
			>
				<img 
					src={InfoImage}
				/>
			View Game Introduction
			</button>
		</div>
	)
}
