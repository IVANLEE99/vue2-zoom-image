import vue from "rollup-plugin-vue";
// import css from "rollup-plugin-css-only";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/vue2-zoom-image.umd.js",
      format: "umd",
      name: "Vue2ZoomImage",
      globals: { vue: "Vue" },
    },
    {
      file: "dist/vue2-zoom-image.cjs.js", // 注意 .cjs 后缀
      format: "cjs", // Node 14 可以直接 require
    },
    {
      file: "dist/vue2-zoom-image.esm.js",
      format: "es",
    },
  ],
  external: ["vue"],
  plugins: [
    // 1️⃣ 先处理 .vue
    vue({
      css: true,
      preprocessStyles: true,
      compileTemplate: true,
    }),

    // 2️⃣ 再解析 node_modules
    resolve({
      extensions: [".js", ".vue"],
    }),

    // 3️⃣ 最后 commonjs
    commonjs(),
    babel({
      exclude: "node_modules/**",
      presets: [
        [
          "@babel/preset-env",
          {
            targets: { node: "14" },
          },
        ],
      ],
    }),
  ],
};
