import test from 'ava'
import { call } from './index'

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
