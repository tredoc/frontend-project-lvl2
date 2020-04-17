#!/usr/bin/env node

import genDiff from '..';
import program from 'commander';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig>')
  .arguments('<secondConfig>')
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'output usage information')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig, program.format))}
  );
program.parse(process.argv);
