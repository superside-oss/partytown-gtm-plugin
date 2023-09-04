import esbuild from 'esbuild';

export default function buildIndexPlugin(paths, esbuildOptions) {
  const entryPoints = Array.isArray(paths) ? paths : [paths];

  return {
    name: 'buildIndex',
    setup(build) {
      build.onStart(async () => {
        await esbuild.build({
          ...esbuildOptions,
          entryPoints,
          format: 'esm',
          bundle: false,
        });
      });
    }
  };
}
