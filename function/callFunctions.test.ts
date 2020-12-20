import test from 'ava'
import { callFunctions } from './callFunctions'
import * as example from '../functions/example'

test('Returns `abi` when the passed options.method is "abi"', async (t) => {
	const res = await callFunctions(example, { id: '', method: 'abi' } as any)
	t.is(res, example.abi)
})

test('Calls `addresses` when the passed options.method is "addresses"', async (t) => {
	const res = await callFunctions(example, {
		id: '',
		method: 'addresses',
		options: { network: 'mainnet' },
	})
	t.is(res, await example.addresses({ network: 'mainnet' }))
})

test('Calls `authorize` when the passed options.method is "authorize"', async (t) => {
	const res = await callFunctions(example, {
		id: '',
		method: 'authorize',
		options: { message: '', secret: '', request: {} as any },
	})
	t.is(res, true)
})

test('Calls `oraclize` when the passed options.method is "oraclize"', async (t) => {
	const res = await callFunctions(example, {
		id: '',
		method: 'oraclize',
		options: {
			signatureOptions: { id: '', address: '0x0', message: 'text' },
			query: {
				publicSignature: '',
				allData: [{}],
				transactionhash: '0x0',
			},
			network: 'mainnet',
		},
	})
	t.deepEqual(res, {
		message: 'message',
		status: 1,
		statusMessage: 'statusMessage',
	})
})
