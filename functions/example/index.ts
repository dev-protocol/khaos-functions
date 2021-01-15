import { Functions } from '@devprotocol/khaos-core'
import { always } from 'ramda'

const { abi, addresses, authorize, oraclize, event, pack } = {
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
	event: always(Promise.resolve('Query')),
	pack: ({ results }) =>
		Promise.resolve({ name: 'callback', args: [results.status] }),
} as Functions

export { abi, addresses, authorize, oraclize, event, pack }
