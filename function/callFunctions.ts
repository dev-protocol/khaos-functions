import { Functions } from '@devprotocol/khaos-core/types'
import { UndefinedOr } from '@devprotocol/util-ts/esm/types'
import {
	AbiOptions,
	AddressesOptions,
	AuthorizeOptions,
	CallingOptions,
	OraclizeOptions,
} from '.'
import { always, cond, isNil } from 'ramda'
import { whenDefined, whenDefinedAll } from '@devprotocol/util-ts/esm/utils'

const isAbi = (opts: CallingOptions): opts is AbiOptions =>
	opts.method === 'abi'
const isAddresses = (opts: CallingOptions): opts is AddressesOptions =>
	opts.method === 'addresses'
const isAuthorize = (opts: CallingOptions): opts is AuthorizeOptions =>
	opts.method === 'authorize'
const isOraclize = (opts: CallingOptions): opts is OraclizeOptions =>
	opts.method === 'oraclize'

export const callFunctions = <T extends CallingOptions>(
	f: Functions,
	options: T
): UndefinedOr<
	T extends AbiOptions
		? Functions['abi']
		: T extends AddressesOptions
		? ReturnType<Functions['addresses']>
		: T extends AuthorizeOptions
		? ReturnType<Functions['authorize']>
		: T extends OraclizeOptions
		? ReturnType<Functions['oraclize']>
		: never
> =>
	cond([
		[isNil, always(undefined)],
		[isAbi, always(f.abi)],
		[isAuthorize, f.authorize],
		[
			isAddresses,
			always(
				whenDefined(
					(options as AddressesOptions)?.options?.network,
					f.addresses
				)
			),
		],
		[
			isOraclize,
			always(
				(({
					signedOptions: _signedOptions,
					queryData: _queryData,
					network: _network,
				}) =>
					whenDefinedAll(
						[_signedOptions, _queryData, _network],
						([signedOptions, queryData, network]) =>
							f.oraclize(signedOptions, queryData, network)
					))((options as OraclizeOptions).options ?? {})
			),
		],
	])(options)
