// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const promiseAllTest1 = PromiseAll([1, 2, 3] as const)
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const)
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)])

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
]


// ============= Your Code Here =============
// declare function PromiseAll<T extends readonly any[]>(values: T): T extends readonly [...infer Tail] 
//   ? Promise<{
//     [K in keyof Tail]: Tail[K] extends Promise<infer U> ? U : Tail[K]
//   }>
//   : never

// XXX 2nd
declare function PromiseAll<T extends readonly any[]>(values: readonly [...T]): Promise<{
  [P in keyof T]: T[P] extends Promise<infer U> ? U : T[P]
}>

const P = [Promise.resolve(3)] as const

/**
 * 1. 'readonly' type modifier is only permitted on array and tuple.
 *    (values: readonly [...T])
 * 2. tuple type can write with Record<number, any>
 */
