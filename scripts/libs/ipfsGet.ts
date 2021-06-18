/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-loop-statement */
import ipfsHttpClient from 'ipfs-http-client'
import BufferList from 'bl'
import { always } from 'ramda'

export const ipfsGet =
	(ipfs: ReturnType<typeof ipfsHttpClient>) =>
	async (cid: string): Promise<string | undefined> =>
		(async (iterater) => {
			for await (const data of iterater) {
				const content = new BufferList()
				if (data.type === 'file' && data.content) {
					for await (const chunk of data.content) {
						content.append(Buffer.from(chunk))
					}
				}
				return content.length ? content.toString() : undefined
			}
		})(ipfs.get(cid)).catch(always(undefined))
