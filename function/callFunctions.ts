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
import { whenDefined } from '@devprotocol/util-ts/esm/utils'

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
			always(whenDefined((options as AddressesOptions)?.options, f.addresses)),
		],
		[
			isOraclize,
			always(whenDefined((options as OraclizeOptions)?.options, f.oraclize)),
		],
	])(options)
