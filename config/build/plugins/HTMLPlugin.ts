import { Plugin } from "esbuild";

import { rm, writeFile } from "fs/promises";
import path from "path";

interface HTMLPluginOptions {
  template?: string;
  title?: string;
  jsPath?: string[];
  cssPath?: string[];
}

export const HTMLPlugin = (options: HTMLPluginOptions): Plugin => {
  return {
    name: "HTMLPlugin",
    setup(build) {
      const outdir = build.initialOptions.outdir;
      build.onStart(async () => {
        try {
          if (outdir) {
            console.log(outdir);
            await rm(outdir, { recursive: true });
          }
        } catch {
          console.log("error");
        }
      });
      build.onEnd(async result => {
        const outputs = result.metafile?.outputs;
        const [jsPath, cssPath] = preparePaths(outputs);
        if (outdir) {
          await writeFile(
            path.resolve(outdir, "index.html"),
            options.template ||
              `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>${options.title || Document}</title>
            </head>
            <body>
              <div id="app"></div>
              ${options?.jsPath?.map(script => `<script src=${script}></script>`)}
              <script src="../src/index.js"></script>
            </body>
          </html>
        `
          );
        }
      });
    },
  };
};
