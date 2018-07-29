import { configure } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'

// For Jest tests, we need to polyfill `require.context` webpack calls
if (process.env.NODE_ENV === 'test') {
  const registerRequireContextHook = require('babel-plugin-require-context-hook/register')
  registerRequireContextHook()
}

// automatically import all files ending in *.stories.ts
const req = require.context('../stories', true, /.stories.tsx$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

setOptions({
  /**
   * name to display in the top left corner
   * @type {String}
   */
  name: 'Showcar-React',
  /**
   * URL for name in top left corner to link to
   * @type {String}
   */
  url: './',
  hierarchySeparator: /\//,
  hierarchyRootSeparator: /\|/
})

configure(loadStories, module)
