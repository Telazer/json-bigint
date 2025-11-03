import { Replacer } from './types';
import { buildReplacerPurify } from './utils';

let _origStringify: typeof JSON.stringify | null = null;

export function enableJSONPurify() {
  if (_origStringify) return; // already enabled
  _origStringify = JSON.stringify;

  JSON.stringify = function (value: any, replacer?: Replacer, space?: number | string): string {
    try {
      return _origStringify!(value, buildReplacerPurify(replacer as any), space);
    } catch {
      return '{}';
    }
  };
}

export function disableJSONPurify() {
  if (!_origStringify) return;
  JSON.stringify = _origStringify;
  _origStringify = null;
}
