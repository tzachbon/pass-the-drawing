export const mockRouter = () => {
	jest.mock('react-router-dom', () => ({ useHistory, useParams }))
	jest.mock('react-router', () => ({ match: jest.fn(), useParams: jest.fn().mockReturnValue({}) }))
}

export const match = jest.fn()
export const push = jest.fn()
export const useHistory = jest.fn().mockReturnValue({ push })
export const useParams = jest.fn()

export function cleanup() {
	push.mockClear()
	useParams.mockClear()
	useHistory.mockClear()
}
