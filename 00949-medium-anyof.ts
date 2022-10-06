// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<AnyOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[1, '', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, 'test', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], {}]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>,
]


// ============= Your Code Here =============
// type AnyOf<T extends readonly any[]> = T extends [infer F, ...infer L]
//   ? F extends 0 | '' | false | [] | { [P in any]: never }
//     ? AnyOf<L>
//     : true
//   : false

type Falsy = 0 | '' | false | [] | { [P in any]: never }
type isTruthy<T> = T extends Falsy ? false : true
type AnyOf<T extends readonly any[]> = isTruthy<T[number]> extends false ? false : true

type test = AnyOf<[0]>

/** 
 * 1. 积累 empty object 表达：{ [P in any]: never } / NotEqual<T, {}>
 * 2. 数组检查各项：`T[number] extends`
 */
