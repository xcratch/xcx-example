var global$1 = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};

// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;

if (typeof global$1.setTimeout === 'function') {
  cachedSetTimeout = setTimeout;
}

if (typeof global$1.clearTimeout === 'function') {
  cachedClearTimeout = clearTimeout;
}

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

function nextTick(fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
} // v8 likes predictible objects

function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

var title = 'browser';
var platform = 'browser';
var browser$1 = true;
var env = {};
var argv = [];
var version = ''; // empty string to avoid regexp issues

var versions = {};
var release = {};
var config = {};

function noop() {}

var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;
function binding(name) {
  throw new Error('process.binding is not supported');
}
function cwd() {
  return '/';
}
function chdir(dir) {
  throw new Error('process.chdir is not supported');
}
function umask() {
  return 0;
} // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js

var performance = global$1.performance || {};

var performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function () {
  return new Date().getTime();
}; // generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime


function hrtime(previousTimestamp) {
  var clocktime = performanceNow.call(performance) * 1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor(clocktime % 1 * 1e9);

  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];

    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }

  return [seconds, nanoseconds];
}
var startTime = new Date();
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1000;
}
var process = {
  nextTick: nextTick,
  title: title,
  browser: browser$1,
  env: env,
  argv: argv,
  version: version,
  versions: versions,
  on: on,
  addListener: addListener,
  once: once,
  off: off,
  removeListener: removeListener,
  removeAllListeners: removeAllListeners,
  emit: emit,
  binding: binding,
  cwd: cwd,
  chdir: chdir,
  umask: umask,
  hrtime: hrtime,
  platform: platform,
  release: release,
  config: config,
  uptime: uptime
};

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

function _typeof$1(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$1 = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof$1 = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof$1(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);

      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};

var emptyObject = {};

{
  Object.freeze(emptyObject);
}

var emptyObject_1 = emptyObject;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}
/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */


var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);

emptyFunction.thatReturnsThis = function () {
  return this;
};

emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

var emptyFunction_1 = emptyFunction;

var q = "function" === typeof Symbol && Symbol["for"],
    r = q ? Symbol["for"]("react.element") : 60103,
    t = q ? Symbol["for"]("react.call") : 60104,
    u = q ? Symbol["for"]("react.return") : 60105,
    v = q ? Symbol["for"]("react.portal") : 60106,
    w = q ? Symbol["for"]("react.fragment") : 60107,
    x = "function" === typeof Symbol && Symbol.iterator;

function y(a) {
  for (var b = arguments.length - 1, e = "Minified React error #" + a + "; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d" + a, c = 0; c < b; c++) {
    e += "\x26args[]\x3d" + encodeURIComponent(arguments[c + 1]);
  }

  b = Error(e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");
  b.name = "Invariant Violation";
  b.framesToPop = 1;
  throw b;
}

var z = {
  isMounted: function isMounted() {
    return !1;
  },
  enqueueForceUpdate: function enqueueForceUpdate() {},
  enqueueReplaceState: function enqueueReplaceState() {},
  enqueueSetState: function enqueueSetState() {}
};

function A(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = emptyObject_1;
  this.updater = e || z;
}

A.prototype.isReactComponent = {};

A.prototype.setState = function (a, b) {
  "object" !== _typeof$1(a) && "function" !== typeof a && null != a ? y("85") : void 0;
  this.updater.enqueueSetState(this, a, b, "setState");
};

A.prototype.forceUpdate = function (a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};

function B(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = emptyObject_1;
  this.updater = e || z;
}

function C() {}

C.prototype = A.prototype;
var D = B.prototype = new C();
D.constructor = B;
objectAssign(D, A.prototype);
D.isPureReactComponent = !0;

function E(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = emptyObject_1;
  this.updater = e || z;
}

var F = E.prototype = new C();
F.constructor = E;
objectAssign(F, A.prototype);
F.unstable_isAsyncReactComponent = !0;

F.render = function () {
  return this.props.children;
};

var G = {
  current: null
},
    H = Object.prototype.hasOwnProperty,
    I = {
  key: !0,
  ref: !0,
  __self: !0,
  __source: !0
};

function J(a, b, e) {
  var c,
      d = {},
      g = null,
      k = null;
  if (null != b) for (c in void 0 !== b.ref && (k = b.ref), void 0 !== b.key && (g = "" + b.key), b) {
    H.call(b, c) && !I.hasOwnProperty(c) && (d[c] = b[c]);
  }
  var f = arguments.length - 2;
  if (1 === f) d.children = e;else if (1 < f) {
    for (var h = Array(f), l = 0; l < f; l++) {
      h[l] = arguments[l + 2];
    }

    d.children = h;
  }
  if (a && a.defaultProps) for (c in f = a.defaultProps, f) {
    void 0 === d[c] && (d[c] = f[c]);
  }
  return {
    $$typeof: r,
    type: a,
    key: g,
    ref: k,
    props: d,
    _owner: G.current
  };
}

function K(a) {
  return "object" === _typeof$1(a) && null !== a && a.$$typeof === r;
}

function escape$1(a) {
  var b = {
    "\x3d": "\x3d0",
    ":": "\x3d2"
  };
  return "$" + ("" + a).replace(/[=:]/g, function (a) {
    return b[a];
  });
}

var L = /\/+/g,
    M = [];

function N(a, b, e, c) {
  if (M.length) {
    var d = M.pop();
    d.result = a;
    d.keyPrefix = b;
    d.func = e;
    d.context = c;
    d.count = 0;
    return d;
  }

  return {
    result: a,
    keyPrefix: b,
    func: e,
    context: c,
    count: 0
  };
}

function O(a) {
  a.result = null;
  a.keyPrefix = null;
  a.func = null;
  a.context = null;
  a.count = 0;
  10 > M.length && M.push(a);
}

function P(a, b, e, c) {
  var d = _typeof$1(a);

  if ("undefined" === d || "boolean" === d) a = null;
  var g = !1;
  if (null === a) g = !0;else switch (d) {
    case "string":
    case "number":
      g = !0;
      break;

    case "object":
      switch (a.$$typeof) {
        case r:
        case t:
        case u:
        case v:
          g = !0;
      }

  }
  if (g) return e(c, a, "" === b ? "." + Q(a, 0) : b), 1;
  g = 0;
  b = "" === b ? "." : b + ":";
  if (Array.isArray(a)) for (var k = 0; k < a.length; k++) {
    d = a[k];
    var f = b + Q(d, k);
    g += P(d, f, e, c);
  } else if (null === a || "undefined" === typeof a ? f = null : (f = x && a[x] || a["@@iterator"], f = "function" === typeof f ? f : null), "function" === typeof f) for (a = f.call(a), k = 0; !(d = a.next()).done;) {
    d = d.value, f = b + Q(d, k++), g += P(d, f, e, c);
  } else "object" === d && (e = "" + a, y("31", "[object Object]" === e ? "object with keys {" + Object.keys(a).join(", ") + "}" : e, ""));
  return g;
}

function Q(a, b) {
  return "object" === _typeof$1(a) && null !== a && null != a.key ? escape$1(a.key) : b.toString(36);
}

function R(a, b) {
  a.func.call(a.context, b, a.count++);
}

function S(a, b, e) {
  var c = a.result,
      d = a.keyPrefix;
  a = a.func.call(a.context, b, a.count++);
  Array.isArray(a) ? T(a, c, e, emptyFunction_1.thatReturnsArgument) : null != a && (K(a) && (b = d + (!a.key || b && b.key === a.key ? "" : ("" + a.key).replace(L, "$\x26/") + "/") + e, a = {
    $$typeof: r,
    type: a.type,
    key: b,
    ref: a.ref,
    props: a.props,
    _owner: a._owner
  }), c.push(a));
}

function T(a, b, e, c, d) {
  var g = "";
  null != e && (g = ("" + e).replace(L, "$\x26/") + "/");
  b = N(b, g, c, d);
  null == a || P(a, "", S, b);
  O(b);
}

var U = {
  Children: {
    map: function map(a, b, e) {
      if (null == a) return a;
      var c = [];
      T(a, c, null, b, e);
      return c;
    },
    forEach: function forEach(a, b, e) {
      if (null == a) return a;
      b = N(null, null, b, e);
      null == a || P(a, "", R, b);
      O(b);
    },
    count: function count(a) {
      return null == a ? 0 : P(a, "", emptyFunction_1.thatReturnsNull, null);
    },
    toArray: function toArray(a) {
      var b = [];
      T(a, b, null, emptyFunction_1.thatReturnsArgument);
      return b;
    },
    only: function only(a) {
      K(a) ? void 0 : y("143");
      return a;
    }
  },
  Component: A,
  PureComponent: B,
  unstable_AsyncComponent: E,
  Fragment: w,
  createElement: J,
  cloneElement: function cloneElement(a, b, e) {
    var c = objectAssign({}, a.props),
        d = a.key,
        g = a.ref,
        k = a._owner;

    if (null != b) {
      void 0 !== b.ref && (g = b.ref, k = G.current);
      void 0 !== b.key && (d = "" + b.key);
      if (a.type && a.type.defaultProps) var f = a.type.defaultProps;

      for (h in b) {
        H.call(b, h) && !I.hasOwnProperty(h) && (c[h] = void 0 === b[h] && void 0 !== f ? f[h] : b[h]);
      }
    }

    var h = arguments.length - 2;
    if (1 === h) c.children = e;else if (1 < h) {
      f = Array(h);

      for (var l = 0; l < h; l++) {
        f[l] = arguments[l + 2];
      }

      c.children = f;
    }
    return {
      $$typeof: r,
      type: a.type,
      key: d,
      ref: g,
      props: c,
      _owner: k
    };
  },
  createFactory: function createFactory(a) {
    var b = J.bind(null, a);
    b.type = a;
    return b;
  },
  isValidElement: K,
  version: "16.2.0",
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentOwner: G,
    assign: objectAssign
  }
},
    V = Object.freeze({
  default: U
}),
    W = V && U || V;
W["default"] ? W["default"] : W;

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */


var validateFormat = function validateFormat(format) {};

{
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant$1(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;

    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame

    throw error;
  }
}

var invariant_1 = invariant$1;

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */


var warning = emptyFunction_1;

{
  var printWarning$2 = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning$2.apply(undefined, [format].concat(args));
    }
  };
}

var warning_1 = warning;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret$1 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;

var printWarning$1 = function printWarning() {};

{
  var ReactPropTypesSecret = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
  var has$1 = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning$1 = function printWarning(text) {
    var message = 'Warning: ' + text;

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}
/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */


function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  {
    for (var typeSpecName in typeSpecs) {
      if (has$1(typeSpecs, typeSpecName)) {
        var error; // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.

        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + _typeof$1(typeSpecs[typeSpecName]) + '`.');
            err.name = 'Invariant Violation';
            throw err;
          }

          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }

        if (error && !(error instanceof Error)) {
          printWarning$1((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + _typeof$1(error) + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
        }

        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;
          var stack = getStack ? getStack() : '';
          printWarning$1('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
        }
      }
    }
  }
}
/**
 * Resets warning cache when testing.
 *
 * @private
 */


checkPropTypes.resetWarningCache = function () {
  {
    loggedTypeFailures = {};
  }
};

var checkPropTypes_1 = checkPropTypes;

var react_development = createCommonjsModule(function (module) {

  {
    (function () {

      var _assign = objectAssign;
      var emptyObject = emptyObject_1;
      var invariant = invariant_1;
      var warning = warning_1;
      var emptyFunction = emptyFunction_1;
      var checkPropTypes = checkPropTypes_1; // TODO: this is special because it gets imported during build.

      var ReactVersion = '16.2.0'; // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
      // nor polyfill, then a plain number is used for performance.

      var hasSymbol = typeof Symbol === 'function' && Symbol['for'];
      var REACT_ELEMENT_TYPE = hasSymbol ? Symbol['for']('react.element') : 0xeac7;
      var REACT_CALL_TYPE = hasSymbol ? Symbol['for']('react.call') : 0xeac8;
      var REACT_RETURN_TYPE = hasSymbol ? Symbol['for']('react.return') : 0xeac9;
      var REACT_PORTAL_TYPE = hasSymbol ? Symbol['for']('react.portal') : 0xeaca;
      var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol['for']('react.fragment') : 0xeacb;
      var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = '@@iterator';

      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable === 'undefined') {
          return null;
        }

        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

        if (typeof maybeIterator === 'function') {
          return maybeIterator;
        }

        return null;
      }
      /**
       * WARNING: DO NOT manually require this module.
       * This is a replacement for `invariant(...)` used by the error code system
       * and will _only_ be required by the corresponding babel pass.
       * It always throws.
       */

      /**
       * Forked from fbjs/warning:
       * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
       *
       * Only change is we use console.warn instead of console.error,
       * and do nothing when 'console' is not supported.
       * This really simplifies the code.
       * ---
       * Similar to invariant but only logs a warning if the condition is not met.
       * This can be used to log issues in development environments in critical
       * paths. Removing the logging code for production environments will keep the
       * same logic and follow the same code paths.
       */


      var lowPriorityWarning = function lowPriorityWarning() {};

      {
        var printWarning = function printWarning(format) {
          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          var argIndex = 0;
          var message = 'Warning: ' + format.replace(/%s/g, function () {
            return args[argIndex++];
          });

          if (typeof console !== 'undefined') {
            console.warn(message);
          }

          try {
            // --- Welcome to debugging React ---
            // This error was thrown as a convenience so that you can use this stack
            // to find the callsite that caused this warning to fire.
            throw new Error(message);
          } catch (x) {}
        };

        lowPriorityWarning = function lowPriorityWarning(condition, format) {
          if (format === undefined) {
            throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
          }

          if (!condition) {
            for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
              args[_key2 - 2] = arguments[_key2];
            }

            printWarning.apply(undefined, [format].concat(args));
          }
        };
      }
      var lowPriorityWarning$1 = lowPriorityWarning;
      var didWarnStateUpdateForUnmountedComponent = {};

      function warnNoop(publicInstance, callerName) {
        {
          var constructor = publicInstance.constructor;
          var componentName = constructor && (constructor.displayName || constructor.name) || 'ReactClass';
          var warningKey = componentName + '.' + callerName;

          if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
            return;
          }

          warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, componentName);
          didWarnStateUpdateForUnmountedComponent[warningKey] = true;
        }
      }
      /**
       * This is the abstract API for an update queue.
       */


      var ReactNoopUpdateQueue = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function isMounted(publicInstance) {
          return false;
        },

        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueForceUpdate: function enqueueForceUpdate(publicInstance, callback, callerName) {
          warnNoop(publicInstance, 'forceUpdate');
        },

        /**
         * Replaces all of the state. Always use this or `setState` to mutate state.
         * You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} completeState Next state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueReplaceState: function enqueueReplaceState(publicInstance, completeState, callback, callerName) {
          warnNoop(publicInstance, 'replaceState');
        },

        /**
         * Sets a subset of the state. This only exists because _pendingState is
         * internal. This provides a merging strategy that is not available to deep
         * properties which is confusing. TODO: Expose pendingState or don't use it
         * during the merge.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} partialState Next partial state to be merged with state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} Name of the calling function in the public API.
         * @internal
         */
        enqueueSetState: function enqueueSetState(publicInstance, partialState, callback, callerName) {
          warnNoop(publicInstance, 'setState');
        }
      };
      /**
       * Base class helpers for the updating state of a component.
       */

      function Component(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
        // renderer.

        this.updater = updater || ReactNoopUpdateQueue;
      }

      Component.prototype.isReactComponent = {};
      /**
       * Sets a subset of the state. Always use this to mutate
       * state. You should treat `this.state` as immutable.
       *
       * There is no guarantee that `this.state` will be immediately updated, so
       * accessing `this.state` after calling this method may return the old value.
       *
       * There is no guarantee that calls to `setState` will run synchronously,
       * as they may eventually be batched together.  You can provide an optional
       * callback that will be executed when the call to setState is actually
       * completed.
       *
       * When a function is provided to setState, it will be called at some point in
       * the future (not synchronously). It will be called with the up to date
       * component arguments (state, props, context). These values can be different
       * from this.* because your function may be called after receiveProps but before
       * shouldComponentUpdate, and this new state, props, and context will not yet be
       * assigned to this.
       *
       * @param {object|function} partialState Next partial state or function to
       *        produce next partial state to be merged with current state.
       * @param {?function} callback Called after state is updated.
       * @final
       * @protected
       */

      Component.prototype.setState = function (partialState, callback) {
        !(_typeof$1(partialState) === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
        this.updater.enqueueSetState(this, partialState, callback, 'setState');
      };
      /**
       * Forces an update. This should only be invoked when it is known with
       * certainty that we are **not** in a DOM transaction.
       *
       * You may want to call this when you know that some deeper aspect of the
       * component's state has changed but `setState` was not called.
       *
       * This will not invoke `shouldComponentUpdate`, but it will invoke
       * `componentWillUpdate` and `componentDidUpdate`.
       *
       * @param {?function} callback Called after update is complete.
       * @final
       * @protected
       */


      Component.prototype.forceUpdate = function (callback) {
        this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
      };
      /**
       * Deprecated APIs. These APIs used to exist on classic React classes but since
       * we would like to deprecate them, we're not going to move them over to this
       * modern base class. Instead, we define a getter that warns if it's accessed.
       */


      {
        var deprecatedAPIs = {
          isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
          replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
        };

        var defineDeprecationWarning = function defineDeprecationWarning(methodName, info) {
          Object.defineProperty(Component.prototype, methodName, {
            get: function get() {
              lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
              return undefined;
            }
          });
        };

        for (var fnName in deprecatedAPIs) {
          if (deprecatedAPIs.hasOwnProperty(fnName)) {
            defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
          }
        }
      }
      /**
       * Base class helpers for the updating state of a component.
       */

      function PureComponent(props, context, updater) {
        // Duplicated from Component.
        this.props = props;
        this.context = context;
        this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
        // renderer.

        this.updater = updater || ReactNoopUpdateQueue;
      }

      function ComponentDummy() {}

      ComponentDummy.prototype = Component.prototype;
      var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
      pureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.

      _assign(pureComponentPrototype, Component.prototype);

      pureComponentPrototype.isPureReactComponent = true;

      function AsyncComponent(props, context, updater) {
        // Duplicated from Component.
        this.props = props;
        this.context = context;
        this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
        // renderer.

        this.updater = updater || ReactNoopUpdateQueue;
      }

      var asyncComponentPrototype = AsyncComponent.prototype = new ComponentDummy();
      asyncComponentPrototype.constructor = AsyncComponent; // Avoid an extra prototype jump for these methods.

      _assign(asyncComponentPrototype, Component.prototype);

      asyncComponentPrototype.unstable_isAsyncReactComponent = true;

      asyncComponentPrototype.render = function () {
        return this.props.children;
      };
      /**
       * Keeps track of the current owner.
       *
       * The current owner is the component who should own any components that are
       * currently being constructed.
       */


      var ReactCurrentOwner = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      };
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var RESERVED_PROPS = {
        key: true,
        ref: true,
        __self: true,
        __source: true
      };
      var specialPropKeyWarningShown;
      var specialPropRefWarningShown;

      function hasValidRef(config) {
        {
          if (hasOwnProperty.call(config, 'ref')) {
            var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.ref !== undefined;
      }

      function hasValidKey(config) {
        {
          if (hasOwnProperty.call(config, 'key')) {
            var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.key !== undefined;
      }

      function defineKeyPropWarningGetter(props, displayName) {
        var warnAboutAccessingKey = function warnAboutAccessingKey() {
          if (!specialPropKeyWarningShown) {
            specialPropKeyWarningShown = true;
            warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
          }
        };

        warnAboutAccessingKey.isReactWarning = true;
        Object.defineProperty(props, 'key', {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }

      function defineRefPropWarningGetter(props, displayName) {
        var warnAboutAccessingRef = function warnAboutAccessingRef() {
          if (!specialPropRefWarningShown) {
            specialPropRefWarningShown = true;
            warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
          }
        };

        warnAboutAccessingRef.isReactWarning = true;
        Object.defineProperty(props, 'ref', {
          get: warnAboutAccessingRef,
          configurable: true
        });
      }
      /**
       * Factory method to create a new React element. This no longer adheres to
       * the class pattern, so do not use new to call it. Also, no instanceof check
       * will work. Instead test $$typeof field against Symbol.for('react.element') to check
       * if something is a React Element.
       *
       * @param {*} type
       * @param {*} key
       * @param {string|object} ref
       * @param {*} self A *temporary* helper to detect places where `this` is
       * different from the `owner` when React.createElement is called, so that we
       * can warn. We want to get rid of owner and replace string `ref`s with arrow
       * functions, and as long as `this` and owner are the same, there will be no
       * change in behavior.
       * @param {*} source An annotation object (added by a transpiler or otherwise)
       * indicating filename, line number, and/or other information.
       * @param {*} owner
       * @param {*} props
       * @internal
       */


      var ReactElement = function ReactElement(type, key, ref, self, source, owner, props) {
        var element = {
          // This tag allow us to uniquely identify this as a React Element
          $$typeof: REACT_ELEMENT_TYPE,
          // Built-in properties that belong on the element
          type: type,
          key: key,
          ref: ref,
          props: props,
          // Record the component responsible for creating this element.
          _owner: owner
        };
        {
          // The validation flag is currently mutative. We put it on
          // an external backing store so that we can freeze the whole object.
          // This can be replaced with a WeakMap once they are implemented in
          // commonly used development environments.
          element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
          // the validation flag non-enumerable (where possible, which should
          // include every environment we run tests in), so the test framework
          // ignores it.

          Object.defineProperty(element._store, 'validated', {
            configurable: false,
            enumerable: false,
            writable: true,
            value: false
          }); // self and source are DEV only properties.

          Object.defineProperty(element, '_self', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: self
          }); // Two elements created in two different places should be considered
          // equal for testing purposes and therefore we hide it from enumeration.

          Object.defineProperty(element, '_source', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: source
          });

          if (Object.freeze) {
            Object.freeze(element.props);
            Object.freeze(element);
          }
        }
        return element;
      };
      /**
       * Create and return a new ReactElement of the given type.
       * See https://reactjs.org/docs/react-api.html#createelement
       */


      function createElement(type, config, children) {
        var propName; // Reserved names are extracted

        var props = {};
        var key = null;
        var ref = null;
        var self = null;
        var source = null;

        if (config != null) {
          if (hasValidRef(config)) {
            ref = config.ref;
          }

          if (hasValidKey(config)) {
            key = '' + config.key;
          }

          self = config.__self === undefined ? null : config.__self;
          source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object

          for (propName in config) {
            if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
              props[propName] = config[propName];
            }
          }
        } // Children can be more than one argument, and those are transferred onto
        // the newly allocated props object.


        var childrenLength = arguments.length - 2;

        if (childrenLength === 1) {
          props.children = children;
        } else if (childrenLength > 1) {
          var childArray = Array(childrenLength);

          for (var i = 0; i < childrenLength; i++) {
            childArray[i] = arguments[i + 2];
          }

          {
            if (Object.freeze) {
              Object.freeze(childArray);
            }
          }
          props.children = childArray;
        } // Resolve default props


        if (type && type.defaultProps) {
          var defaultProps = type.defaultProps;

          for (propName in defaultProps) {
            if (props[propName] === undefined) {
              props[propName] = defaultProps[propName];
            }
          }
        }

        {
          if (key || ref) {
            if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
              var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

              if (key) {
                defineKeyPropWarningGetter(props, displayName);
              }

              if (ref) {
                defineRefPropWarningGetter(props, displayName);
              }
            }
          }
        }
        return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
      }
      /**
       * Return a function that produces ReactElements of a given type.
       * See https://reactjs.org/docs/react-api.html#createfactory
       */


      function cloneAndReplaceKey(oldElement, newKey) {
        var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
        return newElement;
      }
      /**
       * Clone and return a new ReactElement using element as the starting point.
       * See https://reactjs.org/docs/react-api.html#cloneelement
       */


      function cloneElement(element, config, children) {
        var propName; // Original props are copied

        var props = _assign({}, element.props); // Reserved names are extracted


        var key = element.key;
        var ref = element.ref; // Self is preserved since the owner is preserved.

        var self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a
        // transpiler, and the original source is probably a better indicator of the
        // true owner.

        var source = element._source; // Owner will be preserved, unless ref is overridden

        var owner = element._owner;

        if (config != null) {
          if (hasValidRef(config)) {
            // Silently steal the ref from the parent.
            ref = config.ref;
            owner = ReactCurrentOwner.current;
          }

          if (hasValidKey(config)) {
            key = '' + config.key;
          } // Remaining properties override existing props


          var defaultProps;

          if (element.type && element.type.defaultProps) {
            defaultProps = element.type.defaultProps;
          }

          for (propName in config) {
            if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
              if (config[propName] === undefined && defaultProps !== undefined) {
                // Resolve default props
                props[propName] = defaultProps[propName];
              } else {
                props[propName] = config[propName];
              }
            }
          }
        } // Children can be more than one argument, and those are transferred onto
        // the newly allocated props object.


        var childrenLength = arguments.length - 2;

        if (childrenLength === 1) {
          props.children = children;
        } else if (childrenLength > 1) {
          var childArray = Array(childrenLength);

          for (var i = 0; i < childrenLength; i++) {
            childArray[i] = arguments[i + 2];
          }

          props.children = childArray;
        }

        return ReactElement(element.type, key, ref, self, source, owner, props);
      }
      /**
       * Verifies the object is a ReactElement.
       * See https://reactjs.org/docs/react-api.html#isvalidelement
       * @param {?object} object
       * @return {boolean} True if `object` is a valid component.
       * @final
       */


      function isValidElement(object) {
        return _typeof$1(object) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }

      var ReactDebugCurrentFrame = {};
      {
        // Component that is being worked on
        ReactDebugCurrentFrame.getCurrentStack = null;

        ReactDebugCurrentFrame.getStackAddendum = function () {
          var impl = ReactDebugCurrentFrame.getCurrentStack;

          if (impl) {
            return impl();
          }

          return null;
        };
      }
      var SEPARATOR = '.';
      var SUBSEPARATOR = ':';
      /**
       * Escape and wrap key so it is safe to use as a reactid
       *
       * @param {string} key to be escaped.
       * @return {string} the escaped key.
       */

      function escape(key) {
        var escapeRegex = /[=:]/g;
        var escaperLookup = {
          '=': '=0',
          ':': '=2'
        };
        var escapedString = ('' + key).replace(escapeRegex, function (match) {
          return escaperLookup[match];
        });
        return '$' + escapedString;
      }
      /**
       * TODO: Test that a single child and an array with one item have the same key
       * pattern.
       */


      var didWarnAboutMaps = false;
      var userProvidedKeyEscapeRegex = /\/+/g;

      function escapeUserProvidedKey(text) {
        return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
      }

      var POOL_SIZE = 10;
      var traverseContextPool = [];

      function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
        if (traverseContextPool.length) {
          var traverseContext = traverseContextPool.pop();
          traverseContext.result = mapResult;
          traverseContext.keyPrefix = keyPrefix;
          traverseContext.func = mapFunction;
          traverseContext.context = mapContext;
          traverseContext.count = 0;
          return traverseContext;
        } else {
          return {
            result: mapResult,
            keyPrefix: keyPrefix,
            func: mapFunction,
            context: mapContext,
            count: 0
          };
        }
      }

      function releaseTraverseContext(traverseContext) {
        traverseContext.result = null;
        traverseContext.keyPrefix = null;
        traverseContext.func = null;
        traverseContext.context = null;
        traverseContext.count = 0;

        if (traverseContextPool.length < POOL_SIZE) {
          traverseContextPool.push(traverseContext);
        }
      }
      /**
       * @param {?*} children Children tree container.
       * @param {!string} nameSoFar Name of the key path so far.
       * @param {!function} callback Callback to invoke with each child found.
       * @param {?*} traverseContext Used to pass information throughout the traversal
       * process.
       * @return {!number} The number of children in this subtree.
       */


      function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
        var type = _typeof$1(children);

        if (type === 'undefined' || type === 'boolean') {
          // All of the above are perceived as null.
          children = null;
        }

        var invokeCallback = false;

        if (children === null) {
          invokeCallback = true;
        } else {
          switch (type) {
            case 'string':
            case 'number':
              invokeCallback = true;
              break;

            case 'object':
              switch (children.$$typeof) {
                case REACT_ELEMENT_TYPE:
                case REACT_CALL_TYPE:
                case REACT_RETURN_TYPE:
                case REACT_PORTAL_TYPE:
                  invokeCallback = true;
              }

          }
        }

        if (invokeCallback) {
          callback(traverseContext, children, // If it's the only child, treat the name as if it was wrapped in an array
          // so that it's consistent if the number of children grows.
          nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
          return 1;
        }

        var child;
        var nextName;
        var subtreeCount = 0; // Count of children found in the current subtree.

        var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

        if (Array.isArray(children)) {
          for (var i = 0; i < children.length; i++) {
            child = children[i];
            nextName = nextNamePrefix + getComponentKey(child, i);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        } else {
          var iteratorFn = getIteratorFn(children);

          if (typeof iteratorFn === 'function') {
            {
              // Warn about using Maps as children
              if (iteratorFn === children.entries) {
                warning(didWarnAboutMaps, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', ReactDebugCurrentFrame.getStackAddendum());
                didWarnAboutMaps = true;
              }
            }
            var iterator = iteratorFn.call(children);
            var step;
            var ii = 0;

            while (!(step = iterator.next()).done) {
              child = step.value;
              nextName = nextNamePrefix + getComponentKey(child, ii++);
              subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
            }
          } else if (type === 'object') {
            var addendum = '';
            {
              addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
            }
            var childrenString = '' + children;
            invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
          }
        }

        return subtreeCount;
      }
      /**
       * Traverses children that are typically specified as `props.children`, but
       * might also be specified through attributes:
       *
       * - `traverseAllChildren(this.props.children, ...)`
       * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
       *
       * The `traverseContext` is an optional argument that is passed through the
       * entire traversal. It can be used to store accumulations or anything else that
       * the callback might find relevant.
       *
       * @param {?*} children Children tree object.
       * @param {!function} callback To invoke upon traversing each child.
       * @param {?*} traverseContext Context for traversal.
       * @return {!number} The number of children in this subtree.
       */


      function traverseAllChildren(children, callback, traverseContext) {
        if (children == null) {
          return 0;
        }

        return traverseAllChildrenImpl(children, '', callback, traverseContext);
      }
      /**
       * Generate a key string that identifies a component within a set.
       *
       * @param {*} component A component that could contain a manual key.
       * @param {number} index Index that is used if a manual key is not provided.
       * @return {string}
       */


      function getComponentKey(component, index) {
        // Do some typechecking here since we call this blindly. We want to ensure
        // that we don't block potential future ES APIs.
        if (_typeof$1(component) === 'object' && component !== null && component.key != null) {
          // Explicit key
          return escape(component.key);
        } // Implicit key determined by the index in the set


        return index.toString(36);
      }

      function forEachSingleChild(bookKeeping, child, name) {
        var func = bookKeeping.func,
            context = bookKeeping.context;
        func.call(context, child, bookKeeping.count++);
      }
      /**
       * Iterates through children that are typically specified as `props.children`.
       *
       * See https://reactjs.org/docs/react-api.html#react.children.foreach
       *
       * The provided forEachFunc(child, index) will be called for each
       * leaf child.
       *
       * @param {?*} children Children tree container.
       * @param {function(*, int)} forEachFunc
       * @param {*} forEachContext Context for forEachContext.
       */


      function forEachChildren(children, forEachFunc, forEachContext) {
        if (children == null) {
          return children;
        }

        var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
        traverseAllChildren(children, forEachSingleChild, traverseContext);
        releaseTraverseContext(traverseContext);
      }

      function mapSingleChildIntoContext(bookKeeping, child, childKey) {
        var result = bookKeeping.result,
            keyPrefix = bookKeeping.keyPrefix,
            func = bookKeeping.func,
            context = bookKeeping.context;
        var mappedChild = func.call(context, child, bookKeeping.count++);

        if (Array.isArray(mappedChild)) {
          mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
        } else if (mappedChild != null) {
          if (isValidElement(mappedChild)) {
            mappedChild = cloneAndReplaceKey(mappedChild, // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
          }

          result.push(mappedChild);
        }
      }

      function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
        var escapedPrefix = '';

        if (prefix != null) {
          escapedPrefix = escapeUserProvidedKey(prefix) + '/';
        }

        var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
        traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
        releaseTraverseContext(traverseContext);
      }
      /**
       * Maps children that are typically specified as `props.children`.
       *
       * See https://reactjs.org/docs/react-api.html#react.children.map
       *
       * The provided mapFunction(child, key, index) will be called for each
       * leaf child.
       *
       * @param {?*} children Children tree container.
       * @param {function(*, int)} func The map function.
       * @param {*} context Context for mapFunction.
       * @return {object} Object containing the ordered map of results.
       */


      function mapChildren(children, func, context) {
        if (children == null) {
          return children;
        }

        var result = [];
        mapIntoWithKeyPrefixInternal(children, result, null, func, context);
        return result;
      }
      /**
       * Count the number of children that are typically specified as
       * `props.children`.
       *
       * See https://reactjs.org/docs/react-api.html#react.children.count
       *
       * @param {?*} children Children tree container.
       * @return {number} The number of children.
       */


      function countChildren(children, context) {
        return traverseAllChildren(children, emptyFunction.thatReturnsNull, null);
      }
      /**
       * Flatten a children object (typically specified as `props.children`) and
       * return an array with appropriately re-keyed children.
       *
       * See https://reactjs.org/docs/react-api.html#react.children.toarray
       */


      function toArray(children) {
        var result = [];
        mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
        return result;
      }
      /**
       * Returns the first child in a collection of children and verifies that there
       * is only one child in the collection.
       *
       * See https://reactjs.org/docs/react-api.html#react.children.only
       *
       * The current implementation of this function assumes that a single child gets
       * passed without a wrapper, but the purpose of this helper function is to
       * abstract away the particular structure of children.
       *
       * @param {?object} children Child collection structure.
       * @return {ReactElement} The first and only `ReactElement` contained in the
       * structure.
       */


      function onlyChild(children) {
        !isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
        return children;
      }

      var describeComponentFrame = function describeComponentFrame(name, source, ownerName) {
        return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
      };

      function getComponentName(fiber) {
        var type = fiber.type;

        if (typeof type === 'string') {
          return type;
        }

        if (typeof type === 'function') {
          return type.displayName || type.name;
        }

        return null;
      }
      /**
       * ReactElementValidator provides a wrapper around a element factory
       * which validates the props passed to the element. This is intended to be
       * used only in DEV and could be replaced by a static type checker for languages
       * that support it.
       */


      {
        var currentlyValidatingElement = null;
        var propTypesMisspellWarningShown = false;

        var getDisplayName = function getDisplayName(element) {
          if (element == null) {
            return '#empty';
          } else if (typeof element === 'string' || typeof element === 'number') {
            return '#text';
          } else if (typeof element.type === 'string') {
            return element.type;
          } else if (element.type === REACT_FRAGMENT_TYPE) {
            return 'React.Fragment';
          } else {
            return element.type.displayName || element.type.name || 'Unknown';
          }
        };

        var getStackAddendum = function getStackAddendum() {
          var stack = '';

          if (currentlyValidatingElement) {
            var name = getDisplayName(currentlyValidatingElement);
            var owner = currentlyValidatingElement._owner;
            stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner));
          }

          stack += ReactDebugCurrentFrame.getStackAddendum() || '';
          return stack;
        };

        var VALID_FRAGMENT_PROPS = new Map([['children', true], ['key', true]]);
      }

      function getDeclarationErrorAddendum() {
        if (ReactCurrentOwner.current) {
          var name = getComponentName(ReactCurrentOwner.current);

          if (name) {
            return '\n\nCheck the render method of `' + name + '`.';
          }
        }

        return '';
      }

      function getSourceInfoErrorAddendum(elementProps) {
        if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
          var source = elementProps.__source;
          var fileName = source.fileName.replace(/^.*[\\\/]/, '');
          var lineNumber = source.lineNumber;
          return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
        }

        return '';
      }
      /**
       * Warn if there's no key explicitly set on dynamic arrays of children or
       * object keys are not valid. This allows us to keep track of children between
       * updates.
       */


      var ownerHasKeyUseWarning = {};

      function getCurrentComponentErrorInfo(parentType) {
        var info = getDeclarationErrorAddendum();

        if (!info) {
          var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

          if (parentName) {
            info = '\n\nCheck the top-level render call using <' + parentName + '>.';
          }
        }

        return info;
      }
      /**
       * Warn if the element doesn't have an explicit key assigned to it.
       * This element is in an array. The array could grow and shrink or be
       * reordered. All children that haven't already been validated are required to
       * have a "key" property assigned to it. Error statuses are cached so a warning
       * will only be shown once.
       *
       * @internal
       * @param {ReactElement} element Element that requires a key.
       * @param {*} parentType element's parent's type.
       */


      function validateExplicitKey(element, parentType) {
        if (!element._store || element._store.validated || element.key != null) {
          return;
        }

        element._store.validated = true;
        var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

        if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
          return;
        }

        ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
        // property, it may be the creator of the child that's responsible for
        // assigning it a key.

        var childOwner = '';

        if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
          // Give the component that originally created this child.
          childOwner = ' It was passed a child from ' + getComponentName(element._owner) + '.';
        }

        currentlyValidatingElement = element;
        {
          warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum());
        }
        currentlyValidatingElement = null;
      }
      /**
       * Ensure that every element either is passed in a static location, in an
       * array with an explicit keys property defined, or in an object literal
       * with valid key property.
       *
       * @internal
       * @param {ReactNode} node Statically passed child of any type.
       * @param {*} parentType node's parent's type.
       */


      function validateChildKeys(node, parentType) {
        if (_typeof$1(node) !== 'object') {
          return;
        }

        if (Array.isArray(node)) {
          for (var i = 0; i < node.length; i++) {
            var child = node[i];

            if (isValidElement(child)) {
              validateExplicitKey(child, parentType);
            }
          }
        } else if (isValidElement(node)) {
          // This element was passed in a valid location.
          if (node._store) {
            node._store.validated = true;
          }
        } else if (node) {
          var iteratorFn = getIteratorFn(node);

          if (typeof iteratorFn === 'function') {
            // Entry iterators used to provide implicit keys,
            // but now we print a separate warning for them later.
            if (iteratorFn !== node.entries) {
              var iterator = iteratorFn.call(node);
              var step;

              while (!(step = iterator.next()).done) {
                if (isValidElement(step.value)) {
                  validateExplicitKey(step.value, parentType);
                }
              }
            }
          }
        }
      }
      /**
       * Given an element, validate that its props follow the propTypes definition,
       * provided by the type.
       *
       * @param {ReactElement} element
       */


      function validatePropTypes(element) {
        var componentClass = element.type;

        if (typeof componentClass !== 'function') {
          return;
        }

        var name = componentClass.displayName || componentClass.name;
        var propTypes = componentClass.propTypes;

        if (propTypes) {
          currentlyValidatingElement = element;
          checkPropTypes(propTypes, element.props, 'prop', name, getStackAddendum);
          currentlyValidatingElement = null;
        } else if (componentClass.PropTypes !== undefined && !propTypesMisspellWarningShown) {
          propTypesMisspellWarningShown = true;
          warning(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
        }

        if (typeof componentClass.getDefaultProps === 'function') {
          warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
        }
      }
      /**
       * Given a fragment, validate that it can only be provided with fragment props
       * @param {ReactElement} fragment
       */


      function validateFragmentProps(fragment) {
        currentlyValidatingElement = fragment;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Object.keys(fragment.props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            if (!VALID_FRAGMENT_PROPS.has(key)) {
              warning(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.%s', key, getStackAddendum());
              break;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (fragment.ref !== null) {
          warning(false, 'Invalid attribute `ref` supplied to `React.Fragment`.%s', getStackAddendum());
        }

        currentlyValidatingElement = null;
      }

      function createElementWithValidation(type, props, children) {
        var validType = typeof type === 'string' || typeof type === 'function' || _typeof$1(type) === 'symbol' || typeof type === 'number'; // We warn in this case but don't throw. We expect the element creation to
        // succeed and there will likely be errors in render.

        if (!validType) {
          var info = '';

          if (type === undefined || _typeof$1(type) === 'object' && type !== null && Object.keys(type).length === 0) {
            info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
          }

          var sourceInfo = getSourceInfoErrorAddendum(props);

          if (sourceInfo) {
            info += sourceInfo;
          } else {
            info += getDeclarationErrorAddendum();
          }

          info += getStackAddendum() || '';
          warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : _typeof$1(type), info);
        }

        var element = createElement.apply(this, arguments); // The result can be nullish if a mock or a custom function is used.
        // TODO: Drop this when these are no longer allowed as the type argument.

        if (element == null) {
          return element;
        } // Skip key warning if the type isn't valid since our key validation logic
        // doesn't expect a non-string/function type and can throw confusing errors.
        // We don't want exception behavior to differ between dev and prod.
        // (Rendering will throw with a helpful message and as soon as the type is
        // fixed, the key warnings will appear.)


        if (validType) {
          for (var i = 2; i < arguments.length; i++) {
            validateChildKeys(arguments[i], type);
          }
        }

        if (_typeof$1(type) === 'symbol' && type === REACT_FRAGMENT_TYPE) {
          validateFragmentProps(element);
        } else {
          validatePropTypes(element);
        }

        return element;
      }

      function createFactoryWithValidation(type) {
        var validatedFactory = createElementWithValidation.bind(null, type); // Legacy hook TODO: Warn if this is accessed

        validatedFactory.type = type;
        {
          Object.defineProperty(validatedFactory, 'type', {
            enumerable: false,
            get: function get() {
              lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
              Object.defineProperty(this, 'type', {
                value: type
              });
              return type;
            }
          });
        }
        return validatedFactory;
      }

      function cloneElementWithValidation(element, props, children) {
        var newElement = cloneElement.apply(this, arguments);

        for (var i = 2; i < arguments.length; i++) {
          validateChildKeys(arguments[i], newElement.type);
        }

        validatePropTypes(newElement);
        return newElement;
      }

      var React = {
        Children: {
          map: mapChildren,
          forEach: forEachChildren,
          count: countChildren,
          toArray: toArray,
          only: onlyChild
        },
        Component: Component,
        PureComponent: PureComponent,
        unstable_AsyncComponent: AsyncComponent,
        Fragment: REACT_FRAGMENT_TYPE,
        createElement: createElementWithValidation,
        cloneElement: cloneElementWithValidation,
        createFactory: createFactoryWithValidation,
        isValidElement: isValidElement,
        version: ReactVersion,
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
          ReactCurrentOwner: ReactCurrentOwner,
          // Used by renderers to avoid bundling object-assign twice in UMD bundles:
          assign: _assign
        }
      };
      {
        _assign(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
          // These should not be included in production.
          ReactDebugCurrentFrame: ReactDebugCurrentFrame,
          // Shim for React DOM 16.0.0 which still destructured (but not used) this.
          // TODO: remove in React 17.0.
          ReactComponentTreeHook: {}
        });
      }
      var React$2 = Object.freeze({
        default: React
      });
      var React$3 = React$2 && React || React$2; // TODO: decide on the top-level export form.
      // This is hacky but makes it work with both Rollup and Jest.

      var react = React$3['default'] ? React$3['default'] : React$3;
      module.exports = react;
    })();
  }
});

