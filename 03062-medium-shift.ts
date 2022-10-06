// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Shift<[3, 2, 1]>, [2, 1]>>,
  Expect<Equal<Shift<['a', 'b', 'c', 'd']>, ['b', 'c', 'd']>>,
]


// ============= Your Code Here =============
type Shift<T extends unknown[]> = T extends [infer H, ...infer RS] ? [...RS] : []
