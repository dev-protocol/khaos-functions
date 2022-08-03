import ipfsHttpClient from 'ipfs-http-client'

export const createIpfs: (
	host?: string
) => ReturnType<typeof ipfsHttpClient> = (host?: string) =>
	ipfsHttpClient({
		host: host ? host : 'ipfs.io',
		port: 443,
		protocol: 'https',
	})
