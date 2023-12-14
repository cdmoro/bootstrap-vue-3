/**
 * @deprecated
 */
export const isObject = (obj: Readonly<unknown>): obj is Record<PropertyKey, unknown> =>
  obj !== null && typeof obj === 'object'

/**
 * @deprecated
 */
export const isNumeric = (value: Readonly<unknown>): boolean =>
  /^[0-9]*\.?[0-9]+$/.test(String(value))
