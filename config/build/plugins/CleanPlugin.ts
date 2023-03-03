import { Plugin } from "esbuild";

import { rm } from "fs/promises";

export const CleanPlugin: Plugin = {
  name: "CleanPlugin",
  setup(build) {
    // Intercept import paths called "env" so esbuild doesn't attempt
    // to map them to a file system location. Tag them with the "env-ns"
    // namespace to reserve them for this plugin.
    build.onStart(async () => {
      try {
        const outdir = build.initialOptions.outdir;
        if (outdir) {
          console.log(outdir);
          await rm(outdir, { recursive: true });
        }
      } catch {
        console.log("error");
      }
    });
  },
};
