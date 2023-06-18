const { join, resolve } = require('node:path');
const { writeFileSync } = require('node:fs');
const { program, InvalidArgumentError } = require('commander');
const { valid: isValidSemver } = require('semver');
const rootDir = resolve(__dirname, '..');

program
  .requiredOption('-v, --version <version>', 'semver version to use')
  .action((options) => {
    if (!isValidSemver(options.version)) {
      throw new InvalidArgumentError('Provided version is not valid');
    }

    const pkgJsonPath = join(rootDir, 'package.json');
    const pkgJson = require(pkgJsonPath);

    pkgJson.version = options.version;

    const nextPkgJsonContent = JSON.stringify(pkgJson, null, 2);

    writeFileSync(pkgJsonPath, nextPkgJsonContent);
  })
  .parse();
