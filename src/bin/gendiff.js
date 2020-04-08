#!/usr/bin/env node
const { program } = require('commander');
const process = require('process');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const getFilePath = (pathStr) => {
  const filePath = path[0] !== '/' ? `${pathStr}` : path.resolve(process.cwd(), pathStr);
  return filePath;
};

const genDiff = (fileA, fileB) => {
  console.log(fileA, fileB);
  const contentsA = fs.readFileSync(getFilePath(fileA));
  const jsonContentA = JSON.parse(contentsA);
  const contentsB = fs.readFileSync(getFilePath(fileB));
  const jsonContentB = JSON.parse(contentsB);

  const keysA = Object.keys(jsonContentA);
  const keysB = Object.keys(jsonContentB);
  const allKeys = _.uniq(keysA.concat(keysB));

  const result = allKeys.reduce((acc, current) => {
    if (jsonContentA[current] === jsonContentB[current]) {
      return `${acc}\n  ${current}: ${jsonContentA[current]}`;
    }
    if (_.has(jsonContentA, current) && !_.has(jsonContentB, current)) {
      return `${acc}\n- ${current}: ${jsonContentA[current]}`;
    }
    if (!_.has(jsonContentA, current) && _.has(jsonContentB, current)) {
      return `${acc}\n+ ${current}: ${jsonContentB[current]}`;
    }
    if (_.has(jsonContentA, current) && _.has(jsonContentB, current)
      && jsonContentA[current] !== jsonContentB[current]) {
      return `${acc}\n+ ${current}: ${jsonContentB[current]}\n- ${current}: ${jsonContentA[current]}`;
    }
    return acc;
  }, '');
  return console.log(`{${result}\n}`);
};

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

console.log(process.cwd());

export default genDiff;
