const pluginDir = 'packages/partytown-gtm';
const rootDir = __dirname;

module.exports = {
  branches: ['main', { name: 'alpha', prerelease: true, channel: 'alpha' }],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        releaseRules: [
          { breaking: true, release: 'major' },
          { revert: true, release: 'patch' },
          // MINOR
          { type: 'feat', release: 'minor' },
          { type: 'feature', release: 'minor' },
          // PATCH
          { type: 'fix', release: 'patch' },
          { type: 'bugfix', release: 'patch' },
          { type: 'hotfix', release: 'patch' },
          { type: 'chore', release: 'patch' },
          { type: 'perf', release: 'patch' },
          { type: 'refactor', release: 'patch' },
          { type: 'improvement', release: 'patch' },
          { type: 'revert', release: 'patch' },
          { type: 'style', release: 'patch' },
          { type: 'docs', release: 'patch' },
          { type: 'ci', release: 'patch' },
          { type: 'test', release: 'patch' },
          // NO RELEASE
          { type: 'ci', release: false },
          { type: 'build', release: false },
          { type: 'release', release: false },
          { scope: 'no-release', release: false }
        ]
      }
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        presetConfig: {
          types: [
            { type: 'feat', section: '🧩 Features' },
            { type: 'feature', section: '🧩 Features' },
            { type: 'fix', section: '🔧 Fixes' },
            { type: 'bugfix', section: '🔧 Fixes' },
            { type: 'hotfix', section: '🔧 Fixes' },
            { type: 'chore', section: '💉 Improvements' },
            { type: 'perf', section: '💉 Improvements' },
            { type: 'refactor', section: '💉 Improvements' },
            { type: 'improvement', section: '💉 Improvements' },
            { type: 'style', section: '💉 Improvements' },
            { type: 'docs', section: '📚 Docs' },

            { type: 'ci', section: '⚙ Internals', hidden: true },
            { type: 'build', section: '⚙ Internals', hidden: true },
            {
              type: 'release',
              section: '⚙ Internals',
              hidden: true
            }
          ]
        }
      }
    ],
    ['@semantic-release/changelog'],
    [
      '@semantic-release/exec',
      {
        execCwd: pluginDir,
        prepareCmd: `node scripts/set-version -v \${nextRelease.version} && cp ${rootDir}/LICENSE . && cp ${rootDir}/README.md .`,
        publishCmd: 'yarn npm publish'
      }
    ],
    [
      '@semantic-release/github',
      {
        successComment: false
      }
    ],
    [
      '@semantic-release/git',
      {
        assets: [`${pluginDir}/package.json`, 'CHANGELOG.md'],
        message: 'chore(release): ${nextRelease.version} \n\n${nextRelease.notes} [skip-ci]'
      }
    ]
  ]
};
