import _ from 'lodash';

const isComplexValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return `'${value}'`;
};

const printPlain = (diffTree) => {
  const iter = (acc, tree, parent = '') => {
    if (tree.length === 0) {
      return acc.join('\n');
    }
    const [node, ...rest] = tree;
    const {
      type, name, value, newValue, children,
    } = node;

    switch (type) {
      case 'unchanged':
        break;
      case 'added':
        acc.push(`Property '${parent}${name}' was added with value: ${isComplexValue(value)}`);
        break;
      case 'deleted':
        acc.push(`Property '${parent}${name}' was deleted`);
        break;
      case 'changed':
        acc.push(`Property '${parent}${name}' was changed from ${isComplexValue(value)} to ${isComplexValue(newValue)}`);
        break;
      case 'hasChildren':
        acc.push(`${iter([], children, `${parent}${name}.`)}`);
        break;
      default:
        throw new Error('Undefined type of node');
    }
    return iter(acc, rest, parent);
  };
  return iter([], diffTree, '');
};

export default printPlain;
