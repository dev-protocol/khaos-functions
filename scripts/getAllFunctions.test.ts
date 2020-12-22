import test from 'ava'
import * as fetchRegistry from './libs/fetchRegistry'
import fs from 'fs-extra'
import { stub } from 'sinon'
import { getAllFunctions } from './getAllFunctions'
import { ipfsGet } from './libs/ipfsGet'
import { createIpfs } from './libs/createIpfs'
import { join } from 'path'

stub(fetchRegistry, 'fetchRegistry').callsFake(() =>
	Promise.resolve([
		{
			id: 'example',
			ipfs: 'QmPGof4vrGsfw61S2s6yZ5QpFgiYzR1w53acAdnx1KSNF7',
		},
	])
)

let expectedCode: string

test.before(async () => {
	expectedCode = await ipfsGet(createIpfs())(
		'QmSSeW78f4vrSXsn2LY6pfLJVsT9rscSWXYD6EMH3paFhj'
	).then((x) => x as string)
})

test('Save files', async (t) => {
	const stubFs = stub(fs, 'outputFile')
	await getAllFunctions()
	t.is(stubFs.callCount, 1)
	t.deepEqual(stubFs.getCall(0).args, [
		join(__dirname, '..', 'functions', 'example', 'index.js'),
		expectedCode,
	] as any)
})
