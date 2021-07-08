export function getExpireTimestamp(expireTime: number) {
	const time = new Date()
	time.setSeconds(time.getSeconds() + expireTime)

	return time.getTime()
}