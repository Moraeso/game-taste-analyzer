// eslint-disable-next-line no-nested-ternary
const configPath = process.env.PLATFORM === 'web' ? './env/jest/jest.web.config' : (process.env.PLATFORM === 'server' ? './env/jest/jest.server.config' : './env/jest/jest.server-each.config');
const config = require(configPath);

module.exports = config;
