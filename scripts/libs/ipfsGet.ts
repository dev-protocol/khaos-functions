import { always } from 'ramda'
import bent from 'bent'

export const ipfsGet =
	(gateway: string) =>
	async (cid: string): Promise<string | undefined> =>
		(async (fetcher) => {
			return fetcher(`/${cid}`)
		})(bent(gateway, 'string')).catch(always(undefined))
