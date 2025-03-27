#!/usr/bin/env node

/**
 * This script checks for potentially exposed secrets in the codebase
 * Run before committing code to ensure no secrets are accidentally committed
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Patterns to look for
const SENSITIVE_PATTERNS = [
  {
    name: 'Stripe Secret Key',
    regex: /sk_(test|live)_[a-zA-Z0-9]{24,}/g,
    severity: 'CRITICAL'
  },
  {
    name: 'Stripe Publishable Key (in sensitive files)',
    regex: /pk_(test|live)_[a-zA-Z0-9]{24,}/g,
    severity: 'HIGH',
    excludeFiles: ['.env.example'] // It's okay to have this in example files
  },
  {
    name: 'Google API Key',
    regex: /AIza[0-9A-Za-z-_]{35}/g,
    severity: 'HIGH'
  },
  {
    name: 'Generic API Key',
    regex: /api[_-]?key[^a-zA-Z0-9]+(["'])([a-zA-Z0-9]{16,})["']/gi,
    severity: 'MEDIUM'
  },
  {
    name: 'Generic Secret',
    regex: /secret[^a-zA-Z0-9]+(["'])([a-zA-Z0-9]{16,})["']/gi,
    severity: 'MEDIUM'
  }
];

// Files and directories to ignore
const IGNORED_PATHS = [
  'node_modules',
  '.next',
  '.git',
  '.env.local',
  '.env.development',
  '.env.production',
  'scripts/check-secrets.js' // Ignore this file itself
];

// Exclude binary files
const BINARY_EXTENSIONS = [
  '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.ico', '.webp',
  '.pdf', '.zip', '.tar', '.gz', '.rar', '.7z',
  '.exe', '.dll', '.so', '.dylib',
  '.ttf', '.woff', '.woff2', '.eot',
  '.mp3', '.mp4', '.avi', '.mov', '.webm'
];

function isBinaryFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return BINARY_EXTENSIONS.includes(ext);
}

function shouldIgnorePath(filePath) {
  return IGNORED_PATHS.some(ignoredPath => 
    filePath.includes(`/${ignoredPath}/`) || 
    filePath.endsWith(`/${ignoredPath}`) ||
    filePath === ignoredPath
  );
}

function checkFile(filePath, patterns) {
  if (shouldIgnorePath(filePath) || isBinaryFile(filePath)) {
    return [];
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const issues = [];

    patterns.forEach(pattern => {
      // Skip if this file is in the exclude list for this pattern
      if (pattern.excludeFiles && pattern.excludeFiles.some(excludeFile => 
        filePath.endsWith(excludeFile)
      )) {
        return;
      }

      const matches = content.match(pattern.regex);
      if (matches) {
        matches.forEach(match => {
          issues.push({
            file: filePath,
            pattern: pattern.name,
            severity: pattern.severity,
            match: match
          });
        });
      }
    });

    return issues;
  } catch (error) {
    console.error(`Error reading file ${filePath}: ${error.message}`);
    return [];
  }
}

function scanDirectory(dir, patterns, issues = []) {
  if (shouldIgnorePath(dir)) {
    return issues;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      scanDirectory(fullPath, patterns, issues);
    } else if (entry.isFile()) {
      const fileIssues = checkFile(fullPath, patterns);
      issues.push(...fileIssues);
    }
  }
  
  return issues;
}

// Main execution
console.log('Checking for exposed secrets in the codebase...');
const rootDir = path.resolve(__dirname, '..');
const issues = scanDirectory(rootDir, SENSITIVE_PATTERNS);

if (issues.length > 0) {
  console.error('\n⚠️ POTENTIAL SECRETS FOUND ⚠️\n');
  
  // Group by severity
  const severities = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];
  for (const severity of severities) {
    const severityIssues = issues.filter(issue => issue.severity === severity);
    if (severityIssues.length > 0) {
      console.error(`${severity} ISSUES: ${severityIssues.length}`);
      
      for (const issue of severityIssues) {
        console.error(`  • ${issue.file}: ${issue.pattern}`);
        console.error(`    Matched: ${issue.match.substring(0, 20)}...`);
      }
      console.error('');
    }
  }
  
  console.error('Please remove these secrets and use environment variables instead.');
  console.error('Add necessary values to .env.local which is git-ignored.');
  process.exit(1);
} else {
  console.log('✅ No exposed secrets found!');
  process.exit(0);
} 