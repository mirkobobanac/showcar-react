import initStoryshots from '@storybook/addon-storyshots'

initStoryshots({
  storyKindRegex: /\/Button$/ // include only stories ending w/ `/Button`
})

// Additional Button tests
test('a button', () => expect(true).toBeTruthy())
