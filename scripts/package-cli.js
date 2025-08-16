#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'apps/cli/dist');
const OUTPUT_DIR = path.join(ROOT, 'package-build');

// 1. Remove package-build folder if exists (fresh start)
if (fs.existsSync(OUTPUT_DIR)) {
  console.log('[monkr] Cleaning existing package-build folder...');
  fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
}

// 2. Recreate package-build directory
fs.mkdirSync(OUTPUT_DIR);

console.log('[monkr] Running npm pack inside CLI dist folder...');
const prevFiles = new Set(fs.readdirSync(DIST));
execSync('npm pack', { cwd: DIST, stdio: 'inherit' });

// 3. Find newly created tarball
const newFiles = fs.readdirSync(DIST).filter(
  f => f.endsWith('.tgz') && !prevFiles.has(f)
);

if (newFiles.length === 0) {
  console.error('[monkr] ERROR: No new .tgz package found after npm pack!');
  process.exit(1);
}

const tarballName = newFiles[0];
const tarballSrc = path.join(DIST, tarballName);
const tarballDest = path.join(OUTPUT_DIR, tarballName);

// 4. Move the tarball to package-build folder in root
fs.renameSync(tarballSrc, tarballDest);

console.log(`[monkr] Package tarball moved to: ${tarballDest}`);
console.log('[monkr] Packaging complete!');
