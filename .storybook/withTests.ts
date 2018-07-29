const jestTestResuls = require('../.jest-test-results.json')
import withTests from 'storybook-addon-jest'

export default (withTests as any)(jestTestResuls, {
  filesExt: '.test.ts'
})
