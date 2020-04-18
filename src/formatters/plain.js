import _ from 'lodash';

const isComplexValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return `'${value}'`;
};

const printPlain = (diffTree, parent = '') => {
  const str = diffTree.map((node) => {
    const {
      status, name, value, newValue, children,
    } = node;
    switch (status) {
      case 'unchanged':
        break;
      case 'added':
        return `Property '${parent}${name}' was added with value: ${isComplexValue(value)}\n`;
      case 'deleted':
        return `Property '${parent}${name}' was deleted\n`;
      case 'changed':
        return `Property '${parent}${name}' was changed from ${isComplexValue(value)} to ${isComplexValue(newValue)}\n`;
      case 'hasChildren':
        return `${printPlain(children, `${parent}${node.name}.`)}`;
      default:
        return 'status undefined';
    }
    return null;
  });
  return str.join('');
};

export default printPlain;
