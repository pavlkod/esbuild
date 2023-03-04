import { Plugin } from "esbuild";

import { rm, writeFile } from "fs/promises";
import path from "path";

interface HTMLPluginOptions {
  template?: string;
  title?: string;
  jsPath?: string[];
  cssPath?: string[];
}

const preparePaths = (outputs: string[]) => {
  return outputs.reduce<Array<string[]>>(
    (acc, path) => {
      const [js, css] = acc;
      const splittedName = path.split("/").pop();
      if (splittedName?.endsWith(".js")) {
        js.push(splittedName);
      } else if (splittedName?.endsWith(".css")) {
        css.push(splittedName);
      }
      return acc;
    },
    [[], []]
  );
};

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
        const [jsPath, cssPath] = preparePaths(Object.keys(outputs || {}));
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
              ${cssPath?.map(script => `<link href='${script}' rel="stylesheet"/>`).join(" ")}
            </head>
            <body>
              <div id="app"></div>
              ${jsPath?.map(script => `<script src='${script}'></script>`).join(" ")}
              <script>
new EventSource("/esbuild").addEventListener("change", () => location.reload());</script>
            </body>
          </html>
        `
          );
        }
      });
    },
  };
};
