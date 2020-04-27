const mergeWith = require('lodash/mergeWith');
const isArray = require('lodash/isArray');
const isString = require('lodash/isString');
// const isArray = require('lodash/');

const each = require('lodash/each');
const isPlainObject = require('lodash/isPlainObject');
const isObject = require('lodash/isObject');

const get = require('lodash/get');
const filter = require('lodash/filter');
const forOwn = require('lodash/forOwn');

const traverse = (obj, topObject = undefined) => {
  if (isString(obj)) {
    return obj;
  }
  forOwn(obj, (val, key) => {
    if (isArray(val)) {
      val.forEach((el) => {
        traverse(el, topObject || obj);
      });
    }
    if (val instanceof Override) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = val.value;
    } else if (val instanceof Customizer) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = val.func(getComposeOptions(topObject), topObject);
    } else if (isObject(val)) {
      traverse(val, topObject || obj);
    }
  });
  return obj;
};

function getComposeOptions(object) {
  const options = filter(get(object, 'plugins') || [], (v) => (v instanceof ComposeOptions));
  if (options.length > 0) {
    return options[0].options;
  }
  return {};
}

function concatArray(objValue, srcValue) {
  const newArray = [];
  each([objValue, srcValue], (value) => each(value, (v) => {
    if (v instanceof ComposeOptions) {
      const options = filter(newArray, (vv) => (vv instanceof ComposeOptions));
      if (options.length > 0) {
        options[0].mergeWith(v);
      } else {
        newArray.push(v);
      }
    } else {
      newArray.push(v);
    }
  }));
  return newArray;
}


function customizer(srcValue, objValue, key, object, source) {
  if (objValue === undefined) {
    if (srcValue instanceof Override) {
      if (typeof srcValue.value === 'object') {
        return compose(srcValue.value, {});
      }
      return srcValue.value;
    }
    return srcValue;
  }
  if (srcValue === undefined) {
    if (typeof objValue === 'object') {
      if (objValue instanceof Override) {
        if (typeof objValue.value === 'object') {
          return compose(objValue.value, {});
        }
        return objValue.value;
      }
      return compose(objValue, {});
    }
    return objValue;
  }
  if (objValue instanceof Override) {
    return objValue.value;
  }
  if (isArray(objValue)) {
    return concatArray(srcValue, objValue, object, source);
  }
  if (isPlainObject(objValue)) {
    return compose(srcValue, objValue);
  }
  return undefined;
}

function compose(...configs) {
  return traverse(mergeWith(...configs, customizer));
}

class Customizer {
  constructor(func) {
    this.func = func;
  }
}


class Override {
  constructor(value) {
    this.value = value;
  }
}

class ComposeOptions {
  constructor(options) {
    this.options = options;
  }

  apply() {
    // DO NOTHING
  }

  mergeWith(other) {
    this.options = {
      ...this.options,
      ...other.options,
    };
  }
}

compose.Customizer = Customizer;
compose.ComposeOptions = ComposeOptions;
compose.Override = Override;

module.exports = compose;
