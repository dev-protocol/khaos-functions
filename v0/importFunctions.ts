import { Functions } from '@devprotocol/khaos-core'
import { UndefinedOr } from '@devprotocol/util-ts'

export const importFunctions = async (
	id: string
): Promise<UndefinedOr<Functions>> => {
	const fn: UndefinedOr<Functions> = await import(`../dist/functions/${id}`)
		// eslint-disable-next-line functional/functional-parameters
		.catch(() => import(`../functions/${id}`))
		.catch((err) => {
			// eslint-disable-next-line functional/no-expression-statement
			console.error('Error occurred on function importing:', err)
			return undefined
		})
	return fn?.abi && fn?.addresses && fn?.authorize && fn?.oraclize
		? fn
		: undefined
}
