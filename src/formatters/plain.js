import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return `'${value}'`;
};

const printPlain = (diffTree) => {
  const iter = (tree, parent = '') => {
    const result = tree.map((node) => {
      const {
        type, name, value, oldValue, newValue, children,
      } = node;

      switch (type) {
        case 'unchanged':
          return [];
        case 'added':
          return `Property '${parent}${name}' was added with value: ${getValue(value)}`;
        case 'deleted':
          return `Property '${parent}${name}' was deleted`;
        case 'changed':
          return `Property '${parent}${name}' was changed from ${getValue(oldValue)} to ${getValue(newValue)}`;
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
