/* eslint-disable functional/no-conditional-statement */
import test from 'ava'
import * as fetchRegistry from './libs/fetchRegistry'
import fs from 'fs-extra'
import { stub } from 'sinon'
import { getAllFunctions } from './getAllFunctions'
import { ipfsGet } from './libs/ipfsGet'
import * as ipfsGetFn from './libs/ipfsGet'
import { createIpfs } from './libs/createIpfs'
import { join } from 'path'

stub(fetchRegistry, 'fetchRegistry').callsFake(() =>
	Promise.resolve([
		{
			id: 'example',
			ipfs: 'QmSfKj57GLmnjthA9PxFt9RLszoJ3W25JwiuE6phgLZPwB',
		},
	])
)

let expectedCode: string

test.before(async () => {
	expectedCode = await ipfsGet(createIpfs())(
		'QmSfKj57GLmnjthA9PxFt9RLszoJ3W25JwiuE6phgLZPwB'
	).then((x) => x as string)
})

test.serial('Save files', async (t) => {
	const stubFs = stub(fs, 'outputFile')
	await getAllFunctions()
	t.is(stubFs.callCount, 1)
	t.deepEqual(stubFs.getCall(0).args, [
		join(__dirname, '..', 'functions', 'example', 'index.js'),
		expectedCode,
	] as any)
	stubFs.restore()
})

test.serial('Retry', async (t) => {
	const stubFs = stub(fs, 'outputFile')
	let count = 0
	const stubIpfsGet = stub(ipfsGetFn, 'ipfsGet').callsFake(
		() => (cid: string) => {
			count = count + 1
			if (count > 3) {
				return Promise.resolve(expectedCode)
			}
			return Promise.resolve(undefined)
		}
	)

	await getAllFunctions()
	t.is(count, 4)
	t.deepEqual(stubFs.getCall(0).args, [
		join(__dirname, '..', 'functions', 'example', 'index.js'),
		expectedCode,
	] as any)
	stubFs.restore()
	stubIpfsGet.restore()
})
