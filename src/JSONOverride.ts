import { Replacer, Reviver } from './types';
import { encodeBigIntString, buildReplacerString, buildReviverString } from './utils';

// declare global {
//   interface JSON {
//     stringifyb(value: any, replacer?: Replacer, space?: number | string): string;
//     parseb(text: string, reviver?: Reviver): any;
//   }
// }
// export {};

// const define = (name: 'stringifyb' | 'parseb', fn: Function) => {
//   Object.defineProperty(JSON, name, {
//     value: fn,
//     configurable: true,
//     writable: true,
//     enumerable: false,
//   });
// };

// // Add JSON.stringifyb
// define('stringifyb', function (value: any, replacer?: Replacer, space?: number | string) {
//   // Guard for root BigInt (some engines throw before calling replacer)
//   const root = typeof value === 'bigint' ? encodeBigInt(value) : value;
//   return JSON.stringify(root, buildReplacer(replacer ?? null), space as any);
// });

// // Add JSON.parseb
// define('parseb', function (text: string, reviver?: Reviver) {
//   return JSON.parse(text, buildReviver(reviver ?? null));
// });

// Optional: enable/disable full overrides of native JSON.parse/stringify

let _origStringify: typeof JSON.stringify | null = null;
let _origParse: typeof JSON.parse | null = null;

export function enableJSONBigIntOverrides() {
  if (_origStringify) return; // already enabled
  _origStringify = JSON.stringify;
  _origParse = JSON.parse;

  JSON.stringify = function (value: object, replacer?: Replacer, space?: number | string): string {
    const root = typeof value === 'bigint' ? encodeBigIntString(value) : value;
    return _origStringify!(root, buildReplacerString(replacer ?? null), space);
  };

  JSON.parse = function (text: string, reviver?: Reviver): object {
    return _origParse!(text, buildReviverString(reviver ?? null));
  };
}

export function disableJSONBigIntOverrides() {
  if (!_origStringify || !_origParse) return;
  JSON.stringify = _origStringify;
  JSON.parse = _origParse;
  _origStringify = null;
  _origParse = null;
}

enableJSONBigIntOverrides();
