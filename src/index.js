import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getParser from './parsers';
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
      name: key, oldValue: obj1[key], newValue: obj2[key], type: 'changed',
    };
  });
};

const getData = (filePath) => fs.readFileSync(filePath, 'utf8');
const getFileExtName = (filePath) => path.extname(filePath).slice(1);

const genDiff = (path1, path2, format = 'nested') => {
  const parseData1 = getParser(getFileExtName(path1));
  const parseData2 = getParser(getFileExtName(path2));
  const contentOfFile1 = parseData1(getData(path1));
  const contentOfFile2 = parseData2(getData(path2));
  const diffTree = buildDiffTree(contentOfFile1, contentOfFile2);

  return printDiff(diffTree, format);
};

export default genDiff;
