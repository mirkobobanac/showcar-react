const path = require('path')
const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin')

const polyfills = {
  /**
   * All JS here will be available on production thanks to jigsaw
   * Use to simulate showcar-ui prod environment when developing locally
   */
  showcarUI: ['showcar-ui/dist/showcar-icons.js', 'showcar-ui/dist/showcar-ui.css', 'showcar-ui/dist/showcar-ui.js']
}

// Extend base storybook webpack config
// https://storybook.js.org/configurations/custom-webpack-config/
module.exports = (baseConfig, env, config) => {
  // Add showcar UI to bundle
  config.entry.preview = config.entry.preview.concat(polyfills.showcarUI)

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loaders: require.resolve('awesome-typescript-loader')
  })

  config.module.rules.push({
    test: /\.ts$/,
    enforce: 'pre',
    loader: 'tslint-loader',
    options: {
      emitErrors: true
    }
  })

  // Wire-up story source
  config.module.rules.push({
    test: /\.stories\.tsx?$/,
    loaders: [
      {
        loader: require.resolve('@storybook/addon-storysource/loader'),
        options: { parser: 'typescript' }
      }
    ],
    enforce: 'pre'
  })

  // Sass support
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      'style-loader', // creates style nodes from JS strings
      'css-loader', // translates CSS into CommonJS
      'sass-loader' // compiles Sass to CSS, using Node Sass by default
    ]
  })

  config.plugins.push(new TSDocgenPlugin()) // optional
  config.resolve.extensions.push('.ts', '.tsx')

  return config
}
