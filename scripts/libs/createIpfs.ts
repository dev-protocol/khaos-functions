import ipfsHttpClient from 'ipfs-http-client'
import { always } from 'ramda'
const ipfs = ipfsHttpClient({
	host: 'ipfs.io',
	port: 80,
	protocol: 'http',
})

export const createIpfs: () => ReturnType<typeof ipfsHttpClient> = always(ipfs)
