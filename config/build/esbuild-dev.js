const ESBuild = require("esbuild");
const path = require("path");

const config = require("./esbuild-config");
const port = process.env.PORT || 3000;

(async () => {
  let ctx = await ESBuild.context({ ...config });
  await ctx.watch();
  const { host, port: port2 } = await ctx.serve({
    servedir: config.outdir,
    port,
  });
  console.log(`serve started on ${host} port ${port2}`);
})();
