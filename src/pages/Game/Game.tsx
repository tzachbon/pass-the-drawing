import { classes, st } from './Game.st.css'

export interface GameProps {
  className?: string
}

export const ROOT_TEST_ID = 'Game_ROOT_TEST_ID'

export const Game: React.FC<GameProps> = (
	{
		className,
	},
) => {
	return (
		<div
			data-testid={ROOT_TEST_ID}
			className={st(classes.root, className)}
		>
      Game works!
		</div>
	)
}
