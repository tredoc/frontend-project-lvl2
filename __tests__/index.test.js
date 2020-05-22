import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const fixturePath = path.resolve(__dirname, '__fixtures__');
const fileExtends = ['.json', '.ini', '.yml'];
const layoutFormats = ['nested', 'plain', 'json'];

layoutFormats.forEach((layoutFormat) => {
  fileExtends.forEach((fileType) => {
    test(`Get difference of '${fileType}' files in ${layoutFormat} format`, () => {
      const fileAPath = path.resolve(fixturePath, `before${fileType}`);
      const fileBPath = path.resolve(fixturePath, `after${fileType}`);
      const expectedResultFilePath = path.resolve(fixturePath, `${layoutFormat}-result.txt`);
      const checkFileContent = fs.readFileSync(expectedResultFilePath, 'utf-8');

      expect(genDiff(fileAPath, fileBPath, layoutFormat))
        .toEqual(checkFileContent);
    });
  });
});
