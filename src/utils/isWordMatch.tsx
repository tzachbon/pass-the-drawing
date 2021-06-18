import type { Game } from '@types'

export function isWordMatch(game: Game, word: string) {
	return game.word.toLowerCase() === word.toLowerCase()
}