import * as fs from 'fs';
import { Env } from 'src/shared/models/env';

function generateEnvFile() {
  if (fs.existsSync('.env')) {
    console.log('.env file already exists. Skipping generation.');
    return;
  }

  let envContent = '';

  for (const key in Env) {
    if (
      Object.prototype.hasOwnProperty.call(Env, key) &&
      key !== 'dataBaseType' &&
      key !== 'appStage'
    ) {
      const enumValue = Env[key as keyof typeof Env];
      envContent += `${enumValue}=\n`;
    }
  }

  fs.writeFileSync('.env', envContent);

  console.log('.env file generated successfully.');
}

generateEnvFile();