var react = createCommonjsModule(function (module) {

  {
    module.exports = react_development;
  }
});

var allLocaleData = {};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

var extend_1 = extend;
var hop = Object.prototype.hasOwnProperty;

function extend(obj) {
  var sources = Array.prototype.slice.call(arguments, 1),
      i,
      len,
      source,
      key;

  for (i = 0, len = sources.length; i < len; i += 1) {
    source = sources[i];

    if (!source) {
      continue;
    }

    for (key in source) {
      if (hop.call(source, key)) {
        obj[key] = source[key];
      }
    }
  }

  return obj;
}

var hop_1 = hop;
var utils = {
  extend: extend_1,
  hop: hop_1
};

var es5$1 = createCommonjsModule(function (module, exports) {
  // Copyright 2013 Andy Earnshaw, MIT License

  var realDefineProp = function () {
    try {
      return !!Object.defineProperty({}, 'a', {});
    } catch (e) {
      return false;
    }
  }();
  var defineProperty = realDefineProp ? Object.defineProperty : function (obj, name, desc) {
    if ('get' in desc && obj.__defineGetter__) {
      obj.__defineGetter__(name, desc.get);
    } else if (!utils.hop.call(obj, name) || 'value' in desc) {
      obj[name] = desc.value;
    }
  };

  var objCreate = Object.create || function (proto, props) {
    var obj, k;

    function F() {}

    F.prototype = proto;
    obj = new F();

    for (k in props) {
      if (utils.hop.call(props, k)) {
        defineProperty(obj, k, props[k]);
      }
    }

    return obj;
  };

  exports.defineProperty = defineProperty, exports.objCreate = objCreate;
});

