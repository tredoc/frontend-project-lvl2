import getFileContent from './parsers';
import printDiff from './formatters/index';
import _ from 'lodash';

export const buildDiffTree = (obj1, obj2) => {
  const keysA = Object.keys(obj1);
  const keysB = Object.keys(obj2);
  const allKeys = [...new Set([...keysA, ...keysB])];

  return allKeys.map((key) => {
    if(!_.has(obj1, key)) {
      return { name: key, value: obj2[key], status: 'added' };
    }
    if(!_.has(obj2, key)) {
      return { name: key, value: obj1[key], status: 'deleted' };
    }
    if(_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { name: key, children: buildDiffTree(obj1[key], obj2[key]), status: 'hasChildren' };
    }
    if(obj1[key] === obj2[key]) {
      return { name: key, value: obj1[key], status: 'unchanged'};
    }
    return { name: key, value: obj1[key], newValue: obj2[key], status: 'changed' };
  });
};

const genDiff = (fileA, fileB, format = 'nested') => {
  const fileContentA = getFileContent(fileA);
  const fileContentB = getFileContent(fileB);
  const diffTree = buildDiffTree(fileContentA, fileContentB);
  return  printDiff(diffTree, format);
};

export default genDiff;
