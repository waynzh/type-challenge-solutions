// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
]

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
  completed: boolean
}

interface Expected2 {
  title: string
}


// ============= Your Code Here =============
// 1st
// type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

// 2nd
// type MyOmit<T, K extends keyof T> = {
//   [O in Exclude<keyof T, K>]: T[O]
// }
// type Exclude<T, K extends T> = T extends K ? never : T
// type test = Exclude<keyof Todo, 'title'>

// 3rd
type MyOmit<T, K extends keyof T> = {
  [O in keyof T as O extends K ? never : O]: T[O]
}

type Result = MyOmit<Todo, 'description' | 'completed'>
