/* eslint-disable functional/no-throw-statement */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-promise-reject */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/functional-parameters */
import { fetchRegistry } from './libs/fetchRegistry'
import { outputFile } from 'fs-extra'
import pQueue from 'p-queue'
import { ipfsGet } from './libs/ipfsGet'
import { whenDefined } from '@devprotocol/util-ts'
import { join } from 'path'
import pRetry from 'p-retry'

export const getAllFunctions = async () => {
	const registry = await fetchRegistry()
	const get = ipfsGet('https://cloudflare-ipfs.com/ipfs')
	const tasks = registry.map(({ id, ipfs: cid }) => async () => {
		const queue = new pQueue({ concurrency: 1 })
		return queue.add(async () => {
			const code = await pRetry(
				async () => {
					const res = await get(cid)
					if (!res) {
						console.log('Empty file fetched, will retry', { id, cid })
						throw new Error('')
					}

					return res
				},
				{ forever: true },
			)
			const joined = join(__dirname, '..', 'functions', id, 'index.js')
			return (
				whenDefined(code, async (c) => outputFile(joined, c)) ?? new Error('')
			)
		})
	})
	return new pQueue({ concurrency: 1 }).addAll(tasks).then((res) => res)
}
