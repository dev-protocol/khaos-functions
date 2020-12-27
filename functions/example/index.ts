import { Functions } from '@devprotocol/khaos-core'
import { always } from 'ramda'

const { abi, addresses, authorize, oraclize } = {
	abi: ['abi'],
	addresses: ({ network }: { readonly network: string }) =>
		Promise.resolve(`0x0_${network}`),
	authorize: always(Promise.resolve(true)),
	oraclize: always(
		Promise.resolve({
			message: 'message',
			status: 1,
			statusMessage: 'statusMessage',
		})
	),
} as Functions

export { abi, addresses, authorize, oraclize }
