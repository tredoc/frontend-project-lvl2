import yaml from 'js-yaml';
import ini from 'ini';

const getParserFunction = (fileExtName) => {
  switch (fileExtName) {
    case 'json':
      return JSON.parse;
    case 'ini':
      return ini.parse;
    case 'yml':
      return yaml.safeLoad;
    default:
      throw new Error(`Unknown file extName: ${fileExtName}`);
  }
};

export default getParserFunction;
