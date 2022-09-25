// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>,
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}

interface Expected2 {
  title: string
  completed: boolean
}


// ============= Your Code Here =============
type MyPick<TObj, TKey extends keyof TObj> = {
  [Key in TKey]: TObj[Key]
}

/**
 * 1. `keyof TypeObj` returns a union type, which has all keys
 * 2. `K extends keyof T`: Conditional Type Constraints
 * 3. TObj[Key]: Indexed Access Types
 * - e.g. TObj[TKey] = string | boolean
 */

type result = MyPick<Todo, 'title' | 'completed'>
type ads = Todo['title' | 'completed']
