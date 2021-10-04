import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import livereload from "rollup-plugin-livereload";
import json from "@rollup/plugin-json";
import svelte from "rollup-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import css from "rollup-plugin-css-only";
import image from "rollup-plugin-img";

const OUT_DIR = "public/build";

const commonPlugins = [typescript(), commonjs()];

export default [
  {
    input: "src/dev-site/index.ts",
    output: {
      dir: OUT_DIR,
      format: "iife",
      sourcemap: true,
    },
    watch: {
      clearScreen: false,
    },
    plugins: [
      ...commonPlugins,
      image({
        limit: 100000000,
      }),
      json({
        preferConst: true,
      }),
      nodeResolve({
        browser: true,
      }),
      livereload(OUT_DIR),
    ],
  },
  {
    input: "src/on-init.ts",
    output: {
      dir: OUT_DIR,
      format: "iife",
      sourcemap: true,
      name: "app",
    },
    plugins: [
      ...commonPlugins,
      svelte({
        compilerOptions: {
          dev: true,
        },
        preprocess: sveltePreprocess(),
      }),
      css({ output: "bundle.css" }),
      nodeResolve({
        browser: true,
        dedupe: ["svelte"],
      }),
    ],
  },
  {
    input: "src/on-render.ts",
    output: {
      dir: OUT_DIR,
      format: "iife",
      sourcemap: true,
    },
    plugins: [...commonPlugins],
  },
];
