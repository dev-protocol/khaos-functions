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

test('Returns undefined when the passed options.method is "addresses" but options.options is not passed', async (t) => {
	t.is(
		await callFunctions(example, {
			id: '',
			method: 'addresses',
			options: { network: undefined },
		}),
		undefined
	)
	t.is(
		await callFunctions(example, {
			id: '',
			method: 'addresses',
		}),
		undefined
	)
})

test('Returns undefined when the passed options.method is "authorize" but options.options is not passed', async (t) => {
	t.is(
		await callFunctions(example, {
			id: '',
			method: 'authorize',
			options: { message: '', secret: '', request: undefined },
		}),
		undefined
	)
	t.is(
		await callFunctions(example, {
			id: '',
			method: 'authorize',
			options: { message: '', secret: undefined, request: {} as any },
		}),
		undefined
	)
	t.is(
		await callFunctions(example, {
			id: '',
			method: 'authorize',
			options: { message: undefined, secret: '', request: {} as any },
		}),
		undefined
	)
	t.is(
		await callFunctions(example, {
			id: '',
			method: 'authorize',
			options: { message: undefined, secret: undefined, request: undefined },
		}),
		undefined
	)
	t.is(
		await callFunctions(example, {
			id: '',
			method: 'authorize',
		}),
		undefined
	)
})

test('Returns undefined when the passed options.method is "oraclize" but options.options is not passed', async (t) => {
	t.is(
		await callFunctions(example, {
			id: '',
			method: 'oraclize',
			options: {
				signatureOptions: { id: '', address: '0x0', message: 'text' },
				query: {
					publicSignature: '',
					allData: [{}],
					transactionhash: '0x0',
				},
				network: undefined,
			},
		}),
		undefined
	)
	t.is(
		await callFunctions(example, {
			id: '',
			method: 'oraclize',
			options: {
				signatureOptions: { id: '', address: '0x0', message: 'text' },
				query: undefined,
				network: 'mainnet',
			},
		}),
		undefined
	)
	t.is(
		await callFunctions(example, {
			id: '',
			method: 'oraclize',
			options: {
				signatureOptions: undefined,
				query: {
					publicSignature: '',
					allData: [{}],
					transactionhash: '0x0',
				},
				network: 'mainnet',
			},
		}),
		undefined
	)
	t.is(
		await callFunctions(example, {
			id: '',
			method: 'oraclize',
			options: {
				signatureOptions: undefined,
				query: undefined,
				network: undefined,
			},
		}),
		undefined
	)
	t.is(
		await callFunctions(example, {
			id: '',
			method: 'oraclize',
		}),
		undefined
	)
})
