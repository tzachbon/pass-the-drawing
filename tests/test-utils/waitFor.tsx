
export function waitForTimeout(time: number) {
	return new Promise(res => setTimeout(res, time))
}