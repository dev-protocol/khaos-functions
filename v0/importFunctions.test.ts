import test from 'ava'
import { importFunctions } from './importFunctions'
import * as example from '../functions/example'
import { stub } from 'sinon'
import { always } from 'ramda'

test('Import functions object from functions dir', async (t) => {
	const res = await importFunctions('example')
	t.deepEqual(res, example)
})

test('Returns undefined when not exists the file', async (t) => {
	const res = await importFunctions('__example')
	t.is(res, undefined)
})

test.serial(
	'Returns undefined when exists the file but not exports `abi`',
	async (t) => {
		const x = stub(example, 'abi').get(always(undefined))
		const res = await importFunctions('example')
		t.is(res, undefined)
		x.restore()
	}
)

test.serial(
	'Returns undefined when exists the file but not exports `addresses`',
	async (t) => {
		const x = stub(example, 'addresses').get(always(undefined))
		const res = await importFunctions('example')
		t.is(res, undefined)
		x.restore()
	}
)

test.serial(
	'Returns undefined when exists the file but not exports `authorize`',
	async (t) => {
		const x = stub(example, 'authorize').get(always(undefined))
		const res = await importFunctions('example')
		t.is(res, undefined)
		x.restore()
	}
)

test.serial(
	'Returns undefined when exists the file but not exports `oraclize`',
	async (t) => {
		const x = stub(example, 'oraclize').get(always(undefined))
		const res = await importFunctions('example')
		t.is(res, undefined)
		x.restore()
	}
)
