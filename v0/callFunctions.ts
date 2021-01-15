import { Functions } from '@devprotocol/khaos-core'
import { UndefinedOr, whenDefined, whenDefinedAll } from '@devprotocol/util-ts'
import {
	AbiOptions,
	AddressesOptions,
	AuthorizeOptions,
	V0Options,
	OraclizeOptions,
	CallFunctions,
	EventOptions,
	PackOptions,
} from './types'
import { always, cond, isNil } from 'ramda'
import { AsyncReturnType } from 'type-fest'

const isAbi = (opts: V0Options): opts is AbiOptions => opts.method === 'abi'
const isAddresses = (opts: V0Options): opts is AddressesOptions =>
	opts.method === 'addresses'
const isAuthorize = (opts: V0Options): opts is AuthorizeOptions =>
	opts.method === 'authorize'
const isOraclize = (opts: V0Options): opts is OraclizeOptions =>
	opts.method === 'oraclize'
const isEvent = (opts: V0Options): opts is EventOptions =>
	opts.method === 'event'
const isPack = (opts: V0Options): opts is PackOptions => opts.method === 'pack'

export const callFunctions: CallFunctions<V0Options> = async <
	T extends V0Options
>(
	f: Functions,
	options: T
): Promise<
	UndefinedOr<
		T extends AbiOptions
			? Functions['abi']
			: T extends AddressesOptions
			? AsyncReturnType<Functions['addresses']>
			: T extends AuthorizeOptions
			? AsyncReturnType<Functions['authorize']>
			: T extends OraclizeOptions
			? AsyncReturnType<Functions['oraclize']>
			: T extends EventOptions
			? AsyncReturnType<Functions['event']>
			: T extends PackOptions
			? AsyncReturnType<Functions['pack']>
			: never
	>
> =>
	cond([
		[isNil, always(undefined)],
		[isAbi, always(f.abi)],
		[
			isAuthorize,
			always(
				((opts) =>
					whenDefinedAll(
						[
							opts?.options?.message,
							opts?.options?.secret,
							opts?.options?.request,
						],
						([message, secret, request]) =>
							f.authorize({ message, secret, request })
					))(options as AuthorizeOptions)
			),
		],
		[
			isAddresses,
			always(
				whenDefined(
					(options as AddressesOptions)?.options?.network,
					(network) => f.addresses({ network })
				)
			),
		],
		[
			isOraclize,
			always(
				((opts) =>
					whenDefinedAll(
						[
							opts?.options?.signatureOptions,
							opts?.options?.query,
							opts?.options?.network,
						],
						([signatureOptions, query, network]) =>
							f.oraclize({ signatureOptions, query, network })
					))(options as OraclizeOptions)
			),
		],
		[
			isEvent,
			always(
				((opts) =>
					whenDefined(opts?.options?.network, (network) =>
						f.event({ network })
					))(options as EventOptions)
			),
		],
		[
			isPack,
			always(
				((opts) =>
					whenDefined(opts?.options?.results, (results) =>
						f.pack({ results })
					))(options as PackOptions)
			),
		],
	])(options)
