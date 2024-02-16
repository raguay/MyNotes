var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to2, from2, except, desc) => {
  if (from2 && typeof from2 === "object" || typeof from2 === "function") {
    for (let key of __getOwnPropNames(from2))
      if (!__hasOwnProp.call(to2, key) && key !== except)
        __defProp(to2, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc(from2, key)) || desc.enumerable });
  }
  return to2;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// node_modules/.pnpm/pagerank.js@1.0.2/node_modules/pagerank.js/lib/index.js
var require_lib = __commonJS({
  "node_modules/.pnpm/pagerank.js@1.0.2/node_modules/pagerank.js/lib/index.js"(exports, module2) {
    "use strict";
    function forOwn(object, callback2) {
      if (typeof object === "object" && typeof callback2 === "function") {
        for (var key in object) {
          if (object.hasOwnProperty(key) === true) {
            if (callback2(key, object[key]) === false) {
              break;
            }
          }
        }
      }
    }
    module2.exports = function() {
      var self = {
        count: 0,
        edges: {},
        nodes: {}
      };
      self.link = function(source, target, weight) {
        if (isFinite(weight) !== true || weight === null) {
          weight = 1;
        }
        weight = parseFloat(weight);
        if (self.nodes.hasOwnProperty(source) !== true) {
          self.count++;
          self.nodes[source] = {
            weight: 0,
            outbound: 0
          };
        }
        self.nodes[source].outbound += weight;
        if (self.nodes.hasOwnProperty(target) !== true) {
          self.count++;
          self.nodes[target] = {
            weight: 0,
            outbound: 0
          };
        }
        if (self.edges.hasOwnProperty(source) !== true) {
          self.edges[source] = {};
        }
        if (self.edges[source].hasOwnProperty(target) !== true) {
          self.edges[source][target] = 0;
        }
        self.edges[source][target] += weight;
      };
      self.rank = function(alpha2, epsilon, callback2) {
        var delta = 1, inverse = 1 / self.count;
        forOwn(self.edges, function(source) {
          if (self.nodes[source].outbound > 0) {
            forOwn(self.edges[source], function(target) {
              self.edges[source][target] /= self.nodes[source].outbound;
            });
          }
        });
        forOwn(self.nodes, function(key) {
          self.nodes[key].weight = inverse;
        });
        while (delta > epsilon) {
          var leak = 0, nodes = {};
          forOwn(self.nodes, function(key, value) {
            nodes[key] = value.weight;
            if (value.outbound === 0) {
              leak += value.weight;
            }
            self.nodes[key].weight = 0;
          });
          leak *= alpha2;
          forOwn(self.nodes, function(source) {
            forOwn(self.edges[source], function(target, weight) {
              self.nodes[target].weight += alpha2 * nodes[source] * weight;
            });
            self.nodes[source].weight += (1 - alpha2) * inverse + leak * inverse;
          });
          delta = 0;
          forOwn(self.nodes, function(key, value) {
            delta += Math.abs(value.weight - nodes[key]);
          });
        }
        forOwn(self.nodes, function(key) {
          return callback2(key, self.nodes[key].weight);
        });
      };
      self.reset = function() {
        self.count = 0;
        self.edges = {};
        self.nodes = {};
      };
      return self;
    }();
  }
});

// node_modules/.pnpm/vhtml@2.2.0/node_modules/vhtml/dist/vhtml.js
var require_vhtml = __commonJS({
  "node_modules/.pnpm/vhtml@2.2.0/node_modules/vhtml/dist/vhtml.js"(exports, module2) {
    (function(global, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? module2.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.vhtml = factory();
    })(exports, function() {
      "use strict";
      var emptyTags = ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"];
      var esc = function esc2(str) {
        return String(str).replace(/[&<>"']/g, function(s) {
          return "&" + map3[s] + ";";
        });
      };
      var map3 = { "&": "amp", "<": "lt", ">": "gt", '"': "quot", "'": "apos" };
      var setInnerHTMLAttr = "dangerouslySetInnerHTML";
      var DOMAttributeNames = {
        className: "class",
        htmlFor: "for"
      };
      var sanitized = {};
      function h4(name, attrs) {
        var stack = [], s = "";
        attrs = attrs || {};
        for (var i = arguments.length; i-- > 2; ) {
          stack.push(arguments[i]);
        }
        if (typeof name === "function") {
          attrs.children = stack.reverse();
          return name(attrs);
        }
        if (name) {
          s += "<" + name;
          if (attrs)
            for (var _i in attrs) {
              if (attrs[_i] !== false && attrs[_i] != null && _i !== setInnerHTMLAttr) {
                s += " " + (DOMAttributeNames[_i] ? DOMAttributeNames[_i] : esc(_i)) + '="' + esc(attrs[_i]) + '"';
              }
            }
          s += ">";
        }
        if (emptyTags.indexOf(name) === -1) {
          if (attrs[setInnerHTMLAttr]) {
            s += attrs[setInnerHTMLAttr].__html;
          } else
            while (stack.length) {
              var child = stack.pop();
              if (child) {
                if (child.pop) {
                  for (var _i2 = child.length; _i2--; ) {
                    stack.push(child[_i2]);
                  }
                } else {
                  s += sanitized[child] === true ? child : esc(child);
                }
              }
            }
          s += name ? "</" + name + ">" : "";
        }
        sanitized[s] = true;
        return s;
      }
      return h4;
    });
  }
});

// node_modules/.pnpm/moment@2.30.1/node_modules/moment/moment.js
var require_moment = __commonJS({
  "node_modules/.pnpm/moment@2.30.1/node_modules/moment/moment.js"(exports, module2) {
    (function(global, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? module2.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.moment = factory();
    })(exports, function() {
      "use strict";
      var hookCallback;
      function hooks() {
        return hookCallback.apply(null, arguments);
      }
      function setHookCallback(callback2) {
        hookCallback = callback2;
      }
      function isArray2(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === "[object Array]";
      }
      function isObject2(input) {
        return input != null && Object.prototype.toString.call(input) === "[object Object]";
      }
      function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
      }
      function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
          return Object.getOwnPropertyNames(obj).length === 0;
        } else {
          var k;
          for (k in obj) {
            if (hasOwnProp(obj, k)) {
              return false;
            }
          }
          return true;
        }
      }
      function isUndefined(input) {
        return input === void 0;
      }
      function isNumber2(input) {
        return typeof input === "number" || Object.prototype.toString.call(input) === "[object Number]";
      }
      function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === "[object Date]";
      }
      function map3(arr, fn) {
        var res = [], i, arrLen = arr.length;
        for (i = 0; i < arrLen; ++i) {
          res.push(fn(arr[i], i));
        }
        return res;
      }
      function extend(a, b) {
        for (var i in b) {
          if (hasOwnProp(b, i)) {
            a[i] = b[i];
          }
        }
        if (hasOwnProp(b, "toString")) {
          a.toString = b.toString;
        }
        if (hasOwnProp(b, "valueOf")) {
          a.valueOf = b.valueOf;
        }
        return a;
      }
      function createUTC(input, format2, locale3, strict) {
        return createLocalOrUTC(input, format2, locale3, strict, true).utc();
      }
      function defaultParsingFlags() {
        return {
          empty: false,
          unusedTokens: [],
          unusedInput: [],
          overflow: -2,
          charsLeftOver: 0,
          nullInput: false,
          invalidEra: null,
          invalidMonth: null,
          invalidFormat: false,
          userInvalidated: false,
          iso: false,
          parsedDateParts: [],
          era: null,
          meridiem: null,
          rfc2822: false,
          weekdayMismatch: false
        };
      }
      function getParsingFlags(m) {
        if (m._pf == null) {
          m._pf = defaultParsingFlags();
        }
        return m._pf;
      }
      var some;
      if (Array.prototype.some) {
        some = Array.prototype.some;
      } else {
        some = function(fun) {
          var t2 = Object(this), len = t2.length >>> 0, i;
          for (i = 0; i < len; i++) {
            if (i in t2 && fun.call(this, t2[i], i, t2)) {
              return true;
            }
          }
          return false;
        };
      }
      function isValid(m) {
        var flags = null, parsedParts = false, isNowValid = m._d && !isNaN(m._d.getTime());
        if (isNowValid) {
          flags = getParsingFlags(m);
          parsedParts = some.call(flags.parsedDateParts, function(i) {
            return i != null;
          });
          isNowValid = flags.overflow < 0 && !flags.empty && !flags.invalidEra && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);
          if (m._strict) {
            isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === void 0;
          }
        }
        if (Object.isFrozen == null || !Object.isFrozen(m)) {
          m._isValid = isNowValid;
        } else {
          return isNowValid;
        }
        return m._isValid;
      }
      function createInvalid(flags) {
        var m = createUTC(NaN);
        if (flags != null) {
          extend(getParsingFlags(m), flags);
        } else {
          getParsingFlags(m).userInvalidated = true;
        }
        return m;
      }
      var momentProperties = hooks.momentProperties = [], updateInProgress = false;
      function copyConfig(to3, from3) {
        var i, prop, val, momentPropertiesLen = momentProperties.length;
        if (!isUndefined(from3._isAMomentObject)) {
          to3._isAMomentObject = from3._isAMomentObject;
        }
        if (!isUndefined(from3._i)) {
          to3._i = from3._i;
        }
        if (!isUndefined(from3._f)) {
          to3._f = from3._f;
        }
        if (!isUndefined(from3._l)) {
          to3._l = from3._l;
        }
        if (!isUndefined(from3._strict)) {
          to3._strict = from3._strict;
        }
        if (!isUndefined(from3._tzm)) {
          to3._tzm = from3._tzm;
        }
        if (!isUndefined(from3._isUTC)) {
          to3._isUTC = from3._isUTC;
        }
        if (!isUndefined(from3._offset)) {
          to3._offset = from3._offset;
        }
        if (!isUndefined(from3._pf)) {
          to3._pf = getParsingFlags(from3);
        }
        if (!isUndefined(from3._locale)) {
          to3._locale = from3._locale;
        }
        if (momentPropertiesLen > 0) {
          for (i = 0; i < momentPropertiesLen; i++) {
            prop = momentProperties[i];
            val = from3[prop];
            if (!isUndefined(val)) {
              to3[prop] = val;
            }
          }
        }
        return to3;
      }
      function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
          this._d = /* @__PURE__ */ new Date(NaN);
        }
        if (updateInProgress === false) {
          updateInProgress = true;
          hooks.updateOffset(this);
          updateInProgress = false;
        }
      }
      function isMoment(obj) {
        return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
      }
      function warn(msg) {
        if (hooks.suppressDeprecationWarnings === false && typeof console !== "undefined" && console.warn) {
          console.warn("Deprecation warning: " + msg);
        }
      }
      function deprecate(msg, fn) {
        var firstTime = true;
        return extend(function() {
          if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(null, msg);
          }
          if (firstTime) {
            var args = [], arg, i, key, argLen = arguments.length;
            for (i = 0; i < argLen; i++) {
              arg = "";
              if (typeof arguments[i] === "object") {
                arg += "\n[" + i + "] ";
                for (key in arguments[0]) {
                  if (hasOwnProp(arguments[0], key)) {
                    arg += key + ": " + arguments[0][key] + ", ";
                  }
                }
                arg = arg.slice(0, -2);
              } else {
                arg = arguments[i];
              }
              args.push(arg);
            }
            warn(
              msg + "\nArguments: " + Array.prototype.slice.call(args).join("") + "\n" + new Error().stack
            );
            firstTime = false;
          }
          return fn.apply(this, arguments);
        }, fn);
      }
      var deprecations = {};
      function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
          hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
          warn(msg);
          deprecations[name] = true;
        }
      }
      hooks.suppressDeprecationWarnings = false;
      hooks.deprecationHandler = null;
      function isFunction2(input) {
        return typeof Function !== "undefined" && input instanceof Function || Object.prototype.toString.call(input) === "[object Function]";
      }
      function set2(config) {
        var prop, i;
        for (i in config) {
          if (hasOwnProp(config, i)) {
            prop = config[i];
            if (isFunction2(prop)) {
              this[i] = prop;
            } else {
              this["_" + i] = prop;
            }
          }
        }
        this._config = config;
        this._dayOfMonthOrdinalParseLenient = new RegExp(
          (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
        );
      }
      function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
          if (hasOwnProp(childConfig, prop)) {
            if (isObject2(parentConfig[prop]) && isObject2(childConfig[prop])) {
              res[prop] = {};
              extend(res[prop], parentConfig[prop]);
              extend(res[prop], childConfig[prop]);
            } else if (childConfig[prop] != null) {
              res[prop] = childConfig[prop];
            } else {
              delete res[prop];
            }
          }
        }
        for (prop in parentConfig) {
          if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject2(parentConfig[prop])) {
            res[prop] = extend({}, res[prop]);
          }
        }
        return res;
      }
      function Locale(config) {
        if (config != null) {
          this.set(config);
        }
      }
      var keys;
      if (Object.keys) {
        keys = Object.keys;
      } else {
        keys = function(obj) {
          var i, res = [];
          for (i in obj) {
            if (hasOwnProp(obj, i)) {
              res.push(i);
            }
          }
          return res;
        };
      }
      var defaultCalendar = {
        sameDay: "[Today at] LT",
        nextDay: "[Tomorrow at] LT",
        nextWeek: "dddd [at] LT",
        lastDay: "[Yesterday at] LT",
        lastWeek: "[Last] dddd [at] LT",
        sameElse: "L"
      };
      function calendar(key, mom, now2) {
        var output = this._calendar[key] || this._calendar["sameElse"];
        return isFunction2(output) ? output.call(mom, now2) : output;
      }
      function zeroFill(number, targetLength, forceSign) {
        var absNumber = "" + Math.abs(number), zerosToFill = targetLength - absNumber.length, sign3 = number >= 0;
        return (sign3 ? forceSign ? "+" : "" : "-") + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
      }
      var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, formatFunctions = {}, formatTokenFunctions = {};
      function addFormatToken(token2, padded, ordinal2, callback2) {
        var func = callback2;
        if (typeof callback2 === "string") {
          func = function() {
            return this[callback2]();
          };
        }
        if (token2) {
          formatTokenFunctions[token2] = func;
        }
        if (padded) {
          formatTokenFunctions[padded[0]] = function() {
            return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
          };
        }
        if (ordinal2) {
          formatTokenFunctions[ordinal2] = function() {
            return this.localeData().ordinal(
              func.apply(this, arguments),
              token2
            );
          };
        }
      }
      function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
          return input.replace(/^\[|\]$/g, "");
        }
        return input.replace(/\\/g, "");
      }
      function makeFormatFunction(format2) {
        var array = format2.match(formattingTokens), i, length;
        for (i = 0, length = array.length; i < length; i++) {
          if (formatTokenFunctions[array[i]]) {
            array[i] = formatTokenFunctions[array[i]];
          } else {
            array[i] = removeFormattingTokens(array[i]);
          }
        }
        return function(mom) {
          var output = "", i2;
          for (i2 = 0; i2 < length; i2++) {
            output += isFunction2(array[i2]) ? array[i2].call(mom, format2) : array[i2];
          }
          return output;
        };
      }
      function formatMoment(m, format2) {
        if (!m.isValid()) {
          return m.localeData().invalidDate();
        }
        format2 = expandFormat(format2, m.localeData());
        formatFunctions[format2] = formatFunctions[format2] || makeFormatFunction(format2);
        return formatFunctions[format2](m);
      }
      function expandFormat(format2, locale3) {
        var i = 5;
        function replaceLongDateFormatTokens(input) {
          return locale3.longDateFormat(input) || input;
        }
        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format2)) {
          format2 = format2.replace(
            localFormattingTokens,
            replaceLongDateFormatTokens
          );
          localFormattingTokens.lastIndex = 0;
          i -= 1;
        }
        return format2;
      }
      var defaultLongDateFormat = {
        LTS: "h:mm:ss A",
        LT: "h:mm A",
        L: "MM/DD/YYYY",
        LL: "MMMM D, YYYY",
        LLL: "MMMM D, YYYY h:mm A",
        LLLL: "dddd, MMMM D, YYYY h:mm A"
      };
      function longDateFormat(key) {
        var format2 = this._longDateFormat[key], formatUpper = this._longDateFormat[key.toUpperCase()];
        if (format2 || !formatUpper) {
          return format2;
        }
        this._longDateFormat[key] = formatUpper.match(formattingTokens).map(function(tok) {
          if (tok === "MMMM" || tok === "MM" || tok === "DD" || tok === "dddd") {
            return tok.slice(1);
          }
          return tok;
        }).join("");
        return this._longDateFormat[key];
      }
      var defaultInvalidDate = "Invalid date";
      function invalidDate() {
        return this._invalidDate;
      }
      var defaultOrdinal = "%d", defaultDayOfMonthOrdinalParse = /\d{1,2}/;
      function ordinal(number) {
        return this._ordinal.replace("%d", number);
      }
      var defaultRelativeTime = {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        ss: "%d seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        w: "a week",
        ww: "%d weeks",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
      };
      function relativeTime(number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return isFunction2(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
      }
      function pastFuture(diff2, output) {
        var format2 = this._relativeTime[diff2 > 0 ? "future" : "past"];
        return isFunction2(format2) ? format2(output) : format2.replace(/%s/i, output);
      }
      var aliases = {
        D: "date",
        dates: "date",
        date: "date",
        d: "day",
        days: "day",
        day: "day",
        e: "weekday",
        weekdays: "weekday",
        weekday: "weekday",
        E: "isoWeekday",
        isoweekdays: "isoWeekday",
        isoweekday: "isoWeekday",
        DDD: "dayOfYear",
        dayofyears: "dayOfYear",
        dayofyear: "dayOfYear",
        h: "hour",
        hours: "hour",
        hour: "hour",
        ms: "millisecond",
        milliseconds: "millisecond",
        millisecond: "millisecond",
        m: "minute",
        minutes: "minute",
        minute: "minute",
        M: "month",
        months: "month",
        month: "month",
        Q: "quarter",
        quarters: "quarter",
        quarter: "quarter",
        s: "second",
        seconds: "second",
        second: "second",
        gg: "weekYear",
        weekyears: "weekYear",
        weekyear: "weekYear",
        GG: "isoWeekYear",
        isoweekyears: "isoWeekYear",
        isoweekyear: "isoWeekYear",
        w: "week",
        weeks: "week",
        week: "week",
        W: "isoWeek",
        isoweeks: "isoWeek",
        isoweek: "isoWeek",
        y: "year",
        years: "year",
        year: "year"
      };
      function normalizeUnits(units) {
        return typeof units === "string" ? aliases[units] || aliases[units.toLowerCase()] : void 0;
      }
      function normalizeObjectUnits(inputObject) {
        var normalizedInput = {}, normalizedProp, prop;
        for (prop in inputObject) {
          if (hasOwnProp(inputObject, prop)) {
            normalizedProp = normalizeUnits(prop);
            if (normalizedProp) {
              normalizedInput[normalizedProp] = inputObject[prop];
            }
          }
        }
        return normalizedInput;
      }
      var priorities = {
        date: 9,
        day: 11,
        weekday: 11,
        isoWeekday: 11,
        dayOfYear: 4,
        hour: 13,
        millisecond: 16,
        minute: 14,
        month: 8,
        quarter: 7,
        second: 15,
        weekYear: 1,
        isoWeekYear: 1,
        week: 5,
        isoWeek: 5,
        year: 1
      };
      function getPrioritizedUnits(unitsObj) {
        var units = [], u;
        for (u in unitsObj) {
          if (hasOwnProp(unitsObj, u)) {
            units.push({ unit: u, priority: priorities[u] });
          }
        }
        units.sort(function(a, b) {
          return a.priority - b.priority;
        });
        return units;
      }
      var match1 = /\d/, match2 = /\d\d/, match3 = /\d{3}/, match4 = /\d{4}/, match6 = /[+-]?\d{6}/, match1to2 = /\d\d?/, match3to4 = /\d\d\d\d?/, match5to6 = /\d\d\d\d\d\d?/, match1to3 = /\d{1,3}/, match1to4 = /\d{1,4}/, match1to6 = /[+-]?\d{1,6}/, matchUnsigned = /\d+/, matchSigned = /[+-]?\d+/, matchOffset = /Z|[+-]\d\d:?\d\d/gi, matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, match1to2NoLeadingZero = /^[1-9]\d?/, match1to2HasZero = /^([1-9]\d|\d)/, regexes;
      regexes = {};
      function addRegexToken(token2, regex, strictRegex) {
        regexes[token2] = isFunction2(regex) ? regex : function(isStrict, localeData2) {
          return isStrict && strictRegex ? strictRegex : regex;
        };
      }
      function getParseRegexForToken(token2, config) {
        if (!hasOwnProp(regexes, token2)) {
          return new RegExp(unescapeFormat(token2));
        }
        return regexes[token2](config._strict, config._locale);
      }
      function unescapeFormat(s) {
        return regexEscape(
          s.replace("\\", "").replace(
            /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
            function(matched, p1, p2, p3, p4) {
              return p1 || p2 || p3 || p4;
            }
          )
        );
      }
      function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      }
      function absFloor(number) {
        if (number < 0) {
          return Math.ceil(number) || 0;
        } else {
          return Math.floor(number);
        }
      }
      function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion, value = 0;
        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
          value = absFloor(coercedNumber);
        }
        return value;
      }
      var tokens = {};
      function addParseToken(token2, callback2) {
        var i, func = callback2, tokenLen;
        if (typeof token2 === "string") {
          token2 = [token2];
        }
        if (isNumber2(callback2)) {
          func = function(input, array) {
            array[callback2] = toInt(input);
          };
        }
        tokenLen = token2.length;
        for (i = 0; i < tokenLen; i++) {
          tokens[token2[i]] = func;
        }
      }
      function addWeekParseToken(token2, callback2) {
        addParseToken(token2, function(input, array, config, token3) {
          config._w = config._w || {};
          callback2(input, config._w, config, token3);
        });
      }
      function addTimeToArrayFromToken(token2, input, config) {
        if (input != null && hasOwnProp(tokens, token2)) {
          tokens[token2](input, config._a, config, token2);
        }
      }
      function isLeapYear(year) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
      }
      var YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, WEEK = 7, WEEKDAY = 8;
      addFormatToken("Y", 0, 0, function() {
        var y = this.year();
        return y <= 9999 ? zeroFill(y, 4) : "+" + y;
      });
      addFormatToken(0, ["YY", 2], 0, function() {
        return this.year() % 100;
      });
      addFormatToken(0, ["YYYY", 4], 0, "year");
      addFormatToken(0, ["YYYYY", 5], 0, "year");
      addFormatToken(0, ["YYYYYY", 6, true], 0, "year");
      addRegexToken("Y", matchSigned);
      addRegexToken("YY", match1to2, match2);
      addRegexToken("YYYY", match1to4, match4);
      addRegexToken("YYYYY", match1to6, match6);
      addRegexToken("YYYYYY", match1to6, match6);
      addParseToken(["YYYYY", "YYYYYY"], YEAR);
      addParseToken("YYYY", function(input, array) {
        array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
      });
      addParseToken("YY", function(input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
      });
      addParseToken("Y", function(input, array) {
        array[YEAR] = parseInt(input, 10);
      });
      function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
      }
      hooks.parseTwoDigitYear = function(input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3);
      };
      var getSetYear = makeGetSet("FullYear", true);
      function getIsLeapYear() {
        return isLeapYear(this.year());
      }
      function makeGetSet(unit, keepTime) {
        return function(value) {
          if (value != null) {
            set$1(this, unit, value);
            hooks.updateOffset(this, keepTime);
            return this;
          } else {
            return get(this, unit);
          }
        };
      }
      function get(mom, unit) {
        if (!mom.isValid()) {
          return NaN;
        }
        var d = mom._d, isUTC = mom._isUTC;
        switch (unit) {
          case "Milliseconds":
            return isUTC ? d.getUTCMilliseconds() : d.getMilliseconds();
          case "Seconds":
            return isUTC ? d.getUTCSeconds() : d.getSeconds();
          case "Minutes":
            return isUTC ? d.getUTCMinutes() : d.getMinutes();
          case "Hours":
            return isUTC ? d.getUTCHours() : d.getHours();
          case "Date":
            return isUTC ? d.getUTCDate() : d.getDate();
          case "Day":
            return isUTC ? d.getUTCDay() : d.getDay();
          case "Month":
            return isUTC ? d.getUTCMonth() : d.getMonth();
          case "FullYear":
            return isUTC ? d.getUTCFullYear() : d.getFullYear();
          default:
            return NaN;
        }
      }
      function set$1(mom, unit, value) {
        var d, isUTC, year, month, date;
        if (!mom.isValid() || isNaN(value)) {
          return;
        }
        d = mom._d;
        isUTC = mom._isUTC;
        switch (unit) {
          case "Milliseconds":
            return void (isUTC ? d.setUTCMilliseconds(value) : d.setMilliseconds(value));
          case "Seconds":
            return void (isUTC ? d.setUTCSeconds(value) : d.setSeconds(value));
          case "Minutes":
            return void (isUTC ? d.setUTCMinutes(value) : d.setMinutes(value));
          case "Hours":
            return void (isUTC ? d.setUTCHours(value) : d.setHours(value));
          case "Date":
            return void (isUTC ? d.setUTCDate(value) : d.setDate(value));
          case "FullYear":
            break;
          default:
            return;
        }
        year = value;
        month = mom.month();
        date = mom.date();
        date = date === 29 && month === 1 && !isLeapYear(year) ? 28 : date;
        void (isUTC ? d.setUTCFullYear(year, month, date) : d.setFullYear(year, month, date));
      }
      function stringGet(units) {
        units = normalizeUnits(units);
        if (isFunction2(this[units])) {
          return this[units]();
        }
        return this;
      }
      function stringSet(units, value) {
        if (typeof units === "object") {
          units = normalizeObjectUnits(units);
          var prioritized = getPrioritizedUnits(units), i, prioritizedLen = prioritized.length;
          for (i = 0; i < prioritizedLen; i++) {
            this[prioritized[i].unit](units[prioritized[i].unit]);
          }
        } else {
          units = normalizeUnits(units);
          if (isFunction2(this[units])) {
            return this[units](value);
          }
        }
        return this;
      }
      function mod(n, x) {
        return (n % x + x) % x;
      }
      var indexOf;
      if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
      } else {
        indexOf = function(o) {
          var i;
          for (i = 0; i < this.length; ++i) {
            if (this[i] === o) {
              return i;
            }
          }
          return -1;
        };
      }
      function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
          return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
      }
      addFormatToken("M", ["MM", 2], "Mo", function() {
        return this.month() + 1;
      });
      addFormatToken("MMM", 0, 0, function(format2) {
        return this.localeData().monthsShort(this, format2);
      });
      addFormatToken("MMMM", 0, 0, function(format2) {
        return this.localeData().months(this, format2);
      });
      addRegexToken("M", match1to2, match1to2NoLeadingZero);
      addRegexToken("MM", match1to2, match2);
      addRegexToken("MMM", function(isStrict, locale3) {
        return locale3.monthsShortRegex(isStrict);
      });
      addRegexToken("MMMM", function(isStrict, locale3) {
        return locale3.monthsRegex(isStrict);
      });
      addParseToken(["M", "MM"], function(input, array) {
        array[MONTH] = toInt(input) - 1;
      });
      addParseToken(["MMM", "MMMM"], function(input, array, config, token2) {
        var month = config._locale.monthsParse(input, token2, config._strict);
        if (month != null) {
          array[MONTH] = month;
        } else {
          getParsingFlags(config).invalidMonth = input;
        }
      });
      var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split(
        "_"
      ), defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, defaultMonthsShortRegex = matchWord, defaultMonthsRegex = matchWord;
      function localeMonths(m, format2) {
        if (!m) {
          return isArray2(this._months) ? this._months : this._months["standalone"];
        }
        return isArray2(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format2) ? "format" : "standalone"][m.month()];
      }
      function localeMonthsShort(m, format2) {
        if (!m) {
          return isArray2(this._monthsShort) ? this._monthsShort : this._monthsShort["standalone"];
        }
        return isArray2(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format2) ? "format" : "standalone"][m.month()];
      }
      function handleStrictParse(monthName, format2, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
          this._monthsParse = [];
          this._longMonthsParse = [];
          this._shortMonthsParse = [];
          for (i = 0; i < 12; ++i) {
            mom = createUTC([2e3, i]);
            this._shortMonthsParse[i] = this.monthsShort(
              mom,
              ""
            ).toLocaleLowerCase();
            this._longMonthsParse[i] = this.months(mom, "").toLocaleLowerCase();
          }
        }
        if (strict) {
          if (format2 === "MMM") {
            ii = indexOf.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
          } else {
            ii = indexOf.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
          }
        } else {
          if (format2 === "MMM") {
            ii = indexOf.call(this._shortMonthsParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
          } else {
            ii = indexOf.call(this._longMonthsParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
          }
        }
      }
      function localeMonthsParse(monthName, format2, strict) {
        var i, mom, regex;
        if (this._monthsParseExact) {
          return handleStrictParse.call(this, monthName, format2, strict);
        }
        if (!this._monthsParse) {
          this._monthsParse = [];
          this._longMonthsParse = [];
          this._shortMonthsParse = [];
        }
        for (i = 0; i < 12; i++) {
          mom = createUTC([2e3, i]);
          if (strict && !this._longMonthsParse[i]) {
            this._longMonthsParse[i] = new RegExp(
              "^" + this.months(mom, "").replace(".", "") + "$",
              "i"
            );
            this._shortMonthsParse[i] = new RegExp(
              "^" + this.monthsShort(mom, "").replace(".", "") + "$",
              "i"
            );
          }
          if (!strict && !this._monthsParse[i]) {
            regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
            this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i");
          }
          if (strict && format2 === "MMMM" && this._longMonthsParse[i].test(monthName)) {
            return i;
          } else if (strict && format2 === "MMM" && this._shortMonthsParse[i].test(monthName)) {
            return i;
          } else if (!strict && this._monthsParse[i].test(monthName)) {
            return i;
          }
        }
      }
      function setMonth(mom, value) {
        if (!mom.isValid()) {
          return mom;
        }
        if (typeof value === "string") {
          if (/^\d+$/.test(value)) {
            value = toInt(value);
          } else {
            value = mom.localeData().monthsParse(value);
            if (!isNumber2(value)) {
              return mom;
            }
          }
        }
        var month = value, date = mom.date();
        date = date < 29 ? date : Math.min(date, daysInMonth(mom.year(), month));
        void (mom._isUTC ? mom._d.setUTCMonth(month, date) : mom._d.setMonth(month, date));
        return mom;
      }
      function getSetMonth(value) {
        if (value != null) {
          setMonth(this, value);
          hooks.updateOffset(this, true);
          return this;
        } else {
          return get(this, "Month");
        }
      }
      function getDaysInMonth() {
        return daysInMonth(this.year(), this.month());
      }
      function monthsShortRegex(isStrict) {
        if (this._monthsParseExact) {
          if (!hasOwnProp(this, "_monthsRegex")) {
            computeMonthsParse.call(this);
          }
          if (isStrict) {
            return this._monthsShortStrictRegex;
          } else {
            return this._monthsShortRegex;
          }
        } else {
          if (!hasOwnProp(this, "_monthsShortRegex")) {
            this._monthsShortRegex = defaultMonthsShortRegex;
          }
          return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
        }
      }
      function monthsRegex(isStrict) {
        if (this._monthsParseExact) {
          if (!hasOwnProp(this, "_monthsRegex")) {
            computeMonthsParse.call(this);
          }
          if (isStrict) {
            return this._monthsStrictRegex;
          } else {
            return this._monthsRegex;
          }
        } else {
          if (!hasOwnProp(this, "_monthsRegex")) {
            this._monthsRegex = defaultMonthsRegex;
          }
          return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
        }
      }
      function computeMonthsParse() {
        function cmpLenRev(a, b) {
          return b.length - a.length;
        }
        var shortPieces = [], longPieces = [], mixedPieces = [], i, mom, shortP, longP;
        for (i = 0; i < 12; i++) {
          mom = createUTC([2e3, i]);
          shortP = regexEscape(this.monthsShort(mom, ""));
          longP = regexEscape(this.months(mom, ""));
          shortPieces.push(shortP);
          longPieces.push(longP);
          mixedPieces.push(longP);
          mixedPieces.push(shortP);
        }
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        this._monthsRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp(
          "^(" + longPieces.join("|") + ")",
          "i"
        );
        this._monthsShortStrictRegex = new RegExp(
          "^(" + shortPieces.join("|") + ")",
          "i"
        );
      }
      function createDate(y, m, d, h4, M, s, ms) {
        var date;
        if (y < 100 && y >= 0) {
          date = new Date(y + 400, m, d, h4, M, s, ms);
          if (isFinite(date.getFullYear())) {
            date.setFullYear(y);
          }
        } else {
          date = new Date(y, m, d, h4, M, s, ms);
        }
        return date;
      }
      function createUTCDate(y) {
        var date, args;
        if (y < 100 && y >= 0) {
          args = Array.prototype.slice.call(arguments);
          args[0] = y + 400;
          date = new Date(Date.UTC.apply(null, args));
          if (isFinite(date.getUTCFullYear())) {
            date.setUTCFullYear(y);
          }
        } else {
          date = new Date(Date.UTC.apply(null, arguments));
        }
        return date;
      }
      function firstWeekOffset(year, dow, doy) {
        var fwd = 7 + dow - doy, fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
        return -fwdlw + fwd - 1;
      }
      function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7, weekOffset = firstWeekOffset(year, dow, doy), dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset, resYear, resDayOfYear;
        if (dayOfYear <= 0) {
          resYear = year - 1;
          resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
          resYear = year + 1;
          resDayOfYear = dayOfYear - daysInYear(year);
        } else {
          resYear = year;
          resDayOfYear = dayOfYear;
        }
        return {
          year: resYear,
          dayOfYear: resDayOfYear
        };
      }
      function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy), week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1, resWeek, resYear;
        if (week < 1) {
          resYear = mom.year() - 1;
          resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
          resWeek = week - weeksInYear(mom.year(), dow, doy);
          resYear = mom.year() + 1;
        } else {
          resYear = mom.year();
          resWeek = week;
        }
        return {
          week: resWeek,
          year: resYear
        };
      }
      function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy), weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
      }
      addFormatToken("w", ["ww", 2], "wo", "week");
      addFormatToken("W", ["WW", 2], "Wo", "isoWeek");
      addRegexToken("w", match1to2, match1to2NoLeadingZero);
      addRegexToken("ww", match1to2, match2);
      addRegexToken("W", match1to2, match1to2NoLeadingZero);
      addRegexToken("WW", match1to2, match2);
      addWeekParseToken(
        ["w", "ww", "W", "WW"],
        function(input, week, config, token2) {
          week[token2.substr(0, 1)] = toInt(input);
        }
      );
      function localeWeek(mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
      }
      var defaultLocaleWeek = {
        dow: 0,
        // Sunday is the first day of the week.
        doy: 6
        // The week that contains Jan 6th is the first week of the year.
      };
      function localeFirstDayOfWeek() {
        return this._week.dow;
      }
      function localeFirstDayOfYear() {
        return this._week.doy;
      }
      function getSetWeek(input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, "d");
      }
      function getSetISOWeek(input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, "d");
      }
      addFormatToken("d", 0, "do", "day");
      addFormatToken("dd", 0, 0, function(format2) {
        return this.localeData().weekdaysMin(this, format2);
      });
      addFormatToken("ddd", 0, 0, function(format2) {
        return this.localeData().weekdaysShort(this, format2);
      });
      addFormatToken("dddd", 0, 0, function(format2) {
        return this.localeData().weekdays(this, format2);
      });
      addFormatToken("e", 0, 0, "weekday");
      addFormatToken("E", 0, 0, "isoWeekday");
      addRegexToken("d", match1to2);
      addRegexToken("e", match1to2);
      addRegexToken("E", match1to2);
      addRegexToken("dd", function(isStrict, locale3) {
        return locale3.weekdaysMinRegex(isStrict);
      });
      addRegexToken("ddd", function(isStrict, locale3) {
        return locale3.weekdaysShortRegex(isStrict);
      });
      addRegexToken("dddd", function(isStrict, locale3) {
        return locale3.weekdaysRegex(isStrict);
      });
      addWeekParseToken(["dd", "ddd", "dddd"], function(input, week, config, token2) {
        var weekday = config._locale.weekdaysParse(input, token2, config._strict);
        if (weekday != null) {
          week.d = weekday;
        } else {
          getParsingFlags(config).invalidWeekday = input;
        }
      });
      addWeekParseToken(["d", "e", "E"], function(input, week, config, token2) {
        week[token2] = toInt(input);
      });
      function parseWeekday(input, locale3) {
        if (typeof input !== "string") {
          return input;
        }
        if (!isNaN(input)) {
          return parseInt(input, 10);
        }
        input = locale3.weekdaysParse(input);
        if (typeof input === "number") {
          return input;
        }
        return null;
      }
      function parseIsoWeekday(input, locale3) {
        if (typeof input === "string") {
          return locale3.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
      }
      function shiftWeekdays(ws, n) {
        return ws.slice(n, 7).concat(ws.slice(0, n));
      }
      var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), defaultWeekdaysRegex = matchWord, defaultWeekdaysShortRegex = matchWord, defaultWeekdaysMinRegex = matchWord;
      function localeWeekdays(m, format2) {
        var weekdays = isArray2(this._weekdays) ? this._weekdays : this._weekdays[m && m !== true && this._weekdays.isFormat.test(format2) ? "format" : "standalone"];
        return m === true ? shiftWeekdays(weekdays, this._week.dow) : m ? weekdays[m.day()] : weekdays;
      }
      function localeWeekdaysShort(m) {
        return m === true ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
      }
      function localeWeekdaysMin(m) {
        return m === true ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
      }
      function handleStrictParse$1(weekdayName, format2, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
          this._weekdaysParse = [];
          this._shortWeekdaysParse = [];
          this._minWeekdaysParse = [];
          for (i = 0; i < 7; ++i) {
            mom = createUTC([2e3, 1]).day(i);
            this._minWeekdaysParse[i] = this.weekdaysMin(
              mom,
              ""
            ).toLocaleLowerCase();
            this._shortWeekdaysParse[i] = this.weekdaysShort(
              mom,
              ""
            ).toLocaleLowerCase();
            this._weekdaysParse[i] = this.weekdays(mom, "").toLocaleLowerCase();
          }
        }
        if (strict) {
          if (format2 === "dddd") {
            ii = indexOf.call(this._weekdaysParse, llc);
            return ii !== -1 ? ii : null;
          } else if (format2 === "ddd") {
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
          } else {
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
          }
        } else {
          if (format2 === "dddd") {
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
          } else if (format2 === "ddd") {
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
          } else {
            ii = indexOf.call(this._minWeekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
          }
        }
      }
      function localeWeekdaysParse(weekdayName, format2, strict) {
        var i, mom, regex;
        if (this._weekdaysParseExact) {
          return handleStrictParse$1.call(this, weekdayName, format2, strict);
        }
        if (!this._weekdaysParse) {
          this._weekdaysParse = [];
          this._minWeekdaysParse = [];
          this._shortWeekdaysParse = [];
          this._fullWeekdaysParse = [];
        }
        for (i = 0; i < 7; i++) {
          mom = createUTC([2e3, 1]).day(i);
          if (strict && !this._fullWeekdaysParse[i]) {
            this._fullWeekdaysParse[i] = new RegExp(
              "^" + this.weekdays(mom, "").replace(".", "\\.?") + "$",
              "i"
            );
            this._shortWeekdaysParse[i] = new RegExp(
              "^" + this.weekdaysShort(mom, "").replace(".", "\\.?") + "$",
              "i"
            );
            this._minWeekdaysParse[i] = new RegExp(
              "^" + this.weekdaysMin(mom, "").replace(".", "\\.?") + "$",
              "i"
            );
          }
          if (!this._weekdaysParse[i]) {
            regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, "");
            this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i");
          }
          if (strict && format2 === "dddd" && this._fullWeekdaysParse[i].test(weekdayName)) {
            return i;
          } else if (strict && format2 === "ddd" && this._shortWeekdaysParse[i].test(weekdayName)) {
            return i;
          } else if (strict && format2 === "dd" && this._minWeekdaysParse[i].test(weekdayName)) {
            return i;
          } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
            return i;
          }
        }
      }
      function getSetDayOfWeek(input) {
        if (!this.isValid()) {
          return input != null ? this : NaN;
        }
        var day = get(this, "Day");
        if (input != null) {
          input = parseWeekday(input, this.localeData());
          return this.add(input - day, "d");
        } else {
          return day;
        }
      }
      function getSetLocaleDayOfWeek(input) {
        if (!this.isValid()) {
          return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, "d");
      }
      function getSetISODayOfWeek(input) {
        if (!this.isValid()) {
          return input != null ? this : NaN;
        }
        if (input != null) {
          var weekday = parseIsoWeekday(input, this.localeData());
          return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
          return this.day() || 7;
        }
      }
      function weekdaysRegex(isStrict) {
        if (this._weekdaysParseExact) {
          if (!hasOwnProp(this, "_weekdaysRegex")) {
            computeWeekdaysParse.call(this);
          }
          if (isStrict) {
            return this._weekdaysStrictRegex;
          } else {
            return this._weekdaysRegex;
          }
        } else {
          if (!hasOwnProp(this, "_weekdaysRegex")) {
            this._weekdaysRegex = defaultWeekdaysRegex;
          }
          return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
        }
      }
      function weekdaysShortRegex(isStrict) {
        if (this._weekdaysParseExact) {
          if (!hasOwnProp(this, "_weekdaysRegex")) {
            computeWeekdaysParse.call(this);
          }
          if (isStrict) {
            return this._weekdaysShortStrictRegex;
          } else {
            return this._weekdaysShortRegex;
          }
        } else {
          if (!hasOwnProp(this, "_weekdaysShortRegex")) {
            this._weekdaysShortRegex = defaultWeekdaysShortRegex;
          }
          return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
      }
      function weekdaysMinRegex(isStrict) {
        if (this._weekdaysParseExact) {
          if (!hasOwnProp(this, "_weekdaysRegex")) {
            computeWeekdaysParse.call(this);
          }
          if (isStrict) {
            return this._weekdaysMinStrictRegex;
          } else {
            return this._weekdaysMinRegex;
          }
        } else {
          if (!hasOwnProp(this, "_weekdaysMinRegex")) {
            this._weekdaysMinRegex = defaultWeekdaysMinRegex;
          }
          return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
      }
      function computeWeekdaysParse() {
        function cmpLenRev(a, b) {
          return b.length - a.length;
        }
        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [], i, mom, minp, shortp, longp;
        for (i = 0; i < 7; i++) {
          mom = createUTC([2e3, 1]).day(i);
          minp = regexEscape(this.weekdaysMin(mom, ""));
          shortp = regexEscape(this.weekdaysShort(mom, ""));
          longp = regexEscape(this.weekdays(mom, ""));
          minPieces.push(minp);
          shortPieces.push(shortp);
          longPieces.push(longp);
          mixedPieces.push(minp);
          mixedPieces.push(shortp);
          mixedPieces.push(longp);
        }
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        this._weekdaysRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;
        this._weekdaysStrictRegex = new RegExp(
          "^(" + longPieces.join("|") + ")",
          "i"
        );
        this._weekdaysShortStrictRegex = new RegExp(
          "^(" + shortPieces.join("|") + ")",
          "i"
        );
        this._weekdaysMinStrictRegex = new RegExp(
          "^(" + minPieces.join("|") + ")",
          "i"
        );
      }
      function hFormat() {
        return this.hours() % 12 || 12;
      }
      function kFormat() {
        return this.hours() || 24;
      }
      addFormatToken("H", ["HH", 2], 0, "hour");
      addFormatToken("h", ["hh", 2], 0, hFormat);
      addFormatToken("k", ["kk", 2], 0, kFormat);
      addFormatToken("hmm", 0, 0, function() {
        return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2);
      });
      addFormatToken("hmmss", 0, 0, function() {
        return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
      });
      addFormatToken("Hmm", 0, 0, function() {
        return "" + this.hours() + zeroFill(this.minutes(), 2);
      });
      addFormatToken("Hmmss", 0, 0, function() {
        return "" + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
      });
      function meridiem(token2, lowercase) {
        addFormatToken(token2, 0, 0, function() {
          return this.localeData().meridiem(
            this.hours(),
            this.minutes(),
            lowercase
          );
        });
      }
      meridiem("a", true);
      meridiem("A", false);
      function matchMeridiem(isStrict, locale3) {
        return locale3._meridiemParse;
      }
      addRegexToken("a", matchMeridiem);
      addRegexToken("A", matchMeridiem);
      addRegexToken("H", match1to2, match1to2HasZero);
      addRegexToken("h", match1to2, match1to2NoLeadingZero);
      addRegexToken("k", match1to2, match1to2NoLeadingZero);
      addRegexToken("HH", match1to2, match2);
      addRegexToken("hh", match1to2, match2);
      addRegexToken("kk", match1to2, match2);
      addRegexToken("hmm", match3to4);
      addRegexToken("hmmss", match5to6);
      addRegexToken("Hmm", match3to4);
      addRegexToken("Hmmss", match5to6);
      addParseToken(["H", "HH"], HOUR);
      addParseToken(["k", "kk"], function(input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
      });
      addParseToken(["a", "A"], function(input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
      });
      addParseToken(["h", "hh"], function(input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
      });
      addParseToken("hmm", function(input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
      });
      addParseToken("hmmss", function(input, array, config) {
        var pos1 = input.length - 4, pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
      });
      addParseToken("Hmm", function(input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
      });
      addParseToken("Hmmss", function(input, array, config) {
        var pos1 = input.length - 4, pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
      });
      function localeIsPM(input) {
        return (input + "").toLowerCase().charAt(0) === "p";
      }
      var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i, getSetHour = makeGetSet("Hours", true);
      function localeMeridiem(hours2, minutes2, isLower) {
        if (hours2 > 11) {
          return isLower ? "pm" : "PM";
        } else {
          return isLower ? "am" : "AM";
        }
      }
      var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,
        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,
        week: defaultLocaleWeek,
        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,
        meridiemParse: defaultLocaleMeridiemParse
      };
      var locales = {}, localeFamilies = {}, globalLocale;
      function commonPrefix(arr1, arr2) {
        var i, minl = Math.min(arr1.length, arr2.length);
        for (i = 0; i < minl; i += 1) {
          if (arr1[i] !== arr2[i]) {
            return i;
          }
        }
        return minl;
      }
      function normalizeLocale(key) {
        return key ? key.toLowerCase().replace("_", "-") : key;
      }
      function chooseLocale(names2) {
        var i = 0, j, next, locale3, split;
        while (i < names2.length) {
          split = normalizeLocale(names2[i]).split("-");
          j = split.length;
          next = normalizeLocale(names2[i + 1]);
          next = next ? next.split("-") : null;
          while (j > 0) {
            locale3 = loadLocale(split.slice(0, j).join("-"));
            if (locale3) {
              return locale3;
            }
            if (next && next.length >= j && commonPrefix(split, next) >= j - 1) {
              break;
            }
            j--;
          }
          i++;
        }
        return globalLocale;
      }
      function isLocaleNameSane(name) {
        return !!(name && name.match("^[^/\\\\]*$"));
      }
      function loadLocale(name) {
        var oldLocale = null, aliasedRequire;
        if (locales[name] === void 0 && typeof module2 !== "undefined" && module2 && module2.exports && isLocaleNameSane(name)) {
          try {
            oldLocale = globalLocale._abbr;
            aliasedRequire = require;
            aliasedRequire("./locale/" + name);
            getSetGlobalLocale(oldLocale);
          } catch (e) {
            locales[name] = null;
          }
        }
        return locales[name];
      }
      function getSetGlobalLocale(key, values) {
        var data;
        if (key) {
          if (isUndefined(values)) {
            data = getLocale(key);
          } else {
            data = defineLocale(key, values);
          }
          if (data) {
            globalLocale = data;
          } else {
            if (typeof console !== "undefined" && console.warn) {
              console.warn(
                "Locale " + key + " not found. Did you forget to load it?"
              );
            }
          }
        }
        return globalLocale._abbr;
      }
      function defineLocale(name, config) {
        if (config !== null) {
          var locale3, parentConfig = baseConfig;
          config.abbr = name;
          if (locales[name] != null) {
            deprecateSimple(
              "defineLocaleOverride",
              "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
            );
            parentConfig = locales[name]._config;
          } else if (config.parentLocale != null) {
            if (locales[config.parentLocale] != null) {
              parentConfig = locales[config.parentLocale]._config;
            } else {
              locale3 = loadLocale(config.parentLocale);
              if (locale3 != null) {
                parentConfig = locale3._config;
              } else {
                if (!localeFamilies[config.parentLocale]) {
                  localeFamilies[config.parentLocale] = [];
                }
                localeFamilies[config.parentLocale].push({
                  name,
                  config
                });
                return null;
              }
            }
          }
          locales[name] = new Locale(mergeConfigs(parentConfig, config));
          if (localeFamilies[name]) {
            localeFamilies[name].forEach(function(x) {
              defineLocale(x.name, x.config);
            });
          }
          getSetGlobalLocale(name);
          return locales[name];
        } else {
          delete locales[name];
          return null;
        }
      }
      function updateLocale(name, config) {
        if (config != null) {
          var locale3, tmpLocale, parentConfig = baseConfig;
          if (locales[name] != null && locales[name].parentLocale != null) {
            locales[name].set(mergeConfigs(locales[name]._config, config));
          } else {
            tmpLocale = loadLocale(name);
            if (tmpLocale != null) {
              parentConfig = tmpLocale._config;
            }
            config = mergeConfigs(parentConfig, config);
            if (tmpLocale == null) {
              config.abbr = name;
            }
            locale3 = new Locale(config);
            locale3.parentLocale = locales[name];
            locales[name] = locale3;
          }
          getSetGlobalLocale(name);
        } else {
          if (locales[name] != null) {
            if (locales[name].parentLocale != null) {
              locales[name] = locales[name].parentLocale;
              if (name === getSetGlobalLocale()) {
                getSetGlobalLocale(name);
              }
            } else if (locales[name] != null) {
              delete locales[name];
            }
          }
        }
        return locales[name];
      }
      function getLocale(key) {
        var locale3;
        if (key && key._locale && key._locale._abbr) {
          key = key._locale._abbr;
        }
        if (!key) {
          return globalLocale;
        }
        if (!isArray2(key)) {
          locale3 = loadLocale(key);
          if (locale3) {
            return locale3;
          }
          key = [key];
        }
        return chooseLocale(key);
      }
      function listLocales() {
        return keys(locales);
      }
      function checkOverflow(m) {
        var overflow, a = m._a;
        if (a && getParsingFlags(m).overflow === -2) {
          overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;
          if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
            overflow = DATE;
          }
          if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
            overflow = WEEK;
          }
          if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
            overflow = WEEKDAY;
          }
          getParsingFlags(m).overflow = overflow;
        }
        return m;
      }
      var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, tzRegex = /Z|[+-]\d\d(?::?\d\d)?/, isoDates = [
        ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
        ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
        ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
        ["GGGG-[W]WW", /\d{4}-W\d\d/, false],
        ["YYYY-DDD", /\d{4}-\d{3}/],
        ["YYYY-MM", /\d{4}-\d\d/, false],
        ["YYYYYYMMDD", /[+-]\d{10}/],
        ["YYYYMMDD", /\d{8}/],
        ["GGGG[W]WWE", /\d{4}W\d{3}/],
        ["GGGG[W]WW", /\d{4}W\d{2}/, false],
        ["YYYYDDD", /\d{7}/],
        ["YYYYMM", /\d{6}/, false],
        ["YYYY", /\d{4}/, false]
      ], isoTimes = [
        ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
        ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
        ["HH:mm:ss", /\d\d:\d\d:\d\d/],
        ["HH:mm", /\d\d:\d\d/],
        ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
        ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
        ["HHmmss", /\d\d\d\d\d\d/],
        ["HHmm", /\d\d\d\d/],
        ["HH", /\d\d/]
      ], aspNetJsonRegex = /^\/?Date\((-?\d+)/i, rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, obsOffsets = {
        UT: 0,
        GMT: 0,
        EDT: -4 * 60,
        EST: -5 * 60,
        CDT: -5 * 60,
        CST: -6 * 60,
        MDT: -6 * 60,
        MST: -7 * 60,
        PDT: -7 * 60,
        PST: -8 * 60
      };
      function configFromISO(config) {
        var i, l, string = config._i, match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string), allowTime, dateFormat, timeFormat, tzFormat, isoDatesLen = isoDates.length, isoTimesLen = isoTimes.length;
        if (match) {
          getParsingFlags(config).iso = true;
          for (i = 0, l = isoDatesLen; i < l; i++) {
            if (isoDates[i][1].exec(match[1])) {
              dateFormat = isoDates[i][0];
              allowTime = isoDates[i][2] !== false;
              break;
            }
          }
          if (dateFormat == null) {
            config._isValid = false;
            return;
          }
          if (match[3]) {
            for (i = 0, l = isoTimesLen; i < l; i++) {
              if (isoTimes[i][1].exec(match[3])) {
                timeFormat = (match[2] || " ") + isoTimes[i][0];
                break;
              }
            }
            if (timeFormat == null) {
              config._isValid = false;
              return;
            }
          }
          if (!allowTime && timeFormat != null) {
            config._isValid = false;
            return;
          }
          if (match[4]) {
            if (tzRegex.exec(match[4])) {
              tzFormat = "Z";
            } else {
              config._isValid = false;
              return;
            }
          }
          config._f = dateFormat + (timeFormat || "") + (tzFormat || "");
          configFromStringAndFormat(config);
        } else {
          config._isValid = false;
        }
      }
      function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
        var result = [
          untruncateYear(yearStr),
          defaultLocaleMonthsShort.indexOf(monthStr),
          parseInt(dayStr, 10),
          parseInt(hourStr, 10),
          parseInt(minuteStr, 10)
        ];
        if (secondStr) {
          result.push(parseInt(secondStr, 10));
        }
        return result;
      }
      function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) {
          return 2e3 + year;
        } else if (year <= 999) {
          return 1900 + year;
        }
        return year;
      }
      function preprocessRFC2822(s) {
        return s.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
      }
      function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
          var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr), weekdayActual = new Date(
            parsedInput[0],
            parsedInput[1],
            parsedInput[2]
          ).getDay();
          if (weekdayProvided !== weekdayActual) {
            getParsingFlags(config).weekdayMismatch = true;
            config._isValid = false;
            return false;
          }
        }
        return true;
      }
      function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
          return obsOffsets[obsOffset];
        } else if (militaryOffset) {
          return 0;
        } else {
          var hm = parseInt(numOffset, 10), m = hm % 100, h4 = (hm - m) / 100;
          return h4 * 60 + m;
        }
      }
      function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i)), parsedArray;
        if (match) {
          parsedArray = extractFromRFC2822Strings(
            match[4],
            match[3],
            match[2],
            match[5],
            match[6],
            match[7]
          );
          if (!checkWeekday(match[1], parsedArray, config)) {
            return;
          }
          config._a = parsedArray;
          config._tzm = calculateOffset(match[8], match[9], match[10]);
          config._d = createUTCDate.apply(null, config._a);
          config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
          getParsingFlags(config).rfc2822 = true;
        } else {
          config._isValid = false;
        }
      }
      function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);
        if (matched !== null) {
          config._d = /* @__PURE__ */ new Date(+matched[1]);
          return;
        }
        configFromISO(config);
        if (config._isValid === false) {
          delete config._isValid;
        } else {
          return;
        }
        configFromRFC2822(config);
        if (config._isValid === false) {
          delete config._isValid;
        } else {
          return;
        }
        if (config._strict) {
          config._isValid = false;
        } else {
          hooks.createFromInputFallback(config);
        }
      }
      hooks.createFromInputFallback = deprecate(
        "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
        function(config) {
          config._d = /* @__PURE__ */ new Date(config._i + (config._useUTC ? " UTC" : ""));
        }
      );
      function defaults2(a, b, c) {
        if (a != null) {
          return a;
        }
        if (b != null) {
          return b;
        }
        return c;
      }
      function currentDateArray(config) {
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
          return [
            nowValue.getUTCFullYear(),
            nowValue.getUTCMonth(),
            nowValue.getUTCDate()
          ];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
      }
      function configFromArray(config) {
        var i, date, input = [], currentDate, expectedWeekday, yearToUse;
        if (config._d) {
          return;
        }
        currentDate = currentDateArray(config);
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
          dayOfYearFromWeekInfo(config);
        }
        if (config._dayOfYear != null) {
          yearToUse = defaults2(config._a[YEAR], currentDate[YEAR]);
          if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
            getParsingFlags(config)._overflowDayOfYear = true;
          }
          date = createUTCDate(yearToUse, 0, config._dayOfYear);
          config._a[MONTH] = date.getUTCMonth();
          config._a[DATE] = date.getUTCDate();
        }
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
          config._a[i] = input[i] = currentDate[i];
        }
        for (; i < 7; i++) {
          config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
        }
        if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
          config._nextDay = true;
          config._a[HOUR] = 0;
        }
        config._d = (config._useUTC ? createUTCDate : createDate).apply(
          null,
          input
        );
        expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();
        if (config._tzm != null) {
          config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }
        if (config._nextDay) {
          config._a[HOUR] = 24;
        }
        if (config._w && typeof config._w.d !== "undefined" && config._w.d !== expectedWeekday) {
          getParsingFlags(config).weekdayMismatch = true;
        }
      }
      function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;
        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
          dow = 1;
          doy = 4;
          weekYear = defaults2(
            w.GG,
            config._a[YEAR],
            weekOfYear(createLocal(), 1, 4).year
          );
          week = defaults2(w.W, 1);
          weekday = defaults2(w.E, 1);
          if (weekday < 1 || weekday > 7) {
            weekdayOverflow = true;
          }
        } else {
          dow = config._locale._week.dow;
          doy = config._locale._week.doy;
          curWeek = weekOfYear(createLocal(), dow, doy);
          weekYear = defaults2(w.gg, config._a[YEAR], curWeek.year);
          week = defaults2(w.w, curWeek.week);
          if (w.d != null) {
            weekday = w.d;
            if (weekday < 0 || weekday > 6) {
              weekdayOverflow = true;
            }
          } else if (w.e != null) {
            weekday = w.e + dow;
            if (w.e < 0 || w.e > 6) {
              weekdayOverflow = true;
            }
          } else {
            weekday = dow;
          }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
          getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
          getParsingFlags(config)._overflowWeekday = true;
        } else {
          temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
          config._a[YEAR] = temp.year;
          config._dayOfYear = temp.dayOfYear;
        }
      }
      hooks.ISO_8601 = function() {
      };
      hooks.RFC_2822 = function() {
      };
      function configFromStringAndFormat(config) {
        if (config._f === hooks.ISO_8601) {
          configFromISO(config);
          return;
        }
        if (config._f === hooks.RFC_2822) {
          configFromRFC2822(config);
          return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;
        var string = "" + config._i, i, parsedInput, tokens2, token2, skipped, stringLength = string.length, totalParsedInputLength = 0, era, tokenLen;
        tokens2 = expandFormat(config._f, config._locale).match(formattingTokens) || [];
        tokenLen = tokens2.length;
        for (i = 0; i < tokenLen; i++) {
          token2 = tokens2[i];
          parsedInput = (string.match(getParseRegexForToken(token2, config)) || [])[0];
          if (parsedInput) {
            skipped = string.substr(0, string.indexOf(parsedInput));
            if (skipped.length > 0) {
              getParsingFlags(config).unusedInput.push(skipped);
            }
            string = string.slice(
              string.indexOf(parsedInput) + parsedInput.length
            );
            totalParsedInputLength += parsedInput.length;
          }
          if (formatTokenFunctions[token2]) {
            if (parsedInput) {
              getParsingFlags(config).empty = false;
            } else {
              getParsingFlags(config).unusedTokens.push(token2);
            }
            addTimeToArrayFromToken(token2, parsedInput, config);
          } else if (config._strict && !parsedInput) {
            getParsingFlags(config).unusedTokens.push(token2);
          }
        }
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
          getParsingFlags(config).unusedInput.push(string);
        }
        if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
          getParsingFlags(config).bigHour = void 0;
        }
        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        config._a[HOUR] = meridiemFixWrap(
          config._locale,
          config._a[HOUR],
          config._meridiem
        );
        era = getParsingFlags(config).era;
        if (era !== null) {
          config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
        }
        configFromArray(config);
        checkOverflow(config);
      }
      function meridiemFixWrap(locale3, hour, meridiem2) {
        var isPm;
        if (meridiem2 == null) {
          return hour;
        }
        if (locale3.meridiemHour != null) {
          return locale3.meridiemHour(hour, meridiem2);
        } else if (locale3.isPM != null) {
          isPm = locale3.isPM(meridiem2);
          if (isPm && hour < 12) {
            hour += 12;
          }
          if (!isPm && hour === 12) {
            hour = 0;
          }
          return hour;
        } else {
          return hour;
        }
      }
      function configFromStringAndArray(config) {
        var tempConfig, bestMoment, scoreToBeat, i, currentScore, validFormatFound, bestFormatIsValid = false, configfLen = config._f.length;
        if (configfLen === 0) {
          getParsingFlags(config).invalidFormat = true;
          config._d = /* @__PURE__ */ new Date(NaN);
          return;
        }
        for (i = 0; i < configfLen; i++) {
          currentScore = 0;
          validFormatFound = false;
          tempConfig = copyConfig({}, config);
          if (config._useUTC != null) {
            tempConfig._useUTC = config._useUTC;
          }
          tempConfig._f = config._f[i];
          configFromStringAndFormat(tempConfig);
          if (isValid(tempConfig)) {
            validFormatFound = true;
          }
          currentScore += getParsingFlags(tempConfig).charsLeftOver;
          currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
          getParsingFlags(tempConfig).score = currentScore;
          if (!bestFormatIsValid) {
            if (scoreToBeat == null || currentScore < scoreToBeat || validFormatFound) {
              scoreToBeat = currentScore;
              bestMoment = tempConfig;
              if (validFormatFound) {
                bestFormatIsValid = true;
              }
            }
          } else {
            if (currentScore < scoreToBeat) {
              scoreToBeat = currentScore;
              bestMoment = tempConfig;
            }
          }
        }
        extend(config, bestMoment || tempConfig);
      }
      function configFromObject(config) {
        if (config._d) {
          return;
        }
        var i = normalizeObjectUnits(config._i), dayOrDate = i.day === void 0 ? i.date : i.day;
        config._a = map3(
          [i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond],
          function(obj) {
            return obj && parseInt(obj, 10);
          }
        );
        configFromArray(config);
      }
      function createFromConfig(config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
          res.add(1, "d");
          res._nextDay = void 0;
        }
        return res;
      }
      function prepareConfig(config) {
        var input = config._i, format2 = config._f;
        config._locale = config._locale || getLocale(config._l);
        if (input === null || format2 === void 0 && input === "") {
          return createInvalid({ nullInput: true });
        }
        if (typeof input === "string") {
          config._i = input = config._locale.preparse(input);
        }
        if (isMoment(input)) {
          return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
          config._d = input;
        } else if (isArray2(format2)) {
          configFromStringAndArray(config);
        } else if (format2) {
          configFromStringAndFormat(config);
        } else {
          configFromInput(config);
        }
        if (!isValid(config)) {
          config._d = null;
        }
        return config;
      }
      function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
          config._d = new Date(hooks.now());
        } else if (isDate(input)) {
          config._d = new Date(input.valueOf());
        } else if (typeof input === "string") {
          configFromString(config);
        } else if (isArray2(input)) {
          config._a = map3(input.slice(0), function(obj) {
            return parseInt(obj, 10);
          });
          configFromArray(config);
        } else if (isObject2(input)) {
          configFromObject(config);
        } else if (isNumber2(input)) {
          config._d = new Date(input);
        } else {
          hooks.createFromInputFallback(config);
        }
      }
      function createLocalOrUTC(input, format2, locale3, strict, isUTC) {
        var c = {};
        if (format2 === true || format2 === false) {
          strict = format2;
          format2 = void 0;
        }
        if (locale3 === true || locale3 === false) {
          strict = locale3;
          locale3 = void 0;
        }
        if (isObject2(input) && isObjectEmpty(input) || isArray2(input) && input.length === 0) {
          input = void 0;
        }
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale3;
        c._i = input;
        c._f = format2;
        c._strict = strict;
        return createFromConfig(c);
      }
      function createLocal(input, format2, locale3, strict) {
        return createLocalOrUTC(input, format2, locale3, strict, false);
      }
      var prototypeMin = deprecate(
        "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
        function() {
          var other = createLocal.apply(null, arguments);
          if (this.isValid() && other.isValid()) {
            return other < this ? this : other;
          } else {
            return createInvalid();
          }
        }
      ), prototypeMax = deprecate(
        "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
        function() {
          var other = createLocal.apply(null, arguments);
          if (this.isValid() && other.isValid()) {
            return other > this ? this : other;
          } else {
            return createInvalid();
          }
        }
      );
      function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray2(moments[0])) {
          moments = moments[0];
        }
        if (!moments.length) {
          return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
          if (!moments[i].isValid() || moments[i][fn](res)) {
            res = moments[i];
          }
        }
        return res;
      }
      function min() {
        var args = [].slice.call(arguments, 0);
        return pickBy("isBefore", args);
      }
      function max() {
        var args = [].slice.call(arguments, 0);
        return pickBy("isAfter", args);
      }
      var now = function() {
        return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
      };
      var ordering = [
        "year",
        "quarter",
        "month",
        "week",
        "day",
        "hour",
        "minute",
        "second",
        "millisecond"
      ];
      function isDurationValid(m) {
        var key, unitHasDecimal = false, i, orderLen = ordering.length;
        for (key in m) {
          if (hasOwnProp(m, key) && !(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
            return false;
          }
        }
        for (i = 0; i < orderLen; ++i) {
          if (m[ordering[i]]) {
            if (unitHasDecimal) {
              return false;
            }
            if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
              unitHasDecimal = true;
            }
          }
        }
        return true;
      }
      function isValid$1() {
        return this._isValid;
      }
      function createInvalid$1() {
        return createDuration(NaN);
      }
      function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration), years2 = normalizedInput.year || 0, quarters = normalizedInput.quarter || 0, months2 = normalizedInput.month || 0, weeks2 = normalizedInput.week || normalizedInput.isoWeek || 0, days2 = normalizedInput.day || 0, hours2 = normalizedInput.hour || 0, minutes2 = normalizedInput.minute || 0, seconds2 = normalizedInput.second || 0, milliseconds2 = normalizedInput.millisecond || 0;
        this._isValid = isDurationValid(normalizedInput);
        this._milliseconds = +milliseconds2 + seconds2 * 1e3 + // 1000
        minutes2 * 6e4 + // 1000 * 60
        hours2 * 1e3 * 60 * 60;
        this._days = +days2 + weeks2 * 7;
        this._months = +months2 + quarters * 3 + years2 * 12;
        this._data = {};
        this._locale = getLocale();
        this._bubble();
      }
      function isDuration(obj) {
        return obj instanceof Duration;
      }
      function absRound(number) {
        if (number < 0) {
          return Math.round(-1 * number) * -1;
        } else {
          return Math.round(number);
        }
      }
      function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0, i;
        for (i = 0; i < len; i++) {
          if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) {
            diffs++;
          }
        }
        return diffs + lengthDiff;
      }
      function offset(token2, separator) {
        addFormatToken(token2, 0, 0, function() {
          var offset2 = this.utcOffset(), sign3 = "+";
          if (offset2 < 0) {
            offset2 = -offset2;
            sign3 = "-";
          }
          return sign3 + zeroFill(~~(offset2 / 60), 2) + separator + zeroFill(~~offset2 % 60, 2);
        });
      }
      offset("Z", ":");
      offset("ZZ", "");
      addRegexToken("Z", matchShortOffset);
      addRegexToken("ZZ", matchShortOffset);
      addParseToken(["Z", "ZZ"], function(input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
      });
      var chunkOffset = /([\+\-]|\d\d)/gi;
      function offsetFromString(matcher, string) {
        var matches = (string || "").match(matcher), chunk, parts, minutes2;
        if (matches === null) {
          return null;
        }
        chunk = matches[matches.length - 1] || [];
        parts = (chunk + "").match(chunkOffset) || ["-", 0, 0];
        minutes2 = +(parts[1] * 60) + toInt(parts[2]);
        return minutes2 === 0 ? 0 : parts[0] === "+" ? minutes2 : -minutes2;
      }
      function cloneWithOffset(input, model) {
        var res, diff2;
        if (model._isUTC) {
          res = model.clone();
          diff2 = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
          res._d.setTime(res._d.valueOf() + diff2);
          hooks.updateOffset(res, false);
          return res;
        } else {
          return createLocal(input).local();
        }
      }
      function getDateOffset(m) {
        return -Math.round(m._d.getTimezoneOffset());
      }
      hooks.updateOffset = function() {
      };
      function getSetOffset(input, keepLocalTime, keepMinutes) {
        var offset2 = this._offset || 0, localAdjust;
        if (!this.isValid()) {
          return input != null ? this : NaN;
        }
        if (input != null) {
          if (typeof input === "string") {
            input = offsetFromString(matchShortOffset, input);
            if (input === null) {
              return this;
            }
          } else if (Math.abs(input) < 16 && !keepMinutes) {
            input = input * 60;
          }
          if (!this._isUTC && keepLocalTime) {
            localAdjust = getDateOffset(this);
          }
          this._offset = input;
          this._isUTC = true;
          if (localAdjust != null) {
            this.add(localAdjust, "m");
          }
          if (offset2 !== input) {
            if (!keepLocalTime || this._changeInProgress) {
              addSubtract(
                this,
                createDuration(input - offset2, "m"),
                1,
                false
              );
            } else if (!this._changeInProgress) {
              this._changeInProgress = true;
              hooks.updateOffset(this, true);
              this._changeInProgress = null;
            }
          }
          return this;
        } else {
          return this._isUTC ? offset2 : getDateOffset(this);
        }
      }
      function getSetZone(input, keepLocalTime) {
        if (input != null) {
          if (typeof input !== "string") {
            input = -input;
          }
          this.utcOffset(input, keepLocalTime);
          return this;
        } else {
          return -this.utcOffset();
        }
      }
      function setOffsetToUTC(keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
      }
      function setOffsetToLocal(keepLocalTime) {
        if (this._isUTC) {
          this.utcOffset(0, keepLocalTime);
          this._isUTC = false;
          if (keepLocalTime) {
            this.subtract(getDateOffset(this), "m");
          }
        }
        return this;
      }
      function setOffsetToParsedOffset() {
        if (this._tzm != null) {
          this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === "string") {
          var tZone = offsetFromString(matchOffset, this._i);
          if (tZone != null) {
            this.utcOffset(tZone);
          } else {
            this.utcOffset(0, true);
          }
        }
        return this;
      }
      function hasAlignedHourOffset(input) {
        if (!this.isValid()) {
          return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;
        return (this.utcOffset() - input) % 60 === 0;
      }
      function isDaylightSavingTime() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
      }
      function isDaylightSavingTimeShifted() {
        if (!isUndefined(this._isDSTShifted)) {
          return this._isDSTShifted;
        }
        var c = {}, other;
        copyConfig(c, this);
        c = prepareConfig(c);
        if (c._a) {
          other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
          this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
        } else {
          this._isDSTShifted = false;
        }
        return this._isDSTShifted;
      }
      function isLocal() {
        return this.isValid() ? !this._isUTC : false;
      }
      function isUtcOffset() {
        return this.isValid() ? this._isUTC : false;
      }
      function isUtc() {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
      }
      var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
      function createDuration(input, key) {
        var duration = input, match = null, sign3, ret, diffRes;
        if (isDuration(input)) {
          duration = {
            ms: input._milliseconds,
            d: input._days,
            M: input._months
          };
        } else if (isNumber2(input) || !isNaN(+input)) {
          duration = {};
          if (key) {
            duration[key] = +input;
          } else {
            duration.milliseconds = +input;
          }
        } else if (match = aspNetRegex.exec(input)) {
          sign3 = match[1] === "-" ? -1 : 1;
          duration = {
            y: 0,
            d: toInt(match[DATE]) * sign3,
            h: toInt(match[HOUR]) * sign3,
            m: toInt(match[MINUTE]) * sign3,
            s: toInt(match[SECOND]) * sign3,
            ms: toInt(absRound(match[MILLISECOND] * 1e3)) * sign3
            // the millisecond decimal point is included in the match
          };
        } else if (match = isoRegex.exec(input)) {
          sign3 = match[1] === "-" ? -1 : 1;
          duration = {
            y: parseIso(match[2], sign3),
            M: parseIso(match[3], sign3),
            w: parseIso(match[4], sign3),
            d: parseIso(match[5], sign3),
            h: parseIso(match[6], sign3),
            m: parseIso(match[7], sign3),
            s: parseIso(match[8], sign3)
          };
        } else if (duration == null) {
          duration = {};
        } else if (typeof duration === "object" && ("from" in duration || "to" in duration)) {
          diffRes = momentsDifference(
            createLocal(duration.from),
            createLocal(duration.to)
          );
          duration = {};
          duration.ms = diffRes.milliseconds;
          duration.M = diffRes.months;
        }
        ret = new Duration(duration);
        if (isDuration(input) && hasOwnProp(input, "_locale")) {
          ret._locale = input._locale;
        }
        if (isDuration(input) && hasOwnProp(input, "_isValid")) {
          ret._isValid = input._isValid;
        }
        return ret;
      }
      createDuration.fn = Duration.prototype;
      createDuration.invalid = createInvalid$1;
      function parseIso(inp, sign3) {
        var res = inp && parseFloat(inp.replace(",", "."));
        return (isNaN(res) ? 0 : res) * sign3;
      }
      function positiveMomentsDifference(base, other) {
        var res = {};
        res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, "M").isAfter(other)) {
          --res.months;
        }
        res.milliseconds = +other - +base.clone().add(res.months, "M");
        return res;
      }
      function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
          return { milliseconds: 0, months: 0 };
        }
        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
          res = positiveMomentsDifference(base, other);
        } else {
          res = positiveMomentsDifference(other, base);
          res.milliseconds = -res.milliseconds;
          res.months = -res.months;
        }
        return res;
      }
      function createAdder(direction, name) {
        return function(val, period) {
          var dur, tmp;
          if (period !== null && !isNaN(+period)) {
            deprecateSimple(
              name,
              "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
            );
            tmp = val;
            val = period;
            period = tmp;
          }
          dur = createDuration(val, period);
          addSubtract(this, dur, direction);
          return this;
        };
      }
      function addSubtract(mom, duration, isAdding, updateOffset) {
        var milliseconds2 = duration._milliseconds, days2 = absRound(duration._days), months2 = absRound(duration._months);
        if (!mom.isValid()) {
          return;
        }
        updateOffset = updateOffset == null ? true : updateOffset;
        if (months2) {
          setMonth(mom, get(mom, "Month") + months2 * isAdding);
        }
        if (days2) {
          set$1(mom, "Date", get(mom, "Date") + days2 * isAdding);
        }
        if (milliseconds2) {
          mom._d.setTime(mom._d.valueOf() + milliseconds2 * isAdding);
        }
        if (updateOffset) {
          hooks.updateOffset(mom, days2 || months2);
        }
      }
      var add = createAdder(1, "add"), subtract = createAdder(-1, "subtract");
      function isString(input) {
        return typeof input === "string" || input instanceof String;
      }
      function isMomentInput(input) {
        return isMoment(input) || isDate(input) || isString(input) || isNumber2(input) || isNumberOrStringArray(input) || isMomentInputObject(input) || input === null || input === void 0;
      }
      function isMomentInputObject(input) {
        var objectTest = isObject2(input) && !isObjectEmpty(input), propertyTest = false, properties = [
          "years",
          "year",
          "y",
          "months",
          "month",
          "M",
          "days",
          "day",
          "d",
          "dates",
          "date",
          "D",
          "hours",
          "hour",
          "h",
          "minutes",
          "minute",
          "m",
          "seconds",
          "second",
          "s",
          "milliseconds",
          "millisecond",
          "ms"
        ], i, property, propertyLen = properties.length;
        for (i = 0; i < propertyLen; i += 1) {
          property = properties[i];
          propertyTest = propertyTest || hasOwnProp(input, property);
        }
        return objectTest && propertyTest;
      }
      function isNumberOrStringArray(input) {
        var arrayTest = isArray2(input), dataTypeTest = false;
        if (arrayTest) {
          dataTypeTest = input.filter(function(item) {
            return !isNumber2(item) && isString(input);
          }).length === 0;
        }
        return arrayTest && dataTypeTest;
      }
      function isCalendarSpec(input) {
        var objectTest = isObject2(input) && !isObjectEmpty(input), propertyTest = false, properties = [
          "sameDay",
          "nextDay",
          "lastDay",
          "nextWeek",
          "lastWeek",
          "sameElse"
        ], i, property;
        for (i = 0; i < properties.length; i += 1) {
          property = properties[i];
          propertyTest = propertyTest || hasOwnProp(input, property);
        }
        return objectTest && propertyTest;
      }
      function getCalendarFormat(myMoment, now2) {
        var diff2 = myMoment.diff(now2, "days", true);
        return diff2 < -6 ? "sameElse" : diff2 < -1 ? "lastWeek" : diff2 < 0 ? "lastDay" : diff2 < 1 ? "sameDay" : diff2 < 2 ? "nextDay" : diff2 < 7 ? "nextWeek" : "sameElse";
      }
      function calendar$1(time, formats) {
        if (arguments.length === 1) {
          if (!arguments[0]) {
            time = void 0;
            formats = void 0;
          } else if (isMomentInput(arguments[0])) {
            time = arguments[0];
            formats = void 0;
          } else if (isCalendarSpec(arguments[0])) {
            formats = arguments[0];
            time = void 0;
          }
        }
        var now2 = time || createLocal(), sod = cloneWithOffset(now2, this).startOf("day"), format2 = hooks.calendarFormat(this, sod) || "sameElse", output = formats && (isFunction2(formats[format2]) ? formats[format2].call(this, now2) : formats[format2]);
        return this.format(
          output || this.localeData().calendar(format2, this, createLocal(now2))
        );
      }
      function clone3() {
        return new Moment(this);
      }
      function isAfter(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
          return false;
        }
        units = normalizeUnits(units) || "millisecond";
        if (units === "millisecond") {
          return this.valueOf() > localInput.valueOf();
        } else {
          return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
      }
      function isBefore(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
          return false;
        }
        units = normalizeUnits(units) || "millisecond";
        if (units === "millisecond") {
          return this.valueOf() < localInput.valueOf();
        } else {
          return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
      }
      function isBetween(from3, to3, units, inclusivity) {
        var localFrom = isMoment(from3) ? from3 : createLocal(from3), localTo = isMoment(to3) ? to3 : createLocal(to3);
        if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
          return false;
        }
        inclusivity = inclusivity || "()";
        return (inclusivity[0] === "(" ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (inclusivity[1] === ")" ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
      }
      function isSame(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input), inputMs;
        if (!(this.isValid() && localInput.isValid())) {
          return false;
        }
        units = normalizeUnits(units) || "millisecond";
        if (units === "millisecond") {
          return this.valueOf() === localInput.valueOf();
        } else {
          inputMs = localInput.valueOf();
          return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
      }
      function isSameOrAfter(input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
      }
      function isSameOrBefore(input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
      }
      function diff(input, units, asFloat) {
        var that, zoneDelta, output;
        if (!this.isValid()) {
          return NaN;
        }
        that = cloneWithOffset(input, this);
        if (!that.isValid()) {
          return NaN;
        }
        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
        units = normalizeUnits(units);
        switch (units) {
          case "year":
            output = monthDiff(this, that) / 12;
            break;
          case "month":
            output = monthDiff(this, that);
            break;
          case "quarter":
            output = monthDiff(this, that) / 3;
            break;
          case "second":
            output = (this - that) / 1e3;
            break;
          case "minute":
            output = (this - that) / 6e4;
            break;
          case "hour":
            output = (this - that) / 36e5;
            break;
          case "day":
            output = (this - that - zoneDelta) / 864e5;
            break;
          case "week":
            output = (this - that - zoneDelta) / 6048e5;
            break;
          default:
            output = this - that;
        }
        return asFloat ? output : absFloor(output);
      }
      function monthDiff(a, b) {
        if (a.date() < b.date()) {
          return -monthDiff(b, a);
        }
        var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()), anchor = a.clone().add(wholeMonthDiff, "months"), anchor2, adjust;
        if (b - anchor < 0) {
          anchor2 = a.clone().add(wholeMonthDiff - 1, "months");
          adjust = (b - anchor) / (anchor - anchor2);
        } else {
          anchor2 = a.clone().add(wholeMonthDiff + 1, "months");
          adjust = (b - anchor) / (anchor2 - anchor);
        }
        return -(wholeMonthDiff + adjust) || 0;
      }
      hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
      hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
      function toString() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
      }
      function toISOString(keepOffset) {
        if (!this.isValid()) {
          return null;
        }
        var utc = keepOffset !== true, m = utc ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) {
          return formatMoment(
            m,
            utc ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
          );
        }
        if (isFunction2(Date.prototype.toISOString)) {
          if (utc) {
            return this.toDate().toISOString();
          } else {
            return new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", formatMoment(m, "Z"));
          }
        }
        return formatMoment(
          m,
          utc ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
        );
      }
      function inspect() {
        if (!this.isValid()) {
          return "moment.invalid(/* " + this._i + " */)";
        }
        var func = "moment", zone = "", prefix, year, datetime, suffix;
        if (!this.isLocal()) {
          func = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone";
          zone = "Z";
        }
        prefix = "[" + func + '("]';
        year = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY";
        datetime = "-MM-DD[T]HH:mm:ss.SSS";
        suffix = zone + '[")]';
        return this.format(prefix + year + datetime + suffix);
      }
      function format(inputString) {
        if (!inputString) {
          inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
      }
      function from2(time, withoutSuffix) {
        if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
          return createDuration({ to: this, from: time }).locale(this.locale()).humanize(!withoutSuffix);
        } else {
          return this.localeData().invalidDate();
        }
      }
      function fromNow(withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
      }
      function to2(time, withoutSuffix) {
        if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
          return createDuration({ from: this, to: time }).locale(this.locale()).humanize(!withoutSuffix);
        } else {
          return this.localeData().invalidDate();
        }
      }
      function toNow(withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
      }
      function locale2(key) {
        var newLocaleData;
        if (key === void 0) {
          return this._locale._abbr;
        } else {
          newLocaleData = getLocale(key);
          if (newLocaleData != null) {
            this._locale = newLocaleData;
          }
          return this;
        }
      }
      var lang = deprecate(
        "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
        function(key) {
          if (key === void 0) {
            return this.localeData();
          } else {
            return this.locale(key);
          }
        }
      );
      function localeData() {
        return this._locale;
      }
      var MS_PER_SECOND = 1e3, MS_PER_MINUTE = 60 * MS_PER_SECOND, MS_PER_HOUR = 60 * MS_PER_MINUTE, MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;
      function mod$1(dividend, divisor) {
        return (dividend % divisor + divisor) % divisor;
      }
      function localStartOfDate(y, m, d) {
        if (y < 100 && y >= 0) {
          return new Date(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
          return new Date(y, m, d).valueOf();
        }
      }
      function utcStartOfDate(y, m, d) {
        if (y < 100 && y >= 0) {
          return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
          return Date.UTC(y, m, d);
        }
      }
      function startOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (units === void 0 || units === "millisecond" || !this.isValid()) {
          return this;
        }
        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
        switch (units) {
          case "year":
            time = startOfDate(this.year(), 0, 1);
            break;
          case "quarter":
            time = startOfDate(
              this.year(),
              this.month() - this.month() % 3,
              1
            );
            break;
          case "month":
            time = startOfDate(this.year(), this.month(), 1);
            break;
          case "week":
            time = startOfDate(
              this.year(),
              this.month(),
              this.date() - this.weekday()
            );
            break;
          case "isoWeek":
            time = startOfDate(
              this.year(),
              this.month(),
              this.date() - (this.isoWeekday() - 1)
            );
            break;
          case "day":
          case "date":
            time = startOfDate(this.year(), this.month(), this.date());
            break;
          case "hour":
            time = this._d.valueOf();
            time -= mod$1(
              time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
              MS_PER_HOUR
            );
            break;
          case "minute":
            time = this._d.valueOf();
            time -= mod$1(time, MS_PER_MINUTE);
            break;
          case "second":
            time = this._d.valueOf();
            time -= mod$1(time, MS_PER_SECOND);
            break;
        }
        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
      }
      function endOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (units === void 0 || units === "millisecond" || !this.isValid()) {
          return this;
        }
        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
        switch (units) {
          case "year":
            time = startOfDate(this.year() + 1, 0, 1) - 1;
            break;
          case "quarter":
            time = startOfDate(
              this.year(),
              this.month() - this.month() % 3 + 3,
              1
            ) - 1;
            break;
          case "month":
            time = startOfDate(this.year(), this.month() + 1, 1) - 1;
            break;
          case "week":
            time = startOfDate(
              this.year(),
              this.month(),
              this.date() - this.weekday() + 7
            ) - 1;
            break;
          case "isoWeek":
            time = startOfDate(
              this.year(),
              this.month(),
              this.date() - (this.isoWeekday() - 1) + 7
            ) - 1;
            break;
          case "day":
          case "date":
            time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
            break;
          case "hour":
            time = this._d.valueOf();
            time += MS_PER_HOUR - mod$1(
              time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
              MS_PER_HOUR
            ) - 1;
            break;
          case "minute":
            time = this._d.valueOf();
            time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
            break;
          case "second":
            time = this._d.valueOf();
            time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
            break;
        }
        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
      }
      function valueOf() {
        return this._d.valueOf() - (this._offset || 0) * 6e4;
      }
      function unix() {
        return Math.floor(this.valueOf() / 1e3);
      }
      function toDate() {
        return new Date(this.valueOf());
      }
      function toArray() {
        var m = this;
        return [
          m.year(),
          m.month(),
          m.date(),
          m.hour(),
          m.minute(),
          m.second(),
          m.millisecond()
        ];
      }
      function toObject() {
        var m = this;
        return {
          years: m.year(),
          months: m.month(),
          date: m.date(),
          hours: m.hours(),
          minutes: m.minutes(),
          seconds: m.seconds(),
          milliseconds: m.milliseconds()
        };
      }
      function toJSON() {
        return this.isValid() ? this.toISOString() : null;
      }
      function isValid$2() {
        return isValid(this);
      }
      function parsingFlags() {
        return extend({}, getParsingFlags(this));
      }
      function invalidAt() {
        return getParsingFlags(this).overflow;
      }
      function creationData() {
        return {
          input: this._i,
          format: this._f,
          locale: this._locale,
          isUTC: this._isUTC,
          strict: this._strict
        };
      }
      addFormatToken("N", 0, 0, "eraAbbr");
      addFormatToken("NN", 0, 0, "eraAbbr");
      addFormatToken("NNN", 0, 0, "eraAbbr");
      addFormatToken("NNNN", 0, 0, "eraName");
      addFormatToken("NNNNN", 0, 0, "eraNarrow");
      addFormatToken("y", ["y", 1], "yo", "eraYear");
      addFormatToken("y", ["yy", 2], 0, "eraYear");
      addFormatToken("y", ["yyy", 3], 0, "eraYear");
      addFormatToken("y", ["yyyy", 4], 0, "eraYear");
      addRegexToken("N", matchEraAbbr);
      addRegexToken("NN", matchEraAbbr);
      addRegexToken("NNN", matchEraAbbr);
      addRegexToken("NNNN", matchEraName);
      addRegexToken("NNNNN", matchEraNarrow);
      addParseToken(
        ["N", "NN", "NNN", "NNNN", "NNNNN"],
        function(input, array, config, token2) {
          var era = config._locale.erasParse(input, token2, config._strict);
          if (era) {
            getParsingFlags(config).era = era;
          } else {
            getParsingFlags(config).invalidEra = input;
          }
        }
      );
      addRegexToken("y", matchUnsigned);
      addRegexToken("yy", matchUnsigned);
      addRegexToken("yyy", matchUnsigned);
      addRegexToken("yyyy", matchUnsigned);
      addRegexToken("yo", matchEraYearOrdinal);
      addParseToken(["y", "yy", "yyy", "yyyy"], YEAR);
      addParseToken(["yo"], function(input, array, config, token2) {
        var match;
        if (config._locale._eraYearOrdinalRegex) {
          match = input.match(config._locale._eraYearOrdinalRegex);
        }
        if (config._locale.eraYearOrdinalParse) {
          array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
        } else {
          array[YEAR] = parseInt(input, 10);
        }
      });
      function localeEras(m, format2) {
        var i, l, date, eras = this._eras || getLocale("en")._eras;
        for (i = 0, l = eras.length; i < l; ++i) {
          switch (typeof eras[i].since) {
            case "string":
              date = hooks(eras[i].since).startOf("day");
              eras[i].since = date.valueOf();
              break;
          }
          switch (typeof eras[i].until) {
            case "undefined":
              eras[i].until = Infinity;
              break;
            case "string":
              date = hooks(eras[i].until).startOf("day").valueOf();
              eras[i].until = date.valueOf();
              break;
          }
        }
        return eras;
      }
      function localeErasParse(eraName, format2, strict) {
        var i, l, eras = this.eras(), name, abbr, narrow;
        eraName = eraName.toUpperCase();
        for (i = 0, l = eras.length; i < l; ++i) {
          name = eras[i].name.toUpperCase();
          abbr = eras[i].abbr.toUpperCase();
          narrow = eras[i].narrow.toUpperCase();
          if (strict) {
            switch (format2) {
              case "N":
              case "NN":
              case "NNN":
                if (abbr === eraName) {
                  return eras[i];
                }
                break;
              case "NNNN":
                if (name === eraName) {
                  return eras[i];
                }
                break;
              case "NNNNN":
                if (narrow === eraName) {
                  return eras[i];
                }
                break;
            }
          } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
            return eras[i];
          }
        }
      }
      function localeErasConvertYear(era, year) {
        var dir = era.since <= era.until ? 1 : -1;
        if (year === void 0) {
          return hooks(era.since).year();
        } else {
          return hooks(era.since).year() + (year - era.offset) * dir;
        }
      }
      function getEraName() {
        var i, l, val, eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
          val = this.clone().startOf("day").valueOf();
          if (eras[i].since <= val && val <= eras[i].until) {
            return eras[i].name;
          }
          if (eras[i].until <= val && val <= eras[i].since) {
            return eras[i].name;
          }
        }
        return "";
      }
      function getEraNarrow() {
        var i, l, val, eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
          val = this.clone().startOf("day").valueOf();
          if (eras[i].since <= val && val <= eras[i].until) {
            return eras[i].narrow;
          }
          if (eras[i].until <= val && val <= eras[i].since) {
            return eras[i].narrow;
          }
        }
        return "";
      }
      function getEraAbbr() {
        var i, l, val, eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
          val = this.clone().startOf("day").valueOf();
          if (eras[i].since <= val && val <= eras[i].until) {
            return eras[i].abbr;
          }
          if (eras[i].until <= val && val <= eras[i].since) {
            return eras[i].abbr;
          }
        }
        return "";
      }
      function getEraYear() {
        var i, l, dir, val, eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
          dir = eras[i].since <= eras[i].until ? 1 : -1;
          val = this.clone().startOf("day").valueOf();
          if (eras[i].since <= val && val <= eras[i].until || eras[i].until <= val && val <= eras[i].since) {
            return (this.year() - hooks(eras[i].since).year()) * dir + eras[i].offset;
          }
        }
        return this.year();
      }
      function erasNameRegex(isStrict) {
        if (!hasOwnProp(this, "_erasNameRegex")) {
          computeErasParse.call(this);
        }
        return isStrict ? this._erasNameRegex : this._erasRegex;
      }
      function erasAbbrRegex(isStrict) {
        if (!hasOwnProp(this, "_erasAbbrRegex")) {
          computeErasParse.call(this);
        }
        return isStrict ? this._erasAbbrRegex : this._erasRegex;
      }
      function erasNarrowRegex(isStrict) {
        if (!hasOwnProp(this, "_erasNarrowRegex")) {
          computeErasParse.call(this);
        }
        return isStrict ? this._erasNarrowRegex : this._erasRegex;
      }
      function matchEraAbbr(isStrict, locale3) {
        return locale3.erasAbbrRegex(isStrict);
      }
      function matchEraName(isStrict, locale3) {
        return locale3.erasNameRegex(isStrict);
      }
      function matchEraNarrow(isStrict, locale3) {
        return locale3.erasNarrowRegex(isStrict);
      }
      function matchEraYearOrdinal(isStrict, locale3) {
        return locale3._eraYearOrdinalRegex || matchUnsigned;
      }
      function computeErasParse() {
        var abbrPieces = [], namePieces = [], narrowPieces = [], mixedPieces = [], i, l, erasName, erasAbbr, erasNarrow, eras = this.eras();
        for (i = 0, l = eras.length; i < l; ++i) {
          erasName = regexEscape(eras[i].name);
          erasAbbr = regexEscape(eras[i].abbr);
          erasNarrow = regexEscape(eras[i].narrow);
          namePieces.push(erasName);
          abbrPieces.push(erasAbbr);
          narrowPieces.push(erasNarrow);
          mixedPieces.push(erasName);
          mixedPieces.push(erasAbbr);
          mixedPieces.push(erasNarrow);
        }
        this._erasRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
        this._erasNameRegex = new RegExp("^(" + namePieces.join("|") + ")", "i");
        this._erasAbbrRegex = new RegExp("^(" + abbrPieces.join("|") + ")", "i");
        this._erasNarrowRegex = new RegExp(
          "^(" + narrowPieces.join("|") + ")",
          "i"
        );
      }
      addFormatToken(0, ["gg", 2], 0, function() {
        return this.weekYear() % 100;
      });
      addFormatToken(0, ["GG", 2], 0, function() {
        return this.isoWeekYear() % 100;
      });
      function addWeekYearFormatToken(token2, getter) {
        addFormatToken(0, [token2, token2.length], 0, getter);
      }
      addWeekYearFormatToken("gggg", "weekYear");
      addWeekYearFormatToken("ggggg", "weekYear");
      addWeekYearFormatToken("GGGG", "isoWeekYear");
      addWeekYearFormatToken("GGGGG", "isoWeekYear");
      addRegexToken("G", matchSigned);
      addRegexToken("g", matchSigned);
      addRegexToken("GG", match1to2, match2);
      addRegexToken("gg", match1to2, match2);
      addRegexToken("GGGG", match1to4, match4);
      addRegexToken("gggg", match1to4, match4);
      addRegexToken("GGGGG", match1to6, match6);
      addRegexToken("ggggg", match1to6, match6);
      addWeekParseToken(
        ["gggg", "ggggg", "GGGG", "GGGGG"],
        function(input, week, config, token2) {
          week[token2.substr(0, 2)] = toInt(input);
        }
      );
      addWeekParseToken(["gg", "GG"], function(input, week, config, token2) {
        week[token2] = hooks.parseTwoDigitYear(input);
      });
      function getSetWeekYear(input) {
        return getSetWeekYearHelper.call(
          this,
          input,
          this.week(),
          this.weekday() + this.localeData()._week.dow,
          this.localeData()._week.dow,
          this.localeData()._week.doy
        );
      }
      function getSetISOWeekYear(input) {
        return getSetWeekYearHelper.call(
          this,
          input,
          this.isoWeek(),
          this.isoWeekday(),
          1,
          4
        );
      }
      function getISOWeeksInYear() {
        return weeksInYear(this.year(), 1, 4);
      }
      function getISOWeeksInISOWeekYear() {
        return weeksInYear(this.isoWeekYear(), 1, 4);
      }
      function getWeeksInYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
      }
      function getWeeksInWeekYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
      }
      function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
          return weekOfYear(this, dow, doy).year;
        } else {
          weeksTarget = weeksInYear(input, dow, doy);
          if (week > weeksTarget) {
            week = weeksTarget;
          }
          return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
      }
      function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy), date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
      }
      addFormatToken("Q", 0, "Qo", "quarter");
      addRegexToken("Q", match1);
      addParseToken("Q", function(input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
      });
      function getSetQuarter(input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
      }
      addFormatToken("D", ["DD", 2], "Do", "date");
      addRegexToken("D", match1to2, match1to2NoLeadingZero);
      addRegexToken("DD", match1to2, match2);
      addRegexToken("Do", function(isStrict, locale3) {
        return isStrict ? locale3._dayOfMonthOrdinalParse || locale3._ordinalParse : locale3._dayOfMonthOrdinalParseLenient;
      });
      addParseToken(["D", "DD"], DATE);
      addParseToken("Do", function(input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
      });
      var getSetDayOfMonth = makeGetSet("Date", true);
      addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
      addRegexToken("DDD", match1to3);
      addRegexToken("DDDD", match3);
      addParseToken(["DDD", "DDDD"], function(input, array, config) {
        config._dayOfYear = toInt(input);
      });
      function getSetDayOfYear(input) {
        var dayOfYear = Math.round(
          (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
        ) + 1;
        return input == null ? dayOfYear : this.add(input - dayOfYear, "d");
      }
      addFormatToken("m", ["mm", 2], 0, "minute");
      addRegexToken("m", match1to2, match1to2HasZero);
      addRegexToken("mm", match1to2, match2);
      addParseToken(["m", "mm"], MINUTE);
      var getSetMinute = makeGetSet("Minutes", false);
      addFormatToken("s", ["ss", 2], 0, "second");
      addRegexToken("s", match1to2, match1to2HasZero);
      addRegexToken("ss", match1to2, match2);
      addParseToken(["s", "ss"], SECOND);
      var getSetSecond = makeGetSet("Seconds", false);
      addFormatToken("S", 0, 0, function() {
        return ~~(this.millisecond() / 100);
      });
      addFormatToken(0, ["SS", 2], 0, function() {
        return ~~(this.millisecond() / 10);
      });
      addFormatToken(0, ["SSS", 3], 0, "millisecond");
      addFormatToken(0, ["SSSS", 4], 0, function() {
        return this.millisecond() * 10;
      });
      addFormatToken(0, ["SSSSS", 5], 0, function() {
        return this.millisecond() * 100;
      });
      addFormatToken(0, ["SSSSSS", 6], 0, function() {
        return this.millisecond() * 1e3;
      });
      addFormatToken(0, ["SSSSSSS", 7], 0, function() {
        return this.millisecond() * 1e4;
      });
      addFormatToken(0, ["SSSSSSSS", 8], 0, function() {
        return this.millisecond() * 1e5;
      });
      addFormatToken(0, ["SSSSSSSSS", 9], 0, function() {
        return this.millisecond() * 1e6;
      });
      addRegexToken("S", match1to3, match1);
      addRegexToken("SS", match1to3, match2);
      addRegexToken("SSS", match1to3, match3);
      var token, getSetMillisecond;
      for (token = "SSSS"; token.length <= 9; token += "S") {
        addRegexToken(token, matchUnsigned);
      }
      function parseMs(input, array) {
        array[MILLISECOND] = toInt(("0." + input) * 1e3);
      }
      for (token = "S"; token.length <= 9; token += "S") {
        addParseToken(token, parseMs);
      }
      getSetMillisecond = makeGetSet("Milliseconds", false);
      addFormatToken("z", 0, 0, "zoneAbbr");
      addFormatToken("zz", 0, 0, "zoneName");
      function getZoneAbbr() {
        return this._isUTC ? "UTC" : "";
      }
      function getZoneName() {
        return this._isUTC ? "Coordinated Universal Time" : "";
      }
      var proto = Moment.prototype;
      proto.add = add;
      proto.calendar = calendar$1;
      proto.clone = clone3;
      proto.diff = diff;
      proto.endOf = endOf;
      proto.format = format;
      proto.from = from2;
      proto.fromNow = fromNow;
      proto.to = to2;
      proto.toNow = toNow;
      proto.get = stringGet;
      proto.invalidAt = invalidAt;
      proto.isAfter = isAfter;
      proto.isBefore = isBefore;
      proto.isBetween = isBetween;
      proto.isSame = isSame;
      proto.isSameOrAfter = isSameOrAfter;
      proto.isSameOrBefore = isSameOrBefore;
      proto.isValid = isValid$2;
      proto.lang = lang;
      proto.locale = locale2;
      proto.localeData = localeData;
      proto.max = prototypeMax;
      proto.min = prototypeMin;
      proto.parsingFlags = parsingFlags;
      proto.set = stringSet;
      proto.startOf = startOf;
      proto.subtract = subtract;
      proto.toArray = toArray;
      proto.toObject = toObject;
      proto.toDate = toDate;
      proto.toISOString = toISOString;
      proto.inspect = inspect;
      if (typeof Symbol !== "undefined" && Symbol.for != null) {
        proto[Symbol.for("nodejs.util.inspect.custom")] = function() {
          return "Moment<" + this.format() + ">";
        };
      }
      proto.toJSON = toJSON;
      proto.toString = toString;
      proto.unix = unix;
      proto.valueOf = valueOf;
      proto.creationData = creationData;
      proto.eraName = getEraName;
      proto.eraNarrow = getEraNarrow;
      proto.eraAbbr = getEraAbbr;
      proto.eraYear = getEraYear;
      proto.year = getSetYear;
      proto.isLeapYear = getIsLeapYear;
      proto.weekYear = getSetWeekYear;
      proto.isoWeekYear = getSetISOWeekYear;
      proto.quarter = proto.quarters = getSetQuarter;
      proto.month = getSetMonth;
      proto.daysInMonth = getDaysInMonth;
      proto.week = proto.weeks = getSetWeek;
      proto.isoWeek = proto.isoWeeks = getSetISOWeek;
      proto.weeksInYear = getWeeksInYear;
      proto.weeksInWeekYear = getWeeksInWeekYear;
      proto.isoWeeksInYear = getISOWeeksInYear;
      proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
      proto.date = getSetDayOfMonth;
      proto.day = proto.days = getSetDayOfWeek;
      proto.weekday = getSetLocaleDayOfWeek;
      proto.isoWeekday = getSetISODayOfWeek;
      proto.dayOfYear = getSetDayOfYear;
      proto.hour = proto.hours = getSetHour;
      proto.minute = proto.minutes = getSetMinute;
      proto.second = proto.seconds = getSetSecond;
      proto.millisecond = proto.milliseconds = getSetMillisecond;
      proto.utcOffset = getSetOffset;
      proto.utc = setOffsetToUTC;
      proto.local = setOffsetToLocal;
      proto.parseZone = setOffsetToParsedOffset;
      proto.hasAlignedHourOffset = hasAlignedHourOffset;
      proto.isDST = isDaylightSavingTime;
      proto.isLocal = isLocal;
      proto.isUtcOffset = isUtcOffset;
      proto.isUtc = isUtc;
      proto.isUTC = isUtc;
      proto.zoneAbbr = getZoneAbbr;
      proto.zoneName = getZoneName;
      proto.dates = deprecate(
        "dates accessor is deprecated. Use date instead.",
        getSetDayOfMonth
      );
      proto.months = deprecate(
        "months accessor is deprecated. Use month instead",
        getSetMonth
      );
      proto.years = deprecate(
        "years accessor is deprecated. Use year instead",
        getSetYear
      );
      proto.zone = deprecate(
        "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
        getSetZone
      );
      proto.isDSTShifted = deprecate(
        "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
        isDaylightSavingTimeShifted
      );
      function createUnix(input) {
        return createLocal(input * 1e3);
      }
      function createInZone() {
        return createLocal.apply(null, arguments).parseZone();
      }
      function preParsePostFormat(string) {
        return string;
      }
      var proto$1 = Locale.prototype;
      proto$1.calendar = calendar;
      proto$1.longDateFormat = longDateFormat;
      proto$1.invalidDate = invalidDate;
      proto$1.ordinal = ordinal;
      proto$1.preparse = preParsePostFormat;
      proto$1.postformat = preParsePostFormat;
      proto$1.relativeTime = relativeTime;
      proto$1.pastFuture = pastFuture;
      proto$1.set = set2;
      proto$1.eras = localeEras;
      proto$1.erasParse = localeErasParse;
      proto$1.erasConvertYear = localeErasConvertYear;
      proto$1.erasAbbrRegex = erasAbbrRegex;
      proto$1.erasNameRegex = erasNameRegex;
      proto$1.erasNarrowRegex = erasNarrowRegex;
      proto$1.months = localeMonths;
      proto$1.monthsShort = localeMonthsShort;
      proto$1.monthsParse = localeMonthsParse;
      proto$1.monthsRegex = monthsRegex;
      proto$1.monthsShortRegex = monthsShortRegex;
      proto$1.week = localeWeek;
      proto$1.firstDayOfYear = localeFirstDayOfYear;
      proto$1.firstDayOfWeek = localeFirstDayOfWeek;
      proto$1.weekdays = localeWeekdays;
      proto$1.weekdaysMin = localeWeekdaysMin;
      proto$1.weekdaysShort = localeWeekdaysShort;
      proto$1.weekdaysParse = localeWeekdaysParse;
      proto$1.weekdaysRegex = weekdaysRegex;
      proto$1.weekdaysShortRegex = weekdaysShortRegex;
      proto$1.weekdaysMinRegex = weekdaysMinRegex;
      proto$1.isPM = localeIsPM;
      proto$1.meridiem = localeMeridiem;
      function get$1(format2, index, field, setter) {
        var locale3 = getLocale(), utc = createUTC().set(setter, index);
        return locale3[field](utc, format2);
      }
      function listMonthsImpl(format2, index, field) {
        if (isNumber2(format2)) {
          index = format2;
          format2 = void 0;
        }
        format2 = format2 || "";
        if (index != null) {
          return get$1(format2, index, field, "month");
        }
        var i, out = [];
        for (i = 0; i < 12; i++) {
          out[i] = get$1(format2, i, field, "month");
        }
        return out;
      }
      function listWeekdaysImpl(localeSorted, format2, index, field) {
        if (typeof localeSorted === "boolean") {
          if (isNumber2(format2)) {
            index = format2;
            format2 = void 0;
          }
          format2 = format2 || "";
        } else {
          format2 = localeSorted;
          index = format2;
          localeSorted = false;
          if (isNumber2(format2)) {
            index = format2;
            format2 = void 0;
          }
          format2 = format2 || "";
        }
        var locale3 = getLocale(), shift = localeSorted ? locale3._week.dow : 0, i, out = [];
        if (index != null) {
          return get$1(format2, (index + shift) % 7, field, "day");
        }
        for (i = 0; i < 7; i++) {
          out[i] = get$1(format2, (i + shift) % 7, field, "day");
        }
        return out;
      }
      function listMonths(format2, index) {
        return listMonthsImpl(format2, index, "months");
      }
      function listMonthsShort(format2, index) {
        return listMonthsImpl(format2, index, "monthsShort");
      }
      function listWeekdays(localeSorted, format2, index) {
        return listWeekdaysImpl(localeSorted, format2, index, "weekdays");
      }
      function listWeekdaysShort(localeSorted, format2, index) {
        return listWeekdaysImpl(localeSorted, format2, index, "weekdaysShort");
      }
      function listWeekdaysMin(localeSorted, format2, index) {
        return listWeekdaysImpl(localeSorted, format2, index, "weekdaysMin");
      }
      getSetGlobalLocale("en", {
        eras: [
          {
            since: "0001-01-01",
            until: Infinity,
            offset: 1,
            name: "Anno Domini",
            narrow: "AD",
            abbr: "AD"
          },
          {
            since: "0000-12-31",
            until: -Infinity,
            offset: 1,
            name: "Before Christ",
            narrow: "BC",
            abbr: "BC"
          }
        ],
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function(number) {
          var b = number % 10, output = toInt(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
          return number + output;
        }
      });
      hooks.lang = deprecate(
        "moment.lang is deprecated. Use moment.locale instead.",
        getSetGlobalLocale
      );
      hooks.langData = deprecate(
        "moment.langData is deprecated. Use moment.localeData instead.",
        getLocale
      );
      var mathAbs = Math.abs;
      function abs() {
        var data = this._data;
        this._milliseconds = mathAbs(this._milliseconds);
        this._days = mathAbs(this._days);
        this._months = mathAbs(this._months);
        data.milliseconds = mathAbs(data.milliseconds);
        data.seconds = mathAbs(data.seconds);
        data.minutes = mathAbs(data.minutes);
        data.hours = mathAbs(data.hours);
        data.months = mathAbs(data.months);
        data.years = mathAbs(data.years);
        return this;
      }
      function addSubtract$1(duration, input, value, direction) {
        var other = createDuration(input, value);
        duration._milliseconds += direction * other._milliseconds;
        duration._days += direction * other._days;
        duration._months += direction * other._months;
        return duration._bubble();
      }
      function add$1(input, value) {
        return addSubtract$1(this, input, value, 1);
      }
      function subtract$1(input, value) {
        return addSubtract$1(this, input, value, -1);
      }
      function absCeil(number) {
        if (number < 0) {
          return Math.floor(number);
        } else {
          return Math.ceil(number);
        }
      }
      function bubble() {
        var milliseconds2 = this._milliseconds, days2 = this._days, months2 = this._months, data = this._data, seconds2, minutes2, hours2, years2, monthsFromDays;
        if (!(milliseconds2 >= 0 && days2 >= 0 && months2 >= 0 || milliseconds2 <= 0 && days2 <= 0 && months2 <= 0)) {
          milliseconds2 += absCeil(monthsToDays(months2) + days2) * 864e5;
          days2 = 0;
          months2 = 0;
        }
        data.milliseconds = milliseconds2 % 1e3;
        seconds2 = absFloor(milliseconds2 / 1e3);
        data.seconds = seconds2 % 60;
        minutes2 = absFloor(seconds2 / 60);
        data.minutes = minutes2 % 60;
        hours2 = absFloor(minutes2 / 60);
        data.hours = hours2 % 24;
        days2 += absFloor(hours2 / 24);
        monthsFromDays = absFloor(daysToMonths(days2));
        months2 += monthsFromDays;
        days2 -= absCeil(monthsToDays(monthsFromDays));
        years2 = absFloor(months2 / 12);
        months2 %= 12;
        data.days = days2;
        data.months = months2;
        data.years = years2;
        return this;
      }
      function daysToMonths(days2) {
        return days2 * 4800 / 146097;
      }
      function monthsToDays(months2) {
        return months2 * 146097 / 4800;
      }
      function as(units) {
        if (!this.isValid()) {
          return NaN;
        }
        var days2, months2, milliseconds2 = this._milliseconds;
        units = normalizeUnits(units);
        if (units === "month" || units === "quarter" || units === "year") {
          days2 = this._days + milliseconds2 / 864e5;
          months2 = this._months + daysToMonths(days2);
          switch (units) {
            case "month":
              return months2;
            case "quarter":
              return months2 / 3;
            case "year":
              return months2 / 12;
          }
        } else {
          days2 = this._days + Math.round(monthsToDays(this._months));
          switch (units) {
            case "week":
              return days2 / 7 + milliseconds2 / 6048e5;
            case "day":
              return days2 + milliseconds2 / 864e5;
            case "hour":
              return days2 * 24 + milliseconds2 / 36e5;
            case "minute":
              return days2 * 1440 + milliseconds2 / 6e4;
            case "second":
              return days2 * 86400 + milliseconds2 / 1e3;
            case "millisecond":
              return Math.floor(days2 * 864e5) + milliseconds2;
            default:
              throw new Error("Unknown unit " + units);
          }
        }
      }
      function makeAs(alias) {
        return function() {
          return this.as(alias);
        };
      }
      var asMilliseconds = makeAs("ms"), asSeconds = makeAs("s"), asMinutes = makeAs("m"), asHours = makeAs("h"), asDays = makeAs("d"), asWeeks = makeAs("w"), asMonths = makeAs("M"), asQuarters = makeAs("Q"), asYears = makeAs("y"), valueOf$1 = asMilliseconds;
      function clone$1() {
        return createDuration(this);
      }
      function get$2(units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + "s"]() : NaN;
      }
      function makeGetter(name) {
        return function() {
          return this.isValid() ? this._data[name] : NaN;
        };
      }
      var milliseconds = makeGetter("milliseconds"), seconds = makeGetter("seconds"), minutes = makeGetter("minutes"), hours = makeGetter("hours"), days = makeGetter("days"), months = makeGetter("months"), years = makeGetter("years");
      function weeks() {
        return absFloor(this.days() / 7);
      }
      var round2 = Math.round, thresholds = {
        ss: 44,
        // a few seconds to seconds
        s: 45,
        // seconds to minute
        m: 45,
        // minutes to hour
        h: 22,
        // hours to day
        d: 26,
        // days to month/week
        w: null,
        // weeks to month
        M: 11
        // months to year
      };
      function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale3) {
        return locale3.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
      }
      function relativeTime$1(posNegDuration, withoutSuffix, thresholds2, locale3) {
        var duration = createDuration(posNegDuration).abs(), seconds2 = round2(duration.as("s")), minutes2 = round2(duration.as("m")), hours2 = round2(duration.as("h")), days2 = round2(duration.as("d")), months2 = round2(duration.as("M")), weeks2 = round2(duration.as("w")), years2 = round2(duration.as("y")), a = seconds2 <= thresholds2.ss && ["s", seconds2] || seconds2 < thresholds2.s && ["ss", seconds2] || minutes2 <= 1 && ["m"] || minutes2 < thresholds2.m && ["mm", minutes2] || hours2 <= 1 && ["h"] || hours2 < thresholds2.h && ["hh", hours2] || days2 <= 1 && ["d"] || days2 < thresholds2.d && ["dd", days2];
        if (thresholds2.w != null) {
          a = a || weeks2 <= 1 && ["w"] || weeks2 < thresholds2.w && ["ww", weeks2];
        }
        a = a || months2 <= 1 && ["M"] || months2 < thresholds2.M && ["MM", months2] || years2 <= 1 && ["y"] || ["yy", years2];
        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale3;
        return substituteTimeAgo.apply(null, a);
      }
      function getSetRelativeTimeRounding(roundingFunction) {
        if (roundingFunction === void 0) {
          return round2;
        }
        if (typeof roundingFunction === "function") {
          round2 = roundingFunction;
          return true;
        }
        return false;
      }
      function getSetRelativeTimeThreshold(threshold, limit) {
        if (thresholds[threshold] === void 0) {
          return false;
        }
        if (limit === void 0) {
          return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === "s") {
          thresholds.ss = limit - 1;
        }
        return true;
      }
      function humanize(argWithSuffix, argThresholds) {
        if (!this.isValid()) {
          return this.localeData().invalidDate();
        }
        var withSuffix = false, th = thresholds, locale3, output;
        if (typeof argWithSuffix === "object") {
          argThresholds = argWithSuffix;
          argWithSuffix = false;
        }
        if (typeof argWithSuffix === "boolean") {
          withSuffix = argWithSuffix;
        }
        if (typeof argThresholds === "object") {
          th = Object.assign({}, thresholds, argThresholds);
          if (argThresholds.s != null && argThresholds.ss == null) {
            th.ss = argThresholds.s - 1;
          }
        }
        locale3 = this.localeData();
        output = relativeTime$1(this, !withSuffix, th, locale3);
        if (withSuffix) {
          output = locale3.pastFuture(+this, output);
        }
        return locale3.postformat(output);
      }
      var abs$1 = Math.abs;
      function sign2(x) {
        return (x > 0) - (x < 0) || +x;
      }
      function toISOString$1() {
        if (!this.isValid()) {
          return this.localeData().invalidDate();
        }
        var seconds2 = abs$1(this._milliseconds) / 1e3, days2 = abs$1(this._days), months2 = abs$1(this._months), minutes2, hours2, years2, s, total = this.asSeconds(), totalSign, ymSign, daysSign, hmsSign;
        if (!total) {
          return "P0D";
        }
        minutes2 = absFloor(seconds2 / 60);
        hours2 = absFloor(minutes2 / 60);
        seconds2 %= 60;
        minutes2 %= 60;
        years2 = absFloor(months2 / 12);
        months2 %= 12;
        s = seconds2 ? seconds2.toFixed(3).replace(/\.?0+$/, "") : "";
        totalSign = total < 0 ? "-" : "";
        ymSign = sign2(this._months) !== sign2(total) ? "-" : "";
        daysSign = sign2(this._days) !== sign2(total) ? "-" : "";
        hmsSign = sign2(this._milliseconds) !== sign2(total) ? "-" : "";
        return totalSign + "P" + (years2 ? ymSign + years2 + "Y" : "") + (months2 ? ymSign + months2 + "M" : "") + (days2 ? daysSign + days2 + "D" : "") + (hours2 || minutes2 || seconds2 ? "T" : "") + (hours2 ? hmsSign + hours2 + "H" : "") + (minutes2 ? hmsSign + minutes2 + "M" : "") + (seconds2 ? hmsSign + s + "S" : "");
      }
      var proto$2 = Duration.prototype;
      proto$2.isValid = isValid$1;
      proto$2.abs = abs;
      proto$2.add = add$1;
      proto$2.subtract = subtract$1;
      proto$2.as = as;
      proto$2.asMilliseconds = asMilliseconds;
      proto$2.asSeconds = asSeconds;
      proto$2.asMinutes = asMinutes;
      proto$2.asHours = asHours;
      proto$2.asDays = asDays;
      proto$2.asWeeks = asWeeks;
      proto$2.asMonths = asMonths;
      proto$2.asQuarters = asQuarters;
      proto$2.asYears = asYears;
      proto$2.valueOf = valueOf$1;
      proto$2._bubble = bubble;
      proto$2.clone = clone$1;
      proto$2.get = get$2;
      proto$2.milliseconds = milliseconds;
      proto$2.seconds = seconds;
      proto$2.minutes = minutes;
      proto$2.hours = hours;
      proto$2.days = days;
      proto$2.weeks = weeks;
      proto$2.months = months;
      proto$2.years = years;
      proto$2.humanize = humanize;
      proto$2.toISOString = toISOString$1;
      proto$2.toString = toISOString$1;
      proto$2.toJSON = toISOString$1;
      proto$2.locale = locale2;
      proto$2.localeData = localeData;
      proto$2.toIsoString = deprecate(
        "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
        toISOString$1
      );
      proto$2.lang = lang;
      addFormatToken("X", 0, 0, "unix");
      addFormatToken("x", 0, 0, "valueOf");
      addRegexToken("x", matchSigned);
      addRegexToken("X", matchTimestamp);
      addParseToken("X", function(input, array, config) {
        config._d = new Date(parseFloat(input) * 1e3);
      });
      addParseToken("x", function(input, array, config) {
        config._d = new Date(toInt(input));
      });
      hooks.version = "2.30.1";
      setHookCallback(createLocal);
      hooks.fn = proto;
      hooks.min = min;
      hooks.max = max;
      hooks.now = now;
      hooks.utc = createUTC;
      hooks.unix = createUnix;
      hooks.months = listMonths;
      hooks.isDate = isDate;
      hooks.locale = getSetGlobalLocale;
      hooks.invalid = createInvalid;
      hooks.duration = createDuration;
      hooks.isMoment = isMoment;
      hooks.weekdays = listWeekdays;
      hooks.parseZone = createInZone;
      hooks.localeData = getLocale;
      hooks.isDuration = isDuration;
      hooks.monthsShort = listMonthsShort;
      hooks.weekdaysMin = listWeekdaysMin;
      hooks.defineLocale = defineLocale;
      hooks.updateLocale = updateLocale;
      hooks.locales = listLocales;
      hooks.weekdaysShort = listWeekdaysShort;
      hooks.normalizeUnits = normalizeUnits;
      hooks.relativeTimeRounding = getSetRelativeTimeRounding;
      hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
      hooks.calendarFormat = getCalendarFormat;
      hooks.prototype = proto;
      hooks.HTML5_FMT = {
        DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
        // <input type="datetime-local" />
        DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
        // <input type="datetime-local" step="1" />
        DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
        // <input type="datetime-local" step="0.001" />
        DATE: "YYYY-MM-DD",
        // <input type="date" />
        TIME: "HH:mm",
        // <input type="time" />
        TIME_SECONDS: "HH:mm:ss",
        // <input type="time" step="1" />
        TIME_MS: "HH:mm:ss.SSS",
        // <input type="time" step="0.001" />
        WEEK: "GGGG-[W]WW",
        // <input type="week" />
        MONTH: "YYYY-MM"
        // <input type="month" />
      };
      return hooks;
    });
  }
});

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => SRPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian11 = require("obsidian");
var graph = __toESM(require_lib());

// src/settings.ts
var import_obsidian2 = require("obsidian");

// src/lang/helpers.ts
var import_obsidian = require("obsidian");

// src/lang/locale/af.ts
var af_default = {};

// src/lang/locale/ar.ts
var ar_default = {
  // flashcard-modal.tsx
  DECKS: "\u0627\u0644\u0631\u064F\u0632\u0645\u064E\u0627\u062A",
  DUE_CARDS: "\u0628\u0637\u0627\u0642\u0627\u062A \u0645\u064F\u0633\u062A\u062D\u0642\u0629",
  NEW_CARDS: "\u0628\u0637\u0627\u0642\u0627\u062A \u062C\u062F\u064A\u062F\u0629",
  TOTAL_CARDS: "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A",
  BACK: "\u0631\u062C\u0648\u0639",
  SKIP: "Skip",
  EDIT_CARD: "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0628\u0637\u0627\u0642\u0629",
  RESET_CARD_PROGRESS: "\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u062A\u0642\u062F\u0651\u064F\u0645\u0652 \u0627\u0644\u0628\u0637\u0627\u0642\u0629",
  HARD: "\u0635\u0639\u0628",
  GOOD: "\u062C\u064A\u062F",
  EASY: "\u0633\u0647\u0644",
  SHOW_ANSWER: "\u0623\u0638\u0647\u0650\u0631 \u0627\u0644\u0625\u062C\u0627\u0628\u0629",
  CARD_PROGRESS_RESET: ".\u062A\u0645\u0651\u064E\u062A \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u062A\u0642\u062F\u0651\u064F\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629",
  SAVE: "\u062D\u0641\u0638",
  CANCEL: "\u0625\u0644\u063A\u0627\u0621",
  NO_INPUT: ".\u0644\u0645 \u064A\u062A\u0650\u0645 \u062A\u0642\u062F\u064A\u0645 \u0623\u064A \u0645\u064F\u062F\u062E\u0644\u0627\u062A",
  CURRENT_EASE_HELP_TEXT: ":\u0627\u0644\u0633\u0647\u0648\u0644\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629",
  CURRENT_INTERVAL_HELP_TEXT: ":\u0627\u0644\u0641\u0627\u0635\u0644 \u0627\u0644\u0632\u0645\u0646\u064A \u0627\u0644\u062D\u0627\u0644\u064A",
  CARD_GENERATED_FROM: "${notePath} :\u062A\u0645 \u0625\u0646\u0634\u0627\u0624\u0647\u0627 \u0645\u0646",
  // main.ts
  OPEN_NOTE_FOR_REVIEW: "\u0627\u0641\u062A\u062D \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0644\u0644\u0645\u0631\u0627\u062C\u0639\u0629",
  REVIEW_CARDS: "\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A",
  REVIEW_EASY_FILE_MENU: "\u0645\u0631\u0627\u062C\u0639\u0629: \u0633\u0647\u0644",
  REVIEW_GOOD_FILE_MENU: "\u0645\u0631\u0627\u062C\u0639\u0629: \u062C\u064A\u062F",
  REVIEW_HARD_FILE_MENU: "\u0645\u0631\u0627\u062C\u0639\u0629: \u0635\u0639\u0628",
  REVIEW_NOTE_EASY_CMD: "\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0643\u0640 \u0633\u0647\u0644\u0629",
  REVIEW_NOTE_GOOD_CMD: "\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0643\u0640 \u062C\u064A\u062F\u0629",
  REVIEW_NOTE_HARD_CMD: "\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0643\u0640 \u0635\u0639\u0628\u0629",
  CRAM_ALL_CARDS: "\u062D\u062F\u062F \u0631\u064F\u0632\u0645\u064E\u0629 \u0644\u0644\u062D\u0634\u0631",
  REVIEW_ALL_CARDS: "\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A \u0645\u0646 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A",
  REVIEW_CARDS_IN_NOTE: "\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A  \u0645\u0646 \u0647\u0630\u0647 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",
  CRAM_CARDS_IN_NOTE: "\u0623\u062D\u0634\u0631 \u062C\u0645\u064A\u0639 \u0628\u0637\u0627\u0642\u0627\u062A \u0647\u0630\u0647 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",
  VIEW_STATS: "\u0639\u0631\u0636 \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A",
  STATUS_BAR: "\u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062D\u0642\u0629 ${dueFlashcardsCount},\u0645\u0644\u0627\u062D\u0638\u0627\u062A ${dueNotesCount}:\u0645\u0631\u0627\u062C\u0639\u0629",
  SYNC_TIME_TAKEN: "${t}ms \u0627\u0633\u062A\u063A\u0631\u0627\u0642 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629",
  NOTE_IN_IGNORED_FOLDER: ".\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u064A\u062A\u0645 \u062D\u0641\u0638\u0647\u0627 \u0636\u0645\u0646 \u0627\u0644\u0645\u062C\u0644\u062F \u0627\u0644\u0630\u064A \u062A\u0645 \u062A\u062C\u0627\u0647\u0644\u0647 (\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A)",
  PLEASE_TAG_NOTE: ".\u064A\u0631\u062C\u0649 \u0648\u0636\u0639 \u0648\u0633\u0645 \u0639\u0644\u0649 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u0634\u0643\u0644 \u0645\u0646\u0627\u0633\u0628 \u0644\u0644\u0645\u0631\u0627\u062C\u0639\u0629 (\u0641\u064A \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A)",
  RESPONSE_RECEIVED: ".\u0627\u0633\u062A\u064F\u0644\u0645\u062A \u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629",
  NO_DECK_EXISTS: "${deckName} \u0644\u0627 \u064A\u0648\u062C\u062F \u0631\u064F\u0632\u0645\u064E\u0629",
  ALL_CAUGHT_UP: "\u{1F606} \u0644\u0642\u062F \u062A\u0645 \u0627\u0644\u0642\u0628\u0636 \u0639\u0644\u064A\u0643\u0645 \u062C\u0645\u064A\u0639\u0627 \u0627\u0644\u0622\u0646",
  // scheduling.ts
  DAYS_STR_IVL: "\u064A\u0648\u0645/\u0623\u064A\u0627\u0645 ${interval}",
  MONTHS_STR_IVL: "\u0634\u0647\u0631/\u0623\u0634\u0647\u0631 ${interval}",
  YEARS_STR_IVL: "\u0633\u0646\u0629/\u0633\u0646\u0648\u0627\u062A ${interval}",
  DAYS_STR_IVL_MOBILE: "\u064A${interval}",
  MONTHS_STR_IVL_MOBILE: "\u0634${interval}",
  YEARS_STR_IVL_MOBILE: "\u0633${interval}",
  // settings.ts
  SETTINGS_HEADER: "Spaced Repetition Plugin - Settings",
  CHECK_WIKI: '.<a href="${wiki_url}">wiki</a> \u0644\u0645\u0632\u064A\u062F \u0645\u0646 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u060C \u062A\u062D\u0642\u0642 \u0645\u0646',
  FOLDERS_TO_IGNORE: "\u0645\u062C\u0644\u062F\u0627\u062A \u0644\u062A\u062C\u0627\u0647\u0644\u0647\u0627",
  FOLDERS_TO_IGNORE_DESC: "Templates Meta/Scripts : \u0623\u062F\u062E\u0644 \u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u062C\u0644\u062F \u0645\u0641\u0635\u0648\u0644\u0629 \u0628\u0648\u0627\u0633\u0637\u0629 \u0633\u0637\u0648\u0631 \u062C\u062F\u064A\u062F\u0629,\u0645\u062B\u0627\u0644",
  FLASHCARDS: "\u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A",
  FLASHCARD_EASY_LABEL: "\u0646\u0635 \u0627\u0644\u0632\u0631 \u0633\u0647\u0644",
  FLASHCARD_GOOD_LABEL: "\u0646\u0635 \u0627\u0644\u0632\u0631 \u062C\u064A\u062F",
  FLASHCARD_HARD_LABEL: "\u0646\u0635 \u0627\u0644\u0632\u0631 \u0635\u0639\u0628",
  FLASHCARD_EASY_DESC: '"\u062A\u062E\u0635\u064A\u0635 \u0627\u0644\u062A\u0633\u0645\u064A\u0629 \u0644\u0644\u0632\u0631 "\u0633\u0647\u0644',
  FLASHCARD_GOOD_DESC: '"\u062A\u062E\u0635\u064A\u0635 \u0627\u0644\u062A\u0633\u0645\u064A\u0629 \u0644\u0644\u0632\u0631 "\u062C\u064A\u062F',
  FLASHCARD_HARD_DESC: '"\u062A\u062E\u0635\u064A\u0635 \u0627\u0644\u062A\u0633\u0645\u064A\u0629 \u0644\u0644\u0632\u0631 "\u0635\u0639\u0628',
  FLASHCARD_TAGS: "\u0648\u064F\u0633\u0648\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A",
  FLASHCARD_TAGS_DESC: "#2\u0623\u062F\u062E\u0644 \u0627\u0644\u0648\u064F\u0633\u0648\u0645 \u0645\u0641\u0635\u0648\u0644\u0629 \u0628\u0645\u0633\u0627\u0641\u0627\u062A \u0623\u0648 \u0623\u0633\u0637\u0631 \u062C\u062F\u064A\u062F\u0629 \u060C \u0623\u064A \u0628\u0637\u0627\u0642\u0627\u062A# \u0631\u0632\u0645\u06293# \u0631\u0632\u0645\u0629",
  CONVERT_FOLDERS_TO_DECKS: "\u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0645\u062C\u0644\u062F\u0627\u062A \u0625\u0644\u0649 \u0645\u0644\u0641\u0627\u062A \u0623\u0635\u0644\u064A\u0629 \u0648 \u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0641\u0631\u0639\u064A\u0629\u061F",
  CONVERT_FOLDERS_TO_DECKS_DESC: ".\u0647\u0630\u0627 \u0647\u0648 \u0628\u062F\u064A\u0644 \u0644\u062E\u064A\u0627\u0631 \u0648\u0633\u0648\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0623\u0639\u0644\u0627\u0647",
  INLINE_SCHEDULING_COMMENTS: "\u062D\u0641\u0638 \u062A\u0639\u0644\u064A\u0642 \u0627\u0644\u062C\u062F\u0648\u0644\u0629 \u0639\u0644\u0649 \u0646\u0641\u0633 \u0627\u0644\u0633\u0637\u0631 \u0645\u062B\u0644 \u0627\u0644\u0633\u0637\u0631 \u0627\u0644\u0623\u062E\u064A\u0631 \u0644\u0644\u0628\u0637\u0627\u0642\u0629 \u061F",
  INLINE_SCHEDULING_COMMENTS_DESC: "\u0644\u0627 \u062A\u0643\u0633\u0631 \u062A\u0646\u0633\u064A\u0642 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 HTML \u0633\u064A\u0624\u062F\u064A \u062A\u0634\u063A\u064A\u0644 \u0647\u0630\u0627 \u0625\u0644\u0649 \u062C\u0639\u0644 \u062A\u0639\u0644\u064A\u0642\u0627\u062A",
  BURY_SIBLINGS_TILL_NEXT_DAY: "\u0623\u062E\u0641\u064A \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0634\u0642\u064A\u0642\u0629 \u062D\u062A\u0649 \u0627\u0644\u064A\u0648\u0645 \u0627\u0644\u062A\u0627\u0644\u064A",
  BURY_SIBLINGS_TILL_NEXT_DAY_DESC: "cloze deletions : \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0634\u0642\u064A\u0642\u0629 \u0647\u064A \u0628\u0637\u0627\u0642\u0627\u062A \u062A\u0645 \u0625\u0646\u0634\u0627\u0624\u0647\u0627 \u0645\u0646 \u0646\u0641\u0633 \u0646\u0635 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0643\u0640",
  SHOW_CARD_CONTEXT: "\u0625\u0638\u0647\u0627\u0631 \u0627\u0644\u0633\u064A\u0627\u0642 \u0641\u064A \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A\u061F",
  SHOW_CARD_CONTEXT_DESC: "i.e. Title > Heading 1 > Subheading > ... > Subheading",
  CARD_MODAL_HEIGHT_PERCENT: "\u0646\u0633\u0628\u0629 \u0627\u0631\u062A\u0641\u0627\u0639 \u0627\u0644\u0628\u0637\u0627\u0642\u0629",
  CARD_MODAL_SIZE_PERCENT_DESC: "\u064A\u062C\u0628 \u0636\u0628\u0637\u0647\u0627 \u0639\u0644\u0649 100 \u066A \u0639\u0644\u0649 \u0627\u0644\u0647\u0627\u062A\u0641 \u0627\u0644\u0645\u062D\u0645\u0648\u0644 \u0623\u0648 \u0625\u0630\u0627 \u0643\u0627\u0646 \u0644\u062F\u064A\u0643 \u0635\u0648\u0631 \u0643\u0628\u064A\u0631\u0629 \u062C\u062F\u064B\u0627",
  RESET_DEFAULT: "\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0625\u0644\u0649 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A",
  CARD_MODAL_WIDTH_PERCENT: "\u0646\u0633\u0628\u0629 \u0639\u0631\u0636 \u0627\u0644\u0628\u0637\u0627\u0642\u0629",
  RANDOMIZE_CARD_ORDER: "\u062A\u0631\u062A\u064A\u0628 \u0628\u0637\u0627\u0642\u0629 \u0639\u0634\u0648\u0627\u0626\u064A \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629\u061F",
  REVIEW_CARD_ORDER_WITHIN_DECK: "Order cards in a deck are displayed during review",
  REVIEW_CARD_ORDER_NEW_FIRST_SEQUENTIAL: "Sequentially within a deck (All new cards first)",
  REVIEW_CARD_ORDER_DUE_FIRST_SEQUENTIAL: "Sequentially within a deck (All due cards first)",
  REVIEW_CARD_ORDER_NEW_FIRST_RANDOM: "Randomly within a deck (All new cards first)",
  REVIEW_CARD_ORDER_DUE_FIRST_RANDOM: "Randomly within a deck (All due cards first)",
  REVIEW_CARD_ORDER_RANDOM_DECK_AND_CARD: "Random card from random deck",
  REVIEW_DECK_ORDER: "Order decks are displayed during review",
  REVIEW_DECK_ORDER_PREV_DECK_COMPLETE_SEQUENTIAL: "Sequentially (once all cards in previous deck reviewed)",
  REVIEW_DECK_ORDER_PREV_DECK_COMPLETE_RANDOM: "Randomly (once all cards in previous deck reviewed)",
  REVIEW_DECK_ORDER_RANDOM_DECK_AND_CARD: "Random card from random deck",
  DISABLE_CLOZE_CARDS: "\u061Fcloze \u062A\u0639\u0637\u064A\u0644 \u0628\u0637\u0627\u0642\u0627\u062A",
  CONVERT_HIGHLIGHTS_TO_CLOZES: "Convert ==hightlights== to clozes?",
  CONVERT_BOLD_TEXT_TO_CLOZES: "Convert **bolded text** to clozes?",
  CONVERT_CURLY_BRACKETS_TO_CLOZES: "Convert {{curly brackets}} to clozes?",
  INLINE_CARDS_SEPARATOR: "\u0641\u0627\u0635\u0644 \u0645\u0646 \u0623\u062C\u0644 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0645\u0636\u0645\u0646\u0629",
  FIX_SEPARATORS_MANUALLY_WARNING: "\u0636\u0639 \u0641\u064A \u062D\u0633\u0627\u0628\u0643 \u0623\u0646\u0647 \u0628\u0639\u062F \u062A\u063A\u064A\u064A\u0631 \u0647\u0630\u0627 \u060C \u064A\u062C\u0628 \u0639\u0644\u064A\u0643 \u062A\u0639\u062F\u064A\u0644 \u0623\u064A \u0628\u0637\u0627\u0642\u0627\u062A \u0644\u062F\u064A\u0643 \u0628\u0627\u0644\u0641\u0639\u0644 \u064A\u062F\u0648\u064A\u064B\u0627",
  INLINE_REVERSED_CARDS_SEPARATOR: "\u0641\u0627\u0635\u0644 \u0645\u0646 \u0623\u062C\u0644 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0639\u0643\u0633\u064A\u0629 \u0627\u0644\u0645\u0636\u0645\u0646\u0629",
  MULTILINE_CARDS_SEPARATOR: "\u0641\u0627\u0635\u0644 \u0645\u0646 \u0623\u062C\u0644 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0645\u062A\u0639\u062F\u062F\u0629",
  MULTILINE_REVERSED_CARDS_SEPARATOR: "\u0641\u0627\u0635\u0644 \u0645\u0646 \u0623\u062C\u0644 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0639\u0643\u0633\u064A\u0629 \u0627\u0644\u0645\u062A\u0639\u062F\u062F\u0629",
  NOTES: "\u0645\u0644\u0627\u062D\u0638\u0627\u062A",
  REVIEW_PANE_ON_STARTUP: "\u062A\u0645\u0643\u064A\u0646 \u062C\u0632\u0621 \u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0639\u0646\u062F \u0628\u062F\u0621 \u0627\u0644\u062A\u0634\u063A\u064A\u0644",
  TAGS_TO_REVIEW: "\u0648\u0633\u0648\u0645 \u0644\u0644\u0645\u0631\u0627\u062C\u0639\u0629",
  TAGS_TO_REVIEW_DESC: "#\u0623\u062F\u062E\u0644 \u0627\u0644\u0648\u0633\u0648\u0645 \u0645\u0641\u0635\u0648\u0644\u0629 \u0628\u0645\u0633\u0627\u0641\u0627\u062A \u0623\u0648 \u062E\u0637\u0648\u0637 \u062C\u062F\u064A\u062F\u0629 \u060C \u0623\u064A : \u0645\u0631\u0627\u062C\u0639\u0629# \u0648\u0633\u06452# \u0648\u0633\u06453",
  OPEN_RANDOM_NOTE: "\u0627\u0641\u062A\u062D \u0645\u0644\u0627\u062D\u0638\u0629 \u0639\u0634\u0648\u0627\u0626\u064A\u0629 \u0644\u0644\u0645\u0631\u0627\u062C\u0639\u0629",
  OPEN_RANDOM_NOTE_DESC: "(Pagerank) \u0639\u0646\u062F \u062A\u0639\u0637\u064A\u0644 \u0647\u0630\u0627 \u0627\u0644\u062E\u064A\u0627\u0631 \u060C\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0633\u064A\u062A\u0645 \u062A\u0631\u062A\u064A\u0628\u064F\u0647\u0627 \u062D\u0633\u0628 \u0627\u0644\u0623\u0647\u0645\u064A\u0629",
  AUTO_NEXT_NOTE: "\u0627\u0641\u062A\u062D \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u064B\u0627 \u0628\u0639\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629",
  DISABLE_FILE_MENU_REVIEW_OPTIONS: "\u062A\u0639\u0637\u064A\u0644 \u062E\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0641\u064A \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u060C \u0623\u064A \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629:\u0627\u0644\u0633\u0647\u0644 \u0627\u0644\u0635\u0639\u0628 \u0627\u0644\u062C\u064A\u062F",
  DISABLE_FILE_MENU_REVIEW_OPTIONS_DESC: "\u0639\u0646\u062F \u062A\u063A\u064A\u064A\u0631 \u0647\u0630\u0627 \u0627\u0644\u062E\u064A\u0627\u0631 Obsidian \u0623\u0639\u062F \u062A\u0634\u063A\u064A\u0644 , command hotkeys. \u0628\u0639\u062F \u0627\u0644\u062A\u0639\u0637\u064A\u0644 \u060C \u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645",
  MAX_N_DAYS_REVIEW_QUEUE: "\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0639\u062F\u062F \u0627\u0644\u0623\u064A\u0627\u0645 \u0627\u0644\u062A\u064A \u064A\u062C\u0628 \u0639\u0631\u0636\u0647\u0627 \u0639\u0644\u0649 \u0627\u0644\u0644\u0648\u062D\u0629 \u0627\u0644\u064A\u0645\u0646\u0649",
  MIN_ONE_DAY: "\u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0639\u062F\u062F \u0627\u0644\u0623\u064A\u0627\u0645 1 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644",
  VALID_NUMBER_WARNING: "\u064A\u0631\u062C\u0649 \u062A\u0642\u062F\u064A\u0645 \u0631\u0642\u0645 \u0635\u0627\u0644\u062D",
  UI_PREFERENCES: "\u062A\u0641\u0636\u064A\u0644\u0627\u062A \u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE: "\u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u0634\u062C\u0631\u064A \u0644\u0644\u0631\u064F\u0632\u0645 \u0645\u0648\u0633\u0639 \u0628\u062D\u064A\u062B \u062A\u0637\u0647\u0631 \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0641\u0631\u0639\u064A\u0629 \u0643\u0644\u0647\u0627",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE_DESC: " \u0639\u0637\u0644 \u0647\u0630\u0627 \u0627\u0644\u062E\u064A\u0627\u0631 \u0644\u0637\u064A \u0627\u0644\u0631\u064F\u0632\u0645 \u0627\u0644\u0645\u062A\u062F\u0627\u062E\u0644\u0629 \u0641\u064A \u0646\u0641\u0633 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 , \u0645\u0641\u064A\u062F \u0625\u0630\u0627 \u0643\u0627\u0646 \u0644\u062F\u064A\u0643 \u0628\u0637\u0627\u0642\u0627\u062A \u062A\u0646\u062A\u0645\u064A \u0625\u0644\u0649 \u0627\u0644\u0639\u062F\u064A\u062F \u0645\u0646 \u0627\u0644\u0631\u064F\u0632\u0645 \u0641\u064A \u0646\u0641\u0633 \u0627\u0644\u0645\u0644\u0641",
  ALGORITHM: "\u062E\u0648\u0627\u0631\u0632\u0645\u064A\u0629",
  CHECK_ALGORITHM_WIKI: '<a href="${algo_url}">algorithm implementation</a> :\u0644\u0645\u0632\u064A\u062F \u0645\u0646 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u062A\u062D\u0642\u0642 \u0645\u0646',
  BASE_EASE: "\u0633\u0647\u0648\u0644\u0629 \u0627\u0644\u0642\u0627\u0639\u062F\u0629",
  BASE_EASE_DESC: "\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649 = 130 \u060C \u0648\u064A\u0641\u0636\u0644 \u062D\u0648\u0627\u0644\u064A 250.",
  BASE_EASE_MIN_WARNING: "\u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0633\u0647\u0648\u0644\u0629 \u0627\u0644\u0642\u0627\u0639\u062F\u0629 130 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644.",
  LAPSE_INTERVAL_CHANGE: "\u0627\u0644\u0641\u0627\u0635\u0644 \u0627\u0644\u0632\u0645\u0646\u064A \u064A\u062A\u063A\u064A\u0631 \u0639\u0646\u062F \u0645\u0631\u0627\u062C\u0639\u0629 \u0628\u0637\u0627\u0642\u0629/\u0645\u0644\u0627\u062D\u0638\u0629 \u0635\u0639\u0628\u0629",
  LAPSE_INTERVAL_CHANGE_DESC: "newInterval = oldInterval * intervalChange / 100.",
  EASY_BONUS: "\u0645\u0643\u0627\u0641\u0623\u0629 \u0633\u0647\u0644\u0629",
  EASY_BONUS_DESC: "\u062A\u062A\u064A\u062D \u0644\u0643 \u0627\u0644\u0645\u0643\u0627\u0641\u0623\u0629 \u0627\u0644\u0633\u0647\u0644\u0629 \u0636\u0628\u0637 \u0627\u0644\u0641\u0631\u0642 \u0641\u064A \u0627\u0644\u0641\u0648\u0627\u0635\u0644 \u0627\u0644\u0632\u0645\u0646\u064A\u0629 \u0628\u064A\u0646 \u0627\u0644\u0631\u062F \u0627\u0644\u062C\u064A\u062F \u0648\u0627\u0644\u0633\u0647\u0644 \u0639\u0644\u0649 \u0628\u0637\u0627\u0642\u0629/\u0645\u0644\u0627\u062D\u0638\u0629 (\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649 = 100 \u066A).",
  EASY_BONUS_MIN_WARNING: "\u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0627\u0644\u0645\u0643\u0627\u0641\u0623\u0629 \u0627\u0644\u0633\u0647\u0644\u0629 100 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644.",
  MAX_INTERVAL: "Maximum interval in days",
  MAX_INTERVAL_DESC: "\u064A\u062A\u064A\u062D \u0644\u0643 \u0648\u0636\u0639 \u062D\u062F \u0623\u0639\u0644\u0649  \u0644\u0644\u0641\u0627\u0635\u0644 \u0627\u0644\u0632\u0645\u0646\u064A (\u0627\u0641\u062A\u0631\u0627\u0636\u064A = 100 \u0639\u0627\u0645).",
  MAX_INTERVAL_MIN_WARNING: "\u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0644\u0641\u0627\u0635\u0644 \u0627\u0644\u0632\u0645\u0646\u064A \u0644\u0645\u062F\u0629 \u064A\u0648\u0645 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644.",
  MAX_LINK_CONTRIB: "\u0623\u0642\u0635\u0649 \u0645\u0633\u0627\u0647\u0645\u0629 \u0627\u0631\u062A\u0628\u0627\u0637",
  MAX_LINK_CONTRIB_DESC: "\u0623\u0642\u0635\u0649 \u0645\u0633\u0627\u0647\u0645\u0629 \u0644\u0644\u0633\u0647\u0648\u0644\u0629 \u0627\u0644\u0645\u0631\u062C\u062D\u0629 \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0627\u0644\u0633\u0647\u0648\u0644\u0629 \u0627\u0644\u0623\u0648\u0644\u064A\u0629.",
  LOGGING: "\u062A\u0633\u062C\u064A\u0644",
  DISPLAY_DEBUG_INFO: "\u0639\u0631\u0636 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D \u0639\u0644\u0649 \u0648\u062D\u062F\u0629 \u062A\u062D\u0643\u0645 \u0627\u0644\u0645\u0637\u0648\u0631\u061F",
  // sidebar.ts
  NOTES_REVIEW_QUEUE: "\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629",
  CLOSE: "\u0623\u063A\u0644\u0642",
  NEW: "\u062C\u062F\u064A\u062F",
  YESTERDAY: "\u0627\u0644\u0628\u0627\u0631\u062D\u0629",
  TODAY: "\u0627\u0644\u064A\u0648\u0645",
  TOMORROW: "\u0627\u0644\u063A\u062F",
  // stats-modal.tsx
  STATS_TITLE: "\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A",
  MONTH: "\u0634\u0647\u0631",
  QUARTER: "\u0631\u0628\u0639 \u0627\u0644\u0633\u0646\u0629",
  YEAR: "\u0633\u0646\u0629",
  LIFETIME: "",
  FORECAST: "",
  FORECAST_DESC: "\u0639\u062F\u062F \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062D\u0642\u0629 \u0641\u064A \u0627\u0644\u0645\u0633\u062A\u0642\u0628\u0644",
  SCHEDULED: "\u0627\u0644\u0645\u0642\u0631\u0631",
  DAYS: "\u0623\u064A\u0627\u0645",
  NUMBER_OF_CARDS: "\u0639\u062F\u062F \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A",
  REVIEWS_PER_DAY: "\u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0627\u062A/\u0627\u0644\u064A\u0648\u0645 ${avg} :\u0645\u062A\u0648\u0633\u0637",
  INTERVALS: "\u0641\u0648\u0627\u0635\u0644 \u0632\u0645\u0646\u064A\u0629",
  INTERVALS_DESC: "\u0627\u0644\u062A\u0623\u062E\u064A\u0631 \u062D\u062A\u0649 \u064A\u062A\u0645 \u0639\u0631\u0636 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0627\u062A \u0645\u0631\u0629 \u0623\u062E\u0631\u0649",
  COUNT: "\u0639\u062F\u062F",
  INTERVALS_SUMMARY: "${longest} : \u0623\u0637\u0648\u0644 \u0641\u0627\u0635\u0644 \u0632\u0645\u0646\u064A ,${avg} :\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0641\u0627\u0635\u0644 \u0627\u0644\u0632\u0645\u0646\u064A",
  EASES: "\u0627\u0644\u0633\u0647\u0648\u0644\u0629",
  EASES_SUMMARY: "${avgEase} :\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0633\u0647\u0648\u0644\u0629",
  CARD_TYPES: "\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A",
  CARD_TYPES_DESC: "\u0648\u0647\u0630\u0627 \u064A\u0634\u0645\u0644 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0645\u062E\u0641\u064A\u0629 \u0643\u0630\u0644\u0643 \u060C \u0625\u0646 \u0648\u062C\u062F\u062A",
  CARD_TYPE_NEW: "\u062C\u062F\u064A\u062F\u0629",
  CARD_TYPE_YOUNG: "\u0635\u063A\u064A\u0631\u0629",
  CARD_TYPE_MATURE: "\u0646\u0627\u0636\u062C\u0629",
  CARD_TYPES_SUMMARY: " ${totalCardsCount} :\u0625\u062C\u0645\u0627\u0644\u064A \u0639\u062F\u062F \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A"
};

// src/lang/locale/cz.ts
var cz_default = {
  // flashcard-modal.tsx
  DECKS: "Bal\xED\u010Dky",
  DUE_CARDS: "Karti\u010Dky po term\xEDnu",
  NEW_CARDS: "Nov\xE9 karti\u010Dky",
  TOTAL_CARDS: "Karti\u010Dek celkem",
  BACK: "Back",
  SKIP: "Skip",
  EDIT_CARD: "Edit Card",
  RESET_CARD_PROGRESS: "Vynulovat pokrok karti\u010Dky",
  HARD: "Te\u017Ek\xE9",
  GOOD: "Dobr\xE9",
  EASY: "Jednoduch\xE9",
  SHOW_ANSWER: "Uk\xE1zat odpov\u011B\u010F",
  CARD_PROGRESS_RESET: "Pokrok karti\u010Dky byl vynulov\xE1n.",
  SAVE: "Save",
  CANCEL: "Cancel",
  NO_INPUT: "No input provided.",
  CURRENT_EASE_HELP_TEXT: "Current Ease: ",
  CURRENT_INTERVAL_HELP_TEXT: "Current Interval: ",
  CARD_GENERATED_FROM: "Generated from: ${notePath}",
  // main.ts
  OPEN_NOTE_FOR_REVIEW: "Otev\u0159\xEDt pozn\xE1mku k revizi",
  REVIEW_CARDS: "Pozn\xE1mek k revizi",
  REVIEW_EASY_FILE_MENU: "Revize: Jednoduch\xE9",
  REVIEW_GOOD_FILE_MENU: "Revize: Dobr\xE9",
  REVIEW_HARD_FILE_MENU: "Revize: T\u011B\u017Ek\xE9",
  REVIEW_NOTE_EASY_CMD: "Ozna\u010Dit pozn\xE1mku jako jednoduchou",
  REVIEW_NOTE_GOOD_CMD: "Ozna\u010Dit pozn\xE1mku jako dobrou",
  REVIEW_NOTE_HARD_CMD: "Ozna\u010Dit pozn\xE1mku jako te\u017Ekou",
  REVIEW_ALL_CARDS: "Revidovat karti\u010Dky ve v\u0161ech pozn\xE1mk\xE1ch",
  CRAM_ALL_CARDS: "Select a deck to cram",
  REVIEW_CARDS_IN_NOTE: "Revidovat karti\u010Dky v t\xE9to pozn\xE1mce.",
  CRAM_CARDS_IN_NOTE: "Cram karti\u010Dky v t\xE9to pozn\xE1mce.",
  VIEW_STATS: "Uk\xE1zat statistiky",
  STATUS_BAR: "Revize: ${dueNotesCount} pozn\xE1mek, ${dueFlashcardsCount} karti\u010Dek po term\xEDnu",
  SYNC_TIME_TAKEN: "Synchronizace trvala ${t}ms",
  NOTE_IN_IGNORED_FOLDER: "Pozn\xE1mka je ulo\u017Eena v ignorovan\xE9 slo\u017Ece (zkontrolujte nastaven\xED).",
  PLEASE_TAG_NOTE: "Pros\xEDm ozna\u010Dne pozn\xE1mku odpov\xEDdaj\xEDc\xEDm tagem pro revizi (v nastaven\xED).",
  RESPONSE_RECEIVED: "Odpov\u011B\u010F p\u0159ijata.",
  NO_DECK_EXISTS: "Neexistuje \u017E\xE1dn\xFD bal\xED\u010Dek pro ${deckName}",
  ALL_CAUGHT_UP: "V\u0161e zrevidov\xE1no",
  // scheduling.ts
  DAYS_STR_IVL: "${interval} den/dn\xED",
  MONTHS_STR_IVL: "${interval} m\u011Bs\xEDc(\u016F)",
  YEARS_STR_IVL: "${interval} rok(\u016F)",
  DAYS_STR_IVL_MOBILE: "${interval}d",
  MONTHS_STR_IVL_MOBILE: "${interval}m",
  YEARS_STR_IVL_MOBILE: "${interval}r",
  // settings.ts
  SETTINGS_HEADER: "Spaced Repetition Plugin - Nastaven\xED",
  CHECK_WIKI: 'Pro v\xEDce informac\xED jd\u011Bte na <a href="${wiki_url}">wiki</a>.',
  FOLDERS_TO_IGNORE: "Ignorovan\xE9 slo\u017Eky",
  FOLDERS_TO_IGNORE_DESC: "Zadejte cesty ke slo\u017Ek\xE1m odd\u011Blen\xE9 od\u0159\xE1dkov\xE1n\xEDm nap\u0159\xEDkad. \u0160ablony Meta/Scripts",
  FLASHCARDS: "Karti\u010Dky",
  FLASHCARD_EASY_LABEL: "Easy Button Text",
  FLASHCARD_GOOD_LABEL: "Good Button Text",
  FLASHCARD_HARD_LABEL: "Hard Button Text",
  FLASHCARD_EASY_DESC: 'Customize the label for the "Easy" Button',
  FLASHCARD_GOOD_DESC: 'Customize the label for the "Good" Button',
  FLASHCARD_HARD_DESC: 'Customize the label for the "Hard" Button',
  FLASHCARD_TAGS: "Tag pro karti\u010Dky",
  FLASHCARD_TAGS_DESC: "Zadete tagy ood\u011Blen\xE9 mezerou nebo od\u0159\xE1dkov\xE1n\xEDm nap\u0159\xEDklad. #karti\u010Dky #bal\xED\u010Dke2 #bal\xED\u010Dek3.",
  CONVERT_FOLDERS_TO_DECKS: "P\u0159ev\xE9st slo\u017Eky na bal\xED\u010Dky a podbal\xED\u010Dky?",
  CONVERT_FOLDERS_TO_DECKS_DESC: "Toto je alternativa k tag\u016Fm karti\u010Dek viz nastaven\xED v\xFD\u0161e.",
  INLINE_SCHEDULING_COMMENTS: "Ulo\u017Eit pl\xE1novac\xED koment\xE1\u0159 na stejn\xFD \u0159\xE1dek jako posledn\xED polo\u017Eka karti\u010Dky?",
  INLINE_SCHEDULING_COMMENTS_DESC: "Zapnut\xED t\xE9to volby zp\u016Fsob\xED, \u017Ee HTML koment\xE1\u0159e nebudou rozb\xEDjet form\xE1tov\xE1n\xED list\u016F.",
  BURY_SIBLINGS_TILL_NEXT_DAY: "Odlo\u017Eit p\u0159\xEDbuzn\xE9 karti\u010Dky na dal\u0161\xED den?",
  BURY_SIBLINGS_TILL_NEXT_DAY_DESC: "P\u0159\xEDbuzn\xE9 karti\u010Dky jsou karti\u010Dky generovan\xE9 z textu stejn\xE9 pozn\xE1mky nap\u0159\xEDklad cloze smaz\xE1n\xED",
  SHOW_CARD_CONTEXT: "Uk\xE1zat kontext v karti\u010Dce?",
  SHOW_CARD_CONTEXT_DESC: "nap\u0159\xEDklad Titulek > Nadpis1 > Podnadpis > ... > Podnadpis",
  CARD_MODAL_HEIGHT_PERCENT: "V\xFD\u0161ka karti\u010Dek v procentech",
  CARD_MODAL_SIZE_PERCENT_DESC: "M\u011Blo by b\xFDt nastaveno na 100% na mobilu nebo kdy\u017E pou\u017E\xEDv\xE1te velk\xE9 obr\xE1zky",
  RESET_DEFAULT: "Resetovat v\xFDchoz\xED nastaven\xED",
  CARD_MODAL_WIDTH_PERCENT: "\u0160\xED\u0159ka karti\u010Dek v procentech",
  RANDOMIZE_CARD_ORDER: "N\xE1hodn\u011B zm\u011Bnit po\u0159ad\xED karti\u010Dek b\u011Bhem revize?",
  REVIEW_CARD_ORDER_WITHIN_DECK: "Order cards in a deck are displayed during review",
  REVIEW_CARD_ORDER_NEW_FIRST_SEQUENTIAL: "Sequentially within a deck (All new cards first)",
  REVIEW_CARD_ORDER_DUE_FIRST_SEQUENTIAL: "Sequentially within a deck (All due cards first)",
  REVIEW_CARD_ORDER_NEW_FIRST_RANDOM: "Randomly within a deck (All new cards first)",
  REVIEW_CARD_ORDER_DUE_FIRST_RANDOM: "Randomly within a deck (All due cards first)",
  REVIEW_CARD_ORDER_RANDOM_DECK_AND_CARD: "Random card from random deck",
  REVIEW_DECK_ORDER: "Order decks are displayed during review",
  REVIEW_DECK_ORDER_PREV_DECK_COMPLETE_SEQUENTIAL: "Sequentially (once all cards in previous deck reviewed)",
  REVIEW_DECK_ORDER_PREV_DECK_COMPLETE_RANDOM: "Randomly (once all cards in previous deck reviewed)",
  REVIEW_DECK_ORDER_RANDOM_DECK_AND_CARD: "Random card from random deck",
  DISABLE_CLOZE_CARDS: "Vypnout cloze karti\u010Dky?",
  CONVERT_HIGHLIGHTS_TO_CLOZES: "P\u0159ev\xE9st ==zv\xFDrazn\u011Bn\xED== na clozes?",
  CONVERT_BOLD_TEXT_TO_CLOZES: "P\u0159ev\xE9st **tu\u010Dn\xFD text** na clozes?",
  CONVERT_CURLY_BRACKETS_TO_CLOZES: "P\u0159ev\xE9st {{slo\u017Een\xE9 z\xE1vorky}} na clozes?",
  INLINE_CARDS_SEPARATOR: "Odd\u011Blova\u010D pro inline karti\u010Dky",
  FIX_SEPARATORS_MANUALLY_WARNING: "Pozor. Jakmile toto zm\u011Bn\xEDte, budete muset ru\u010Dn\u011B upravit v\u0161echny existuj\xEDc\xED karti\u010Dky.",
  INLINE_REVERSED_CARDS_SEPARATOR: "Odd\u011Blova\u010D pro oto\u010Den\xE9 inline karti\u010Dky",
  MULTILINE_CARDS_SEPARATOR: "Odd\u011Blova\u010D pro v\xEDce\u0159\xE1dkov\xE9 karti\u010Dky",
  MULTILINE_REVERSED_CARDS_SEPARATOR: "Odd\u011Blova\u010D pro v\xEDce\u0159\xE1dkove oto\u010Den\xE9 karti\u010Dky",
  NOTES: "Pozn\xE1mky",
  REVIEW_PANE_ON_STARTUP: "Enable note review pane on startup",
  TAGS_TO_REVIEW: "Tag pro revizi",
  TAGS_TO_REVIEW_DESC: "Zadejte tagy odd\u011Blen\xE9 mezerami nebo od\u0159\xE1dkov\xE1n\xEDm nap\u0159\xEDklad #review #tag2 #tag3.",
  OPEN_RANDOM_NOTE: "Otev\u0159\xEDt n\xE1hodnou pozn\xE1mku pro revizi",
  OPEN_RANDOM_NOTE_DESC: "Pokud toto vypnete, pozn\xE1mky budou \u0159azeny dle d\u016Fle\u017Eitosti (PageRank).",
  AUTO_NEXT_NOTE: "Otev\u0159\xEDt automaticky dal\u0161\xED pozn\xE1mku po dokon\u010Den\xED revize",
  DISABLE_FILE_MENU_REVIEW_OPTIONS: "Vypnout volby revize v menu souboru nap\u0159\xEDklad 'Revize: Jednoduch\xE9'",
  DISABLE_FILE_MENU_REVIEW_OPTIONS_DESC: "Po vypnut\xED m\u016F\u017Eete pou\u017E\xEDvat kl\xE1vesov\xE9 zkratky. Restartujte Obsidian po zm\u011Bn\u011B nastaven\xED.",
  MAX_N_DAYS_REVIEW_QUEUE: "Maxim\xE1ln\xED po\u010Det dn\xED zobrazen\xFDch v prav\xE9m panelu",
  MIN_ONE_DAY: "Po\u010Det dn\xED mus\xED b\xFDt minim\xE1ln\u011B 1.",
  VALID_NUMBER_WARNING: "Pros\xEDm zadejte validn\xED \u010D\xEDslo.",
  UI_PREFERENCES: "P\u0159edvolby u\u017Eivatelsk\xE9ho rozhran\xED",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE: "Stromy bal\xED\u010Dky by m\u011Bly b\xFDt zpo\u010D\xE1tku zobrazeny jako rozbalen\xE9",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE_DESC: "Vypn\u011Bte toto, chcete-li sbalit vno\u0159en\xE9 bal\xED\u010Dky na stejn\xE9 kart\u011B. To je u\u017Eite\u010Dn\xE9, pokud m\xE1te karti\u010Dky, kter\xE9 pat\u0159\xED k mnoha bal\xED\u010Dk\u016Fm ve stejn\xE9m souboru.",
  ALGORITHM: "Algoritmus",
  CHECK_ALGORITHM_WIKI: 'Pro v\xEDce informac\xED jd\u011Bte na <a href="${algo_url}">popis algoritmu</a>.',
  BASE_EASE: "Z\xE1kladn\xED slo\u017Eitost",
  BASE_EASE_DESC: "minimum = 130, nejl\xE9pe p\u0159ibli\u017En\u011B 250.",
  BASE_EASE_MIN_WARNING: "Z\xE1kladn\xED slo\u017Eitost mus\xED b\xFDt minim\xE1ln\u011B 130.",
  LAPSE_INTERVAL_CHANGE: "Zm\u011Bna intervalu pokud karti\u010Dku/pozn\xE1mku ozna\u010D\xEDte jako slo\u017Eitou",
  LAPSE_INTERVAL_CHANGE_DESC: "nov\xFD_inteval = star\xFD_interval * zm\u011Bna_intevalu / 100.",
  EASY_BONUS: "Bonus pro jednoduch\xE9",
  EASY_BONUS_DESC: "Tento bonus umo\u017E\u0148uje nastavit rozd\xEDl intervalu mezi jednoduch\xFDmi a dobr\xFDmi karti\u010Dkami/pozn\xE1mkami (minimum = 100%).",
  EASY_BONUS_MIN_WARNING: "Bonus pro jednoduchost mus\xED b\xFDt minim\xE1ln\u011B 100.",
  MAX_INTERVAL: "Maximum interval in days",
  MAX_INTERVAL_DESC: "Umo\u017E\u0148uje nastavit horn\xED limit pro interval (defaultn\u011B = 100 let).",
  MAX_INTERVAL_MIN_WARNING: "Maxim\xE1ln\xED interval mus\xED b\xFDt alespo\u0148 1 den.",
  MAX_LINK_CONTRIB: "Maxim\xE1ln\xED p\u0159\xEDsp\u011Bv\u011Bk prolinkov\xE1n\xED",
  MAX_LINK_CONTRIB_DESC: "Maxim\xE1ln\xED p\u0159\xEDsp\u011Bvek v\xE1\u017Een\xE9 slo\u017Eitosti prolinkovan\xFDch pozn\xE1mek pou\u017Eit\xFD pro ur\u010Den\xED po\u010D\xE1te\u010Dn\xED slo\u017Eitosti.",
  LOGGING: "Zaznamen\xE1v\xE1m",
  DISPLAY_DEBUG_INFO: "Zobrazit informace pro lad\u011Bn\xED na v\xFDvoj\xE1\u0159sk\xE9 konzoli?",
  // sidebar.ts
  NOTES_REVIEW_QUEUE: "Fronta pozn\xE1mek k revizi",
  CLOSE: "Uzav\u0159en\xE9",
  NEW: "Nov\xE9",
  YESTERDAY: "V\u010Dera",
  TODAY: "Dnes",
  TOMORROW: "Z\xEDtra",
  // stats-modal.tsx
  STATS_TITLE: "Statistiky",
  MONTH: "M\u011Bs\xEDc",
  QUARTER: "\u010Ctvrtlet\xED",
  YEAR: "Rok",
  LIFETIME: "Celkov\u011B",
  FORECAST: "P\u0159edpov\u011B\u010F",
  FORECAST_DESC: "Celkov\xFD po\u010Det karti\u010Dek, kter\xFDm vypr\u0161\xED term\xEDn",
  SCHEDULED: "Napl\xE1nov\xE1no",
  DAYS: "Dn\xED",
  NUMBER_OF_CARDS: "Po\u010Det karti\u010Dek",
  REVIEWS_PER_DAY: "Pr\u016Fm\u011Br: ${avg} revize/den",
  INTERVALS: "Intervaly",
  INTERVALS_DESC: "Doba, za kterou bude znovu zobrazeno k revize",
  COUNT: "Po\u010Det",
  INTERVALS_SUMMARY: "Pr\u016Fm\u011Brn\xFD interval: ${avg}, Nejdel\u0161\xED interval: ${longest}",
  EASES: "Slo\u017Eitost",
  EASES_SUMMARY: "Pr\u016Fm\u011Brn\xE1 slo\u017Eitost: ${avgEase}",
  CARD_TYPES: "Typy karti\u010Dek",
  CARD_TYPES_DESC: "Obsahuje i odlo\u017Een\xE9 karti\u010Dky (pokud existuj\xED)",
  CARD_TYPE_NEW: "Nov\xE1",
  CARD_TYPE_YOUNG: "Mlad\xE1",
  CARD_TYPE_MATURE: "Dosp\u011Bl\xE1",
  CARD_TYPES_SUMMARY: "Karti\u010Dek celkem: ${totalCardsCount}"
};

// src/lang/locale/bn.ts
var bn_default = {};

// src/lang/locale/da.ts
var da_default = {};

// src/lang/locale/de.ts
var de_default = {
  // flashcard-modal.tsx
  DECKS: "Stapel",
  DUE_CARDS: "Anstehende Karten",
  NEW_CARDS: "Neue Karten",
  TOTAL_CARDS: "Alle Karten",
  BACK: "Back",
  SKIP: "Skip",
  EDIT_CARD: "Edit Card",
  RESET_CARD_PROGRESS: "Kartenfortschritt zur\xFCcksetzten",
  HARD: "Schwer",
  GOOD: "Gut",
  EASY: "Einfach",
  SHOW_ANSWER: "Zeige Antwort",
  CARD_PROGRESS_RESET: "Kartenfortschritt wurde zur\xFCckgesetzt.",
  SAVE: "Save",
  CANCEL: "Cancel",
  NO_INPUT: "No input provided.",
  CURRENT_EASE_HELP_TEXT: "Current Ease: ",
  CURRENT_INTERVAL_HELP_TEXT: "Current Interval: ",
  CARD_GENERATED_FROM: "Generated from: ${notePath}",
  // main.ts
  OPEN_NOTE_FOR_REVIEW: "Notiz zur Wiederholung \xF6ffnen",
  REVIEW_CARDS: "Lernkarten wiederholen",
  REVIEW_EASY_FILE_MENU: "Notiz abschliessen als: Einfach",
  REVIEW_GOOD_FILE_MENU: "Notiz abschliessen als: Gut",
  REVIEW_HARD_FILE_MENU: "Notiz abschliessen als: Schwer",
  REVIEW_NOTE_EASY_CMD: "Notiz abschliessen als: Einfach",
  REVIEW_NOTE_GOOD_CMD: "Notiz abschliessen als: Gut",
  REVIEW_NOTE_HARD_CMD: "Notiz abschliessen als: Schwer",
  REVIEW_ALL_CARDS: "Alle Lernkarten wiederholen",
  CRAM_ALL_CARDS: "Select a deck to cram",
  REVIEW_CARDS_IN_NOTE: "Lernkarten in dieser Notiz wiederholen",
  CRAM_CARDS_IN_NOTE: "Lernkarten in dieser Notiz pauken.",
  VIEW_STATS: "Statistiken anzeigen",
  STATUS_BAR: "Wiederholung: ${dueNotesCount} Notiz(en), ${dueFlashcardsCount} Karte(n) anstehend",
  SYNC_TIME_TAKEN: "Sync dauerte ${t}ms",
  NOTE_IN_IGNORED_FOLDER: "Notiz befindet sich in einem ausgeschlossenen Ordner (siehe Einstellungen).",
  PLEASE_TAG_NOTE: "Bitte die Notiz f\xFCr Wiederholungen entsprechend taggen (siehe Einstellungen).",
  RESPONSE_RECEIVED: "Antwort erhalten.",
  NO_DECK_EXISTS: "Kein Stapel f\xFCr ${deckName} gefunden.",
  ALL_CAUGHT_UP: "Yuhu! Alles geschafft! :D.",
  // scheduling.ts
  DAYS_STR_IVL: "${interval} Tag(e)",
  MONTHS_STR_IVL: "${interval} Monat(e)",
  YEARS_STR_IVL: "${interval} Jahr(e)",
  DAYS_STR_IVL_MOBILE: "${interval}d",
  MONTHS_STR_IVL_MOBILE: "${interval}m",
  YEARS_STR_IVL_MOBILE: "${interval}y",
  // settings.ts
  SETTINGS_HEADER: "Spaced Repetition Plugin - Einstellungen",
  CHECK_WIKI: 'Weitere Informationen gibt es im <a href="${wiki_url}">Wiki</a> (english).',
  FOLDERS_TO_IGNORE: "Ausgeschlossene Ordner",
  FOLDERS_TO_IGNORE_DESC: "Mehrere Ordner mit Zeilenumbr\xFCchen getrennt angeben. Bsp. OrdnerA[Zeilenumbruch]OrdnerB/Unterordner",
  FLASHCARDS: "Lernkarten",
  FLASHCARD_EASY_LABEL: "Easy Button Text",
  FLASHCARD_GOOD_LABEL: "Good Button Text",
  FLASHCARD_HARD_LABEL: "Hard Button Text",
  FLASHCARD_EASY_DESC: 'Customize the label for the "Easy" Button',
  FLASHCARD_GOOD_DESC: 'Customize the label for the "Good" Button',
  FLASHCARD_HARD_DESC: 'Customize the label for the "Hard" Button',
  FLASHCARD_TAGS: "Lernkarten Tags",
  FLASHCARD_TAGS_DESC: "Mehrere Tags mit Leerzeichen oder Zeilenumbr\xFCchen getrennt angeben. Bsp. #karte #stapel2 #stapel3.",
  CONVERT_FOLDERS_TO_DECKS: "Ordner in Stapel und Substapel umwandeln?",
  CONVERT_FOLDERS_TO_DECKS_DESC: 'Eine Alternative zur oberen "Lernkarten Tags" Option.',
  INLINE_SCHEDULING_COMMENTS: "Den Fortschritt in der gleichen Zeile wie die letzte Zeile einer Lernkartei speichern?",
  INLINE_SCHEDULING_COMMENTS_DESC: "Wenn aktiviert, wird der HTML Kommentar die umgebende Liste nicht aufbrechen.",
  BURY_SIBLINGS_TILL_NEXT_DAY: "Verwandte Karten auf den n\xE4chsten Tag verlegen?",
  BURY_SIBLINGS_TILL_NEXT_DAY_DESC: "Verwandte Karten sind aus der gleichen Karte generiert worden (z.B. L\xFCckentextkarten oder beidseitige Karten).",
  SHOW_CARD_CONTEXT: "Kontext in den Karten anzeigen?",
  SHOW_CARD_CONTEXT_DESC: "Bsp. Titel > \xDCberschrift 1 > Sektion > ... > Untersektion",
  CARD_MODAL_HEIGHT_PERCENT: "H\xF6he der Lernkartei in Prozent",
  CARD_MODAL_SIZE_PERCENT_DESC: "Auf kleinen Bildschirmen (z.B. Smartphones) oder bei sehr grossen Bildern sollte dieser Wert auf 100% gesetzt werden.",
  RESET_DEFAULT: "Standardeinstellung wiederherstellen",
  CARD_MODAL_WIDTH_PERCENT: "Breite einer Lernkarte in Prozent",
  RANDOMIZE_CARD_ORDER: "W\xE4hrend der Wiederhoung die Reihenfolge zuf\xE4llig mischen?",
  REVIEW_CARD_ORDER_WITHIN_DECK: "Order cards in a deck are displayed during review",
  REVIEW_CARD_ORDER_NEW_FIRST_SEQUENTIAL: "Sequentially within a deck (All new cards first)",
  REVIEW_CARD_ORDER_DUE_FIRST_SEQUENTIAL: "Sequentially within a deck (All due cards first)",
  REVIEW_CARD_ORDER_NEW_FIRST_RANDOM: "Randomly within a deck (All new cards first)",
  REVIEW_CARD_ORDER_DUE_FIRST_RANDOM: "Randomly within a deck (All due cards first)",
  REVIEW_CARD_ORDER_RANDOM_DECK_AND_CARD: "Random card from random deck",
  REVIEW_DECK_ORDER: "Order decks are displayed during review",
  REVIEW_DECK_ORDER_PREV_DECK_COMPLETE_SEQUENTIAL: "Sequentially (once all cards in previous deck reviewed)",
  REVIEW_DECK_ORDER_PREV_DECK_COMPLETE_RANDOM: "Randomly (once all cards in previous deck reviewed)",
  REVIEW_DECK_ORDER_RANDOM_DECK_AND_CARD: "Random card from random deck",
  DISABLE_CLOZE_CARDS: "L\xFCckentextkarten (cloze deletions) deaktivieren?",
  CONVERT_HIGHLIGHTS_TO_CLOZES: "==Hervorgehobenen== Text in L\xFCckentextkarten umwandeln?",
  CONVERT_BOLD_TEXT_TO_CLOZES: "**Fettgedruckten** Text in L\xFCckentextkarten umwandeln?",
  CONVERT_CURLY_BRACKETS_TO_CLOZES: "{{Geschweifte Klammern}} Text in L\xFCckentextkarten umwandeln?",
  INLINE_CARDS_SEPARATOR: "Trennzeichen f\xFCr einzeilige Lernkarten",
  FIX_SEPARATORS_MANUALLY_WARNING: "Wenn diese Einstellung ge\xE4ndert wird, dann m\xFCssen die entsprechenden Lernkarten manuell angepasst werden.",
  INLINE_REVERSED_CARDS_SEPARATOR: "Trennzeichen f\xFCr einzeilige beidseitige Lernkarten",
  MULTILINE_CARDS_SEPARATOR: "Trennzeichen f\xFCr mehrzeilige Lernkarten",
  MULTILINE_REVERSED_CARDS_SEPARATOR: "Trennzeichen f\xFCr mehrzeilige beidseitige Lernkarten",
  NOTES: "Notizen",
  REVIEW_PANE_ON_STARTUP: "Enable note review pane on startup",
  TAGS_TO_REVIEW: "Zu wiederholende Tags",
  TAGS_TO_REVIEW_DESC: "Mehrere Tags k\xF6nnen mit Leerzeichen oder Zeilenumbr\xFCchen getrennt angegeben werden. Bsp. #karte #tag1 #tag2.",
  OPEN_RANDOM_NOTE: "Zuf\xE4llige Karten wiederholen",
  OPEN_RANDOM_NOTE_DESC: "Wenn dies deaktiviert wird, dann werden die Notizen nach Wichtigkeit wiederholt (PageRank).",
  AUTO_NEXT_NOTE: "Nach einer Wiederholung automatisch die n\xE4chste Karte \xF6ffnen",
  DISABLE_FILE_MENU_REVIEW_OPTIONS: "Optionen zur Wiederholung im Men\xFC einer Datei deaktivieren. Bsp. Wiederholen: Einfach Gut Schwer",
  DISABLE_FILE_MENU_REVIEW_OPTIONS_DESC: "Nach dem Deaktivieren k\xF6nnen die Tastenk\xFCrzel zur Wiederholung verwendet werden. Obsidian muss nach einer \xC4nderung neu geladen weren.",
  MAX_N_DAYS_REVIEW_QUEUE: "Maximale Anzahl anstehender Notizen, die im rechten Fensterbereich angezeigt werden",
  MIN_ONE_DAY: "Anzahl der Tage muss mindestens 1 sein.",
  VALID_NUMBER_WARNING: "Bitte eine g\xFCltige Zahl eingeben.",
  UI_PREFERENCES: "Einstellungen der Benutzeroberfl\xE4che",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE: "Deckb\xE4ume sollten anf\xE4nglich erweitert angezeigt werden",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE_DESC: "Deaktivieren Sie dies, um verschachtelte Decks in derselben Karte zu reduzieren. N\xFCtzlich, wenn Sie Karten haben, die zu vielen Decks in derselben Datei geh\xF6ren.",
  ALGORITHM: "Algorithmus",
  CHECK_ALGORITHM_WIKI: 'Weiterf\xFChrende Informationen: <a href="${algo_url}">Implementierung des Algorithmus</a> (english).',
  BASE_EASE: "Basis der Einfachheit",
  BASE_EASE_DESC: "Minimum ist 130. Empfohlen wird ca. 250.",
  BASE_EASE_MIN_WARNING: "Basis der Einfachheit muss mindestens 130 sein.",
  LAPSE_INTERVAL_CHANGE: "Anpassungsfaktor des Intervalls wenn eine Notiz / Karte 'Schwer' abgeschlossen wird",
  LAPSE_INTERVAL_CHANGE_DESC: "neuesIntervall = altesIntervall * anpassungsfaktor / 100.",
  EASY_BONUS: "Einfachheit-Bonus",
  EASY_BONUS_DESC: "Der Einfachheit-Bonus gibt an um welchen Faktor (in Prozent) das Intervall l\xE4nger sein soll, wenn eine Notiz / Karte 'Einfach' statt 'Gut' abgeschlossen wird. Minimum ist 100%.",
  EASY_BONUS_MIN_WARNING: "Der Einfachheit-Bonus muss mindestens 100 sein.",
  MAX_INTERVAL: "Maximum interval in days",
  MAX_INTERVAL_DESC: "Das maximale Intervall (in Tagen) f\xFCr Wiederholungen. Standard sind 100 Jahre.",
  MAX_INTERVAL_MIN_WARNING: "Das maximale Interall muss mindestens ein Tag sein.",
  MAX_LINK_CONTRIB: "Maximaler Einfluss von Links",
  MAX_LINK_CONTRIB_DESC: "Maximaler Einfluss der Einfachheiten verlinkter Notizen zur gewichteten initialen Einfachheit einer neuen Lernkarte.",
  LOGGING: "Logging",
  DISPLAY_DEBUG_INFO: "Informationen zum Debugging in der Entwicklerkonsole anzeigen?",
  // sidebar.ts
  NOTES_REVIEW_QUEUE: "Anstehende Notizen zur Wiederholung",
  CLOSE: "Schliessen",
  NEW: "Neu",
  YESTERDAY: "Gestern",
  TODAY: "Heute",
  TOMORROW: "Morgen",
  // stats-modal.tsx
  STATS_TITLE: "Statistiken",
  MONTH: "Month",
  QUARTER: "Quarter",
  YEAR: "Year",
  LIFETIME: "Lifetime",
  FORECAST: "Prognose",
  FORECAST_DESC: "Anzahl der k\xFCnftig anstehenden Karten",
  SCHEDULED: "Anstehend",
  DAYS: "Tage",
  NUMBER_OF_CARDS: "Anzahl der Karten",
  REVIEWS_PER_DAY: "Durchschnitt: ${avg} Wiederholungen/Tag",
  INTERVALS: "Intervalle",
  INTERVALS_DESC: "Intervalle bis Wiederholungen anstehen",
  COUNT: "Anzahl",
  INTERVALS_SUMMARY: "Durchschnittliches Intervall: ${avg}, L\xE4ngstes Intervall: ${longest}",
  EASES: "Einfachheit",
  EASES_SUMMARY: "Durchschnittliche Einfachheit: ${avgEase}",
  CARD_TYPES: "Kategorisierung",
  CARD_TYPES_DESC: "Verlegte Karten eingeschlossen",
  CARD_TYPE_NEW: "Neu",
  CARD_TYPE_YOUNG: "Jung",
  CARD_TYPE_MATURE: "Ausgereift",
  CARD_TYPES_SUMMARY: "Insgesamt ${totalCardsCount} Karten"
};

// src/lang/locale/en.ts
var en_default = {
  // flashcard-modal.tsx
  DECKS: "Decks",
  DUE_CARDS: "Due Cards",
  NEW_CARDS: "New Cards",
  TOTAL_CARDS: "Total Cards",
  BACK: "Back",
  SKIP: "Skip",
  EDIT_CARD: "Edit Card",
  RESET_CARD_PROGRESS: "Reset card's progress",
  HARD: "Hard",
  GOOD: "Good",
  EASY: "Easy",
  SHOW_ANSWER: "Show Answer",
  CARD_PROGRESS_RESET: "Card's progress has been reset.",
  SAVE: "Save",
  CANCEL: "Cancel",
  NO_INPUT: "No input provided.",
  CURRENT_EASE_HELP_TEXT: "Current Ease: ",
  CURRENT_INTERVAL_HELP_TEXT: "Current Interval: ",
  CARD_GENERATED_FROM: "Generated from: ${notePath}",
  // main.ts
  OPEN_NOTE_FOR_REVIEW: "Open a note for review",
  REVIEW_CARDS: "Review flashcards",
  REVIEW_EASY_FILE_MENU: "Review: Easy",
  REVIEW_GOOD_FILE_MENU: "Review: Good",
  REVIEW_HARD_FILE_MENU: "Review: Hard",
  REVIEW_NOTE_EASY_CMD: "Review note as easy",
  REVIEW_NOTE_GOOD_CMD: "Review note as good",
  REVIEW_NOTE_HARD_CMD: "Review note as hard",
  CRAM_ALL_CARDS: "Select a deck to cram",
  REVIEW_ALL_CARDS: "Review flashcards from all notes",
  REVIEW_CARDS_IN_NOTE: "Review flashcards in this note",
  CRAM_CARDS_IN_NOTE: "Cram flashcards in this note",
  VIEW_STATS: "View statistics",
  STATUS_BAR: "Review: ${dueNotesCount} note(s), ${dueFlashcardsCount} card(s) due",
  SYNC_TIME_TAKEN: "Sync took ${t}ms",
  NOTE_IN_IGNORED_FOLDER: "Note is saved under ignored folder (check settings).",
  PLEASE_TAG_NOTE: "Please tag the note appropriately for reviewing (in settings).",
  RESPONSE_RECEIVED: "Response received.",
  NO_DECK_EXISTS: "No deck exists for ${deckName}",
  ALL_CAUGHT_UP: "You're all caught up now :D.",
  // scheduling.ts
  DAYS_STR_IVL: "${interval} day(s)",
  MONTHS_STR_IVL: "${interval} month(s)",
  YEARS_STR_IVL: "${interval} year(s)",
  DAYS_STR_IVL_MOBILE: "${interval}d",
  MONTHS_STR_IVL_MOBILE: "${interval}m",
  YEARS_STR_IVL_MOBILE: "${interval}y",
  // settings.ts
  SETTINGS_HEADER: "Spaced Repetition Plugin - Settings",
  CHECK_WIKI: 'For more information, check the <a href="${wiki_url}">wiki</a>.',
  FOLDERS_TO_IGNORE: "Folders to ignore",
  FOLDERS_TO_IGNORE_DESC: "Enter folder paths separated by newlines i.e. Templates Meta/Scripts",
  FLASHCARDS: "Flashcards",
  FLASHCARD_EASY_LABEL: "Easy Button Text",
  FLASHCARD_GOOD_LABEL: "Good Button Text",
  FLASHCARD_HARD_LABEL: "Hard Button Text",
  FLASHCARD_EASY_DESC: 'Customize the label for the "Easy" Button',
  FLASHCARD_GOOD_DESC: 'Customize the label for the "Good" Button',
  FLASHCARD_HARD_DESC: 'Customize the label for the "Hard" Button',
  FLASHCARD_TAGS: "Flashcard tags",
  FLASHCARD_TAGS_DESC: "Enter tags separated by spaces or newlines i.e. #flashcards #deck2 #deck3.",
  CONVERT_FOLDERS_TO_DECKS: "Convert folders to decks and subdecks?",
  CONVERT_FOLDERS_TO_DECKS_DESC: "This is an alternative to the Flashcard tags option above.",
  INLINE_SCHEDULING_COMMENTS: "Save scheduling comment on the same line as the flashcard's last line?",
  INLINE_SCHEDULING_COMMENTS_DESC: "Turning this on will make the HTML comments not break list formatting.",
  BURY_SIBLINGS_TILL_NEXT_DAY: "Bury sibling cards until the next day?",
  BURY_SIBLINGS_TILL_NEXT_DAY_DESC: "Siblings are cards generated from the same card text i.e. cloze deletions",
  SHOW_CARD_CONTEXT: "Show context in cards?",
  SHOW_CARD_CONTEXT_DESC: "i.e. Title > Heading 1 > Subheading > ... > Subheading",
  CARD_MODAL_HEIGHT_PERCENT: "Flashcard Height Percentage",
  CARD_MODAL_SIZE_PERCENT_DESC: "Should be set to 100% on mobile or if you have very large images",
  RESET_DEFAULT: "Reset to default",
  CARD_MODAL_WIDTH_PERCENT: "Flashcard Width Percentage",
  RANDOMIZE_CARD_ORDER: "Randomize card order during review?",
  REVIEW_CARD_ORDER_WITHIN_DECK: "Order cards in a deck are displayed during review",
  REVIEW_CARD_ORDER_NEW_FIRST_SEQUENTIAL: "Sequentially within a deck (All new cards first)",
  REVIEW_CARD_ORDER_DUE_FIRST_SEQUENTIAL: "Sequentially within a deck (All due cards first)",
  REVIEW_CARD_ORDER_NEW_FIRST_RANDOM: "Randomly within a deck (All new cards first)",
  REVIEW_CARD_ORDER_DUE_FIRST_RANDOM: "Randomly within a deck (All due cards first)",
  REVIEW_CARD_ORDER_RANDOM_DECK_AND_CARD: "Random card from random deck",
  REVIEW_DECK_ORDER: "Order decks are displayed during review",
  REVIEW_DECK_ORDER_PREV_DECK_COMPLETE_SEQUENTIAL: "Sequentially (once all cards in previous deck reviewed)",
  REVIEW_DECK_ORDER_PREV_DECK_COMPLETE_RANDOM: "Randomly (once all cards in previous deck reviewed)",
  REVIEW_DECK_ORDER_RANDOM_DECK_AND_CARD: "Random card from random deck",
  DISABLE_CLOZE_CARDS: "Disable cloze cards?",
  CONVERT_HIGHLIGHTS_TO_CLOZES: "Convert ==hightlights== to clozes?",
  CONVERT_BOLD_TEXT_TO_CLOZES: "Convert **bolded text** to clozes?",
  CONVERT_CURLY_BRACKETS_TO_CLOZES: "Convert {{curly brackets}} to clozes?",
  INLINE_CARDS_SEPARATOR: "Separator for inline flashcards",
  FIX_SEPARATORS_MANUALLY_WARNING: "Note that after changing this you have to manually edit any flashcards you already have.",
  INLINE_REVERSED_CARDS_SEPARATOR: "Separator for inline reversed flashcards",
  MULTILINE_CARDS_SEPARATOR: "Separator for multiline flashcards",
  MULTILINE_REVERSED_CARDS_SEPARATOR: "Separator for multiline reversed flashcards",
  NOTES: "Notes",
  REVIEW_PANE_ON_STARTUP: "Enable note review pane on startup",
  TAGS_TO_REVIEW: "Tags to review",
  TAGS_TO_REVIEW_DESC: "Enter tags separated by spaces or newlines i.e. #review #tag2 #tag3.",
  OPEN_RANDOM_NOTE: "Open a random note for review",
  OPEN_RANDOM_NOTE_DESC: "When you turn this off, notes are ordered by importance (PageRank).",
  AUTO_NEXT_NOTE: "Open next note automatically after a review",
  DISABLE_FILE_MENU_REVIEW_OPTIONS: "Disable review options in the file menu i.e. Review: Easy Good Hard",
  DISABLE_FILE_MENU_REVIEW_OPTIONS_DESC: "After disabling, you can review using the command hotkeys. Reload Obsidian after changing this.",
  MAX_N_DAYS_REVIEW_QUEUE: "Maximum number of days to display on right panel",
  MIN_ONE_DAY: "The number of days must be at least 1.",
  VALID_NUMBER_WARNING: "Please provide a valid number.",
  UI_PREFERENCES: "UI Preferences",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE: "Deck trees should be initially displayed as expanded",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE_DESC: "Turn this off to collapse nested decks in the same card. Useful if you have cards which belong to many decks in the same file.",
  ALGORITHM: "Algorithm",
  CHECK_ALGORITHM_WIKI: 'For more information, check the <a href="${algo_url}">algorithm implementation</a>.',
  BASE_EASE: "Base ease",
  BASE_EASE_DESC: "minimum = 130, preferrably approximately 250.",
  BASE_EASE_MIN_WARNING: "The base ease must be at least 130.",
  LAPSE_INTERVAL_CHANGE: "Interval change when you review a flashcard/note as hard",
  LAPSE_INTERVAL_CHANGE_DESC: "newInterval = oldInterval * intervalChange / 100.",
  EASY_BONUS: "Easy Bonus",
  EASY_BONUS_DESC: "The easy bonus allows you to set the difference in intervals between answering Good and Easy on a flashcard/note (minimum = 100%).",
  EASY_BONUS_MIN_WARNING: "The easy bonus must be at least 100.",
  MAX_INTERVAL: "Maximum interval in days",
  MAX_INTERVAL_DESC: "Allows you to place an upper limit on the interval (default = 100 years).",
  MAX_INTERVAL_MIN_WARNING: "The maximum interval must be at least 1 day.",
  MAX_LINK_CONTRIB: "Maximum link contribution",
  MAX_LINK_CONTRIB_DESC: "Maximum contribution of the weighted ease of linked notes to the initial ease.",
  LOGGING: "Logging",
  DISPLAY_DEBUG_INFO: "Display debugging information on the developer console?",
  // sidebar.ts
  NOTES_REVIEW_QUEUE: "Notes Review Queue",
  CLOSE: "Close",
  NEW: "New",
  YESTERDAY: "Yesterday",
  TODAY: "Today",
  TOMORROW: "Tomorrow",
  // stats-modal.tsx
  STATS_TITLE: "Statistics",
  MONTH: "Month",
  QUARTER: "Quarter",
  YEAR: "Year",
  LIFETIME: "Lifetime",
  FORECAST: "Forecast",
  FORECAST_DESC: "The number of cards due in the future",
  SCHEDULED: "Scheduled",
  DAYS: "Days",
  NUMBER_OF_CARDS: "Number of cards",
  REVIEWS_PER_DAY: "Average: ${avg} reviews/day",
  INTERVALS: "Intervals",
  INTERVALS_DESC: "Delays until reviews are shown again",
  COUNT: "Count",
  INTERVALS_SUMMARY: "Average interval: ${avg}, Longest interval: ${longest}",
  EASES: "Eases",
  EASES_SUMMARY: "Average ease: ${avgEase}",
  CARD_TYPES: "Card Types",
  CARD_TYPES_DESC: "This includes buried cards as well, if any",
  CARD_TYPE_NEW: "New",
  CARD_TYPE_YOUNG: "Young",
  CARD_TYPE_MATURE: "Mature",
  CARD_TYPES_SUMMARY: "Total cards: ${totalCardsCount}"
};

// src/lang/locale/en-gb.ts
var en_gb_default = {};

// src/lang/locale/es.ts
var es_default = {
  // flashcard-modal.tsx
  DECKS: "Mazos",
  DUE_CARDS: "Tarjetas Vencidas",
  NEW_CARDS: "Tarjetas Nuevas",
  TOTAL_CARDS: "Tarjetas Totales",
  BACK: "Atr\xE1s",
  SKIP: "Saltar",
  EDIT_CARD: "Editar Tarjeta",
  RESET_CARD_PROGRESS: "Reiniciar progreso de la tarjeta",
  HARD: "Dif\xEDcil",
  GOOD: "Bien",
  EASY: "F\xE1cil",
  SHOW_ANSWER: "Mostrar Respuesta",
  CARD_PROGRESS_RESET: "El progreso de la tarjeta se ha reiniciado.",
  SAVE: "Guardar",
  CANCEL: "Cancelar",
  NO_INPUT: "Se ha prove\xEDdo entrada.",
  CURRENT_EASE_HELP_TEXT: "Facilidad Actual: ",
  CURRENT_INTERVAL_HELP_TEXT: "Intervalo Actual: ",
  CARD_GENERATED_FROM: "Generado Desde: ${notePath}",
  // main.ts
  OPEN_NOTE_FOR_REVIEW: "Abrir nota para revisi\xF3n",
  REVIEW_CARDS: "Revisar Tarjetas",
  REVIEW_EASY_FILE_MENU: "Revisar: F\xE1cil",
  REVIEW_GOOD_FILE_MENU: "Revisar: Bien",
  REVIEW_HARD_FILE_MENU: "Revisar: Dif\xEDcil",
  REVIEW_NOTE_EASY_CMD: "Revisar nota como f\xE1cil",
  REVIEW_NOTE_GOOD_CMD: "Revisar nota como bien",
  REVIEW_NOTE_HARD_CMD: "Revisar nota como dif\xEDcil",
  CRAM_ALL_CARDS: "Selecciona un mazo a memorizar",
  REVIEW_ALL_CARDS: "Revisar tarjetas de todas las notas",
  REVIEW_CARDS_IN_NOTE: "Revisar tarjetas en esta nota",
  CRAM_CARDS_IN_NOTE: "Memorizar tarjetas en esta nota",
  VIEW_STATS: "Ver estad\xEDsticas",
  STATUS_BAR: "Revisar: ${dueNotesCount} nota(s), ${dueFlashcardsCount} tarjetas vencidas",
  SYNC_TIME_TAKEN: "La sincronizaci\xF3n tom\xF3 ${t} milisegundos",
  NOTE_IN_IGNORED_FOLDER: "La nota est\xE1 guardada en un directorio ignorado (revisa los ajustes).",
  PLEASE_TAG_NOTE: "Por favor etiquete apropiadamente la nota para revisi\xF3n (en los ajustes).",
  RESPONSE_RECEIVED: "Respuesta Recibida",
  NO_DECK_EXISTS: "No existen mazos para: ${deckName}",
  ALL_CAUGHT_UP: "\xA1Est\xE1s al d\xEDa! \u{1F603}",
  // scheduling.ts
  DAYS_STR_IVL: "${interval} d\xEDa(s)",
  MONTHS_STR_IVL: "${interval} mes(es)",
  YEARS_STR_IVL: "${interval} a\xF1o(s)",
  DAYS_STR_IVL_MOBILE: "${interval}d",
  MONTHS_STR_IVL_MOBILE: "${interval}m",
  YEARS_STR_IVL_MOBILE: "${interval}a",
  // settings.ts
  SETTINGS_HEADER: "Extensi\xF3n de Repetici\xF3n Espaciada - Ajustes",
  CHECK_WIKI: 'Para m\xE1s informaci\xF3n revisa la <a href="${wiki_url}">wiki</a>.',
  FOLDERS_TO_IGNORE: "Directorios a ignorar",
  FOLDERS_TO_IGNORE_DESC: "Escriba las rutas de los directorios separadas por saltos de l\xEDnea, por ejemplo, Plantillas Extra/Guiones",
  FLASHCARDS: "Tarjetas de Memorizaci\xF3n",
  FLASHCARD_EASY_LABEL: "Texto del bot\xF3n: F\xE1cil",
  FLASHCARD_GOOD_LABEL: "Texto del bot\xF3n: Bien",
  FLASHCARD_HARD_LABEL: "Texto del bot\xF3n: Dif\xEDcil",
  FLASHCARD_EASY_DESC: "Personalize la etiqueta para el bot\xF3n: F\xE1cil",
  FLASHCARD_GOOD_DESC: "Personalize la etiqueta para el bot\xF3n: Bien",
  FLASHCARD_HARD_DESC: "Personalize la etiqueta para el bot\xF3n: Dif\xEDcil",
  FLASHCARD_TAGS: "Etiquetas de las Tarjetas de Memorizaci\xF3n",
  FLASHCARD_TAGS_DESC: "Escriba las etiquetas separadas por espacios o saltos de l\xEDnea, por ejemplo, #memorizar #mazo2 #mazo3",
  CONVERT_FOLDERS_TO_DECKS: "\xBFConvertir directorios a mazos y submazos?",
  CONVERT_FOLDERS_TO_DECKS_DESC: "Esta es una opci\xF3n alternativa a las etiquetas de las Tarjetas de Memorizaci\xF3n.",
  INLINE_SCHEDULING_COMMENTS: "\xBFGuardar el comentario para programaci\xF3n de las tarjetas en la \xFAltima l\xEDnea?",
  INLINE_SCHEDULING_COMMENTS_DESC: "Activar esto har\xE1 que los comentarios HTML no rompan el formato de las listas.",
  BURY_SIBLINGS_TILL_NEXT_DAY: "\xBFEnterrar tarjetas hermanas hasta el siguiente d\xEDa?",
  BURY_SIBLINGS_TILL_NEXT_DAY_DESC: "Los hermanos son tarjetas generadas del mismo texto de la tarjeta, por ejemplo, deletreos de huecos (cloze deletions en ingl\xE9s)",
  SHOW_CARD_CONTEXT: "\xBFMostrar contexto en las tarjetas?",
  SHOW_CARD_CONTEXT_DESC: "Por Ejemplo: T\xEDtulo > Cabecera > Sub-Cabecera > ... > Sub-Cabecera",
  CARD_MODAL_HEIGHT_PERCENT: "Porcentaje de la altura de las tarjetas de memoria",
  CARD_MODAL_SIZE_PERCENT_DESC: "Deber\xEDa ser establecido en 100% si tienes im\xE1genes grandes",
  RESET_DEFAULT: "Reiniciar a la configuraci\xF3n por defecto",
  CARD_MODAL_WIDTH_PERCENT: "Porcentaje del ancho de las tarjetas de memoria",
  RANDOMIZE_CARD_ORDER: "\xBFAleatorizar el orden de las tarjetas para revisi\xF3n?",
  REVIEW_CARD_ORDER_WITHIN_DECK: "Order cards in a deck are displayed during review",
  REVIEW_CARD_ORDER_NEW_FIRST_SEQUENTIAL: "Sequentially within a deck (All new cards first)",
  REVIEW_CARD_ORDER_DUE_FIRST_SEQUENTIAL: "Sequentially within a deck (All due cards first)",
  REVIEW_CARD_ORDER_NEW_FIRST_RANDOM: "Randomly within a deck (All new cards first)",
  REVIEW_CARD_ORDER_DUE_FIRST_RANDOM: "Randomly within a deck (All due cards first)",
  REVIEW_CARD_ORDER_RANDOM_DECK_AND_CARD: "Random card from random deck",
  REVIEW_DECK_ORDER: "Order decks are displayed during review",
  REVIEW_DECK_ORDER_PREV_DECK_COMPLETE_SEQUENTIAL: "Sequentially (once all cards in previous deck reviewed)",
  REVIEW_DECK_ORDER_PREV_DECK_COMPLETE_RANDOM: "Randomly (once all cards in previous deck reviewed)",
  REVIEW_DECK_ORDER_RANDOM_DECK_AND_CARD: "Random card from random deck",
  DISABLE_CLOZE_CARDS: "\xBFDeshabilitar deletreo de huecos en las tarjetas?",
  CONVERT_HIGHLIGHTS_TO_CLOZES: "\xBFConvertir ==resaltados== a deletreo de huecos?",
  CONVERT_BOLD_TEXT_TO_CLOZES: "\xBFConvertir **texto en negrita** a deletreo de huecos?",
  CONVERT_CURLY_BRACKETS_TO_CLOZES: "\xBFConvertir {{llaves rizadas}} a deletreo de huecos?",
  INLINE_CARDS_SEPARATOR: "Separador de tarjetas de memorizaci\xF3n en l\xEDnea",
  FIX_SEPARATORS_MANUALLY_WARNING: "Note que despu\xE9s de cambiar este ajuste, tendr\xE1 que cambiar manualmente todas las notas que tenga.",
  INLINE_REVERSED_CARDS_SEPARATOR: "Separador de tarjetas de memorizaci\xF3n para tarjetas de notas invertidas",
  MULTILINE_CARDS_SEPARATOR: "Separador para tarjetas de memorizaci\xF3n multil\xEDnea",
  MULTILINE_REVERSED_CARDS_SEPARATOR: "Separador para tarjetas de memorizaci\xF3n multil\xEDnea invertidas",
  NOTES: "Notes",
  REVIEW_PANE_ON_STARTUP: "Activar panel de revisi\xF3n de notas al arrancar",
  TAGS_TO_REVIEW: "Etiquetas a revisar",
  TAGS_TO_REVIEW_DESC: "Escriba las etiquetas separadas por espacios o saltos de l\xEDneas, por ejemplo, #revisi\xF3n #etiqueta2 #etiqueta3.",
  OPEN_RANDOM_NOTE: "Abrir una nota al azar para revisar",
  OPEN_RANDOM_NOTE_DESC: "Cuando deshabilita esto, las notas son ordenadas por importancia (Algoritmo PageRank).",
  AUTO_NEXT_NOTE: "Abrir la siguiente nota autom\xE1ticamente despu\xE9s de una revisi\xF3n",
  DISABLE_FILE_MENU_REVIEW_OPTIONS: "Deshabilitar opciones de revisi\xF3n en el men\xFA de archivo, por ejemplo, Revisi\xF3n: F\xE1cil Bien Dif\xEDcil",
  DISABLE_FILE_MENU_REVIEW_OPTIONS_DESC: "Despu\xE9s de deshabilitarlo, puede hacer las revisiones utilizando atajos de teclado. Reinicie Obsidian despu\xE9s de cambiar esto.",
  MAX_N_DAYS_REVIEW_QUEUE: "N\xFAmero m\xE1ximo de d\xEDas a mostrar en el panel derecho.",
  MIN_ONE_DAY: "El n\xFAmero de d\xEDas debe ser al menos uno.",
  VALID_NUMBER_WARNING: "Por favor especifique un n\xFAmero v\xE1lido.",
  UI_PREFERENCES: "Preferencias de la interfaz de usuario.",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE: "Los \xE1rboles de mazos deber\xEDan ser expandidos al inicio.",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE_DESC: "Desactiva esto para contraer mazos anidados en la misma tarjeta. \xDAtil si tienes tarjetas que pertenecen a muchos mazos en el mismo archivo.",
  ALGORITHM: "Algoritmo",
  CHECK_ALGORITHM_WIKI: 'Para m\xE1s informaci\xF3n, revisa la <a href="${algo_url}">implementaci\xF3n del algoritmo</a>.',
  BASE_EASE: "Base ease",
  BASE_EASE_DESC: "El m\xEDnimo es 130, es preferible que est\xE9 aproximado a 250.",
  BASE_EASE_MIN_WARNING: "La facilidad base de las tarjetas debe ser al menos 130.",
  LAPSE_INTERVAL_CHANGE: "El intervalo cambiar\xE1 cuando se revise una tarjeta o nota como Dif\xEDcil.",
  LAPSE_INTERVAL_CHANGE_DESC: "NuevoInterval = ViejoIntervalo * CambioDeIntervalo / 100.",
  EASY_BONUS: "Bonificaci\xF3n para F\xE1cil",
  EASY_BONUS_DESC: "La bonificaci\xF3n para F\xE1cil te permite establecer la diferencia entre intervalos al responder Bien y F\xE1cil en las tarjetas o notas (m\xEDnimo = 100%).",
  EASY_BONUS_MIN_WARNING: "El bono de facilidad debe ser al menos 100.",
  MAX_INTERVAL: "Intervalo m\xE1ximo en d\xEDas",
  MAX_INTERVAL_DESC: "Te permite establecer un l\xEDmite mayor en el intervalo (por defecto es de 100 a\xF1os).",
  MAX_INTERVAL_MIN_WARNING: "El intervalo m\xE1ximo debe ser de al menos un d\xEDa.",
  MAX_LINK_CONTRIB: "Contribuci\xF3n m\xE1xima de las notas vinculadas.",
  MAX_LINK_CONTRIB_DESC: "Contribuci\xF3n m\xE1xima de la facilidad ponderada de las notas vinculadas a la facilidad inicial.",
  LOGGING: "Registro",
  DISPLAY_DEBUG_INFO: "\xBFMostrar informaci\xF3n de depuraci\xF3n en la consola de desarrollador?",
  // sidebar.ts
  NOTES_REVIEW_QUEUE: "Cola de notas a revisar",
  CLOSE: "Cerrar",
  NEW: "Nuevo",
  YESTERDAY: "Ayer",
  TODAY: "Hoy",
  TOMORROW: "Ma\xF1ana",
  // stats-modal.tsx
  STATS_TITLE: "Estad\xEDsticas",
  MONTH: "Mes",
  QUARTER: "Trimestre o Cuatrimestre",
  // En Inglés: Quarter.
  YEAR: "A\xF1o",
  LIFETIME: "Tiempo de Vida",
  FORECAST: "Pron\xF3stico",
  FORECAST_DESC: "El n\xFAmero de tarjetas vencidas en el futuro",
  SCHEDULED: "Programado",
  DAYS: "D\xEDas",
  NUMBER_OF_CARDS: "N\xFAmero de tarjetas",
  REVIEWS_PER_DAY: "Carga: ${avg} Revisiones por d\xEDa",
  INTERVALS: "Intervalos",
  INTERVALS_DESC: "Retrasos hasta que las revisiones se muestren de nuevo",
  COUNT: "Conteo",
  INTERVALS_SUMMARY: "Intervalo de carga: ${avg}, Intervalo mayor: ${longest}",
  EASES: "Facilidad",
  EASES_SUMMARY: "Carga de Facilidad: ${avgEase}",
  CARD_TYPES: "Tipos de tarjetas",
  CARD_TYPES_DESC: "Esto incluye tambi\xE9n a las tarjetas enterradas, si las hay",
  CARD_TYPE_NEW: "Nueva",
  CARD_TYPE_YOUNG: "Joven",
  CARD_TYPE_MATURE: "Madura",
  CARD_TYPES_SUMMARY: "Tarjetas Totales: ${totalCardsCount}"
};

// src/lang/locale/fr.ts
var fr_default = {};

// src/lang/locale/hi.ts
var hi_default = {};

// src/lang/locale/id.ts
var id_default = {};

// src/lang/locale/it.ts
var it_default = {};

// src/lang/locale/ja.ts
var ja_default = {
  // flashcard-modal.tsx
  DECKS: "\u30C7\u30C3\u30AD",
  DUE_CARDS: "\u671F\u65E5\u306E\u30AB\u30FC\u30C9",
  NEW_CARDS: "\u65B0\u898F\u306E\u30AB\u30FC\u30C9",
  TOTAL_CARDS: "\u30AB\u30FC\u30C9\u5408\u8A08",
  BACK: "Back",
  SKIP: "Skip",
  EDIT_CARD: "Edit Card",
  RESET_CARD_PROGRESS: "\u30AB\u30FC\u30C9\u306E\u9032\u6357\u3092\u30EA\u30BB\u30C3\u30C8",
  HARD: "Hard",
  GOOD: "Good",
  EASY: "Easy",
  SHOW_ANSWER: "\u89E3\u7B54\u3092\u8868\u793A",
  CARD_PROGRESS_RESET: "\u30AB\u30FC\u30C9\u306E\u9032\u6357\u304C\u30EA\u30BB\u30C3\u30C8\u3055\u308C\u307E\u3057\u305F\u3002",
  SAVE: "Save",
  CANCEL: "Cancel",
  NO_INPUT: "No input provided.",
  CURRENT_EASE_HELP_TEXT: "Current Ease: ",
  CURRENT_INTERVAL_HELP_TEXT: "Current Interval: ",
  CARD_GENERATED_FROM: "Generated from: ${notePath}",
  // main.ts
  OPEN_NOTE_FOR_REVIEW: "\u30EC\u30D3\u30E5\u30FC\u3059\u308B\u30CE\u30FC\u30C8\u3092\u958B\u304F",
  REVIEW_CARDS: "\u30D5\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9\u306E\u30EC\u30D3\u30E5\u30FC",
  REVIEW_EASY_FILE_MENU: "\u30EC\u30D3\u30E5\u30FC: Easy",
  REVIEW_GOOD_FILE_MENU: "\u30EC\u30D3\u30E5\u30FC: Good",
  REVIEW_HARD_FILE_MENU: "\u30EC\u30D3\u30E5\u30FC: Hard",
  REVIEW_NOTE_EASY_CMD: "\u30CE\u30FC\u30C8\u3092Easy\u3068\u3057\u3066\u30EC\u30D3\u30E5\u30FC\u3059\u308B",
  REVIEW_NOTE_GOOD_CMD: "\u30CE\u30FC\u30C8\u3092Good\u3068\u3057\u3066\u30EC\u30D3\u30E5\u30FC\u3059\u308B",
  REVIEW_NOTE_HARD_CMD: "\u30CE\u30FC\u30C8\u3092Hard\u3068\u3057\u3066\u30EC\u30D3\u30E5\u30FC\u3059\u308B",
  REVIEW_ALL_CARDS: "\u3059\u3079\u3066\u306E\u30CE\u30FC\u30C8\u304B\u3089\u30D5\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9\u3092\u30EC\u30D3\u30E5\u30FC\u3059\u308B",
  CRAM_ALL_CARDS: "Select a deck to cram",
  REVIEW_CARDS_IN_NOTE: "\u3053\u306E\u30CE\u30FC\u30C8\u306E\u30D5\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9\u3092\u30EC\u30D3\u30E5\u30FC\u3059\u308B",
  CRAM_CARDS_IN_NOTE: "\u3053\u306E\u30CE\u30FC\u30C8\u306E\u30D5\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9\u3092\u8A70\u3081\u8FBC\u307F\u5B66\u7FD2\u3059\u308B",
  VIEW_STATS: "\u7D71\u8A08\u3092\u95B2\u89A7\u3059\u308B",
  STATUS_BAR: "\u30EC\u30D3\u30E5\u30FC: ${dueNotesCount}\u30CE\u30FC\u30C8, ${dueFlashcardsCount}\u30AB\u30FC\u30C9\u304C\u671F\u65E5",
  SYNC_TIME_TAKEN: "\u540C\u671F\u306B${t}ms\u304B\u304B\u308A\u307E\u3057\u305F\u3002",
  NOTE_IN_IGNORED_FOLDER: "\u30CE\u30FC\u30C8\u304C\u7121\u8996\u3059\u308B\u30D5\u30A9\u30EB\u30C0\u306B\u4FDD\u5B58\u3055\u308C\u3066\u3044\u307E\u3059(\u8A2D\u5B9A\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044)\u3002",
  PLEASE_TAG_NOTE: "\u30EC\u30D3\u30E5\u30FC\u3092\u884C\u3046\u306B\u306F\u30CE\u30FC\u30C8\u306B\u5BFE\u3057\u3066\u6B63\u3057\u304F\u30BF\u30B0\u4ED8\u3051\u3057\u3066\u304F\u3060\u3055\u3044(\u8A2D\u5B9A\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044)\u3002",
  RESPONSE_RECEIVED: "\u7B54\u3048\u3092\u53D7\u3051\u53D6\u308A\u307E\u3057\u305F\u3002",
  NO_DECK_EXISTS: "${deckName}\u306B\u306F\u30C7\u30C3\u30AD\u304C\u5B58\u5728\u3057\u307E\u305B\u3093\u3002",
  ALL_CAUGHT_UP: "\u4ECA\u65E5\u306E\u8AB2\u984C\u3092\u3059\u3079\u3066\u9054\u6210\u3057\u307E\u3057\u305F :D",
  // scheduling.ts
  DAYS_STR_IVL: "${interval}\u65E5\u5F8C",
  MONTHS_STR_IVL: "${interval}\u6708\u5F8C",
  YEARS_STR_IVL: "${interval}\u5E74\u5F8C",
  DAYS_STR_IVL_MOBILE: "${interval}d",
  MONTHS_STR_IVL_MOBILE: "${interval}m",
  YEARS_STR_IVL_MOBILE: "${interval}y",
  // settings.ts
  SETTINGS_HEADER: "Spaced Repetition Plugin - \u8A2D\u5B9A",
  CHECK_WIKI: '\u8A73\u7D30\u306B\u3064\u3044\u3066\u306F<a href="${wiki_url}">wiki</a>\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002',
  FOLDERS_TO_IGNORE: "\u7121\u8996\u3059\u308B\u30D5\u30A9\u30EB\u30C0",
  FOLDERS_TO_IGNORE_DESC: '\u30D5\u30A9\u30EB\u30C0\u30D1\u30B9\u3092\u6539\u884C\u3067\u533A\u5207\u3063\u3066\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002"Templates Meta/Scripts" \u306E\u3088\u3046\u306A\u30B9\u30DA\u30FC\u30B9\u306B\u3088\u308B\u533A\u5207\u308A\u3067\u306E\u66F8\u304D\u65B9\u306F\u7121\u52B9\u3067\u3059\u3002',
  FLASHCARDS: "\u30D5\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9",
  FLASHCARD_EASY_LABEL: "Easy Button Text",
  FLASHCARD_GOOD_LABEL: "Good Button Text",
  FLASHCARD_HARD_LABEL: "Hard Button Text",
  FLASHCARD_EASY_DESC: 'Customize the label for the "Easy" Button',
  FLASHCARD_GOOD_DESC: 'Customize the label for the "Good" Button',
  FLASHCARD_HARD_DESC: 'Customize the label for the "Hard" Button',
  FLASHCARD_TAGS: "\u30D5\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9\u306B\u4F7F\u7528\u3059\u308B\u30BF\u30B0",
  FLASHCARD_TAGS_DESC: '\u30BF\u30B0\u3092\u30B9\u30DA\u30FC\u30B9\u307E\u305F\u306F\u6539\u884C\u3067\u533A\u5207\u3063\u3066\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002\u4F8B: "#flashcards #deck2 #deck3"',
  CONVERT_FOLDERS_TO_DECKS: "\u30D5\u30A9\u30EB\u30C0\u3092\u30C7\u30C3\u30AD\u3068\u30B5\u30D6\u30C7\u30C3\u30AD\u3068\u3057\u3066\u4F7F\u7528\u3057\u307E\u3059\u304B\uFF1F",
  CONVERT_FOLDERS_TO_DECKS_DESC: "\u3053\u308C\u306F\u4E0A\u8A18\u306E\u30BF\u30B0\u3092\u4F7F\u7528\u3057\u305F\u30C7\u30C3\u30AD\u69CB\u7BC9\u306E\u4EE3\u66FF\u3068\u306A\u308B\u30AA\u30D7\u30B7\u30E7\u30F3\u3067\u3059\u3002",
  INLINE_SCHEDULING_COMMENTS: "\u30D5\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9\u306E\u6700\u7D42\u884C\u3068\u540C\u4E00\u306E\u884C\u306B\u30B9\u30B1\u30B8\u30E5\u30FC\u30EA\u30F3\u30B0\u30B3\u30E1\u30F3\u30C8\u3092\u4FDD\u5B58\u3057\u307E\u3059\u304B\uFF1F",
  INLINE_SCHEDULING_COMMENTS_DESC: "\u3053\u306E\u30AA\u30D7\u30B7\u30E7\u30F3\u3092\u6709\u52B9\u5316\u3059\u308B\u3068\u3001HTML\u30B3\u30E1\u30F3\u30C8\u306B\u3088\u3063\u3066Markdown\u306E\u30EA\u30B9\u30C8\u30D5\u30A9\u30FC\u30DE\u30C3\u30C8\u304C\u5D29\u308C\u306A\u304F\u306A\u308A\u307E\u3059\u3002",
  BURY_SIBLINGS_TILL_NEXT_DAY: "\u6B21\u306E\u30EC\u30D3\u30E5\u30FC\u307E\u3067\u30B7\u30D6\u30EA\u30F3\u30B0\u3092\u5EF6\u671F\u3057\u307E\u3059\u304B\uFF1F",
  BURY_SIBLINGS_TILL_NEXT_DAY_DESC: "\u30B7\u30D6\u30EA\u30F3\u30B0\u306F\u540C\u4E00\u306E\u30AB\u30FC\u30C9\u30C6\u30AD\u30B9\u30C8\u304B\u3089\u751F\u6210\u3055\u308C\u305F\u30AB\u30FC\u30C9\u3001\u3064\u307E\u308A\u7A74\u57CB\u3081\u554F\u984C\u306E\u6D3E\u751F\u30AB\u30FC\u30C9\u3067\u3059\u3002",
  SHOW_CARD_CONTEXT: "\u30AB\u30FC\u30C9\u306B\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8\u3092\u8868\u793A\u3057\u307E\u3059\u304B\uFF1F",
  SHOW_CARD_CONTEXT_DESC: "\uFF62\u30BF\u30A4\u30C8\u30EB > \u898B\u51FA\u3057 1 > \u526F\u898B\u51FA\u3057 > ... > \u526F\u898B\u51FA\u3057\uFF63\u306E\u8868\u793A\u3092\u884C\u3046\u304B\u3069\u3046\u304B\u3092\u6C7A\u3081\u307E\u3059\u3002",
  CARD_MODAL_HEIGHT_PERCENT: "\u30D5\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9\u306E\u7E26\u30B5\u30A4\u30BA\u306E\u30D1\u30FC\u30BB\u30F3\u30C6\u30FC\u30B8",
  CARD_MODAL_SIZE_PERCENT_DESC: "\u30E2\u30D0\u30A4\u30EB\u7248\u3001\u307E\u305F\u306F\u975E\u5E38\u306B\u5927\u304D\u306A\u30B5\u30A4\u30BA\u306E\u753B\u50CF\u304C\u3042\u308B\u5834\u5408\u306B\u306F100%\u306B\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059\u3002",
  RESET_DEFAULT: "\u30C7\u30D5\u30A9\u30EB\u30C8\u5024\u306B\u30EA\u30BB\u30C3\u30C8\u3059\u308B",
  CARD_MODAL_WIDTH_PERCENT: "\u30D5\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9\u306E\u6A2A\u30B5\u30A4\u30BA\u306E\u30D1\u30FC\u30BB\u30F3\u30C6\u30FC\u30B8",
  RANDOMIZE_CARD_ORDER: "\u30EC\u30D3\u30E5\u30FC\u4E2D\u306E\u30AB\u30FC\u30C9\u306E\u9806\u756A\u3092\u30E9\u30F3\u30C0\u30E0\u306B\u3057\u307E\u3059\u304B\uFF1F",
  REVIEW_CARD_ORDER_WITHIN_DECK: "Order cards in a deck are displayed during review",
  REVIEW_CARD_ORDER_NEW_FIRST_SEQUENTIAL: "Sequentially within a deck (All new cards first)",
  REVIEW_CARD_ORDER_DUE_FIRST_SEQUENTIAL: "Sequentially within a deck (All due cards first)",
  REVIEW_CARD_ORDER_NEW_FIRST_RANDOM: "Randomly within a deck (All new cards first)",
  REVIEW_CARD_ORDER_DUE_FIRST_RANDOM: "Randomly within a deck (All due cards first)",
  REVIEW_CARD_ORDER_RANDOM_DECK_AND_CARD: "Random card from random deck",
  REVIEW_DECK_ORDER: "Order decks are displayed during review",
  REVIEW_DECK_ORDER_PREV_DECK_COMPLETE_SEQUENTIAL: "Sequentially (once all cards in previous deck reviewed)",
  REVIEW_DECK_ORDER_PREV_DECK_COMPLETE_RANDOM: "Randomly (once all cards in previous deck reviewed)",
  REVIEW_DECK_ORDER_RANDOM_DECK_AND_CARD: "Random card from random deck",
  DISABLE_CLOZE_CARDS: "\u7A74\u57CB\u3081\u30AB\u30FC\u30C9\u3092\u7121\u52B9\u5316\u3057\u307E\u3059\u304B\uFF1F",
  CONVERT_HIGHLIGHTS_TO_CLOZES: "==\u30CF\u30A4\u30E9\u30A4\u30C8==\u3092\u7A74\u57CB\u3081\u3068\u3057\u3066\u4F7F\u7528\u3057\u307E\u3059\u304B\uFF1F",
  CONVERT_BOLD_TEXT_TO_CLOZES: "**\u30DC\u30FC\u30EB\u30C9\u4F53**\u3092\u7A74\u57CB\u3081\u3068\u3057\u3066\u4F7F\u7528\u3057\u307E\u3059\u304B\uFF1F",
  CONVERT_CURLY_BRACKETS_TO_CLOZES: "{{\u4E2D\u62EC\u5F27}}\u3092\u7A74\u57CB\u3081\u3068\u3057\u3066\u4F7F\u7528\u3057\u307E\u3059\u304B\uFF1F",
  INLINE_CARDS_SEPARATOR: "\u30A4\u30F3\u30E9\u30A4\u30F3\u30D5\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9\u306B\u4F7F\u7528\u3059\u308B\u30BB\u30D1\u30EC\u30FC\u30BF\u30FC",
  FIX_SEPARATORS_MANUALLY_WARNING: "\u3053\u306E\u30AA\u30D7\u30B7\u30E7\u30F3\u3092\u5909\u66F4\u3059\u308B\u5834\u5408\u306B\u306F\u3001\u4F5C\u6210\u6E08\u307F\u306E\u30D5\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9\u3092\u624B\u52D5\u3067\u7DE8\u96C6\u3057\u76F4\u3059\u5FC5\u8981\u304C\u3042\u308B\u3053\u3068\u306B\u6CE8\u610F\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  INLINE_REVERSED_CARDS_SEPARATOR: "\u30A4\u30F3\u30E9\u30A4\u30F3\u306E\u8868\u88CF\u53CD\u8EE2\u30D5\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9\u306B\u4F7F\u7528\u3059\u308B\u30BB\u30D1\u30EC\u30FC\u30BF\u30FC",
  MULTILINE_CARDS_SEPARATOR: "\u8907\u6570\u884C\u306E\u30D5\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9\u306B\u4F7F\u7528\u3059\u308B\u30BB\u30D1\u30EC\u30FC\u30BF\u30FC",
  MULTILINE_REVERSED_CARDS_SEPARATOR: "\u8907\u6570\u884C\u306E\u8868\u88CF\u53CD\u8EE2\u30D5\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9\u306B\u4F7F\u7528\u3059\u308B\u30BB\u30D1\u30EC\u30FC\u30BF\u30FC",
  NOTES: "\u30CE\u30FC\u30C8",
  REVIEW_PANE_ON_STARTUP: "Enable note review pane on startup",
  TAGS_TO_REVIEW: "\u30EC\u30D3\u30E5\u30FC\u306B\u4F7F\u7528\u3059\u308B\u30BF\u30B0",
  TAGS_TO_REVIEW_DESC: '\u30BF\u30B0\u3092\u30B9\u30DA\u30FC\u30B9\u307E\u305F\u306F\u6539\u884C\u3067\u533A\u5207\u3063\u3066\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002\u4F8B: "#review #tag2 #tag3"',
  OPEN_RANDOM_NOTE: "\u30E9\u30F3\u30C0\u30E0\u306B\u30CE\u30FC\u30C8\u3092\u958B\u3044\u3066\u30EC\u30D3\u30E5\u30FC\u3059\u308B",
  OPEN_RANDOM_NOTE_DESC: "\u3053\u306E\u30AA\u30D7\u30B7\u30E7\u30F3\u304C\u7121\u52B9\u5316\u3055\u308C\u3066\u3044\u308B\u72B6\u614B\u3067\u306F\u3001\u30CE\u30FC\u30C8\u306F\u91CD\u8981\u5EA6(\u30DA\u30FC\u30B8\u30E9\u30F3\u30AF)\u306B\u3088\u308B\u9806\u756A\u3067\u8868\u793A\u3055\u308C\u307E\u3059\u3002",
  AUTO_NEXT_NOTE: "\u30EC\u30D3\u30E5\u30FC\u5F8C\u306B\u6B21\u306E\u30CE\u30FC\u30C8\u3092\u81EA\u52D5\u7684\u306B\u958B\u304F",
  DISABLE_FILE_MENU_REVIEW_OPTIONS: "\u30D5\u30A1\u30A4\u30EB\u30E1\u30CB\u30E5\u30FC\u3067\u306E\u30EC\u30D3\u30E5\u30FC\u30AA\u30D7\u30B7\u30E7\u30F3\u3092\u7121\u52B9\u5316(\uFF62\u30EC\u30D3\u30E5\u30FC: Easy\uFF63\u7B49\u306E\u9805\u76EE\u3092\u975E\u8868\u793A\u306B\u3059\u308B)",
  DISABLE_FILE_MENU_REVIEW_OPTIONS_DESC: "\u7121\u52B9\u5316\u3057\u305F\u5F8C\u3001\u30B3\u30DE\u30F3\u30C9\u30DB\u30C3\u30C8\u30AD\u30FC\u3092\u4F7F\u3063\u3066\u30EC\u30D3\u30E5\u30FC\u3059\u308B\u3053\u3068\u304C\u53EF\u80FD\u306B\u306A\u308A\u307E\u3059\u3002\u3053\u306E\u30AA\u30D7\u30B7\u30E7\u30F3\u3092\u5909\u66F4\u3057\u305F\u5834\u5408\u306B\u306FObsidian\u3092\u30EA\u30ED\u30FC\u30C9\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  MAX_N_DAYS_REVIEW_QUEUE: "\u53F3\u30D1\u30CD\u30EB\u306B\u8868\u793A\u3059\u308B\u6700\u5927\u306E\u65E5\u6570",
  MIN_ONE_DAY: "\u65E5\u6570\u306B\u306F1\u4EE5\u4E0A\u306E\u6570\u5B57\u3092\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  VALID_NUMBER_WARNING: "\u6709\u52B9\u306A\u6570\u5B57\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  UI_PREFERENCES: "\u30E6\u30FC\u30B6\u30FC \u30A4\u30F3\u30BF\u30FC\u30D5\u30A7\u30A4\u30B9\u306E\u8A2D\u5B9A",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE: "\u30C7\u30C3\u30AD \u30C4\u30EA\u30FC\u306F\u6700\u521D\u306F\u5C55\u958B\u3057\u3066\u8868\u793A\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE_DESC: "\u3053\u308C\u3092\u30AA\u30D5\u306B\u3059\u308B\u3068\u3001\u540C\u3058\u30AB\u30FC\u30C9\u5185\u306E\u30CD\u30B9\u30C8\u3055\u308C\u305F\u30C7\u30C3\u30AD\u304C\u6298\u308A\u305F\u305F\u307E\u308C\u307E\u3059\u3002\u540C\u3058\u30D5\u30A1\u30A4\u30EB\u306B\u591A\u304F\u306E\u30C7\u30C3\u30AD\u306B\u5C5E\u3059\u308B\u30AB\u30FC\u30C9\u304C\u3042\u308B\u5834\u5408\u306B\u4FBF\u5229\u3067\u3059\u3002",
  ALGORITHM: "\u30A2\u30EB\u30B4\u30EA\u30BA\u30E0",
  CHECK_ALGORITHM_WIKI: '\u8A73\u7D30\u306B\u3064\u3044\u3066\u306F<a href="${algo_url}">\u30A2\u30EB\u30B4\u30EA\u30BA\u30E0\u306E\u5B9F\u88C5</a>\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002',
  BASE_EASE: "\u30D9\u30FC\u30B9\u306E\u6613\u3057\u3055",
  BASE_EASE_DESC: "\u6700\u5C0F\u5024\u306F130\u3067\u3059\u304C\u3001 \u9069\u6B63\u5024\u306F\u304A\u304A\u3088\u305D250\u3067\u3059\u3002",
  BASE_EASE_MIN_WARNING: "\u30D9\u30FC\u30B9\u306E\u6613\u3057\u3055\u306B\u306F130\u4EE5\u4E0A\u306E\u6570\u5B57\u3092\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  LAPSE_INTERVAL_CHANGE: "\u30D5\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9/\u30CE\u30FC\u30C8\u3092Hard\u3068\u3057\u3066\u30EC\u30D3\u30E5\u30FC\u3057\u305F\u969B\u306E\u9593\u9694\u5909\u66F4",
  LAPSE_INTERVAL_CHANGE_DESC: '"\u65B0\u3057\u3044\u9593\u9694 = \u4EE5\u524D\u306E\u9593\u9694 * \u9593\u9694\u5909\u66F4 / 100" \u3068\u3057\u3066\u8A08\u7B97\u3055\u308C\u307E\u3059\u3002',
  EASY_BONUS: "Easy\u30DC\u30FC\u30CA\u30B9",
  EASY_BONUS_DESC: "Easy\u30DC\u30FC\u30CA\u30B9\u306B\u3088\u3063\u3066\u30D5\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9/\u30CE\u30FC\u30C8\u306B\u304A\u3051\u308B\u9593\u9694\u306E\u5DEE\u5206\u3092\u8A2D\u5B9A\u3067\u304D\u307E\u3059(\u6700\u5C0F\u5024 = 100%)\u3002",
  EASY_BONUS_MIN_WARNING: "Easy\u30DC\u30FC\u30CA\u30B9\u306B\u306F100\u4EE5\u4E0A\u306E\u6570\u5B57\u3092\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  MAX_INTERVAL: "Maximum interval in days",
  MAX_INTERVAL_DESC: "\u9593\u9694\u306B\u4E0A\u9650\u5024\u3092\u8A2D\u5B9A\u3059\u308B\u3053\u3068\u304C\u3067\u304D\u307E\u3059(\u30C7\u30D5\u30A9\u30EB\u30C8\u5024 = 100\u5E74)\u3002",
  MAX_INTERVAL_MIN_WARNING: "\u9593\u9694\u306E\u6700\u5927\u5024\u306B\u306F1\u4EE5\u4E0A\u306E\u6570\u5B57\u3092\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  MAX_LINK_CONTRIB: "\u30EA\u30F3\u30AF\u30B3\u30F3\u30C8\u30EA\u30D3\u30E5\u30FC\u30B7\u30E7\u30F3\u306E\u6700\u5927\u5024",
  MAX_LINK_CONTRIB_DESC: "\u6700\u521D\u306E\u6613\u3057\u3055\u306B\u5BFE\u3057\u3066\u3001\u30EA\u30F3\u30AF\u3055\u308C\u305F\u30CE\u30FC\u30C8\u306E\u91CD\u307F\u4ED8\u3051\u3055\u308C\u305F\u6613\u3057\u3055\u304C\u5BC4\u4E0E\u3059\u308B\u6700\u5927\u5024\u3092\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  LOGGING: "\u30ED\u30B0\u7BA1\u7406",
  DISPLAY_DEBUG_INFO: "\u30C7\u30D9\u30ED\u30C3\u30D1\u30FC\u30B3\u30F3\u30BD\u30FC\u30EB\u306B\u3066\u30C7\u30D0\u30C3\u30B0\u60C5\u5831\u3092\u8868\u793A\u3057\u307E\u3059\u304B\uFF1F",
  // sidebar.ts
  NOTES_REVIEW_QUEUE: "\u30CE\u30FC\u30C8\u30EC\u30D3\u30E5\u30FC\u306E\u30AD\u30E5\u30FC",
  CLOSE: "\u9589\u3058\u308B",
  NEW: "\u65B0\u898F",
  YESTERDAY: "\u6628\u65E5",
  TODAY: "\u4ECA\u65E5",
  TOMORROW: "\u660E\u65E5",
  // stats-modal.tsx
  STATS_TITLE: "\u7D71\u8A08",
  MONTH: "Month",
  QUARTER: "Quarter",
  YEAR: "Year",
  LIFETIME: "Lifetime",
  FORECAST: "\u4E88\u6E2C",
  FORECAST_DESC: "\u5FA9\u7FD2\u671F\u65E5\u304C\u6765\u308B\u30AB\u30FC\u30C9\u306E\u679A\u6570",
  SCHEDULED: "\u30B9\u30B1\u30B8\u30E5\u30FC\u30EA\u30F3\u30B0\u6E08\u307F",
  DAYS: "\u65E5",
  NUMBER_OF_CARDS: "\u30AB\u30FC\u30C9\u6570",
  REVIEWS_PER_DAY: "\u5E73\u5747: ${avg}\u30EC\u30D3\u30E5\u30FC/\u65E5",
  INTERVALS: "\u9593\u9694",
  INTERVALS_DESC: "\u6B21\u306E\u30EC\u30D3\u30E5\u30FC\u4E88\u5B9A\u65E5",
  COUNT: "\u30AB\u30A6\u30F3\u30C8",
  INTERVALS_SUMMARY: "\u9593\u9694\u306E\u5E73\u5747\u5024: ${avg}, \u6700\u9577\u306E\u9593\u9694: ${longest}",
  EASES: "\u6613\u3057\u3055",
  EASES_SUMMARY: "\u6613\u3057\u3055\u306E\u5E73\u5747\u5024: ${avgEase}",
  CARD_TYPES: "\u30AB\u30FC\u30C9\u30BF\u30A4\u30D7",
  CARD_TYPES_DESC: "\u5EF6\u671F\u306E\u30AB\u30FC\u30C9\u304C\u3042\u308B\u5834\u5408\u306B\u306F\u3053\u308C\u306B\u542B\u307E\u308C\u307E\u3059",
  CARD_TYPE_NEW: "\u65B0\u898F",
  CARD_TYPE_YOUNG: "\u5FA9\u7FD2(\u521D\u671F)",
  CARD_TYPE_MATURE: "\u5FA9\u7FD2(\u5F8C\u671F)",
  CARD_TYPES_SUMMARY: "\u30AB\u30FC\u30C9\u306E\u5408\u8A08: ${totalCardsCount}\u679A"
};

// src/lang/locale/ko.ts
var ko_default = {
  // flashcard-modal.tsx
  DECKS: "\uB371",
  DUE_CARDS: "\uB2E4\uC2DC \uBCFC \uCE74\uB4DC\uB4E4",
  NEW_CARDS: "\uC0C8\uB85C\uC6B4 \uCE74\uB4DC\uB4E4",
  TOTAL_CARDS: "\uC804\uCCB4 \uCE74\uB4DC\uB4E4",
  BACK: "Back",
  SKIP: "Skip",
  EDIT_CARD: "Edit Card",
  RESET_CARD_PROGRESS: "\uCE74\uB4DC\uC758 \uC9C4\uD589\uC0C1\uD669\uC744 \uCD08\uAE30\uD654\uD569\uB2C8\uB2E4.",
  HARD: "\uC5B4\uB824\uC6C0(Hard)",
  GOOD: "\uC88B\uC74C(Good)",
  EASY: "\uC26C\uC6C0(Easy)",
  SHOW_ANSWER: "\uC815\uB2F5 \uD655\uC778\uD558\uAE30",
  CARD_PROGRESS_RESET: "\uCE74\uB4DC\uC758 \uC9C4\uD589\uC0C1\uD669\uC774 \uCD08\uAE30\uD654\uB418\uC5C8\uC2B5\uB2C8\uB2E4.",
  SAVE: "Save",
  CANCEL: "Cancel",
  NO_INPUT: "No input provided.",
  CURRENT_EASE_HELP_TEXT: "Current Ease: ",
  CURRENT_INTERVAL_HELP_TEXT: "Current Interval: ",
  CARD_GENERATED_FROM: "Generated from: ${notePath}",
  // main.ts
  OPEN_NOTE_FOR_REVIEW: "\uB9AC\uBDF0\uD560 \uB178\uD2B8 \uC5F4\uAE30",
  REVIEW_CARDS: "\uD50C\uB798\uC2DC\uCE74\uB4DC \uB9AC\uBDF0",
  REVIEW_EASY_FILE_MENU: "\uB9AC\uBDF0: \uC26C\uC6C0(Easy)",
  REVIEW_GOOD_FILE_MENU: "\uB9AC\uBDF0: \uC88B\uC74C(Good)",
  REVIEW_HARD_FILE_MENU: "\uB9AC\uBDF0: \uC5B4\uB824\uC6C0(Hard)",
  REVIEW_NOTE_EASY_CMD: "\uB178\uD2B8\uB97C \uC26C\uC6C0(easy)\uC73C\uB85C \uB9AC\uBDF0\uD569\uB2C8\uB2E4",
  REVIEW_NOTE_GOOD_CMD: "\uB178\uD2B8\uB97C \uC88B\uC74C(good)\uC73C\uB85C \uB9AC\uBDF0\uD569\uB2C8\uB2E4",
  REVIEW_NOTE_HARD_CMD: "\uB178\uD2B8\uB97C \uC5B4\uB824\uC6C0(hard)\uC73C\uB85C \uB9AC\uBDF0\uD569\uB2C8\uB2E4",
  REVIEW_ALL_CARDS: "\uBAA8\uB4E0 \uB178\uD2B8\uB4E4\uC758 \uD50C\uB798\uC2DC\uCE74\uB4DC\uB4E4\uC744 \uB9AC\uBDF0\uD569\uB2C8\uB2E4",
  CRAM_ALL_CARDS: "Select a deck to cram",
  REVIEW_CARDS_IN_NOTE: "\uC774 \uB178\uD2B8\uC758 \uD50C\uB798\uC2DC\uCE74\uB4DC\uB4E4\uC744 \uB9AC\uBDF0\uD569\uB2C8\uB2E4",
  CRAM_CARDS_IN_NOTE: "\uC774 \uB178\uD2B8\uC758 \uD50C\uB798\uC2DC\uCE74\uB4DC\uB4E4\uC744 \uBCBC\uB77D\uCE58\uAE30\uD569\uB2C8\uB2E4.",
  VIEW_STATS: "\uD1B5\uACC4 \uD655\uC778",
  STATUS_BAR: "--\uB9AC\uBDF0: ${dueNotesCount} \uB178\uD2B8, ${dueFlashcardsCount} \uCE74\uB4DC \uB0A8\uC558\uC2B5\uB2C8\uB2E4.",
  SYNC_TIME_TAKEN: "\uB3D9\uAE30\uD654\uC5D0 ${t}\uBC00\uB9AC\uCD08 \uAC78\uB838\uC2B5\uB2C8\uB2E4",
  NOTE_IN_IGNORED_FOLDER: "\uB178\uD2B8\uAC00 \uBB34\uC2DC\uB41C \uD3F4\uB354 \uC544\uB798\uC5D0 \uC800\uC7A5\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4. (\uC124\uC815\uC744 \uD655\uC778\uD574\uC8FC\uC138\uC694)",
  PLEASE_TAG_NOTE: "\uB9AC\uBDF0\uB97C \uD558\uAE30\uC704\uD574 \uB178\uD2B8\uC5D0 \uC801\uC808\uD788 \uD0DC\uADF8\uD574\uC8FC\uC138\uC694. (\uC124\uC815\uC744 \uD655\uC778\uD574\uC8FC\uC138\uC694)",
  RESPONSE_RECEIVED: "\uC694\uCCAD\uC774 \uC644\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4",
  NO_DECK_EXISTS: "${deckName}\uC774\uB77C\uB294 \uC774\uB984\uC758 \uB371\uC774 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",
  ALL_CAUGHT_UP: "\uBAA8\uB450 \uD655\uC778\uD588\uC2B5\uB2C8\uB2E4. :D",
  // scheduling.ts
  DAYS_STR_IVL: "${interval} \uC77C \uD6C4",
  MONTHS_STR_IVL: "${interval} \uAC1C\uC6D4 \uD6C4",
  YEARS_STR_IVL: "${interval} \uB144 \uD6C4",
  DAYS_STR_IVL_MOBILE: "${interval}d",
  MONTHS_STR_IVL_MOBILE: "${interval}m",
  YEARS_STR_IVL_MOBILE: "${interval}y",
  // settings.ts
  SETTINGS_HEADER: "Spaced Repetition Plugin - \uC124\uC815",
  CHECK_WIKI: '\uB354 \uB9CE\uC740 \uC815\uBCF4\uB97C \uC6D0\uD558\uC2DC\uBA74, <a href="${wiki_url}">wiki</a>\uB97C \uD655\uC778\uD574\uC8FC\uC138\uC694.',
  FOLDERS_TO_IGNORE: "\uBB34\uC2DC\uD560 \uD3F4\uB354\uB4E4",
  FOLDERS_TO_IGNORE_DESC: "\uD3F4\uB354 \uACBD\uB85C\uB97C \uBE48 \uC904\uB85C \uAD6C\uBD84\uD574\uC11C \uC785\uB825\uD574\uC8FC\uC138\uC694. 'Templates Meta/Scripts' \uC640 \uAC19\uC774 \uC785\uB825\uD558\uB294 \uAC83\uC740 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",
  FLASHCARDS: "\uD50C\uB798\uC2DC\uCE74\uB4DC",
  FLASHCARD_EASY_LABEL: "Easy Button Text",
  FLASHCARD_GOOD_LABEL: "Good Button Text",
  FLASHCARD_HARD_LABEL: "Hard Button Text",
  FLASHCARD_EASY_DESC: 'Customize the label for the "Easy" Button',
  FLASHCARD_GOOD_DESC: 'Customize the label for the "Good" Button',
  FLASHCARD_HARD_DESC: 'Customize the label for the "Hard" Button',
  FLASHCARD_TAGS: "\uD50C\uB798\uC2DC\uCE74\uB4DC \uD0DC\uADF8",
  FLASHCARD_TAGS_DESC: "\uD0DC\uADF8\uB97C \uACF5\uBC31 \uB610\uB294 \uBE48 \uC904\uB85C \uAD6C\uBD84\uD574\uC11C \uC785\uB825\uD574\uC8FC\uC138\uC694. \uC608) '#flashcards #deck2 #deck3'",
  CONVERT_FOLDERS_TO_DECKS: "\uD3F4\uB354\uB97C \uB371\uACFC \uC11C\uBE0C\uB371\uC73C\uB85C \uC0AC\uC6A9\uD560\uAE4C\uC694?",
  CONVERT_FOLDERS_TO_DECKS_DESC: "\uC774 \uAE30\uB2A5\uC740 \uC704\uC758 \uD50C\uB798\uC2DC\uCE74\uB4DC \uD0DC\uADF8 \uC635\uC158\uC744 \uB300\uCCB4\uD569\uB2C8\uB2E4.",
  INLINE_SCHEDULING_COMMENTS: "\uD50C\uB798\uC2DC\uCE74\uB4DC\uC758 \uB9C8\uC9C0\uB9C9 \uC904\uACFC \uB3D9\uC77C\uD55C \uC904\uC5D0 \uC2A4\uCF00\uC904\uB9C1 \uCF54\uBA58\uD2B8\uB97C \uC800\uC7A5\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
  INLINE_SCHEDULING_COMMENTS_DESC: "\uC774 \uC635\uC158\uC744 \uC0AC\uC6A9\uD558\uBA74 HTML \uC8FC\uC11D\uC774 \uBAA9\uB85D\uC758 \uD3EC\uB9E4\uD305\uC744 \uBB34\uB108\uD2B8\uB9AC\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",
  BURY_SIBLINGS_TILL_NEXT_DAY: "Sibling \uCE74\uB4DC\uB97C \uB2E4\uC74C\uB0A0\uAE4C\uC9C0 \uBB3B\uC5B4\uB450\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
  BURY_SIBLINGS_TILL_NEXT_DAY_DESC: "Sibling \uCE74\uB4DC\uB294 \uB3D9\uC77C\uD55C \uCE74\uB4DC \uD14D\uC2A4\uD2B8\uC5D0\uC11C \uC0DD\uC131\uB41C \uCE74\uB4DC\uC785\uB2C8\uB2E4. i.e. cloze deletions",
  SHOW_CARD_CONTEXT: "\uCE74\uB4DC\uC758 \uBB38\uB9E5(context)\uC744 \uD45C\uC2DC\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
  SHOW_CARD_CONTEXT_DESC: "\uCE74\uB4DC\uC5D0\uC11C 'Title > Heading 1 > Subheading > ... > Subheading' \uC758 \uD45C\uC2DC\uB97C \uD560\uC9C0 \uC124\uC815\uD569\uB2C8\uB2E4.",
  CARD_MODAL_HEIGHT_PERCENT: "\uD50C\uB798\uC2DC\uCE74\uB4DC \uB192\uC774 \uBE44\uC728",
  CARD_MODAL_SIZE_PERCENT_DESC: "\uBAA8\uBC14\uC77C \uBC84\uC804 \uD639\uC740 \uB9E4\uC6B0 \uD070 \uC774\uBBF8\uC9C0\uAC00 \uC788\uB294 \uACBD\uC6B0 100%\uB85C \uC124\uC815\uD574\uC57C \uD569\uB2C8\uB2E4.",
  RESET_DEFAULT: "\uAE30\uBCF8\uAC12\uC73C\uB85C \uCD08\uAE30\uD654",
  CARD_MODAL_WIDTH_PERCENT: "\uD50C\uB798\uC2DC\uCE74\uB4DC \uB108\uBE44 \uBE44\uC728",
  RANDOMIZE_CARD_ORDER: "\uB9AC\uBDF0\uC911\uC778 \uCE74\uB4DC\uC758 \uC21C\uC11C\uB97C \uB79C\uB364\uC73C\uB85C \uB450\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
  REVIEW_CARD_ORDER_WITHIN_DECK: "Order cards in a deck are displayed during review",
  REVIEW_CARD_ORDER_NEW_FIRST_SEQUENTIAL: "Sequentially within a deck (All new cards first)",
  REVIEW_CARD_ORDER_DUE_FIRST_SEQUENTIAL: "Sequentially within a deck (All due cards first)",
  REVIEW_CARD_ORDER_NEW_FIRST_RANDOM: "Randomly within a deck (All new cards first)",
  REVIEW_CARD_ORDER_DUE_FIRST_RANDOM: "Randomly within a deck (All due cards first)",
  REVIEW_CARD_ORDER_RANDOM_DECK_AND_CARD: "Random card from random deck",
  REVIEW_DECK_ORDER: "Order decks are displayed during review",
  REVIEW_DECK_ORDER_PREV_DECK_COMPLETE_SEQUENTIAL: "Sequentially (once all cards in previous deck reviewed)",
  REVIEW_DECK_ORDER_PREV_DECK_COMPLETE_RANDOM: "Randomly (once all cards in previous deck reviewed)",
  REVIEW_DECK_ORDER_RANDOM_DECK_AND_CARD: "Random card from random deck",
  DISABLE_CLOZE_CARDS: "\uBE48 \uCE78 \uCC44\uC6B0\uAE30 \uCE74\uB4DC\uB97C \uBE44\uD65C\uC131\uD654\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
  CONVERT_HIGHLIGHTS_TO_CLOZES: "==hightlights== \uB97C \uBE48 \uCE78 \uCC44\uC6B0\uAE30\uB85C \uC804\uD658\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
  CONVERT_BOLD_TEXT_TO_CLOZES: "**bolded text** \uB97C \uBE48 \uCE78 \uCC44\uC6B0\uAE30\uB85C \uC804\uD658\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
  CONVERT_CURLY_BRACKETS_TO_CLOZES: "{{curly brackets}} \uB97C \uBE48 \uCE78 \uCC44\uC6B0\uAE30\uB85C \uC804\uD658\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
  INLINE_CARDS_SEPARATOR: "\uC778\uB77C\uC778 \uD50C\uB798\uC2DC\uCE74\uB4DC \uAD6C\uBD84\uC790",
  FIX_SEPARATORS_MANUALLY_WARNING: "\uC8FC\uC758: \uC774 \uC635\uC158\uC744 \uC218\uC815\uD55C \uD6C4\uC5D0\uB294 \uC774\uBBF8 \uC791\uC131\uB41C \uD50C\uB798\uC2DC\uCE74\uB4DC\uB97C \uC218\uB3D9\uC73C\uB85C \uC218\uC815\uD574\uC57C \uD568\uC744 \uC8FC\uC758\uD558\uC2ED\uC2DC\uC624.",
  INLINE_REVERSED_CARDS_SEPARATOR: "\uC778\uB77C\uC778 \uBC18\uC804 \uD50C\uB798\uC2DC\uCE74\uB4DC \uAD6C\uBD84\uC790",
  MULTILINE_CARDS_SEPARATOR: "\uC5EC\uB7EC \uC904 \uD50C\uB798\uC2DC\uCE74\uB4DC \uAD6C\uBD84\uC790",
  MULTILINE_REVERSED_CARDS_SEPARATOR: "\uC5EC\uB7EC \uC904 \uBC18\uC804 \uD50C\uB798\uC2DC\uCE74\uB4DC \uAD6C\uBD84\uC790",
  NOTES: "\uB178\uD2B8",
  REVIEW_PANE_ON_STARTUP: "Enable note review pane on startup",
  TAGS_TO_REVIEW: "\uB9AC\uBDF0\uC5D0 \uC0AC\uC6A9\uD560 \uD0DC\uADF8",
  TAGS_TO_REVIEW_DESC: "\uD0DC\uADF8\uB97C \uACF5\uBC31 \uB610\uB294 \uBE48 \uC904\uB85C \uAD6C\uBD84\uD574\uC11C \uC785\uB825\uD574\uC8FC\uC138\uC694. \uC608) '#review #tag2 #tag3'",
  OPEN_RANDOM_NOTE: "\uB9AC\uBDF0\uB97C \uC704\uD574 \uB79C\uB364 \uB178\uD2B8\uB97C \uC5FD\uB2C8\uB2E4.",
  OPEN_RANDOM_NOTE_DESC: "\uC774 \uC635\uC158\uC774 \uAEBC\uC838\uC788\uC73C\uBA74, \uB178\uD2B8\uB294 \uC911\uC694\uB3C4(\uD398\uC774\uC9C0 \uB7AD\uD06C)\uC5D0 \uB530\uB77C \uC815\uB82C\uB429\uB2C8\uB2E4.",
  AUTO_NEXT_NOTE: "\uB9AC\uBDF0 \uD6C4\uC5D0 \uB2E4\uC74C \uB178\uD2B8\uB97C \uC790\uB3D9\uC73C\uB85C \uC5FD\uB2C8\uB2E4.",
  DISABLE_FILE_MENU_REVIEW_OPTIONS: "\uD30C\uC77C \uBA54\uB274\uC5D0\uC11C\uC758 \uB9AC\uBDF0 \uC635\uC158\uC744 \uBE44\uD65C\uC131\uD654 \uD569\uB2C8\uB2E4. \uC608) \uB9AC\uBDF0: Easy Good Hard",
  DISABLE_FILE_MENU_REVIEW_OPTIONS_DESC: "\uC774 \uC635\uC158\uC744 \uBE44\uD65C\uC131\uD654 \uD55C \uD6C4, \uBA85\uB839 \uB2E8\uCD95\uD0A4\uB97C \uC774\uC6A9\uD574 \uB9AC\uBDF0\uD558\uC2E4 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uC774 \uC635\uC158\uC744 \uBCC0\uACBD\uD55C \uD6C4\uC5D0 \uC635\uC2DC\uB514\uC5B8\uC744 \uC0C8\uB85C\uACE0\uCE68 \uD558\uC2ED\uC2DC\uC624.",
  MAX_N_DAYS_REVIEW_QUEUE: "\uC624\uB978\uCABD \uD328\uB110\uC5D0 \uD45C\uC2DC\uD560 \uCD5C\uB300 \uC77C\uC218",
  MIN_ONE_DAY: "\uC801\uC5B4\uB3C4 1\uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4.",
  VALID_NUMBER_WARNING: "\uC720\uD6A8\uD55C \uC22B\uC790\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694.",
  UI_PREFERENCES: "\uC0AC\uC6A9\uC790 \uC778\uD130\uD398\uC774\uC2A4 \uAE30\uBCF8 \uC124\uC815",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE: "\uB371 \uD2B8\uB9AC\uB294 \uCC98\uC74C\uC5D0 \uD655\uC7A5\uB41C \uAC83\uC73C\uB85C \uD45C\uC2DC\uB418\uC5B4\uC57C \uD569\uB2C8\uB2E4.",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE_DESC: "\uAC19\uC740 \uCE74\uB4DC\uC5D0 \uC911\uCCA9\uB41C \uB371\uC744 \uC811\uC73C\uB824\uBA74 \uC774 \uC635\uC158\uC744 \uB044\uC2ED\uC2DC\uC624. \uAC19\uC740 \uD30C\uC77C\uC5D0 \uC5EC\uB7EC \uB371\uC5D0 \uC18D\uD55C \uCE74\uB4DC\uAC00 \uC788\uB294 \uACBD\uC6B0 \uC720\uC6A9\uD569\uB2C8\uB2E4.",
  ALGORITHM: "\uC54C\uACE0\uB9AC\uC998",
  CHECK_ALGORITHM_WIKI: '\uB354 \uB9CE\uC740 \uC815\uBCF4\uB97C \uC6D0\uD558\uC2DC\uBA74, <a href="${algo_url}">algorithm implementation</a>\uC744 \uD655\uC778\uD574\uC8FC\uC138\uC694.',
  BASE_EASE: "\uAE30\uBCF8 ease",
  BASE_EASE_DESC: "\uCD5C\uC19F\uAC12 = 130, \uC801\uC815\uCE58\uB294 \uB300\uB7B5 250\uC785\uB2C8\uB2E4.",
  BASE_EASE_MIN_WARNING: "\uAE30\uBCF8 ease\uB294 \uC801\uC5B4\uB3C4 130 \uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4.",
  LAPSE_INTERVAL_CHANGE: "\uD50C\uB798\uC2DC\uCE74\uB4DC/\uB178\uD2B8\uB97C \uC5B4\uB824\uC6C0(Hard)\uC73C\uB85C \uB9AC\uBDF0\uD588\uC744 \uB54C\uC758 \uAC04\uACA9 \uBCC0\uACBD",
  LAPSE_INTERVAL_CHANGE_DESC: "\uC0C8\uB85C\uC6B4 \uAC04\uACA9 = \uC774\uC804 \uAC04\uACA9 * \uAC04\uACA9\uBCC0\uACBD \uAC12 / 100.",
  EASY_BONUS: "\uC26C\uC6C0(Easy) \uBCF4\uB108\uC2A4",
  EASY_BONUS_DESC: "\uC26C\uC6C0(Easy) \uBCF4\uB108\uC2A4\uB294 \uD50C\uB798\uC2DC\uCE74\uB4DC/\uB178\uD2B8\uC5D0\uC11C \uC88B\uC74C(Good)\uACFC \uC26C\uC6C0(Easy) \uC0AC\uC774\uC758 \uAC04\uACA9 \uCC28\uC774\uB97C \uC124\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. (\uCD5C\uC18C = 100%)",
  EASY_BONUS_MIN_WARNING: "\uC26C\uC6C0(Easy) \uBCF4\uB108\uC2A4\uB294 \uC801\uC5B4\uB3C4 100\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4.",
  MAX_INTERVAL: "Maximum interval in days",
  MAX_INTERVAL_DESC: "\uAC04\uACA9\uC758 \uC0C1\uD55C\uC120\uC744 \uB458 \uC218 \uC788\uC2B5\uB2C8\uB2E4. (\uAE30\uBCF8\uAC12 = 100\uB144)",
  MAX_INTERVAL_MIN_WARNING: "\uCD5C\uB300 \uAC04\uACA9\uC740 \uC801\uC5B4\uB3C4 1\uC77C\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4.",
  MAX_LINK_CONTRIB: "\uCD5C\uB300 \uC5F0\uACB0 \uAE30\uC5EC\uB3C4",
  MAX_LINK_CONTRIB_DESC: "\uB9C1\uD06C\uB41C \uB178\uD2B8\uC758 \uCD08\uAE30 ease\uC5D0 \uB300\uD55C \uAC00\uC911\uCE58\uAC00 \uC801\uC6A9\uB41C ease\uC758 \uCD5C\uB300 \uAE30\uC5EC\uB3C4\uC785\uB2C8\uB2E4.",
  LOGGING: "\uB85C\uAE45",
  DISPLAY_DEBUG_INFO: "\uB514\uBC84\uAE45 \uC815\uBCF4\uB97C \uAC1C\uBC1C\uC790 \uCF58\uC194\uC5D0 \uD45C\uC2DC\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
  // sidebar.ts
  NOTES_REVIEW_QUEUE: "\uB9AC\uBDF0\uD560 \uB178\uD2B8 \uB300\uAE30\uC5F4",
  CLOSE: "\uB2EB\uAE30",
  NEW: "New",
  YESTERDAY: "\uC5B4\uC81C",
  TODAY: "\uC624\uB298",
  TOMORROW: "\uB0B4\uC77C",
  // stats-modal.tsx
  STATS_TITLE: "\uD1B5\uACC4",
  MONTH: "\uC6D4",
  QUARTER: "\uBD84\uAE30",
  YEAR: "\uB144",
  LIFETIME: "\uD3C9\uC0DD",
  FORECAST: "\uC608\uCE21",
  FORECAST_DESC: "\uC774\uD6C4\uC5D0 \uD559\uC2B5\uD560 \uCE74\uB4DC\uC758 \uC218",
  SCHEDULED: "Scheduled",
  DAYS: "\uC77C",
  NUMBER_OF_CARDS: "\uCE74\uB4DC\uC758 \uC218",
  REVIEWS_PER_DAY: "\uD3C9\uADE0: ${avg} \uB9AC\uBDF0/\uC77C",
  INTERVALS: "\uAC04\uACA9",
  INTERVALS_DESC: "\uB9AC\uBDF0\uB97C \uB2E4\uC2DC \uD560 \uB54C \uAE4C\uC9C0\uC758 \uAE30\uAC04",
  COUNT: "Count",
  INTERVALS_SUMMARY: "\uD3C9\uADE0 \uAC04\uACA9: ${avg}, \uAC00\uC7A5 \uAE34 \uAC04\uACA9: ${longest}",
  EASES: "Eases",
  EASES_SUMMARY: "Average ease: ${avgEase}",
  CARD_TYPES: "\uCE74\uB4DC \uD0C0\uC785",
  CARD_TYPES_DESC: "\uC5EC\uAE30\uC5D0\uB294 \uBB3B\uC5B4\uB454 \uCE74\uB4DC\uB3C4 \uD3EC\uD568\uB429\uB2C8\uB2E4.",
  CARD_TYPE_NEW: "New",
  CARD_TYPE_YOUNG: "Young",
  CARD_TYPE_MATURE: "Mature",
  CARD_TYPES_SUMMARY: "\uC804\uCCB4 \uCE74\uB4DC \uC218: ${totalCardsCount}"
};

// src/lang/locale/mr.ts
var mr_default = {};

// src/lang/locale/nl.ts
var nl_default = {};

// src/lang/locale/no.ts
var no_default = {};

// src/lang/locale/pl.ts
var pl_default = {};

// src/lang/locale/pt.ts
var pt_default = {};

// src/lang/locale/pt-br.ts
var pt_br_default = {
  // flashcard-modal.tsx
  DECKS: "Baralhos",
  DUE_CARDS: "Cartas para Colocar em Dia",
  NEW_CARDS: "Novas Cartas",
  TOTAL_CARDS: "Total de Cartas",
  BACK: "Back",
  SKIP: "Skip",
  EDIT_CARD: "Edit Card",
  RESET_CARD_PROGRESS: "Reiniciar o Progresso da Carta",
  HARD: "Dif\xEDcil",
  GOOD: "OK",
  EASY: "F\xE1cil",
  SHOW_ANSWER: "Mostrar Resposta",
  CARD_PROGRESS_RESET: "O Progresso da Carta foi reiniciado",
  SAVE: "Save",
  CANCEL: "Cancel",
  NO_INPUT: "No input provided.",
  CURRENT_EASE_HELP_TEXT: "Current Ease: ",
  CURRENT_INTERVAL_HELP_TEXT: "Current Interval: ",
  CARD_GENERATED_FROM: "Generated from: ${notePath}",
  // main.ts
  OPEN_NOTE_FOR_REVIEW: "Abrir uma nota para revisar",
  REVIEW_CARDS: "Revisar flashcards",
  REVIEW_EASY_FILE_MENU: "Revis\xE3o: F\xE1cil",
  REVIEW_GOOD_FILE_MENU: "Revis\xE3o: OK",
  REVIEW_HARD_FILE_MENU: "Revis\xE3o: Dif\xEDcil",
  REVIEW_NOTE_EASY_CMD: "Revisar nota como f\xE1cil",
  REVIEW_NOTE_GOOD_CMD: "Revisar nota como OK",
  REVIEW_NOTE_HARD_CMD: "Revisar nota como dif\xEDcil",
  REVIEW_ALL_CARDS: "Revisar flashcards de todas as notas",
  CRAM_ALL_CARDS: "Select a deck to cram",
  REVIEW_CARDS_IN_NOTE: "Revisar flashcards nessa nota",
  CRAM_CARDS_IN_NOTE: "Revisar todas as flashcards nessa nota",
  VIEW_STATS: "Ver estat\xEDsticas",
  STATUS_BAR: "Revis\xE3o: ${dueNotesCount} nota(s), ${dueFlashcardsCount} Carta(s) para colocar em dia",
  SYNC_TIME_TAKEN: "Sicroniza\xE7\xE3o levou ${t}ms",
  NOTE_IN_IGNORED_FOLDER: "Nota \xE9 salva na pasta ignorada (cheque as configura\xE7\xF5es).",
  PLEASE_TAG_NOTE: "Por favor etiquete a nota apropriadamente para revisar (nas configura\xE7\xF5es).",
  RESPONSE_RECEIVED: "Resposta recebida.",
  NO_DECK_EXISTS: "Nenhum baralho existe para ${deckName}",
  ALL_CAUGHT_UP: "Voc\xEA colocou tudo em prazo agora :D.",
  // scheduling.ts
  DAYS_STR_IVL: "${interval} dia(s)",
  MONTHS_STR_IVL: "${interval} m\xEAs(es)",
  YEARS_STR_IVL: "${interval} ano(s)",
  DAYS_STR_IVL_MOBILE: "${interval}d",
  MONTHS_STR_IVL_MOBILE: "${interval}m",
  YEARS_STR_IVL_MOBILE: "${interval}a",
  // settings.ts
  SETTINGS_HEADER: "Plguin Spaced Repetition - Configura\xE7\xE3o",
  CHECK_WIKI: 'Para mais informa\xE7\xF5es, checke o <a href="${wiki_url}">wiki</a>.',
  FOLDERS_TO_IGNORE: "Pastas para ignorar",
  FOLDERS_TO_IGNORE_DESC: "Ensira o caminho das pastas separado por quebras de linha ex: Templates Meta/Scripts",
  FLASHCARDS: "Flashcards",
  FLASHCARD_EASY_LABEL: "Texto do Bot\xE3o de F\xE1cil",
  FLASHCARD_GOOD_LABEL: "Texto do Bot\xE3o de OK",
  FLASHCARD_HARD_LABEL: "Texto do Bot\xE3o de Dif\xEDcil",
  FLASHCARD_EASY_DESC: 'Costumize o r\xF3tulo para o bot\xE3o de "F\xE1cil"',
  FLASHCARD_GOOD_DESC: 'Costumize o r\xF3tulo para o bot\xE3o de "OK"',
  FLASHCARD_HARD_DESC: 'Customize o r\xF3tulo para o bot\xE3o de "Dif\xEDcil"',
  FLASHCARD_TAGS: "Etiquetas dos Flashcards",
  FLASHCARD_TAGS_DESC: "Ensira etiquetas separadas por espa\xE7os ou quebras de linha ex: #flashcards #baralho2 #baralho3.",
  CONVERT_FOLDERS_TO_DECKS: "Converter pastas para baralhos e sub-baralhos?",
  CONVERT_FOLDERS_TO_DECKS_DESC: "Isso \xE9 uma alternativa para a op\xE7\xE3o de etiqueta dos Flashcards em cima.",
  INLINE_SCHEDULING_COMMENTS: "Salvar coment\xE1rios de agendamento na mesma linha que a \xFAltima linha do flashcard?",
  INLINE_SCHEDULING_COMMENTS_DESC: "Ligar isso vai fazer com que os coment\xE1rios em HTML n\xE3o quebrem a formata\xE7\xE3o de listas.",
  BURY_SIBLINGS_TILL_NEXT_DAY: "Enterrar cartas irm\xE3s at\xE9 o pr\xF3ximo dia?",
  BURY_SIBLINGS_TILL_NEXT_DAY_DESC: "Cartas irm\xE3s s\xE3o geradas pelo texto da mesma carta ex: omiss\xE3o de palavras",
  SHOW_CARD_CONTEXT: "Mostrar conxtexto nas cartas?",
  SHOW_CARD_CONTEXT_DESC: "ex: T\xEDtulo > Cabe\xE7alho 1 > Subcabe\xE7alho > ... > Subcabe\xE7alho",
  CARD_MODAL_HEIGHT_PERCENT: "Porcentagem da Altura do Flashcard",
  CARD_MODAL_SIZE_PERCENT_DESC: "Deveria estar configurado em 100% em dispositivos m\xF3veis ou se voc\xEA tem imagens muito grandes",
  RESET_DEFAULT: "Reiniciar para a pr\xE9-defini\xE7\xE3o",
  CARD_MODAL_WIDTH_PERCENT: "Porcentagem de Largura do Flashcard",
  RANDOMIZE_CARD_ORDER: "Aleatorizar a ordem das cartas durante a revis\xE3o?",
  REVIEW_CARD_ORDER_WITHIN_DECK: "Order cards in a deck are displayed during review",
  REVIEW_CARD_ORDER_NEW_FIRST_SEQUENTIAL: "Sequentially within a deck (All new cards first)",
  REVIEW_CARD_ORDER_DUE_FIRST_SEQUENTIAL: "Sequentially within a deck (All due cards first)",
  REVIEW_CARD_ORDER_NEW_FIRST_RANDOM: "Randomly within a deck (All new cards first)",
  REVIEW_CARD_ORDER_DUE_FIRST_RANDOM: "Randomly within a deck (All due cards first)",
  REVIEW_CARD_ORDER_RANDOM_DECK_AND_CARD: "Random card from random deck",
  REVIEW_DECK_ORDER: "Order decks are displayed during review",
  REVIEW_DECK_ORDER_PREV_DECK_COMPLETE_SEQUENTIAL: "Sequentially (once all cards in previous deck reviewed)",
  REVIEW_DECK_ORDER_PREV_DECK_COMPLETE_RANDOM: "Randomly (once all cards in previous deck reviewed)",
  REVIEW_DECK_ORDER_RANDOM_DECK_AND_CARD: "Random card from random deck",
  DISABLE_CLOZE_CARDS: "Desabilitar cartas que usam omiss\xE3o de palavras?",
  CONVERT_HIGHLIGHTS_TO_CLOZES: "Converter ==marca-texto== em omiss\xF5es?",
  CONVERT_BOLD_TEXT_TO_CLOZES: "Converter **texto em negrito** em omiss\xF5es?",
  CONVERT_CURLY_BRACKETS_TO_CLOZES: "Converter {{chaves}} em omiss\xF5es?",
  INLINE_CARDS_SEPARATOR: "Separador para flashcards inline",
  FIX_SEPARATORS_MANUALLY_WARNING: "Note que depois de mudar isso voc\xEA vai ter que manualmente mudar quaisquer flashcards que voc\xEA tenha.",
  INLINE_REVERSED_CARDS_SEPARATOR: "Separador para flashcards inline reversos",
  MULTILINE_CARDS_SEPARATOR: "Separador para flashcards de m\xFAltiplas linhas",
  MULTILINE_REVERSED_CARDS_SEPARATOR: "Separador para flashcards de m\xFAltiplas linhas reversos",
  NOTES: "Notas",
  REVIEW_PANE_ON_STARTUP: "Enable note review pane on startup",
  TAGS_TO_REVIEW: "Etiquetas para revisar",
  TAGS_TO_REVIEW_DESC: "Ensira etiquetas separadas por espa\xE7os ou quebra de linhas ex: #revisar #etiqueta2 #etiqueta3.",
  OPEN_RANDOM_NOTE: "Abrir uma nota aleat\xF3ria para revisar",
  OPEN_RANDOM_NOTE_DESC: "Quando voc\xEA desabilitar isso, as notas v\xE3o ser ordenadas por import\xE2ncia (PageRank).",
  AUTO_NEXT_NOTE: "Abrir a pr\xF3xima nota automaticamente depois de uma revis\xE3o",
  DISABLE_FILE_MENU_REVIEW_OPTIONS: "Desabilitar op\xE7\xF5es de revis\xE3o no menu de arquivos ex: Revis\xE3o: F\xE1cil OK Dif\xEDcil",
  DISABLE_FILE_MENU_REVIEW_OPTIONS_DESC: "Depois de desabilitar, voc\xEA pode revisar usando os atalhos de comando. Reinicie Obsidian depois de mudar isso.",
  MAX_N_DAYS_REVIEW_QUEUE: "N\xFAmero m\xE1ximo de dias para exibir no painel direito",
  MIN_ONE_DAY: "O n\xFAmero de dias deve ser pelo menos 1.",
  VALID_NUMBER_WARNING: "Por favor ensira um n\xFAmero v\xE1lido.",
  UI_PREFERENCES: "Prefer\xEAncias de UI",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE: "\xC1rvores de baralhos devem inicialmente serem exibidas como expandidas",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE_DESC: "Desabilite isso para colapsar baralhos que est\xE3o um dentro do outro na mesma carta. \xDAtil se voc\xEA tem cartas que pertencem a muitos baralhos em um mesmo arquivo.",
  ALGORITHM: "Algor\xEDtmo",
  CHECK_ALGORITHM_WIKI: 'Para mais informa\xE7\xF5es, cheque a <a href="${algo_url}">implementa\xE7\xE3o do algor\xEDtmo</a>.',
  BASE_EASE: "Facilidade base",
  BASE_EASE_DESC: "m\xEDnimo = 130, preferivelmente aproximadamente 250.",
  BASE_EASE_MIN_WARNING: "A facilidade base deve ser pelo menos 130.",
  LAPSE_INTERVAL_CHANGE: "Mudan\xE7a de intervalo quando voc\xEA revisa um(a) flashcard/nota como dif\xEDcil",
  LAPSE_INTERVAL_CHANGE_DESC: "novoIntervalo = velhoIntervalo * mudancaIntervalo / 100.",
  EASY_BONUS: "B\xF4nus de F\xE1cil",
  EASY_BONUS_DESC: "O b\xF4nus de f\xE1cil te permite mudar a difer\xEAncia entre intervalos de responder OK e F\xE1cil em um(a) flashcard/nota (m\xEDnimo = 100%).",
  EASY_BONUS_MIN_WARNING: "O b\xF4nus de f\xE1cil deve ser pelo menos 100.",
  MAX_INTERVAL: "Maximum interval in days",
  MAX_INTERVAL_DESC: "Te permite colocar um limite m\xE1ximo no intervalo (pr\xE9-defini\xE7\xE3o = 100 anos).",
  MAX_INTERVAL_MIN_WARNING: "O intervalo m\xE1ximo deve ser pelo menos 1 dia.",
  MAX_LINK_CONTRIB: "Contribui\xE7\xE3o M\xE1xima de Links",
  MAX_LINK_CONTRIB_DESC: "Contribui\xE7\xE3o m\xE1xima da facilidade ponderada das notas linkadas \xE0 facilidade inicial.",
  LOGGING: "Logging",
  DISPLAY_DEBUG_INFO: "Mostrar informa\xE7\xE3o de debugging no console de desenvolvimento?",
  // sidebar.ts
  NOTES_REVIEW_QUEUE: "Fila de Notas para Revisar",
  CLOSE: "Fechar",
  NEW: "Novo",
  YESTERDAY: "Ontem",
  TODAY: "Hoje",
  TOMORROW: "Amanh\xE3",
  // stats-modal.tsx
  STATS_TITLE: "Estat\xEDsticas",
  MONTH: "M\xEAs",
  QUARTER: "Quarto",
  YEAR: "Ano",
  LIFETIME: "Tempo Total",
  FORECAST: "Previs\xE3o",
  FORECAST_DESC: "O n\xFAmero de cartas a serem colocadas em dia no futuro",
  SCHEDULED: "Agendado",
  DAYS: "Dias",
  NUMBER_OF_CARDS: "N\xFAmero de cartas",
  REVIEWS_PER_DAY: "M\xE9dia: ${avg} revis\xF5es/dia",
  INTERVALS: "Intervalos",
  INTERVALS_DESC: "Atrasos at\xE9 que as revis\xF5es sejam exibidas de novo",
  COUNT: "Contagem",
  INTERVALS_SUMMARY: "Intervalo em m\xE9dia: ${avg}, Maior intervalo: ${longest}",
  EASES: "Facilidades",
  EASES_SUMMARY: "Facilidade em m\xE9dia: ${avgEase}",
  CARD_TYPES: "Tipos de Cartas",
  CARD_TYPES_DESC: "Isso tamb\xE9m inclui cartas enterrados, caso existam",
  CARD_TYPE_NEW: "Novo",
  CARD_TYPE_YOUNG: "Jovem",
  CARD_TYPE_MATURE: "Amadurecido",
  CARD_TYPES_SUMMARY: "Total de cartas: ${totalCardsCount}"
};

// src/lang/locale/ro.ts
var ro_default = {};

// src/lang/locale/ru.ts
var ru_default = {
  // flashcard-modal.tsx
  DECKS: "\u041A\u043E\u043B\u043E\u0434\u044B",
  DUE_CARDS: "\u041F\u0440\u0435\u0434\u0441\u0442\u043E\u044F\u0449\u0438\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438",
  NEW_CARDS: "\u041D\u043E\u0432\u044B\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438",
  TOTAL_CARDS: "\u0412\u0441\u0435\u0433\u043E \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A",
  BACK: "\u041D\u0430\u0437\u0430\u0434",
  SKIP: "\u041F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u044C",
  EDIT_CARD: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443",
  RESET_CARD_PROGRESS: "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438",
  HARD: "\u0421\u043B\u043E\u0436\u043D\u043E",
  GOOD: "\u041D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u043E",
  EASY: "\u041B\u0435\u0433\u043A\u043E",
  SHOW_ANSWER: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043E\u0442\u0432\u0435\u0442",
  CARD_PROGRESS_RESET: "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u0438\u0437\u0443\u0447\u0435\u043D\u0438\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438",
  SAVE: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
  CANCEL: "\u041E\u0442\u043C\u0435\u043D\u0430",
  NO_INPUT: "\u041F\u0443\u0441\u0442\u043E\u0439 \u0432\u0432\u043E\u0434.",
  CURRENT_EASE_HELP_TEXT: "\u0422\u0435\u043A\u0443\u0449\u0430\u044F \u041B\u0435\u0433\u043A\u043E\u0441\u0442\u044C: ",
  CURRENT_INTERVAL_HELP_TEXT: "\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0438\u043D\u0442\u0435\u0440\u0432\u0430\u043B: ",
  CARD_GENERATED_FROM: "\u0421\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E \u0438\u0437: ${notePath}",
  // main.ts
  OPEN_NOTE_FOR_REVIEW: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0437\u0430\u043C\u0435\u0442\u043A\u0443 \u0434\u043B\u044F \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u044F",
  REVIEW_CARDS: "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438",
  REVIEW_EASY_FILE_MENU: "\u041F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u0435: \u041B\u0435\u0433\u043A\u043E",
  REVIEW_GOOD_FILE_MENU: "\u041F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u0435: \u041D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u043E",
  REVIEW_HARD_FILE_MENU: "\u041F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u0435: \u0421\u043B\u043E\u0436\u043D\u043E",
  REVIEW_NOTE_EASY_CMD: "\u041F\u043E\u0432\u0442\u043E\u0440\u044F\u0442\u044C \u0437\u0430\u043C\u0435\u0442\u043A\u0443 \u043A\u0430\u043A \u041B\u0451\u0433\u043A\u0443\u044E",
  REVIEW_NOTE_GOOD_CMD: "\u041F\u043E\u0432\u0442\u043E\u0440\u044F\u0442\u044C \u0437\u0430\u043C\u0435\u0442\u043A\u0443 \u043A\u0430\u043A \u041D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u0443\u044E",
  REVIEW_NOTE_HARD_CMD: "\u041F\u043E\u0432\u0442\u043E\u0440\u044F\u0442\u044C \u0437\u0430\u043C\u0435\u0442\u043A\u0443 \u043A\u0430\u043A \u0421\u043B\u043E\u0436\u043D\u0443\u044E",
  CRAM_ALL_CARDS: "\u0417\u0443\u0431\u0440\u0438\u0442\u044C \u0432\u0441\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u0432 \u044D\u0442\u043E\u0439 \u043A\u043E\u043B\u043E\u0434\u0435",
  REVIEW_ALL_CARDS: "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C \u0432\u0441\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u0432\u043E \u0432\u0441\u0435\u0445 \u0437\u0430\u043C\u0435\u0442\u043A\u0430\u0445",
  REVIEW_CARDS_IN_NOTE: "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u0432 \u044D\u0442\u043E\u0439 \u0437\u0430\u043C\u0435\u0442\u043A\u0435",
  CRAM_CARDS_IN_NOTE: "\u0417\u0443\u0431\u0440\u0438\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u0432 \u044D\u0442\u043E\u0439 \u0437\u0430\u043C\u0435\u0442\u043A\u0435",
  VIEW_STATS: "\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0443",
  STATUS_BAR: "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C: ${dueNotesCount} \u0437\u0430\u043C\u0435\u0442\u043E\u043A(-\u043A\u0438), ${dueFlashcardsCount} \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A(-\u043A\u0438) \u043F\u0440\u0435\u0434\u0441\u0442\u043E\u0438\u0442",
  SYNC_TIME_TAKEN: "\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044F \u0437\u0430\u043D\u044F\u043B\u0430 ${t}\u043C\u0441",
  NOTE_IN_IGNORED_FOLDER: "\u0417\u0430\u043C\u0435\u0442\u043A\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430 \u0432 \u0438\u0433\u043D\u043E\u0440\u0438\u0440\u0443\u0435\u043C\u0443\u044E \u043F\u0430\u043F\u043A\u0443 (\u0441\u043C. \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438).",
  PLEASE_TAG_NOTE: "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430 \u043F\u043E\u043C\u0435\u0442\u044C\u0442\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0443 \u043A\u0430\u043A \u043D\u0430\u0434\u043E \u0434\u043B\u044F \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u044F (\u0441\u043C. \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438).",
  RESPONSE_RECEIVED: "\u041E\u0442\u0432\u0435\u0442 \u043F\u043E\u043B\u0443\u0447\u0435\u043D.",
  NO_DECK_EXISTS: "\u041D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442 \u0443\u0440\u043E\u0432\u043D\u044F ${deckName}",
  ALL_CAUGHT_UP: "\u041C\u043E\u043B\u043E\u0434\u0435\u0446! \u0422\u044B \u0441\u043F\u0440\u0430\u0432\u0438\u043B\u0441\u044F \u0438 \u0434\u043E\u0448\u0435\u043B \u0434\u043E \u043A\u043E\u043D\u0446\u0430! :D",
  // scheduling.ts
  DAYS_STR_IVL: "${interval} \u0434\u043D\u0435\u0439",
  MONTHS_STR_IVL: "${interval} \u043C\u0435\u0441\u044F\u0446\u043E\u0432",
  YEARS_STR_IVL: "${interval} \u0433\u043E\u0434\u0430 (\u043B\u0435\u0442)",
  DAYS_STR_IVL_MOBILE: "${interval}\u0434.",
  MONTHS_STR_IVL_MOBILE: "${interval}\u043C.",
  YEARS_STR_IVL_MOBILE: "${interval}\u0433.",
  // settings.ts
  SETTINGS_HEADER: "\u041F\u043B\u0430\u0433\u0438\u043D Spaced Repetition - \u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",
  CHECK_WIKI: '\u0414\u043B\u044F \u0434\u043E\u043F. \u0438\u043D\u0444\u044B, \u0441\u043C\u043E\u0442\u0440\u0438 <a href="${wiki_url}">wiki</a>.',
  FOLDERS_TO_IGNORE: "\u0418\u0433\u043D\u043E\u0440\u0438\u0440\u0443\u0435\u043C\u044B\u0435 \u043F\u0430\u043F\u043A\u0438",
  FOLDERS_TO_IGNORE_DESC: "\u0412\u0435\u0434\u0438\u0442\u0435 \u043F\u0443\u0442\u0438 \u043F\u0430\u043F\u043E\u043A, \u043A\u0430\u0436\u0434\u0430\u044F \u043D\u0430 \u0441\u0432\u043E\u0435\u0439 \u0441\u0442\u0440\u043E\u043A\u0435, \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: Templates Meta/Scripts",
  FLASHCARDS: "\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0438",
  FLASHCARD_EASY_LABEL: "\u0422\u0435\u043A\u0441\u0442 \u043A\u043D\u043E\u043F\u043A\u0438 \u041B\u0435\u0433\u043A\u043E",
  FLASHCARD_GOOD_LABEL: "\u0422\u0435\u043A\u0441\u0442 \u043A\u043D\u043E\u043F\u043A\u0438 \u041D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u043E",
  FLASHCARD_HARD_LABEL: "\u0422\u0435\u043A\u0441\u0442 \u043A\u043D\u043E\u043F\u043A\u0438 \u0421\u043B\u043E\u0436\u043D\u043E",
  FLASHCARD_EASY_DESC: '\u041D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u044F\u0440\u043B\u044B\u043A \u0434\u043B\u044F \u043A\u043D\u043E\u043F\u043A\u0438 "\u041B\u0435\u0433\u043A\u043E"',
  FLASHCARD_GOOD_DESC: '\u041D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u044F\u0440\u043B\u044B\u043A \u0434\u043B\u044F \u043A\u043D\u043E\u043F\u043A\u0438 "\u041D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u043E"',
  FLASHCARD_HARD_DESC: '\u041D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u044F\u0440\u043B\u044B\u043A \u0434\u043B\u044F \u043A\u043D\u043E\u043F\u043A\u0438 "\u0421\u043B\u043E\u0436\u043D\u043E"',
  FLASHCARD_TAGS: "\u0422\u044D\u0433\u0438 \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A",
  FLASHCARD_TAGS_DESC: "\u0412\u0435\u0434\u0438\u0442\u0435 \u0442\u044D\u0433\u0438 \u0440\u0430\u0437\u0434\u0435\u043B\u0435\u043D\u043D\u044B\u0435 Enter-\u043E\u043C \u0438\u043B\u0438 \u043F\u0440\u043E\u0431\u0435\u043B\u043E\u043C, \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: #flashcards #deck2 #deck3.",
  CONVERT_FOLDERS_TO_DECKS: "\u041A\u043E\u043D\u0432\u0435\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u0430\u043F\u043A\u0438 \u0432 \u0443\u0440\u043E\u0432\u043D\u0438 \u0438 \u043F\u043E\u0434\u0443\u0440\u043E\u0432\u043D\u0438?",
  CONVERT_FOLDERS_TO_DECKS_DESC: "\u042D\u0442\u043E \u0430\u043B\u044C\u0442\u0435\u0440\u043D\u0430\u0442\u0438\u0432\u0430 \u0442\u044D\u0433\u0430\u043C \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A, \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 \u0441\u0432\u0435\u0440\u0445\u0443.",
  INLINE_SCHEDULING_COMMENTS: "\u0421\u043E\u0445\u0440\u0430\u043D\u044F\u0442\u044C \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 \u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u043D\u0430 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0439 \u0441\u0442\u0440\u043E\u043A\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438?",
  INLINE_SCHEDULING_COMMENTS_DESC: "\u0412\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u044D\u0442\u043E\u0439 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0441\u0434\u0435\u043B\u0430\u0435\u0442 \u0442\u0430\u043A, \u0447\u0442\u043E HTML \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438 \u043D\u0435 \u0431\u0443\u0434\u0443\u0442 \u043B\u043E\u043C\u0430\u0442\u044C \u0444\u043E\u0440\u043C\u0430\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0441\u043F\u0438\u0441\u043A\u0430.",
  BURY_SIBLINGS_TILL_NEXT_DAY: "\u041F\u0440\u044F\u0442\u0430\u0442\u044C \u0440\u043E\u0434\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u0434\u043E \u0441\u043B\u0435\u0434. \u0434\u043D\u044F?",
  BURY_SIBLINGS_TILL_NEXT_DAY_DESC: "\u0420\u043E\u0434\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 - \u0442\u0435, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u044B \u0438\u0437 \u043E\u0434\u043D\u043E\u0433\u043E \u0442\u0435\u043A\u0441\u0442\u0430, \u043F\u0440\u0438\u043C\u0435\u0440: \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u0441 \u043F\u0440\u043E\u043F\u0443\u0441\u043A\u0430\u043C\u0438 ([...])",
  SHOW_CARD_CONTEXT: "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442(\u0443\u0440\u043E\u0432\u0435\u043D\u044C) \u0432 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0430\u0445(\u0432\u043E \u0432\u0440\u0435\u043C\u044F \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u044F)?",
  SHOW_CARD_CONTEXT_DESC: "\u043F\u0440\u0438\u043C\u0435\u0440: Title > Heading 1 > Subheading > ... > Subheading",
  CARD_MODAL_HEIGHT_PERCENT: "\u0412\u044B\u0441\u043E\u0442\u0430 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u0432\u043F\u0440\u043E\u0446\u0435\u043D\u0442\u0430\u0445",
  CARD_MODAL_SIZE_PERCENT_DESC: "\u0415\u0441\u043B\u0438 \u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0435\u0441\u044C \u043C\u043E\u0431\u0438\u043B\u044C\u043D\u044B\u043C \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u043E\u043C, \u0432\u044B\u0441\u0442\u0430\u0432\u044C\u0442\u0435 100% \u0438\u043B\u0438 \u0443 \u0432\u0430\u0441 \u0431\u0443\u0434\u0443\u0442 \u043E\u0433\u0440\u043E\u043C\u043D\u044B\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",
  RESET_DEFAULT: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E",
  CARD_MODAL_WIDTH_PERCENT: "\u0428\u0438\u0440\u0438\u043D\u0430 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u0432 \u043F\u0440\u043E\u0446\u0435\u043D\u0442\u0430\u0445",
  RANDOMIZE_CARD_ORDER: "\u0421\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u0439 \u043F\u043E\u0440\u044F\u0434\u043E\u043A \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A \u0432\u043E \u0432\u0440\u0435\u043C\u044F \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u044F?",
  REVIEW_CARD_ORDER_WITHIN_DECK: "Order cards in a deck are displayed during review",
  REVIEW_CARD_ORDER_NEW_FIRST_SEQUENTIAL: "Sequentially within a deck (All new cards first)",
  REVIEW_CARD_ORDER_DUE_FIRST_SEQUENTIAL: "Sequentially within a deck (All due cards first)",
  REVIEW_CARD_ORDER_NEW_FIRST_RANDOM: "Randomly within a deck (All new cards first)",
  REVIEW_CARD_ORDER_DUE_FIRST_RANDOM: "Randomly within a deck (All due cards first)",
  REVIEW_CARD_ORDER_RANDOM_DECK_AND_CARD: "Random card from random deck",
  REVIEW_DECK_ORDER: "Order decks are displayed during review",
  REVIEW_DECK_ORDER_PREV_DECK_COMPLETE_SEQUENTIAL: "Sequentially (once all cards in previous deck reviewed)",
  REVIEW_DECK_ORDER_PREV_DECK_COMPLETE_RANDOM: "Randomly (once all cards in previous deck reviewed)",
  REVIEW_DECK_ORDER_RANDOM_DECK_AND_CARD: "Random card from random deck",
  DISABLE_CLOZE_CARDS: "\u0412\u044B\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u043A\u0430\u0440\u0442\u044B \u0441 \u043F\u0440\u043E\u043F\u0443\u0441\u043A\u0430\u043C\u0438 (\u043F\u0440\u0438\u043C\u0435\u0440: [...])?",
  CONVERT_HIGHLIGHTS_TO_CLOZES: "\u041A\u043E\u043D\u0432\u0435\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C ==\u0432\u044B\u0434\u0435\u043B\u0435\u043D\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442== \u0432 \u043F\u0440\u043E\u043F\u0443\u0441\u043A\u0438 (\u043F\u0440\u0438\u043C\u0435\u0440: [...])?",
  CONVERT_BOLD_TEXT_TO_CLOZES: "\u041A\u043E\u043D\u0432\u0435\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C **\u0436\u0438\u0440\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442** \u0432 \u043F\u0440\u043E\u043F\u0443\u0441\u043A\u0438 (\u043F\u0440\u0438\u043C\u0435\u0440: [...])?",
  CONVERT_CURLY_BRACKETS_TO_CLOZES: "\u041A\u043E\u043D\u0432\u0435\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C {{\u0444\u0438\u0433\u0443\u0440\u043D\u044B\u0435 \u0441\u043A\u043E\u0431\u043A\u0438}} \u0432 \u043F\u0440\u043E\u043F\u0443\u0441\u043A\u0438 (\u043F\u0440\u0438\u043C\u0435\u0440: [...])?",
  INLINE_CARDS_SEPARATOR: "\u0420\u0430\u0437\u0434\u0435\u043B\u0438\u0442\u0435\u043B\u044C \u0434\u043B\u044F \u0432\u043D\u0443\u0442\u0440\u0438\u0441\u0442\u0440\u043E\u0447\u043D\u044B\u0445 \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A",
  FIX_SEPARATORS_MANUALLY_WARNING: "\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435! \u041F\u043E\u0441\u043B\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u044D\u0442\u043E\u0433\u043E \u0432\u0430\u043C \u043F\u0440\u0438\u0434\u0451\u0442\u0441\u044F \u0432\u0440\u0443\u0447\u043D\u0443\u044E \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438",
  INLINE_REVERSED_CARDS_SEPARATOR: "\u0420\u0430\u0437\u0434\u0435\u043B\u0438\u0442\u0435\u043B\u044C \u0434\u043B\u044F \u043E\u0431\u0440\u0430\u0442\u043D\u044B\u0445 \u0432\u043D\u0443\u0442\u0440\u0438\u0441\u0442\u0440\u043E\u0447\u043D\u044B\u0445 \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A",
  MULTILINE_CARDS_SEPARATOR: "\u0420\u0430\u0437\u0434\u0435\u043B\u0438\u0442\u0435\u043B\u044C \u0434\u043B\u044F \u043C\u043D\u043E\u0433\u043E\u0441\u0442\u0440\u043E\u0447\u043D\u044B\u0445 \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A",
  MULTILINE_REVERSED_CARDS_SEPARATOR: "\u0420\u0430\u0437\u0434\u0435\u043B\u0438\u0442\u0435\u043B\u044C \u0434\u043B\u044F \u043E\u0431\u0440\u0430\u0442\u043D\u044B\u0445 \u043C\u043D\u043E\u0433\u043E\u0441\u0442\u0440\u043E\u0447\u043D\u044B\u0445 \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A",
  NOTES: "\u0417\u0430\u043C\u0435\u0442\u043A\u0438",
  REVIEW_PANE_ON_STARTUP: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u043F\u0430\u043D\u0435\u043B\u044C \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u044F \u043F\u0440\u0438 \u0437\u0430\u043F\u0443\u0441\u043A\u0435 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u044B",
  TAGS_TO_REVIEW: "\u0422\u044D\u0433\u0438 \u0434\u043B\u044F \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u044F",
  TAGS_TO_REVIEW_DESC: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u044D\u0433\u0438, \u0440\u0430\u0437\u0434\u0435\u043B\u0435\u043D\u043D\u044B\u0435 Enter-\u0430\u043C\u0438 \u0438\u043B\u0438 \u043F\u0440\u043E\u0431\u0435\u043B\u0430\u043C\u0438, \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: #review #tag2 #tag3.",
  OPEN_RANDOM_NOTE: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u043B\u0443\u0447\u0430\u0439\u043D\u0443\u044E \u0437\u0430\u043C\u0435\u0442\u043A\u0443 \u0434\u043B\u044F \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u044F",
  OPEN_RANDOM_NOTE_DESC: "\u0415\u0441\u043B\u0438 \u0432\u044B\u043A\u043B\u044E\u0447\u0438\u0442\u044C, \u0442\u043E \u0437\u0430\u043C\u0435\u0442\u043A\u0438 \u0431\u0443\u0434\u0443\u0442 \u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u044C \u043F\u043E \u0432\u0430\u0436\u043D\u043E\u0441\u0442\u0438 (PageRank).",
  AUTO_NEXT_NOTE: "\u041F\u043E\u0441\u043B\u0435 \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u0442\u044C \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0443\u044E \u0437\u0430\u043C\u0435\u0442\u043A\u0443",
  DISABLE_FILE_MENU_REVIEW_OPTIONS: "\u0412\u044B\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0432\u044B\u0431\u043E\u0440 \u0441\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u044F \u0432 \u043C\u0435\u043D\u044E \u0444\u0430\u0439\u043B\u0430, \u0442.\u0435.: \u041F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u0435: \u041B\u0435\u0433\u043A\u043E \u041D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u043E \u0421\u043B\u043E\u0436\u043D\u043E",
  DISABLE_FILE_MENU_REVIEW_OPTIONS_DESC: "\u041F\u043E\u0441\u043B\u0435 \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u0432\u044B \u0441\u043C\u043E\u0436\u0435\u0442\u0435 \u043F\u043E\u0432\u0442\u043E\u0440\u044F\u0442\u044C \u043F\u0440\u0438 \u043F\u043E\u043C\u043E\u0449\u0438 \u0445\u043E\u0442\u043A\u0435\u0435\u0432. \u041F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 Obsidian \u043F\u043E\u0441\u043B\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u044D\u0442\u043E\u0433\u043E.",
  MAX_N_DAYS_REVIEW_QUEUE: "\u041D\u0430\u0438\u0431\u043E\u043B\u044C\u0448\u0435\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0434\u043D\u0435\u0439 \u0434\u043B\u044F \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u043D\u0430 \u043F\u0430\u043D\u0435\u043B\u0438 \u0441\u043F\u0440\u0430\u0432\u0430",
  MIN_ONE_DAY: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0434\u043D\u0435\u0439 \u043D\u0435 \u043C\u0435\u043D\u044C\u0448\u0435 1.",
  VALID_NUMBER_WARNING: "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430 \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u043E\u0434\u0445\u043E\u0434\u044F\u0449\u0435\u0435 \u0447\u0438\u0441\u043B\u043E.",
  UI_PREFERENCES: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441 \u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE: "\u0414\u0435\u0440\u0435\u0432\u044C\u044F \u043A\u043E\u043B\u043E\u0434 \u0434\u043E\u043B\u0436\u043D\u044B \u0438\u0437\u043D\u0430\u0447\u0430\u043B\u044C\u043D\u043E \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0442\u044C\u0441\u044F \u043A\u0430\u043A \u0440\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044B\u0435",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE_DESC: "\u041E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u044D\u0442\u043E\u0442 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440, \u0447\u0442\u043E\u0431\u044B \u0441\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0432\u043B\u043E\u0436\u0435\u043D\u043D\u044B\u0435 \u043A\u043E\u043B\u043E\u0434\u044B \u043D\u0430 \u043E\u0434\u043D\u043E\u0439 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0435. \u041F\u043E\u043B\u0435\u0437\u043D\u043E, \u0435\u0441\u043B\u0438 \u0443 \u0432\u0430\u0441 \u0435\u0441\u0442\u044C \u043A\u0430\u0440\u0442\u044B, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043F\u0440\u0438\u043D\u0430\u0434\u043B\u0435\u0436\u0430\u0442 \u043C\u043D\u043E\u0433\u0438\u043C \u043A\u043E\u043B\u043E\u0434\u0430\u043C \u0432 \u043E\u0434\u043D\u043E\u043C \u0444\u0430\u0439\u043B\u0435.",
  ALGORITHM: "\u0410\u043B\u0433\u043E\u0440\u0438\u0442\u043C",
  CHECK_ALGORITHM_WIKI: '\u0417\u0430 \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0439 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0435\u0439 \u043E\u0431\u0440\u0430\u0449\u0430\u0439\u0442\u0435\u0441\u044C \u043A <a href="${algo_url}">\u0440\u0435\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u0430</a>.',
  BASE_EASE: "\u0411\u0430\u0437\u043E\u0432\u0430\u044F \u041B\u0451\u0433\u043A\u043E\u0441\u0442\u044C",
  BASE_EASE_DESC: "\u043C\u0438\u043D\u0438\u043C\u0443\u043C = 130, \u043F\u0440\u0435\u0434\u043F\u043E\u0447\u0442\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u043E\u043A\u043E\u043B\u043E 250.",
  BASE_EASE_MIN_WARNING: "\u041B\u0451\u0433\u043A\u043E\u0441\u0442\u044C \u0434\u043E\u043B\u0436\u043D\u0430 \u0431\u044B\u0442\u044C \u043C\u0438\u043D\u0438\u043C\u0443\u043C 130.",
  LAPSE_INTERVAL_CHANGE: "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u043F\u0440\u043E\u043C\u0435\u0436\u0443\u0442\u043A\u0430 \u043A\u043E\u0433\u0434\u0430 \u0432\u044B \u043E\u0442\u0432\u0435\u0447\u0430\u0435\u0442\u0435 \u0421\u043B\u043E\u0436\u043D\u043E \u0432\u043E \u0432\u0440\u0435\u043C\u044F \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u044F \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438/\u0437\u0430\u043C\u0435\u0442\u043A\u0438",
  LAPSE_INTERVAL_CHANGE_DESC: "\u043D\u043E\u0432\u044B\u0439\u041F\u0440\u043E\u043C\u0435\u0436\u0443\u0442\u043E\u043A = \u0441\u0442\u0430\u0440\u044B\u0439\u041F\u0440\u043E\u043C\u0435\u0436\u0443\u0442\u043E\u043A * \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435\u041F\u0440\u043E\u043C\u0435\u0436\u0443\u0442\u043A\u0430 / 100.",
  EASY_BONUS: "\u041B\u0435\u0433\u043A\u043E: \u0431\u043E\u043D\u0443\u0441",
  EASY_BONUS_DESC: "\u0411\u043E\u043D\u0443\u0441 \u0437\u0430 \u041B\u0435\u0433\u043A\u043E \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u0432\u0430\u043C \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0440\u0430\u0437\u043D\u0438\u0446\u0443 \u0432 \u043F\u0440\u043E\u043C\u0435\u0436\u0443\u0442\u043A\u0430\u0445 \u043C\u0435\u0436\u0434\u0443 \u043E\u0442\u0432\u0435\u0442\u0430\u043C\u0438 \u0425\u043E\u0440\u043E\u0448\u043E \u0438 \u041B\u0435\u0433\u043A\u043E \u043D\u0430 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0435/\u0437\u0430\u043C\u0435\u0442\u043A\u0435 (\u043C\u0438\u043D. = 100%).",
  EASY_BONUS_MIN_WARNING: "\u0411\u043E\u043D\u0443\u0441 \u0437\u0430 \u041B\u0435\u0433\u043A\u043E \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0435 \u043C\u0435\u043D\u044C\u0448\u0435 100.",
  MAX_INTERVAL: "Maximum interval in days",
  MAX_INTERVAL_DESC: "\u041F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u0432\u0430\u043C \u0443\u0441\u0442\u0430\u043D\u0430\u0432\u043B\u0438\u0432\u0430\u0442\u044C \u0432\u0435\u0440\u0445\u043D\u044E\u044E \u0433\u0440\u0430\u043D\u0438\u0446\u0443 \u043D\u0430 \u043F\u0440\u043E\u043C\u0435\u0436\u0443\u0442\u043E\u043A (\u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E = 100 \u043B\u0435\u0442).",
  MAX_INTERVAL_MIN_WARNING: "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u043F\u0440\u043E\u043C\u0435\u0436\u0443\u0442\u043E\u043A \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0435 \u043C\u0435\u043D\u044C\u0448\u0435 1.",
  MAX_LINK_CONTRIB: "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0432\u043A\u043B\u0430\u0434 \u0441\u0432\u044F\u0437\u0438 (\u0441\u0441\u044B\u043B\u043A\u0438)",
  MAX_LINK_CONTRIB_DESC: "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0432\u043A\u043B\u0430\u0434 \u0432\u0437\u0432\u0435\u0448\u0435\u043D\u043D\u043E\u0439 \u041B\u0451\u0433\u043A\u043E\u0441\u0442\u0438 \u0441\u0432\u044F\u0437\u0430\u043D\u043D\u044B\u0445 \u0437\u0430\u043C\u0435\u0442\u043E\u043A \u0432 \u043D\u0430\u0447\u0430\u043B\u044C\u043D\u0443\u044E \u041B\u0451\u0433\u043A\u043E\u0441\u0442\u044C.",
  LOGGING: "\u0412\u0435\u0434\u0435\u043D\u0438\u0435 \u043B\u043E\u0433\u0430",
  DISPLAY_DEBUG_INFO: "\u041E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0442\u044C \u043E\u0442\u043B\u0430\u0434\u043E\u0447\u043D\u0443\u044E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u0432 \u043A\u043E\u043D\u0441\u043E\u043B\u0435 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A\u0430 (developer console)?",
  // sidebar.ts
  NOTES_REVIEW_QUEUE: "\u041E\u0447\u0435\u0440\u0435\u0434\u044C \u0437\u0430\u043C\u0435\u0442\u043E\u043A \u043D\u0430 \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u0435",
  CLOSE: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C",
  NEW: "\u041D\u043E\u0432\u044B\u0435",
  YESTERDAY: "\u0412\u0447\u0435\u0440\u0430\u0448\u043D\u0438\u0435",
  TODAY: "\u0421\u0435\u0433\u043E\u0434\u043D\u044F\u0448\u043D\u0438\u0435",
  TOMORROW: "\u0417\u0430\u0432\u0442\u0440\u0430\u0448\u043D\u0438\u0435",
  // stats-modal.tsx
  STATS_TITLE: "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430",
  MONTH: "\u041C\u0435\u0441\u044F\u0446",
  QUARTER: "\u0427\u0435\u0442\u0432\u0435\u0440\u0442\u044C",
  YEAR: "\u0413\u043E\u0434",
  LIFETIME: "\u0412\u0441\u0451 \u0432\u0440\u0435\u043C\u044F",
  FORECAST: "\u041F\u0440\u043E\u0433\u043D\u043E\u0437",
  FORECAST_DESC: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A \u043F\u0440\u0435\u0434\u0441\u0442\u043E\u044F\u0449\u0438\u0445 \u0432 \u0431\u0443\u0434\u0443\u0449\u0435\u043C",
  SCHEDULED: "\u0417\u0430\u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043E",
  DAYS: "\u0414\u043D\u0435\u0439",
  NUMBER_OF_CARDS: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A",
  REVIEWS_PER_DAY: "\u0421\u0440\u0435\u0434\u043D\u0435\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E: ${avg} \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u0439 \u0432 \u0434\u0435\u043D\u044C",
  //!!!
  INTERVALS: "\u0418\u043D\u0442\u0435\u0440\u0432\u0430\u043B\u044B",
  INTERVALS_DESC: "\u041F\u0440\u043E\u043C\u0435\u0436\u0443\u0442\u043A\u0438 \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u0434\u043E \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0433\u043E \u043F\u043E\u043A\u0430\u0437\u0430 \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A \u0432\u043E \u0432\u0440\u0435\u043C\u044F \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u044F",
  COUNT: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E",
  INTERVALS_SUMMARY: "\u0421\u0440\u0435\u0434\u043D\u0438\u0439 \u043F\u0440\u043E\u043C\u0435\u0436\u0443\u0442\u043E\u043A: ${avg}, \u0421\u0430\u043C\u044B\u0439 \u0434\u043B\u0438\u043D\u043D\u044B\u0439 \u043F\u0440\u043E\u043C\u0435\u0436\u0443\u0442\u043E\u043A: ${longest}",
  EASES: "\u041B\u0451\u0433\u043A\u043E\u0441\u0442\u044C (\u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440 \u0432 \u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u0435, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0432\u043B\u0438\u044F\u0435\u0442 \u043D\u0430 \u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442 \u0438 \u0432\u0440\u0435\u043C\u044F \u043F\u043E\u043A\u0430\u0437\u0430 \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A) \n (\u043E\u0442 \u0430\u043D\u0433\u043B. ease, \u0441\u043C. \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u0430)",
  EASES_SUMMARY: "\u0421\u0440\u0435\u0434\u043D\u0435\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u041B\u0451\u0433\u043A\u043E\u0441\u0442\u0438: ${avgEase}",
  CARD_TYPES: "\u0422\u0438\u043F\u044B \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A",
  CARD_TYPES_DESC: "\u0412\u043A\u043B\u044E\u0447\u0430\u044F \u0441\u043F\u0440\u044F\u0442\u0430\u043D\u043D\u044B\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438, \u0435\u0441\u043B\u0438 \u0442\u0430\u043A\u0438\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0442.",
  CARD_TYPE_NEW: "\u041D\u043E\u0432\u044B\u0445",
  CARD_TYPE_YOUNG: "\u041C\u043E\u043B\u043E\u0434\u044B\u0445",
  CARD_TYPE_MATURE: "\u0412\u0437\u0440\u043E\u0441\u043B\u044B\u0445",
  CARD_TYPES_SUMMARY: "\u0412\u0441\u0435\u0433\u043E \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A: ${totalCardsCount}"
};

// src/lang/locale/ta.ts
var ta_default = {};

// src/lang/locale/te.ts
var te_default = {};

// src/lang/locale/th.ts
var th_default = {};

// src/lang/locale/tr.ts
var tr_default = {};

// src/lang/locale/uk.ts
var uk_default = {};

// src/lang/locale/ur.ts
var ur_default = {};

// src/lang/locale/vi.ts
var vi_default = {};

// src/lang/locale/zh-cn.ts
var zh_cn_default = {
  // flashcard-modal.tsx
  DECKS: "\u5361\u7EC4",
  DUE_CARDS: "\u5230\u671F\u5361\u7247",
  NEW_CARDS: "\u65B0\u5361\u7247",
  TOTAL_CARDS: "\u5168\u90E8\u5361\u7247",
  BACK: "\u8FD4\u56DE",
  SKIP: "\u7565\u8FC7",
  EDIT_CARD: "\u7F16\u8F91\u5361\u7247",
  RESET_CARD_PROGRESS: "\u91CD\u7F6E\u5361\u7247",
  HARD: "\u8F83\u96BE",
  GOOD: "\u8BB0\u5F97",
  EASY: "\u7B80\u5355",
  SHOW_ANSWER: "\u663E\u793A\u7B54\u6848",
  CARD_PROGRESS_RESET: "\u5361\u7247\u5DF2\u88AB\u91CD\u7F6E\u3002",
  SAVE: "\u50A8\u5B58",
  CANCEL: "\u53D6\u6D88",
  NO_INPUT: "\u6CA1\u6709\u63D0\u4F9B\u8F93\u5165\u3002",
  CURRENT_EASE_HELP_TEXT: "\u76EE\u524D\u638C\u63E1\u7A0B\u5EA6\uFF1A",
  CURRENT_INTERVAL_HELP_TEXT: "\u76EE\u524D\u95F4\u9694\uFF1A",
  CARD_GENERATED_FROM: "\u751F\u6210\u81EA\uFF1A${notePath}",
  // main.ts
  OPEN_NOTE_FOR_REVIEW: "\u6253\u5F00\u4E00\u4E2A\u7B14\u8BB0\u5F00\u59CB\u590D\u4E60",
  REVIEW_CARDS: "\u590D\u4E60\u5361\u7247",
  REVIEW_EASY_FILE_MENU: "\u590D\u4E60\uFF1A\u7B80\u5355",
  REVIEW_GOOD_FILE_MENU: "\u590D\u4E60\uFF1A\u8BB0\u5F97",
  REVIEW_HARD_FILE_MENU: "\u590D\u4E60\uFF1A\u8F83\u96BE",
  REVIEW_NOTE_EASY_CMD: "\u6807\u8BB0\u4E3A\u201C\u7B80\u5355\u201D",
  REVIEW_NOTE_GOOD_CMD: "\u6807\u8BB0\u4E3A\u201C\u8BB0\u5F97\u201D",
  REVIEW_NOTE_HARD_CMD: "\u6807\u8BB0\u4E3A\u201C\u8F83\u96BE\u201D",
  REVIEW_ALL_CARDS: "\u590D\u4E60\u6240\u6709\u7B14\u8BB0\u4E2D\u7684\u5361\u7247",
  CRAM_ALL_CARDS: "\u9009\u62E9\u8981\u96C6\u4E2D\u590D\u4E60\u7684\u5361\u7EC4",
  REVIEW_CARDS_IN_NOTE: "\u590D\u4E60\u6B64\u7B14\u8BB0\u4E2D\u7684\u5361\u7247",
  CRAM_CARDS_IN_NOTE: "\u96C6\u4E2D\u590D\u4E60\u6B64\u7B14\u8BB0\u4E2D\u7684\u5361\u7247",
  VIEW_STATS: "\u67E5\u770B\u6570\u636E",
  STATUS_BAR: "\u590D\u4E60: ${dueNotesCount} \u7B14\u8BB0, ${dueFlashcardsCount} \u5361\u7247\u5DF2\u5230\u671F",
  SYNC_TIME_TAKEN: "\u540C\u6B65\u65F6\u95F4 ${t}ms",
  NOTE_IN_IGNORED_FOLDER: "\u7B14\u8BB0\u4FDD\u5B58\u5728\u5DF2\u88AB\u5FFD\u7565\u7684\u8DEF\u5F84\u4E2D\uFF08\u68C0\u67E5\u8BBE\u7F6E\u9009\u9879\uFF09\u3002",
  PLEASE_TAG_NOTE: "\u8BF7\u5C06\u9700\u8981\u590D\u4E60\u7684\u7B14\u8BB0\u4E2D\u52A0\u5165\u6B63\u786E\u7684\u6807\u7B7E\uFF08\u68C0\u67E5\u8BBE\u7F6E\u9009\u9879\uFF09\u3002",
  RESPONSE_RECEIVED: "\u53CD\u9988\u5DF2\u6536\u5230",
  NO_DECK_EXISTS: "\u6CA1\u6709 ${deckName} \u5361\u7EC4",
  ALL_CAUGHT_UP: "\u90FD\u590D\u4E60\u5B8C\u5566\uFF0C\u4F60\u771F\u68D2\uFF01",
  // scheduling.ts
  DAYS_STR_IVL: "${interval}\u5929",
  MONTHS_STR_IVL: "${interval}\u6708",
  YEARS_STR_IVL: "${interval}\u5E74",
  DAYS_STR_IVL_MOBILE: "${interval}\u5929",
  MONTHS_STR_IVL_MOBILE: "${interval}\u6708",
  YEARS_STR_IVL_MOBILE: "${interval}\u5E74",
  // settings.ts
  SETTINGS_HEADER: "\u95F4\u9694\u91CD\u590D\u63D2\u4EF6 - \u8BBE\u7F6E",
  CHECK_WIKI: '\u4E86\u89E3\u66F4\u591A, \u8BF7\u70B9\u51FB<a href="${wiki_url}">wiki</a>.',
  FOLDERS_TO_IGNORE: "\u5FFD\u7565\u6B64\u6587\u4EF6\u5939",
  FOLDERS_TO_IGNORE_DESC: "\u8F93\u5165\u6587\u4EF6\u5939\u8DEF\u5F84\uFF0C\u7528\u65B0\u5EFA\u884C\u5206\u9694\uFF0C\u4F8B\u5982\uFF1ATemplates Meta/Scripts",
  FLASHCARDS: "\u5361\u7247",
  FLASHCARD_EASY_LABEL: "\u201C\u7B80\u5355\u201D\u6309\u94AE\u6587\u672C",
  FLASHCARD_GOOD_LABEL: "\u201C\u8BB0\u5F97\u201D\u6309\u94AE\u6587\u672C",
  FLASHCARD_HARD_LABEL: "\u201C\u8F83\u96BE\u201D\u6309\u94AE\u6587\u672C",
  FLASHCARD_EASY_DESC: "\u81EA\u5B9A\u4E49\u201C\u7B80\u5355\u201D\u6309\u94AE\u7684\u6807\u7B7E",
  FLASHCARD_GOOD_DESC: "\u81EA\u5B9A\u4E49\u201C\u8BB0\u5F97\u201D\u6309\u94AE\u7684\u6807\u7B7E",
  FLASHCARD_HARD_DESC: "\u81EA\u5B9A\u4E49\u201C\u8F83\u96BE\u201D\u6309\u94AE\u7684\u6807\u7B7E",
  FLASHCARD_TAGS: "\u5361\u7247\u6807\u7B7E",
  FLASHCARD_TAGS_DESC: "\u8F93\u5165\u6807\u7B7E\uFF0C\u7528\u7A7A\u683C\u6216\u65B0\u5EFA\u884C\u5206\u9694\uFF0C\u4F8B\u5982\uFF1A#flashcards #deck2 #deck3.",
  CONVERT_FOLDERS_TO_DECKS: "\u662F\u5426\u5C06\u6587\u4EF6\u5939\u5185\u5BB9\u8F6C\u6362\u4E3A\u5361\u7247\u7EC4\u548C\u5B50\u5361\u7247\u7EC4\uFF1F",
  CONVERT_FOLDERS_TO_DECKS_DESC: "\u6B64\u9009\u9879\u4E3A\u5361\u7247\u6807\u7B7E\u9009\u9879\u7684\u66FF\u4EE3\u9009\u9879\u3002",
  INLINE_SCHEDULING_COMMENTS: "\u662F\u5426\u5C06\u8BA1\u5212\u91CD\u590D\u65F6\u95F4\u4FDD\u5B58\u5728\u5361\u7247\u6700\u540E\u4E00\u884C\u7684\u540C\u4E00\u884C\uFF1F",
  INLINE_SCHEDULING_COMMENTS_DESC: "HTML\u6CE8\u91CA\u4E0D\u518D\u7834\u574F\u5217\u8868\u683C\u5F0F",
  BURY_SIBLINGS_TILL_NEXT_DAY: "\u5C06\u5173\u8054\u5361\u7247\u9690\u85CF\u81F3\u4E0B\u4E00\u5929\uFF1F",
  BURY_SIBLINGS_TILL_NEXT_DAY_DESC: "\u5173\u8054\u5361\u7247\u662F\u6765\u81EA\u540C\u4E00\u5361\u7247\u7684\u4E0D\u540C\u5F62\u5F0F\uFF0C \u4F8B\u5982\uFF1A\u5B8C\u5F62\u586B\u7A7A\u5361\u7247",
  SHOW_CARD_CONTEXT: "\u5728\u5361\u7247\u4E2D\u663E\u793A\u4E0A\u4E0B\u6587\uFF1F",
  SHOW_CARD_CONTEXT_DESC: "\u4F8B\u5982\uFF1A\u6807\u9898 > \u526F\u6807\u9898 > \u5C0F\u6807\u9898 > ... > \u5C0F\u6807\u9898",
  CARD_MODAL_HEIGHT_PERCENT: "\u5361\u7247\u9AD8\u5EA6\u767E\u5206\u6BD4",
  CARD_MODAL_SIZE_PERCENT_DESC: "\u8BF7\u5728\u79FB\u52A8\u7AEF\u4F7F\u7528\u5E76\u9700\u8981\u6D4F\u89C8\u8F83\u5927\u56FE\u7247\u65F6\u8BBE\u4E3A100%",
  RESET_DEFAULT: "\u91CD\u7F6E\u4E3A\u9ED8\u8BA4",
  CARD_MODAL_WIDTH_PERCENT: "\u5361\u7247\u5BBD\u5EA6\u767E\u5206\u6BD4",
  RANDOMIZE_CARD_ORDER: "\u590D\u4E60\u65F6\u968F\u673A\u663E\u793A\u5361\u7247\uFF1F",
  REVIEW_CARD_ORDER_WITHIN_DECK: "Order cards in a deck are displayed during review",
  REVIEW_CARD_ORDER_NEW_FIRST_SEQUENTIAL: "Sequentially within a deck (All new cards first)",
  REVIEW_CARD_ORDER_DUE_FIRST_SEQUENTIAL: "Sequentially within a deck (All due cards first)",
  REVIEW_CARD_ORDER_NEW_FIRST_RANDOM: "Randomly within a deck (All new cards first)",
  REVIEW_CARD_ORDER_DUE_FIRST_RANDOM: "Randomly within a deck (All due cards first)",
  REVIEW_CARD_ORDER_RANDOM_DECK_AND_CARD: "Random card from random deck",
  REVIEW_DECK_ORDER: "Order decks are displayed during review",
  REVIEW_DECK_ORDER_PREV_DECK_COMPLETE_SEQUENTIAL: "Sequentially (once all cards in previous deck reviewed)",
  REVIEW_DECK_ORDER_PREV_DECK_COMPLETE_RANDOM: "Randomly (once all cards in previous deck reviewed)",
  REVIEW_DECK_ORDER_RANDOM_DECK_AND_CARD: "Random card from random deck",
  DISABLE_CLOZE_CARDS: "\u4E0D\u8FDB\u884C\u5B8C\u5F62\u586B\u7A7A\uFF1F",
  CONVERT_HIGHLIGHTS_TO_CLOZES: "\u5C06 ==\u9AD8\u4EAE== \u8F6C\u6362\u4E3A\u5B8C\u5F62\u586B\u7A7A\uFF1F",
  CONVERT_BOLD_TEXT_TO_CLOZES: "\u5C06 **\u7C97\u4F53** \u8F6C\u6362\u4E3A\u5B8C\u5F62\u586B\u7A7A\uFF1F",
  CONVERT_CURLY_BRACKETS_TO_CLOZES: "\u5C06 {{\u5927\u62EC\u53F7}} \u8F6C\u6362\u4E3A\u5B8C\u5F62\u586B\u7A7A\uFF1F",
  INLINE_CARDS_SEPARATOR: "\u5355\u884C\u5361\u7247\u7684\u5206\u9694\u7B26",
  FIX_SEPARATORS_MANUALLY_WARNING: "\u6CE8\u610F\uFF1A\u66F4\u6539\u6B64\u9009\u9879\u540E\u4F60\u5C06\u9700\u8981\u81EA\u884C\u66F4\u6539\u5DF2\u5B58\u5728\u5361\u7247\u7684\u5206\u9694\u7B26\u3002",
  INLINE_REVERSED_CARDS_SEPARATOR: "\u5355\u884C\u7FFB\u8F6C\u5361\u7247\u7684\u5206\u9694\u7B26",
  MULTILINE_CARDS_SEPARATOR: "\u591A\u884C\u5361\u7247\u7684\u5206\u9694\u7B26",
  MULTILINE_REVERSED_CARDS_SEPARATOR: "\u591A\u884C\u7FFB\u8F6C\u5361\u7247\u7684\u5206\u9694\u7B26",
  NOTES: "\u7B14\u8BB0",
  REVIEW_PANE_ON_STARTUP: "\u542F\u52A8\u65F6\u5F00\u542F\u7B14\u8BB0\u590D\u4E60\u7A97\u683C",
  TAGS_TO_REVIEW: "\u590D\u4E60\u6807\u7B7E",
  TAGS_TO_REVIEW_DESC: "\u8F93\u5165\u6807\u7B7E\uFF0C\u7528\u7A7A\u683C\u6216\u65B0\u5EFA\u884C\u5206\u9694\uFF0C\u4F8B\u5982\uFF1A#review #tag2 #tag3.",
  OPEN_RANDOM_NOTE: "\u590D\u4E60\u968F\u673A\u7B14\u8BB0",
  OPEN_RANDOM_NOTE_DESC: "\u5173\u95ED\u6B64\u9009\u9879\uFF0C\u7B14\u8BB0\u5C06\u4EE5\u91CD\u8981\u5EA6(PageRank)\u6392\u5E8F\u3002",
  AUTO_NEXT_NOTE: "\u590D\u4E60\u540E\u81EA\u52A8\u6253\u5F00\u4E0B\u4E00\u4E2A\u7B14\u8BB0",
  DISABLE_FILE_MENU_REVIEW_OPTIONS: "\u5173\u95ED\u6587\u4EF6\u9009\u5355\u4E2D\u7684\u590D\u4E60\u9009\u9879 \u4F8B\u5982\uFF1A\u590D\u4E60\uFF1A\u7B80\u5355 \u8BB0\u5F97 \u8F83\u96BE",
  DISABLE_FILE_MENU_REVIEW_OPTIONS_DESC: "\u5173\u95ED\u6B64\u9009\u9879\u540E\u4F60\u53EF\u4EE5\u4F7F\u7528\u5FEB\u6377\u952E\u5F00\u59CB\u590D\u4E60\u3002\u91CD\u65B0\u542F\u52A8Obsidian\u4F7F\u672C\u9009\u9879\u751F\u6548\u3002",
  MAX_N_DAYS_REVIEW_QUEUE: "\u53F3\u8FB9\u680F\u4E2D\u663E\u793A\u7684\u6700\u5927\u5929\u6570",
  MIN_ONE_DAY: "\u5929\u6570\u6700\u5C0F\u503C\u4E3A1",
  VALID_NUMBER_WARNING: "\u8BF7\u8F93\u5165\u6709\u6548\u7684\u6570\u5B57\u3002",
  UI_PREFERENCES: "\u7528\u6237\u754C\u9762\u9996\u9009\u9879",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE: "\u7532\u677F\u6811\u6700\u521D\u5E94\u663E\u793A\u4E3A\u5C55\u5F00",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE_DESC: "\u5173\u95ED\u6B64\u9009\u9879\u53EF\u6298\u53E0\u540C\u4E00\u5F20\u5361\u7247\u4E2D\u7684\u5D4C\u5957\u724C\u7EC4\u3002\u5982\u679C\u60A8\u7684\u5361\u7247\u5C5E\u4E8E\u540C\u4E00\u6587\u4EF6\u4E2D\u7684\u8BB8\u591A\u5957\u724C\uFF0C\u5219\u5F88\u6709\u7528\u3002",
  ALGORITHM: "\u7B97\u6CD5",
  CHECK_ALGORITHM_WIKI: '\u4E86\u89E3\u66F4\u591A, \u8BF7\u70B9\u51FB<a href="${algo_url}">\u7B97\u6CD5\u5B9E\u73B0</a>.',
  BASE_EASE: "\u57FA\u7840\u638C\u63E1\u7A0B\u5EA6",
  BASE_EASE_DESC: "\u6700\u5C0F\u503C130\uFF0C\u63A8\u8350\u503C\u7EA6250.",
  BASE_EASE_MIN_WARNING: "\u57FA\u7840\u638C\u63E1\u7A0B\u5EA6\u7684\u6700\u5C0F\u503C\u4E3A130\u3002",
  LAPSE_INTERVAL_CHANGE: "\u5C06\u590D\u4E60\u65F6\u6807\u6CE8\u4E3A\u201C\u8F83\u96BE\u201D\u7684\u5361\u7247\u6216\u7B14\u8BB0\u590D\u4E60\u95F4\u9694\u7F29\u77ED",
  LAPSE_INTERVAL_CHANGE_DESC: "\u65B0\u590D\u4E60\u95F4\u9694 = \u539F\u590D\u4E60\u95F4\u9694 * \u95F4\u9694\u6539\u53D8\u7CFB\u6570 / 100.",
  EASY_BONUS: "\u7B80\u5355\u5956\u52B1",
  EASY_BONUS_DESC: "\u7B80\u5355\u5956\u52B1\u8BBE\u5B9A\u201C\u8BB0\u5F97\u201D\u548C\u201C\u7B80\u5355\u201D\u5361\u7247\u6216\u7B14\u8BB0\u7684\u590D\u4E60\u95F4\u9694\u5DEE\u8DDD\uFF08\u6700\u5C0F\u503C100%\uFF09\u3002",
  EASY_BONUS_MIN_WARNING: "\u7B80\u5355\u5956\u52B1\u81F3\u5C11\u4E3A100\u3002",
  MAX_INTERVAL: "\u6700\u5927\u95F4\u9694\uFF08\u5929\uFF09",
  MAX_INTERVAL_DESC: "\u8BBE\u5B9A\u590D\u4E60\u7684\u6700\u5927\u95F4\u9694\u65F6\u95F4\uFF08\u9ED8\u8BA4\u503C100\u5E74\uFF09\u3002",
  MAX_INTERVAL_MIN_WARNING: "\u6700\u5927\u95F4\u9694\u81F3\u5C11\u4E3A1\u5929",
  MAX_LINK_CONTRIB: "\u6700\u5927\u94FE\u63A5\u6536\u76CA",
  MAX_LINK_CONTRIB_DESC: "\u94FE\u63A5\u7B14\u8BB0\u7684\u52A0\u6743\u638C\u63E1\u7A0B\u5EA6\u5BF9\u539F\u59CB\u638C\u63E1\u7A0B\u5EA6\u7684\u6700\u5927\u8D21\u732E\u3002",
  LOGGING: "\u8BB0\u5F55\u4E2D",
  DISPLAY_DEBUG_INFO: "\u5728\u5F00\u53D1\u8005\u63A7\u5236\u53F0\u4E2D\u663E\u793A\u8C03\u8BD5\u4FE1\u606F\uFF1F",
  // sidebar.ts
  NOTES_REVIEW_QUEUE: "\u7B14\u8BB0\u590D\u4E60\u5E8F\u5217",
  CLOSE: "\u4E34\u8FD1",
  NEW: "\u65B0",
  YESTERDAY: "\u6628\u5929",
  TODAY: "\u4ECA\u5929",
  TOMORROW: "\u660E\u5929",
  // stats-modal.tsx
  STATS_TITLE: "\u6570\u636E",
  MONTH: "\u6708",
  QUARTER: "\u5B63",
  YEAR: "\u5E74",
  LIFETIME: "\u5168\u90E8",
  FORECAST: "\u9884\u671F",
  FORECAST_DESC: "\u5C06\u8981\u5230\u671F\u7684\u5361\u7247\u6570\u91CF",
  SCHEDULED: "\u5DF2\u6392\u671F",
  DAYS: "\u5929",
  NUMBER_OF_CARDS: "\u5361\u7247\u6570\u91CF",
  REVIEWS_PER_DAY: "\u5E73\u5747: \u590D\u4E60${avg} /\u5929",
  INTERVALS: "\u95F4\u9694",
  INTERVALS_DESC: "\u5230\u4E0B\u4E00\u6B21\u590D\u4E60\u7684\u65F6\u95F4\u95F4\u9694",
  COUNT: "\u8BA1\u6570",
  INTERVALS_SUMMARY: "\u5E73\u5747\u95F4\u9694\u65F6\u95F4: ${avg}, \u6700\u957F\u95F4\u9694\u65F6\u95F4: ${longest}",
  EASES: "\u638C\u63E1\u7A0B\u5EA6",
  EASES_SUMMARY: "\u5E73\u5747\u638C\u63E1\u7A0B\u5EA6: ${avgEase}",
  CARD_TYPES: "\u5361\u7247\u7C7B\u578B",
  CARD_TYPES_DESC: "\u5982\u6709\uFF0C\u5C06\u663E\u793A\u9690\u85CF\u7684\u5361\u7247",
  CARD_TYPE_NEW: "\u65B0",
  CARD_TYPE_YOUNG: "\u8F83\u65B0",
  CARD_TYPE_MATURE: "\u719F\u6089",
  CARD_TYPES_SUMMARY: "\u603B\u5361\u7247\u6570: ${totalCardsCount}"
};

// src/lang/locale/zh-tw.ts
var zh_tw_default = {
  // flashcard-modal.tsx
  DECKS: "\u724C\u7D44",
  DUE_CARDS: "\u5230\u671F\u5361\u7247",
  NEW_CARDS: "\u65B0\u5361\u7247",
  TOTAL_CARDS: "\u5168\u90E8\u5361\u7247",
  BACK: "\u8FD4\u56DE",
  SKIP: "\u7565\u904E",
  EDIT_CARD: "\u7DE8\u8F2F\u5361\u7247",
  RESET_CARD_PROGRESS: "\u91CD\u7F6E\u5361\u7247",
  HARD: "\u8F03\u96E3",
  GOOD: "\u8A18\u5F97",
  EASY: "\u7C21\u55AE",
  SHOW_ANSWER: "\u986F\u793A\u7B54\u6848",
  CARD_PROGRESS_RESET: "\u5361\u7247\u5DF2\u88AB\u91CD\u7F6E\u3002",
  SAVE: "\u5132\u5B58",
  CANCEL: "\u53D6\u6D88",
  NO_INPUT: "\u6C92\u6709\u63D0\u4F9B\u8F38\u5165\u3002",
  CURRENT_EASE_HELP_TEXT: "\u76EE\u524D\u638C\u63E1\u7A0B\u5EA6\uFF1A",
  CURRENT_INTERVAL_HELP_TEXT: "\u76EE\u524D\u9593\u9694\u6642\u9593\uFF1A",
  CARD_GENERATED_FROM: "\u751F\u6210\u81EA\uFF1A${notePath}",
  // main.ts
  OPEN_NOTE_FOR_REVIEW: "\u6253\u958B\u4E00\u500B\u7B46\u8A18\u958B\u59CB\u5FA9\u7FD2",
  REVIEW_CARDS: "\u5FA9\u7FD2\u5361\u7247",
  REVIEW_EASY_FILE_MENU: "\u5FA9\u7FD2\uFF1A\u7C21\u55AE",
  REVIEW_GOOD_FILE_MENU: "\u5FA9\u7FD2\uFF1A\u8A18\u5F97",
  REVIEW_HARD_FILE_MENU: "\u5FA9\u7FD2\uFF1A\u8F03\u96E3",
  REVIEW_NOTE_EASY_CMD: "\u6A19\u8A18\u70BA\u300C\u7C21\u55AE\u300D",
  REVIEW_NOTE_GOOD_CMD: "\u6A19\u8A18\u70BA\u300C\u8A18\u5F97\u300D",
  REVIEW_NOTE_HARD_CMD: "\u6A19\u8A18\u70BA\u300C\u8F03\u96E3\u300D",
  REVIEW_CARDS_IN_NOTE: "\u5FA9\u7FD2\u6B64\u7B46\u8A18\u4E2D\u7684\u5361\u7247",
  CRAM_ALL_CARDS: "\u9078\u64C7\u8981\u4E0D\u8A08\u96E3\u6613\u5EA6\u5FA9\u7FD2\u7684\u724C\u7D44",
  REVIEW_ALL_CARDS: "\u5FA9\u7FD2\u6240\u6709\u7B46\u8A18\u4E2D\u7684\u5361\u7247",
  CRAM_CARDS_IN_NOTE: "\u4E0D\u8A08\u96E3\u6613\u5EA6\u5FA9\u7FD2\u6B64\u7B46\u8A18\u4E2D\u7684\u5361\u7247",
  VIEW_STATS: "\u6AA2\u8996\u6578\u64DA",
  STATUS_BAR: "\u5FA9\u7FD2: ${dueNotesCount} \u7B46\u8A18, ${dueFlashcardsCount} \u5361\u7247\u5DF2\u5230\u671F",
  SYNC_TIME_TAKEN: "\u540C\u6B65\u6642\u9593 ${t}ms",
  NOTE_IN_IGNORED_FOLDER: "\u7B46\u8A18\u5132\u5B58\u5728\u5DF2\u88AB\u5FFD\u7565\u7684\u8DEF\u5F91\u4E2D\uFF08\u6AA2\u67E5\u8A2D\u5B9A\u9078\u9805\uFF09\u3002",
  PLEASE_TAG_NOTE: "\u8ACB\u5C07\u9700\u8981\u5FA9\u7FD2\u7684\u7B46\u8A18\u4E2D\u52A0\u5165\u6B63\u78BA\u7684\u6A19\u7C64\uFF08\u6AA2\u67E5\u8A2D\u5B9A\u9078\u9805\uFF09\u3002",
  RESPONSE_RECEIVED: "\u56DE\u994B\u5DF2\u6536\u5230",
  NO_DECK_EXISTS: "\u6C92\u6709 ${deckName} \u724C\u7D44",
  ALL_CAUGHT_UP: "\u90FD\u5FA9\u7FD2\u5B8C\u5566\uFF0C\u4F60\u771F\u68D2\uFF01",
  // scheduling.ts
  DAYS_STR_IVL: "${interval}\u5929",
  MONTHS_STR_IVL: "${interval}\u6708",
  YEARS_STR_IVL: "${interval}\u5E74",
  DAYS_STR_IVL_MOBILE: "${interval}\u5929",
  MONTHS_STR_IVL_MOBILE: "${interval}\u6708",
  YEARS_STR_IVL_MOBILE: "${interval}\u5E74",
  // settings.ts
  SETTINGS_HEADER: "\u9593\u9694\u91CD\u8907\u5916\u639B - \u8A2D\u5B9A",
  CHECK_WIKI: '\u77AD\u89E3\u66F4\u591A, \u8ACB\u9EDE\u9078<a href="${wiki_url}">wiki</a>.',
  FOLDERS_TO_IGNORE: "\u5FFD\u7565\u6B64\u8CC7\u6599\u593E",
  FOLDERS_TO_IGNORE_DESC: "\u8F38\u5165\u8CC7\u6599\u593E\u8DEF\u5F91\uFF08\u7528\u63DB\u884C\u5B57\u5143\u5206\u9694\uFF09\uFF0C\u4F8B\u5982\uFF1ATemplates Meta/Scripts",
  FLASHCARDS: "\u5361\u7247",
  FLASHCARD_EASY_LABEL: "\u7C21\u55AE\u6309\u9215\u6587\u5B57",
  FLASHCARD_GOOD_LABEL: "\u8A18\u5F97\u6309\u9215\u6587\u5B57",
  FLASHCARD_HARD_LABEL: "\u8F03\u96E3\u6309\u9215\u6587\u5B57",
  FLASHCARD_EASY_DESC: "\u81EA\u8A02\u300C\u7C21\u55AE\u300D\u6309\u9215\u7684\u6A19\u7C64",
  FLASHCARD_GOOD_DESC: "\u81EA\u8A02\u300C\u8A18\u5F97\u300D\u6309\u9215\u7684\u6A19\u7C64",
  FLASHCARD_HARD_DESC: "\u81EA\u8A02\u300C\u8F03\u96E3\u300D\u6309\u9215\u7684\u6A19\u7C64",
  FLASHCARD_TAGS: "\u5361\u7247\u6A19\u7C64",
  FLASHCARD_TAGS_DESC: "\u8F38\u5165\u6A19\u7C64\uFF08\u7528\u7A7A\u767D\u6216\u63DB\u884C\u5B57\u5143\u5206\u9694\uFF09\uFF0C\u4F8B\u5982\uFF1A#flashcards #deck2 #deck3.",
  CONVERT_FOLDERS_TO_DECKS: "\u662F\u5426\u5C07\u8CC7\u6599\u593E\u5167\u5BB9\u8F49\u63DB\u70BA\u724C\u7D44\u548C\u5B50\u724C\u7D44\uFF1F",
  CONVERT_FOLDERS_TO_DECKS_DESC: "\u6B64\u9078\u9805\u70BA\u5361\u7247\u6A19\u7C64\u9078\u9805\u7684\u66FF\u4EE3\u9078\u9805\u3002",
  INLINE_SCHEDULING_COMMENTS: "\u662F\u5426\u5C07\u8A08\u5283\u91CD\u8907\u6642\u9593\u5132\u5B58\u5728\u5361\u7247\u6700\u5F8C\u4E00\u884C\u7684\u540C\u4E00\u884C\uFF1F",
  INLINE_SCHEDULING_COMMENTS_DESC: "\u52FE\u9078\u5F8CHTML\u8A3B\u89E3\u4E0D\u6703\u7834\u58DE\u5217\u8868\u683C\u5F0F\u554F\u984C\u3002",
  BURY_SIBLINGS_TILL_NEXT_DAY: "\u5C07\u53CD\u8F49\u5361\u7247\u96B1\u85CF\u81F3\u4E0B\u4E00\u5929\uFF1F",
  BURY_SIBLINGS_TILL_NEXT_DAY_DESC: "\u53CD\u8F49\u5361\u7247\u7531\u540C\u4E00\u5361\u7247\u6587\u5B57\u7522\u751F\uFF0C\u4F8B\u5982\uFF1A\u586B\u7A7A\u514B\u6F0F\u5B57",
  SHOW_CARD_CONTEXT: "\u5728\u5361\u7247\u4E2D\u986F\u793A\u4E0A\u4E0B\u6587\uFF1F",
  SHOW_CARD_CONTEXT_DESC: "\u4F8B\u5982\uFF1A\u6A19\u984C > \u526F\u6A19\u984C > \u5C0F\u6A19\u984C > ... > \u5C0F\u6A19\u984C",
  CARD_MODAL_HEIGHT_PERCENT: "\u5361\u7247\u9AD8\u5EA6\u767E\u5206\u6BD4",
  CARD_MODAL_SIZE_PERCENT_DESC: "\u5728\u79FB\u52D5\u7AEF\u6216\u9700\u8981\u8F03\u5927\u5716\u7247\u6642\u61C9\u8A2D\u5B9A\u70BA100%",
  RESET_DEFAULT: "\u91CD\u7F6E\u70BA\u9810\u8A2D\u503C",
  CARD_MODAL_WIDTH_PERCENT: "\u5361\u7247\u5BEC\u5EA6\u767E\u5206\u6BD4",
  RANDOMIZE_CARD_ORDER: "\u5FA9\u7FD2\u6642\u96A8\u6A5F\u986F\u793A\u5361\u7247\uFF1F",
  REVIEW_CARD_ORDER_WITHIN_DECK: "Order cards in a deck are displayed during review",
  REVIEW_CARD_ORDER_NEW_FIRST_SEQUENTIAL: "Sequentially within a deck (All new cards first)",
  REVIEW_CARD_ORDER_DUE_FIRST_SEQUENTIAL: "Sequentially within a deck (All due cards first)",
  REVIEW_CARD_ORDER_NEW_FIRST_RANDOM: "Randomly within a deck (All new cards first)",
  REVIEW_CARD_ORDER_DUE_FIRST_RANDOM: "Randomly within a deck (All due cards first)",
  REVIEW_CARD_ORDER_RANDOM_DECK_AND_CARD: "Random card from random deck",
  REVIEW_DECK_ORDER: "Order decks are displayed during review",
  REVIEW_DECK_ORDER_PREV_DECK_COMPLETE_SEQUENTIAL: "Sequentially (once all cards in previous deck reviewed)",
  REVIEW_DECK_ORDER_PREV_DECK_COMPLETE_RANDOM: "Randomly (once all cards in previous deck reviewed)",
  REVIEW_DECK_ORDER_RANDOM_DECK_AND_CARD: "Random card from random deck",
  DISABLE_CLOZE_CARDS: "\u505C\u7528\u586B\u7A7A\u514B\u6F0F\u5B57\u5361\u7247\uFF1F",
  CONVERT_HIGHLIGHTS_TO_CLOZES: "\u5C07 ==\u9AD8\u4EAE== \u8F49\u63DB\u70BA\u586B\u7A7A\u514B\u6F0F\u5B57\uFF1F",
  CONVERT_BOLD_TEXT_TO_CLOZES: "\u5C07 **\u7C97\u9AD4** \u8F49\u63DB\u70BA\u586B\u7A7A\u514B\u6F0F\u5B57\uFF1F",
  CONVERT_CURLY_BRACKETS_TO_CLOZES: "\u5C07 {{\u5927\u62EC\u865F}} \u8F49\u63DB\u70BA\u586B\u7A7A\u514B\u6F0F\u5B57\uFF1F",
  INLINE_CARDS_SEPARATOR: "\u55AE\u884C\u5361\u7247\u7684\u5206\u9694\u5B57\u5143",
  FIX_SEPARATORS_MANUALLY_WARNING: "\u6CE8\u610F\uFF1A\u66F4\u6539\u6B64\u9078\u9805\u5F8C\u4F60\u5C07\u9700\u8981\u81EA\u884C\u66F4\u6539\u5DF2\u5B58\u5728\u5361\u7247\u7684\u5206\u9694\u5B57\u5143\u3002",
  INLINE_REVERSED_CARDS_SEPARATOR: "\u55AE\u884C\u53CD\u8F49\u5361\u7247\u7684\u5206\u9694\u5B57\u5143",
  MULTILINE_CARDS_SEPARATOR: "\u591A\u884C\u5361\u7247\u7684\u5206\u9694\u5B57\u5143",
  MULTILINE_REVERSED_CARDS_SEPARATOR: "\u591A\u884C\u7FFB\u8F49\u5361\u7247\u7684\u5206\u9694\u5B57\u5143",
  NOTES: "\u7B46\u8A18",
  REVIEW_PANE_ON_STARTUP: "\u555F\u52D5\u6642\u958B\u555F\u7B46\u8A18\u5FA9\u7FD2\u7A97\u683C",
  TAGS_TO_REVIEW: "\u5FA9\u7FD2\u6A19\u7C64",
  TAGS_TO_REVIEW_DESC: "\u8F38\u5165\u6A19\u7C64\uFF0C\u7528\u7A7A\u683C\u6216\u63DB\u884C\u5B57\u5143\u5206\u9694\uFF0C\u4F8B\u5982\uFF1A#review #tag2 #tag3.",
  OPEN_RANDOM_NOTE: "\u5FA9\u7FD2\u96A8\u6A5F\u7B46\u8A18",
  OPEN_RANDOM_NOTE_DESC: "\u95DC\u9589\u6B64\u9078\u9805\uFF0C\u7B46\u8A18\u5C07\u4EE5\u91CD\u8981\u5EA6(PageRank)\u6392\u5E8F\u3002",
  AUTO_NEXT_NOTE: "\u5FA9\u7FD2\u5F8C\u81EA\u52D5\u6253\u958B\u4E0B\u4E00\u500B\u7B46\u8A18",
  DISABLE_FILE_MENU_REVIEW_OPTIONS: "\u95DC\u9589\u6A94\u6848\u9078\u55AE\u4E2D\u7684\u5FA9\u7FD2\u9078\u9805 \u4F8B\u5982\uFF1A\u5FA9\u7FD2\uFF1A\u7C21\u55AE \u8A18\u5F97 \u8F03\u96E3",
  DISABLE_FILE_MENU_REVIEW_OPTIONS_DESC: "\u95DC\u9589\u6A94\u6848\u9078\u55AE\u7684\u5FA9\u7FD2\u9078\u9805\uFF0C\u4F8B\u5982\uFF1A\u5FA9\u7FD2: \u7C21\u55AE \u8A18\u5F97 \u8F03\u96E3\u3002",
  MAX_N_DAYS_REVIEW_QUEUE: "\u53F3\u908A\u9762\u677F\u986F\u793A\u7684\u6700\u5927\u5929\u6578",
  MIN_ONE_DAY: "\u5929\u6578\u6700\u5C0F\u503C\u70BA1",
  VALID_NUMBER_WARNING: "\u8ACB\u8F38\u5165\u6709\u6548\u7684\u6578\u5B57\u3002",
  UI_PREFERENCES: "\u7528\u6236\u4ECB\u9762\u9996\u9078\u9805",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE: "\u724C\u7D44\u6A39\u6700\u521D\u61C9\u986F\u793A\u70BA\u5C55\u958B",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE_DESC: "\u95DC\u9589\u6B64\u9078\u9805\u53EF\u647A\u758A\u540C\u4E00\u5F35\u5361\u7247\u4E2D\u7684\u5DE2\u72C0\u724C\u7D44\u3002\u5982\u679C\u60A8\u7684\u5361\u7247\u5C6C\u65BC\u540C\u4E00\u6A94\u6848\u4E2D\u7684\u8A31\u591A\u5957\u724C\uFF0C\u5247\u5F88\u6709\u7528\u3002",
  ALGORITHM: "\u6F14\u7B97\u6CD5",
  CHECK_ALGORITHM_WIKI: '\u77AD\u89E3\u66F4\u591A, \u8ACB\u9EDE\u9078<a href="${algo_url}">\u7B97\u6CD5\u5BE6\u73FE</a>.',
  BASE_EASE: "\u57FA\u790E\u638C\u63E1\u7A0B\u5EA6",
  BASE_EASE_DESC: "\u6700\u5C0F\u503C130\uFF0C\u63A8\u85A6\u503C\u7D04250.",
  BASE_EASE_MIN_WARNING: "\u57FA\u790E\u638C\u63E1\u7A0B\u5EA6\u7684\u6700\u5C0F\u503C\u70BA130\u3002",
  LAPSE_INTERVAL_CHANGE: "\u5C07\u5FA9\u7FD2\u6642\u6A19\u8A3B\u70BA\u300C\u8F03\u96E3\u300D\u7684\u5361\u7247\u6216\u7B46\u8A18\u5FA9\u7FD2\u9593\u9694\u7E2E\u77ED",
  LAPSE_INTERVAL_CHANGE_DESC: "\u65B0\u5FA9\u7FD2\u9593\u9694 = \u539F\u5FA9\u7FD2\u9593\u9694 * \u9593\u9694\u6539\u8B8A\u4FC2\u6578 / 100.",
  EASY_BONUS: "\u7C21\u55AE\u734E\u52F5",
  EASY_BONUS_DESC: "\u7C21\u55AE\u734E\u52F5\u8A2D\u5B9A\u300C\u8A18\u5F97\u300D\u548C\u300C\u7C21\u55AE\u300D\u5361\u7247\u6216\u7B46\u8A18\u7684\u5FA9\u7FD2\u9593\u9694\u5DEE\u8DDD\uFF08\u6700\u5C0F\u503C100%\uFF09\u3002",
  EASY_BONUS_MIN_WARNING: "\u7C21\u55AE\u734E\u52F5\u81F3\u5C11\u70BA100\u3002",
  MAX_INTERVAL: "\u6700\u5927\u9593\u9694\uFF08\u5929\uFF09",
  MAX_INTERVAL_DESC: "\u8A2D\u5B9A\u5FA9\u7FD2\u7684\u6700\u5927\u9593\u9694\u6642\u9593\uFF08\u9810\u8A2D\u503C100\u5E74\uFF09\u3002",
  MAX_INTERVAL_MIN_WARNING: "\u6700\u5927\u9593\u9694\u81F3\u5C11\u70BA1\u5929",
  MAX_LINK_CONTRIB: "\u6700\u5927\u93C8\u63A5\u8CA2\u737B",
  MAX_LINK_CONTRIB_DESC: "\u93C8\u63A5\u7B46\u8A18\u7684\u52A0\u6B0A\u638C\u63E1\u7A0B\u5EA6\u5C0D\u539F\u59CB\u638C\u63E1\u7A0B\u5EA6\u7684\u6700\u5927\u8CA2\u737B\u3002",
  LOGGING: "\u8A18\u9304\u4E2D",
  DISPLAY_DEBUG_INFO: "\u5728\u958B\u767C\u8005\u63A7\u5236\u53F0\u4E2D\u986F\u793A\u9664\u932F\u8CC7\u8A0A\uFF1F",
  // sidebar.ts
  NOTES_REVIEW_QUEUE: "\u7B46\u8A18\u5FA9\u7FD2\u5E8F\u5217",
  CLOSE: "\u81E8\u8FD1",
  NEW: "\u65B0",
  YESTERDAY: "\u6628\u5929",
  TODAY: "\u4ECA\u5929",
  TOMORROW: "\u660E\u5929",
  // stats-modal.tsx
  STATS_TITLE: "\u7D71\u8A08",
  MONTH: "\u6708",
  QUARTER: "\u5B63",
  YEAR: "\u5E74",
  LIFETIME: "\u5168\u90E8",
  FORECAST: "\u9810\u6E2C",
  FORECAST_DESC: "\u5C07\u8981\u5230\u671F\u7684\u5361\u7247\u6578\u91CF",
  SCHEDULED: "\u5DF2\u6392\u7A0B",
  DAYS: "\u5929",
  NUMBER_OF_CARDS: "\u5361\u7247\u6578\u91CF",
  REVIEWS_PER_DAY: "\u5E73\u5747: \u5FA9\u7FD2${avg} /\u5929",
  INTERVALS: "\u9593\u9694",
  INTERVALS_DESC: "\u5230\u4E0B\u4E00\u6B21\u5FA9\u7FD2\u7684\u6642\u9593\u9593\u9694",
  COUNT: "\u8A08\u6578",
  INTERVALS_SUMMARY: "\u5E73\u5747\u9593\u9694\u6642\u9593: ${avg}, \u6700\u9577\u9593\u9694\u6642\u9593: ${longest}",
  EASES: "\u638C\u63E1\u7A0B\u5EA6",
  EASES_SUMMARY: "\u5E73\u5747\u638C\u63E1\u7A0B\u5EA6: ${avgEase}",
  CARD_TYPES: "\u5361\u7247\u578B\u5225",
  CARD_TYPES_DESC: "\u5982\u6709\uFF0C\u5C07\u986F\u793A\u96B1\u85CF\u7684\u5361\u7247",
  CARD_TYPE_NEW: "\u65B0",
  CARD_TYPE_YOUNG: "\u8F03\u65B0",
  CARD_TYPE_MATURE: "\u719F\u6089",
  CARD_TYPES_SUMMARY: "\u7E3D\u5361\u7247\u6578: ${totalCardsCount}"
};

// src/lang/helpers.ts
var localeMap = {
  af: af_default,
  ar: ar_default,
  bn: bn_default,
  cs: cz_default,
  da: da_default,
  de: de_default,
  en: en_default,
  "en-gb": en_gb_default,
  es: es_default,
  fr: fr_default,
  hi: hi_default,
  id: id_default,
  it: it_default,
  ja: ja_default,
  ko: ko_default,
  mr: mr_default,
  nl: nl_default,
  nn: no_default,
  pl: pl_default,
  pt: pt_default,
  "pt-br": pt_br_default,
  ro: ro_default,
  ru: ru_default,
  ta: ta_default,
  te: te_default,
  th: th_default,
  tr: tr_default,
  uk: uk_default,
  ur: ur_default,
  vi: vi_default,
  "zh-cn": zh_cn_default,
  "zh-tw": zh_tw_default
};
var locale = localeMap[import_obsidian.moment.locale()];
function interpolate(str, params) {
  const names2 = Object.keys(params);
  const vals = Object.values(params);
  return new Function(...names2, `return \`${str}\`;`)(...vals);
}
function t(str, params) {
  if (!locale) {
    console.error(`SRS error: Locale ${import_obsidian.moment.locale()} not found.`);
  }
  const result = locale && locale[str] || en_default[str];
  if (params) {
    return interpolate(result, params);
  }
  return result;
}

// src/settings.ts
var DEFAULT_SETTINGS = {
  // flashcards
  flashcardEasyText: t("EASY"),
  flashcardGoodText: t("GOOD"),
  flashcardHardText: t("HARD"),
  flashcardTags: ["#flashcards"],
  convertFoldersToDecks: false,
  cardCommentOnSameLine: false,
  burySiblingCards: false,
  showContextInCards: true,
  flashcardHeightPercentage: import_obsidian2.Platform.isMobile ? 100 : 80,
  flashcardWidthPercentage: import_obsidian2.Platform.isMobile ? 100 : 40,
  randomizeCardOrder: null,
  flashcardCardOrder: "DueFirstRandom",
  flashcardDeckOrder: "PrevDeckComplete_Sequential",
  convertHighlightsToClozes: true,
  convertBoldTextToClozes: false,
  convertCurlyBracketsToClozes: false,
  singleLineCardSeparator: "::",
  singleLineReversedCardSeparator: ":::",
  multilineCardSeparator: "?",
  multilineReversedCardSeparator: "??",
  editLaterTag: "#edit-later",
  // notes
  enableNoteReviewPaneOnStartup: true,
  tagsToReview: ["#review"],
  noteFoldersToIgnore: [],
  openRandomNote: false,
  autoNextNote: false,
  disableFileMenuReviewOptions: false,
  maxNDaysNotesReviewQueue: 365,
  // UI settings
  initiallyExpandAllSubdecksInTree: false,
  // algorithm
  baseEase: 250,
  lapsesIntervalChange: 0.5,
  easyBonus: 1.3,
  maximumInterval: 36525,
  maxLinkFactor: 1,
  // logging
  showDebugMessages: false
};
function upgradeSettings(settings) {
  if (settings.randomizeCardOrder != null && settings.flashcardCardOrder == null && settings.flashcardDeckOrder == null) {
    console.log(`loadPluginData: Upgrading settings: ${settings.randomizeCardOrder}`);
    settings.flashcardCardOrder = settings.randomizeCardOrder ? "DueFirstRandom" : "DueFirstSequential";
    settings.flashcardDeckOrder = "PrevDeckComplete_Sequential";
    settings.randomizeCardOrder = null;
  }
}
var applyDebounceTimer = 0;
function applySettingsUpdate(callback2) {
  clearTimeout(applyDebounceTimer);
  applyDebounceTimer = window.setTimeout(callback2, 512);
}
var SRSettingTab = class extends import_obsidian2.PluginSettingTab {
  constructor(app2, plugin) {
    super(app2, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    const header = containerEl.createEl("h1", { text: `${t("SETTINGS_HEADER")}` });
    header.addClass("sr-centered");
    containerEl.createDiv().innerHTML = t("CHECK_WIKI", {
      wiki_url: "https://www.stephenmwangi.com/obsidian-spaced-repetition/"
    });
    new import_obsidian2.Setting(containerEl).setName(t("FOLDERS_TO_IGNORE")).setDesc(t("FOLDERS_TO_IGNORE_DESC")).addTextArea(
      (text) => text.setValue(this.plugin.data.settings.noteFoldersToIgnore.join("\n")).onChange((value) => {
        applySettingsUpdate(async () => {
          this.plugin.data.settings.noteFoldersToIgnore = value.split(/\n+/).map((v) => v.trim()).filter((v) => v);
          await this.plugin.savePluginData();
        });
      })
    );
    containerEl.createEl("h3", { text: `${t("FLASHCARDS")}` });
    new import_obsidian2.Setting(containerEl).setName(t("FLASHCARD_TAGS")).setDesc(t("FLASHCARD_TAGS_DESC")).addTextArea(
      (text) => text.setValue(this.plugin.data.settings.flashcardTags.join(" ")).onChange((value) => {
        applySettingsUpdate(async () => {
          this.plugin.data.settings.flashcardTags = value.split(/\s+/);
          await this.plugin.savePluginData();
        });
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("CONVERT_FOLDERS_TO_DECKS")).setDesc(t("CONVERT_FOLDERS_TO_DECKS_DESC")).addToggle(
      (toggle) => toggle.setValue(this.plugin.data.settings.convertFoldersToDecks).onChange(async (value) => {
        this.plugin.data.settings.convertFoldersToDecks = value;
        await this.plugin.savePluginData();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("INLINE_SCHEDULING_COMMENTS")).setDesc(t("INLINE_SCHEDULING_COMMENTS_DESC")).addToggle(
      (toggle) => toggle.setValue(this.plugin.data.settings.cardCommentOnSameLine).onChange(async (value) => {
        this.plugin.data.settings.cardCommentOnSameLine = value;
        await this.plugin.savePluginData();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("BURY_SIBLINGS_TILL_NEXT_DAY")).setDesc(t("BURY_SIBLINGS_TILL_NEXT_DAY_DESC")).addToggle(
      (toggle) => toggle.setValue(this.plugin.data.settings.burySiblingCards).onChange(async (value) => {
        this.plugin.data.settings.burySiblingCards = value;
        await this.plugin.savePluginData();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("SHOW_CARD_CONTEXT")).setDesc(t("SHOW_CARD_CONTEXT_DESC")).addToggle(
      (toggle) => toggle.setValue(this.plugin.data.settings.showContextInCards).onChange(async (value) => {
        this.plugin.data.settings.showContextInCards = value;
        await this.plugin.savePluginData();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("CARD_MODAL_HEIGHT_PERCENT")).setDesc(t("CARD_MODAL_SIZE_PERCENT_DESC")).addSlider(
      (slider) => slider.setLimits(10, 100, 5).setValue(this.plugin.data.settings.flashcardHeightPercentage).setDynamicTooltip().onChange(async (value) => {
        this.plugin.data.settings.flashcardHeightPercentage = value;
        await this.plugin.savePluginData();
      })
    ).addExtraButton((button) => {
      button.setIcon("reset").setTooltip(t("RESET_DEFAULT")).onClick(async () => {
        this.plugin.data.settings.flashcardHeightPercentage = DEFAULT_SETTINGS.flashcardHeightPercentage;
        await this.plugin.savePluginData();
        this.display();
      });
    });
    new import_obsidian2.Setting(containerEl).setName(t("CARD_MODAL_WIDTH_PERCENT")).setDesc(t("CARD_MODAL_SIZE_PERCENT_DESC")).addSlider(
      (slider) => slider.setLimits(10, 100, 5).setValue(this.plugin.data.settings.flashcardWidthPercentage).setDynamicTooltip().onChange(async (value) => {
        this.plugin.data.settings.flashcardWidthPercentage = value;
        await this.plugin.savePluginData();
      })
    ).addExtraButton((button) => {
      button.setIcon("reset").setTooltip(t("RESET_DEFAULT")).onClick(async () => {
        this.plugin.data.settings.flashcardWidthPercentage = DEFAULT_SETTINGS.flashcardWidthPercentage;
        await this.plugin.savePluginData();
        this.display();
      });
    });
    new import_obsidian2.Setting(this.containerEl).setName(t("REVIEW_CARD_ORDER_WITHIN_DECK")).addDropdown(
      (dropdown) => dropdown.addOptions({
        NewFirstSequential: t("REVIEW_CARD_ORDER_NEW_FIRST_SEQUENTIAL"),
        DueFirstSequential: t("REVIEW_CARD_ORDER_DUE_FIRST_SEQUENTIAL"),
        NewFirstRandom: t("REVIEW_CARD_ORDER_NEW_FIRST_RANDOM"),
        DueFirstRandom: t("REVIEW_CARD_ORDER_DUE_FIRST_RANDOM"),
        EveryCardRandomDeckAndCard: t("REVIEW_CARD_ORDER_RANDOM_DECK_AND_CARD")
      }).setValue(this.plugin.data.settings.flashcardCardOrder).onChange(async (value) => {
        this.plugin.data.settings.flashcardCardOrder = value;
        await this.plugin.savePluginData();
        this.display();
      })
    );
    const deckOrderEnabled = this.plugin.data.settings.flashcardCardOrder != "EveryCardRandomDeckAndCard";
    new import_obsidian2.Setting(this.containerEl).setName(t("REVIEW_DECK_ORDER")).addDropdown(
      (dropdown) => dropdown.addOptions(
        deckOrderEnabled ? {
          PrevDeckComplete_Sequential: t(
            "REVIEW_DECK_ORDER_PREV_DECK_COMPLETE_SEQUENTIAL"
          ),
          PrevDeckComplete_Random: t(
            "REVIEW_DECK_ORDER_PREV_DECK_COMPLETE_RANDOM"
          )
        } : {
          EveryCardRandomDeckAndCard: t(
            "REVIEW_DECK_ORDER_RANDOM_DECK_AND_CARD"
          )
        }
      ).setValue(
        deckOrderEnabled ? this.plugin.data.settings.flashcardDeckOrder : "EveryCardRandomDeckAndCard"
      ).setDisabled(!deckOrderEnabled).onChange(async (value) => {
        this.plugin.data.settings.flashcardDeckOrder = value;
        await this.plugin.savePluginData();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("CONVERT_HIGHLIGHTS_TO_CLOZES")).addToggle(
      (toggle) => toggle.setValue(this.plugin.data.settings.convertHighlightsToClozes).onChange(async (value) => {
        this.plugin.data.settings.convertHighlightsToClozes = value;
        await this.plugin.savePluginData();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("CONVERT_BOLD_TEXT_TO_CLOZES")).addToggle(
      (toggle) => toggle.setValue(this.plugin.data.settings.convertBoldTextToClozes).onChange(async (value) => {
        this.plugin.data.settings.convertBoldTextToClozes = value;
        await this.plugin.savePluginData();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("CONVERT_CURLY_BRACKETS_TO_CLOZES")).addToggle(
      (toggle) => toggle.setValue(this.plugin.data.settings.convertCurlyBracketsToClozes).onChange(async (value) => {
        this.plugin.data.settings.convertCurlyBracketsToClozes = value;
        await this.plugin.savePluginData();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("INLINE_CARDS_SEPARATOR")).setDesc(t("FIX_SEPARATORS_MANUALLY_WARNING")).addText(
      (text) => text.setValue(this.plugin.data.settings.singleLineCardSeparator).onChange((value) => {
        applySettingsUpdate(async () => {
          this.plugin.data.settings.singleLineCardSeparator = value;
          await this.plugin.savePluginData();
        });
      })
    ).addExtraButton((button) => {
      button.setIcon("reset").setTooltip(t("RESET_DEFAULT")).onClick(async () => {
        this.plugin.data.settings.singleLineCardSeparator = DEFAULT_SETTINGS.singleLineCardSeparator;
        await this.plugin.savePluginData();
        this.display();
      });
    });
    new import_obsidian2.Setting(containerEl).setName(t("INLINE_REVERSED_CARDS_SEPARATOR")).setDesc(t("FIX_SEPARATORS_MANUALLY_WARNING")).addText(
      (text) => text.setValue(this.plugin.data.settings.singleLineReversedCardSeparator).onChange((value) => {
        applySettingsUpdate(async () => {
          this.plugin.data.settings.singleLineReversedCardSeparator = value;
          await this.plugin.savePluginData();
        });
      })
    ).addExtraButton((button) => {
      button.setIcon("reset").setTooltip(t("RESET_DEFAULT")).onClick(async () => {
        this.plugin.data.settings.singleLineReversedCardSeparator = DEFAULT_SETTINGS.singleLineReversedCardSeparator;
        await this.plugin.savePluginData();
        this.display();
      });
    });
    new import_obsidian2.Setting(containerEl).setName(t("MULTILINE_CARDS_SEPARATOR")).setDesc(t("FIX_SEPARATORS_MANUALLY_WARNING")).addText(
      (text) => text.setValue(this.plugin.data.settings.multilineCardSeparator).onChange((value) => {
        applySettingsUpdate(async () => {
          this.plugin.data.settings.multilineCardSeparator = value;
          await this.plugin.savePluginData();
        });
      })
    ).addExtraButton((button) => {
      button.setIcon("reset").setTooltip(t("RESET_DEFAULT")).onClick(async () => {
        this.plugin.data.settings.multilineCardSeparator = DEFAULT_SETTINGS.multilineCardSeparator;
        await this.plugin.savePluginData();
        this.display();
      });
    });
    new import_obsidian2.Setting(containerEl).setName(t("MULTILINE_REVERSED_CARDS_SEPARATOR")).setDesc(t("FIX_SEPARATORS_MANUALLY_WARNING")).addText(
      (text) => text.setValue(this.plugin.data.settings.multilineReversedCardSeparator).onChange((value) => {
        applySettingsUpdate(async () => {
          this.plugin.data.settings.multilineReversedCardSeparator = value;
          await this.plugin.savePluginData();
        });
      })
    ).addExtraButton((button) => {
      button.setIcon("reset").setTooltip(t("RESET_DEFAULT")).onClick(async () => {
        this.plugin.data.settings.multilineReversedCardSeparator = DEFAULT_SETTINGS.multilineReversedCardSeparator;
        await this.plugin.savePluginData();
        this.display();
      });
    });
    new import_obsidian2.Setting(containerEl).setName(t("FLASHCARD_EASY_LABEL")).setDesc(t("FLASHCARD_EASY_DESC")).addText(
      (text) => text.setValue(this.plugin.data.settings.flashcardEasyText).onChange((value) => {
        applySettingsUpdate(async () => {
          this.plugin.data.settings.flashcardEasyText = value;
          await this.plugin.savePluginData();
        });
      })
    ).addExtraButton((button) => {
      button.setIcon("reset").setTooltip(t("RESET_DEFAULT")).onClick(async () => {
        this.plugin.data.settings.flashcardEasyText = DEFAULT_SETTINGS.flashcardEasyText;
        await this.plugin.savePluginData();
        this.display();
      });
    });
    new import_obsidian2.Setting(containerEl).setName(t("FLASHCARD_GOOD_LABEL")).setDesc(t("FLASHCARD_GOOD_DESC")).addText(
      (text) => text.setValue(this.plugin.data.settings.flashcardGoodText).onChange((value) => {
        applySettingsUpdate(async () => {
          this.plugin.data.settings.flashcardGoodText = value;
          await this.plugin.savePluginData();
        });
      })
    ).addExtraButton((button) => {
      button.setIcon("reset").setTooltip(t("RESET_DEFAULT")).onClick(async () => {
        this.plugin.data.settings.flashcardGoodText = DEFAULT_SETTINGS.flashcardGoodText;
        await this.plugin.savePluginData();
        this.display();
      });
    });
    new import_obsidian2.Setting(containerEl).setName(t("FLASHCARD_HARD_LABEL")).setDesc(t("FLASHCARD_HARD_DESC")).addText(
      (text) => text.setValue(this.plugin.data.settings.flashcardHardText).onChange((value) => {
        applySettingsUpdate(async () => {
          this.plugin.data.settings.flashcardHardText = value;
          await this.plugin.savePluginData();
        });
      })
    ).addExtraButton((button) => {
      button.setIcon("reset").setTooltip(t("RESET_DEFAULT")).onClick(async () => {
        this.plugin.data.settings.flashcardHardText = DEFAULT_SETTINGS.flashcardHardText;
        await this.plugin.savePluginData();
        this.display();
      });
    });
    containerEl.createEl("h3", { text: `${t("NOTES")}` });
    new import_obsidian2.Setting(containerEl).setName(t("REVIEW_PANE_ON_STARTUP")).addToggle(
      (toggle) => toggle.setValue(this.plugin.data.settings.enableNoteReviewPaneOnStartup).onChange(async (value) => {
        this.plugin.data.settings.enableNoteReviewPaneOnStartup = value;
        await this.plugin.savePluginData();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("TAGS_TO_REVIEW")).setDesc(t("TAGS_TO_REVIEW_DESC")).addTextArea(
      (text) => text.setValue(this.plugin.data.settings.tagsToReview.join(" ")).onChange((value) => {
        applySettingsUpdate(async () => {
          this.plugin.data.settings.tagsToReview = value.split(/\s+/);
          await this.plugin.savePluginData();
        });
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("OPEN_RANDOM_NOTE")).setDesc(t("OPEN_RANDOM_NOTE_DESC")).addToggle(
      (toggle) => toggle.setValue(this.plugin.data.settings.openRandomNote).onChange(async (value) => {
        this.plugin.data.settings.openRandomNote = value;
        await this.plugin.savePluginData();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("AUTO_NEXT_NOTE")).addToggle(
      (toggle) => toggle.setValue(this.plugin.data.settings.autoNextNote).onChange(async (value) => {
        this.plugin.data.settings.autoNextNote = value;
        await this.plugin.savePluginData();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("DISABLE_FILE_MENU_REVIEW_OPTIONS")).setDesc(t("DISABLE_FILE_MENU_REVIEW_OPTIONS_DESC")).addToggle(
      (toggle) => toggle.setValue(this.plugin.data.settings.disableFileMenuReviewOptions).onChange(async (value) => {
        this.plugin.data.settings.disableFileMenuReviewOptions = value;
        await this.plugin.savePluginData();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("MAX_N_DAYS_REVIEW_QUEUE")).addText(
      (text) => text.setValue(this.plugin.data.settings.maxNDaysNotesReviewQueue.toString()).onChange((value) => {
        applySettingsUpdate(async () => {
          const numValue = Number.parseInt(value);
          if (!isNaN(numValue)) {
            if (numValue < 1) {
              new import_obsidian2.Notice(t("MIN_ONE_DAY"));
              text.setValue(
                this.plugin.data.settings.maxNDaysNotesReviewQueue.toString()
              );
              return;
            }
            this.plugin.data.settings.maxNDaysNotesReviewQueue = numValue;
            await this.plugin.savePluginData();
          } else {
            new import_obsidian2.Notice(t("VALID_NUMBER_WARNING"));
          }
        });
      })
    ).addExtraButton((button) => {
      button.setIcon("reset").setTooltip(t("RESET_DEFAULT")).onClick(async () => {
        this.plugin.data.settings.maxNDaysNotesReviewQueue = DEFAULT_SETTINGS.maxNDaysNotesReviewQueue;
        await this.plugin.savePluginData();
        this.display();
      });
    });
    containerEl.createEl("h3", { text: `${t("UI_PREFERENCES")}` });
    new import_obsidian2.Setting(containerEl).setName(t("INITIALLY_EXPAND_SUBDECKS_IN_TREE")).setDesc(t("INITIALLY_EXPAND_SUBDECKS_IN_TREE_DESC")).addToggle(
      (toggle) => toggle.setValue(this.plugin.data.settings.initiallyExpandAllSubdecksInTree).onChange(async (value) => {
        this.plugin.data.settings.initiallyExpandAllSubdecksInTree = value;
        await this.plugin.savePluginData();
      })
    );
    containerEl.createEl("h3", { text: `${t("ALGORITHM")}` });
    containerEl.createDiv().innerHTML = t("CHECK_ALGORITHM_WIKI", {
      algo_url: "https://www.stephenmwangi.com/obsidian-spaced-repetition/algorithms/"
    });
    new import_obsidian2.Setting(containerEl).setName(t("BASE_EASE")).setDesc(t("BASE_EASE_DESC")).addText(
      (text) => text.setValue(this.plugin.data.settings.baseEase.toString()).onChange((value) => {
        applySettingsUpdate(async () => {
          const numValue = Number.parseInt(value);
          if (!isNaN(numValue)) {
            if (numValue < 130) {
              new import_obsidian2.Notice(t("BASE_EASE_MIN_WARNING"));
              text.setValue(this.plugin.data.settings.baseEase.toString());
              return;
            }
            this.plugin.data.settings.baseEase = numValue;
            await this.plugin.savePluginData();
          } else {
            new import_obsidian2.Notice(t("VALID_NUMBER_WARNING"));
          }
        });
      })
    ).addExtraButton((button) => {
      button.setIcon("reset").setTooltip(t("RESET_DEFAULT")).onClick(async () => {
        this.plugin.data.settings.baseEase = DEFAULT_SETTINGS.baseEase;
        await this.plugin.savePluginData();
        this.display();
      });
    });
    new import_obsidian2.Setting(containerEl).setName(t("LAPSE_INTERVAL_CHANGE")).setDesc(t("LAPSE_INTERVAL_CHANGE_DESC")).addSlider(
      (slider) => slider.setLimits(1, 99, 1).setValue(this.plugin.data.settings.lapsesIntervalChange * 100).setDynamicTooltip().onChange(async (value) => {
        this.plugin.data.settings.lapsesIntervalChange = value / 100;
        await this.plugin.savePluginData();
      })
    ).addExtraButton((button) => {
      button.setIcon("reset").setTooltip(t("RESET_DEFAULT")).onClick(async () => {
        this.plugin.data.settings.lapsesIntervalChange = DEFAULT_SETTINGS.lapsesIntervalChange;
        await this.plugin.savePluginData();
        this.display();
      });
    });
    new import_obsidian2.Setting(containerEl).setName(t("EASY_BONUS")).setDesc(t("EASY_BONUS_DESC")).addText(
      (text) => text.setValue((this.plugin.data.settings.easyBonus * 100).toString()).onChange((value) => {
        applySettingsUpdate(async () => {
          const numValue = Number.parseInt(value) / 100;
          if (!isNaN(numValue)) {
            if (numValue < 1) {
              new import_obsidian2.Notice(t("EASY_BONUS_MIN_WARNING"));
              text.setValue(
                (this.plugin.data.settings.easyBonus * 100).toString()
              );
              return;
            }
            this.plugin.data.settings.easyBonus = numValue;
            await this.plugin.savePluginData();
          } else {
            new import_obsidian2.Notice(t("VALID_NUMBER_WARNING"));
          }
        });
      })
    ).addExtraButton((button) => {
      button.setIcon("reset").setTooltip(t("RESET_DEFAULT")).onClick(async () => {
        this.plugin.data.settings.easyBonus = DEFAULT_SETTINGS.easyBonus;
        await this.plugin.savePluginData();
        this.display();
      });
    });
    new import_obsidian2.Setting(containerEl).setName(t("MAX_INTERVAL")).setDesc(t("MAX_INTERVAL_DESC")).addText(
      (text) => text.setValue(this.plugin.data.settings.maximumInterval.toString()).onChange((value) => {
        applySettingsUpdate(async () => {
          const numValue = Number.parseInt(value);
          if (!isNaN(numValue)) {
            if (numValue < 1) {
              new import_obsidian2.Notice(t("MAX_INTERVAL_MIN_WARNING"));
              text.setValue(
                this.plugin.data.settings.maximumInterval.toString()
              );
              return;
            }
            this.plugin.data.settings.maximumInterval = numValue;
            await this.plugin.savePluginData();
          } else {
            new import_obsidian2.Notice(t("VALID_NUMBER_WARNING"));
          }
        });
      })
    ).addExtraButton((button) => {
      button.setIcon("reset").setTooltip(t("RESET_DEFAULT")).onClick(async () => {
        this.plugin.data.settings.maximumInterval = DEFAULT_SETTINGS.maximumInterval;
        await this.plugin.savePluginData();
        this.display();
      });
    });
    new import_obsidian2.Setting(containerEl).setName(t("MAX_LINK_CONTRIB")).setDesc(t("MAX_LINK_CONTRIB_DESC")).addSlider(
      (slider) => slider.setLimits(0, 100, 1).setValue(this.plugin.data.settings.maxLinkFactor * 100).setDynamicTooltip().onChange(async (value) => {
        this.plugin.data.settings.maxLinkFactor = value / 100;
        await this.plugin.savePluginData();
      })
    ).addExtraButton((button) => {
      button.setIcon("reset").setTooltip(t("RESET_DEFAULT")).onClick(async () => {
        this.plugin.data.settings.maxLinkFactor = DEFAULT_SETTINGS.maxLinkFactor;
        await this.plugin.savePluginData();
        this.display();
      });
    });
    containerEl.createEl("h3", { text: `${t("LOGGING")}` });
    new import_obsidian2.Setting(containerEl).setName(t("DISPLAY_DEBUG_INFO")).addToggle(
      (toggle) => toggle.setValue(this.plugin.data.settings.showDebugMessages).onChange(async (value) => {
        this.plugin.data.settings.showDebugMessages = value;
        await this.plugin.savePluginData();
      })
    );
  }
};

// src/gui/flashcard-modal.tsx
var import_obsidian5 = require("obsidian");
var import_vhtml = __toESM(require_vhtml());

// src/scheduling.ts
function schedule(response, interval, ease, delayBeforeReview, settingsObj, dueDates) {
  delayBeforeReview = Math.max(0, Math.floor(delayBeforeReview / (24 * 3600 * 1e3)));
  if (response === 0 /* Easy */) {
    ease += 20;
    interval = (interval + delayBeforeReview) * ease / 100;
    interval *= settingsObj.easyBonus;
  } else if (response === 1 /* Good */) {
    interval = (interval + delayBeforeReview / 2) * ease / 100;
  } else if (response === 2 /* Hard */) {
    ease = Math.max(130, ease - 20);
    interval = Math.max(
      1,
      (interval + delayBeforeReview / 4) * settingsObj.lapsesIntervalChange
    );
  }
  if (dueDates !== void 0) {
    interval = Math.round(interval);
    if (!Object.prototype.hasOwnProperty.call(dueDates, interval)) {
      dueDates[interval] = 0;
    } else {
      if (interval > 4) {
        let fuzz = 0;
        if (interval < 7)
          fuzz = 1;
        else if (interval < 30)
          fuzz = Math.max(2, Math.floor(interval * 0.15));
        else
          fuzz = Math.max(4, Math.floor(interval * 0.05));
        const originalInterval = interval;
        outer:
          for (let i = 1; i <= fuzz; i++) {
            for (const ivl of [originalInterval - i, originalInterval + i]) {
              if (!Object.prototype.hasOwnProperty.call(dueDates, ivl)) {
                dueDates[ivl] = 0;
                interval = ivl;
                break outer;
              }
              if (dueDates[ivl] < dueDates[interval])
                interval = ivl;
            }
          }
      }
    }
    dueDates[interval]++;
  }
  interval = Math.min(interval, settingsObj.maximumInterval);
  return { interval: Math.round(interval * 10) / 10, ease };
}
function textInterval(interval, isMobile) {
  if (interval === void 0) {
    return t("NEW");
  }
  const m = Math.round(interval / 3.04375) / 10, y = Math.round(interval / 36.525) / 10;
  if (isMobile) {
    if (m < 1)
      return t("DAYS_STR_IVL_MOBILE", { interval });
    else if (y < 1)
      return t("MONTHS_STR_IVL_MOBILE", { interval: m });
    else
      return t("YEARS_STR_IVL_MOBILE", { interval: y });
  } else {
    if (m < 1)
      return t("DAYS_STR_IVL", { interval });
    else if (y < 1)
      return t("MONTHS_STR_IVL", { interval: m });
    else
      return t("YEARS_STR_IVL", { interval: y });
  }
}

// src/constants.ts
var SCHEDULING_INFO_REGEX = /^---\r?\n((?:.*\r?\n)*)sr-due: (.+)\r?\nsr-interval: (\d+)\r?\nsr-ease: (\d+)\r?\n((?:.*\r?\n)?)---/;
var YAML_FRONT_MATTER_REGEX = /^---\r?\n((?:.*\r?\n)*?)---/;
var MULTI_SCHEDULING_EXTRACTOR = /!([\d-]+),(\d+),(\d+)/gm;
var LEGACY_SCHEDULING_EXTRACTOR = /<!--SR:([\d-]+),(\d+),(\d+)-->/gm;
var OBSIDIAN_TAG_AT_STARTOFLINE_REGEX = /^#[^\s#]+/gi;
var PREFERRED_DATE_FORMAT = "YYYY-MM-DD";
var ALLOWED_DATE_FORMATS = [PREFERRED_DATE_FORMAT, "DD-MM-YYYY", "ddd MMM DD YYYY"];
var IMAGE_FORMATS = [
  "jpg",
  "jpeg",
  "gif",
  "png",
  "svg",
  "webp",
  "apng",
  "avif",
  "jfif",
  "pjpeg",
  "pjp",
  "bmp"
];
var AUDIO_FORMATS = ["mp3", "webm", "m4a", "wav", "ogg"];
var VIDEO_FORMATS = ["mp4", "mkv", "avi", "mov"];
var COLLAPSE_ICON = '<svg viewBox="0 0 100 100" width="8" height="8" class="right-triangle"><path fill="currentColor" stroke="currentColor" d="M94.9,20.8c-1.4-2.5-4.1-4.1-7.1-4.1H12.2c-3,0-5.7,1.6-7.1,4.1c-1.3,2.4-1.2,5.2,0.2,7.6L43.1,88c1.5,2.3,4,3.7,6.9,3.7 s5.4-1.4,6.9-3.7l37.8-59.6C96.1,26,96.2,23.2,94.9,20.8L94.9,20.8z"></path></svg>';
var TICKS_PER_DAY = 24 * 3600 * 1e3;
var SR_HTML_COMMENT_BEGIN = "<!--SR:";
var SR_HTML_COMMENT_END = "-->";

// src/TopicPath.ts
var TopicPath = class _TopicPath {
  constructor(path) {
    if (path == null)
      throw "null path";
    if (path.some((str) => str.includes("/")))
      throw "path entries must not contain '/'";
    this.path = path;
  }
  get hasPath() {
    return this.path.length > 0;
  }
  get isEmptyPath() {
    return !this.hasPath;
  }
  static get emptyPath() {
    return new _TopicPath([]);
  }
  shift() {
    if (this.isEmptyPath)
      throw "can't shift an empty path";
    return this.path.shift();
  }
  clone() {
    return new _TopicPath([...this.path]);
  }
  formatAsTag() {
    if (this.isEmptyPath)
      throw "Empty path";
    const result = "#" + this.path.join("/");
    return result;
  }
  static getTopicPathOfFile(noteFile, settings) {
    let deckPath = [];
    let result = _TopicPath.emptyPath;
    if (settings.convertFoldersToDecks) {
      deckPath = noteFile.path.split("/");
      deckPath.pop();
      if (deckPath.length != 0) {
        result = new _TopicPath(deckPath);
      }
    } else {
      const tagList = this.getTopicPathsFromTagList(noteFile.getAllTags());
      outer:
        for (const tagToReview of this.getTopicPathsFromTagList(
          settings.flashcardTags
        )) {
          for (const tag of tagList) {
            if (tagToReview.isSameOrAncestorOf(tag)) {
              result = tag;
              break outer;
            }
          }
        }
    }
    return result;
  }
  isSameOrAncestorOf(topicPath) {
    if (this.isEmptyPath)
      return topicPath.isEmptyPath;
    if (this.path.length > topicPath.path.length)
      return false;
    for (let i = 0; i < this.path.length; i++) {
      if (this.path[i] != topicPath.path[i])
        return false;
    }
    return true;
  }
  static getTopicPathFromCardText(cardText) {
    var _a;
    const path = (_a = cardText.trimStart().match(OBSIDIAN_TAG_AT_STARTOFLINE_REGEX)) == null ? void 0 : _a.slice(-1)[0];
    return (path == null ? void 0 : path.length) > 0 ? _TopicPath.getTopicPathFromTag(path) : null;
  }
  static getTopicPathsFromTagList(tagList) {
    const result = [];
    for (const tag of tagList) {
      if (this.isValidTag(tag))
        result.push(_TopicPath.getTopicPathFromTag(tag));
    }
    return result;
  }
  static isValidTag(tag) {
    if (tag == null || tag.length == 0)
      return false;
    if (tag[0] != "#")
      return false;
    if (tag.length == 1)
      return false;
    return true;
  }
  static getTopicPathFromTag(tag) {
    if (tag == null || tag.length == 0)
      throw "Null/empty tag";
    if (tag[0] != "#")
      throw "Tag must start with #";
    if (tag.length == 1)
      throw "Invalid tag";
    const path = tag.replace("#", "").split("/").filter((str) => str);
    return new _TopicPath(path);
  }
};
var TopicPathWithWs = class {
  constructor(topicPath, preWhitespace, postWhitespace) {
    if (!topicPath || topicPath.isEmptyPath)
      throw "topicPath null";
    this.topicPath = topicPath;
    this.preWhitespace = preWhitespace;
    this.postWhitespace = postWhitespace;
  }
  formatWithWs() {
    return `${this.preWhitespace}${this.topicPath.formatAsTag()}${this.postWhitespace}`;
  }
};

// src/FlashcardReviewSequencer.ts
var DeckStats = class {
  constructor(dueCount, newCount, totalCount) {
    this.dueCount = dueCount;
    this.newCount = newCount;
    this.totalCount = totalCount;
  }
};
var FlashcardReviewSequencer = class {
  constructor(reviewMode, cardSequencer, settings, cardScheduleCalculator, questionPostponementList) {
    this.reviewMode = reviewMode;
    this.cardSequencer = cardSequencer;
    this.settings = settings;
    this.cardScheduleCalculator = cardScheduleCalculator;
    this.questionPostponementList = questionPostponementList;
  }
  get hasCurrentCard() {
    return this.cardSequencer.currentCard != null;
  }
  get currentCard() {
    return this.cardSequencer.currentCard;
  }
  get currentQuestion() {
    var _a;
    return (_a = this.currentCard) == null ? void 0 : _a.question;
  }
  get currentDeck() {
    return this.cardSequencer.currentDeck;
  }
  get currentNote() {
    return this.currentQuestion.note;
  }
  setDeckTree(originalDeckTree, remainingDeckTree) {
    this._originalDeckTree = originalDeckTree;
    this.remainingDeckTree = remainingDeckTree;
    this.setCurrentDeck(TopicPath.emptyPath);
  }
  setCurrentDeck(topicPath) {
    const deck = this.remainingDeckTree.getDeck(topicPath);
    this.cardSequencer.setDeck(deck);
    this.cardSequencer.nextCard();
  }
  get originalDeckTree() {
    return this._originalDeckTree;
  }
  getDeckStats(topicPath) {
    const totalCount = this._originalDeckTree.getDeck(topicPath).getCardCount(2 /* All */, true);
    const remainingDeck = this.remainingDeckTree.getDeck(topicPath);
    const newCount = remainingDeck.getCardCount(0 /* NewCard */, true);
    const dueCount = remainingDeck.getCardCount(1 /* DueCard */, true);
    return new DeckStats(dueCount, newCount, totalCount);
  }
  skipCurrentCard() {
    this.cardSequencer.deleteCurrentQuestion();
  }
  deleteCurrentCard() {
    this.cardSequencer.deleteCurrentCard();
  }
  async processReview(response) {
    switch (this.reviewMode) {
      case 1 /* Review */:
        await this.processReview_ReviewMode(response);
        break;
      case 0 /* Cram */:
        await this.processReview_CramMode(response);
        break;
    }
  }
  async processReview_ReviewMode(response) {
    this.currentCard.scheduleInfo = this.determineCardSchedule(response, this.currentCard);
    await this.currentQuestion.writeQuestion(this.settings);
    if (response == 3 /* Reset */) {
      this.cardSequencer.moveCurrentCardToEndOfList();
      this.cardSequencer.nextCard();
    } else {
      if (this.settings.burySiblingCards) {
        await this.burySiblingCards();
        this.cardSequencer.deleteCurrentQuestion();
      } else {
        this.deleteCurrentCard();
      }
    }
  }
  async burySiblingCards() {
    const remaining = this.currentDeck.getQuestionCardCount(this.currentQuestion);
    if (remaining > 1) {
      this.questionPostponementList.add(this.currentQuestion);
      await this.questionPostponementList.write();
    }
  }
  async processReview_CramMode(response) {
    if (response == 0 /* Easy */)
      this.deleteCurrentCard();
    else {
      this.cardSequencer.moveCurrentCardToEndOfList();
      this.cardSequencer.nextCard();
    }
  }
  determineCardSchedule(response, card) {
    let result;
    if (response == 3 /* Reset */) {
      result = this.cardScheduleCalculator.getResetCardSchedule();
    } else {
      if (card.hasSchedule) {
        result = this.cardScheduleCalculator.calcUpdatedSchedule(
          response,
          card.scheduleInfo
        );
      } else {
        const currentNote = card.question.note;
        result = this.cardScheduleCalculator.getNewCardSchedule(
          response,
          currentNote.filePath
        );
      }
    }
    return result;
  }
  async updateCurrentQuestionText(text) {
    const q = this.currentQuestion.questionText;
    q.actualQuestion = text;
    await this.currentQuestion.writeQuestion(this.settings);
  }
};

// src/Deck.ts
var Deck2 = class _Deck {
  constructor(deckName, parent) {
    this.deckName = deckName;
    this.newFlashcards = [];
    this.dueFlashcards = [];
    this.subdecks = [];
    this.parent = parent;
  }
  getCardCount(cardListType, includeSubdeckCounts) {
    let result = 0;
    if (cardListType == 0 /* NewCard */ || cardListType == 2 /* All */)
      result += this.newFlashcards.length;
    if (cardListType == 1 /* DueCard */ || cardListType == 2 /* All */)
      result += this.dueFlashcards.length;
    if (includeSubdeckCounts) {
      for (const deck of this.subdecks) {
        result += deck.getCardCount(cardListType, includeSubdeckCounts);
      }
    }
    return result;
  }
  //
  // Returns a count of the number of this question's cards are present in this deck.
  // (The returned value would be <= question.cards.length)
  //
  getQuestionCardCount(question) {
    let result = 0;
    result += this.getQuestionCardCountForCardListType(question, this.newFlashcards);
    result += this.getQuestionCardCountForCardListType(question, this.dueFlashcards);
    return result;
  }
  getQuestionCardCountForCardListType(question, cards) {
    let result = 0;
    for (let i = 0; i < cards.length; i++) {
      if (Object.is(question, cards[i].question))
        result++;
    }
    return result;
  }
  static get emptyDeck() {
    return new _Deck("Root", null);
  }
  get isRootDeck() {
    return this.parent == null;
  }
  getDeck(topicPath) {
    return this._getOrCreateDeck(topicPath, false);
  }
  getOrCreateDeck(topicPath) {
    return this._getOrCreateDeck(topicPath, true);
  }
  _getOrCreateDeck(topicPath, createAllowed) {
    if (!topicPath.hasPath) {
      return this;
    }
    const t2 = topicPath.clone();
    const deckName = t2.shift();
    for (const subdeck of this.subdecks) {
      if (deckName === subdeck.deckName) {
        return subdeck._getOrCreateDeck(t2, createAllowed);
      }
    }
    let result = null;
    if (createAllowed) {
      const subdeck = new _Deck(
        deckName,
        this
        /* parent */
      );
      this.subdecks.push(subdeck);
      result = subdeck._getOrCreateDeck(t2, createAllowed);
    }
    return result;
  }
  getTopicPath() {
    const list = [];
    let deck = this;
    while (!deck.isRootDeck) {
      list.push(deck.deckName);
      deck = deck.parent;
    }
    return new TopicPath(list.reverse());
  }
  getRootDeck() {
    let deck = this;
    while (!deck.isRootDeck) {
      deck = deck.parent;
    }
    return deck;
  }
  getCard(index, cardListType) {
    const cardList = this.getCardListForCardType(cardListType);
    return cardList[index];
  }
  getCardListForCardType(cardListType) {
    return cardListType == 1 /* DueCard */ ? this.dueFlashcards : this.newFlashcards;
  }
  appendCard(topicPath, cardObj) {
    const deck = this.getOrCreateDeck(topicPath);
    const cardList = deck.getCardListForCardType(cardObj.cardListType);
    cardList.push(cardObj);
  }
  deleteCard(card) {
    const cardList = this.getCardListForCardType(card.cardListType);
    const idx = cardList.indexOf(card);
    if (idx != -1)
      cardList.splice(idx, 1);
  }
  deleteCardAtIndex(index, cardListType) {
    const cardList = this.getCardListForCardType(cardListType);
    cardList.splice(index, 1);
  }
  toDeckArray() {
    const result = [];
    result.push(this);
    for (const subdeck of this.subdecks) {
      result.push(...subdeck.toDeckArray());
    }
    return result;
  }
  sortSubdecksList() {
    this.subdecks.sort((a, b) => {
      if (a.deckName < b.deckName) {
        return -1;
      } else if (a.deckName > b.deckName) {
        return 1;
      }
      return 0;
    });
    for (const deck of this.subdecks) {
      deck.sortSubdecksList();
    }
  }
  debugLogToConsole(desc = null) {
    let str = desc != null ? `${desc}: ` : "";
    console.log(str += this.toString());
  }
  toString(indent = 0) {
    let result = "";
    let indentStr = " ".repeat(indent * 4);
    result += `${indentStr}${this.deckName}\r
`;
    indentStr += "  ";
    for (let i = 0; i < this.newFlashcards.length; i++) {
      const card = this.newFlashcards[i];
      result += `${indentStr}New: ${i}: ${card.front}::${card.back}\r
`;
    }
    for (let i = 0; i < this.dueFlashcards.length; i++) {
      const card = this.dueFlashcards[i];
      const s = card.isDue ? "Due" : "Not due";
      result += `${indentStr}${s}: ${i}: ${card.front}::${card.back}\r
`;
    }
    for (const subdeck of this.subdecks) {
      result += subdeck.toString(indent + 1);
    }
    return result;
  }
  clone() {
    return this.copyWithCardFilter(() => true);
  }
  copyWithCardFilter(predicate, parent = null) {
    const result = new _Deck(this.deckName, parent);
    result.newFlashcards = [...this.newFlashcards.filter((card) => predicate(card))];
    result.dueFlashcards = [...this.dueFlashcards.filter((card) => predicate(card))];
    for (const s of this.subdecks) {
      const newParent = result;
      const newDeck = s.copyWithCardFilter(predicate, newParent);
      result.subdecks.push(newDeck);
    }
    return result;
  }
  static otherListType(cardListType) {
    let result;
    if (cardListType == 0 /* NewCard */)
      result = 1 /* DueCard */;
    else if (cardListType == 1 /* DueCard */)
      result = 0 /* NewCard */;
    else
      throw "Invalid cardListType";
    return result;
  }
};
var DeckTreeFilter = class {
  static filterForReviewableCards(reviewableDeckTree) {
    return reviewableDeckTree.copyWithCardFilter((card) => !card.question.hasEditLaterTag);
  }
  static filterForRemainingCards(questionPostponementList, deckTree, reviewMode) {
    return deckTree.copyWithCardFilter(
      (card) => (reviewMode == 0 /* Cram */ || card.isNew || card.isDue) && !questionPostponementList.includes(card.question)
    );
  }
};

// src/util/utils.ts
var import_moment = __toESM(require_moment());
function getTypedObjectEntries(obj) {
  return Object.entries(obj);
}
var getKeysPreserveType = Object.keys;
function literalStringReplace(text, searchStr, replacementStr) {
  let result = text;
  const startIdx = text.indexOf(searchStr);
  if (startIdx >= 0) {
    const startStr = text.substring(0, startIdx);
    const endIdx = startIdx + searchStr.length;
    const endStr = text.substring(endIdx);
    result = startStr + replacementStr + endStr;
  }
  return result;
}
function cyrb53(str, seed = 0) {
  let h12 = 3735928559 ^ seed, h22 = 1103547991 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h12 = Math.imul(h12 ^ ch, 2654435761);
    h22 = Math.imul(h22 ^ ch, 1597334677);
  }
  h12 = Math.imul(h12 ^ h12 >>> 16, 2246822507) ^ Math.imul(h22 ^ h22 >>> 13, 3266489909);
  h22 = Math.imul(h22 ^ h22 >>> 16, 2246822507) ^ Math.imul(h12 ^ h12 >>> 13, 3266489909);
  return (4294967296 * (2097151 & h22) + (h12 >>> 0)).toString(16);
}
function formatDate_YYYY_MM_DD(ticks) {
  return ticks.format(PREFERRED_DATE_FORMAT);
}
function splitTextIntoLineArray(text) {
  return text.replaceAll("\r\n", "\n").split("\n");
}
function stringTrimStart(str) {
  const trimmed = str.trimStart();
  const wsCount = str.length - trimmed.length;
  const ws = str.substring(0, wsCount);
  return [ws, trimmed];
}

// src/util/DateProvider.ts
var import_moment2 = __toESM(require_moment());
var LiveDateProvider = class {
  get today() {
    return (0, import_moment2.default)().startOf("day");
  }
};
var DateUtil = class {
  static dateStrToMoment(str) {
    return (0, import_moment2.default)(str, ALLOWED_DATE_FORMATS);
  }
};
var globalDateProvider = new LiveDateProvider();

// src/CardSchedule.ts
var _CardScheduleInfo = class _CardScheduleInfo {
  constructor(dueDate, interval, ease, delayBeforeReviewTicks) {
    this.dueDate = dueDate;
    this.interval = interval;
    this.ease = ease;
    this.delayBeforeReviewTicks = delayBeforeReviewTicks;
  }
  get delayBeforeReviewDaysInt() {
    return Math.ceil(this.delayBeforeReviewTicks / TICKS_PER_DAY);
  }
  isDue() {
    return this.dueDate.isSameOrBefore(globalDateProvider.today);
  }
  isDummyScheduleForNewCard() {
    return this.formatDueDate() == _CardScheduleInfo.dummyDueDateForNewCard;
  }
  static getDummyScheduleForNewCard(settings) {
    return _CardScheduleInfo.fromDueDateStr(
      _CardScheduleInfo.dummyDueDateForNewCard,
      _CardScheduleInfo.initialInterval,
      settings.baseEase,
      0
    );
  }
  static fromDueDateStr(dueDateStr, interval, ease, delayBeforeReviewTicks) {
    const dueDateTicks = DateUtil.dateStrToMoment(dueDateStr);
    return new _CardScheduleInfo(dueDateTicks, interval, ease, delayBeforeReviewTicks);
  }
  static fromDueDateMoment(dueDateTicks, interval, ease, delayBeforeReviewTicks) {
    return new _CardScheduleInfo(dueDateTicks, interval, ease, delayBeforeReviewTicks);
  }
  static get initialInterval() {
    return 1;
  }
  formatDueDate() {
    return formatDate_YYYY_MM_DD(this.dueDate);
  }
  formatSchedule() {
    return `!${this.formatDueDate()},${this.interval},${this.ease}`;
  }
};
// A question can have multiple cards. The schedule info for all sibling cards are formatted together
// in a single <!--SR: --> comment, such as:
// <!--SR:!2023-09-02,4,270!2023-09-02,5,270!2023-09-02,6,270!2023-09-02,7,270-->
//
// However, not all sibling cards may have been reviewed. Therefore we need a method of indicating that a particular card
// has not been reviewed, and should be considered "new"
// This is done by using this magic value for the date
_CardScheduleInfo.dummyDueDateForNewCard = "2000-01-01";
var CardScheduleInfo = _CardScheduleInfo;
var CardScheduleCalculator = class {
  // Record<# of days in future, due count>
  constructor(settings, noteEaseList) {
    this.dueDatesFlashcards = {};
    this.settings = settings;
    this.noteEaseList = noteEaseList;
  }
  getResetCardSchedule() {
    const interval = CardScheduleInfo.initialInterval;
    const ease = this.settings.baseEase;
    const dueDate = globalDateProvider.today.add(interval, "d");
    const delayBeforeReview = 0;
    return CardScheduleInfo.fromDueDateMoment(dueDate, interval, ease, delayBeforeReview);
  }
  getNewCardSchedule(response, notePath) {
    let initial_ease = this.settings.baseEase;
    if (this.noteEaseList.hasEaseForPath(notePath)) {
      initial_ease = Math.round(this.noteEaseList.getEaseByPath(notePath));
    }
    const delayBeforeReview = 0;
    const schedObj = schedule(
      response,
      CardScheduleInfo.initialInterval,
      initial_ease,
      delayBeforeReview,
      this.settings,
      this.dueDatesFlashcards
    );
    const interval = schedObj.interval;
    const ease = schedObj.ease;
    const dueDate = globalDateProvider.today.add(interval, "d");
    return CardScheduleInfo.fromDueDateMoment(dueDate, interval, ease, delayBeforeReview);
  }
  calcUpdatedSchedule(response, cardSchedule) {
    const schedObj = schedule(
      response,
      cardSchedule.interval,
      cardSchedule.ease,
      cardSchedule.delayBeforeReviewTicks,
      this.settings,
      this.dueDatesFlashcards
    );
    const interval = schedObj.interval;
    const ease = schedObj.ease;
    const dueDate = globalDateProvider.today.add(interval, "d");
    const delayBeforeReview = 0;
    return CardScheduleInfo.fromDueDateMoment(dueDate, interval, ease, delayBeforeReview);
  }
};
var NoteCardScheduleParser = class {
  static createCardScheduleInfoList(questionText) {
    let scheduling = [...questionText.matchAll(MULTI_SCHEDULING_EXTRACTOR)];
    if (scheduling.length === 0)
      scheduling = [...questionText.matchAll(LEGACY_SCHEDULING_EXTRACTOR)];
    const result = [];
    for (let i = 0; i < scheduling.length; i++) {
      const match = scheduling[i];
      const dueDateStr = match[1];
      const interval = parseInt(match[2]);
      const ease = parseInt(match[3]);
      const dueDate = DateUtil.dateStrToMoment(dueDateStr);
      const delayBeforeReviewTicks = dueDate.valueOf() - globalDateProvider.today.valueOf();
      const info = new CardScheduleInfo(
        dueDate,
        interval,
        ease,
        delayBeforeReviewTicks
      );
      result.push(info);
    }
    return result;
  }
  static removeCardScheduleInfo(questionText) {
    return questionText.replace(/<!--SR:.+-->/gm, "");
  }
};

// src/util/MultiLineTextFinder.ts
var MultiLineTextFinder = class _MultiLineTextFinder {
  static findAndReplace(sourceText, searchText, replacementText) {
    let result = null;
    if (sourceText.includes(searchText)) {
      result = literalStringReplace(sourceText, searchText, replacementText);
    } else {
      const sourceTextArray = splitTextIntoLineArray(sourceText);
      const searchTextArray = splitTextIntoLineArray(searchText);
      const lineNo = _MultiLineTextFinder.find(sourceTextArray, searchTextArray);
      if (lineNo) {
        const replacementTextArray = splitTextIntoLineArray(replacementText);
        const linesToRemove = searchTextArray.length;
        sourceTextArray.splice(lineNo, linesToRemove, ...replacementTextArray);
        result = sourceTextArray.join("\n");
      }
    }
    return result;
  }
  static find(sourceText, searchText) {
    let result = null;
    let searchIdx = 0;
    const maxSearchIdx = searchText.length - 1;
    for (let sourceIdx = 0; sourceIdx < sourceText.length; sourceIdx++) {
      const sourceLine = sourceText[sourceIdx].trim();
      const searchLine = searchText[searchIdx].trim();
      if (searchLine == sourceLine) {
        if (searchIdx == maxSearchIdx) {
          result = sourceIdx - searchIdx;
          break;
        }
        searchIdx++;
      } else {
        searchIdx = 0;
      }
    }
    return result;
  }
};

// src/Question.ts
var QuestionText = class _QuestionText {
  constructor(original, topicPathWithWs, actualQuestion) {
    this.original = original;
    this.topicPathWithWs = topicPathWithWs;
    this.actualQuestion = actualQuestion;
    this.textHash = cyrb53(this.formatForNote());
  }
  endsWithCodeBlock() {
    return this.actualQuestion.endsWith("```");
  }
  static create(original, settings) {
    const [topicPathWithWs, actualQuestion] = this.splitText(original, settings);
    return new _QuestionText(original, topicPathWithWs, actualQuestion);
  }
  static splitText(original, settings) {
    const originalWithoutSR = NoteCardScheduleParser.removeCardScheduleInfo(original);
    let actualQuestion = originalWithoutSR.trimEnd();
    let topicPathWithWs = null;
    if (!settings.convertFoldersToDecks) {
      const topicPath = TopicPath.getTopicPathFromCardText(originalWithoutSR);
      if (topicPath == null ? void 0 : topicPath.hasPath) {
        const [preTopicPathWs, cardText1] = stringTrimStart(originalWithoutSR);
        const actualQuestionWithWs = cardText1.replaceAll(
          OBSIDIAN_TAG_AT_STARTOFLINE_REGEX,
          ""
        );
        let postTopicPathWs;
        [postTopicPathWs, actualQuestion] = stringTrimStart(actualQuestionWithWs);
        topicPathWithWs = new TopicPathWithWs(topicPath, preTopicPathWs, postTopicPathWs);
      }
    }
    return [topicPathWithWs, actualQuestion];
  }
  formatForNote() {
    let result = "";
    if (this.topicPathWithWs) {
      result += this.topicPathWithWs.formatWithWs();
    }
    result += this.actualQuestion;
    return result;
  }
};
var Question = class _Question {
  constructor(init) {
    Object.assign(this, init);
  }
  getHtmlCommentSeparator(settings) {
    let sep = settings.cardCommentOnSameLine ? " " : "\n";
    if (this.questionText.endsWithCodeBlock() && sep !== "\n") {
      sep = "\n";
    }
    return sep;
  }
  setCardList(cards) {
    this.cards = cards;
    this.cards.forEach((card) => card.question = this);
  }
  formatScheduleAsHtmlComment(settings) {
    let result = SR_HTML_COMMENT_BEGIN;
    for (let i = 0; i < this.cards.length; i++) {
      const card = this.cards[i];
      const schedule2 = card.hasSchedule ? card.scheduleInfo : CardScheduleInfo.getDummyScheduleForNewCard(settings);
      result += schedule2.formatSchedule();
    }
    result += SR_HTML_COMMENT_END;
    return result;
  }
  formatForNote(settings) {
    let result = this.questionText.formatForNote();
    if (this.cards.some((card) => card.hasSchedule)) {
      result = result.trimEnd() + this.getHtmlCommentSeparator(settings) + this.formatScheduleAsHtmlComment(settings);
    }
    return result;
  }
  updateQuestionText(noteText, settings) {
    const originalText = this.questionText.original;
    const replacementText = this.formatForNote(settings);
    let newText = MultiLineTextFinder.findAndReplace(noteText, originalText, replacementText);
    if (newText) {
      this.questionText = QuestionText.create(replacementText, settings);
    } else {
      console.error(
        `updateQuestionText: Text not found: ${originalText.substring(
          0,
          100
        )} in note: ${noteText.substring(0, 100)}`
      );
      newText = noteText;
    }
    return newText;
  }
  async writeQuestion(settings) {
    const fileText = await this.note.file.read();
    const newText = this.updateQuestionText(fileText, settings);
    await this.note.file.write(newText);
    this.hasChanged = false;
  }
  static Create(settings, questionType, noteTopicPath, originalText, lineNo, context) {
    const hasEditLaterTag = originalText.includes(settings.editLaterTag);
    const questionText = QuestionText.create(originalText, settings);
    let topicPath = noteTopicPath;
    if (questionText.topicPathWithWs) {
      topicPath = questionText.topicPathWithWs.topicPath;
    }
    const result = new _Question({
      questionType,
      topicPath,
      questionText,
      lineNo,
      hasEditLaterTag,
      questionContext: context,
      cards: null,
      hasChanged: false
    });
    return result;
  }
};

// src/gui/flashcards-edit-modal.ts
var import_obsidian3 = require("obsidian");
var FlashcardEditModal = class _FlashcardEditModal extends import_obsidian3.Modal {
  constructor(app2, existingText) {
    super(app2);
    this.didSubmit = false;
    this.submitClickCallback = (_) => this.submit();
    this.cancelClickCallback = (_) => this.cancel();
    this.submitEnterCallback = (evt) => {
      if ((evt.ctrlKey || evt.metaKey) && evt.key === "Enter") {
        evt.preventDefault();
        this.submit();
      }
    };
    this.titleEl.setText(t("EDIT_CARD"));
    this.titleEl.addClass("sr-centered");
    this.modalText = existingText;
    this.input = existingText;
    this.waitForClose = new Promise((resolve2, reject) => {
      this.resolvePromise = resolve2;
      this.rejectPromise = reject;
    });
    this.display();
    this.open();
  }
  static Prompt(app2, placeholder) {
    const newPromptModal = new _FlashcardEditModal(app2, placeholder);
    return newPromptModal.waitForClose;
  }
  display() {
    this.contentEl.empty();
    this.modalEl.addClass("sr-flashcard-input-modal");
    const mainContentContainer = this.contentEl.createDiv();
    mainContentContainer.addClass("sr-flashcard-input-area");
    this.inputComponent = this.createInputField(mainContentContainer, this.modalText);
    this.createButtonBar(mainContentContainer);
  }
  createButton(container, text, callback2) {
    const btn = new import_obsidian3.ButtonComponent(container);
    btn.setButtonText(text).onClick(callback2);
    return btn;
  }
  createButtonBar(mainContentContainer) {
    const buttonBarContainer = mainContentContainer.createDiv();
    buttonBarContainer.addClass("sr-flashcard-edit-button-bar");
    this.createButton(
      buttonBarContainer,
      t("SAVE"),
      this.submitClickCallback
    ).setCta().buttonEl.style.marginRight = "0";
    this.createButton(buttonBarContainer, t("CANCEL"), this.cancelClickCallback);
  }
  createInputField(container, value) {
    const textComponent = new import_obsidian3.TextAreaComponent(container);
    textComponent.inputEl.style.width = "100%";
    textComponent.setValue(value != null ? value : "").inputEl.addEventListener("keydown", this.submitEnterCallback);
    return textComponent;
  }
  submit() {
    this.didSubmit = true;
    this.input = this.inputComponent.getValue();
    this.close();
  }
  cancel() {
    this.close();
  }
  onOpen() {
    super.onOpen();
    this.inputComponent.inputEl.focus();
  }
  onClose() {
    super.onClose();
    this.resolveInput();
    this.removeInputListener();
  }
  resolveInput() {
    if (!this.didSubmit)
      this.rejectPromise(t("NO_INPUT"));
    else
      this.resolvePromise(this.input);
  }
  removeInputListener() {
    this.inputComponent.inputEl.removeEventListener("keydown", this.submitEnterCallback);
  }
};

// src/util/RenderMarkdownWrapper.ts
var import_obsidian4 = require("obsidian");
var RenderMarkdownWrapper = class {
  constructor(app2, plugin, notePath) {
    this.app = app2;
    this.notePath = notePath;
    this.plugin = plugin;
  }
  // slightly modified version of the renderMarkdown function in
  // https://github.com/mgmeyers/obsidian-kanban/blob/main/src/KanbanView.tsx
  async renderMarkdownWrapper(markdownString, containerEl, recursiveDepth = 0) {
    if (recursiveDepth > 4)
      return;
    import_obsidian4.MarkdownRenderer.renderMarkdown(markdownString, containerEl, this.notePath, this.plugin);
    containerEl.findAll(".internal-embed").forEach((el) => {
      const link2 = this.parseLink(el.getAttribute("src"));
      if (!link2.target) {
        el.innerText = link2.text;
      } else if (link2.target instanceof import_obsidian4.TFile) {
        if (link2.target.extension !== "md") {
          this.embedMediaFile(el, link2.target);
        } else {
          el.innerText = "";
          this.renderTransclude(el, link2, recursiveDepth);
        }
      }
    });
  }
  parseLink(src) {
    const linkComponentsRegex = /^(?<file>[^#^]+)?(?:#(?!\^)(?<heading>.+)|#\^(?<blockId>.+)|#)?$/;
    const matched = typeof src === "string" && src.match(linkComponentsRegex);
    const file = matched.groups.file || this.notePath;
    const target = this.plugin.app.metadataCache.getFirstLinkpathDest(file, this.notePath);
    return {
      text: matched[0],
      file: matched.groups.file,
      heading: matched.groups.heading,
      blockId: matched.groups.blockId,
      target
    };
  }
  embedMediaFile(el, target) {
    el.innerText = "";
    if (IMAGE_FORMATS.includes(target.extension)) {
      el.createEl(
        "img",
        {
          attr: {
            src: this.plugin.app.vault.getResourcePath(target)
          }
        },
        (img) => {
          if (el.hasAttribute("width"))
            img.setAttribute("width", el.getAttribute("width"));
          else
            img.setAttribute("width", "100%");
          if (el.hasAttribute("alt"))
            img.setAttribute("alt", el.getAttribute("alt"));
          el.addEventListener(
            "click",
            (ev) => ev.target.style.minWidth = ev.target.style.minWidth === "100%" ? null : "100%"
          );
        }
      );
      el.addClasses(["image-embed", "is-loaded"]);
    } else if (AUDIO_FORMATS.includes(target.extension) || VIDEO_FORMATS.includes(target.extension)) {
      el.createEl(
        AUDIO_FORMATS.includes(target.extension) ? "audio" : "video",
        {
          attr: {
            controls: "",
            src: this.plugin.app.vault.getResourcePath(target)
          }
        },
        (audio) => {
          if (el.hasAttribute("alt"))
            audio.setAttribute("alt", el.getAttribute("alt"));
        }
      );
      el.addClasses(["media-embed", "is-loaded"]);
    } else {
      el.innerText = target.path;
    }
  }
  async renderTransclude(el, link2, recursiveDepth) {
    var _a, _b, _c, _d;
    const cache = this.app.metadataCache.getCache(link2.target.path);
    const text = await this.app.vault.cachedRead(link2.target);
    let blockText;
    if (link2.heading) {
      const clean = (s) => s.replace(/[\W\s]/g, "");
      const headingIndex = (_a = cache.headings) == null ? void 0 : _a.findIndex(
        (h4) => clean(h4.heading) === clean(link2.heading)
      );
      const heading = cache.headings[headingIndex];
      const startAt = heading.position.start.offset;
      const endAt = ((_d = (_c = (_b = cache.headings.slice(headingIndex + 1).find((h4) => h4.level <= heading.level)) == null ? void 0 : _b.position) == null ? void 0 : _c.start) == null ? void 0 : _d.offset) || text.length;
      blockText = text.substring(startAt, endAt);
    } else if (link2.blockId) {
      const block = cache.blocks[link2.blockId];
      const startAt = block.position.start.offset;
      const endAt = block.position.end.offset;
      blockText = text.substring(startAt, endAt);
    } else {
      blockText = text;
    }
    this.renderMarkdownWrapper(blockText, el, recursiveDepth + 1);
  }
};

// src/gui/flashcard-modal.tsx
var FlashcardModal = class extends import_obsidian5.Modal {
  get currentCard() {
    return this.reviewSequencer.currentCard;
  }
  get currentQuestion() {
    return this.reviewSequencer.currentQuestion;
  }
  get currentNote() {
    return this.reviewSequencer.currentNote;
  }
  constructor(app2, plugin, settings, reviewSequencer, reviewMode) {
    super(app2);
    this.plugin = plugin;
    this.settings = settings;
    this.reviewSequencer = reviewSequencer;
    this.reviewMode = reviewMode;
    this.titleEl.setText(t("DECKS"));
    this.titleEl.addClass("sr-centered");
    if (import_obsidian5.Platform.isMobile) {
      this.contentEl.style.display = "block";
    }
    this.modalEl.style.height = this.settings.flashcardHeightPercentage + "%";
    this.modalEl.style.width = this.settings.flashcardWidthPercentage + "%";
    this.contentEl.style.position = "relative";
    this.contentEl.style.height = "92%";
    this.contentEl.addClass("sr-modal-content");
    document.body.onkeydown = (e) => {
      if (document.activeElement.nodeName !== "TEXTAREA" && this.mode !== 0 /* DecksList */) {
        const consume = () => {
          e.preventDefault();
          e.stopPropagation();
        };
        if (this.mode !== 3 /* Closed */ && e.code === "KeyS") {
          this.skipCurrentCard();
          consume();
        } else if (this.mode === 1 /* Front */ && (e.code === "Space" || e.code === "Enter" || e.code === "NumpadEnter")) {
          this.showAnswer();
          consume();
        } else if (this.mode === 2 /* Back */) {
          if (e.code === "Numpad1" || e.code === "Digit1") {
            this.processReview(2 /* Hard */);
            consume();
          } else if (e.code === "Numpad2" || e.code === "Digit2" || e.code === "Space") {
            this.processReview(1 /* Good */);
            consume();
          } else if (e.code === "Numpad3" || e.code === "Digit3") {
            this.processReview(0 /* Easy */);
            consume();
          } else if (e.code === "Numpad0" || e.code === "Digit0") {
            this.processReview(3 /* Reset */);
            consume();
          }
        }
      }
    };
  }
  onOpen() {
    this.renderDecksList();
  }
  onClose() {
    this.mode = 3 /* Closed */;
  }
  renderDecksList() {
    this.mode = 0 /* DecksList */;
    const stats = this.reviewSequencer.getDeckStats(TopicPath.emptyPath);
    this.titleEl.setText(t("DECKS"));
    this.titleEl.innerHTML += /* @__PURE__ */ (0, import_vhtml.default)("p", { style: "margin:0px;line-height:12px;" }, /* @__PURE__ */ (0, import_vhtml.default)(
      "span",
      {
        style: "background-color:#4caf50;color:#ffffff;",
        "aria-label": t("DUE_CARDS"),
        class: "tag-pane-tag-count tree-item-flair sr-deck-counts"
      },
      stats.dueCount.toString()
    ), /* @__PURE__ */ (0, import_vhtml.default)(
      "span",
      {
        style: "background-color:#2196f3;",
        "aria-label": t("NEW_CARDS"),
        class: "tag-pane-tag-count tree-item-flair sr-deck-counts"
      },
      stats.newCount.toString()
    ), /* @__PURE__ */ (0, import_vhtml.default)(
      "span",
      {
        style: "background-color:#ff7043;",
        "aria-label": t("TOTAL_CARDS"),
        class: "tag-pane-tag-count tree-item-flair sr-deck-counts"
      },
      stats.totalCount.toString()
    ));
    this.contentEl.empty();
    this.contentEl.setAttribute("id", "sr-flashcard-view");
    for (const deck of this.reviewSequencer.originalDeckTree.subdecks) {
      this.renderDeck(deck, this.contentEl, this);
    }
  }
  renderDeck(deck, containerEl, modal) {
    const deckView = containerEl.createDiv("tree-item");
    const deckViewSelf = deckView.createDiv(
      "tree-item-self tag-pane-tag is-clickable"
    );
    const shouldBeInitiallyExpanded = modal.settings.initiallyExpandAllSubdecksInTree;
    let collapsed = !shouldBeInitiallyExpanded;
    let collapseIconEl = null;
    if (deck.subdecks.length > 0) {
      collapseIconEl = deckViewSelf.createDiv("tree-item-icon collapse-icon");
      collapseIconEl.innerHTML = COLLAPSE_ICON;
      collapseIconEl.childNodes[0].style.transform = collapsed ? "rotate(-90deg)" : "";
    }
    const deckViewInner = deckViewSelf.createDiv("tree-item-inner");
    const deckViewInnerText = deckViewInner.createDiv("tag-pane-tag-text");
    deckViewInnerText.innerHTML += /* @__PURE__ */ (0, import_vhtml.default)("span", { class: "tag-pane-tag-self" }, deck.deckName);
    const deckViewOuter = deckViewSelf.createDiv("tree-item-flair-outer");
    const deckStats = this.reviewSequencer.getDeckStats(deck.getTopicPath());
    deckViewOuter.innerHTML += /* @__PURE__ */ (0, import_vhtml.default)("span", null, /* @__PURE__ */ (0, import_vhtml.default)(
      "span",
      {
        style: "background-color:#4caf50;",
        class: "tag-pane-tag-count tree-item-flair sr-deck-counts"
      },
      deckStats.dueCount.toString()
    ), /* @__PURE__ */ (0, import_vhtml.default)(
      "span",
      {
        style: "background-color:#2196f3;",
        class: "tag-pane-tag-count tree-item-flair sr-deck-counts"
      },
      deckStats.newCount.toString()
    ), /* @__PURE__ */ (0, import_vhtml.default)(
      "span",
      {
        style: "background-color:#ff7043;",
        class: "tag-pane-tag-count tree-item-flair sr-deck-counts"
      },
      deckStats.totalCount.toString()
    ));
    const deckViewChildren = deckView.createDiv("tree-item-children");
    deckViewChildren.style.display = collapsed ? "none" : "block";
    if (deck.subdecks.length > 0) {
      collapseIconEl.addEventListener("click", (e) => {
        if (collapsed) {
          collapseIconEl.childNodes[0].style.transform = "";
          deckViewChildren.style.display = "block";
        } else {
          collapseIconEl.childNodes[0].style.transform = "rotate(-90deg)";
          deckViewChildren.style.display = "none";
        }
        e.stopPropagation();
        collapsed = !collapsed;
      });
    }
    deckViewSelf.addEventListener("click", () => {
      this.startReviewOfDeck(deck);
    });
    for (const subdeck of deck.subdecks) {
      this.renderDeck(subdeck, deckViewChildren, modal);
    }
  }
  startReviewOfDeck(deck) {
    this.reviewSequencer.setCurrentDeck(deck.getTopicPath());
    if (this.reviewSequencer.hasCurrentCard) {
      this.setupCardsView();
      this.showCurrentCard();
    } else
      this.renderDecksList();
  }
  setupCardsView() {
    this.contentEl.empty();
    this.flashCardMenu = this.contentEl.createDiv("sr-flashcard-menu");
    this.createBackButton();
    this.createEditButton();
    this.createResetButton();
    this.createCardInfoButton();
    this.createSkipButton();
    if (this.settings.showContextInCards) {
      this.contextView = this.contentEl.createDiv();
      this.contextView.setAttribute("id", "sr-context");
    }
    this.flashcardView = this.contentEl.createDiv("div");
    this.flashcardView.setAttribute("id", "sr-flashcard-view");
    this.createResponseButtons();
    this.createShowAnswerButton();
    if (this.reviewMode == 0 /* Cram */) {
      this.goodBtn.style.display = "none";
      this.responseDiv.addClass("sr-ignorestats-response");
      this.easyBtn.addClass("sr-ignorestats-btn");
      this.hardBtn.addClass("sr-ignorestats-btn");
    }
  }
  createShowAnswerButton() {
    this.answerBtn = this.contentEl.createDiv();
    this.answerBtn.setAttribute("id", "sr-show-answer");
    this.answerBtn.setText(t("SHOW_ANSWER"));
    this.answerBtn.addEventListener("click", () => {
      this.showAnswer();
    });
  }
  createResponseButtons() {
    this.responseDiv = this.contentEl.createDiv("sr-flashcard-response");
    this.hardBtn = document.createElement("button");
    this.hardBtn.setAttribute("id", "sr-hard-btn");
    this.hardBtn.setText(this.settings.flashcardHardText);
    this.hardBtn.addEventListener("click", () => {
      this.processReview(2 /* Hard */);
    });
    this.responseDiv.appendChild(this.hardBtn);
    this.goodBtn = document.createElement("button");
    this.goodBtn.setAttribute("id", "sr-good-btn");
    this.goodBtn.setText(this.settings.flashcardGoodText);
    this.goodBtn.addEventListener("click", () => {
      this.processReview(1 /* Good */);
    });
    this.responseDiv.appendChild(this.goodBtn);
    this.easyBtn = document.createElement("button");
    this.easyBtn.setAttribute("id", "sr-easy-btn");
    this.easyBtn.setText(this.settings.flashcardEasyText);
    this.easyBtn.addEventListener("click", () => {
      this.processReview(0 /* Easy */);
    });
    this.responseDiv.appendChild(this.easyBtn);
    this.responseDiv.style.display = "none";
  }
  createSkipButton() {
    const skipButton = this.flashCardMenu.createEl("button");
    skipButton.addClass("sr-flashcard-menu-item");
    (0, import_obsidian5.setIcon)(skipButton, "chevrons-right");
    skipButton.setAttribute("aria-label", t("SKIP"));
    skipButton.addEventListener("click", () => {
      this.skipCurrentCard();
    });
  }
  createCardInfoButton() {
    const cardInfo = this.flashCardMenu.createEl("button");
    cardInfo.addClass("sr-flashcard-menu-item");
    (0, import_obsidian5.setIcon)(cardInfo, "info");
    cardInfo.setAttribute("aria-label", "View Card Info");
    cardInfo.addEventListener("click", async () => {
      this.displayCurrentCardInfoNotice();
    });
  }
  displayCurrentCardInfoNotice() {
    var _a;
    const schedule2 = this.currentCard.scheduleInfo;
    const currentEaseStr = t("CURRENT_EASE_HELP_TEXT") + ((_a = schedule2 == null ? void 0 : schedule2.ease) != null ? _a : t("NEW"));
    const currentIntervalStr = t("CURRENT_INTERVAL_HELP_TEXT") + textInterval(schedule2 == null ? void 0 : schedule2.interval, false);
    const generatedFromStr = t("CARD_GENERATED_FROM", {
      notePath: this.currentQuestion.note.filePath
    });
    new import_obsidian5.Notice(currentEaseStr + "\n" + currentIntervalStr + "\n" + generatedFromStr);
  }
  createBackButton() {
    const backButton = this.flashCardMenu.createEl("button");
    backButton.addClass("sr-flashcard-menu-item");
    (0, import_obsidian5.setIcon)(backButton, "arrow-left");
    backButton.setAttribute("aria-label", t("BACK"));
    backButton.addEventListener("click", () => {
      this.renderDecksList();
    });
  }
  createResetButton() {
    this.resetButton = this.flashCardMenu.createEl("button");
    this.resetButton.addClass("sr-flashcard-menu-item");
    (0, import_obsidian5.setIcon)(this.resetButton, "refresh-cw");
    this.resetButton.setAttribute("aria-label", t("RESET_CARD_PROGRESS"));
    this.resetButton.addEventListener("click", () => {
      this.processReview(3 /* Reset */);
    });
  }
  createEditButton() {
    this.editButton = this.flashCardMenu.createEl("button");
    this.editButton.addClass("sr-flashcard-menu-item");
    (0, import_obsidian5.setIcon)(this.editButton, "edit");
    this.editButton.setAttribute("aria-label", t("EDIT_CARD"));
    this.editButton.addEventListener("click", async () => {
      this.doEditQuestionText();
    });
  }
  async doEditQuestionText() {
    const currentQ = this.reviewSequencer.currentQuestion;
    const textPrompt = currentQ.questionText.actualQuestion;
    const editModal = FlashcardEditModal.Prompt(this.app, textPrompt);
    editModal.then(async (modifiedCardText) => {
      this.reviewSequencer.updateCurrentQuestionText(modifiedCardText);
    }).catch((reason) => console.log(reason));
  }
  showAnswer() {
    this.mode = 2 /* Back */;
    this.answerBtn.style.display = "none";
    this.responseDiv.style.display = "grid";
    if (this.currentCard.hasSchedule) {
      this.resetButton.disabled = false;
    }
    if (this.currentQuestion.questionType !== 4 /* Cloze */) {
      const hr = document.createElement("hr");
      hr.setAttribute("id", "sr-hr-card-divide");
      this.flashcardView.appendChild(hr);
    } else {
      this.flashcardView.empty();
    }
    const wrapper = new RenderMarkdownWrapper(
      this.app,
      this.plugin,
      this.currentNote.filePath
    );
    wrapper.renderMarkdownWrapper(this.currentCard.back, this.flashcardView);
  }
  async processReview(response) {
    await this.reviewSequencer.processReview(response);
    await this.handleNextCard();
  }
  async skipCurrentCard() {
    this.reviewSequencer.skipCurrentCard();
    await this.handleNextCard();
  }
  async handleNextCard() {
    if (this.currentCard != null)
      await this.showCurrentCard();
    else
      this.renderDecksList();
  }
  async showCurrentCard() {
    const deck = this.reviewSequencer.currentDeck;
    this.responseDiv.style.display = "none";
    this.resetButton.disabled = true;
    this.titleEl.setText(`${deck.deckName}: ${deck.getCardCount(2 /* All */, true)}`);
    this.answerBtn.style.display = "initial";
    this.flashcardView.empty();
    this.mode = 1 /* Front */;
    const wrapper = new RenderMarkdownWrapper(
      this.app,
      this.plugin,
      this.currentNote.filePath
    );
    await wrapper.renderMarkdownWrapper(this.currentCard.front, this.flashcardView);
    if (this.reviewMode == 0 /* Cram */) {
      this.hardBtn.setText(`${this.settings.flashcardHardText}`);
      this.easyBtn.setText(`${this.settings.flashcardEasyText}`);
    } else {
      this.setupEaseButton(
        this.hardBtn,
        this.settings.flashcardHardText,
        2 /* Hard */
      );
      this.setupEaseButton(
        this.goodBtn,
        this.settings.flashcardGoodText,
        1 /* Good */
      );
      this.setupEaseButton(
        this.easyBtn,
        this.settings.flashcardEasyText,
        0 /* Easy */
      );
    }
    if (this.settings.showContextInCards)
      this.contextView.setText(
        this.formatQuestionContextText(this.currentQuestion.questionContext)
      );
  }
  formatQuestionContextText(questionContext) {
    const result = `${this.currentNote.file.basename} > ${questionContext.join(" > ")}`;
    return result;
  }
  setupEaseButton(button, buttonName, reviewResponse) {
    const schedule2 = this.reviewSequencer.determineCardSchedule(
      reviewResponse,
      this.currentCard
    );
    const interval = schedule2.interval;
    if (import_obsidian5.Platform.isMobile) {
      button.setText(textInterval(interval, true));
    } else {
      button.setText(`${buttonName} - ${textInterval(interval, false)}`);
    }
  }
};

// src/gui/stats-modal.tsx
var import_obsidian6 = require("obsidian");
var import_vhtml2 = __toESM(require_vhtml());

// node_modules/.pnpm/@kurkle+color@0.3.2/node_modules/@kurkle/color/dist/color.esm.js
function round(v) {
  return v + 0.5 | 0;
}
var lim = (v, l, h4) => Math.max(Math.min(v, h4), l);
function p2b(v) {
  return lim(round(v * 2.55), 0, 255);
}
function n2b(v) {
  return lim(round(v * 255), 0, 255);
}
function b2n(v) {
  return lim(round(v / 2.55) / 100, 0, 1);
}
function n2p(v) {
  return lim(round(v * 100), 0, 100);
}
var map$1 = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 };
var hex = [..."0123456789ABCDEF"];
var h1 = (b) => hex[b & 15];
var h2 = (b) => hex[(b & 240) >> 4] + hex[b & 15];
var eq = (b) => (b & 240) >> 4 === (b & 15);
var isShort = (v) => eq(v.r) && eq(v.g) && eq(v.b) && eq(v.a);
function hexParse(str) {
  var len = str.length;
  var ret;
  if (str[0] === "#") {
    if (len === 4 || len === 5) {
      ret = {
        r: 255 & map$1[str[1]] * 17,
        g: 255 & map$1[str[2]] * 17,
        b: 255 & map$1[str[3]] * 17,
        a: len === 5 ? map$1[str[4]] * 17 : 255
      };
    } else if (len === 7 || len === 9) {
      ret = {
        r: map$1[str[1]] << 4 | map$1[str[2]],
        g: map$1[str[3]] << 4 | map$1[str[4]],
        b: map$1[str[5]] << 4 | map$1[str[6]],
        a: len === 9 ? map$1[str[7]] << 4 | map$1[str[8]] : 255
      };
    }
  }
  return ret;
}
var alpha = (a, f) => a < 255 ? f(a) : "";
function hexString(v) {
  var f = isShort(v) ? h1 : h2;
  return v ? "#" + f(v.r) + f(v.g) + f(v.b) + alpha(v.a, f) : void 0;
}
var HUE_RE = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function hsl2rgbn(h4, s, l) {
  const a = s * Math.min(l, 1 - l);
  const f = (n, k = (n + h4 / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  return [f(0), f(8), f(4)];
}
function hsv2rgbn(h4, s, v) {
  const f = (n, k = (n + h4 / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  return [f(5), f(3), f(1)];
}
function hwb2rgbn(h4, w, b) {
  const rgb = hsl2rgbn(h4, 1, 0.5);
  let i;
  if (w + b > 1) {
    i = 1 / (w + b);
    w *= i;
    b *= i;
  }
  for (i = 0; i < 3; i++) {
    rgb[i] *= 1 - w - b;
    rgb[i] += w;
  }
  return rgb;
}
function hueValue(r, g, b, d, max) {
  if (r === max) {
    return (g - b) / d + (g < b ? 6 : 0);
  }
  if (g === max) {
    return (b - r) / d + 2;
  }
  return (r - g) / d + 4;
}
function rgb2hsl(v) {
  const range = 255;
  const r = v.r / range;
  const g = v.g / range;
  const b = v.b / range;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h4, s, d;
  if (max !== min) {
    d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h4 = hueValue(r, g, b, d, max);
    h4 = h4 * 60 + 0.5;
  }
  return [h4 | 0, s || 0, l];
}
function calln(f, a, b, c) {
  return (Array.isArray(a) ? f(a[0], a[1], a[2]) : f(a, b, c)).map(n2b);
}
function hsl2rgb(h4, s, l) {
  return calln(hsl2rgbn, h4, s, l);
}
function hwb2rgb(h4, w, b) {
  return calln(hwb2rgbn, h4, w, b);
}
function hsv2rgb(h4, s, v) {
  return calln(hsv2rgbn, h4, s, v);
}
function hue(h4) {
  return (h4 % 360 + 360) % 360;
}
function hueParse(str) {
  const m = HUE_RE.exec(str);
  let a = 255;
  let v;
  if (!m) {
    return;
  }
  if (m[5] !== v) {
    a = m[6] ? p2b(+m[5]) : n2b(+m[5]);
  }
  const h4 = hue(+m[2]);
  const p1 = +m[3] / 100;
  const p2 = +m[4] / 100;
  if (m[1] === "hwb") {
    v = hwb2rgb(h4, p1, p2);
  } else if (m[1] === "hsv") {
    v = hsv2rgb(h4, p1, p2);
  } else {
    v = hsl2rgb(h4, p1, p2);
  }
  return {
    r: v[0],
    g: v[1],
    b: v[2],
    a
  };
}
function rotate(v, deg) {
  var h4 = rgb2hsl(v);
  h4[0] = hue(h4[0] + deg);
  h4 = hsl2rgb(h4);
  v.r = h4[0];
  v.g = h4[1];
  v.b = h4[2];
}
function hslString(v) {
  if (!v) {
    return;
  }
  const a = rgb2hsl(v);
  const h4 = a[0];
  const s = n2p(a[1]);
  const l = n2p(a[2]);
  return v.a < 255 ? `hsla(${h4}, ${s}%, ${l}%, ${b2n(v.a)})` : `hsl(${h4}, ${s}%, ${l}%)`;
}
var map = {
  x: "dark",
  Z: "light",
  Y: "re",
  X: "blu",
  W: "gr",
  V: "medium",
  U: "slate",
  A: "ee",
  T: "ol",
  S: "or",
  B: "ra",
  C: "lateg",
  D: "ights",
  R: "in",
  Q: "turquois",
  E: "hi",
  P: "ro",
  O: "al",
  N: "le",
  M: "de",
  L: "yello",
  F: "en",
  K: "ch",
  G: "arks",
  H: "ea",
  I: "ightg",
  J: "wh"
};
var names$1 = {
  OiceXe: "f0f8ff",
  antiquewEte: "faebd7",
  aqua: "ffff",
  aquamarRe: "7fffd4",
  azuY: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "0",
  blanKedOmond: "ffebcd",
  Xe: "ff",
  XeviTet: "8a2be2",
  bPwn: "a52a2a",
  burlywood: "deb887",
  caMtXe: "5f9ea0",
  KartYuse: "7fff00",
  KocTate: "d2691e",
  cSO: "ff7f50",
  cSnflowerXe: "6495ed",
  cSnsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "ffff",
  xXe: "8b",
  xcyan: "8b8b",
  xgTMnPd: "b8860b",
  xWay: "a9a9a9",
  xgYF: "6400",
  xgYy: "a9a9a9",
  xkhaki: "bdb76b",
  xmagFta: "8b008b",
  xTivegYF: "556b2f",
  xSange: "ff8c00",
  xScEd: "9932cc",
  xYd: "8b0000",
  xsOmon: "e9967a",
  xsHgYF: "8fbc8f",
  xUXe: "483d8b",
  xUWay: "2f4f4f",
  xUgYy: "2f4f4f",
  xQe: "ced1",
  xviTet: "9400d3",
  dAppRk: "ff1493",
  dApskyXe: "bfff",
  dimWay: "696969",
  dimgYy: "696969",
  dodgerXe: "1e90ff",
  fiYbrick: "b22222",
  flSOwEte: "fffaf0",
  foYstWAn: "228b22",
  fuKsia: "ff00ff",
  gaRsbSo: "dcdcdc",
  ghostwEte: "f8f8ff",
  gTd: "ffd700",
  gTMnPd: "daa520",
  Way: "808080",
  gYF: "8000",
  gYFLw: "adff2f",
  gYy: "808080",
  honeyMw: "f0fff0",
  hotpRk: "ff69b4",
  RdianYd: "cd5c5c",
  Rdigo: "4b0082",
  ivSy: "fffff0",
  khaki: "f0e68c",
  lavFMr: "e6e6fa",
  lavFMrXsh: "fff0f5",
  lawngYF: "7cfc00",
  NmoncEffon: "fffacd",
  ZXe: "add8e6",
  ZcSO: "f08080",
  Zcyan: "e0ffff",
  ZgTMnPdLw: "fafad2",
  ZWay: "d3d3d3",
  ZgYF: "90ee90",
  ZgYy: "d3d3d3",
  ZpRk: "ffb6c1",
  ZsOmon: "ffa07a",
  ZsHgYF: "20b2aa",
  ZskyXe: "87cefa",
  ZUWay: "778899",
  ZUgYy: "778899",
  ZstAlXe: "b0c4de",
  ZLw: "ffffe0",
  lime: "ff00",
  limegYF: "32cd32",
  lRF: "faf0e6",
  magFta: "ff00ff",
  maPon: "800000",
  VaquamarRe: "66cdaa",
  VXe: "cd",
  VScEd: "ba55d3",
  VpurpN: "9370db",
  VsHgYF: "3cb371",
  VUXe: "7b68ee",
  VsprRggYF: "fa9a",
  VQe: "48d1cc",
  VviTetYd: "c71585",
  midnightXe: "191970",
  mRtcYam: "f5fffa",
  mistyPse: "ffe4e1",
  moccasR: "ffe4b5",
  navajowEte: "ffdead",
  navy: "80",
  Tdlace: "fdf5e6",
  Tive: "808000",
  TivedBb: "6b8e23",
  Sange: "ffa500",
  SangeYd: "ff4500",
  ScEd: "da70d6",
  pOegTMnPd: "eee8aa",
  pOegYF: "98fb98",
  pOeQe: "afeeee",
  pOeviTetYd: "db7093",
  papayawEp: "ffefd5",
  pHKpuff: "ffdab9",
  peru: "cd853f",
  pRk: "ffc0cb",
  plum: "dda0dd",
  powMrXe: "b0e0e6",
  purpN: "800080",
  YbeccapurpN: "663399",
  Yd: "ff0000",
  Psybrown: "bc8f8f",
  PyOXe: "4169e1",
  saddNbPwn: "8b4513",
  sOmon: "fa8072",
  sandybPwn: "f4a460",
  sHgYF: "2e8b57",
  sHshell: "fff5ee",
  siFna: "a0522d",
  silver: "c0c0c0",
  skyXe: "87ceeb",
  UXe: "6a5acd",
  UWay: "708090",
  UgYy: "708090",
  snow: "fffafa",
  sprRggYF: "ff7f",
  stAlXe: "4682b4",
  tan: "d2b48c",
  teO: "8080",
  tEstN: "d8bfd8",
  tomato: "ff6347",
  Qe: "40e0d0",
  viTet: "ee82ee",
  JHt: "f5deb3",
  wEte: "ffffff",
  wEtesmoke: "f5f5f5",
  Lw: "ffff00",
  LwgYF: "9acd32"
};
function unpack() {
  const unpacked = {};
  const keys = Object.keys(names$1);
  const tkeys = Object.keys(map);
  let i, j, k, ok, nk;
  for (i = 0; i < keys.length; i++) {
    ok = nk = keys[i];
    for (j = 0; j < tkeys.length; j++) {
      k = tkeys[j];
      nk = nk.replace(k, map[k]);
    }
    k = parseInt(names$1[ok], 16);
    unpacked[nk] = [k >> 16 & 255, k >> 8 & 255, k & 255];
  }
  return unpacked;
}
var names;
function nameParse(str) {
  if (!names) {
    names = unpack();
    names.transparent = [0, 0, 0, 0];
  }
  const a = names[str.toLowerCase()];
  return a && {
    r: a[0],
    g: a[1],
    b: a[2],
    a: a.length === 4 ? a[3] : 255
  };
}
var RGB_RE = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function rgbParse(str) {
  const m = RGB_RE.exec(str);
  let a = 255;
  let r, g, b;
  if (!m) {
    return;
  }
  if (m[7] !== r) {
    const v = +m[7];
    a = m[8] ? p2b(v) : lim(v * 255, 0, 255);
  }
  r = +m[1];
  g = +m[3];
  b = +m[5];
  r = 255 & (m[2] ? p2b(r) : lim(r, 0, 255));
  g = 255 & (m[4] ? p2b(g) : lim(g, 0, 255));
  b = 255 & (m[6] ? p2b(b) : lim(b, 0, 255));
  return {
    r,
    g,
    b,
    a
  };
}
function rgbString(v) {
  return v && (v.a < 255 ? `rgba(${v.r}, ${v.g}, ${v.b}, ${b2n(v.a)})` : `rgb(${v.r}, ${v.g}, ${v.b})`);
}
var to = (v) => v <= 31308e-7 ? v * 12.92 : Math.pow(v, 1 / 2.4) * 1.055 - 0.055;
var from = (v) => v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
function interpolate2(rgb1, rgb2, t2) {
  const r = from(b2n(rgb1.r));
  const g = from(b2n(rgb1.g));
  const b = from(b2n(rgb1.b));
  return {
    r: n2b(to(r + t2 * (from(b2n(rgb2.r)) - r))),
    g: n2b(to(g + t2 * (from(b2n(rgb2.g)) - g))),
    b: n2b(to(b + t2 * (from(b2n(rgb2.b)) - b))),
    a: rgb1.a + t2 * (rgb2.a - rgb1.a)
  };
}
function modHSL(v, i, ratio) {
  if (v) {
    let tmp = rgb2hsl(v);
    tmp[i] = Math.max(0, Math.min(tmp[i] + tmp[i] * ratio, i === 0 ? 360 : 1));
    tmp = hsl2rgb(tmp);
    v.r = tmp[0];
    v.g = tmp[1];
    v.b = tmp[2];
  }
}
function clone(v, proto) {
  return v ? Object.assign(proto || {}, v) : v;
}
function fromObject(input) {
  var v = { r: 0, g: 0, b: 0, a: 255 };
  if (Array.isArray(input)) {
    if (input.length >= 3) {
      v = { r: input[0], g: input[1], b: input[2], a: 255 };
      if (input.length > 3) {
        v.a = n2b(input[3]);
      }
    }
  } else {
    v = clone(input, { r: 0, g: 0, b: 0, a: 1 });
    v.a = n2b(v.a);
  }
  return v;
}
function functionParse(str) {
  if (str.charAt(0) === "r") {
    return rgbParse(str);
  }
  return hueParse(str);
}
var Color = class _Color {
  constructor(input) {
    if (input instanceof _Color) {
      return input;
    }
    const type = typeof input;
    let v;
    if (type === "object") {
      v = fromObject(input);
    } else if (type === "string") {
      v = hexParse(input) || nameParse(input) || functionParse(input);
    }
    this._rgb = v;
    this._valid = !!v;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var v = clone(this._rgb);
    if (v) {
      v.a = b2n(v.a);
    }
    return v;
  }
  set rgb(obj) {
    this._rgb = fromObject(obj);
  }
  rgbString() {
    return this._valid ? rgbString(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? hexString(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? hslString(this._rgb) : void 0;
  }
  mix(color2, weight) {
    if (color2) {
      const c1 = this.rgb;
      const c2 = color2.rgb;
      let w2;
      const p = weight === w2 ? 0.5 : weight;
      const w = 2 * p - 1;
      const a = c1.a - c2.a;
      const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2;
      w2 = 1 - w1;
      c1.r = 255 & w1 * c1.r + w2 * c2.r + 0.5;
      c1.g = 255 & w1 * c1.g + w2 * c2.g + 0.5;
      c1.b = 255 & w1 * c1.b + w2 * c2.b + 0.5;
      c1.a = p * c1.a + (1 - p) * c2.a;
      this.rgb = c1;
    }
    return this;
  }
  interpolate(color2, t2) {
    if (color2) {
      this._rgb = interpolate2(this._rgb, color2._rgb, t2);
    }
    return this;
  }
  clone() {
    return new _Color(this.rgb);
  }
  alpha(a) {
    this._rgb.a = n2b(a);
    return this;
  }
  clearer(ratio) {
    const rgb = this._rgb;
    rgb.a *= 1 - ratio;
    return this;
  }
  greyscale() {
    const rgb = this._rgb;
    const val = round(rgb.r * 0.3 + rgb.g * 0.59 + rgb.b * 0.11);
    rgb.r = rgb.g = rgb.b = val;
    return this;
  }
  opaquer(ratio) {
    const rgb = this._rgb;
    rgb.a *= 1 + ratio;
    return this;
  }
  negate() {
    const v = this._rgb;
    v.r = 255 - v.r;
    v.g = 255 - v.g;
    v.b = 255 - v.b;
    return this;
  }
  lighten(ratio) {
    modHSL(this._rgb, 2, ratio);
    return this;
  }
  darken(ratio) {
    modHSL(this._rgb, 2, -ratio);
    return this;
  }
  saturate(ratio) {
    modHSL(this._rgb, 1, ratio);
    return this;
  }
  desaturate(ratio) {
    modHSL(this._rgb, 1, -ratio);
    return this;
  }
  rotate(deg) {
    rotate(this._rgb, deg);
    return this;
  }
};

// node_modules/.pnpm/chart.js@4.4.1/node_modules/chart.js/dist/chunks/helpers.segment.js
function noop() {
}
var uid = /* @__PURE__ */ (() => {
  let id = 0;
  return () => id++;
})();
function isNullOrUndef(value) {
  return value === null || typeof value === "undefined";
}
function isArray(value) {
  if (Array.isArray && Array.isArray(value)) {
    return true;
  }
  const type = Object.prototype.toString.call(value);
  if (type.slice(0, 7) === "[object" && type.slice(-6) === "Array]") {
    return true;
  }
  return false;
}
function isObject(value) {
  return value !== null && Object.prototype.toString.call(value) === "[object Object]";
}
function isNumberFinite(value) {
  return (typeof value === "number" || value instanceof Number) && isFinite(+value);
}
function finiteOrDefault(value, defaultValue) {
  return isNumberFinite(value) ? value : defaultValue;
}
function valueOrDefault(value, defaultValue) {
  return typeof value === "undefined" ? defaultValue : value;
}
var toPercentage = (value, dimension) => typeof value === "string" && value.endsWith("%") ? parseFloat(value) / 100 : +value / dimension;
var toDimension = (value, dimension) => typeof value === "string" && value.endsWith("%") ? parseFloat(value) / 100 * dimension : +value;
function callback(fn, args, thisArg) {
  if (fn && typeof fn.call === "function") {
    return fn.apply(thisArg, args);
  }
}
function each(loopable, fn, thisArg, reverse) {
  let i, len, keys;
  if (isArray(loopable)) {
    len = loopable.length;
    if (reverse) {
      for (i = len - 1; i >= 0; i--) {
        fn.call(thisArg, loopable[i], i);
      }
    } else {
      for (i = 0; i < len; i++) {
        fn.call(thisArg, loopable[i], i);
      }
    }
  } else if (isObject(loopable)) {
    keys = Object.keys(loopable);
    len = keys.length;
    for (i = 0; i < len; i++) {
      fn.call(thisArg, loopable[keys[i]], keys[i]);
    }
  }
}
function _elementsEqual(a0, a1) {
  let i, ilen, v0, v1;
  if (!a0 || !a1 || a0.length !== a1.length) {
    return false;
  }
  for (i = 0, ilen = a0.length; i < ilen; ++i) {
    v0 = a0[i];
    v1 = a1[i];
    if (v0.datasetIndex !== v1.datasetIndex || v0.index !== v1.index) {
      return false;
    }
  }
  return true;
}
function clone2(source) {
  if (isArray(source)) {
    return source.map(clone2);
  }
  if (isObject(source)) {
    const target = /* @__PURE__ */ Object.create(null);
    const keys = Object.keys(source);
    const klen = keys.length;
    let k = 0;
    for (; k < klen; ++k) {
      target[keys[k]] = clone2(source[keys[k]]);
    }
    return target;
  }
  return source;
}
function isValidKey(key) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(key) === -1;
}
function _merger(key, target, source, options) {
  if (!isValidKey(key)) {
    return;
  }
  const tval = target[key];
  const sval = source[key];
  if (isObject(tval) && isObject(sval)) {
    merge(tval, sval, options);
  } else {
    target[key] = clone2(sval);
  }
}
function merge(target, source, options) {
  const sources = isArray(source) ? source : [
    source
  ];
  const ilen = sources.length;
  if (!isObject(target)) {
    return target;
  }
  options = options || {};
  const merger = options.merger || _merger;
  let current;
  for (let i = 0; i < ilen; ++i) {
    current = sources[i];
    if (!isObject(current)) {
      continue;
    }
    const keys = Object.keys(current);
    for (let k = 0, klen = keys.length; k < klen; ++k) {
      merger(keys[k], target, current, options);
    }
  }
  return target;
}
function mergeIf(target, source) {
  return merge(target, source, {
    merger: _mergerIf
  });
}
function _mergerIf(key, target, source) {
  if (!isValidKey(key)) {
    return;
  }
  const tval = target[key];
  const sval = source[key];
  if (isObject(tval) && isObject(sval)) {
    mergeIf(tval, sval);
  } else if (!Object.prototype.hasOwnProperty.call(target, key)) {
    target[key] = clone2(sval);
  }
}
var keyResolvers = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (v) => v,
  // default resolvers
  x: (o) => o.x,
  y: (o) => o.y
};
function _splitKey(key) {
  const parts = key.split(".");
  const keys = [];
  let tmp = "";
  for (const part of parts) {
    tmp += part;
    if (tmp.endsWith("\\")) {
      tmp = tmp.slice(0, -1) + ".";
    } else {
      keys.push(tmp);
      tmp = "";
    }
  }
  return keys;
}
function _getKeyResolver(key) {
  const keys = _splitKey(key);
  return (obj) => {
    for (const k of keys) {
      if (k === "") {
        break;
      }
      obj = obj && obj[k];
    }
    return obj;
  };
}
function resolveObjectKey(obj, key) {
  const resolver = keyResolvers[key] || (keyResolvers[key] = _getKeyResolver(key));
  return resolver(obj);
}
function _capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
var defined = (value) => typeof value !== "undefined";
var isFunction = (value) => typeof value === "function";
var setsEqual = (a, b) => {
  if (a.size !== b.size) {
    return false;
  }
  for (const item of a) {
    if (!b.has(item)) {
      return false;
    }
  }
  return true;
};
function _isClickEvent(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
var PI = Math.PI;
var TAU = 2 * PI;
var PITAU = TAU + PI;
var INFINITY = Number.POSITIVE_INFINITY;
var RAD_PER_DEG = PI / 180;
var HALF_PI = PI / 2;
var QUARTER_PI = PI / 4;
var TWO_THIRDS_PI = PI * 2 / 3;
var log10 = Math.log10;
var sign = Math.sign;
function almostEquals(x, y, epsilon) {
  return Math.abs(x - y) < epsilon;
}
function niceNum(range) {
  const roundedRange = Math.round(range);
  range = almostEquals(range, roundedRange, range / 1e3) ? roundedRange : range;
  const niceRange = Math.pow(10, Math.floor(log10(range)));
  const fraction = range / niceRange;
  const niceFraction = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10;
  return niceFraction * niceRange;
}
function _factorize(value) {
  const result = [];
  const sqrt = Math.sqrt(value);
  let i;
  for (i = 1; i < sqrt; i++) {
    if (value % i === 0) {
      result.push(i);
      result.push(value / i);
    }
  }
  if (sqrt === (sqrt | 0)) {
    result.push(sqrt);
  }
  result.sort((a, b) => a - b).pop();
  return result;
}
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function almostWhole(x, epsilon) {
  const rounded = Math.round(x);
  return rounded - epsilon <= x && rounded + epsilon >= x;
}
function _setMinAndMaxByKey(array, target, property) {
  let i, ilen, value;
  for (i = 0, ilen = array.length; i < ilen; i++) {
    value = array[i][property];
    if (!isNaN(value)) {
      target.min = Math.min(target.min, value);
      target.max = Math.max(target.max, value);
    }
  }
}
function toRadians(degrees) {
  return degrees * (PI / 180);
}
function toDegrees(radians) {
  return radians * (180 / PI);
}
function _decimalPlaces(x) {
  if (!isNumberFinite(x)) {
    return;
  }
  let e = 1;
  let p = 0;
  while (Math.round(x * e) / e !== x) {
    e *= 10;
    p++;
  }
  return p;
}
function getAngleFromPoint(centrePoint, anglePoint) {
  const distanceFromXCenter = anglePoint.x - centrePoint.x;
  const distanceFromYCenter = anglePoint.y - centrePoint.y;
  const radialDistanceFromCenter = Math.sqrt(distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);
  let angle = Math.atan2(distanceFromYCenter, distanceFromXCenter);
  if (angle < -0.5 * PI) {
    angle += TAU;
  }
  return {
    angle,
    distance: radialDistanceFromCenter
  };
}
function distanceBetweenPoints(pt1, pt2) {
  return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
}
function _normalizeAngle(a) {
  return (a % TAU + TAU) % TAU;
}
function _angleBetween(angle, start, end, sameAngleIsFullCircle) {
  const a = _normalizeAngle(angle);
  const s = _normalizeAngle(start);
  const e = _normalizeAngle(end);
  const angleToStart = _normalizeAngle(s - a);
  const angleToEnd = _normalizeAngle(e - a);
  const startToAngle = _normalizeAngle(a - s);
  const endToAngle = _normalizeAngle(a - e);
  return a === s || a === e || sameAngleIsFullCircle && s === e || angleToStart > angleToEnd && startToAngle < endToAngle;
}
function _limitValue(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
function _int16Range(value) {
  return _limitValue(value, -32768, 32767);
}
function _isBetween(value, start, end, epsilon = 1e-6) {
  return value >= Math.min(start, end) - epsilon && value <= Math.max(start, end) + epsilon;
}
function _lookup(table, value, cmp) {
  cmp = cmp || ((index) => table[index] < value);
  let hi = table.length - 1;
  let lo = 0;
  let mid;
  while (hi - lo > 1) {
    mid = lo + hi >> 1;
    if (cmp(mid)) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  return {
    lo,
    hi
  };
}
var _lookupByKey = (table, key, value, last) => _lookup(table, value, last ? (index) => {
  const ti = table[index][key];
  return ti < value || ti === value && table[index + 1][key] === value;
} : (index) => table[index][key] < value);
var _rlookupByKey = (table, key, value) => _lookup(table, value, (index) => table[index][key] >= value);
function _filterBetween(values, min, max) {
  let start = 0;
  let end = values.length;
  while (start < end && values[start] < min) {
    start++;
  }
  while (end > start && values[end - 1] > max) {
    end--;
  }
  return start > 0 || end < values.length ? values.slice(start, end) : values;
}
var arrayEvents = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function listenArrayEvents(array, listener) {
  if (array._chartjs) {
    array._chartjs.listeners.push(listener);
    return;
  }
  Object.defineProperty(array, "_chartjs", {
    configurable: true,
    enumerable: false,
    value: {
      listeners: [
        listener
      ]
    }
  });
  arrayEvents.forEach((key) => {
    const method = "_onData" + _capitalize(key);
    const base = array[key];
    Object.defineProperty(array, key, {
      configurable: true,
      enumerable: false,
      value(...args) {
        const res = base.apply(this, args);
        array._chartjs.listeners.forEach((object) => {
          if (typeof object[method] === "function") {
            object[method](...args);
          }
        });
        return res;
      }
    });
  });
}
function unlistenArrayEvents(array, listener) {
  const stub = array._chartjs;
  if (!stub) {
    return;
  }
  const listeners = stub.listeners;
  const index = listeners.indexOf(listener);
  if (index !== -1) {
    listeners.splice(index, 1);
  }
  if (listeners.length > 0) {
    return;
  }
  arrayEvents.forEach((key) => {
    delete array[key];
  });
  delete array._chartjs;
}
function _arrayUnique(items) {
  const set2 = new Set(items);
  if (set2.size === items.length) {
    return items;
  }
  return Array.from(set2);
}
var requestAnimFrame = function() {
  if (typeof window === "undefined") {
    return function(callback2) {
      return callback2();
    };
  }
  return window.requestAnimationFrame;
}();
function throttled(fn, thisArg) {
  let argsToUse = [];
  let ticking = false;
  return function(...args) {
    argsToUse = args;
    if (!ticking) {
      ticking = true;
      requestAnimFrame.call(window, () => {
        ticking = false;
        fn.apply(thisArg, argsToUse);
      });
    }
  };
}
function debounce(fn, delay) {
  let timeout;
  return function(...args) {
    if (delay) {
      clearTimeout(timeout);
      timeout = setTimeout(fn, delay, args);
    } else {
      fn.apply(this, args);
    }
    return delay;
  };
}
var _toLeftRightCenter = (align) => align === "start" ? "left" : align === "end" ? "right" : "center";
var _alignStartEnd = (align, start, end) => align === "start" ? start : align === "end" ? end : (start + end) / 2;
var _textX = (align, left, right, rtl) => {
  const check = rtl ? "left" : "right";
  return align === check ? right : align === "center" ? (left + right) / 2 : left;
};
var atEdge = (t2) => t2 === 0 || t2 === 1;
var elasticIn = (t2, s, p) => -(Math.pow(2, 10 * (t2 -= 1)) * Math.sin((t2 - s) * TAU / p));
var elasticOut = (t2, s, p) => Math.pow(2, -10 * t2) * Math.sin((t2 - s) * TAU / p) + 1;
var effects = {
  linear: (t2) => t2,
  easeInQuad: (t2) => t2 * t2,
  easeOutQuad: (t2) => -t2 * (t2 - 2),
  easeInOutQuad: (t2) => (t2 /= 0.5) < 1 ? 0.5 * t2 * t2 : -0.5 * (--t2 * (t2 - 2) - 1),
  easeInCubic: (t2) => t2 * t2 * t2,
  easeOutCubic: (t2) => (t2 -= 1) * t2 * t2 + 1,
  easeInOutCubic: (t2) => (t2 /= 0.5) < 1 ? 0.5 * t2 * t2 * t2 : 0.5 * ((t2 -= 2) * t2 * t2 + 2),
  easeInQuart: (t2) => t2 * t2 * t2 * t2,
  easeOutQuart: (t2) => -((t2 -= 1) * t2 * t2 * t2 - 1),
  easeInOutQuart: (t2) => (t2 /= 0.5) < 1 ? 0.5 * t2 * t2 * t2 * t2 : -0.5 * ((t2 -= 2) * t2 * t2 * t2 - 2),
  easeInQuint: (t2) => t2 * t2 * t2 * t2 * t2,
  easeOutQuint: (t2) => (t2 -= 1) * t2 * t2 * t2 * t2 + 1,
  easeInOutQuint: (t2) => (t2 /= 0.5) < 1 ? 0.5 * t2 * t2 * t2 * t2 * t2 : 0.5 * ((t2 -= 2) * t2 * t2 * t2 * t2 + 2),
  easeInSine: (t2) => -Math.cos(t2 * HALF_PI) + 1,
  easeOutSine: (t2) => Math.sin(t2 * HALF_PI),
  easeInOutSine: (t2) => -0.5 * (Math.cos(PI * t2) - 1),
  easeInExpo: (t2) => t2 === 0 ? 0 : Math.pow(2, 10 * (t2 - 1)),
  easeOutExpo: (t2) => t2 === 1 ? 1 : -Math.pow(2, -10 * t2) + 1,
  easeInOutExpo: (t2) => atEdge(t2) ? t2 : t2 < 0.5 ? 0.5 * Math.pow(2, 10 * (t2 * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (t2 * 2 - 1)) + 2),
  easeInCirc: (t2) => t2 >= 1 ? t2 : -(Math.sqrt(1 - t2 * t2) - 1),
  easeOutCirc: (t2) => Math.sqrt(1 - (t2 -= 1) * t2),
  easeInOutCirc: (t2) => (t2 /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - t2 * t2) - 1) : 0.5 * (Math.sqrt(1 - (t2 -= 2) * t2) + 1),
  easeInElastic: (t2) => atEdge(t2) ? t2 : elasticIn(t2, 0.075, 0.3),
  easeOutElastic: (t2) => atEdge(t2) ? t2 : elasticOut(t2, 0.075, 0.3),
  easeInOutElastic(t2) {
    const s = 0.1125;
    const p = 0.45;
    return atEdge(t2) ? t2 : t2 < 0.5 ? 0.5 * elasticIn(t2 * 2, s, p) : 0.5 + 0.5 * elasticOut(t2 * 2 - 1, s, p);
  },
  easeInBack(t2) {
    const s = 1.70158;
    return t2 * t2 * ((s + 1) * t2 - s);
  },
  easeOutBack(t2) {
    const s = 1.70158;
    return (t2 -= 1) * t2 * ((s + 1) * t2 + s) + 1;
  },
  easeInOutBack(t2) {
    let s = 1.70158;
    if ((t2 /= 0.5) < 1) {
      return 0.5 * (t2 * t2 * (((s *= 1.525) + 1) * t2 - s));
    }
    return 0.5 * ((t2 -= 2) * t2 * (((s *= 1.525) + 1) * t2 + s) + 2);
  },
  easeInBounce: (t2) => 1 - effects.easeOutBounce(1 - t2),
  easeOutBounce(t2) {
    const m = 7.5625;
    const d = 2.75;
    if (t2 < 1 / d) {
      return m * t2 * t2;
    }
    if (t2 < 2 / d) {
      return m * (t2 -= 1.5 / d) * t2 + 0.75;
    }
    if (t2 < 2.5 / d) {
      return m * (t2 -= 2.25 / d) * t2 + 0.9375;
    }
    return m * (t2 -= 2.625 / d) * t2 + 0.984375;
  },
  easeInOutBounce: (t2) => t2 < 0.5 ? effects.easeInBounce(t2 * 2) * 0.5 : effects.easeOutBounce(t2 * 2 - 1) * 0.5 + 0.5
};
function isPatternOrGradient(value) {
  if (value && typeof value === "object") {
    const type = value.toString();
    return type === "[object CanvasPattern]" || type === "[object CanvasGradient]";
  }
  return false;
}
function color(value) {
  return isPatternOrGradient(value) ? value : new Color(value);
}
function getHoverColor(value) {
  return isPatternOrGradient(value) ? value : new Color(value).saturate(0.5).darken(0.1).hexString();
}
var numbers = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
];
var colors = [
  "color",
  "borderColor",
  "backgroundColor"
];
function applyAnimationsDefaults(defaults2) {
  defaults2.set("animation", {
    delay: void 0,
    duration: 1e3,
    easing: "easeOutQuart",
    fn: void 0,
    from: void 0,
    loop: void 0,
    to: void 0,
    type: void 0
  });
  defaults2.describe("animation", {
    _fallback: false,
    _indexable: false,
    _scriptable: (name) => name !== "onProgress" && name !== "onComplete" && name !== "fn"
  });
  defaults2.set("animations", {
    colors: {
      type: "color",
      properties: colors
    },
    numbers: {
      type: "number",
      properties: numbers
    }
  });
  defaults2.describe("animations", {
    _fallback: "animation"
  });
  defaults2.set("transitions", {
    active: {
      animation: {
        duration: 400
      }
    },
    resize: {
      animation: {
        duration: 0
      }
    },
    show: {
      animations: {
        colors: {
          from: "transparent"
        },
        visible: {
          type: "boolean",
          duration: 0
        }
      }
    },
    hide: {
      animations: {
        colors: {
          to: "transparent"
        },
        visible: {
          type: "boolean",
          easing: "linear",
          fn: (v) => v | 0
        }
      }
    }
  });
}
function applyLayoutsDefaults(defaults2) {
  defaults2.set("layout", {
    autoPadding: true,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });
}
var intlCache = /* @__PURE__ */ new Map();
function getNumberFormat(locale2, options) {
  options = options || {};
  const cacheKey = locale2 + JSON.stringify(options);
  let formatter = intlCache.get(cacheKey);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale2, options);
    intlCache.set(cacheKey, formatter);
  }
  return formatter;
}
function formatNumber(num, locale2, options) {
  return getNumberFormat(locale2, options).format(num);
}
var formatters = {
  values(value) {
    return isArray(value) ? value : "" + value;
  },
  numeric(tickValue, index, ticks) {
    if (tickValue === 0) {
      return "0";
    }
    const locale2 = this.chart.options.locale;
    let notation;
    let delta = tickValue;
    if (ticks.length > 1) {
      const maxTick = Math.max(Math.abs(ticks[0].value), Math.abs(ticks[ticks.length - 1].value));
      if (maxTick < 1e-4 || maxTick > 1e15) {
        notation = "scientific";
      }
      delta = calculateDelta(tickValue, ticks);
    }
    const logDelta = log10(Math.abs(delta));
    const numDecimal = isNaN(logDelta) ? 1 : Math.max(Math.min(-1 * Math.floor(logDelta), 20), 0);
    const options = {
      notation,
      minimumFractionDigits: numDecimal,
      maximumFractionDigits: numDecimal
    };
    Object.assign(options, this.options.ticks.format);
    return formatNumber(tickValue, locale2, options);
  },
  logarithmic(tickValue, index, ticks) {
    if (tickValue === 0) {
      return "0";
    }
    const remain = ticks[index].significand || tickValue / Math.pow(10, Math.floor(log10(tickValue)));
    if ([
      1,
      2,
      3,
      5,
      10,
      15
    ].includes(remain) || index > 0.8 * ticks.length) {
      return formatters.numeric.call(this, tickValue, index, ticks);
    }
    return "";
  }
};
function calculateDelta(tickValue, ticks) {
  let delta = ticks.length > 3 ? ticks[2].value - ticks[1].value : ticks[1].value - ticks[0].value;
  if (Math.abs(delta) >= 1 && tickValue !== Math.floor(tickValue)) {
    delta = tickValue - Math.floor(tickValue);
  }
  return delta;
}
var Ticks = {
  formatters
};
function applyScaleDefaults(defaults2) {
  defaults2.set("scale", {
    display: true,
    offset: false,
    reverse: false,
    beginAtZero: false,
    bounds: "ticks",
    clip: true,
    grace: 0,
    grid: {
      display: true,
      lineWidth: 1,
      drawOnChartArea: true,
      drawTicks: true,
      tickLength: 8,
      tickWidth: (_ctx, options) => options.lineWidth,
      tickColor: (_ctx, options) => options.color,
      offset: false
    },
    border: {
      display: true,
      dash: [],
      dashOffset: 0,
      width: 1
    },
    title: {
      display: false,
      text: "",
      padding: {
        top: 4,
        bottom: 4
      }
    },
    ticks: {
      minRotation: 0,
      maxRotation: 50,
      mirror: false,
      textStrokeWidth: 0,
      textStrokeColor: "",
      padding: 3,
      display: true,
      autoSkip: true,
      autoSkipPadding: 3,
      labelOffset: 0,
      callback: Ticks.formatters.values,
      minor: {},
      major: {},
      align: "center",
      crossAlign: "near",
      showLabelBackdrop: false,
      backdropColor: "rgba(255, 255, 255, 0.75)",
      backdropPadding: 2
    }
  });
  defaults2.route("scale.ticks", "color", "", "color");
  defaults2.route("scale.grid", "color", "", "borderColor");
  defaults2.route("scale.border", "color", "", "borderColor");
  defaults2.route("scale.title", "color", "", "color");
  defaults2.describe("scale", {
    _fallback: false,
    _scriptable: (name) => !name.startsWith("before") && !name.startsWith("after") && name !== "callback" && name !== "parser",
    _indexable: (name) => name !== "borderDash" && name !== "tickBorderDash" && name !== "dash"
  });
  defaults2.describe("scales", {
    _fallback: "scale"
  });
  defaults2.describe("scale.ticks", {
    _scriptable: (name) => name !== "backdropPadding" && name !== "callback",
    _indexable: (name) => name !== "backdropPadding"
  });
}
var overrides = /* @__PURE__ */ Object.create(null);
var descriptors = /* @__PURE__ */ Object.create(null);
function getScope$1(node, key) {
  if (!key) {
    return node;
  }
  const keys = key.split(".");
  for (let i = 0, n = keys.length; i < n; ++i) {
    const k = keys[i];
    node = node[k] || (node[k] = /* @__PURE__ */ Object.create(null));
  }
  return node;
}
function set(root, scope, values) {
  if (typeof scope === "string") {
    return merge(getScope$1(root, scope), values);
  }
  return merge(getScope$1(root, ""), scope);
}
var Defaults = class {
  constructor(_descriptors2, _appliers) {
    this.animation = void 0;
    this.backgroundColor = "rgba(0,0,0,0.1)";
    this.borderColor = "rgba(0,0,0,0.1)";
    this.color = "#666";
    this.datasets = {};
    this.devicePixelRatio = (context) => context.chart.platform.getDevicePixelRatio();
    this.elements = {};
    this.events = [
      "mousemove",
      "mouseout",
      "click",
      "touchstart",
      "touchmove"
    ];
    this.font = {
      family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      size: 12,
      style: "normal",
      lineHeight: 1.2,
      weight: null
    };
    this.hover = {};
    this.hoverBackgroundColor = (ctx, options) => getHoverColor(options.backgroundColor);
    this.hoverBorderColor = (ctx, options) => getHoverColor(options.borderColor);
    this.hoverColor = (ctx, options) => getHoverColor(options.color);
    this.indexAxis = "x";
    this.interaction = {
      mode: "nearest",
      intersect: true,
      includeInvisible: false
    };
    this.maintainAspectRatio = true;
    this.onHover = null;
    this.onClick = null;
    this.parsing = true;
    this.plugins = {};
    this.responsive = true;
    this.scale = void 0;
    this.scales = {};
    this.showLine = true;
    this.drawActiveElementsOnTop = true;
    this.describe(_descriptors2);
    this.apply(_appliers);
  }
  set(scope, values) {
    return set(this, scope, values);
  }
  get(scope) {
    return getScope$1(this, scope);
  }
  describe(scope, values) {
    return set(descriptors, scope, values);
  }
  override(scope, values) {
    return set(overrides, scope, values);
  }
  route(scope, name, targetScope, targetName) {
    const scopeObject = getScope$1(this, scope);
    const targetScopeObject = getScope$1(this, targetScope);
    const privateName = "_" + name;
    Object.defineProperties(scopeObject, {
      [privateName]: {
        value: scopeObject[name],
        writable: true
      },
      [name]: {
        enumerable: true,
        get() {
          const local = this[privateName];
          const target = targetScopeObject[targetName];
          if (isObject(local)) {
            return Object.assign({}, target, local);
          }
          return valueOrDefault(local, target);
        },
        set(value) {
          this[privateName] = value;
        }
      }
    });
  }
  apply(appliers) {
    appliers.forEach((apply) => apply(this));
  }
};
var defaults = /* @__PURE__ */ new Defaults({
  _scriptable: (name) => !name.startsWith("on"),
  _indexable: (name) => name !== "events",
  hover: {
    _fallback: "interaction"
  },
  interaction: {
    _scriptable: false,
    _indexable: false
  }
}, [
  applyAnimationsDefaults,
  applyLayoutsDefaults,
  applyScaleDefaults
]);
function toFontString(font) {
  if (!font || isNullOrUndef(font.size) || isNullOrUndef(font.family)) {
    return null;
  }
  return (font.style ? font.style + " " : "") + (font.weight ? font.weight + " " : "") + font.size + "px " + font.family;
}
function _measureText(ctx, data, gc, longest, string) {
  let textWidth = data[string];
  if (!textWidth) {
    textWidth = data[string] = ctx.measureText(string).width;
    gc.push(string);
  }
  if (textWidth > longest) {
    longest = textWidth;
  }
  return longest;
}
function _longestText(ctx, font, arrayOfThings, cache) {
  cache = cache || {};
  let data = cache.data = cache.data || {};
  let gc = cache.garbageCollect = cache.garbageCollect || [];
  if (cache.font !== font) {
    data = cache.data = {};
    gc = cache.garbageCollect = [];
    cache.font = font;
  }
  ctx.save();
  ctx.font = font;
  let longest = 0;
  const ilen = arrayOfThings.length;
  let i, j, jlen, thing, nestedThing;
  for (i = 0; i < ilen; i++) {
    thing = arrayOfThings[i];
    if (thing !== void 0 && thing !== null && !isArray(thing)) {
      longest = _measureText(ctx, data, gc, longest, thing);
    } else if (isArray(thing)) {
      for (j = 0, jlen = thing.length; j < jlen; j++) {
        nestedThing = thing[j];
        if (nestedThing !== void 0 && nestedThing !== null && !isArray(nestedThing)) {
          longest = _measureText(ctx, data, gc, longest, nestedThing);
        }
      }
    }
  }
  ctx.restore();
  const gcLen = gc.length / 2;
  if (gcLen > arrayOfThings.length) {
    for (i = 0; i < gcLen; i++) {
      delete data[gc[i]];
    }
    gc.splice(0, gcLen);
  }
  return longest;
}
function _alignPixel(chart, pixel, width) {
  const devicePixelRatio = chart.currentDevicePixelRatio;
  const halfWidth = width !== 0 ? Math.max(width / 2, 0.5) : 0;
  return Math.round((pixel - halfWidth) * devicePixelRatio) / devicePixelRatio + halfWidth;
}
function clearCanvas(canvas, ctx) {
  ctx = ctx || canvas.getContext("2d");
  ctx.save();
  ctx.resetTransform();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}
function drawPoint(ctx, options, x, y) {
  drawPointLegend(ctx, options, x, y, null);
}
function drawPointLegend(ctx, options, x, y, w) {
  let type, xOffset, yOffset, size, cornerRadius, width, xOffsetW, yOffsetW;
  const style = options.pointStyle;
  const rotation = options.rotation;
  const radius = options.radius;
  let rad = (rotation || 0) * RAD_PER_DEG;
  if (style && typeof style === "object") {
    type = style.toString();
    if (type === "[object HTMLImageElement]" || type === "[object HTMLCanvasElement]") {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rad);
      ctx.drawImage(style, -style.width / 2, -style.height / 2, style.width, style.height);
      ctx.restore();
      return;
    }
  }
  if (isNaN(radius) || radius <= 0) {
    return;
  }
  ctx.beginPath();
  switch (style) {
    default:
      if (w) {
        ctx.ellipse(x, y, w / 2, radius, 0, 0, TAU);
      } else {
        ctx.arc(x, y, radius, 0, TAU);
      }
      ctx.closePath();
      break;
    case "triangle":
      width = w ? w / 2 : radius;
      ctx.moveTo(x + Math.sin(rad) * width, y - Math.cos(rad) * radius);
      rad += TWO_THIRDS_PI;
      ctx.lineTo(x + Math.sin(rad) * width, y - Math.cos(rad) * radius);
      rad += TWO_THIRDS_PI;
      ctx.lineTo(x + Math.sin(rad) * width, y - Math.cos(rad) * radius);
      ctx.closePath();
      break;
    case "rectRounded":
      cornerRadius = radius * 0.516;
      size = radius - cornerRadius;
      xOffset = Math.cos(rad + QUARTER_PI) * size;
      xOffsetW = Math.cos(rad + QUARTER_PI) * (w ? w / 2 - cornerRadius : size);
      yOffset = Math.sin(rad + QUARTER_PI) * size;
      yOffsetW = Math.sin(rad + QUARTER_PI) * (w ? w / 2 - cornerRadius : size);
      ctx.arc(x - xOffsetW, y - yOffset, cornerRadius, rad - PI, rad - HALF_PI);
      ctx.arc(x + yOffsetW, y - xOffset, cornerRadius, rad - HALF_PI, rad);
      ctx.arc(x + xOffsetW, y + yOffset, cornerRadius, rad, rad + HALF_PI);
      ctx.arc(x - yOffsetW, y + xOffset, cornerRadius, rad + HALF_PI, rad + PI);
      ctx.closePath();
      break;
    case "rect":
      if (!rotation) {
        size = Math.SQRT1_2 * radius;
        width = w ? w / 2 : size;
        ctx.rect(x - width, y - size, 2 * width, 2 * size);
        break;
      }
      rad += QUARTER_PI;
    case "rectRot":
      xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
      xOffset = Math.cos(rad) * radius;
      yOffset = Math.sin(rad) * radius;
      yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
      ctx.moveTo(x - xOffsetW, y - yOffset);
      ctx.lineTo(x + yOffsetW, y - xOffset);
      ctx.lineTo(x + xOffsetW, y + yOffset);
      ctx.lineTo(x - yOffsetW, y + xOffset);
      ctx.closePath();
      break;
    case "crossRot":
      rad += QUARTER_PI;
    case "cross":
      xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
      xOffset = Math.cos(rad) * radius;
      yOffset = Math.sin(rad) * radius;
      yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
      ctx.moveTo(x - xOffsetW, y - yOffset);
      ctx.lineTo(x + xOffsetW, y + yOffset);
      ctx.moveTo(x + yOffsetW, y - xOffset);
      ctx.lineTo(x - yOffsetW, y + xOffset);
      break;
    case "star":
      xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
      xOffset = Math.cos(rad) * radius;
      yOffset = Math.sin(rad) * radius;
      yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
      ctx.moveTo(x - xOffsetW, y - yOffset);
      ctx.lineTo(x + xOffsetW, y + yOffset);
      ctx.moveTo(x + yOffsetW, y - xOffset);
      ctx.lineTo(x - yOffsetW, y + xOffset);
      rad += QUARTER_PI;
      xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
      xOffset = Math.cos(rad) * radius;
      yOffset = Math.sin(rad) * radius;
      yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
      ctx.moveTo(x - xOffsetW, y - yOffset);
      ctx.lineTo(x + xOffsetW, y + yOffset);
      ctx.moveTo(x + yOffsetW, y - xOffset);
      ctx.lineTo(x - yOffsetW, y + xOffset);
      break;
    case "line":
      xOffset = w ? w / 2 : Math.cos(rad) * radius;
      yOffset = Math.sin(rad) * radius;
      ctx.moveTo(x - xOffset, y - yOffset);
      ctx.lineTo(x + xOffset, y + yOffset);
      break;
    case "dash":
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(rad) * (w ? w / 2 : radius), y + Math.sin(rad) * radius);
      break;
    case false:
      ctx.closePath();
      break;
  }
  ctx.fill();
  if (options.borderWidth > 0) {
    ctx.stroke();
  }
}
function _isPointInArea(point, area, margin) {
  margin = margin || 0.5;
  return !area || point && point.x > area.left - margin && point.x < area.right + margin && point.y > area.top - margin && point.y < area.bottom + margin;
}
function clipArea(ctx, area) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(area.left, area.top, area.right - area.left, area.bottom - area.top);
  ctx.clip();
}
function unclipArea(ctx) {
  ctx.restore();
}
function setRenderOpts(ctx, opts) {
  if (opts.translation) {
    ctx.translate(opts.translation[0], opts.translation[1]);
  }
  if (!isNullOrUndef(opts.rotation)) {
    ctx.rotate(opts.rotation);
  }
  if (opts.color) {
    ctx.fillStyle = opts.color;
  }
  if (opts.textAlign) {
    ctx.textAlign = opts.textAlign;
  }
  if (opts.textBaseline) {
    ctx.textBaseline = opts.textBaseline;
  }
}
function decorateText(ctx, x, y, line, opts) {
  if (opts.strikethrough || opts.underline) {
    const metrics = ctx.measureText(line);
    const left = x - metrics.actualBoundingBoxLeft;
    const right = x + metrics.actualBoundingBoxRight;
    const top = y - metrics.actualBoundingBoxAscent;
    const bottom = y + metrics.actualBoundingBoxDescent;
    const yDecoration = opts.strikethrough ? (top + bottom) / 2 : bottom;
    ctx.strokeStyle = ctx.fillStyle;
    ctx.beginPath();
    ctx.lineWidth = opts.decorationWidth || 2;
    ctx.moveTo(left, yDecoration);
    ctx.lineTo(right, yDecoration);
    ctx.stroke();
  }
}
function drawBackdrop(ctx, opts) {
  const oldColor = ctx.fillStyle;
  ctx.fillStyle = opts.color;
  ctx.fillRect(opts.left, opts.top, opts.width, opts.height);
  ctx.fillStyle = oldColor;
}
function renderText(ctx, text, x, y, font, opts = {}) {
  const lines = isArray(text) ? text : [
    text
  ];
  const stroke = opts.strokeWidth > 0 && opts.strokeColor !== "";
  let i, line;
  ctx.save();
  ctx.font = font.string;
  setRenderOpts(ctx, opts);
  for (i = 0; i < lines.length; ++i) {
    line = lines[i];
    if (opts.backdrop) {
      drawBackdrop(ctx, opts.backdrop);
    }
    if (stroke) {
      if (opts.strokeColor) {
        ctx.strokeStyle = opts.strokeColor;
      }
      if (!isNullOrUndef(opts.strokeWidth)) {
        ctx.lineWidth = opts.strokeWidth;
      }
      ctx.strokeText(line, x, y, opts.maxWidth);
    }
    ctx.fillText(line, x, y, opts.maxWidth);
    decorateText(ctx, x, y, line, opts);
    y += Number(font.lineHeight);
  }
  ctx.restore();
}
function addRoundedRectPath(ctx, rect) {
  const { x, y, w, h: h4, radius } = rect;
  ctx.arc(x + radius.topLeft, y + radius.topLeft, radius.topLeft, 1.5 * PI, PI, true);
  ctx.lineTo(x, y + h4 - radius.bottomLeft);
  ctx.arc(x + radius.bottomLeft, y + h4 - radius.bottomLeft, radius.bottomLeft, PI, HALF_PI, true);
  ctx.lineTo(x + w - radius.bottomRight, y + h4);
  ctx.arc(x + w - radius.bottomRight, y + h4 - radius.bottomRight, radius.bottomRight, HALF_PI, 0, true);
  ctx.lineTo(x + w, y + radius.topRight);
  ctx.arc(x + w - radius.topRight, y + radius.topRight, radius.topRight, 0, -HALF_PI, true);
  ctx.lineTo(x + radius.topLeft, y);
}
var LINE_HEIGHT = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/;
var FONT_STYLE = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function toLineHeight(value, size) {
  const matches = ("" + value).match(LINE_HEIGHT);
  if (!matches || matches[1] === "normal") {
    return size * 1.2;
  }
  value = +matches[2];
  switch (matches[3]) {
    case "px":
      return value;
    case "%":
      value /= 100;
      break;
  }
  return size * value;
}
var numberOrZero = (v) => +v || 0;
function _readValueToProps(value, props) {
  const ret = {};
  const objProps = isObject(props);
  const keys = objProps ? Object.keys(props) : props;
  const read = isObject(value) ? objProps ? (prop) => valueOrDefault(value[prop], value[props[prop]]) : (prop) => value[prop] : () => value;
  for (const prop of keys) {
    ret[prop] = numberOrZero(read(prop));
  }
  return ret;
}
function toTRBL(value) {
  return _readValueToProps(value, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function toTRBLCorners(value) {
  return _readValueToProps(value, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function toPadding(value) {
  const obj = toTRBL(value);
  obj.width = obj.left + obj.right;
  obj.height = obj.top + obj.bottom;
  return obj;
}
function toFont(options, fallback) {
  options = options || {};
  fallback = fallback || defaults.font;
  let size = valueOrDefault(options.size, fallback.size);
  if (typeof size === "string") {
    size = parseInt(size, 10);
  }
  let style = valueOrDefault(options.style, fallback.style);
  if (style && !("" + style).match(FONT_STYLE)) {
    console.warn('Invalid font style specified: "' + style + '"');
    style = void 0;
  }
  const font = {
    family: valueOrDefault(options.family, fallback.family),
    lineHeight: toLineHeight(valueOrDefault(options.lineHeight, fallback.lineHeight), size),
    size,
    style,
    weight: valueOrDefault(options.weight, fallback.weight),
    string: ""
  };
  font.string = toFontString(font);
  return font;
}
function resolve(inputs, context, index, info) {
  let cacheable = true;
  let i, ilen, value;
  for (i = 0, ilen = inputs.length; i < ilen; ++i) {
    value = inputs[i];
    if (value === void 0) {
      continue;
    }
    if (context !== void 0 && typeof value === "function") {
      value = value(context);
      cacheable = false;
    }
    if (index !== void 0 && isArray(value)) {
      value = value[index % value.length];
      cacheable = false;
    }
    if (value !== void 0) {
      if (info && !cacheable) {
        info.cacheable = false;
      }
      return value;
    }
  }
}
function _addGrace(minmax, grace, beginAtZero) {
  const { min, max } = minmax;
  const change = toDimension(grace, (max - min) / 2);
  const keepZero = (value, add) => beginAtZero && value === 0 ? 0 : value + add;
  return {
    min: keepZero(min, -Math.abs(change)),
    max: keepZero(max, change)
  };
}
function createContext(parentContext, context) {
  return Object.assign(Object.create(parentContext), context);
}
function _createResolver(scopes, prefixes = [
  ""
], rootScopes, fallback, getTarget = () => scopes[0]) {
  const finalRootScopes = rootScopes || scopes;
  if (typeof fallback === "undefined") {
    fallback = _resolve("_fallback", scopes);
  }
  const cache = {
    [Symbol.toStringTag]: "Object",
    _cacheable: true,
    _scopes: scopes,
    _rootScopes: finalRootScopes,
    _fallback: fallback,
    _getTarget: getTarget,
    override: (scope) => _createResolver([
      scope,
      ...scopes
    ], prefixes, finalRootScopes, fallback)
  };
  return new Proxy(cache, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(target, prop) {
      delete target[prop];
      delete target._keys;
      delete scopes[0][prop];
      return true;
    },
    /**
    * A trap for getting property values.
    */
    get(target, prop) {
      return _cached(target, prop, () => _resolveWithPrefixes(prop, prefixes, scopes, target));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(target, prop) {
      return Reflect.getOwnPropertyDescriptor(target._scopes[0], prop);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(scopes[0]);
    },
    /**
    * A trap for the in operator.
    */
    has(target, prop) {
      return getKeysFromAllScopes(target).includes(prop);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(target) {
      return getKeysFromAllScopes(target);
    },
    /**
    * A trap for setting property values.
    */
    set(target, prop, value) {
      const storage = target._storage || (target._storage = getTarget());
      target[prop] = storage[prop] = value;
      delete target._keys;
      return true;
    }
  });
}
function _attachContext(proxy, context, subProxy, descriptorDefaults) {
  const cache = {
    _cacheable: false,
    _proxy: proxy,
    _context: context,
    _subProxy: subProxy,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: _descriptors(proxy, descriptorDefaults),
    setContext: (ctx) => _attachContext(proxy, ctx, subProxy, descriptorDefaults),
    override: (scope) => _attachContext(proxy.override(scope), context, subProxy, descriptorDefaults)
  };
  return new Proxy(cache, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(target, prop) {
      delete target[prop];
      delete proxy[prop];
      return true;
    },
    /**
    * A trap for getting property values.
    */
    get(target, prop, receiver) {
      return _cached(target, prop, () => _resolveWithContext(target, prop, receiver));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(target, prop) {
      return target._descriptors.allKeys ? Reflect.has(proxy, prop) ? {
        enumerable: true,
        configurable: true
      } : void 0 : Reflect.getOwnPropertyDescriptor(proxy, prop);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(proxy);
    },
    /**
    * A trap for the in operator.
    */
    has(target, prop) {
      return Reflect.has(proxy, prop);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys() {
      return Reflect.ownKeys(proxy);
    },
    /**
    * A trap for setting property values.
    */
    set(target, prop, value) {
      proxy[prop] = value;
      delete target[prop];
      return true;
    }
  });
}
function _descriptors(proxy, defaults2 = {
  scriptable: true,
  indexable: true
}) {
  const { _scriptable = defaults2.scriptable, _indexable = defaults2.indexable, _allKeys = defaults2.allKeys } = proxy;
  return {
    allKeys: _allKeys,
    scriptable: _scriptable,
    indexable: _indexable,
    isScriptable: isFunction(_scriptable) ? _scriptable : () => _scriptable,
    isIndexable: isFunction(_indexable) ? _indexable : () => _indexable
  };
}
var readKey = (prefix, name) => prefix ? prefix + _capitalize(name) : name;
var needsSubResolver = (prop, value) => isObject(value) && prop !== "adapters" && (Object.getPrototypeOf(value) === null || value.constructor === Object);
function _cached(target, prop, resolve2) {
  if (Object.prototype.hasOwnProperty.call(target, prop)) {
    return target[prop];
  }
  const value = resolve2();
  target[prop] = value;
  return value;
}
function _resolveWithContext(target, prop, receiver) {
  const { _proxy, _context, _subProxy, _descriptors: descriptors2 } = target;
  let value = _proxy[prop];
  if (isFunction(value) && descriptors2.isScriptable(prop)) {
    value = _resolveScriptable(prop, value, target, receiver);
  }
  if (isArray(value) && value.length) {
    value = _resolveArray(prop, value, target, descriptors2.isIndexable);
  }
  if (needsSubResolver(prop, value)) {
    value = _attachContext(value, _context, _subProxy && _subProxy[prop], descriptors2);
  }
  return value;
}
function _resolveScriptable(prop, getValue, target, receiver) {
  const { _proxy, _context, _subProxy, _stack } = target;
  if (_stack.has(prop)) {
    throw new Error("Recursion detected: " + Array.from(_stack).join("->") + "->" + prop);
  }
  _stack.add(prop);
  let value = getValue(_context, _subProxy || receiver);
  _stack.delete(prop);
  if (needsSubResolver(prop, value)) {
    value = createSubResolver(_proxy._scopes, _proxy, prop, value);
  }
  return value;
}
function _resolveArray(prop, value, target, isIndexable) {
  const { _proxy, _context, _subProxy, _descriptors: descriptors2 } = target;
  if (typeof _context.index !== "undefined" && isIndexable(prop)) {
    return value[_context.index % value.length];
  } else if (isObject(value[0])) {
    const arr = value;
    const scopes = _proxy._scopes.filter((s) => s !== arr);
    value = [];
    for (const item of arr) {
      const resolver = createSubResolver(scopes, _proxy, prop, item);
      value.push(_attachContext(resolver, _context, _subProxy && _subProxy[prop], descriptors2));
    }
  }
  return value;
}
function resolveFallback(fallback, prop, value) {
  return isFunction(fallback) ? fallback(prop, value) : fallback;
}
var getScope = (key, parent) => key === true ? parent : typeof key === "string" ? resolveObjectKey(parent, key) : void 0;
function addScopes(set2, parentScopes, key, parentFallback, value) {
  for (const parent of parentScopes) {
    const scope = getScope(key, parent);
    if (scope) {
      set2.add(scope);
      const fallback = resolveFallback(scope._fallback, key, value);
      if (typeof fallback !== "undefined" && fallback !== key && fallback !== parentFallback) {
        return fallback;
      }
    } else if (scope === false && typeof parentFallback !== "undefined" && key !== parentFallback) {
      return null;
    }
  }
  return false;
}
function createSubResolver(parentScopes, resolver, prop, value) {
  const rootScopes = resolver._rootScopes;
  const fallback = resolveFallback(resolver._fallback, prop, value);
  const allScopes = [
    ...parentScopes,
    ...rootScopes
  ];
  const set2 = /* @__PURE__ */ new Set();
  set2.add(value);
  let key = addScopesFromKey(set2, allScopes, prop, fallback || prop, value);
  if (key === null) {
    return false;
  }
  if (typeof fallback !== "undefined" && fallback !== prop) {
    key = addScopesFromKey(set2, allScopes, fallback, key, value);
    if (key === null) {
      return false;
    }
  }
  return _createResolver(Array.from(set2), [
    ""
  ], rootScopes, fallback, () => subGetTarget(resolver, prop, value));
}
function addScopesFromKey(set2, allScopes, key, fallback, item) {
  while (key) {
    key = addScopes(set2, allScopes, key, fallback, item);
  }
  return key;
}
function subGetTarget(resolver, prop, value) {
  const parent = resolver._getTarget();
  if (!(prop in parent)) {
    parent[prop] = {};
  }
  const target = parent[prop];
  if (isArray(target) && isObject(value)) {
    return value;
  }
  return target || {};
}
function _resolveWithPrefixes(prop, prefixes, scopes, proxy) {
  let value;
  for (const prefix of prefixes) {
    value = _resolve(readKey(prefix, prop), scopes);
    if (typeof value !== "undefined") {
      return needsSubResolver(prop, value) ? createSubResolver(scopes, proxy, prop, value) : value;
    }
  }
}
function _resolve(key, scopes) {
  for (const scope of scopes) {
    if (!scope) {
      continue;
    }
    const value = scope[key];
    if (typeof value !== "undefined") {
      return value;
    }
  }
}
function getKeysFromAllScopes(target) {
  let keys = target._keys;
  if (!keys) {
    keys = target._keys = resolveKeysFromAllScopes(target._scopes);
  }
  return keys;
}
function resolveKeysFromAllScopes(scopes) {
  const set2 = /* @__PURE__ */ new Set();
  for (const scope of scopes) {
    for (const key of Object.keys(scope).filter((k) => !k.startsWith("_"))) {
      set2.add(key);
    }
  }
  return Array.from(set2);
}
var EPSILON = Number.EPSILON || 1e-14;
function _isDomSupported() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}
function _getParentNode(domNode) {
  let parent = domNode.parentNode;
  if (parent && parent.toString() === "[object ShadowRoot]") {
    parent = parent.host;
  }
  return parent;
}
function parseMaxStyle(styleValue, node, parentProperty) {
  let valueInPixels;
  if (typeof styleValue === "string") {
    valueInPixels = parseInt(styleValue, 10);
    if (styleValue.indexOf("%") !== -1) {
      valueInPixels = valueInPixels / 100 * node.parentNode[parentProperty];
    }
  } else {
    valueInPixels = styleValue;
  }
  return valueInPixels;
}
var getComputedStyle2 = (element) => element.ownerDocument.defaultView.getComputedStyle(element, null);
function getStyle(el, property) {
  return getComputedStyle2(el).getPropertyValue(property);
}
var positions = [
  "top",
  "right",
  "bottom",
  "left"
];
function getPositionedStyle(styles, style, suffix) {
  const result = {};
  suffix = suffix ? "-" + suffix : "";
  for (let i = 0; i < 4; i++) {
    const pos = positions[i];
    result[pos] = parseFloat(styles[style + "-" + pos + suffix]) || 0;
  }
  result.width = result.left + result.right;
  result.height = result.top + result.bottom;
  return result;
}
var useOffsetPos = (x, y, target) => (x > 0 || y > 0) && (!target || !target.shadowRoot);
function getCanvasPosition(e, canvas) {
  const touches = e.touches;
  const source = touches && touches.length ? touches[0] : e;
  const { offsetX, offsetY } = source;
  let box = false;
  let x, y;
  if (useOffsetPos(offsetX, offsetY, e.target)) {
    x = offsetX;
    y = offsetY;
  } else {
    const rect = canvas.getBoundingClientRect();
    x = source.clientX - rect.left;
    y = source.clientY - rect.top;
    box = true;
  }
  return {
    x,
    y,
    box
  };
}
function getRelativePosition(event, chart) {
  if ("native" in event) {
    return event;
  }
  const { canvas, currentDevicePixelRatio } = chart;
  const style = getComputedStyle2(canvas);
  const borderBox = style.boxSizing === "border-box";
  const paddings = getPositionedStyle(style, "padding");
  const borders = getPositionedStyle(style, "border", "width");
  const { x, y, box } = getCanvasPosition(event, canvas);
  const xOffset = paddings.left + (box && borders.left);
  const yOffset = paddings.top + (box && borders.top);
  let { width, height } = chart;
  if (borderBox) {
    width -= paddings.width + borders.width;
    height -= paddings.height + borders.height;
  }
  return {
    x: Math.round((x - xOffset) / width * canvas.width / currentDevicePixelRatio),
    y: Math.round((y - yOffset) / height * canvas.height / currentDevicePixelRatio)
  };
}
function getContainerSize(canvas, width, height) {
  let maxWidth, maxHeight;
  if (width === void 0 || height === void 0) {
    const container = _getParentNode(canvas);
    if (!container) {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
    } else {
      const rect = container.getBoundingClientRect();
      const containerStyle = getComputedStyle2(container);
      const containerBorder = getPositionedStyle(containerStyle, "border", "width");
      const containerPadding = getPositionedStyle(containerStyle, "padding");
      width = rect.width - containerPadding.width - containerBorder.width;
      height = rect.height - containerPadding.height - containerBorder.height;
      maxWidth = parseMaxStyle(containerStyle.maxWidth, container, "clientWidth");
      maxHeight = parseMaxStyle(containerStyle.maxHeight, container, "clientHeight");
    }
  }
  return {
    width,
    height,
    maxWidth: maxWidth || INFINITY,
    maxHeight: maxHeight || INFINITY
  };
}
var round1 = (v) => Math.round(v * 10) / 10;
function getMaximumSize(canvas, bbWidth, bbHeight, aspectRatio) {
  const style = getComputedStyle2(canvas);
  const margins = getPositionedStyle(style, "margin");
  const maxWidth = parseMaxStyle(style.maxWidth, canvas, "clientWidth") || INFINITY;
  const maxHeight = parseMaxStyle(style.maxHeight, canvas, "clientHeight") || INFINITY;
  const containerSize = getContainerSize(canvas, bbWidth, bbHeight);
  let { width, height } = containerSize;
  if (style.boxSizing === "content-box") {
    const borders = getPositionedStyle(style, "border", "width");
    const paddings = getPositionedStyle(style, "padding");
    width -= paddings.width + borders.width;
    height -= paddings.height + borders.height;
  }
  width = Math.max(0, width - margins.width);
  height = Math.max(0, aspectRatio ? width / aspectRatio : height - margins.height);
  width = round1(Math.min(width, maxWidth, containerSize.maxWidth));
  height = round1(Math.min(height, maxHeight, containerSize.maxHeight));
  if (width && !height) {
    height = round1(width / 2);
  }
  const maintainHeight = bbWidth !== void 0 || bbHeight !== void 0;
  if (maintainHeight && aspectRatio && containerSize.height && height > containerSize.height) {
    height = containerSize.height;
    width = round1(Math.floor(height * aspectRatio));
  }
  return {
    width,
    height
  };
}
function retinaScale(chart, forceRatio, forceStyle) {
  const pixelRatio = forceRatio || 1;
  const deviceHeight = Math.floor(chart.height * pixelRatio);
  const deviceWidth = Math.floor(chart.width * pixelRatio);
  chart.height = Math.floor(chart.height);
  chart.width = Math.floor(chart.width);
  const canvas = chart.canvas;
  if (canvas.style && (forceStyle || !canvas.style.height && !canvas.style.width)) {
    canvas.style.height = `${chart.height}px`;
    canvas.style.width = `${chart.width}px`;
  }
  if (chart.currentDevicePixelRatio !== pixelRatio || canvas.height !== deviceHeight || canvas.width !== deviceWidth) {
    chart.currentDevicePixelRatio = pixelRatio;
    canvas.height = deviceHeight;
    canvas.width = deviceWidth;
    chart.ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    return true;
  }
  return false;
}
var supportsEventListenerOptions = function() {
  let passiveSupported = false;
  try {
    const options = {
      get passive() {
        passiveSupported = true;
        return false;
      }
    };
    if (_isDomSupported()) {
      window.addEventListener("test", null, options);
      window.removeEventListener("test", null, options);
    }
  } catch (e) {
  }
  return passiveSupported;
}();
function readUsedSize(element, property) {
  const value = getStyle(element, property);
  const matches = value && value.match(/^(\d+)(\.\d+)?px$/);
  return matches ? +matches[1] : void 0;
}
var getRightToLeftAdapter = function(rectX, width) {
  return {
    x(x) {
      return rectX + rectX + width - x;
    },
    setWidth(w) {
      width = w;
    },
    textAlign(align) {
      if (align === "center") {
        return align;
      }
      return align === "right" ? "left" : "right";
    },
    xPlus(x, value) {
      return x - value;
    },
    leftForLtr(x, itemWidth) {
      return x - itemWidth;
    }
  };
};
var getLeftToRightAdapter = function() {
  return {
    x(x) {
      return x;
    },
    setWidth(w) {
    },
    textAlign(align) {
      return align;
    },
    xPlus(x, value) {
      return x + value;
    },
    leftForLtr(x, _itemWidth) {
      return x;
    }
  };
};
function getRtlAdapter(rtl, rectX, width) {
  return rtl ? getRightToLeftAdapter(rectX, width) : getLeftToRightAdapter();
}
function overrideTextDirection(ctx, direction) {
  let style, original;
  if (direction === "ltr" || direction === "rtl") {
    style = ctx.canvas.style;
    original = [
      style.getPropertyValue("direction"),
      style.getPropertyPriority("direction")
    ];
    style.setProperty("direction", direction, "important");
    ctx.prevTextDirection = original;
  }
}
function restoreTextDirection(ctx, original) {
  if (original !== void 0) {
    delete ctx.prevTextDirection;
    ctx.canvas.style.setProperty("direction", original[0], original[1]);
  }
}

// node_modules/.pnpm/chart.js@4.4.1/node_modules/chart.js/dist/chart.js
var Animator = class {
  constructor() {
    this._request = null;
    this._charts = /* @__PURE__ */ new Map();
    this._running = false;
    this._lastDate = void 0;
  }
  _notify(chart, anims, date, type) {
    const callbacks = anims.listeners[type];
    const numSteps = anims.duration;
    callbacks.forEach((fn) => fn({
      chart,
      initial: anims.initial,
      numSteps,
      currentStep: Math.min(date - anims.start, numSteps)
    }));
  }
  _refresh() {
    if (this._request) {
      return;
    }
    this._running = true;
    this._request = requestAnimFrame.call(window, () => {
      this._update();
      this._request = null;
      if (this._running) {
        this._refresh();
      }
    });
  }
  _update(date = Date.now()) {
    let remaining = 0;
    this._charts.forEach((anims, chart) => {
      if (!anims.running || !anims.items.length) {
        return;
      }
      const items = anims.items;
      let i = items.length - 1;
      let draw = false;
      let item;
      for (; i >= 0; --i) {
        item = items[i];
        if (item._active) {
          if (item._total > anims.duration) {
            anims.duration = item._total;
          }
          item.tick(date);
          draw = true;
        } else {
          items[i] = items[items.length - 1];
          items.pop();
        }
      }
      if (draw) {
        chart.draw();
        this._notify(chart, anims, date, "progress");
      }
      if (!items.length) {
        anims.running = false;
        this._notify(chart, anims, date, "complete");
        anims.initial = false;
      }
      remaining += items.length;
    });
    this._lastDate = date;
    if (remaining === 0) {
      this._running = false;
    }
  }
  _getAnims(chart) {
    const charts = this._charts;
    let anims = charts.get(chart);
    if (!anims) {
      anims = {
        running: false,
        initial: true,
        items: [],
        listeners: {
          complete: [],
          progress: []
        }
      };
      charts.set(chart, anims);
    }
    return anims;
  }
  listen(chart, event, cb) {
    this._getAnims(chart).listeners[event].push(cb);
  }
  add(chart, items) {
    if (!items || !items.length) {
      return;
    }
    this._getAnims(chart).items.push(...items);
  }
  has(chart) {
    return this._getAnims(chart).items.length > 0;
  }
  start(chart) {
    const anims = this._charts.get(chart);
    if (!anims) {
      return;
    }
    anims.running = true;
    anims.start = Date.now();
    anims.duration = anims.items.reduce((acc, cur) => Math.max(acc, cur._duration), 0);
    this._refresh();
  }
  running(chart) {
    if (!this._running) {
      return false;
    }
    const anims = this._charts.get(chart);
    if (!anims || !anims.running || !anims.items.length) {
      return false;
    }
    return true;
  }
  stop(chart) {
    const anims = this._charts.get(chart);
    if (!anims || !anims.items.length) {
      return;
    }
    const items = anims.items;
    let i = items.length - 1;
    for (; i >= 0; --i) {
      items[i].cancel();
    }
    anims.items = [];
    this._notify(chart, anims, Date.now(), "complete");
  }
  remove(chart) {
    return this._charts.delete(chart);
  }
};
var animator = /* @__PURE__ */ new Animator();
var transparent = "transparent";
var interpolators = {
  boolean(from2, to2, factor) {
    return factor > 0.5 ? to2 : from2;
  },
  color(from2, to2, factor) {
    const c0 = color(from2 || transparent);
    const c1 = c0.valid && color(to2 || transparent);
    return c1 && c1.valid ? c1.mix(c0, factor).hexString() : to2;
  },
  number(from2, to2, factor) {
    return from2 + (to2 - from2) * factor;
  }
};
var Animation = class {
  constructor(cfg, target, prop, to2) {
    const currentValue = target[prop];
    to2 = resolve([
      cfg.to,
      to2,
      currentValue,
      cfg.from
    ]);
    const from2 = resolve([
      cfg.from,
      currentValue,
      to2
    ]);
    this._active = true;
    this._fn = cfg.fn || interpolators[cfg.type || typeof from2];
    this._easing = effects[cfg.easing] || effects.linear;
    this._start = Math.floor(Date.now() + (cfg.delay || 0));
    this._duration = this._total = Math.floor(cfg.duration);
    this._loop = !!cfg.loop;
    this._target = target;
    this._prop = prop;
    this._from = from2;
    this._to = to2;
    this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(cfg, to2, date) {
    if (this._active) {
      this._notify(false);
      const currentValue = this._target[this._prop];
      const elapsed = date - this._start;
      const remain = this._duration - elapsed;
      this._start = date;
      this._duration = Math.floor(Math.max(remain, cfg.duration));
      this._total += elapsed;
      this._loop = !!cfg.loop;
      this._to = resolve([
        cfg.to,
        to2,
        currentValue,
        cfg.from
      ]);
      this._from = resolve([
        cfg.from,
        currentValue,
        to2
      ]);
    }
  }
  cancel() {
    if (this._active) {
      this.tick(Date.now());
      this._active = false;
      this._notify(false);
    }
  }
  tick(date) {
    const elapsed = date - this._start;
    const duration = this._duration;
    const prop = this._prop;
    const from2 = this._from;
    const loop = this._loop;
    const to2 = this._to;
    let factor;
    this._active = from2 !== to2 && (loop || elapsed < duration);
    if (!this._active) {
      this._target[prop] = to2;
      this._notify(true);
      return;
    }
    if (elapsed < 0) {
      this._target[prop] = from2;
      return;
    }
    factor = elapsed / duration % 2;
    factor = loop && factor > 1 ? 2 - factor : factor;
    factor = this._easing(Math.min(1, Math.max(0, factor)));
    this._target[prop] = this._fn(from2, to2, factor);
  }
  wait() {
    const promises = this._promises || (this._promises = []);
    return new Promise((res, rej) => {
      promises.push({
        res,
        rej
      });
    });
  }
  _notify(resolved) {
    const method = resolved ? "res" : "rej";
    const promises = this._promises || [];
    for (let i = 0; i < promises.length; i++) {
      promises[i][method]();
    }
  }
};
var Animations = class {
  constructor(chart, config) {
    this._chart = chart;
    this._properties = /* @__PURE__ */ new Map();
    this.configure(config);
  }
  configure(config) {
    if (!isObject(config)) {
      return;
    }
    const animationOptions = Object.keys(defaults.animation);
    const animatedProps = this._properties;
    Object.getOwnPropertyNames(config).forEach((key) => {
      const cfg = config[key];
      if (!isObject(cfg)) {
        return;
      }
      const resolved = {};
      for (const option of animationOptions) {
        resolved[option] = cfg[option];
      }
      (isArray(cfg.properties) && cfg.properties || [
        key
      ]).forEach((prop) => {
        if (prop === key || !animatedProps.has(prop)) {
          animatedProps.set(prop, resolved);
        }
      });
    });
  }
  _animateOptions(target, values) {
    const newOptions = values.options;
    const options = resolveTargetOptions(target, newOptions);
    if (!options) {
      return [];
    }
    const animations = this._createAnimations(options, newOptions);
    if (newOptions.$shared) {
      awaitAll(target.options.$animations, newOptions).then(() => {
        target.options = newOptions;
      }, () => {
      });
    }
    return animations;
  }
  _createAnimations(target, values) {
    const animatedProps = this._properties;
    const animations = [];
    const running = target.$animations || (target.$animations = {});
    const props = Object.keys(values);
    const date = Date.now();
    let i;
    for (i = props.length - 1; i >= 0; --i) {
      const prop = props[i];
      if (prop.charAt(0) === "$") {
        continue;
      }
      if (prop === "options") {
        animations.push(...this._animateOptions(target, values));
        continue;
      }
      const value = values[prop];
      let animation = running[prop];
      const cfg = animatedProps.get(prop);
      if (animation) {
        if (cfg && animation.active()) {
          animation.update(cfg, value, date);
          continue;
        } else {
          animation.cancel();
        }
      }
      if (!cfg || !cfg.duration) {
        target[prop] = value;
        continue;
      }
      running[prop] = animation = new Animation(cfg, target, prop, value);
      animations.push(animation);
    }
    return animations;
  }
  update(target, values) {
    if (this._properties.size === 0) {
      Object.assign(target, values);
      return;
    }
    const animations = this._createAnimations(target, values);
    if (animations.length) {
      animator.add(this._chart, animations);
      return true;
    }
  }
};
function awaitAll(animations, properties) {
  const running = [];
  const keys = Object.keys(properties);
  for (let i = 0; i < keys.length; i++) {
    const anim = animations[keys[i]];
    if (anim && anim.active()) {
      running.push(anim.wait());
    }
  }
  return Promise.all(running);
}
function resolveTargetOptions(target, newOptions) {
  if (!newOptions) {
    return;
  }
  let options = target.options;
  if (!options) {
    target.options = newOptions;
    return;
  }
  if (options.$shared) {
    target.options = options = Object.assign({}, options, {
      $shared: false,
      $animations: {}
    });
  }
  return options;
}
function scaleClip(scale, allowedOverflow) {
  const opts = scale && scale.options || {};
  const reverse = opts.reverse;
  const min = opts.min === void 0 ? allowedOverflow : 0;
  const max = opts.max === void 0 ? allowedOverflow : 0;
  return {
    start: reverse ? max : min,
    end: reverse ? min : max
  };
}
function defaultClip(xScale, yScale, allowedOverflow) {
  if (allowedOverflow === false) {
    return false;
  }
  const x = scaleClip(xScale, allowedOverflow);
  const y = scaleClip(yScale, allowedOverflow);
  return {
    top: y.end,
    right: x.end,
    bottom: y.start,
    left: x.start
  };
}
function toClip(value) {
  let t2, r, b, l;
  if (isObject(value)) {
    t2 = value.top;
    r = value.right;
    b = value.bottom;
    l = value.left;
  } else {
    t2 = r = b = l = value;
  }
  return {
    top: t2,
    right: r,
    bottom: b,
    left: l,
    disabled: value === false
  };
}
function getSortedDatasetIndices(chart, filterVisible) {
  const keys = [];
  const metasets = chart._getSortedDatasetMetas(filterVisible);
  let i, ilen;
  for (i = 0, ilen = metasets.length; i < ilen; ++i) {
    keys.push(metasets[i].index);
  }
  return keys;
}
function applyStack(stack, value, dsIndex, options = {}) {
  const keys = stack.keys;
  const singleMode = options.mode === "single";
  let i, ilen, datasetIndex, otherValue;
  if (value === null) {
    return;
  }
  for (i = 0, ilen = keys.length; i < ilen; ++i) {
    datasetIndex = +keys[i];
    if (datasetIndex === dsIndex) {
      if (options.all) {
        continue;
      }
      break;
    }
    otherValue = stack.values[datasetIndex];
    if (isNumberFinite(otherValue) && (singleMode || value === 0 || sign(value) === sign(otherValue))) {
      value += otherValue;
    }
  }
  return value;
}
function convertObjectDataToArray(data) {
  const keys = Object.keys(data);
  const adata = new Array(keys.length);
  let i, ilen, key;
  for (i = 0, ilen = keys.length; i < ilen; ++i) {
    key = keys[i];
    adata[i] = {
      x: key,
      y: data[key]
    };
  }
  return adata;
}
function isStacked(scale, meta) {
  const stacked = scale && scale.options.stacked;
  return stacked || stacked === void 0 && meta.stack !== void 0;
}
function getStackKey(indexScale, valueScale, meta) {
  return `${indexScale.id}.${valueScale.id}.${meta.stack || meta.type}`;
}
function getUserBounds(scale) {
  const { min, max, minDefined, maxDefined } = scale.getUserBounds();
  return {
    min: minDefined ? min : Number.NEGATIVE_INFINITY,
    max: maxDefined ? max : Number.POSITIVE_INFINITY
  };
}
function getOrCreateStack(stacks, stackKey, indexValue) {
  const subStack = stacks[stackKey] || (stacks[stackKey] = {});
  return subStack[indexValue] || (subStack[indexValue] = {});
}
function getLastIndexInStack(stack, vScale, positive, type) {
  for (const meta of vScale.getMatchingVisibleMetas(type).reverse()) {
    const value = stack[meta.index];
    if (positive && value > 0 || !positive && value < 0) {
      return meta.index;
    }
  }
  return null;
}
function updateStacks(controller, parsed) {
  const { chart, _cachedMeta: meta } = controller;
  const stacks = chart._stacks || (chart._stacks = {});
  const { iScale, vScale, index: datasetIndex } = meta;
  const iAxis = iScale.axis;
  const vAxis = vScale.axis;
  const key = getStackKey(iScale, vScale, meta);
  const ilen = parsed.length;
  let stack;
  for (let i = 0; i < ilen; ++i) {
    const item = parsed[i];
    const { [iAxis]: index, [vAxis]: value } = item;
    const itemStacks = item._stacks || (item._stacks = {});
    stack = itemStacks[vAxis] = getOrCreateStack(stacks, key, index);
    stack[datasetIndex] = value;
    stack._top = getLastIndexInStack(stack, vScale, true, meta.type);
    stack._bottom = getLastIndexInStack(stack, vScale, false, meta.type);
    const visualValues = stack._visualValues || (stack._visualValues = {});
    visualValues[datasetIndex] = value;
  }
}
function getFirstScaleId(chart, axis) {
  const scales = chart.scales;
  return Object.keys(scales).filter((key) => scales[key].axis === axis).shift();
}
function createDatasetContext(parent, index) {
  return createContext(parent, {
    active: false,
    dataset: void 0,
    datasetIndex: index,
    index,
    mode: "default",
    type: "dataset"
  });
}
function createDataContext(parent, index, element) {
  return createContext(parent, {
    active: false,
    dataIndex: index,
    parsed: void 0,
    raw: void 0,
    element,
    index,
    mode: "default",
    type: "data"
  });
}
function clearStacks(meta, items) {
  const datasetIndex = meta.controller.index;
  const axis = meta.vScale && meta.vScale.axis;
  if (!axis) {
    return;
  }
  items = items || meta._parsed;
  for (const parsed of items) {
    const stacks = parsed._stacks;
    if (!stacks || stacks[axis] === void 0 || stacks[axis][datasetIndex] === void 0) {
      return;
    }
    delete stacks[axis][datasetIndex];
    if (stacks[axis]._visualValues !== void 0 && stacks[axis]._visualValues[datasetIndex] !== void 0) {
      delete stacks[axis]._visualValues[datasetIndex];
    }
  }
}
var isDirectUpdateMode = (mode) => mode === "reset" || mode === "none";
var cloneIfNotShared = (cached, shared) => shared ? cached : Object.assign({}, cached);
var createStack = (canStack, meta, chart) => canStack && !meta.hidden && meta._stacked && {
  keys: getSortedDatasetIndices(chart, true),
  values: null
};
var DatasetController = class {
  constructor(chart, datasetIndex) {
    this.chart = chart;
    this._ctx = chart.ctx;
    this.index = datasetIndex;
    this._cachedDataOpts = {};
    this._cachedMeta = this.getMeta();
    this._type = this._cachedMeta.type;
    this.options = void 0;
    this._parsing = false;
    this._data = void 0;
    this._objectData = void 0;
    this._sharedOptions = void 0;
    this._drawStart = void 0;
    this._drawCount = void 0;
    this.enableOptionSharing = false;
    this.supportsDecimation = false;
    this.$context = void 0;
    this._syncList = [];
    this.datasetElementType = new.target.datasetElementType;
    this.dataElementType = new.target.dataElementType;
    this.initialize();
  }
  initialize() {
    const meta = this._cachedMeta;
    this.configure();
    this.linkScales();
    meta._stacked = isStacked(meta.vScale, meta);
    this.addElements();
    if (this.options.fill && !this.chart.isPluginEnabled("filler")) {
      console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
    }
  }
  updateIndex(datasetIndex) {
    if (this.index !== datasetIndex) {
      clearStacks(this._cachedMeta);
    }
    this.index = datasetIndex;
  }
  linkScales() {
    const chart = this.chart;
    const meta = this._cachedMeta;
    const dataset = this.getDataset();
    const chooseId = (axis, x, y, r) => axis === "x" ? x : axis === "r" ? r : y;
    const xid = meta.xAxisID = valueOrDefault(dataset.xAxisID, getFirstScaleId(chart, "x"));
    const yid = meta.yAxisID = valueOrDefault(dataset.yAxisID, getFirstScaleId(chart, "y"));
    const rid = meta.rAxisID = valueOrDefault(dataset.rAxisID, getFirstScaleId(chart, "r"));
    const indexAxis = meta.indexAxis;
    const iid = meta.iAxisID = chooseId(indexAxis, xid, yid, rid);
    const vid = meta.vAxisID = chooseId(indexAxis, yid, xid, rid);
    meta.xScale = this.getScaleForId(xid);
    meta.yScale = this.getScaleForId(yid);
    meta.rScale = this.getScaleForId(rid);
    meta.iScale = this.getScaleForId(iid);
    meta.vScale = this.getScaleForId(vid);
  }
  getDataset() {
    return this.chart.data.datasets[this.index];
  }
  getMeta() {
    return this.chart.getDatasetMeta(this.index);
  }
  getScaleForId(scaleID) {
    return this.chart.scales[scaleID];
  }
  _getOtherScale(scale) {
    const meta = this._cachedMeta;
    return scale === meta.iScale ? meta.vScale : meta.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const meta = this._cachedMeta;
    if (this._data) {
      unlistenArrayEvents(this._data, this);
    }
    if (meta._stacked) {
      clearStacks(meta);
    }
  }
  _dataCheck() {
    const dataset = this.getDataset();
    const data = dataset.data || (dataset.data = []);
    const _data = this._data;
    if (isObject(data)) {
      this._data = convertObjectDataToArray(data);
    } else if (_data !== data) {
      if (_data) {
        unlistenArrayEvents(_data, this);
        const meta = this._cachedMeta;
        clearStacks(meta);
        meta._parsed = [];
      }
      if (data && Object.isExtensible(data)) {
        listenArrayEvents(data, this);
      }
      this._syncList = [];
      this._data = data;
    }
  }
  addElements() {
    const meta = this._cachedMeta;
    this._dataCheck();
    if (this.datasetElementType) {
      meta.dataset = new this.datasetElementType();
    }
  }
  buildOrUpdateElements(resetNewElements) {
    const meta = this._cachedMeta;
    const dataset = this.getDataset();
    let stackChanged = false;
    this._dataCheck();
    const oldStacked = meta._stacked;
    meta._stacked = isStacked(meta.vScale, meta);
    if (meta.stack !== dataset.stack) {
      stackChanged = true;
      clearStacks(meta);
      meta.stack = dataset.stack;
    }
    this._resyncElements(resetNewElements);
    if (stackChanged || oldStacked !== meta._stacked) {
      updateStacks(this, meta._parsed);
    }
  }
  configure() {
    const config = this.chart.config;
    const scopeKeys = config.datasetScopeKeys(this._type);
    const scopes = config.getOptionScopes(this.getDataset(), scopeKeys, true);
    this.options = config.createResolver(scopes, this.getContext());
    this._parsing = this.options.parsing;
    this._cachedDataOpts = {};
  }
  parse(start, count) {
    const { _cachedMeta: meta, _data: data } = this;
    const { iScale, _stacked } = meta;
    const iAxis = iScale.axis;
    let sorted = start === 0 && count === data.length ? true : meta._sorted;
    let prev = start > 0 && meta._parsed[start - 1];
    let i, cur, parsed;
    if (this._parsing === false) {
      meta._parsed = data;
      meta._sorted = true;
      parsed = data;
    } else {
      if (isArray(data[start])) {
        parsed = this.parseArrayData(meta, data, start, count);
      } else if (isObject(data[start])) {
        parsed = this.parseObjectData(meta, data, start, count);
      } else {
        parsed = this.parsePrimitiveData(meta, data, start, count);
      }
      const isNotInOrderComparedToPrev = () => cur[iAxis] === null || prev && cur[iAxis] < prev[iAxis];
      for (i = 0; i < count; ++i) {
        meta._parsed[i + start] = cur = parsed[i];
        if (sorted) {
          if (isNotInOrderComparedToPrev()) {
            sorted = false;
          }
          prev = cur;
        }
      }
      meta._sorted = sorted;
    }
    if (_stacked) {
      updateStacks(this, parsed);
    }
  }
  parsePrimitiveData(meta, data, start, count) {
    const { iScale, vScale } = meta;
    const iAxis = iScale.axis;
    const vAxis = vScale.axis;
    const labels = iScale.getLabels();
    const singleScale = iScale === vScale;
    const parsed = new Array(count);
    let i, ilen, index;
    for (i = 0, ilen = count; i < ilen; ++i) {
      index = i + start;
      parsed[i] = {
        [iAxis]: singleScale || iScale.parse(labels[index], index),
        [vAxis]: vScale.parse(data[index], index)
      };
    }
    return parsed;
  }
  parseArrayData(meta, data, start, count) {
    const { xScale, yScale } = meta;
    const parsed = new Array(count);
    let i, ilen, index, item;
    for (i = 0, ilen = count; i < ilen; ++i) {
      index = i + start;
      item = data[index];
      parsed[i] = {
        x: xScale.parse(item[0], index),
        y: yScale.parse(item[1], index)
      };
    }
    return parsed;
  }
  parseObjectData(meta, data, start, count) {
    const { xScale, yScale } = meta;
    const { xAxisKey = "x", yAxisKey = "y" } = this._parsing;
    const parsed = new Array(count);
    let i, ilen, index, item;
    for (i = 0, ilen = count; i < ilen; ++i) {
      index = i + start;
      item = data[index];
      parsed[i] = {
        x: xScale.parse(resolveObjectKey(item, xAxisKey), index),
        y: yScale.parse(resolveObjectKey(item, yAxisKey), index)
      };
    }
    return parsed;
  }
  getParsed(index) {
    return this._cachedMeta._parsed[index];
  }
  getDataElement(index) {
    return this._cachedMeta.data[index];
  }
  applyStack(scale, parsed, mode) {
    const chart = this.chart;
    const meta = this._cachedMeta;
    const value = parsed[scale.axis];
    const stack = {
      keys: getSortedDatasetIndices(chart, true),
      values: parsed._stacks[scale.axis]._visualValues
    };
    return applyStack(stack, value, meta.index, {
      mode
    });
  }
  updateRangeFromParsed(range, scale, parsed, stack) {
    const parsedValue = parsed[scale.axis];
    let value = parsedValue === null ? NaN : parsedValue;
    const values = stack && parsed._stacks[scale.axis];
    if (stack && values) {
      stack.values = values;
      value = applyStack(stack, parsedValue, this._cachedMeta.index);
    }
    range.min = Math.min(range.min, value);
    range.max = Math.max(range.max, value);
  }
  getMinMax(scale, canStack) {
    const meta = this._cachedMeta;
    const _parsed = meta._parsed;
    const sorted = meta._sorted && scale === meta.iScale;
    const ilen = _parsed.length;
    const otherScale = this._getOtherScale(scale);
    const stack = createStack(canStack, meta, this.chart);
    const range = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    };
    const { min: otherMin, max: otherMax } = getUserBounds(otherScale);
    let i, parsed;
    function _skip() {
      parsed = _parsed[i];
      const otherValue = parsed[otherScale.axis];
      return !isNumberFinite(parsed[scale.axis]) || otherMin > otherValue || otherMax < otherValue;
    }
    for (i = 0; i < ilen; ++i) {
      if (_skip()) {
        continue;
      }
      this.updateRangeFromParsed(range, scale, parsed, stack);
      if (sorted) {
        break;
      }
    }
    if (sorted) {
      for (i = ilen - 1; i >= 0; --i) {
        if (_skip()) {
          continue;
        }
        this.updateRangeFromParsed(range, scale, parsed, stack);
        break;
      }
    }
    return range;
  }
  getAllParsedValues(scale) {
    const parsed = this._cachedMeta._parsed;
    const values = [];
    let i, ilen, value;
    for (i = 0, ilen = parsed.length; i < ilen; ++i) {
      value = parsed[i][scale.axis];
      if (isNumberFinite(value)) {
        values.push(value);
      }
    }
    return values;
  }
  getMaxOverflow() {
    return false;
  }
  getLabelAndValue(index) {
    const meta = this._cachedMeta;
    const iScale = meta.iScale;
    const vScale = meta.vScale;
    const parsed = this.getParsed(index);
    return {
      label: iScale ? "" + iScale.getLabelForValue(parsed[iScale.axis]) : "",
      value: vScale ? "" + vScale.getLabelForValue(parsed[vScale.axis]) : ""
    };
  }
  _update(mode) {
    const meta = this._cachedMeta;
    this.update(mode || "default");
    meta._clip = toClip(valueOrDefault(this.options.clip, defaultClip(meta.xScale, meta.yScale, this.getMaxOverflow())));
  }
  update(mode) {
  }
  draw() {
    const ctx = this._ctx;
    const chart = this.chart;
    const meta = this._cachedMeta;
    const elements = meta.data || [];
    const area = chart.chartArea;
    const active = [];
    const start = this._drawStart || 0;
    const count = this._drawCount || elements.length - start;
    const drawActiveElementsOnTop = this.options.drawActiveElementsOnTop;
    let i;
    if (meta.dataset) {
      meta.dataset.draw(ctx, area, start, count);
    }
    for (i = start; i < start + count; ++i) {
      const element = elements[i];
      if (element.hidden) {
        continue;
      }
      if (element.active && drawActiveElementsOnTop) {
        active.push(element);
      } else {
        element.draw(ctx, area);
      }
    }
    for (i = 0; i < active.length; ++i) {
      active[i].draw(ctx, area);
    }
  }
  getStyle(index, active) {
    const mode = active ? "active" : "default";
    return index === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(mode) : this.resolveDataElementOptions(index || 0, mode);
  }
  getContext(index, active, mode) {
    const dataset = this.getDataset();
    let context;
    if (index >= 0 && index < this._cachedMeta.data.length) {
      const element = this._cachedMeta.data[index];
      context = element.$context || (element.$context = createDataContext(this.getContext(), index, element));
      context.parsed = this.getParsed(index);
      context.raw = dataset.data[index];
      context.index = context.dataIndex = index;
    } else {
      context = this.$context || (this.$context = createDatasetContext(this.chart.getContext(), this.index));
      context.dataset = dataset;
      context.index = context.datasetIndex = this.index;
    }
    context.active = !!active;
    context.mode = mode;
    return context;
  }
  resolveDatasetElementOptions(mode) {
    return this._resolveElementOptions(this.datasetElementType.id, mode);
  }
  resolveDataElementOptions(index, mode) {
    return this._resolveElementOptions(this.dataElementType.id, mode, index);
  }
  _resolveElementOptions(elementType, mode = "default", index) {
    const active = mode === "active";
    const cache = this._cachedDataOpts;
    const cacheKey = elementType + "-" + mode;
    const cached = cache[cacheKey];
    const sharing = this.enableOptionSharing && defined(index);
    if (cached) {
      return cloneIfNotShared(cached, sharing);
    }
    const config = this.chart.config;
    const scopeKeys = config.datasetElementScopeKeys(this._type, elementType);
    const prefixes = active ? [
      `${elementType}Hover`,
      "hover",
      elementType,
      ""
    ] : [
      elementType,
      ""
    ];
    const scopes = config.getOptionScopes(this.getDataset(), scopeKeys);
    const names2 = Object.keys(defaults.elements[elementType]);
    const context = () => this.getContext(index, active, mode);
    const values = config.resolveNamedOptions(scopes, names2, context, prefixes);
    if (values.$shared) {
      values.$shared = sharing;
      cache[cacheKey] = Object.freeze(cloneIfNotShared(values, sharing));
    }
    return values;
  }
  _resolveAnimations(index, transition, active) {
    const chart = this.chart;
    const cache = this._cachedDataOpts;
    const cacheKey = `animation-${transition}`;
    const cached = cache[cacheKey];
    if (cached) {
      return cached;
    }
    let options;
    if (chart.options.animation !== false) {
      const config = this.chart.config;
      const scopeKeys = config.datasetAnimationScopeKeys(this._type, transition);
      const scopes = config.getOptionScopes(this.getDataset(), scopeKeys);
      options = config.createResolver(scopes, this.getContext(index, active, transition));
    }
    const animations = new Animations(chart, options && options.animations);
    if (options && options._cacheable) {
      cache[cacheKey] = Object.freeze(animations);
    }
    return animations;
  }
  getSharedOptions(options) {
    if (!options.$shared) {
      return;
    }
    return this._sharedOptions || (this._sharedOptions = Object.assign({}, options));
  }
  includeOptions(mode, sharedOptions) {
    return !sharedOptions || isDirectUpdateMode(mode) || this.chart._animationsDisabled;
  }
  _getSharedOptions(start, mode) {
    const firstOpts = this.resolveDataElementOptions(start, mode);
    const previouslySharedOptions = this._sharedOptions;
    const sharedOptions = this.getSharedOptions(firstOpts);
    const includeOptions = this.includeOptions(mode, sharedOptions) || sharedOptions !== previouslySharedOptions;
    this.updateSharedOptions(sharedOptions, mode, firstOpts);
    return {
      sharedOptions,
      includeOptions
    };
  }
  updateElement(element, index, properties, mode) {
    if (isDirectUpdateMode(mode)) {
      Object.assign(element, properties);
    } else {
      this._resolveAnimations(index, mode).update(element, properties);
    }
  }
  updateSharedOptions(sharedOptions, mode, newOptions) {
    if (sharedOptions && !isDirectUpdateMode(mode)) {
      this._resolveAnimations(void 0, mode).update(sharedOptions, newOptions);
    }
  }
  _setStyle(element, index, mode, active) {
    element.active = active;
    const options = this.getStyle(index, active);
    this._resolveAnimations(index, mode, active).update(element, {
      options: !active && this.getSharedOptions(options) || options
    });
  }
  removeHoverStyle(element, datasetIndex, index) {
    this._setStyle(element, index, "active", false);
  }
  setHoverStyle(element, datasetIndex, index) {
    this._setStyle(element, index, "active", true);
  }
  _removeDatasetHoverStyle() {
    const element = this._cachedMeta.dataset;
    if (element) {
      this._setStyle(element, void 0, "active", false);
    }
  }
  _setDatasetHoverStyle() {
    const element = this._cachedMeta.dataset;
    if (element) {
      this._setStyle(element, void 0, "active", true);
    }
  }
  _resyncElements(resetNewElements) {
    const data = this._data;
    const elements = this._cachedMeta.data;
    for (const [method, arg1, arg2] of this._syncList) {
      this[method](arg1, arg2);
    }
    this._syncList = [];
    const numMeta = elements.length;
    const numData = data.length;
    const count = Math.min(numData, numMeta);
    if (count) {
      this.parse(0, count);
    }
    if (numData > numMeta) {
      this._insertElements(numMeta, numData - numMeta, resetNewElements);
    } else if (numData < numMeta) {
      this._removeElements(numData, numMeta - numData);
    }
  }
  _insertElements(start, count, resetNewElements = true) {
    const meta = this._cachedMeta;
    const data = meta.data;
    const end = start + count;
    let i;
    const move = (arr) => {
      arr.length += count;
      for (i = arr.length - 1; i >= end; i--) {
        arr[i] = arr[i - count];
      }
    };
    move(data);
    for (i = start; i < end; ++i) {
      data[i] = new this.dataElementType();
    }
    if (this._parsing) {
      move(meta._parsed);
    }
    this.parse(start, count);
    if (resetNewElements) {
      this.updateElements(data, start, count, "reset");
    }
  }
  updateElements(element, start, count, mode) {
  }
  _removeElements(start, count) {
    const meta = this._cachedMeta;
    if (this._parsing) {
      const removed = meta._parsed.splice(start, count);
      if (meta._stacked) {
        clearStacks(meta, removed);
      }
    }
    meta.data.splice(start, count);
  }
  _sync(args) {
    if (this._parsing) {
      this._syncList.push(args);
    } else {
      const [method, arg1, arg2] = args;
      this[method](arg1, arg2);
    }
    this.chart._dataChanges.push([
      this.index,
      ...args
    ]);
  }
  _onDataPush() {
    const count = arguments.length;
    this._sync([
      "_insertElements",
      this.getDataset().data.length - count,
      count
    ]);
  }
  _onDataPop() {
    this._sync([
      "_removeElements",
      this._cachedMeta.data.length - 1,
      1
    ]);
  }
  _onDataShift() {
    this._sync([
      "_removeElements",
      0,
      1
    ]);
  }
  _onDataSplice(start, count) {
    if (count) {
      this._sync([
        "_removeElements",
        start,
        count
      ]);
    }
    const newCount = arguments.length - 2;
    if (newCount) {
      this._sync([
        "_insertElements",
        start,
        newCount
      ]);
    }
  }
  _onDataUnshift() {
    this._sync([
      "_insertElements",
      0,
      arguments.length
    ]);
  }
};
__publicField(DatasetController, "defaults", {});
__publicField(DatasetController, "datasetElementType", null);
__publicField(DatasetController, "dataElementType", null);
function getAllScaleValues(scale, type) {
  if (!scale._cache.$bar) {
    const visibleMetas = scale.getMatchingVisibleMetas(type);
    let values = [];
    for (let i = 0, ilen = visibleMetas.length; i < ilen; i++) {
      values = values.concat(visibleMetas[i].controller.getAllParsedValues(scale));
    }
    scale._cache.$bar = _arrayUnique(values.sort((a, b) => a - b));
  }
  return scale._cache.$bar;
}
function computeMinSampleSize(meta) {
  const scale = meta.iScale;
  const values = getAllScaleValues(scale, meta.type);
  let min = scale._length;
  let i, ilen, curr, prev;
  const updateMinAndPrev = () => {
    if (curr === 32767 || curr === -32768) {
      return;
    }
    if (defined(prev)) {
      min = Math.min(min, Math.abs(curr - prev) || min);
    }
    prev = curr;
  };
  for (i = 0, ilen = values.length; i < ilen; ++i) {
    curr = scale.getPixelForValue(values[i]);
    updateMinAndPrev();
  }
  prev = void 0;
  for (i = 0, ilen = scale.ticks.length; i < ilen; ++i) {
    curr = scale.getPixelForTick(i);
    updateMinAndPrev();
  }
  return min;
}
function computeFitCategoryTraits(index, ruler, options, stackCount) {
  const thickness = options.barThickness;
  let size, ratio;
  if (isNullOrUndef(thickness)) {
    size = ruler.min * options.categoryPercentage;
    ratio = options.barPercentage;
  } else {
    size = thickness * stackCount;
    ratio = 1;
  }
  return {
    chunk: size / stackCount,
    ratio,
    start: ruler.pixels[index] - size / 2
  };
}
function computeFlexCategoryTraits(index, ruler, options, stackCount) {
  const pixels = ruler.pixels;
  const curr = pixels[index];
  let prev = index > 0 ? pixels[index - 1] : null;
  let next = index < pixels.length - 1 ? pixels[index + 1] : null;
  const percent = options.categoryPercentage;
  if (prev === null) {
    prev = curr - (next === null ? ruler.end - ruler.start : next - curr);
  }
  if (next === null) {
    next = curr + curr - prev;
  }
  const start = curr - (curr - Math.min(prev, next)) / 2 * percent;
  const size = Math.abs(next - prev) / 2 * percent;
  return {
    chunk: size / stackCount,
    ratio: options.barPercentage,
    start
  };
}
function parseFloatBar(entry, item, vScale, i) {
  const startValue = vScale.parse(entry[0], i);
  const endValue = vScale.parse(entry[1], i);
  const min = Math.min(startValue, endValue);
  const max = Math.max(startValue, endValue);
  let barStart = min;
  let barEnd = max;
  if (Math.abs(min) > Math.abs(max)) {
    barStart = max;
    barEnd = min;
  }
  item[vScale.axis] = barEnd;
  item._custom = {
    barStart,
    barEnd,
    start: startValue,
    end: endValue,
    min,
    max
  };
}
function parseValue(entry, item, vScale, i) {
  if (isArray(entry)) {
    parseFloatBar(entry, item, vScale, i);
  } else {
    item[vScale.axis] = vScale.parse(entry, i);
  }
  return item;
}
function parseArrayOrPrimitive(meta, data, start, count) {
  const iScale = meta.iScale;
  const vScale = meta.vScale;
  const labels = iScale.getLabels();
  const singleScale = iScale === vScale;
  const parsed = [];
  let i, ilen, item, entry;
  for (i = start, ilen = start + count; i < ilen; ++i) {
    entry = data[i];
    item = {};
    item[iScale.axis] = singleScale || iScale.parse(labels[i], i);
    parsed.push(parseValue(entry, item, vScale, i));
  }
  return parsed;
}
function isFloatBar(custom) {
  return custom && custom.barStart !== void 0 && custom.barEnd !== void 0;
}
function barSign(size, vScale, actualBase) {
  if (size !== 0) {
    return sign(size);
  }
  return (vScale.isHorizontal() ? 1 : -1) * (vScale.min >= actualBase ? 1 : -1);
}
function borderProps(properties) {
  let reverse, start, end, top, bottom;
  if (properties.horizontal) {
    reverse = properties.base > properties.x;
    start = "left";
    end = "right";
  } else {
    reverse = properties.base < properties.y;
    start = "bottom";
    end = "top";
  }
  if (reverse) {
    top = "end";
    bottom = "start";
  } else {
    top = "start";
    bottom = "end";
  }
  return {
    start,
    end,
    reverse,
    top,
    bottom
  };
}
function setBorderSkipped(properties, options, stack, index) {
  let edge = options.borderSkipped;
  const res = {};
  if (!edge) {
    properties.borderSkipped = res;
    return;
  }
  if (edge === true) {
    properties.borderSkipped = {
      top: true,
      right: true,
      bottom: true,
      left: true
    };
    return;
  }
  const { start, end, reverse, top, bottom } = borderProps(properties);
  if (edge === "middle" && stack) {
    properties.enableBorderRadius = true;
    if ((stack._top || 0) === index) {
      edge = top;
    } else if ((stack._bottom || 0) === index) {
      edge = bottom;
    } else {
      res[parseEdge(bottom, start, end, reverse)] = true;
      edge = top;
    }
  }
  res[parseEdge(edge, start, end, reverse)] = true;
  properties.borderSkipped = res;
}
function parseEdge(edge, a, b, reverse) {
  if (reverse) {
    edge = swap(edge, a, b);
    edge = startEnd(edge, b, a);
  } else {
    edge = startEnd(edge, a, b);
  }
  return edge;
}
function swap(orig, v1, v2) {
  return orig === v1 ? v2 : orig === v2 ? v1 : orig;
}
function startEnd(v, start, end) {
  return v === "start" ? start : v === "end" ? end : v;
}
function setInflateAmount(properties, { inflateAmount }, ratio) {
  properties.inflateAmount = inflateAmount === "auto" ? ratio === 1 ? 0.33 : 0 : inflateAmount;
}
var BarController = class extends DatasetController {
  parsePrimitiveData(meta, data, start, count) {
    return parseArrayOrPrimitive(meta, data, start, count);
  }
  parseArrayData(meta, data, start, count) {
    return parseArrayOrPrimitive(meta, data, start, count);
  }
  parseObjectData(meta, data, start, count) {
    const { iScale, vScale } = meta;
    const { xAxisKey = "x", yAxisKey = "y" } = this._parsing;
    const iAxisKey = iScale.axis === "x" ? xAxisKey : yAxisKey;
    const vAxisKey = vScale.axis === "x" ? xAxisKey : yAxisKey;
    const parsed = [];
    let i, ilen, item, obj;
    for (i = start, ilen = start + count; i < ilen; ++i) {
      obj = data[i];
      item = {};
      item[iScale.axis] = iScale.parse(resolveObjectKey(obj, iAxisKey), i);
      parsed.push(parseValue(resolveObjectKey(obj, vAxisKey), item, vScale, i));
    }
    return parsed;
  }
  updateRangeFromParsed(range, scale, parsed, stack) {
    super.updateRangeFromParsed(range, scale, parsed, stack);
    const custom = parsed._custom;
    if (custom && scale === this._cachedMeta.vScale) {
      range.min = Math.min(range.min, custom.min);
      range.max = Math.max(range.max, custom.max);
    }
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(index) {
    const meta = this._cachedMeta;
    const { iScale, vScale } = meta;
    const parsed = this.getParsed(index);
    const custom = parsed._custom;
    const value = isFloatBar(custom) ? "[" + custom.start + ", " + custom.end + "]" : "" + vScale.getLabelForValue(parsed[vScale.axis]);
    return {
      label: "" + iScale.getLabelForValue(parsed[iScale.axis]),
      value
    };
  }
  initialize() {
    this.enableOptionSharing = true;
    super.initialize();
    const meta = this._cachedMeta;
    meta.stack = this.getDataset().stack;
  }
  update(mode) {
    const meta = this._cachedMeta;
    this.updateElements(meta.data, 0, meta.data.length, mode);
  }
  updateElements(bars, start, count, mode) {
    const reset2 = mode === "reset";
    const { index, _cachedMeta: { vScale } } = this;
    const base = vScale.getBasePixel();
    const horizontal = vScale.isHorizontal();
    const ruler = this._getRuler();
    const { sharedOptions, includeOptions } = this._getSharedOptions(start, mode);
    for (let i = start; i < start + count; i++) {
      const parsed = this.getParsed(i);
      const vpixels = reset2 || isNullOrUndef(parsed[vScale.axis]) ? {
        base,
        head: base
      } : this._calculateBarValuePixels(i);
      const ipixels = this._calculateBarIndexPixels(i, ruler);
      const stack = (parsed._stacks || {})[vScale.axis];
      const properties = {
        horizontal,
        base: vpixels.base,
        enableBorderRadius: !stack || isFloatBar(parsed._custom) || index === stack._top || index === stack._bottom,
        x: horizontal ? vpixels.head : ipixels.center,
        y: horizontal ? ipixels.center : vpixels.head,
        height: horizontal ? ipixels.size : Math.abs(vpixels.size),
        width: horizontal ? Math.abs(vpixels.size) : ipixels.size
      };
      if (includeOptions) {
        properties.options = sharedOptions || this.resolveDataElementOptions(i, bars[i].active ? "active" : mode);
      }
      const options = properties.options || bars[i].options;
      setBorderSkipped(properties, options, stack, index);
      setInflateAmount(properties, options, ruler.ratio);
      this.updateElement(bars[i], i, properties, mode);
    }
  }
  _getStacks(last, dataIndex) {
    const { iScale } = this._cachedMeta;
    const metasets = iScale.getMatchingVisibleMetas(this._type).filter((meta) => meta.controller.options.grouped);
    const stacked = iScale.options.stacked;
    const stacks = [];
    const skipNull = (meta) => {
      const parsed = meta.controller.getParsed(dataIndex);
      const val = parsed && parsed[meta.vScale.axis];
      if (isNullOrUndef(val) || isNaN(val)) {
        return true;
      }
    };
    for (const meta of metasets) {
      if (dataIndex !== void 0 && skipNull(meta)) {
        continue;
      }
      if (stacked === false || stacks.indexOf(meta.stack) === -1 || stacked === void 0 && meta.stack === void 0) {
        stacks.push(meta.stack);
      }
      if (meta.index === last) {
        break;
      }
    }
    if (!stacks.length) {
      stacks.push(void 0);
    }
    return stacks;
  }
  _getStackCount(index) {
    return this._getStacks(void 0, index).length;
  }
  _getStackIndex(datasetIndex, name, dataIndex) {
    const stacks = this._getStacks(datasetIndex, dataIndex);
    const index = name !== void 0 ? stacks.indexOf(name) : -1;
    return index === -1 ? stacks.length - 1 : index;
  }
  _getRuler() {
    const opts = this.options;
    const meta = this._cachedMeta;
    const iScale = meta.iScale;
    const pixels = [];
    let i, ilen;
    for (i = 0, ilen = meta.data.length; i < ilen; ++i) {
      pixels.push(iScale.getPixelForValue(this.getParsed(i)[iScale.axis], i));
    }
    const barThickness = opts.barThickness;
    const min = barThickness || computeMinSampleSize(meta);
    return {
      min,
      pixels,
      start: iScale._startPixel,
      end: iScale._endPixel,
      stackCount: this._getStackCount(),
      scale: iScale,
      grouped: opts.grouped,
      ratio: barThickness ? 1 : opts.categoryPercentage * opts.barPercentage
    };
  }
  _calculateBarValuePixels(index) {
    const { _cachedMeta: { vScale, _stacked, index: datasetIndex }, options: { base: baseValue, minBarLength } } = this;
    const actualBase = baseValue || 0;
    const parsed = this.getParsed(index);
    const custom = parsed._custom;
    const floating = isFloatBar(custom);
    let value = parsed[vScale.axis];
    let start = 0;
    let length = _stacked ? this.applyStack(vScale, parsed, _stacked) : value;
    let head, size;
    if (length !== value) {
      start = length - value;
      length = value;
    }
    if (floating) {
      value = custom.barStart;
      length = custom.barEnd - custom.barStart;
      if (value !== 0 && sign(value) !== sign(custom.barEnd)) {
        start = 0;
      }
      start += value;
    }
    const startValue = !isNullOrUndef(baseValue) && !floating ? baseValue : start;
    let base = vScale.getPixelForValue(startValue);
    if (this.chart.getDataVisibility(index)) {
      head = vScale.getPixelForValue(start + length);
    } else {
      head = base;
    }
    size = head - base;
    if (Math.abs(size) < minBarLength) {
      size = barSign(size, vScale, actualBase) * minBarLength;
      if (value === actualBase) {
        base -= size / 2;
      }
      const startPixel = vScale.getPixelForDecimal(0);
      const endPixel = vScale.getPixelForDecimal(1);
      const min = Math.min(startPixel, endPixel);
      const max = Math.max(startPixel, endPixel);
      base = Math.max(Math.min(base, max), min);
      head = base + size;
      if (_stacked && !floating) {
        parsed._stacks[vScale.axis]._visualValues[datasetIndex] = vScale.getValueForPixel(head) - vScale.getValueForPixel(base);
      }
    }
    if (base === vScale.getPixelForValue(actualBase)) {
      const halfGrid = sign(size) * vScale.getLineWidthForValue(actualBase) / 2;
      base += halfGrid;
      size -= halfGrid;
    }
    return {
      size,
      base,
      head,
      center: head + size / 2
    };
  }
  _calculateBarIndexPixels(index, ruler) {
    const scale = ruler.scale;
    const options = this.options;
    const skipNull = options.skipNull;
    const maxBarThickness = valueOrDefault(options.maxBarThickness, Infinity);
    let center, size;
    if (ruler.grouped) {
      const stackCount = skipNull ? this._getStackCount(index) : ruler.stackCount;
      const range = options.barThickness === "flex" ? computeFlexCategoryTraits(index, ruler, options, stackCount) : computeFitCategoryTraits(index, ruler, options, stackCount);
      const stackIndex = this._getStackIndex(this.index, this._cachedMeta.stack, skipNull ? index : void 0);
      center = range.start + range.chunk * stackIndex + range.chunk / 2;
      size = Math.min(maxBarThickness, range.chunk * range.ratio);
    } else {
      center = scale.getPixelForValue(this.getParsed(index)[scale.axis], index);
      size = Math.min(maxBarThickness, ruler.min * ruler.ratio);
    }
    return {
      base: center - size / 2,
      head: center + size / 2,
      center,
      size
    };
  }
  draw() {
    const meta = this._cachedMeta;
    const vScale = meta.vScale;
    const rects = meta.data;
    const ilen = rects.length;
    let i = 0;
    for (; i < ilen; ++i) {
      if (this.getParsed(i)[vScale.axis] !== null) {
        rects[i].draw(this._ctx);
      }
    }
  }
};
__publicField(BarController, "id", "bar");
__publicField(BarController, "defaults", {
  datasetElementType: false,
  dataElementType: "bar",
  categoryPercentage: 0.8,
  barPercentage: 0.9,
  grouped: true,
  animations: {
    numbers: {
      type: "number",
      properties: [
        "x",
        "y",
        "base",
        "width",
        "height"
      ]
    }
  }
});
__publicField(BarController, "overrides", {
  scales: {
    _index_: {
      type: "category",
      offset: true,
      grid: {
        offset: true
      }
    },
    _value_: {
      type: "linear",
      beginAtZero: true
    }
  }
});
function getRatioAndOffset(rotation, circumference, cutout) {
  let ratioX = 1;
  let ratioY = 1;
  let offsetX = 0;
  let offsetY = 0;
  if (circumference < TAU) {
    const startAngle = rotation;
    const endAngle = startAngle + circumference;
    const startX = Math.cos(startAngle);
    const startY = Math.sin(startAngle);
    const endX = Math.cos(endAngle);
    const endY = Math.sin(endAngle);
    const calcMax = (angle, a, b) => _angleBetween(angle, startAngle, endAngle, true) ? 1 : Math.max(a, a * cutout, b, b * cutout);
    const calcMin = (angle, a, b) => _angleBetween(angle, startAngle, endAngle, true) ? -1 : Math.min(a, a * cutout, b, b * cutout);
    const maxX = calcMax(0, startX, endX);
    const maxY = calcMax(HALF_PI, startY, endY);
    const minX = calcMin(PI, startX, endX);
    const minY = calcMin(PI + HALF_PI, startY, endY);
    ratioX = (maxX - minX) / 2;
    ratioY = (maxY - minY) / 2;
    offsetX = -(maxX + minX) / 2;
    offsetY = -(maxY + minY) / 2;
  }
  return {
    ratioX,
    ratioY,
    offsetX,
    offsetY
  };
}
var DoughnutController = class extends DatasetController {
  constructor(chart, datasetIndex) {
    super(chart, datasetIndex);
    this.enableOptionSharing = true;
    this.innerRadius = void 0;
    this.outerRadius = void 0;
    this.offsetX = void 0;
    this.offsetY = void 0;
  }
  linkScales() {
  }
  parse(start, count) {
    const data = this.getDataset().data;
    const meta = this._cachedMeta;
    if (this._parsing === false) {
      meta._parsed = data;
    } else {
      let getter = (i2) => +data[i2];
      if (isObject(data[start])) {
        const { key = "value" } = this._parsing;
        getter = (i2) => +resolveObjectKey(data[i2], key);
      }
      let i, ilen;
      for (i = start, ilen = start + count; i < ilen; ++i) {
        meta._parsed[i] = getter(i);
      }
    }
  }
  _getRotation() {
    return toRadians(this.options.rotation - 90);
  }
  _getCircumference() {
    return toRadians(this.options.circumference);
  }
  _getRotationExtents() {
    let min = TAU;
    let max = -TAU;
    for (let i = 0; i < this.chart.data.datasets.length; ++i) {
      if (this.chart.isDatasetVisible(i) && this.chart.getDatasetMeta(i).type === this._type) {
        const controller = this.chart.getDatasetMeta(i).controller;
        const rotation = controller._getRotation();
        const circumference = controller._getCircumference();
        min = Math.min(min, rotation);
        max = Math.max(max, rotation + circumference);
      }
    }
    return {
      rotation: min,
      circumference: max - min
    };
  }
  update(mode) {
    const chart = this.chart;
    const { chartArea } = chart;
    const meta = this._cachedMeta;
    const arcs = meta.data;
    const spacing = this.getMaxBorderWidth() + this.getMaxOffset(arcs) + this.options.spacing;
    const maxSize = Math.max((Math.min(chartArea.width, chartArea.height) - spacing) / 2, 0);
    const cutout = Math.min(toPercentage(this.options.cutout, maxSize), 1);
    const chartWeight = this._getRingWeight(this.index);
    const { circumference, rotation } = this._getRotationExtents();
    const { ratioX, ratioY, offsetX, offsetY } = getRatioAndOffset(rotation, circumference, cutout);
    const maxWidth = (chartArea.width - spacing) / ratioX;
    const maxHeight = (chartArea.height - spacing) / ratioY;
    const maxRadius = Math.max(Math.min(maxWidth, maxHeight) / 2, 0);
    const outerRadius = toDimension(this.options.radius, maxRadius);
    const innerRadius = Math.max(outerRadius * cutout, 0);
    const radiusLength = (outerRadius - innerRadius) / this._getVisibleDatasetWeightTotal();
    this.offsetX = offsetX * outerRadius;
    this.offsetY = offsetY * outerRadius;
    meta.total = this.calculateTotal();
    this.outerRadius = outerRadius - radiusLength * this._getRingWeightOffset(this.index);
    this.innerRadius = Math.max(this.outerRadius - radiusLength * chartWeight, 0);
    this.updateElements(arcs, 0, arcs.length, mode);
  }
  _circumference(i, reset2) {
    const opts = this.options;
    const meta = this._cachedMeta;
    const circumference = this._getCircumference();
    if (reset2 && opts.animation.animateRotate || !this.chart.getDataVisibility(i) || meta._parsed[i] === null || meta.data[i].hidden) {
      return 0;
    }
    return this.calculateCircumference(meta._parsed[i] * circumference / TAU);
  }
  updateElements(arcs, start, count, mode) {
    const reset2 = mode === "reset";
    const chart = this.chart;
    const chartArea = chart.chartArea;
    const opts = chart.options;
    const animationOpts = opts.animation;
    const centerX = (chartArea.left + chartArea.right) / 2;
    const centerY = (chartArea.top + chartArea.bottom) / 2;
    const animateScale = reset2 && animationOpts.animateScale;
    const innerRadius = animateScale ? 0 : this.innerRadius;
    const outerRadius = animateScale ? 0 : this.outerRadius;
    const { sharedOptions, includeOptions } = this._getSharedOptions(start, mode);
    let startAngle = this._getRotation();
    let i;
    for (i = 0; i < start; ++i) {
      startAngle += this._circumference(i, reset2);
    }
    for (i = start; i < start + count; ++i) {
      const circumference = this._circumference(i, reset2);
      const arc = arcs[i];
      const properties = {
        x: centerX + this.offsetX,
        y: centerY + this.offsetY,
        startAngle,
        endAngle: startAngle + circumference,
        circumference,
        outerRadius,
        innerRadius
      };
      if (includeOptions) {
        properties.options = sharedOptions || this.resolveDataElementOptions(i, arc.active ? "active" : mode);
      }
      startAngle += circumference;
      this.updateElement(arc, i, properties, mode);
    }
  }
  calculateTotal() {
    const meta = this._cachedMeta;
    const metaData = meta.data;
    let total = 0;
    let i;
    for (i = 0; i < metaData.length; i++) {
      const value = meta._parsed[i];
      if (value !== null && !isNaN(value) && this.chart.getDataVisibility(i) && !metaData[i].hidden) {
        total += Math.abs(value);
      }
    }
    return total;
  }
  calculateCircumference(value) {
    const total = this._cachedMeta.total;
    if (total > 0 && !isNaN(value)) {
      return TAU * (Math.abs(value) / total);
    }
    return 0;
  }
  getLabelAndValue(index) {
    const meta = this._cachedMeta;
    const chart = this.chart;
    const labels = chart.data.labels || [];
    const value = formatNumber(meta._parsed[index], chart.options.locale);
    return {
      label: labels[index] || "",
      value
    };
  }
  getMaxBorderWidth(arcs) {
    let max = 0;
    const chart = this.chart;
    let i, ilen, meta, controller, options;
    if (!arcs) {
      for (i = 0, ilen = chart.data.datasets.length; i < ilen; ++i) {
        if (chart.isDatasetVisible(i)) {
          meta = chart.getDatasetMeta(i);
          arcs = meta.data;
          controller = meta.controller;
          break;
        }
      }
    }
    if (!arcs) {
      return 0;
    }
    for (i = 0, ilen = arcs.length; i < ilen; ++i) {
      options = controller.resolveDataElementOptions(i);
      if (options.borderAlign !== "inner") {
        max = Math.max(max, options.borderWidth || 0, options.hoverBorderWidth || 0);
      }
    }
    return max;
  }
  getMaxOffset(arcs) {
    let max = 0;
    for (let i = 0, ilen = arcs.length; i < ilen; ++i) {
      const options = this.resolveDataElementOptions(i);
      max = Math.max(max, options.offset || 0, options.hoverOffset || 0);
    }
    return max;
  }
  _getRingWeightOffset(datasetIndex) {
    let ringWeightOffset = 0;
    for (let i = 0; i < datasetIndex; ++i) {
      if (this.chart.isDatasetVisible(i)) {
        ringWeightOffset += this._getRingWeight(i);
      }
    }
    return ringWeightOffset;
  }
  _getRingWeight(datasetIndex) {
    return Math.max(valueOrDefault(this.chart.data.datasets[datasetIndex].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
};
__publicField(DoughnutController, "id", "doughnut");
__publicField(DoughnutController, "defaults", {
  datasetElementType: false,
  dataElementType: "arc",
  animation: {
    animateRotate: true,
    animateScale: false
  },
  animations: {
    numbers: {
      type: "number",
      properties: [
        "circumference",
        "endAngle",
        "innerRadius",
        "outerRadius",
        "startAngle",
        "x",
        "y",
        "offset",
        "borderWidth",
        "spacing"
      ]
    }
  },
  cutout: "50%",
  rotation: 0,
  circumference: 360,
  radius: "100%",
  spacing: 0,
  indexAxis: "r"
});
__publicField(DoughnutController, "descriptors", {
  _scriptable: (name) => name !== "spacing",
  _indexable: (name) => name !== "spacing" && !name.startsWith("borderDash") && !name.startsWith("hoverBorderDash")
});
__publicField(DoughnutController, "overrides", {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(chart) {
          const data = chart.data;
          if (data.labels.length && data.datasets.length) {
            const { labels: { pointStyle, color: color2 } } = chart.legend.options;
            return data.labels.map((label, i) => {
              const meta = chart.getDatasetMeta(0);
              const style = meta.controller.getStyle(i);
              return {
                text: label,
                fillStyle: style.backgroundColor,
                strokeStyle: style.borderColor,
                fontColor: color2,
                lineWidth: style.borderWidth,
                pointStyle,
                hidden: !chart.getDataVisibility(i),
                index: i
              };
            });
          }
          return [];
        }
      },
      onClick(e, legendItem, legend) {
        legend.chart.toggleDataVisibility(legendItem.index);
        legend.chart.update();
      }
    }
  }
});
var PieController = class extends DoughnutController {
};
__publicField(PieController, "id", "pie");
__publicField(PieController, "defaults", {
  cutout: 0,
  rotation: 0,
  circumference: 360,
  radius: "100%"
});
function abstract() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
var DateAdapterBase = class _DateAdapterBase {
  constructor(options) {
    __publicField(this, "options");
    this.options = options || {};
  }
  /**
  * Override default date adapter methods.
  * Accepts type parameter to define options type.
  * @example
  * Chart._adapters._date.override<{myAdapterOption: string}>({
  *   init() {
  *     console.log(this.options.myAdapterOption);
  *   }
  * })
  */
  static override(members) {
    Object.assign(_DateAdapterBase.prototype, members);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return abstract();
  }
  parse() {
    return abstract();
  }
  format() {
    return abstract();
  }
  add() {
    return abstract();
  }
  diff() {
    return abstract();
  }
  startOf() {
    return abstract();
  }
  endOf() {
    return abstract();
  }
};
var adapters = {
  _date: DateAdapterBase
};
function binarySearch(metaset, axis, value, intersect) {
  const { controller, data, _sorted } = metaset;
  const iScale = controller._cachedMeta.iScale;
  if (iScale && axis === iScale.axis && axis !== "r" && _sorted && data.length) {
    const lookupMethod = iScale._reversePixels ? _rlookupByKey : _lookupByKey;
    if (!intersect) {
      return lookupMethod(data, axis, value);
    } else if (controller._sharedOptions) {
      const el = data[0];
      const range = typeof el.getRange === "function" && el.getRange(axis);
      if (range) {
        const start = lookupMethod(data, axis, value - range);
        const end = lookupMethod(data, axis, value + range);
        return {
          lo: start.lo,
          hi: end.hi
        };
      }
    }
  }
  return {
    lo: 0,
    hi: data.length - 1
  };
}
function evaluateInteractionItems(chart, axis, position, handler, intersect) {
  const metasets = chart.getSortedVisibleDatasetMetas();
  const value = position[axis];
  for (let i = 0, ilen = metasets.length; i < ilen; ++i) {
    const { index, data } = metasets[i];
    const { lo, hi } = binarySearch(metasets[i], axis, value, intersect);
    for (let j = lo; j <= hi; ++j) {
      const element = data[j];
      if (!element.skip) {
        handler(element, index, j);
      }
    }
  }
}
function getDistanceMetricForAxis(axis) {
  const useX = axis.indexOf("x") !== -1;
  const useY = axis.indexOf("y") !== -1;
  return function(pt1, pt2) {
    const deltaX = useX ? Math.abs(pt1.x - pt2.x) : 0;
    const deltaY = useY ? Math.abs(pt1.y - pt2.y) : 0;
    return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  };
}
function getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible) {
  const items = [];
  if (!includeInvisible && !chart.isPointInArea(position)) {
    return items;
  }
  const evaluationFunc = function(element, datasetIndex, index) {
    if (!includeInvisible && !_isPointInArea(element, chart.chartArea, 0)) {
      return;
    }
    if (element.inRange(position.x, position.y, useFinalPosition)) {
      items.push({
        element,
        datasetIndex,
        index
      });
    }
  };
  evaluateInteractionItems(chart, axis, position, evaluationFunc, true);
  return items;
}
function getNearestRadialItems(chart, position, axis, useFinalPosition) {
  let items = [];
  function evaluationFunc(element, datasetIndex, index) {
    const { startAngle, endAngle } = element.getProps([
      "startAngle",
      "endAngle"
    ], useFinalPosition);
    const { angle } = getAngleFromPoint(element, {
      x: position.x,
      y: position.y
    });
    if (_angleBetween(angle, startAngle, endAngle)) {
      items.push({
        element,
        datasetIndex,
        index
      });
    }
  }
  evaluateInteractionItems(chart, axis, position, evaluationFunc);
  return items;
}
function getNearestCartesianItems(chart, position, axis, intersect, useFinalPosition, includeInvisible) {
  let items = [];
  const distanceMetric = getDistanceMetricForAxis(axis);
  let minDistance = Number.POSITIVE_INFINITY;
  function evaluationFunc(element, datasetIndex, index) {
    const inRange2 = element.inRange(position.x, position.y, useFinalPosition);
    if (intersect && !inRange2) {
      return;
    }
    const center = element.getCenterPoint(useFinalPosition);
    const pointInArea = !!includeInvisible || chart.isPointInArea(center);
    if (!pointInArea && !inRange2) {
      return;
    }
    const distance = distanceMetric(position, center);
    if (distance < minDistance) {
      items = [
        {
          element,
          datasetIndex,
          index
        }
      ];
      minDistance = distance;
    } else if (distance === minDistance) {
      items.push({
        element,
        datasetIndex,
        index
      });
    }
  }
  evaluateInteractionItems(chart, axis, position, evaluationFunc);
  return items;
}
function getNearestItems(chart, position, axis, intersect, useFinalPosition, includeInvisible) {
  if (!includeInvisible && !chart.isPointInArea(position)) {
    return [];
  }
  return axis === "r" && !intersect ? getNearestRadialItems(chart, position, axis, useFinalPosition) : getNearestCartesianItems(chart, position, axis, intersect, useFinalPosition, includeInvisible);
}
function getAxisItems(chart, position, axis, intersect, useFinalPosition) {
  const items = [];
  const rangeMethod = axis === "x" ? "inXRange" : "inYRange";
  let intersectsItem = false;
  evaluateInteractionItems(chart, axis, position, (element, datasetIndex, index) => {
    if (element[rangeMethod](position[axis], useFinalPosition)) {
      items.push({
        element,
        datasetIndex,
        index
      });
      intersectsItem = intersectsItem || element.inRange(position.x, position.y, useFinalPosition);
    }
  });
  if (intersect && !intersectsItem) {
    return [];
  }
  return items;
}
var Interaction = {
  evaluateInteractionItems,
  modes: {
    index(chart, e, options, useFinalPosition) {
      const position = getRelativePosition(e, chart);
      const axis = options.axis || "x";
      const includeInvisible = options.includeInvisible || false;
      const items = options.intersect ? getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible) : getNearestItems(chart, position, axis, false, useFinalPosition, includeInvisible);
      const elements = [];
      if (!items.length) {
        return [];
      }
      chart.getSortedVisibleDatasetMetas().forEach((meta) => {
        const index = items[0].index;
        const element = meta.data[index];
        if (element && !element.skip) {
          elements.push({
            element,
            datasetIndex: meta.index,
            index
          });
        }
      });
      return elements;
    },
    dataset(chart, e, options, useFinalPosition) {
      const position = getRelativePosition(e, chart);
      const axis = options.axis || "xy";
      const includeInvisible = options.includeInvisible || false;
      let items = options.intersect ? getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible) : getNearestItems(chart, position, axis, false, useFinalPosition, includeInvisible);
      if (items.length > 0) {
        const datasetIndex = items[0].datasetIndex;
        const data = chart.getDatasetMeta(datasetIndex).data;
        items = [];
        for (let i = 0; i < data.length; ++i) {
          items.push({
            element: data[i],
            datasetIndex,
            index: i
          });
        }
      }
      return items;
    },
    point(chart, e, options, useFinalPosition) {
      const position = getRelativePosition(e, chart);
      const axis = options.axis || "xy";
      const includeInvisible = options.includeInvisible || false;
      return getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible);
    },
    nearest(chart, e, options, useFinalPosition) {
      const position = getRelativePosition(e, chart);
      const axis = options.axis || "xy";
      const includeInvisible = options.includeInvisible || false;
      return getNearestItems(chart, position, axis, options.intersect, useFinalPosition, includeInvisible);
    },
    x(chart, e, options, useFinalPosition) {
      const position = getRelativePosition(e, chart);
      return getAxisItems(chart, position, "x", options.intersect, useFinalPosition);
    },
    y(chart, e, options, useFinalPosition) {
      const position = getRelativePosition(e, chart);
      return getAxisItems(chart, position, "y", options.intersect, useFinalPosition);
    }
  }
};
var STATIC_POSITIONS = [
  "left",
  "top",
  "right",
  "bottom"
];
function filterByPosition(array, position) {
  return array.filter((v) => v.pos === position);
}
function filterDynamicPositionByAxis(array, axis) {
  return array.filter((v) => STATIC_POSITIONS.indexOf(v.pos) === -1 && v.box.axis === axis);
}
function sortByWeight(array, reverse) {
  return array.sort((a, b) => {
    const v0 = reverse ? b : a;
    const v1 = reverse ? a : b;
    return v0.weight === v1.weight ? v0.index - v1.index : v0.weight - v1.weight;
  });
}
function wrapBoxes(boxes) {
  const layoutBoxes = [];
  let i, ilen, box, pos, stack, stackWeight;
  for (i = 0, ilen = (boxes || []).length; i < ilen; ++i) {
    box = boxes[i];
    ({ position: pos, options: { stack, stackWeight = 1 } } = box);
    layoutBoxes.push({
      index: i,
      box,
      pos,
      horizontal: box.isHorizontal(),
      weight: box.weight,
      stack: stack && pos + stack,
      stackWeight
    });
  }
  return layoutBoxes;
}
function buildStacks(layouts2) {
  const stacks = {};
  for (const wrap of layouts2) {
    const { stack, pos, stackWeight } = wrap;
    if (!stack || !STATIC_POSITIONS.includes(pos)) {
      continue;
    }
    const _stack = stacks[stack] || (stacks[stack] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    _stack.count++;
    _stack.weight += stackWeight;
  }
  return stacks;
}
function setLayoutDims(layouts2, params) {
  const stacks = buildStacks(layouts2);
  const { vBoxMaxWidth, hBoxMaxHeight } = params;
  let i, ilen, layout;
  for (i = 0, ilen = layouts2.length; i < ilen; ++i) {
    layout = layouts2[i];
    const { fullSize } = layout.box;
    const stack = stacks[layout.stack];
    const factor = stack && layout.stackWeight / stack.weight;
    if (layout.horizontal) {
      layout.width = factor ? factor * vBoxMaxWidth : fullSize && params.availableWidth;
      layout.height = hBoxMaxHeight;
    } else {
      layout.width = vBoxMaxWidth;
      layout.height = factor ? factor * hBoxMaxHeight : fullSize && params.availableHeight;
    }
  }
  return stacks;
}
function buildLayoutBoxes(boxes) {
  const layoutBoxes = wrapBoxes(boxes);
  const fullSize = sortByWeight(layoutBoxes.filter((wrap) => wrap.box.fullSize), true);
  const left = sortByWeight(filterByPosition(layoutBoxes, "left"), true);
  const right = sortByWeight(filterByPosition(layoutBoxes, "right"));
  const top = sortByWeight(filterByPosition(layoutBoxes, "top"), true);
  const bottom = sortByWeight(filterByPosition(layoutBoxes, "bottom"));
  const centerHorizontal = filterDynamicPositionByAxis(layoutBoxes, "x");
  const centerVertical = filterDynamicPositionByAxis(layoutBoxes, "y");
  return {
    fullSize,
    leftAndTop: left.concat(top),
    rightAndBottom: right.concat(centerVertical).concat(bottom).concat(centerHorizontal),
    chartArea: filterByPosition(layoutBoxes, "chartArea"),
    vertical: left.concat(right).concat(centerVertical),
    horizontal: top.concat(bottom).concat(centerHorizontal)
  };
}
function getCombinedMax(maxPadding, chartArea, a, b) {
  return Math.max(maxPadding[a], chartArea[a]) + Math.max(maxPadding[b], chartArea[b]);
}
function updateMaxPadding(maxPadding, boxPadding) {
  maxPadding.top = Math.max(maxPadding.top, boxPadding.top);
  maxPadding.left = Math.max(maxPadding.left, boxPadding.left);
  maxPadding.bottom = Math.max(maxPadding.bottom, boxPadding.bottom);
  maxPadding.right = Math.max(maxPadding.right, boxPadding.right);
}
function updateDims(chartArea, params, layout, stacks) {
  const { pos, box } = layout;
  const maxPadding = chartArea.maxPadding;
  if (!isObject(pos)) {
    if (layout.size) {
      chartArea[pos] -= layout.size;
    }
    const stack = stacks[layout.stack] || {
      size: 0,
      count: 1
    };
    stack.size = Math.max(stack.size, layout.horizontal ? box.height : box.width);
    layout.size = stack.size / stack.count;
    chartArea[pos] += layout.size;
  }
  if (box.getPadding) {
    updateMaxPadding(maxPadding, box.getPadding());
  }
  const newWidth = Math.max(0, params.outerWidth - getCombinedMax(maxPadding, chartArea, "left", "right"));
  const newHeight = Math.max(0, params.outerHeight - getCombinedMax(maxPadding, chartArea, "top", "bottom"));
  const widthChanged = newWidth !== chartArea.w;
  const heightChanged = newHeight !== chartArea.h;
  chartArea.w = newWidth;
  chartArea.h = newHeight;
  return layout.horizontal ? {
    same: widthChanged,
    other: heightChanged
  } : {
    same: heightChanged,
    other: widthChanged
  };
}
function handleMaxPadding(chartArea) {
  const maxPadding = chartArea.maxPadding;
  function updatePos(pos) {
    const change = Math.max(maxPadding[pos] - chartArea[pos], 0);
    chartArea[pos] += change;
    return change;
  }
  chartArea.y += updatePos("top");
  chartArea.x += updatePos("left");
  updatePos("right");
  updatePos("bottom");
}
function getMargins(horizontal, chartArea) {
  const maxPadding = chartArea.maxPadding;
  function marginForPositions(positions2) {
    const margin = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    positions2.forEach((pos) => {
      margin[pos] = Math.max(chartArea[pos], maxPadding[pos]);
    });
    return margin;
  }
  return horizontal ? marginForPositions([
    "left",
    "right"
  ]) : marginForPositions([
    "top",
    "bottom"
  ]);
}
function fitBoxes(boxes, chartArea, params, stacks) {
  const refitBoxes = [];
  let i, ilen, layout, box, refit, changed;
  for (i = 0, ilen = boxes.length, refit = 0; i < ilen; ++i) {
    layout = boxes[i];
    box = layout.box;
    box.update(layout.width || chartArea.w, layout.height || chartArea.h, getMargins(layout.horizontal, chartArea));
    const { same, other } = updateDims(chartArea, params, layout, stacks);
    refit |= same && refitBoxes.length;
    changed = changed || other;
    if (!box.fullSize) {
      refitBoxes.push(layout);
    }
  }
  return refit && fitBoxes(refitBoxes, chartArea, params, stacks) || changed;
}
function setBoxDims(box, left, top, width, height) {
  box.top = top;
  box.left = left;
  box.right = left + width;
  box.bottom = top + height;
  box.width = width;
  box.height = height;
}
function placeBoxes(boxes, chartArea, params, stacks) {
  const userPadding = params.padding;
  let { x, y } = chartArea;
  for (const layout of boxes) {
    const box = layout.box;
    const stack = stacks[layout.stack] || {
      count: 1,
      placed: 0,
      weight: 1
    };
    const weight = layout.stackWeight / stack.weight || 1;
    if (layout.horizontal) {
      const width = chartArea.w * weight;
      const height = stack.size || box.height;
      if (defined(stack.start)) {
        y = stack.start;
      }
      if (box.fullSize) {
        setBoxDims(box, userPadding.left, y, params.outerWidth - userPadding.right - userPadding.left, height);
      } else {
        setBoxDims(box, chartArea.left + stack.placed, y, width, height);
      }
      stack.start = y;
      stack.placed += width;
      y = box.bottom;
    } else {
      const height = chartArea.h * weight;
      const width = stack.size || box.width;
      if (defined(stack.start)) {
        x = stack.start;
      }
      if (box.fullSize) {
        setBoxDims(box, x, userPadding.top, width, params.outerHeight - userPadding.bottom - userPadding.top);
      } else {
        setBoxDims(box, x, chartArea.top + stack.placed, width, height);
      }
      stack.start = x;
      stack.placed += height;
      x = box.right;
    }
  }
  chartArea.x = x;
  chartArea.y = y;
}
var layouts = {
  addBox(chart, item) {
    if (!chart.boxes) {
      chart.boxes = [];
    }
    item.fullSize = item.fullSize || false;
    item.position = item.position || "top";
    item.weight = item.weight || 0;
    item._layers = item._layers || function() {
      return [
        {
          z: 0,
          draw(chartArea) {
            item.draw(chartArea);
          }
        }
      ];
    };
    chart.boxes.push(item);
  },
  removeBox(chart, layoutItem) {
    const index = chart.boxes ? chart.boxes.indexOf(layoutItem) : -1;
    if (index !== -1) {
      chart.boxes.splice(index, 1);
    }
  },
  configure(chart, item, options) {
    item.fullSize = options.fullSize;
    item.position = options.position;
    item.weight = options.weight;
  },
  update(chart, width, height, minPadding) {
    if (!chart) {
      return;
    }
    const padding = toPadding(chart.options.layout.padding);
    const availableWidth = Math.max(width - padding.width, 0);
    const availableHeight = Math.max(height - padding.height, 0);
    const boxes = buildLayoutBoxes(chart.boxes);
    const verticalBoxes = boxes.vertical;
    const horizontalBoxes = boxes.horizontal;
    each(chart.boxes, (box) => {
      if (typeof box.beforeLayout === "function") {
        box.beforeLayout();
      }
    });
    const visibleVerticalBoxCount = verticalBoxes.reduce((total, wrap) => wrap.box.options && wrap.box.options.display === false ? total : total + 1, 0) || 1;
    const params = Object.freeze({
      outerWidth: width,
      outerHeight: height,
      padding,
      availableWidth,
      availableHeight,
      vBoxMaxWidth: availableWidth / 2 / visibleVerticalBoxCount,
      hBoxMaxHeight: availableHeight / 2
    });
    const maxPadding = Object.assign({}, padding);
    updateMaxPadding(maxPadding, toPadding(minPadding));
    const chartArea = Object.assign({
      maxPadding,
      w: availableWidth,
      h: availableHeight,
      x: padding.left,
      y: padding.top
    }, padding);
    const stacks = setLayoutDims(verticalBoxes.concat(horizontalBoxes), params);
    fitBoxes(boxes.fullSize, chartArea, params, stacks);
    fitBoxes(verticalBoxes, chartArea, params, stacks);
    if (fitBoxes(horizontalBoxes, chartArea, params, stacks)) {
      fitBoxes(verticalBoxes, chartArea, params, stacks);
    }
    handleMaxPadding(chartArea);
    placeBoxes(boxes.leftAndTop, chartArea, params, stacks);
    chartArea.x += chartArea.w;
    chartArea.y += chartArea.h;
    placeBoxes(boxes.rightAndBottom, chartArea, params, stacks);
    chart.chartArea = {
      left: chartArea.left,
      top: chartArea.top,
      right: chartArea.left + chartArea.w,
      bottom: chartArea.top + chartArea.h,
      height: chartArea.h,
      width: chartArea.w
    };
    each(boxes.chartArea, (layout) => {
      const box = layout.box;
      Object.assign(box, chart.chartArea);
      box.update(chartArea.w, chartArea.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
var BasePlatform = class {
  acquireContext(canvas, aspectRatio) {
  }
  releaseContext(context) {
    return false;
  }
  addEventListener(chart, type, listener) {
  }
  removeEventListener(chart, type, listener) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(element, width, height, aspectRatio) {
    width = Math.max(0, width || element.width);
    height = height || element.height;
    return {
      width,
      height: Math.max(0, aspectRatio ? Math.floor(width / aspectRatio) : height)
    };
  }
  isAttached(canvas) {
    return true;
  }
  updateConfig(config) {
  }
};
var BasicPlatform = class extends BasePlatform {
  acquireContext(item) {
    return item && item.getContext && item.getContext("2d") || null;
  }
  updateConfig(config) {
    config.options.animation = false;
  }
};
var EXPANDO_KEY = "$chartjs";
var EVENT_TYPES = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
};
var isNullOrEmpty = (value) => value === null || value === "";
function initCanvas(canvas, aspectRatio) {
  const style = canvas.style;
  const renderHeight = canvas.getAttribute("height");
  const renderWidth = canvas.getAttribute("width");
  canvas[EXPANDO_KEY] = {
    initial: {
      height: renderHeight,
      width: renderWidth,
      style: {
        display: style.display,
        height: style.height,
        width: style.width
      }
    }
  };
  style.display = style.display || "block";
  style.boxSizing = style.boxSizing || "border-box";
  if (isNullOrEmpty(renderWidth)) {
    const displayWidth = readUsedSize(canvas, "width");
    if (displayWidth !== void 0) {
      canvas.width = displayWidth;
    }
  }
  if (isNullOrEmpty(renderHeight)) {
    if (canvas.style.height === "") {
      canvas.height = canvas.width / (aspectRatio || 2);
    } else {
      const displayHeight = readUsedSize(canvas, "height");
      if (displayHeight !== void 0) {
        canvas.height = displayHeight;
      }
    }
  }
  return canvas;
}
var eventListenerOptions = supportsEventListenerOptions ? {
  passive: true
} : false;
function addListener(node, type, listener) {
  node.addEventListener(type, listener, eventListenerOptions);
}
function removeListener(chart, type, listener) {
  chart.canvas.removeEventListener(type, listener, eventListenerOptions);
}
function fromNativeEvent(event, chart) {
  const type = EVENT_TYPES[event.type] || event.type;
  const { x, y } = getRelativePosition(event, chart);
  return {
    type,
    chart,
    native: event,
    x: x !== void 0 ? x : null,
    y: y !== void 0 ? y : null
  };
}
function nodeListContains(nodeList, canvas) {
  for (const node of nodeList) {
    if (node === canvas || node.contains(canvas)) {
      return true;
    }
  }
}
function createAttachObserver(chart, type, listener) {
  const canvas = chart.canvas;
  const observer = new MutationObserver((entries) => {
    let trigger = false;
    for (const entry of entries) {
      trigger = trigger || nodeListContains(entry.addedNodes, canvas);
      trigger = trigger && !nodeListContains(entry.removedNodes, canvas);
    }
    if (trigger) {
      listener();
    }
  });
  observer.observe(document, {
    childList: true,
    subtree: true
  });
  return observer;
}
function createDetachObserver(chart, type, listener) {
  const canvas = chart.canvas;
  const observer = new MutationObserver((entries) => {
    let trigger = false;
    for (const entry of entries) {
      trigger = trigger || nodeListContains(entry.removedNodes, canvas);
      trigger = trigger && !nodeListContains(entry.addedNodes, canvas);
    }
    if (trigger) {
      listener();
    }
  });
  observer.observe(document, {
    childList: true,
    subtree: true
  });
  return observer;
}
var drpListeningCharts = /* @__PURE__ */ new Map();
var oldDevicePixelRatio = 0;
function onWindowResize() {
  const dpr = window.devicePixelRatio;
  if (dpr === oldDevicePixelRatio) {
    return;
  }
  oldDevicePixelRatio = dpr;
  drpListeningCharts.forEach((resize, chart) => {
    if (chart.currentDevicePixelRatio !== dpr) {
      resize();
    }
  });
}
function listenDevicePixelRatioChanges(chart, resize) {
  if (!drpListeningCharts.size) {
    window.addEventListener("resize", onWindowResize);
  }
  drpListeningCharts.set(chart, resize);
}
function unlistenDevicePixelRatioChanges(chart) {
  drpListeningCharts.delete(chart);
  if (!drpListeningCharts.size) {
    window.removeEventListener("resize", onWindowResize);
  }
}
function createResizeObserver(chart, type, listener) {
  const canvas = chart.canvas;
  const container = canvas && _getParentNode(canvas);
  if (!container) {
    return;
  }
  const resize = throttled((width, height) => {
    const w = container.clientWidth;
    listener(width, height);
    if (w < container.clientWidth) {
      listener();
    }
  }, window);
  const observer = new ResizeObserver((entries) => {
    const entry = entries[0];
    const width = entry.contentRect.width;
    const height = entry.contentRect.height;
    if (width === 0 && height === 0) {
      return;
    }
    resize(width, height);
  });
  observer.observe(container);
  listenDevicePixelRatioChanges(chart, resize);
  return observer;
}
function releaseObserver(chart, type, observer) {
  if (observer) {
    observer.disconnect();
  }
  if (type === "resize") {
    unlistenDevicePixelRatioChanges(chart);
  }
}
function createProxyAndListen(chart, type, listener) {
  const canvas = chart.canvas;
  const proxy = throttled((event) => {
    if (chart.ctx !== null) {
      listener(fromNativeEvent(event, chart));
    }
  }, chart);
  addListener(canvas, type, proxy);
  return proxy;
}
var DomPlatform = class extends BasePlatform {
  acquireContext(canvas, aspectRatio) {
    const context = canvas && canvas.getContext && canvas.getContext("2d");
    if (context && context.canvas === canvas) {
      initCanvas(canvas, aspectRatio);
      return context;
    }
    return null;
  }
  releaseContext(context) {
    const canvas = context.canvas;
    if (!canvas[EXPANDO_KEY]) {
      return false;
    }
    const initial = canvas[EXPANDO_KEY].initial;
    [
      "height",
      "width"
    ].forEach((prop) => {
      const value = initial[prop];
      if (isNullOrUndef(value)) {
        canvas.removeAttribute(prop);
      } else {
        canvas.setAttribute(prop, value);
      }
    });
    const style = initial.style || {};
    Object.keys(style).forEach((key) => {
      canvas.style[key] = style[key];
    });
    canvas.width = canvas.width;
    delete canvas[EXPANDO_KEY];
    return true;
  }
  addEventListener(chart, type, listener) {
    this.removeEventListener(chart, type);
    const proxies = chart.$proxies || (chart.$proxies = {});
    const handlers = {
      attach: createAttachObserver,
      detach: createDetachObserver,
      resize: createResizeObserver
    };
    const handler = handlers[type] || createProxyAndListen;
    proxies[type] = handler(chart, type, listener);
  }
  removeEventListener(chart, type) {
    const proxies = chart.$proxies || (chart.$proxies = {});
    const proxy = proxies[type];
    if (!proxy) {
      return;
    }
    const handlers = {
      attach: releaseObserver,
      detach: releaseObserver,
      resize: releaseObserver
    };
    const handler = handlers[type] || removeListener;
    handler(chart, type, proxy);
    proxies[type] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(canvas, width, height, aspectRatio) {
    return getMaximumSize(canvas, width, height, aspectRatio);
  }
  isAttached(canvas) {
    const container = _getParentNode(canvas);
    return !!(container && container.isConnected);
  }
};
function _detectPlatform(canvas) {
  if (!_isDomSupported() || typeof OffscreenCanvas !== "undefined" && canvas instanceof OffscreenCanvas) {
    return BasicPlatform;
  }
  return DomPlatform;
}
var Element = class {
  constructor() {
    __publicField(this, "x");
    __publicField(this, "y");
    __publicField(this, "active", false);
    __publicField(this, "options");
    __publicField(this, "$animations");
  }
  tooltipPosition(useFinalPosition) {
    const { x, y } = this.getProps([
      "x",
      "y"
    ], useFinalPosition);
    return {
      x,
      y
    };
  }
  hasValue() {
    return isNumber(this.x) && isNumber(this.y);
  }
  getProps(props, final) {
    const anims = this.$animations;
    if (!final || !anims) {
      return this;
    }
    const ret = {};
    props.forEach((prop) => {
      ret[prop] = anims[prop] && anims[prop].active() ? anims[prop]._to : this[prop];
    });
    return ret;
  }
};
__publicField(Element, "defaults", {});
__publicField(Element, "defaultRoutes");
function autoSkip(scale, ticks) {
  const tickOpts = scale.options.ticks;
  const determinedMaxTicks = determineMaxTicks(scale);
  const ticksLimit = Math.min(tickOpts.maxTicksLimit || determinedMaxTicks, determinedMaxTicks);
  const majorIndices = tickOpts.major.enabled ? getMajorIndices(ticks) : [];
  const numMajorIndices = majorIndices.length;
  const first = majorIndices[0];
  const last = majorIndices[numMajorIndices - 1];
  const newTicks = [];
  if (numMajorIndices > ticksLimit) {
    skipMajors(ticks, newTicks, majorIndices, numMajorIndices / ticksLimit);
    return newTicks;
  }
  const spacing = calculateSpacing(majorIndices, ticks, ticksLimit);
  if (numMajorIndices > 0) {
    let i, ilen;
    const avgMajorSpacing = numMajorIndices > 1 ? Math.round((last - first) / (numMajorIndices - 1)) : null;
    skip(ticks, newTicks, spacing, isNullOrUndef(avgMajorSpacing) ? 0 : first - avgMajorSpacing, first);
    for (i = 0, ilen = numMajorIndices - 1; i < ilen; i++) {
      skip(ticks, newTicks, spacing, majorIndices[i], majorIndices[i + 1]);
    }
    skip(ticks, newTicks, spacing, last, isNullOrUndef(avgMajorSpacing) ? ticks.length : last + avgMajorSpacing);
    return newTicks;
  }
  skip(ticks, newTicks, spacing);
  return newTicks;
}
function determineMaxTicks(scale) {
  const offset = scale.options.offset;
  const tickLength = scale._tickSize();
  const maxScale = scale._length / tickLength + (offset ? 0 : 1);
  const maxChart = scale._maxLength / tickLength;
  return Math.floor(Math.min(maxScale, maxChart));
}
function calculateSpacing(majorIndices, ticks, ticksLimit) {
  const evenMajorSpacing = getEvenSpacing(majorIndices);
  const spacing = ticks.length / ticksLimit;
  if (!evenMajorSpacing) {
    return Math.max(spacing, 1);
  }
  const factors = _factorize(evenMajorSpacing);
  for (let i = 0, ilen = factors.length - 1; i < ilen; i++) {
    const factor = factors[i];
    if (factor > spacing) {
      return factor;
    }
  }
  return Math.max(spacing, 1);
}
function getMajorIndices(ticks) {
  const result = [];
  let i, ilen;
  for (i = 0, ilen = ticks.length; i < ilen; i++) {
    if (ticks[i].major) {
      result.push(i);
    }
  }
  return result;
}
function skipMajors(ticks, newTicks, majorIndices, spacing) {
  let count = 0;
  let next = majorIndices[0];
  let i;
  spacing = Math.ceil(spacing);
  for (i = 0; i < ticks.length; i++) {
    if (i === next) {
      newTicks.push(ticks[i]);
      count++;
      next = majorIndices[count * spacing];
    }
  }
}
function skip(ticks, newTicks, spacing, majorStart, majorEnd) {
  const start = valueOrDefault(majorStart, 0);
  const end = Math.min(valueOrDefault(majorEnd, ticks.length), ticks.length);
  let count = 0;
  let length, i, next;
  spacing = Math.ceil(spacing);
  if (majorEnd) {
    length = majorEnd - majorStart;
    spacing = length / Math.floor(length / spacing);
  }
  next = start;
  while (next < 0) {
    count++;
    next = Math.round(start + count * spacing);
  }
  for (i = Math.max(start, 0); i < end; i++) {
    if (i === next) {
      newTicks.push(ticks[i]);
      count++;
      next = Math.round(start + count * spacing);
    }
  }
}
function getEvenSpacing(arr) {
  const len = arr.length;
  let i, diff;
  if (len < 2) {
    return false;
  }
  for (diff = arr[0], i = 1; i < len; ++i) {
    if (arr[i] - arr[i - 1] !== diff) {
      return false;
    }
  }
  return diff;
}
var reverseAlign = (align) => align === "left" ? "right" : align === "right" ? "left" : align;
var offsetFromEdge = (scale, edge, offset) => edge === "top" || edge === "left" ? scale[edge] + offset : scale[edge] - offset;
var getTicksLimit = (ticksLength, maxTicksLimit) => Math.min(maxTicksLimit || ticksLength, ticksLength);
function sample(arr, numItems) {
  const result = [];
  const increment = arr.length / numItems;
  const len = arr.length;
  let i = 0;
  for (; i < len; i += increment) {
    result.push(arr[Math.floor(i)]);
  }
  return result;
}
function getPixelForGridLine(scale, index, offsetGridLines) {
  const length = scale.ticks.length;
  const validIndex2 = Math.min(index, length - 1);
  const start = scale._startPixel;
  const end = scale._endPixel;
  const epsilon = 1e-6;
  let lineValue = scale.getPixelForTick(validIndex2);
  let offset;
  if (offsetGridLines) {
    if (length === 1) {
      offset = Math.max(lineValue - start, end - lineValue);
    } else if (index === 0) {
      offset = (scale.getPixelForTick(1) - lineValue) / 2;
    } else {
      offset = (lineValue - scale.getPixelForTick(validIndex2 - 1)) / 2;
    }
    lineValue += validIndex2 < index ? offset : -offset;
    if (lineValue < start - epsilon || lineValue > end + epsilon) {
      return;
    }
  }
  return lineValue;
}
function garbageCollect(caches, length) {
  each(caches, (cache) => {
    const gc = cache.gc;
    const gcLen = gc.length / 2;
    let i;
    if (gcLen > length) {
      for (i = 0; i < gcLen; ++i) {
        delete cache.data[gc[i]];
      }
      gc.splice(0, gcLen);
    }
  });
}
function getTickMarkLength(options) {
  return options.drawTicks ? options.tickLength : 0;
}
function getTitleHeight(options, fallback) {
  if (!options.display) {
    return 0;
  }
  const font = toFont(options.font, fallback);
  const padding = toPadding(options.padding);
  const lines = isArray(options.text) ? options.text.length : 1;
  return lines * font.lineHeight + padding.height;
}
function createScaleContext(parent, scale) {
  return createContext(parent, {
    scale,
    type: "scale"
  });
}
function createTickContext(parent, index, tick) {
  return createContext(parent, {
    tick,
    index,
    type: "tick"
  });
}
function titleAlign(align, position, reverse) {
  let ret = _toLeftRightCenter(align);
  if (reverse && position !== "right" || !reverse && position === "right") {
    ret = reverseAlign(ret);
  }
  return ret;
}
function titleArgs(scale, offset, position, align) {
  const { top, left, bottom, right, chart } = scale;
  const { chartArea, scales } = chart;
  let rotation = 0;
  let maxWidth, titleX, titleY;
  const height = bottom - top;
  const width = right - left;
  if (scale.isHorizontal()) {
    titleX = _alignStartEnd(align, left, right);
    if (isObject(position)) {
      const positionAxisID = Object.keys(position)[0];
      const value = position[positionAxisID];
      titleY = scales[positionAxisID].getPixelForValue(value) + height - offset;
    } else if (position === "center") {
      titleY = (chartArea.bottom + chartArea.top) / 2 + height - offset;
    } else {
      titleY = offsetFromEdge(scale, position, offset);
    }
    maxWidth = right - left;
  } else {
    if (isObject(position)) {
      const positionAxisID = Object.keys(position)[0];
      const value = position[positionAxisID];
      titleX = scales[positionAxisID].getPixelForValue(value) - width + offset;
    } else if (position === "center") {
      titleX = (chartArea.left + chartArea.right) / 2 - width + offset;
    } else {
      titleX = offsetFromEdge(scale, position, offset);
    }
    titleY = _alignStartEnd(align, bottom, top);
    rotation = position === "left" ? -HALF_PI : HALF_PI;
  }
  return {
    titleX,
    titleY,
    maxWidth,
    rotation
  };
}
var Scale = class _Scale extends Element {
  constructor(cfg) {
    super();
    this.id = cfg.id;
    this.type = cfg.type;
    this.options = void 0;
    this.ctx = cfg.ctx;
    this.chart = cfg.chart;
    this.top = void 0;
    this.bottom = void 0;
    this.left = void 0;
    this.right = void 0;
    this.width = void 0;
    this.height = void 0;
    this._margins = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    };
    this.maxWidth = void 0;
    this.maxHeight = void 0;
    this.paddingTop = void 0;
    this.paddingBottom = void 0;
    this.paddingLeft = void 0;
    this.paddingRight = void 0;
    this.axis = void 0;
    this.labelRotation = void 0;
    this.min = void 0;
    this.max = void 0;
    this._range = void 0;
    this.ticks = [];
    this._gridLineItems = null;
    this._labelItems = null;
    this._labelSizes = null;
    this._length = 0;
    this._maxLength = 0;
    this._longestTextCache = {};
    this._startPixel = void 0;
    this._endPixel = void 0;
    this._reversePixels = false;
    this._userMax = void 0;
    this._userMin = void 0;
    this._suggestedMax = void 0;
    this._suggestedMin = void 0;
    this._ticksLength = 0;
    this._borderValue = 0;
    this._cache = {};
    this._dataLimitsCached = false;
    this.$context = void 0;
  }
  init(options) {
    this.options = options.setContext(this.getContext());
    this.axis = options.axis;
    this._userMin = this.parse(options.min);
    this._userMax = this.parse(options.max);
    this._suggestedMin = this.parse(options.suggestedMin);
    this._suggestedMax = this.parse(options.suggestedMax);
  }
  parse(raw, index) {
    return raw;
  }
  getUserBounds() {
    let { _userMin, _userMax, _suggestedMin, _suggestedMax } = this;
    _userMin = finiteOrDefault(_userMin, Number.POSITIVE_INFINITY);
    _userMax = finiteOrDefault(_userMax, Number.NEGATIVE_INFINITY);
    _suggestedMin = finiteOrDefault(_suggestedMin, Number.POSITIVE_INFINITY);
    _suggestedMax = finiteOrDefault(_suggestedMax, Number.NEGATIVE_INFINITY);
    return {
      min: finiteOrDefault(_userMin, _suggestedMin),
      max: finiteOrDefault(_userMax, _suggestedMax),
      minDefined: isNumberFinite(_userMin),
      maxDefined: isNumberFinite(_userMax)
    };
  }
  getMinMax(canStack) {
    let { min, max, minDefined, maxDefined } = this.getUserBounds();
    let range;
    if (minDefined && maxDefined) {
      return {
        min,
        max
      };
    }
    const metas = this.getMatchingVisibleMetas();
    for (let i = 0, ilen = metas.length; i < ilen; ++i) {
      range = metas[i].controller.getMinMax(this, canStack);
      if (!minDefined) {
        min = Math.min(min, range.min);
      }
      if (!maxDefined) {
        max = Math.max(max, range.max);
      }
    }
    min = maxDefined && min > max ? max : min;
    max = minDefined && min > max ? min : max;
    return {
      min: finiteOrDefault(min, finiteOrDefault(max, min)),
      max: finiteOrDefault(max, finiteOrDefault(min, max))
    };
  }
  getPadding() {
    return {
      left: this.paddingLeft || 0,
      top: this.paddingTop || 0,
      right: this.paddingRight || 0,
      bottom: this.paddingBottom || 0
    };
  }
  getTicks() {
    return this.ticks;
  }
  getLabels() {
    const data = this.chart.data;
    return this.options.labels || (this.isHorizontal() ? data.xLabels : data.yLabels) || data.labels || [];
  }
  getLabelItems(chartArea = this.chart.chartArea) {
    const items = this._labelItems || (this._labelItems = this._computeLabelItems(chartArea));
    return items;
  }
  beforeLayout() {
    this._cache = {};
    this._dataLimitsCached = false;
  }
  beforeUpdate() {
    callback(this.options.beforeUpdate, [
      this
    ]);
  }
  update(maxWidth, maxHeight, margins) {
    const { beginAtZero, grace, ticks: tickOpts } = this.options;
    const sampleSize = tickOpts.sampleSize;
    this.beforeUpdate();
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this._margins = margins = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, margins);
    this.ticks = null;
    this._labelSizes = null;
    this._gridLineItems = null;
    this._labelItems = null;
    this.beforeSetDimensions();
    this.setDimensions();
    this.afterSetDimensions();
    this._maxLength = this.isHorizontal() ? this.width + margins.left + margins.right : this.height + margins.top + margins.bottom;
    if (!this._dataLimitsCached) {
      this.beforeDataLimits();
      this.determineDataLimits();
      this.afterDataLimits();
      this._range = _addGrace(this, grace, beginAtZero);
      this._dataLimitsCached = true;
    }
    this.beforeBuildTicks();
    this.ticks = this.buildTicks() || [];
    this.afterBuildTicks();
    const samplingEnabled = sampleSize < this.ticks.length;
    this._convertTicksToLabels(samplingEnabled ? sample(this.ticks, sampleSize) : this.ticks);
    this.configure();
    this.beforeCalculateLabelRotation();
    this.calculateLabelRotation();
    this.afterCalculateLabelRotation();
    if (tickOpts.display && (tickOpts.autoSkip || tickOpts.source === "auto")) {
      this.ticks = autoSkip(this, this.ticks);
      this._labelSizes = null;
      this.afterAutoSkip();
    }
    if (samplingEnabled) {
      this._convertTicksToLabels(this.ticks);
    }
    this.beforeFit();
    this.fit();
    this.afterFit();
    this.afterUpdate();
  }
  configure() {
    let reversePixels = this.options.reverse;
    let startPixel, endPixel;
    if (this.isHorizontal()) {
      startPixel = this.left;
      endPixel = this.right;
    } else {
      startPixel = this.top;
      endPixel = this.bottom;
      reversePixels = !reversePixels;
    }
    this._startPixel = startPixel;
    this._endPixel = endPixel;
    this._reversePixels = reversePixels;
    this._length = endPixel - startPixel;
    this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    callback(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    callback(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    if (this.isHorizontal()) {
      this.width = this.maxWidth;
      this.left = 0;
      this.right = this.width;
    } else {
      this.height = this.maxHeight;
      this.top = 0;
      this.bottom = this.height;
    }
    this.paddingLeft = 0;
    this.paddingTop = 0;
    this.paddingRight = 0;
    this.paddingBottom = 0;
  }
  afterSetDimensions() {
    callback(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(name) {
    this.chart.notifyPlugins(name, this.getContext());
    callback(this.options[name], [
      this
    ]);
  }
  beforeDataLimits() {
    this._callHooks("beforeDataLimits");
  }
  determineDataLimits() {
  }
  afterDataLimits() {
    this._callHooks("afterDataLimits");
  }
  beforeBuildTicks() {
    this._callHooks("beforeBuildTicks");
  }
  buildTicks() {
    return [];
  }
  afterBuildTicks() {
    this._callHooks("afterBuildTicks");
  }
  beforeTickToLabelConversion() {
    callback(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(ticks) {
    const tickOpts = this.options.ticks;
    let i, ilen, tick;
    for (i = 0, ilen = ticks.length; i < ilen; i++) {
      tick = ticks[i];
      tick.label = callback(tickOpts.callback, [
        tick.value,
        i,
        ticks
      ], this);
    }
  }
  afterTickToLabelConversion() {
    callback(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    callback(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const options = this.options;
    const tickOpts = options.ticks;
    const numTicks = getTicksLimit(this.ticks.length, options.ticks.maxTicksLimit);
    const minRotation = tickOpts.minRotation || 0;
    const maxRotation = tickOpts.maxRotation;
    let labelRotation = minRotation;
    let tickWidth, maxHeight, maxLabelDiagonal;
    if (!this._isVisible() || !tickOpts.display || minRotation >= maxRotation || numTicks <= 1 || !this.isHorizontal()) {
      this.labelRotation = minRotation;
      return;
    }
    const labelSizes = this._getLabelSizes();
    const maxLabelWidth = labelSizes.widest.width;
    const maxLabelHeight = labelSizes.highest.height;
    const maxWidth = _limitValue(this.chart.width - maxLabelWidth, 0, this.maxWidth);
    tickWidth = options.offset ? this.maxWidth / numTicks : maxWidth / (numTicks - 1);
    if (maxLabelWidth + 6 > tickWidth) {
      tickWidth = maxWidth / (numTicks - (options.offset ? 0.5 : 1));
      maxHeight = this.maxHeight - getTickMarkLength(options.grid) - tickOpts.padding - getTitleHeight(options.title, this.chart.options.font);
      maxLabelDiagonal = Math.sqrt(maxLabelWidth * maxLabelWidth + maxLabelHeight * maxLabelHeight);
      labelRotation = toDegrees(Math.min(Math.asin(_limitValue((labelSizes.highest.height + 6) / tickWidth, -1, 1)), Math.asin(_limitValue(maxHeight / maxLabelDiagonal, -1, 1)) - Math.asin(_limitValue(maxLabelHeight / maxLabelDiagonal, -1, 1))));
      labelRotation = Math.max(minRotation, Math.min(maxRotation, labelRotation));
    }
    this.labelRotation = labelRotation;
  }
  afterCalculateLabelRotation() {
    callback(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    callback(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const minSize = {
      width: 0,
      height: 0
    };
    const { chart, options: { ticks: tickOpts, title: titleOpts, grid: gridOpts } } = this;
    const display = this._isVisible();
    const isHorizontal = this.isHorizontal();
    if (display) {
      const titleHeight = getTitleHeight(titleOpts, chart.options.font);
      if (isHorizontal) {
        minSize.width = this.maxWidth;
        minSize.height = getTickMarkLength(gridOpts) + titleHeight;
      } else {
        minSize.height = this.maxHeight;
        minSize.width = getTickMarkLength(gridOpts) + titleHeight;
      }
      if (tickOpts.display && this.ticks.length) {
        const { first, last, widest, highest } = this._getLabelSizes();
        const tickPadding = tickOpts.padding * 2;
        const angleRadians = toRadians(this.labelRotation);
        const cos = Math.cos(angleRadians);
        const sin = Math.sin(angleRadians);
        if (isHorizontal) {
          const labelHeight = tickOpts.mirror ? 0 : sin * widest.width + cos * highest.height;
          minSize.height = Math.min(this.maxHeight, minSize.height + labelHeight + tickPadding);
        } else {
          const labelWidth = tickOpts.mirror ? 0 : cos * widest.width + sin * highest.height;
          minSize.width = Math.min(this.maxWidth, minSize.width + labelWidth + tickPadding);
        }
        this._calculatePadding(first, last, sin, cos);
      }
    }
    this._handleMargins();
    if (isHorizontal) {
      this.width = this._length = chart.width - this._margins.left - this._margins.right;
      this.height = minSize.height;
    } else {
      this.width = minSize.width;
      this.height = this._length = chart.height - this._margins.top - this._margins.bottom;
    }
  }
  _calculatePadding(first, last, sin, cos) {
    const { ticks: { align, padding }, position } = this.options;
    const isRotated = this.labelRotation !== 0;
    const labelsBelowTicks = position !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const offsetLeft = this.getPixelForTick(0) - this.left;
      const offsetRight = this.right - this.getPixelForTick(this.ticks.length - 1);
      let paddingLeft = 0;
      let paddingRight = 0;
      if (isRotated) {
        if (labelsBelowTicks) {
          paddingLeft = cos * first.width;
          paddingRight = sin * last.height;
        } else {
          paddingLeft = sin * first.height;
          paddingRight = cos * last.width;
        }
      } else if (align === "start") {
        paddingRight = last.width;
      } else if (align === "end") {
        paddingLeft = first.width;
      } else if (align !== "inner") {
        paddingLeft = first.width / 2;
        paddingRight = last.width / 2;
      }
      this.paddingLeft = Math.max((paddingLeft - offsetLeft + padding) * this.width / (this.width - offsetLeft), 0);
      this.paddingRight = Math.max((paddingRight - offsetRight + padding) * this.width / (this.width - offsetRight), 0);
    } else {
      let paddingTop = last.height / 2;
      let paddingBottom = first.height / 2;
      if (align === "start") {
        paddingTop = 0;
        paddingBottom = first.height;
      } else if (align === "end") {
        paddingTop = last.height;
        paddingBottom = 0;
      }
      this.paddingTop = paddingTop + padding;
      this.paddingBottom = paddingBottom + padding;
    }
  }
  _handleMargins() {
    if (this._margins) {
      this._margins.left = Math.max(this.paddingLeft, this._margins.left);
      this._margins.top = Math.max(this.paddingTop, this._margins.top);
      this._margins.right = Math.max(this.paddingRight, this._margins.right);
      this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom);
    }
  }
  afterFit() {
    callback(this.options.afterFit, [
      this
    ]);
  }
  isHorizontal() {
    const { axis, position } = this.options;
    return position === "top" || position === "bottom" || axis === "x";
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(ticks) {
    this.beforeTickToLabelConversion();
    this.generateTickLabels(ticks);
    let i, ilen;
    for (i = 0, ilen = ticks.length; i < ilen; i++) {
      if (isNullOrUndef(ticks[i].label)) {
        ticks.splice(i, 1);
        ilen--;
        i--;
      }
    }
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let labelSizes = this._labelSizes;
    if (!labelSizes) {
      const sampleSize = this.options.ticks.sampleSize;
      let ticks = this.ticks;
      if (sampleSize < ticks.length) {
        ticks = sample(ticks, sampleSize);
      }
      this._labelSizes = labelSizes = this._computeLabelSizes(ticks, ticks.length, this.options.ticks.maxTicksLimit);
    }
    return labelSizes;
  }
  _computeLabelSizes(ticks, length, maxTicksLimit) {
    const { ctx, _longestTextCache: caches } = this;
    const widths = [];
    const heights = [];
    const increment = Math.floor(length / getTicksLimit(length, maxTicksLimit));
    let widestLabelSize = 0;
    let highestLabelSize = 0;
    let i, j, jlen, label, tickFont, fontString, cache, lineHeight, width, height, nestedLabel;
    for (i = 0; i < length; i += increment) {
      label = ticks[i].label;
      tickFont = this._resolveTickFontOptions(i);
      ctx.font = fontString = tickFont.string;
      cache = caches[fontString] = caches[fontString] || {
        data: {},
        gc: []
      };
      lineHeight = tickFont.lineHeight;
      width = height = 0;
      if (!isNullOrUndef(label) && !isArray(label)) {
        width = _measureText(ctx, cache.data, cache.gc, width, label);
        height = lineHeight;
      } else if (isArray(label)) {
        for (j = 0, jlen = label.length; j < jlen; ++j) {
          nestedLabel = label[j];
          if (!isNullOrUndef(nestedLabel) && !isArray(nestedLabel)) {
            width = _measureText(ctx, cache.data, cache.gc, width, nestedLabel);
            height += lineHeight;
          }
        }
      }
      widths.push(width);
      heights.push(height);
      widestLabelSize = Math.max(width, widestLabelSize);
      highestLabelSize = Math.max(height, highestLabelSize);
    }
    garbageCollect(caches, length);
    const widest = widths.indexOf(widestLabelSize);
    const highest = heights.indexOf(highestLabelSize);
    const valueAt = (idx) => ({
      width: widths[idx] || 0,
      height: heights[idx] || 0
    });
    return {
      first: valueAt(0),
      last: valueAt(length - 1),
      widest: valueAt(widest),
      highest: valueAt(highest),
      widths,
      heights
    };
  }
  getLabelForValue(value) {
    return value;
  }
  getPixelForValue(value, index) {
    return NaN;
  }
  getValueForPixel(pixel) {
  }
  getPixelForTick(index) {
    const ticks = this.ticks;
    if (index < 0 || index > ticks.length - 1) {
      return null;
    }
    return this.getPixelForValue(ticks[index].value);
  }
  getPixelForDecimal(decimal) {
    if (this._reversePixels) {
      decimal = 1 - decimal;
    }
    const pixel = this._startPixel + decimal * this._length;
    return _int16Range(this._alignToPixels ? _alignPixel(this.chart, pixel, 0) : pixel);
  }
  getDecimalForPixel(pixel) {
    const decimal = (pixel - this._startPixel) / this._length;
    return this._reversePixels ? 1 - decimal : decimal;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min, max } = this;
    return min < 0 && max < 0 ? max : min > 0 && max > 0 ? min : 0;
  }
  getContext(index) {
    const ticks = this.ticks || [];
    if (index >= 0 && index < ticks.length) {
      const tick = ticks[index];
      return tick.$context || (tick.$context = createTickContext(this.getContext(), index, tick));
    }
    return this.$context || (this.$context = createScaleContext(this.chart.getContext(), this));
  }
  _tickSize() {
    const optionTicks = this.options.ticks;
    const rot = toRadians(this.labelRotation);
    const cos = Math.abs(Math.cos(rot));
    const sin = Math.abs(Math.sin(rot));
    const labelSizes = this._getLabelSizes();
    const padding = optionTicks.autoSkipPadding || 0;
    const w = labelSizes ? labelSizes.widest.width + padding : 0;
    const h4 = labelSizes ? labelSizes.highest.height + padding : 0;
    return this.isHorizontal() ? h4 * cos > w * sin ? w / cos : h4 / sin : h4 * sin < w * cos ? h4 / cos : w / sin;
  }
  _isVisible() {
    const display = this.options.display;
    if (display !== "auto") {
      return !!display;
    }
    return this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(chartArea) {
    const axis = this.axis;
    const chart = this.chart;
    const options = this.options;
    const { grid, position, border } = options;
    const offset = grid.offset;
    const isHorizontal = this.isHorizontal();
    const ticks = this.ticks;
    const ticksLength = ticks.length + (offset ? 1 : 0);
    const tl = getTickMarkLength(grid);
    const items = [];
    const borderOpts = border.setContext(this.getContext());
    const axisWidth = borderOpts.display ? borderOpts.width : 0;
    const axisHalfWidth = axisWidth / 2;
    const alignBorderValue = function(pixel) {
      return _alignPixel(chart, pixel, axisWidth);
    };
    let borderValue, i, lineValue, alignedLineValue;
    let tx1, ty1, tx2, ty2, x1, y1, x2, y2;
    if (position === "top") {
      borderValue = alignBorderValue(this.bottom);
      ty1 = this.bottom - tl;
      ty2 = borderValue - axisHalfWidth;
      y1 = alignBorderValue(chartArea.top) + axisHalfWidth;
      y2 = chartArea.bottom;
    } else if (position === "bottom") {
      borderValue = alignBorderValue(this.top);
      y1 = chartArea.top;
      y2 = alignBorderValue(chartArea.bottom) - axisHalfWidth;
      ty1 = borderValue + axisHalfWidth;
      ty2 = this.top + tl;
    } else if (position === "left") {
      borderValue = alignBorderValue(this.right);
      tx1 = this.right - tl;
      tx2 = borderValue - axisHalfWidth;
      x1 = alignBorderValue(chartArea.left) + axisHalfWidth;
      x2 = chartArea.right;
    } else if (position === "right") {
      borderValue = alignBorderValue(this.left);
      x1 = chartArea.left;
      x2 = alignBorderValue(chartArea.right) - axisHalfWidth;
      tx1 = borderValue + axisHalfWidth;
      tx2 = this.left + tl;
    } else if (axis === "x") {
      if (position === "center") {
        borderValue = alignBorderValue((chartArea.top + chartArea.bottom) / 2 + 0.5);
      } else if (isObject(position)) {
        const positionAxisID = Object.keys(position)[0];
        const value = position[positionAxisID];
        borderValue = alignBorderValue(this.chart.scales[positionAxisID].getPixelForValue(value));
      }
      y1 = chartArea.top;
      y2 = chartArea.bottom;
      ty1 = borderValue + axisHalfWidth;
      ty2 = ty1 + tl;
    } else if (axis === "y") {
      if (position === "center") {
        borderValue = alignBorderValue((chartArea.left + chartArea.right) / 2);
      } else if (isObject(position)) {
        const positionAxisID = Object.keys(position)[0];
        const value = position[positionAxisID];
        borderValue = alignBorderValue(this.chart.scales[positionAxisID].getPixelForValue(value));
      }
      tx1 = borderValue - axisHalfWidth;
      tx2 = tx1 - tl;
      x1 = chartArea.left;
      x2 = chartArea.right;
    }
    const limit = valueOrDefault(options.ticks.maxTicksLimit, ticksLength);
    const step = Math.max(1, Math.ceil(ticksLength / limit));
    for (i = 0; i < ticksLength; i += step) {
      const context = this.getContext(i);
      const optsAtIndex = grid.setContext(context);
      const optsAtIndexBorder = border.setContext(context);
      const lineWidth = optsAtIndex.lineWidth;
      const lineColor = optsAtIndex.color;
      const borderDash = optsAtIndexBorder.dash || [];
      const borderDashOffset = optsAtIndexBorder.dashOffset;
      const tickWidth = optsAtIndex.tickWidth;
      const tickColor = optsAtIndex.tickColor;
      const tickBorderDash = optsAtIndex.tickBorderDash || [];
      const tickBorderDashOffset = optsAtIndex.tickBorderDashOffset;
      lineValue = getPixelForGridLine(this, i, offset);
      if (lineValue === void 0) {
        continue;
      }
      alignedLineValue = _alignPixel(chart, lineValue, lineWidth);
      if (isHorizontal) {
        tx1 = tx2 = x1 = x2 = alignedLineValue;
      } else {
        ty1 = ty2 = y1 = y2 = alignedLineValue;
      }
      items.push({
        tx1,
        ty1,
        tx2,
        ty2,
        x1,
        y1,
        x2,
        y2,
        width: lineWidth,
        color: lineColor,
        borderDash,
        borderDashOffset,
        tickWidth,
        tickColor,
        tickBorderDash,
        tickBorderDashOffset
      });
    }
    this._ticksLength = ticksLength;
    this._borderValue = borderValue;
    return items;
  }
  _computeLabelItems(chartArea) {
    const axis = this.axis;
    const options = this.options;
    const { position, ticks: optionTicks } = options;
    const isHorizontal = this.isHorizontal();
    const ticks = this.ticks;
    const { align, crossAlign, padding, mirror } = optionTicks;
    const tl = getTickMarkLength(options.grid);
    const tickAndPadding = tl + padding;
    const hTickAndPadding = mirror ? -padding : tickAndPadding;
    const rotation = -toRadians(this.labelRotation);
    const items = [];
    let i, ilen, tick, label, x, y, textAlign, pixel, font, lineHeight, lineCount, textOffset;
    let textBaseline = "middle";
    if (position === "top") {
      y = this.bottom - hTickAndPadding;
      textAlign = this._getXAxisLabelAlignment();
    } else if (position === "bottom") {
      y = this.top + hTickAndPadding;
      textAlign = this._getXAxisLabelAlignment();
    } else if (position === "left") {
      const ret = this._getYAxisLabelAlignment(tl);
      textAlign = ret.textAlign;
      x = ret.x;
    } else if (position === "right") {
      const ret = this._getYAxisLabelAlignment(tl);
      textAlign = ret.textAlign;
      x = ret.x;
    } else if (axis === "x") {
      if (position === "center") {
        y = (chartArea.top + chartArea.bottom) / 2 + tickAndPadding;
      } else if (isObject(position)) {
        const positionAxisID = Object.keys(position)[0];
        const value = position[positionAxisID];
        y = this.chart.scales[positionAxisID].getPixelForValue(value) + tickAndPadding;
      }
      textAlign = this._getXAxisLabelAlignment();
    } else if (axis === "y") {
      if (position === "center") {
        x = (chartArea.left + chartArea.right) / 2 - tickAndPadding;
      } else if (isObject(position)) {
        const positionAxisID = Object.keys(position)[0];
        const value = position[positionAxisID];
        x = this.chart.scales[positionAxisID].getPixelForValue(value);
      }
      textAlign = this._getYAxisLabelAlignment(tl).textAlign;
    }
    if (axis === "y") {
      if (align === "start") {
        textBaseline = "top";
      } else if (align === "end") {
        textBaseline = "bottom";
      }
    }
    const labelSizes = this._getLabelSizes();
    for (i = 0, ilen = ticks.length; i < ilen; ++i) {
      tick = ticks[i];
      label = tick.label;
      const optsAtIndex = optionTicks.setContext(this.getContext(i));
      pixel = this.getPixelForTick(i) + optionTicks.labelOffset;
      font = this._resolveTickFontOptions(i);
      lineHeight = font.lineHeight;
      lineCount = isArray(label) ? label.length : 1;
      const halfCount = lineCount / 2;
      const color2 = optsAtIndex.color;
      const strokeColor = optsAtIndex.textStrokeColor;
      const strokeWidth = optsAtIndex.textStrokeWidth;
      let tickTextAlign = textAlign;
      if (isHorizontal) {
        x = pixel;
        if (textAlign === "inner") {
          if (i === ilen - 1) {
            tickTextAlign = !this.options.reverse ? "right" : "left";
          } else if (i === 0) {
            tickTextAlign = !this.options.reverse ? "left" : "right";
          } else {
            tickTextAlign = "center";
          }
        }
        if (position === "top") {
          if (crossAlign === "near" || rotation !== 0) {
            textOffset = -lineCount * lineHeight + lineHeight / 2;
          } else if (crossAlign === "center") {
            textOffset = -labelSizes.highest.height / 2 - halfCount * lineHeight + lineHeight;
          } else {
            textOffset = -labelSizes.highest.height + lineHeight / 2;
          }
        } else {
          if (crossAlign === "near" || rotation !== 0) {
            textOffset = lineHeight / 2;
          } else if (crossAlign === "center") {
            textOffset = labelSizes.highest.height / 2 - halfCount * lineHeight;
          } else {
            textOffset = labelSizes.highest.height - lineCount * lineHeight;
          }
        }
        if (mirror) {
          textOffset *= -1;
        }
        if (rotation !== 0 && !optsAtIndex.showLabelBackdrop) {
          x += lineHeight / 2 * Math.sin(rotation);
        }
      } else {
        y = pixel;
        textOffset = (1 - lineCount) * lineHeight / 2;
      }
      let backdrop;
      if (optsAtIndex.showLabelBackdrop) {
        const labelPadding = toPadding(optsAtIndex.backdropPadding);
        const height = labelSizes.heights[i];
        const width = labelSizes.widths[i];
        let top = textOffset - labelPadding.top;
        let left = 0 - labelPadding.left;
        switch (textBaseline) {
          case "middle":
            top -= height / 2;
            break;
          case "bottom":
            top -= height;
            break;
        }
        switch (textAlign) {
          case "center":
            left -= width / 2;
            break;
          case "right":
            left -= width;
            break;
          case "inner":
            if (i === ilen - 1) {
              left -= width;
            } else if (i > 0) {
              left -= width / 2;
            }
            break;
        }
        backdrop = {
          left,
          top,
          width: width + labelPadding.width,
          height: height + labelPadding.height,
          color: optsAtIndex.backdropColor
        };
      }
      items.push({
        label,
        font,
        textOffset,
        options: {
          rotation,
          color: color2,
          strokeColor,
          strokeWidth,
          textAlign: tickTextAlign,
          textBaseline,
          translation: [
            x,
            y
          ],
          backdrop
        }
      });
    }
    return items;
  }
  _getXAxisLabelAlignment() {
    const { position, ticks } = this.options;
    const rotation = -toRadians(this.labelRotation);
    if (rotation) {
      return position === "top" ? "left" : "right";
    }
    let align = "center";
    if (ticks.align === "start") {
      align = "left";
    } else if (ticks.align === "end") {
      align = "right";
    } else if (ticks.align === "inner") {
      align = "inner";
    }
    return align;
  }
  _getYAxisLabelAlignment(tl) {
    const { position, ticks: { crossAlign, mirror, padding } } = this.options;
    const labelSizes = this._getLabelSizes();
    const tickAndPadding = tl + padding;
    const widest = labelSizes.widest.width;
    let textAlign;
    let x;
    if (position === "left") {
      if (mirror) {
        x = this.right + padding;
        if (crossAlign === "near") {
          textAlign = "left";
        } else if (crossAlign === "center") {
          textAlign = "center";
          x += widest / 2;
        } else {
          textAlign = "right";
          x += widest;
        }
      } else {
        x = this.right - tickAndPadding;
        if (crossAlign === "near") {
          textAlign = "right";
        } else if (crossAlign === "center") {
          textAlign = "center";
          x -= widest / 2;
        } else {
          textAlign = "left";
          x = this.left;
        }
      }
    } else if (position === "right") {
      if (mirror) {
        x = this.left + padding;
        if (crossAlign === "near") {
          textAlign = "right";
        } else if (crossAlign === "center") {
          textAlign = "center";
          x -= widest / 2;
        } else {
          textAlign = "left";
          x -= widest;
        }
      } else {
        x = this.left + tickAndPadding;
        if (crossAlign === "near") {
          textAlign = "left";
        } else if (crossAlign === "center") {
          textAlign = "center";
          x += widest / 2;
        } else {
          textAlign = "right";
          x = this.right;
        }
      }
    } else {
      textAlign = "right";
    }
    return {
      textAlign,
      x
    };
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror) {
      return;
    }
    const chart = this.chart;
    const position = this.options.position;
    if (position === "left" || position === "right") {
      return {
        top: 0,
        left: this.left,
        bottom: chart.height,
        right: this.right
      };
    }
    if (position === "top" || position === "bottom") {
      return {
        top: this.top,
        left: 0,
        bottom: this.bottom,
        right: chart.width
      };
    }
  }
  drawBackground() {
    const { ctx, options: { backgroundColor }, left, top, width, height } = this;
    if (backgroundColor) {
      ctx.save();
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(left, top, width, height);
      ctx.restore();
    }
  }
  getLineWidthForValue(value) {
    const grid = this.options.grid;
    if (!this._isVisible() || !grid.display) {
      return 0;
    }
    const ticks = this.ticks;
    const index = ticks.findIndex((t2) => t2.value === value);
    if (index >= 0) {
      const opts = grid.setContext(this.getContext(index));
      return opts.lineWidth;
    }
    return 0;
  }
  drawGrid(chartArea) {
    const grid = this.options.grid;
    const ctx = this.ctx;
    const items = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(chartArea));
    let i, ilen;
    const drawLine = (p1, p2, style) => {
      if (!style.width || !style.color) {
        return;
      }
      ctx.save();
      ctx.lineWidth = style.width;
      ctx.strokeStyle = style.color;
      ctx.setLineDash(style.borderDash || []);
      ctx.lineDashOffset = style.borderDashOffset;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      ctx.restore();
    };
    if (grid.display) {
      for (i = 0, ilen = items.length; i < ilen; ++i) {
        const item = items[i];
        if (grid.drawOnChartArea) {
          drawLine({
            x: item.x1,
            y: item.y1
          }, {
            x: item.x2,
            y: item.y2
          }, item);
        }
        if (grid.drawTicks) {
          drawLine({
            x: item.tx1,
            y: item.ty1
          }, {
            x: item.tx2,
            y: item.ty2
          }, {
            color: item.tickColor,
            width: item.tickWidth,
            borderDash: item.tickBorderDash,
            borderDashOffset: item.tickBorderDashOffset
          });
        }
      }
    }
  }
  drawBorder() {
    const { chart, ctx, options: { border, grid } } = this;
    const borderOpts = border.setContext(this.getContext());
    const axisWidth = border.display ? borderOpts.width : 0;
    if (!axisWidth) {
      return;
    }
    const lastLineWidth = grid.setContext(this.getContext(0)).lineWidth;
    const borderValue = this._borderValue;
    let x1, x2, y1, y2;
    if (this.isHorizontal()) {
      x1 = _alignPixel(chart, this.left, axisWidth) - axisWidth / 2;
      x2 = _alignPixel(chart, this.right, lastLineWidth) + lastLineWidth / 2;
      y1 = y2 = borderValue;
    } else {
      y1 = _alignPixel(chart, this.top, axisWidth) - axisWidth / 2;
      y2 = _alignPixel(chart, this.bottom, lastLineWidth) + lastLineWidth / 2;
      x1 = x2 = borderValue;
    }
    ctx.save();
    ctx.lineWidth = borderOpts.width;
    ctx.strokeStyle = borderOpts.color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
  }
  drawLabels(chartArea) {
    const optionTicks = this.options.ticks;
    if (!optionTicks.display) {
      return;
    }
    const ctx = this.ctx;
    const area = this._computeLabelArea();
    if (area) {
      clipArea(ctx, area);
    }
    const items = this.getLabelItems(chartArea);
    for (const item of items) {
      const renderTextOptions = item.options;
      const tickFont = item.font;
      const label = item.label;
      const y = item.textOffset;
      renderText(ctx, label, 0, y, tickFont, renderTextOptions);
    }
    if (area) {
      unclipArea(ctx);
    }
  }
  drawTitle() {
    const { ctx, options: { position, title, reverse } } = this;
    if (!title.display) {
      return;
    }
    const font = toFont(title.font);
    const padding = toPadding(title.padding);
    const align = title.align;
    let offset = font.lineHeight / 2;
    if (position === "bottom" || position === "center" || isObject(position)) {
      offset += padding.bottom;
      if (isArray(title.text)) {
        offset += font.lineHeight * (title.text.length - 1);
      }
    } else {
      offset += padding.top;
    }
    const { titleX, titleY, maxWidth, rotation } = titleArgs(this, offset, position, align);
    renderText(ctx, title.text, 0, 0, font, {
      color: title.color,
      maxWidth,
      rotation,
      textAlign: titleAlign(align, position, reverse),
      textBaseline: "middle",
      translation: [
        titleX,
        titleY
      ]
    });
  }
  draw(chartArea) {
    if (!this._isVisible()) {
      return;
    }
    this.drawBackground();
    this.drawGrid(chartArea);
    this.drawBorder();
    this.drawTitle();
    this.drawLabels(chartArea);
  }
  _layers() {
    const opts = this.options;
    const tz = opts.ticks && opts.ticks.z || 0;
    const gz = valueOrDefault(opts.grid && opts.grid.z, -1);
    const bz = valueOrDefault(opts.border && opts.border.z, 0);
    if (!this._isVisible() || this.draw !== _Scale.prototype.draw) {
      return [
        {
          z: tz,
          draw: (chartArea) => {
            this.draw(chartArea);
          }
        }
      ];
    }
    return [
      {
        z: gz,
        draw: (chartArea) => {
          this.drawBackground();
          this.drawGrid(chartArea);
          this.drawTitle();
        }
      },
      {
        z: bz,
        draw: () => {
          this.drawBorder();
        }
      },
      {
        z: tz,
        draw: (chartArea) => {
          this.drawLabels(chartArea);
        }
      }
    ];
  }
  getMatchingVisibleMetas(type) {
    const metas = this.chart.getSortedVisibleDatasetMetas();
    const axisID = this.axis + "AxisID";
    const result = [];
    let i, ilen;
    for (i = 0, ilen = metas.length; i < ilen; ++i) {
      const meta = metas[i];
      if (meta[axisID] === this.id && (!type || meta.type === type)) {
        result.push(meta);
      }
    }
    return result;
  }
  _resolveTickFontOptions(index) {
    const opts = this.options.ticks.setContext(this.getContext(index));
    return toFont(opts.font);
  }
  _maxDigits() {
    const fontSize = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / fontSize;
  }
};
var TypedRegistry = class {
  constructor(type, scope, override) {
    this.type = type;
    this.scope = scope;
    this.override = override;
    this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(type) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, type.prototype);
  }
  register(item) {
    const proto = Object.getPrototypeOf(item);
    let parentScope;
    if (isIChartComponent(proto)) {
      parentScope = this.register(proto);
    }
    const items = this.items;
    const id = item.id;
    const scope = this.scope + "." + id;
    if (!id) {
      throw new Error("class does not have id: " + item);
    }
    if (id in items) {
      return scope;
    }
    items[id] = item;
    registerDefaults(item, scope, parentScope);
    if (this.override) {
      defaults.override(item.id, item.overrides);
    }
    return scope;
  }
  get(id) {
    return this.items[id];
  }
  unregister(item) {
    const items = this.items;
    const id = item.id;
    const scope = this.scope;
    if (id in items) {
      delete items[id];
    }
    if (scope && id in defaults[scope]) {
      delete defaults[scope][id];
      if (this.override) {
        delete overrides[id];
      }
    }
  }
};
function registerDefaults(item, scope, parentScope) {
  const itemDefaults = merge(/* @__PURE__ */ Object.create(null), [
    parentScope ? defaults.get(parentScope) : {},
    defaults.get(scope),
    item.defaults
  ]);
  defaults.set(scope, itemDefaults);
  if (item.defaultRoutes) {
    routeDefaults(scope, item.defaultRoutes);
  }
  if (item.descriptors) {
    defaults.describe(scope, item.descriptors);
  }
}
function routeDefaults(scope, routes) {
  Object.keys(routes).forEach((property) => {
    const propertyParts = property.split(".");
    const sourceName = propertyParts.pop();
    const sourceScope = [
      scope
    ].concat(propertyParts).join(".");
    const parts = routes[property].split(".");
    const targetName = parts.pop();
    const targetScope = parts.join(".");
    defaults.route(sourceScope, sourceName, targetScope, targetName);
  });
}
function isIChartComponent(proto) {
  return "id" in proto && "defaults" in proto;
}
var Registry = class {
  constructor() {
    this.controllers = new TypedRegistry(DatasetController, "datasets", true);
    this.elements = new TypedRegistry(Element, "elements");
    this.plugins = new TypedRegistry(Object, "plugins");
    this.scales = new TypedRegistry(Scale, "scales");
    this._typedRegistries = [
      this.controllers,
      this.scales,
      this.elements
    ];
  }
  add(...args) {
    this._each("register", args);
  }
  remove(...args) {
    this._each("unregister", args);
  }
  addControllers(...args) {
    this._each("register", args, this.controllers);
  }
  addElements(...args) {
    this._each("register", args, this.elements);
  }
  addPlugins(...args) {
    this._each("register", args, this.plugins);
  }
  addScales(...args) {
    this._each("register", args, this.scales);
  }
  getController(id) {
    return this._get(id, this.controllers, "controller");
  }
  getElement(id) {
    return this._get(id, this.elements, "element");
  }
  getPlugin(id) {
    return this._get(id, this.plugins, "plugin");
  }
  getScale(id) {
    return this._get(id, this.scales, "scale");
  }
  removeControllers(...args) {
    this._each("unregister", args, this.controllers);
  }
  removeElements(...args) {
    this._each("unregister", args, this.elements);
  }
  removePlugins(...args) {
    this._each("unregister", args, this.plugins);
  }
  removeScales(...args) {
    this._each("unregister", args, this.scales);
  }
  _each(method, args, typedRegistry) {
    [
      ...args
    ].forEach((arg) => {
      const reg = typedRegistry || this._getRegistryForType(arg);
      if (typedRegistry || reg.isForType(arg) || reg === this.plugins && arg.id) {
        this._exec(method, reg, arg);
      } else {
        each(arg, (item) => {
          const itemReg = typedRegistry || this._getRegistryForType(item);
          this._exec(method, itemReg, item);
        });
      }
    });
  }
  _exec(method, registry2, component) {
    const camelMethod = _capitalize(method);
    callback(component["before" + camelMethod], [], component);
    registry2[method](component);
    callback(component["after" + camelMethod], [], component);
  }
  _getRegistryForType(type) {
    for (let i = 0; i < this._typedRegistries.length; i++) {
      const reg = this._typedRegistries[i];
      if (reg.isForType(type)) {
        return reg;
      }
    }
    return this.plugins;
  }
  _get(id, typedRegistry, type) {
    const item = typedRegistry.get(id);
    if (item === void 0) {
      throw new Error('"' + id + '" is not a registered ' + type + ".");
    }
    return item;
  }
};
var registry = /* @__PURE__ */ new Registry();
var PluginService = class {
  constructor() {
    this._init = [];
  }
  notify(chart, hook, args, filter) {
    if (hook === "beforeInit") {
      this._init = this._createDescriptors(chart, true);
      this._notify(this._init, chart, "install");
    }
    const descriptors2 = filter ? this._descriptors(chart).filter(filter) : this._descriptors(chart);
    const result = this._notify(descriptors2, chart, hook, args);
    if (hook === "afterDestroy") {
      this._notify(descriptors2, chart, "stop");
      this._notify(this._init, chart, "uninstall");
    }
    return result;
  }
  _notify(descriptors2, chart, hook, args) {
    args = args || {};
    for (const descriptor of descriptors2) {
      const plugin = descriptor.plugin;
      const method = plugin[hook];
      const params = [
        chart,
        args,
        descriptor.options
      ];
      if (callback(method, params, plugin) === false && args.cancelable) {
        return false;
      }
    }
    return true;
  }
  invalidate() {
    if (!isNullOrUndef(this._cache)) {
      this._oldCache = this._cache;
      this._cache = void 0;
    }
  }
  _descriptors(chart) {
    if (this._cache) {
      return this._cache;
    }
    const descriptors2 = this._cache = this._createDescriptors(chart);
    this._notifyStateChanges(chart);
    return descriptors2;
  }
  _createDescriptors(chart, all) {
    const config = chart && chart.config;
    const options = valueOrDefault(config.options && config.options.plugins, {});
    const plugins = allPlugins(config);
    return options === false && !all ? [] : createDescriptors(chart, plugins, options, all);
  }
  _notifyStateChanges(chart) {
    const previousDescriptors = this._oldCache || [];
    const descriptors2 = this._cache;
    const diff = (a, b) => a.filter((x) => !b.some((y) => x.plugin.id === y.plugin.id));
    this._notify(diff(previousDescriptors, descriptors2), chart, "stop");
    this._notify(diff(descriptors2, previousDescriptors), chart, "start");
  }
};
function allPlugins(config) {
  const localIds = {};
  const plugins = [];
  const keys = Object.keys(registry.plugins.items);
  for (let i = 0; i < keys.length; i++) {
    plugins.push(registry.getPlugin(keys[i]));
  }
  const local = config.plugins || [];
  for (let i = 0; i < local.length; i++) {
    const plugin = local[i];
    if (plugins.indexOf(plugin) === -1) {
      plugins.push(plugin);
      localIds[plugin.id] = true;
    }
  }
  return {
    plugins,
    localIds
  };
}
function getOpts(options, all) {
  if (!all && options === false) {
    return null;
  }
  if (options === true) {
    return {};
  }
  return options;
}
function createDescriptors(chart, { plugins, localIds }, options, all) {
  const result = [];
  const context = chart.getContext();
  for (const plugin of plugins) {
    const id = plugin.id;
    const opts = getOpts(options[id], all);
    if (opts === null) {
      continue;
    }
    result.push({
      plugin,
      options: pluginOpts(chart.config, {
        plugin,
        local: localIds[id]
      }, opts, context)
    });
  }
  return result;
}
function pluginOpts(config, { plugin, local }, opts, context) {
  const keys = config.pluginScopeKeys(plugin);
  const scopes = config.getOptionScopes(opts, keys);
  if (local && plugin.defaults) {
    scopes.push(plugin.defaults);
  }
  return config.createResolver(scopes, context, [
    ""
  ], {
    scriptable: false,
    indexable: false,
    allKeys: true
  });
}
function getIndexAxis(type, options) {
  const datasetDefaults = defaults.datasets[type] || {};
  const datasetOptions = (options.datasets || {})[type] || {};
  return datasetOptions.indexAxis || options.indexAxis || datasetDefaults.indexAxis || "x";
}
function getAxisFromDefaultScaleID(id, indexAxis) {
  let axis = id;
  if (id === "_index_") {
    axis = indexAxis;
  } else if (id === "_value_") {
    axis = indexAxis === "x" ? "y" : "x";
  }
  return axis;
}
function getDefaultScaleIDFromAxis(axis, indexAxis) {
  return axis === indexAxis ? "_index_" : "_value_";
}
function idMatchesAxis(id) {
  if (id === "x" || id === "y" || id === "r") {
    return id;
  }
}
function axisFromPosition(position) {
  if (position === "top" || position === "bottom") {
    return "x";
  }
  if (position === "left" || position === "right") {
    return "y";
  }
}
function determineAxis(id, ...scaleOptions) {
  if (idMatchesAxis(id)) {
    return id;
  }
  for (const opts of scaleOptions) {
    const axis = opts.axis || axisFromPosition(opts.position) || id.length > 1 && idMatchesAxis(id[0].toLowerCase());
    if (axis) {
      return axis;
    }
  }
  throw new Error(`Cannot determine type of '${id}' axis. Please provide 'axis' or 'position' option.`);
}
function getAxisFromDataset(id, axis, dataset) {
  if (dataset[axis + "AxisID"] === id) {
    return {
      axis
    };
  }
}
function retrieveAxisFromDatasets(id, config) {
  if (config.data && config.data.datasets) {
    const boundDs = config.data.datasets.filter((d) => d.xAxisID === id || d.yAxisID === id);
    if (boundDs.length) {
      return getAxisFromDataset(id, "x", boundDs[0]) || getAxisFromDataset(id, "y", boundDs[0]);
    }
  }
  return {};
}
function mergeScaleConfig(config, options) {
  const chartDefaults = overrides[config.type] || {
    scales: {}
  };
  const configScales = options.scales || {};
  const chartIndexAxis = getIndexAxis(config.type, options);
  const scales = /* @__PURE__ */ Object.create(null);
  Object.keys(configScales).forEach((id) => {
    const scaleConf = configScales[id];
    if (!isObject(scaleConf)) {
      return console.error(`Invalid scale configuration for scale: ${id}`);
    }
    if (scaleConf._proxy) {
      return console.warn(`Ignoring resolver passed as options for scale: ${id}`);
    }
    const axis = determineAxis(id, scaleConf, retrieveAxisFromDatasets(id, config), defaults.scales[scaleConf.type]);
    const defaultId = getDefaultScaleIDFromAxis(axis, chartIndexAxis);
    const defaultScaleOptions = chartDefaults.scales || {};
    scales[id] = mergeIf(/* @__PURE__ */ Object.create(null), [
      {
        axis
      },
      scaleConf,
      defaultScaleOptions[axis],
      defaultScaleOptions[defaultId]
    ]);
  });
  config.data.datasets.forEach((dataset) => {
    const type = dataset.type || config.type;
    const indexAxis = dataset.indexAxis || getIndexAxis(type, options);
    const datasetDefaults = overrides[type] || {};
    const defaultScaleOptions = datasetDefaults.scales || {};
    Object.keys(defaultScaleOptions).forEach((defaultID) => {
      const axis = getAxisFromDefaultScaleID(defaultID, indexAxis);
      const id = dataset[axis + "AxisID"] || axis;
      scales[id] = scales[id] || /* @__PURE__ */ Object.create(null);
      mergeIf(scales[id], [
        {
          axis
        },
        configScales[id],
        defaultScaleOptions[defaultID]
      ]);
    });
  });
  Object.keys(scales).forEach((key) => {
    const scale = scales[key];
    mergeIf(scale, [
      defaults.scales[scale.type],
      defaults.scale
    ]);
  });
  return scales;
}
function initOptions(config) {
  const options = config.options || (config.options = {});
  options.plugins = valueOrDefault(options.plugins, {});
  options.scales = mergeScaleConfig(config, options);
}
function initData(data) {
  data = data || {};
  data.datasets = data.datasets || [];
  data.labels = data.labels || [];
  return data;
}
function initConfig(config) {
  config = config || {};
  config.data = initData(config.data);
  initOptions(config);
  return config;
}
var keyCache = /* @__PURE__ */ new Map();
var keysCached = /* @__PURE__ */ new Set();
function cachedKeys(cacheKey, generate) {
  let keys = keyCache.get(cacheKey);
  if (!keys) {
    keys = generate();
    keyCache.set(cacheKey, keys);
    keysCached.add(keys);
  }
  return keys;
}
var addIfFound = (set2, obj, key) => {
  const opts = resolveObjectKey(obj, key);
  if (opts !== void 0) {
    set2.add(opts);
  }
};
var Config = class {
  constructor(config) {
    this._config = initConfig(config);
    this._scopeCache = /* @__PURE__ */ new Map();
    this._resolverCache = /* @__PURE__ */ new Map();
  }
  get platform() {
    return this._config.platform;
  }
  get type() {
    return this._config.type;
  }
  set type(type) {
    this._config.type = type;
  }
  get data() {
    return this._config.data;
  }
  set data(data) {
    this._config.data = initData(data);
  }
  get options() {
    return this._config.options;
  }
  set options(options) {
    this._config.options = options;
  }
  get plugins() {
    return this._config.plugins;
  }
  update() {
    const config = this._config;
    this.clearCache();
    initOptions(config);
  }
  clearCache() {
    this._scopeCache.clear();
    this._resolverCache.clear();
  }
  datasetScopeKeys(datasetType) {
    return cachedKeys(datasetType, () => [
      [
        `datasets.${datasetType}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(datasetType, transition) {
    return cachedKeys(`${datasetType}.transition.${transition}`, () => [
      [
        `datasets.${datasetType}.transitions.${transition}`,
        `transitions.${transition}`
      ],
      [
        `datasets.${datasetType}`,
        ""
      ]
    ]);
  }
  datasetElementScopeKeys(datasetType, elementType) {
    return cachedKeys(`${datasetType}-${elementType}`, () => [
      [
        `datasets.${datasetType}.elements.${elementType}`,
        `datasets.${datasetType}`,
        `elements.${elementType}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(plugin) {
    const id = plugin.id;
    const type = this.type;
    return cachedKeys(`${type}-plugin-${id}`, () => [
      [
        `plugins.${id}`,
        ...plugin.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(mainScope, resetCache) {
    const _scopeCache = this._scopeCache;
    let cache = _scopeCache.get(mainScope);
    if (!cache || resetCache) {
      cache = /* @__PURE__ */ new Map();
      _scopeCache.set(mainScope, cache);
    }
    return cache;
  }
  getOptionScopes(mainScope, keyLists, resetCache) {
    const { options, type } = this;
    const cache = this._cachedScopes(mainScope, resetCache);
    const cached = cache.get(keyLists);
    if (cached) {
      return cached;
    }
    const scopes = /* @__PURE__ */ new Set();
    keyLists.forEach((keys) => {
      if (mainScope) {
        scopes.add(mainScope);
        keys.forEach((key) => addIfFound(scopes, mainScope, key));
      }
      keys.forEach((key) => addIfFound(scopes, options, key));
      keys.forEach((key) => addIfFound(scopes, overrides[type] || {}, key));
      keys.forEach((key) => addIfFound(scopes, defaults, key));
      keys.forEach((key) => addIfFound(scopes, descriptors, key));
    });
    const array = Array.from(scopes);
    if (array.length === 0) {
      array.push(/* @__PURE__ */ Object.create(null));
    }
    if (keysCached.has(keyLists)) {
      cache.set(keyLists, array);
    }
    return array;
  }
  chartOptionScopes() {
    const { options, type } = this;
    return [
      options,
      overrides[type] || {},
      defaults.datasets[type] || {},
      {
        type
      },
      defaults,
      descriptors
    ];
  }
  resolveNamedOptions(scopes, names2, context, prefixes = [
    ""
  ]) {
    const result = {
      $shared: true
    };
    const { resolver, subPrefixes } = getResolver(this._resolverCache, scopes, prefixes);
    let options = resolver;
    if (needContext(resolver, names2)) {
      result.$shared = false;
      context = isFunction(context) ? context() : context;
      const subResolver = this.createResolver(scopes, context, subPrefixes);
      options = _attachContext(resolver, context, subResolver);
    }
    for (const prop of names2) {
      result[prop] = options[prop];
    }
    return result;
  }
  createResolver(scopes, context, prefixes = [
    ""
  ], descriptorDefaults) {
    const { resolver } = getResolver(this._resolverCache, scopes, prefixes);
    return isObject(context) ? _attachContext(resolver, context, void 0, descriptorDefaults) : resolver;
  }
};
function getResolver(resolverCache, scopes, prefixes) {
  let cache = resolverCache.get(scopes);
  if (!cache) {
    cache = /* @__PURE__ */ new Map();
    resolverCache.set(scopes, cache);
  }
  const cacheKey = prefixes.join();
  let cached = cache.get(cacheKey);
  if (!cached) {
    const resolver = _createResolver(scopes, prefixes);
    cached = {
      resolver,
      subPrefixes: prefixes.filter((p) => !p.toLowerCase().includes("hover"))
    };
    cache.set(cacheKey, cached);
  }
  return cached;
}
var hasFunction = (value) => isObject(value) && Object.getOwnPropertyNames(value).some((key) => isFunction(value[key]));
function needContext(proxy, names2) {
  const { isScriptable, isIndexable } = _descriptors(proxy);
  for (const prop of names2) {
    const scriptable = isScriptable(prop);
    const indexable = isIndexable(prop);
    const value = (indexable || scriptable) && proxy[prop];
    if (scriptable && (isFunction(value) || hasFunction(value)) || indexable && isArray(value)) {
      return true;
    }
  }
  return false;
}
var version = "4.4.1";
var KNOWN_POSITIONS = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function positionIsHorizontal(position, axis) {
  return position === "top" || position === "bottom" || KNOWN_POSITIONS.indexOf(position) === -1 && axis === "x";
}
function compare2Level(l1, l2) {
  return function(a, b) {
    return a[l1] === b[l1] ? a[l2] - b[l2] : a[l1] - b[l1];
  };
}
function onAnimationsComplete(context) {
  const chart = context.chart;
  const animationOptions = chart.options.animation;
  chart.notifyPlugins("afterRender");
  callback(animationOptions && animationOptions.onComplete, [
    context
  ], chart);
}
function onAnimationProgress(context) {
  const chart = context.chart;
  const animationOptions = chart.options.animation;
  callback(animationOptions && animationOptions.onProgress, [
    context
  ], chart);
}
function getCanvas(item) {
  if (_isDomSupported() && typeof item === "string") {
    item = document.getElementById(item);
  } else if (item && item.length) {
    item = item[0];
  }
  if (item && item.canvas) {
    item = item.canvas;
  }
  return item;
}
var instances = {};
var getChart = (key) => {
  const canvas = getCanvas(key);
  return Object.values(instances).filter((c) => c.canvas === canvas).pop();
};
function moveNumericKeys(obj, start, move) {
  const keys = Object.keys(obj);
  for (const key of keys) {
    const intKey = +key;
    if (intKey >= start) {
      const value = obj[key];
      delete obj[key];
      if (move > 0 || intKey > start) {
        obj[intKey + move] = value;
      }
    }
  }
}
function determineLastEvent(e, lastEvent, inChartArea, isClick) {
  if (!inChartArea || e.type === "mouseout") {
    return null;
  }
  if (isClick) {
    return lastEvent;
  }
  return e;
}
function getSizeForArea(scale, chartArea, field) {
  return scale.options.clip ? scale[field] : chartArea[field];
}
function getDatasetArea(meta, chartArea) {
  const { xScale, yScale } = meta;
  if (xScale && yScale) {
    return {
      left: getSizeForArea(xScale, chartArea, "left"),
      right: getSizeForArea(xScale, chartArea, "right"),
      top: getSizeForArea(yScale, chartArea, "top"),
      bottom: getSizeForArea(yScale, chartArea, "bottom")
    };
  }
  return chartArea;
}
var Chart = class {
  static register(...items) {
    registry.add(...items);
    invalidatePlugins();
  }
  static unregister(...items) {
    registry.remove(...items);
    invalidatePlugins();
  }
  constructor(item, userConfig) {
    const config = this.config = new Config(userConfig);
    const initialCanvas = getCanvas(item);
    const existingChart = getChart(initialCanvas);
    if (existingChart) {
      throw new Error("Canvas is already in use. Chart with ID '" + existingChart.id + "' must be destroyed before the canvas with ID '" + existingChart.canvas.id + "' can be reused.");
    }
    const options = config.createResolver(config.chartOptionScopes(), this.getContext());
    this.platform = new (config.platform || _detectPlatform(initialCanvas))();
    this.platform.updateConfig(config);
    const context = this.platform.acquireContext(initialCanvas, options.aspectRatio);
    const canvas = context && context.canvas;
    const height = canvas && canvas.height;
    const width = canvas && canvas.width;
    this.id = uid();
    this.ctx = context;
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this._options = options;
    this._aspectRatio = this.aspectRatio;
    this._layers = [];
    this._metasets = [];
    this._stacks = void 0;
    this.boxes = [];
    this.currentDevicePixelRatio = void 0;
    this.chartArea = void 0;
    this._active = [];
    this._lastEvent = void 0;
    this._listeners = {};
    this._responsiveListeners = void 0;
    this._sortedMetasets = [];
    this.scales = {};
    this._plugins = new PluginService();
    this.$proxies = {};
    this._hiddenIndices = {};
    this.attached = false;
    this._animationsDisabled = void 0;
    this.$context = void 0;
    this._doResize = debounce((mode) => this.update(mode), options.resizeDelay || 0);
    this._dataChanges = [];
    instances[this.id] = this;
    if (!context || !canvas) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    animator.listen(this, "complete", onAnimationsComplete);
    animator.listen(this, "progress", onAnimationProgress);
    this._initialize();
    if (this.attached) {
      this.update();
    }
  }
  get aspectRatio() {
    const { options: { aspectRatio, maintainAspectRatio }, width, height, _aspectRatio } = this;
    if (!isNullOrUndef(aspectRatio)) {
      return aspectRatio;
    }
    if (maintainAspectRatio && _aspectRatio) {
      return _aspectRatio;
    }
    return height ? width / height : null;
  }
  get data() {
    return this.config.data;
  }
  set data(data) {
    this.config.data = data;
  }
  get options() {
    return this._options;
  }
  set options(options) {
    this.config.options = options;
  }
  get registry() {
    return registry;
  }
  _initialize() {
    this.notifyPlugins("beforeInit");
    if (this.options.responsive) {
      this.resize();
    } else {
      retinaScale(this, this.options.devicePixelRatio);
    }
    this.bindEvents();
    this.notifyPlugins("afterInit");
    return this;
  }
  clear() {
    clearCanvas(this.canvas, this.ctx);
    return this;
  }
  stop() {
    animator.stop(this);
    return this;
  }
  resize(width, height) {
    if (!animator.running(this)) {
      this._resize(width, height);
    } else {
      this._resizeBeforeDraw = {
        width,
        height
      };
    }
  }
  _resize(width, height) {
    const options = this.options;
    const canvas = this.canvas;
    const aspectRatio = options.maintainAspectRatio && this.aspectRatio;
    const newSize = this.platform.getMaximumSize(canvas, width, height, aspectRatio);
    const newRatio = options.devicePixelRatio || this.platform.getDevicePixelRatio();
    const mode = this.width ? "resize" : "attach";
    this.width = newSize.width;
    this.height = newSize.height;
    this._aspectRatio = this.aspectRatio;
    if (!retinaScale(this, newRatio, true)) {
      return;
    }
    this.notifyPlugins("resize", {
      size: newSize
    });
    callback(options.onResize, [
      this,
      newSize
    ], this);
    if (this.attached) {
      if (this._doResize(mode)) {
        this.render();
      }
    }
  }
  ensureScalesHaveIDs() {
    const options = this.options;
    const scalesOptions = options.scales || {};
    each(scalesOptions, (axisOptions, axisID) => {
      axisOptions.id = axisID;
    });
  }
  buildOrUpdateScales() {
    const options = this.options;
    const scaleOpts = options.scales;
    const scales = this.scales;
    const updated = Object.keys(scales).reduce((obj, id) => {
      obj[id] = false;
      return obj;
    }, {});
    let items = [];
    if (scaleOpts) {
      items = items.concat(Object.keys(scaleOpts).map((id) => {
        const scaleOptions = scaleOpts[id];
        const axis = determineAxis(id, scaleOptions);
        const isRadial = axis === "r";
        const isHorizontal = axis === "x";
        return {
          options: scaleOptions,
          dposition: isRadial ? "chartArea" : isHorizontal ? "bottom" : "left",
          dtype: isRadial ? "radialLinear" : isHorizontal ? "category" : "linear"
        };
      }));
    }
    each(items, (item) => {
      const scaleOptions = item.options;
      const id = scaleOptions.id;
      const axis = determineAxis(id, scaleOptions);
      const scaleType = valueOrDefault(scaleOptions.type, item.dtype);
      if (scaleOptions.position === void 0 || positionIsHorizontal(scaleOptions.position, axis) !== positionIsHorizontal(item.dposition)) {
        scaleOptions.position = item.dposition;
      }
      updated[id] = true;
      let scale = null;
      if (id in scales && scales[id].type === scaleType) {
        scale = scales[id];
      } else {
        const scaleClass = registry.getScale(scaleType);
        scale = new scaleClass({
          id,
          type: scaleType,
          ctx: this.ctx,
          chart: this
        });
        scales[scale.id] = scale;
      }
      scale.init(scaleOptions, options);
    });
    each(updated, (hasUpdated, id) => {
      if (!hasUpdated) {
        delete scales[id];
      }
    });
    each(scales, (scale) => {
      layouts.configure(this, scale, scale.options);
      layouts.addBox(this, scale);
    });
  }
  _updateMetasets() {
    const metasets = this._metasets;
    const numData = this.data.datasets.length;
    const numMeta = metasets.length;
    metasets.sort((a, b) => a.index - b.index);
    if (numMeta > numData) {
      for (let i = numData; i < numMeta; ++i) {
        this._destroyDatasetMeta(i);
      }
      metasets.splice(numData, numMeta - numData);
    }
    this._sortedMetasets = metasets.slice(0).sort(compare2Level("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: metasets, data: { datasets } } = this;
    if (metasets.length > datasets.length) {
      delete this._stacks;
    }
    metasets.forEach((meta, index) => {
      if (datasets.filter((x) => x === meta._dataset).length === 0) {
        this._destroyDatasetMeta(index);
      }
    });
  }
  buildOrUpdateControllers() {
    const newControllers = [];
    const datasets = this.data.datasets;
    let i, ilen;
    this._removeUnreferencedMetasets();
    for (i = 0, ilen = datasets.length; i < ilen; i++) {
      const dataset = datasets[i];
      let meta = this.getDatasetMeta(i);
      const type = dataset.type || this.config.type;
      if (meta.type && meta.type !== type) {
        this._destroyDatasetMeta(i);
        meta = this.getDatasetMeta(i);
      }
      meta.type = type;
      meta.indexAxis = dataset.indexAxis || getIndexAxis(type, this.options);
      meta.order = dataset.order || 0;
      meta.index = i;
      meta.label = "" + dataset.label;
      meta.visible = this.isDatasetVisible(i);
      if (meta.controller) {
        meta.controller.updateIndex(i);
        meta.controller.linkScales();
      } else {
        const ControllerClass = registry.getController(type);
        const { datasetElementType, dataElementType } = defaults.datasets[type];
        Object.assign(ControllerClass, {
          dataElementType: registry.getElement(dataElementType),
          datasetElementType: datasetElementType && registry.getElement(datasetElementType)
        });
        meta.controller = new ControllerClass(this, i);
        newControllers.push(meta.controller);
      }
    }
    this._updateMetasets();
    return newControllers;
  }
  _resetElements() {
    each(this.data.datasets, (dataset, datasetIndex) => {
      this.getDatasetMeta(datasetIndex).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements();
    this.notifyPlugins("reset");
  }
  update(mode) {
    const config = this.config;
    config.update();
    const options = this._options = config.createResolver(config.chartOptionScopes(), this.getContext());
    const animsDisabled = this._animationsDisabled = !options.animation;
    this._updateScales();
    this._checkEventBindings();
    this._updateHiddenIndices();
    this._plugins.invalidate();
    if (this.notifyPlugins("beforeUpdate", {
      mode,
      cancelable: true
    }) === false) {
      return;
    }
    const newControllers = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let minPadding = 0;
    for (let i = 0, ilen = this.data.datasets.length; i < ilen; i++) {
      const { controller } = this.getDatasetMeta(i);
      const reset2 = !animsDisabled && newControllers.indexOf(controller) === -1;
      controller.buildOrUpdateElements(reset2);
      minPadding = Math.max(+controller.getMaxOverflow(), minPadding);
    }
    minPadding = this._minPadding = options.layout.autoPadding ? minPadding : 0;
    this._updateLayout(minPadding);
    if (!animsDisabled) {
      each(newControllers, (controller) => {
        controller.reset();
      });
    }
    this._updateDatasets(mode);
    this.notifyPlugins("afterUpdate", {
      mode
    });
    this._layers.sort(compare2Level("z", "_idx"));
    const { _active, _lastEvent } = this;
    if (_lastEvent) {
      this._eventHandler(_lastEvent, true);
    } else if (_active.length) {
      this._updateHoverStyles(_active, _active, true);
    }
    this.render();
  }
  _updateScales() {
    each(this.scales, (scale) => {
      layouts.removeBox(this, scale);
    });
    this.ensureScalesHaveIDs();
    this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const options = this.options;
    const existingEvents = new Set(Object.keys(this._listeners));
    const newEvents = new Set(options.events);
    if (!setsEqual(existingEvents, newEvents) || !!this._responsiveListeners !== options.responsive) {
      this.unbindEvents();
      this.bindEvents();
    }
  }
  _updateHiddenIndices() {
    const { _hiddenIndices } = this;
    const changes = this._getUniformDataChanges() || [];
    for (const { method, start, count } of changes) {
      const move = method === "_removeElements" ? -count : count;
      moveNumericKeys(_hiddenIndices, start, move);
    }
  }
  _getUniformDataChanges() {
    const _dataChanges = this._dataChanges;
    if (!_dataChanges || !_dataChanges.length) {
      return;
    }
    this._dataChanges = [];
    const datasetCount = this.data.datasets.length;
    const makeSet = (idx) => new Set(_dataChanges.filter((c) => c[0] === idx).map((c, i) => i + "," + c.splice(1).join(",")));
    const changeSet = makeSet(0);
    for (let i = 1; i < datasetCount; i++) {
      if (!setsEqual(changeSet, makeSet(i))) {
        return;
      }
    }
    return Array.from(changeSet).map((c) => c.split(",")).map((a) => ({
      method: a[1],
      start: +a[2],
      count: +a[3]
    }));
  }
  _updateLayout(minPadding) {
    if (this.notifyPlugins("beforeLayout", {
      cancelable: true
    }) === false) {
      return;
    }
    layouts.update(this, this.width, this.height, minPadding);
    const area = this.chartArea;
    const noArea = area.width <= 0 || area.height <= 0;
    this._layers = [];
    each(this.boxes, (box) => {
      if (noArea && box.position === "chartArea") {
        return;
      }
      if (box.configure) {
        box.configure();
      }
      this._layers.push(...box._layers());
    }, this);
    this._layers.forEach((item, index) => {
      item._idx = index;
    });
    this.notifyPlugins("afterLayout");
  }
  _updateDatasets(mode) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode,
      cancelable: true
    }) === false) {
      return;
    }
    for (let i = 0, ilen = this.data.datasets.length; i < ilen; ++i) {
      this.getDatasetMeta(i).controller.configure();
    }
    for (let i = 0, ilen = this.data.datasets.length; i < ilen; ++i) {
      this._updateDataset(i, isFunction(mode) ? mode({
        datasetIndex: i
      }) : mode);
    }
    this.notifyPlugins("afterDatasetsUpdate", {
      mode
    });
  }
  _updateDataset(index, mode) {
    const meta = this.getDatasetMeta(index);
    const args = {
      meta,
      index,
      mode,
      cancelable: true
    };
    if (this.notifyPlugins("beforeDatasetUpdate", args) === false) {
      return;
    }
    meta.controller._update(mode);
    args.cancelable = false;
    this.notifyPlugins("afterDatasetUpdate", args);
  }
  render() {
    if (this.notifyPlugins("beforeRender", {
      cancelable: true
    }) === false) {
      return;
    }
    if (animator.has(this)) {
      if (this.attached && !animator.running(this)) {
        animator.start(this);
      }
    } else {
      this.draw();
      onAnimationsComplete({
        chart: this
      });
    }
  }
  draw() {
    let i;
    if (this._resizeBeforeDraw) {
      const { width, height } = this._resizeBeforeDraw;
      this._resize(width, height);
      this._resizeBeforeDraw = null;
    }
    this.clear();
    if (this.width <= 0 || this.height <= 0) {
      return;
    }
    if (this.notifyPlugins("beforeDraw", {
      cancelable: true
    }) === false) {
      return;
    }
    const layers = this._layers;
    for (i = 0; i < layers.length && layers[i].z <= 0; ++i) {
      layers[i].draw(this.chartArea);
    }
    this._drawDatasets();
    for (; i < layers.length; ++i) {
      layers[i].draw(this.chartArea);
    }
    this.notifyPlugins("afterDraw");
  }
  _getSortedDatasetMetas(filterVisible) {
    const metasets = this._sortedMetasets;
    const result = [];
    let i, ilen;
    for (i = 0, ilen = metasets.length; i < ilen; ++i) {
      const meta = metasets[i];
      if (!filterVisible || meta.visible) {
        result.push(meta);
      }
    }
    return result;
  }
  getSortedVisibleDatasetMetas() {
    return this._getSortedDatasetMetas(true);
  }
  _drawDatasets() {
    if (this.notifyPlugins("beforeDatasetsDraw", {
      cancelable: true
    }) === false) {
      return;
    }
    const metasets = this.getSortedVisibleDatasetMetas();
    for (let i = metasets.length - 1; i >= 0; --i) {
      this._drawDataset(metasets[i]);
    }
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(meta) {
    const ctx = this.ctx;
    const clip = meta._clip;
    const useClip = !clip.disabled;
    const area = getDatasetArea(meta, this.chartArea);
    const args = {
      meta,
      index: meta.index,
      cancelable: true
    };
    if (this.notifyPlugins("beforeDatasetDraw", args) === false) {
      return;
    }
    if (useClip) {
      clipArea(ctx, {
        left: clip.left === false ? 0 : area.left - clip.left,
        right: clip.right === false ? this.width : area.right + clip.right,
        top: clip.top === false ? 0 : area.top - clip.top,
        bottom: clip.bottom === false ? this.height : area.bottom + clip.bottom
      });
    }
    meta.controller.draw();
    if (useClip) {
      unclipArea(ctx);
    }
    args.cancelable = false;
    this.notifyPlugins("afterDatasetDraw", args);
  }
  isPointInArea(point) {
    return _isPointInArea(point, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(e, mode, options, useFinalPosition) {
    const method = Interaction.modes[mode];
    if (typeof method === "function") {
      return method(this, e, options, useFinalPosition);
    }
    return [];
  }
  getDatasetMeta(datasetIndex) {
    const dataset = this.data.datasets[datasetIndex];
    const metasets = this._metasets;
    let meta = metasets.filter((x) => x && x._dataset === dataset).pop();
    if (!meta) {
      meta = {
        type: null,
        data: [],
        dataset: null,
        controller: null,
        hidden: null,
        xAxisID: null,
        yAxisID: null,
        order: dataset && dataset.order || 0,
        index: datasetIndex,
        _dataset: dataset,
        _parsed: [],
        _sorted: false
      };
      metasets.push(meta);
    }
    return meta;
  }
  getContext() {
    return this.$context || (this.$context = createContext(null, {
      chart: this,
      type: "chart"
    }));
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(datasetIndex) {
    const dataset = this.data.datasets[datasetIndex];
    if (!dataset) {
      return false;
    }
    const meta = this.getDatasetMeta(datasetIndex);
    return typeof meta.hidden === "boolean" ? !meta.hidden : !dataset.hidden;
  }
  setDatasetVisibility(datasetIndex, visible) {
    const meta = this.getDatasetMeta(datasetIndex);
    meta.hidden = !visible;
  }
  toggleDataVisibility(index) {
    this._hiddenIndices[index] = !this._hiddenIndices[index];
  }
  getDataVisibility(index) {
    return !this._hiddenIndices[index];
  }
  _updateVisibility(datasetIndex, dataIndex, visible) {
    const mode = visible ? "show" : "hide";
    const meta = this.getDatasetMeta(datasetIndex);
    const anims = meta.controller._resolveAnimations(void 0, mode);
    if (defined(dataIndex)) {
      meta.data[dataIndex].hidden = !visible;
      this.update();
    } else {
      this.setDatasetVisibility(datasetIndex, visible);
      anims.update(meta, {
        visible
      });
      this.update((ctx) => ctx.datasetIndex === datasetIndex ? mode : void 0);
    }
  }
  hide(datasetIndex, dataIndex) {
    this._updateVisibility(datasetIndex, dataIndex, false);
  }
  show(datasetIndex, dataIndex) {
    this._updateVisibility(datasetIndex, dataIndex, true);
  }
  _destroyDatasetMeta(datasetIndex) {
    const meta = this._metasets[datasetIndex];
    if (meta && meta.controller) {
      meta.controller._destroy();
    }
    delete this._metasets[datasetIndex];
  }
  _stop() {
    let i, ilen;
    this.stop();
    animator.remove(this);
    for (i = 0, ilen = this.data.datasets.length; i < ilen; ++i) {
      this._destroyDatasetMeta(i);
    }
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas, ctx } = this;
    this._stop();
    this.config.clearCache();
    if (canvas) {
      this.unbindEvents();
      clearCanvas(canvas, ctx);
      this.platform.releaseContext(ctx);
      this.canvas = null;
      this.ctx = null;
    }
    delete instances[this.id];
    this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...args) {
    return this.canvas.toDataURL(...args);
  }
  bindEvents() {
    this.bindUserEvents();
    if (this.options.responsive) {
      this.bindResponsiveEvents();
    } else {
      this.attached = true;
    }
  }
  bindUserEvents() {
    const listeners = this._listeners;
    const platform = this.platform;
    const _add = (type, listener2) => {
      platform.addEventListener(this, type, listener2);
      listeners[type] = listener2;
    };
    const listener = (e, x, y) => {
      e.offsetX = x;
      e.offsetY = y;
      this._eventHandler(e);
    };
    each(this.options.events, (type) => _add(type, listener));
  }
  bindResponsiveEvents() {
    if (!this._responsiveListeners) {
      this._responsiveListeners = {};
    }
    const listeners = this._responsiveListeners;
    const platform = this.platform;
    const _add = (type, listener2) => {
      platform.addEventListener(this, type, listener2);
      listeners[type] = listener2;
    };
    const _remove = (type, listener2) => {
      if (listeners[type]) {
        platform.removeEventListener(this, type, listener2);
        delete listeners[type];
      }
    };
    const listener = (width, height) => {
      if (this.canvas) {
        this.resize(width, height);
      }
    };
    let detached;
    const attached = () => {
      _remove("attach", attached);
      this.attached = true;
      this.resize();
      _add("resize", listener);
      _add("detach", detached);
    };
    detached = () => {
      this.attached = false;
      _remove("resize", listener);
      this._stop();
      this._resize(0, 0);
      _add("attach", attached);
    };
    if (platform.isAttached(this.canvas)) {
      attached();
    } else {
      detached();
    }
  }
  unbindEvents() {
    each(this._listeners, (listener, type) => {
      this.platform.removeEventListener(this, type, listener);
    });
    this._listeners = {};
    each(this._responsiveListeners, (listener, type) => {
      this.platform.removeEventListener(this, type, listener);
    });
    this._responsiveListeners = void 0;
  }
  updateHoverStyle(items, mode, enabled) {
    const prefix = enabled ? "set" : "remove";
    let meta, item, i, ilen;
    if (mode === "dataset") {
      meta = this.getDatasetMeta(items[0].datasetIndex);
      meta.controller["_" + prefix + "DatasetHoverStyle"]();
    }
    for (i = 0, ilen = items.length; i < ilen; ++i) {
      item = items[i];
      const controller = item && this.getDatasetMeta(item.datasetIndex).controller;
      if (controller) {
        controller[prefix + "HoverStyle"](item.element, item.datasetIndex, item.index);
      }
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(activeElements) {
    const lastActive = this._active || [];
    const active = activeElements.map(({ datasetIndex, index }) => {
      const meta = this.getDatasetMeta(datasetIndex);
      if (!meta) {
        throw new Error("No dataset found at index " + datasetIndex);
      }
      return {
        datasetIndex,
        element: meta.data[index],
        index
      };
    });
    const changed = !_elementsEqual(active, lastActive);
    if (changed) {
      this._active = active;
      this._lastEvent = null;
      this._updateHoverStyles(active, lastActive);
    }
  }
  notifyPlugins(hook, args, filter) {
    return this._plugins.notify(this, hook, args, filter);
  }
  isPluginEnabled(pluginId) {
    return this._plugins._cache.filter((p) => p.plugin.id === pluginId).length === 1;
  }
  _updateHoverStyles(active, lastActive, replay) {
    const hoverOptions = this.options.hover;
    const diff = (a, b) => a.filter((x) => !b.some((y) => x.datasetIndex === y.datasetIndex && x.index === y.index));
    const deactivated = diff(lastActive, active);
    const activated = replay ? active : diff(active, lastActive);
    if (deactivated.length) {
      this.updateHoverStyle(deactivated, hoverOptions.mode, false);
    }
    if (activated.length && hoverOptions.mode) {
      this.updateHoverStyle(activated, hoverOptions.mode, true);
    }
  }
  _eventHandler(e, replay) {
    const args = {
      event: e,
      replay,
      cancelable: true,
      inChartArea: this.isPointInArea(e)
    };
    const eventFilter = (plugin) => (plugin.options.events || this.options.events).includes(e.native.type);
    if (this.notifyPlugins("beforeEvent", args, eventFilter) === false) {
      return;
    }
    const changed = this._handleEvent(e, replay, args.inChartArea);
    args.cancelable = false;
    this.notifyPlugins("afterEvent", args, eventFilter);
    if (changed || args.changed) {
      this.render();
    }
    return this;
  }
  _handleEvent(e, replay, inChartArea) {
    const { _active: lastActive = [], options } = this;
    const useFinalPosition = replay;
    const active = this._getActiveElements(e, lastActive, inChartArea, useFinalPosition);
    const isClick = _isClickEvent(e);
    const lastEvent = determineLastEvent(e, this._lastEvent, inChartArea, isClick);
    if (inChartArea) {
      this._lastEvent = null;
      callback(options.onHover, [
        e,
        active,
        this
      ], this);
      if (isClick) {
        callback(options.onClick, [
          e,
          active,
          this
        ], this);
      }
    }
    const changed = !_elementsEqual(active, lastActive);
    if (changed || replay) {
      this._active = active;
      this._updateHoverStyles(active, lastActive, replay);
    }
    this._lastEvent = lastEvent;
    return changed;
  }
  _getActiveElements(e, lastActive, inChartArea, useFinalPosition) {
    if (e.type === "mouseout") {
      return [];
    }
    if (!inChartArea) {
      return lastActive;
    }
    const hoverOptions = this.options.hover;
    return this.getElementsAtEventForMode(e, hoverOptions.mode, hoverOptions, useFinalPosition);
  }
};
__publicField(Chart, "defaults", defaults);
__publicField(Chart, "instances", instances);
__publicField(Chart, "overrides", overrides);
__publicField(Chart, "registry", registry);
__publicField(Chart, "version", version);
__publicField(Chart, "getChart", getChart);
function invalidatePlugins() {
  return each(Chart.instances, (chart) => chart._plugins.invalidate());
}
function clipArc(ctx, element, endAngle) {
  const { startAngle, pixelMargin, x, y, outerRadius, innerRadius } = element;
  let angleMargin = pixelMargin / outerRadius;
  ctx.beginPath();
  ctx.arc(x, y, outerRadius, startAngle - angleMargin, endAngle + angleMargin);
  if (innerRadius > pixelMargin) {
    angleMargin = pixelMargin / innerRadius;
    ctx.arc(x, y, innerRadius, endAngle + angleMargin, startAngle - angleMargin, true);
  } else {
    ctx.arc(x, y, pixelMargin, endAngle + HALF_PI, startAngle - HALF_PI);
  }
  ctx.closePath();
  ctx.clip();
}
function toRadiusCorners(value) {
  return _readValueToProps(value, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function parseBorderRadius$1(arc, innerRadius, outerRadius, angleDelta) {
  const o = toRadiusCorners(arc.options.borderRadius);
  const halfThickness = (outerRadius - innerRadius) / 2;
  const innerLimit = Math.min(halfThickness, angleDelta * innerRadius / 2);
  const computeOuterLimit = (val) => {
    const outerArcLimit = (outerRadius - Math.min(halfThickness, val)) * angleDelta / 2;
    return _limitValue(val, 0, Math.min(halfThickness, outerArcLimit));
  };
  return {
    outerStart: computeOuterLimit(o.outerStart),
    outerEnd: computeOuterLimit(o.outerEnd),
    innerStart: _limitValue(o.innerStart, 0, innerLimit),
    innerEnd: _limitValue(o.innerEnd, 0, innerLimit)
  };
}
function rThetaToXY(r, theta, x, y) {
  return {
    x: x + r * Math.cos(theta),
    y: y + r * Math.sin(theta)
  };
}
function pathArc(ctx, element, offset, spacing, end, circular) {
  const { x, y, startAngle: start, pixelMargin, innerRadius: innerR } = element;
  const outerRadius = Math.max(element.outerRadius + spacing + offset - pixelMargin, 0);
  const innerRadius = innerR > 0 ? innerR + spacing + offset + pixelMargin : 0;
  let spacingOffset = 0;
  const alpha2 = end - start;
  if (spacing) {
    const noSpacingInnerRadius = innerR > 0 ? innerR - spacing : 0;
    const noSpacingOuterRadius = outerRadius > 0 ? outerRadius - spacing : 0;
    const avNogSpacingRadius = (noSpacingInnerRadius + noSpacingOuterRadius) / 2;
    const adjustedAngle = avNogSpacingRadius !== 0 ? alpha2 * avNogSpacingRadius / (avNogSpacingRadius + spacing) : alpha2;
    spacingOffset = (alpha2 - adjustedAngle) / 2;
  }
  const beta = Math.max(1e-3, alpha2 * outerRadius - offset / PI) / outerRadius;
  const angleOffset = (alpha2 - beta) / 2;
  const startAngle = start + angleOffset + spacingOffset;
  const endAngle = end - angleOffset - spacingOffset;
  const { outerStart, outerEnd, innerStart, innerEnd } = parseBorderRadius$1(element, innerRadius, outerRadius, endAngle - startAngle);
  const outerStartAdjustedRadius = outerRadius - outerStart;
  const outerEndAdjustedRadius = outerRadius - outerEnd;
  const outerStartAdjustedAngle = startAngle + outerStart / outerStartAdjustedRadius;
  const outerEndAdjustedAngle = endAngle - outerEnd / outerEndAdjustedRadius;
  const innerStartAdjustedRadius = innerRadius + innerStart;
  const innerEndAdjustedRadius = innerRadius + innerEnd;
  const innerStartAdjustedAngle = startAngle + innerStart / innerStartAdjustedRadius;
  const innerEndAdjustedAngle = endAngle - innerEnd / innerEndAdjustedRadius;
  ctx.beginPath();
  if (circular) {
    const outerMidAdjustedAngle = (outerStartAdjustedAngle + outerEndAdjustedAngle) / 2;
    ctx.arc(x, y, outerRadius, outerStartAdjustedAngle, outerMidAdjustedAngle);
    ctx.arc(x, y, outerRadius, outerMidAdjustedAngle, outerEndAdjustedAngle);
    if (outerEnd > 0) {
      const pCenter = rThetaToXY(outerEndAdjustedRadius, outerEndAdjustedAngle, x, y);
      ctx.arc(pCenter.x, pCenter.y, outerEnd, outerEndAdjustedAngle, endAngle + HALF_PI);
    }
    const p4 = rThetaToXY(innerEndAdjustedRadius, endAngle, x, y);
    ctx.lineTo(p4.x, p4.y);
    if (innerEnd > 0) {
      const pCenter = rThetaToXY(innerEndAdjustedRadius, innerEndAdjustedAngle, x, y);
      ctx.arc(pCenter.x, pCenter.y, innerEnd, endAngle + HALF_PI, innerEndAdjustedAngle + Math.PI);
    }
    const innerMidAdjustedAngle = (endAngle - innerEnd / innerRadius + (startAngle + innerStart / innerRadius)) / 2;
    ctx.arc(x, y, innerRadius, endAngle - innerEnd / innerRadius, innerMidAdjustedAngle, true);
    ctx.arc(x, y, innerRadius, innerMidAdjustedAngle, startAngle + innerStart / innerRadius, true);
    if (innerStart > 0) {
      const pCenter = rThetaToXY(innerStartAdjustedRadius, innerStartAdjustedAngle, x, y);
      ctx.arc(pCenter.x, pCenter.y, innerStart, innerStartAdjustedAngle + Math.PI, startAngle - HALF_PI);
    }
    const p8 = rThetaToXY(outerStartAdjustedRadius, startAngle, x, y);
    ctx.lineTo(p8.x, p8.y);
    if (outerStart > 0) {
      const pCenter = rThetaToXY(outerStartAdjustedRadius, outerStartAdjustedAngle, x, y);
      ctx.arc(pCenter.x, pCenter.y, outerStart, startAngle - HALF_PI, outerStartAdjustedAngle);
    }
  } else {
    ctx.moveTo(x, y);
    const outerStartX = Math.cos(outerStartAdjustedAngle) * outerRadius + x;
    const outerStartY = Math.sin(outerStartAdjustedAngle) * outerRadius + y;
    ctx.lineTo(outerStartX, outerStartY);
    const outerEndX = Math.cos(outerEndAdjustedAngle) * outerRadius + x;
    const outerEndY = Math.sin(outerEndAdjustedAngle) * outerRadius + y;
    ctx.lineTo(outerEndX, outerEndY);
  }
  ctx.closePath();
}
function drawArc(ctx, element, offset, spacing, circular) {
  const { fullCircles, startAngle, circumference } = element;
  let endAngle = element.endAngle;
  if (fullCircles) {
    pathArc(ctx, element, offset, spacing, endAngle, circular);
    for (let i = 0; i < fullCircles; ++i) {
      ctx.fill();
    }
    if (!isNaN(circumference)) {
      endAngle = startAngle + (circumference % TAU || TAU);
    }
  }
  pathArc(ctx, element, offset, spacing, endAngle, circular);
  ctx.fill();
  return endAngle;
}
function drawBorder(ctx, element, offset, spacing, circular) {
  const { fullCircles, startAngle, circumference, options } = element;
  const { borderWidth, borderJoinStyle, borderDash, borderDashOffset } = options;
  const inner = options.borderAlign === "inner";
  if (!borderWidth) {
    return;
  }
  ctx.setLineDash(borderDash || []);
  ctx.lineDashOffset = borderDashOffset;
  if (inner) {
    ctx.lineWidth = borderWidth * 2;
    ctx.lineJoin = borderJoinStyle || "round";
  } else {
    ctx.lineWidth = borderWidth;
    ctx.lineJoin = borderJoinStyle || "bevel";
  }
  let endAngle = element.endAngle;
  if (fullCircles) {
    pathArc(ctx, element, offset, spacing, endAngle, circular);
    for (let i = 0; i < fullCircles; ++i) {
      ctx.stroke();
    }
    if (!isNaN(circumference)) {
      endAngle = startAngle + (circumference % TAU || TAU);
    }
  }
  if (inner) {
    clipArc(ctx, element, endAngle);
  }
  if (!fullCircles) {
    pathArc(ctx, element, offset, spacing, endAngle, circular);
    ctx.stroke();
  }
}
var ArcElement = class extends Element {
  constructor(cfg) {
    super();
    __publicField(this, "circumference");
    __publicField(this, "endAngle");
    __publicField(this, "fullCircles");
    __publicField(this, "innerRadius");
    __publicField(this, "outerRadius");
    __publicField(this, "pixelMargin");
    __publicField(this, "startAngle");
    this.options = void 0;
    this.circumference = void 0;
    this.startAngle = void 0;
    this.endAngle = void 0;
    this.innerRadius = void 0;
    this.outerRadius = void 0;
    this.pixelMargin = 0;
    this.fullCircles = 0;
    if (cfg) {
      Object.assign(this, cfg);
    }
  }
  inRange(chartX, chartY, useFinalPosition) {
    const point = this.getProps([
      "x",
      "y"
    ], useFinalPosition);
    const { angle, distance } = getAngleFromPoint(point, {
      x: chartX,
      y: chartY
    });
    const { startAngle, endAngle, innerRadius, outerRadius, circumference } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], useFinalPosition);
    const rAdjust = (this.options.spacing + this.options.borderWidth) / 2;
    const _circumference = valueOrDefault(circumference, endAngle - startAngle);
    const betweenAngles = _circumference >= TAU || _angleBetween(angle, startAngle, endAngle);
    const withinRadius = _isBetween(distance, innerRadius + rAdjust, outerRadius + rAdjust);
    return betweenAngles && withinRadius;
  }
  getCenterPoint(useFinalPosition) {
    const { x, y, startAngle, endAngle, innerRadius, outerRadius } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], useFinalPosition);
    const { offset, spacing } = this.options;
    const halfAngle = (startAngle + endAngle) / 2;
    const halfRadius = (innerRadius + outerRadius + spacing + offset) / 2;
    return {
      x: x + Math.cos(halfAngle) * halfRadius,
      y: y + Math.sin(halfAngle) * halfRadius
    };
  }
  tooltipPosition(useFinalPosition) {
    return this.getCenterPoint(useFinalPosition);
  }
  draw(ctx) {
    const { options, circumference } = this;
    const offset = (options.offset || 0) / 4;
    const spacing = (options.spacing || 0) / 2;
    const circular = options.circular;
    this.pixelMargin = options.borderAlign === "inner" ? 0.33 : 0;
    this.fullCircles = circumference > TAU ? Math.floor(circumference / TAU) : 0;
    if (circumference === 0 || this.innerRadius < 0 || this.outerRadius < 0) {
      return;
    }
    ctx.save();
    const halfAngle = (this.startAngle + this.endAngle) / 2;
    ctx.translate(Math.cos(halfAngle) * offset, Math.sin(halfAngle) * offset);
    const fix = 1 - Math.sin(Math.min(PI, circumference || 0));
    const radiusOffset = offset * fix;
    ctx.fillStyle = options.backgroundColor;
    ctx.strokeStyle = options.borderColor;
    drawArc(ctx, this, radiusOffset, spacing, circular);
    drawBorder(ctx, this, radiusOffset, spacing, circular);
    ctx.restore();
  }
};
__publicField(ArcElement, "id", "arc");
__publicField(ArcElement, "defaults", {
  borderAlign: "center",
  borderColor: "#fff",
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: void 0,
  borderRadius: 0,
  borderWidth: 2,
  offset: 0,
  spacing: 0,
  angle: void 0,
  circular: true
});
__publicField(ArcElement, "defaultRoutes", {
  backgroundColor: "backgroundColor"
});
__publicField(ArcElement, "descriptors", {
  _scriptable: true,
  _indexable: (name) => name !== "borderDash"
});
function getBarBounds(bar, useFinalPosition) {
  const { x, y, base, width, height } = bar.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], useFinalPosition);
  let left, right, top, bottom, half;
  if (bar.horizontal) {
    half = height / 2;
    left = Math.min(x, base);
    right = Math.max(x, base);
    top = y - half;
    bottom = y + half;
  } else {
    half = width / 2;
    left = x - half;
    right = x + half;
    top = Math.min(y, base);
    bottom = Math.max(y, base);
  }
  return {
    left,
    top,
    right,
    bottom
  };
}
function skipOrLimit(skip2, value, min, max) {
  return skip2 ? 0 : _limitValue(value, min, max);
}
function parseBorderWidth(bar, maxW, maxH) {
  const value = bar.options.borderWidth;
  const skip2 = bar.borderSkipped;
  const o = toTRBL(value);
  return {
    t: skipOrLimit(skip2.top, o.top, 0, maxH),
    r: skipOrLimit(skip2.right, o.right, 0, maxW),
    b: skipOrLimit(skip2.bottom, o.bottom, 0, maxH),
    l: skipOrLimit(skip2.left, o.left, 0, maxW)
  };
}
function parseBorderRadius(bar, maxW, maxH) {
  const { enableBorderRadius } = bar.getProps([
    "enableBorderRadius"
  ]);
  const value = bar.options.borderRadius;
  const o = toTRBLCorners(value);
  const maxR = Math.min(maxW, maxH);
  const skip2 = bar.borderSkipped;
  const enableBorder = enableBorderRadius || isObject(value);
  return {
    topLeft: skipOrLimit(!enableBorder || skip2.top || skip2.left, o.topLeft, 0, maxR),
    topRight: skipOrLimit(!enableBorder || skip2.top || skip2.right, o.topRight, 0, maxR),
    bottomLeft: skipOrLimit(!enableBorder || skip2.bottom || skip2.left, o.bottomLeft, 0, maxR),
    bottomRight: skipOrLimit(!enableBorder || skip2.bottom || skip2.right, o.bottomRight, 0, maxR)
  };
}
function boundingRects(bar) {
  const bounds = getBarBounds(bar);
  const width = bounds.right - bounds.left;
  const height = bounds.bottom - bounds.top;
  const border = parseBorderWidth(bar, width / 2, height / 2);
  const radius = parseBorderRadius(bar, width / 2, height / 2);
  return {
    outer: {
      x: bounds.left,
      y: bounds.top,
      w: width,
      h: height,
      radius
    },
    inner: {
      x: bounds.left + border.l,
      y: bounds.top + border.t,
      w: width - border.l - border.r,
      h: height - border.t - border.b,
      radius: {
        topLeft: Math.max(0, radius.topLeft - Math.max(border.t, border.l)),
        topRight: Math.max(0, radius.topRight - Math.max(border.t, border.r)),
        bottomLeft: Math.max(0, radius.bottomLeft - Math.max(border.b, border.l)),
        bottomRight: Math.max(0, radius.bottomRight - Math.max(border.b, border.r))
      }
    }
  };
}
function inRange(bar, x, y, useFinalPosition) {
  const skipX = x === null;
  const skipY = y === null;
  const skipBoth = skipX && skipY;
  const bounds = bar && !skipBoth && getBarBounds(bar, useFinalPosition);
  return bounds && (skipX || _isBetween(x, bounds.left, bounds.right)) && (skipY || _isBetween(y, bounds.top, bounds.bottom));
}
function hasRadius(radius) {
  return radius.topLeft || radius.topRight || radius.bottomLeft || radius.bottomRight;
}
function addNormalRectPath(ctx, rect) {
  ctx.rect(rect.x, rect.y, rect.w, rect.h);
}
function inflateRect(rect, amount, refRect = {}) {
  const x = rect.x !== refRect.x ? -amount : 0;
  const y = rect.y !== refRect.y ? -amount : 0;
  const w = (rect.x + rect.w !== refRect.x + refRect.w ? amount : 0) - x;
  const h4 = (rect.y + rect.h !== refRect.y + refRect.h ? amount : 0) - y;
  return {
    x: rect.x + x,
    y: rect.y + y,
    w: rect.w + w,
    h: rect.h + h4,
    radius: rect.radius
  };
}
var BarElement = class extends Element {
  constructor(cfg) {
    super();
    this.options = void 0;
    this.horizontal = void 0;
    this.base = void 0;
    this.width = void 0;
    this.height = void 0;
    this.inflateAmount = void 0;
    if (cfg) {
      Object.assign(this, cfg);
    }
  }
  draw(ctx) {
    const { inflateAmount, options: { borderColor, backgroundColor } } = this;
    const { inner, outer } = boundingRects(this);
    const addRectPath = hasRadius(outer.radius) ? addRoundedRectPath : addNormalRectPath;
    ctx.save();
    if (outer.w !== inner.w || outer.h !== inner.h) {
      ctx.beginPath();
      addRectPath(ctx, inflateRect(outer, inflateAmount, inner));
      ctx.clip();
      addRectPath(ctx, inflateRect(inner, -inflateAmount, outer));
      ctx.fillStyle = borderColor;
      ctx.fill("evenodd");
    }
    ctx.beginPath();
    addRectPath(ctx, inflateRect(inner, inflateAmount));
    ctx.fillStyle = backgroundColor;
    ctx.fill();
    ctx.restore();
  }
  inRange(mouseX, mouseY, useFinalPosition) {
    return inRange(this, mouseX, mouseY, useFinalPosition);
  }
  inXRange(mouseX, useFinalPosition) {
    return inRange(this, mouseX, null, useFinalPosition);
  }
  inYRange(mouseY, useFinalPosition) {
    return inRange(this, null, mouseY, useFinalPosition);
  }
  getCenterPoint(useFinalPosition) {
    const { x, y, base, horizontal } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], useFinalPosition);
    return {
      x: horizontal ? (x + base) / 2 : x,
      y: horizontal ? y : (y + base) / 2
    };
  }
  getRange(axis) {
    return axis === "x" ? this.width / 2 : this.height / 2;
  }
};
__publicField(BarElement, "id", "bar");
__publicField(BarElement, "defaults", {
  borderSkipped: "start",
  borderWidth: 0,
  borderRadius: 0,
  inflateAmount: "auto",
  pointStyle: void 0
});
__publicField(BarElement, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
var getBoxSize = (labelOpts, fontSize) => {
  let { boxHeight = fontSize, boxWidth = fontSize } = labelOpts;
  if (labelOpts.usePointStyle) {
    boxHeight = Math.min(boxHeight, fontSize);
    boxWidth = labelOpts.pointStyleWidth || Math.min(boxWidth, fontSize);
  }
  return {
    boxWidth,
    boxHeight,
    itemHeight: Math.max(fontSize, boxHeight)
  };
};
var itemsEqual = (a, b) => a !== null && b !== null && a.datasetIndex === b.datasetIndex && a.index === b.index;
var Legend = class extends Element {
  constructor(config) {
    super();
    this._added = false;
    this.legendHitBoxes = [];
    this._hoveredItem = null;
    this.doughnutMode = false;
    this.chart = config.chart;
    this.options = config.options;
    this.ctx = config.ctx;
    this.legendItems = void 0;
    this.columnSizes = void 0;
    this.lineWidths = void 0;
    this.maxHeight = void 0;
    this.maxWidth = void 0;
    this.top = void 0;
    this.bottom = void 0;
    this.left = void 0;
    this.right = void 0;
    this.height = void 0;
    this.width = void 0;
    this._margins = void 0;
    this.position = void 0;
    this.weight = void 0;
    this.fullSize = void 0;
  }
  update(maxWidth, maxHeight, margins) {
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this._margins = margins;
    this.setDimensions();
    this.buildLabels();
    this.fit();
  }
  setDimensions() {
    if (this.isHorizontal()) {
      this.width = this.maxWidth;
      this.left = this._margins.left;
      this.right = this.width;
    } else {
      this.height = this.maxHeight;
      this.top = this._margins.top;
      this.bottom = this.height;
    }
  }
  buildLabels() {
    const labelOpts = this.options.labels || {};
    let legendItems = callback(labelOpts.generateLabels, [
      this.chart
    ], this) || [];
    if (labelOpts.filter) {
      legendItems = legendItems.filter((item) => labelOpts.filter(item, this.chart.data));
    }
    if (labelOpts.sort) {
      legendItems = legendItems.sort((a, b) => labelOpts.sort(a, b, this.chart.data));
    }
    if (this.options.reverse) {
      legendItems.reverse();
    }
    this.legendItems = legendItems;
  }
  fit() {
    const { options, ctx } = this;
    if (!options.display) {
      this.width = this.height = 0;
      return;
    }
    const labelOpts = options.labels;
    const labelFont = toFont(labelOpts.font);
    const fontSize = labelFont.size;
    const titleHeight = this._computeTitleHeight();
    const { boxWidth, itemHeight } = getBoxSize(labelOpts, fontSize);
    let width, height;
    ctx.font = labelFont.string;
    if (this.isHorizontal()) {
      width = this.maxWidth;
      height = this._fitRows(titleHeight, fontSize, boxWidth, itemHeight) + 10;
    } else {
      height = this.maxHeight;
      width = this._fitCols(titleHeight, labelFont, boxWidth, itemHeight) + 10;
    }
    this.width = Math.min(width, options.maxWidth || this.maxWidth);
    this.height = Math.min(height, options.maxHeight || this.maxHeight);
  }
  _fitRows(titleHeight, fontSize, boxWidth, itemHeight) {
    const { ctx, maxWidth, options: { labels: { padding } } } = this;
    const hitboxes = this.legendHitBoxes = [];
    const lineWidths = this.lineWidths = [
      0
    ];
    const lineHeight = itemHeight + padding;
    let totalHeight = titleHeight;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    let row = -1;
    let top = -lineHeight;
    this.legendItems.forEach((legendItem, i) => {
      const itemWidth = boxWidth + fontSize / 2 + ctx.measureText(legendItem.text).width;
      if (i === 0 || lineWidths[lineWidths.length - 1] + itemWidth + 2 * padding > maxWidth) {
        totalHeight += lineHeight;
        lineWidths[lineWidths.length - (i > 0 ? 0 : 1)] = 0;
        top += lineHeight;
        row++;
      }
      hitboxes[i] = {
        left: 0,
        top,
        row,
        width: itemWidth,
        height: itemHeight
      };
      lineWidths[lineWidths.length - 1] += itemWidth + padding;
    });
    return totalHeight;
  }
  _fitCols(titleHeight, labelFont, boxWidth, _itemHeight) {
    const { ctx, maxHeight, options: { labels: { padding } } } = this;
    const hitboxes = this.legendHitBoxes = [];
    const columnSizes = this.columnSizes = [];
    const heightLimit = maxHeight - titleHeight;
    let totalWidth = padding;
    let currentColWidth = 0;
    let currentColHeight = 0;
    let left = 0;
    let col = 0;
    this.legendItems.forEach((legendItem, i) => {
      const { itemWidth, itemHeight } = calculateItemSize(boxWidth, labelFont, ctx, legendItem, _itemHeight);
      if (i > 0 && currentColHeight + itemHeight + 2 * padding > heightLimit) {
        totalWidth += currentColWidth + padding;
        columnSizes.push({
          width: currentColWidth,
          height: currentColHeight
        });
        left += currentColWidth + padding;
        col++;
        currentColWidth = currentColHeight = 0;
      }
      hitboxes[i] = {
        left,
        top: currentColHeight,
        col,
        width: itemWidth,
        height: itemHeight
      };
      currentColWidth = Math.max(currentColWidth, itemWidth);
      currentColHeight += itemHeight + padding;
    });
    totalWidth += currentColWidth;
    columnSizes.push({
      width: currentColWidth,
      height: currentColHeight
    });
    return totalWidth;
  }
  adjustHitBoxes() {
    if (!this.options.display) {
      return;
    }
    const titleHeight = this._computeTitleHeight();
    const { legendHitBoxes: hitboxes, options: { align, labels: { padding }, rtl } } = this;
    const rtlHelper = getRtlAdapter(rtl, this.left, this.width);
    if (this.isHorizontal()) {
      let row = 0;
      let left = _alignStartEnd(align, this.left + padding, this.right - this.lineWidths[row]);
      for (const hitbox of hitboxes) {
        if (row !== hitbox.row) {
          row = hitbox.row;
          left = _alignStartEnd(align, this.left + padding, this.right - this.lineWidths[row]);
        }
        hitbox.top += this.top + titleHeight + padding;
        hitbox.left = rtlHelper.leftForLtr(rtlHelper.x(left), hitbox.width);
        left += hitbox.width + padding;
      }
    } else {
      let col = 0;
      let top = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - this.columnSizes[col].height);
      for (const hitbox of hitboxes) {
        if (hitbox.col !== col) {
          col = hitbox.col;
          top = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - this.columnSizes[col].height);
        }
        hitbox.top = top;
        hitbox.left += this.left + padding;
        hitbox.left = rtlHelper.leftForLtr(rtlHelper.x(hitbox.left), hitbox.width);
        top += hitbox.height + padding;
      }
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const ctx = this.ctx;
      clipArea(ctx, this);
      this._draw();
      unclipArea(ctx);
    }
  }
  _draw() {
    const { options: opts, columnSizes, lineWidths, ctx } = this;
    const { align, labels: labelOpts } = opts;
    const defaultColor = defaults.color;
    const rtlHelper = getRtlAdapter(opts.rtl, this.left, this.width);
    const labelFont = toFont(labelOpts.font);
    const { padding } = labelOpts;
    const fontSize = labelFont.size;
    const halfFontSize = fontSize / 2;
    let cursor;
    this.drawTitle();
    ctx.textAlign = rtlHelper.textAlign("left");
    ctx.textBaseline = "middle";
    ctx.lineWidth = 0.5;
    ctx.font = labelFont.string;
    const { boxWidth, boxHeight, itemHeight } = getBoxSize(labelOpts, fontSize);
    const drawLegendBox = function(x, y, legendItem) {
      if (isNaN(boxWidth) || boxWidth <= 0 || isNaN(boxHeight) || boxHeight < 0) {
        return;
      }
      ctx.save();
      const lineWidth = valueOrDefault(legendItem.lineWidth, 1);
      ctx.fillStyle = valueOrDefault(legendItem.fillStyle, defaultColor);
      ctx.lineCap = valueOrDefault(legendItem.lineCap, "butt");
      ctx.lineDashOffset = valueOrDefault(legendItem.lineDashOffset, 0);
      ctx.lineJoin = valueOrDefault(legendItem.lineJoin, "miter");
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = valueOrDefault(legendItem.strokeStyle, defaultColor);
      ctx.setLineDash(valueOrDefault(legendItem.lineDash, []));
      if (labelOpts.usePointStyle) {
        const drawOptions = {
          radius: boxHeight * Math.SQRT2 / 2,
          pointStyle: legendItem.pointStyle,
          rotation: legendItem.rotation,
          borderWidth: lineWidth
        };
        const centerX = rtlHelper.xPlus(x, boxWidth / 2);
        const centerY = y + halfFontSize;
        drawPointLegend(ctx, drawOptions, centerX, centerY, labelOpts.pointStyleWidth && boxWidth);
      } else {
        const yBoxTop = y + Math.max((fontSize - boxHeight) / 2, 0);
        const xBoxLeft = rtlHelper.leftForLtr(x, boxWidth);
        const borderRadius = toTRBLCorners(legendItem.borderRadius);
        ctx.beginPath();
        if (Object.values(borderRadius).some((v) => v !== 0)) {
          addRoundedRectPath(ctx, {
            x: xBoxLeft,
            y: yBoxTop,
            w: boxWidth,
            h: boxHeight,
            radius: borderRadius
          });
        } else {
          ctx.rect(xBoxLeft, yBoxTop, boxWidth, boxHeight);
        }
        ctx.fill();
        if (lineWidth !== 0) {
          ctx.stroke();
        }
      }
      ctx.restore();
    };
    const fillText = function(x, y, legendItem) {
      renderText(ctx, legendItem.text, x, y + itemHeight / 2, labelFont, {
        strikethrough: legendItem.hidden,
        textAlign: rtlHelper.textAlign(legendItem.textAlign)
      });
    };
    const isHorizontal = this.isHorizontal();
    const titleHeight = this._computeTitleHeight();
    if (isHorizontal) {
      cursor = {
        x: _alignStartEnd(align, this.left + padding, this.right - lineWidths[0]),
        y: this.top + padding + titleHeight,
        line: 0
      };
    } else {
      cursor = {
        x: this.left + padding,
        y: _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - columnSizes[0].height),
        line: 0
      };
    }
    overrideTextDirection(this.ctx, opts.textDirection);
    const lineHeight = itemHeight + padding;
    this.legendItems.forEach((legendItem, i) => {
      ctx.strokeStyle = legendItem.fontColor;
      ctx.fillStyle = legendItem.fontColor;
      const textWidth = ctx.measureText(legendItem.text).width;
      const textAlign = rtlHelper.textAlign(legendItem.textAlign || (legendItem.textAlign = labelOpts.textAlign));
      const width = boxWidth + halfFontSize + textWidth;
      let x = cursor.x;
      let y = cursor.y;
      rtlHelper.setWidth(this.width);
      if (isHorizontal) {
        if (i > 0 && x + width + padding > this.right) {
          y = cursor.y += lineHeight;
          cursor.line++;
          x = cursor.x = _alignStartEnd(align, this.left + padding, this.right - lineWidths[cursor.line]);
        }
      } else if (i > 0 && y + lineHeight > this.bottom) {
        x = cursor.x = x + columnSizes[cursor.line].width + padding;
        cursor.line++;
        y = cursor.y = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - columnSizes[cursor.line].height);
      }
      const realX = rtlHelper.x(x);
      drawLegendBox(realX, y, legendItem);
      x = _textX(textAlign, x + boxWidth + halfFontSize, isHorizontal ? x + width : this.right, opts.rtl);
      fillText(rtlHelper.x(x), y, legendItem);
      if (isHorizontal) {
        cursor.x += width + padding;
      } else if (typeof legendItem.text !== "string") {
        const fontLineHeight = labelFont.lineHeight;
        cursor.y += calculateLegendItemHeight(legendItem, fontLineHeight) + padding;
      } else {
        cursor.y += lineHeight;
      }
    });
    restoreTextDirection(this.ctx, opts.textDirection);
  }
  drawTitle() {
    const opts = this.options;
    const titleOpts = opts.title;
    const titleFont = toFont(titleOpts.font);
    const titlePadding = toPadding(titleOpts.padding);
    if (!titleOpts.display) {
      return;
    }
    const rtlHelper = getRtlAdapter(opts.rtl, this.left, this.width);
    const ctx = this.ctx;
    const position = titleOpts.position;
    const halfFontSize = titleFont.size / 2;
    const topPaddingPlusHalfFontSize = titlePadding.top + halfFontSize;
    let y;
    let left = this.left;
    let maxWidth = this.width;
    if (this.isHorizontal()) {
      maxWidth = Math.max(...this.lineWidths);
      y = this.top + topPaddingPlusHalfFontSize;
      left = _alignStartEnd(opts.align, left, this.right - maxWidth);
    } else {
      const maxHeight = this.columnSizes.reduce((acc, size) => Math.max(acc, size.height), 0);
      y = topPaddingPlusHalfFontSize + _alignStartEnd(opts.align, this.top, this.bottom - maxHeight - opts.labels.padding - this._computeTitleHeight());
    }
    const x = _alignStartEnd(position, left, left + maxWidth);
    ctx.textAlign = rtlHelper.textAlign(_toLeftRightCenter(position));
    ctx.textBaseline = "middle";
    ctx.strokeStyle = titleOpts.color;
    ctx.fillStyle = titleOpts.color;
    ctx.font = titleFont.string;
    renderText(ctx, titleOpts.text, x, y, titleFont);
  }
  _computeTitleHeight() {
    const titleOpts = this.options.title;
    const titleFont = toFont(titleOpts.font);
    const titlePadding = toPadding(titleOpts.padding);
    return titleOpts.display ? titleFont.lineHeight + titlePadding.height : 0;
  }
  _getLegendItemAt(x, y) {
    let i, hitBox, lh;
    if (_isBetween(x, this.left, this.right) && _isBetween(y, this.top, this.bottom)) {
      lh = this.legendHitBoxes;
      for (i = 0; i < lh.length; ++i) {
        hitBox = lh[i];
        if (_isBetween(x, hitBox.left, hitBox.left + hitBox.width) && _isBetween(y, hitBox.top, hitBox.top + hitBox.height)) {
          return this.legendItems[i];
        }
      }
    }
    return null;
  }
  handleEvent(e) {
    const opts = this.options;
    if (!isListened(e.type, opts)) {
      return;
    }
    const hoveredItem = this._getLegendItemAt(e.x, e.y);
    if (e.type === "mousemove" || e.type === "mouseout") {
      const previous = this._hoveredItem;
      const sameItem = itemsEqual(previous, hoveredItem);
      if (previous && !sameItem) {
        callback(opts.onLeave, [
          e,
          previous,
          this
        ], this);
      }
      this._hoveredItem = hoveredItem;
      if (hoveredItem && !sameItem) {
        callback(opts.onHover, [
          e,
          hoveredItem,
          this
        ], this);
      }
    } else if (hoveredItem) {
      callback(opts.onClick, [
        e,
        hoveredItem,
        this
      ], this);
    }
  }
};
function calculateItemSize(boxWidth, labelFont, ctx, legendItem, _itemHeight) {
  const itemWidth = calculateItemWidth(legendItem, boxWidth, labelFont, ctx);
  const itemHeight = calculateItemHeight(_itemHeight, legendItem, labelFont.lineHeight);
  return {
    itemWidth,
    itemHeight
  };
}
function calculateItemWidth(legendItem, boxWidth, labelFont, ctx) {
  let legendItemText = legendItem.text;
  if (legendItemText && typeof legendItemText !== "string") {
    legendItemText = legendItemText.reduce((a, b) => a.length > b.length ? a : b);
  }
  return boxWidth + labelFont.size / 2 + ctx.measureText(legendItemText).width;
}
function calculateItemHeight(_itemHeight, legendItem, fontLineHeight) {
  let itemHeight = _itemHeight;
  if (typeof legendItem.text !== "string") {
    itemHeight = calculateLegendItemHeight(legendItem, fontLineHeight);
  }
  return itemHeight;
}
function calculateLegendItemHeight(legendItem, fontLineHeight) {
  const labelHeight = legendItem.text ? legendItem.text.length : 0;
  return fontLineHeight * labelHeight;
}
function isListened(type, opts) {
  if ((type === "mousemove" || type === "mouseout") && (opts.onHover || opts.onLeave)) {
    return true;
  }
  if (opts.onClick && (type === "click" || type === "mouseup")) {
    return true;
  }
  return false;
}
var plugin_legend = {
  id: "legend",
  _element: Legend,
  start(chart, _args, options) {
    const legend = chart.legend = new Legend({
      ctx: chart.ctx,
      options,
      chart
    });
    layouts.configure(chart, legend, options);
    layouts.addBox(chart, legend);
  },
  stop(chart) {
    layouts.removeBox(chart, chart.legend);
    delete chart.legend;
  },
  beforeUpdate(chart, _args, options) {
    const legend = chart.legend;
    layouts.configure(chart, legend, options);
    legend.options = options;
  },
  afterUpdate(chart) {
    const legend = chart.legend;
    legend.buildLabels();
    legend.adjustHitBoxes();
  },
  afterEvent(chart, args) {
    if (!args.replay) {
      chart.legend.handleEvent(args.event);
    }
  },
  defaults: {
    display: true,
    position: "top",
    align: "center",
    fullSize: true,
    reverse: false,
    weight: 1e3,
    onClick(e, legendItem, legend) {
      const index = legendItem.datasetIndex;
      const ci = legend.chart;
      if (ci.isDatasetVisible(index)) {
        ci.hide(index);
        legendItem.hidden = true;
      } else {
        ci.show(index);
        legendItem.hidden = false;
      }
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (ctx) => ctx.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(chart) {
        const datasets = chart.data.datasets;
        const { labels: { usePointStyle, pointStyle, textAlign, color: color2, useBorderRadius, borderRadius } } = chart.legend.options;
        return chart._getSortedDatasetMetas().map((meta) => {
          const style = meta.controller.getStyle(usePointStyle ? 0 : void 0);
          const borderWidth = toPadding(style.borderWidth);
          return {
            text: datasets[meta.index].label,
            fillStyle: style.backgroundColor,
            fontColor: color2,
            hidden: !meta.visible,
            lineCap: style.borderCapStyle,
            lineDash: style.borderDash,
            lineDashOffset: style.borderDashOffset,
            lineJoin: style.borderJoinStyle,
            lineWidth: (borderWidth.width + borderWidth.height) / 4,
            strokeStyle: style.borderColor,
            pointStyle: pointStyle || style.pointStyle,
            rotation: style.rotation,
            textAlign: textAlign || style.textAlign,
            borderRadius: useBorderRadius && (borderRadius || style.borderRadius),
            datasetIndex: meta.index
          };
        }, this);
      }
    },
    title: {
      color: (ctx) => ctx.chart.options.color,
      display: false,
      position: "center",
      text: ""
    }
  },
  descriptors: {
    _scriptable: (name) => !name.startsWith("on"),
    labels: {
      _scriptable: (name) => ![
        "generateLabels",
        "filter",
        "sort"
      ].includes(name)
    }
  }
};
var Title = class extends Element {
  constructor(config) {
    super();
    this.chart = config.chart;
    this.options = config.options;
    this.ctx = config.ctx;
    this._padding = void 0;
    this.top = void 0;
    this.bottom = void 0;
    this.left = void 0;
    this.right = void 0;
    this.width = void 0;
    this.height = void 0;
    this.position = void 0;
    this.weight = void 0;
    this.fullSize = void 0;
  }
  update(maxWidth, maxHeight) {
    const opts = this.options;
    this.left = 0;
    this.top = 0;
    if (!opts.display) {
      this.width = this.height = this.right = this.bottom = 0;
      return;
    }
    this.width = this.right = maxWidth;
    this.height = this.bottom = maxHeight;
    const lineCount = isArray(opts.text) ? opts.text.length : 1;
    this._padding = toPadding(opts.padding);
    const textSize = lineCount * toFont(opts.font).lineHeight + this._padding.height;
    if (this.isHorizontal()) {
      this.height = textSize;
    } else {
      this.width = textSize;
    }
  }
  isHorizontal() {
    const pos = this.options.position;
    return pos === "top" || pos === "bottom";
  }
  _drawArgs(offset) {
    const { top, left, bottom, right, options } = this;
    const align = options.align;
    let rotation = 0;
    let maxWidth, titleX, titleY;
    if (this.isHorizontal()) {
      titleX = _alignStartEnd(align, left, right);
      titleY = top + offset;
      maxWidth = right - left;
    } else {
      if (options.position === "left") {
        titleX = left + offset;
        titleY = _alignStartEnd(align, bottom, top);
        rotation = PI * -0.5;
      } else {
        titleX = right - offset;
        titleY = _alignStartEnd(align, top, bottom);
        rotation = PI * 0.5;
      }
      maxWidth = bottom - top;
    }
    return {
      titleX,
      titleY,
      maxWidth,
      rotation
    };
  }
  draw() {
    const ctx = this.ctx;
    const opts = this.options;
    if (!opts.display) {
      return;
    }
    const fontOpts = toFont(opts.font);
    const lineHeight = fontOpts.lineHeight;
    const offset = lineHeight / 2 + this._padding.top;
    const { titleX, titleY, maxWidth, rotation } = this._drawArgs(offset);
    renderText(ctx, opts.text, 0, 0, fontOpts, {
      color: opts.color,
      maxWidth,
      rotation,
      textAlign: _toLeftRightCenter(opts.align),
      textBaseline: "middle",
      translation: [
        titleX,
        titleY
      ]
    });
  }
};
function createTitle(chart, titleOpts) {
  const title = new Title({
    ctx: chart.ctx,
    options: titleOpts,
    chart
  });
  layouts.configure(chart, title, titleOpts);
  layouts.addBox(chart, title);
  chart.titleBlock = title;
}
var plugin_title = {
  id: "title",
  _element: Title,
  start(chart, _args, options) {
    createTitle(chart, options);
  },
  stop(chart) {
    const titleBlock = chart.titleBlock;
    layouts.removeBox(chart, titleBlock);
    delete chart.titleBlock;
  },
  beforeUpdate(chart, _args, options) {
    const title = chart.titleBlock;
    layouts.configure(chart, title, options);
    title.options = options;
  },
  defaults: {
    align: "center",
    display: false,
    font: {
      weight: "bold"
    },
    fullSize: true,
    padding: 10,
    position: "top",
    text: "",
    weight: 2e3
  },
  defaultRoutes: {
    color: "color"
  },
  descriptors: {
    _scriptable: true,
    _indexable: false
  }
};
var map2 = /* @__PURE__ */ new WeakMap();
var plugin_subtitle = {
  id: "subtitle",
  start(chart, _args, options) {
    const title = new Title({
      ctx: chart.ctx,
      options,
      chart
    });
    layouts.configure(chart, title, options);
    layouts.addBox(chart, title);
    map2.set(chart, title);
  },
  stop(chart) {
    layouts.removeBox(chart, map2.get(chart));
    map2.delete(chart);
  },
  beforeUpdate(chart, _args, options) {
    const title = map2.get(chart);
    layouts.configure(chart, title, options);
    title.options = options;
  },
  defaults: {
    align: "center",
    display: false,
    font: {
      weight: "normal"
    },
    fullSize: true,
    padding: 0,
    position: "top",
    text: "",
    weight: 1500
  },
  defaultRoutes: {
    color: "color"
  },
  descriptors: {
    _scriptable: true,
    _indexable: false
  }
};
var positioners = {
  average(items) {
    if (!items.length) {
      return false;
    }
    let i, len;
    let x = 0;
    let y = 0;
    let count = 0;
    for (i = 0, len = items.length; i < len; ++i) {
      const el = items[i].element;
      if (el && el.hasValue()) {
        const pos = el.tooltipPosition();
        x += pos.x;
        y += pos.y;
        ++count;
      }
    }
    return {
      x: x / count,
      y: y / count
    };
  },
  nearest(items, eventPosition) {
    if (!items.length) {
      return false;
    }
    let x = eventPosition.x;
    let y = eventPosition.y;
    let minDistance = Number.POSITIVE_INFINITY;
    let i, len, nearestElement;
    for (i = 0, len = items.length; i < len; ++i) {
      const el = items[i].element;
      if (el && el.hasValue()) {
        const center = el.getCenterPoint();
        const d = distanceBetweenPoints(eventPosition, center);
        if (d < minDistance) {
          minDistance = d;
          nearestElement = el;
        }
      }
    }
    if (nearestElement) {
      const tp = nearestElement.tooltipPosition();
      x = tp.x;
      y = tp.y;
    }
    return {
      x,
      y
    };
  }
};
function pushOrConcat(base, toPush) {
  if (toPush) {
    if (isArray(toPush)) {
      Array.prototype.push.apply(base, toPush);
    } else {
      base.push(toPush);
    }
  }
  return base;
}
function splitNewlines(str) {
  if ((typeof str === "string" || str instanceof String) && str.indexOf("\n") > -1) {
    return str.split("\n");
  }
  return str;
}
function createTooltipItem(chart, item) {
  const { element, datasetIndex, index } = item;
  const controller = chart.getDatasetMeta(datasetIndex).controller;
  const { label, value } = controller.getLabelAndValue(index);
  return {
    chart,
    label,
    parsed: controller.getParsed(index),
    raw: chart.data.datasets[datasetIndex].data[index],
    formattedValue: value,
    dataset: controller.getDataset(),
    dataIndex: index,
    datasetIndex,
    element
  };
}
function getTooltipSize(tooltip, options) {
  const ctx = tooltip.chart.ctx;
  const { body, footer, title } = tooltip;
  const { boxWidth, boxHeight } = options;
  const bodyFont = toFont(options.bodyFont);
  const titleFont = toFont(options.titleFont);
  const footerFont = toFont(options.footerFont);
  const titleLineCount = title.length;
  const footerLineCount = footer.length;
  const bodyLineItemCount = body.length;
  const padding = toPadding(options.padding);
  let height = padding.height;
  let width = 0;
  let combinedBodyLength = body.reduce((count, bodyItem) => count + bodyItem.before.length + bodyItem.lines.length + bodyItem.after.length, 0);
  combinedBodyLength += tooltip.beforeBody.length + tooltip.afterBody.length;
  if (titleLineCount) {
    height += titleLineCount * titleFont.lineHeight + (titleLineCount - 1) * options.titleSpacing + options.titleMarginBottom;
  }
  if (combinedBodyLength) {
    const bodyLineHeight = options.displayColors ? Math.max(boxHeight, bodyFont.lineHeight) : bodyFont.lineHeight;
    height += bodyLineItemCount * bodyLineHeight + (combinedBodyLength - bodyLineItemCount) * bodyFont.lineHeight + (combinedBodyLength - 1) * options.bodySpacing;
  }
  if (footerLineCount) {
    height += options.footerMarginTop + footerLineCount * footerFont.lineHeight + (footerLineCount - 1) * options.footerSpacing;
  }
  let widthPadding = 0;
  const maxLineWidth = function(line) {
    width = Math.max(width, ctx.measureText(line).width + widthPadding);
  };
  ctx.save();
  ctx.font = titleFont.string;
  each(tooltip.title, maxLineWidth);
  ctx.font = bodyFont.string;
  each(tooltip.beforeBody.concat(tooltip.afterBody), maxLineWidth);
  widthPadding = options.displayColors ? boxWidth + 2 + options.boxPadding : 0;
  each(body, (bodyItem) => {
    each(bodyItem.before, maxLineWidth);
    each(bodyItem.lines, maxLineWidth);
    each(bodyItem.after, maxLineWidth);
  });
  widthPadding = 0;
  ctx.font = footerFont.string;
  each(tooltip.footer, maxLineWidth);
  ctx.restore();
  width += padding.width;
  return {
    width,
    height
  };
}
function determineYAlign(chart, size) {
  const { y, height } = size;
  if (y < height / 2) {
    return "top";
  } else if (y > chart.height - height / 2) {
    return "bottom";
  }
  return "center";
}
function doesNotFitWithAlign(xAlign, chart, options, size) {
  const { x, width } = size;
  const caret = options.caretSize + options.caretPadding;
  if (xAlign === "left" && x + width + caret > chart.width) {
    return true;
  }
  if (xAlign === "right" && x - width - caret < 0) {
    return true;
  }
}
function determineXAlign(chart, options, size, yAlign) {
  const { x, width } = size;
  const { width: chartWidth, chartArea: { left, right } } = chart;
  let xAlign = "center";
  if (yAlign === "center") {
    xAlign = x <= (left + right) / 2 ? "left" : "right";
  } else if (x <= width / 2) {
    xAlign = "left";
  } else if (x >= chartWidth - width / 2) {
    xAlign = "right";
  }
  if (doesNotFitWithAlign(xAlign, chart, options, size)) {
    xAlign = "center";
  }
  return xAlign;
}
function determineAlignment(chart, options, size) {
  const yAlign = size.yAlign || options.yAlign || determineYAlign(chart, size);
  return {
    xAlign: size.xAlign || options.xAlign || determineXAlign(chart, options, size, yAlign),
    yAlign
  };
}
function alignX(size, xAlign) {
  let { x, width } = size;
  if (xAlign === "right") {
    x -= width;
  } else if (xAlign === "center") {
    x -= width / 2;
  }
  return x;
}
function alignY(size, yAlign, paddingAndSize) {
  let { y, height } = size;
  if (yAlign === "top") {
    y += paddingAndSize;
  } else if (yAlign === "bottom") {
    y -= height + paddingAndSize;
  } else {
    y -= height / 2;
  }
  return y;
}
function getBackgroundPoint(options, size, alignment, chart) {
  const { caretSize, caretPadding, cornerRadius } = options;
  const { xAlign, yAlign } = alignment;
  const paddingAndSize = caretSize + caretPadding;
  const { topLeft, topRight, bottomLeft, bottomRight } = toTRBLCorners(cornerRadius);
  let x = alignX(size, xAlign);
  const y = alignY(size, yAlign, paddingAndSize);
  if (yAlign === "center") {
    if (xAlign === "left") {
      x += paddingAndSize;
    } else if (xAlign === "right") {
      x -= paddingAndSize;
    }
  } else if (xAlign === "left") {
    x -= Math.max(topLeft, bottomLeft) + caretSize;
  } else if (xAlign === "right") {
    x += Math.max(topRight, bottomRight) + caretSize;
  }
  return {
    x: _limitValue(x, 0, chart.width - size.width),
    y: _limitValue(y, 0, chart.height - size.height)
  };
}
function getAlignedX(tooltip, align, options) {
  const padding = toPadding(options.padding);
  return align === "center" ? tooltip.x + tooltip.width / 2 : align === "right" ? tooltip.x + tooltip.width - padding.right : tooltip.x + padding.left;
}
function getBeforeAfterBodyLines(callback2) {
  return pushOrConcat([], splitNewlines(callback2));
}
function createTooltipContext(parent, tooltip, tooltipItems) {
  return createContext(parent, {
    tooltip,
    tooltipItems,
    type: "tooltip"
  });
}
function overrideCallbacks(callbacks, context) {
  const override = context && context.dataset && context.dataset.tooltip && context.dataset.tooltip.callbacks;
  return override ? callbacks.override(override) : callbacks;
}
var defaultCallbacks = {
  beforeTitle: noop,
  title(tooltipItems) {
    if (tooltipItems.length > 0) {
      const item = tooltipItems[0];
      const labels = item.chart.data.labels;
      const labelCount = labels ? labels.length : 0;
      if (this && this.options && this.options.mode === "dataset") {
        return item.dataset.label || "";
      } else if (item.label) {
        return item.label;
      } else if (labelCount > 0 && item.dataIndex < labelCount) {
        return labels[item.dataIndex];
      }
    }
    return "";
  },
  afterTitle: noop,
  beforeBody: noop,
  beforeLabel: noop,
  label(tooltipItem) {
    if (this && this.options && this.options.mode === "dataset") {
      return tooltipItem.label + ": " + tooltipItem.formattedValue || tooltipItem.formattedValue;
    }
    let label = tooltipItem.dataset.label || "";
    if (label) {
      label += ": ";
    }
    const value = tooltipItem.formattedValue;
    if (!isNullOrUndef(value)) {
      label += value;
    }
    return label;
  },
  labelColor(tooltipItem) {
    const meta = tooltipItem.chart.getDatasetMeta(tooltipItem.datasetIndex);
    const options = meta.controller.getStyle(tooltipItem.dataIndex);
    return {
      borderColor: options.borderColor,
      backgroundColor: options.backgroundColor,
      borderWidth: options.borderWidth,
      borderDash: options.borderDash,
      borderDashOffset: options.borderDashOffset,
      borderRadius: 0
    };
  },
  labelTextColor() {
    return this.options.bodyColor;
  },
  labelPointStyle(tooltipItem) {
    const meta = tooltipItem.chart.getDatasetMeta(tooltipItem.datasetIndex);
    const options = meta.controller.getStyle(tooltipItem.dataIndex);
    return {
      pointStyle: options.pointStyle,
      rotation: options.rotation
    };
  },
  afterLabel: noop,
  afterBody: noop,
  beforeFooter: noop,
  footer: noop,
  afterFooter: noop
};
function invokeCallbackWithFallback(callbacks, name, ctx, arg) {
  const result = callbacks[name].call(ctx, arg);
  if (typeof result === "undefined") {
    return defaultCallbacks[name].call(ctx, arg);
  }
  return result;
}
var Tooltip = class extends Element {
  constructor(config) {
    super();
    this.opacity = 0;
    this._active = [];
    this._eventPosition = void 0;
    this._size = void 0;
    this._cachedAnimations = void 0;
    this._tooltipItems = [];
    this.$animations = void 0;
    this.$context = void 0;
    this.chart = config.chart;
    this.options = config.options;
    this.dataPoints = void 0;
    this.title = void 0;
    this.beforeBody = void 0;
    this.body = void 0;
    this.afterBody = void 0;
    this.footer = void 0;
    this.xAlign = void 0;
    this.yAlign = void 0;
    this.x = void 0;
    this.y = void 0;
    this.height = void 0;
    this.width = void 0;
    this.caretX = void 0;
    this.caretY = void 0;
    this.labelColors = void 0;
    this.labelPointStyles = void 0;
    this.labelTextColors = void 0;
  }
  initialize(options) {
    this.options = options;
    this._cachedAnimations = void 0;
    this.$context = void 0;
  }
  _resolveAnimations() {
    const cached = this._cachedAnimations;
    if (cached) {
      return cached;
    }
    const chart = this.chart;
    const options = this.options.setContext(this.getContext());
    const opts = options.enabled && chart.options.animation && options.animations;
    const animations = new Animations(this.chart, opts);
    if (opts._cacheable) {
      this._cachedAnimations = Object.freeze(animations);
    }
    return animations;
  }
  getContext() {
    return this.$context || (this.$context = createTooltipContext(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(context, options) {
    const { callbacks } = options;
    const beforeTitle = invokeCallbackWithFallback(callbacks, "beforeTitle", this, context);
    const title = invokeCallbackWithFallback(callbacks, "title", this, context);
    const afterTitle = invokeCallbackWithFallback(callbacks, "afterTitle", this, context);
    let lines = [];
    lines = pushOrConcat(lines, splitNewlines(beforeTitle));
    lines = pushOrConcat(lines, splitNewlines(title));
    lines = pushOrConcat(lines, splitNewlines(afterTitle));
    return lines;
  }
  getBeforeBody(tooltipItems, options) {
    return getBeforeAfterBodyLines(invokeCallbackWithFallback(options.callbacks, "beforeBody", this, tooltipItems));
  }
  getBody(tooltipItems, options) {
    const { callbacks } = options;
    const bodyItems = [];
    each(tooltipItems, (context) => {
      const bodyItem = {
        before: [],
        lines: [],
        after: []
      };
      const scoped = overrideCallbacks(callbacks, context);
      pushOrConcat(bodyItem.before, splitNewlines(invokeCallbackWithFallback(scoped, "beforeLabel", this, context)));
      pushOrConcat(bodyItem.lines, invokeCallbackWithFallback(scoped, "label", this, context));
      pushOrConcat(bodyItem.after, splitNewlines(invokeCallbackWithFallback(scoped, "afterLabel", this, context)));
      bodyItems.push(bodyItem);
    });
    return bodyItems;
  }
  getAfterBody(tooltipItems, options) {
    return getBeforeAfterBodyLines(invokeCallbackWithFallback(options.callbacks, "afterBody", this, tooltipItems));
  }
  getFooter(tooltipItems, options) {
    const { callbacks } = options;
    const beforeFooter = invokeCallbackWithFallback(callbacks, "beforeFooter", this, tooltipItems);
    const footer = invokeCallbackWithFallback(callbacks, "footer", this, tooltipItems);
    const afterFooter = invokeCallbackWithFallback(callbacks, "afterFooter", this, tooltipItems);
    let lines = [];
    lines = pushOrConcat(lines, splitNewlines(beforeFooter));
    lines = pushOrConcat(lines, splitNewlines(footer));
    lines = pushOrConcat(lines, splitNewlines(afterFooter));
    return lines;
  }
  _createItems(options) {
    const active = this._active;
    const data = this.chart.data;
    const labelColors = [];
    const labelPointStyles = [];
    const labelTextColors = [];
    let tooltipItems = [];
    let i, len;
    for (i = 0, len = active.length; i < len; ++i) {
      tooltipItems.push(createTooltipItem(this.chart, active[i]));
    }
    if (options.filter) {
      tooltipItems = tooltipItems.filter((element, index, array) => options.filter(element, index, array, data));
    }
    if (options.itemSort) {
      tooltipItems = tooltipItems.sort((a, b) => options.itemSort(a, b, data));
    }
    each(tooltipItems, (context) => {
      const scoped = overrideCallbacks(options.callbacks, context);
      labelColors.push(invokeCallbackWithFallback(scoped, "labelColor", this, context));
      labelPointStyles.push(invokeCallbackWithFallback(scoped, "labelPointStyle", this, context));
      labelTextColors.push(invokeCallbackWithFallback(scoped, "labelTextColor", this, context));
    });
    this.labelColors = labelColors;
    this.labelPointStyles = labelPointStyles;
    this.labelTextColors = labelTextColors;
    this.dataPoints = tooltipItems;
    return tooltipItems;
  }
  update(changed, replay) {
    const options = this.options.setContext(this.getContext());
    const active = this._active;
    let properties;
    let tooltipItems = [];
    if (!active.length) {
      if (this.opacity !== 0) {
        properties = {
          opacity: 0
        };
      }
    } else {
      const position = positioners[options.position].call(this, active, this._eventPosition);
      tooltipItems = this._createItems(options);
      this.title = this.getTitle(tooltipItems, options);
      this.beforeBody = this.getBeforeBody(tooltipItems, options);
      this.body = this.getBody(tooltipItems, options);
      this.afterBody = this.getAfterBody(tooltipItems, options);
      this.footer = this.getFooter(tooltipItems, options);
      const size = this._size = getTooltipSize(this, options);
      const positionAndSize = Object.assign({}, position, size);
      const alignment = determineAlignment(this.chart, options, positionAndSize);
      const backgroundPoint = getBackgroundPoint(options, positionAndSize, alignment, this.chart);
      this.xAlign = alignment.xAlign;
      this.yAlign = alignment.yAlign;
      properties = {
        opacity: 1,
        x: backgroundPoint.x,
        y: backgroundPoint.y,
        width: size.width,
        height: size.height,
        caretX: position.x,
        caretY: position.y
      };
    }
    this._tooltipItems = tooltipItems;
    this.$context = void 0;
    if (properties) {
      this._resolveAnimations().update(this, properties);
    }
    if (changed && options.external) {
      options.external.call(this, {
        chart: this.chart,
        tooltip: this,
        replay
      });
    }
  }
  drawCaret(tooltipPoint, ctx, size, options) {
    const caretPosition = this.getCaretPosition(tooltipPoint, size, options);
    ctx.lineTo(caretPosition.x1, caretPosition.y1);
    ctx.lineTo(caretPosition.x2, caretPosition.y2);
    ctx.lineTo(caretPosition.x3, caretPosition.y3);
  }
  getCaretPosition(tooltipPoint, size, options) {
    const { xAlign, yAlign } = this;
    const { caretSize, cornerRadius } = options;
    const { topLeft, topRight, bottomLeft, bottomRight } = toTRBLCorners(cornerRadius);
    const { x: ptX, y: ptY } = tooltipPoint;
    const { width, height } = size;
    let x1, x2, x3, y1, y2, y3;
    if (yAlign === "center") {
      y2 = ptY + height / 2;
      if (xAlign === "left") {
        x1 = ptX;
        x2 = x1 - caretSize;
        y1 = y2 + caretSize;
        y3 = y2 - caretSize;
      } else {
        x1 = ptX + width;
        x2 = x1 + caretSize;
        y1 = y2 - caretSize;
        y3 = y2 + caretSize;
      }
      x3 = x1;
    } else {
      if (xAlign === "left") {
        x2 = ptX + Math.max(topLeft, bottomLeft) + caretSize;
      } else if (xAlign === "right") {
        x2 = ptX + width - Math.max(topRight, bottomRight) - caretSize;
      } else {
        x2 = this.caretX;
      }
      if (yAlign === "top") {
        y1 = ptY;
        y2 = y1 - caretSize;
        x1 = x2 - caretSize;
        x3 = x2 + caretSize;
      } else {
        y1 = ptY + height;
        y2 = y1 + caretSize;
        x1 = x2 + caretSize;
        x3 = x2 - caretSize;
      }
      y3 = y1;
    }
    return {
      x1,
      x2,
      x3,
      y1,
      y2,
      y3
    };
  }
  drawTitle(pt, ctx, options) {
    const title = this.title;
    const length = title.length;
    let titleFont, titleSpacing, i;
    if (length) {
      const rtlHelper = getRtlAdapter(options.rtl, this.x, this.width);
      pt.x = getAlignedX(this, options.titleAlign, options);
      ctx.textAlign = rtlHelper.textAlign(options.titleAlign);
      ctx.textBaseline = "middle";
      titleFont = toFont(options.titleFont);
      titleSpacing = options.titleSpacing;
      ctx.fillStyle = options.titleColor;
      ctx.font = titleFont.string;
      for (i = 0; i < length; ++i) {
        ctx.fillText(title[i], rtlHelper.x(pt.x), pt.y + titleFont.lineHeight / 2);
        pt.y += titleFont.lineHeight + titleSpacing;
        if (i + 1 === length) {
          pt.y += options.titleMarginBottom - titleSpacing;
        }
      }
    }
  }
  _drawColorBox(ctx, pt, i, rtlHelper, options) {
    const labelColor = this.labelColors[i];
    const labelPointStyle = this.labelPointStyles[i];
    const { boxHeight, boxWidth } = options;
    const bodyFont = toFont(options.bodyFont);
    const colorX = getAlignedX(this, "left", options);
    const rtlColorX = rtlHelper.x(colorX);
    const yOffSet = boxHeight < bodyFont.lineHeight ? (bodyFont.lineHeight - boxHeight) / 2 : 0;
    const colorY = pt.y + yOffSet;
    if (options.usePointStyle) {
      const drawOptions = {
        radius: Math.min(boxWidth, boxHeight) / 2,
        pointStyle: labelPointStyle.pointStyle,
        rotation: labelPointStyle.rotation,
        borderWidth: 1
      };
      const centerX = rtlHelper.leftForLtr(rtlColorX, boxWidth) + boxWidth / 2;
      const centerY = colorY + boxHeight / 2;
      ctx.strokeStyle = options.multiKeyBackground;
      ctx.fillStyle = options.multiKeyBackground;
      drawPoint(ctx, drawOptions, centerX, centerY);
      ctx.strokeStyle = labelColor.borderColor;
      ctx.fillStyle = labelColor.backgroundColor;
      drawPoint(ctx, drawOptions, centerX, centerY);
    } else {
      ctx.lineWidth = isObject(labelColor.borderWidth) ? Math.max(...Object.values(labelColor.borderWidth)) : labelColor.borderWidth || 1;
      ctx.strokeStyle = labelColor.borderColor;
      ctx.setLineDash(labelColor.borderDash || []);
      ctx.lineDashOffset = labelColor.borderDashOffset || 0;
      const outerX = rtlHelper.leftForLtr(rtlColorX, boxWidth);
      const innerX = rtlHelper.leftForLtr(rtlHelper.xPlus(rtlColorX, 1), boxWidth - 2);
      const borderRadius = toTRBLCorners(labelColor.borderRadius);
      if (Object.values(borderRadius).some((v) => v !== 0)) {
        ctx.beginPath();
        ctx.fillStyle = options.multiKeyBackground;
        addRoundedRectPath(ctx, {
          x: outerX,
          y: colorY,
          w: boxWidth,
          h: boxHeight,
          radius: borderRadius
        });
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = labelColor.backgroundColor;
        ctx.beginPath();
        addRoundedRectPath(ctx, {
          x: innerX,
          y: colorY + 1,
          w: boxWidth - 2,
          h: boxHeight - 2,
          radius: borderRadius
        });
        ctx.fill();
      } else {
        ctx.fillStyle = options.multiKeyBackground;
        ctx.fillRect(outerX, colorY, boxWidth, boxHeight);
        ctx.strokeRect(outerX, colorY, boxWidth, boxHeight);
        ctx.fillStyle = labelColor.backgroundColor;
        ctx.fillRect(innerX, colorY + 1, boxWidth - 2, boxHeight - 2);
      }
    }
    ctx.fillStyle = this.labelTextColors[i];
  }
  drawBody(pt, ctx, options) {
    const { body } = this;
    const { bodySpacing, bodyAlign, displayColors, boxHeight, boxWidth, boxPadding } = options;
    const bodyFont = toFont(options.bodyFont);
    let bodyLineHeight = bodyFont.lineHeight;
    let xLinePadding = 0;
    const rtlHelper = getRtlAdapter(options.rtl, this.x, this.width);
    const fillLineOfText = function(line) {
      ctx.fillText(line, rtlHelper.x(pt.x + xLinePadding), pt.y + bodyLineHeight / 2);
      pt.y += bodyLineHeight + bodySpacing;
    };
    const bodyAlignForCalculation = rtlHelper.textAlign(bodyAlign);
    let bodyItem, textColor, lines, i, j, ilen, jlen;
    ctx.textAlign = bodyAlign;
    ctx.textBaseline = "middle";
    ctx.font = bodyFont.string;
    pt.x = getAlignedX(this, bodyAlignForCalculation, options);
    ctx.fillStyle = options.bodyColor;
    each(this.beforeBody, fillLineOfText);
    xLinePadding = displayColors && bodyAlignForCalculation !== "right" ? bodyAlign === "center" ? boxWidth / 2 + boxPadding : boxWidth + 2 + boxPadding : 0;
    for (i = 0, ilen = body.length; i < ilen; ++i) {
      bodyItem = body[i];
      textColor = this.labelTextColors[i];
      ctx.fillStyle = textColor;
      each(bodyItem.before, fillLineOfText);
      lines = bodyItem.lines;
      if (displayColors && lines.length) {
        this._drawColorBox(ctx, pt, i, rtlHelper, options);
        bodyLineHeight = Math.max(bodyFont.lineHeight, boxHeight);
      }
      for (j = 0, jlen = lines.length; j < jlen; ++j) {
        fillLineOfText(lines[j]);
        bodyLineHeight = bodyFont.lineHeight;
      }
      each(bodyItem.after, fillLineOfText);
    }
    xLinePadding = 0;
    bodyLineHeight = bodyFont.lineHeight;
    each(this.afterBody, fillLineOfText);
    pt.y -= bodySpacing;
  }
  drawFooter(pt, ctx, options) {
    const footer = this.footer;
    const length = footer.length;
    let footerFont, i;
    if (length) {
      const rtlHelper = getRtlAdapter(options.rtl, this.x, this.width);
      pt.x = getAlignedX(this, options.footerAlign, options);
      pt.y += options.footerMarginTop;
      ctx.textAlign = rtlHelper.textAlign(options.footerAlign);
      ctx.textBaseline = "middle";
      footerFont = toFont(options.footerFont);
      ctx.fillStyle = options.footerColor;
      ctx.font = footerFont.string;
      for (i = 0; i < length; ++i) {
        ctx.fillText(footer[i], rtlHelper.x(pt.x), pt.y + footerFont.lineHeight / 2);
        pt.y += footerFont.lineHeight + options.footerSpacing;
      }
    }
  }
  drawBackground(pt, ctx, tooltipSize, options) {
    const { xAlign, yAlign } = this;
    const { x, y } = pt;
    const { width, height } = tooltipSize;
    const { topLeft, topRight, bottomLeft, bottomRight } = toTRBLCorners(options.cornerRadius);
    ctx.fillStyle = options.backgroundColor;
    ctx.strokeStyle = options.borderColor;
    ctx.lineWidth = options.borderWidth;
    ctx.beginPath();
    ctx.moveTo(x + topLeft, y);
    if (yAlign === "top") {
      this.drawCaret(pt, ctx, tooltipSize, options);
    }
    ctx.lineTo(x + width - topRight, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + topRight);
    if (yAlign === "center" && xAlign === "right") {
      this.drawCaret(pt, ctx, tooltipSize, options);
    }
    ctx.lineTo(x + width, y + height - bottomRight);
    ctx.quadraticCurveTo(x + width, y + height, x + width - bottomRight, y + height);
    if (yAlign === "bottom") {
      this.drawCaret(pt, ctx, tooltipSize, options);
    }
    ctx.lineTo(x + bottomLeft, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - bottomLeft);
    if (yAlign === "center" && xAlign === "left") {
      this.drawCaret(pt, ctx, tooltipSize, options);
    }
    ctx.lineTo(x, y + topLeft);
    ctx.quadraticCurveTo(x, y, x + topLeft, y);
    ctx.closePath();
    ctx.fill();
    if (options.borderWidth > 0) {
      ctx.stroke();
    }
  }
  _updateAnimationTarget(options) {
    const chart = this.chart;
    const anims = this.$animations;
    const animX = anims && anims.x;
    const animY = anims && anims.y;
    if (animX || animY) {
      const position = positioners[options.position].call(this, this._active, this._eventPosition);
      if (!position) {
        return;
      }
      const size = this._size = getTooltipSize(this, options);
      const positionAndSize = Object.assign({}, position, this._size);
      const alignment = determineAlignment(chart, options, positionAndSize);
      const point = getBackgroundPoint(options, positionAndSize, alignment, chart);
      if (animX._to !== point.x || animY._to !== point.y) {
        this.xAlign = alignment.xAlign;
        this.yAlign = alignment.yAlign;
        this.width = size.width;
        this.height = size.height;
        this.caretX = position.x;
        this.caretY = position.y;
        this._resolveAnimations().update(this, point);
      }
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(ctx) {
    const options = this.options.setContext(this.getContext());
    let opacity = this.opacity;
    if (!opacity) {
      return;
    }
    this._updateAnimationTarget(options);
    const tooltipSize = {
      width: this.width,
      height: this.height
    };
    const pt = {
      x: this.x,
      y: this.y
    };
    opacity = Math.abs(opacity) < 1e-3 ? 0 : opacity;
    const padding = toPadding(options.padding);
    const hasTooltipContent = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    if (options.enabled && hasTooltipContent) {
      ctx.save();
      ctx.globalAlpha = opacity;
      this.drawBackground(pt, ctx, tooltipSize, options);
      overrideTextDirection(ctx, options.textDirection);
      pt.y += padding.top;
      this.drawTitle(pt, ctx, options);
      this.drawBody(pt, ctx, options);
      this.drawFooter(pt, ctx, options);
      restoreTextDirection(ctx, options.textDirection);
      ctx.restore();
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(activeElements, eventPosition) {
    const lastActive = this._active;
    const active = activeElements.map(({ datasetIndex, index }) => {
      const meta = this.chart.getDatasetMeta(datasetIndex);
      if (!meta) {
        throw new Error("Cannot find a dataset at index " + datasetIndex);
      }
      return {
        datasetIndex,
        element: meta.data[index],
        index
      };
    });
    const changed = !_elementsEqual(lastActive, active);
    const positionChanged = this._positionChanged(active, eventPosition);
    if (changed || positionChanged) {
      this._active = active;
      this._eventPosition = eventPosition;
      this._ignoreReplayEvents = true;
      this.update(true);
    }
  }
  handleEvent(e, replay, inChartArea = true) {
    if (replay && this._ignoreReplayEvents) {
      return false;
    }
    this._ignoreReplayEvents = false;
    const options = this.options;
    const lastActive = this._active || [];
    const active = this._getActiveElements(e, lastActive, replay, inChartArea);
    const positionChanged = this._positionChanged(active, e);
    const changed = replay || !_elementsEqual(active, lastActive) || positionChanged;
    if (changed) {
      this._active = active;
      if (options.enabled || options.external) {
        this._eventPosition = {
          x: e.x,
          y: e.y
        };
        this.update(true, replay);
      }
    }
    return changed;
  }
  _getActiveElements(e, lastActive, replay, inChartArea) {
    const options = this.options;
    if (e.type === "mouseout") {
      return [];
    }
    if (!inChartArea) {
      return lastActive.filter((i) => this.chart.data.datasets[i.datasetIndex] && this.chart.getDatasetMeta(i.datasetIndex).controller.getParsed(i.index) !== void 0);
    }
    const active = this.chart.getElementsAtEventForMode(e, options.mode, options, replay);
    if (options.reverse) {
      active.reverse();
    }
    return active;
  }
  _positionChanged(active, e) {
    const { caretX, caretY, options } = this;
    const position = positioners[options.position].call(this, active, e);
    return position !== false && (caretX !== position.x || caretY !== position.y);
  }
};
__publicField(Tooltip, "positioners", positioners);
var plugin_tooltip = {
  id: "tooltip",
  _element: Tooltip,
  positioners,
  afterInit(chart, _args, options) {
    if (options) {
      chart.tooltip = new Tooltip({
        chart,
        options
      });
    }
  },
  beforeUpdate(chart, _args, options) {
    if (chart.tooltip) {
      chart.tooltip.initialize(options);
    }
  },
  reset(chart, _args, options) {
    if (chart.tooltip) {
      chart.tooltip.initialize(options);
    }
  },
  afterDraw(chart) {
    const tooltip = chart.tooltip;
    if (tooltip && tooltip._willRender()) {
      const args = {
        tooltip
      };
      if (chart.notifyPlugins("beforeTooltipDraw", {
        ...args,
        cancelable: true
      }) === false) {
        return;
      }
      tooltip.draw(chart.ctx);
      chart.notifyPlugins("afterTooltipDraw", args);
    }
  },
  afterEvent(chart, args) {
    if (chart.tooltip) {
      const useFinalPosition = args.replay;
      if (chart.tooltip.handleEvent(args.event, useFinalPosition, args.inChartArea)) {
        args.changed = true;
      }
    }
  },
  defaults: {
    enabled: true,
    external: null,
    position: "average",
    backgroundColor: "rgba(0,0,0,0.8)",
    titleColor: "#fff",
    titleFont: {
      weight: "bold"
    },
    titleSpacing: 2,
    titleMarginBottom: 6,
    titleAlign: "left",
    bodyColor: "#fff",
    bodySpacing: 2,
    bodyFont: {},
    bodyAlign: "left",
    footerColor: "#fff",
    footerSpacing: 2,
    footerMarginTop: 6,
    footerFont: {
      weight: "bold"
    },
    footerAlign: "left",
    padding: 6,
    caretPadding: 2,
    caretSize: 5,
    cornerRadius: 6,
    boxHeight: (ctx, opts) => opts.bodyFont.size,
    boxWidth: (ctx, opts) => opts.bodyFont.size,
    multiKeyBackground: "#fff",
    displayColors: true,
    boxPadding: 0,
    borderColor: "rgba(0,0,0,0)",
    borderWidth: 0,
    animation: {
      duration: 400,
      easing: "easeOutQuart"
    },
    animations: {
      numbers: {
        type: "number",
        properties: [
          "x",
          "y",
          "width",
          "height",
          "caretX",
          "caretY"
        ]
      },
      opacity: {
        easing: "linear",
        duration: 200
      }
    },
    callbacks: defaultCallbacks
  },
  defaultRoutes: {
    bodyFont: "font",
    footerFont: "font",
    titleFont: "font"
  },
  descriptors: {
    _scriptable: (name) => name !== "filter" && name !== "itemSort" && name !== "external",
    _indexable: false,
    callbacks: {
      _scriptable: false,
      _indexable: false
    },
    animation: {
      _fallback: false
    },
    animations: {
      _fallback: "animation"
    }
  },
  additionalOptionScopes: [
    "interaction"
  ]
};
var addIfString = (labels, raw, index, addedLabels) => {
  if (typeof raw === "string") {
    index = labels.push(raw) - 1;
    addedLabels.unshift({
      index,
      label: raw
    });
  } else if (isNaN(raw)) {
    index = null;
  }
  return index;
};
function findOrAddLabel(labels, raw, index, addedLabels) {
  const first = labels.indexOf(raw);
  if (first === -1) {
    return addIfString(labels, raw, index, addedLabels);
  }
  const last = labels.lastIndexOf(raw);
  return first !== last ? index : first;
}
var validIndex = (index, max) => index === null ? null : _limitValue(Math.round(index), 0, max);
function _getLabelForValue(value) {
  const labels = this.getLabels();
  if (value >= 0 && value < labels.length) {
    return labels[value];
  }
  return value;
}
var CategoryScale = class extends Scale {
  constructor(cfg) {
    super(cfg);
    this._startValue = void 0;
    this._valueRange = 0;
    this._addedLabels = [];
  }
  init(scaleOptions) {
    const added = this._addedLabels;
    if (added.length) {
      const labels = this.getLabels();
      for (const { index, label } of added) {
        if (labels[index] === label) {
          labels.splice(index, 1);
        }
      }
      this._addedLabels = [];
    }
    super.init(scaleOptions);
  }
  parse(raw, index) {
    if (isNullOrUndef(raw)) {
      return null;
    }
    const labels = this.getLabels();
    index = isFinite(index) && labels[index] === raw ? index : findOrAddLabel(labels, raw, valueOrDefault(index, raw), this._addedLabels);
    return validIndex(index, labels.length - 1);
  }
  determineDataLimits() {
    const { minDefined, maxDefined } = this.getUserBounds();
    let { min, max } = this.getMinMax(true);
    if (this.options.bounds === "ticks") {
      if (!minDefined) {
        min = 0;
      }
      if (!maxDefined) {
        max = this.getLabels().length - 1;
      }
    }
    this.min = min;
    this.max = max;
  }
  buildTicks() {
    const min = this.min;
    const max = this.max;
    const offset = this.options.offset;
    const ticks = [];
    let labels = this.getLabels();
    labels = min === 0 && max === labels.length - 1 ? labels : labels.slice(min, max + 1);
    this._valueRange = Math.max(labels.length - (offset ? 0 : 1), 1);
    this._startValue = this.min - (offset ? 0.5 : 0);
    for (let value = min; value <= max; value++) {
      ticks.push({
        value
      });
    }
    return ticks;
  }
  getLabelForValue(value) {
    return _getLabelForValue.call(this, value);
  }
  configure() {
    super.configure();
    if (!this.isHorizontal()) {
      this._reversePixels = !this._reversePixels;
    }
  }
  getPixelForValue(value) {
    if (typeof value !== "number") {
      value = this.parse(value);
    }
    return value === null ? NaN : this.getPixelForDecimal((value - this._startValue) / this._valueRange);
  }
  getPixelForTick(index) {
    const ticks = this.ticks;
    if (index < 0 || index > ticks.length - 1) {
      return null;
    }
    return this.getPixelForValue(ticks[index].value);
  }
  getValueForPixel(pixel) {
    return Math.round(this._startValue + this.getDecimalForPixel(pixel) * this._valueRange);
  }
  getBasePixel() {
    return this.bottom;
  }
};
__publicField(CategoryScale, "id", "category");
__publicField(CategoryScale, "defaults", {
  ticks: {
    callback: _getLabelForValue
  }
});
function generateTicks$1(generationOptions, dataRange) {
  const ticks = [];
  const MIN_SPACING = 1e-14;
  const { bounds, step, min, max, precision, count, maxTicks, maxDigits, includeBounds } = generationOptions;
  const unit = step || 1;
  const maxSpaces = maxTicks - 1;
  const { min: rmin, max: rmax } = dataRange;
  const minDefined = !isNullOrUndef(min);
  const maxDefined = !isNullOrUndef(max);
  const countDefined = !isNullOrUndef(count);
  const minSpacing = (rmax - rmin) / (maxDigits + 1);
  let spacing = niceNum((rmax - rmin) / maxSpaces / unit) * unit;
  let factor, niceMin, niceMax, numSpaces;
  if (spacing < MIN_SPACING && !minDefined && !maxDefined) {
    return [
      {
        value: rmin
      },
      {
        value: rmax
      }
    ];
  }
  numSpaces = Math.ceil(rmax / spacing) - Math.floor(rmin / spacing);
  if (numSpaces > maxSpaces) {
    spacing = niceNum(numSpaces * spacing / maxSpaces / unit) * unit;
  }
  if (!isNullOrUndef(precision)) {
    factor = Math.pow(10, precision);
    spacing = Math.ceil(spacing * factor) / factor;
  }
  if (bounds === "ticks") {
    niceMin = Math.floor(rmin / spacing) * spacing;
    niceMax = Math.ceil(rmax / spacing) * spacing;
  } else {
    niceMin = rmin;
    niceMax = rmax;
  }
  if (minDefined && maxDefined && step && almostWhole((max - min) / step, spacing / 1e3)) {
    numSpaces = Math.round(Math.min((max - min) / spacing, maxTicks));
    spacing = (max - min) / numSpaces;
    niceMin = min;
    niceMax = max;
  } else if (countDefined) {
    niceMin = minDefined ? min : niceMin;
    niceMax = maxDefined ? max : niceMax;
    numSpaces = count - 1;
    spacing = (niceMax - niceMin) / numSpaces;
  } else {
    numSpaces = (niceMax - niceMin) / spacing;
    if (almostEquals(numSpaces, Math.round(numSpaces), spacing / 1e3)) {
      numSpaces = Math.round(numSpaces);
    } else {
      numSpaces = Math.ceil(numSpaces);
    }
  }
  const decimalPlaces = Math.max(_decimalPlaces(spacing), _decimalPlaces(niceMin));
  factor = Math.pow(10, isNullOrUndef(precision) ? decimalPlaces : precision);
  niceMin = Math.round(niceMin * factor) / factor;
  niceMax = Math.round(niceMax * factor) / factor;
  let j = 0;
  if (minDefined) {
    if (includeBounds && niceMin !== min) {
      ticks.push({
        value: min
      });
      if (niceMin < min) {
        j++;
      }
      if (almostEquals(Math.round((niceMin + j * spacing) * factor) / factor, min, relativeLabelSize(min, minSpacing, generationOptions))) {
        j++;
      }
    } else if (niceMin < min) {
      j++;
    }
  }
  for (; j < numSpaces; ++j) {
    const tickValue = Math.round((niceMin + j * spacing) * factor) / factor;
    if (maxDefined && tickValue > max) {
      break;
    }
    ticks.push({
      value: tickValue
    });
  }
  if (maxDefined && includeBounds && niceMax !== max) {
    if (ticks.length && almostEquals(ticks[ticks.length - 1].value, max, relativeLabelSize(max, minSpacing, generationOptions))) {
      ticks[ticks.length - 1].value = max;
    } else {
      ticks.push({
        value: max
      });
    }
  } else if (!maxDefined || niceMax === max) {
    ticks.push({
      value: niceMax
    });
  }
  return ticks;
}
function relativeLabelSize(value, minSpacing, { horizontal, minRotation }) {
  const rad = toRadians(minRotation);
  const ratio = (horizontal ? Math.sin(rad) : Math.cos(rad)) || 1e-3;
  const length = 0.75 * minSpacing * ("" + value).length;
  return Math.min(minSpacing / ratio, length);
}
var LinearScaleBase = class extends Scale {
  constructor(cfg) {
    super(cfg);
    this.start = void 0;
    this.end = void 0;
    this._startValue = void 0;
    this._endValue = void 0;
    this._valueRange = 0;
  }
  parse(raw, index) {
    if (isNullOrUndef(raw)) {
      return null;
    }
    if ((typeof raw === "number" || raw instanceof Number) && !isFinite(+raw)) {
      return null;
    }
    return +raw;
  }
  handleTickRangeOptions() {
    const { beginAtZero } = this.options;
    const { minDefined, maxDefined } = this.getUserBounds();
    let { min, max } = this;
    const setMin = (v) => min = minDefined ? min : v;
    const setMax = (v) => max = maxDefined ? max : v;
    if (beginAtZero) {
      const minSign = sign(min);
      const maxSign = sign(max);
      if (minSign < 0 && maxSign < 0) {
        setMax(0);
      } else if (minSign > 0 && maxSign > 0) {
        setMin(0);
      }
    }
    if (min === max) {
      let offset = max === 0 ? 1 : Math.abs(max * 0.05);
      setMax(max + offset);
      if (!beginAtZero) {
        setMin(min - offset);
      }
    }
    this.min = min;
    this.max = max;
  }
  getTickLimit() {
    const tickOpts = this.options.ticks;
    let { maxTicksLimit, stepSize } = tickOpts;
    let maxTicks;
    if (stepSize) {
      maxTicks = Math.ceil(this.max / stepSize) - Math.floor(this.min / stepSize) + 1;
      if (maxTicks > 1e3) {
        console.warn(`scales.${this.id}.ticks.stepSize: ${stepSize} would result generating up to ${maxTicks} ticks. Limiting to 1000.`);
        maxTicks = 1e3;
      }
    } else {
      maxTicks = this.computeTickLimit();
      maxTicksLimit = maxTicksLimit || 11;
    }
    if (maxTicksLimit) {
      maxTicks = Math.min(maxTicksLimit, maxTicks);
    }
    return maxTicks;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const opts = this.options;
    const tickOpts = opts.ticks;
    let maxTicks = this.getTickLimit();
    maxTicks = Math.max(2, maxTicks);
    const numericGeneratorOptions = {
      maxTicks,
      bounds: opts.bounds,
      min: opts.min,
      max: opts.max,
      precision: tickOpts.precision,
      step: tickOpts.stepSize,
      count: tickOpts.count,
      maxDigits: this._maxDigits(),
      horizontal: this.isHorizontal(),
      minRotation: tickOpts.minRotation || 0,
      includeBounds: tickOpts.includeBounds !== false
    };
    const dataRange = this._range || this;
    const ticks = generateTicks$1(numericGeneratorOptions, dataRange);
    if (opts.bounds === "ticks") {
      _setMinAndMaxByKey(ticks, this, "value");
    }
    if (opts.reverse) {
      ticks.reverse();
      this.start = this.max;
      this.end = this.min;
    } else {
      this.start = this.min;
      this.end = this.max;
    }
    return ticks;
  }
  configure() {
    const ticks = this.ticks;
    let start = this.min;
    let end = this.max;
    super.configure();
    if (this.options.offset && ticks.length) {
      const offset = (end - start) / Math.max(ticks.length - 1, 1) / 2;
      start -= offset;
      end += offset;
    }
    this._startValue = start;
    this._endValue = end;
    this._valueRange = end - start;
  }
  getLabelForValue(value) {
    return formatNumber(value, this.chart.options.locale, this.options.ticks.format);
  }
};
var LinearScale = class extends LinearScaleBase {
  determineDataLimits() {
    const { min, max } = this.getMinMax(true);
    this.min = isNumberFinite(min) ? min : 0;
    this.max = isNumberFinite(max) ? max : 1;
    this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const horizontal = this.isHorizontal();
    const length = horizontal ? this.width : this.height;
    const minRotation = toRadians(this.options.ticks.minRotation);
    const ratio = (horizontal ? Math.sin(minRotation) : Math.cos(minRotation)) || 1e-3;
    const tickFont = this._resolveTickFontOptions(0);
    return Math.ceil(length / Math.min(40, tickFont.lineHeight / ratio));
  }
  getPixelForValue(value) {
    return value === null ? NaN : this.getPixelForDecimal((value - this._startValue) / this._valueRange);
  }
  getValueForPixel(pixel) {
    return this._startValue + this.getDecimalForPixel(pixel) * this._valueRange;
  }
};
__publicField(LinearScale, "id", "linear");
__publicField(LinearScale, "defaults", {
  ticks: {
    callback: Ticks.formatters.numeric
  }
});
var log10Floor = (v) => Math.floor(log10(v));
var changeExponent = (v, m) => Math.pow(10, log10Floor(v) + m);
function isMajor(tickVal) {
  const remain = tickVal / Math.pow(10, log10Floor(tickVal));
  return remain === 1;
}
function steps(min, max, rangeExp) {
  const rangeStep = Math.pow(10, rangeExp);
  const start = Math.floor(min / rangeStep);
  const end = Math.ceil(max / rangeStep);
  return end - start;
}
function startExp(min, max) {
  const range = max - min;
  let rangeExp = log10Floor(range);
  while (steps(min, max, rangeExp) > 10) {
    rangeExp++;
  }
  while (steps(min, max, rangeExp) < 10) {
    rangeExp--;
  }
  return Math.min(rangeExp, log10Floor(min));
}
function generateTicks(generationOptions, { min, max }) {
  min = finiteOrDefault(generationOptions.min, min);
  const ticks = [];
  const minExp = log10Floor(min);
  let exp = startExp(min, max);
  let precision = exp < 0 ? Math.pow(10, Math.abs(exp)) : 1;
  const stepSize = Math.pow(10, exp);
  const base = minExp > exp ? Math.pow(10, minExp) : 0;
  const start = Math.round((min - base) * precision) / precision;
  const offset = Math.floor((min - base) / stepSize / 10) * stepSize * 10;
  let significand = Math.floor((start - offset) / Math.pow(10, exp));
  let value = finiteOrDefault(generationOptions.min, Math.round((base + offset + significand * Math.pow(10, exp)) * precision) / precision);
  while (value < max) {
    ticks.push({
      value,
      major: isMajor(value),
      significand
    });
    if (significand >= 10) {
      significand = significand < 15 ? 15 : 20;
    } else {
      significand++;
    }
    if (significand >= 20) {
      exp++;
      significand = 2;
      precision = exp >= 0 ? 1 : precision;
    }
    value = Math.round((base + offset + significand * Math.pow(10, exp)) * precision) / precision;
  }
  const lastTick = finiteOrDefault(generationOptions.max, value);
  ticks.push({
    value: lastTick,
    major: isMajor(lastTick),
    significand
  });
  return ticks;
}
var LogarithmicScale = class extends Scale {
  constructor(cfg) {
    super(cfg);
    this.start = void 0;
    this.end = void 0;
    this._startValue = void 0;
    this._valueRange = 0;
  }
  parse(raw, index) {
    const value = LinearScaleBase.prototype.parse.apply(this, [
      raw,
      index
    ]);
    if (value === 0) {
      this._zero = true;
      return void 0;
    }
    return isNumberFinite(value) && value > 0 ? value : null;
  }
  determineDataLimits() {
    const { min, max } = this.getMinMax(true);
    this.min = isNumberFinite(min) ? Math.max(0, min) : null;
    this.max = isNumberFinite(max) ? Math.max(0, max) : null;
    if (this.options.beginAtZero) {
      this._zero = true;
    }
    if (this._zero && this.min !== this._suggestedMin && !isNumberFinite(this._userMin)) {
      this.min = min === changeExponent(this.min, 0) ? changeExponent(this.min, -1) : changeExponent(this.min, 0);
    }
    this.handleTickRangeOptions();
  }
  handleTickRangeOptions() {
    const { minDefined, maxDefined } = this.getUserBounds();
    let min = this.min;
    let max = this.max;
    const setMin = (v) => min = minDefined ? min : v;
    const setMax = (v) => max = maxDefined ? max : v;
    if (min === max) {
      if (min <= 0) {
        setMin(1);
        setMax(10);
      } else {
        setMin(changeExponent(min, -1));
        setMax(changeExponent(max, 1));
      }
    }
    if (min <= 0) {
      setMin(changeExponent(max, -1));
    }
    if (max <= 0) {
      setMax(changeExponent(min, 1));
    }
    this.min = min;
    this.max = max;
  }
  buildTicks() {
    const opts = this.options;
    const generationOptions = {
      min: this._userMin,
      max: this._userMax
    };
    const ticks = generateTicks(generationOptions, this);
    if (opts.bounds === "ticks") {
      _setMinAndMaxByKey(ticks, this, "value");
    }
    if (opts.reverse) {
      ticks.reverse();
      this.start = this.max;
      this.end = this.min;
    } else {
      this.start = this.min;
      this.end = this.max;
    }
    return ticks;
  }
  getLabelForValue(value) {
    return value === void 0 ? "0" : formatNumber(value, this.chart.options.locale, this.options.ticks.format);
  }
  configure() {
    const start = this.min;
    super.configure();
    this._startValue = log10(start);
    this._valueRange = log10(this.max) - log10(start);
  }
  getPixelForValue(value) {
    if (value === void 0 || value === 0) {
      value = this.min;
    }
    if (value === null || isNaN(value)) {
      return NaN;
    }
    return this.getPixelForDecimal(value === this.min ? 0 : (log10(value) - this._startValue) / this._valueRange);
  }
  getValueForPixel(pixel) {
    const decimal = this.getDecimalForPixel(pixel);
    return Math.pow(10, this._startValue + decimal * this._valueRange);
  }
};
__publicField(LogarithmicScale, "id", "logarithmic");
__publicField(LogarithmicScale, "defaults", {
  ticks: {
    callback: Ticks.formatters.logarithmic,
    major: {
      enabled: true
    }
  }
});
function getTickBackdropHeight(opts) {
  const tickOpts = opts.ticks;
  if (tickOpts.display && opts.display) {
    const padding = toPadding(tickOpts.backdropPadding);
    return valueOrDefault(tickOpts.font && tickOpts.font.size, defaults.font.size) + padding.height;
  }
  return 0;
}
function measureLabelSize(ctx, font, label) {
  label = isArray(label) ? label : [
    label
  ];
  return {
    w: _longestText(ctx, font.string, label),
    h: label.length * font.lineHeight
  };
}
function determineLimits(angle, pos, size, min, max) {
  if (angle === min || angle === max) {
    return {
      start: pos - size / 2,
      end: pos + size / 2
    };
  } else if (angle < min || angle > max) {
    return {
      start: pos - size,
      end: pos
    };
  }
  return {
    start: pos,
    end: pos + size
  };
}
function fitWithPointLabels(scale) {
  const orig = {
    l: scale.left + scale._padding.left,
    r: scale.right - scale._padding.right,
    t: scale.top + scale._padding.top,
    b: scale.bottom - scale._padding.bottom
  };
  const limits = Object.assign({}, orig);
  const labelSizes = [];
  const padding = [];
  const valueCount = scale._pointLabels.length;
  const pointLabelOpts = scale.options.pointLabels;
  const additionalAngle = pointLabelOpts.centerPointLabels ? PI / valueCount : 0;
  for (let i = 0; i < valueCount; i++) {
    const opts = pointLabelOpts.setContext(scale.getPointLabelContext(i));
    padding[i] = opts.padding;
    const pointPosition = scale.getPointPosition(i, scale.drawingArea + padding[i], additionalAngle);
    const plFont = toFont(opts.font);
    const textSize = measureLabelSize(scale.ctx, plFont, scale._pointLabels[i]);
    labelSizes[i] = textSize;
    const angleRadians = _normalizeAngle(scale.getIndexAngle(i) + additionalAngle);
    const angle = Math.round(toDegrees(angleRadians));
    const hLimits = determineLimits(angle, pointPosition.x, textSize.w, 0, 180);
    const vLimits = determineLimits(angle, pointPosition.y, textSize.h, 90, 270);
    updateLimits(limits, orig, angleRadians, hLimits, vLimits);
  }
  scale.setCenterPoint(orig.l - limits.l, limits.r - orig.r, orig.t - limits.t, limits.b - orig.b);
  scale._pointLabelItems = buildPointLabelItems(scale, labelSizes, padding);
}
function updateLimits(limits, orig, angle, hLimits, vLimits) {
  const sin = Math.abs(Math.sin(angle));
  const cos = Math.abs(Math.cos(angle));
  let x = 0;
  let y = 0;
  if (hLimits.start < orig.l) {
    x = (orig.l - hLimits.start) / sin;
    limits.l = Math.min(limits.l, orig.l - x);
  } else if (hLimits.end > orig.r) {
    x = (hLimits.end - orig.r) / sin;
    limits.r = Math.max(limits.r, orig.r + x);
  }
  if (vLimits.start < orig.t) {
    y = (orig.t - vLimits.start) / cos;
    limits.t = Math.min(limits.t, orig.t - y);
  } else if (vLimits.end > orig.b) {
    y = (vLimits.end - orig.b) / cos;
    limits.b = Math.max(limits.b, orig.b + y);
  }
}
function createPointLabelItem(scale, index, itemOpts) {
  const outerDistance = scale.drawingArea;
  const { extra, additionalAngle, padding, size } = itemOpts;
  const pointLabelPosition = scale.getPointPosition(index, outerDistance + extra + padding, additionalAngle);
  const angle = Math.round(toDegrees(_normalizeAngle(pointLabelPosition.angle + HALF_PI)));
  const y = yForAngle(pointLabelPosition.y, size.h, angle);
  const textAlign = getTextAlignForAngle(angle);
  const left = leftForTextAlign(pointLabelPosition.x, size.w, textAlign);
  return {
    visible: true,
    x: pointLabelPosition.x,
    y,
    textAlign,
    left,
    top: y,
    right: left + size.w,
    bottom: y + size.h
  };
}
function isNotOverlapped(item, area) {
  if (!area) {
    return true;
  }
  const { left, top, right, bottom } = item;
  const apexesInArea = _isPointInArea({
    x: left,
    y: top
  }, area) || _isPointInArea({
    x: left,
    y: bottom
  }, area) || _isPointInArea({
    x: right,
    y: top
  }, area) || _isPointInArea({
    x: right,
    y: bottom
  }, area);
  return !apexesInArea;
}
function buildPointLabelItems(scale, labelSizes, padding) {
  const items = [];
  const valueCount = scale._pointLabels.length;
  const opts = scale.options;
  const { centerPointLabels, display } = opts.pointLabels;
  const itemOpts = {
    extra: getTickBackdropHeight(opts) / 2,
    additionalAngle: centerPointLabels ? PI / valueCount : 0
  };
  let area;
  for (let i = 0; i < valueCount; i++) {
    itemOpts.padding = padding[i];
    itemOpts.size = labelSizes[i];
    const item = createPointLabelItem(scale, i, itemOpts);
    items.push(item);
    if (display === "auto") {
      item.visible = isNotOverlapped(item, area);
      if (item.visible) {
        area = item;
      }
    }
  }
  return items;
}
function getTextAlignForAngle(angle) {
  if (angle === 0 || angle === 180) {
    return "center";
  } else if (angle < 180) {
    return "left";
  }
  return "right";
}
function leftForTextAlign(x, w, align) {
  if (align === "right") {
    x -= w;
  } else if (align === "center") {
    x -= w / 2;
  }
  return x;
}
function yForAngle(y, h4, angle) {
  if (angle === 90 || angle === 270) {
    y -= h4 / 2;
  } else if (angle > 270 || angle < 90) {
    y -= h4;
  }
  return y;
}
function drawPointLabelBox(ctx, opts, item) {
  const { left, top, right, bottom } = item;
  const { backdropColor } = opts;
  if (!isNullOrUndef(backdropColor)) {
    const borderRadius = toTRBLCorners(opts.borderRadius);
    const padding = toPadding(opts.backdropPadding);
    ctx.fillStyle = backdropColor;
    const backdropLeft = left - padding.left;
    const backdropTop = top - padding.top;
    const backdropWidth = right - left + padding.width;
    const backdropHeight = bottom - top + padding.height;
    if (Object.values(borderRadius).some((v) => v !== 0)) {
      ctx.beginPath();
      addRoundedRectPath(ctx, {
        x: backdropLeft,
        y: backdropTop,
        w: backdropWidth,
        h: backdropHeight,
        radius: borderRadius
      });
      ctx.fill();
    } else {
      ctx.fillRect(backdropLeft, backdropTop, backdropWidth, backdropHeight);
    }
  }
}
function drawPointLabels(scale, labelCount) {
  const { ctx, options: { pointLabels } } = scale;
  for (let i = labelCount - 1; i >= 0; i--) {
    const item = scale._pointLabelItems[i];
    if (!item.visible) {
      continue;
    }
    const optsAtIndex = pointLabels.setContext(scale.getPointLabelContext(i));
    drawPointLabelBox(ctx, optsAtIndex, item);
    const plFont = toFont(optsAtIndex.font);
    const { x, y, textAlign } = item;
    renderText(ctx, scale._pointLabels[i], x, y + plFont.lineHeight / 2, plFont, {
      color: optsAtIndex.color,
      textAlign,
      textBaseline: "middle"
    });
  }
}
function pathRadiusLine(scale, radius, circular, labelCount) {
  const { ctx } = scale;
  if (circular) {
    ctx.arc(scale.xCenter, scale.yCenter, radius, 0, TAU);
  } else {
    let pointPosition = scale.getPointPosition(0, radius);
    ctx.moveTo(pointPosition.x, pointPosition.y);
    for (let i = 1; i < labelCount; i++) {
      pointPosition = scale.getPointPosition(i, radius);
      ctx.lineTo(pointPosition.x, pointPosition.y);
    }
  }
}
function drawRadiusLine(scale, gridLineOpts, radius, labelCount, borderOpts) {
  const ctx = scale.ctx;
  const circular = gridLineOpts.circular;
  const { color: color2, lineWidth } = gridLineOpts;
  if (!circular && !labelCount || !color2 || !lineWidth || radius < 0) {
    return;
  }
  ctx.save();
  ctx.strokeStyle = color2;
  ctx.lineWidth = lineWidth;
  ctx.setLineDash(borderOpts.dash);
  ctx.lineDashOffset = borderOpts.dashOffset;
  ctx.beginPath();
  pathRadiusLine(scale, radius, circular, labelCount);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}
function createPointLabelContext(parent, index, label) {
  return createContext(parent, {
    label,
    index,
    type: "pointLabel"
  });
}
var RadialLinearScale = class extends LinearScaleBase {
  constructor(cfg) {
    super(cfg);
    this.xCenter = void 0;
    this.yCenter = void 0;
    this.drawingArea = void 0;
    this._pointLabels = [];
    this._pointLabelItems = [];
  }
  setDimensions() {
    const padding = this._padding = toPadding(getTickBackdropHeight(this.options) / 2);
    const w = this.width = this.maxWidth - padding.width;
    const h4 = this.height = this.maxHeight - padding.height;
    this.xCenter = Math.floor(this.left + w / 2 + padding.left);
    this.yCenter = Math.floor(this.top + h4 / 2 + padding.top);
    this.drawingArea = Math.floor(Math.min(w, h4) / 2);
  }
  determineDataLimits() {
    const { min, max } = this.getMinMax(false);
    this.min = isNumberFinite(min) && !isNaN(min) ? min : 0;
    this.max = isNumberFinite(max) && !isNaN(max) ? max : 0;
    this.handleTickRangeOptions();
  }
  computeTickLimit() {
    return Math.ceil(this.drawingArea / getTickBackdropHeight(this.options));
  }
  generateTickLabels(ticks) {
    LinearScaleBase.prototype.generateTickLabels.call(this, ticks);
    this._pointLabels = this.getLabels().map((value, index) => {
      const label = callback(this.options.pointLabels.callback, [
        value,
        index
      ], this);
      return label || label === 0 ? label : "";
    }).filter((v, i) => this.chart.getDataVisibility(i));
  }
  fit() {
    const opts = this.options;
    if (opts.display && opts.pointLabels.display) {
      fitWithPointLabels(this);
    } else {
      this.setCenterPoint(0, 0, 0, 0);
    }
  }
  setCenterPoint(leftMovement, rightMovement, topMovement, bottomMovement) {
    this.xCenter += Math.floor((leftMovement - rightMovement) / 2);
    this.yCenter += Math.floor((topMovement - bottomMovement) / 2);
    this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(leftMovement, rightMovement, topMovement, bottomMovement));
  }
  getIndexAngle(index) {
    const angleMultiplier = TAU / (this._pointLabels.length || 1);
    const startAngle = this.options.startAngle || 0;
    return _normalizeAngle(index * angleMultiplier + toRadians(startAngle));
  }
  getDistanceFromCenterForValue(value) {
    if (isNullOrUndef(value)) {
      return NaN;
    }
    const scalingFactor = this.drawingArea / (this.max - this.min);
    if (this.options.reverse) {
      return (this.max - value) * scalingFactor;
    }
    return (value - this.min) * scalingFactor;
  }
  getValueForDistanceFromCenter(distance) {
    if (isNullOrUndef(distance)) {
      return NaN;
    }
    const scaledDistance = distance / (this.drawingArea / (this.max - this.min));
    return this.options.reverse ? this.max - scaledDistance : this.min + scaledDistance;
  }
  getPointLabelContext(index) {
    const pointLabels = this._pointLabels || [];
    if (index >= 0 && index < pointLabels.length) {
      const pointLabel = pointLabels[index];
      return createPointLabelContext(this.getContext(), index, pointLabel);
    }
  }
  getPointPosition(index, distanceFromCenter, additionalAngle = 0) {
    const angle = this.getIndexAngle(index) - HALF_PI + additionalAngle;
    return {
      x: Math.cos(angle) * distanceFromCenter + this.xCenter,
      y: Math.sin(angle) * distanceFromCenter + this.yCenter,
      angle
    };
  }
  getPointPositionForValue(index, value) {
    return this.getPointPosition(index, this.getDistanceFromCenterForValue(value));
  }
  getBasePosition(index) {
    return this.getPointPositionForValue(index || 0, this.getBaseValue());
  }
  getPointLabelPosition(index) {
    const { left, top, right, bottom } = this._pointLabelItems[index];
    return {
      left,
      top,
      right,
      bottom
    };
  }
  drawBackground() {
    const { backgroundColor, grid: { circular } } = this.options;
    if (backgroundColor) {
      const ctx = this.ctx;
      ctx.save();
      ctx.beginPath();
      pathRadiusLine(this, this.getDistanceFromCenterForValue(this._endValue), circular, this._pointLabels.length);
      ctx.closePath();
      ctx.fillStyle = backgroundColor;
      ctx.fill();
      ctx.restore();
    }
  }
  drawGrid() {
    const ctx = this.ctx;
    const opts = this.options;
    const { angleLines, grid, border } = opts;
    const labelCount = this._pointLabels.length;
    let i, offset, position;
    if (opts.pointLabels.display) {
      drawPointLabels(this, labelCount);
    }
    if (grid.display) {
      this.ticks.forEach((tick, index) => {
        if (index !== 0) {
          offset = this.getDistanceFromCenterForValue(tick.value);
          const context = this.getContext(index);
          const optsAtIndex = grid.setContext(context);
          const optsAtIndexBorder = border.setContext(context);
          drawRadiusLine(this, optsAtIndex, offset, labelCount, optsAtIndexBorder);
        }
      });
    }
    if (angleLines.display) {
      ctx.save();
      for (i = labelCount - 1; i >= 0; i--) {
        const optsAtIndex = angleLines.setContext(this.getPointLabelContext(i));
        const { color: color2, lineWidth } = optsAtIndex;
        if (!lineWidth || !color2) {
          continue;
        }
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color2;
        ctx.setLineDash(optsAtIndex.borderDash);
        ctx.lineDashOffset = optsAtIndex.borderDashOffset;
        offset = this.getDistanceFromCenterForValue(opts.ticks.reverse ? this.min : this.max);
        position = this.getPointPosition(i, offset);
        ctx.beginPath();
        ctx.moveTo(this.xCenter, this.yCenter);
        ctx.lineTo(position.x, position.y);
        ctx.stroke();
      }
      ctx.restore();
    }
  }
  drawBorder() {
  }
  drawLabels() {
    const ctx = this.ctx;
    const opts = this.options;
    const tickOpts = opts.ticks;
    if (!tickOpts.display) {
      return;
    }
    const startAngle = this.getIndexAngle(0);
    let offset, width;
    ctx.save();
    ctx.translate(this.xCenter, this.yCenter);
    ctx.rotate(startAngle);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    this.ticks.forEach((tick, index) => {
      if (index === 0 && !opts.reverse) {
        return;
      }
      const optsAtIndex = tickOpts.setContext(this.getContext(index));
      const tickFont = toFont(optsAtIndex.font);
      offset = this.getDistanceFromCenterForValue(this.ticks[index].value);
      if (optsAtIndex.showLabelBackdrop) {
        ctx.font = tickFont.string;
        width = ctx.measureText(tick.label).width;
        ctx.fillStyle = optsAtIndex.backdropColor;
        const padding = toPadding(optsAtIndex.backdropPadding);
        ctx.fillRect(-width / 2 - padding.left, -offset - tickFont.size / 2 - padding.top, width + padding.width, tickFont.size + padding.height);
      }
      renderText(ctx, tick.label, 0, -offset, tickFont, {
        color: optsAtIndex.color,
        strokeColor: optsAtIndex.textStrokeColor,
        strokeWidth: optsAtIndex.textStrokeWidth
      });
    });
    ctx.restore();
  }
  drawTitle() {
  }
};
__publicField(RadialLinearScale, "id", "radialLinear");
__publicField(RadialLinearScale, "defaults", {
  display: true,
  animate: true,
  position: "chartArea",
  angleLines: {
    display: true,
    lineWidth: 1,
    borderDash: [],
    borderDashOffset: 0
  },
  grid: {
    circular: false
  },
  startAngle: 0,
  ticks: {
    showLabelBackdrop: true,
    callback: Ticks.formatters.numeric
  },
  pointLabels: {
    backdropColor: void 0,
    backdropPadding: 2,
    display: true,
    font: {
      size: 10
    },
    callback(label) {
      return label;
    },
    padding: 5,
    centerPointLabels: false
  }
});
__publicField(RadialLinearScale, "defaultRoutes", {
  "angleLines.color": "borderColor",
  "pointLabels.color": "color",
  "ticks.color": "color"
});
__publicField(RadialLinearScale, "descriptors", {
  angleLines: {
    _fallback: "grid"
  }
});
var INTERVALS = {
  millisecond: {
    common: true,
    size: 1,
    steps: 1e3
  },
  second: {
    common: true,
    size: 1e3,
    steps: 60
  },
  minute: {
    common: true,
    size: 6e4,
    steps: 60
  },
  hour: {
    common: true,
    size: 36e5,
    steps: 24
  },
  day: {
    common: true,
    size: 864e5,
    steps: 30
  },
  week: {
    common: false,
    size: 6048e5,
    steps: 4
  },
  month: {
    common: true,
    size: 2628e6,
    steps: 12
  },
  quarter: {
    common: false,
    size: 7884e6,
    steps: 4
  },
  year: {
    common: true,
    size: 3154e7
  }
};
var UNITS = /* @__PURE__ */ Object.keys(INTERVALS);
function sorter(a, b) {
  return a - b;
}
function parse(scale, input) {
  if (isNullOrUndef(input)) {
    return null;
  }
  const adapter = scale._adapter;
  const { parser, round: round2, isoWeekday } = scale._parseOpts;
  let value = input;
  if (typeof parser === "function") {
    value = parser(value);
  }
  if (!isNumberFinite(value)) {
    value = typeof parser === "string" ? adapter.parse(value, parser) : adapter.parse(value);
  }
  if (value === null) {
    return null;
  }
  if (round2) {
    value = round2 === "week" && (isNumber(isoWeekday) || isoWeekday === true) ? adapter.startOf(value, "isoWeek", isoWeekday) : adapter.startOf(value, round2);
  }
  return +value;
}
function determineUnitForAutoTicks(minUnit, min, max, capacity) {
  const ilen = UNITS.length;
  for (let i = UNITS.indexOf(minUnit); i < ilen - 1; ++i) {
    const interval = INTERVALS[UNITS[i]];
    const factor = interval.steps ? interval.steps : Number.MAX_SAFE_INTEGER;
    if (interval.common && Math.ceil((max - min) / (factor * interval.size)) <= capacity) {
      return UNITS[i];
    }
  }
  return UNITS[ilen - 1];
}
function determineUnitForFormatting(scale, numTicks, minUnit, min, max) {
  for (let i = UNITS.length - 1; i >= UNITS.indexOf(minUnit); i--) {
    const unit = UNITS[i];
    if (INTERVALS[unit].common && scale._adapter.diff(max, min, unit) >= numTicks - 1) {
      return unit;
    }
  }
  return UNITS[minUnit ? UNITS.indexOf(minUnit) : 0];
}
function determineMajorUnit(unit) {
  for (let i = UNITS.indexOf(unit) + 1, ilen = UNITS.length; i < ilen; ++i) {
    if (INTERVALS[UNITS[i]].common) {
      return UNITS[i];
    }
  }
}
function addTick(ticks, time, timestamps) {
  if (!timestamps) {
    ticks[time] = true;
  } else if (timestamps.length) {
    const { lo, hi } = _lookup(timestamps, time);
    const timestamp = timestamps[lo] >= time ? timestamps[lo] : timestamps[hi];
    ticks[timestamp] = true;
  }
}
function setMajorTicks(scale, ticks, map3, majorUnit) {
  const adapter = scale._adapter;
  const first = +adapter.startOf(ticks[0].value, majorUnit);
  const last = ticks[ticks.length - 1].value;
  let major, index;
  for (major = first; major <= last; major = +adapter.add(major, 1, majorUnit)) {
    index = map3[major];
    if (index >= 0) {
      ticks[index].major = true;
    }
  }
  return ticks;
}
function ticksFromTimestamps(scale, values, majorUnit) {
  const ticks = [];
  const map3 = {};
  const ilen = values.length;
  let i, value;
  for (i = 0; i < ilen; ++i) {
    value = values[i];
    map3[value] = i;
    ticks.push({
      value,
      major: false
    });
  }
  return ilen === 0 || !majorUnit ? ticks : setMajorTicks(scale, ticks, map3, majorUnit);
}
var TimeScale = class extends Scale {
  constructor(props) {
    super(props);
    this._cache = {
      data: [],
      labels: [],
      all: []
    };
    this._unit = "day";
    this._majorUnit = void 0;
    this._offsets = {};
    this._normalized = false;
    this._parseOpts = void 0;
  }
  init(scaleOpts, opts = {}) {
    const time = scaleOpts.time || (scaleOpts.time = {});
    const adapter = this._adapter = new adapters._date(scaleOpts.adapters.date);
    adapter.init(opts);
    mergeIf(time.displayFormats, adapter.formats());
    this._parseOpts = {
      parser: time.parser,
      round: time.round,
      isoWeekday: time.isoWeekday
    };
    super.init(scaleOpts);
    this._normalized = opts.normalized;
  }
  parse(raw, index) {
    if (raw === void 0) {
      return null;
    }
    return parse(this, raw);
  }
  beforeLayout() {
    super.beforeLayout();
    this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const options = this.options;
    const adapter = this._adapter;
    const unit = options.time.unit || "day";
    let { min, max, minDefined, maxDefined } = this.getUserBounds();
    function _applyBounds(bounds) {
      if (!minDefined && !isNaN(bounds.min)) {
        min = Math.min(min, bounds.min);
      }
      if (!maxDefined && !isNaN(bounds.max)) {
        max = Math.max(max, bounds.max);
      }
    }
    if (!minDefined || !maxDefined) {
      _applyBounds(this._getLabelBounds());
      if (options.bounds !== "ticks" || options.ticks.source !== "labels") {
        _applyBounds(this.getMinMax(false));
      }
    }
    min = isNumberFinite(min) && !isNaN(min) ? min : +adapter.startOf(Date.now(), unit);
    max = isNumberFinite(max) && !isNaN(max) ? max : +adapter.endOf(Date.now(), unit) + 1;
    this.min = Math.min(min, max - 1);
    this.max = Math.max(min + 1, max);
  }
  _getLabelBounds() {
    const arr = this.getLabelTimestamps();
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;
    if (arr.length) {
      min = arr[0];
      max = arr[arr.length - 1];
    }
    return {
      min,
      max
    };
  }
  buildTicks() {
    const options = this.options;
    const timeOpts = options.time;
    const tickOpts = options.ticks;
    const timestamps = tickOpts.source === "labels" ? this.getLabelTimestamps() : this._generate();
    if (options.bounds === "ticks" && timestamps.length) {
      this.min = this._userMin || timestamps[0];
      this.max = this._userMax || timestamps[timestamps.length - 1];
    }
    const min = this.min;
    const max = this.max;
    const ticks = _filterBetween(timestamps, min, max);
    this._unit = timeOpts.unit || (tickOpts.autoSkip ? determineUnitForAutoTicks(timeOpts.minUnit, this.min, this.max, this._getLabelCapacity(min)) : determineUnitForFormatting(this, ticks.length, timeOpts.minUnit, this.min, this.max));
    this._majorUnit = !tickOpts.major.enabled || this._unit === "year" ? void 0 : determineMajorUnit(this._unit);
    this.initOffsets(timestamps);
    if (options.reverse) {
      ticks.reverse();
    }
    return ticksFromTimestamps(this, ticks, this._majorUnit);
  }
  afterAutoSkip() {
    if (this.options.offsetAfterAutoskip) {
      this.initOffsets(this.ticks.map((tick) => +tick.value));
    }
  }
  initOffsets(timestamps = []) {
    let start = 0;
    let end = 0;
    let first, last;
    if (this.options.offset && timestamps.length) {
      first = this.getDecimalForValue(timestamps[0]);
      if (timestamps.length === 1) {
        start = 1 - first;
      } else {
        start = (this.getDecimalForValue(timestamps[1]) - first) / 2;
      }
      last = this.getDecimalForValue(timestamps[timestamps.length - 1]);
      if (timestamps.length === 1) {
        end = last;
      } else {
        end = (last - this.getDecimalForValue(timestamps[timestamps.length - 2])) / 2;
      }
    }
    const limit = timestamps.length < 3 ? 0.5 : 0.25;
    start = _limitValue(start, 0, limit);
    end = _limitValue(end, 0, limit);
    this._offsets = {
      start,
      end,
      factor: 1 / (start + 1 + end)
    };
  }
  _generate() {
    const adapter = this._adapter;
    const min = this.min;
    const max = this.max;
    const options = this.options;
    const timeOpts = options.time;
    const minor = timeOpts.unit || determineUnitForAutoTicks(timeOpts.minUnit, min, max, this._getLabelCapacity(min));
    const stepSize = valueOrDefault(options.ticks.stepSize, 1);
    const weekday = minor === "week" ? timeOpts.isoWeekday : false;
    const hasWeekday = isNumber(weekday) || weekday === true;
    const ticks = {};
    let first = min;
    let time, count;
    if (hasWeekday) {
      first = +adapter.startOf(first, "isoWeek", weekday);
    }
    first = +adapter.startOf(first, hasWeekday ? "day" : minor);
    if (adapter.diff(max, min, minor) > 1e5 * stepSize) {
      throw new Error(min + " and " + max + " are too far apart with stepSize of " + stepSize + " " + minor);
    }
    const timestamps = options.ticks.source === "data" && this.getDataTimestamps();
    for (time = first, count = 0; time < max; time = +adapter.add(time, stepSize, minor), count++) {
      addTick(ticks, time, timestamps);
    }
    if (time === max || options.bounds === "ticks" || count === 1) {
      addTick(ticks, time, timestamps);
    }
    return Object.keys(ticks).sort(sorter).map((x) => +x);
  }
  getLabelForValue(value) {
    const adapter = this._adapter;
    const timeOpts = this.options.time;
    if (timeOpts.tooltipFormat) {
      return adapter.format(value, timeOpts.tooltipFormat);
    }
    return adapter.format(value, timeOpts.displayFormats.datetime);
  }
  format(value, format) {
    const options = this.options;
    const formats = options.time.displayFormats;
    const unit = this._unit;
    const fmt = format || formats[unit];
    return this._adapter.format(value, fmt);
  }
  _tickFormatFunction(time, index, ticks, format) {
    const options = this.options;
    const formatter = options.ticks.callback;
    if (formatter) {
      return callback(formatter, [
        time,
        index,
        ticks
      ], this);
    }
    const formats = options.time.displayFormats;
    const unit = this._unit;
    const majorUnit = this._majorUnit;
    const minorFormat = unit && formats[unit];
    const majorFormat = majorUnit && formats[majorUnit];
    const tick = ticks[index];
    const major = majorUnit && majorFormat && tick && tick.major;
    return this._adapter.format(time, format || (major ? majorFormat : minorFormat));
  }
  generateTickLabels(ticks) {
    let i, ilen, tick;
    for (i = 0, ilen = ticks.length; i < ilen; ++i) {
      tick = ticks[i];
      tick.label = this._tickFormatFunction(tick.value, i, ticks);
    }
  }
  getDecimalForValue(value) {
    return value === null ? NaN : (value - this.min) / (this.max - this.min);
  }
  getPixelForValue(value) {
    const offsets = this._offsets;
    const pos = this.getDecimalForValue(value);
    return this.getPixelForDecimal((offsets.start + pos) * offsets.factor);
  }
  getValueForPixel(pixel) {
    const offsets = this._offsets;
    const pos = this.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
    return this.min + pos * (this.max - this.min);
  }
  _getLabelSize(label) {
    const ticksOpts = this.options.ticks;
    const tickLabelWidth = this.ctx.measureText(label).width;
    const angle = toRadians(this.isHorizontal() ? ticksOpts.maxRotation : ticksOpts.minRotation);
    const cosRotation = Math.cos(angle);
    const sinRotation = Math.sin(angle);
    const tickFontSize = this._resolveTickFontOptions(0).size;
    return {
      w: tickLabelWidth * cosRotation + tickFontSize * sinRotation,
      h: tickLabelWidth * sinRotation + tickFontSize * cosRotation
    };
  }
  _getLabelCapacity(exampleTime) {
    const timeOpts = this.options.time;
    const displayFormats = timeOpts.displayFormats;
    const format = displayFormats[timeOpts.unit] || displayFormats.millisecond;
    const exampleLabel = this._tickFormatFunction(exampleTime, 0, ticksFromTimestamps(this, [
      exampleTime
    ], this._majorUnit), format);
    const size = this._getLabelSize(exampleLabel);
    const capacity = Math.floor(this.isHorizontal() ? this.width / size.w : this.height / size.h) - 1;
    return capacity > 0 ? capacity : 1;
  }
  getDataTimestamps() {
    let timestamps = this._cache.data || [];
    let i, ilen;
    if (timestamps.length) {
      return timestamps;
    }
    const metas = this.getMatchingVisibleMetas();
    if (this._normalized && metas.length) {
      return this._cache.data = metas[0].controller.getAllParsedValues(this);
    }
    for (i = 0, ilen = metas.length; i < ilen; ++i) {
      timestamps = timestamps.concat(metas[i].controller.getAllParsedValues(this));
    }
    return this._cache.data = this.normalize(timestamps);
  }
  getLabelTimestamps() {
    const timestamps = this._cache.labels || [];
    let i, ilen;
    if (timestamps.length) {
      return timestamps;
    }
    const labels = this.getLabels();
    for (i = 0, ilen = labels.length; i < ilen; ++i) {
      timestamps.push(parse(this, labels[i]));
    }
    return this._cache.labels = this._normalized ? timestamps : this.normalize(timestamps);
  }
  normalize(values) {
    return _arrayUnique(values.sort(sorter));
  }
};
__publicField(TimeScale, "id", "time");
__publicField(TimeScale, "defaults", {
  bounds: "data",
  adapters: {},
  time: {
    parser: false,
    unit: false,
    round: false,
    isoWeekday: false,
    minUnit: "millisecond",
    displayFormats: {}
  },
  ticks: {
    source: "auto",
    callback: false,
    major: {
      enabled: false
    }
  }
});
function interpolate3(table, val, reverse) {
  let lo = 0;
  let hi = table.length - 1;
  let prevSource, nextSource, prevTarget, nextTarget;
  if (reverse) {
    if (val >= table[lo].pos && val <= table[hi].pos) {
      ({ lo, hi } = _lookupByKey(table, "pos", val));
    }
    ({ pos: prevSource, time: prevTarget } = table[lo]);
    ({ pos: nextSource, time: nextTarget } = table[hi]);
  } else {
    if (val >= table[lo].time && val <= table[hi].time) {
      ({ lo, hi } = _lookupByKey(table, "time", val));
    }
    ({ time: prevSource, pos: prevTarget } = table[lo]);
    ({ time: nextSource, pos: nextTarget } = table[hi]);
  }
  const span = nextSource - prevSource;
  return span ? prevTarget + (nextTarget - prevTarget) * (val - prevSource) / span : prevTarget;
}
var TimeSeriesScale = class extends TimeScale {
  constructor(props) {
    super(props);
    this._table = [];
    this._minPos = void 0;
    this._tableRange = void 0;
  }
  initOffsets() {
    const timestamps = this._getTimestampsForTable();
    const table = this._table = this.buildLookupTable(timestamps);
    this._minPos = interpolate3(table, this.min);
    this._tableRange = interpolate3(table, this.max) - this._minPos;
    super.initOffsets(timestamps);
  }
  buildLookupTable(timestamps) {
    const { min, max } = this;
    const items = [];
    const table = [];
    let i, ilen, prev, curr, next;
    for (i = 0, ilen = timestamps.length; i < ilen; ++i) {
      curr = timestamps[i];
      if (curr >= min && curr <= max) {
        items.push(curr);
      }
    }
    if (items.length < 2) {
      return [
        {
          time: min,
          pos: 0
        },
        {
          time: max,
          pos: 1
        }
      ];
    }
    for (i = 0, ilen = items.length; i < ilen; ++i) {
      next = items[i + 1];
      prev = items[i - 1];
      curr = items[i];
      if (Math.round((next + prev) / 2) !== curr) {
        table.push({
          time: curr,
          pos: i / (ilen - 1)
        });
      }
    }
    return table;
  }
  _generate() {
    const min = this.min;
    const max = this.max;
    let timestamps = super.getDataTimestamps();
    if (!timestamps.includes(min) || !timestamps.length) {
      timestamps.splice(0, 0, min);
    }
    if (!timestamps.includes(max) || timestamps.length === 1) {
      timestamps.push(max);
    }
    return timestamps.sort((a, b) => a - b);
  }
  _getTimestampsForTable() {
    let timestamps = this._cache.all || [];
    if (timestamps.length) {
      return timestamps;
    }
    const data = this.getDataTimestamps();
    const label = this.getLabelTimestamps();
    if (data.length && label.length) {
      timestamps = this.normalize(data.concat(label));
    } else {
      timestamps = data.length ? data : label;
    }
    timestamps = this._cache.all = timestamps;
    return timestamps;
  }
  getDecimalForValue(value) {
    return (interpolate3(this._table, value) - this._minPos) / this._tableRange;
  }
  getValueForPixel(pixel) {
    const offsets = this._offsets;
    const decimal = this.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
    return interpolate3(this._table, decimal * this._tableRange + this._minPos, true);
  }
};
__publicField(TimeSeriesScale, "id", "timeseries");
__publicField(TimeSeriesScale, "defaults", TimeScale.defaults);

// src/gui/stats-modal.tsx
Chart.register(
  BarElement,
  BarController,
  plugin_legend,
  plugin_title,
  plugin_tooltip,
  plugin_subtitle,
  CategoryScale,
  LinearScale,
  PieController,
  ArcElement
);
var StatsModal = class extends import_obsidian6.Modal {
  constructor(app2, plugin) {
    super(app2);
    this.plugin = plugin;
    this.titleEl.setText(`${t("STATS_TITLE")} `);
    this.titleEl.addClass("sr-centered");
    this.titleEl.innerHTML += /* @__PURE__ */ (0, import_vhtml2.default)("select", { id: "sr-chart-period" }, /* @__PURE__ */ (0, import_vhtml2.default)("option", { value: "month", selected: true }, t("MONTH")), /* @__PURE__ */ (0, import_vhtml2.default)("option", { value: "quarter" }, t("QUARTER")), /* @__PURE__ */ (0, import_vhtml2.default)("option", { value: "year" }, t("YEAR")), /* @__PURE__ */ (0, import_vhtml2.default)("option", { value: "lifetime" }, t("LIFETIME")));
    this.modalEl.style.height = "100%";
    this.modalEl.style.width = "100%";
    if (import_obsidian6.Platform.isMobile) {
      this.contentEl.style.display = "block";
    }
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.style.textAlign = "center";
    const cardStats = this.plugin.cardStats;
    let maxN = cardStats.delayedDays.getMaxValue();
    for (let dueOffset = 0; dueOffset <= maxN; dueOffset++) {
      cardStats.delayedDays.clearCountIfMissing(dueOffset);
    }
    const dueDatesFlashcardsCopy = { 0: 0 };
    for (const [dueOffset, dueCount] of getTypedObjectEntries(cardStats.delayedDays.dict)) {
      if (dueOffset <= 0) {
        dueDatesFlashcardsCopy[0] += dueCount;
      } else {
        dueDatesFlashcardsCopy[dueOffset] = dueCount;
      }
    }
    const scheduledCount = cardStats.youngCount + cardStats.matureCount;
    maxN = Math.max(maxN, 1);
    contentEl.innerHTML += /* @__PURE__ */ (0, import_vhtml2.default)("div", null, /* @__PURE__ */ (0, import_vhtml2.default)("canvas", { id: "forecastChart" }), /* @__PURE__ */ (0, import_vhtml2.default)("span", { id: "forecastChartSummary" }), /* @__PURE__ */ (0, import_vhtml2.default)("br", null), /* @__PURE__ */ (0, import_vhtml2.default)("br", null), /* @__PURE__ */ (0, import_vhtml2.default)("canvas", { id: "intervalsChart" }), /* @__PURE__ */ (0, import_vhtml2.default)("span", { id: "intervalsChartSummary" }), /* @__PURE__ */ (0, import_vhtml2.default)("br", null), /* @__PURE__ */ (0, import_vhtml2.default)("br", null), /* @__PURE__ */ (0, import_vhtml2.default)("canvas", { id: "easesChart" }), /* @__PURE__ */ (0, import_vhtml2.default)("span", { id: "easesChartSummary" }), /* @__PURE__ */ (0, import_vhtml2.default)("br", null), /* @__PURE__ */ (0, import_vhtml2.default)("br", null), /* @__PURE__ */ (0, import_vhtml2.default)("canvas", { id: "cardTypesChart" }), /* @__PURE__ */ (0, import_vhtml2.default)("br", null), /* @__PURE__ */ (0, import_vhtml2.default)("span", { id: "cardTypesChartSummary" }));
    createStatsChart(
      "bar",
      "forecastChart",
      t("FORECAST"),
      t("FORECAST_DESC"),
      Object.keys(dueDatesFlashcardsCopy),
      Object.values(dueDatesFlashcardsCopy),
      t("REVIEWS_PER_DAY", { avg: (scheduledCount / maxN).toFixed(1) }),
      t("SCHEDULED"),
      t("DAYS"),
      t("NUMBER_OF_CARDS")
    );
    maxN = cardStats.intervals.getMaxValue();
    for (let interval = 0; interval <= maxN; interval++) {
      cardStats.intervals.clearCountIfMissing(interval);
    }
    const average_interval = textInterval(
      Math.round(
        cardStats.intervals.getTotalOfValueMultiplyCount() / scheduledCount * 10
      ) / 10 || 0,
      false
    ), longest_interval = textInterval(cardStats.intervals.getMaxValue(), false);
    createStatsChart(
      "bar",
      "intervalsChart",
      t("INTERVALS"),
      t("INTERVALS_DESC"),
      Object.keys(cardStats.intervals.dict),
      Object.values(cardStats.intervals.dict),
      t("INTERVALS_SUMMARY", { avg: average_interval, longest: longest_interval }),
      t("COUNT"),
      t("DAYS"),
      t("NUMBER_OF_CARDS")
    );
    const eases = getKeysPreserveType(cardStats.eases.dict);
    for (let ease = Math.min(...eases); ease <= Math.max(...eases); ease++) {
      cardStats.eases.clearCountIfMissing(ease);
    }
    const average_ease = Math.round(cardStats.eases.getTotalOfValueMultiplyCount() / scheduledCount) || 0;
    createStatsChart(
      "bar",
      "easesChart",
      t("EASES"),
      "",
      Object.keys(cardStats.eases.dict),
      Object.values(cardStats.eases.dict),
      t("EASES_SUMMARY", { avgEase: average_ease }),
      t("COUNT"),
      t("EASES"),
      t("NUMBER_OF_CARDS")
    );
    const totalCardsCount = this.plugin.deckTree.getCardCount(2 /* All */, true);
    createStatsChart(
      "pie",
      "cardTypesChart",
      t("CARD_TYPES"),
      t("CARD_TYPES_DESC"),
      [
        `${t("CARD_TYPE_NEW")} - ${Math.round(
          cardStats.newCount / totalCardsCount * 100
        )}%`,
        `${t("CARD_TYPE_YOUNG")} - ${Math.round(
          cardStats.youngCount / totalCardsCount * 100
        )}%`,
        `${t("CARD_TYPE_MATURE")} - ${Math.round(
          cardStats.matureCount / totalCardsCount * 100
        )}%`
      ],
      [cardStats.newCount, cardStats.youngCount, cardStats.matureCount],
      t("CARD_TYPES_SUMMARY", { totalCardsCount })
    );
  }
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
};
function createStatsChart(type, canvasId, title, subtitle, labels, data, summary, seriesTitle = "", xAxisTitle = "", yAxisTitle = "") {
  const style = getComputedStyle(document.body);
  const textColor = style.getPropertyValue("--text-normal");
  let scales = {}, backgroundColor = ["#2196f3"];
  if (type !== "pie") {
    scales = {
      x: {
        title: {
          display: true,
          text: xAxisTitle,
          color: textColor
        }
      },
      y: {
        title: {
          display: true,
          text: yAxisTitle,
          color: textColor
        }
      }
    };
  } else {
    backgroundColor = ["#2196f3", "#4caf50", "green"];
  }
  const shouldFilter = canvasId === "forecastChart" || canvasId === "intervalsChart";
  const statsChart = new Chart(document.getElementById(canvasId), {
    type,
    data: {
      labels: shouldFilter ? labels.slice(0, 31) : labels,
      datasets: [
        {
          label: seriesTitle,
          backgroundColor,
          data: shouldFilter ? data.slice(0, 31) : data
        }
      ]
    },
    options: {
      scales,
      plugins: {
        title: {
          display: true,
          text: title,
          font: {
            size: 22
          },
          color: textColor
        },
        subtitle: {
          display: true,
          text: subtitle,
          font: {
            size: 16,
            style: "italic"
          },
          color: textColor
        },
        legend: {
          display: false
        }
      },
      aspectRatio: 2
    }
  });
  if (shouldFilter) {
    const chartPeriodEl = document.getElementById("sr-chart-period");
    chartPeriodEl.addEventListener("click", () => {
      let filteredLabels, filteredData;
      const chartPeriod = chartPeriodEl.value;
      if (chartPeriod === "month") {
        filteredLabels = labels.slice(0, 31);
        filteredData = data.slice(0, 31);
      } else if (chartPeriod === "quarter") {
        filteredLabels = labels.slice(0, 91);
        filteredData = data.slice(0, 91);
      } else if (chartPeriod === "year") {
        filteredLabels = labels.slice(0, 366);
        filteredData = data.slice(0, 366);
      } else {
        filteredLabels = labels;
        filteredData = data;
      }
      statsChart.data.labels = filteredLabels;
      statsChart.data.datasets[0] = {
        label: seriesTitle,
        backgroundColor,
        data: filteredData
      };
      statsChart.update();
    });
  }
  document.getElementById(`${canvasId}Summary`).innerText = summary;
}

// src/gui/sidebar.ts
var import_obsidian7 = require("obsidian");
var REVIEW_QUEUE_VIEW_TYPE = "review-queue-list-view";
var ReviewQueueListView = class extends import_obsidian7.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.registerEvent(this.app.workspace.on("file-open", () => this.redraw()));
    this.registerEvent(this.app.vault.on("rename", () => this.redraw()));
  }
  getViewType() {
    return REVIEW_QUEUE_VIEW_TYPE;
  }
  getDisplayText() {
    return t("NOTES_REVIEW_QUEUE");
  }
  getIcon() {
    return "SpacedRepIcon";
  }
  onHeaderMenu(menu) {
    menu.addItem((item) => {
      item.setTitle(t("CLOSE")).setIcon("cross").onClick(() => {
        this.app.workspace.detachLeavesOfType(REVIEW_QUEUE_VIEW_TYPE);
      });
    });
  }
  redraw() {
    const activeFile = this.app.workspace.getActiveFile();
    const rootEl = createDiv("nav-folder mod-root");
    const childrenEl = rootEl.createDiv("nav-folder-children");
    for (const deckKey in this.plugin.reviewDecks) {
      const deck = this.plugin.reviewDecks[deckKey];
      const deckCollapsed = !deck.activeFolders.has(deck.deckName);
      const deckFolderEl = this.createRightPaneFolder(
        childrenEl,
        deckKey,
        deckCollapsed,
        false,
        deck
      ).getElementsByClassName("nav-folder-children")[0];
      if (deck.newNotes.length > 0) {
        const newNotesFolderEl = this.createRightPaneFolder(
          deckFolderEl,
          t("NEW"),
          !deck.activeFolders.has(t("NEW")),
          deckCollapsed,
          deck
        );
        for (const newFile of deck.newNotes) {
          const fileIsOpen = activeFile && newFile.path === activeFile.path;
          if (fileIsOpen) {
            deck.activeFolders.add(deck.deckName);
            deck.activeFolders.add(t("NEW"));
            this.changeFolderIconToExpanded(newNotesFolderEl);
            this.changeFolderIconToExpanded(deckFolderEl);
          }
          this.createRightPaneFile(
            newNotesFolderEl,
            newFile,
            fileIsOpen,
            !deck.activeFolders.has(t("NEW")),
            deck,
            this.plugin
          );
        }
      }
      if (deck.scheduledNotes.length > 0) {
        const now = Date.now();
        let currUnix = -1;
        let schedFolderEl = null, folderTitle = "";
        const maxDaysToRender = this.plugin.data.settings.maxNDaysNotesReviewQueue;
        for (const sNote of deck.scheduledNotes) {
          if (sNote.dueUnix != currUnix) {
            const nDays = Math.ceil((sNote.dueUnix - now) / (24 * 3600 * 1e3));
            if (nDays > maxDaysToRender) {
              break;
            }
            if (nDays === -1) {
              folderTitle = t("YESTERDAY");
            } else if (nDays === 0) {
              folderTitle = t("TODAY");
            } else if (nDays === 1) {
              folderTitle = t("TOMORROW");
            } else {
              folderTitle = new Date(sNote.dueUnix).toDateString();
            }
            schedFolderEl = this.createRightPaneFolder(
              deckFolderEl,
              folderTitle,
              !deck.activeFolders.has(folderTitle),
              deckCollapsed,
              deck
            );
            currUnix = sNote.dueUnix;
          }
          const fileIsOpen = activeFile && sNote.note.path === activeFile.path;
          if (fileIsOpen) {
            deck.activeFolders.add(deck.deckName);
            deck.activeFolders.add(folderTitle);
            this.changeFolderIconToExpanded(schedFolderEl);
            this.changeFolderIconToExpanded(deckFolderEl);
          }
          this.createRightPaneFile(
            schedFolderEl,
            sNote.note,
            fileIsOpen,
            !deck.activeFolders.has(folderTitle),
            deck,
            this.plugin
          );
        }
      }
    }
    const contentEl = this.containerEl.children[1];
    contentEl.empty();
    contentEl.appendChild(rootEl);
  }
  createRightPaneFolder(parentEl, folderTitle, collapsed, hidden, deck) {
    const folderEl = parentEl.createDiv("nav-folder");
    const folderTitleEl = folderEl.createDiv("nav-folder-title");
    const childrenEl = folderEl.createDiv("nav-folder-children");
    const collapseIconEl = folderTitleEl.createDiv(
      "nav-folder-collapse-indicator collapse-icon"
    );
    collapseIconEl.innerHTML = COLLAPSE_ICON;
    if (collapsed) {
      collapseIconEl.childNodes[0].style.transform = "rotate(-90deg)";
    }
    folderTitleEl.createDiv("nav-folder-title-content").setText(folderTitle);
    if (hidden) {
      folderEl.style.display = "none";
    }
    folderTitleEl.onClickEvent(() => {
      for (const child of childrenEl.childNodes) {
        if (child.style.display === "block" || child.style.display === "") {
          child.style.display = "none";
          collapseIconEl.childNodes[0].style.transform = "rotate(-90deg)";
          deck.activeFolders.delete(folderTitle);
        } else {
          child.style.display = "block";
          collapseIconEl.childNodes[0].style.transform = "";
          deck.activeFolders.add(folderTitle);
        }
      }
    });
    return folderEl;
  }
  createRightPaneFile(folderEl, file, fileElActive, hidden, deck, plugin) {
    const navFileEl = folderEl.getElementsByClassName("nav-folder-children")[0].createDiv("nav-file");
    if (hidden) {
      navFileEl.style.display = "none";
    }
    const navFileTitle = navFileEl.createDiv("nav-file-title");
    if (fileElActive) {
      navFileTitle.addClass("is-active");
    }
    navFileTitle.createDiv("nav-file-title-content").setText(file.basename);
    navFileTitle.addEventListener(
      "click",
      async (event) => {
        event.preventDefault();
        plugin.lastSelectedReviewDeck = deck.deckName;
        await this.app.workspace.getLeaf().openFile(file);
        return false;
      },
      false
    );
    navFileTitle.addEventListener(
      "contextmenu",
      (event) => {
        event.preventDefault();
        const fileMenu = new import_obsidian7.Menu();
        this.app.workspace.trigger("file-menu", fileMenu, file, "my-context-menu", null);
        fileMenu.showAtPosition({
          x: event.pageX,
          y: event.pageY
        });
        return false;
      },
      false
    );
  }
  changeFolderIconToExpanded(folderEl) {
    const collapseIconEl = folderEl.find("div.nav-folder-collapse-indicator");
    collapseIconEl.childNodes[0].style.transform = "";
  }
};

// src/ReviewDeck.ts
var import_obsidian8 = require("obsidian");
var ReviewDeck = class {
  constructor(name) {
    this.newNotes = [];
    this.scheduledNotes = [];
    this.dueNotesCount = 0;
    this.deckName = name;
    this.activeFolders = /* @__PURE__ */ new Set([this.deckName, t("TODAY")]);
  }
  sortNotes(pageranks) {
    this.newNotes = this.newNotes.sort(
      (a, b) => (pageranks[b.path] || 0) - (pageranks[a.path] || 0)
    );
    this.scheduledNotes = this.scheduledNotes.sort((a, b) => {
      const result = a.dueUnix - b.dueUnix;
      if (result != 0) {
        return result;
      }
      return (pageranks[b.note.path] || 0) - (pageranks[a.note.path] || 0);
    });
  }
};
var ReviewDeckSelectionModal = class extends import_obsidian8.FuzzySuggestModal {
  constructor(app2, deckKeys) {
    super(app2);
    this.deckKeys = [];
    this.deckKeys = deckKeys;
  }
  getItems() {
    return this.deckKeys;
  }
  getItemText(item) {
    return item;
  }
  onChooseItem(deckKey, _) {
    this.close();
    this.submitCallback(deckKey);
  }
};

// src/icons/appicon.ts
var import_obsidian9 = require("obsidian");
function appIcon() {
  (0, import_obsidian9.addIcon)(
    "SpacedRepIcon",
    `<path fill="currentColor" stroke="currentColor" d="M 88.960938 17.257812 L 47.457031 17.257812 C 45.679688 17.257812 44.230469 18.703125 44.230469 20.484375 L 44.230469 86.558594 C 44.230469 88.335938 45.679688 89.785156 47.457031 89.785156 L 88.960938 89.785156 C 90.738281 89.785156 92.1875 88.335938 92.1875 86.558594 L 92.1875 20.484375 C 92.1875 18.703125 90.738281 17.257812 88.960938 17.257812 Z M 88.28125 85.878906 L 48.136719 85.878906 L 48.136719 21.164062 L 88.28125 21.164062 Z M 88.28125 85.878906 "/>
        <path fill="currentColor" stroke="currentColor"  d="M 88.960938 9.445312 L 61.667969 9.445312 C 59.925781 3.816406 54.011719 0.515625 48.269531 2.054688 L 8.183594 12.796875 C 2.304688 14.371094 -1.199219 20.4375 0.378906 26.316406 L 17.476562 90.140625 C 18.796875 95.066406 23.269531 98.324219 28.144531 98.324219 C 29.085938 98.324219 30.046875 98.199219 31 97.945312 L 40.765625 95.328125 C 42.625 96.75 44.941406 97.597656 47.457031 97.597656 L 88.960938 97.597656 C 95.046875 97.597656 100 92.644531 100 86.558594 L 100 20.484375 C 100 14.398438 95.046875 9.445312 88.960938 9.445312 Z M 29.988281 94.171875 C 26.1875 95.191406 22.269531 92.925781 21.25 89.128906 L 4.152344 25.304688 C 3.132812 21.507812 5.394531 17.585938 9.195312 16.570312 L 49.28125 5.828125 C 52.578125 4.945312 55.960938 6.53125 57.464844 9.445312 L 47.457031 9.445312 C 41.371094 9.445312 36.417969 14.398438 36.417969 20.484375 L 36.417969 86.558594 C 36.417969 88.558594 36.957031 90.433594 37.890625 92.054688 Z M 96.09375 86.558594 C 96.09375 90.492188 92.894531 93.691406 88.960938 93.691406 L 47.457031 93.691406 C 43.523438 93.691406 40.324219 90.492188 40.324219 86.558594 L 40.324219 20.484375 C 40.324219 16.550781 43.523438 13.351562 47.457031 13.351562 L 88.960938 13.351562 C 92.894531 13.351562 96.09375 16.550781 96.09375 20.484375 Z M 96.09375 86.558594 "/>
        <path fill="currentColor" stroke="currentColor"  d="M 54.101562 53.09375 L 60.070312 57.410156 L 57.789062 64.378906 C 56.90625 67.074219 59.996094 69.320312 62.285156 67.648438 L 68.210938 63.324219 L 74.132812 67.648438 C 76.421875 69.320312 79.511719 67.074219 78.628906 64.378906 L 76.347656 57.410156 L 82.320312 53.09375 C 84.613281 51.433594 83.441406 47.804688 80.605469 47.804688 L 73.242188 47.804688 L 70.988281 40.839844 C 70.117188 38.144531 66.300781 38.144531 65.429688 40.839844 L 63.179688 47.804688 L 55.8125 47.804688 C 52.980469 47.804688 51.804688 51.433594 54.101562 53.09375 Z M 54.101562 53.09375 "/>
        `
  );
}

// src/util/RandomNumberProvider.ts
var RandomNumberProvider = class {
  getInteger(lowerBound, upperBound) {
    const range = upperBound - lowerBound + 1;
    return Math.floor(Math.random() * range) + lowerBound;
  }
};
var StaticRandomNumberProvider = class {
  getInteger(lowerBound, upperBound) {
    if (lowerBound != this.expectedLowerBound || upperBound != this.expectedUpperBound)
      throw `lowerBound: A${lowerBound}/E${this.expectedLowerBound}, upperBound: A${upperBound}/E${this.expectedUpperBound}`;
    return this.next;
  }
};
var WeightedRandomNumber = class _WeightedRandomNumber {
  constructor(provider) {
    this.provider = provider;
  }
  static create() {
    return new _WeightedRandomNumber(globalRandomNumberProvider);
  }
  //
  // weights is a dictionary:
  //      first number - a key that can be returned
  //      second number - the "bucket size" - this is a weight that influences the probability of the
  //          first number being returned
  //
  // returns:
  //      first number - one of the keys from the weights parameter
  //      second number - an "index" value; 0 <= index < bucketSize
  getRandomValues(weights) {
    const total = _WeightedRandomNumber.calcTotalOfCount(weights);
    if (Object.values(weights).some((i) => !Number.isInteger(i) || i < 0))
      throw "All weights must be positive integers";
    const v = this.provider.getInteger(0, total - 1);
    let x = 0;
    for (const kvp in weights) {
      const [value, count] = [Number(kvp), weights[kvp]];
      if (v < x + count) {
        const index = v - x;
        return [value, index];
      }
      x += count;
    }
    throw "";
  }
  static calcTotalOfCount(weights) {
    const total = getTypedObjectEntries(weights).map(([_, count]) => count).reduce((a, b) => a + b, 0) || 0;
    return total;
  }
};
var globalRandomNumberProvider = new RandomNumberProvider();
var staticRandomNumberProvider = new StaticRandomNumberProvider();

// src/DeckTreeIterator.ts
var CardOrder = /* @__PURE__ */ ((CardOrder2) => {
  CardOrder2[CardOrder2["NewFirstSequential"] = 0] = "NewFirstSequential";
  CardOrder2[CardOrder2["NewFirstRandom"] = 1] = "NewFirstRandom";
  CardOrder2[CardOrder2["DueFirstSequential"] = 2] = "DueFirstSequential";
  CardOrder2[CardOrder2["DueFirstRandom"] = 3] = "DueFirstRandom";
  CardOrder2[CardOrder2["EveryCardRandomDeckAndCard"] = 4] = "EveryCardRandomDeckAndCard";
  return CardOrder2;
})(CardOrder || {});
var DeckOrder = /* @__PURE__ */ ((DeckOrder2) => {
  DeckOrder2[DeckOrder2["PrevDeckComplete_Sequential"] = 0] = "PrevDeckComplete_Sequential";
  DeckOrder2[DeckOrder2["PrevDeckComplete_Random"] = 1] = "PrevDeckComplete_Random";
  return DeckOrder2;
})(DeckOrder || {});
var SingleDeckIterator = class _SingleDeckIterator {
  get hasCurrentCard() {
    return this.cardIdx != null;
  }
  get currentCard() {
    let result = null;
    if (this.cardIdx != null)
      result = this.deck.getCard(this.cardIdx, this.cardListType);
    return result;
  }
  constructor(iteratorOrder) {
    this.iteratorOrder = iteratorOrder;
    this.preferredCardListType = _SingleDeckIterator.getCardListTypeForIterator(
      this.iteratorOrder
    );
    this.weightedRandomNumber = WeightedRandomNumber.create();
  }
  setDeck(deck) {
    this.deck = deck;
    this.setCardListType(null);
  }
  //
  // 0 <= cardIndex < newFlashcards.length + dueFlashcards.length
  //
  setNewOrDueCardIdx(cardIndex) {
    let cardListType = 0 /* NewCard */;
    let index = cardIndex;
    if (cardIndex >= this.deck.newFlashcards.length) {
      cardListType = 1 /* DueCard */;
      index = cardIndex - this.deck.newFlashcards.length;
    }
    this.setCardListType(cardListType, index);
  }
  setCardListType(cardListType, cardIdx = null) {
    this.cardListType = cardListType;
    this.cardIdx = cardIdx;
  }
  nextCard() {
    if (this.iteratorOrder.cardOrder == 4 /* EveryCardRandomDeckAndCard */) {
      this.nextRandomCard();
    } else {
      if (this.cardListType == null) {
        this.setCardListType(this.preferredCardListType);
      }
      if (!this.nextCardWithinCurrentList()) {
        if (this.cardListType == this.preferredCardListType) {
          this.setCardListType(Deck2.otherListType(this.cardListType));
          if (!this.nextCardWithinCurrentList()) {
            this.setCardListType(null);
          }
        } else {
          this.cardIdx = null;
        }
      }
    }
    return this.cardIdx != null;
  }
  nextRandomCard() {
    const newCount = this.deck.newFlashcards.length;
    const dueCount = this.deck.dueFlashcards.length;
    if (newCount + dueCount > 0) {
      const weights = {};
      if (newCount > 0)
        weights[0 /* NewCard */] = newCount;
      if (dueCount > 0)
        weights[1 /* DueCard */] = dueCount;
      const [cardListType, index] = this.weightedRandomNumber.getRandomValues(weights);
      this.setCardListType(cardListType, index);
    } else {
      this.setCardListType(null);
    }
  }
  nextCardWithinCurrentList() {
    const cardList = this.deck.getCardListForCardType(this.cardListType);
    const result = cardList.length > 0;
    if (result) {
      switch (this.iteratorOrder.cardOrder) {
        case 2 /* DueFirstSequential */:
        case 0 /* NewFirstSequential */:
          this.cardIdx = 0;
          break;
        case 3 /* DueFirstRandom */:
        case 1 /* NewFirstRandom */:
          this.cardIdx = globalRandomNumberProvider.getInteger(0, cardList.length - 1);
          break;
      }
    }
    return result;
  }
  deleteCurrentQuestion() {
    this.ensureCurrentCard();
    const q = this.currentCard.question;
    this.deleteQuestionFromList(q, 0 /* NewCard */);
    this.deleteQuestionFromList(q, 1 /* DueCard */);
    this.setNoCurrentCard();
  }
  deleteQuestionFromList(q, cardListType) {
    const cards = this.deck.getCardListForCardType(cardListType);
    for (let i = cards.length - 1; i >= 0; i--) {
      if (Object.is(q, cards[i].question))
        this.deck.deleteCardAtIndex(i, cardListType);
    }
  }
  deleteCurrentCard() {
    this.ensureCurrentCard();
    this.deck.deleteCardAtIndex(this.cardIdx, this.cardListType);
    this.setNoCurrentCard();
  }
  moveCurrentCardToEndOfList() {
    this.ensureCurrentCard();
    const cardList = this.deck.getCardListForCardType(this.cardListType);
    if (cardList.length <= 1)
      return;
    const card = this.currentCard;
    this.deck.deleteCardAtIndex(this.cardIdx, this.cardListType);
    this.deck.appendCard(TopicPath.emptyPath, card);
    this.setNoCurrentCard();
  }
  setNoCurrentCard() {
    this.cardIdx = null;
  }
  ensureCurrentCard() {
    if (this.cardIdx == null || this.cardListType == null)
      throw "no current card";
  }
  static getCardListTypeForIterator(iteratorOrder) {
    let result = null;
    switch (iteratorOrder.cardOrder) {
      case 3 /* DueFirstRandom */:
      case 2 /* DueFirstSequential */:
        result = 1 /* DueCard */;
        break;
      case 1 /* NewFirstRandom */:
      case 0 /* NewFirstSequential */:
        result = 0 /* NewCard */;
        break;
    }
    return result;
  }
};
var DeckTreeIterator = class _DeckTreeIterator {
  get hasCurrentCard() {
    return this.deckIdx != null && this.singleDeckIterator.hasCurrentCard;
  }
  get currentDeck() {
    if (this.deckIdx == null)
      return null;
    return this.deckArray[this.deckIdx];
  }
  get currentCard() {
    let result = null;
    if (this.deckIdx != null && this.singleDeckIterator.hasCurrentCard)
      result = this.singleDeckIterator.currentCard;
    return result;
  }
  constructor(iteratorOrder, deckSource) {
    this.singleDeckIterator = new SingleDeckIterator(iteratorOrder);
    this.iteratorOrder = iteratorOrder;
    this.deckSource = deckSource;
    this.weightedRandomNumber = WeightedRandomNumber.create();
  }
  setDeck(deck) {
    if (this.deckSource == 1 /* CloneBeforeUse */)
      deck = deck.clone();
    this.deckArray = _DeckTreeIterator.filterForDecksWithCards(deck.toDeckArray());
    this.setDeckIdx(null);
  }
  static filterForDecksWithCards(sourceArray) {
    const result = [];
    for (let idx = 0; idx < sourceArray.length; idx++) {
      const deck = sourceArray[idx];
      const hasAnyCards = deck.getCardCount(2 /* All */, false) > 0;
      if (hasAnyCards) {
        result.push(deck);
      }
    }
    return result;
  }
  setDeckIdx(deckIdx) {
    this.deckIdx = deckIdx;
    if (deckIdx != null)
      this.singleDeckIterator.setDeck(this.deckArray[deckIdx]);
  }
  nextCard() {
    let result = false;
    if (this.hasCurrentCard) {
      this.singleDeckIterator.deleteCurrentCard();
    }
    if (this.iteratorOrder.cardOrder == 4 /* EveryCardRandomDeckAndCard */) {
      result = this.nextCard_EveryCardRandomDeck();
    } else {
      if (this.deckIdx == null) {
        this.chooseNextDeck(true);
      }
      while (this.deckIdx < this.deckArray.length) {
        if (this.singleDeckIterator.nextCard()) {
          result = true;
          break;
        }
        this.chooseNextDeck(false);
      }
    }
    if (!result)
      this.deckIdx = null;
    return result;
  }
  chooseNextDeck(firstTime) {
    switch (this.iteratorOrder.deckOrder) {
      case 0 /* PrevDeckComplete_Sequential */:
        this.deckIdx = firstTime ? 0 : this.deckIdx + 1;
        break;
      case 1 /* PrevDeckComplete_Random */: {
        const weights = {};
        let hasDeck = false;
        for (let i = 0; i < this.deckArray.length; i++) {
          if (this.deckArray[i].getCardCount(2 /* All */, false)) {
            weights[i] = 1;
            hasDeck = true;
          }
        }
        if (hasDeck) {
          const [deckIdx, _] = this.weightedRandomNumber.getRandomValues(weights);
          this.deckIdx = deckIdx;
        } else {
          this.deckIdx = this.deckArray.length;
        }
        break;
      }
    }
    if (this.deckIdx < this.deckArray.length) {
      this.singleDeckIterator.setDeck(this.deckArray[this.deckIdx]);
    }
  }
  nextCard_EveryCardRandomDeck() {
    const weights = {};
    for (let i = 0; i < this.deckArray.length; i++) {
      const cardCount = this.deckArray[i].getCardCount(2 /* All */, false);
      if (cardCount) {
        weights[i] = cardCount;
      }
    }
    if (Object.keys(weights).length == 0)
      return false;
    const [deckIdx, cardIdx] = this.weightedRandomNumber.getRandomValues(weights);
    this.setDeckIdx(deckIdx);
    this.singleDeckIterator.setNewOrDueCardIdx(cardIdx);
    return true;
  }
  deleteCurrentQuestion() {
    this.singleDeckIterator.deleteCurrentQuestion();
    return this.nextCard();
  }
  deleteCurrentCard() {
    this.singleDeckIterator.deleteCurrentCard();
    return this.nextCard();
  }
  moveCurrentCardToEndOfList() {
    this.singleDeckIterator.moveCurrentCardToEndOfList();
  }
  removeCurrentDeckIfEmpty() {
    if (this.currentDeck.getCardCount(2 /* All */, false) == 0) {
      this.deckArray.splice(this.deckIdx, 1);
      if (this.deckIdx < this.deckArray.length)
        this.setDeckIdx(this.deckIdx);
    }
  }
};

// src/Note.ts
var Note = class {
  get hasChanged() {
    return this.questionList.some((question) => question.hasChanged);
  }
  get filePath() {
    return this.file.path;
  }
  constructor(file, questionList) {
    this.file = file;
    this.questionList = questionList;
    questionList.forEach((question) => question.note = this);
  }
  appendCardsToDeck(deck) {
    for (const question of this.questionList) {
      for (const card of question.cards) {
        deck.appendCard(question.topicPath, card);
      }
    }
  }
  debugLogToConsole(desc = "") {
    var _a;
    let str = `Note: ${desc}: ${this.questionList.length} questions\r
`;
    for (let i = 0; i < this.questionList.length; i++) {
      const q = this.questionList[i];
      str += `[${i}]: ${q.questionType}: ${q.lineNo}: ${(_a = q.topicPath) == null ? void 0 : _a.path}: ${q.questionText.original}\r
`;
    }
    console.debug(str);
  }
  async writeNoteFile(settings) {
    let fileText = await this.file.read();
    for (const question of this.questionList) {
      if (question.hasChanged) {
        fileText = question.updateQuestionText(fileText, settings);
      }
    }
    await this.file.write(fileText);
    this.questionList.forEach((question) => question.hasChanged = false);
  }
};

// src/Card.ts
var Card = class {
  // scheduling
  get hasSchedule() {
    return this.scheduleInfo != null;
  }
  constructor(init) {
    Object.assign(this, init);
  }
  get cardListType() {
    return this.hasSchedule ? 1 /* DueCard */ : 0 /* NewCard */;
  }
  get isNew() {
    return !this.hasSchedule;
  }
  get isDue() {
    return this.hasSchedule && this.scheduleInfo.isDue();
  }
  formatSchedule() {
    let result = "";
    if (this.hasSchedule)
      result = this.scheduleInfo.formatSchedule();
    else
      result = "New";
    return result;
  }
};

// src/parser.ts
function parse2(text, singlelineCardSeparator, singlelineReversedCardSeparator, multilineCardSeparator, multilineReversedCardSeparator, convertHighlightsToClozes, convertBoldTextToClozes, convertCurlyBracketsToClozes) {
  let cardText = "";
  const cards = [];
  let cardType = null;
  let lineNo = 0;
  const lines = text.replaceAll("\r\n", "\n").split("\n");
  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i];
    if (currentLine.length === 0) {
      if (cardType) {
        cards.push([cardType, cardText, lineNo]);
        cardType = null;
      }
      cardText = "";
      continue;
    } else if (currentLine.startsWith("<!--") && !currentLine.startsWith("<!--SR:")) {
      while (i + 1 < lines.length && !currentLine.includes("-->"))
        i++;
      i++;
      continue;
    }
    if (cardText.length > 0) {
      cardText += "\n";
    }
    cardText += currentLine.trimEnd();
    if (currentLine.includes(singlelineReversedCardSeparator) || currentLine.includes(singlelineCardSeparator)) {
      cardType = lines[i].includes(singlelineReversedCardSeparator) ? 1 /* SingleLineReversed */ : 0 /* SingleLineBasic */;
      cardText = lines[i];
      lineNo = i;
      if (i + 1 < lines.length && lines[i + 1].startsWith("<!--SR:")) {
        cardText += "\n" + lines[i + 1];
        i++;
      }
      cards.push([cardType, cardText, lineNo]);
      cardType = null;
      cardText = "";
    } else if (cardType === null && (convertHighlightsToClozes && /==.*?==/gm.test(currentLine) || convertBoldTextToClozes && /\*\*.*?\*\*/gm.test(currentLine) || convertCurlyBracketsToClozes && /{{.*?}}/gm.test(currentLine))) {
      cardType = 4 /* Cloze */;
      lineNo = i;
    } else if (currentLine.trim() === multilineCardSeparator) {
      cardType = 2 /* MultiLineBasic */;
      lineNo = i;
    } else if (currentLine.trim() === multilineReversedCardSeparator) {
      cardType = 3 /* MultiLineReversed */;
      lineNo = i;
    } else if (currentLine.startsWith("```") || currentLine.startsWith("~~~")) {
      const codeBlockClose = currentLine.match(/`+|~+/)[0];
      while (i + 1 < lines.length && !lines[i + 1].startsWith(codeBlockClose)) {
        i++;
        cardText += "\n" + lines[i];
      }
      cardText += "\n" + codeBlockClose;
      i++;
    }
  }
  if (cardType && cardText) {
    cards.push([cardType, cardText, lineNo]);
  }
  return cards;
}

// src/QuestionType.ts
var CardFrontBack = class {
  // The caller is responsible for any required trimming of leading/trailing spaces
  constructor(front, back) {
    this.front = front;
    this.back = back;
  }
};
var CardFrontBackUtil = class {
  static expand(questionType, questionText, settings) {
    const handler = QuestionTypeFactory.create(questionType);
    return handler.expand(questionText, settings);
  }
};
var QuestionType_SingleLineBasic = class {
  expand(questionText, settings) {
    const idx = questionText.indexOf(settings.singleLineCardSeparator);
    const item = new CardFrontBack(
      questionText.substring(0, idx),
      questionText.substring(idx + settings.singleLineCardSeparator.length)
    );
    const result = [item];
    return result;
  }
};
var QuestionType_SingleLineReversed = class {
  expand(questionText, settings) {
    const idx = questionText.indexOf(settings.singleLineReversedCardSeparator);
    const side1 = questionText.substring(0, idx), side2 = questionText.substring(
      idx + settings.singleLineReversedCardSeparator.length
    );
    const result = [
      new CardFrontBack(side1, side2),
      new CardFrontBack(side2, side1)
    ];
    return result;
  }
};
var QuestionType_MultiLineBasic = class {
  expand(questionText, settings) {
    const idx = questionText.indexOf("\n" + settings.multilineCardSeparator + "\n");
    const item = new CardFrontBack(
      questionText.substring(0, idx),
      questionText.substring(idx + 2 + settings.multilineCardSeparator.length)
    );
    const result = [item];
    return result;
  }
};
var QuestionType_MultiLineReversed = class {
  expand(questionText, settings) {
    const idx = questionText.indexOf("\n" + settings.multilineReversedCardSeparator + "\n");
    const side1 = questionText.substring(0, idx), side2 = questionText.substring(
      idx + 2 + settings.multilineReversedCardSeparator.length
    );
    const result = [
      new CardFrontBack(side1, side2),
      new CardFrontBack(side2, side1)
    ];
    return result;
  }
};
var QuestionType_Cloze = class {
  expand(questionText, settings) {
    const siblings = [];
    if (settings.convertHighlightsToClozes) {
      siblings.push(...questionText.matchAll(/==(.*?)==/gm));
    }
    if (settings.convertBoldTextToClozes) {
      siblings.push(...questionText.matchAll(/\*\*(.*?)\*\*/gm));
    }
    if (settings.convertCurlyBracketsToClozes) {
      siblings.push(...questionText.matchAll(/{{(.*?)}}/gm));
    }
    siblings.sort((a, b) => {
      if (a.index < b.index) {
        return -1;
      }
      if (a.index > b.index) {
        return 1;
      }
      return 0;
    });
    let front, back;
    const result = [];
    for (const m of siblings) {
      const deletionStart = m.index, deletionEnd = deletionStart + m[0].length;
      front = questionText.substring(0, deletionStart) + QuestionType_ClozeUtil.renderClozeFront() + questionText.substring(deletionEnd);
      front = QuestionType_ClozeUtil.removeClozeTokens(front, settings);
      back = questionText.substring(0, deletionStart) + QuestionType_ClozeUtil.renderClozeBack(
        questionText.substring(deletionStart, deletionEnd)
      ) + questionText.substring(deletionEnd);
      back = QuestionType_ClozeUtil.removeClozeTokens(back, settings);
      result.push(new CardFrontBack(front, back));
    }
    return result;
  }
};
var QuestionType_ClozeUtil = class {
  static renderClozeFront() {
    return "<span style='color:#2196f3'>[...]</span>";
  }
  static renderClozeBack(str) {
    return "<span style='color:#2196f3'>" + str + "</span>";
  }
  static removeClozeTokens(text, settings) {
    let result = text;
    if (settings.convertHighlightsToClozes)
      result = result.replace(/==/gm, "");
    if (settings.convertBoldTextToClozes)
      result = result.replace(/\*\*/gm, "");
    if (settings.convertCurlyBracketsToClozes) {
      result = result.replace(/{{/gm, "").replace(/}}/gm, "");
    }
    return result;
  }
};
var QuestionTypeFactory = class {
  static create(questionType) {
    let handler;
    switch (questionType) {
      case 0 /* SingleLineBasic */:
        handler = new QuestionType_SingleLineBasic();
        break;
      case 1 /* SingleLineReversed */:
        handler = new QuestionType_SingleLineReversed();
        break;
      case 2 /* MultiLineBasic */:
        handler = new QuestionType_MultiLineBasic();
        break;
      case 3 /* MultiLineReversed */:
        handler = new QuestionType_MultiLineReversed();
        break;
      case 4 /* Cloze */:
        handler = new QuestionType_Cloze();
        break;
    }
    return handler;
  }
};

// src/NoteQuestionParser.ts
var ParsedQuestionInfo = class {
  constructor(cardType, cardText, lineNo) {
    this.cardType = cardType;
    this.cardText = cardText;
    this.lineNo = lineNo;
  }
};
var NoteQuestionParser = class {
  constructor(settings) {
    this.settings = settings;
  }
  async createQuestionList(noteFile, folderTopicPath) {
    this.noteFile = noteFile;
    const noteText = await noteFile.read();
    let noteTopicPath;
    if (this.settings.convertFoldersToDecks) {
      noteTopicPath = folderTopicPath;
    } else {
      const tagList = noteFile.getAllTags();
      noteTopicPath = this.determineTopicPathFromTags(tagList);
    }
    const result = this.doCreateQuestionList(noteText, noteTopicPath);
    return result;
  }
  doCreateQuestionList(noteText, noteTopicPath) {
    this.noteText = noteText;
    this.noteTopicPath = noteTopicPath;
    const result = [];
    const parsedQuestionInfoList = this.parseQuestions();
    for (const t2 of parsedQuestionInfoList) {
      const parsedQuestionInfo = new ParsedQuestionInfo(t2[0], t2[1], t2[2]);
      const question = this.createQuestionObject(parsedQuestionInfo);
      const cardFrontBackList = CardFrontBackUtil.expand(
        question.questionType,
        question.questionText.actualQuestion,
        this.settings
      );
      let cardScheduleInfoList = NoteCardScheduleParser.createCardScheduleInfoList(question.questionText.original);
      const correctLength = cardFrontBackList.length;
      if (cardScheduleInfoList.length > correctLength) {
        question.hasChanged = true;
        cardScheduleInfoList = cardScheduleInfoList.slice(0, correctLength);
      }
      const cardList = this.createCardList(cardFrontBackList, cardScheduleInfoList);
      question.setCardList(cardList);
      result.push(question);
    }
    return result;
  }
  parseQuestions() {
    const settings = this.settings;
    const result = parse2(
      this.noteText,
      settings.singleLineCardSeparator,
      settings.singleLineReversedCardSeparator,
      settings.multilineCardSeparator,
      settings.multilineReversedCardSeparator,
      settings.convertHighlightsToClozes,
      settings.convertBoldTextToClozes,
      settings.convertCurlyBracketsToClozes
    );
    return result;
  }
  createQuestionObject(parsedQuestionInfo) {
    const { cardType, cardText, lineNo } = parsedQuestionInfo;
    const questionContext = this.noteFile.getQuestionContext(lineNo);
    const result = Question.Create(
      this.settings,
      cardType,
      this.noteTopicPath,
      cardText,
      lineNo,
      questionContext
    );
    return result;
  }
  createCardList(cardFrontBackList, cardScheduleInfoList) {
    const siblings = [];
    for (let i = 0; i < cardFrontBackList.length; i++) {
      const { front, back } = cardFrontBackList[i];
      const hasScheduleInfo = i < cardScheduleInfoList.length;
      const schedule2 = cardScheduleInfoList[i];
      const cardObj = new Card({
        front,
        back,
        cardIdx: i
      });
      cardObj.scheduleInfo = hasScheduleInfo && !schedule2.isDummyScheduleForNewCard() ? schedule2 : null;
      siblings.push(cardObj);
    }
    return siblings;
  }
  determineTopicPathFromTags(tagList) {
    let result = TopicPath.emptyPath;
    outer:
      for (const tagToReview of this.settings.flashcardTags) {
        for (const tag of tagList) {
          if (tag === tagToReview || tag.startsWith(tagToReview + "/")) {
            result = TopicPath.getTopicPathFromTag(tag);
            break outer;
          }
        }
      }
    return result;
  }
};

// src/NoteFileLoader.ts
var NoteFileLoader = class {
  constructor(settings) {
    this.settings = settings;
  }
  async load(noteFile, noteTopicPath) {
    this.noteFile = noteFile;
    const questionParser = new NoteQuestionParser(this.settings);
    const questionList = await questionParser.createQuestionList(
      noteFile,
      noteTopicPath
    );
    const result = new Note(noteFile, questionList);
    return result;
  }
};

// src/SRFile.ts
var import_obsidian10 = require("obsidian");
var SrTFile = class {
  constructor(vault, metadataCache, file) {
    this.vault = vault;
    this.metadataCache = metadataCache;
    this.file = file;
  }
  get path() {
    return this.file.path;
  }
  get basename() {
    return this.file.basename;
  }
  getAllTags() {
    const fileCachedData = this.metadataCache.getFileCache(this.file) || {};
    return (0, import_obsidian10.getAllTags)(fileCachedData) || [];
  }
  getQuestionContext(cardLine) {
    const fileCachedData = this.metadataCache.getFileCache(this.file) || {};
    const headings = fileCachedData.headings || [];
    const stack = [];
    for (const heading of headings) {
      if (heading.position.start.line > cardLine) {
        break;
      }
      while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
        stack.pop();
      }
      stack.push(heading);
    }
    const result = [];
    for (const headingObj of stack) {
      headingObj.heading = headingObj.heading.replace(/\[\^\d+\]/gm, "").trim();
      result.push(headingObj.heading);
    }
    return result;
  }
  async read() {
    return await this.vault.read(this.file);
  }
  async write(content) {
    await this.vault.modify(this.file, content);
  }
};

// src/NoteEaseCalculator.ts
var NoteEaseCalculator = class {
  static Calculate(note, settings) {
    let totalEase = 0;
    let scheduledCount = 0;
    note.questionList.forEach((question) => {
      question.cards.filter((card) => card.hasSchedule).forEach((card) => {
        totalEase += card.scheduleInfo.ease;
        scheduledCount++;
      });
    });
    let result = 0;
    if (scheduledCount > 0) {
      const flashcardsInNoteAvgEase = totalEase / scheduledCount;
      const flashcardContribution = Math.min(
        1,
        Math.log(scheduledCount + 0.5) / Math.log(64)
      );
      result = flashcardsInNoteAvgEase * flashcardContribution + settings.baseEase * (1 - flashcardContribution);
    }
    return result;
  }
};

// src/util/NumberCountDict.ts
var ValueCountDict = class {
  constructor() {
    this.dict = {};
  }
  // Record<value, count>
  clearCountIfMissing(value) {
    if (!this.hasValue(value))
      this.dict[value] = 0;
  }
  hasValue(value) {
    return Object.prototype.hasOwnProperty.call(this.dict, value);
  }
  incrementCount(value) {
    this.clearCountIfMissing(value);
    this.dict[value]++;
  }
  getMaxValue() {
    return Math.max(...getKeysPreserveType(this.dict)) || 0;
  }
  getTotalOfValueMultiplyCount() {
    const v = getTypedObjectEntries(this.dict).map(([value, count]) => value * count).reduce((a, b) => a + b, 0) || 0;
    return v;
  }
};

// src/stats.ts
var Stats = class {
  constructor() {
    this.eases = new ValueCountDict();
    this.intervals = new ValueCountDict();
    this.delayedDays = new ValueCountDict();
    this.newCount = 0;
    this.youngCount = 0;
    this.matureCount = 0;
  }
  get totalCount() {
    return this.youngCount + this.matureCount;
  }
  incrementNew() {
    this.newCount++;
  }
  update(delayedDays, interval, ease) {
    this.intervals.incrementCount(interval);
    this.eases.incrementCount(ease);
    this.delayedDays.incrementCount(delayedDays);
    if (interval >= 32) {
      this.matureCount++;
    } else {
      this.youngCount++;
    }
  }
  getMaxInterval() {
    return this.intervals.getMaxValue();
  }
  getAverageInterval() {
    return this.intervals.getTotalOfValueMultiplyCount() / this.totalCount;
  }
  getAverageEases() {
    return this.eases.getTotalOfValueMultiplyCount() / this.totalCount;
  }
};

// src/DeckTreeStatsCalculator.ts
var DeckTreeStatsCalculator = class {
  calculate(deckTree) {
    const iteratorOrder = {
      deckOrder: 0 /* PrevDeckComplete_Sequential */,
      cardOrder: 2 /* DueFirstSequential */
    };
    const iterator = new DeckTreeIterator(
      iteratorOrder,
      1 /* CloneBeforeUse */
    );
    const result = new Stats();
    iterator.setDeck(deckTree);
    while (iterator.nextCard()) {
      const card = iterator.currentCard;
      if (card.hasSchedule) {
        const schedule2 = card.scheduleInfo;
        result.update(schedule2.delayBeforeReviewDaysInt, schedule2.interval, schedule2.ease);
      } else {
        result.incrementNew();
      }
    }
    return result;
  }
};

// src/NoteEaseList.ts
var NoteEaseList = class {
  constructor(settings) {
    this.dict = {};
    this.settings = settings;
  }
  get baseEase() {
    return this.settings.baseEase;
  }
  hasEaseForPath(path) {
    return Object.prototype.hasOwnProperty.call(this.dict, path);
  }
  getEaseByPath(path) {
    let ease = null;
    if (this.hasEaseForPath(path)) {
      ease = Math.round(this.dict[path]);
    }
    return ease;
  }
  setEaseForPath(path, ease) {
    this.dict[path] = ease;
  }
};

// src/QuestionPostponementList.ts
var QuestionPostponementList = class {
  constructor(plugin, settings, list) {
    this.plugin = plugin;
    this.settings = settings;
    this.list = list;
  }
  clear() {
    this.list.splice(0);
  }
  add(question) {
    if (!this.includes(question))
      this.list.push(question.questionText.textHash);
  }
  includes(question) {
    return this.list.includes(question.questionText.textHash);
  }
  async write() {
    if (this.plugin == null)
      return;
    await this.plugin.savePluginData();
  }
};

// src/main.ts
var DEFAULT_DATA = {
  settings: DEFAULT_SETTINGS,
  buryDate: "",
  buryList: [],
  historyDeck: null
};
var SRPlugin = class _SRPlugin extends import_obsidian11.Plugin {
  constructor() {
    super(...arguments);
    this.syncLock = false;
    this.reviewDecks = {};
    this.incomingLinks = {};
    this.pageranks = {};
    this.dueNotesCount = 0;
    this.dueDatesNotes = {};
    // Record<# of days in future, due count>
    this.deckTree = new Deck2("root", null);
  }
  async onload() {
    await this.loadPluginData();
    this.easeByPath = new NoteEaseList(this.data.settings);
    this.questionPostponementList = new QuestionPostponementList(
      this,
      this.data.settings,
      this.data.buryList
    );
    appIcon();
    this.statusBar = this.addStatusBarItem();
    this.statusBar.classList.add("mod-clickable");
    this.statusBar.setAttribute("aria-label", t("OPEN_NOTE_FOR_REVIEW"));
    this.statusBar.setAttribute("aria-label-position", "top");
    this.statusBar.addEventListener("click", async () => {
      if (!this.syncLock) {
        await this.sync();
        this.reviewNextNoteModal();
      }
    });
    this.addRibbonIcon("SpacedRepIcon", t("REVIEW_CARDS"), async () => {
      if (!this.syncLock) {
        await this.sync();
        this.openFlashcardModal(
          this.deckTree,
          this.remainingDeckTree,
          1 /* Review */
        );
      }
    });
    if (!this.data.settings.disableFileMenuReviewOptions) {
      this.registerEvent(
        this.app.workspace.on("file-menu", (menu, fileish) => {
          if (fileish instanceof import_obsidian11.TFile && fileish.extension === "md") {
            menu.addItem((item) => {
              item.setTitle(t("REVIEW_EASY_FILE_MENU")).setIcon("SpacedRepIcon").onClick(() => {
                this.saveReviewResponse(fileish, 0 /* Easy */);
              });
            });
            menu.addItem((item) => {
              item.setTitle(t("REVIEW_GOOD_FILE_MENU")).setIcon("SpacedRepIcon").onClick(() => {
                this.saveReviewResponse(fileish, 1 /* Good */);
              });
            });
            menu.addItem((item) => {
              item.setTitle(t("REVIEW_HARD_FILE_MENU")).setIcon("SpacedRepIcon").onClick(() => {
                this.saveReviewResponse(fileish, 2 /* Hard */);
              });
            });
          }
        })
      );
    }
    this.addCommand({
      id: "srs-note-review-open-note",
      name: t("OPEN_NOTE_FOR_REVIEW"),
      callback: async () => {
        if (!this.syncLock) {
          await this.sync();
          this.reviewNextNoteModal();
        }
      }
    });
    this.addCommand({
      id: "srs-note-review-easy",
      name: t("REVIEW_NOTE_EASY_CMD"),
      callback: () => {
        const openFile = this.app.workspace.getActiveFile();
        if (openFile && openFile.extension === "md") {
          this.saveReviewResponse(openFile, 0 /* Easy */);
        }
      }
    });
    this.addCommand({
      id: "srs-note-review-good",
      name: t("REVIEW_NOTE_GOOD_CMD"),
      callback: () => {
        const openFile = this.app.workspace.getActiveFile();
        if (openFile && openFile.extension === "md") {
          this.saveReviewResponse(openFile, 1 /* Good */);
        }
      }
    });
    this.addCommand({
      id: "srs-note-review-hard",
      name: t("REVIEW_NOTE_HARD_CMD"),
      callback: () => {
        const openFile = this.app.workspace.getActiveFile();
        if (openFile && openFile.extension === "md") {
          this.saveReviewResponse(openFile, 2 /* Hard */);
        }
      }
    });
    this.addCommand({
      id: "srs-review-flashcards",
      name: t("REVIEW_ALL_CARDS"),
      callback: async () => {
        if (!this.syncLock) {
          await this.sync();
          this.openFlashcardModal(
            this.deckTree,
            this.remainingDeckTree,
            1 /* Review */
          );
        }
      }
    });
    this.addCommand({
      id: "srs-cram-flashcards",
      name: t("CRAM_ALL_CARDS"),
      callback: async () => {
        await this.sync();
        this.openFlashcardModal(this.deckTree, this.deckTree, 0 /* Cram */);
      }
    });
    this.addCommand({
      id: "srs-review-flashcards-in-note",
      name: t("REVIEW_CARDS_IN_NOTE"),
      callback: async () => {
        const openFile = this.app.workspace.getActiveFile();
        if (openFile && openFile.extension === "md") {
          this.openFlashcardModalForSingleNote(openFile, 1 /* Review */);
        }
      }
    });
    this.addCommand({
      id: "srs-cram-flashcards-in-note",
      name: t("CRAM_CARDS_IN_NOTE"),
      callback: async () => {
        const openFile = this.app.workspace.getActiveFile();
        if (openFile && openFile.extension === "md") {
          this.openFlashcardModalForSingleNote(openFile, 0 /* Cram */);
        }
      }
    });
    this.addCommand({
      id: "srs-view-stats",
      name: t("VIEW_STATS"),
      callback: async () => {
        if (!this.syncLock) {
          await this.sync();
          new StatsModal(this.app, this).open();
        }
      }
    });
    this.addSettingTab(new SRSettingTab(this.app, this));
    this.app.workspace.onLayoutReady(() => {
      this.initView();
      setTimeout(async () => {
        if (!this.syncLock) {
          await this.sync();
        }
      }, 2e3);
    });
  }
  onunload() {
    this.app.workspace.getLeavesOfType(REVIEW_QUEUE_VIEW_TYPE).forEach((leaf) => leaf.detach());
  }
  async openFlashcardModalForSingleNote(noteFile, reviewMode) {
    const topicPath = this.findTopicPath(this.createSrTFile(noteFile));
    const note = await this.loadNote(noteFile, topicPath);
    const deckTree = new Deck2("root", null);
    note.appendCardsToDeck(deckTree);
    const remainingDeckTree = DeckTreeFilter.filterForRemainingCards(
      this.questionPostponementList,
      deckTree,
      reviewMode
    );
    this.openFlashcardModal(deckTree, remainingDeckTree, reviewMode);
  }
  openFlashcardModal(fullDeckTree, remainingDeckTree, reviewMode) {
    const deckIterator = _SRPlugin.createDeckTreeIterator(this.data.settings);
    const cardScheduleCalculator = new CardScheduleCalculator(
      this.data.settings,
      this.easeByPath
    );
    const reviewSequencer = new FlashcardReviewSequencer(
      reviewMode,
      deckIterator,
      this.data.settings,
      cardScheduleCalculator,
      this.questionPostponementList
    );
    reviewSequencer.setDeckTree(fullDeckTree, remainingDeckTree);
    new FlashcardModal(this.app, this, this.data.settings, reviewSequencer, reviewMode).open();
  }
  static createDeckTreeIterator(settings) {
    let cardOrder = CardOrder[settings.flashcardCardOrder];
    if (cardOrder === void 0)
      cardOrder = 2 /* DueFirstSequential */;
    let deckOrder = DeckOrder[settings.flashcardDeckOrder];
    if (deckOrder === void 0)
      deckOrder = 0 /* PrevDeckComplete_Sequential */;
    console.log(`createDeckTreeIterator: CardOrder: ${cardOrder}, DeckOrder: ${deckOrder}`);
    const iteratorOrder = {
      deckOrder,
      cardOrder
    };
    return new DeckTreeIterator(iteratorOrder, 0 /* UpdatedByIterator */);
  }
  async sync() {
    if (this.syncLock) {
      return;
    }
    this.syncLock = true;
    graph.reset();
    this.easeByPath = new NoteEaseList(this.data.settings);
    this.incomingLinks = {};
    this.pageranks = {};
    this.dueNotesCount = 0;
    this.dueDatesNotes = {};
    this.reviewDecks = {};
    const fullDeckTree = new Deck2("root", null);
    const now = window.moment(Date.now());
    const todayDate = now.format("YYYY-MM-DD");
    if (todayDate !== this.data.buryDate) {
      this.data.buryDate = todayDate;
      this.questionPostponementList.clear();
      await this.savePluginData();
    }
    const notes = this.app.vault.getMarkdownFiles();
    for (const noteFile of notes) {
      if (this.data.settings.noteFoldersToIgnore.some(
        (folder) => noteFile.path.startsWith(folder)
      )) {
        continue;
      }
      if (this.incomingLinks[noteFile.path] === void 0) {
        this.incomingLinks[noteFile.path] = [];
      }
      const links = this.app.metadataCache.resolvedLinks[noteFile.path] || {};
      for (const targetPath in links) {
        if (this.incomingLinks[targetPath] === void 0)
          this.incomingLinks[targetPath] = [];
        if (targetPath.split(".").pop().toLowerCase() === "md") {
          this.incomingLinks[targetPath].push({
            sourcePath: noteFile.path,
            linkCount: links[targetPath]
          });
          graph.link(noteFile.path, targetPath, links[targetPath]);
        }
      }
      const topicPath = this.findTopicPath(this.createSrTFile(noteFile));
      if (topicPath.hasPath) {
        const note = await this.loadNote(noteFile, topicPath);
        const flashcardsInNoteAvgEase = NoteEaseCalculator.Calculate(
          note,
          this.data.settings
        );
        note.appendCardsToDeck(fullDeckTree);
        if (flashcardsInNoteAvgEase > 0) {
          this.easeByPath.setEaseForPath(note.filePath, flashcardsInNoteAvgEase);
        }
      }
      const fileCachedData = this.app.metadataCache.getFileCache(noteFile) || {};
      const frontmatter = fileCachedData.frontmatter || {};
      const tags = (0, import_obsidian11.getAllTags)(fileCachedData) || [];
      let shouldIgnore = true;
      const matchedNoteTags = [];
      for (const tagToReview of this.data.settings.tagsToReview) {
        if (tags.some((tag) => tag === tagToReview || tag.startsWith(tagToReview + "/"))) {
          if (!Object.prototype.hasOwnProperty.call(this.reviewDecks, tagToReview)) {
            this.reviewDecks[tagToReview] = new ReviewDeck(tagToReview);
          }
          matchedNoteTags.push(tagToReview);
          shouldIgnore = false;
          break;
        }
      }
      if (shouldIgnore) {
        continue;
      }
      if (!(Object.prototype.hasOwnProperty.call(frontmatter, "sr-due") && Object.prototype.hasOwnProperty.call(frontmatter, "sr-interval") && Object.prototype.hasOwnProperty.call(frontmatter, "sr-ease"))) {
        for (const matchedNoteTag of matchedNoteTags) {
          this.reviewDecks[matchedNoteTag].newNotes.push(noteFile);
        }
        continue;
      }
      const dueUnix = window.moment(frontmatter["sr-due"], ["YYYY-MM-DD", "DD-MM-YYYY", "ddd MMM DD YYYY"]).valueOf();
      for (const matchedNoteTag of matchedNoteTags) {
        this.reviewDecks[matchedNoteTag].scheduledNotes.push({ note: noteFile, dueUnix });
        if (dueUnix <= now.valueOf()) {
          this.reviewDecks[matchedNoteTag].dueNotesCount++;
        }
      }
      let ease;
      if (this.easeByPath.hasEaseForPath(noteFile.path)) {
        ease = (this.easeByPath.getEaseByPath(noteFile.path) + frontmatter["sr-ease"]) / 2;
      } else {
        ease = frontmatter["sr-ease"];
      }
      this.easeByPath.setEaseForPath(noteFile.path, ease);
      if (dueUnix <= now.valueOf()) {
        this.dueNotesCount++;
      }
      const nDays = Math.ceil((dueUnix - now.valueOf()) / (24 * 3600 * 1e3));
      if (!Object.prototype.hasOwnProperty.call(this.dueDatesNotes, nDays)) {
        this.dueDatesNotes[nDays] = 0;
      }
      this.dueDatesNotes[nDays]++;
    }
    graph.rank(0.85, 1e-6, (node, rank2) => {
      this.pageranks[node] = rank2 * 1e4;
    });
    this.deckTree = DeckTreeFilter.filterForReviewableCards(fullDeckTree);
    this.deckTree.sortSubdecksList();
    this.remainingDeckTree = DeckTreeFilter.filterForRemainingCards(
      this.questionPostponementList,
      this.deckTree,
      1 /* Review */
    );
    const calc = new DeckTreeStatsCalculator();
    this.cardStats = calc.calculate(this.deckTree);
    if (this.data.settings.showDebugMessages) {
      console.log(`SR: ${t("EASES")}`, this.easeByPath.dict);
      console.log(`SR: ${t("DECKS")}`, this.deckTree);
    }
    for (const deckKey in this.reviewDecks) {
      this.reviewDecks[deckKey].sortNotes(this.pageranks);
    }
    if (this.data.settings.showDebugMessages) {
      console.log(
        "SR: " + t("SYNC_TIME_TAKEN", {
          t: Date.now() - now.valueOf()
        })
      );
    }
    this.statusBar.setText(
      t("STATUS_BAR", {
        dueNotesCount: this.dueNotesCount,
        dueFlashcardsCount: this.remainingDeckTree.getCardCount(2 /* All */, true)
      })
    );
    if (this.data.settings.enableNoteReviewPaneOnStartup)
      this.reviewQueueView.redraw();
    this.syncLock = false;
  }
  async loadNote(noteFile, topicPath) {
    const loader = new NoteFileLoader(this.data.settings);
    const note = await loader.load(this.createSrTFile(noteFile), topicPath);
    if (note.hasChanged)
      note.writeNoteFile(this.data.settings);
    return note;
  }
  async saveReviewResponse(note, response) {
    const fileCachedData = this.app.metadataCache.getFileCache(note) || {};
    const frontmatter = fileCachedData.frontmatter || {};
    const tags = (0, import_obsidian11.getAllTags)(fileCachedData) || [];
    if (this.data.settings.noteFoldersToIgnore.some((folder) => note.path.startsWith(folder))) {
      new import_obsidian11.Notice(t("NOTE_IN_IGNORED_FOLDER"));
      return;
    }
    let shouldIgnore = true;
    for (const tag of tags) {
      if (this.data.settings.tagsToReview.some(
        (tagToReview) => tag === tagToReview || tag.startsWith(tagToReview + "/")
      )) {
        shouldIgnore = false;
        break;
      }
    }
    if (shouldIgnore) {
      new import_obsidian11.Notice(t("PLEASE_TAG_NOTE"));
      return;
    }
    let fileText = await this.app.vault.read(note);
    let ease, interval, delayBeforeReview;
    const now = Date.now();
    if (!(Object.prototype.hasOwnProperty.call(frontmatter, "sr-due") && Object.prototype.hasOwnProperty.call(frontmatter, "sr-interval") && Object.prototype.hasOwnProperty.call(frontmatter, "sr-ease"))) {
      let linkTotal = 0, linkPGTotal = 0, totalLinkCount = 0;
      for (const statObj of this.incomingLinks[note.path] || []) {
        const ease2 = this.easeByPath.getEaseByPath(statObj.sourcePath);
        if (ease2) {
          linkTotal += statObj.linkCount * this.pageranks[statObj.sourcePath] * ease2;
          linkPGTotal += this.pageranks[statObj.sourcePath] * statObj.linkCount;
          totalLinkCount += statObj.linkCount;
        }
      }
      const outgoingLinks = this.app.metadataCache.resolvedLinks[note.path] || {};
      for (const linkedFilePath in outgoingLinks) {
        const ease2 = this.easeByPath.getEaseByPath(linkedFilePath);
        if (ease2) {
          linkTotal += outgoingLinks[linkedFilePath] * this.pageranks[linkedFilePath] * ease2;
          linkPGTotal += this.pageranks[linkedFilePath] * outgoingLinks[linkedFilePath];
          totalLinkCount += outgoingLinks[linkedFilePath];
        }
      }
      const linkContribution = this.data.settings.maxLinkFactor * Math.min(1, Math.log(totalLinkCount + 0.5) / Math.log(64));
      ease = (1 - linkContribution) * this.data.settings.baseEase + (totalLinkCount > 0 ? linkContribution * linkTotal / linkPGTotal : linkContribution * this.data.settings.baseEase);
      if (this.easeByPath.hasEaseForPath(note.path)) {
        ease = (ease + this.easeByPath.getEaseByPath(note.path)) / 2;
      }
      ease = Math.round(ease);
      interval = 1;
      delayBeforeReview = 0;
    } else {
      interval = frontmatter["sr-interval"];
      ease = frontmatter["sr-ease"];
      delayBeforeReview = now - window.moment(frontmatter["sr-due"], ["YYYY-MM-DD", "DD-MM-YYYY", "ddd MMM DD YYYY"]).valueOf();
    }
    const schedObj = schedule(
      response,
      interval,
      ease,
      delayBeforeReview,
      this.data.settings,
      this.dueDatesNotes
    );
    interval = schedObj.interval;
    ease = schedObj.ease;
    const due = window.moment(now + interval * 24 * 3600 * 1e3);
    const dueString = due.format("YYYY-MM-DD");
    if (SCHEDULING_INFO_REGEX.test(fileText)) {
      const schedulingInfo = SCHEDULING_INFO_REGEX.exec(fileText);
      fileText = fileText.replace(
        SCHEDULING_INFO_REGEX,
        `---
${schedulingInfo[1]}sr-due: ${dueString}
sr-interval: ${interval}
sr-ease: ${ease}
${schedulingInfo[5]}---`
      );
    } else if (YAML_FRONT_MATTER_REGEX.test(fileText)) {
      const existingYaml = YAML_FRONT_MATTER_REGEX.exec(fileText);
      fileText = fileText.replace(
        YAML_FRONT_MATTER_REGEX,
        `---
${existingYaml[1]}sr-due: ${dueString}
sr-interval: ${interval}
sr-ease: ${ease}
---`
      );
    } else {
      fileText = `---
sr-due: ${dueString}
sr-interval: ${interval}
sr-ease: ${ease}
---

${fileText}`;
    }
    if (this.data.settings.burySiblingCards) {
      const topicPath = this.findTopicPath(this.createSrTFile(note));
      const noteX = await this.loadNote(note, topicPath);
      for (const question of noteX.questionList) {
        this.data.buryList.push(question.questionText.textHash);
      }
      await this.savePluginData();
    }
    await this.app.vault.modify(note, fileText);
    new import_obsidian11.Notice(t("RESPONSE_RECEIVED"));
    await this.sync();
    if (this.data.settings.autoNextNote) {
      this.reviewNextNote(this.lastSelectedReviewDeck);
    }
  }
  async reviewNextNoteModal() {
    const reviewDeckNames = Object.keys(this.reviewDecks);
    if (reviewDeckNames.length === 1) {
      this.reviewNextNote(reviewDeckNames[0]);
    } else {
      const deckSelectionModal = new ReviewDeckSelectionModal(this.app, reviewDeckNames);
      deckSelectionModal.submitCallback = (deckKey) => this.reviewNextNote(deckKey);
      deckSelectionModal.open();
    }
  }
  async reviewNextNote(deckKey) {
    if (!Object.prototype.hasOwnProperty.call(this.reviewDecks, deckKey)) {
      new import_obsidian11.Notice(t("NO_DECK_EXISTS", { deckName: deckKey }));
      return;
    }
    this.lastSelectedReviewDeck = deckKey;
    const deck = this.reviewDecks[deckKey];
    if (deck.dueNotesCount > 0) {
      const index = this.data.settings.openRandomNote ? Math.floor(Math.random() * deck.dueNotesCount) : 0;
      await this.app.workspace.getLeaf().openFile(deck.scheduledNotes[index].note);
      return;
    }
    if (deck.newNotes.length > 0) {
      const index = this.data.settings.openRandomNote ? Math.floor(Math.random() * deck.newNotes.length) : 0;
      this.app.workspace.getLeaf().openFile(deck.newNotes[index]);
      return;
    }
    new import_obsidian11.Notice(t("ALL_CAUGHT_UP"));
  }
  createSrTFile(note) {
    return new SrTFile(this.app.vault, this.app.metadataCache, note);
  }
  findTopicPath(note) {
    return TopicPath.getTopicPathOfFile(note, this.data.settings);
  }
  async loadPluginData() {
    const loadedData = await this.loadData();
    if (loadedData == null ? void 0 : loadedData.settings)
      upgradeSettings(loadedData.settings);
    this.data = Object.assign({}, DEFAULT_DATA, loadedData);
    this.data.settings = Object.assign({}, DEFAULT_SETTINGS, this.data.settings);
  }
  async savePluginData() {
    await this.saveData(this.data);
  }
  initView() {
    this.registerView(
      REVIEW_QUEUE_VIEW_TYPE,
      (leaf) => this.reviewQueueView = new ReviewQueueListView(leaf, this)
    );
    if (this.data.settings.enableNoteReviewPaneOnStartup && app.workspace.getLeavesOfType(REVIEW_QUEUE_VIEW_TYPE).length == 0) {
      this.app.workspace.getRightLeaf(false).setViewState({
        type: REVIEW_QUEUE_VIEW_TYPE,
        active: true
      });
    }
  }
};
/*! Bundled license information:

moment/moment.js:
  (*! moment.js *)
  (*! version : 2.30.1 *)
  (*! authors : Tim Wood, Iskren Chernev, Moment.js contributors *)
  (*! license : MIT *)
  (*! momentjs.com *)

@kurkle/color/dist/color.esm.js:
  (*!
   * @kurkle/color v0.3.2
   * https://github.com/kurkle/color#readme
   * (c) 2023 Jukka Kurkela
   * Released under the MIT License
   *)

chart.js/dist/chunks/helpers.segment.js:
  (*!
   * Chart.js v4.4.1
   * https://www.chartjs.org
   * (c) 2023 Chart.js Contributors
   * Released under the MIT License
   *)

chart.js/dist/chart.js:
  (*!
   * Chart.js v4.4.1
   * https://www.chartjs.org
   * (c) 2023 Chart.js Contributors
   * Released under the MIT License
   *)
*/