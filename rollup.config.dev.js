import { nodeResolve } from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import pkg from "./package.json";
import serve from "rollup-plugin-serve";
import replace from "@rollup/plugin-replace";
import livereload from "rollup-plugin-livereload";
import { eslint } from "rollup-plugin-eslint";
import globals from "rollup-plugin-node-globals";

const input = ["src/index.js"];
export default [
  {
    // UMD
    input,
    plugins: [
      eslint(),
      replace({
        preventAssignment: true,
        "process.env.NODE_ENV": JSON.stringify("development"),
      }),
      nodeResolve(),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
      }),
      serve({
        open: true,
        openPage: "/",
        host: "localhost",
        port: 3003,
        contentBase: ["./examples", "./dist"],
      }),
      livereload({
        watch: ["./examples", "./src"],
        exts: ["html", "js", "css"],
      }),
      globals(),
    ],
    output: {
      file: `examples/${pkg.name}.min.js`,
      format: "umd",
      name: "web-monetisation-video-ads", // this is the name of the global object
      esModule: false,
      exports: "named",
      sourcemap: true,
    },
  },
  // ESM and CJS
  {
    input,
    plugins: [nodeResolve()],
    output: [
      {
        dir: "dist/esm",
        format: "esm",
        exports: "named",
        sourcemap: true,
      },
      {
        dir: "dist/cjs",
        format: "cjs",
        exports: "named",
        sourcemap: true,
      },
    ],
  },
];
