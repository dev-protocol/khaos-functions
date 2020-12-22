import { Functions } from '@devprotocol/khaos-core/types'
import { UndefinedOr } from '@devprotocol/util-ts/cjs/types'
import { always } from 'ramda'

export const importFunctions = async (
	id: string
): Promise<UndefinedOr<Functions>> => {
	const fn: UndefinedOr<Functions> = await import(`../functions/${id}`).catch(
		always(undefined)
	)
	return fn?.abi && fn?.addresses && fn?.authorize && fn?.oraclize
		? fn
		: undefined
}
