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

test('Returns undefined when the passed CID is not file', async (t) => {
	const ipfs = createIpfs()
	const res = await ipfsGet(ipfs)(
		'QmPGof4vrGsfw61S2s6yZ5QpFgiYzR1w53acAdnx1KSNF7'
	)
	t.is(res, undefined)
})
