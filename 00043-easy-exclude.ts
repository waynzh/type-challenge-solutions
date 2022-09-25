// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, Exclude<'a' | 'b' | 'c', 'a'>>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, Exclude<'a' | 'b' | 'c', 'a' | 'b'>>>,
  Expect<Equal<MyExclude<string | number | (() => void), Function>, Exclude<string | number | (() => void), Function>>>,
]


// ============= Your Code Here =============
type MyExclude<T, U> = T extends U ? never : T

/**
 * Distributive Conditional Types: the conditional type will be applied to each member of that union.
 */

type abc = 'a' | 'b' | 'c'
type res = MyExclude<abc, 'a'>
