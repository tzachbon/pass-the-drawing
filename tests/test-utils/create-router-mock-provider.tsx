import { createMemoryHistory, MemoryHistoryBuildOptions } from 'history'
import { Router } from 'react-router'

interface Params {
    initialRoute?: string
}

export function createRouterMockProvider({ initialRoute }: Params = {}) {
    const options: MemoryHistoryBuildOptions = {}

    if (initialRoute) {
        options.initialEntries = [ initialRoute ]
        options.initialIndex = 0
    }

    const history = createMemoryHistory(options)
    const pushSpy = jest.spyOn(history, 'push')

    const RouterWrapperMock: React.ComponentType = ({ children }) => {
        return <Router history={history}>{children}</Router>
    }

    return {
        pushSpy,
        history,
        RouterWrapperMock,
    }
}
