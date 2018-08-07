import * as ts from 'typescript'
import { createSourceFile } from '../../stories/markdown/AstExtractor'

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

test('creating a source file', () => {
  const b = createSourceFile(sourceFileMock)

  // console.log(b.sourceFile)

  b.sourceFile.statements.forEach(s => console.log(s.pos, s.end, sourceFileMock.slice(s.pos, s.end)))
})
