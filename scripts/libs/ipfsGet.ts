/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-loop-statement */
import ipfsHttpClient from 'ipfs-http-client'
import BufferList from 'bl'
import { always } from 'ramda'

export const ipfsGet = (ipfs: ReturnType<typeof ipfsHttpClient>) => async (
	cid: string
): Promise<string | undefined> =>
	(async (iterater) => {
		const content = new BufferList()
		for await (const file of iterater) {
			for await (const chunk of file.content) {
				content.append(chunk)
			}
		}
		return content.toString()
	})(ipfs.get(cid)).catch(always(undefined))
