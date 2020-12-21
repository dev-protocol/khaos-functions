/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-loop-statement */
import ipfsHttpClient from 'ipfs-http-client'
import BufferList from 'bl'

export const ipfsGet = (ipfs: ReturnType<typeof ipfsHttpClient>) => async (
	cid: string
): Promise<string> => {
	const content = new BufferList()
	for await (const file of ipfs.get(cid)) {
		for await (const chunk of file.content) {
			content.append(chunk)
		}
	}
	return content.toString()
}
