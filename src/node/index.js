const fs = require('fs');

let name = process.argv[2] || 'set_a';
let file = ('./ruletext/' + name + '.rtxt');
console.log(parse_rtxt(file))

function parse_rtxt(path) {
  let data = fs.readFileSync(path, 'utf-8');
  let lines = data.split('\n');
  let readLines = '';
  for (let i = 0; i < lines.length; i++) {
    if (lines[i][0] !== '#') {
      readLines += lines[i].split('\r')[0];
    }
  }
  return readLines;
}
