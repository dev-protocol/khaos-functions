import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import {
	FunctionAddressesOptions,
	FunctionAuthorizerOptions,
	FunctionOraclizerOptions,
} from '@devprotocol/khaos-core/types'
import { whenDefined } from '@devprotocol/util-ts/cjs/utils'
import { AsyncReturnType, Merge, SetOptional } from 'type-fest'
import { callFunctions } from './callFunctions'
import { importFunctions } from './importFunctions'

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

export type V0Options =
	| AbiOptions
	| AddressesOptions
	| AuthorizeOptions
	| OraclizeOptions

export type V0Results = { readonly data: AsyncReturnType<typeof callFunctions> }

const httpTrigger: AzureFunction = async (
	context: Context,
	req: HttpRequest
): Promise<ReturnTypeOfAzureFunctions> => {
	const { body: reqBody } = req
	const { id, ...props } = reqBody as V0Options

	const funtions = await whenDefined(id, (x) => importFunctions(x))
	const data = await whenDefined(funtions, (f) =>
		callFunctions(f, { id, ...props })
	)
	const body: V0Results = { data }

	return {
		status: 200,
		body,
	}
}

export default httpTrigger
