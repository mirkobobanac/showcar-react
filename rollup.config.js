import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import { terser } from 'rollup-plugin-terser'
import sass from 'rollup-plugin-sass'
import visualizer from 'rollup-plugin-visualizer'
import filesize from 'rollup-plugin-filesize'

const pkg = require('./package.json')

export default [
  /**
   * Rollup configuration for bundling the library
   * https://github.com/alexjoverm/typescript-library-starter
   */
  {
    input: `src/index.ts`,
    output: [
      { file: pkg.main, format: 'cjs', sourcemap: true }, //
      { file: pkg.module, format: 'es', sourcemap: true }
    ],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: ['react'],
    watch: {
      include: 'src/**'
    },
    plugins: [
      // Allow json resolution
      json(),
      // Compile TypeScript files
      typescript({ useTsconfigDeclarationDir: true, tsconfig: 'tsconfig.rollup.json' }),
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      commonjs(),
      // Allow node_modules resolution, so you can use 'external' to control
      // which external modules to include in the bundle
      // https://github.com/rollup/rollup-plugin-node-resolve#usage
      resolve(),
      // Resolve source maps to the original source
      sourceMaps(),
      sass(),
      filesize()
    ]
  },

  /**
   * Rollup configuration for bundling library as application that exposes library in external window global
   * https://mixmax.com/blog/rollup-externals
   */
  {
    input: `src/index.ts`,
    output: {
      file: pkg.browser,
      format: 'iife',
      sourcemap: true,
      name: 'window.ShowcarReact', // name under which the output will be available globally (window)
      globals: {
        react: 'React'
      }
    },
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: ['react'],
    watch: {
      include: 'src/**'
    },
    plugins: [
      // Allow json resolution
      json(),
      // Compile TypeScript files
      typescript({ useTsconfigDeclarationDir: true, tsconfig: 'tsconfig.rollup.json' }),
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      commonjs(),
      // Allow node_modules resolution, so you can use 'external' to control
      // which external modules to include in the bundle
      // https://github.com/rollup/rollup-plugin-node-resolve#usage
      resolve(),
      // Resolve source maps to the original source
      sourceMaps(),
      sass(),
      // Minify code
      terser({
        sourceMap: true
      }),
      visualizer({
        filename: './dist/statistics/statistics.html',
        title: 'Showcar-React'
      }),
      filesize()
    ]
  }
]
