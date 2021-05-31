export const mockRouter = () => {
	jest.mock('react-router-dom', () => ({
		useHistory,
	}))
}
export const push = jest.fn()
export const useHistory = jest.fn().mockReturnValue({
	push,
})

export function cleanup() {
	push.mockClear()
	useHistory.mockClear()
}