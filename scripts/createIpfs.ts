import ipfsHttpClient from 'ipfs-http-client'
import { always } from 'ramda'
const ipfs = ipfsHttpClient({
	host: 'ipfs.io',
	port: 443,
	protocol: 'https',
})

export const createIpfs = always(ipfs)
