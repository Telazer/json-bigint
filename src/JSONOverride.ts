import { Replacer, Reviver } from './types';
import { encodeBigIntString, buildReplacerString, buildReviverString } from './utils';

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
