// ============= Test Cases =============
import type { Alike, Expect } from './test-utils'

declare const a: Chainable

const result1 = a
  .option('foo', 123)
  .option('bar', { value: 'Hello World' })
  .option('name', 'type-challenges')
  .get()

const result2 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 'last name')
  .get()

const result3 = a
  .option('name', 'another name')
  .option('name', 123)
  .get()

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
  Expect<Alike<typeof result3, Expected3>>,
]

type Expected1 = {
  foo: number
  bar: {
    value: string
  }
  name: string
}

type Expected2 = {
  name: string
}

type Expected3 = {
  name: number
}


// ============= Your Code Here =============
// 1st: failed ts-expect-error & pass the same key use the latest type
// type Chainable<O = {}> = {
//   option<T extends string, V>(key: T, value: V): Chainable<O & {
//     [K in T]: V
//   }>
//   get(): O
// }

// 2nd: failed ts-expect-error
// type Chainable<O extends { [key: string]: unknown} = {}> = {
//   option<K extends string, V>(key: K, value: V): Chainable<{ 
//     [key in keyof O | K]: key extends K ? V : O[key]
//   }>
//   get(): O
// }

// XXX 3rd
type Chainable<O extends { [key: string]: unknown } = {}> = {
  option<K extends string, V>(key: K extends keyof O ? (V extends O[K] ? never : K) : K, value: V): Chainable<{
    [Key in K | keyof O]: Key extends K ? V : O[Key]
  }>
  get(): O
}

const result = a.option('foo', 123).option('bar', { value: 'Hello'})

/**
 * 入参给类型时赋为 never，`(key: never)`，也可作为入参无效的判断
 * 
 * `O extends { [key: string]: unknown } = {}`后，可以使用 `O[Key]`
 */

