import yaml from 'js-yaml';
import ini from 'ini';

const getParsedData = (fileData, dataType) => {
  switch (dataType) {
    case 'json':
      return JSON.parse(fileData);
    case 'ini':
      return ini.parse(fileData);
    case 'yml':
      return yaml.safeLoad(fileData);
    default:
      throw new Error(`Unknown type of data: ${dataType}`);
  }
};

export default getParsedData;
