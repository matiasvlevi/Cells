const fs = require('fs');

class Rtxt {

}
Rtxt.stringToJSON = require('../parseRule');
Rtxt.parseToLine = function(path) {
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
Rtxt.fileToJSON = function(path) {
  return Rtxt.stringToJSON(Rtxt.parseToLine(file))
}


let name = process.argv[2] || 'set_a';
let file = ('./ruletext/' + name + '.rtxt');


let jsonRule = Rtxt.fileToJSON(file);
console.log(jsonRule);
