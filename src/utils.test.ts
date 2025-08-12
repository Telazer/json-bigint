import { isEncodedBigIntString, encodeBigIntString, buildReviverString, buildReplacerString } from './utils';

// Focused test group for isEncodedBigIntString function
describe('isEncodedBigIntString - Core Functionality', () => {
  describe('should return true for valid bigint strings', () => {
    test('"0n"', () => {
      expect(isEncodedBigIntString('0n')).toBe(true);
    });

    test('"5n"', () => {
      expect(isEncodedBigIntString('5n')).toBe(true);
    });

    test('"-123n"', () => {
      expect(isEncodedBigIntString('-123n')).toBe(true);
    });

    test('"9007199254740993n"', () => {
      expect(isEncodedBigIntString('9007199254740993n')).toBe(true);
    });
  });

  describe('should return false for invalid bigint strings', () => {
    test('"100n0" - extra chars after n', () => {
      expect(isEncodedBigIntString('100n0')).toBe(false);
    });

    test('"n10" - n at beginning', () => {
      expect(isEncodedBigIntString('n10')).toBe(false);
    });

    test('"n 100n" - n at beginning with space', () => {
      expect(isEncodedBigIntString('n 100n')).toBe(false);
    });

    test('"123" - no n suffix', () => {
      expect(isEncodedBigIntString('123')).toBe(false);
    });

    test('"123 N" - capital N', () => {
      expect(isEncodedBigIntString('123 N')).toBe(false);
    });

    test('" 123n " - spaces around', () => {
      expect(isEncodedBigIntString(' 123n ')).toBe(false);
    });

    test('"1n2" - extra chars after n', () => {
      expect(isEncodedBigIntString('1n2')).toBe(false);
    });
  });

  describe('edge cases', () => {
    test('empty string', () => {
      expect(isEncodedBigIntString('')).toBe(false);
    });

    test('just "n"', () => {
      expect(isEncodedBigIntString('n')).toBe(false);
    });

    test('just "-n"', () => {
      expect(isEncodedBigIntString('-n')).toBe(false);
    });

    test('"0"', () => {
      expect(isEncodedBigIntString('0')).toBe(false);
    });

    test('"-0n"', () => {
      expect(isEncodedBigIntString('-0n')).toBe(true);
    });

    test('non-string inputs', () => {
      expect(isEncodedBigIntString(123)).toBe(false);
      expect(isEncodedBigIntString(null)).toBe(false);
      expect(isEncodedBigIntString(undefined)).toBe(false);
      expect(isEncodedBigIntString({})).toBe(false);
      expect(isEncodedBigIntString([])).toBe(false);
    });
  });
});

describe('encodeBigIntString', () => {
  test('should encode positive bigint', () => {
    expect(encodeBigIntString(BigInt(123))).toBe('123n');
  });

  test('should encode negative bigint', () => {
    expect(encodeBigIntString(BigInt(-456))).toBe('-456n');
  });

  test('should encode zero', () => {
    expect(encodeBigIntString(BigInt(0))).toBe('0n');
  });

  test('should encode large bigint', () => {
    expect(encodeBigIntString(BigInt('9007199254740993'))).toBe('9007199254740993n');
  });
});

describe('buildReviverString', () => {
  test('should revive bigint strings', () => {
    const reviver = buildReviverString((key, value) => value);
    const result = reviver.call({}, 'key', '123n');
    expect(result).toBe(BigInt(123));
  });

  test('should pass through non-bigint strings', () => {
    const reviver = buildReviverString((key, value) => value);
    const result = reviver.call({}, 'key', 'hello');
    expect(result).toBe('hello');
  });

  test('should call user reviver function', () => {
    const userReviver = jest.fn((key, value) => value);
    const reviver = buildReviverString(userReviver);
    reviver.call({}, 'key', '123n');
    expect(userReviver).toHaveBeenCalledWith('key', BigInt(123));
  });
});

describe('buildReplacerString', () => {
  test('should encode bigint values', () => {
    const replacer = buildReplacerString((key, value) => value);
    const result = replacer.call({}, 'key', BigInt(123));
    expect(result).toBe('123n');
  });

  test('should pass through non-bigint values', () => {
    const replacer = buildReplacerString((key, value) => value);
    const result = replacer.call({}, 'key', 'hello');
    expect(result).toBe('hello');
  });

  test('should call user replacer function', () => {
    const userReplacer = jest.fn((key, value) => value);
    const replacer = buildReplacerString(userReplacer);
    replacer.call({}, 'key', 'hello');
    expect(userReplacer).toHaveBeenCalledWith('key', 'hello');
  });
});