var compiler = createCommonjsModule(function (module, exports) {

  exports["default"] = Compiler;

  function Compiler(locales, formats, pluralFn) {
    this.locales = locales;
    this.formats = formats;
    this.pluralFn = pluralFn;
  }

  Compiler.prototype.compile = function (ast) {
    this.pluralStack = [];
    this.currentPlural = null;
    this.pluralNumberFormat = null;
    return this.compileMessage(ast);
  };

  Compiler.prototype.compileMessage = function (ast) {
    if (!(ast && ast.type === 'messageFormatPattern')) {
      throw new Error('Message AST is not of type: "messageFormatPattern"');
    }

    var elements = ast.elements,
        pattern = [];
    var i, len, element;

    for (i = 0, len = elements.length; i < len; i += 1) {
      element = elements[i];

      switch (element.type) {
        case 'messageTextElement':
          pattern.push(this.compileMessageText(element));
          break;

        case 'argumentElement':
          pattern.push(this.compileArgument(element));
          break;

        default:
          throw new Error('Message element does not have a valid type');
      }
    }

    return pattern;
  };

  Compiler.prototype.compileMessageText = function (element) {
    // When this `element` is part of plural sub-pattern and its value contains
    // an unescaped '#', use a `PluralOffsetString` helper to properly output
    // the number with the correct offset in the string.
    if (this.currentPlural && /(^|[^\\])#/g.test(element.value)) {
      // Create a cache a NumberFormat instance that can be reused for any
      // PluralOffsetString instance in this message.
      if (!this.pluralNumberFormat) {
        this.pluralNumberFormat = new Intl.NumberFormat(this.locales);
      }

      return new PluralOffsetString(this.currentPlural.id, this.currentPlural.format.offset, this.pluralNumberFormat, element.value);
    } // Unescape the escaped '#'s in the message text.


    return element.value.replace(/\\#/g, '#');
  };

  Compiler.prototype.compileArgument = function (element) {
    var format = element.format;

    if (!format) {
      return new StringFormat(element.id);
    }

    var formats = this.formats,
        locales = this.locales,
        pluralFn = this.pluralFn,
        options;

    switch (format.type) {
      case 'numberFormat':
        options = formats.number[format.style];
        return {
          id: element.id,
          format: new Intl.NumberFormat(locales, options).format
        };

      case 'dateFormat':
        options = formats.date[format.style];
        return {
          id: element.id,
          format: new Intl.DateTimeFormat(locales, options).format
        };

      case 'timeFormat':
        options = formats.time[format.style];
        return {
          id: element.id,
          format: new Intl.DateTimeFormat(locales, options).format
        };

      case 'pluralFormat':
        options = this.compileOptions(element);
        return new PluralFormat(element.id, format.ordinal, format.offset, options, pluralFn);

      case 'selectFormat':
        options = this.compileOptions(element);
        return new SelectFormat(element.id, options);

      default:
        throw new Error('Message element does not have a valid format type');
    }
  };

  Compiler.prototype.compileOptions = function (element) {
    var format = element.format,
        options = format.options,
        optionsHash = {}; // Save the current plural element, if any, then set it to a new value when
    // compiling the options sub-patterns. This conforms the spec's algorithm
    // for handling `"#"` syntax in message text.

    this.pluralStack.push(this.currentPlural);
    this.currentPlural = format.type === 'pluralFormat' ? element : null;
    var i, len, option;

    for (i = 0, len = options.length; i < len; i += 1) {
      option = options[i]; // Compile the sub-pattern and save it under the options's selector.

      optionsHash[option.selector] = this.compileMessage(option.value);
    } // Pop the plural stack to put back the original current plural value.


    this.currentPlural = this.pluralStack.pop();
    return optionsHash;
  }; // -- Compiler Helper Classes --------------------------------------------------


  function StringFormat(id) {
    this.id = id;
  }

  StringFormat.prototype.format = function (value) {
    if (!value && typeof value !== 'number') {
      return '';
    }

    return typeof value === 'string' ? value : String(value);
  };

  function PluralFormat(id, useOrdinal, offset, options, pluralFn) {
    this.id = id;
    this.useOrdinal = useOrdinal;
    this.offset = offset;
    this.options = options;
    this.pluralFn = pluralFn;
  }

  PluralFormat.prototype.getOption = function (value) {
    var options = this.options;
    var option = options['=' + value] || options[this.pluralFn(value - this.offset, this.useOrdinal)];
    return option || options.other;
  };

  function PluralOffsetString(id, offset, numberFormat, string) {
    this.id = id;
    this.offset = offset;
    this.numberFormat = numberFormat;
    this.string = string;
  }

  PluralOffsetString.prototype.format = function (value) {
    var number = this.numberFormat.format(value - this.offset);
    return this.string.replace(/(^|[^\\])#/g, '$1' + number).replace(/\\#/g, '#');
  };

  function SelectFormat(id, options) {
    this.id = id;
    this.options = options;
  }

  SelectFormat.prototype.getOption = function (value) {
    var options = this.options;
    return options[value] || options.other;
  };
});

var parser = createCommonjsModule(function (module, exports) {

  exports["default"] = function () {
    /*
     * Generated by PEG.js 0.9.0.
     *
     * http://pegjs.org/
     */

    function peg$subclass(child, parent) {
      function ctor() {
        this.constructor = child;
      }

      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
    }

    function peg$SyntaxError(message, expected, found, location) {
      this.message = message;
      this.expected = expected;
      this.found = found;
      this.location = location;
      this.name = "SyntaxError";

      if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(this, peg$SyntaxError);
      }
    }

    peg$subclass(peg$SyntaxError, Error);

    function peg$parse(input) {
      var options = arguments.length > 1 ? arguments[1] : {},
          peg$FAILED = {},
          peg$startRuleFunctions = {
        start: peg$parsestart
      },
          peg$startRuleFunction = peg$parsestart,
          peg$c0 = function peg$c0(elements) {
        return {
          type: 'messageFormatPattern',
          elements: elements,
          location: location()
        };
      },
          peg$c1 = function peg$c1(text) {
        var string = '',
            i,
            j,
            outerLen,
            inner,
            innerLen;

        for (i = 0, outerLen = text.length; i < outerLen; i += 1) {
          inner = text[i];

          for (j = 0, innerLen = inner.length; j < innerLen; j += 1) {
            string += inner[j];
          }
        }

        return string;
      },
          peg$c2 = function peg$c2(messageText) {
        return {
          type: 'messageTextElement',
          value: messageText,
          location: location()
        };
      },
          peg$c3 = /^[^ \t\n\r,.+={}#]/,
          peg$c4 = {
        type: "class",
        value: "[^ \\t\\n\\r,.+={}#]",
        description: "[^ \\t\\n\\r,.+={}#]"
      },
          peg$c5 = "{",
          peg$c6 = {
        type: "literal",
        value: "{",
        description: "\"{\""
      },
          peg$c7 = ",",
          peg$c8 = {
        type: "literal",
        value: ",",
        description: "\",\""
      },
          peg$c9 = "}",
          peg$c10 = {
        type: "literal",
        value: "}",
        description: "\"}\""
      },
          peg$c11 = function peg$c11(id, format) {
        return {
          type: 'argumentElement',
          id: id,
          format: format && format[2],
          location: location()
        };
      },
          peg$c12 = "number",
          peg$c13 = {
        type: "literal",
        value: "number",
        description: "\"number\""
      },
          peg$c14 = "date",
          peg$c15 = {
        type: "literal",
        value: "date",
        description: "\"date\""
      },
          peg$c16 = "time",
          peg$c17 = {
        type: "literal",
        value: "time",
        description: "\"time\""
      },
          peg$c18 = function peg$c18(type, style) {
        return {
          type: type + 'Format',
          style: style && style[2],
          location: location()
        };
      },
          peg$c19 = "plural",
          peg$c20 = {
        type: "literal",
        value: "plural",
        description: "\"plural\""
      },
          peg$c21 = function peg$c21(pluralStyle) {
        return {
          type: pluralStyle.type,
          ordinal: false,
          offset: pluralStyle.offset || 0,
          options: pluralStyle.options,
          location: location()
        };
      },
          peg$c22 = "selectordinal",
          peg$c23 = {
        type: "literal",
        value: "selectordinal",
        description: "\"selectordinal\""
      },
          peg$c24 = function peg$c24(pluralStyle) {
        return {
          type: pluralStyle.type,
          ordinal: true,
          offset: pluralStyle.offset || 0,
          options: pluralStyle.options,
          location: location()
        };
      },
          peg$c25 = "select",
          peg$c26 = {
        type: "literal",
        value: "select",
        description: "\"select\""
      },
          peg$c27 = function peg$c27(options) {
        return {
          type: 'selectFormat',
          options: options,
          location: location()
        };
      },
          peg$c28 = "=",
          peg$c29 = {
        type: "literal",
        value: "=",
        description: "\"=\""
      },
          peg$c30 = function peg$c30(selector, pattern) {
        return {
          type: 'optionalFormatPattern',
          selector: selector,
          value: pattern,
          location: location()
        };
      },
          peg$c31 = "offset:",
          peg$c32 = {
        type: "literal",
        value: "offset:",
        description: "\"offset:\""
      },
          peg$c33 = function peg$c33(number) {
        return number;
      },
          peg$c34 = function peg$c34(offset, options) {
        return {
          type: 'pluralFormat',
          offset: offset,
          options: options,
          location: location()
        };
      },
          peg$c35 = {
        type: "other",
        description: "whitespace"
      },
          peg$c36 = /^[ \t\n\r]/,
          peg$c37 = {
        type: "class",
        value: "[ \\t\\n\\r]",
        description: "[ \\t\\n\\r]"
      },
          peg$c38 = {
        type: "other",
        description: "optionalWhitespace"
      },
          peg$c39 = /^[0-9]/,
          peg$c40 = {
        type: "class",
        value: "[0-9]",
        description: "[0-9]"
      },
          peg$c41 = /^[0-9a-f]/i,
          peg$c42 = {
        type: "class",
        value: "[0-9a-f]i",
        description: "[0-9a-f]i"
      },
          peg$c43 = "0",
          peg$c44 = {
        type: "literal",
        value: "0",
        description: "\"0\""
      },
          peg$c45 = /^[1-9]/,
          peg$c46 = {
        type: "class",
        value: "[1-9]",
        description: "[1-9]"
      },
          peg$c47 = function peg$c47(digits) {
        return parseInt(digits, 10);
      },
          peg$c48 = /^[^{}\\\0-\x1F \t\n\r]/,
          peg$c49 = {
        type: "class",
        value: "[^{}\\\\\\0-\\x1F\\x7f \\t\\n\\r]",
        description: "[^{}\\\\\\0-\\x1F\\x7f \\t\\n\\r]"
      },
          peg$c50 = "\\\\",
          peg$c51 = {
        type: "literal",
        value: "\\\\",
        description: "\"\\\\\\\\\""
      },
          peg$c52 = function peg$c52() {
        return '\\';
      },
          peg$c53 = "\\#",
          peg$c54 = {
        type: "literal",
        value: "\\#",
        description: "\"\\\\#\""
      },
          peg$c55 = function peg$c55() {
        return '\\#';
      },
          peg$c56 = "\\{",
          peg$c57 = {
        type: "literal",
        value: "\\{",
        description: "\"\\\\{\""
      },
          peg$c58 = function peg$c58() {
        return "{";
      },
          peg$c59 = "\\}",
          peg$c60 = {
        type: "literal",
        value: "\\}",
        description: "\"\\\\}\""
      },
          peg$c61 = function peg$c61() {
        return "}";
      },
          peg$c62 = "\\u",
          peg$c63 = {
        type: "literal",
        value: "\\u",
        description: "\"\\\\u\""
      },
          peg$c64 = function peg$c64(digits) {
        return String.fromCharCode(parseInt(digits, 16));
      },
          peg$c65 = function peg$c65(chars) {
        return chars.join('');
      },
          peg$currPos = 0,
          peg$savedPos = 0,
          peg$posDetailsCache = [{
        line: 1,
        column: 1,
        seenCR: false
      }],
          peg$maxFailPos = 0,
          peg$maxFailExpected = [],
          peg$silentFails = 0,
          peg$result;

      if ("startRule" in options) {
        if (!(options.startRule in peg$startRuleFunctions)) {
          throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
        }

        peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
      }

      function location() {
        return peg$computeLocation(peg$savedPos, peg$currPos);
      }

      function peg$computePosDetails(pos) {
        var details = peg$posDetailsCache[pos],
            p,
            ch;

        if (details) {
          return details;
        } else {
          p = pos - 1;

          while (!peg$posDetailsCache[p]) {
            p--;
          }

          details = peg$posDetailsCache[p];
          details = {
            line: details.line,
            column: details.column,
            seenCR: details.seenCR
          };

          while (p < pos) {
            ch = input.charAt(p);

            if (ch === "\n") {
              if (!details.seenCR) {
                details.line++;
              }

              details.column = 1;
              details.seenCR = false;
            } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
              details.line++;
              details.column = 1;
              details.seenCR = true;
            } else {
              details.column++;
              details.seenCR = false;
            }

            p++;
          }

          peg$posDetailsCache[pos] = details;
          return details;
        }
      }

      function peg$computeLocation(startPos, endPos) {
        var startPosDetails = peg$computePosDetails(startPos),
            endPosDetails = peg$computePosDetails(endPos);
        return {
          start: {
            offset: startPos,
            line: startPosDetails.line,
            column: startPosDetails.column
          },
          end: {
            offset: endPos,
            line: endPosDetails.line,
            column: endPosDetails.column
          }
        };
      }

      function peg$fail(expected) {
        if (peg$currPos < peg$maxFailPos) {
          return;
        }

        if (peg$currPos > peg$maxFailPos) {
          peg$maxFailPos = peg$currPos;
          peg$maxFailExpected = [];
        }

        peg$maxFailExpected.push(expected);
      }

      function peg$buildException(message, expected, found, location) {
        function cleanupExpected(expected) {
          var i = 1;
          expected.sort(function (a, b) {
            if (a.description < b.description) {
              return -1;
            } else if (a.description > b.description) {
              return 1;
            } else {
              return 0;
            }
          });

          while (i < expected.length) {
            if (expected[i - 1] === expected[i]) {
              expected.splice(i, 1);
            } else {
              i++;
            }
          }
        }

        function buildMessage(expected, found) {
          function stringEscape(s) {
            function hex(ch) {
              return ch.charCodeAt(0).toString(16).toUpperCase();
            }

            return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\x08/g, '\\b').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\f/g, '\\f').replace(/\r/g, '\\r').replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (ch) {
              return '\\x0' + hex(ch);
            }).replace(/[\x10-\x1F\x80-\xFF]/g, function (ch) {
              return '\\x' + hex(ch);
            }).replace(/[\u0100-\u0FFF]/g, function (ch) {
              return "\\u0" + hex(ch);
            }).replace(/[\u1000-\uFFFF]/g, function (ch) {
              return "\\u" + hex(ch);
            });
          }

          var expectedDescs = new Array(expected.length),
              expectedDesc,
              foundDesc,
              i;

          for (i = 0; i < expected.length; i++) {
            expectedDescs[i] = expected[i].description;
          }

          expectedDesc = expected.length > 1 ? expectedDescs.slice(0, -1).join(", ") + " or " + expectedDescs[expected.length - 1] : expectedDescs[0];
          foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";
          return "Expected " + expectedDesc + " but " + foundDesc + " found.";
        }

        if (expected !== null) {
          cleanupExpected(expected);
        }

        return new peg$SyntaxError(message !== null ? message : buildMessage(expected, found), expected, found, location);
      }

      function peg$parsestart() {
        var s0;
        s0 = peg$parsemessageFormatPattern();
        return s0;
      }

      function peg$parsemessageFormatPattern() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsemessageFormatElement();

        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsemessageFormatElement();
        }

        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c0(s1);
        }

        s0 = s1;
        return s0;
      }

      function peg$parsemessageFormatElement() {
        var s0;
        s0 = peg$parsemessageTextElement();

        if (s0 === peg$FAILED) {
          s0 = peg$parseargumentElement();
        }

        return s0;
      }

      function peg$parsemessageText() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$currPos;
        s3 = peg$parse_();

        if (s3 !== peg$FAILED) {
          s4 = peg$parsechars();

          if (s4 !== peg$FAILED) {
            s5 = peg$parse_();

            if (s5 !== peg$FAILED) {
              s3 = [s3, s4, s5];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }

        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$currPos;
            s3 = peg$parse_();

            if (s3 !== peg$FAILED) {
              s4 = peg$parsechars();

              if (s4 !== peg$FAILED) {
                s5 = peg$parse_();

                if (s5 !== peg$FAILED) {
                  s3 = [s3, s4, s5];
                  s2 = s3;
                } else {
                  peg$currPos = s2;
                  s2 = peg$FAILED;
                }
              } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          }
        } else {
          s1 = peg$FAILED;
        }

        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c1(s1);
        }

        s0 = s1;

        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parsews();

          if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
          } else {
            s0 = s1;
          }
        }

        return s0;
      }

      function peg$parsemessageTextElement() {
        var s0, s1;
        s0 = peg$currPos;
        s1 = peg$parsemessageText();

        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s1);
        }

        s0 = s1;
        return s0;
      }

      function peg$parseargument() {
        var s0, s1, s2;
        s0 = peg$parsenumber();

        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = [];

          if (peg$c3.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c4);
            }
          }

          if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
              s1.push(s2);

              if (peg$c3.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s2 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c4);
                }
              }
            }
          } else {
            s1 = peg$FAILED;
          }

          if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
          } else {
            s0 = s1;
          }
        }

        return s0;
      }

      function peg$parseargumentElement() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;

        if (input.charCodeAt(peg$currPos) === 123) {
          s1 = peg$c5;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c6);
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            s3 = peg$parseargument();

            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();

              if (s4 !== peg$FAILED) {
                s5 = peg$currPos;

                if (input.charCodeAt(peg$currPos) === 44) {
                  s6 = peg$c7;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c8);
                  }
                }

                if (s6 !== peg$FAILED) {
                  s7 = peg$parse_();

                  if (s7 !== peg$FAILED) {
                    s8 = peg$parseelementFormat();

                    if (s8 !== peg$FAILED) {
                      s6 = [s6, s7, s8];
                      s5 = s6;
                    } else {
                      peg$currPos = s5;
                      s5 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s5;
                    s5 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }

                if (s5 === peg$FAILED) {
                  s5 = null;
                }

                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();

                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 125) {
                      s7 = peg$c9;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;

                      if (peg$silentFails === 0) {
                        peg$fail(peg$c10);
                      }
                    }

                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c11(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parseelementFormat() {
        var s0;
        s0 = peg$parsesimpleFormat();

        if (s0 === peg$FAILED) {
          s0 = peg$parsepluralFormat();

          if (s0 === peg$FAILED) {
            s0 = peg$parseselectOrdinalFormat();

            if (s0 === peg$FAILED) {
              s0 = peg$parseselectFormat();
            }
          }
        }

        return s0;
      }

      function peg$parsesimpleFormat() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;

        if (input.substr(peg$currPos, 6) === peg$c12) {
          s1 = peg$c12;
          peg$currPos += 6;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c13);
          }
        }

        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 4) === peg$c14) {
            s1 = peg$c14;
            peg$currPos += 4;
          } else {
            s1 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c15);
            }
          }

          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c16) {
              s1 = peg$c16;
              peg$currPos += 4;
            } else {
              s1 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c17);
              }
            }
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            s3 = peg$currPos;

            if (input.charCodeAt(peg$currPos) === 44) {
              s4 = peg$c7;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }

            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();

              if (s5 !== peg$FAILED) {
                s6 = peg$parsechars();

                if (s6 !== peg$FAILED) {
                  s4 = [s4, s5, s6];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }

            if (s3 === peg$FAILED) {
              s3 = null;
            }

            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c18(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parsepluralFormat() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;

        if (input.substr(peg$currPos, 6) === peg$c19) {
          s1 = peg$c19;
          peg$currPos += 6;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c20);
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s3 = peg$c7;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }

            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();

              if (s4 !== peg$FAILED) {
                s5 = peg$parsepluralStyle();

                if (s5 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c21(s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parseselectOrdinalFormat() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;

        if (input.substr(peg$currPos, 13) === peg$c22) {
          s1 = peg$c22;
          peg$currPos += 13;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c23);
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s3 = peg$c7;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }

            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();

              if (s4 !== peg$FAILED) {
                s5 = peg$parsepluralStyle();

                if (s5 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c24(s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parseselectFormat() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;

        if (input.substr(peg$currPos, 6) === peg$c25) {
          s1 = peg$c25;
          peg$currPos += 6;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c26);
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s3 = peg$c7;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }

            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();

              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$parseoptionalFormatPattern();

                if (s6 !== peg$FAILED) {
                  while (s6 !== peg$FAILED) {
                    s5.push(s6);
                    s6 = peg$parseoptionalFormatPattern();
                  }
                } else {
                  s5 = peg$FAILED;
                }

                if (s5 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c27(s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parseselector() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$currPos;

        if (input.charCodeAt(peg$currPos) === 61) {
          s2 = peg$c28;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c29);
          }
        }

        if (s2 !== peg$FAILED) {
          s3 = peg$parsenumber();

          if (s3 !== peg$FAILED) {
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }

        if (s1 !== peg$FAILED) {
          s0 = input.substring(s0, peg$currPos);
        } else {
          s0 = s1;
        }

        if (s0 === peg$FAILED) {
          s0 = peg$parsechars();
        }

        return s0;
      }

      function peg$parseoptionalFormatPattern() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        s1 = peg$parse_();

        if (s1 !== peg$FAILED) {
          s2 = peg$parseselector();

          if (s2 !== peg$FAILED) {
            s3 = peg$parse_();

            if (s3 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 123) {
                s4 = peg$c5;
                peg$currPos++;
              } else {
                s4 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c6);
                }
              }

              if (s4 !== peg$FAILED) {
                s5 = peg$parse_();

                if (s5 !== peg$FAILED) {
                  s6 = peg$parsemessageFormatPattern();

                  if (s6 !== peg$FAILED) {
                    s7 = peg$parse_();

                    if (s7 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 125) {
                        s8 = peg$c9;
                        peg$currPos++;
                      } else {
                        s8 = peg$FAILED;

                        if (peg$silentFails === 0) {
                          peg$fail(peg$c10);
                        }
                      }

                      if (s8 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c30(s2, s6);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parseoffset() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;

        if (input.substr(peg$currPos, 7) === peg$c31) {
          s1 = peg$c31;
          peg$currPos += 7;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c32);
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            s3 = peg$parsenumber();

            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c33(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parsepluralStyle() {
        var s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = peg$parseoffset();

        if (s1 === peg$FAILED) {
          s1 = null;
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            s3 = [];
            s4 = peg$parseoptionalFormatPattern();

            if (s4 !== peg$FAILED) {
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parseoptionalFormatPattern();
              }
            } else {
              s3 = peg$FAILED;
            }

            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c34(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parsews() {
        var s0, s1;
        peg$silentFails++;
        s0 = [];

        if (peg$c36.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c37);
          }
        }

        if (s1 !== peg$FAILED) {
          while (s1 !== peg$FAILED) {
            s0.push(s1);

            if (peg$c36.test(input.charAt(peg$currPos))) {
              s1 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s1 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c37);
              }
            }
          }
        } else {
          s0 = peg$FAILED;
        }

        peg$silentFails--;

        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c35);
          }
        }

        return s0;
      }

      function peg$parse_() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsews();

        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsews();
        }

        if (s1 !== peg$FAILED) {
          s0 = input.substring(s0, peg$currPos);
        } else {
          s0 = s1;
        }

        peg$silentFails--;

        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c38);
          }
        }

        return s0;
      }

      function peg$parsedigit() {
        var s0;

        if (peg$c39.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c40);
          }
        }

        return s0;
      }

      function peg$parsehexDigit() {
        var s0;

        if (peg$c41.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c42);
          }
        }

        return s0;
      }

      function peg$parsenumber() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;

        if (input.charCodeAt(peg$currPos) === 48) {
          s1 = peg$c43;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c44);
          }
        }

        if (s1 === peg$FAILED) {
          s1 = peg$currPos;
          s2 = peg$currPos;

          if (peg$c45.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c46);
            }
          }

          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parsedigit();

            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsedigit();
            }

            if (s4 !== peg$FAILED) {
              s3 = [s3, s4];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }

          if (s2 !== peg$FAILED) {
            s1 = input.substring(s1, peg$currPos);
          } else {
            s1 = s2;
          }
        }

        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c47(s1);
        }

        s0 = s1;
        return s0;
      }

      function peg$parsechar() {
        var s0, s1, s2, s3, s4, s5, s6, s7;

        if (peg$c48.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c49);
          }
        }

        if (s0 === peg$FAILED) {
          s0 = peg$currPos;

          if (input.substr(peg$currPos, 2) === peg$c50) {
            s1 = peg$c50;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c51);
            }
          }

          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c52();
          }

          s0 = s1;

          if (s0 === peg$FAILED) {
            s0 = peg$currPos;

            if (input.substr(peg$currPos, 2) === peg$c53) {
              s1 = peg$c53;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c54);
              }
            }

            if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c55();
            }

            s0 = s1;

            if (s0 === peg$FAILED) {
              s0 = peg$currPos;

              if (input.substr(peg$currPos, 2) === peg$c56) {
                s1 = peg$c56;
                peg$currPos += 2;
              } else {
                s1 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c57);
                }
              }

              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c58();
              }

              s0 = s1;

              if (s0 === peg$FAILED) {
                s0 = peg$currPos;

                if (input.substr(peg$currPos, 2) === peg$c59) {
                  s1 = peg$c59;
                  peg$currPos += 2;
                } else {
                  s1 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c60);
                  }
                }

                if (s1 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c61();
                }

                s0 = s1;

                if (s0 === peg$FAILED) {
                  s0 = peg$currPos;

                  if (input.substr(peg$currPos, 2) === peg$c62) {
                    s1 = peg$c62;
                    peg$currPos += 2;
                  } else {
                    s1 = peg$FAILED;

                    if (peg$silentFails === 0) {
                      peg$fail(peg$c63);
                    }
                  }

                  if (s1 !== peg$FAILED) {
                    s2 = peg$currPos;
                    s3 = peg$currPos;
                    s4 = peg$parsehexDigit();

                    if (s4 !== peg$FAILED) {
                      s5 = peg$parsehexDigit();

                      if (s5 !== peg$FAILED) {
                        s6 = peg$parsehexDigit();

                        if (s6 !== peg$FAILED) {
                          s7 = peg$parsehexDigit();

                          if (s7 !== peg$FAILED) {
                            s4 = [s4, s5, s6, s7];
                            s3 = s4;
                          } else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s3;
                          s3 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }

                    if (s3 !== peg$FAILED) {
                      s2 = input.substring(s2, peg$currPos);
                    } else {
                      s2 = s3;
                    }

                    if (s2 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c64(s2);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                }
              }
            }
          }
        }

        return s0;
      }

      function peg$parsechars() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsechar();

        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parsechar();
          }
        } else {
          s1 = peg$FAILED;
        }

        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c65(s1);
        }

        s0 = s1;
        return s0;
      }

      peg$result = peg$startRuleFunction();

      if (peg$result !== peg$FAILED && peg$currPos === input.length) {
        return peg$result;
      } else {
        if (peg$result !== peg$FAILED && peg$currPos < input.length) {
          peg$fail({
            type: "end",
            description: "end of input"
          });
        }

        throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
      }
    }

    return {
      SyntaxError: peg$SyntaxError,
      parse: peg$parse
    };
  }();
});

var intlMessageformatParser = createCommonjsModule(function (module, exports) {

  exports = module.exports = parser['default'];
  exports['default'] = exports;
});

var core$1 = createCommonjsModule(function (module, exports) {

  exports["default"] = MessageFormat; // -- MessageFormat --------------------------------------------------------

  function MessageFormat(message, locales, formats) {
    // Parse string messages into an AST.
    var ast = typeof message === 'string' ? MessageFormat.__parse(message) : message;

    if (!(ast && ast.type === 'messageFormatPattern')) {
      throw new TypeError('A message must be provided as a String or AST.');
    } // Creates a new object with the specified `formats` merged with the default
    // formats.


    formats = this._mergeFormats(MessageFormat.formats, formats); // Defined first because it's used to build the format pattern.

    es5$1.defineProperty(this, '_locale', {
      value: this._resolveLocale(locales)
    }); // Compile the `ast` to a pattern that is highly optimized for repeated
    // `format()` invocations. **Note:** This passes the `locales` set provided
    // to the constructor instead of just the resolved locale.

    var pluralFn = this._findPluralRuleFunction(this._locale);

    var pattern = this._compilePattern(ast, locales, formats, pluralFn); // "Bind" `format()` method to `this` so it can be passed by reference like
    // the other `Intl` APIs.


    var messageFormat = this;

    this.format = function (values) {
      try {
        return messageFormat._format(pattern, values);
      } catch (e) {
        if (e.variableId) {
          throw new Error('The intl string context variable \'' + e.variableId + '\'' + ' was not provided to the string \'' + message + '\'');
        } else {
          throw e;
        }
      }
    };
  } // Default format options used as the prototype of the `formats` provided to the
  // constructor. These are used when constructing the internal Intl.NumberFormat
  // and Intl.DateTimeFormat instances.


  es5$1.defineProperty(MessageFormat, 'formats', {
    enumerable: true,
    value: {
      number: {
        'currency': {
          style: 'currency'
        },
        'percent': {
          style: 'percent'
        }
      },
      date: {
        'short': {
          month: 'numeric',
          day: 'numeric',
          year: '2-digit'
        },
        'medium': {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        },
        'long': {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        },
        'full': {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }
      },
      time: {
        'short': {
          hour: 'numeric',
          minute: 'numeric'
        },
        'medium': {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        },
        'long': {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          timeZoneName: 'short'
        },
        'full': {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          timeZoneName: 'short'
        }
      }
    }
  }); // Define internal private properties for dealing with locale data.

  es5$1.defineProperty(MessageFormat, '__localeData__', {
    value: es5$1.objCreate(null)
  });
  es5$1.defineProperty(MessageFormat, '__addLocaleData', {
    value: function value(data) {
      if (!(data && data.locale)) {
        throw new Error('Locale data provided to IntlMessageFormat is missing a ' + '`locale` property');
      }

      MessageFormat.__localeData__[data.locale.toLowerCase()] = data;
    }
  }); // Defines `__parse()` static method as an exposed private.

  es5$1.defineProperty(MessageFormat, '__parse', {
    value: intlMessageformatParser["default"].parse
  }); // Define public `defaultLocale` property which defaults to English, but can be
  // set by the developer.

  es5$1.defineProperty(MessageFormat, 'defaultLocale', {
    enumerable: true,
    writable: true,
    value: undefined
  });

  MessageFormat.prototype.resolvedOptions = function () {
    // TODO: Provide anything else?
    return {
      locale: this._locale
    };
  };

  MessageFormat.prototype._compilePattern = function (ast, locales, formats, pluralFn) {
    var compiler$1 = new compiler["default"](locales, formats, pluralFn);
    return compiler$1.compile(ast);
  };

  MessageFormat.prototype._findPluralRuleFunction = function (locale) {
    var localeData = MessageFormat.__localeData__;
    var data = localeData[locale.toLowerCase()]; // The locale data is de-duplicated, so we have to traverse the locale's
    // hierarchy until we find a `pluralRuleFunction` to return.

    while (data) {
      if (data.pluralRuleFunction) {
        return data.pluralRuleFunction;
      }

      data = data.parentLocale && localeData[data.parentLocale.toLowerCase()];
    }

    throw new Error('Locale data added to IntlMessageFormat is missing a ' + '`pluralRuleFunction` for :' + locale);
  };

  MessageFormat.prototype._format = function (pattern, values) {
    var result = '',
        i,
        len,
        part,
        id,
        value,
        err;

    for (i = 0, len = pattern.length; i < len; i += 1) {
      part = pattern[i]; // Exist early for string parts.

      if (typeof part === 'string') {
        result += part;
        continue;
      }

      id = part.id; // Enforce that all required values are provided by the caller.

      if (!(values && utils.hop.call(values, id))) {
        err = new Error('A value must be provided for: ' + id);
        err.variableId = id;
        throw err;
      }

      value = values[id]; // Recursively format plural and select parts' option — which can be a
      // nested pattern structure. The choosing of the option to use is
      // abstracted-by and delegated-to the part helper object.

      if (part.options) {
        result += this._format(part.getOption(value), values);
      } else {
        result += part.format(value);
      }
    }

    return result;
  };

  MessageFormat.prototype._mergeFormats = function (defaults, formats) {
    var mergedFormats = {},
        type,
        mergedType;

    for (type in defaults) {
      if (!utils.hop.call(defaults, type)) {
        continue;
      }

      mergedFormats[type] = mergedType = es5$1.objCreate(defaults[type]);

      if (formats && utils.hop.call(formats, type)) {
        utils.extend(mergedType, formats[type]);
      }
    }

    return mergedFormats;
  };

  MessageFormat.prototype._resolveLocale = function (locales) {
    if (typeof locales === 'string') {
      locales = [locales];
    } // Create a copy of the array so we can push on the default locale.


    locales = (locales || []).concat(MessageFormat.defaultLocale);
    var localeData = MessageFormat.__localeData__;
    var i, len, localeParts, data; // Using the set of locales + the default locale, we look for the first one
    // which that has been registered. When data does not exist for a locale, we
    // traverse its ancestors to find something that's been registered within
    // its hierarchy of locales. Since we lack the proper `parentLocale` data
    // here, we must take a naive approach to traversal.

    for (i = 0, len = locales.length; i < len; i += 1) {
      localeParts = locales[i].toLowerCase().split('-');

      while (localeParts.length) {
        data = localeData[localeParts.join('-')];

        if (data) {
          // Return the normalized locale string; e.g., we return "en-US",
          // instead of "en-us".
          return data.locale;
        }

        localeParts.pop();
      }
    }

    var defaultLocale = locales.pop();
    throw new Error('No locale data has been added to IntlMessageFormat for: ' + locales.join(', ') + ', or the default locale: ' + defaultLocale);
  };
});

var en$1 = createCommonjsModule(function (module, exports) {

  exports["default"] = {
    "locale": "en",
    "pluralRuleFunction": function pluralRuleFunction(n, ord) {
      var s = String(n).split("."),
          v0 = !s[1],
          t0 = Number(s[0]) == n,
          n10 = t0 && s[0].slice(-1),
          n100 = t0 && s[0].slice(-2);
      if (ord) return n10 == 1 && n100 != 11 ? "one" : n10 == 2 && n100 != 12 ? "two" : n10 == 3 && n100 != 13 ? "few" : "other";
      return n == 1 && v0 ? "one" : "other";
    }
  };
});

var main$1 = createCommonjsModule(function (module, exports) {

  core$1["default"].__addLocaleData(en$1["default"]);

  core$1["default"].defaultLocale = 'en';
  exports["default"] = core$1["default"];
});

var intlMessageformat = createCommonjsModule(function (module, exports) {

  var IntlMessageFormat = main$1['default']; // Add all locale data to `IntlMessageFormat`. This module will be ignored when
  // bundling for the browser with Browserify/Webpack.
  // Re-export `IntlMessageFormat` as the CommonJS default exports with all the
  // locale data registered, and with English set as the default locale. Define
  // the `default` prop for use with other compiled ES6 Modules.

  exports = module.exports = IntlMessageFormat;
  exports['default'] = exports;
});

var diff = createCommonjsModule(function (module, exports) {
  /*
  Copyright (c) 2014, Yahoo! Inc. All rights reserved.
  Copyrights licensed under the New BSD License.
  See the accompanying LICENSE file for terms.
  */

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /* jslint esnext: true */

  var round = Math.round;

  function daysToYears(days) {
    // 400 years have 146097 days (taking into account leap year rules)
    return days * 400 / 146097;
  } // Thanks to date-fns
  // https://github.com/date-fns/date-fns
  // MIT © Sasha Koss


  var MILLISECONDS_IN_MINUTE = 60000;
  var MILLISECONDS_IN_DAY = 86400000;

  function startOfDay(dirtyDate) {
    var date = new Date(dirtyDate);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  function differenceInCalendarDays(dirtyDateLeft, dirtyDateRight) {
    var startOfDayLeft = startOfDay(dirtyDateLeft);
    var startOfDayRight = startOfDay(dirtyDateRight);
    var timestampLeft = startOfDayLeft.getTime() - startOfDayLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE;
    var timestampRight = startOfDayRight.getTime() - startOfDayRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE; // Round the number of days to the nearest integer
    // because the number of milliseconds in a day is not constant
    // (e.g. it's different in the day of the daylight saving time clock shift)

    return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY);
  }

  function default_1(from, to) {
    // Convert to ms timestamps.
    from = +from;
    to = +to;
    var millisecond = round(to - from),
        second = round(millisecond / 1000),
        minute = round(second / 60),
        hour = round(minute / 60); // We expect a more precision in rounding when dealing with
    // days as it feels wrong when something happended 13 hours ago and
    // is regarded as "yesterday" even if the time was this morning.

    var day = differenceInCalendarDays(to, from);
    var week = round(day / 7);
    var rawYears = daysToYears(day),
        month = round(rawYears * 12),
        year = round(rawYears);
    return {
      millisecond: millisecond,
      second: second,
      'second-short': second,
      minute: minute,
      'minute-short': minute,
      hour: hour,
      'hour-short': hour,
      day: day,
      'day-short': day,
      week: week,
      'week-short': week,
      month: month,
      'month-short': month,
      year: year,
      'year-short': year
    };
  }

  exports.default = default_1;
});

var es5 = createCommonjsModule(function (module, exports) {
  /*
  Copyright (c) 2014, Yahoo! Inc. All rights reserved.
  Copyrights licensed under the New BSD License.
  See the accompanying LICENSE file for terms.
  */

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /* jslint esnext: true */
  // Purposely using the same implementation as the Intl.js `Intl` polyfill.
  // Copyright 2013 Andy Earnshaw, MIT License

  var hop = Object.prototype.hasOwnProperty;
  var toString = Object.prototype.toString;

  var realDefineProp = function () {
    try {
      return !!Object.defineProperty({}, 'a', {});
    } catch (e) {
      return false;
    }
  }();
  var defineProperty = realDefineProp ? Object.defineProperty : function (obj, name, desc) {
    if ('get' in desc && obj.__defineGetter__) {
      obj.__defineGetter__(name, desc.get);
    } else if (!hop.call(obj, name) || 'value' in desc) {
      obj[name] = desc.value;
    }
  };
  exports.defineProperty = defineProperty;

  var objCreate = Object.create || function (proto, props) {
    var obj, k;

    function F() {}

    F.prototype = proto;
    obj = new F();

    for (k in props) {
      if (hop.call(props, k)) {
        defineProperty(obj, k, props[k]);
      }
    }

    return obj;
  };

  exports.objCreate = objCreate;

  var arrIndexOf = Array.prototype.indexOf || function (search, fromIndex) {
    /*jshint validthis:true */
    var arr = this;

    if (!arr.length) {
      return -1;
    }

    for (var i = fromIndex || 0, max = arr.length; i < max; i++) {
      if (arr[i] === search) {
        return i;
      }
    }

    return -1;
  };

  exports.arrIndexOf = arrIndexOf;

  var isArray = Array.isArray || function (obj) {
    return toString.call(obj) === '[object Array]';
  };

  exports.isArray = isArray;

  var dateNow = Date.now || function () {
    return new Date().getTime();
  };

  exports.dateNow = dateNow;
});

