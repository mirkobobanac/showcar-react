import ts from 'typescript'

type ExtractBlock = {
  kind: ts.SyntaxKind // what kind of element this is (function/type declaration etc)
  value: string
}

/**
 * Extracts source code blocks from a given typescript source string via typescript compiler AST analysis
 */
const sourceCodeExtrator = (source: string, extractBlocks: ExtractBlock[]) => {
  const { sourceFile: sourceAst, program } = createSourceFile(source)

  return sourceAst.statements
    .filter(statement => {
      return extractBlocks.some(block => {
        if (statement.kind !== block.kind) {
          return false
        }

        // TODO: Improve extraction logic

        // variable statement matching
        if (ts.isVariableStatement(statement)) {
          return (
            source
              .slice(statement.pos, statement.end)
              .split('=')[0]
              .indexOf(block.value) !== -1 // cant find way to get function name from AST
          )
        }

        // Type aliases and other identifiers that have names
        if ((statement as any).name !== undefined && (statement as any).name.escapedText !== undefined) {
          return (statement as any).name.escapedText === block.value
        }

        return false
      })
    })
    .map(statement => source.slice(statement.pos, statement.end))
    .join('')
}

function createSourceFile(
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

export default sourceCodeExtrator
