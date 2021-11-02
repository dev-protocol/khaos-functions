import test from 'ava'
import { ipfsLs } from './ipfsLs'

test('Returns files from IPFS', async (t) => {
	const cid = 'QmaxC88PchKV967XYSZqEZRi1hxktnk8sxDrETNN1UXXzS'
	const ipfs = {
		ls: async function* (arg: string) {
			yield arg === cid
				? {
						cid: 'QmSfKj57GLmnjthA9PxFt9RLszoJ3W25JwiuE6phgLZPwB',
						depth: 1,
						name: 'index.js',
						path: 'QmaxC88PchKV967XYSZqEZRi1hxktnk8sxDrETNN1UXXzS/index.js',
						size: 860,
						type: 'file',
				  }
				: undefined
		},
	}
	const res = await ipfsLs(ipfs as any)(cid)
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
