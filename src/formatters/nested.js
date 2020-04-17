import _ from 'lodash';

const getOffset = (depth) => '  '.repeat(depth);

const stringify = (node, depth = 1) => {
    if(!_.isObject(node)) {
        return ` ${node}`;
    }
    const str = Object.keys(node).map((key) => {
        if (typeof node[key] !== 'object') {
            return `${getOffset(depth + 2)}${key}: ${node[key]}`;
        }
        return `${getOffset(depth + 2)}${key}: ${stringify(node[key], depth + 1)}`;
    });
    return ` {\n${str.join('\n')}\n  ${getOffset(depth)}}`;
};

export const printNested = (tree, depth = 1) => {
    const string = tree.map((node) => {
        const { value, newValue, name, status } = node;

        switch (status) {
            case 'unchanged':
                return `${getOffset(depth)}  ${name}:${stringify(value, depth)}`
            case 'added':
                return `${getOffset(depth)}+ ${name}:${stringify(value, depth)}`
            case 'deleted':
                return  `${getOffset(depth)}- ${name}:${stringify(value, depth)}`;
            case 'changed':
                return `${getOffset(depth)}- ${name}:${stringify(value, depth)}\n${getOffset(depth)}+ ${name}: ${stringify(newValue, depth)}`;
            case 'hasChildren':
                return `${getOffset(depth)}  ${name}:  ${printNested(node.children, depth + 1)}`;
            default:
                return 'status undefined';
        }
    })

    return `{\n${_.flattenDeep(string).join('\n')}\n${getOffset(depth)}}`;
};

export default printNested;