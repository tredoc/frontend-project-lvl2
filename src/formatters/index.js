import printNested from './nested';
import printPlain from './plain';
import printJson from './json';

const printDiff = (tree, format) => {
  switch (format) {
    case 'nested':
      return printNested(tree);
    case 'plain':
      return printPlain(tree);
    case 'json':
      return printJson(tree);
    default:
      return console.log('Non supportable format');
  }
};

export default printDiff;
