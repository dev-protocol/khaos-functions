import test from 'ava'
import func from './index'
import { Context } from '@azure/functions'

test('Returns `Hello {query.name}` with 200', async (t) => {
	const res = await func((undefined as unknown) as Context, {
		query: { name: 'Alice' },
	})
	t.is(res.body, 'Hello Alice')
	t.is(res.status, 200)
})
