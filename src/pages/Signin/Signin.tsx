/* eslint-disable spellcheck/spell-checker */
import { st, classes } from './Signin.st.css'
import { MainLogoHeader } from '@components/MainLogoHeader'

export interface SigninProps {
  className?: string
}

export const ROOT_TEST_ID = 'Signin_ROOT_TEST_ID'

export const Signin: React.VFC<SigninProps> = (
	{
		className,
	},
) => {

	return (
		<div 
			data-testid={ROOT_TEST_ID}
			className={st(classes.root, className)}
		>
			<MainLogoHeader />
			<p>
      Right before you creat your game,
you need to sign in with your Google Account or Email Account to create and share your lobby.
			</p>
		</div>
	)
}