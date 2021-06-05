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
		'QmcbW9PwXLRFbSdfYqekdtBfL1CYK6jzrfJw1vrP9prs6k'
	)
	t.is(res, undefined)
})
