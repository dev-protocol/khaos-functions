/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-let */
import test from 'ava'
import func from './index'
import { V0Options } from './types'
import * as importFunctions from './importFunctions'
import * as callFunctions from './callFunctions'
import { stub, SinonStub, spy, SinonSpy } from 'sinon'
import * as example from '../functions/example'
import { Context } from '@azure/functions'
import { Functions } from '@devprotocol/khaos-core'

let importFunctionsStub: SinonStub<
	[id: string],
	ReturnType<typeof importFunctions['importFunctions']>
>
let callFunctionsSpy: SinonSpy<
	[Functions, V0Options],
	ReturnType<typeof callFunctions['callFunctions']>
>
const importFunctionsSpy = spy(() => Promise.resolve(example))

test.beforeEach(() => {
	importFunctionsStub = stub(importFunctions, 'importFunctions').callsFake(
		importFunctionsSpy
	)
	callFunctionsSpy = spy(callFunctions, 'callFunctions')
})

test.afterEach(() => {
	importFunctionsStub.restore()
	callFunctionsSpy.restore()
})

test.serial('Passes `id` in the request body to importFunctions', async (t) => {
	const id = `${Math.random()}`
	await func((undefined as unknown) as Context, {
		body: { id },
	})
	t.deepEqual(importFunctionsSpy.getCall(0).args, [id])
	t.is(importFunctionsStub.callCount, 1)
})

test.serial(
	'Passes the result of importFunctions and the request body to callFunctions',
	async (t) => {
		const test = `${Math.random()}`
		const expected = { id: 'example', test }
		await func((undefined as unknown) as Context, {
			body: expected,
		})
		t.deepEqual(callFunctionsSpy.getCall(0).args, [example, expected as any])
		t.is(callFunctionsSpy.callCount, 1)
	}
)

test.serial('Returns object for Azure Functions', async (t) => {
	const res = await func((undefined as unknown) as Context, {
		body: {
			id: 'example',
			method: 'addresses',
			options: { network: 'mainnet' },
		},
	})
	t.deepEqual(res, {
		status: 200,
		body: {
			data: '0x0_mainnet',
		},
	})
})
