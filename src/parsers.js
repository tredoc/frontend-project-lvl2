const yaml = require('js-yaml');
const ini = require('ini');
const fs = require('fs');
const path = require('path');

const ymlToObject = (filePath) => yaml.safeLoad(fs.readFileSync(path.resolve(filePath), 'utf8'));
const iniToObject = (filePath) => ini.parse(fs.readFileSync(path.resolve(filePath), 'utf8'));
const jsonToObject = (filePath) => JSON.parse(fs.readFileSync(path.resolve(filePath), 'utf8'));

const getFileExtName = (fileName) => path.extname(fileName);

const getFileContent = (filePath) => {
  const fileExtName = getFileExtName(filePath);

  switch (fileExtName) {
    case '.json':
      return jsonToObject(filePath);
    case '.ini':
      return iniToObject(filePath);
    case '.yml':
      return ymlToObject(filePath);
    default:
      return console.log('non supportable format');
  }
};

export default getFileContent;
