import test from 'ava'
import { fetchRegistry } from '../scripts/libs/fetchRegistry'
import { call, ids } from './index'

test('Returns results of v0 by default', async (t) => {
	const res = await call()({ id: 'example', method: 'abi' })
	t.deepEqual(res, { data: ['event Query()'] })
})

test('Returns results of the results of the passed version', async (t) => {
	const res = await call('v0')({ id: 'example', method: 'abi' })
	t.deepEqual(res, { data: ['event Query()'] })
})

test('Returns undefined when the passed version is not found', async (t) => {
	const res = await call('v999')({ id: 'example', method: 'abi' })
	t.is(res, undefined)
})

test('Returns registry', async (t) => {
	const expected = await fetchRegistry()
	const res = await ids()
	t.deepEqual(res, expected)
})
