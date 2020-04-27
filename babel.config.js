const configPath = process.env.PLATFORM === 'web' ? './env/babel/babelWeb' : './env/babel/babelServer';

const babelNative = require(configPath);
module.exports = babelNative;
