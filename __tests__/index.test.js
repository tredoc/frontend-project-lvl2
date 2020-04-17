import genDiff from '../src/';
import fs from 'fs';
import path from 'path';

const fixtures = path.resolve(__dirname, '__fixtures__');
const fileFormats = ['.json', '.ini', '.yml'];
const printFormats = ['nested', 'plain', 'json'];

printFormats.map((printStyle) => {
  fileFormats.map((fileType) => {
    test(`Get difference of ${fileType} files in print style: ${printStyle}`, () => {
      const fileA = path.resolve(fixtures, `before${fileType}`);
      const fileB = path.resolve(fixtures, `after${fileType}`);
      expect(genDiff(fileA, fileB, `${printStyle}`))
      .toContain(fs.readFileSync(path.resolve(fixtures, `${printStyle}-result.txt`), 'utf-8'))})
  })
});
