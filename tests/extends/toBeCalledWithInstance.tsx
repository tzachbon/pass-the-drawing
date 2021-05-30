
declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace jest {
		interface Matchers<R> {
			toBeCalledWithInstance<T extends Function>(received: T): R;
		}
	}
}


expect.extend({
	toBeCalledWithInstance<T extends Function>(this: jest.MatcherContext, expected: jest.Mock, received: T): jest.CustomMatcherResult {
		const isInstance = expected?.
			mock?.
			calls
			.some(calls => Array.isArray(calls) && calls.some(call => call instanceof received))


		if (isInstance) {
			return {
				pass: true,
				message: () => '',
			}
		} else {
			return {
				pass: false,
				message: () => `Expected ${this.utils.printExpected(expected.name)} to be called with instance of ${this.utils.printReceived(received)}`,
			}
		}
	},
})

export { }