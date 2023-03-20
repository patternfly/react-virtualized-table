module.exports = {
  branches: ['main', { name: 'main', channel: 'alpha', prerelease: 'alpha' }],
  analyzeCommits: {
    preset: 'angular'
  },
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
    '@semantic-release/npm'
  ],
  tagFormat: 'prerelease-v5.0.0-alpha.${version}',
  dryRun: true
};
