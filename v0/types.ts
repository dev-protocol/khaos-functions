import { Context } from '@azure/functions'
import {
	Abi,
	FunctionAddressesOptions,
	FunctionAuthorizerOptions,
	FunctionEventOptions,
	FunctionOraclizeResults,
	FunctionOraclizerOptions,
	FunctionPackOptions,
	FunctionPackResults,
	Functions,
} from '@devprotocol/khaos-core'
import { UndefinedOr } from '@devprotocol/util-ts'
import { AsyncReturnType, Merge, SetOptional } from 'type-fest'

export type CallFunctions<T extends V0Options> = (
	f: Functions,
	context: Context,
	options: T,
) => Promise<
	UndefinedOr<
		T extends AbiOptions
			? Abi
			: T extends AddressesOptions
				? string
				: T extends AuthorizeOptions
					? boolean
					: T extends OraclizeOptions
						? FunctionOraclizeResults
						: T extends EventOptions
							? string
							: T extends PackOptions
								? FunctionPackResults
								: never
	>
>

export type IBase = {
	readonly id: string
	readonly method: string
	readonly options: never
}

export type Base = SetOptional<IBase, keyof IBase>

export type IAbi = {
	readonly method: 'abi'
}

export type AbiOptions = Merge<Base, SetOptional<IAbi, keyof IAbi>>

export type IAddresses = {
	readonly method: 'addresses'
	readonly options: SetOptional<
		FunctionAddressesOptions,
		keyof FunctionAddressesOptions
	>
}

export type AddressesOptions = Merge<
	Base,
	SetOptional<IAddresses, keyof IAddresses>
>

export type IAuthorize = {
	readonly method: 'authorize'
	readonly options: SetOptional<
		FunctionAuthorizerOptions,
		keyof FunctionAuthorizerOptions
	>
}

export type AuthorizeOptions = Merge<
	Base,
	SetOptional<IAuthorize, keyof IAuthorize>
>

export type IOraclize = {
	readonly method: 'oraclize'
	readonly options: SetOptional<
		FunctionOraclizerOptions,
		keyof FunctionOraclizerOptions
	>
}

export type OraclizeOptions = Merge<
	Base,
	SetOptional<IOraclize, keyof IOraclize>
>

export type IEvent = {
	readonly method: 'event'
	readonly options: SetOptional<
		FunctionEventOptions,
		keyof FunctionEventOptions
	>
}

export type EventOptions = Merge<Base, SetOptional<IEvent, keyof IEvent>>

export type IPack = {
	readonly method: 'pack'
	readonly options: SetOptional<FunctionPackOptions, keyof FunctionPackOptions>
}

export type PackOptions = Merge<Base, SetOptional<IPack, keyof IPack>>

export type V0Options =
	| AbiOptions
	| AddressesOptions
	| AuthorizeOptions
	| OraclizeOptions
	| EventOptions
	| PackOptions

export type V0Results<O extends V0Options> = {
	readonly data: AsyncReturnType<CallFunctions<O>>
}
