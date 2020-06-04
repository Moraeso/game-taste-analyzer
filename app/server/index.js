import expressApp from 'server/expressApp';
import { exit } from 'shelljs';

const argv = require('minimist')(process.argv.slice(2));
const port = parseInt(argv.port || process.env.PORT || (argv.dry ? '0' : '3002'), 10);

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';
const app = expressApp();
app.listen(port, host, (err) => {
  if (err) {
    return console.error(err.message);
  }
  if (argv.dry) {
    exit(0);
  }
  console.log('server started', port, prettyHost);
  return null;
});
