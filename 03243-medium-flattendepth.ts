// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]


// ============= Your Code Here =============
type Plus<T extends unknown[]> = [0, ...T]

type FlattenDepth<T, Dep extends number = 1, Acc extends unknown[] = []> = Acc['length'] extends Dep ? T : T extends [infer H, ...infer RS]
  ? H extends [...infer P] 
    ? [...FlattenDepth<P, Dep, Plus<Acc>>, ...FlattenDepth<RS, Dep, Acc>] 
    : [H, ...FlattenDepth<RS, Dep, Acc>]
  : []

type test = FlattenDepth<[1, 2, [3, 4], [[[5]]]]>
