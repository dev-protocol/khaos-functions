import test from 'ava'
import { stub } from 'sinon'
import * as fetchRegistry from '../scripts/libs/fetchRegistry'
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
	stub(fetchRegistry, 'fetchRegistry').callsFake(() =>
		Promise.resolve([
			{
				id: 'example',
				ipfs: 'QmPGof4vrGsfw61S2s6yZ5QpFgiYzR1w53acAdnx1KSNF7',
			},
		])
	)
	const res = await ids()
	t.deepEqual(res, [
		{
			id: 'example',
			ipfs: 'QmPGof4vrGsfw61S2s6yZ5QpFgiYzR1w53acAdnx1KSNF7',
		},
	])
})
