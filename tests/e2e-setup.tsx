import 'expect-puppeteer'
import path from 'path'
import { config } from 'dotenv'

jest.setTimeout(40_000)
config({ path: path.resolve('.env.test') })