var core = createCommonjsModule(function (module, exports) {
  /*
  Copyright (c) 2014, Yahoo! Inc. All rights reserved.
  Copyrights licensed under the New BSD License.
  See the accompanying LICENSE file for terms.
  */

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /* jslint esnext: true */

  exports.default = RelativeFormat; // -----------------------------------------------------------------------------

  var FIELDS = ['second', 'second-short', 'minute', 'minute-short', 'hour', 'hour-short', 'day', 'day-short', 'month', 'month-short', 'year', 'year-short'];
  var STYLES = ['best fit', 'numeric']; // -- RelativeFormat -----------------------------------------------------------

  function RelativeFormat(locales, options) {
    options = options || {}; // Make a copy of `locales` if it's an array, so that it doesn't change
    // since it's used lazily.

    if (es5.isArray(locales)) {
      locales = locales.concat();
    }

    es5.defineProperty(this, '_locale', {
      value: this._resolveLocale(locales)
    });
    es5.defineProperty(this, '_options', {
      value: {
        style: this._resolveStyle(options.style),
        units: this._isValidUnits(options.units) && options.units
      }
    });
    es5.defineProperty(this, '_locales', {
      value: locales
    });
    es5.defineProperty(this, '_fields', {
      value: this._findFields(this._locale)
    });
    es5.defineProperty(this, '_messages', {
      value: es5.objCreate(null)
    }); // "Bind" `format()` method to `this` so it can be passed by reference like
    // the other `Intl` APIs.

    var relativeFormat = this;

    this.format = function format(date, options) {
      return relativeFormat._format(date, options);
    };
  } // Define internal private properties for dealing with locale data.


  es5.defineProperty(RelativeFormat, '__localeData__', {
    value: es5.objCreate(null)
  });
  es5.defineProperty(RelativeFormat, '__addLocaleData', {
    value: function value() {
      for (var i = 0; i < arguments.length; i++) {
        var datum = arguments[i];

        if (!(datum && datum.locale)) {
          throw new Error('Locale data provided to IntlRelativeFormat is missing a ' + '`locale` property value');
        }

        RelativeFormat.__localeData__[datum.locale.toLowerCase()] = datum; // Add data to IntlMessageFormat.

        intlMessageformat.default.__addLocaleData(datum);
      }
    }
  }); // Define public `defaultLocale` property which can be set by the developer, or
  // it will be set when the first RelativeFormat instance is created by
  // leveraging the resolved locale from `Intl`.

  es5.defineProperty(RelativeFormat, 'defaultLocale', {
    enumerable: true,
    writable: true,
    value: undefined
  }); // Define public `thresholds` property which can be set by the developer, and
  // defaults to relative time thresholds from moment.js.

  es5.defineProperty(RelativeFormat, 'thresholds', {
    enumerable: true,
    value: {
      second: 45,
      'second-short': 45,
      minute: 45,
      'minute-short': 45,
      hour: 22,
      'hour-short': 22,
      day: 26,
      'day-short': 26,
      month: 11,
      'month-short': 11 // months to year

    }
  });

  RelativeFormat.prototype.resolvedOptions = function () {
    return {
      locale: this._locale,
      style: this._options.style,
      units: this._options.units
    };
  };

  RelativeFormat.prototype._compileMessage = function (units) {
    // `this._locales` is the original set of locales the user specified to the
    // constructor, while `this._locale` is the resolved root locale.
    var locales = this._locales;
    this._locale;
    var field = this._fields[units];
    var relativeTime = field.relativeTime;
    var future = '';
    var past = '';
    var i;

    for (i in relativeTime.future) {
      if (relativeTime.future.hasOwnProperty(i)) {
        future += ' ' + i + ' {' + relativeTime.future[i].replace('{0}', '#') + '}';
      }
    }

    for (i in relativeTime.past) {
      if (relativeTime.past.hasOwnProperty(i)) {
        past += ' ' + i + ' {' + relativeTime.past[i].replace('{0}', '#') + '}';
      }
    }

    var message = '{when, select, future {{0, plural, ' + future + '}}' + 'past {{0, plural, ' + past + '}}}'; // Create the synthetic IntlMessageFormat instance using the original
    // locales value specified by the user when constructing the the parent
    // IntlRelativeFormat instance.

    return new intlMessageformat.default(message, locales);
  };

  RelativeFormat.prototype._getMessage = function (units) {
    var messages = this._messages; // Create a new synthetic message based on the locale data from CLDR.

    if (!messages[units]) {
      messages[units] = this._compileMessage(units);
    }

    return messages[units];
  };

  RelativeFormat.prototype._getRelativeUnits = function (diff, units) {
    var field = this._fields[units];

    if (field.relative) {
      return field.relative[diff];
    }
  };

  RelativeFormat.prototype._findFields = function (locale) {
    var localeData = RelativeFormat.__localeData__;
    var data = localeData[locale.toLowerCase()]; // The locale data is de-duplicated, so we have to traverse the locale's
    // hierarchy until we find `fields` to return.

    while (data) {
      if (data.fields) {
        return data.fields;
      }

      data = data.parentLocale && localeData[data.parentLocale.toLowerCase()];
    }

    throw new Error('Locale data added to IntlRelativeFormat is missing `fields` for :' + locale);
  };

  RelativeFormat.prototype._format = function (date, options) {
    var now = options && options.now !== undefined ? options.now : es5.dateNow();

    if (date === undefined) {
      date = now;
    } // Determine if the `date` and optional `now` values are valid, and throw a
    // similar error to what `Intl.DateTimeFormat#format()` would throw.


    if (!isFinite(now)) {
      throw new RangeError('The `now` option provided to IntlRelativeFormat#format() is not ' + 'in valid range.');
    }

    if (!isFinite(date)) {
      throw new RangeError('The date value provided to IntlRelativeFormat#format() is not ' + 'in valid range.');
    }

    var diffReport = diff.default(now, date);

    var units = this._options.units || this._selectUnits(diffReport);

    var diffInUnits = diffReport[units];

    if (this._options.style !== 'numeric') {
      var relativeUnits = this._getRelativeUnits(diffInUnits, units);

      if (relativeUnits) {
        return relativeUnits;
      }
    }

    return this._getMessage(units).format({
      '0': Math.abs(diffInUnits),
      when: diffInUnits < 0 ? 'past' : 'future'
    });
  };

  RelativeFormat.prototype._isValidUnits = function (units) {
    if (!units || es5.arrIndexOf.call(FIELDS, units) >= 0) {
      return true;
    }

    if (typeof units === 'string') {
      var suggestion = /s$/.test(units) && units.substr(0, units.length - 1);

      if (suggestion && es5.arrIndexOf.call(FIELDS, suggestion) >= 0) {
        throw new Error('"' + units + '" is not a valid IntlRelativeFormat `units` ' + 'value, did you mean: ' + suggestion);
      }
    }

    throw new Error('"' + units + '" is not a valid IntlRelativeFormat `units` value, it ' + 'must be one of: "' + FIELDS.join('", "') + '"');
  };

  RelativeFormat.prototype._resolveLocale = function (locales) {
    if (typeof locales === 'string') {
      locales = [locales];
    } // Create a copy of the array so we can push on the default locale.


    locales = (locales || []).concat(RelativeFormat.defaultLocale);
    var localeData = RelativeFormat.__localeData__;
    var i, len, localeParts, data; // Using the set of locales + the default locale, we look for the first one
    // which that has been registered. When data does not exist for a locale, we
    // traverse its ancestors to find something that's been registered within
    // its hierarchy of locales. Since we lack the proper `parentLocale` data
    // here, we must take a naive approach to traversal.

    for (i = 0, len = locales.length; i < len; i += 1) {
      localeParts = locales[i].toLowerCase().split('-');

      while (localeParts.length) {
        data = localeData[localeParts.join('-')];

        if (data) {
          // Return the normalized locale string; e.g., we return "en-US",
          // instead of "en-us".
          return data.locale;
        }

        localeParts.pop();
      }
    }

    var defaultLocale = locales.pop();
    throw new Error('No locale data has been added to IntlRelativeFormat for: ' + locales.join(', ') + ', or the default locale: ' + defaultLocale);
  };

  RelativeFormat.prototype._resolveStyle = function (style) {
    // Default to "best fit" style.
    if (!style) {
      return STYLES[0];
    }

    if (es5.arrIndexOf.call(STYLES, style) >= 0) {
      return style;
    }

    throw new Error('"' + style + '" is not a valid IntlRelativeFormat `style` value, it ' + 'must be one of: "' + STYLES.join('", "') + '"');
  };

  RelativeFormat.prototype._selectUnits = function (diffReport) {
    var i, l, units;
    var fields = FIELDS.filter(function (field) {
      return field.indexOf('-short') < 1;
    });

    for (i = 0, l = fields.length; i < l; i += 1) {
      units = fields[i];

      if (Math.abs(diffReport[units]) < RelativeFormat.thresholds[units]) {
        break;
      }
    }

    return units;
  };
});

var en = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /* @generated */

  exports.default = {
    "locale": "en",
    "pluralRuleFunction": function pluralRuleFunction(n, ord) {
      var s = String(n).split('.'),
          v0 = !s[1],
          t0 = Number(s[0]) == n,
          n10 = t0 && s[0].slice(-1),
          n100 = t0 && s[0].slice(-2);
      if (ord) return n10 == 1 && n100 != 11 ? 'one' : n10 == 2 && n100 != 12 ? 'two' : n10 == 3 && n100 != 13 ? 'few' : 'other';
      return n == 1 && v0 ? 'one' : 'other';
    },
    "fields": {
      "year": {
        "displayName": "year",
        "relative": {
          "0": "this year",
          "1": "next year",
          "-1": "last year"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} year",
            "other": "in {0} years"
          },
          "past": {
            "one": "{0} year ago",
            "other": "{0} years ago"
          }
        }
      },
      "year-short": {
        "displayName": "yr.",
        "relative": {
          "0": "this yr.",
          "1": "next yr.",
          "-1": "last yr."
        },
        "relativeTime": {
          "future": {
            "one": "in {0} yr.",
            "other": "in {0} yr."
          },
          "past": {
            "one": "{0} yr. ago",
            "other": "{0} yr. ago"
          }
        }
      },
      "month": {
        "displayName": "month",
        "relative": {
          "0": "this month",
          "1": "next month",
          "-1": "last month"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} month",
            "other": "in {0} months"
          },
          "past": {
            "one": "{0} month ago",
            "other": "{0} months ago"
          }
        }
      },
      "month-short": {
        "displayName": "mo.",
        "relative": {
          "0": "this mo.",
          "1": "next mo.",
          "-1": "last mo."
        },
        "relativeTime": {
          "future": {
            "one": "in {0} mo.",
            "other": "in {0} mo."
          },
          "past": {
            "one": "{0} mo. ago",
            "other": "{0} mo. ago"
          }
        }
      },
      "week": {
        "displayName": "week",
        "relativePeriod": "the week of {0}",
        "relative": {
          "0": "this week",
          "1": "next week",
          "-1": "last week"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} week",
            "other": "in {0} weeks"
          },
          "past": {
            "one": "{0} week ago",
            "other": "{0} weeks ago"
          }
        }
      },
      "week-short": {
        "displayName": "wk.",
        "relativePeriod": "the week of {0}",
        "relative": {
          "0": "this wk.",
          "1": "next wk.",
          "-1": "last wk."
        },
        "relativeTime": {
          "future": {
            "one": "in {0} wk.",
            "other": "in {0} wk."
          },
          "past": {
            "one": "{0} wk. ago",
            "other": "{0} wk. ago"
          }
        }
      },
      "day": {
        "displayName": "day",
        "relative": {
          "0": "today",
          "1": "tomorrow",
          "-1": "yesterday"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} day",
            "other": "in {0} days"
          },
          "past": {
            "one": "{0} day ago",
            "other": "{0} days ago"
          }
        }
      },
      "day-short": {
        "displayName": "day",
        "relative": {
          "0": "today",
          "1": "tomorrow",
          "-1": "yesterday"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} day",
            "other": "in {0} days"
          },
          "past": {
            "one": "{0} day ago",
            "other": "{0} days ago"
          }
        }
      },
      "hour": {
        "displayName": "hour",
        "relative": {
          "0": "this hour"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} hour",
            "other": "in {0} hours"
          },
          "past": {
            "one": "{0} hour ago",
            "other": "{0} hours ago"
          }
        }
      },
      "hour-short": {
        "displayName": "hr.",
        "relative": {
          "0": "this hour"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} hr.",
            "other": "in {0} hr."
          },
          "past": {
            "one": "{0} hr. ago",
            "other": "{0} hr. ago"
          }
        }
      },
      "minute": {
        "displayName": "minute",
        "relative": {
          "0": "this minute"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} minute",
            "other": "in {0} minutes"
          },
          "past": {
            "one": "{0} minute ago",
            "other": "{0} minutes ago"
          }
        }
      },
      "minute-short": {
        "displayName": "min.",
        "relative": {
          "0": "this minute"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} min.",
            "other": "in {0} min."
          },
          "past": {
            "one": "{0} min. ago",
            "other": "{0} min. ago"
          }
        }
      },
      "second": {
        "displayName": "second",
        "relative": {
          "0": "now"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} second",
            "other": "in {0} seconds"
          },
          "past": {
            "one": "{0} second ago",
            "other": "{0} seconds ago"
          }
        }
      },
      "second-short": {
        "displayName": "sec.",
        "relative": {
          "0": "now"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} sec.",
            "other": "in {0} sec."
          },
          "past": {
            "one": "{0} sec. ago",
            "other": "{0} sec. ago"
          }
        }
      }
    }
  };
});

var main = createCommonjsModule(function (module, exports) {
  /* jslint esnext: true */

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  core.default.__addLocaleData(en.default);

  core.default.defaultLocale = 'en';
  exports.default = core.default;
});

var intlRelativeformat = createCommonjsModule(function (module, exports) {

  var IntlRelativeFormat = main['default']; // Add all locale data to `IntlRelativeFormat`. This module will be ignored when
  // bundling for the browser with Browserify/Webpack.
  // Re-export `IntlRelativeFormat` as the CommonJS default exports with all the
  // locale data registered, and with English set as the default locale. Define
  // the `default` prop for use with other compiled ES6 Modules.

  exports = module.exports = IntlRelativeFormat;
  exports['default'] = exports;
});

createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: !0
  });
  var b = "function" === typeof Symbol && Symbol.for,
      c = b ? Symbol.for("react.element") : 60103,
      d = b ? Symbol.for("react.portal") : 60106,
      e = b ? Symbol.for("react.fragment") : 60107,
      f = b ? Symbol.for("react.strict_mode") : 60108,
      g = b ? Symbol.for("react.profiler") : 60114,
      h = b ? Symbol.for("react.provider") : 60109,
      k = b ? Symbol.for("react.context") : 60110,
      l = b ? Symbol.for("react.async_mode") : 60111,
      m = b ? Symbol.for("react.concurrent_mode") : 60111,
      n = b ? Symbol.for("react.forward_ref") : 60112,
      p = b ? Symbol.for("react.suspense") : 60113,
      q = b ? Symbol.for("react.suspense_list") : 60120,
      r = b ? Symbol.for("react.memo") : 60115,
      t = b ? Symbol.for("react.lazy") : 60116,
      v = b ? Symbol.for("react.fundamental") : 60117,
      w = b ? Symbol.for("react.responder") : 60118,
      x = b ? Symbol.for("react.scope") : 60119;

  function y(a) {
    if ("object" === _typeof$1(a) && null !== a) {
      var u = a.$$typeof;

      switch (u) {
        case c:
          switch (a = a.type, a) {
            case l:
            case m:
            case e:
            case g:
            case f:
            case p:
              return a;

            default:
              switch (a = a && a.$$typeof, a) {
                case k:
                case n:
                case h:
                  return a;

                default:
                  return u;
              }

          }

        case t:
        case r:
        case d:
          return u;
      }
    }
  }

  function z(a) {
    return y(a) === m;
  }

  exports.typeOf = y;
  exports.AsyncMode = l;
  exports.ConcurrentMode = m;
  exports.ContextConsumer = k;
  exports.ContextProvider = h;
  exports.Element = c;
  exports.ForwardRef = n;
  exports.Fragment = e;
  exports.Lazy = t;
  exports.Memo = r;
  exports.Portal = d;
  exports.Profiler = g;
  exports.StrictMode = f;
  exports.Suspense = p;

  exports.isValidElementType = function (a) {
    return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === _typeof$1(a) && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === v || a.$$typeof === w || a.$$typeof === x);
  };

  exports.isAsyncMode = function (a) {
    return z(a) || y(a) === l;
  };

  exports.isConcurrentMode = z;

  exports.isContextConsumer = function (a) {
    return y(a) === k;
  };

  exports.isContextProvider = function (a) {
    return y(a) === h;
  };

  exports.isElement = function (a) {
    return "object" === _typeof$1(a) && null !== a && a.$$typeof === c;
  };

  exports.isForwardRef = function (a) {
    return y(a) === n;
  };

  exports.isFragment = function (a) {
    return y(a) === e;
  };

  exports.isLazy = function (a) {
    return y(a) === t;
  };

  exports.isMemo = function (a) {
    return y(a) === r;
  };

  exports.isPortal = function (a) {
    return y(a) === d;
  };

  exports.isProfiler = function (a) {
    return y(a) === g;
  };

  exports.isStrictMode = function (a) {
    return y(a) === f;
  };

  exports.isSuspense = function (a) {
    return y(a) === p;
  };
});

var reactIs_development = createCommonjsModule(function (module, exports) {

  {
    (function () {

      Object.defineProperty(exports, '__esModule', {
        value: true
      }); // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
      // nor polyfill, then a plain number is used for performance.

      var hasSymbol = typeof Symbol === 'function' && Symbol.for;
      var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
      var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
      var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
      var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
      var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
      var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
      var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
      // (unstable) APIs that have been removed. Can we remove the symbols?

      var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
      var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
      var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
      var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
      var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
      var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
      var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
      var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
      var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
      var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

      function isValidElementType(type) {
        return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
        type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || _typeof$1(type) === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE);
      }
      /**
       * Forked from fbjs/warning:
       * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
       *
       * Only change is we use console.warn instead of console.error,
       * and do nothing when 'console' is not supported.
       * This really simplifies the code.
       * ---
       * Similar to invariant but only logs a warning if the condition is not met.
       * This can be used to log issues in development environments in critical
       * paths. Removing the logging code for production environments will keep the
       * same logic and follow the same code paths.
       */


      var lowPriorityWarningWithoutStack = function lowPriorityWarningWithoutStack() {};

      {
        var printWarning = function printWarning(format) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          var argIndex = 0;
          var message = 'Warning: ' + format.replace(/%s/g, function () {
            return args[argIndex++];
          });

          if (typeof console !== 'undefined') {
            console.warn(message);
          }

          try {
            // --- Welcome to debugging React ---
            // This error was thrown as a convenience so that you can use this stack
            // to find the callsite that caused this warning to fire.
            throw new Error(message);
          } catch (x) {}
        };

        lowPriorityWarningWithoutStack = function lowPriorityWarningWithoutStack(condition, format) {
          if (format === undefined) {
            throw new Error('`lowPriorityWarningWithoutStack(condition, format, ...args)` requires a warning ' + 'message argument');
          }

          if (!condition) {
            for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
              args[_key2 - 2] = arguments[_key2];
            }

            printWarning.apply(void 0, [format].concat(args));
          }
        };
      }
      var lowPriorityWarningWithoutStack$1 = lowPriorityWarningWithoutStack;

      function typeOf(object) {
        if (_typeof$1(object) === 'object' && object !== null) {
          var $$typeof = object.$$typeof;

          switch ($$typeof) {
            case REACT_ELEMENT_TYPE:
              var type = object.type;

              switch (type) {
                case REACT_ASYNC_MODE_TYPE:
                case REACT_CONCURRENT_MODE_TYPE:
                case REACT_FRAGMENT_TYPE:
                case REACT_PROFILER_TYPE:
                case REACT_STRICT_MODE_TYPE:
                case REACT_SUSPENSE_TYPE:
                  return type;

                default:
                  var $$typeofType = type && type.$$typeof;

                  switch ($$typeofType) {
                    case REACT_CONTEXT_TYPE:
                    case REACT_FORWARD_REF_TYPE:
                    case REACT_PROVIDER_TYPE:
                      return $$typeofType;

                    default:
                      return $$typeof;
                  }

              }

            case REACT_LAZY_TYPE:
            case REACT_MEMO_TYPE:
            case REACT_PORTAL_TYPE:
              return $$typeof;
          }
        }

        return undefined;
      } // AsyncMode is deprecated along with isAsyncMode


      var AsyncMode = REACT_ASYNC_MODE_TYPE;
      var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
      var ContextConsumer = REACT_CONTEXT_TYPE;
      var ContextProvider = REACT_PROVIDER_TYPE;
      var Element = REACT_ELEMENT_TYPE;
      var ForwardRef = REACT_FORWARD_REF_TYPE;
      var Fragment = REACT_FRAGMENT_TYPE;
      var Lazy = REACT_LAZY_TYPE;
      var Memo = REACT_MEMO_TYPE;
      var Portal = REACT_PORTAL_TYPE;
      var Profiler = REACT_PROFILER_TYPE;
      var StrictMode = REACT_STRICT_MODE_TYPE;
      var Suspense = REACT_SUSPENSE_TYPE;
      var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

      function isAsyncMode(object) {
        {
          if (!hasWarnedAboutDeprecatedIsAsyncMode) {
            hasWarnedAboutDeprecatedIsAsyncMode = true;
            lowPriorityWarningWithoutStack$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
          }
        }
        return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
      }

      function isConcurrentMode(object) {
        return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
      }

      function isContextConsumer(object) {
        return typeOf(object) === REACT_CONTEXT_TYPE;
      }

      function isContextProvider(object) {
        return typeOf(object) === REACT_PROVIDER_TYPE;
      }

      function isElement(object) {
        return _typeof$1(object) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }

      function isForwardRef(object) {
        return typeOf(object) === REACT_FORWARD_REF_TYPE;
      }

      function isFragment(object) {
        return typeOf(object) === REACT_FRAGMENT_TYPE;
      }

      function isLazy(object) {
        return typeOf(object) === REACT_LAZY_TYPE;
      }

      function isMemo(object) {
        return typeOf(object) === REACT_MEMO_TYPE;
      }

      function isPortal(object) {
        return typeOf(object) === REACT_PORTAL_TYPE;
      }

      function isProfiler(object) {
        return typeOf(object) === REACT_PROFILER_TYPE;
      }

      function isStrictMode(object) {
        return typeOf(object) === REACT_STRICT_MODE_TYPE;
      }

      function isSuspense(object) {
        return typeOf(object) === REACT_SUSPENSE_TYPE;
      }

      exports.typeOf = typeOf;
      exports.AsyncMode = AsyncMode;
      exports.ConcurrentMode = ConcurrentMode;
      exports.ContextConsumer = ContextConsumer;
      exports.ContextProvider = ContextProvider;
      exports.Element = Element;
      exports.ForwardRef = ForwardRef;
      exports.Fragment = Fragment;
      exports.Lazy = Lazy;
      exports.Memo = Memo;
      exports.Portal = Portal;
      exports.Profiler = Profiler;
      exports.StrictMode = StrictMode;
      exports.Suspense = Suspense;
      exports.isValidElementType = isValidElementType;
      exports.isAsyncMode = isAsyncMode;
      exports.isConcurrentMode = isConcurrentMode;
      exports.isContextConsumer = isContextConsumer;
      exports.isContextProvider = isContextProvider;
      exports.isElement = isElement;
      exports.isForwardRef = isForwardRef;
      exports.isFragment = isFragment;
      exports.isLazy = isLazy;
      exports.isMemo = isMemo;
      exports.isPortal = isPortal;
      exports.isProfiler = isProfiler;
      exports.isStrictMode = isStrictMode;
      exports.isSuspense = isSuspense;
    })();
  }
});

var reactIs = createCommonjsModule(function (module) {

  {
    module.exports = reactIs_development;
  }
});

var has = Function.call.bind(Object.prototype.hasOwnProperty);

var printWarning = function printWarning() {};

{
  printWarning = function printWarning(text) {
    var message = 'Warning: ' + text;

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

var factoryWithTypeCheckers = function factoryWithTypeCheckers(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */

  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);

    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }
  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */


  var ANONYMOUS = '<<anonymous>>'; // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.

  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),
    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker
  };
  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */

  /*eslint-disable no-self-compare*/

  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */


  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  } // Make `instanceof Error` still work for returned errors.


  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }

    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret_1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
          err.name = 'Invariant Violation';
          throw err;
        } else if (typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;

          if (!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
          manualPropTypeWarningCount < 3) {
            printWarning('You are manually calling a React.PropTypes validation ' + 'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.');
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }

      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }

          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }

        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);
    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }

      var propValue = props[propName];

      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }

      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);

        if (error instanceof Error) {
          return error;
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];

      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];

      if (!reactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      {
        if (arguments.length > 1) {
          printWarning('Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' + 'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).');
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }

      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];

      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);

        if (type === 'symbol') {
          return String(value);
        }

        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }

    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }

      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }

      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);

          if (error instanceof Error) {
            return error;
          }
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') ;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];

      if (typeof checker !== 'function') {
        printWarning('Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.');
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];

        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }

    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }

      for (var key in shapeTypes) {
        var checker = shapeTypes[key];

        if (!checker) {
          continue;
        }

        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);

        if (error) {
          return error;
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      } // We need to check all keys in case some are required but missing from
      // props.


      var allKeys = objectAssign({}, props[propName], shapeTypes);

      for (var key in allKeys) {
        var checker = shapeTypes[key];

        if (!checker) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
        }

        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);

        if (error) {
          return error;
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (_typeof$1(propValue)) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;

      case 'boolean':
        return !propValue;

      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }

        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);

        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;

          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;

              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;

      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    } // falsy value can't be a Symbol


    if (!propValue) {
      return false;
    } // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'


    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    } // Fallback for non-spec compliant Symbols which are polyfilled.


    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  } // Equivalent of `typeof` but with special handling for array and regexp.


  function getPropType(propValue) {
    var propType = _typeof$1(propValue);

    if (Array.isArray(propValue)) {
      return 'array';
    }

    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }

    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }

    return propType;
  } // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.


  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }

    var propType = getPropType(propValue);

    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }

    return propType;
  } // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"


  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);

    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;

      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;

      default:
        return type;
    }
  } // Returns class name of the object, if any.


  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }

    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes_1;
  ReactPropTypes.resetWarningCache = checkPropTypes_1.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};

var propTypes = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  {
    var ReactIs = reactIs; // By explicitly using `prop-types` you are opting into new development behavior.
    // http://fb.me/prop-types-in-prod

    var throwOnDirectAccess = true;
    module.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
  }
});

var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */


var invariant = function invariant(condition, format, a, b, c, d, e, f) {
  {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;

    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame

    throw error;
  }
};

var browser = invariant;

function getCacheId(inputs) {
  return JSON.stringify(inputs.map(function (input) {
    return input && _typeof$1(input) === 'object' ? orderedProps(input) : input;
  }));
}

function orderedProps(obj) {
  return Object.keys(obj).sort().map(function (k) {
    var _a;

    return _a = {}, _a[k] = obj[k], _a;
  });
}

