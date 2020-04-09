const yaml = require('js-yaml');
const ini = require('ini');
const fs = require('fs');

export const yamlToObject = (file) => yaml.safeLoad(fs.readFileSync(file, 'utf8'));

export const iniToObject = (file) => ini.parse(fs.readFileSync(file, 'utf8'));
