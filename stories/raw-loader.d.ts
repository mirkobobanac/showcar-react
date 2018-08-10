// Provide TypeScript support for raw-loader import statements
// https://stackoverflow.com/questions/42631645/webpack-import-typescript-module-both-normally-and-as-raw-string
declare module '!raw-loader!*' {
  const contents: string
  export = contents
}

declare module '!val-loader!*' {
  const contents: string
  export = contents
}
