const yaml = require('js-yaml');
const fs = require('fs');

const yamlToObject = (file) => yaml.safeLoad(fs.readFileSync(file, 'utf8'));

export default yamlToObject;