var memoizeFormatConstructor = function memoizeFormatConstructor(FormatConstructor, cache) {
  if (cache === void 0) {
    cache = {};
  }

  return function () {
    var _a;

    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var cacheId = getCacheId(args);
    var format = cacheId && cache[cacheId];

    if (!format) {
      format = new ((_a = FormatConstructor).bind.apply(_a, [void 0].concat(args)))();

      if (cacheId) {
        cache[cacheId] = format;
      }
    }

    return format;
  };
};

var defaultLocaleData = {
  "locale": "en",
  "pluralRuleFunction": function pluralRuleFunction(n, ord) {
    var s = String(n).split("."),
        v0 = !s[1],
        t0 = Number(s[0]) == n,
        n10 = t0 && s[0].slice(-1),
        n100 = t0 && s[0].slice(-2);
    if (ord) return n10 == 1 && n100 != 11 ? "one" : n10 == 2 && n100 != 12 ? "two" : n10 == 3 && n100 != 13 ? "few" : "other";
    return n == 1 && v0 ? "one" : "other";
  },
  "fields": {
    "year": {
      "displayName": "year",
      "relative": {
        "0": "this year",
        "1": "next year",
        "-1": "last year"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} year",
          "other": "in {0} years"
        },
        "past": {
          "one": "{0} year ago",
          "other": "{0} years ago"
        }
      }
    },
    "year-short": {
      "displayName": "yr.",
      "relative": {
        "0": "this yr.",
        "1": "next yr.",
        "-1": "last yr."
      },
      "relativeTime": {
        "future": {
          "one": "in {0} yr.",
          "other": "in {0} yr."
        },
        "past": {
          "one": "{0} yr. ago",
          "other": "{0} yr. ago"
        }
      }
    },
    "month": {
      "displayName": "month",
      "relative": {
        "0": "this month",
        "1": "next month",
        "-1": "last month"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} month",
          "other": "in {0} months"
        },
        "past": {
          "one": "{0} month ago",
          "other": "{0} months ago"
        }
      }
    },
    "month-short": {
      "displayName": "mo.",
      "relative": {
        "0": "this mo.",
        "1": "next mo.",
        "-1": "last mo."
      },
      "relativeTime": {
        "future": {
          "one": "in {0} mo.",
          "other": "in {0} mo."
        },
        "past": {
          "one": "{0} mo. ago",
          "other": "{0} mo. ago"
        }
      }
    },
    "day": {
      "displayName": "day",
      "relative": {
        "0": "today",
        "1": "tomorrow",
        "-1": "yesterday"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} day",
          "other": "in {0} days"
        },
        "past": {
          "one": "{0} day ago",
          "other": "{0} days ago"
        }
      }
    },
    "day-short": {
      "displayName": "day",
      "relative": {
        "0": "today",
        "1": "tomorrow",
        "-1": "yesterday"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} day",
          "other": "in {0} days"
        },
        "past": {
          "one": "{0} day ago",
          "other": "{0} days ago"
        }
      }
    },
    "hour": {
      "displayName": "hour",
      "relative": {
        "0": "this hour"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} hour",
          "other": "in {0} hours"
        },
        "past": {
          "one": "{0} hour ago",
          "other": "{0} hours ago"
        }
      }
    },
    "hour-short": {
      "displayName": "hr.",
      "relative": {
        "0": "this hour"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} hr.",
          "other": "in {0} hr."
        },
        "past": {
          "one": "{0} hr. ago",
          "other": "{0} hr. ago"
        }
      }
    },
    "minute": {
      "displayName": "minute",
      "relative": {
        "0": "this minute"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} minute",
          "other": "in {0} minutes"
        },
        "past": {
          "one": "{0} minute ago",
          "other": "{0} minutes ago"
        }
      }
    },
    "minute-short": {
      "displayName": "min.",
      "relative": {
        "0": "this minute"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} min.",
          "other": "in {0} min."
        },
        "past": {
          "one": "{0} min. ago",
          "other": "{0} min. ago"
        }
      }
    },
    "second": {
      "displayName": "second",
      "relative": {
        "0": "now"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} second",
          "other": "in {0} seconds"
        },
        "past": {
          "one": "{0} second ago",
          "other": "{0} seconds ago"
        }
      }
    },
    "second-short": {
      "displayName": "sec.",
      "relative": {
        "0": "now"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} sec.",
          "other": "in {0} sec."
        },
        "past": {
          "one": "{0} sec. ago",
          "other": "{0} sec. ago"
        }
      }
    }
  }
};
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

function addLocaleData() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var locales = Array.isArray(data) ? data : [data];
  locales.forEach(function (localeData) {
    if (localeData && localeData.locale) {
      intlMessageformat.__addLocaleData(localeData);

      intlRelativeformat.__addLocaleData(localeData);
    }
  });
}

function hasLocaleData(locale) {
  var localeParts = (locale || '').split('-');

  while (localeParts.length > 0) {
    if (hasIMFAndIRFLocaleData(localeParts.join('-'))) {
      return true;
    }

    localeParts.pop();
  }

  return false;
}

function hasIMFAndIRFLocaleData(locale) {
  var normalizedLocale = locale && locale.toLowerCase();
  return !!(intlMessageformat.__localeData__[normalizedLocale] && intlRelativeformat.__localeData__[normalizedLocale]);
}

var _typeof = typeof Symbol === "function" && _typeof$1(Symbol.iterator) === "symbol" ? function (obj) {
  return _typeof$1(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof$1(obj);
};

var classCallCheck = function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof$1(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof$1(call) === "object" || typeof call === "function") ? call : self;
};

var toConsumableArray = function toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return Array.from(arr);
  }
};
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */


var bool = propTypes.bool;
var number = propTypes.number;
var string = propTypes.string;
var func = propTypes.func;
var object = propTypes.object;
var oneOf = propTypes.oneOf;
var shape = propTypes.shape;
var any = propTypes.any;
var oneOfType = propTypes.oneOfType;
var localeMatcher = oneOf(['best fit', 'lookup']);
var narrowShortLong = oneOf(['narrow', 'short', 'long']);
var numeric2digit = oneOf(['numeric', '2-digit']);
var funcReq = func.isRequired;
var intlConfigPropTypes = {
  locale: string,
  timeZone: string,
  formats: object,
  messages: object,
  textComponent: any,
  defaultLocale: string,
  defaultFormats: object,
  onError: func
};
var intlFormatPropTypes = {
  formatDate: funcReq,
  formatTime: funcReq,
  formatRelative: funcReq,
  formatNumber: funcReq,
  formatPlural: funcReq,
  formatMessage: funcReq,
  formatHTMLMessage: funcReq
};
var intlShape = shape(_extends({}, intlConfigPropTypes, intlFormatPropTypes, {
  formatters: object,
  now: funcReq
}));
var messageDescriptorPropTypes = {
  id: string.isRequired,
  description: oneOfType([string, object]),
  defaultMessage: string
};
var dateTimeFormatPropTypes = {
  localeMatcher: localeMatcher,
  formatMatcher: oneOf(['basic', 'best fit']),
  timeZone: string,
  hour12: bool,
  weekday: narrowShortLong,
  era: narrowShortLong,
  year: numeric2digit,
  month: oneOf(['numeric', '2-digit', 'narrow', 'short', 'long']),
  day: numeric2digit,
  hour: numeric2digit,
  minute: numeric2digit,
  second: numeric2digit,
  timeZoneName: oneOf(['short', 'long'])
};
var numberFormatPropTypes = {
  localeMatcher: localeMatcher,
  style: oneOf(['decimal', 'currency', 'percent']),
  currency: string,
  currencyDisplay: oneOf(['symbol', 'code', 'name']),
  useGrouping: bool,
  minimumIntegerDigits: number,
  minimumFractionDigits: number,
  maximumFractionDigits: number,
  minimumSignificantDigits: number,
  maximumSignificantDigits: number
};
var relativeFormatPropTypes = {
  style: oneOf(['best fit', 'numeric']),
  units: oneOf(['second', 'minute', 'hour', 'day', 'month', 'year', 'second-short', 'minute-short', 'hour-short', 'day-short', 'month-short', 'year-short'])
};
var pluralFormatPropTypes = {
  style: oneOf(['cardinal', 'ordinal'])
};
/*
HTML escaping and shallow-equals implementations are the same as React's
(on purpose.) Therefore, it has the following Copyright and Licensing:

Copyright 2013-2014, Facebook, Inc.
All rights reserved.

This source code is licensed under the BSD-style license found in the LICENSE
file in the root directory of React's source tree.
*/

var intlConfigPropNames = Object.keys(intlConfigPropTypes);
var ESCAPED_CHARS = {
  '&': '&amp;',
  '>': '&gt;',
  '<': '&lt;',
  '"': '&quot;',
  "'": '&#x27;'
};
var UNSAFE_CHARS_REGEX = /[&><"']/g;

function escape(str) {
  return ('' + str).replace(UNSAFE_CHARS_REGEX, function (match) {
    return ESCAPED_CHARS[match];
  });
}

function filterProps(props, whitelist) {
  var defaults$$1 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return whitelist.reduce(function (filtered, name) {
    if (props.hasOwnProperty(name)) {
      filtered[name] = props[name];
    } else if (defaults$$1.hasOwnProperty(name)) {
      filtered[name] = defaults$$1[name];
    }

    return filtered;
  }, {});
}

function invariantIntlContext() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      intl = _ref.intl;

  browser(intl, '[React Intl] Could not find required `intl` object. ' + '<IntlProvider> needs to exist in the component ancestry.');
}

function shallowEquals(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  } // Test for A's keys different from B.


  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

function shouldIntlComponentUpdate(_ref2, nextProps, nextState) {
  var props = _ref2.props,
      state = _ref2.state,
      _ref2$context = _ref2.context,
      context = _ref2$context === undefined ? {} : _ref2$context;
  var nextContext = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _context$intl = context.intl,
      intl = _context$intl === undefined ? {} : _context$intl;
  var _nextContext$intl = nextContext.intl,
      nextIntl = _nextContext$intl === undefined ? {} : _nextContext$intl;
  return !shallowEquals(nextProps, props) || !shallowEquals(nextState, state) || !(nextIntl === intl || shallowEquals(filterProps(nextIntl, intlConfigPropNames), filterProps(intl, intlConfigPropNames)));
}

function createError(message, exception) {
  var eMsg = exception ? '\n' + exception : '';
  return '[React Intl] ' + message + eMsg;
}

function defaultErrorHandler(error) {
  {
    console.error(error);
  }
}
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
// This is a "hack" until a proper `intl-pluralformat` package is created.


function resolveLocale(locales) {
  // IntlMessageFormat#_resolveLocale() does not depend on `this`.
  return intlMessageformat.prototype._resolveLocale(locales);
}

function findPluralFunction(locale) {
  // IntlMessageFormat#_findPluralFunction() does not depend on `this`.
  return intlMessageformat.prototype._findPluralRuleFunction(locale);
}

var IntlPluralFormat = function IntlPluralFormat(locales) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  classCallCheck(this, IntlPluralFormat);
  var useOrdinal = options.style === 'ordinal';
  var pluralFn = findPluralFunction(resolveLocale(locales));

  this.format = function (value) {
    return pluralFn(value, useOrdinal);
  };
};
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */


var DATE_TIME_FORMAT_OPTIONS = Object.keys(dateTimeFormatPropTypes);
var NUMBER_FORMAT_OPTIONS = Object.keys(numberFormatPropTypes);
var RELATIVE_FORMAT_OPTIONS = Object.keys(relativeFormatPropTypes);
var PLURAL_FORMAT_OPTIONS = Object.keys(pluralFormatPropTypes);
var RELATIVE_FORMAT_THRESHOLDS = {
  second: 60,
  // seconds to minute
  minute: 60,
  // minutes to hour
  hour: 24,
  // hours to day
  day: 30,
  // days to month
  month: 12
};

function updateRelativeFormatThresholds(newThresholds) {
  var thresholds = intlRelativeformat.thresholds;
  thresholds.second = newThresholds.second;
  thresholds.minute = newThresholds.minute;
  thresholds.hour = newThresholds.hour;
  thresholds.day = newThresholds.day;
  thresholds.month = newThresholds.month;
  thresholds['second-short'] = newThresholds['second-short'];
  thresholds['minute-short'] = newThresholds['minute-short'];
  thresholds['hour-short'] = newThresholds['hour-short'];
  thresholds['day-short'] = newThresholds['day-short'];
  thresholds['month-short'] = newThresholds['month-short'];
}

function getNamedFormat(formats, type, name, onError) {
  var format = formats && formats[type] && formats[type][name];

  if (format) {
    return format;
  }

  onError(createError('No ' + type + ' format named: ' + name));
}

function formatDate(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats,
      timeZone = config.timeZone;
  var format = options.format;
  var onError = config.onError || defaultErrorHandler;
  var date = new Date(value);

  var defaults$$1 = _extends({}, timeZone && {
    timeZone: timeZone
  }, format && getNamedFormat(formats, 'date', format, onError));

  var filteredOptions = filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults$$1);

  try {
    return state.getDateTimeFormat(locale, filteredOptions).format(date);
  } catch (e) {
    onError(createError('Error formatting date.', e));
  }

  return String(date);
}

function formatTime(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats,
      timeZone = config.timeZone;
  var format = options.format;
  var onError = config.onError || defaultErrorHandler;
  var date = new Date(value);

  var defaults$$1 = _extends({}, timeZone && {
    timeZone: timeZone
  }, format && getNamedFormat(formats, 'time', format, onError));

  var filteredOptions = filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults$$1);

  if (!filteredOptions.hour && !filteredOptions.minute && !filteredOptions.second) {
    // Add default formatting options if hour, minute, or second isn't defined.
    filteredOptions = _extends({}, filteredOptions, {
      hour: 'numeric',
      minute: 'numeric'
    });
  }

  try {
    return state.getDateTimeFormat(locale, filteredOptions).format(date);
  } catch (e) {
    onError(createError('Error formatting time.', e));
  }

  return String(date);
}

function formatRelative(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats;
  var format = options.format;
  var onError = config.onError || defaultErrorHandler;
  var date = new Date(value);
  var now = new Date(options.now);
  var defaults$$1 = format && getNamedFormat(formats, 'relative', format, onError);
  var filteredOptions = filterProps(options, RELATIVE_FORMAT_OPTIONS, defaults$$1); // Capture the current threshold values, then temporarily override them with
  // specific values just for this render.

  var oldThresholds = _extends({}, intlRelativeformat.thresholds);

  updateRelativeFormatThresholds(RELATIVE_FORMAT_THRESHOLDS);

  try {
    return state.getRelativeFormat(locale, filteredOptions).format(date, {
      now: isFinite(now) ? now : state.now()
    });
  } catch (e) {
    onError(createError('Error formatting relative time.', e));
  } finally {
    updateRelativeFormatThresholds(oldThresholds);
  }

  return String(date);
}

function formatNumber(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats;
  var format = options.format;
  var onError = config.onError || defaultErrorHandler;
  var defaults$$1 = format && getNamedFormat(formats, 'number', format, onError);
  var filteredOptions = filterProps(options, NUMBER_FORMAT_OPTIONS, defaults$$1);

  try {
    return state.getNumberFormat(locale, filteredOptions).format(value);
  } catch (e) {
    onError(createError('Error formatting number.', e));
  }

  return String(value);
}

function formatPlural(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale;
  var filteredOptions = filterProps(options, PLURAL_FORMAT_OPTIONS);
  var onError = config.onError || defaultErrorHandler;

  try {
    return state.getPluralFormat(locale, filteredOptions).format(value);
  } catch (e) {
    onError(createError('Error formatting plural.', e));
  }

  return 'other';
}

function formatMessage$2(config, state) {
  var messageDescriptor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var values = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats,
      messages = config.messages,
      defaultLocale = config.defaultLocale,
      defaultFormats = config.defaultFormats;
  var id = messageDescriptor.id,
      defaultMessage = messageDescriptor.defaultMessage; // Produce a better error if the user calls `intl.formatMessage(element)`

  {
    browser(! /*#__PURE__*/react.isValidElement(config), '[React Intl] Don\'t pass React elements to ' + 'formatMessage(), pass `.props`.');
  } // `id` is a required field of a Message Descriptor.


  browser(id, '[React Intl] An `id` must be provided to format a message.');
  var message = messages && messages[id];
  var hasValues = Object.keys(values).length > 0; // Avoid expensive message formatting for simple messages without values. In
  // development messages will always be formatted in case of missing values.

  if (!hasValues && process.env.NODE_ENV === 'production') {
    return message || defaultMessage || id;
  }

  var formattedMessage = void 0;
  var onError = config.onError || defaultErrorHandler;

  if (message) {
    try {
      var formatter = state.getMessageFormat(message, locale, formats);
      formattedMessage = formatter.format(values);
    } catch (e) {
      onError(createError('Error formatting message: "' + id + '" for locale: "' + locale + '"' + (defaultMessage ? ', using default message as fallback.' : ''), e));
    }
  } else {
    // This prevents warnings from littering the console in development
    // when no `messages` are passed into the <IntlProvider> for the
    // default locale, and a default message is in the source.
    if (!defaultMessage || locale && locale.toLowerCase() !== defaultLocale.toLowerCase()) {
      onError(createError('Missing message: "' + id + '" for locale: "' + locale + '"' + (defaultMessage ? ', using default message as fallback.' : '')));
    }
  }

  if (!formattedMessage && defaultMessage) {
    try {
      var _formatter = state.getMessageFormat(defaultMessage, defaultLocale, defaultFormats);

      formattedMessage = _formatter.format(values);
    } catch (e) {
      onError(createError('Error formatting the default message for: "' + id + '"', e));
    }
  }

  if (!formattedMessage) {
    onError(createError('Cannot format message: "' + id + '", ' + ('using message ' + (message || defaultMessage ? 'source' : 'id') + ' as fallback.')));
  }

  return formattedMessage || message || defaultMessage || id;
}

function formatHTMLMessage(config, state, messageDescriptor) {
  var rawValues = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {}; // Process all the values before they are used when formatting the ICU
  // Message string. Since the formatted message might be injected via
  // `innerHTML`, all String-based values need to be HTML-escaped.

  var escapedValues = Object.keys(rawValues).reduce(function (escaped, name) {
    var value = rawValues[name];
    escaped[name] = typeof value === 'string' ? escape(value) : value;
    return escaped;
  }, {});
  return formatMessage$2(config, state, messageDescriptor, escapedValues);
}

var format = Object.freeze({
  formatDate: formatDate,
  formatTime: formatTime,
  formatRelative: formatRelative,
  formatNumber: formatNumber,
  formatPlural: formatPlural,
  formatMessage: formatMessage$2,
  formatHTMLMessage: formatHTMLMessage
});
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var intlConfigPropNames$1 = Object.keys(intlConfigPropTypes);
var intlFormatPropNames = Object.keys(intlFormatPropTypes); // These are not a static property on the `IntlProvider` class so the intl
// config values can be inherited from an <IntlProvider> ancestor.

var defaultProps = {
  formats: {},
  messages: {},
  timeZone: null,
  textComponent: 'span',
  defaultLocale: 'en',
  defaultFormats: {},
  onError: defaultErrorHandler
};

var IntlProvider = function (_Component) {
  inherits(IntlProvider, _Component);

  function IntlProvider(props) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, IntlProvider);

    var _this = possibleConstructorReturn(this, (IntlProvider.__proto__ || Object.getPrototypeOf(IntlProvider)).call(this, props, context));

    browser(typeof Intl !== 'undefined', '[React Intl] The `Intl` APIs must be available in the runtime, ' + 'and do not appear to be built-in. An `Intl` polyfill should be loaded.\n' + 'See: http://formatjs.io/guides/runtime-environments/');
    var intlContext = context.intl; // Used to stabilize time when performing an initial rendering so that
    // all relative times use the same reference "now" time.

    var initialNow = void 0;

    if (isFinite(props.initialNow)) {
      initialNow = Number(props.initialNow);
    } else {
      // When an `initialNow` isn't provided via `props`, look to see an
      // <IntlProvider> exists in the ancestry and call its `now()`
      // function to propagate its value for "now".
      initialNow = intlContext ? intlContext.now() : Date.now();
    } // Creating `Intl*` formatters is expensive. If there's a parent
    // `<IntlProvider>`, then its formatters will be used. Otherwise, this
    // memoize the `Intl*` constructors and cache them for the lifecycle of
    // this IntlProvider instance.


    var _ref = intlContext || {},
        _ref$formatters = _ref.formatters,
        formatters = _ref$formatters === undefined ? {
      getDateTimeFormat: memoizeFormatConstructor(Intl.DateTimeFormat),
      getNumberFormat: memoizeFormatConstructor(Intl.NumberFormat),
      getMessageFormat: memoizeFormatConstructor(intlMessageformat),
      getRelativeFormat: memoizeFormatConstructor(intlRelativeformat),
      getPluralFormat: memoizeFormatConstructor(IntlPluralFormat)
    } : _ref$formatters;

    _this.state = _extends({}, formatters, {
      // Wrapper to provide stable "now" time for initial render.
      now: function now() {
        return _this._didDisplay ? Date.now() : initialNow;
      }
    });
    return _this;
  }

  createClass(IntlProvider, [{
    key: 'getConfig',
    value: function getConfig() {
      var intlContext = this.context.intl; // Build a whitelisted config object from `props`, defaults, and
      // `context.intl`, if an <IntlProvider> exists in the ancestry.

      var config = filterProps(this.props, intlConfigPropNames$1, intlContext); // Apply default props. This must be applied last after the props have
      // been resolved and inherited from any <IntlProvider> in the ancestry.
      // This matches how React resolves `defaultProps`.

      for (var propName in defaultProps) {
        if (config[propName] === undefined) {
          config[propName] = defaultProps[propName];
        }
      }

      if (!hasLocaleData(config.locale)) {
        var _config = config,
            locale = _config.locale,
            defaultLocale = _config.defaultLocale,
            defaultFormats = _config.defaultFormats,
            onError = _config.onError;
        onError(createError('Missing locale data for locale: "' + locale + '". ' + ('Using default locale: "' + defaultLocale + '" as fallback.'))); // Since there's no registered locale data for `locale`, this will
        // fallback to the `defaultLocale` to make sure things can render.
        // The `messages` are overridden to the `defaultProps` empty object
        // to maintain referential equality across re-renders. It's assumed
        // each <FormattedMessage> contains a `defaultMessage` prop.

        config = _extends({}, config, {
          locale: defaultLocale,
          formats: defaultFormats,
          messages: defaultProps.messages
        });
      }

      return config;
    }
  }, {
    key: 'getBoundFormatFns',
    value: function getBoundFormatFns(config, state) {
      return intlFormatPropNames.reduce(function (boundFormatFns, name) {
        boundFormatFns[name] = format[name].bind(null, config, state);
        return boundFormatFns;
      }, {});
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      var config = this.getConfig(); // Bind intl factories and current config to the format functions.

      var boundFormatFns = this.getBoundFormatFns(config, this.state);
      var _state = this.state,
          now = _state.now,
          formatters = objectWithoutProperties(_state, ['now']);
      return {
        intl: _extends({}, config, boundFormatFns, {
          formatters: formatters,
          now: now
        })
      };
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._didDisplay = true;
    }
  }, {
    key: 'render',
    value: function render() {
      return react.Children.only(this.props.children);
    }
  }]);
  return IntlProvider;
}(react.Component);

IntlProvider.displayName = 'IntlProvider';
IntlProvider.contextTypes = {
  intl: intlShape
};
IntlProvider.childContextTypes = {
  intl: intlShape.isRequired
};
IntlProvider.propTypes = _extends({}, intlConfigPropTypes, {
  children: propTypes.element.isRequired,
  initialNow: propTypes.any
}) ;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedDate = function (_Component) {
  inherits(FormattedDate, _Component);

  function FormattedDate(props, context) {
    classCallCheck(this, FormattedDate);

    var _this = possibleConstructorReturn(this, (FormattedDate.__proto__ || Object.getPrototypeOf(FormattedDate)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedDate, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatDate = _context$intl.formatDate,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;
      var formattedDate = formatDate(value, this.props);

      if (typeof children === 'function') {
        return children(formattedDate);
      }

      return /*#__PURE__*/react.createElement(Text, null, formattedDate);
    }
  }]);
  return FormattedDate;
}(react.Component);

FormattedDate.displayName = 'FormattedDate';
FormattedDate.contextTypes = {
  intl: intlShape
};
FormattedDate.propTypes = _extends({}, dateTimeFormatPropTypes, {
  value: propTypes.any.isRequired,
  format: propTypes.string,
  children: propTypes.func
}) ;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedTime = function (_Component) {
  inherits(FormattedTime, _Component);

  function FormattedTime(props, context) {
    classCallCheck(this, FormattedTime);

    var _this = possibleConstructorReturn(this, (FormattedTime.__proto__ || Object.getPrototypeOf(FormattedTime)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedTime, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatTime = _context$intl.formatTime,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;
      var formattedTime = formatTime(value, this.props);

      if (typeof children === 'function') {
        return children(formattedTime);
      }

      return /*#__PURE__*/react.createElement(Text, null, formattedTime);
    }
  }]);
  return FormattedTime;
}(react.Component);

FormattedTime.displayName = 'FormattedTime';
FormattedTime.contextTypes = {
  intl: intlShape
};
FormattedTime.propTypes = _extends({}, dateTimeFormatPropTypes, {
  value: propTypes.any.isRequired,
  format: propTypes.string,
  children: propTypes.func
}) ;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var SECOND = 1000;
var MINUTE = 1000 * 60;
var HOUR = 1000 * 60 * 60;
var DAY = 1000 * 60 * 60 * 24; // The maximum timer delay value is a 32-bit signed integer.
// See: https://mdn.io/setTimeout

var MAX_TIMER_DELAY = 2147483647;

function selectUnits(delta) {
  var absDelta = Math.abs(delta);

  if (absDelta < MINUTE) {
    return 'second';
  }

  if (absDelta < HOUR) {
    return 'minute';
  }

  if (absDelta < DAY) {
    return 'hour';
  } // The maximum scheduled delay will be measured in days since the maximum
  // timer delay is less than the number of milliseconds in 25 days.


  return 'day';
}

function getUnitDelay(units) {
  switch (units) {
    case 'second':
      return SECOND;

    case 'minute':
      return MINUTE;

    case 'hour':
      return HOUR;

    case 'day':
      return DAY;

    default:
      return MAX_TIMER_DELAY;
  }
}

function isSameDate(a, b) {
  if (a === b) {
    return true;
  }

  var aTime = new Date(a).getTime();
  var bTime = new Date(b).getTime();
  return isFinite(aTime) && isFinite(bTime) && aTime === bTime;
}

var FormattedRelative = function (_Component) {
  inherits(FormattedRelative, _Component);

  function FormattedRelative(props, context) {
    classCallCheck(this, FormattedRelative);

    var _this = possibleConstructorReturn(this, (FormattedRelative.__proto__ || Object.getPrototypeOf(FormattedRelative)).call(this, props, context));

    invariantIntlContext(context);
    var now = isFinite(props.initialNow) ? Number(props.initialNow) : context.intl.now(); // `now` is stored as state so that `render()` remains a function of
    // props + state, instead of accessing `Date.now()` inside `render()`.

    _this.state = {
      now: now
    };
    return _this;
  }

  createClass(FormattedRelative, [{
    key: 'scheduleNextUpdate',
    value: function scheduleNextUpdate(props, state) {
      var _this2 = this; // Cancel and pending update because we're scheduling a new update.


      clearTimeout(this._timer);
      var value = props.value,
          units = props.units,
          updateInterval = props.updateInterval;
      var time = new Date(value).getTime(); // If the `updateInterval` is falsy, including `0` or we don't have a
      // valid date, then auto updates have been turned off, so we bail and
      // skip scheduling an update.

      if (!updateInterval || !isFinite(time)) {
        return;
      }

      var delta = time - state.now;
      var unitDelay = getUnitDelay(units || selectUnits(delta));
      var unitRemainder = Math.abs(delta % unitDelay); // We want the largest possible timer delay which will still display
      // accurate information while reducing unnecessary re-renders. The delay
      // should be until the next "interesting" moment, like a tick from
      // "1 minute ago" to "2 minutes ago" when the delta is 120,000ms.

      var delay = delta < 0 ? Math.max(updateInterval, unitDelay - unitRemainder) : Math.max(updateInterval, unitRemainder);
      this._timer = setTimeout(function () {
        _this2.setState({
          now: _this2.context.intl.now()
        });
      }, delay);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.scheduleNextUpdate(this.props, this.state);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var nextValue = _ref.value; // When the `props.value` date changes, `state.now` needs to be updated,
      // and the next update can be rescheduled.

      if (!isSameDate(nextValue, this.props.value)) {
        this.setState({
          now: this.context.intl.now()
        });
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      this.scheduleNextUpdate(nextProps, nextState);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this._timer);
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatRelative = _context$intl.formatRelative,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;
      var formattedRelative = formatRelative(value, _extends({}, this.props, this.state));

      if (typeof children === 'function') {
        return children(formattedRelative);
      }

      return /*#__PURE__*/react.createElement(Text, null, formattedRelative);
    }
  }]);
  return FormattedRelative;
}(react.Component);

