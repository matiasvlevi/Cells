const Rtxt = require('./rtxt');

let name = process.argv[2] || 'set_a';
let file = ('./ruletext/' + name + '.rtxt');

let str = Rtxt.parseToLine(file);
console.log(str);
