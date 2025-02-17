import esbuild from 'esbuild';
import fs from 'fs';

const logDetails = (startTime, endTime, file) => {
  const stats = fs.statSync(file);
  const fileSizeInBytes = stats.size;
  const fileSizeInKilobytes = fileSizeInBytes / 1024;
  console.log(`🚀 Built ${file} in ${endTime - startTime}ms`);
  console.log(`   File size: ${fileSizeInKilobytes.toFixed(2)} KB`);
};

const buildOptions = {
  cdn: [
    {
      outfileSuffix: '.min.js',
      minify: true,
      platform: 'browser',
    },
    {
      outfileSuffix: '.js',
      platform: 'browser',
      mainFields: ['main', 'module'],
    },
  ],
  module: [
    {
      outfileSuffix: '.esm.js',
      platform: 'neutral',
    },
    {
      outfileSuffix: '.cjs.js',
      target: ['node10.4'],
      platform: 'node',
    },
  ],
};

const bundle = async (file, config) => {
  const startTime = Date.now();
  const baseOptions = {
    entryPoints: [`builds/${file}`],
    bundle: true,
    logLevel: 'info',
  };

  for (const options of config) {
    const { outfileSuffix, ...esbuildOptions } = options;
    const outfile = `dist/${file.replace('.js', outfileSuffix)}`;

    const context = await esbuild.context({
      ...baseOptions,
      ...esbuildOptions,
      outfile,
    });

    if (process.argv.includes('--watch')) {
      await context.watch();
    } else {
      await context.rebuild();
      await context.dispose();
      const endTime = Date.now();
      logDetails(startTime, endTime, outfile);
    }
  }
};

// Process each file based on its name
const buildFiles = fs.readdirSync('./builds');
buildFiles.forEach((file) => {
  const slug = file.replace('.js', '');
  if (buildOptions[slug]) {
    bundle(file, buildOptions[slug]);
  }
  console.log(`🚀 Built ${file}`);
});
