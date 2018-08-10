import * as ts from 'typescript'
import sourceCodeExtrator from '../../src/ast/sourceCodeExtractor'

const sourceFileMock = `
type MyType = {
  foo: boolean
}

const A = 'bar'

function C(s: string) {
 console.log(s)
}

/**
 * Some type declaration
 */
type Props = {
  /**
   * Some type comment
   */
  foo: number
}

/**
 * Some React component
 */
const SomeSFC = (p: Props) => (
  <div>
    {p.foo}
  </div>
)
`

describe('source code extraction', () => {
  test('extracts types aliases from a source code file', () => {
    const extracted = sourceCodeExtrator(sourceFileMock, [
      { kind: ts.SyntaxKind.TypeAliasDeclaration, value: 'Props' },
      { kind: ts.SyntaxKind.TypeAliasDeclaration, value: 'MyType' }
    ])

    expect(extracted).toMatchSnapshot()
  })

  test('extracts some React component from a source code file', () => {
    const extracted = sourceCodeExtrator(sourceFileMock, [{ kind: ts.SyntaxKind.VariableStatement, value: 'SomeSFC' }])

    expect(extracted).toMatchSnapshot()
  })
})
