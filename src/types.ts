import type firebase from 'firebase/app'
import type { GameSubjects } from '@constants'

export type User = firebase.User
export interface ISubjects {
    value: GameSubjects
}

export interface CreateGameParams {
    word: string
    subject: GameSubjects
}

export interface Game extends CreateGameParams {
    id: string
    createdTime: number
    startTime?: number
    started?: boolean
    players: Player[]
    endTime?: number
    currentPlayingIndex?: number
    winner?: Player
}

export interface Player {
    id?: string | null
    name: string
    image?: string | null
    role: PlayerRoles
}

export enum PlayerRoles {
    Admin = 'Admin',
    Regular = 'Regular',
}
