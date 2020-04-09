#!/usr/bin/env node
// const process = require('process');

import yamlToObject from './parsers';

const path = require('path');
const fs = require('fs');
const _ = require('lodash');

/* export const getFilePath = (pathStr) => {
    const filePath = path[0] !== '/' ? `${pathStr}` : path.resolve(process.cwd(), pathStr);
    return filePath;
};
*/
export const compareResultToString = (obj1, obj2) => {
  const keysA = Object.keys(obj1);
  const keysB = Object.keys(obj2);

  const allKeys = [...new Set([...keysA, ...keysB])];

  const result = allKeys.reduce((acc, current) => {
    if (obj1[current] === obj2[current]) {
      return `${acc}\n  ${current}: ${obj1[current]}`;
    }
    if (_.has(obj1, current) && !_.has(obj2, current)) {
      return `${acc}\n- ${current}: ${obj1[current]}`;
    }
    if (!_.has(obj1, current) && _.has(obj2, current)) {
      return `${acc}\n+ ${current}: ${obj2[current]}`;
    }
    if (_.has(obj1, current) && _.has(obj2, current)
        && obj1[current] !== obj2[current]) {
      return `${acc}\n+ ${current}: ${obj2[current]}\n- ${current}: ${obj1[current]}`;
    }
    return acc;
  }, '');
  console.log(`{${result}\n}`);
  return `{${result}\n}`;
};

export const getDataFromFile = (file) => JSON.parse(fs.readFileSync(file));

const genDiff = (fileA, fileB) => {
  let jsonContentA;
  let jsonContentB;
  if (path.extname(fileA) === '.json' && path.extname(fileB) === '.json') {
    jsonContentA = getDataFromFile(fileA);
    jsonContentB = getDataFromFile(fileB);
  } else {
    jsonContentA = yamlToObject(fileA);
    jsonContentB = yamlToObject(fileB);
  }

  return compareResultToString(jsonContentA, jsonContentB);
};

export default genDiff;
