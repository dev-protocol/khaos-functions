import test from 'ava'
import { createIpfs } from './createIpfs'
import { ipfsLs } from './ipfsLs'

test('Returns files from IPFS', async (t) => {
	const ipfs = createIpfs()
	const res = await ipfsLs(ipfs)(
		'QmaxC88PchKV967XYSZqEZRi1hxktnk8sxDrETNN1UXXzS'
	)
	t.deepEqual(res, [
		{
			cid: 'QmSfKj57GLmnjthA9PxFt9RLszoJ3W25JwiuE6phgLZPwB',
			depth: 1,
			name: 'index.js',
			path: 'QmaxC88PchKV967XYSZqEZRi1hxktnk8sxDrETNN1UXXzS/index.js',
			size: 860,
			type: 'file',
		},
	])
})
