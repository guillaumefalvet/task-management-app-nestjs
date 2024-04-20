import * as fs from 'fs';
import * as path from 'path';

const seedsDirectory = path.join(
  __dirname,
  '..',
  '..',
  'src',
  'database',
  'seeds',
);
const indexFilePath = path.join(seedsDirectory, 'index.ts');

// Read the contents of the index.ts file
let indexFileContents = fs.readFileSync(indexFilePath, 'utf-8');

// Get a list of seed files in the seeds directory
const seedFiles = fs
  .readdirSync(seedsDirectory)
  .filter((file) => file.endsWith('.ts') && file !== 'index.ts');

// Extract the import statements from the index.ts file
const existingImportStatements = (
  indexFileContents.match(/import\s+{(.+?)}\s+from\s+'(.+?)';/g) || []
).map((statement) => statement.trim());

// Extract the seedingList from the index.ts file
const existingSeedingListMatch = indexFileContents.match(
  /export\s+const\s+seedingList\s*=\s*(\[[\s\S]*?\]);/,
);
const existingSeedingList = existingSeedingListMatch
  ? existingSeedingListMatch[1].trim()
  : '[]';

// Generate import statements and seed list entries for seed files that are not imported
const updatedImportStatements = [];
const updatedSeedListEntries = [];
for (const seedFile of seedFiles) {
  const seedFileName = seedFile.replace('.ts', '');
  const seedFileContent = fs.readFileSync(
    path.join(seedsDirectory, seedFile),
    'utf-8',
  );
  const classNameMatches = seedFileContent.match(/export\s+class\s+([^\s]+)/);
  const className = classNameMatches ? classNameMatches[1] : seedFileName;
  const exportName = classNameMatches ? classNameMatches[1] : seedFileName;
  const importStatement = `import { ${className} } from './${seedFileName}';`;

  if (!existingImportStatements.includes(importStatement)) {
    updatedImportStatements.push(importStatement);
  }

  if (!existingSeedingList.includes(exportName)) {
    updatedSeedListEntries.push(`  ${exportName},`);
  }
}

// Append the updated import statements and seed list entries to the index.ts file
if (updatedImportStatements.length > 0 || updatedSeedListEntries.length > 0) {
  if (updatedImportStatements.length > 0) {
    indexFileContents =
      updatedImportStatements.join('\n') + '\n' + indexFileContents;
  }
  if (updatedSeedListEntries.length > 0) {
    let newSeedList = existingSeedingList;
    if (existingSeedingList === '[]') {
      newSeedList = updatedSeedListEntries.join('\n');
    } else {
      newSeedList =
        existingSeedingList.slice(0, -1) +
        ',\n' +
        updatedSeedListEntries.join('\n') +
        '\n]';
    }
    indexFileContents = indexFileContents.replace(
      /export\s+const\s+seedingList\s*=\s*(\[[\s\S]*?\]);/,
      `export const seedingList = ${newSeedList}`,
    );
  }
  fs.writeFileSync(indexFilePath, indexFileContents);
  console.log('Index file updated successfully.');
} else {
  console.log('No changes required. All seed files are already imported.');
}
