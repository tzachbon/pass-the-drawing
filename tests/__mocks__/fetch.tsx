export const fetch = fetchMock
export function cleanup() {
	fetch.mockClear()
}
