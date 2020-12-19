import { Functions } from '@devprotocol/khaos-core/types'
import { always } from 'ramda'

const { abi, addresses, authorize, oraclize } = {
	abi: ['abi'],
	addresses: (net: string) => Promise.resolve(`0x0_${net}`),
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
