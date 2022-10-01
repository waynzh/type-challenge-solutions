// ============= Test Cases =============
import type { Alike, Expect } from './test-utils'

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
]

// @ts-expect-error
type error = MyReadonly2<Todo1, 'title' | 'invalid'>

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}


// ============= Your Code Here =============
// 1st
// type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
// type MyReadonly2<T, K extends keyof T = keyof T> = Readonly<Pick<T, K>> & Omit<T, K>

// 2nd
type MyReadonly2<T, K extends keyof T = keyof T> = {
  [Key in Exclude<keyof T, K>]: T[Key]
} & {
  readonly [Key in K]: T[Key]
}

type Result = MyReadonly2<Todo1>

/**
 * 1. 没有入参可以给一个默认值，解决空值的处理
 * 2. 对象的merge 可以用 &
 */