FormattedRelative.displayName = 'FormattedRelative';
FormattedRelative.contextTypes = {
  intl: intlShape
};
FormattedRelative.defaultProps = {
  updateInterval: 1000 * 10
};
FormattedRelative.propTypes = _extends({}, relativeFormatPropTypes, {
  value: propTypes.any.isRequired,
  format: propTypes.string,
  updateInterval: propTypes.number,
  initialNow: propTypes.any,
  children: propTypes.func
}) ;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedNumber = function (_Component) {
  inherits(FormattedNumber, _Component);

  function FormattedNumber(props, context) {
    classCallCheck(this, FormattedNumber);

    var _this = possibleConstructorReturn(this, (FormattedNumber.__proto__ || Object.getPrototypeOf(FormattedNumber)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedNumber, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatNumber = _context$intl.formatNumber,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;
      var formattedNumber = formatNumber(value, this.props);

      if (typeof children === 'function') {
        return children(formattedNumber);
      }

      return /*#__PURE__*/react.createElement(Text, null, formattedNumber);
    }
  }]);
  return FormattedNumber;
}(react.Component);

FormattedNumber.displayName = 'FormattedNumber';
FormattedNumber.contextTypes = {
  intl: intlShape
};
FormattedNumber.propTypes = _extends({}, numberFormatPropTypes, {
  value: propTypes.any.isRequired,
  format: propTypes.string,
  children: propTypes.func
}) ;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedPlural = function (_Component) {
  inherits(FormattedPlural, _Component);

  function FormattedPlural(props, context) {
    classCallCheck(this, FormattedPlural);

    var _this = possibleConstructorReturn(this, (FormattedPlural.__proto__ || Object.getPrototypeOf(FormattedPlural)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedPlural, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatPlural = _context$intl.formatPlural,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          other = _props.other,
          children = _props.children;
      var pluralCategory = formatPlural(value, this.props);
      var formattedPlural = this.props[pluralCategory] || other;

      if (typeof children === 'function') {
        return children(formattedPlural);
      }

      return /*#__PURE__*/react.createElement(Text, null, formattedPlural);
    }
  }]);
  return FormattedPlural;
}(react.Component);

FormattedPlural.displayName = 'FormattedPlural';
FormattedPlural.contextTypes = {
  intl: intlShape
};
FormattedPlural.defaultProps = {
  style: 'cardinal'
};
FormattedPlural.propTypes = _extends({}, pluralFormatPropTypes, {
  value: propTypes.any.isRequired,
  other: propTypes.node.isRequired,
  zero: propTypes.node,
  one: propTypes.node,
  two: propTypes.node,
  few: propTypes.node,
  many: propTypes.node,
  children: propTypes.func
}) ;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var defaultFormatMessage = function defaultFormatMessage(descriptor, values) {
  {
    console.error('[React Intl] Could not find required `intl` object. <IntlProvider> needs to exist in the component ancestry. Using default message as fallback.');
  }

  return formatMessage$2({}, {
    getMessageFormat: memoizeFormatConstructor(intlMessageformat)
  }, descriptor, values);
};

var FormattedMessage = function (_Component) {
  inherits(FormattedMessage, _Component);

  function FormattedMessage(props, context) {
    classCallCheck(this, FormattedMessage);

    var _this = possibleConstructorReturn(this, (FormattedMessage.__proto__ || Object.getPrototypeOf(FormattedMessage)).call(this, props, context));

    if (!props.defaultMessage) {
      invariantIntlContext(context);
    }

    return _this;
  }

  createClass(FormattedMessage, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var values = this.props.values;
      var nextValues = nextProps.values;

      if (!shallowEquals(nextValues, values)) {
        return true;
      } // Since `values` has already been checked, we know they're not
      // different, so the current `values` are carried over so the shallow
      // equals comparison on the other props isn't affected by the `values`.


      var nextPropsToCheck = _extends({}, nextProps, {
        values: values
      });

      for (var _len = arguments.length, next = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        next[_key - 1] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this, nextPropsToCheck].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _ref = this.context.intl || {},
          _ref$formatMessage = _ref.formatMessage,
          formatMessage$$1 = _ref$formatMessage === undefined ? defaultFormatMessage : _ref$formatMessage,
          _ref$textComponent = _ref.textComponent,
          Text = _ref$textComponent === undefined ? 'span' : _ref$textComponent;

      var _props = this.props,
          id = _props.id,
          description = _props.description,
          defaultMessage = _props.defaultMessage,
          values = _props.values,
          _props$tagName = _props.tagName,
          Component$$1 = _props$tagName === undefined ? Text : _props$tagName,
          children = _props.children;
      var tokenDelimiter = void 0;
      var tokenizedValues = void 0;
      var elements = void 0;
      var hasValues = values && Object.keys(values).length > 0;

      if (hasValues) {
        // Creates a token with a random UID that should not be guessable or
        // conflict with other parts of the `message` string.
        var uid = Math.floor(Math.random() * 0x10000000000).toString(16);

        var generateToken = function () {
          var counter = 0;
          return function () {
            return 'ELEMENT-' + uid + '-' + (counter += 1);
          };
        }(); // Splitting with a delimiter to support IE8. When using a regex
        // with a capture group IE8 does not include the capture group in
        // the resulting array.


        tokenDelimiter = '@__' + uid + '__@';
        tokenizedValues = {};
        elements = {}; // Iterates over the `props` to keep track of any React Element
        // values so they can be represented by the `token` as a placeholder
        // when the `message` is formatted. This allows the formatted
        // message to then be broken-up into parts with references to the
        // React Elements inserted back in.

        Object.keys(values).forEach(function (name) {
          var value = values[name];

          if ( /*#__PURE__*/react.isValidElement(value)) {
            var token = generateToken();
            tokenizedValues[name] = tokenDelimiter + token + tokenDelimiter;
            elements[token] = value;
          } else {
            tokenizedValues[name] = value;
          }
        });
      }

      var descriptor = {
        id: id,
        description: description,
        defaultMessage: defaultMessage
      };
      var formattedMessage = formatMessage$$1(descriptor, tokenizedValues || values);
      var nodes = void 0;
      var hasElements = elements && Object.keys(elements).length > 0;

      if (hasElements) {
        // Split the message into parts so the React Element values captured
        // above can be inserted back into the rendered message. This
        // approach allows messages to render with React Elements while
        // keeping React's virtual diffing working properly.
        nodes = formattedMessage.split(tokenDelimiter).filter(function (part) {
          return !!part;
        }).map(function (part) {
          return elements[part] || part;
        });
      } else {
        nodes = [formattedMessage];
      }

      if (typeof children === 'function') {
        return children.apply(undefined, toConsumableArray(nodes));
      } // Needs to use `createElement()` instead of JSX, otherwise React will
      // warn about a missing `key` prop with rich-text message formatting.


      return react.createElement.apply(undefined, [Component$$1, null].concat(toConsumableArray(nodes)));
    }
  }]);
  return FormattedMessage;
}(react.Component);

FormattedMessage.displayName = 'FormattedMessage';
FormattedMessage.contextTypes = {
  intl: intlShape
};
FormattedMessage.defaultProps = {
  values: {}
};
FormattedMessage.propTypes = _extends({}, messageDescriptorPropTypes, {
  values: propTypes.object,
  tagName: propTypes.oneOfType([propTypes.string, propTypes.element]),
  children: propTypes.func
}) ;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedHTMLMessage = function (_Component) {
  inherits(FormattedHTMLMessage, _Component);

  function FormattedHTMLMessage(props, context) {
    classCallCheck(this, FormattedHTMLMessage);

    var _this = possibleConstructorReturn(this, (FormattedHTMLMessage.__proto__ || Object.getPrototypeOf(FormattedHTMLMessage)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedHTMLMessage, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var values = this.props.values;
      var nextValues = nextProps.values;

      if (!shallowEquals(nextValues, values)) {
        return true;
      } // Since `values` has already been checked, we know they're not
      // different, so the current `values` are carried over so the shallow
      // equals comparison on the other props isn't affected by the `values`.


      var nextPropsToCheck = _extends({}, nextProps, {
        values: values
      });

      for (var _len = arguments.length, next = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        next[_key - 1] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this, nextPropsToCheck].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatHTMLMessage = _context$intl.formatHTMLMessage,
          Text = _context$intl.textComponent;
      var _props = this.props,
          id = _props.id,
          description = _props.description,
          defaultMessage = _props.defaultMessage,
          rawValues = _props.values,
          _props$tagName = _props.tagName,
          Component$$1 = _props$tagName === undefined ? Text : _props$tagName,
          children = _props.children;
      var descriptor = {
        id: id,
        description: description,
        defaultMessage: defaultMessage
      };
      var formattedHTMLMessage = formatHTMLMessage(descriptor, rawValues);

      if (typeof children === 'function') {
        return children(formattedHTMLMessage);
      } // Since the message presumably has HTML in it, we need to set
      // `innerHTML` in order for it to be rendered and not escaped by React.
      // To be safe, all string prop values were escaped when formatting the
      // message. It is assumed that the message is not UGC, and came from the
      // developer making it more like a template.
      //
      // Note: There's a perf impact of using this component since there's no
      // way for React to do its virtual DOM diffing.


      var html = {
        __html: formattedHTMLMessage
      };
      return /*#__PURE__*/react.createElement(Component$$1, {
        dangerouslySetInnerHTML: html
      });
    }
  }]);
  return FormattedHTMLMessage;
}(react.Component);

FormattedHTMLMessage.displayName = 'FormattedHTMLMessage';
FormattedHTMLMessage.contextTypes = {
  intl: intlShape
};
FormattedHTMLMessage.defaultProps = {
  values: {}
};
FormattedHTMLMessage.propTypes = _extends({}, messageDescriptorPropTypes, {
  values: propTypes.object,
  tagName: propTypes.string,
  children: propTypes.func
}) ;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

addLocaleData(defaultLocaleData);
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

addLocaleData(allLocaleData);

var img$1 = "data:image/png;base64,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";

var img = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8' standalone='no'%3f%3e%3c!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3csvg width='100%25' height='100%25' viewBox='0 0 53 53' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xml:space='preserve' xmlns:serif='http://www.serif.com/' style='fill-rule:evenodd%3bclip-rule:evenodd%3bstroke-linejoin:round%3bstroke-miterlimit:2%3b'%3e%3crect id='%e3%82%a2%e3%83%bc%e3%83%88%e3%83%9c%e3%83%bc%e3%83%891' x='0' y='-0' width='52.083' height='52.056' style='fill:none%3b'/%3e%3cclipPath id='_clip1'%3e%3crect x='0' y='-0' width='52.083' height='52.056'/%3e%3c/clipPath%3e%3cg clip-path='url(%23_clip1)'%3e%3cg%3e%3cg%3e%3cpath d='M17.605%2c14.113c1.125%2c0.983 1.582%2c2.148 2.563%2c3.17c2.407%2c2.507 4.811%2c5.102 7.423%2c7.551c4.352%2c4.079 10.045%2c7.577 14.675%2c11.435' style='fill:none%3bstroke:white%3bstroke-width:19.17px%3bstroke-linecap:round%3bstroke-miterlimit:1.5%3b'/%3e%3cpath d='M40.824%2c11.292c-0.914%2c2.03 -3.668%2c3.898 -5.723%2c5.559c-2.684%2c2.171 -5.276%2c4.398 -7.941%2c6.581c-7.278%2c5.958 -12.955%2c12.359 -18.301%2c19.04' style='fill:none%3bstroke:white%3bstroke-width:19.17px%3bstroke-linecap:round%3bstroke-miterlimit:1.5%3b'/%3e%3c/g%3e%3cg%3e%3cpath d='M17.605%2c14.113c1.125%2c0.983 1.582%2c2.148 2.563%2c3.17c2.407%2c2.507 4.811%2c5.102 7.423%2c7.551c4.352%2c4.079 10.045%2c7.577 14.675%2c11.435' style='fill:none%3bstroke:%23f9a83a%3bstroke-width:12.5px%3bstroke-linecap:round%3bstroke-miterlimit:1.5%3b'/%3e%3cpath d='M40.824%2c11.292c-0.914%2c2.03 -3.668%2c3.898 -5.723%2c5.559c-2.684%2c2.171 -5.276%2c4.398 -7.941%2c6.581c-7.278%2c5.958 -12.955%2c12.359 -18.301%2c19.04' style='fill:none%3bstroke:%23f9a83a%3bstroke-width:12.5px%3bstroke-linecap:round%3bstroke-miterlimit:1.5%3b'/%3e%3c/g%3e%3cg%3e%3cpath d='M16.783%2c15.055c0.264%2c0.231 0.482%2c0.475 0.679%2c0.725c0.621%2c0.785 1.078%2c1.612 1.804%2c2.368c1.456%2c1.517 2.91%2c3.065 4.41%2c4.594c0.996%2c1.015 2.012%2c2.021 3.06%2c3.004c1.353%2c1.268 2.831%2c2.481 4.368%2c3.666c3.429%2c2.643 7.152%2c5.143 10.362%2c7.817c0.53%2c0.442 1.319%2c0.37 1.76%2c-0.16c0.442%2c-0.53 0.37%2c-1.319 -0.16%2c-1.76c-3.233%2c-2.694 -6.982%2c-5.215 -10.435%2c-7.877c-1.472%2c-1.135 -2.89%2c-2.296 -4.185%2c-3.51c-1.023%2c-0.959 -2.014%2c-1.941 -2.985%2c-2.931c-1.494%2c-1.522 -2.942%2c-3.064 -4.392%2c-4.574c-0.667%2c-0.695 -1.075%2c-1.465 -1.645%2c-2.187c-0.288%2c-0.365 -0.61%2c-0.72 -0.997%2c-1.058c-0.52%2c-0.454 -1.31%2c-0.4 -1.764%2c0.119c-0.453%2c0.52 -0.4%2c1.31 0.12%2c1.764Z' style='fill:white%3b'/%3e%3cpath d='M39.685%2c10.779c-0.331%2c0.733 -0.963%2c1.428 -1.694%2c2.108c-1.138%2c1.059 -2.52%2c2.058 -3.676%2c2.992l-7.947%2c6.585c-3.596%2c2.944 -6.805%2c5.995 -9.778%2c9.133c-3.104%2c3.276 -5.949%2c6.648 -8.707%2c10.094c-0.431%2c0.539 -0.343%2c1.326 0.195%2c1.757c0.539%2c0.431 1.326%2c0.344 1.757%2c-0.195c2.715%2c-3.392 5.515%2c-6.712 8.57%2c-9.937c2.903%2c-3.064 6.036%2c-6.043 9.547%2c-8.917l7.935%2c-6.576c1.418%2c-1.146 3.155%2c-2.393 4.43%2c-3.716c0.716%2c-0.743 1.293%2c-1.516 1.647%2c-2.301c0.283%2c-0.629 0.003%2c-1.37 -0.626%2c-1.653c-0.629%2c-0.284 -1.37%2c-0.003 -1.653%2c0.626Z' style='fill:white%3b'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e";

var translationMap = {
  'ja': {
    'gui.extension.xcratchExample.description': 'Xcratch 拡張の例'
  },
  'ja-Hira': {
    'gui.extension.xcratchExample.description': 'Xcratch (えくすくらっち)かくちょうのれい'
  }
};
var entry = {
  name: 'Xcratch Example',
  extensionId: 'xcratchExample',
  extensionURL: 'https://yokobond.github.io/xcratch-example/dist/xcratchExample.mjs',
  collaborator: 'Yengawa Lab',
  iconURL: img$1,
  insetIconURL: img,
  description: /*#__PURE__*/react.createElement(FormattedMessage, {
    defaultMessage: "example extension for Xcratch",
    description: "Description for example extension for Xcratch",
    id: "gui.extension.xcratchExample.description"
  }),
  featured: true,
  disabled: false,
  bluetoothRequired: false,
  internetConnectionRequired: true,
  helpLink: 'https://github.com/yokobond/xcratch-example/',
  translationMap: translationMap
};

/**
 * Types of block
 * @enum {string}
 */
var BlockType = {
  /**
   * Boolean reporter with hexagonal shape
   */
  BOOLEAN: 'Boolean',

  /**
   * A button (not an actual block) for some special action, like making a variable
   */
  BUTTON: 'button',

  /**
   * Command block
   */
  COMMAND: 'command',

  /**
   * Specialized command block which may or may not run a child branch
   * The thread continues with the next block whether or not a child branch ran.
   */
  CONDITIONAL: 'conditional',

  /**
   * Specialized hat block with no implementation function
   * This stack only runs if the corresponding event is emitted by other code.
   */
  EVENT: 'event',

  /**
   * Hat block which conditionally starts a block stack
   */
  HAT: 'hat',

  /**
   * Specialized command block which may or may not run a child branch
   * If a child branch runs, the thread evaluates the loop block again.
   */
  LOOP: 'loop',

  /**
   * General reporter with numeric or string value
   */
  REPORTER: 'reporter'
};
var blockType = BlockType;

/**
 * Block argument types
 * @enum {string}
 */
var ArgumentType = {
  /**
   * Numeric value with angle picker
   */
  ANGLE: 'angle',

  /**
   * Boolean value with hexagonal placeholder
   */
  BOOLEAN: 'Boolean',

  /**
   * Numeric value with color picker
   */
  COLOR: 'color',

  /**
   * Numeric value with text field
   */
  NUMBER: 'number',

  /**
   * String value with text field
   */
  STRING: 'string',

  /**
   * String value with matrix field
   */
  MATRIX: 'matrix',

  /**
   * MIDI note number with note picker (piano) field
   */
  NOTE: 'note',

  /**
   * Inline image on block (as part of the label)
   */
  IMAGE: 'image'
};
var argumentType = ArgumentType;

var formatMessageParse = createCommonjsModule(function (module, exports) {
  /*::
  export type AST = Element[]
  export type Element = string | Placeholder
  export type Placeholder = Plural | Styled | Typed | Simple
  export type Plural = [ string, 'plural' | 'selectordinal', number, SubMessages ]
  export type Styled = [ string, string, string | SubMessages ]
  export type Typed = [ string, string ]
  export type Simple = [ string ]
  export type SubMessages = { [string]: AST }
  export type Token = [ TokenType, string ]
  export type TokenType = 'text' | 'space' | 'id' | 'type' | 'style' | 'offset' | 'number' | 'selector' | 'syntax'
  type Context = {|
    pattern: string,
    index: number,
    tagsType: ?string,
    tokens: ?Token[]
  |}
  */

  var ARG_OPN = '{';
  var ARG_CLS = '}';
  var ARG_SEP = ',';
  var NUM_ARG = '#';
  var TAG_OPN = '<';
  var TAG_CLS = '>';
  var TAG_END = '</';
  var TAG_SELF_CLS = '/>';
  var ESC = '\'';
  var OFFSET = 'offset:';
  var simpleTypes = ['number', 'date', 'time', 'ordinal', 'duration', 'spellout'];
  var submTypes = ['plural', 'select', 'selectordinal'];
  /**
   * parse
   *
   * Turns this:
   *  `You have { numBananas, plural,
   *       =0 {no bananas}
   *      one {a banana}
   *    other {# bananas}
   *  } for sale`
   *
   * into this:
   *  [ "You have ", [ "numBananas", "plural", 0, {
   *       "=0": [ "no bananas" ],
   *      "one": [ "a banana" ],
   *    "other": [ [ '#' ], " bananas" ]
   *  } ], " for sale." ]
   *
   * tokens:
   *  [
   *    [ "text", "You have " ],
   *    [ "syntax", "{" ],
   *    [ "space", " " ],
   *    [ "id", "numBananas" ],
   *    [ "syntax", ", " ],
   *    [ "space", " " ],
   *    [ "type", "plural" ],
   *    [ "syntax", "," ],
   *    [ "space", "\n     " ],
   *    [ "selector", "=0" ],
   *    [ "space", " " ],
   *    [ "syntax", "{" ],
   *    [ "text", "no bananas" ],
   *    [ "syntax", "}" ],
   *    [ "space", "\n    " ],
   *    [ "selector", "one" ],
   *    [ "space", " " ],
   *    [ "syntax", "{" ],
   *    [ "text", "a banana" ],
   *    [ "syntax", "}" ],
   *    [ "space", "\n  " ],
   *    [ "selector", "other" ],
   *    [ "space", " " ],
   *    [ "syntax", "{" ],
   *    [ "syntax", "#" ],
   *    [ "text", " bananas" ],
   *    [ "syntax", "}" ],
   *    [ "space", "\n" ],
   *    [ "syntax", "}" ],
   *    [ "text", " for sale." ]
   *  ]
   **/

  exports = module.exports = function parse(pattern
  /*: string */
  , options
  /*:: ?: { tagsType?: string, tokens?: Token[] } */
  )
  /*: AST */
  {
    return parseAST({
      pattern: String(pattern),
      index: 0,
      tagsType: options && options.tagsType || null,
      tokens: options && options.tokens || null
    }, '');
  };

  function parseAST(current
  /*: Context */
  , parentType
  /*: string */
  )
  /*: AST */
  {
    var pattern = current.pattern;
    var length = pattern.length;
    var elements
    /*: AST */
    = [];
    var start = current.index;
    var text = parseText(current, parentType);
    if (text) elements.push(text);
    if (text && current.tokens) current.tokens.push(['text', pattern.slice(start, current.index)]);

    while (current.index < length) {
      if (pattern[current.index] === ARG_CLS) {
        if (!parentType) throw expected(current);
        break;
      }

      if (parentType && current.tagsType && pattern.slice(current.index, current.index + TAG_END.length) === TAG_END) break;
      elements.push(parsePlaceholder(current));
      start = current.index;
      text = parseText(current, parentType);
      if (text) elements.push(text);
      if (text && current.tokens) current.tokens.push(['text', pattern.slice(start, current.index)]);
    }

    return elements;
  }

  function parseText(current
  /*: Context */
  , parentType
  /*: string */
  )
  /*: string */
  {
    var pattern = current.pattern;
    var length = pattern.length;
    var isHashSpecial = parentType === 'plural' || parentType === 'selectordinal';
    var isAngleSpecial = !!current.tagsType;
    var isArgStyle = parentType === '{style}';
    var text = '';

    while (current.index < length) {
      var char = pattern[current.index];

      if (char === ARG_OPN || char === ARG_CLS || isHashSpecial && char === NUM_ARG || isAngleSpecial && char === TAG_OPN || isArgStyle && isWhitespace(char.charCodeAt(0))) {
        break;
      } else if (char === ESC) {
        char = pattern[++current.index];

        if (char === ESC) {
          // double is always 1 '
          text += char;
          ++current.index;
        } else if ( // only when necessary
        char === ARG_OPN || char === ARG_CLS || isHashSpecial && char === NUM_ARG || isAngleSpecial && char === TAG_OPN || isArgStyle) {
          text += char;

          while (++current.index < length) {
            char = pattern[current.index];

            if (char === ESC && pattern[current.index + 1] === ESC) {
              // double is always 1 '
              text += ESC;
              ++current.index;
            } else if (char === ESC) {
              // end of quoted
              ++current.index;
              break;
            } else {
              text += char;
            }
          }
        } else {
          // lone ' is just a '
          text += ESC; // already incremented
        }
      } else {
        text += char;
        ++current.index;
      }
    }

    return text;
  }

  function isWhitespace(code
  /*: number */
  )
  /*: boolean */
  {
    return code >= 0x09 && code <= 0x0D || code === 0x20 || code === 0x85 || code === 0xA0 || code === 0x180E || code >= 0x2000 && code <= 0x200D || code === 0x2028 || code === 0x2029 || code === 0x202F || code === 0x205F || code === 0x2060 || code === 0x3000 || code === 0xFEFF;
  }

  function skipWhitespace(current
  /*: Context */
  )
  /*: void */
  {
    var pattern = current.pattern;
    var length = pattern.length;
    var start = current.index;

    while (current.index < length && isWhitespace(pattern.charCodeAt(current.index))) {
      ++current.index;
    }

    if (start < current.index && current.tokens) {
      current.tokens.push(['space', current.pattern.slice(start, current.index)]);
    }
  }

  function parsePlaceholder(current
  /*: Context */
  )
  /*: Placeholder */
  {
    var pattern = current.pattern;

    if (pattern[current.index] === NUM_ARG) {
      if (current.tokens) current.tokens.push(['syntax', NUM_ARG]);
      ++current.index; // move passed #

      return [NUM_ARG];
    }

    var tag = parseTag(current);
    if (tag) return tag;
    /* istanbul ignore if should be unreachable if parseAST and parseText are right */

    if (pattern[current.index] !== ARG_OPN) throw expected(current, ARG_OPN);
    if (current.tokens) current.tokens.push(['syntax', ARG_OPN]);
    ++current.index; // move passed {

    skipWhitespace(current);
    var id = parseId(current);
    if (!id) throw expected(current, 'placeholder id');
    if (current.tokens) current.tokens.push(['id', id]);
    skipWhitespace(current);
    var char = pattern[current.index];

    if (char === ARG_CLS) {
      // end placeholder
      if (current.tokens) current.tokens.push(['syntax', ARG_CLS]);
      ++current.index; // move passed }

      return [id];
    }

    if (char !== ARG_SEP) throw expected(current, ARG_SEP + ' or ' + ARG_CLS);
    if (current.tokens) current.tokens.push(['syntax', ARG_SEP]);
    ++current.index; // move passed ,

    skipWhitespace(current);
    var type = parseId(current);
    if (!type) throw expected(current, 'placeholder type');
    if (current.tokens) current.tokens.push(['type', type]);
    skipWhitespace(current);
    char = pattern[current.index];

    if (char === ARG_CLS) {
      // end placeholder
      if (current.tokens) current.tokens.push(['syntax', ARG_CLS]);

      if (type === 'plural' || type === 'selectordinal' || type === 'select') {
        throw expected(current, type + ' sub-messages');
      }

      ++current.index; // move passed }

      return [id, type];
    }

    if (char !== ARG_SEP) throw expected(current, ARG_SEP + ' or ' + ARG_CLS);
    if (current.tokens) current.tokens.push(['syntax', ARG_SEP]);
    ++current.index; // move passed ,

    skipWhitespace(current);
    var arg;

    if (type === 'plural' || type === 'selectordinal') {
      var offset = parsePluralOffset(current);
      skipWhitespace(current);
      arg = [id, type, offset, parseSubMessages(current, type)];
    } else if (type === 'select') {
      arg = [id, type, parseSubMessages(current, type)];
    } else if (simpleTypes.indexOf(type) >= 0) {
      arg = [id, type, parseSimpleFormat(current)];
    } else {
      // custom placeholder type
      var index = current.index;
      var format
      /*: string | SubMessages */
      = parseSimpleFormat(current);
      skipWhitespace(current);

      if (pattern[current.index] === ARG_OPN) {
        current.index = index; // rewind, since should have been submessages

        format = parseSubMessages(current, type);
      }

      arg = [id, type, format];
    }

    skipWhitespace(current);
    if (pattern[current.index] !== ARG_CLS) throw expected(current, ARG_CLS);
    if (current.tokens) current.tokens.push(['syntax', ARG_CLS]);
    ++current.index; // move passed }

    return arg;
  }

  function parseTag(current
  /*: Context */
  )
  /*: ?Placeholder */
  {
    var tagsType = current.tagsType;
    if (!tagsType || current.pattern[current.index] !== TAG_OPN) return;

    if (current.pattern.slice(current.index, current.index + TAG_END.length) === TAG_END) {
      throw expected(current, null, 'closing tag without matching opening tag');
    }

    if (current.tokens) current.tokens.push(['syntax', TAG_OPN]);
    ++current.index; // move passed <

    var id = parseId(current, true);
    if (!id) throw expected(current, 'placeholder id');
    if (current.tokens) current.tokens.push(['id', id]);
    skipWhitespace(current);

    if (current.pattern.slice(current.index, current.index + TAG_SELF_CLS.length) === TAG_SELF_CLS) {
      if (current.tokens) current.tokens.push(['syntax', TAG_SELF_CLS]);
      current.index += TAG_SELF_CLS.length;
      return [id, tagsType];
    }

    if (current.pattern[current.index] !== TAG_CLS) throw expected(current, TAG_CLS);
    if (current.tokens) current.tokens.push(['syntax', TAG_CLS]);
    ++current.index; // move passed >

    var children = parseAST(current, tagsType);
    var end = current.index;
    if (current.pattern.slice(current.index, current.index + TAG_END.length) !== TAG_END) throw expected(current, TAG_END + id + TAG_CLS);
    if (current.tokens) current.tokens.push(['syntax', TAG_END]);
    current.index += TAG_END.length;
    var closeId = parseId(current, true);
    if (closeId && current.tokens) current.tokens.push(['id', closeId]);

    if (id !== closeId) {
      current.index = end; // rewind for better error message

      throw expected(current, TAG_END + id + TAG_CLS, TAG_END + closeId + TAG_CLS);
    }

    skipWhitespace(current);
    if (current.pattern[current.index] !== TAG_CLS) throw expected(current, TAG_CLS);
    if (current.tokens) current.tokens.push(['syntax', TAG_CLS]);
    ++current.index; // move passed >

    return [id, tagsType, {
      children: children
    }];
  }

  function parseId(current
  /*: Context */
  , isTag
  /*:: ?: boolean */
  )
  /*: string */
  {
    var pattern = current.pattern;
    var length = pattern.length;
    var id = '';

    while (current.index < length) {
      var char = pattern[current.index];
      if (char === ARG_OPN || char === ARG_CLS || char === ARG_SEP || char === NUM_ARG || char === ESC || isWhitespace(char.charCodeAt(0)) || isTag && (char === TAG_OPN || char === TAG_CLS || char === '/')) break;
      id += char;
      ++current.index;
    }

    return id;
  }

  function parseSimpleFormat(current
  /*: Context */
  )
  /*: string */
  {
    var start = current.index;
    var style = parseText(current, '{style}');
    if (!style) throw expected(current, 'placeholder style name');
    if (current.tokens) current.tokens.push(['style', current.pattern.slice(start, current.index)]);
    return style;
  }

  function parsePluralOffset(current
  /*: Context */
  )
  /*: number */
  {
    var pattern = current.pattern;
    var length = pattern.length;
    var offset = 0;

    if (pattern.slice(current.index, current.index + OFFSET.length) === OFFSET) {
      if (current.tokens) current.tokens.push(['offset', 'offset'], ['syntax', ':']);
      current.index += OFFSET.length; // move passed offset:

      skipWhitespace(current);
      var start = current.index;

      while (current.index < length && isDigit(pattern.charCodeAt(current.index))) {
        ++current.index;
      }

      if (start === current.index) throw expected(current, 'offset number');
      if (current.tokens) current.tokens.push(['number', pattern.slice(start, current.index)]);
      offset = +pattern.slice(start, current.index);
    }

    return offset;
  }

  function isDigit(code
  /*: number */
  )
  /*: boolean */
  {
    return code >= 0x30 && code <= 0x39;
  }

  function parseSubMessages(current
  /*: Context */
  , parentType
  /*: string */
  )
  /*: SubMessages */
  {
    var pattern = current.pattern;
    var length = pattern.length;
    var options
    /*: SubMessages */
    = {};

    while (current.index < length && pattern[current.index] !== ARG_CLS) {
      var selector = parseId(current);
      if (!selector) throw expected(current, 'sub-message selector');
      if (current.tokens) current.tokens.push(['selector', selector]);
      skipWhitespace(current);
      options[selector] = parseSubMessage(current, parentType);
      skipWhitespace(current);
    }

    if (!options.other && submTypes.indexOf(parentType) >= 0) {
      throw expected(current, null, null, '"other" sub-message must be specified in ' + parentType);
    }

    return options;
  }

  function parseSubMessage(current
  /*: Context */
  , parentType
  /*: string */
  )
  /*: AST */
  {
    if (current.pattern[current.index] !== ARG_OPN) throw expected(current, ARG_OPN + ' to start sub-message');
    if (current.tokens) current.tokens.push(['syntax', ARG_OPN]);
    ++current.index; // move passed {

    var message = parseAST(current, parentType);
    if (current.pattern[current.index] !== ARG_CLS) throw expected(current, ARG_CLS + ' to end sub-message');
    if (current.tokens) current.tokens.push(['syntax', ARG_CLS]);
    ++current.index; // move passed }

    return message;
  }

  function expected(current
  /*: Context */
  , expected
  /*:: ?: ?string */
  , found
  /*:: ?: ?string */
  , message
  /*:: ?: string */
  ) {
    var pattern = current.pattern;
    var lines = pattern.slice(0, current.index).split(/\r?\n/);
    var offset = current.index;
    var line = lines.length;
    var column = lines.slice(-1)[0].length;
    found = found || (current.index >= pattern.length ? 'end of message pattern' : parseId(current) || pattern[current.index]);
    if (!message) message = errorMessage(expected, found);
    message += ' in ' + pattern.replace(/\r?\n/g, '\n');
    return new SyntaxError(message, expected, found, offset, line, column);
  }

  function errorMessage(expected
  /*: ?string */
  , found
  /* string */
  ) {
    if (!expected) return 'Unexpected ' + found + ' found';
    return 'Expected ' + expected + ' but found ' + found;
  }
  /**
   * SyntaxError
   *  Holds information about bad syntax found in a message pattern
   **/


  function SyntaxError(message
  /*: string */
  , expected
  /*: ?string */
  , found
  /*: ?string */
  , offset
  /*: number */
  , line
  /*: number */
  , column
  /*: number */
  ) {
    Error.call(this, message);
    this.name = 'SyntaxError';
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.offset = offset;
    this.line = line;
    this.column = column;
  }

  SyntaxError.prototype = Object.create(Error.prototype);
  exports.SyntaxError = SyntaxError;
});

