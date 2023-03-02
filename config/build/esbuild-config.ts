import { BuildOptions } from "esbuild";
import path from "path";

const mode = process.env.MODE || "development";
const isDev = mode === "development";

function resolvePath(...segments: string[]) {
  return path.resolve(__dirname, "..", "..", ...segments);
}

const config: BuildOptions = {
  outdir: resolvePath("build"),
  entryPoints: [resolvePath("src", "index.jsx")],
  entryNames: "[dir]/bundle.[name]-[hash]",
  bundle: true,
  minify: !isDev,
  sourcemap: !isDev,
  tsconfig: resolvePath("tsconfig.json"),
  loader: {
    ".png": "file",
    ".svg": "file",
  },
};
export default config;
