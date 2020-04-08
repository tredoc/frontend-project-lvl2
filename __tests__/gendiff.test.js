
import genDiff from '../src/gendiff';

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
