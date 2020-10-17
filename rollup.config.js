import typescript from "@rollup/plugin-typescript";
import tslint from "rollup-plugin-tslint";

export default {
    input: "src/index.ts",
    plugins: [
        tslint(),
        typescript(),
    ],
    output: {
        format: "cjs",
        file: "lib/index.js",
        exports: "default"
    },
    external: [
        "stream","fs","path","crypto"
    ]
}
