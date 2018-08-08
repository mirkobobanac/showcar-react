import * as ts from 'typescript'

/**
 * Extracts SourceCode block from a given typescript file via typescript compiler transformer
 * Needs transformer registered in ts-loader/awesome-typescript-loader for it to transform content at compile-time
 */
const sourceCodeExtrator = (filepath: string, type: ts.SyntaxKind, value: string) =>
  'TO_BE_INJECTED_BY_TYPESCRIPT_COMPILER_TRANSFORMER'

type Logger = {
  log: (s: string) => void
  info: (s: string) => void
  debug: (s: string) => void
  trace: (s: string) => void
  warn: (s: string) => void
  error: (s: string) => void
}

/**
 * Custom typescript transformer.
 * References: https://github.com/kimamula/ts-transformer-keys/blob/master/transformer.ts
 *             https://dev.doctorevidence.com/how-to-write-a-typescript-transform-plugin-fc5308fdd943
 */
export function transformer(program: ts.Program, logger: Logger) {
  return (ctx: ts.TransformationContext): ts.Transformer<ts.SourceFile> => (sf: ts.SourceFile) =>
    ts.visitNode(sf, nodeVisitor(ctx, logger))
}

function nodeVisitor(ctx: ts.TransformationContext, logger: Logger) {
  const visitor: ts.Visitor = (node: ts.Node): ts.VisitResult<ts.Node> => {
    // TODO: Add logic to check all `sourceCodeExtractor` function calls, extract arguments and modify node to include return type
    if (ts.isCallExpression(node)) {
      logger.log(`call expression detected: ${node.arguments}, ${node.typeArguments}`)
      const calleeExpression = node.expression
      // if (ts.isIdentifier(calleeExpression) && calleeExpression.text === 'safely') {
      //   return safelyVisitor(node.arguments[0])
      // }
    }
    return ts.visitEachChild(node, visitor, ctx)
  }

  return visitor
}

export default sourceCodeExtrator
