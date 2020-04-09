
import genDiff, { getDataFromFile } from '../src/gendiff';

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

test('Get data from file', () => {
  expect(getDataFromFile('before.json')).toEqual({
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  });
});
