var fs = require('fs');
var path = require('path');

var async = require('async');
var rmdir = require('rmdir');
var ok = require('okay');
var cloned = require('cloned');
cloned.workingDir = __dirname + '/versions';

exports.compare = {
  'math': function() {
    var two = 1 + 1;
  },
  'another': function() {
    var yay = 2 + 2;
  }
};

var clone = function(rev, cb) {
  var outputDir = path.join(cloned.workingDir, rev);
  console.log(outputDir)
  if(fs.existsSync(outputDir)) {
    return cb(null, {
      rev: rev,
      dir: outputDir
    });
  }
  console.log('cloning version ' + rev);
  cloned(rev, ok(cb, function(dir) {
    console.log('cloned version ' + rev + ' to ' + dir);
    cb(null, {
      rev: rev,
      dir: dir
    });
  }));
};

var versions = [
  'f01e18d'
];

var scripts = fs.readdirSync(__dirname).filter(function(x) {
  return x.indexOf('benchmark') > 0;
});


var run = function() {
  async.map(versions, clone, function(err, results) {
    if(err) throw err;
    exports.compare = { };
    scripts.forEach(function(script) {
      for(var i = 0; i < results.length; i++) {
        var result = results[i];
        var benchPath = path.join(result.dir, 'benchmark', script);
        console.log('requiring ' + benchPath);
        var bench = require(benchPath);
        exports.compare[script + '@' + result.rev] = bench;
      }
      exports.compare[script + '@HEAD'] = require(__dirname + '/' + script);
    })
    require('bench').runMain();
  });

}

run();
