import type React from 'react'
import { Link } from 'react-router-dom'
import { Routes } from '@constants'
import { st, classes } from './Home.st.css'
import { MainLogoHeader } from '@components/MainLogoHeader'

// import MainImage from '@styles/assets/png/pencil.png'
// import InfoImage from '@styles/assets/png/info.png'
import MainImage from '../../styles/assets/png/pencil.png'
import InfoImage from '../../styles/assets/png/info.png'
import { useAuth } from '@hooks/useAuth'



export const ROOT_TEST_ID = 'Home_ROOT_TEST_ID'
export const CREATE_GAME_LINK_TEST_ID = 'Home_CREATE_GAME_LINK_TEST_ID'
export const SIGN_IN_LINK_TEST_ID = 'Home_SIGN_IN_LINK_TEST_ID'
export const IMAGE_CONTAINER_TEST_ID = 'Home_IMAGE_CONTAINER_TEST_ID'
export const IMAGE_TEST_ID = 'IMAGE_TEST_ID'
export const OR_TEST_ID = 'Home_OR_TEST_ID'
export const MORE_INFO_BUTTON_TEST_ID = 'Home_MORE_INFO_BUTTON_TEST_ID'

export interface HomeProps {
	className?: string
}

export const Home: React.VFC<HomeProps> = ({ className }) => {
	const { currentUser } = useAuth()

	return (
		<div
			data-testid={ROOT_TEST_ID}
			className={st(classes.root, className)}
		>
			<MainLogoHeader />
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
			{ currentUser ? <Link
				data-testid={CREATE_GAME_LINK_TEST_ID}
				to={Routes.CREATE_GAME}
				className={classes.createGameButton}
			>
				Create New Game
			</Link>
				:
				<Link
					to={Routes.SIGN_IN}
					data-testid={SIGN_IN_LINK_TEST_ID}
					// eslint-disable-next-line spellcheck/spell-checker
					className={classes.signinButton}

				>
				Signin To Start
				</Link>
			}
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
