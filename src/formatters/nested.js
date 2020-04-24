import _ from 'lodash';

const getOffset = (depth) => '  '.repeat(depth);

const stringify = (node, depth = 1) => {
  if (!_.isObject(node)) {
    return `${node}`;
  }
  const keys = Object.keys(node);
  const subtree = keys.map((key) => {
    if (_.isObject(node[key])) {
      return `${getOffset(depth + 2)}${key}: ${stringify(node[key], depth + 2)}`;
    }
    return `${getOffset(depth + 2)}${key}: ${node[key]}`;
  });
  return `{\n${subtree.join('\n')}\n${getOffset(depth)}}`;
};

const printNested = (diffTree) => {
  const iter = (acc, tree, depth) => {
    if (tree.length === 0) {
      return `{\n${_.flattenDeep(acc).join('\n')}\n${getOffset(depth)}}`;
    }
    const [node, ...rest] = tree;
    const {
      value, newValue, name, type, children,
    } = node;

    switch (type) {
      case 'unchanged':
        acc.push(`${getOffset(depth + 1)}  ${name}: ${stringify(value, depth + 2)}`);
        break;
      case 'added':
        acc.push(`${getOffset(depth + 1)}+ ${name}: ${stringify(value, depth + 2)}`);
        break;
      case 'deleted':
        acc.push(`${getOffset(depth + 1)}- ${name}: ${stringify(value, depth + 2)}`);
        break;
      case 'changed':
        acc.push(`${getOffset(depth + 1)}- ${name}: ${stringify(value, depth + 2)}`);
        acc.push(`${getOffset(depth + 1)}+ ${name}: ${stringify(newValue, depth + 2)}`);
        break;
      case 'hasChildren':
        acc.push(`${getOffset(depth + 1)}  ${name}: ${iter([], children, depth + 2)}`);
        break;
      default:
        throw new Error('Unknown type');
    }
    return iter(acc, rest, depth);
  };

  return iter([], diffTree, 0);
};

export default printNested;
