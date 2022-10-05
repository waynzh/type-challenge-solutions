// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<TrimLeft<'str'>, 'str'>>,
  Expect<Equal<TrimLeft<' str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
  Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>,
  Expect<Equal<TrimLeft<''>, ''>>,
  Expect<Equal<TrimLeft<' \n\t'>, ''>>,
]


// ============= Your Code Here =============
type TrimLeft<S extends string> = S extends `${" " | "\n" | "\t"}${infer L}` ? TrimLeft<L> : S

type Result = TrimLeft<'     str     '>
type test = " " extends `${" " | "\n" | "\t"}${infer L}` ? L : false

/**
 * @description template-literal-types
 * `${}`: It allows to model the strings in type system.
 */
