// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Reverse<[]>, []>>,
  Expect<Equal<Reverse<['a', 'b']>, ['b', 'a']>>,
  Expect<Equal<Reverse<['a', 'b', 'c']>, ['c', 'b', 'a']>>,
  Expect<Equal<Reverse<['a', 'b', 'c', 'd']>, ['d', 'c', 'b', 'a']>>,
]


// ============= Your Code Here =============
// type Reverse<T extends unknown[]> = T extends [infer F, ...infer O]
//   ? Reverse<O> extends [...infer P]
//     ? [...P, F]
//     : never
//   : []

type Reverse<T extends unknown[]> = T extends [infer F, ...infer L] ? [...Reverse<L>, F] : []


type Result = Reverse<['a', 'b', 'c', 'd']>

