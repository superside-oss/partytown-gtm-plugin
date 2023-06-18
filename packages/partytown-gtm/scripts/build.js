const { join, resolve } = require('node:path');
const { program, Option } = require('commander');
const esbuild = require('esbuild');
const buildSnippetPlugin = require('./buildSnippetPlugin');

const rootDir = resolve(__dirname, '..');
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
  const sharedOptions = {
    bundle: true,
    platform: 'browser',
    minify: options.debug === true ? false : true,
    logLevel: 'info'
  };

  const baseConfig = {
    entryPoints: [
      join(sourceDir, 'script.tsx'),
      join(sourceDir, 'util.ts')
    ],
    outdir: join(rootDir, 'lib'),
    tsconfig: join(rootDir, 'tsconfig.json'),
    external: ['react', 'react-dom'],
    plugins: [
      buildSnippetPlugin(/\/snippets\/tagAssistant(Main|Worker)\.ts$/, null, sharedOptions),
      buildSnippetPlugin(
        /\/snippets\/gtmSnippet\.ts$/,
        (str) => str.replace(/["']__GTM_ID__["']/, 'props.gtmId'),
        sharedOptions
      )
    ],
    // watch: options.watch ? true : false,
    minify: options.debug === true ? false : true
  };

  switch (options.format) {
    case 'esm':
      return {
        ...sharedOptions,
        ...baseConfig,
        format: 'esm',
        outExtension: {
          '.js': '.mjs'
        }
      };
    case 'cjs':
    default:
      return {
        ...sharedOptions,
        ...baseConfig,
        format: 'cjs'
      };
  }
}
