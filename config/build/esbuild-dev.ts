import ESBuild from "esbuild";

import config from "./esbuild-config";
const port = Number(process.env.PORT) || 3000;

(async () => {
  let ctx = await ESBuild.context({ ...config });
  await ctx.watch();
  const { host, port: port2 } = await ctx.serve({
    servedir: config.outdir,
    port,
  });
  console.log(`serve started on ${host} port ${port2}`);
})();
