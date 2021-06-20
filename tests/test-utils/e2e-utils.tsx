import type { Page } from 'puppeteer'
import firebaseIndexedDb from '../__mocks__/firebaseIndexedDb.mock.json'
import tokenMock from '../__mocks__/token.mock.json'
import getAccountInfoMock from '../__mocks__/getAccountInfo.mock.json'
import type idb from 'idb'

export const PORT = 5000
export const URL = `http://localhost:${PORT}`

declare global {
	interface Window { idb: typeof idb }
}

export async function stubFirebaseAuth(page: Page) {
	await createFakeFirebaseIndexedDb(page)
	await createFirebaseAuthApiMock(page)
}

export async function createFakeFirebaseIndexedDb(page: Page) {
	await page.addScriptTag({ url: 'https://unpkg.com/idb/build/iife/index-min.js' })
	await page.evaluate(async (mock: typeof firebaseIndexedDb) => {
		const dbName = 'firebaseLocalStorageDb'
		const objName = 'firebaseLocalStorage'

		const db = await window.idb.openDB(dbName, 1, {
			upgrade(database) {
				if (!database.objectStoreNames.contains(objName)) {
					database.createObjectStore(objName, { keyPath: 'fbase_key' })
				}
			},
		})

		const localData = await db.getAllKeys(objName)

		if (!localData?.length) {
			await db
				.transaction(objName, 'readwrite')
				.objectStore(objName)
				.add(mock)
		}
	}, firebaseIndexedDb)
}

export async function createFirebaseAuthApiMock(page: Page) {
	await page.setRequestInterception(true)

	page.on('request', (request) => {
		if (request.method() !== 'OPTIONS' && request.url().includes('securetoken.googleapis.com/v1/token')) {
			void request.respond({
				status: 200,
				contentType: 'application/json; charset=UTF-8',
				body: JSON.stringify(tokenMock),
			})
		} else if (request.method() !== 'OPTIONS' && request.url().includes('identitytoolkit/v3/relyingparty/getAccountInfo')) {
			void request.respond({
				status: 200,
				contentType: 'application/json; charset=UTF-8',
				body: JSON.stringify(getAccountInfoMock),
			})
		} else {
			void request.continue()
		}
	})
}