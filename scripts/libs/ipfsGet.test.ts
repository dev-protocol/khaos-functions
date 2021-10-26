import test from 'ava'
import ipfsHttpClient from 'ipfs-http-client'
import { ipfsGet } from './ipfsGet'

test('Returns data from IPFS', async (t) => {
	const ipfs = ipfsHttpClient({
		host: 'ipfs.infura.io',
		apiPath: 'api/v0',
		port: 5001,
		protocol: 'https',
	})
	const { cid } = await ipfs.add('Hello world!')
	const res = await ipfsGet(ipfs)(cid.toString())
	t.is(res, 'Hello world!')
})

test('Returns undefined when the passed CID is not file', async (t) => {
	const cid = 'QmcbW9PwXLRFbSdfYqekdtBfL1CYK6jzrfJw1vrP9prs6k'
	const ipfs = {
		get: (arg: string) => {
			arg === cid
				? {
						[Symbol.iterator]: () => ({
							next() {
								return { type: 'dir' }
							},
						}),
				  }
				: undefined
		},
	}
	const res = await ipfsGet(ipfs as any)(cid)
	t.is(res, undefined)
})
