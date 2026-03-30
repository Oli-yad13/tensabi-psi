const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const workspaceDirs = ['apps/api'];

for (const workspaceDir of workspaceDirs) {
  const target = path.join(repoRoot, workspaceDir, 'node_modules');
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
    console.log(`Removed ${target}`);
  }
}
