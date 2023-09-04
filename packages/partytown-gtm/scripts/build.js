import { join, resolve, dirname } from 'node:path';
import { program, Option } from 'commander';
import esbuild from 'esbuild';
import buildSnippetPlugin from './buildSnippetPlugin.js';
import buildIndexPlugin from './buildIndexPlugin.js';

const currentFileUrl = new URL(import.meta.url);
const rootDir = resolve(dirname(currentFileUrl.pathname), '..');
const sourceDir = join(rootDir, 'src');

program
  .option('-w, --watch')
  .option('-d, --debug')
  .addOption(
    new Option('-f, --format <format>', 'output format')
      .choices(['cjs', 'esm'])
      .default('cjs')
  )
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
  const formatConfig = getEsbuildFormat(options);

  const sharedConfig = {
    bundle: true,
    platform: 'browser',
    minify: options.debug === true ? false : true,
    logLevel: 'info'
  };

  return {
    ...sharedConfig,
    ...formatConfig,
    entryPoints: [
      join(sourceDir, 'script.tsx'),
      join(sourceDir, 'util.ts')
    ],
    outdir: join(rootDir, 'lib'),
    tsconfig: join(rootDir, 'tsconfig.json'),
    external: ['react', 'react-dom'],
    plugins: [
      buildIndexPlugin(
        join(sourceDir, 'index.ts'),
        {
          ...sharedConfig,
          ...formatConfig,
          outdir: join(rootDir, 'lib'),
        }
      ),
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

function getEsbuildFormat(options) {
  switch (options.format) {
    case 'esm':
      return {
        format: 'esm',
      };
    case 'cjs':
    default:
      return {
        format: 'cjs',
        outExtension: {
          '.js': '.cjs'
        }
      };
  }
}
