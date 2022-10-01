// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>>,
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,
]


// ============= Your Code Here =============
type MyEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<U>() => U extends Y ? 1 : 2) ? true : false

type Includes<T extends readonly any[], U> = T extends [infer Head, ...infer Other]
  ? MyEqual<Head, U> extends true
    ? true
    : Includes<Other, U>
  : false

type Result = Includes<[], false>

/**
 * 1. 分配式extends：当上面的T为联合类型的时候，会进行拆分，分解因式进行判断
 * 2. 边界条件积累，use `Equal` instead of `extends`：
 *    - false extends boolean                // true
 *    - 1 extends 1 | 2                      // true
 *    - {readonly a : 'A'} extends { a: 'A'} // true
 * 3. Equal: Equals returns false (in theory) if and only if there exists a type C such that C is assignable to one of X and Y, but not to the other.
 * for more detail: https://stackoverflow.com/questions/68961864/how-does-the-equals-work-in-typescript/68963796#68963796
 * 
 */
