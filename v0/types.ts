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
	options: T
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

export type Base = SetOptional<{
	readonly id: string
	readonly method: string
	readonly options: never
}>

export type AbiOptions = Merge<
	Base,
	SetOptional<{
		readonly method: 'abi'
	}>
>

export type AddressesOptions = Merge<
	Base,
	SetOptional<{
		readonly method: 'addresses'
		readonly options: SetOptional<FunctionAddressesOptions>
	}>
>

export type AuthorizeOptions = Merge<
	Base,
	SetOptional<{
		readonly method: 'authorize'
		readonly options: SetOptional<FunctionAuthorizerOptions>
	}>
>

export type OraclizeOptions = Merge<
	Base,
	SetOptional<{
		readonly method: 'oraclize'
		readonly options: SetOptional<FunctionOraclizerOptions>
	}>
>

export type EventOptions = Merge<
	Base,
	SetOptional<{
		readonly method: 'event'
		readonly options: SetOptional<FunctionEventOptions>
	}>
>

export type PackOptions = Merge<
	Base,
	SetOptional<{
		readonly method: 'pack'
		readonly options: SetOptional<FunctionPackOptions>
	}>
>

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
