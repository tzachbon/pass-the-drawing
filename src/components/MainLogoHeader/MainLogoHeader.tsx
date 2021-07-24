import { st, classes } from './MainLogoHeader.st.css'


export const HEADER_CONTAINER_TEST_ID = 'MainLogoHeader_HEADER_CONTAINER_TEST_ID'
export const HEADER_TEST_ID = 'MainLogoHeader_HEADER_TEST_ID'
export const VERSION_TEST_ID = 'MainLogoHeader_VERSION_TEST_ID'

interface MainLogoHeaderProps {
    className?: string
}

export const MainLogoHeader: React.FC<MainLogoHeaderProps> = ({
	className,
}) => {
	return (
		<div
			data-testid={HEADER_CONTAINER_TEST_ID} 
			className={st(classes.root, className)}
		>
			<h1
				data-testid={HEADER_TEST_ID}
				className={classes.mainHeader}
			>
				<span>Pass</span> <br /> The Draw
			</h1>
			<h3
				data-testid={VERSION_TEST_ID}
				className={classes.version}
			>
                ALPHA v0.1
			</h3>
		</div>
	)
}
