import test from 'ava'
import { ipfsGet } from './ipfsGet'

test('Returns data from IPFS', async (t) => {
	const res = await ipfsGet('https://gateway.pinata.cloud/ipfs')(
		'QmXnnyufdzAWL5CqZ2RnSNgPbvCc1ALT73s6epPrRnZ1Xy',
	)
	t.is(
		res,
		`I'm trying out IPFS
`,
	)
})

test('Returns undefined when the passed CID is not file', async (t) => {
	const cid = 'QmdbaSQbGU6Wo9i5LyWWVLuU8g6WrYpWh2K4Li4QuuE8Fr'
	const res = await ipfsGet('https://gateway.pinata.cloud/ipfs')(cid)
	t.is(res, undefined)
})

test('Returns undefined when the passed CID is not found', async (t) => {
	const cid = 'QmdbaSQbGU6Wo9i5LyWWVLuU8g6WrYpWh2K4Li4QuuE8F_'
	const res = await ipfsGet('https://gateway.pinata.cloud/ipfs')(cid)
	t.is(res, undefined)
})
