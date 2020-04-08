#!/usr/bin/env node
const { program } = require('commander');

program
  .arguments('<firstConfig>')
  .arguments('<secondConfig>');

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'output usage information')
  .parse(process.argv);
