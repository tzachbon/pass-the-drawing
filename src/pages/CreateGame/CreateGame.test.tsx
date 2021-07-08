/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { GameSubjects } from '@constants'
import {
    aCategory,
    anUser,
    anUserToPlayer,
    aWord,
    uuidRegexPattern,
    waitFor,
} from '@test-utils'
import type { User } from '@types'
import {
    authState,
    get,
    set,
    signInWithRedirect,
} from '../../../tests/__mocks__/firebase'
import { createGameDriver } from './CreateGame.driver'

describe('CreateGame', () => {
    let word = aWord()
    let category = aCategory({ entities: [ word ] })
    const fakeUser = anUser() as unknown as User
    const fakePlayer = anUserToPlayer(fakeUser)
    const driver = createGameDriver().beforeAndAfter()

    beforeEach(() => {
        word = aWord()
        category = aCategory({ entities: [ word ] })
        get.mockResolvedValue({ val: () => category })
    })

    it('should create a game', async () => {
        const subject = GameSubjects.Food

        driver.testkit().selectSubject().input().type(subject)
        driver.testkit().login().modal().open()
        driver.testkit().login().modal().signInWithGoogle().click()

        await waitFor(() => {
            authState.onAuthStateChangedCallback(fakeUser)
        })

        await waitFor(() => {
            expect(
                driver.testkit().login().modal().element(),
            ).not.toBeInTheDocument()
            expect(driver.testkit().submit().button().disabled()).toBeFalsy()
        })

        driver.testkit().submit().button().click()

        await waitFor(() => {
            expect(driver.testkit().submit().error().element()).toBeNull()
            expect(set).toBeCalledWith(
                expect.objectContaining({
                    currentPlayingIndex: 0,
                    id: expect.stringMatching(new RegExp(uuidRegexPattern)),
                    players: [ fakePlayer ],
                    createdTime: expect.any(Number),
                    subject,
                    word,
                }),
            )
        })
    })

    it('should add subject to local storage', () => {
        driver.testkit().selectSubject().input().type('test')

        expect(driver.testkit().selectSubject().localStorage().get()).toEqual(
            'test',
        )
    })

    it('should not show subject error when clicking on the sign in button', () => {
        driver.testkit().login().modal().open()

        expect(driver.testkit().login().modal().element()).toBeInTheDocument()
        expect(
            driver.testkit().selectSubject().error().element(),
        ).not.toBeInTheDocument()
    })

    it('should show invalid subject error message when subject is invalid and submit clicked', async () => {
        driver.testkit().selectSubject().input().type('Invalid')

        await waitFor(() => {
            authState.onAuthStateChangedCallback(fakeUser)
        })

        driver.testkit().submit().button().click()

        await waitFor(() => {
            expect(driver.testkit().selectSubject().error().text()).toEqual(
                'Game subject must be one of Countries,Dragonball,Food,Superheroes',
            )
        })
    })

    it('should clear local storage when submit finished', async () => {
        const subject = GameSubjects.Food

        driver.testkit().selectSubject().input().type(subject)
        driver.testkit().login().modal().open()
        driver.testkit().login().modal().signInWithGoogle().click()

        await waitFor(() => {
            authState.onAuthStateChangedCallback(fakeUser)
        })

        expect(
            driver.testkit().submit().button().element(),
        ).not.toHaveAttribute('disabled')

        driver.testkit().submit().button().click()

        await waitFor(() => {
            expect(driver.history?.location.pathname).toEqual('/')
            expect(
                driver.testkit().selectSubject().localStorage().get(),
            ).toEqual('')
        })
    })

    it('should throw an error and show it to the user', async () => {
        get.mockRejectedValue(new Error())

        driver.testkit().selectSubject().input().type(GameSubjects.Food)
        driver.testkit().login().modal().open()
        driver.testkit().login().modal().signInWithGoogle().click()

        await waitFor(() => {
            authState.onAuthStateChangedCallback(fakeUser)
        })

        expect(driver.testkit().submit().button().disabled()).toBeFalsy()

        driver.testkit().submit().button().click()

        await waitFor(() => {
            expect(driver.testkit().submit().error().text()).toEqual(
                'We ran into small problem, can you please try again?',
            )
            expect(get).toHaveBeenCalled()
        })
    })

    it('should do login process', async () => {
        driver.testkit().login().modal().open()
        driver.testkit().login().modal().signInWithGoogle().click()

        await waitFor(() => {
            expect(signInWithRedirect).toBeCalled()
        })

        await waitFor(() => {
            authState.onAuthStateChangedCallback(fakeUser)
        })

        expect(driver.testkit().login().modal().element()).toBeNull()
        expect(driver.testkit().login().message().element()).toHaveTextContent(
            'Logged in as ' + String(fakeUser.displayName),
        )
    })

    it('should display email in-case displayName does not exist', async () => {
        driver.testkit().login().modal().open()
        driver.testkit().login().modal().signInWithGoogle().click()

        await waitFor(() => {
            expect(signInWithRedirect).toBeCalled()
        })

        await waitFor(() => {
            authState.onAuthStateChangedCallback({
                ...fakeUser,
                displayName: undefined,
            })
        })

        expect(driver.testkit().login().modal().element()).toBeNull()
        expect(driver.testkit().login().message().element()).toHaveTextContent(
            'Logged in as ' + String(fakeUser.email),
        )
    })
})
