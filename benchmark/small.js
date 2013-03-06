var Writer = require(__dirname + '/../');
var writer = new Writer();

module.exports = function() {
  writer.addCString('test');
  writer.flush('X');
};

if(!module.parent) {
  module.exports();
  console.log('benchmark ok');
}
