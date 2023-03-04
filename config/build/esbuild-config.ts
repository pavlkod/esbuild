import { BuildOptions } from "esbuild";
import path from "path";
import { CleanPlugin } from "./plugins/CleanPlugin";
import { HTMLPlugin } from "./plugins/HTMLPlugin";

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
  plugins: [CleanPlugin, HTMLPlugin({ title: "Title" })],
  metafile: true,
};
export default config;
