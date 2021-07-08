import { Driver, RenderResult, testUtils } from '@test-utils'
import { ROOT_TEST_ID, RESET_WORD_BUTTON_TEST_ID, WordBoard, WordBoardProps, WORD_TEXT_TEST_ID } from './WordBoard'

interface Params {
	props: WordBoardProps
}

export function wordBoardDriver({ props }: Params) {
	return new WordBoardDriver(props, WordBoard)
}

export class WordBoardDriver extends Driver<Params['props']> {
	testkit() {
		return WordBoardTestkit(this.wrapper.container)
	}
}

export function WordBoardTestkit(container: RenderResult) {
	const testkit = {
		element: () => testUtils(ROOT_TEST_ID, container, { keys: [] }).element(),
		word: () => testUtils(WORD_TEXT_TEST_ID, container, { keys: [ 'text' ] }),
		button: () => testUtils(RESET_WORD_BUTTON_TEST_ID, container, { keys: [ 'disabled', 'click' ] }),
	}

	return testkit
}
