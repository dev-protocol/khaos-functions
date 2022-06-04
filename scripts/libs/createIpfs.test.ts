import test from 'ava'
import { createIpfs } from './createIpfs'
import ipfsHttpClient from 'ipfs-http-client'

const ipfs = ipfsHttpClient({
	host: 'ipfs.io',
	port: 443,
	protocol: 'https',
})

test('Returns IPFS client', (t) => {
	const res = createIpfs()
	t.deepEqual(Object.keys(res), Object.keys(ipfs))
})
