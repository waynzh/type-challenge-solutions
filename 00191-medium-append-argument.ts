// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Case1 = AppendArgument<(a: number, b: string) => number, boolean>
type Result1 = (a: number, b: string, x: boolean) => number

type Case2 = AppendArgument<() => void, undefined>
type Result2 = (x: undefined) => void

type cases = [
  Expect<Equal<Case1, Result1>>,
  Expect<Equal<Case2, Result2>>,
]


// ============= Your Code Here =============
// type AppendArgument<Fn, A> = Fn extends (...args: any) => infer U
//   ? (...args: [...Parameters<Fn>, A]) => U
//   : never

type AppendArgument<Fn, A> = Fn extends (...args: infer P) => infer U 
  ? (...args: [...P, A]) => U
  : never

/**
 * 积累 参数的infer类型定义
 * `(...args: infer P)` → [a: number, b: string]
 */
