/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/functional-parameters */
import { fetchRegistry } from './libs/fetchRegistry'
import { outputFile } from 'fs-extra'
import pQueue from 'p-queue'
import { createIpfs } from './libs/createIpfs'
import { ipfsLs } from './libs/ipfsLs'
import { ipfsGet } from './libs/ipfsGet'
import { whenDefined } from '@devprotocol/util-ts'
import { join } from 'path'

export const getAllFunctions = async () => {
	const registry = await fetchRegistry()
	const ipfs = createIpfs()
	const ls = ipfsLs(ipfs)
	const get = ipfsGet(ipfs)
	const tasks = registry.map(({ id, ipfs: cid }) => async () => {
		const queue = new pQueue({ concurrency: 1 })
		const files = await ls(cid)
		return queue.addAll(
			files.map((file) => async () => {
				const code = await get(file.cid)
				const path = file.path.replace(cid, '').split('/')
				const joined = join(__dirname, '..', 'functions', id, ...path)
				return whenDefined(code, async (c) => outputFile(joined, c))
			})
		)
	})
	return new pQueue({ concurrency: 1 }).addAll(tasks)
}
