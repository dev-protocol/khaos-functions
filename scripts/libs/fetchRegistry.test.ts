/* eslint-disable functional/immutable-data */
/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import test from 'ava'
import { fetchRegistry, Registry } from './fetchRegistry'
import https from 'https'

const get = async () =>
	new Promise((resolve) => {
		const req = https.request(
			`https://raw.githubusercontent.com/dev-protocol/khaos-registry/main/map/functions.json?${Math.random()}`,
			(res) => {
				const data: any[] | Uint8Array[] = []
				res.on('data', (chunk) => {
					data.push(chunk)
				})
				res.on('end', () => {
					resolve(JSON.parse(Buffer.concat(data) as any))
				})
			},
		)
		req.end()
	})

test('Returns JSON from GitHub', async (t) => {
	const res = await fetchRegistry()
	const expected = (await get()) as Registry
	t.deepEqual(res, expected)
})
