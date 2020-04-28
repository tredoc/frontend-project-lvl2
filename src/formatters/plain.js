import _ from 'lodash';

const isComplexValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return `'${value}'`;
};

const printPlain = (diffTree) => {
  const iter = (tree, parent = '') => {
    const result = tree.map((node) => {
      const {
        type, name, value, newValue, children,
      } = node;

      switch (type) {
        case 'unchanged':
          return [];
        case 'added':
          return `Property '${parent}${name}' was added with value: ${isComplexValue(value)}`;
        case 'deleted':
          return `Property '${parent}${name}' was deleted`;
        case 'changed':
          return `Property '${parent}${name}' was changed from ${isComplexValue(value)} to ${isComplexValue(newValue)}`;
        case 'hasChildren':
          return `${iter(children, `${parent}${name}.`)}`;
        default:
          throw new Error(`Undefined type of node: ${type}`);
      }
    });
    return _.flatten(result).join('\n');
  };
  return iter(diffTree, '');
};

export default printPlain;
