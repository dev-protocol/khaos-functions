/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-loop-statement */
import ipfsHttpClient from 'ipfs-http-client'

type File = {
	readonly name: string
	readonly path: string
	readonly size: number
	readonly cid: string
	readonly type: string
	readonly depth: number
}

export const ipfsLs = (ipfs: ReturnType<typeof ipfsHttpClient>) => async (
	cid: string
): Promise<readonly File[]> => {
	const set = new Set<File>()
	for await (const file of ipfs.ls(cid)) {
		set.add({ ...file, cid: file.cid.toString() })
	}
	return Array.from(set)
}
