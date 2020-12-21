import test from 'ava'
import { createIpfs } from './createIpfs'
import ipfsHttpClient from 'ipfs-http-client'
const ipfs = ipfsHttpClient({
	host: 'ipfs.infura.io',
	port: 5001,
	protocol: 'https',
})

test('Returns IPFS client', (t) => {
	const res = createIpfs()
	t.deepEqual(Object.keys(res), Object.keys(ipfs))
})
