import _ from 'lodash';

const getOffset = (depth) => '  '.repeat(depth);

const stringify = (node, depth = 1) => {
  if (!_.isObject(node)) {
    return `${node}`;
  }
  const keys = Object.keys(node);
  const subTree = keys.map((key) => {
    if (_.isObject(node[key])) {
      return `${getOffset(depth + 2)}${key}: ${stringify(node[key], depth + 2)}`;
    }
    return `${getOffset(depth + 2)}${key}: ${node[key]}`;
  });
  return `{\n${subTree.join('\n')}\n${getOffset(depth)}}`;
};

const printNested = (diffTree) => {
  const iter = (tree, depth) => {
    const result = tree.map((node) => {
      const {
        value, newValue, name, type, children,
      } = node;

      switch (type) {
        case 'unchanged':
          return `${getOffset(depth + 1)}  ${name}: ${stringify(value, depth + 2)}`;
        case 'added':
          return `${getOffset(depth + 1)}+ ${name}: ${stringify(value, depth + 2)}`;
        case 'deleted':
          return `${getOffset(depth + 1)}- ${name}: ${stringify(value, depth + 2)}`;
        case 'changed':
          return [`${getOffset(depth + 1)}- ${name}: ${stringify(value, depth + 2)}`,
            `${getOffset(depth + 1)}+ ${name}: ${stringify(newValue, depth + 2)}`];
        case 'hasChildren':
          return `${getOffset(depth + 1)}  ${name}: ${iter(children, depth + 2)}`;
        default:
          throw new Error(`Unknown node type: ${type}`);
      }
    });
    return `{\n${_.flatten(result).join('\n')}\n${getOffset(depth)}}`;
  };

  return iter(diffTree, 0);
};

export default printNested;
