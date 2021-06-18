import { classes, st } from './GuessWordScreen.st.css'

export const ROOT_TEST_ID = 'GuessWordScreen_ROOT_TEST_ID'

export interface GuessWordScreenProps {
  className?: string
}

export const GuessWordScreen: React.VFC<GuessWordScreenProps> = (
	{
		className,
	},
) => {
	return (
		<div
			data-testid={ROOT_TEST_ID}
			className={st(classes.root, className)}
		>
      GuessWordScreen works!
		</div>
	)
}
