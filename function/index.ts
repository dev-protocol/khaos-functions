import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import {
	NetworkName,
	PublicSignatureOptions,
	QueryData,
} from '@devprotocol/khaos-core/types'
import { whenDefined } from '@devprotocol/util-ts/esm/utils'
import { Merge } from 'type-fest'
import { callFunctions } from './callFunctions'
import { importFunctions } from './importFunctions'

export type Base = {
	readonly id: string
	readonly method: string
	readonly options: never
}

export type AbiOptions = Merge<
	Base,
	{
		readonly method: 'abi'
	}
>

export type AddressesOptions = Merge<
	Base,
	{
		readonly method: 'addresses'
		readonly options: {
			readonly network: NetworkName
		}
	}
>

export type AuthorizeOptions = Merge<
	Base,
	{
		readonly method: 'authorize'
		readonly options: {
			readonly message: string
			readonly secret: string
			readonly req: HttpRequest
		}
	}
>

export type OraclizeOptions = Merge<
	Base,
	{
		readonly method: 'oraclize'
		readonly options: {
			readonly signedOptions: PublicSignatureOptions
			readonly queryData: QueryData
			readonly network: NetworkName
		}
	}
>

export type CallingOptions =
	| AbiOptions
	| AddressesOptions
	| AuthorizeOptions
	| OraclizeOptions

const httpTrigger: AzureFunction = async (
	context: Context,
	req: HttpRequest
): Promise<ReturnTypeOfAzureFunctions> => {
	const { body } = req
	const { id, ...props } = body as CallingOptions

	const funtions = await importFunctions(id)
	const data = await whenDefined(funtions, (f) =>
		callFunctions(f, { id, ...props })
	)

	return {
		status: 200,
		body: { data },
	}
}

export default httpTrigger
