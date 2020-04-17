import _ from 'lodash';

const isComplexValue = value => _.isObject(value) ? '[complex value]' : `'${value}'`;

const printPlain = (tree, parent = '') => {
    const str = tree.map((current) => {
        const { status, name, value, newValue } = current;
        switch (status) {
            case 'unchanged':
                return;
            case 'added':
                return `Property '${parent}${name}' was added with value: ${isComplexValue(value)}\n`;
            case 'deleted':
                return  `Property '${parent}${name}' was deleted\n`;
            case 'changed':
                return `Property '${parent}${name}' was changed from ${isComplexValue(value)} to ${isComplexValue(newValue)}\n`;
            case 'hasChildren':
                return `${printPlain(current.children, parent + current.name + '.')}`;
            default:
                return 'status undefined';
        }
    });
    return str.join('');
};

export default printPlain;