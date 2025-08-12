import { enableJSONBigIntOverrides } from './JSONOverride';
import { Replacer, Reviver } from './types';
import { encodeBigIntString, buildReplacerString, buildReviverString } from './utils';

export class JSONB {
  public static stringify(value: object, replacer?: Replacer, space?: number | string): string {
    if (typeof value === 'bigint') {
      return JSON.stringify(encodeBigIntString(value), null, space);
    }
    return JSON.stringify(value, buildReplacerString(replacer ?? null), space);
  }

  public static parse(text: string, reviver?: Reviver): object {
    return JSON.parse(text, buildReviverString(reviver ?? null));
  }

  public static override() {
    enableJSONBigIntOverrides();
  }
}
