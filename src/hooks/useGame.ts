import { useEffect, useState } from 'react'
import { fetchGame } from '../api/fetchGame'
import type { Game } from '../types'

interface Params {
    id: string
}

export function useGame({ id }: Params) {
	const [game, setGame] = useState<Game | null>()

	useEffect(() => {
		const { remove } = fetchGame(id,
			(currentGame) => setGame(currentGame))

		return () => remove()
	},
	[id])

	return {
		game,
	}
}
