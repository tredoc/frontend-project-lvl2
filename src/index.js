import _ from 'lodash';
import getParsedData from './parsers';
import printDiff from './formatters/index';

export const buildDiffTree = (obj1, obj2) => {
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
      name: key, value: obj1[key], newValue: obj2[key], type: 'changed',
    };
  });
};

const genDiff = (pathToFileA, pathToFileB, format = 'nested') => {
  const contentOfFileA = getParsedData(pathToFileA);
  const contentOfFileB = getParsedData(pathToFileB);
  const diffTree = buildDiffTree(contentOfFileA, contentOfFileB);
  return printDiff(diffTree, format);
};

export default genDiff;
