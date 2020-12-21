import test from 'ava'
import { createIpfs } from './createIpfs'
import { ipfsLs } from './ipfsLs'

test('Returns files from IPFS', async (t) => {
	const ipfs = createIpfs()
	const res = await ipfsLs(ipfs)(
		'QmPGof4vrGsfw61S2s6yZ5QpFgiYzR1w53acAdnx1KSNF7'
	)
	t.deepEqual(res, [
		{
			cid: 'QmSSeW78f4vrSXsn2LY6pfLJVsT9rscSWXYD6EMH3paFhj',
			depth: 1,
			name: 'index.js',
			path: 'QmPGof4vrGsfw61S2s6yZ5QpFgiYzR1w53acAdnx1KSNF7/index.js',
			size: 543,
			type: 'file',
		},
	])
})
