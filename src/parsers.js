import yaml from 'js-yaml';
import ini from 'ini';
import fs from 'fs';
import path from 'path';

const ymlToObject = (filePath) => yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
const iniToObject = (filePath) => ini.parse(fs.readFileSync(filePath, 'utf8'));
const jsonToObject = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));

const getFileExtName = (filePath) => path.extname(filePath);
const getParser = (fileExtName) => {
  switch (fileExtName) {
    case '.json':
      return jsonToObject;
    case '.ini':
      return iniToObject;
    case '.yml':
      return ymlToObject;
    default:
      throw new Error(`Unsupportable file type: ${fileExtName}`);
  }
};

const getParsedData = (filePath) => {
  const fileExtName = getFileExtName(filePath);
  const parser = getParser(fileExtName);
  return parser(filePath);
};

export default getParsedData;
