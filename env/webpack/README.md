# Webpack Composer

## Why?

* This snippet is for stacking multiple webpack configs.

Ex) Merging these: Common, Common Dev, Server Common, Server Dev  

## Usage
```javascript
const composer = require('./composer');
/* ... */
module.exports = composer(config0, config1, config2, config3);
```

## Priority

The right config has higher priorities than its left.

## Rule

### Primitives

* Related

### Arrays

* Concatenated

### Dictionary

* Merged

### Customizer

Ex)
```javascript

const { Customizer, ComposeOptions } = require('./composer');
module.exports = {
  /* ... */
  configFile: new Customizer((composeOption) => path.resolve(composeOption.babelPath)),
  /* ... */
  plugins: [
    /* ... */
    new ComposeOptions({
      babelPath: ".babelrc",
    }),
    /* ... */
  ],
}
```

### Override

const { Override, ComposeOptions } = require('./composer');
module.exports = {
  /* ... */
  plugins: new Override([
  // Override lower priority plugins 
  ])m
  /* ... */
}
```
