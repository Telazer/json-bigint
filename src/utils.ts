import { BIGINT_RE, BIGINT_SUFFIX } from './consts';
import { Replacer, Reviver } from './types';

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

/* eslint-disable @typescript-eslint/no-explicit-any */
export const buildReplacerPurify = (user?: (this: any, key: string, value: any) => any) => {
  const isFunc = typeof user === 'function';
  const seen = new WeakSet();

  return function (this: any, key: string, value: any) {
    // skip unserializable data
    if (typeof value === 'function' || typeof value === 'symbol') return undefined;

    // handle circulars
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return undefined;
      seen.add(value);
    }

    // let user-defined replacer still apply if provided
    return isFunc ? user.call(this, key, value) : value;
  };
};
