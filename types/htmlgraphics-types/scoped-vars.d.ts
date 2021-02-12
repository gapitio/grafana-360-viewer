/* eslint-disable @typescript-eslint/no-explicit-any */

interface ScopedVar<T = any> {
  text: any;
  value: T;
  [key: string]: any;
}
interface ScopedVars {
  [key: string]: ScopedVar;
}
