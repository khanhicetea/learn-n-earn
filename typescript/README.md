# TypeScript

## Install TypeScript and TSLint

```bash
$ npm install -g typescript tslint
```

## Compile ts files on changes

```bash
$ tsc -w
```

## Recommended editor

Use **VisualStudioCode**

## Basics

### Typehint on parameters

```ts
function x(a: number, b: string) {
    console.log(a, b);
}
x(1, "hello");
```

### Type of returned value

```ts
function x(a: number, b: number): number {
    return a * b / 100;
}
const y = x(4, 2);
```