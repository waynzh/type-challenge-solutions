// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<DeepReadonly<X>, Expected>>,
  Expect<Equal<DeepReadonly<Y>, Expected2>>,
]

type X = {
  a: () => 22
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 'string'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}

type Expected = {
  readonly a: () => 22
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 'string'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}

type Y = { 
  x: { 
    a: 1
    b: 'hi'
  }
  y: ['hey', 'way']
}

type Expected2 = { 
  readonly x: { 
    readonly a: 1
    readonly b: 'hi'
  }
  readonly y: readonly ['hey', 'way']
}

// ============= Your Code Here =============
// 1st: Lack of array verification
// type DeepReadonly<T> = {
//   readonly [Key in keyof T]: T[Key] extends Record<string, unknown>
//     ? T[Key]
//     : DeepReadonly<T[Key]>
// }

// 2nd
// type DeepReadonly<T> = {
//   readonly [Key in keyof T]: T[Key] extends number | string | boolean | Function
//     ? T[Key]
//     : DeepReadonly<T[Key]>
// }

// 3rd
type DeepReadonly<T> = T extends Function ? T : {
  readonly [K in keyof T]: DeepReadonly<T[K]>
}

type Result = DeepReadonly<Y>



/**
 * @description 2nd version
 * 1. 边界case：Function extends Object // true
 *  `Object` can use Record<string, unknown>, ∵ U can assign anything that's not a primitive to `Object`.
 *  `Array` can use Record<number, unknown>  // can't be `number | string` must be `number`.
 */


/**
 * @description 3rd version
 * @see https://stackoverflow.com/questions/68693054/what-is-extends-never-used-for/68693367
 * 
 * **Mapped types** already "skip" primitives by returning the input, 
 * and they automatically distribute over union, so you don't need to check for these yourself
 */
