var Writer = require(__dirname + '/../');

var writer = new Writer(4);
module.exports = function() {
  writer.addCString('test');
  writer.addCString('test');
  writer.addCString('test');
  writer.addCString('test');
  writer.addCString('test');
  writer.addCString('test');
  writer.addCString('test');
  writer.addCString('test');
  writer.addCString('test');
  writer.addCString('test');
  writer.addCString('test');
  writer.addCString('test');
  writer.addCString('test');
  writer.addCString('test');
  writer.addCString('test');
};

if(!module.parent) {
  module.exports();
  console.log('benchmark ok');
}
