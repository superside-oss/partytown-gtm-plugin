import { join, resolve, dirname } from 'node:path';
import { program } from 'commander';
import esbuild from 'esbuild';
import buildSnippetPlugin from './buildSnippetPlugin.js';
import buildIndexPlugin from './buildIndexPlugin.js';

const currentFileUrl = new URL(import.meta.url);
const rootDir = resolve(dirname(currentFileUrl.pathname), '..');
const sourceDir = join(rootDir, 'src');

program
  .option('-w, --watch')
  .option('-d, --debug')
  .action((options) => {
    return buildCode(options);
  })
  .parse();

async function buildCode(options) {
  const config = getEsbuildConfig(options);

  if (options.watch) {
    const context = await esbuild.context(config);

    await context.watch();
  } else {
    await esbuild.build(config);
  }
}

function getEsbuildConfig(options) {
  const sharedConfig = {
    bundle: true,
    platform: 'browser',
    minify: options.debug === true ? false : true,
    logLevel: 'info'
  };

  const outDir = join(rootDir, 'lib');

  return {
    ...sharedConfig,
    entryPoints: [join(sourceDir, 'script.tsx'), join(sourceDir, 'util.ts')],
    outdir: outDir,
    format: 'esm',
    tsconfig: join(rootDir, 'tsconfig.json'),
    external: ['react', 'react-dom'],
    plugins: [
      buildIndexPlugin(join(sourceDir, 'index.ts'), {
        ...sharedConfig,
        outdir: outDir
      }),
      buildSnippetPlugin(/\/snippets\/tagAssistant(Main|Worker)\.ts$/, null, sharedConfig),
      buildSnippetPlugin(
        /\/snippets\/gtmSnippet\.ts$/,
        (str) => str.replace(/["']__GTM_ID__["']/, 'props.gtmId'),
        sharedConfig
      )
    ],
    // watch: options.watch ? true : false,
    minify: options.debug === true ? false : true
  };
}

