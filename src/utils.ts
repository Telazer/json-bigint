import { BIGINT_RE, BIGINT_SUFFIX } from './consts';
import { Replacer, Reviver } from './types';

// export const isEncodedBigInt = (x: any) =>
//   x &&
//   typeof x === "object" &&
//   x[BI_TAG] === BI_TYPE &&
//   typeof x[BI_VAL] === "string";

// export const encodeBigInt = (v: bigint) => ({
//   [BI_TAG]: BI_TYPE,
//   [BI_VAL]: v.toString(),
// });

// export const buildReviver = (user: Reviver) => {
//   const isFunc = typeof user === "function";
//   return function (this: any, key: string, value: any) {
//     let v = isEncodedBigInt(value) ? BigInt(value[BI_VAL]) : value;
//     return isFunc ? (user as Function).call(this, key, v) : v;
//   };
// };

// export const buildReplacer = (user: Replacer) => {
//   const isFunc = typeof user === "function";
//   const allow = Array.isArray(user) ? new Set(user.map(String)) : null;

//   return function (this: any, key: string, value: any) {
//     let v = isFunc ? (user as Function).call(this, key, value) : value;
//     if (allow && key !== "" && !Array.isArray(this) && !allow.has(key))
//       return undefined;
//     return typeof v === "bigint" ? encodeBigInt(v) : v;
//   };
// };

/* eslint-disable @typescript-eslint/no-explicit-any */
export const isEncodedBigIntString = (x: any): x is string => {
  return typeof x === 'string' && BIGINT_RE.test(x);
};

export const encodeBigIntString = (v: bigint) => {
  return `${v.toString()}${BIGINT_SUFFIX}`;
};

export const buildReviverString = (user: Reviver) => {
  const isFunc = typeof user === 'function';
  /* eslint-disable @typescript-eslint/no-explicit-any */
  return function (this: any, key: string, value: any) {
    const v = isEncodedBigIntString(value) ? BigInt(value.slice(0, -1)) : value;
    return isFunc ? user.call(this, key, v) : v;
  };
};

export const buildReplacerString = (user: Replacer) => {
  const isFunc = typeof user === 'function';
  const allow = Array.isArray(user) ? new Set(user.map(String)) : null;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  return function (this: any, key: string, value: any) {
    const v = isFunc ? user.call(this, key, value) : value;
    if (allow && key !== '' && !Array.isArray(this) && !allow.has(key)) return undefined;
    return typeof v === 'bigint' ? encodeBigIntString(v) : v;
  };
};
