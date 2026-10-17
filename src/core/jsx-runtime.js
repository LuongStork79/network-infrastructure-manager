import * as React from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import { create } from 'zustand';

// a: interop helper
export const a = (n, r, o) => (
  n == null ? {} : (n.__esModule ? n : Object.assign({ default: n }, n))
);

// i: CJS module wrapper / memoizer
export const i = (e, t) => () => (
  t || (e((t = { exports: {} }).exports, t), (e = null)),
  t.exports
);

// n: Zustand create
export const n = (fn) => (fn ? create(fn) : create);

// r: React instance getter (shares the single React 19 instance!)
export const r = () => React;

// t: JSX runtime getter
export const t = () => jsxRuntime;

export { React, jsxRuntime };
export default jsxRuntime;
