#!/usr/bin/env node
const process = require('process');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

/*export const getFilePath = (pathStr) => {
    const filePath = path[0] !== '/' ? `${pathStr}` : path.resolve(process.cwd(), pathStr);
    return filePath;
};
*/
export const getDataFromFile = (file) => JSON.parse(fs.readFileSync(file));

const genDiff = (fileA, fileB) => {
    const jsonContentA = getDataFromFile(fileA);
    const jsonContentB = getDataFromFile(fileB);

    const keysA = Object.keys(jsonContentA);
    const keysB = Object.keys(jsonContentB);
    const allKeys = [ ...new Set([...keysA, ...keysB])];

    const result = allKeys.reduce((acc, current) => {
        if (jsonContentA[current] === jsonContentB[current]) {
            return `${acc}\n  ${current}: ${jsonContentA[current]}`;
        }
        if (_.has(jsonContentA, current) && !_.has(jsonContentB, current)) {
            return `${acc}\n- ${current}: ${jsonContentA[current]}`;
        }
        if (!_.has(jsonContentA, current) && _.has(jsonContentB, current)) {
            return `${acc}\n+ ${current}: ${jsonContentB[current]}`;
        }
        if (_.has(jsonContentA, current) && _.has(jsonContentB, current)
            && jsonContentA[current] !== jsonContentB[current]) {
            return `${acc}\n+ ${current}: ${jsonContentB[current]}\n- ${current}: ${jsonContentA[current]}`;
        }
        return acc;
    }, '');
    return `{${result}\n}`;
};

export default genDiff;
