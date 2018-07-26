import { configure } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'

// automatically import all files ending in *.stories.ts
const req = require.context('../stories', true, /.stories.tsx$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

setOptions({
  hierarchySeparator: /\//,
  hierarchyRootSeparator: /\|/
})

configure(loadStories, module)
