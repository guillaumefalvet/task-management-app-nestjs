import * as fs from 'fs';
import * as readlineSync from 'readline-sync';

// - Models - //
import { EnvEnum } from 'src/shared/models/env';

function generateEnvFile() {
  if (fs.existsSync('.env')) {
    console.log('.env file already exists. Skipping generation.');
    return;
  }

  let envContent = '';

  for (const key in EnvEnum) {
    if (
      Object.prototype.hasOwnProperty.call(EnvEnum, key) &&
      key !== 'dataBaseType' &&
      key !== 'appStage'
    ) {
      const enumValue = EnvEnum[key as keyof typeof EnvEnum];
      const userInput = readlineSync.question(`Enter value for ${enumValue}: `);
      envContent += `${enumValue}=${userInput}\n`;
    }
  }

  fs.writeFileSync('.env', envContent);

  console.log('.env file generated successfully.');
}

generateEnvFile();
