import { exec } from 'child_process';
// @ts-ignore
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const apiPath = '../api';
process.chdir(apiPath);

// Start Strapi
const strapiProcess = exec('yarn strapi-start', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error starting Strapi: ${error}`);
    return;
  }
  console.log(`Strapi stdout: ${stdout}`);
  console.error(`Strapi stderr: ${stderr}`);
});

process.chdir(__dirname);

// Start Next.js
const nextProcess = exec('npm run dev', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error starting Next.js: ${error}`);
    return;
  }
  console.log(`Next.js stdout: ${stdout}`);
  console.error(`Next.js stderr: ${stderr}`);
});

// End all proccesses
process.on('exit', () => {
  strapiProcess.kill();
  nextProcess.kill();
});
