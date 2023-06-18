const esbuild = require('esbuild');

function buildSnippetPlugin(filter, replacer, esbuildOptions = {}) {
  const cleanUpOutput = (str) => str
    .trim()
    // Remove use strict invocation
    .replace(/^"use strict";\s?/, '')
    // Remove esbuild's iife opening
    .replace(/^\(\(\)\s?=>\s?\{\s?/, '')
    // Remove esbuild's iife ending
    .replace(/\s?\}\)\(\);$/, '');

  return {
    name: 'buildSnippet',
    setup(build) {
      build.onLoad({ filter }, async (args) => {
        const result = await esbuild.build({
          entryPoints: [args.path],
          bundle: true,
          write: false,
          format: 'iife',
          platform: 'browser',
          ...esbuildOptions
        });

        const [outFile] = result.outputFiles;
        const code = cleanUpOutput(outFile.text);
        const finalCode = typeof replacer === 'function' ? replacer(code) : code;

        return {
          contents: finalCode,
          loader: 'text'
        };
      });
    }
  };
}

module.exports = buildSnippetPlugin;
