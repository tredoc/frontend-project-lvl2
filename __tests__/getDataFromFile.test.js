import { getDataFromFile } from '../src/gendiff';

test('Get data from file', () => {
  expect(getDataFromFile('before.json')).toEqual({
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  });
});
