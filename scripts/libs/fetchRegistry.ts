import bent from 'bent'
import { always } from 'ramda'

const URL =
	'https://raw.githubusercontent.com/dev-protocol/khaos-registry/main/map/functions.json'

export type Registry = readonly [
	{
		readonly id: string
		readonly ipfs: string
	},
]

export const fetchRegistry = always(
	(async (fetcher) =>
		fetcher(`${URL}?${Math.random()}`).then((r) => r as unknown as Registry))(
		bent('json'),
	),
)
