import { avatarTestkit } from '@components/Avatar/Avatar.driver'
import { Driver, Options, RenderResult, testUtils } from '@test-utils'
import { getPlayerTestId, Players, PlayersProps, ROOT_TEST_ID } from './Players'

interface Params {
	props: PlayersProps
	stylesheet: NonNullable<Options['stylesheet']>
}

export function playersDriver({ props, stylesheet }: Params) {
	return new PlayersDriver(props, Players, { stylesheet })
}

export class PlayersDriver extends Driver<Params['props']> {
	testkit() {
		return playersTestkit(this.wrapper.container)
	}
}

export function playersTestkit(container: RenderResult) {
	const utils = testUtils(ROOT_TEST_ID, container)

	const testkit = {
		element: () => utils.element(),
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		players: () => [ ...utils._element().children ].map((_, i) => testkit.player(i)),
		player: (index: number) => {
			const testId = getPlayerTestId(String(index))
			const utils = testUtils(testId, container, { keys: [ '_element', 'text' ] })

			return {
				image: () => testUtils(`${testId}_IMAGE`, container).element(),
				avatar: () => avatarTestkit(container),
				element: utils.element,
				text: utils.text,
			}
		},
	}

	return testkit
}
