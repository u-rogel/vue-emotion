import { babel } from '@rollup/plugin-babel'

const config = {
  input: 'src/index.js',
  output: {
    format: 'esm',
    file: 'dist/bundle.js',
  },
  plugins: [
    babel({ babelHelpers: 'bundled' }),
  ],
}

export default config
