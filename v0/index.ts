import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { whenDefined } from '@devprotocol/util-ts'
import { V0Options, V0Results } from './types'
import { callFunctions } from './callFunctions'
import { importFunctions } from './importFunctions'

const httpTrigger: AzureFunction = async (
	context: Context,
	req: HttpRequest
): Promise<ReturnTypeOfAzureFunctions> => {
	const { body: reqBody } = req
	const { id, ...props } = reqBody as V0Options
	// eslint-disable-next-line functional/no-expression-statement
	console.log({ reqBody })

	const funtions = await whenDefined(id, (x) => importFunctions(x))
	const data = await whenDefined(funtions, (f) =>
		callFunctions(f, { id, ...props })
	)
	const body: V0Results<V0Options> = { data }

	return {
		status: 200,
		body,
	}
}

export default httpTrigger
