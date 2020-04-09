
import genDiff, { getDataFromFile, compareResultToString } from '../src/gendiff';

test('Get difference of json files', () => {
  expect(genDiff('before.json', 'after.json')).toEqual('{'
    + '\n  host: hexlet.io'
    + '\n+ timeout: 20'
    + '\n- timeout: 50'
    + '\n- proxy: 123.234.53.22'
    + '\n- follow: false'
    + '\n+ verbose: true'
    + '\n}');
});
const obj1 = {
  name: 'Andrew',
  age: 33,
};
const obj2 = {
  name: 'Andrew',
  age: 32,
  gender: 'male',
};

test('Get objects compare', () => {
  expect(compareResultToString(obj1, obj2)).toEqual('{'
      + '\n  name: Andrew'
      + '\n+ age: 32'
      + '\n- age: 33'
      + '\n+ gender: male'
      + '\n}');
});

test('Get data from file', () => {
  expect(getDataFromFile('before.json')).toEqual({
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  });
});
