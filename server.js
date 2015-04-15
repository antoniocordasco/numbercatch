var arguments = process.argv.slice(2);

if (
  !arguments[0] ||
  (arguments[0] !== 'development' && arguments[0] !== 'dist')
)
{
  console.log('usage `node server.js development` or `node server.js dist`');
} else {
  var connect = require('connect');
  var serveStatic = require('serve-static');
  connect().use(serveStatic(__dirname + '/' + arguments[0])).listen(8888);
  console.log('Server running on http://localhost:8888');
}
