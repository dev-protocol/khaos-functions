import test from 'ava'
import { createIpfs } from './createIpfs'
import { ipfsGet } from './ipfsGet'

test('Returns data from IPFS', async (t) => {
	const ipfs = createIpfs()
	const res = await ipfsGet(ipfs)(
		'QmXnnyufdzAWL5CqZ2RnSNgPbvCc1ALT73s6epPrRnZ1Xy'
	)
	t.is(
		res,
		`I'm trying out IPFS
`
	)
})

test('Returns undefined when the passed CID is not file', async (t) => {
	const cid = 'QmdbaSQbGU6Wo9i5LyWWVLuU8g6WrYpWh2K4Li4QuuE8Fr'
	const ipfs = {
		get: async function* (arg: string) {
			yield arg === cid ? { type: 'dir' } : undefined
		},
	}
	const res = await ipfsGet(ipfs as any)(cid)
	t.is(res, undefined)
})
