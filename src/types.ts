/* eslint-disable @typescript-eslint/no-explicit-any */
export type Replacer = ((this: any, key: string, value: any) => any) | (number | string)[] | null;
export type Reviver = ((this: any, key: string, value: any) => any) | null;
