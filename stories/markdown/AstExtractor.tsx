import * as ts from 'typescript'

const printer = ts.createPrinter({
  newLine: ts.NewLineKind.LineFeed
})

// /**
//  * Parses the given source into an anonymous File resource.
//  * Mainly used to parse source code of a document.
//  *
//  * @param {string} source
//  * @param {ScriptKind} [scriptKind=ScriptKind.TS]
//  * @returns {Promise<File>}
//  *
//  * @memberof TsResourceParser
//  */
// const parseSource = async source => {
//   return ts.createSourceFile('inline.tsx', source, ts.ScriptTarget.ES2015, true)
// }

// const typedef = source => {
//   return parseSource(source)
//     .then(console.log)
//     .toString()
// }

// module.exports = async function yearsInMs(filename) {
//   // const parser = new TypescriptParser()
//   // const parsed = await parser.parseFile(filename, 'workspace root')
//   console.log('THE FILENAME OPTIONS PASSED ARE:', filename)
//   return { code: filename.toString() } //
// }

// const parser = new TypescriptParser()

// export const parse = async (source: string) => {
//   const parsed = await parser.parseSource(source)
//   return parsed
// }

export function createSourceFile(
  code: string,
  scriptTarget: ts.ScriptTarget = ts.ScriptTarget.ES2015,
  scriptKind: ts.ScriptKind = ts.ScriptKind.TSX
) {
  const filePath = `/ts-ast-viewer${getExtension(scriptKind)}`
  const sourceFile = ts.createSourceFile(filePath, code, scriptTarget, false, scriptKind)
  const options: ts.CompilerOptions = {
    strict: true,
    target: scriptTarget,
    allowJs: true,
    module: ts.ModuleKind.ES2015
  }
  const files: { [name: string]: ts.SourceFile | undefined } = {
    [filePath]: sourceFile
  }

  const compilerHost: ts.CompilerHost = {
    getSourceFile: (fileName: string, languageVersion: ts.ScriptTarget, onError?: (message: string) => void) => {
      return files[fileName]
    },
    // getSourceFileByPath: (...) => {}, // not providing these will force it to use the file name as the file path
    // getDefaultLibLocation: (...) => {},
    getDefaultLibFileName: (defaultLibOptions: ts.CompilerOptions) => '/' + ts.getDefaultLibFileName(defaultLibOptions),
    writeFile: () => {
      // do nothing
    },
    getCurrentDirectory: () => '/',
    getDirectories: (path: string) => [],
    fileExists: (fileName: string) => files[fileName] != null,
    readFile: (fileName: string) => (files[fileName] != null ? files[fileName]!.getFullText() : undefined),
    getCanonicalFileName: (fileName: string) => fileName,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => '\n',
    getEnvironmentVariable: () => ''
  }
  const program = ts.createProgram([...Object.keys(files)], options, compilerHost)
  const typeChecker = program.getTypeChecker()

  return { program, typeChecker, sourceFile }
}

function getExtension(scriptKind: ts.ScriptKind) {
  switch (scriptKind) {
    case ts.ScriptKind.TS:
      return '.ts'
    case ts.ScriptKind.TSX:
      return '.tsx'
    case ts.ScriptKind.JS:
      return '.js'
    case ts.ScriptKind.JSX:
      return '.jsx'
    case ts.ScriptKind.JSON:
      return '.json'
    case ts.ScriptKind.External:
    case ts.ScriptKind.Deferred:
    case ts.ScriptKind.Unknown:
      return ''
    default:
      const assertNever: never = scriptKind
      throw new Error(`Not implemented ScriptKind: ${ts.ScriptKind[scriptKind]}`)
  }
}
