const ESBuild = require("esbuild");
const path = require("path");

const mode = process.env.MODE || "development";
const isDev = mode === "development";

function resolvePath(...segments) {
  return path.resolve(__dirname, "..", "..", ...segments);
}

module.exports = {
  outdir: resolvePath("build"),
  entryPoints: [resolvePath("src", "index.jsx")],
  entryNames: "bundle",
  bundle: true,
  minify: !isDev,
  tsconfig: resolvePath("tsconfig.json"),
};
