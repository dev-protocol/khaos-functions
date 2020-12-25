import { UndefinedOr } from '@devprotocol/util-ts'
import bent from 'bent'
import { always } from 'ramda'
import { fetchRegistry } from '../scripts/libs/fetchRegistry'
import { V0Options, V0Results } from '../v0/types'

type Options<V> = V extends 'v0' ? V0Options : never
type Results<V, O extends Options<V>> = V extends 'v0' ? V0Results<O> : never

export const call = <V extends 'v0'>(
	version = 'v0'
): (<O extends Options<V>>(
	options: O
) => Promise<UndefinedOr<Results<V, O>>>) => {
	const fetcher = bent(
		'https://khaos-functions.azurewebsites.net',
		'POST',
		'json'
	)
	return <O extends Options<V>>(options: O) =>
		fetcher(`/${version}`, options)
			.then((r) => (r as unknown) as Results<V, O>)
			.catch(always(undefined))
}

export const ids: typeof fetchRegistry = always(fetchRegistry())
