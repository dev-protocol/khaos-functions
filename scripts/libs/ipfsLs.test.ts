import test from 'ava'
import { createIpfs } from './createIpfs'
import { ipfsLs } from './ipfsLs'

test('Returns files from IPFS', async (t) => {
	const ipfs = createIpfs()
	const res = await ipfsLs(ipfs)(
		'QmcbW9PwXLRFbSdfYqekdtBfL1CYK6jzrfJw1vrP9prs6k'
	)
	t.deepEqual(res, [
		{
			cid: 'QmTP95pM5HumrZYzZZwbDAhq1mz5NMJzD6smxziTsR7uQU',
			depth: 1,
			name: 'index.js',
			path: 'QmcbW9PwXLRFbSdfYqekdtBfL1CYK6jzrfJw1vrP9prs6k/index.js',
			size: 898,
			type: 'file',
		},
	])
})