// @flow
var LONG$1 = 'long';
var SHORT$1 = 'short';
var NARROW$1 = 'narrow';
var NUMERIC$1 = 'numeric';
var TWODIGIT$1 = '2-digit';
/**
 * formatting information
 **/

var formatMessageFormats$1 = {
  number: {
    decimal: {
      style: 'decimal'
    },
    integer: {
      style: 'decimal',
      maximumFractionDigits: 0
    },
    currency: {
      style: 'currency',
      currency: 'USD'
    },
    percent: {
      style: 'percent'
    },
    default: {
      style: 'decimal'
    }
  },
  date: {
    short: {
      month: NUMERIC$1,
      day: NUMERIC$1,
      year: TWODIGIT$1
    },
    medium: {
      month: SHORT$1,
      day: NUMERIC$1,
      year: NUMERIC$1
    },
    long: {
      month: LONG$1,
      day: NUMERIC$1,
      year: NUMERIC$1
    },
    full: {
      month: LONG$1,
      day: NUMERIC$1,
      year: NUMERIC$1,
      weekday: LONG$1
    },
    default: {
      month: SHORT$1,
      day: NUMERIC$1,
      year: NUMERIC$1
    }
  },
  time: {
    short: {
      hour: NUMERIC$1,
      minute: NUMERIC$1
    },
    medium: {
      hour: NUMERIC$1,
      minute: NUMERIC$1,
      second: NUMERIC$1
    },
    long: {
      hour: NUMERIC$1,
      minute: NUMERIC$1,
      second: NUMERIC$1,
      timeZoneName: SHORT$1
    },
    full: {
      hour: NUMERIC$1,
      minute: NUMERIC$1,
      second: NUMERIC$1,
      timeZoneName: SHORT$1
    },
    default: {
      hour: NUMERIC$1,
      minute: NUMERIC$1,
      second: NUMERIC$1
    }
  },
  duration: {
    default: {
      hours: {
        minimumIntegerDigits: 1,
        maximumFractionDigits: 0
      },
      minutes: {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 0
      },
      seconds: {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 3
      }
    }
  },
  parseNumberPattern: function parseNumberPattern(pattern
  /*: ?string */
  ) {
    if (!pattern) return;
    var options = {};
    var currency = pattern.match(/\b[A-Z]{3}\b/i);
    var syms = pattern.replace(/[^¤]/g, '').length;
    if (!syms && currency) syms = 1;

    if (syms) {
      options.style = 'currency';
      options.currencyDisplay = syms === 1 ? 'symbol' : syms === 2 ? 'code' : 'name';
      options.currency = currency ? currency[0].toUpperCase() : 'USD';
    } else if (pattern.indexOf('%') >= 0) {
      options.style = 'percent';
    }

    if (!/[@#0]/.test(pattern)) return options.style ? options : undefined;
    options.useGrouping = pattern.indexOf(',') >= 0;

    if (/E\+?[@#0]+/i.test(pattern) || pattern.indexOf('@') >= 0) {
      var size = pattern.replace(/E\+?[@#0]+|[^@#0]/gi, '');
      options.minimumSignificantDigits = Math.min(Math.max(size.replace(/[^@0]/g, '').length, 1), 21);
      options.maximumSignificantDigits = Math.min(Math.max(size.length, 1), 21);
    } else {
      var parts = pattern.replace(/[^#0.]/g, '').split('.');
      var integer = parts[0];
      var n = integer.length - 1;

      while (integer[n] === '0') {
        --n;
      }

      options.minimumIntegerDigits = Math.min(Math.max(integer.length - 1 - n, 1), 21);
      var fraction = parts[1] || '';
      n = 0;

      while (fraction[n] === '0') {
        ++n;
      }

      options.minimumFractionDigits = Math.min(Math.max(n, 0), 20);

      while (fraction[n] === '#') {
        ++n;
      }

      options.maximumFractionDigits = Math.min(Math.max(n, 0), 20);
    }

    return options;
  },
  parseDatePattern: function parseDatePattern(pattern
  /*: ?string */
  ) {
    if (!pattern) return;
    var options = {};

    for (var i = 0; i < pattern.length;) {
      var current = pattern[i];
      var n = 1;

      while (pattern[++i] === current) {
        ++n;
      }

      switch (current) {
        case 'G':
          options.era = n === 5 ? NARROW$1 : n === 4 ? LONG$1 : SHORT$1;
          break;

        case 'y':
        case 'Y':
          options.year = n === 2 ? TWODIGIT$1 : NUMERIC$1;
          break;

        case 'M':
        case 'L':
          n = Math.min(Math.max(n - 1, 0), 4);
          options.month = [NUMERIC$1, TWODIGIT$1, SHORT$1, LONG$1, NARROW$1][n];
          break;

        case 'E':
        case 'e':
        case 'c':
          options.weekday = n === 5 ? NARROW$1 : n === 4 ? LONG$1 : SHORT$1;
          break;

        case 'd':
        case 'D':
          options.day = n === 2 ? TWODIGIT$1 : NUMERIC$1;
          break;

        case 'h':
        case 'K':
          options.hour12 = true;
          options.hour = n === 2 ? TWODIGIT$1 : NUMERIC$1;
          break;

        case 'H':
        case 'k':
          options.hour12 = false;
          options.hour = n === 2 ? TWODIGIT$1 : NUMERIC$1;
          break;

        case 'm':
          options.minute = n === 2 ? TWODIGIT$1 : NUMERIC$1;
          break;

        case 's':
        case 'S':
          options.second = n === 2 ? TWODIGIT$1 : NUMERIC$1;
          break;

        case 'z':
        case 'Z':
        case 'v':
        case 'V':
          options.timeZoneName = n === 1 ? SHORT$1 : LONG$1;
          break;
      }
    }

    return Object.keys(options).length ? options : undefined;
  }
};

// @flow
// "lookup" algorithm http://tools.ietf.org/html/rfc4647#section-3.4
// assumes normalized language tags, and matches in a case sensitive manner
var lookupClosestLocale$1 = function lookupClosestLocale(locale
/*: string | string[] | void */
, available
/*: { [string]: any } */
)
/*: ?string */
{
  if (typeof locale === 'string' && available[locale]) return locale;
  var locales = [].concat(locale || []);

  for (var l = 0, ll = locales.length; l < ll; ++l) {
    var current = locales[l].split('-');

    while (current.length) {
      var candidate = current.join('-');
      if (available[candidate]) return candidate;
      current.pop();
    }
  }
};

// @flow
/*:: export type Rule = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other' */

var zero = 'zero',
    one = 'one',
    two = 'two',
    few = 'few',
    many = 'many',
    other = 'other';
var f = [function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return 0 <= n && n <= 1 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var n = +s;
  return i === 0 || n === 1 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 0 ? zero : n === 1 ? one : n === 2 ? two : 3 <= n % 100 && n % 100 <= 10 ? few : 11 <= n % 100 && n % 100 <= 99 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  return i === 1 && v === 0 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n % 10 === 1 && n % 100 !== 11 ? one : 2 <= n % 10 && n % 10 <= 4 && (n % 100 < 12 || 14 < n % 100) ? few : n % 10 === 0 || 5 <= n % 10 && n % 10 <= 9 || 11 <= n % 100 && n % 100 <= 14 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n % 10 === 1 && n % 100 !== 11 && n % 100 !== 71 && n % 100 !== 91 ? one : n % 10 === 2 && n % 100 !== 12 && n % 100 !== 72 && n % 100 !== 92 ? two : (3 <= n % 10 && n % 10 <= 4 || n % 10 === 9) && (n % 100 < 10 || 19 < n % 100) && (n % 100 < 70 || 79 < n % 100) && (n % 100 < 90 || 99 < n % 100) ? few : n !== 0 && n % 1000000 === 0 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  var f = +(s + '.').split('.')[1];
  return v === 0 && i % 10 === 1 && i % 100 !== 11 || f % 10 === 1 && f % 100 !== 11 ? one : v === 0 && 2 <= i % 10 && i % 10 <= 4 && (i % 100 < 12 || 14 < i % 100) || 2 <= f % 10 && f % 10 <= 4 && (f % 100 < 12 || 14 < f % 100) ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  return i === 1 && v === 0 ? one : 2 <= i && i <= 4 && v === 0 ? few : v !== 0 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 0 ? zero : n === 1 ? one : n === 2 ? two : n === 3 ? few : n === 6 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var t = +('' + s).replace(/^[^.]*.?|0+$/g, '');
  var n = +s;
  return n === 1 || t !== 0 && (i === 0 || i === 1) ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  var f = +(s + '.').split('.')[1];
  return v === 0 && i % 100 === 1 || f % 100 === 1 ? one : v === 0 && i % 100 === 2 || f % 100 === 2 ? two : v === 0 && 3 <= i % 100 && i % 100 <= 4 || 3 <= f % 100 && f % 100 <= 4 ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  return i === 0 || i === 1 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  var f = +(s + '.').split('.')[1];
  return v === 0 && (i === 1 || i === 2 || i === 3) || v === 0 && i % 10 !== 4 && i % 10 !== 6 && i % 10 !== 9 || v !== 0 && f % 10 !== 4 && f % 10 !== 6 && f % 10 !== 9 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 ? one : n === 2 ? two : 3 <= n && n <= 6 ? few : 7 <= n && n <= 10 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 || n === 11 ? one : n === 2 || n === 12 ? two : 3 <= n && n <= 10 || 13 <= n && n <= 19 ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  return v === 0 && i % 10 === 1 ? one : v === 0 && i % 10 === 2 ? two : v === 0 && (i % 100 === 0 || i % 100 === 20 || i % 100 === 40 || i % 100 === 60 || i % 100 === 80) ? few : v !== 0 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  var n = +s;
  return i === 1 && v === 0 ? one : i === 2 && v === 0 ? two : v === 0 && (n < 0 || 10 < n) && n % 10 === 0 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var t = +('' + s).replace(/^[^.]*.?|0+$/g, '');
  return t === 0 && i % 10 === 1 && i % 100 !== 11 || t !== 0 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 ? one : n === 2 ? two : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 0 ? zero : n === 1 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var n = +s;
  return n === 0 ? zero : (i === 0 || i === 1) && n !== 0 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var f = +(s + '.').split('.')[1];
  var n = +s;
  return n % 10 === 1 && (n % 100 < 11 || 19 < n % 100) ? one : 2 <= n % 10 && n % 10 <= 9 && (n % 100 < 11 || 19 < n % 100) ? few : f !== 0 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var v = (s + '.').split('.')[1].length;
  var f = +(s + '.').split('.')[1];
  var n = +s;
  return n % 10 === 0 || 11 <= n % 100 && n % 100 <= 19 || v === 2 && 11 <= f % 100 && f % 100 <= 19 ? zero : n % 10 === 1 && n % 100 !== 11 || v === 2 && f % 10 === 1 && f % 100 !== 11 || v !== 2 && f % 10 === 1 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  var f = +(s + '.').split('.')[1];
  return v === 0 && i % 10 === 1 && i % 100 !== 11 || f % 10 === 1 && f % 100 !== 11 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  var n = +s;
  return i === 1 && v === 0 ? one : v !== 0 || n === 0 || n !== 1 && 1 <= n % 100 && n % 100 <= 19 ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 ? one : n === 0 || 2 <= n % 100 && n % 100 <= 10 ? few : 11 <= n % 100 && n % 100 <= 19 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  return i === 1 && v === 0 ? one : v === 0 && 2 <= i % 10 && i % 10 <= 4 && (i % 100 < 12 || 14 < i % 100) ? few : v === 0 && i !== 1 && 0 <= i % 10 && i % 10 <= 1 || v === 0 && 5 <= i % 10 && i % 10 <= 9 || v === 0 && 12 <= i % 100 && i % 100 <= 14 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  return 0 <= i && i <= 1 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  return v === 0 && i % 10 === 1 && i % 100 !== 11 ? one : v === 0 && 2 <= i % 10 && i % 10 <= 4 && (i % 100 < 12 || 14 < i % 100) ? few : v === 0 && i % 10 === 0 || v === 0 && 5 <= i % 10 && i % 10 <= 9 || v === 0 && 11 <= i % 100 && i % 100 <= 14 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var n = +s;
  return i === 0 || n === 1 ? one : 2 <= n && n <= 10 ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var f = +(s + '.').split('.')[1];
  var n = +s;
  return n === 0 || n === 1 || i === 0 && f === 1 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  return v === 0 && i % 100 === 1 ? one : v === 0 && i % 100 === 2 ? two : v === 0 && 3 <= i % 100 && i % 100 <= 4 || v !== 0 ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return 0 <= n && n <= 1 || 11 <= n && n <= 99 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 || n === 5 || n === 7 || n === 8 || n === 9 || n === 10 ? one : n === 2 || n === 3 ? two : n === 4 ? few : n === 6 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  return i % 10 === 1 || i % 10 === 2 || i % 10 === 5 || i % 10 === 7 || i % 10 === 8 || i % 100 === 20 || i % 100 === 50 || i % 100 === 70 || i % 100 === 80 ? one : i % 10 === 3 || i % 10 === 4 || i % 1000 === 100 || i % 1000 === 200 || i % 1000 === 300 || i % 1000 === 400 || i % 1000 === 500 || i % 1000 === 600 || i % 1000 === 700 || i % 1000 === 800 || i % 1000 === 900 ? few : i === 0 || i % 10 === 6 || i % 100 === 40 || i % 100 === 60 || i % 100 === 90 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return (n % 10 === 2 || n % 10 === 3) && n % 100 !== 12 && n % 100 !== 13 ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 || n === 3 ? one : n === 2 ? two : n === 4 ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 0 || n === 7 || n === 8 || n === 9 ? zero : n === 1 ? one : n === 2 ? two : n === 3 || n === 4 ? few : n === 5 || n === 6 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n % 10 === 1 && n % 100 !== 11 ? one : n % 10 === 2 && n % 100 !== 12 ? two : n % 10 === 3 && n % 100 !== 13 ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 ? one : n === 2 || n === 3 ? two : n === 4 ? few : n === 6 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 || n === 5 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 11 || n === 8 || n === 80 || n === 800 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  return i === 1 ? one : i === 0 || 2 <= i % 100 && i % 100 <= 20 || i % 100 === 40 || i % 100 === 60 || i % 100 === 80 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n % 10 === 6 || n % 10 === 9 || n % 10 === 0 && n !== 0 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  return i % 10 === 1 && i % 100 !== 11 ? one : i % 10 === 2 && i % 100 !== 12 ? two : (i % 10 === 7 || i % 10 === 8) && i % 100 !== 17 && i % 100 !== 18 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 ? one : n === 2 || n === 3 ? two : n === 4 ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return 1 <= n && n <= 4 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 || n === 5 || 7 <= n && n <= 9 ? one : n === 2 || n === 3 ? two : n === 4 ? few : n === 6 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 ? one : n % 10 === 4 && n % 100 !== 14 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return (n % 10 === 1 || n % 10 === 2) && n % 100 !== 11 && n % 100 !== 12 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n % 10 === 6 || n % 10 === 9 || n === 10 ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n % 10 === 3 && n % 100 !== 13 ? few : other;
}];
var plurals = {
  af: {
    cardinal: f[0]
  },
  ak: {
    cardinal: f[1]
  },
  am: {
    cardinal: f[2]
  },
  ar: {
    cardinal: f[3]
  },
  ars: {
    cardinal: f[3]
  },
  as: {
    cardinal: f[2],
    ordinal: f[34]
  },
  asa: {
    cardinal: f[0]
  },
  ast: {
    cardinal: f[4]
  },
  az: {
    cardinal: f[0],
    ordinal: f[35]
  },
  be: {
    cardinal: f[5],
    ordinal: f[36]
  },
  bem: {
    cardinal: f[0]
  },
  bez: {
    cardinal: f[0]
  },
  bg: {
    cardinal: f[0]
  },
  bh: {
    cardinal: f[1]
  },
  bn: {
    cardinal: f[2],
    ordinal: f[34]
  },
  br: {
    cardinal: f[6]
  },
  brx: {
    cardinal: f[0]
  },
  bs: {
    cardinal: f[7]
  },
  ca: {
    cardinal: f[4],
    ordinal: f[37]
  },
  ce: {
    cardinal: f[0]
  },
  cgg: {
    cardinal: f[0]
  },
  chr: {
    cardinal: f[0]
  },
  ckb: {
    cardinal: f[0]
  },
  cs: {
    cardinal: f[8]
  },
  cy: {
    cardinal: f[9],
    ordinal: f[38]
  },
  da: {
    cardinal: f[10]
  },
  de: {
    cardinal: f[4]
  },
  dsb: {
    cardinal: f[11]
  },
  dv: {
    cardinal: f[0]
  },
  ee: {
    cardinal: f[0]
  },
  el: {
    cardinal: f[0]
  },
  en: {
    cardinal: f[4],
    ordinal: f[39]
  },
  eo: {
    cardinal: f[0]
  },
  es: {
    cardinal: f[0]
  },
  et: {
    cardinal: f[4]
  },
  eu: {
    cardinal: f[0]
  },
  fa: {
    cardinal: f[2]
  },
  ff: {
    cardinal: f[12]
  },
  fi: {
    cardinal: f[4]
  },
  fil: {
    cardinal: f[13],
    ordinal: f[0]
  },
  fo: {
    cardinal: f[0]
  },
  fr: {
    cardinal: f[12],
    ordinal: f[0]
  },
  fur: {
    cardinal: f[0]
  },
  fy: {
    cardinal: f[4]
  },
  ga: {
    cardinal: f[14],
    ordinal: f[0]
  },
  gd: {
    cardinal: f[15]
  },
  gl: {
    cardinal: f[4]
  },
  gsw: {
    cardinal: f[0]
  },
  gu: {
    cardinal: f[2],
    ordinal: f[40]
  },
  guw: {
    cardinal: f[1]
  },
  gv: {
    cardinal: f[16]
  },
  ha: {
    cardinal: f[0]
  },
  haw: {
    cardinal: f[0]
  },
  he: {
    cardinal: f[17]
  },
  hi: {
    cardinal: f[2],
    ordinal: f[40]
  },
  hr: {
    cardinal: f[7]
  },
  hsb: {
    cardinal: f[11]
  },
  hu: {
    cardinal: f[0],
    ordinal: f[41]
  },
  hy: {
    cardinal: f[12],
    ordinal: f[0]
  },
  io: {
    cardinal: f[4]
  },
  is: {
    cardinal: f[18]
  },
  it: {
    cardinal: f[4],
    ordinal: f[42]
  },
  iu: {
    cardinal: f[19]
  },
  iw: {
    cardinal: f[17]
  },
  jgo: {
    cardinal: f[0]
  },
  ji: {
    cardinal: f[4]
  },
  jmc: {
    cardinal: f[0]
  },
  ka: {
    cardinal: f[0],
    ordinal: f[43]
  },
  kab: {
    cardinal: f[12]
  },
  kaj: {
    cardinal: f[0]
  },
  kcg: {
    cardinal: f[0]
  },
  kk: {
    cardinal: f[0],
    ordinal: f[44]
  },
  kkj: {
    cardinal: f[0]
  },
  kl: {
    cardinal: f[0]
  },
  kn: {
    cardinal: f[2]
  },
  ks: {
    cardinal: f[0]
  },
  ksb: {
    cardinal: f[0]
  },
  ksh: {
    cardinal: f[20]
  },
  ku: {
    cardinal: f[0]
  },
  kw: {
    cardinal: f[19]
  },
  ky: {
    cardinal: f[0]
  },
  lag: {
    cardinal: f[21]
  },
  lb: {
    cardinal: f[0]
  },
  lg: {
    cardinal: f[0]
  },
  ln: {
    cardinal: f[1]
  },
  lt: {
    cardinal: f[22]
  },
  lv: {
    cardinal: f[23]
  },
  mas: {
    cardinal: f[0]
  },
  mg: {
    cardinal: f[1]
  },
  mgo: {
    cardinal: f[0]
  },
  mk: {
    cardinal: f[24],
    ordinal: f[45]
  },
  ml: {
    cardinal: f[0]
  },
  mn: {
    cardinal: f[0]
  },
  mo: {
    cardinal: f[25],
    ordinal: f[0]
  },
  mr: {
    cardinal: f[2],
    ordinal: f[46]
  },
  mt: {
    cardinal: f[26]
  },
  nah: {
    cardinal: f[0]
  },
  naq: {
    cardinal: f[19]
  },
  nb: {
    cardinal: f[0]
  },
  nd: {
    cardinal: f[0]
  },
  ne: {
    cardinal: f[0],
    ordinal: f[47]
  },
  nl: {
    cardinal: f[4]
  },
  nn: {
    cardinal: f[0]
  },
  nnh: {
    cardinal: f[0]
  },
  no: {
    cardinal: f[0]
  },
  nr: {
    cardinal: f[0]
  },
  nso: {
    cardinal: f[1]
  },
  ny: {
    cardinal: f[0]
  },
  nyn: {
    cardinal: f[0]
  },
  om: {
    cardinal: f[0]
  },
  or: {
    cardinal: f[0],
    ordinal: f[48]
  },
  os: {
    cardinal: f[0]
  },
  pa: {
    cardinal: f[1]
  },
  pap: {
    cardinal: f[0]
  },
  pl: {
    cardinal: f[27]
  },
  prg: {
    cardinal: f[23]
  },
  ps: {
    cardinal: f[0]
  },
  pt: {
    cardinal: f[28]
  },
  'pt-PT': {
    cardinal: f[4]
  },
  rm: {
    cardinal: f[0]
  },
  ro: {
    cardinal: f[25],
    ordinal: f[0]
  },
  rof: {
    cardinal: f[0]
  },
  ru: {
    cardinal: f[29]
  },
  rwk: {
    cardinal: f[0]
  },
  saq: {
    cardinal: f[0]
  },
  scn: {
    cardinal: f[4],
    ordinal: f[42]
  },
  sd: {
    cardinal: f[0]
  },
  sdh: {
    cardinal: f[0]
  },
  se: {
    cardinal: f[19]
  },
  seh: {
    cardinal: f[0]
  },
  sh: {
    cardinal: f[7]
  },
  shi: {
    cardinal: f[30]
  },
  si: {
    cardinal: f[31]
  },
  sk: {
    cardinal: f[8]
  },
  sl: {
    cardinal: f[32]
  },
  sma: {
    cardinal: f[19]
  },
  smi: {
    cardinal: f[19]
  },
  smj: {
    cardinal: f[19]
  },
  smn: {
    cardinal: f[19]
  },
  sms: {
    cardinal: f[19]
  },
  sn: {
    cardinal: f[0]
  },
  so: {
    cardinal: f[0]
  },
  sq: {
    cardinal: f[0],
    ordinal: f[49]
  },
  sr: {
    cardinal: f[7]
  },
  ss: {
    cardinal: f[0]
  },
  ssy: {
    cardinal: f[0]
  },
  st: {
    cardinal: f[0]
  },
  sv: {
    cardinal: f[4],
    ordinal: f[50]
  },
  sw: {
    cardinal: f[4]
  },
  syr: {
    cardinal: f[0]
  },
  ta: {
    cardinal: f[0]
  },
  te: {
    cardinal: f[0]
  },
  teo: {
    cardinal: f[0]
  },
  ti: {
    cardinal: f[1]
  },
  tig: {
    cardinal: f[0]
  },
  tk: {
    cardinal: f[0],
    ordinal: f[51]
  },
  tl: {
    cardinal: f[13],
    ordinal: f[0]
  },
  tn: {
    cardinal: f[0]
  },
  tr: {
    cardinal: f[0]
  },
  ts: {
    cardinal: f[0]
  },
  tzm: {
    cardinal: f[33]
  },
  ug: {
    cardinal: f[0]
  },
  uk: {
    cardinal: f[29],
    ordinal: f[52]
  },
  ur: {
    cardinal: f[4]
  },
  uz: {
    cardinal: f[0]
  },
  ve: {
    cardinal: f[0]
  },
  vo: {
    cardinal: f[0]
  },
  vun: {
    cardinal: f[0]
  },
  wa: {
    cardinal: f[1]
  },
  wae: {
    cardinal: f[0]
  },
  xh: {
    cardinal: f[0]
  },
  xog: {
    cardinal: f[0]
  },
  yi: {
    cardinal: f[4]
  },
  zu: {
    cardinal: f[2]
  },
  lo: {
    ordinal: f[0]
  },
  ms: {
    ordinal: f[0]
  },
  vi: {
    ordinal: f[0]
  }
};

var formatMessageInterpret = createCommonjsModule(function (module, exports) {
  /*::
  import type {
    AST,
    SubMessages
  } from '../format-message-parse'
  type Locale = string
  type Locales = Locale | Locale[]
  type Placeholder = any[] // https://github.com/facebook/flow/issues/4050
  export type Type = (Placeholder, Locales) => (any, ?Object) => any
  export type Types = { [string]: Type }
  */

  exports = module.exports = function interpret(ast
  /*: AST */
  , locale
  /*:: ?: Locales */
  , types
  /*:: ?: Types */
  )
  /*: (args?: Object) => string */
  {
    return interpretAST(ast, null, locale || 'en', types || {}, true);
  };

  exports.toParts = function toParts(ast
  /*: AST */
  , locale
  /*:: ?: Locales */
  , types
  /*:: ?: Types */
  )
  /*: (args?: Object) => any[] */
  {
    return interpretAST(ast, null, locale || 'en', types || {}, false);
  };

  function interpretAST(elements
  /*: any[] */
  , parent
  /*: ?Placeholder */
  , locale
  /*: Locales */
  , types
  /*: Types */
  , join
  /*: boolean */
  )
  /*: Function */
  {
    var parts = elements.map(function (element) {
      return interpretElement(element, parent, locale, types, join);
    });

    if (!join) {
      return function format(args) {
        return parts.reduce(function (parts, part) {
          return parts.concat(part(args));
        }, []);
      };
    }

    if (parts.length === 1) return parts[0];
    return function format(args) {
      var message = '';

      for (var e = 0; e < parts.length; ++e) {
        message += parts[e](args);
      }

      return message;
    };
  }

  function interpretElement(element
  /*: Placeholder */
  , parent
  /*: ?Placeholder */
  , locale
  /*: Locales */
  , types
  /*: Types */
  , join
  /*: boolean */
  )
  /*: Function */
  {
    if (typeof element === 'string') {
      var value
      /*: string */
      = element;
      return function format() {
        return value;
      };
    }

    var id = element[0];
    var type = element[1];

    if (parent && element[0] === '#') {
      id = parent[0];
      var offset = parent[2];
      var formatter = (types.number || defaults.number)([id, 'number'], locale);
      return function format(args) {
        return formatter(getArg(id, args) - offset, args);
      };
    } // pre-process children


    var children;

    if (type === 'plural' || type === 'selectordinal') {
      children = {};
      Object.keys(element[3]).forEach(function (key) {
        children[key] = interpretAST(element[3][key], element, locale, types, join);
      });
      element = [element[0], element[1], element[2], children];
    } else if (element[2] && _typeof$1(element[2]) === 'object') {
      children = {};
      Object.keys(element[2]).forEach(function (key) {
        children[key] = interpretAST(element[2][key], element, locale, types, join);
      });
      element = [element[0], element[1], children];
    }

    var getFrmt = type && (types[type] || defaults[type]);

    if (getFrmt) {
      var frmt = getFrmt(element, locale);
      return function format(args) {
        return frmt(getArg(id, args), args);
      };
    }

    return join ? function format(args) {
      return String(getArg(id, args));
    } : function format(args) {
      return getArg(id, args);
    };
  }

  function getArg(id
  /*: string */
  , args
  /*: ?Object */
  )
  /*: any */
  {
    if (args && id in args) return args[id];
    var parts = id.split('.');
    var a = args;

    for (var i = 0, ii = parts.length; a && i < ii; ++i) {
      a = a[parts[i]];
    }

    return a;
  }

  function interpretNumber(element
  /*: Placeholder */
  , locales
  /*: Locales */
  ) {
    var style = element[2];
    var options = formatMessageFormats$1.number[style] || formatMessageFormats$1.parseNumberPattern(style) || formatMessageFormats$1.number.default;
    return new Intl.NumberFormat(locales, options).format;
  }

  function interpretDuration(element
  /*: Placeholder */
  , locales
  /*: Locales */
  ) {
    var style = element[2];
    var options = formatMessageFormats$1.duration[style] || formatMessageFormats$1.duration.default;
    var fs = new Intl.NumberFormat(locales, options.seconds).format;
    var fm = new Intl.NumberFormat(locales, options.minutes).format;
    var fh = new Intl.NumberFormat(locales, options.hours).format;
    var sep = /^fi$|^fi-|^da/.test(String(locales)) ? '.' : ':';
    return function (s, args) {
      s = +s;
      if (!isFinite(s)) return fs(s);
      var h = ~~(s / 60 / 60); // ~~ acts much like Math.trunc

      var m = ~~(s / 60 % 60);
      var dur = (h ? fh(Math.abs(h)) + sep : '') + fm(Math.abs(m)) + sep + fs(Math.abs(s % 60));
      return s < 0 ? fh(-1).replace(fh(1), dur) : dur;
    };
  }

  function interpretDateTime(element
  /*: Placeholder */
  , locales
  /*: Locales */
  ) {
    var type = element[1];
    var style = element[2];
    var options = formatMessageFormats$1[type][style] || formatMessageFormats$1.parseDatePattern(style) || formatMessageFormats$1[type].default;
    return new Intl.DateTimeFormat(locales, options).format;
  }

  function interpretPlural(element
  /*: Placeholder */
  , locales
  /*: Locales */
  ) {
    var type = element[1];
    var pluralType = type === 'selectordinal' ? 'ordinal' : 'cardinal';
    var offset = element[2];
    var children = element[3];
    var pluralRules;

    if (Intl.PluralRules && Intl.PluralRules.supportedLocalesOf(locales).length > 0) {
      pluralRules = new Intl.PluralRules(locales, {
        type: pluralType
      });
    } else {
      var locale = lookupClosestLocale$1(locales, plurals);
      var select = locale && plurals[locale][pluralType] || returnOther;
      pluralRules = {
        select: select
      };
    }

    return function (value, args) {
      var clause = children['=' + +value] || children[pluralRules.select(value - offset)] || children.other;
      return clause(args);
    };
  }

  function returnOther()
  /*:: n:number */
  {
    return 'other';
  }

  function interpretSelect(element
  /*: Placeholder */
  , locales
  /*: Locales */
  ) {
    var children = element[2];
    return function (value, args) {
      var clause = children[value] || children.other;
      return clause(args);
    };
  }

  var defaults
  /*: Types */
  = {
    number: interpretNumber,
    ordinal: interpretNumber,
    // TODO: support rbnf
    spellout: interpretNumber,
    // TODO: support rbnf
    duration: interpretDuration,
    date: interpretDateTime,
    time: interpretDateTime,
    plural: interpretPlural,
    selectordinal: interpretPlural,
    select: interpretSelect
  };
  exports.types = defaults;
});

// @flow
// "lookup" algorithm http://tools.ietf.org/html/rfc4647#section-3.4
// assumes normalized language tags, and matches in a case sensitive manner
var lookupClosestLocale = function lookupClosestLocale(locale
/*: string | string[] | void */
, available
/*: { [string]: any } */
)
/*: ?string */
{
  if (typeof locale === 'string' && available[locale]) return locale;
  var locales = [].concat(locale || []);

  for (var l = 0, ll = locales.length; l < ll; ++l) {
    var current = locales[l].split('-');

    while (current.length) {
      var candidate = current.join('-');
      if (available[candidate]) return candidate;
      current.pop();
    }
  }
};

// @flow
var LONG = 'long';
var SHORT = 'short';
var NARROW = 'narrow';
var NUMERIC = 'numeric';
var TWODIGIT = '2-digit';
/**
 * formatting information
 **/

var formatMessageFormats = {
  number: {
    decimal: {
      style: 'decimal'
    },
    integer: {
      style: 'decimal',
      maximumFractionDigits: 0
    },
    currency: {
      style: 'currency',
      currency: 'USD'
    },
    percent: {
      style: 'percent'
    },
    default: {
      style: 'decimal'
    }
  },
  date: {
    short: {
      month: NUMERIC,
      day: NUMERIC,
      year: TWODIGIT
    },
    medium: {
      month: SHORT,
      day: NUMERIC,
      year: NUMERIC
    },
    long: {
      month: LONG,
      day: NUMERIC,
      year: NUMERIC
    },
    full: {
      month: LONG,
      day: NUMERIC,
      year: NUMERIC,
      weekday: LONG
    },
    default: {
      month: SHORT,
      day: NUMERIC,
      year: NUMERIC
    }
  },
  time: {
    short: {
      hour: NUMERIC,
      minute: NUMERIC
    },
    medium: {
      hour: NUMERIC,
      minute: NUMERIC,
      second: NUMERIC
    },
    long: {
      hour: NUMERIC,
      minute: NUMERIC,
      second: NUMERIC,
      timeZoneName: SHORT
    },
    full: {
      hour: NUMERIC,
      minute: NUMERIC,
      second: NUMERIC,
      timeZoneName: SHORT
    },
    default: {
      hour: NUMERIC,
      minute: NUMERIC,
      second: NUMERIC
    }
  },
  duration: {
    default: {
      hours: {
        minimumIntegerDigits: 1,
        maximumFractionDigits: 0
      },
      minutes: {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 0
      },
      seconds: {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 3
      }
    }
  },
  parseNumberPattern: function parseNumberPattern(pattern
  /*: ?string */
  ) {
    if (!pattern) return;
    var options = {};
    var currency = pattern.match(/\b[A-Z]{3}\b/i);
    var syms = pattern.replace(/[^¤]/g, '').length;
    if (!syms && currency) syms = 1;

    if (syms) {
      options.style = 'currency';
      options.currencyDisplay = syms === 1 ? 'symbol' : syms === 2 ? 'code' : 'name';
      options.currency = currency ? currency[0].toUpperCase() : 'USD';
    } else if (pattern.indexOf('%') >= 0) {
      options.style = 'percent';
    }

    if (!/[@#0]/.test(pattern)) return options.style ? options : undefined;
    options.useGrouping = pattern.indexOf(',') >= 0;

    if (/E\+?[@#0]+/i.test(pattern) || pattern.indexOf('@') >= 0) {
      var size = pattern.replace(/E\+?[@#0]+|[^@#0]/gi, '');
      options.minimumSignificantDigits = Math.min(Math.max(size.replace(/[^@0]/g, '').length, 1), 21);
      options.maximumSignificantDigits = Math.min(Math.max(size.length, 1), 21);
    } else {
      var parts = pattern.replace(/[^#0.]/g, '').split('.');
      var integer = parts[0];
      var n = integer.length - 1;

      while (integer[n] === '0') {
        --n;
      }

      options.minimumIntegerDigits = Math.min(Math.max(integer.length - 1 - n, 1), 21);
      var fraction = parts[1] || '';
      n = 0;

      while (fraction[n] === '0') {
        ++n;
      }

      options.minimumFractionDigits = Math.min(Math.max(n, 0), 20);

      while (fraction[n] === '#') {
        ++n;
      }

      options.maximumFractionDigits = Math.min(Math.max(n, 0), 20);
    }

    return options;
  },
  parseDatePattern: function parseDatePattern(pattern
  /*: ?string */
  ) {
    if (!pattern) return;
    var options = {};

    for (var i = 0; i < pattern.length;) {
      var current = pattern[i];
      var n = 1;

      while (pattern[++i] === current) {
        ++n;
      }

      switch (current) {
        case 'G':
          options.era = n === 5 ? NARROW : n === 4 ? LONG : SHORT;
          break;

        case 'y':
        case 'Y':
          options.year = n === 2 ? TWODIGIT : NUMERIC;
          break;

        case 'M':
        case 'L':
          n = Math.min(Math.max(n - 1, 0), 4);
          options.month = [NUMERIC, TWODIGIT, SHORT, LONG, NARROW][n];
          break;

        case 'E':
        case 'e':
        case 'c':
          options.weekday = n === 5 ? NARROW : n === 4 ? LONG : SHORT;
          break;

        case 'd':
        case 'D':
          options.day = n === 2 ? TWODIGIT : NUMERIC;
          break;

        case 'h':
        case 'K':
          options.hour12 = true;
          options.hour = n === 2 ? TWODIGIT : NUMERIC;
          break;

        case 'H':
        case 'k':
          options.hour12 = false;
          options.hour = n === 2 ? TWODIGIT : NUMERIC;
          break;

        case 'm':
          options.minute = n === 2 ? TWODIGIT : NUMERIC;
          break;

        case 's':
        case 'S':
          options.second = n === 2 ? TWODIGIT : NUMERIC;
          break;

        case 'z':
        case 'Z':
        case 'v':
        case 'V':
          options.timeZoneName = n === 1 ? SHORT : LONG;
          break;
      }
    }

    return Object.keys(options).length ? options : undefined;
  }
};

var formatMessage$1 = createCommonjsModule(function (module, exports) {
  /*::
  import type { Types } from 'format-message-interpret'
  type Locale = string
  type Locales = Locale | Locale[]
  type Message = string | {|
    id?: string,
    default: string,
    description?: string
  |}
  type Translations = { [string]: ?{ [string]: string | Translation } }
  type Translation = {
    message: string,
    format?: (args?: Object) => string,
    toParts?: (args?: Object) => any[],
  }
  type Replacement = ?string | (string, string, locales?: Locales) => ?string
  type GenerateId = (string) => string
  type MissingTranslation = 'ignore' | 'warning' | 'error'
  type FormatObject = { [string]: * }
  type Options = {
    locale?: Locales,
    translations?: ?Translations,
    generateId?: GenerateId,
    missingReplacement?: Replacement,
    missingTranslation?: MissingTranslation,
    formats?: {
      number?: FormatObject,
      date?: FormatObject,
      time?: FormatObject
    },
    types?: Types
  }
  type Setup = {|
    locale: Locales,
    translations: Translations,
    generateId: GenerateId,
    missingReplacement: Replacement,
    missingTranslation: MissingTranslation,
    formats: {
      number: FormatObject,
      date: FormatObject,
      time: FormatObject
    },
    types: Types
  |}
  type FormatMessage = {
    (msg: Message, args?: Object, locales?: Locales): string,
    rich (msg: Message, args?: Object, locales?: Locales): any[],
    setup (opt?: Options): Setup,
    number (value: number, style?: string, locales?: Locales): string,
    date (value: number | Date, style?: string, locales?: Locales): string,
    time (value: number | Date, style?: string, locales?: Locales): string,
    select (value: any, options: Object): any,
    custom (placeholder: any[], locales: Locales, value: any, args: Object): any,
    plural (value: number, offset: any, options: any, locale: any): any,
    selectordinal (value: number, offset: any, options: any, locale: any): any,
    namespace (): FormatMessage
  }
  */

  function assign
  /*:: <T: Object> */
  (target
  /*: T */
  , source
  /*: Object */
  ) {
    Object.keys(source).forEach(function (key) {
      target[key] = source[key];
    });
    return target;
  }

  function namespace()
  /*: FormatMessage */
  {
    var formats = assign({}, formatMessageFormats);
    var currentLocales
    /*: Locales */
    = 'en';
    var translations
    /*: Translations */
    = {};

    var generateId
    /*: GenerateId */
    = function generateId(pattern) {
      return pattern;
    };

    var missingReplacement
    /*: Replacement */
    = null;
    var missingTranslation
    /*: MissingTranslation */
    = 'warning';
    var types
    /*: Types */
    = {};

    function formatMessage(msg
    /*: Message */
    , args
    /*:: ?: Object */
    , locales
    /*:: ?: Locales */
    ) {
      var pattern = typeof msg === 'string' ? msg : msg.default;
      var id = _typeof$1(msg) === 'object' && msg.id || generateId(pattern);
      var translated = translate(pattern, id, locales || currentLocales);
      var format = translated.format || (translated.format = formatMessageInterpret(formatMessageParse(translated.message), locales || currentLocales, types));
      return format(args);
    }

    formatMessage.rich = function rich(msg
    /*: Message */
    , args
    /*:: ?: Object */
    , locales
    /*:: ?: Locales */
    ) {
      var pattern = typeof msg === 'string' ? msg : msg.default;
      var id = _typeof$1(msg) === 'object' && msg.id || generateId(pattern);
      var translated = translate(pattern, id, locales || currentLocales);
      var format = translated.toParts || (translated.toParts = formatMessageInterpret.toParts(formatMessageParse(translated.message, {
        tagsType: tagsType
      }), locales || currentLocales, types));
      return format(args);
    };

    var tagsType = '<>';

    function richType(node
    /*: any[] */
    , locales
    /*: Locales */
    ) {
      var style = node[2];
      return function (fn, args) {
        var props = _typeof$1(style) === 'object' ? mapObject(style, args) : style;
        return typeof fn === 'function' ? fn(props) : fn;
      };
    }

    types[tagsType] = richType;

    function mapObject(object
    /* { [string]: (args?: Object) => any } */
    , args
    /*: ?Object */
    ) {
      return Object.keys(object).reduce(function (mapped, key) {
        mapped[key] = object[key](args);
        return mapped;
      }, {});
    }

    function translate(pattern
    /*: string */
    , id
    /*: string */
    , locales
    /*: Locales */
    )
    /*: Translation */
    {
      var locale = lookupClosestLocale(locales, translations) || 'en';
      var messages = translations[locale] || (translations[locale] = {});
      var translated = messages[id];

      if (typeof translated === 'string') {
        translated = messages[id] = {
          message: translated
        };
      }

      if (!translated) {
        var message = 'Translation for "' + id + '" in "' + locale + '" is missing';

        if (missingTranslation === 'warning') {
          /* istanbul ignore else */
          if (typeof console !== 'undefined') console.warn(message);
        } else if (missingTranslation !== 'ignore') {
          // 'error'
          throw new Error(message);
        }

        var replacement = typeof missingReplacement === 'function' ? missingReplacement(pattern, id, locale) || pattern : missingReplacement || pattern;
        translated = messages[id] = {
          message: replacement
        };
      }

      return translated;
    }

    formatMessage.setup = function setup(opt
    /*:: ?: Options */
    ) {
      opt = opt || {};
      if (opt.locale) currentLocales = opt.locale;
      if ('translations' in opt) translations = opt.translations || {};
      if (opt.generateId) generateId = opt.generateId;
      if ('missingReplacement' in opt) missingReplacement = opt.missingReplacement;
      if (opt.missingTranslation) missingTranslation = opt.missingTranslation;

      if (opt.formats) {
        if (opt.formats.number) assign(formats.number, opt.formats.number);
        if (opt.formats.date) assign(formats.date, opt.formats.date);
        if (opt.formats.time) assign(formats.time, opt.formats.time);
      }

      if (opt.types) {
        types = opt.types;
        types[tagsType] = richType;
      }

      return {
        locale: currentLocales,
        translations: translations,
        generateId: generateId,
        missingReplacement: missingReplacement,
        missingTranslation: missingTranslation,
        formats: formats,
        types: types
      };
    };

    formatMessage.number = function (value
    /*: number */
    , style
    /*:: ?: string */
    , locales
    /*:: ?: Locales */
    ) {
      var options = style && formats.number[style] || formats.parseNumberPattern(style) || formats.number.default;
      return new Intl.NumberFormat(locales || currentLocales, options).format(value);
    };

    formatMessage.date = function (value
    /*:: ?: number | Date */
    , style
    /*:: ?: string */
    , locales
    /*:: ?: Locales */
    ) {
      var options = style && formats.date[style] || formats.parseDatePattern(style) || formats.date.default;
      return new Intl.DateTimeFormat(locales || currentLocales, options).format(value);
    };

    formatMessage.time = function (value
    /*:: ?: number | Date */
    , style
    /*:: ?: string */
    , locales
    /*:: ?: Locales */
    ) {
      var options = style && formats.time[style] || formats.parseDatePattern(style) || formats.time.default;
      return new Intl.DateTimeFormat(locales || currentLocales, options).format(value);
    };

    formatMessage.select = function (value
    /*: any */
    , options
    /*: Object */
    ) {
      return options[value] || options.other;
    };

    formatMessage.custom = function (placeholder
    /*: any[] */
    , locales
    /*: Locales */
    , value
    /*: any */
    , args
    /*: Object */
    ) {
      if (!(placeholder[1] in types)) return value;
      return types[placeholder[1]](placeholder, locales)(value, args);
    };

    formatMessage.plural = plural.bind(null, 'cardinal');
    formatMessage.selectordinal = plural.bind(null, 'ordinal');

    function plural(pluralType
    /*: 'cardinal' | 'ordinal' */
    , value
    /*: number */
    , offset
    /*: any */
    , options
    /*: any */
    , locale
    /*: any */
    ) {
      if (_typeof$1(offset) === 'object' && _typeof$1(options) !== 'object') {
        // offset is optional
        locale = options;
        options = offset;
        offset = 0;
      }

      var closest = lookupClosestLocale(locale || currentLocales, plurals);
      var plural = closest && plurals[closest][pluralType] || returnOther;
      return options['=' + +value] || options[plural(value - offset)] || options.other;
    }

    function returnOther()
    /*:: n:number */
    {
      return 'other';
    }

    formatMessage.namespace = namespace;
    return formatMessage;
  }

  module.exports = namespace();
});

// const log = require('../../util/log');

/**
 * Formatter which is used for translating.
 * When it was loaded as a module, 'formatMessage' will be replaced which is used in the runtime.
 * @type {Function}
 */

var formatMessage = formatMessage$1;
var EXTENSION_ID = 'xcratchExample';
/**
 * URL to get this extension as a module.
 * When it was loaded as a module, 'extensionURL' will be replaced a URL which is retrieved from.
 * @type {string}
 */

var extensionURL = 'https://yokobond.github.io/xcratch-example/dist/xcratchExample.mjs';
/**
 * Icon png to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len

var blockIconURI = 'data:image/png;base64,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';
/**
 * Scratch 3.0 blocks for example of Xcratch.
 */

var XcratchExampleBlocks = /*#__PURE__*/function () {
  /**
   * Construct a set of blocks for Xcratch Example.
   * @param {Runtime} runtime - the Scratch 3.0 runtime.
   */
  function XcratchExampleBlocks(runtime) {
    _classCallCheck(this, XcratchExampleBlocks);

    /**
     * The Scratch 3.0 runtime.
     * @type {Runtime}
     */
    this.runtime = runtime;

    if (runtime.formatMessage) {
      // Replace 'formatMessage' to a formatter which is used in the runtime.
      formatMessage = runtime.formatMessage;
    }
  }
  /**
   * @returns {object} metadata for this extension and its blocks.
   */


  _createClass(XcratchExampleBlocks, [{
    key: "getInfo",
    value: function getInfo() {
      this.setupTranslations();
      return {
        id: XcratchExampleBlocks.EXTENSION_ID,
        name: XcratchExampleBlocks.EXTENSION_NAME,
        extensionURL: XcratchExampleBlocks.extensionURL,
        blockIconURI: blockIconURI,
        showStatusButton: false,
        blocks: [{
          opcode: 'do-it',
          blockType: blockType.REPORTER,
          blockAllThreads: false,
          text: formatMessage({
            id: 'xcratchExample.doIt',
            default: 'do it [SCRIPT]',
            description: 'execute javascript for example'
          }),
          func: 'doIt',
          arguments: {
            SCRIPT: {
              type: argumentType.STRING,
              defaultValue: '3 + 4'
            }
          }
        }],
        menus: {},
        // eslint-disable-next-line no-use-before-define
        translationMap: extensionTranslations
      };
    }
  }, {
    key: "doIt",
    value: function doIt(args) {
      var func = new Function("return (".concat(args.SCRIPT, ")"));
      return func.call(this);
    }
    /**
     * Setup format-message for this extension.
     */

  }, {
    key: "setupTranslations",
    value: function setupTranslations() {
      var localeSetup = formatMessage.setup();

      if (localeSetup && localeSetup.translations[localeSetup.locale]) {
        Object.assign(localeSetup.translations[localeSetup.locale], // eslint-disable-next-line no-use-before-define
        extensionTranslations[localeSetup.locale]);
      }
    }
  }], [{
    key: "EXTENSION_NAME",
    get:
    /**
     * @return {string} - the name of this extension.
     */
    function get() {
      return 'Xcratch Example';
    }
    /**
     * @return {string} - the ID of this extension.
     */

  }, {
    key: "EXTENSION_ID",
    get: function get() {
      return EXTENSION_ID;
    }
    /**
     * URL to get this extension.
     * @type {string}
     */

  }, {
    key: "extensionURL",
    get: function get() {
      return extensionURL;
    }
    /**
     * Set URL to get this extension.
     * @param {string} url - URL
     */
    ,
    set: function set(url) {
      extensionURL = url;
    }
  }]);

  return XcratchExampleBlocks;
}();

var extensionTranslations = {
  'ja': {
    'xcratchExample.doIt': '[SCRIPT] を実行する'
  },
  'ja-Hira': {
    'xcratchExample.doIt': '[SCRIPT] をじっこうする'
  }
};
var blockClass = XcratchExampleBlocks; // loadable-extension needs this line.

var _xcratchExample = XcratchExampleBlocks;
_xcratchExample.blockClass = blockClass;

export { _xcratchExample as __moduleExports, blockClass, entry };
