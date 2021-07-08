export const USER_NOT_FOUND_ERROR_CODE = 'auth/user-not-found'
export const MAXIMUM_EXPIRE_TIME = 13
export const MINIMUM_PLAYERS_LENGTH = 3

export const Routes = {
    HOME: '/',
    CREATE_GAME: '/create-game',
    LOBBY: '/lobby',
    GAME: '/game',
} as const

export enum GameSubjects {
    Countries = 'countries',
    DragonBall = 'dragonBall',
    Food = 'food',
    Superheroes = 'superheroes',
}

/* eslint-disable spellcheck/spell-checker */
export const firebaseConfig = {
    apiKey: 'AIzaSyDKaEWr0bf2H0M0C4RKzAMznIy7JbR8OhU',
    authDomain: 'pass-the-drawing.firebaseapp.com',
    databaseURL: 'https://pass-the-drawing.firebaseio.com',
    projectId: 'pass-the-drawing',
    storageBucket: 'pass-the-drawing.appspot.com',
    messagingSenderId: '927540438920',
    appId: '1:927540438920:web:fc125c54286eb7d2727c3d',
    measurementId: 'G-29E7KM74XJ',
}
