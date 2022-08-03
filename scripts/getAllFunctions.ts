/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/functional-parameters */
import { fetchRegistry } from './libs/fetchRegistry'
import { outputFile } from 'fs-extra'
import pQueue from 'p-queue'
import { createIpfs } from './libs/createIpfs'
import { ipfsGet } from './libs/ipfsGet'
import { whenDefined } from '@devprotocol/util-ts'
import { join } from 'path'

export const getAllFunctions = async () => {
	const registry = await fetchRegistry()
	const ipfs = createIpfs('gateway.pinata.cloud')
	const get = ipfsGet(ipfs)
	const tasks = registry.map(({ id, ipfs: cid }) => async () => {
		const queue = new pQueue({ concurrency: 1 })
		return queue.add(async () => {
			const code = await get(cid)
			const joined = join(__dirname, '..', 'functions', id, 'index.js')
			return whenDefined(code, async (c) => outputFile(joined, c))
		})
	})
	return new pQueue({ concurrency: 1 }).addAll(tasks)
}
