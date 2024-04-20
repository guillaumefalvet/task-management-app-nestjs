import fs, { PathLike } from 'fs';
import path from 'path';
import chalk from 'chalk';

class SeedingCreator {
  private _seedDirectory: string;
  private _indexFilePath: string | PathLike;
  private _indexFileName = 'index.ts';

  constructor() {
    this._seedDirectory = path.join(
      __dirname,
      '..',
      '..',
      'src',
      'database',
      'seeds',
    );
    this._indexFilePath = path.join(this._seedDirectory, this._indexFileName);
  }

  logInfo(message: string): void {
    console.log(chalk.blueBright(message));
  }

  logSuccess(message: string): void {
    console.log(chalk.greenBright(message));
  }

  logError(message: string): void {
    console.log(chalk.redBright(message));
  }

  getSeedFilesWithBirthtime() {
    this.logInfo(
      'Retrieving seed files and their birthtime from the seeds directory...',
    );
    return fs
      .readdirSync(this._seedDirectory)
      .filter((file) => file.endsWith('.ts') && file !== this._indexFileName)
      .map((file) => ({
        filename: file,
        birthtime: fs.statSync(path.join(this._seedDirectory, file)).birthtime,
      }))
      .sort((a, b) => Number(a.birthtime) - Number(b.birthtime));
  }

  createSeedingEntryPoint(
    seedFilesWithBirthtime: { filename: string; birthtime: Date }[],
  ) {
    this.logSuccess('Seed files and their birthtime retrieved successfully.');

    this.logInfo(
      'Recreating the seedingEntryPoint array with all seed files in order of birthtime...',
    );
    return seedFilesWithBirthtime.map((file) => {
      const seedFileName = file.filename.replace('.ts', '');
      const seedFileContent = fs.readFileSync(
        path.join(this._seedDirectory, file.filename),
        'utf-8',
      );
      const classNameMatches = seedFileContent.match(
        /export\s+class\s+([^\s]+)/,
      );
      const className = classNameMatches ? classNameMatches[1] : seedFileName;
      return `  ${className}`;
    });
  }

  generateImportStatements(
    seedFilesWithBirthtime: { filename: string; birthtime: Date }[],
  ) {
    this.logInfo('Generating import statements for new seed files...');
    return seedFilesWithBirthtime.map((file) => {
      const seedFileName = file.filename.replace('.ts', '');
      const seedFileContent = fs.readFileSync(
        path.join(this._seedDirectory, file.filename),
        'utf-8',
      );
      const classNameMatches = seedFileContent.match(
        /export\s+class\s+([^\s]+)/,
      );
      const className = classNameMatches ? classNameMatches[1] : seedFileName;
      const timestamp = file.birthtime.toISOString();
      return `// Seeding creation: ${timestamp}\nimport { ${className} } from './${seedFileName}';`;
    });
  }

  updateIndexFileContents(
    updatedImportStatements: string[],
    seedingEntryPoint: string[],
  ) {
    this.logSuccess('Import statements generated successfully.');

    this.logInfo(`Updating ${this._indexFileName} file contents...`);
    const indexFileContents = `${updatedImportStatements.join(
      '\n',
    )}\n\nexport const seedingEntryPoint = [\n${seedingEntryPoint.join(
      ',\n',
    )}\n];`;
    this.logSuccess(
      `${this._indexFileName} file contents updated successfully.`,
    );
    return indexFileContents;
  }

  writeIndexFileContents(indexFileContents: string) {
    this.logInfo(
      `Writing the updated contents back to ${this._indexFileName}...`,
    );
    fs.writeFileSync(this._indexFilePath, indexFileContents);
    this.logSuccess(`${this._indexFileName} file updated successfully.`);
  }

  run() {
    try {
      const seedFilesWithBirthtime = this.getSeedFilesWithBirthtime();
      const seedingEntryPoint = this.createSeedingEntryPoint(
        seedFilesWithBirthtime,
      );
      const updatedImportStatements = this.generateImportStatements(
        seedFilesWithBirthtime,
      );
      const updatedIndexFileContents = this.updateIndexFileContents(
        updatedImportStatements,
        seedingEntryPoint,
      );
      this.writeIndexFileContents(updatedIndexFileContents);
    } catch (error) {
      this.logError(`An error occurred: ${JSON.stringify(error.message)}`);
    }
  }
}

const seeder = new SeedingCreator();
seeder.run();
