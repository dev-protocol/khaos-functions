import multi from '@rollup/plugin-multi-entry'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'

export default [
	{
		input: 'libs/index.ts',
		output: [
			{
				file: 'dist/index.mjs',
				format: 'es',
			},
			{
				file: 'dist/index.js',
				format: 'cjs',
			},
		],
		plugins: [typescript({ module: 'esnext' })],
	},
	{
		input: ['dist/libs/index.d.ts', 'dist/v0/types.d.ts'],
		output: [{ file: 'dist/khaos-functions.d.ts', format: 'es' }],
		plugins: [multi(), dts()],
	},
]
