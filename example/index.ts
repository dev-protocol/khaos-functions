import { AzureFunction, Context, HttpRequest } from '@azure/functions'

const httpTrigger: AzureFunction = async (
	context: Context,
	req: HttpRequest
): Promise<ReturnTypeOfAzureFunctions> => {
	return {
		status: 200,
		body: `Hello ${req.query.name}`,
	}
}

export default httpTrigger
