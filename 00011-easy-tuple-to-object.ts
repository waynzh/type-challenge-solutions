// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type cases = [
  Expect<Equal<TupleToObject<typeof tuple>, { tesla: 'tesla'; 'model 3': 'model 3'; 'model X': 'model X'; 'model Y': 'model Y' }>>,
]

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>


// ============= Your Code Here =============
type TupleToObject<TTuple extends readonly PropertyKey[]> = {
  [TIndex in TTuple[number]]: TIndex
}

/**
 * 1. as const: as const断言将宽泛的 **数据类型** 限定为具体的 **数值类型**，且readonly
 * 2. typeof tuple: tuple as a value, not a type here
 * 3. TTuple[number]： number represents union type of all the possible numbers (1, 2, 3...)
 * 4. type PropertyKey = string | number | symbol: 可以作为key值的类型
 */
type res = TupleToObject<typeof tuple>
type ArrayMember = typeof tuple
