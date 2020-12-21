import ipfsHttpClient from 'ipfs-http-client'
import { always } from 'ramda'
const ipfs = ipfsHttpClient({
	host: 'ipfs.infura.io',
	port: 5001,
	protocol: 'https',
})

export const createIpfs = always(ipfs)
