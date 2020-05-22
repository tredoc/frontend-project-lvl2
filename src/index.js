import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getParsedData from './parsers';
import printDiff from './formatters/index';

const buildDiffTree = (obj1, obj2) => {
  const unionKeys = _.union(_.keys(obj1), _.keys(obj2));

  return unionKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return { name: key, value: obj2[key], type: 'added' };
    }
    if (!_.has(obj2, key)) {
      return { name: key, value: obj1[key], type: 'deleted' };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { name: key, children: buildDiffTree(obj1[key], obj2[key]), type: 'hasChildren' };
    }
    if (obj1[key] === obj2[key]) {
      return { name: key, value: obj1[key], type: 'unchanged' };
    }
    return {
      name: key, value: obj1[key], changedToValue: obj2[key], type: 'changed',
    };
  });
};

const getData = (filePath) => fs.readFileSync(filePath, 'utf8');
const getDataType = (filePath) => path.extname(filePath).slice(1);

const genDiff = (pathToFileA, pathToFileB, format = 'nested') => {
  const contentOfFileA = getParsedData(getData(pathToFileA), getDataType(pathToFileA));
  const contentOfFileB = getParsedData(getData(pathToFileB), getDataType(pathToFileB));
  const diffTree = buildDiffTree(contentOfFileA, contentOfFileB);

  return printDiff(diffTree, format);
};

export default genDiff;
