import yaml from 'js-yaml';
import ini from 'ini';
import fs from 'fs';
import path from 'path';

const ymlToObject = (filePath) => yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
const iniToObject = (filePath) => ini.parse(fs.readFileSync(filePath, 'utf8'));
const jsonToObject = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));

const getFileExtName = (filePath) => path.extname(filePath);

const getParsedData = (filePath) => {
  const fileExtName = getFileExtName(filePath);

  switch (fileExtName) {
    case '.json':
      return jsonToObject(filePath);
    case '.ini':
      return iniToObject(filePath);
    case '.yml':
      return ymlToObject(filePath);
    default:
      throw new Error('Unknown file type');
  }
};

export default getParsedData;
