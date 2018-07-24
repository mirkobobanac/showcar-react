const path = require('path')
const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin')

// Extend base storybook webpack config
// https://storybook.js.org/configurations/custom-webpack-config/
module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('awesome-typescript-loader')
  })
  config.plugins.push(new TSDocgenPlugin()) // optional
  config.resolve.extensions.push('.ts', '.tsx')
  return config
}
