/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { renderHook, cleanup, act } from '@testing-library/react-hooks'
import { useAsync } from '@hooks/useAsync'

describe('useAsync', () => {
    let runnerMock = jest.fn()
    let resolve = (_value?: any) => {
        return
    }
    let reject = (_value?: any) => {
        return
    }

    afterEach(() => {
        void cleanup()
        runnerMock = jest.fn().mockReturnValue(
            new Promise((res, rej) => {
                resolve = res
                reject = rej
            }),
        )
    })

    it('should pass args to callback', async () => {
        const args = [ 1, 'string' ]

        const { result, waitFor } = renderHook(() => useAsync())

        void act(() => {
            void result.current.run(runnerMock)(...args)
        })

        void act(() => {
            resolve()
        })

        await waitFor(() => {
            expect(runnerMock).toBeCalledWith(...args)
        })
    })

    it('should handle loading', async () => {
        const { result, waitFor } = renderHook(() => useAsync())

        expect(result.current.loading).toEqual(false)

        void act(() => {
            void result.current.run(runnerMock)()
        })

        expect(result.current.loading).toEqual(true)

        void act(() => {
            resolve()
        })

        await waitFor(() => {
            expect(result.current.loading).toEqual(false)
            expect(result.current.error).toBeUndefined()
        })
    })

    it('should throw an error', async () => {
        const { result, waitFor } = renderHook(() => useAsync())
        const error = new Error('Test')

        expect(result.current.loading).toEqual(false)

        void act(() => {
            void result.current.run(runnerMock)()
        })

        expect(result.current.loading).toEqual(true)

        void act(() => {
            reject(error)
        })

        await waitFor(() => {
            expect(result.current.loading).toEqual(false)
            expect(result.current.error).toEqual(error)
        })
    })
})
