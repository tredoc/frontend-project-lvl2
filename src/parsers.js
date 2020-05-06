import yaml from 'js-yaml';
import ini from 'ini';

const ymlToObject = (fileData) => yaml.safeLoad(fileData);
const iniToObject = (fileData) => ini.parse(fileData);
const jsonToObject = (fileData) => JSON.parse(fileData);

const getParsedData = (fileData, fileExtName) => {
  switch (fileExtName) {
    case '.json':
      return jsonToObject(fileData);
    case '.ini':
      return iniToObject(fileData);
    case '.yml':
      return ymlToObject(fileData);
    default:
      throw new Error(`Unknown file type: ${fileExtName}`);
  }
};

export default getParsedData;
