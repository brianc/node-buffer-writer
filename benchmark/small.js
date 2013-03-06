var Writer = require(__dirname + '/../');
var writer = new Writer();

module.exports = function() {
  writer.writeCString('test');
  writer.flush('X');
};
