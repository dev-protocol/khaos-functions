import { UndefinedOr } from '@devprotocol/util-ts/cjs/types'
import bent from 'bent'
import { always } from 'ramda'
import { V0Options, V0Results } from '../v0'

type Options<V> = V extends 'v0' ? V0Options : never
type Results<V> = V extends 'v0' ? V0Results : never

export const call = <V extends 'v0'>(
	version = 'v0'
): ((options: Options<V>) => Promise<UndefinedOr<Results<V>>>) => {
	const fetcher = bent(
		'https://khaos-functions.azurewebsites.net',
		'POST',
		'json'
	)
	return (options: Options<V>) =>
		fetcher(`/${version}`, options)
			.then((r) => (r as unknown) as Results<V>)
			.catch(always(undefined))
}
