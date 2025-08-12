# Telazer - JsonBigint

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/Telazer/event-helper)

For more helpers and utilities, check out the [Telazer NPM Page](https://www.npmjs.com/org/telazer)

A TypeScript utility library for stringify and parse json with bigint.

---

## Installation

```ts
npm install @telazer/json-bigint
```

---

## Key Features

- JSONB class or override native JSON with BigInt support
- Parse and stringify JSON objects containing BigInt values
- Seamlessly handles conversion between BigInt and JSON-compatible formats
- Maintains data integrity for large numbers beyond Number.MAX_SAFE_INTEGER
- Simple drop-in replacement for JSON.stringify and JSON.parse

---

## Import

```ts
import JSONB from '@telazer/json-bigint';
```

## Usage

```ts
const jsonbString = JSONB.stringify({ name: 'Bigint Field', value: 100n });
/*
 * JSONB.stringify output
 *	{
 *		"name": "Bigint Field",
 *		"value": "100n"
 *	}
 */
const jsonbObject = JSONB.parse(jsonbString);
/*
 * JSONB.parse output
 *	{
 *		"name": "Bigint Field",
 *		"value": 100n,
 *	}
 */
```

## Override native JSON with BigInt support

Simply import override.

```ts
// ES2018
import '@telazer/json-bigint/override';
// CommonJS
require('@telazer/json-bigint/override');
```

---

## Development

```bash
# Clone the repo
git clone https://github.com/Telazer/event-helper

# Install dependencies
npm install

# Start the watcher for development
npm run watch

# Build the library
npm run build
```

---

## License

MIT License

Copyright (c) 2025 Telazer LLC.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rightsto use, copy, modify, merge, publish, distribute, sublicense, and/or sellcopies of the Software, and to permit persons to whom the Software isfurnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in allcopies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS ORIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THEAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHERLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THESOFTWARE.
