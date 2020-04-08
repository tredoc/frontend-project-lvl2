#!/usr/bin/env node

import genDiff from '../gendiff';

const { program } = require('commander');
const process = require('process');

program
  .arguments('<firstConfig>')
  .arguments('<secondConfig>')
  .action((firstConfig, secondConfig) => {
    genDiff(firstConfig, secondConfig);
  });

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'output usage information')
  .parse(process.argv);
