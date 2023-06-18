const esbuild = require('esbuild');

function buildIndexPlugin(paths, esbuildOptions) {
  const entryPoints = Array.isArray(paths) ? paths : [paths];

  return {
    name: 'buildIndex',
    setup(build) {
      build.onStart(async () => {
        await esbuild.build({
          ...esbuildOptions,
          entryPoints,
          bundle: false,
        });
      });
    }
  };
}

module.exports = buildIndexPlugin;
