import test from 'ava'
import { createIpfs } from './createIpfs'
import { ipfsGet } from './ipfsGet'

test('Returns data from IPFS', async (t) => {
	const ipfs = createIpfs()
	const res = await ipfsGet(ipfs)(
		'QmdQ1rHHHTbgbGorfuMMYDQQ36q4sxvYcB4GDEHREuJQkL'
	)
	t.is(res, 'Hello, from OpenInternetAccess.com')
})
