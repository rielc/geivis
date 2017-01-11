!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==typeof c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["1"], [], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('2', [], true, function ($__require, exports, module) {
	/* */
	'use strict';
	/* eslint-disable no-unused-vars */

	var define,
	    global = this || self,
	    GLOBAL = global;
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
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc'); // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
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

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};
	return module.exports;
});
$__System.registerDynamic("3", ["2"], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  module.exports = $__require("2");
  return module.exports;
});
$__System.register("4", ["3", "5", "6"], function (_export) {
  var objectAssign, _createClass, _classCallCheck, __hotReload, StateMachine;

  return {
    setters: [function (_3) {
      objectAssign = _3["default"];
    }, function (_) {
      _createClass = _["default"];
    }, function (_2) {
      _classCallCheck = _2["default"];
    }],
    execute: function () {
      "use strict";

      __hotReload = true;

      _export("__hotReload", __hotReload);

      StateMachine = (function () {
        function StateMachine() {
          _classCallCheck(this, StateMachine);

          this.state = {
            brushStart: null,
            brushEnd: null,
            active: "subjects",
            activeItem: null,
            loaded: false,
            timestamp: null,
            visible: { StreamSection: true },
            scrollY: 0,
            tooltip: {},
            filters: {}
          };
          this.history = [];
          this.history.push(objectAssign({}, this.state));
          this.size = 10;
          this.subscriber = [];
        }

        _createClass(StateMachine, [{
          key: "push",
          value: function push(state) {
            //console.log("push");
            if (this.history.length >= this.size) {
              this.history.pop();
            }
            var lastState = this.history[0];
            var newState = objectAssign({}, this.state, state);
            this.history.unshift(newState);
            // this.state = objectAssign({}, newState);
            this.lastState = lastState;
            this.state = newState;
            // console.log(newState)
            this.broadcast();
          }
        }, {
          key: "subscribe",
          value: function subscribe(c) {
            this.subscriber.push(c);
          }
        }, {
          key: "broadcast",
          value: function broadcast() {
            // console.log("broadcast", this.state.brushEnd, this.state.brushEnd);
            // console.log(this.subscriber);
            var lastState = this.lastState;
            var newState = this.state;

            this.subscriber.map(function (s) {
              //console.log("broadcast", s.name)
              s.stateChange(newState, lastState);
            });
          }
        }]);

        return StateMachine;
      })();

      _export("StateMachine", StateMachine);
    }
  };
});
$__System.registerDynamic('7', ['8', '9'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var toObject = $__require('8');
  $__require('9')('keys', function ($keys) {
    return function keys(it) {
      return $keys(toObject(it));
    };
  });
  return module.exports;
});
$__System.registerDynamic('a', ['7', 'b'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  $__require('7');
  module.exports = $__require('b').Object.keys;
  return module.exports;
});
$__System.registerDynamic("c", ["a"], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  module.exports = { "default": $__require("a"), __esModule: true };
  return module.exports;
});
$__System.register("d", ["5", "6", "e", "c"], function (_export) {
  var _createClass, _classCallCheck, _extends, _Object$keys, __hotReload, DataBase;

  return {
    setters: [function (_) {
      _createClass = _["default"];
    }, function (_2) {
      _classCallCheck = _2["default"];
    }, function (_e) {
      _extends = _e["default"];
    }, function (_c) {
      _Object$keys = _c["default"];
    }],
    execute: function () {
      "use strict";

      __hotReload = true;

      _export("__hotReload", __hotReload);

      DataBase = (function () {
        function DataBase(state) {
          _classCallCheck(this, DataBase);

          this.data = [];
          this.formater = d3.timeParse("%Y");
          this.extent = [0, 0];
          this.crossfilter = {};
          this.state = state;
          this.name = this.constructor.name;
          this.store = {};
          this.bookshelfData = [];

          this.state.subscribe(this);
        }

        _createClass(DataBase, [{
          key: "load",
          value: function load() {
            var _this = this;

            // this.state.push({ loading: true });

            d3.csv("data/data.csv", function (data) {
              d3.csv("data/geocode.csv", function (geocode) {
                d3.json("data/map/topo.json", function (rivers) {
                  d3.json("data/map/landbig.json", function (land) {

                    _this.add({ rivers: rivers });
                    _this.add({ land: land });
                    _this.init(data, geocode);

                    _this.state.push({ loaded: true, keyframe: true });
                  });
                });
              });
            });

            return this;
          }
        }, {
          key: "init",
          value: function init(_data, _geocode) {
            var _this2 = this;

            this.data = _data.filter(function (d) {
              return d.year <= 1920 && d.year >= 1717;
            });
            this.geocode = _geocode;

            this.data.forEach(function (d) {
              d.date = _this2.formater(d.year);
              d.year = parseInt(d.year);
              d.place = d.publisher_city;

              var geo = _geocode.find(function (g) {
                return g.name === d.place;
              });
              d.lat = geo ? +geo.lat : null;
              d.lon = geo ? +geo.lon : null;

              d.RSWKTag = d.RSWKTag.split(",");

              d.publisher = d.publisher || "none";
              d.schoollevel = d.schoollevel || "none";
              d.subject = d.subject || "none";
              d.place = d.place || "none";
            });

            this.extent = d3.extent(this.data, function (d) {
              return d.date;
            });

            this.crossfilter = crossfilter(this.data);
            this.all = this.crossfilter.groupAll();

            this.date = this.crossfilter.dimension(function (d) {
              return d.date;
            });
            this.dates = this.date.group(d3.timeYear);

            this.subject = this.crossfilter.dimension(function (d) {
              return d.subject;
            });
            this.subjects = this.subject.group();

            this.schoollevel = this.crossfilter.dimension(function (d) {
              return d.schoollevel;
            });
            this.schoollevels = this.schoollevel.group();

            this.publisher = this.crossfilter.dimension(function (d) {
              return d.publisher;
            });
            this.publishers = this.publisher.group();

            this.place = this.crossfilter.dimension(function (d) {
              return d.place;
            });
            this.places = this.place.group();

            this.tag = this.crossfilter.dimension(function (d) {
              return d.RSWKTag || [];
            }, true);
            this.tags2 = this.crossfilter.dimension(function (d) {
              return d.RSWKTag || [];
            }, true).group();
            this.tags = this.tag.group();

            this.stack = d3.stack().value(function (d, k) {
              return d.value[k];
            }).order(d3.stackOrderAscending).offset(d3.stackOffsetNone);

            this.filters = {};

            return this;
          }
        }, {
          key: "filterTag",
          value: function filterTag(tag) {
            // let data = this.date.top(Infinity);
            // console.log(data[0]);

            console.time("tags");
            this.tag.filter(tag);
            var tags = this.tags2.all(); //.all().sort((b,a) => a.value - b.value)
            console.timeEnd("tags");
            console.log(tags);
            // console.log(this.places.all());
          }
        }, {
          key: "add",
          value: function add(data) {
            this.store = _extends({}, data, this.store);
            // console.log(this.store);
            return this;
          }
        }, {
          key: "bookshelf",
          value: function bookshelf() {
            var visible = this.state.state.visible;

            if (visible.TreemapSection || visible.NetworkSection) {
              return this.bookshelfData;
            }

            return this.date.top(150);
          }
        }, {
          key: "stackedHistogram",
          value: function stackedHistogram() {

            this.date.filterAll();

            var key = this.state.state.active.substring(0, this.state.state.active.length - 1);
            var keys = this[this.state.state.active].top(20).map(function (d) {
              return d.key;
            });
            keys.push("other");
            var other = keys.length - 1;

            function reduceAdd(p, v, nf) {
              var i = keys.indexOf(v[key]);
              // ++p[i+1 ? i : other];
              ++p[i + 1 ? i : other];
              return p;
            }

            function reduceRemove(p, v, nf) {
              var i = keys.indexOf(v[key]);
              // --p[i+1 ? i : other];
              --p[i + 1 ? i : other];
              return p;
            }

            function reduceInitial() {
              return keys.map(function (d) {
                return 0;
              });
            }

            var histogram = this.dates.reduce(reduceAdd, reduceRemove, reduceInitial).all();
            var stack = this.stack.keys(keys.map(function (d, i) {
              return i;
            }))(histogram);
            stack.forEach(function (d) {
              d.key = keys[d.key];
            });
            //console.log(stack);

            this.date.filterRange([this.state.state.brushStart, this.state.state.brushEnd]);

            return stack;
          }
        }, {
          key: "stateChange",
          value: function stateChange(next, curr) {
            var _this3 = this;

            // this.filterTag("Preußen")

            if (next.brushStart !== curr.brushStart) {
              if (next.brushStart * 1 === next.brushEnd * 1) {
                this.date.filterAll();
              } else {
                // hack for filterRange see https://github.com/crossfilter/crossfilter/wiki/Crossfilter-Gotchas#filterrange-does-not-include-the-top-point
                this.date.filterRange([next.brushStart, next.brushEnd.setMonth(2)]);
              }
            }

            if (next.activeItem !== curr.activeItem) {
              // let k2 = curr.active.substring(0,curr.active.length-1);
              // this[k2].filterExact(null);

              // let k = next.active.substring(0,next.active.length-1);
              // this[k].filterExact(next.activeItem);

              // this.filters[k] = next.activeItem;

              //console.log(curr.active, next.active)
              // console.log(this.filters, Object.keys(this.filters))

              // Object.keys(this.filters).forEach(k=>{
              //   this[k].filterExact(this.filters[k]);
              // })

            }

            if (next.filters !== curr.filters) {
              console.log(next.filters);

              _Object$keys(next.filters).forEach(function (k) {
                _this3[k.substring(0, k.length - 1)].filterExact(next.filters[k]);
              });
            }

            // if(next.loaded == !curr.loaded){
            //   this.state.push({ brushStart: this.extent[0], brushEnd: this.extent[1], keyframe:true })
            // }

            // console.time("simple");
            // const startYear = this.state.brushStart.getFullYear();
            // const endYear = this.state.brushEnd.getFullYear();
            // const data = this.data.filter(d => d.year >= startYear && d.year <= endYear );
            // const nest = d3.nest().key(d => d.classification[this.key]).entries(data);
            // //console.log(nest);
            // console.timeEnd("simple");

            // console.time("crossfilter");
            // db.date.filterRange([this.state.brushStart, this.state.brushEnd]);
            // // console.log(group);
            // console.timeEnd("crossfilter");
          }

          // merge(_data, _dataRaw){
          //   console.log(this.data[0], _dataRaw[0])

          //   _data.forEach((d,i) => {
          //     const a = _dataRaw.find(d2 => (d2.title == d.title && d2.year == d.year && d2.subject == d.subject));
          //     if(!a){
          //       console.log(d);
          //     }
          //   })
          // }

          // d3histogram(){
          //   const bins = this.x.ticks(d3.timeYear);

          //   console.time("histo")
          //   let histo = d3.histogram()
          //       .value(d=> { return d.date})
          //       .domain(this.x.domain())
          //       .thresholds(bins)(_data);
          //   console.timeEnd("histo")

          //   histo.forEach(bin => {
          //     bin.nest = d3.nest()
          //       .key(d => d[k] || null)
          //       .entries(bin);
          //   })
          // }
        }]);

        return DataBase;
      })();

      _export("DataBase", DataBase);
    }
  };
});
$__System.register('f', ['5', '6', '10'], function (_export) {
  var _createClass, _classCallCheck, debounce, fromPairs, ScrollListener;

  function __hotReload() {
    // window.removeEventListener('scroll')
    return true;
  }

  return {
    setters: [function (_) {
      _createClass = _['default'];
    }, function (_2) {
      _classCallCheck = _2['default'];
    }, function (_3) {
      debounce = _3.debounce;
      fromPairs = _3.fromPairs;
    }],
    execute: function () {
      'use strict';

      _export('__hotReload', __hotReload);

      ScrollListener = (function () {
        function ScrollListener(state) {
          _classCallCheck(this, ScrollListener);

          this.name = this.constructor.name;
          this.state = state;
          this.state.subscribe(this);
          // window.addEventListener('scroll', debounce(this.check, 150).bind(this));
          window.addEventListener('scroll', this.check.bind(this));
          //this.check();
        }

        _createClass(ScrollListener, [{
          key: 'check',
          value: function check() {
            var visible = this.state.subscriber.filter(function (d) {
              return d.type == "section";
            }).map(function (s) {

              var rect = s.div.node().getBoundingClientRect();
              var height = parseInt(s.div.style("height")) - 188;
              var visible = rect.top >= -height && rect.top <= height;

              // console.log(s.name, visible);

              return [s.name, visible];
            });

            this.state.push({ scrollY: window.scrollY, visible: fromPairs(visible) });
          }
        }, {
          key: 'stateChange',
          value: function stateChange(next, prev) {
            if (next.loaded == !prev.loaded) {
              this.check();
              this.scrollTo(next.scrollY);
            }
          }
        }, {
          key: 'scrollTo',
          value: (function (_scrollTo) {
            function scrollTo(_x) {
              return _scrollTo.apply(this, arguments);
            }

            scrollTo.toString = function () {
              return _scrollTo.toString();
            };

            return scrollTo;
          })(function (pos) {
            scrollTo(0, pos);

            // d3.transition()
            //   // .delay(0)
            //   .duration(1000)
            //   .tween("scroll", this.scrollTween(pos));
          })
        }, {
          key: 'scrollTween',
          value: function scrollTween(offset) {
            return function () {
              var i = d3.interpolateNumber(window.pageYOffset || document.documentElement.scrollTop, offset);
              return function (t) {
                scrollTo(0, i(t));
              };
            };
          }
        }]);

        return ScrollListener;
      })();

      _export('ScrollListener', ScrollListener);
    }
  };
});
$__System.registerDynamic('11', ['@empty'], true, function ($__require, exports, module) {
  /* */
  "format cjs";

  var define,
      global = this || self,
      GLOBAL = global;
  (function (Buffer, process) {
    ;
    (function () {
      var undefined;
      var VERSION = '4.17.4';
      var LARGE_ARRAY_SIZE = 200;
      var CORE_ERROR_TEXT = 'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.',
          FUNC_ERROR_TEXT = 'Expected a function';
      var HASH_UNDEFINED = '__lodash_hash_undefined__';
      var MAX_MEMOIZE_SIZE = 500;
      var PLACEHOLDER = '__lodash_placeholder__';
      var CLONE_DEEP_FLAG = 1,
          CLONE_FLAT_FLAG = 2,
          CLONE_SYMBOLS_FLAG = 4;
      var COMPARE_PARTIAL_FLAG = 1,
          COMPARE_UNORDERED_FLAG = 2;
      var WRAP_BIND_FLAG = 1,
          WRAP_BIND_KEY_FLAG = 2,
          WRAP_CURRY_BOUND_FLAG = 4,
          WRAP_CURRY_FLAG = 8,
          WRAP_CURRY_RIGHT_FLAG = 16,
          WRAP_PARTIAL_FLAG = 32,
          WRAP_PARTIAL_RIGHT_FLAG = 64,
          WRAP_ARY_FLAG = 128,
          WRAP_REARG_FLAG = 256,
          WRAP_FLIP_FLAG = 512;
      var DEFAULT_TRUNC_LENGTH = 30,
          DEFAULT_TRUNC_OMISSION = '...';
      var HOT_COUNT = 800,
          HOT_SPAN = 16;
      var LAZY_FILTER_FLAG = 1,
          LAZY_MAP_FLAG = 2,
          LAZY_WHILE_FLAG = 3;
      var INFINITY = 1 / 0,
          MAX_SAFE_INTEGER = 9007199254740991,
          MAX_INTEGER = 1.7976931348623157e+308,
          NAN = 0 / 0;
      var MAX_ARRAY_LENGTH = 4294967295,
          MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
          HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
      var wrapFlags = [['ary', WRAP_ARY_FLAG], ['bind', WRAP_BIND_FLAG], ['bindKey', WRAP_BIND_KEY_FLAG], ['curry', WRAP_CURRY_FLAG], ['curryRight', WRAP_CURRY_RIGHT_FLAG], ['flip', WRAP_FLIP_FLAG], ['partial', WRAP_PARTIAL_FLAG], ['partialRight', WRAP_PARTIAL_RIGHT_FLAG], ['rearg', WRAP_REARG_FLAG]];
      var argsTag = '[object Arguments]',
          arrayTag = '[object Array]',
          asyncTag = '[object AsyncFunction]',
          boolTag = '[object Boolean]',
          dateTag = '[object Date]',
          domExcTag = '[object DOMException]',
          errorTag = '[object Error]',
          funcTag = '[object Function]',
          genTag = '[object GeneratorFunction]',
          mapTag = '[object Map]',
          numberTag = '[object Number]',
          nullTag = '[object Null]',
          objectTag = '[object Object]',
          promiseTag = '[object Promise]',
          proxyTag = '[object Proxy]',
          regexpTag = '[object RegExp]',
          setTag = '[object Set]',
          stringTag = '[object String]',
          symbolTag = '[object Symbol]',
          undefinedTag = '[object Undefined]',
          weakMapTag = '[object WeakMap]',
          weakSetTag = '[object WeakSet]';
      var arrayBufferTag = '[object ArrayBuffer]',
          dataViewTag = '[object DataView]',
          float32Tag = '[object Float32Array]',
          float64Tag = '[object Float64Array]',
          int8Tag = '[object Int8Array]',
          int16Tag = '[object Int16Array]',
          int32Tag = '[object Int32Array]',
          uint8Tag = '[object Uint8Array]',
          uint8ClampedTag = '[object Uint8ClampedArray]',
          uint16Tag = '[object Uint16Array]',
          uint32Tag = '[object Uint32Array]';
      var reEmptyStringLeading = /\b__p \+= '';/g,
          reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
          reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
      var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
          reUnescapedHtml = /[&<>"']/g,
          reHasEscapedHtml = RegExp(reEscapedHtml.source),
          reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
      var reEscape = /<%-([\s\S]+?)%>/g,
          reEvaluate = /<%([\s\S]+?)%>/g,
          reInterpolate = /<%=([\s\S]+?)%>/g;
      var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
          reIsPlainProp = /^\w*$/,
          reLeadingDot = /^\./,
          rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
      var reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
          reHasRegExpChar = RegExp(reRegExpChar.source);
      var reTrim = /^\s+|\s+$/g,
          reTrimStart = /^\s+/,
          reTrimEnd = /\s+$/;
      var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
          reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
          reSplitDetails = /,? & /;
      var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
      var reEscapeChar = /\\(\\)?/g;
      var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
      var reFlags = /\w*$/;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
      var reIsOctal = /^0o[0-7]+$/i;
      var reIsUint = /^(?:0|[1-9]\d*)$/;
      var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
      var reNoMatch = /($^)/;
      var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
      var rsAstralRange = '\\ud800-\\udfff',
          rsComboMarksRange = '\\u0300-\\u036f',
          reComboHalfMarksRange = '\\ufe20-\\ufe2f',
          rsComboSymbolsRange = '\\u20d0-\\u20ff',
          rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
          rsDingbatRange = '\\u2700-\\u27bf',
          rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
          rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
          rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
          rsPunctuationRange = '\\u2000-\\u206f',
          rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
          rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
          rsVarRange = '\\ufe0e\\ufe0f',
          rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
      var rsApos = "['\u2019]",
          rsAstral = '[' + rsAstralRange + ']',
          rsBreak = '[' + rsBreakRange + ']',
          rsCombo = '[' + rsComboRange + ']',
          rsDigits = '\\d+',
          rsDingbat = '[' + rsDingbatRange + ']',
          rsLower = '[' + rsLowerRange + ']',
          rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
          rsFitz = '\\ud83c[\\udffb-\\udfff]',
          rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
          rsNonAstral = '[^' + rsAstralRange + ']',
          rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
          rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
          rsUpper = '[' + rsUpperRange + ']',
          rsZWJ = '\\u200d';
      var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
          rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
          rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
          rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
          reOptMod = rsModifier + '?',
          rsOptVar = '[' + rsVarRange + ']?',
          rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
          rsOrdLower = '\\d*(?:(?:1st|2nd|3rd|(?![123])\\dth)\\b)',
          rsOrdUpper = '\\d*(?:(?:1ST|2ND|3RD|(?![123])\\dTH)\\b)',
          rsSeq = rsOptVar + reOptMod + rsOptJoin,
          rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq,
          rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
      var reApos = RegExp(rsApos, 'g');
      var reComboMark = RegExp(rsCombo, 'g');
      var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');
      var reUnicodeWord = RegExp([rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')', rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')', rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower, rsUpper + '+' + rsOptContrUpper, rsOrdUpper, rsOrdLower, rsDigits, rsEmoji].join('|'), 'g');
      var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + ']');
      var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
      var contextProps = ['Array', 'Buffer', 'DataView', 'Date', 'Error', 'Float32Array', 'Float64Array', 'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Map', 'Math', 'Object', 'Promise', 'RegExp', 'Set', 'String', 'Symbol', 'TypeError', 'Uint8Array', 'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'WeakMap', '_', 'clearTimeout', 'isFinite', 'parseInt', 'setTimeout'];
      var templateCounter = -1;
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
      var cloneableTags = {};
      cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
      cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
      var deburredLetters = {
        '\xc0': 'A',
        '\xc1': 'A',
        '\xc2': 'A',
        '\xc3': 'A',
        '\xc4': 'A',
        '\xc5': 'A',
        '\xe0': 'a',
        '\xe1': 'a',
        '\xe2': 'a',
        '\xe3': 'a',
        '\xe4': 'a',
        '\xe5': 'a',
        '\xc7': 'C',
        '\xe7': 'c',
        '\xd0': 'D',
        '\xf0': 'd',
        '\xc8': 'E',
        '\xc9': 'E',
        '\xca': 'E',
        '\xcb': 'E',
        '\xe8': 'e',
        '\xe9': 'e',
        '\xea': 'e',
        '\xeb': 'e',
        '\xcc': 'I',
        '\xcd': 'I',
        '\xce': 'I',
        '\xcf': 'I',
        '\xec': 'i',
        '\xed': 'i',
        '\xee': 'i',
        '\xef': 'i',
        '\xd1': 'N',
        '\xf1': 'n',
        '\xd2': 'O',
        '\xd3': 'O',
        '\xd4': 'O',
        '\xd5': 'O',
        '\xd6': 'O',
        '\xd8': 'O',
        '\xf2': 'o',
        '\xf3': 'o',
        '\xf4': 'o',
        '\xf5': 'o',
        '\xf6': 'o',
        '\xf8': 'o',
        '\xd9': 'U',
        '\xda': 'U',
        '\xdb': 'U',
        '\xdc': 'U',
        '\xf9': 'u',
        '\xfa': 'u',
        '\xfb': 'u',
        '\xfc': 'u',
        '\xdd': 'Y',
        '\xfd': 'y',
        '\xff': 'y',
        '\xc6': 'Ae',
        '\xe6': 'ae',
        '\xde': 'Th',
        '\xfe': 'th',
        '\xdf': 'ss',
        '\u0100': 'A',
        '\u0102': 'A',
        '\u0104': 'A',
        '\u0101': 'a',
        '\u0103': 'a',
        '\u0105': 'a',
        '\u0106': 'C',
        '\u0108': 'C',
        '\u010a': 'C',
        '\u010c': 'C',
        '\u0107': 'c',
        '\u0109': 'c',
        '\u010b': 'c',
        '\u010d': 'c',
        '\u010e': 'D',
        '\u0110': 'D',
        '\u010f': 'd',
        '\u0111': 'd',
        '\u0112': 'E',
        '\u0114': 'E',
        '\u0116': 'E',
        '\u0118': 'E',
        '\u011a': 'E',
        '\u0113': 'e',
        '\u0115': 'e',
        '\u0117': 'e',
        '\u0119': 'e',
        '\u011b': 'e',
        '\u011c': 'G',
        '\u011e': 'G',
        '\u0120': 'G',
        '\u0122': 'G',
        '\u011d': 'g',
        '\u011f': 'g',
        '\u0121': 'g',
        '\u0123': 'g',
        '\u0124': 'H',
        '\u0126': 'H',
        '\u0125': 'h',
        '\u0127': 'h',
        '\u0128': 'I',
        '\u012a': 'I',
        '\u012c': 'I',
        '\u012e': 'I',
        '\u0130': 'I',
        '\u0129': 'i',
        '\u012b': 'i',
        '\u012d': 'i',
        '\u012f': 'i',
        '\u0131': 'i',
        '\u0134': 'J',
        '\u0135': 'j',
        '\u0136': 'K',
        '\u0137': 'k',
        '\u0138': 'k',
        '\u0139': 'L',
        '\u013b': 'L',
        '\u013d': 'L',
        '\u013f': 'L',
        '\u0141': 'L',
        '\u013a': 'l',
        '\u013c': 'l',
        '\u013e': 'l',
        '\u0140': 'l',
        '\u0142': 'l',
        '\u0143': 'N',
        '\u0145': 'N',
        '\u0147': 'N',
        '\u014a': 'N',
        '\u0144': 'n',
        '\u0146': 'n',
        '\u0148': 'n',
        '\u014b': 'n',
        '\u014c': 'O',
        '\u014e': 'O',
        '\u0150': 'O',
        '\u014d': 'o',
        '\u014f': 'o',
        '\u0151': 'o',
        '\u0154': 'R',
        '\u0156': 'R',
        '\u0158': 'R',
        '\u0155': 'r',
        '\u0157': 'r',
        '\u0159': 'r',
        '\u015a': 'S',
        '\u015c': 'S',
        '\u015e': 'S',
        '\u0160': 'S',
        '\u015b': 's',
        '\u015d': 's',
        '\u015f': 's',
        '\u0161': 's',
        '\u0162': 'T',
        '\u0164': 'T',
        '\u0166': 'T',
        '\u0163': 't',
        '\u0165': 't',
        '\u0167': 't',
        '\u0168': 'U',
        '\u016a': 'U',
        '\u016c': 'U',
        '\u016e': 'U',
        '\u0170': 'U',
        '\u0172': 'U',
        '\u0169': 'u',
        '\u016b': 'u',
        '\u016d': 'u',
        '\u016f': 'u',
        '\u0171': 'u',
        '\u0173': 'u',
        '\u0174': 'W',
        '\u0175': 'w',
        '\u0176': 'Y',
        '\u0177': 'y',
        '\u0178': 'Y',
        '\u0179': 'Z',
        '\u017b': 'Z',
        '\u017d': 'Z',
        '\u017a': 'z',
        '\u017c': 'z',
        '\u017e': 'z',
        '\u0132': 'IJ',
        '\u0133': 'ij',
        '\u0152': 'Oe',
        '\u0153': 'oe',
        '\u0149': "'n",
        '\u017f': 's'
      };
      var htmlEscapes = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      };
      var htmlUnescapes = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'"
      };
      var stringEscapes = {
        '\\': '\\',
        "'": "'",
        '\n': 'n',
        '\r': 'r',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
      };
      var freeParseFloat = parseFloat,
          freeParseInt = parseInt;
      var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
      var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function('return this')();
      var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
      var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var freeProcess = moduleExports && freeGlobal.process;
      var nodeUtil = function () {
        try {
          return freeProcess && freeProcess.binding && freeProcess.binding('util');
        } catch (e) {}
      }();
      var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer,
          nodeIsDate = nodeUtil && nodeUtil.isDate,
          nodeIsMap = nodeUtil && nodeUtil.isMap,
          nodeIsRegExp = nodeUtil && nodeUtil.isRegExp,
          nodeIsSet = nodeUtil && nodeUtil.isSet,
          nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
      function addMapEntry(map, pair) {
        map.set(pair[0], pair[1]);
        return map;
      }
      function addSetEntry(set, value) {
        set.add(value);
        return set;
      }
      function apply(func, thisArg, args) {
        switch (args.length) {
          case 0:
            return func.call(thisArg);
          case 1:
            return func.call(thisArg, args[0]);
          case 2:
            return func.call(thisArg, args[0], args[1]);
          case 3:
            return func.call(thisArg, args[0], args[1], args[2]);
        }
        return func.apply(thisArg, args);
      }
      function arrayAggregator(array, setter, iteratee, accumulator) {
        var index = -1,
            length = array == null ? 0 : array.length;
        while (++index < length) {
          var value = array[index];
          setter(accumulator, value, iteratee(value), array);
        }
        return accumulator;
      }
      function arrayEach(array, iteratee) {
        var index = -1,
            length = array == null ? 0 : array.length;
        while (++index < length) {
          if (iteratee(array[index], index, array) === false) {
            break;
          }
        }
        return array;
      }
      function arrayEachRight(array, iteratee) {
        var length = array == null ? 0 : array.length;
        while (length--) {
          if (iteratee(array[length], length, array) === false) {
            break;
          }
        }
        return array;
      }
      function arrayEvery(array, predicate) {
        var index = -1,
            length = array == null ? 0 : array.length;
        while (++index < length) {
          if (!predicate(array[index], index, array)) {
            return false;
          }
        }
        return true;
      }
      function arrayFilter(array, predicate) {
        var index = -1,
            length = array == null ? 0 : array.length,
            resIndex = 0,
            result = [];
        while (++index < length) {
          var value = array[index];
          if (predicate(value, index, array)) {
            result[resIndex++] = value;
          }
        }
        return result;
      }
      function arrayIncludes(array, value) {
        var length = array == null ? 0 : array.length;
        return !!length && baseIndexOf(array, value, 0) > -1;
      }
      function arrayIncludesWith(array, value, comparator) {
        var index = -1,
            length = array == null ? 0 : array.length;
        while (++index < length) {
          if (comparator(value, array[index])) {
            return true;
          }
        }
        return false;
      }
      function arrayMap(array, iteratee) {
        var index = -1,
            length = array == null ? 0 : array.length,
            result = Array(length);
        while (++index < length) {
          result[index] = iteratee(array[index], index, array);
        }
        return result;
      }
      function arrayPush(array, values) {
        var index = -1,
            length = values.length,
            offset = array.length;
        while (++index < length) {
          array[offset + index] = values[index];
        }
        return array;
      }
      function arrayReduce(array, iteratee, accumulator, initAccum) {
        var index = -1,
            length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[++index];
        }
        while (++index < length) {
          accumulator = iteratee(accumulator, array[index], index, array);
        }
        return accumulator;
      }
      function arrayReduceRight(array, iteratee, accumulator, initAccum) {
        var length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[--length];
        }
        while (length--) {
          accumulator = iteratee(accumulator, array[length], length, array);
        }
        return accumulator;
      }
      function arraySome(array, predicate) {
        var index = -1,
            length = array == null ? 0 : array.length;
        while (++index < length) {
          if (predicate(array[index], index, array)) {
            return true;
          }
        }
        return false;
      }
      var asciiSize = baseProperty('length');
      function asciiToArray(string) {
        return string.split('');
      }
      function asciiWords(string) {
        return string.match(reAsciiWord) || [];
      }
      function baseFindKey(collection, predicate, eachFunc) {
        var result;
        eachFunc(collection, function (value, key, collection) {
          if (predicate(value, key, collection)) {
            result = key;
            return false;
          }
        });
        return result;
      }
      function baseFindIndex(array, predicate, fromIndex, fromRight) {
        var length = array.length,
            index = fromIndex + (fromRight ? 1 : -1);
        while (fromRight ? index-- : ++index < length) {
          if (predicate(array[index], index, array)) {
            return index;
          }
        }
        return -1;
      }
      function baseIndexOf(array, value, fromIndex) {
        return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
      }
      function baseIndexOfWith(array, value, fromIndex, comparator) {
        var index = fromIndex - 1,
            length = array.length;
        while (++index < length) {
          if (comparator(array[index], value)) {
            return index;
          }
        }
        return -1;
      }
      function baseIsNaN(value) {
        return value !== value;
      }
      function baseMean(array, iteratee) {
        var length = array == null ? 0 : array.length;
        return length ? baseSum(array, iteratee) / length : NAN;
      }
      function baseProperty(key) {
        return function (object) {
          return object == null ? undefined : object[key];
        };
      }
      function basePropertyOf(object) {
        return function (key) {
          return object == null ? undefined : object[key];
        };
      }
      function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
        eachFunc(collection, function (value, index, collection) {
          accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection);
        });
        return accumulator;
      }
      function baseSortBy(array, comparer) {
        var length = array.length;
        array.sort(comparer);
        while (length--) {
          array[length] = array[length].value;
        }
        return array;
      }
      function baseSum(array, iteratee) {
        var result,
            index = -1,
            length = array.length;
        while (++index < length) {
          var current = iteratee(array[index]);
          if (current !== undefined) {
            result = result === undefined ? current : result + current;
          }
        }
        return result;
      }
      function baseTimes(n, iteratee) {
        var index = -1,
            result = Array(n);
        while (++index < n) {
          result[index] = iteratee(index);
        }
        return result;
      }
      function baseToPairs(object, props) {
        return arrayMap(props, function (key) {
          return [key, object[key]];
        });
      }
      function baseUnary(func) {
        return function (value) {
          return func(value);
        };
      }
      function baseValues(object, props) {
        return arrayMap(props, function (key) {
          return object[key];
        });
      }
      function cacheHas(cache, key) {
        return cache.has(key);
      }
      function charsStartIndex(strSymbols, chrSymbols) {
        var index = -1,
            length = strSymbols.length;
        while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
        return index;
      }
      function charsEndIndex(strSymbols, chrSymbols) {
        var index = strSymbols.length;
        while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
        return index;
      }
      function countHolders(array, placeholder) {
        var length = array.length,
            result = 0;
        while (length--) {
          if (array[length] === placeholder) {
            ++result;
          }
        }
        return result;
      }
      var deburrLetter = basePropertyOf(deburredLetters);
      var escapeHtmlChar = basePropertyOf(htmlEscapes);
      function escapeStringChar(chr) {
        return '\\' + stringEscapes[chr];
      }
      function getValue(object, key) {
        return object == null ? undefined : object[key];
      }
      function hasUnicode(string) {
        return reHasUnicode.test(string);
      }
      function hasUnicodeWord(string) {
        return reHasUnicodeWord.test(string);
      }
      function iteratorToArray(iterator) {
        var data,
            result = [];
        while (!(data = iterator.next()).done) {
          result.push(data.value);
        }
        return result;
      }
      function mapToArray(map) {
        var index = -1,
            result = Array(map.size);
        map.forEach(function (value, key) {
          result[++index] = [key, value];
        });
        return result;
      }
      function overArg(func, transform) {
        return function (arg) {
          return func(transform(arg));
        };
      }
      function replaceHolders(array, placeholder) {
        var index = -1,
            length = array.length,
            resIndex = 0,
            result = [];
        while (++index < length) {
          var value = array[index];
          if (value === placeholder || value === PLACEHOLDER) {
            array[index] = PLACEHOLDER;
            result[resIndex++] = index;
          }
        }
        return result;
      }
      function setToArray(set) {
        var index = -1,
            result = Array(set.size);
        set.forEach(function (value) {
          result[++index] = value;
        });
        return result;
      }
      function setToPairs(set) {
        var index = -1,
            result = Array(set.size);
        set.forEach(function (value) {
          result[++index] = [value, value];
        });
        return result;
      }
      function strictIndexOf(array, value, fromIndex) {
        var index = fromIndex - 1,
            length = array.length;
        while (++index < length) {
          if (array[index] === value) {
            return index;
          }
        }
        return -1;
      }
      function strictLastIndexOf(array, value, fromIndex) {
        var index = fromIndex + 1;
        while (index--) {
          if (array[index] === value) {
            return index;
          }
        }
        return index;
      }
      function stringSize(string) {
        return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
      }
      function stringToArray(string) {
        return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
      }
      var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
      function unicodeSize(string) {
        var result = reUnicode.lastIndex = 0;
        while (reUnicode.test(string)) {
          ++result;
        }
        return result;
      }
      function unicodeToArray(string) {
        return string.match(reUnicode) || [];
      }
      function unicodeWords(string) {
        return string.match(reUnicodeWord) || [];
      }
      var runInContext = function runInContext(context) {
        context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));
        var Array = context.Array,
            Date = context.Date,
            Error = context.Error,
            Function = context.Function,
            Math = context.Math,
            Object = context.Object,
            RegExp = context.RegExp,
            String = context.String,
            TypeError = context.TypeError;
        var arrayProto = Array.prototype,
            funcProto = Function.prototype,
            objectProto = Object.prototype;
        var coreJsData = context['__core-js_shared__'];
        var funcToString = funcProto.toString;
        var hasOwnProperty = objectProto.hasOwnProperty;
        var idCounter = 0;
        var maskSrcKey = function () {
          var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
          return uid ? 'Symbol(src)_1.' + uid : '';
        }();
        var nativeObjectToString = objectProto.toString;
        var objectCtorString = funcToString.call(Object);
        var oldDash = root._;
        var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
        var Buffer = moduleExports ? context.Buffer : undefined,
            Symbol = context.Symbol,
            Uint8Array = context.Uint8Array,
            allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined,
            getPrototype = overArg(Object.getPrototypeOf, Object),
            objectCreate = Object.create,
            propertyIsEnumerable = objectProto.propertyIsEnumerable,
            splice = arrayProto.splice,
            spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined,
            symIterator = Symbol ? Symbol.iterator : undefined,
            symToStringTag = Symbol ? Symbol.toStringTag : undefined;
        var defineProperty = function () {
          try {
            var func = getNative(Object, 'defineProperty');
            func({}, '', {});
            return func;
          } catch (e) {}
        }();
        var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout,
            ctxNow = Date && Date.now !== root.Date.now && Date.now,
            ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
        var nativeCeil = Math.ceil,
            nativeFloor = Math.floor,
            nativeGetSymbols = Object.getOwnPropertySymbols,
            nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
            nativeIsFinite = context.isFinite,
            nativeJoin = arrayProto.join,
            nativeKeys = overArg(Object.keys, Object),
            nativeMax = Math.max,
            nativeMin = Math.min,
            nativeNow = Date.now,
            nativeParseInt = context.parseInt,
            nativeRandom = Math.random,
            nativeReverse = arrayProto.reverse;
        var DataView = getNative(context, 'DataView'),
            Map = getNative(context, 'Map'),
            Promise = getNative(context, 'Promise'),
            Set = getNative(context, 'Set'),
            WeakMap = getNative(context, 'WeakMap'),
            nativeCreate = getNative(Object, 'create');
        var metaMap = WeakMap && new WeakMap();
        var realNames = {};
        var dataViewCtorString = toSource(DataView),
            mapCtorString = toSource(Map),
            promiseCtorString = toSource(Promise),
            setCtorString = toSource(Set),
            weakMapCtorString = toSource(WeakMap);
        var symbolProto = Symbol ? Symbol.prototype : undefined,
            symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
            symbolToString = symbolProto ? symbolProto.toString : undefined;
        function lodash(value) {
          if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
            if (value instanceof LodashWrapper) {
              return value;
            }
            if (hasOwnProperty.call(value, '__wrapped__')) {
              return wrapperClone(value);
            }
          }
          return new LodashWrapper(value);
        }
        var baseCreate = function () {
          function object() {}
          return function (proto) {
            if (!isObject(proto)) {
              return {};
            }
            if (objectCreate) {
              return objectCreate(proto);
            }
            object.prototype = proto;
            var result = new object();
            object.prototype = undefined;
            return result;
          };
        }();
        function baseLodash() {}
        function LodashWrapper(value, chainAll) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__chain__ = !!chainAll;
          this.__index__ = 0;
          this.__values__ = undefined;
        }
        lodash.templateSettings = {
          'escape': reEscape,
          'evaluate': reEvaluate,
          'interpolate': reInterpolate,
          'variable': '',
          'imports': { '_': lodash }
        };
        lodash.prototype = baseLodash.prototype;
        lodash.prototype.constructor = lodash;
        LodashWrapper.prototype = baseCreate(baseLodash.prototype);
        LodashWrapper.prototype.constructor = LodashWrapper;
        function LazyWrapper(value) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__dir__ = 1;
          this.__filtered__ = false;
          this.__iteratees__ = [];
          this.__takeCount__ = MAX_ARRAY_LENGTH;
          this.__views__ = [];
        }
        function lazyClone() {
          var result = new LazyWrapper(this.__wrapped__);
          result.__actions__ = copyArray(this.__actions__);
          result.__dir__ = this.__dir__;
          result.__filtered__ = this.__filtered__;
          result.__iteratees__ = copyArray(this.__iteratees__);
          result.__takeCount__ = this.__takeCount__;
          result.__views__ = copyArray(this.__views__);
          return result;
        }
        function lazyReverse() {
          if (this.__filtered__) {
            var result = new LazyWrapper(this);
            result.__dir__ = -1;
            result.__filtered__ = true;
          } else {
            result = this.clone();
            result.__dir__ *= -1;
          }
          return result;
        }
        function lazyValue() {
          var array = this.__wrapped__.value(),
              dir = this.__dir__,
              isArr = isArray(array),
              isRight = dir < 0,
              arrLength = isArr ? array.length : 0,
              view = getView(0, arrLength, this.__views__),
              start = view.start,
              end = view.end,
              length = end - start,
              index = isRight ? end : start - 1,
              iteratees = this.__iteratees__,
              iterLength = iteratees.length,
              resIndex = 0,
              takeCount = nativeMin(length, this.__takeCount__);
          if (!isArr || !isRight && arrLength == length && takeCount == length) {
            return baseWrapperValue(array, this.__actions__);
          }
          var result = [];
          outer: while (length-- && resIndex < takeCount) {
            index += dir;
            var iterIndex = -1,
                value = array[index];
            while (++iterIndex < iterLength) {
              var data = iteratees[iterIndex],
                  iteratee = data.iteratee,
                  type = data.type,
                  computed = iteratee(value);
              if (type == LAZY_MAP_FLAG) {
                value = computed;
              } else if (!computed) {
                if (type == LAZY_FILTER_FLAG) {
                  continue outer;
                } else {
                  break outer;
                }
              }
            }
            result[resIndex++] = value;
          }
          return result;
        }
        LazyWrapper.prototype = baseCreate(baseLodash.prototype);
        LazyWrapper.prototype.constructor = LazyWrapper;
        function Hash(entries) {
          var index = -1,
              length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function hashClear() {
          this.__data__ = nativeCreate ? nativeCreate(null) : {};
          this.size = 0;
        }
        function hashDelete(key) {
          var result = this.has(key) && delete this.__data__[key];
          this.size -= result ? 1 : 0;
          return result;
        }
        function hashGet(key) {
          var data = this.__data__;
          if (nativeCreate) {
            var result = data[key];
            return result === HASH_UNDEFINED ? undefined : result;
          }
          return hasOwnProperty.call(data, key) ? data[key] : undefined;
        }
        function hashHas(key) {
          var data = this.__data__;
          return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
        }
        function hashSet(key, value) {
          var data = this.__data__;
          this.size += this.has(key) ? 0 : 1;
          data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
          return this;
        }
        Hash.prototype.clear = hashClear;
        Hash.prototype['delete'] = hashDelete;
        Hash.prototype.get = hashGet;
        Hash.prototype.has = hashHas;
        Hash.prototype.set = hashSet;
        function ListCache(entries) {
          var index = -1,
              length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function listCacheClear() {
          this.__data__ = [];
          this.size = 0;
        }
        function listCacheDelete(key) {
          var data = this.__data__,
              index = assocIndexOf(data, key);
          if (index < 0) {
            return false;
          }
          var lastIndex = data.length - 1;
          if (index == lastIndex) {
            data.pop();
          } else {
            splice.call(data, index, 1);
          }
          --this.size;
          return true;
        }
        function listCacheGet(key) {
          var data = this.__data__,
              index = assocIndexOf(data, key);
          return index < 0 ? undefined : data[index][1];
        }
        function listCacheHas(key) {
          return assocIndexOf(this.__data__, key) > -1;
        }
        function listCacheSet(key, value) {
          var data = this.__data__,
              index = assocIndexOf(data, key);
          if (index < 0) {
            ++this.size;
            data.push([key, value]);
          } else {
            data[index][1] = value;
          }
          return this;
        }
        ListCache.prototype.clear = listCacheClear;
        ListCache.prototype['delete'] = listCacheDelete;
        ListCache.prototype.get = listCacheGet;
        ListCache.prototype.has = listCacheHas;
        ListCache.prototype.set = listCacheSet;
        function MapCache(entries) {
          var index = -1,
              length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function mapCacheClear() {
          this.size = 0;
          this.__data__ = {
            'hash': new Hash(),
            'map': new (Map || ListCache)(),
            'string': new Hash()
          };
        }
        function mapCacheDelete(key) {
          var result = getMapData(this, key)['delete'](key);
          this.size -= result ? 1 : 0;
          return result;
        }
        function mapCacheGet(key) {
          return getMapData(this, key).get(key);
        }
        function mapCacheHas(key) {
          return getMapData(this, key).has(key);
        }
        function mapCacheSet(key, value) {
          var data = getMapData(this, key),
              size = data.size;
          data.set(key, value);
          this.size += data.size == size ? 0 : 1;
          return this;
        }
        MapCache.prototype.clear = mapCacheClear;
        MapCache.prototype['delete'] = mapCacheDelete;
        MapCache.prototype.get = mapCacheGet;
        MapCache.prototype.has = mapCacheHas;
        MapCache.prototype.set = mapCacheSet;
        function SetCache(values) {
          var index = -1,
              length = values == null ? 0 : values.length;
          this.__data__ = new MapCache();
          while (++index < length) {
            this.add(values[index]);
          }
        }
        function setCacheAdd(value) {
          this.__data__.set(value, HASH_UNDEFINED);
          return this;
        }
        function setCacheHas(value) {
          return this.__data__.has(value);
        }
        SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
        SetCache.prototype.has = setCacheHas;
        function Stack(entries) {
          var data = this.__data__ = new ListCache(entries);
          this.size = data.size;
        }
        function stackClear() {
          this.__data__ = new ListCache();
          this.size = 0;
        }
        function stackDelete(key) {
          var data = this.__data__,
              result = data['delete'](key);
          this.size = data.size;
          return result;
        }
        function stackGet(key) {
          return this.__data__.get(key);
        }
        function stackHas(key) {
          return this.__data__.has(key);
        }
        function stackSet(key, value) {
          var data = this.__data__;
          if (data instanceof ListCache) {
            var pairs = data.__data__;
            if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
              pairs.push([key, value]);
              this.size = ++data.size;
              return this;
            }
            data = this.__data__ = new MapCache(pairs);
          }
          data.set(key, value);
          this.size = data.size;
          return this;
        }
        Stack.prototype.clear = stackClear;
        Stack.prototype['delete'] = stackDelete;
        Stack.prototype.get = stackGet;
        Stack.prototype.has = stackHas;
        Stack.prototype.set = stackSet;
        function arrayLikeKeys(value, inherited) {
          var isArr = isArray(value),
              isArg = !isArr && isArguments(value),
              isBuff = !isArr && !isArg && isBuffer(value),
              isType = !isArr && !isArg && !isBuff && isTypedArray(value),
              skipIndexes = isArr || isArg || isBuff || isType,
              result = skipIndexes ? baseTimes(value.length, String) : [],
              length = result.length;
          for (var key in value) {
            if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == 'length' || isBuff && (key == 'offset' || key == 'parent') || isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') || isIndex(key, length)))) {
              result.push(key);
            }
          }
          return result;
        }
        function arraySample(array) {
          var length = array.length;
          return length ? array[baseRandom(0, length - 1)] : undefined;
        }
        function arraySampleSize(array, n) {
          return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
        }
        function arrayShuffle(array) {
          return shuffleSelf(copyArray(array));
        }
        function assignMergeValue(object, key, value) {
          if (value !== undefined && !eq(object[key], value) || value === undefined && !(key in object)) {
            baseAssignValue(object, key, value);
          }
        }
        function assignValue(object, key, value) {
          var objValue = object[key];
          if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
            baseAssignValue(object, key, value);
          }
        }
        function assocIndexOf(array, key) {
          var length = array.length;
          while (length--) {
            if (eq(array[length][0], key)) {
              return length;
            }
          }
          return -1;
        }
        function baseAggregator(collection, setter, iteratee, accumulator) {
          baseEach(collection, function (value, key, collection) {
            setter(accumulator, value, iteratee(value), collection);
          });
          return accumulator;
        }
        function baseAssign(object, source) {
          return object && copyObject(source, keys(source), object);
        }
        function baseAssignIn(object, source) {
          return object && copyObject(source, keysIn(source), object);
        }
        function baseAssignValue(object, key, value) {
          if (key == '__proto__' && defineProperty) {
            defineProperty(object, key, {
              'configurable': true,
              'enumerable': true,
              'value': value,
              'writable': true
            });
          } else {
            object[key] = value;
          }
        }
        function baseAt(object, paths) {
          var index = -1,
              length = paths.length,
              result = Array(length),
              skip = object == null;
          while (++index < length) {
            result[index] = skip ? undefined : get(object, paths[index]);
          }
          return result;
        }
        function baseClamp(number, lower, upper) {
          if (number === number) {
            if (upper !== undefined) {
              number = number <= upper ? number : upper;
            }
            if (lower !== undefined) {
              number = number >= lower ? number : lower;
            }
          }
          return number;
        }
        function baseClone(value, bitmask, customizer, key, object, stack) {
          var result,
              isDeep = bitmask & CLONE_DEEP_FLAG,
              isFlat = bitmask & CLONE_FLAT_FLAG,
              isFull = bitmask & CLONE_SYMBOLS_FLAG;
          if (customizer) {
            result = object ? customizer(value, key, object, stack) : customizer(value);
          }
          if (result !== undefined) {
            return result;
          }
          if (!isObject(value)) {
            return value;
          }
          var isArr = isArray(value);
          if (isArr) {
            result = initCloneArray(value);
            if (!isDeep) {
              return copyArray(value, result);
            }
          } else {
            var tag = getTag(value),
                isFunc = tag == funcTag || tag == genTag;
            if (isBuffer(value)) {
              return cloneBuffer(value, isDeep);
            }
            if (tag == objectTag || tag == argsTag || isFunc && !object) {
              result = isFlat || isFunc ? {} : initCloneObject(value);
              if (!isDeep) {
                return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
              }
            } else {
              if (!cloneableTags[tag]) {
                return object ? value : {};
              }
              result = initCloneByTag(value, tag, baseClone, isDeep);
            }
          }
          stack || (stack = new Stack());
          var stacked = stack.get(value);
          if (stacked) {
            return stacked;
          }
          stack.set(value, result);
          var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
          var props = isArr ? undefined : keysFunc(value);
          arrayEach(props || value, function (subValue, key) {
            if (props) {
              key = subValue;
              subValue = value[key];
            }
            assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
          });
          return result;
        }
        function baseConforms(source) {
          var props = keys(source);
          return function (object) {
            return baseConformsTo(object, source, props);
          };
        }
        function baseConformsTo(object, source, props) {
          var length = props.length;
          if (object == null) {
            return !length;
          }
          object = Object(object);
          while (length--) {
            var key = props[length],
                predicate = source[key],
                value = object[key];
            if (value === undefined && !(key in object) || !predicate(value)) {
              return false;
            }
          }
          return true;
        }
        function baseDelay(func, wait, args) {
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          return setTimeout(function () {
            func.apply(undefined, args);
          }, wait);
        }
        function baseDifference(array, values, iteratee, comparator) {
          var index = -1,
              includes = arrayIncludes,
              isCommon = true,
              length = array.length,
              result = [],
              valuesLength = values.length;
          if (!length) {
            return result;
          }
          if (iteratee) {
            values = arrayMap(values, baseUnary(iteratee));
          }
          if (comparator) {
            includes = arrayIncludesWith;
            isCommon = false;
          } else if (values.length >= LARGE_ARRAY_SIZE) {
            includes = cacheHas;
            isCommon = false;
            values = new SetCache(values);
          }
          outer: while (++index < length) {
            var value = array[index],
                computed = iteratee == null ? value : iteratee(value);
            value = comparator || value !== 0 ? value : 0;
            if (isCommon && computed === computed) {
              var valuesIndex = valuesLength;
              while (valuesIndex--) {
                if (values[valuesIndex] === computed) {
                  continue outer;
                }
              }
              result.push(value);
            } else if (!includes(values, computed, comparator)) {
              result.push(value);
            }
          }
          return result;
        }
        var baseEach = createBaseEach(baseForOwn);
        var baseEachRight = createBaseEach(baseForOwnRight, true);
        function baseEvery(collection, predicate) {
          var result = true;
          baseEach(collection, function (value, index, collection) {
            result = !!predicate(value, index, collection);
            return result;
          });
          return result;
        }
        function baseExtremum(array, iteratee, comparator) {
          var index = -1,
              length = array.length;
          while (++index < length) {
            var value = array[index],
                current = iteratee(value);
            if (current != null && (computed === undefined ? current === current && !isSymbol(current) : comparator(current, computed))) {
              var computed = current,
                  result = value;
            }
          }
          return result;
        }
        function baseFill(array, value, start, end) {
          var length = array.length;
          start = toInteger(start);
          if (start < 0) {
            start = -start > length ? 0 : length + start;
          }
          end = end === undefined || end > length ? length : toInteger(end);
          if (end < 0) {
            end += length;
          }
          end = start > end ? 0 : toLength(end);
          while (start < end) {
            array[start++] = value;
          }
          return array;
        }
        function baseFilter(collection, predicate) {
          var result = [];
          baseEach(collection, function (value, index, collection) {
            if (predicate(value, index, collection)) {
              result.push(value);
            }
          });
          return result;
        }
        function baseFlatten(array, depth, predicate, isStrict, result) {
          var index = -1,
              length = array.length;
          predicate || (predicate = isFlattenable);
          result || (result = []);
          while (++index < length) {
            var value = array[index];
            if (depth > 0 && predicate(value)) {
              if (depth > 1) {
                baseFlatten(value, depth - 1, predicate, isStrict, result);
              } else {
                arrayPush(result, value);
              }
            } else if (!isStrict) {
              result[result.length] = value;
            }
          }
          return result;
        }
        var baseFor = createBaseFor();
        var baseForRight = createBaseFor(true);
        function baseForOwn(object, iteratee) {
          return object && baseFor(object, iteratee, keys);
        }
        function baseForOwnRight(object, iteratee) {
          return object && baseForRight(object, iteratee, keys);
        }
        function baseFunctions(object, props) {
          return arrayFilter(props, function (key) {
            return isFunction(object[key]);
          });
        }
        function baseGet(object, path) {
          path = castPath(path, object);
          var index = 0,
              length = path.length;
          while (object != null && index < length) {
            object = object[toKey(path[index++])];
          }
          return index && index == length ? object : undefined;
        }
        function baseGetAllKeys(object, keysFunc, symbolsFunc) {
          var result = keysFunc(object);
          return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
        }
        function baseGetTag(value) {
          if (value == null) {
            return value === undefined ? undefinedTag : nullTag;
          }
          return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
        }
        function baseGt(value, other) {
          return value > other;
        }
        function baseHas(object, key) {
          return object != null && hasOwnProperty.call(object, key);
        }
        function baseHasIn(object, key) {
          return object != null && key in Object(object);
        }
        function baseInRange(number, start, end) {
          return number >= nativeMin(start, end) && number < nativeMax(start, end);
        }
        function baseIntersection(arrays, iteratee, comparator) {
          var includes = comparator ? arrayIncludesWith : arrayIncludes,
              length = arrays[0].length,
              othLength = arrays.length,
              othIndex = othLength,
              caches = Array(othLength),
              maxLength = Infinity,
              result = [];
          while (othIndex--) {
            var array = arrays[othIndex];
            if (othIndex && iteratee) {
              array = arrayMap(array, baseUnary(iteratee));
            }
            maxLength = nativeMin(array.length, maxLength);
            caches[othIndex] = !comparator && (iteratee || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined;
          }
          array = arrays[0];
          var index = -1,
              seen = caches[0];
          outer: while (++index < length && result.length < maxLength) {
            var value = array[index],
                computed = iteratee ? iteratee(value) : value;
            value = comparator || value !== 0 ? value : 0;
            if (!(seen ? cacheHas(seen, computed) : includes(result, computed, comparator))) {
              othIndex = othLength;
              while (--othIndex) {
                var cache = caches[othIndex];
                if (!(cache ? cacheHas(cache, computed) : includes(arrays[othIndex], computed, comparator))) {
                  continue outer;
                }
              }
              if (seen) {
                seen.push(computed);
              }
              result.push(value);
            }
          }
          return result;
        }
        function baseInverter(object, setter, iteratee, accumulator) {
          baseForOwn(object, function (value, key, object) {
            setter(accumulator, iteratee(value), key, object);
          });
          return accumulator;
        }
        function baseInvoke(object, path, args) {
          path = castPath(path, object);
          object = parent(object, path);
          var func = object == null ? object : object[toKey(last(path))];
          return func == null ? undefined : apply(func, object, args);
        }
        function baseIsArguments(value) {
          return isObjectLike(value) && baseGetTag(value) == argsTag;
        }
        function baseIsArrayBuffer(value) {
          return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
        }
        function baseIsDate(value) {
          return isObjectLike(value) && baseGetTag(value) == dateTag;
        }
        function baseIsEqual(value, other, bitmask, customizer, stack) {
          if (value === other) {
            return true;
          }
          if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
            return value !== value && other !== other;
          }
          return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
        }
        function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
          var objIsArr = isArray(object),
              othIsArr = isArray(other),
              objTag = objIsArr ? arrayTag : getTag(object),
              othTag = othIsArr ? arrayTag : getTag(other);
          objTag = objTag == argsTag ? objectTag : objTag;
          othTag = othTag == argsTag ? objectTag : othTag;
          var objIsObj = objTag == objectTag,
              othIsObj = othTag == objectTag,
              isSameTag = objTag == othTag;
          if (isSameTag && isBuffer(object)) {
            if (!isBuffer(other)) {
              return false;
            }
            objIsArr = true;
            objIsObj = false;
          }
          if (isSameTag && !objIsObj) {
            stack || (stack = new Stack());
            return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
          }
          if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
            var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
                othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
            if (objIsWrapped || othIsWrapped) {
              var objUnwrapped = objIsWrapped ? object.value() : object,
                  othUnwrapped = othIsWrapped ? other.value() : other;
              stack || (stack = new Stack());
              return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
            }
          }
          if (!isSameTag) {
            return false;
          }
          stack || (stack = new Stack());
          return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
        }
        function baseIsMap(value) {
          return isObjectLike(value) && getTag(value) == mapTag;
        }
        function baseIsMatch(object, source, matchData, customizer) {
          var index = matchData.length,
              length = index,
              noCustomizer = !customizer;
          if (object == null) {
            return !length;
          }
          object = Object(object);
          while (index--) {
            var data = matchData[index];
            if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
              return false;
            }
          }
          while (++index < length) {
            data = matchData[index];
            var key = data[0],
                objValue = object[key],
                srcValue = data[1];
            if (noCustomizer && data[2]) {
              if (objValue === undefined && !(key in object)) {
                return false;
              }
            } else {
              var stack = new Stack();
              if (customizer) {
                var result = customizer(objValue, srcValue, key, object, source, stack);
              }
              if (!(result === undefined ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) {
                return false;
              }
            }
          }
          return true;
        }
        function baseIsNative(value) {
          if (!isObject(value) || isMasked(value)) {
            return false;
          }
          var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
          return pattern.test(toSource(value));
        }
        function baseIsRegExp(value) {
          return isObjectLike(value) && baseGetTag(value) == regexpTag;
        }
        function baseIsSet(value) {
          return isObjectLike(value) && getTag(value) == setTag;
        }
        function baseIsTypedArray(value) {
          return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
        }
        function baseIteratee(value) {
          if (typeof value == 'function') {
            return value;
          }
          if (value == null) {
            return identity;
          }
          if (typeof value == 'object') {
            return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
          }
          return property(value);
        }
        function baseKeys(object) {
          if (!isPrototype(object)) {
            return nativeKeys(object);
          }
          var result = [];
          for (var key in Object(object)) {
            if (hasOwnProperty.call(object, key) && key != 'constructor') {
              result.push(key);
            }
          }
          return result;
        }
        function baseKeysIn(object) {
          if (!isObject(object)) {
            return nativeKeysIn(object);
          }
          var isProto = isPrototype(object),
              result = [];
          for (var key in object) {
            if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
              result.push(key);
            }
          }
          return result;
        }
        function baseLt(value, other) {
          return value < other;
        }
        function baseMap(collection, iteratee) {
          var index = -1,
              result = isArrayLike(collection) ? Array(collection.length) : [];
          baseEach(collection, function (value, key, collection) {
            result[++index] = iteratee(value, key, collection);
          });
          return result;
        }
        function baseMatches(source) {
          var matchData = getMatchData(source);
          if (matchData.length == 1 && matchData[0][2]) {
            return matchesStrictComparable(matchData[0][0], matchData[0][1]);
          }
          return function (object) {
            return object === source || baseIsMatch(object, source, matchData);
          };
        }
        function baseMatchesProperty(path, srcValue) {
          if (isKey(path) && isStrictComparable(srcValue)) {
            return matchesStrictComparable(toKey(path), srcValue);
          }
          return function (object) {
            var objValue = get(object, path);
            return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
          };
        }
        function baseMerge(object, source, srcIndex, customizer, stack) {
          if (object === source) {
            return;
          }
          baseFor(source, function (srcValue, key) {
            if (isObject(srcValue)) {
              stack || (stack = new Stack());
              baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
            } else {
              var newValue = customizer ? customizer(object[key], srcValue, key + '', object, source, stack) : undefined;
              if (newValue === undefined) {
                newValue = srcValue;
              }
              assignMergeValue(object, key, newValue);
            }
          }, keysIn);
        }
        function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
          var objValue = object[key],
              srcValue = source[key],
              stacked = stack.get(srcValue);
          if (stacked) {
            assignMergeValue(object, key, stacked);
            return;
          }
          var newValue = customizer ? customizer(objValue, srcValue, key + '', object, source, stack) : undefined;
          var isCommon = newValue === undefined;
          if (isCommon) {
            var isArr = isArray(srcValue),
                isBuff = !isArr && isBuffer(srcValue),
                isTyped = !isArr && !isBuff && isTypedArray(srcValue);
            newValue = srcValue;
            if (isArr || isBuff || isTyped) {
              if (isArray(objValue)) {
                newValue = objValue;
              } else if (isArrayLikeObject(objValue)) {
                newValue = copyArray(objValue);
              } else if (isBuff) {
                isCommon = false;
                newValue = cloneBuffer(srcValue, true);
              } else if (isTyped) {
                isCommon = false;
                newValue = cloneTypedArray(srcValue, true);
              } else {
                newValue = [];
              }
            } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
              newValue = objValue;
              if (isArguments(objValue)) {
                newValue = toPlainObject(objValue);
              } else if (!isObject(objValue) || srcIndex && isFunction(objValue)) {
                newValue = initCloneObject(srcValue);
              }
            } else {
              isCommon = false;
            }
          }
          if (isCommon) {
            stack.set(srcValue, newValue);
            mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
            stack['delete'](srcValue);
          }
          assignMergeValue(object, key, newValue);
        }
        function baseNth(array, n) {
          var length = array.length;
          if (!length) {
            return;
          }
          n += n < 0 ? length : 0;
          return isIndex(n, length) ? array[n] : undefined;
        }
        function baseOrderBy(collection, iteratees, orders) {
          var index = -1;
          iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(getIteratee()));
          var result = baseMap(collection, function (value, key, collection) {
            var criteria = arrayMap(iteratees, function (iteratee) {
              return iteratee(value);
            });
            return {
              'criteria': criteria,
              'index': ++index,
              'value': value
            };
          });
          return baseSortBy(result, function (object, other) {
            return compareMultiple(object, other, orders);
          });
        }
        function basePick(object, paths) {
          return basePickBy(object, paths, function (value, path) {
            return hasIn(object, path);
          });
        }
        function basePickBy(object, paths, predicate) {
          var index = -1,
              length = paths.length,
              result = {};
          while (++index < length) {
            var path = paths[index],
                value = baseGet(object, path);
            if (predicate(value, path)) {
              baseSet(result, castPath(path, object), value);
            }
          }
          return result;
        }
        function basePropertyDeep(path) {
          return function (object) {
            return baseGet(object, path);
          };
        }
        function basePullAll(array, values, iteratee, comparator) {
          var indexOf = comparator ? baseIndexOfWith : baseIndexOf,
              index = -1,
              length = values.length,
              seen = array;
          if (array === values) {
            values = copyArray(values);
          }
          if (iteratee) {
            seen = arrayMap(array, baseUnary(iteratee));
          }
          while (++index < length) {
            var fromIndex = 0,
                value = values[index],
                computed = iteratee ? iteratee(value) : value;
            while ((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1) {
              if (seen !== array) {
                splice.call(seen, fromIndex, 1);
              }
              splice.call(array, fromIndex, 1);
            }
          }
          return array;
        }
        function basePullAt(array, indexes) {
          var length = array ? indexes.length : 0,
              lastIndex = length - 1;
          while (length--) {
            var index = indexes[length];
            if (length == lastIndex || index !== previous) {
              var previous = index;
              if (isIndex(index)) {
                splice.call(array, index, 1);
              } else {
                baseUnset(array, index);
              }
            }
          }
          return array;
        }
        function baseRandom(lower, upper) {
          return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
        }
        function baseRange(start, end, step, fromRight) {
          var index = -1,
              length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
              result = Array(length);
          while (length--) {
            result[fromRight ? length : ++index] = start;
            start += step;
          }
          return result;
        }
        function baseRepeat(string, n) {
          var result = '';
          if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
            return result;
          }
          do {
            if (n % 2) {
              result += string;
            }
            n = nativeFloor(n / 2);
            if (n) {
              string += string;
            }
          } while (n);
          return result;
        }
        function baseRest(func, start) {
          return setToString(overRest(func, start, identity), func + '');
        }
        function baseSample(collection) {
          return arraySample(values(collection));
        }
        function baseSampleSize(collection, n) {
          var array = values(collection);
          return shuffleSelf(array, baseClamp(n, 0, array.length));
        }
        function baseSet(object, path, value, customizer) {
          if (!isObject(object)) {
            return object;
          }
          path = castPath(path, object);
          var index = -1,
              length = path.length,
              lastIndex = length - 1,
              nested = object;
          while (nested != null && ++index < length) {
            var key = toKey(path[index]),
                newValue = value;
            if (index != lastIndex) {
              var objValue = nested[key];
              newValue = customizer ? customizer(objValue, key, nested) : undefined;
              if (newValue === undefined) {
                newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
              }
            }
            assignValue(nested, key, newValue);
            nested = nested[key];
          }
          return object;
        }
        var baseSetData = !metaMap ? identity : function (func, data) {
          metaMap.set(func, data);
          return func;
        };
        var baseSetToString = !defineProperty ? identity : function (func, string) {
          return defineProperty(func, 'toString', {
            'configurable': true,
            'enumerable': false,
            'value': constant(string),
            'writable': true
          });
        };
        function baseShuffle(collection) {
          return shuffleSelf(values(collection));
        }
        function baseSlice(array, start, end) {
          var index = -1,
              length = array.length;
          if (start < 0) {
            start = -start > length ? 0 : length + start;
          }
          end = end > length ? length : end;
          if (end < 0) {
            end += length;
          }
          length = start > end ? 0 : end - start >>> 0;
          start >>>= 0;
          var result = Array(length);
          while (++index < length) {
            result[index] = array[index + start];
          }
          return result;
        }
        function baseSome(collection, predicate) {
          var result;
          baseEach(collection, function (value, index, collection) {
            result = predicate(value, index, collection);
            return !result;
          });
          return !!result;
        }
        function baseSortedIndex(array, value, retHighest) {
          var low = 0,
              high = array == null ? low : array.length;
          if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
            while (low < high) {
              var mid = low + high >>> 1,
                  computed = array[mid];
              if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
                low = mid + 1;
              } else {
                high = mid;
              }
            }
            return high;
          }
          return baseSortedIndexBy(array, value, identity, retHighest);
        }
        function baseSortedIndexBy(array, value, iteratee, retHighest) {
          value = iteratee(value);
          var low = 0,
              high = array == null ? 0 : array.length,
              valIsNaN = value !== value,
              valIsNull = value === null,
              valIsSymbol = isSymbol(value),
              valIsUndefined = value === undefined;
          while (low < high) {
            var mid = nativeFloor((low + high) / 2),
                computed = iteratee(array[mid]),
                othIsDefined = computed !== undefined,
                othIsNull = computed === null,
                othIsReflexive = computed === computed,
                othIsSymbol = isSymbol(computed);
            if (valIsNaN) {
              var setLow = retHighest || othIsReflexive;
            } else if (valIsUndefined) {
              setLow = othIsReflexive && (retHighest || othIsDefined);
            } else if (valIsNull) {
              setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
            } else if (valIsSymbol) {
              setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
            } else if (othIsNull || othIsSymbol) {
              setLow = false;
            } else {
              setLow = retHighest ? computed <= value : computed < value;
            }
            if (setLow) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }
          return nativeMin(high, MAX_ARRAY_INDEX);
        }
        function baseSortedUniq(array, iteratee) {
          var index = -1,
              length = array.length,
              resIndex = 0,
              result = [];
          while (++index < length) {
            var value = array[index],
                computed = iteratee ? iteratee(value) : value;
            if (!index || !eq(computed, seen)) {
              var seen = computed;
              result[resIndex++] = value === 0 ? 0 : value;
            }
          }
          return result;
        }
        function baseToNumber(value) {
          if (typeof value == 'number') {
            return value;
          }
          if (isSymbol(value)) {
            return NAN;
          }
          return +value;
        }
        function baseToString(value) {
          if (typeof value == 'string') {
            return value;
          }
          if (isArray(value)) {
            return arrayMap(value, baseToString) + '';
          }
          if (isSymbol(value)) {
            return symbolToString ? symbolToString.call(value) : '';
          }
          var result = value + '';
          return result == '0' && 1 / value == -INFINITY ? '-0' : result;
        }
        function baseUniq(array, iteratee, comparator) {
          var index = -1,
              includes = arrayIncludes,
              length = array.length,
              isCommon = true,
              result = [],
              seen = result;
          if (comparator) {
            isCommon = false;
            includes = arrayIncludesWith;
          } else if (length >= LARGE_ARRAY_SIZE) {
            var set = iteratee ? null : createSet(array);
            if (set) {
              return setToArray(set);
            }
            isCommon = false;
            includes = cacheHas;
            seen = new SetCache();
          } else {
            seen = iteratee ? [] : result;
          }
          outer: while (++index < length) {
            var value = array[index],
                computed = iteratee ? iteratee(value) : value;
            value = comparator || value !== 0 ? value : 0;
            if (isCommon && computed === computed) {
              var seenIndex = seen.length;
              while (seenIndex--) {
                if (seen[seenIndex] === computed) {
                  continue outer;
                }
              }
              if (iteratee) {
                seen.push(computed);
              }
              result.push(value);
            } else if (!includes(seen, computed, comparator)) {
              if (seen !== result) {
                seen.push(computed);
              }
              result.push(value);
            }
          }
          return result;
        }
        function baseUnset(object, path) {
          path = castPath(path, object);
          object = parent(object, path);
          return object == null || delete object[toKey(last(path))];
        }
        function baseUpdate(object, path, updater, customizer) {
          return baseSet(object, path, updater(baseGet(object, path)), customizer);
        }
        function baseWhile(array, predicate, isDrop, fromRight) {
          var length = array.length,
              index = fromRight ? length : -1;
          while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {}
          return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
        }
        function baseWrapperValue(value, actions) {
          var result = value;
          if (result instanceof LazyWrapper) {
            result = result.value();
          }
          return arrayReduce(actions, function (result, action) {
            return action.func.apply(action.thisArg, arrayPush([result], action.args));
          }, result);
        }
        function baseXor(arrays, iteratee, comparator) {
          var length = arrays.length;
          if (length < 2) {
            return length ? baseUniq(arrays[0]) : [];
          }
          var index = -1,
              result = Array(length);
          while (++index < length) {
            var array = arrays[index],
                othIndex = -1;
            while (++othIndex < length) {
              if (othIndex != index) {
                result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator);
              }
            }
          }
          return baseUniq(baseFlatten(result, 1), iteratee, comparator);
        }
        function baseZipObject(props, values, assignFunc) {
          var index = -1,
              length = props.length,
              valsLength = values.length,
              result = {};
          while (++index < length) {
            var value = index < valsLength ? values[index] : undefined;
            assignFunc(result, props[index], value);
          }
          return result;
        }
        function castArrayLikeObject(value) {
          return isArrayLikeObject(value) ? value : [];
        }
        function castFunction(value) {
          return typeof value == 'function' ? value : identity;
        }
        function castPath(value, object) {
          if (isArray(value)) {
            return value;
          }
          return isKey(value, object) ? [value] : stringToPath(toString(value));
        }
        var castRest = baseRest;
        function castSlice(array, start, end) {
          var length = array.length;
          end = end === undefined ? length : end;
          return !start && end >= length ? array : baseSlice(array, start, end);
        }
        var clearTimeout = ctxClearTimeout || function (id) {
          return root.clearTimeout(id);
        };
        function cloneBuffer(buffer, isDeep) {
          if (isDeep) {
            return buffer.slice();
          }
          var length = buffer.length,
              result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
          buffer.copy(result);
          return result;
        }
        function cloneArrayBuffer(arrayBuffer) {
          var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
          new Uint8Array(result).set(new Uint8Array(arrayBuffer));
          return result;
        }
        function cloneDataView(dataView, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
          return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
        }
        function cloneMap(map, isDeep, cloneFunc) {
          var array = isDeep ? cloneFunc(mapToArray(map), CLONE_DEEP_FLAG) : mapToArray(map);
          return arrayReduce(array, addMapEntry, new map.constructor());
        }
        function cloneRegExp(regexp) {
          var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
          result.lastIndex = regexp.lastIndex;
          return result;
        }
        function cloneSet(set, isDeep, cloneFunc) {
          var array = isDeep ? cloneFunc(setToArray(set), CLONE_DEEP_FLAG) : setToArray(set);
          return arrayReduce(array, addSetEntry, new set.constructor());
        }
        function cloneSymbol(symbol) {
          return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
        }
        function cloneTypedArray(typedArray, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
          return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
        }
        function compareAscending(value, other) {
          if (value !== other) {
            var valIsDefined = value !== undefined,
                valIsNull = value === null,
                valIsReflexive = value === value,
                valIsSymbol = isSymbol(value);
            var othIsDefined = other !== undefined,
                othIsNull = other === null,
                othIsReflexive = other === other,
                othIsSymbol = isSymbol(other);
            if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
              return 1;
            }
            if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
              return -1;
            }
          }
          return 0;
        }
        function compareMultiple(object, other, orders) {
          var index = -1,
              objCriteria = object.criteria,
              othCriteria = other.criteria,
              length = objCriteria.length,
              ordersLength = orders.length;
          while (++index < length) {
            var result = compareAscending(objCriteria[index], othCriteria[index]);
            if (result) {
              if (index >= ordersLength) {
                return result;
              }
              var order = orders[index];
              return result * (order == 'desc' ? -1 : 1);
            }
          }
          return object.index - other.index;
        }
        function composeArgs(args, partials, holders, isCurried) {
          var argsIndex = -1,
              argsLength = args.length,
              holdersLength = holders.length,
              leftIndex = -1,
              leftLength = partials.length,
              rangeLength = nativeMax(argsLength - holdersLength, 0),
              result = Array(leftLength + rangeLength),
              isUncurried = !isCurried;
          while (++leftIndex < leftLength) {
            result[leftIndex] = partials[leftIndex];
          }
          while (++argsIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result[holders[argsIndex]] = args[argsIndex];
            }
          }
          while (rangeLength--) {
            result[leftIndex++] = args[argsIndex++];
          }
          return result;
        }
        function composeArgsRight(args, partials, holders, isCurried) {
          var argsIndex = -1,
              argsLength = args.length,
              holdersIndex = -1,
              holdersLength = holders.length,
              rightIndex = -1,
              rightLength = partials.length,
              rangeLength = nativeMax(argsLength - holdersLength, 0),
              result = Array(rangeLength + rightLength),
              isUncurried = !isCurried;
          while (++argsIndex < rangeLength) {
            result[argsIndex] = args[argsIndex];
          }
          var offset = argsIndex;
          while (++rightIndex < rightLength) {
            result[offset + rightIndex] = partials[rightIndex];
          }
          while (++holdersIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result[offset + holders[holdersIndex]] = args[argsIndex++];
            }
          }
          return result;
        }
        function copyArray(source, array) {
          var index = -1,
              length = source.length;
          array || (array = Array(length));
          while (++index < length) {
            array[index] = source[index];
          }
          return array;
        }
        function copyObject(source, props, object, customizer) {
          var isNew = !object;
          object || (object = {});
          var index = -1,
              length = props.length;
          while (++index < length) {
            var key = props[index];
            var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;
            if (newValue === undefined) {
              newValue = source[key];
            }
            if (isNew) {
              baseAssignValue(object, key, newValue);
            } else {
              assignValue(object, key, newValue);
            }
          }
          return object;
        }
        function copySymbols(source, object) {
          return copyObject(source, getSymbols(source), object);
        }
        function copySymbolsIn(source, object) {
          return copyObject(source, getSymbolsIn(source), object);
        }
        function createAggregator(setter, initializer) {
          return function (collection, iteratee) {
            var func = isArray(collection) ? arrayAggregator : baseAggregator,
                accumulator = initializer ? initializer() : {};
            return func(collection, setter, getIteratee(iteratee, 2), accumulator);
          };
        }
        function createAssigner(assigner) {
          return baseRest(function (object, sources) {
            var index = -1,
                length = sources.length,
                customizer = length > 1 ? sources[length - 1] : undefined,
                guard = length > 2 ? sources[2] : undefined;
            customizer = assigner.length > 3 && typeof customizer == 'function' ? (length--, customizer) : undefined;
            if (guard && isIterateeCall(sources[0], sources[1], guard)) {
              customizer = length < 3 ? undefined : customizer;
              length = 1;
            }
            object = Object(object);
            while (++index < length) {
              var source = sources[index];
              if (source) {
                assigner(object, source, index, customizer);
              }
            }
            return object;
          });
        }
        function createBaseEach(eachFunc, fromRight) {
          return function (collection, iteratee) {
            if (collection == null) {
              return collection;
            }
            if (!isArrayLike(collection)) {
              return eachFunc(collection, iteratee);
            }
            var length = collection.length,
                index = fromRight ? length : -1,
                iterable = Object(collection);
            while (fromRight ? index-- : ++index < length) {
              if (iteratee(iterable[index], index, iterable) === false) {
                break;
              }
            }
            return collection;
          };
        }
        function createBaseFor(fromRight) {
          return function (object, iteratee, keysFunc) {
            var index = -1,
                iterable = Object(object),
                props = keysFunc(object),
                length = props.length;
            while (length--) {
              var key = props[fromRight ? length : ++index];
              if (iteratee(iterable[key], key, iterable) === false) {
                break;
              }
            }
            return object;
          };
        }
        function createBind(func, bitmask, thisArg) {
          var isBind = bitmask & WRAP_BIND_FLAG,
              Ctor = createCtor(func);
          function wrapper() {
            var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            return fn.apply(isBind ? thisArg : this, arguments);
          }
          return wrapper;
        }
        function createCaseFirst(methodName) {
          return function (string) {
            string = toString(string);
            var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined;
            var chr = strSymbols ? strSymbols[0] : string.charAt(0);
            var trailing = strSymbols ? castSlice(strSymbols, 1).join('') : string.slice(1);
            return chr[methodName]() + trailing;
          };
        }
        function createCompounder(callback) {
          return function (string) {
            return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
          };
        }
        function createCtor(Ctor) {
          return function () {
            var args = arguments;
            switch (args.length) {
              case 0:
                return new Ctor();
              case 1:
                return new Ctor(args[0]);
              case 2:
                return new Ctor(args[0], args[1]);
              case 3:
                return new Ctor(args[0], args[1], args[2]);
              case 4:
                return new Ctor(args[0], args[1], args[2], args[3]);
              case 5:
                return new Ctor(args[0], args[1], args[2], args[3], args[4]);
              case 6:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
              case 7:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
            }
            var thisBinding = baseCreate(Ctor.prototype),
                result = Ctor.apply(thisBinding, args);
            return isObject(result) ? result : thisBinding;
          };
        }
        function createCurry(func, bitmask, arity) {
          var Ctor = createCtor(func);
          function wrapper() {
            var length = arguments.length,
                args = Array(length),
                index = length,
                placeholder = getHolder(wrapper);
            while (index--) {
              args[index] = arguments[index];
            }
            var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
            length -= holders.length;
            if (length < arity) {
              return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, undefined, args, holders, undefined, undefined, arity - length);
            }
            var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            return apply(fn, this, args);
          }
          return wrapper;
        }
        function createFind(findIndexFunc) {
          return function (collection, predicate, fromIndex) {
            var iterable = Object(collection);
            if (!isArrayLike(collection)) {
              var iteratee = getIteratee(predicate, 3);
              collection = keys(collection);
              predicate = function (key) {
                return iteratee(iterable[key], key, iterable);
              };
            }
            var index = findIndexFunc(collection, predicate, fromIndex);
            return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
          };
        }
        function createFlow(fromRight) {
          return flatRest(function (funcs) {
            var length = funcs.length,
                index = length,
                prereq = LodashWrapper.prototype.thru;
            if (fromRight) {
              funcs.reverse();
            }
            while (index--) {
              var func = funcs[index];
              if (typeof func != 'function') {
                throw new TypeError(FUNC_ERROR_TEXT);
              }
              if (prereq && !wrapper && getFuncName(func) == 'wrapper') {
                var wrapper = new LodashWrapper([], true);
              }
            }
            index = wrapper ? index : length;
            while (++index < length) {
              func = funcs[index];
              var funcName = getFuncName(func),
                  data = funcName == 'wrapper' ? getData(func) : undefined;
              if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
                wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
              } else {
                wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
              }
            }
            return function () {
              var args = arguments,
                  value = args[0];
              if (wrapper && args.length == 1 && isArray(value)) {
                return wrapper.plant(value).value();
              }
              var index = 0,
                  result = length ? funcs[index].apply(this, args) : value;
              while (++index < length) {
                result = funcs[index].call(this, result);
              }
              return result;
            };
          });
        }
        function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
          var isAry = bitmask & WRAP_ARY_FLAG,
              isBind = bitmask & WRAP_BIND_FLAG,
              isBindKey = bitmask & WRAP_BIND_KEY_FLAG,
              isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG),
              isFlip = bitmask & WRAP_FLIP_FLAG,
              Ctor = isBindKey ? undefined : createCtor(func);
          function wrapper() {
            var length = arguments.length,
                args = Array(length),
                index = length;
            while (index--) {
              args[index] = arguments[index];
            }
            if (isCurried) {
              var placeholder = getHolder(wrapper),
                  holdersCount = countHolders(args, placeholder);
            }
            if (partials) {
              args = composeArgs(args, partials, holders, isCurried);
            }
            if (partialsRight) {
              args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
            }
            length -= holdersCount;
            if (isCurried && length < arity) {
              var newHolders = replaceHolders(args, placeholder);
              return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, thisArg, args, newHolders, argPos, ary, arity - length);
            }
            var thisBinding = isBind ? thisArg : this,
                fn = isBindKey ? thisBinding[func] : func;
            length = args.length;
            if (argPos) {
              args = reorder(args, argPos);
            } else if (isFlip && length > 1) {
              args.reverse();
            }
            if (isAry && ary < length) {
              args.length = ary;
            }
            if (this && this !== root && this instanceof wrapper) {
              fn = Ctor || createCtor(fn);
            }
            return fn.apply(thisBinding, args);
          }
          return wrapper;
        }
        function createInverter(setter, toIteratee) {
          return function (object, iteratee) {
            return baseInverter(object, setter, toIteratee(iteratee), {});
          };
        }
        function createMathOperation(operator, defaultValue) {
          return function (value, other) {
            var result;
            if (value === undefined && other === undefined) {
              return defaultValue;
            }
            if (value !== undefined) {
              result = value;
            }
            if (other !== undefined) {
              if (result === undefined) {
                return other;
              }
              if (typeof value == 'string' || typeof other == 'string') {
                value = baseToString(value);
                other = baseToString(other);
              } else {
                value = baseToNumber(value);
                other = baseToNumber(other);
              }
              result = operator(value, other);
            }
            return result;
          };
        }
        function createOver(arrayFunc) {
          return flatRest(function (iteratees) {
            iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
            return baseRest(function (args) {
              var thisArg = this;
              return arrayFunc(iteratees, function (iteratee) {
                return apply(iteratee, thisArg, args);
              });
            });
          });
        }
        function createPadding(length, chars) {
          chars = chars === undefined ? ' ' : baseToString(chars);
          var charsLength = chars.length;
          if (charsLength < 2) {
            return charsLength ? baseRepeat(chars, length) : chars;
          }
          var result = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
          return hasUnicode(chars) ? castSlice(stringToArray(result), 0, length).join('') : result.slice(0, length);
        }
        function createPartial(func, bitmask, thisArg, partials) {
          var isBind = bitmask & WRAP_BIND_FLAG,
              Ctor = createCtor(func);
          function wrapper() {
            var argsIndex = -1,
                argsLength = arguments.length,
                leftIndex = -1,
                leftLength = partials.length,
                args = Array(leftLength + argsLength),
                fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            while (++leftIndex < leftLength) {
              args[leftIndex] = partials[leftIndex];
            }
            while (argsLength--) {
              args[leftIndex++] = arguments[++argsIndex];
            }
            return apply(fn, isBind ? thisArg : this, args);
          }
          return wrapper;
        }
        function createRange(fromRight) {
          return function (start, end, step) {
            if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
              end = step = undefined;
            }
            start = toFinite(start);
            if (end === undefined) {
              end = start;
              start = 0;
            } else {
              end = toFinite(end);
            }
            step = step === undefined ? start < end ? 1 : -1 : toFinite(step);
            return baseRange(start, end, step, fromRight);
          };
        }
        function createRelationalOperation(operator) {
          return function (value, other) {
            if (!(typeof value == 'string' && typeof other == 'string')) {
              value = toNumber(value);
              other = toNumber(other);
            }
            return operator(value, other);
          };
        }
        function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
          var isCurry = bitmask & WRAP_CURRY_FLAG,
              newHolders = isCurry ? holders : undefined,
              newHoldersRight = isCurry ? undefined : holders,
              newPartials = isCurry ? partials : undefined,
              newPartialsRight = isCurry ? undefined : partials;
          bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
          bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
          if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
            bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
          }
          var newData = [func, bitmask, thisArg, newPartials, newHolders, newPartialsRight, newHoldersRight, argPos, ary, arity];
          var result = wrapFunc.apply(undefined, newData);
          if (isLaziable(func)) {
            setData(result, newData);
          }
          result.placeholder = placeholder;
          return setWrapToString(result, func, bitmask);
        }
        function createRound(methodName) {
          var func = Math[methodName];
          return function (number, precision) {
            number = toNumber(number);
            precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
            if (precision) {
              var pair = (toString(number) + 'e').split('e'),
                  value = func(pair[0] + 'e' + (+pair[1] + precision));
              pair = (toString(value) + 'e').split('e');
              return +(pair[0] + 'e' + (+pair[1] - precision));
            }
            return func(number);
          };
        }
        var createSet = !(Set && 1 / setToArray(new Set([, -0]))[1] == INFINITY) ? noop : function (values) {
          return new Set(values);
        };
        function createToPairs(keysFunc) {
          return function (object) {
            var tag = getTag(object);
            if (tag == mapTag) {
              return mapToArray(object);
            }
            if (tag == setTag) {
              return setToPairs(object);
            }
            return baseToPairs(object, keysFunc(object));
          };
        }
        function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
          var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
          if (!isBindKey && typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          var length = partials ? partials.length : 0;
          if (!length) {
            bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
            partials = holders = undefined;
          }
          ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
          arity = arity === undefined ? arity : toInteger(arity);
          length -= holders ? holders.length : 0;
          if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
            var partialsRight = partials,
                holdersRight = holders;
            partials = holders = undefined;
          }
          var data = isBindKey ? undefined : getData(func);
          var newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];
          if (data) {
            mergeData(newData, data);
          }
          func = newData[0];
          bitmask = newData[1];
          thisArg = newData[2];
          partials = newData[3];
          holders = newData[4];
          arity = newData[9] = newData[9] === undefined ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
          if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
            bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
          }
          if (!bitmask || bitmask == WRAP_BIND_FLAG) {
            var result = createBind(func, bitmask, thisArg);
          } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
            result = createCurry(func, bitmask, arity);
          } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
            result = createPartial(func, bitmask, thisArg, partials);
          } else {
            result = createHybrid.apply(undefined, newData);
          }
          var setter = data ? baseSetData : setData;
          return setWrapToString(setter(result, newData), func, bitmask);
        }
        function customDefaultsAssignIn(objValue, srcValue, key, object) {
          if (objValue === undefined || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
            return srcValue;
          }
          return objValue;
        }
        function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
          if (isObject(objValue) && isObject(srcValue)) {
            stack.set(srcValue, objValue);
            baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
            stack['delete'](srcValue);
          }
          return objValue;
        }
        function customOmitClone(value) {
          return isPlainObject(value) ? undefined : value;
        }
        function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
              arrLength = array.length,
              othLength = other.length;
          if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
            return false;
          }
          var stacked = stack.get(array);
          if (stacked && stack.get(other)) {
            return stacked == other;
          }
          var index = -1,
              result = true,
              seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined;
          stack.set(array, other);
          stack.set(other, array);
          while (++index < arrLength) {
            var arrValue = array[index],
                othValue = other[index];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
            }
            if (compared !== undefined) {
              if (compared) {
                continue;
              }
              result = false;
              break;
            }
            if (seen) {
              if (!arraySome(other, function (othValue, othIndex) {
                if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                  return seen.push(othIndex);
                }
              })) {
                result = false;
                break;
              }
            } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              result = false;
              break;
            }
          }
          stack['delete'](array);
          stack['delete'](other);
          return result;
        }
        function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
          switch (tag) {
            case dataViewTag:
              if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
                return false;
              }
              object = object.buffer;
              other = other.buffer;
            case arrayBufferTag:
              if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
                return false;
              }
              return true;
            case boolTag:
            case dateTag:
            case numberTag:
              return eq(+object, +other);
            case errorTag:
              return object.name == other.name && object.message == other.message;
            case regexpTag:
            case stringTag:
              return object == other + '';
            case mapTag:
              var convert = mapToArray;
            case setTag:
              var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
              convert || (convert = setToArray);
              if (object.size != other.size && !isPartial) {
                return false;
              }
              var stacked = stack.get(object);
              if (stacked) {
                return stacked == other;
              }
              bitmask |= COMPARE_UNORDERED_FLAG;
              stack.set(object, other);
              var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
              stack['delete'](object);
              return result;
            case symbolTag:
              if (symbolValueOf) {
                return symbolValueOf.call(object) == symbolValueOf.call(other);
              }
          }
          return false;
        }
        function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
              objProps = getAllKeys(object),
              objLength = objProps.length,
              othProps = getAllKeys(other),
              othLength = othProps.length;
          if (objLength != othLength && !isPartial) {
            return false;
          }
          var index = objLength;
          while (index--) {
            var key = objProps[index];
            if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
              return false;
            }
          }
          var stacked = stack.get(object);
          if (stacked && stack.get(other)) {
            return stacked == other;
          }
          var result = true;
          stack.set(object, other);
          stack.set(other, object);
          var skipCtor = isPartial;
          while (++index < objLength) {
            key = objProps[index];
            var objValue = object[key],
                othValue = other[key];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
            }
            if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
              result = false;
              break;
            }
            skipCtor || (skipCtor = key == 'constructor');
          }
          if (result && !skipCtor) {
            var objCtor = object.constructor,
                othCtor = other.constructor;
            if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
              result = false;
            }
          }
          stack['delete'](object);
          stack['delete'](other);
          return result;
        }
        function flatRest(func) {
          return setToString(overRest(func, undefined, flatten), func + '');
        }
        function getAllKeys(object) {
          return baseGetAllKeys(object, keys, getSymbols);
        }
        function getAllKeysIn(object) {
          return baseGetAllKeys(object, keysIn, getSymbolsIn);
        }
        var getData = !metaMap ? noop : function (func) {
          return metaMap.get(func);
        };
        function getFuncName(func) {
          var result = func.name + '',
              array = realNames[result],
              length = hasOwnProperty.call(realNames, result) ? array.length : 0;
          while (length--) {
            var data = array[length],
                otherFunc = data.func;
            if (otherFunc == null || otherFunc == func) {
              return data.name;
            }
          }
          return result;
        }
        function getHolder(func) {
          var object = hasOwnProperty.call(lodash, 'placeholder') ? lodash : func;
          return object.placeholder;
        }
        function getIteratee() {
          var result = lodash.iteratee || iteratee;
          result = result === iteratee ? baseIteratee : result;
          return arguments.length ? result(arguments[0], arguments[1]) : result;
        }
        function getMapData(map, key) {
          var data = map.__data__;
          return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
        }
        function getMatchData(object) {
          var result = keys(object),
              length = result.length;
          while (length--) {
            var key = result[length],
                value = object[key];
            result[length] = [key, value, isStrictComparable(value)];
          }
          return result;
        }
        function getNative(object, key) {
          var value = getValue(object, key);
          return baseIsNative(value) ? value : undefined;
        }
        function getRawTag(value) {
          var isOwn = hasOwnProperty.call(value, symToStringTag),
              tag = value[symToStringTag];
          try {
            value[symToStringTag] = undefined;
            var unmasked = true;
          } catch (e) {}
          var result = nativeObjectToString.call(value);
          if (unmasked) {
            if (isOwn) {
              value[symToStringTag] = tag;
            } else {
              delete value[symToStringTag];
            }
          }
          return result;
        }
        var getSymbols = !nativeGetSymbols ? stubArray : function (object) {
          if (object == null) {
            return [];
          }
          object = Object(object);
          return arrayFilter(nativeGetSymbols(object), function (symbol) {
            return propertyIsEnumerable.call(object, symbol);
          });
        };
        var getSymbolsIn = !nativeGetSymbols ? stubArray : function (object) {
          var result = [];
          while (object) {
            arrayPush(result, getSymbols(object));
            object = getPrototype(object);
          }
          return result;
        };
        var getTag = baseGetTag;
        if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
          getTag = function (value) {
            var result = baseGetTag(value),
                Ctor = result == objectTag ? value.constructor : undefined,
                ctorString = Ctor ? toSource(Ctor) : '';
            if (ctorString) {
              switch (ctorString) {
                case dataViewCtorString:
                  return dataViewTag;
                case mapCtorString:
                  return mapTag;
                case promiseCtorString:
                  return promiseTag;
                case setCtorString:
                  return setTag;
                case weakMapCtorString:
                  return weakMapTag;
              }
            }
            return result;
          };
        }
        function getView(start, end, transforms) {
          var index = -1,
              length = transforms.length;
          while (++index < length) {
            var data = transforms[index],
                size = data.size;
            switch (data.type) {
              case 'drop':
                start += size;
                break;
              case 'dropRight':
                end -= size;
                break;
              case 'take':
                end = nativeMin(end, start + size);
                break;
              case 'takeRight':
                start = nativeMax(start, end - size);
                break;
            }
          }
          return {
            'start': start,
            'end': end
          };
        }
        function getWrapDetails(source) {
          var match = source.match(reWrapDetails);
          return match ? match[1].split(reSplitDetails) : [];
        }
        function hasPath(object, path, hasFunc) {
          path = castPath(path, object);
          var index = -1,
              length = path.length,
              result = false;
          while (++index < length) {
            var key = toKey(path[index]);
            if (!(result = object != null && hasFunc(object, key))) {
              break;
            }
            object = object[key];
          }
          if (result || ++index != length) {
            return result;
          }
          length = object == null ? 0 : object.length;
          return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
        }
        function initCloneArray(array) {
          var length = array.length,
              result = array.constructor(length);
          if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
            result.index = array.index;
            result.input = array.input;
          }
          return result;
        }
        function initCloneObject(object) {
          return typeof object.constructor == 'function' && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
        }
        function initCloneByTag(object, tag, cloneFunc, isDeep) {
          var Ctor = object.constructor;
          switch (tag) {
            case arrayBufferTag:
              return cloneArrayBuffer(object);
            case boolTag:
            case dateTag:
              return new Ctor(+object);
            case dataViewTag:
              return cloneDataView(object, isDeep);
            case float32Tag:
            case float64Tag:
            case int8Tag:
            case int16Tag:
            case int32Tag:
            case uint8Tag:
            case uint8ClampedTag:
            case uint16Tag:
            case uint32Tag:
              return cloneTypedArray(object, isDeep);
            case mapTag:
              return cloneMap(object, isDeep, cloneFunc);
            case numberTag:
            case stringTag:
              return new Ctor(object);
            case regexpTag:
              return cloneRegExp(object);
            case setTag:
              return cloneSet(object, isDeep, cloneFunc);
            case symbolTag:
              return cloneSymbol(object);
          }
        }
        function insertWrapDetails(source, details) {
          var length = details.length;
          if (!length) {
            return source;
          }
          var lastIndex = length - 1;
          details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
          details = details.join(length > 2 ? ', ' : ' ');
          return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
        }
        function isFlattenable(value) {
          return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
        }
        function isIndex(value, length) {
          length = length == null ? MAX_SAFE_INTEGER : length;
          return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
        }
        function isIterateeCall(value, index, object) {
          if (!isObject(object)) {
            return false;
          }
          var type = typeof index;
          if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
            return eq(object[index], value);
          }
          return false;
        }
        function isKey(value, object) {
          if (isArray(value)) {
            return false;
          }
          var type = typeof value;
          if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
            return true;
          }
          return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
        }
        function isKeyable(value) {
          var type = typeof value;
          return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
        }
        function isLaziable(func) {
          var funcName = getFuncName(func),
              other = lodash[funcName];
          if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
            return false;
          }
          if (func === other) {
            return true;
          }
          var data = getData(other);
          return !!data && func === data[0];
        }
        function isMasked(func) {
          return !!maskSrcKey && maskSrcKey in func;
        }
        var isMaskable = coreJsData ? isFunction : stubFalse;
        function isPrototype(value) {
          var Ctor = value && value.constructor,
              proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;
          return value === proto;
        }
        function isStrictComparable(value) {
          return value === value && !isObject(value);
        }
        function matchesStrictComparable(key, srcValue) {
          return function (object) {
            if (object == null) {
              return false;
            }
            return object[key] === srcValue && (srcValue !== undefined || key in Object(object));
          };
        }
        function memoizeCapped(func) {
          var result = memoize(func, function (key) {
            if (cache.size === MAX_MEMOIZE_SIZE) {
              cache.clear();
            }
            return key;
          });
          var cache = result.cache;
          return result;
        }
        function mergeData(data, source) {
          var bitmask = data[1],
              srcBitmask = source[1],
              newBitmask = bitmask | srcBitmask,
              isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
          var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
          if (!(isCommon || isCombo)) {
            return data;
          }
          if (srcBitmask & WRAP_BIND_FLAG) {
            data[2] = source[2];
            newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
          }
          var value = source[3];
          if (value) {
            var partials = data[3];
            data[3] = partials ? composeArgs(partials, value, source[4]) : value;
            data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
          }
          value = source[5];
          if (value) {
            partials = data[5];
            data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
            data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
          }
          value = source[7];
          if (value) {
            data[7] = value;
          }
          if (srcBitmask & WRAP_ARY_FLAG) {
            data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
          }
          if (data[9] == null) {
            data[9] = source[9];
          }
          data[0] = source[0];
          data[1] = newBitmask;
          return data;
        }
        function nativeKeysIn(object) {
          var result = [];
          if (object != null) {
            for (var key in Object(object)) {
              result.push(key);
            }
          }
          return result;
        }
        function objectToString(value) {
          return nativeObjectToString.call(value);
        }
        function overRest(func, start, transform) {
          start = nativeMax(start === undefined ? func.length - 1 : start, 0);
          return function () {
            var args = arguments,
                index = -1,
                length = nativeMax(args.length - start, 0),
                array = Array(length);
            while (++index < length) {
              array[index] = args[start + index];
            }
            index = -1;
            var otherArgs = Array(start + 1);
            while (++index < start) {
              otherArgs[index] = args[index];
            }
            otherArgs[start] = transform(array);
            return apply(func, this, otherArgs);
          };
        }
        function parent(object, path) {
          return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
        }
        function reorder(array, indexes) {
          var arrLength = array.length,
              length = nativeMin(indexes.length, arrLength),
              oldArray = copyArray(array);
          while (length--) {
            var index = indexes[length];
            array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
          }
          return array;
        }
        var setData = shortOut(baseSetData);
        var setTimeout = ctxSetTimeout || function (func, wait) {
          return root.setTimeout(func, wait);
        };
        var setToString = shortOut(baseSetToString);
        function setWrapToString(wrapper, reference, bitmask) {
          var source = reference + '';
          return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
        }
        function shortOut(func) {
          var count = 0,
              lastCalled = 0;
          return function () {
            var stamp = nativeNow(),
                remaining = HOT_SPAN - (stamp - lastCalled);
            lastCalled = stamp;
            if (remaining > 0) {
              if (++count >= HOT_COUNT) {
                return arguments[0];
              }
            } else {
              count = 0;
            }
            return func.apply(undefined, arguments);
          };
        }
        function shuffleSelf(array, size) {
          var index = -1,
              length = array.length,
              lastIndex = length - 1;
          size = size === undefined ? length : size;
          while (++index < size) {
            var rand = baseRandom(index, lastIndex),
                value = array[rand];
            array[rand] = array[index];
            array[index] = value;
          }
          array.length = size;
          return array;
        }
        var stringToPath = memoizeCapped(function (string) {
          var result = [];
          if (reLeadingDot.test(string)) {
            result.push('');
          }
          string.replace(rePropName, function (match, number, quote, string) {
            result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
          });
          return result;
        });
        function toKey(value) {
          if (typeof value == 'string' || isSymbol(value)) {
            return value;
          }
          var result = value + '';
          return result == '0' && 1 / value == -INFINITY ? '-0' : result;
        }
        function toSource(func) {
          if (func != null) {
            try {
              return funcToString.call(func);
            } catch (e) {}
            try {
              return func + '';
            } catch (e) {}
          }
          return '';
        }
        function updateWrapDetails(details, bitmask) {
          arrayEach(wrapFlags, function (pair) {
            var value = '_.' + pair[0];
            if (bitmask & pair[1] && !arrayIncludes(details, value)) {
              details.push(value);
            }
          });
          return details.sort();
        }
        function wrapperClone(wrapper) {
          if (wrapper instanceof LazyWrapper) {
            return wrapper.clone();
          }
          var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
          result.__actions__ = copyArray(wrapper.__actions__);
          result.__index__ = wrapper.__index__;
          result.__values__ = wrapper.__values__;
          return result;
        }
        function chunk(array, size, guard) {
          if (guard ? isIterateeCall(array, size, guard) : size === undefined) {
            size = 1;
          } else {
            size = nativeMax(toInteger(size), 0);
          }
          var length = array == null ? 0 : array.length;
          if (!length || size < 1) {
            return [];
          }
          var index = 0,
              resIndex = 0,
              result = Array(nativeCeil(length / size));
          while (index < length) {
            result[resIndex++] = baseSlice(array, index, index += size);
          }
          return result;
        }
        function compact(array) {
          var index = -1,
              length = array == null ? 0 : array.length,
              resIndex = 0,
              result = [];
          while (++index < length) {
            var value = array[index];
            if (value) {
              result[resIndex++] = value;
            }
          }
          return result;
        }
        function concat() {
          var length = arguments.length;
          if (!length) {
            return [];
          }
          var args = Array(length - 1),
              array = arguments[0],
              index = length;
          while (index--) {
            args[index - 1] = arguments[index];
          }
          return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
        }
        var difference = baseRest(function (array, values) {
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true)) : [];
        });
        var differenceBy = baseRest(function (array, values) {
          var iteratee = last(values);
          if (isArrayLikeObject(iteratee)) {
            iteratee = undefined;
          }
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), getIteratee(iteratee, 2)) : [];
        });
        var differenceWith = baseRest(function (array, values) {
          var comparator = last(values);
          if (isArrayLikeObject(comparator)) {
            comparator = undefined;
          }
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), undefined, comparator) : [];
        });
        function drop(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined ? 1 : toInteger(n);
          return baseSlice(array, n < 0 ? 0 : n, length);
        }
        function dropRight(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined ? 1 : toInteger(n);
          n = length - n;
          return baseSlice(array, 0, n < 0 ? 0 : n);
        }
        function dropRightWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
        }
        function dropWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
        }
        function fill(array, value, start, end) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
            start = 0;
            end = length;
          }
          return baseFill(array, value, start, end);
        }
        function findIndex(array, predicate, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index < 0) {
            index = nativeMax(length + index, 0);
          }
          return baseFindIndex(array, getIteratee(predicate, 3), index);
        }
        function findLastIndex(array, predicate, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = length - 1;
          if (fromIndex !== undefined) {
            index = toInteger(fromIndex);
            index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
          }
          return baseFindIndex(array, getIteratee(predicate, 3), index, true);
        }
        function flatten(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseFlatten(array, 1) : [];
        }
        function flattenDeep(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseFlatten(array, INFINITY) : [];
        }
        function flattenDepth(array, depth) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          depth = depth === undefined ? 1 : toInteger(depth);
          return baseFlatten(array, depth);
        }
        function fromPairs(pairs) {
          var index = -1,
              length = pairs == null ? 0 : pairs.length,
              result = {};
          while (++index < length) {
            var pair = pairs[index];
            result[pair[0]] = pair[1];
          }
          return result;
        }
        function head(array) {
          return array && array.length ? array[0] : undefined;
        }
        function indexOf(array, value, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index < 0) {
            index = nativeMax(length + index, 0);
          }
          return baseIndexOf(array, value, index);
        }
        function initial(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseSlice(array, 0, -1) : [];
        }
        var intersection = baseRest(function (arrays) {
          var mapped = arrayMap(arrays, castArrayLikeObject);
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
        });
        var intersectionBy = baseRest(function (arrays) {
          var iteratee = last(arrays),
              mapped = arrayMap(arrays, castArrayLikeObject);
          if (iteratee === last(mapped)) {
            iteratee = undefined;
          } else {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee, 2)) : [];
        });
        var intersectionWith = baseRest(function (arrays) {
          var comparator = last(arrays),
              mapped = arrayMap(arrays, castArrayLikeObject);
          comparator = typeof comparator == 'function' ? comparator : undefined;
          if (comparator) {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined, comparator) : [];
        });
        function join(array, separator) {
          return array == null ? '' : nativeJoin.call(array, separator);
        }
        function last(array) {
          var length = array == null ? 0 : array.length;
          return length ? array[length - 1] : undefined;
        }
        function lastIndexOf(array, value, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = length;
          if (fromIndex !== undefined) {
            index = toInteger(fromIndex);
            index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
          }
          return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
        }
        function nth(array, n) {
          return array && array.length ? baseNth(array, toInteger(n)) : undefined;
        }
        var pull = baseRest(pullAll);
        function pullAll(array, values) {
          return array && array.length && values && values.length ? basePullAll(array, values) : array;
        }
        function pullAllBy(array, values, iteratee) {
          return array && array.length && values && values.length ? basePullAll(array, values, getIteratee(iteratee, 2)) : array;
        }
        function pullAllWith(array, values, comparator) {
          return array && array.length && values && values.length ? basePullAll(array, values, undefined, comparator) : array;
        }
        var pullAt = flatRest(function (array, indexes) {
          var length = array == null ? 0 : array.length,
              result = baseAt(array, indexes);
          basePullAt(array, arrayMap(indexes, function (index) {
            return isIndex(index, length) ? +index : index;
          }).sort(compareAscending));
          return result;
        });
        function remove(array, predicate) {
          var result = [];
          if (!(array && array.length)) {
            return result;
          }
          var index = -1,
              indexes = [],
              length = array.length;
          predicate = getIteratee(predicate, 3);
          while (++index < length) {
            var value = array[index];
            if (predicate(value, index, array)) {
              result.push(value);
              indexes.push(index);
            }
          }
          basePullAt(array, indexes);
          return result;
        }
        function reverse(array) {
          return array == null ? array : nativeReverse.call(array);
        }
        function slice(array, start, end) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
            start = 0;
            end = length;
          } else {
            start = start == null ? 0 : toInteger(start);
            end = end === undefined ? length : toInteger(end);
          }
          return baseSlice(array, start, end);
        }
        function sortedIndex(array, value) {
          return baseSortedIndex(array, value);
        }
        function sortedIndexBy(array, value, iteratee) {
          return baseSortedIndexBy(array, value, getIteratee(iteratee, 2));
        }
        function sortedIndexOf(array, value) {
          var length = array == null ? 0 : array.length;
          if (length) {
            var index = baseSortedIndex(array, value);
            if (index < length && eq(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        function sortedLastIndex(array, value) {
          return baseSortedIndex(array, value, true);
        }
        function sortedLastIndexBy(array, value, iteratee) {
          return baseSortedIndexBy(array, value, getIteratee(iteratee, 2), true);
        }
        function sortedLastIndexOf(array, value) {
          var length = array == null ? 0 : array.length;
          if (length) {
            var index = baseSortedIndex(array, value, true) - 1;
            if (eq(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        function sortedUniq(array) {
          return array && array.length ? baseSortedUniq(array) : [];
        }
        function sortedUniqBy(array, iteratee) {
          return array && array.length ? baseSortedUniq(array, getIteratee(iteratee, 2)) : [];
        }
        function tail(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseSlice(array, 1, length) : [];
        }
        function take(array, n, guard) {
          if (!(array && array.length)) {
            return [];
          }
          n = guard || n === undefined ? 1 : toInteger(n);
          return baseSlice(array, 0, n < 0 ? 0 : n);
        }
        function takeRight(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined ? 1 : toInteger(n);
          n = length - n;
          return baseSlice(array, n < 0 ? 0 : n, length);
        }
        function takeRightWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
        }
        function takeWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
        }
        var union = baseRest(function (arrays) {
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
        });
        var unionBy = baseRest(function (arrays) {
          var iteratee = last(arrays);
          if (isArrayLikeObject(iteratee)) {
            iteratee = undefined;
          }
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee, 2));
        });
        var unionWith = baseRest(function (arrays) {
          var comparator = last(arrays);
          comparator = typeof comparator == 'function' ? comparator : undefined;
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined, comparator);
        });
        function uniq(array) {
          return array && array.length ? baseUniq(array) : [];
        }
        function uniqBy(array, iteratee) {
          return array && array.length ? baseUniq(array, getIteratee(iteratee, 2)) : [];
        }
        function uniqWith(array, comparator) {
          comparator = typeof comparator == 'function' ? comparator : undefined;
          return array && array.length ? baseUniq(array, undefined, comparator) : [];
        }
        function unzip(array) {
          if (!(array && array.length)) {
            return [];
          }
          var length = 0;
          array = arrayFilter(array, function (group) {
            if (isArrayLikeObject(group)) {
              length = nativeMax(group.length, length);
              return true;
            }
          });
          return baseTimes(length, function (index) {
            return arrayMap(array, baseProperty(index));
          });
        }
        function unzipWith(array, iteratee) {
          if (!(array && array.length)) {
            return [];
          }
          var result = unzip(array);
          if (iteratee == null) {
            return result;
          }
          return arrayMap(result, function (group) {
            return apply(iteratee, undefined, group);
          });
        }
        var without = baseRest(function (array, values) {
          return isArrayLikeObject(array) ? baseDifference(array, values) : [];
        });
        var xor = baseRest(function (arrays) {
          return baseXor(arrayFilter(arrays, isArrayLikeObject));
        });
        var xorBy = baseRest(function (arrays) {
          var iteratee = last(arrays);
          if (isArrayLikeObject(iteratee)) {
            iteratee = undefined;
          }
          return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee, 2));
        });
        var xorWith = baseRest(function (arrays) {
          var comparator = last(arrays);
          comparator = typeof comparator == 'function' ? comparator : undefined;
          return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined, comparator);
        });
        var zip = baseRest(unzip);
        function zipObject(props, values) {
          return baseZipObject(props || [], values || [], assignValue);
        }
        function zipObjectDeep(props, values) {
          return baseZipObject(props || [], values || [], baseSet);
        }
        var zipWith = baseRest(function (arrays) {
          var length = arrays.length,
              iteratee = length > 1 ? arrays[length - 1] : undefined;
          iteratee = typeof iteratee == 'function' ? (arrays.pop(), iteratee) : undefined;
          return unzipWith(arrays, iteratee);
        });
        function chain(value) {
          var result = lodash(value);
          result.__chain__ = true;
          return result;
        }
        function tap(value, interceptor) {
          interceptor(value);
          return value;
        }
        function thru(value, interceptor) {
          return interceptor(value);
        }
        var wrapperAt = flatRest(function (paths) {
          var length = paths.length,
              start = length ? paths[0] : 0,
              value = this.__wrapped__,
              interceptor = function (object) {
            return baseAt(object, paths);
          };
          if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
            return this.thru(interceptor);
          }
          value = value.slice(start, +start + (length ? 1 : 0));
          value.__actions__.push({
            'func': thru,
            'args': [interceptor],
            'thisArg': undefined
          });
          return new LodashWrapper(value, this.__chain__).thru(function (array) {
            if (length && !array.length) {
              array.push(undefined);
            }
            return array;
          });
        });
        function wrapperChain() {
          return chain(this);
        }
        function wrapperCommit() {
          return new LodashWrapper(this.value(), this.__chain__);
        }
        function wrapperNext() {
          if (this.__values__ === undefined) {
            this.__values__ = toArray(this.value());
          }
          var done = this.__index__ >= this.__values__.length,
              value = done ? undefined : this.__values__[this.__index__++];
          return {
            'done': done,
            'value': value
          };
        }
        function wrapperToIterator() {
          return this;
        }
        function wrapperPlant(value) {
          var result,
              parent = this;
          while (parent instanceof baseLodash) {
            var clone = wrapperClone(parent);
            clone.__index__ = 0;
            clone.__values__ = undefined;
            if (result) {
              previous.__wrapped__ = clone;
            } else {
              result = clone;
            }
            var previous = clone;
            parent = parent.__wrapped__;
          }
          previous.__wrapped__ = value;
          return result;
        }
        function wrapperReverse() {
          var value = this.__wrapped__;
          if (value instanceof LazyWrapper) {
            var wrapped = value;
            if (this.__actions__.length) {
              wrapped = new LazyWrapper(this);
            }
            wrapped = wrapped.reverse();
            wrapped.__actions__.push({
              'func': thru,
              'args': [reverse],
              'thisArg': undefined
            });
            return new LodashWrapper(wrapped, this.__chain__);
          }
          return this.thru(reverse);
        }
        function wrapperValue() {
          return baseWrapperValue(this.__wrapped__, this.__actions__);
        }
        var countBy = createAggregator(function (result, value, key) {
          if (hasOwnProperty.call(result, key)) {
            ++result[key];
          } else {
            baseAssignValue(result, key, 1);
          }
        });
        function every(collection, predicate, guard) {
          var func = isArray(collection) ? arrayEvery : baseEvery;
          if (guard && isIterateeCall(collection, predicate, guard)) {
            predicate = undefined;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        function filter(collection, predicate) {
          var func = isArray(collection) ? arrayFilter : baseFilter;
          return func(collection, getIteratee(predicate, 3));
        }
        var find = createFind(findIndex);
        var findLast = createFind(findLastIndex);
        function flatMap(collection, iteratee) {
          return baseFlatten(map(collection, iteratee), 1);
        }
        function flatMapDeep(collection, iteratee) {
          return baseFlatten(map(collection, iteratee), INFINITY);
        }
        function flatMapDepth(collection, iteratee, depth) {
          depth = depth === undefined ? 1 : toInteger(depth);
          return baseFlatten(map(collection, iteratee), depth);
        }
        function forEach(collection, iteratee) {
          var func = isArray(collection) ? arrayEach : baseEach;
          return func(collection, getIteratee(iteratee, 3));
        }
        function forEachRight(collection, iteratee) {
          var func = isArray(collection) ? arrayEachRight : baseEachRight;
          return func(collection, getIteratee(iteratee, 3));
        }
        var groupBy = createAggregator(function (result, value, key) {
          if (hasOwnProperty.call(result, key)) {
            result[key].push(value);
          } else {
            baseAssignValue(result, key, [value]);
          }
        });
        function includes(collection, value, fromIndex, guard) {
          collection = isArrayLike(collection) ? collection : values(collection);
          fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
          var length = collection.length;
          if (fromIndex < 0) {
            fromIndex = nativeMax(length + fromIndex, 0);
          }
          return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
        }
        var invokeMap = baseRest(function (collection, path, args) {
          var index = -1,
              isFunc = typeof path == 'function',
              result = isArrayLike(collection) ? Array(collection.length) : [];
          baseEach(collection, function (value) {
            result[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
          });
          return result;
        });
        var keyBy = createAggregator(function (result, value, key) {
          baseAssignValue(result, key, value);
        });
        function map(collection, iteratee) {
          var func = isArray(collection) ? arrayMap : baseMap;
          return func(collection, getIteratee(iteratee, 3));
        }
        function orderBy(collection, iteratees, orders, guard) {
          if (collection == null) {
            return [];
          }
          if (!isArray(iteratees)) {
            iteratees = iteratees == null ? [] : [iteratees];
          }
          orders = guard ? undefined : orders;
          if (!isArray(orders)) {
            orders = orders == null ? [] : [orders];
          }
          return baseOrderBy(collection, iteratees, orders);
        }
        var partition = createAggregator(function (result, value, key) {
          result[key ? 0 : 1].push(value);
        }, function () {
          return [[], []];
        });
        function reduce(collection, iteratee, accumulator) {
          var func = isArray(collection) ? arrayReduce : baseReduce,
              initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEach);
        }
        function reduceRight(collection, iteratee, accumulator) {
          var func = isArray(collection) ? arrayReduceRight : baseReduce,
              initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEachRight);
        }
        function reject(collection, predicate) {
          var func = isArray(collection) ? arrayFilter : baseFilter;
          return func(collection, negate(getIteratee(predicate, 3)));
        }
        function sample(collection) {
          var func = isArray(collection) ? arraySample : baseSample;
          return func(collection);
        }
        function sampleSize(collection, n, guard) {
          if (guard ? isIterateeCall(collection, n, guard) : n === undefined) {
            n = 1;
          } else {
            n = toInteger(n);
          }
          var func = isArray(collection) ? arraySampleSize : baseSampleSize;
          return func(collection, n);
        }
        function shuffle(collection) {
          var func = isArray(collection) ? arrayShuffle : baseShuffle;
          return func(collection);
        }
        function size(collection) {
          if (collection == null) {
            return 0;
          }
          if (isArrayLike(collection)) {
            return isString(collection) ? stringSize(collection) : collection.length;
          }
          var tag = getTag(collection);
          if (tag == mapTag || tag == setTag) {
            return collection.size;
          }
          return baseKeys(collection).length;
        }
        function some(collection, predicate, guard) {
          var func = isArray(collection) ? arraySome : baseSome;
          if (guard && isIterateeCall(collection, predicate, guard)) {
            predicate = undefined;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        var sortBy = baseRest(function (collection, iteratees) {
          if (collection == null) {
            return [];
          }
          var length = iteratees.length;
          if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
            iteratees = [];
          } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
            iteratees = [iteratees[0]];
          }
          return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
        });
        var now = ctxNow || function () {
          return root.Date.now();
        };
        function after(n, func) {
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          n = toInteger(n);
          return function () {
            if (--n < 1) {
              return func.apply(this, arguments);
            }
          };
        }
        function ary(func, n, guard) {
          n = guard ? undefined : n;
          n = func && n == null ? func.length : n;
          return createWrap(func, WRAP_ARY_FLAG, undefined, undefined, undefined, undefined, n);
        }
        function before(n, func) {
          var result;
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          n = toInteger(n);
          return function () {
            if (--n > 0) {
              result = func.apply(this, arguments);
            }
            if (n <= 1) {
              func = undefined;
            }
            return result;
          };
        }
        var bind = baseRest(function (func, thisArg, partials) {
          var bitmask = WRAP_BIND_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bind));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(func, bitmask, thisArg, partials, holders);
        });
        var bindKey = baseRest(function (object, key, partials) {
          var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bindKey));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(key, bitmask, object, partials, holders);
        });
        function curry(func, arity, guard) {
          arity = guard ? undefined : arity;
          var result = createWrap(func, WRAP_CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
          result.placeholder = curry.placeholder;
          return result;
        }
        function curryRight(func, arity, guard) {
          arity = guard ? undefined : arity;
          var result = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
          result.placeholder = curryRight.placeholder;
          return result;
        }
        function debounce(func, wait, options) {
          var lastArgs,
              lastThis,
              maxWait,
              result,
              timerId,
              lastCallTime,
              lastInvokeTime = 0,
              leading = false,
              maxing = false,
              trailing = true;
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          wait = toNumber(wait) || 0;
          if (isObject(options)) {
            leading = !!options.leading;
            maxing = 'maxWait' in options;
            maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
            trailing = 'trailing' in options ? !!options.trailing : trailing;
          }
          function invokeFunc(time) {
            var args = lastArgs,
                thisArg = lastThis;
            lastArgs = lastThis = undefined;
            lastInvokeTime = time;
            result = func.apply(thisArg, args);
            return result;
          }
          function leadingEdge(time) {
            lastInvokeTime = time;
            timerId = setTimeout(timerExpired, wait);
            return leading ? invokeFunc(time) : result;
          }
          function remainingWait(time) {
            var timeSinceLastCall = time - lastCallTime,
                timeSinceLastInvoke = time - lastInvokeTime,
                result = wait - timeSinceLastCall;
            return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
          }
          function shouldInvoke(time) {
            var timeSinceLastCall = time - lastCallTime,
                timeSinceLastInvoke = time - lastInvokeTime;
            return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
          }
          function timerExpired() {
            var time = now();
            if (shouldInvoke(time)) {
              return trailingEdge(time);
            }
            timerId = setTimeout(timerExpired, remainingWait(time));
          }
          function trailingEdge(time) {
            timerId = undefined;
            if (trailing && lastArgs) {
              return invokeFunc(time);
            }
            lastArgs = lastThis = undefined;
            return result;
          }
          function cancel() {
            if (timerId !== undefined) {
              clearTimeout(timerId);
            }
            lastInvokeTime = 0;
            lastArgs = lastCallTime = lastThis = timerId = undefined;
          }
          function flush() {
            return timerId === undefined ? result : trailingEdge(now());
          }
          function debounced() {
            var time = now(),
                isInvoking = shouldInvoke(time);
            lastArgs = arguments;
            lastThis = this;
            lastCallTime = time;
            if (isInvoking) {
              if (timerId === undefined) {
                return leadingEdge(lastCallTime);
              }
              if (maxing) {
                timerId = setTimeout(timerExpired, wait);
                return invokeFunc(lastCallTime);
              }
            }
            if (timerId === undefined) {
              timerId = setTimeout(timerExpired, wait);
            }
            return result;
          }
          debounced.cancel = cancel;
          debounced.flush = flush;
          return debounced;
        }
        var defer = baseRest(function (func, args) {
          return baseDelay(func, 1, args);
        });
        var delay = baseRest(function (func, wait, args) {
          return baseDelay(func, toNumber(wait) || 0, args);
        });
        function flip(func) {
          return createWrap(func, WRAP_FLIP_FLAG);
        }
        function memoize(func, resolver) {
          if (typeof func != 'function' || resolver != null && typeof resolver != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          var memoized = function () {
            var args = arguments,
                key = resolver ? resolver.apply(this, args) : args[0],
                cache = memoized.cache;
            if (cache.has(key)) {
              return cache.get(key);
            }
            var result = func.apply(this, args);
            memoized.cache = cache.set(key, result) || cache;
            return result;
          };
          memoized.cache = new (memoize.Cache || MapCache)();
          return memoized;
        }
        memoize.Cache = MapCache;
        function negate(predicate) {
          if (typeof predicate != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          return function () {
            var args = arguments;
            switch (args.length) {
              case 0:
                return !predicate.call(this);
              case 1:
                return !predicate.call(this, args[0]);
              case 2:
                return !predicate.call(this, args[0], args[1]);
              case 3:
                return !predicate.call(this, args[0], args[1], args[2]);
            }
            return !predicate.apply(this, args);
          };
        }
        function once(func) {
          return before(2, func);
        }
        var overArgs = castRest(function (func, transforms) {
          transforms = transforms.length == 1 && isArray(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
          var funcsLength = transforms.length;
          return baseRest(function (args) {
            var index = -1,
                length = nativeMin(args.length, funcsLength);
            while (++index < length) {
              args[index] = transforms[index].call(this, args[index]);
            }
            return apply(func, this, args);
          });
        });
        var partial = baseRest(function (func, partials) {
          var holders = replaceHolders(partials, getHolder(partial));
          return createWrap(func, WRAP_PARTIAL_FLAG, undefined, partials, holders);
        });
        var partialRight = baseRest(function (func, partials) {
          var holders = replaceHolders(partials, getHolder(partialRight));
          return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined, partials, holders);
        });
        var rearg = flatRest(function (func, indexes) {
          return createWrap(func, WRAP_REARG_FLAG, undefined, undefined, undefined, indexes);
        });
        function rest(func, start) {
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          start = start === undefined ? start : toInteger(start);
          return baseRest(func, start);
        }
        function spread(func, start) {
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          start = start == null ? 0 : nativeMax(toInteger(start), 0);
          return baseRest(function (args) {
            var array = args[start],
                otherArgs = castSlice(args, 0, start);
            if (array) {
              arrayPush(otherArgs, array);
            }
            return apply(func, this, otherArgs);
          });
        }
        function throttle(func, wait, options) {
          var leading = true,
              trailing = true;
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          if (isObject(options)) {
            leading = 'leading' in options ? !!options.leading : leading;
            trailing = 'trailing' in options ? !!options.trailing : trailing;
          }
          return debounce(func, wait, {
            'leading': leading,
            'maxWait': wait,
            'trailing': trailing
          });
        }
        function unary(func) {
          return ary(func, 1);
        }
        function wrap(value, wrapper) {
          return partial(castFunction(wrapper), value);
        }
        function castArray() {
          if (!arguments.length) {
            return [];
          }
          var value = arguments[0];
          return isArray(value) ? value : [value];
        }
        function clone(value) {
          return baseClone(value, CLONE_SYMBOLS_FLAG);
        }
        function cloneWith(value, customizer) {
          customizer = typeof customizer == 'function' ? customizer : undefined;
          return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
        }
        function cloneDeep(value) {
          return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
        }
        function cloneDeepWith(value, customizer) {
          customizer = typeof customizer == 'function' ? customizer : undefined;
          return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
        }
        function conformsTo(object, source) {
          return source == null || baseConformsTo(object, source, keys(source));
        }
        function eq(value, other) {
          return value === other || value !== value && other !== other;
        }
        var gt = createRelationalOperation(baseGt);
        var gte = createRelationalOperation(function (value, other) {
          return value >= other;
        });
        var isArguments = baseIsArguments(function () {
          return arguments;
        }()) ? baseIsArguments : function (value) {
          return isObjectLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
        };
        var isArray = Array.isArray;
        var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
        function isArrayLike(value) {
          return value != null && isLength(value.length) && !isFunction(value);
        }
        function isArrayLikeObject(value) {
          return isObjectLike(value) && isArrayLike(value);
        }
        function isBoolean(value) {
          return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
        }
        var isBuffer = nativeIsBuffer || stubFalse;
        var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
        function isElement(value) {
          return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
        }
        function isEmpty(value) {
          if (value == null) {
            return true;
          }
          if (isArrayLike(value) && (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
            return !value.length;
          }
          var tag = getTag(value);
          if (tag == mapTag || tag == setTag) {
            return !value.size;
          }
          if (isPrototype(value)) {
            return !baseKeys(value).length;
          }
          for (var key in value) {
            if (hasOwnProperty.call(value, key)) {
              return false;
            }
          }
          return true;
        }
        function isEqual(value, other) {
          return baseIsEqual(value, other);
        }
        function isEqualWith(value, other, customizer) {
          customizer = typeof customizer == 'function' ? customizer : undefined;
          var result = customizer ? customizer(value, other) : undefined;
          return result === undefined ? baseIsEqual(value, other, undefined, customizer) : !!result;
        }
        function isError(value) {
          if (!isObjectLike(value)) {
            return false;
          }
          var tag = baseGetTag(value);
          return tag == errorTag || tag == domExcTag || typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject(value);
        }
        function isFinite(value) {
          return typeof value == 'number' && nativeIsFinite(value);
        }
        function isFunction(value) {
          if (!isObject(value)) {
            return false;
          }
          var tag = baseGetTag(value);
          return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
        }
        function isInteger(value) {
          return typeof value == 'number' && value == toInteger(value);
        }
        function isLength(value) {
          return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
        }
        function isObject(value) {
          var type = typeof value;
          return value != null && (type == 'object' || type == 'function');
        }
        function isObjectLike(value) {
          return value != null && typeof value == 'object';
        }
        var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
        function isMatch(object, source) {
          return object === source || baseIsMatch(object, source, getMatchData(source));
        }
        function isMatchWith(object, source, customizer) {
          customizer = typeof customizer == 'function' ? customizer : undefined;
          return baseIsMatch(object, source, getMatchData(source), customizer);
        }
        function isNaN(value) {
          return isNumber(value) && value != +value;
        }
        function isNative(value) {
          if (isMaskable(value)) {
            throw new Error(CORE_ERROR_TEXT);
          }
          return baseIsNative(value);
        }
        function isNull(value) {
          return value === null;
        }
        function isNil(value) {
          return value == null;
        }
        function isNumber(value) {
          return typeof value == 'number' || isObjectLike(value) && baseGetTag(value) == numberTag;
        }
        function isPlainObject(value) {
          if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
            return false;
          }
          var proto = getPrototype(value);
          if (proto === null) {
            return true;
          }
          var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
          return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
        }
        var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
        function isSafeInteger(value) {
          return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
        }
        var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
        function isString(value) {
          return typeof value == 'string' || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
        }
        function isSymbol(value) {
          return typeof value == 'symbol' || isObjectLike(value) && baseGetTag(value) == symbolTag;
        }
        var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
        function isUndefined(value) {
          return value === undefined;
        }
        function isWeakMap(value) {
          return isObjectLike(value) && getTag(value) == weakMapTag;
        }
        function isWeakSet(value) {
          return isObjectLike(value) && baseGetTag(value) == weakSetTag;
        }
        var lt = createRelationalOperation(baseLt);
        var lte = createRelationalOperation(function (value, other) {
          return value <= other;
        });
        function toArray(value) {
          if (!value) {
            return [];
          }
          if (isArrayLike(value)) {
            return isString(value) ? stringToArray(value) : copyArray(value);
          }
          if (symIterator && value[symIterator]) {
            return iteratorToArray(value[symIterator]());
          }
          var tag = getTag(value),
              func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
          return func(value);
        }
        function toFinite(value) {
          if (!value) {
            return value === 0 ? value : 0;
          }
          value = toNumber(value);
          if (value === INFINITY || value === -INFINITY) {
            var sign = value < 0 ? -1 : 1;
            return sign * MAX_INTEGER;
          }
          return value === value ? value : 0;
        }
        function toInteger(value) {
          var result = toFinite(value),
              remainder = result % 1;
          return result === result ? remainder ? result - remainder : result : 0;
        }
        function toLength(value) {
          return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
        }
        function toNumber(value) {
          if (typeof value == 'number') {
            return value;
          }
          if (isSymbol(value)) {
            return NAN;
          }
          if (isObject(value)) {
            var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
            value = isObject(other) ? other + '' : other;
          }
          if (typeof value != 'string') {
            return value === 0 ? value : +value;
          }
          value = value.replace(reTrim, '');
          var isBinary = reIsBinary.test(value);
          return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
        }
        function toPlainObject(value) {
          return copyObject(value, keysIn(value));
        }
        function toSafeInteger(value) {
          return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
        }
        function toString(value) {
          return value == null ? '' : baseToString(value);
        }
        var assign = createAssigner(function (object, source) {
          if (isPrototype(source) || isArrayLike(source)) {
            copyObject(source, keys(source), object);
            return;
          }
          for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
              assignValue(object, key, source[key]);
            }
          }
        });
        var assignIn = createAssigner(function (object, source) {
          copyObject(source, keysIn(source), object);
        });
        var assignInWith = createAssigner(function (object, source, srcIndex, customizer) {
          copyObject(source, keysIn(source), object, customizer);
        });
        var assignWith = createAssigner(function (object, source, srcIndex, customizer) {
          copyObject(source, keys(source), object, customizer);
        });
        var at = flatRest(baseAt);
        function create(prototype, properties) {
          var result = baseCreate(prototype);
          return properties == null ? result : baseAssign(result, properties);
        }
        var defaults = baseRest(function (args) {
          args.push(undefined, customDefaultsAssignIn);
          return apply(assignInWith, undefined, args);
        });
        var defaultsDeep = baseRest(function (args) {
          args.push(undefined, customDefaultsMerge);
          return apply(mergeWith, undefined, args);
        });
        function findKey(object, predicate) {
          return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
        }
        function findLastKey(object, predicate) {
          return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
        }
        function forIn(object, iteratee) {
          return object == null ? object : baseFor(object, getIteratee(iteratee, 3), keysIn);
        }
        function forInRight(object, iteratee) {
          return object == null ? object : baseForRight(object, getIteratee(iteratee, 3), keysIn);
        }
        function forOwn(object, iteratee) {
          return object && baseForOwn(object, getIteratee(iteratee, 3));
        }
        function forOwnRight(object, iteratee) {
          return object && baseForOwnRight(object, getIteratee(iteratee, 3));
        }
        function functions(object) {
          return object == null ? [] : baseFunctions(object, keys(object));
        }
        function functionsIn(object) {
          return object == null ? [] : baseFunctions(object, keysIn(object));
        }
        function get(object, path, defaultValue) {
          var result = object == null ? undefined : baseGet(object, path);
          return result === undefined ? defaultValue : result;
        }
        function has(object, path) {
          return object != null && hasPath(object, path, baseHas);
        }
        function hasIn(object, path) {
          return object != null && hasPath(object, path, baseHasIn);
        }
        var invert = createInverter(function (result, value, key) {
          result[value] = key;
        }, constant(identity));
        var invertBy = createInverter(function (result, value, key) {
          if (hasOwnProperty.call(result, value)) {
            result[value].push(key);
          } else {
            result[value] = [key];
          }
        }, getIteratee);
        var invoke = baseRest(baseInvoke);
        function keys(object) {
          return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
        }
        function keysIn(object) {
          return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
        }
        function mapKeys(object, iteratee) {
          var result = {};
          iteratee = getIteratee(iteratee, 3);
          baseForOwn(object, function (value, key, object) {
            baseAssignValue(result, iteratee(value, key, object), value);
          });
          return result;
        }
        function mapValues(object, iteratee) {
          var result = {};
          iteratee = getIteratee(iteratee, 3);
          baseForOwn(object, function (value, key, object) {
            baseAssignValue(result, key, iteratee(value, key, object));
          });
          return result;
        }
        var merge = createAssigner(function (object, source, srcIndex) {
          baseMerge(object, source, srcIndex);
        });
        var mergeWith = createAssigner(function (object, source, srcIndex, customizer) {
          baseMerge(object, source, srcIndex, customizer);
        });
        var omit = flatRest(function (object, paths) {
          var result = {};
          if (object == null) {
            return result;
          }
          var isDeep = false;
          paths = arrayMap(paths, function (path) {
            path = castPath(path, object);
            isDeep || (isDeep = path.length > 1);
            return path;
          });
          copyObject(object, getAllKeysIn(object), result);
          if (isDeep) {
            result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
          }
          var length = paths.length;
          while (length--) {
            baseUnset(result, paths[length]);
          }
          return result;
        });
        function omitBy(object, predicate) {
          return pickBy(object, negate(getIteratee(predicate)));
        }
        var pick = flatRest(function (object, paths) {
          return object == null ? {} : basePick(object, paths);
        });
        function pickBy(object, predicate) {
          if (object == null) {
            return {};
          }
          var props = arrayMap(getAllKeysIn(object), function (prop) {
            return [prop];
          });
          predicate = getIteratee(predicate);
          return basePickBy(object, props, function (value, path) {
            return predicate(value, path[0]);
          });
        }
        function result(object, path, defaultValue) {
          path = castPath(path, object);
          var index = -1,
              length = path.length;
          if (!length) {
            length = 1;
            object = undefined;
          }
          while (++index < length) {
            var value = object == null ? undefined : object[toKey(path[index])];
            if (value === undefined) {
              index = length;
              value = defaultValue;
            }
            object = isFunction(value) ? value.call(object) : value;
          }
          return object;
        }
        function set(object, path, value) {
          return object == null ? object : baseSet(object, path, value);
        }
        function setWith(object, path, value, customizer) {
          customizer = typeof customizer == 'function' ? customizer : undefined;
          return object == null ? object : baseSet(object, path, value, customizer);
        }
        var toPairs = createToPairs(keys);
        var toPairsIn = createToPairs(keysIn);
        function transform(object, iteratee, accumulator) {
          var isArr = isArray(object),
              isArrLike = isArr || isBuffer(object) || isTypedArray(object);
          iteratee = getIteratee(iteratee, 4);
          if (accumulator == null) {
            var Ctor = object && object.constructor;
            if (isArrLike) {
              accumulator = isArr ? new Ctor() : [];
            } else if (isObject(object)) {
              accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
            } else {
              accumulator = {};
            }
          }
          (isArrLike ? arrayEach : baseForOwn)(object, function (value, index, object) {
            return iteratee(accumulator, value, index, object);
          });
          return accumulator;
        }
        function unset(object, path) {
          return object == null ? true : baseUnset(object, path);
        }
        function update(object, path, updater) {
          return object == null ? object : baseUpdate(object, path, castFunction(updater));
        }
        function updateWith(object, path, updater, customizer) {
          customizer = typeof customizer == 'function' ? customizer : undefined;
          return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
        }
        function values(object) {
          return object == null ? [] : baseValues(object, keys(object));
        }
        function valuesIn(object) {
          return object == null ? [] : baseValues(object, keysIn(object));
        }
        function clamp(number, lower, upper) {
          if (upper === undefined) {
            upper = lower;
            lower = undefined;
          }
          if (upper !== undefined) {
            upper = toNumber(upper);
            upper = upper === upper ? upper : 0;
          }
          if (lower !== undefined) {
            lower = toNumber(lower);
            lower = lower === lower ? lower : 0;
          }
          return baseClamp(toNumber(number), lower, upper);
        }
        function inRange(number, start, end) {
          start = toFinite(start);
          if (end === undefined) {
            end = start;
            start = 0;
          } else {
            end = toFinite(end);
          }
          number = toNumber(number);
          return baseInRange(number, start, end);
        }
        function random(lower, upper, floating) {
          if (floating && typeof floating != 'boolean' && isIterateeCall(lower, upper, floating)) {
            upper = floating = undefined;
          }
          if (floating === undefined) {
            if (typeof upper == 'boolean') {
              floating = upper;
              upper = undefined;
            } else if (typeof lower == 'boolean') {
              floating = lower;
              lower = undefined;
            }
          }
          if (lower === undefined && upper === undefined) {
            lower = 0;
            upper = 1;
          } else {
            lower = toFinite(lower);
            if (upper === undefined) {
              upper = lower;
              lower = 0;
            } else {
              upper = toFinite(upper);
            }
          }
          if (lower > upper) {
            var temp = lower;
            lower = upper;
            upper = temp;
          }
          if (floating || lower % 1 || upper % 1) {
            var rand = nativeRandom();
            return nativeMin(lower + rand * (upper - lower + freeParseFloat('1e-' + ((rand + '').length - 1))), upper);
          }
          return baseRandom(lower, upper);
        }
        var camelCase = createCompounder(function (result, word, index) {
          word = word.toLowerCase();
          return result + (index ? capitalize(word) : word);
        });
        function capitalize(string) {
          return upperFirst(toString(string).toLowerCase());
        }
        function deburr(string) {
          string = toString(string);
          return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
        }
        function endsWith(string, target, position) {
          string = toString(string);
          target = baseToString(target);
          var length = string.length;
          position = position === undefined ? length : baseClamp(toInteger(position), 0, length);
          var end = position;
          position -= target.length;
          return position >= 0 && string.slice(position, end) == target;
        }
        function escape(string) {
          string = toString(string);
          return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
        }
        function escapeRegExp(string) {
          string = toString(string);
          return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, '\\$&') : string;
        }
        var kebabCase = createCompounder(function (result, word, index) {
          return result + (index ? '-' : '') + word.toLowerCase();
        });
        var lowerCase = createCompounder(function (result, word, index) {
          return result + (index ? ' ' : '') + word.toLowerCase();
        });
        var lowerFirst = createCaseFirst('toLowerCase');
        function pad(string, length, chars) {
          string = toString(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          if (!length || strLength >= length) {
            return string;
          }
          var mid = (length - strLength) / 2;
          return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
        }
        function padEnd(string, length, chars) {
          string = toString(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
        }
        function padStart(string, length, chars) {
          string = toString(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
        }
        function parseInt(string, radix, guard) {
          if (guard || radix == null) {
            radix = 0;
          } else if (radix) {
            radix = +radix;
          }
          return nativeParseInt(toString(string).replace(reTrimStart, ''), radix || 0);
        }
        function repeat(string, n, guard) {
          if (guard ? isIterateeCall(string, n, guard) : n === undefined) {
            n = 1;
          } else {
            n = toInteger(n);
          }
          return baseRepeat(toString(string), n);
        }
        function replace() {
          var args = arguments,
              string = toString(args[0]);
          return args.length < 3 ? string : string.replace(args[1], args[2]);
        }
        var snakeCase = createCompounder(function (result, word, index) {
          return result + (index ? '_' : '') + word.toLowerCase();
        });
        function split(string, separator, limit) {
          if (limit && typeof limit != 'number' && isIterateeCall(string, separator, limit)) {
            separator = limit = undefined;
          }
          limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0;
          if (!limit) {
            return [];
          }
          string = toString(string);
          if (string && (typeof separator == 'string' || separator != null && !isRegExp(separator))) {
            separator = baseToString(separator);
            if (!separator && hasUnicode(string)) {
              return castSlice(stringToArray(string), 0, limit);
            }
          }
          return string.split(separator, limit);
        }
        var startCase = createCompounder(function (result, word, index) {
          return result + (index ? ' ' : '') + upperFirst(word);
        });
        function startsWith(string, target, position) {
          string = toString(string);
          position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
          target = baseToString(target);
          return string.slice(position, position + target.length) == target;
        }
        function template(string, options, guard) {
          var settings = lodash.templateSettings;
          if (guard && isIterateeCall(string, options, guard)) {
            options = undefined;
          }
          string = toString(string);
          options = assignInWith({}, options, settings, customDefaultsAssignIn);
          var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn),
              importsKeys = keys(imports),
              importsValues = baseValues(imports, importsKeys);
          var isEscaping,
              isEvaluating,
              index = 0,
              interpolate = options.interpolate || reNoMatch,
              source = "__p += '";
          var reDelimiters = RegExp((options.escape || reNoMatch).source + '|' + interpolate.source + '|' + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' + (options.evaluate || reNoMatch).source + '|$', 'g');
          var sourceURL = '//# sourceURL=' + ('sourceURL' in options ? options.sourceURL : 'lodash.templateSources[' + ++templateCounter + ']') + '\n';
          string.replace(reDelimiters, function (match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
            interpolateValue || (interpolateValue = esTemplateValue);
            source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
            if (escapeValue) {
              isEscaping = true;
              source += "' +\n__e(" + escapeValue + ") +\n'";
            }
            if (evaluateValue) {
              isEvaluating = true;
              source += "';\n" + evaluateValue + ";\n__p += '";
            }
            if (interpolateValue) {
              source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
            }
            index = offset + match.length;
            return match;
          });
          source += "';\n";
          var variable = options.variable;
          if (!variable) {
            source = 'with (obj) {\n' + source + '\n}\n';
          }
          source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source).replace(reEmptyStringMiddle, '$1').replace(reEmptyStringTrailing, '$1;');
          source = 'function(' + (variable || 'obj') + ') {\n' + (variable ? '' : 'obj || (obj = {});\n') + "var __t, __p = ''" + (isEscaping ? ', __e = _.escape' : '') + (isEvaluating ? ', __j = Array.prototype.join;\n' + "function print() { __p += __j.call(arguments, '') }\n" : ';\n') + source + 'return __p\n}';
          var result = attempt(function () {
            return Function(importsKeys, sourceURL + 'return ' + source).apply(undefined, importsValues);
          });
          result.source = source;
          if (isError(result)) {
            throw result;
          }
          return result;
        }
        function toLower(value) {
          return toString(value).toLowerCase();
        }
        function toUpper(value) {
          return toString(value).toUpperCase();
        }
        function trim(string, chars, guard) {
          string = toString(string);
          if (string && (guard || chars === undefined)) {
            return string.replace(reTrim, '');
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string),
              chrSymbols = stringToArray(chars),
              start = charsStartIndex(strSymbols, chrSymbols),
              end = charsEndIndex(strSymbols, chrSymbols) + 1;
          return castSlice(strSymbols, start, end).join('');
        }
        function trimEnd(string, chars, guard) {
          string = toString(string);
          if (string && (guard || chars === undefined)) {
            return string.replace(reTrimEnd, '');
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string),
              end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
          return castSlice(strSymbols, 0, end).join('');
        }
        function trimStart(string, chars, guard) {
          string = toString(string);
          if (string && (guard || chars === undefined)) {
            return string.replace(reTrimStart, '');
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string),
              start = charsStartIndex(strSymbols, stringToArray(chars));
          return castSlice(strSymbols, start).join('');
        }
        function truncate(string, options) {
          var length = DEFAULT_TRUNC_LENGTH,
              omission = DEFAULT_TRUNC_OMISSION;
          if (isObject(options)) {
            var separator = 'separator' in options ? options.separator : separator;
            length = 'length' in options ? toInteger(options.length) : length;
            omission = 'omission' in options ? baseToString(options.omission) : omission;
          }
          string = toString(string);
          var strLength = string.length;
          if (hasUnicode(string)) {
            var strSymbols = stringToArray(string);
            strLength = strSymbols.length;
          }
          if (length >= strLength) {
            return string;
          }
          var end = length - stringSize(omission);
          if (end < 1) {
            return omission;
          }
          var result = strSymbols ? castSlice(strSymbols, 0, end).join('') : string.slice(0, end);
          if (separator === undefined) {
            return result + omission;
          }
          if (strSymbols) {
            end += result.length - end;
          }
          if (isRegExp(separator)) {
            if (string.slice(end).search(separator)) {
              var match,
                  substring = result;
              if (!separator.global) {
                separator = RegExp(separator.source, toString(reFlags.exec(separator)) + 'g');
              }
              separator.lastIndex = 0;
              while (match = separator.exec(substring)) {
                var newEnd = match.index;
              }
              result = result.slice(0, newEnd === undefined ? end : newEnd);
            }
          } else if (string.indexOf(baseToString(separator), end) != end) {
            var index = result.lastIndexOf(separator);
            if (index > -1) {
              result = result.slice(0, index);
            }
          }
          return result + omission;
        }
        function unescape(string) {
          string = toString(string);
          return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
        }
        var upperCase = createCompounder(function (result, word, index) {
          return result + (index ? ' ' : '') + word.toUpperCase();
        });
        var upperFirst = createCaseFirst('toUpperCase');
        function words(string, pattern, guard) {
          string = toString(string);
          pattern = guard ? undefined : pattern;
          if (pattern === undefined) {
            return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
          }
          return string.match(pattern) || [];
        }
        var attempt = baseRest(function (func, args) {
          try {
            return apply(func, undefined, args);
          } catch (e) {
            return isError(e) ? e : new Error(e);
          }
        });
        var bindAll = flatRest(function (object, methodNames) {
          arrayEach(methodNames, function (key) {
            key = toKey(key);
            baseAssignValue(object, key, bind(object[key], object));
          });
          return object;
        });
        function cond(pairs) {
          var length = pairs == null ? 0 : pairs.length,
              toIteratee = getIteratee();
          pairs = !length ? [] : arrayMap(pairs, function (pair) {
            if (typeof pair[1] != 'function') {
              throw new TypeError(FUNC_ERROR_TEXT);
            }
            return [toIteratee(pair[0]), pair[1]];
          });
          return baseRest(function (args) {
            var index = -1;
            while (++index < length) {
              var pair = pairs[index];
              if (apply(pair[0], this, args)) {
                return apply(pair[1], this, args);
              }
            }
          });
        }
        function conforms(source) {
          return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
        }
        function constant(value) {
          return function () {
            return value;
          };
        }
        function defaultTo(value, defaultValue) {
          return value == null || value !== value ? defaultValue : value;
        }
        var flow = createFlow();
        var flowRight = createFlow(true);
        function identity(value) {
          return value;
        }
        function iteratee(func) {
          return baseIteratee(typeof func == 'function' ? func : baseClone(func, CLONE_DEEP_FLAG));
        }
        function matches(source) {
          return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
        }
        function matchesProperty(path, srcValue) {
          return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
        }
        var method = baseRest(function (path, args) {
          return function (object) {
            return baseInvoke(object, path, args);
          };
        });
        var methodOf = baseRest(function (object, args) {
          return function (path) {
            return baseInvoke(object, path, args);
          };
        });
        function mixin(object, source, options) {
          var props = keys(source),
              methodNames = baseFunctions(source, props);
          if (options == null && !(isObject(source) && (methodNames.length || !props.length))) {
            options = source;
            source = object;
            object = this;
            methodNames = baseFunctions(source, keys(source));
          }
          var chain = !(isObject(options) && 'chain' in options) || !!options.chain,
              isFunc = isFunction(object);
          arrayEach(methodNames, function (methodName) {
            var func = source[methodName];
            object[methodName] = func;
            if (isFunc) {
              object.prototype[methodName] = function () {
                var chainAll = this.__chain__;
                if (chain || chainAll) {
                  var result = object(this.__wrapped__),
                      actions = result.__actions__ = copyArray(this.__actions__);
                  actions.push({
                    'func': func,
                    'args': arguments,
                    'thisArg': object
                  });
                  result.__chain__ = chainAll;
                  return result;
                }
                return func.apply(object, arrayPush([this.value()], arguments));
              };
            }
          });
          return object;
        }
        function noConflict() {
          if (root._ === this) {
            root._ = oldDash;
          }
          return this;
        }
        function noop() {}
        function nthArg(n) {
          n = toInteger(n);
          return baseRest(function (args) {
            return baseNth(args, n);
          });
        }
        var over = createOver(arrayMap);
        var overEvery = createOver(arrayEvery);
        var overSome = createOver(arraySome);
        function property(path) {
          return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
        }
        function propertyOf(object) {
          return function (path) {
            return object == null ? undefined : baseGet(object, path);
          };
        }
        var range = createRange();
        var rangeRight = createRange(true);
        function stubArray() {
          return [];
        }
        function stubFalse() {
          return false;
        }
        function stubObject() {
          return {};
        }
        function stubString() {
          return '';
        }
        function stubTrue() {
          return true;
        }
        function times(n, iteratee) {
          n = toInteger(n);
          if (n < 1 || n > MAX_SAFE_INTEGER) {
            return [];
          }
          var index = MAX_ARRAY_LENGTH,
              length = nativeMin(n, MAX_ARRAY_LENGTH);
          iteratee = getIteratee(iteratee);
          n -= MAX_ARRAY_LENGTH;
          var result = baseTimes(length, iteratee);
          while (++index < n) {
            iteratee(index);
          }
          return result;
        }
        function toPath(value) {
          if (isArray(value)) {
            return arrayMap(value, toKey);
          }
          return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
        }
        function uniqueId(prefix) {
          var id = ++idCounter;
          return toString(prefix) + id;
        }
        var add = createMathOperation(function (augend, addend) {
          return augend + addend;
        }, 0);
        var ceil = createRound('ceil');
        var divide = createMathOperation(function (dividend, divisor) {
          return dividend / divisor;
        }, 1);
        var floor = createRound('floor');
        function max(array) {
          return array && array.length ? baseExtremum(array, identity, baseGt) : undefined;
        }
        function maxBy(array, iteratee) {
          return array && array.length ? baseExtremum(array, getIteratee(iteratee, 2), baseGt) : undefined;
        }
        function mean(array) {
          return baseMean(array, identity);
        }
        function meanBy(array, iteratee) {
          return baseMean(array, getIteratee(iteratee, 2));
        }
        function min(array) {
          return array && array.length ? baseExtremum(array, identity, baseLt) : undefined;
        }
        function minBy(array, iteratee) {
          return array && array.length ? baseExtremum(array, getIteratee(iteratee, 2), baseLt) : undefined;
        }
        var multiply = createMathOperation(function (multiplier, multiplicand) {
          return multiplier * multiplicand;
        }, 1);
        var round = createRound('round');
        var subtract = createMathOperation(function (minuend, subtrahend) {
          return minuend - subtrahend;
        }, 0);
        function sum(array) {
          return array && array.length ? baseSum(array, identity) : 0;
        }
        function sumBy(array, iteratee) {
          return array && array.length ? baseSum(array, getIteratee(iteratee, 2)) : 0;
        }
        lodash.after = after;
        lodash.ary = ary;
        lodash.assign = assign;
        lodash.assignIn = assignIn;
        lodash.assignInWith = assignInWith;
        lodash.assignWith = assignWith;
        lodash.at = at;
        lodash.before = before;
        lodash.bind = bind;
        lodash.bindAll = bindAll;
        lodash.bindKey = bindKey;
        lodash.castArray = castArray;
        lodash.chain = chain;
        lodash.chunk = chunk;
        lodash.compact = compact;
        lodash.concat = concat;
        lodash.cond = cond;
        lodash.conforms = conforms;
        lodash.constant = constant;
        lodash.countBy = countBy;
        lodash.create = create;
        lodash.curry = curry;
        lodash.curryRight = curryRight;
        lodash.debounce = debounce;
        lodash.defaults = defaults;
        lodash.defaultsDeep = defaultsDeep;
        lodash.defer = defer;
        lodash.delay = delay;
        lodash.difference = difference;
        lodash.differenceBy = differenceBy;
        lodash.differenceWith = differenceWith;
        lodash.drop = drop;
        lodash.dropRight = dropRight;
        lodash.dropRightWhile = dropRightWhile;
        lodash.dropWhile = dropWhile;
        lodash.fill = fill;
        lodash.filter = filter;
        lodash.flatMap = flatMap;
        lodash.flatMapDeep = flatMapDeep;
        lodash.flatMapDepth = flatMapDepth;
        lodash.flatten = flatten;
        lodash.flattenDeep = flattenDeep;
        lodash.flattenDepth = flattenDepth;
        lodash.flip = flip;
        lodash.flow = flow;
        lodash.flowRight = flowRight;
        lodash.fromPairs = fromPairs;
        lodash.functions = functions;
        lodash.functionsIn = functionsIn;
        lodash.groupBy = groupBy;
        lodash.initial = initial;
        lodash.intersection = intersection;
        lodash.intersectionBy = intersectionBy;
        lodash.intersectionWith = intersectionWith;
        lodash.invert = invert;
        lodash.invertBy = invertBy;
        lodash.invokeMap = invokeMap;
        lodash.iteratee = iteratee;
        lodash.keyBy = keyBy;
        lodash.keys = keys;
        lodash.keysIn = keysIn;
        lodash.map = map;
        lodash.mapKeys = mapKeys;
        lodash.mapValues = mapValues;
        lodash.matches = matches;
        lodash.matchesProperty = matchesProperty;
        lodash.memoize = memoize;
        lodash.merge = merge;
        lodash.mergeWith = mergeWith;
        lodash.method = method;
        lodash.methodOf = methodOf;
        lodash.mixin = mixin;
        lodash.negate = negate;
        lodash.nthArg = nthArg;
        lodash.omit = omit;
        lodash.omitBy = omitBy;
        lodash.once = once;
        lodash.orderBy = orderBy;
        lodash.over = over;
        lodash.overArgs = overArgs;
        lodash.overEvery = overEvery;
        lodash.overSome = overSome;
        lodash.partial = partial;
        lodash.partialRight = partialRight;
        lodash.partition = partition;
        lodash.pick = pick;
        lodash.pickBy = pickBy;
        lodash.property = property;
        lodash.propertyOf = propertyOf;
        lodash.pull = pull;
        lodash.pullAll = pullAll;
        lodash.pullAllBy = pullAllBy;
        lodash.pullAllWith = pullAllWith;
        lodash.pullAt = pullAt;
        lodash.range = range;
        lodash.rangeRight = rangeRight;
        lodash.rearg = rearg;
        lodash.reject = reject;
        lodash.remove = remove;
        lodash.rest = rest;
        lodash.reverse = reverse;
        lodash.sampleSize = sampleSize;
        lodash.set = set;
        lodash.setWith = setWith;
        lodash.shuffle = shuffle;
        lodash.slice = slice;
        lodash.sortBy = sortBy;
        lodash.sortedUniq = sortedUniq;
        lodash.sortedUniqBy = sortedUniqBy;
        lodash.split = split;
        lodash.spread = spread;
        lodash.tail = tail;
        lodash.take = take;
        lodash.takeRight = takeRight;
        lodash.takeRightWhile = takeRightWhile;
        lodash.takeWhile = takeWhile;
        lodash.tap = tap;
        lodash.throttle = throttle;
        lodash.thru = thru;
        lodash.toArray = toArray;
        lodash.toPairs = toPairs;
        lodash.toPairsIn = toPairsIn;
        lodash.toPath = toPath;
        lodash.toPlainObject = toPlainObject;
        lodash.transform = transform;
        lodash.unary = unary;
        lodash.union = union;
        lodash.unionBy = unionBy;
        lodash.unionWith = unionWith;
        lodash.uniq = uniq;
        lodash.uniqBy = uniqBy;
        lodash.uniqWith = uniqWith;
        lodash.unset = unset;
        lodash.unzip = unzip;
        lodash.unzipWith = unzipWith;
        lodash.update = update;
        lodash.updateWith = updateWith;
        lodash.values = values;
        lodash.valuesIn = valuesIn;
        lodash.without = without;
        lodash.words = words;
        lodash.wrap = wrap;
        lodash.xor = xor;
        lodash.xorBy = xorBy;
        lodash.xorWith = xorWith;
        lodash.zip = zip;
        lodash.zipObject = zipObject;
        lodash.zipObjectDeep = zipObjectDeep;
        lodash.zipWith = zipWith;
        lodash.entries = toPairs;
        lodash.entriesIn = toPairsIn;
        lodash.extend = assignIn;
        lodash.extendWith = assignInWith;
        mixin(lodash, lodash);
        lodash.add = add;
        lodash.attempt = attempt;
        lodash.camelCase = camelCase;
        lodash.capitalize = capitalize;
        lodash.ceil = ceil;
        lodash.clamp = clamp;
        lodash.clone = clone;
        lodash.cloneDeep = cloneDeep;
        lodash.cloneDeepWith = cloneDeepWith;
        lodash.cloneWith = cloneWith;
        lodash.conformsTo = conformsTo;
        lodash.deburr = deburr;
        lodash.defaultTo = defaultTo;
        lodash.divide = divide;
        lodash.endsWith = endsWith;
        lodash.eq = eq;
        lodash.escape = escape;
        lodash.escapeRegExp = escapeRegExp;
        lodash.every = every;
        lodash.find = find;
        lodash.findIndex = findIndex;
        lodash.findKey = findKey;
        lodash.findLast = findLast;
        lodash.findLastIndex = findLastIndex;
        lodash.findLastKey = findLastKey;
        lodash.floor = floor;
        lodash.forEach = forEach;
        lodash.forEachRight = forEachRight;
        lodash.forIn = forIn;
        lodash.forInRight = forInRight;
        lodash.forOwn = forOwn;
        lodash.forOwnRight = forOwnRight;
        lodash.get = get;
        lodash.gt = gt;
        lodash.gte = gte;
        lodash.has = has;
        lodash.hasIn = hasIn;
        lodash.head = head;
        lodash.identity = identity;
        lodash.includes = includes;
        lodash.indexOf = indexOf;
        lodash.inRange = inRange;
        lodash.invoke = invoke;
        lodash.isArguments = isArguments;
        lodash.isArray = isArray;
        lodash.isArrayBuffer = isArrayBuffer;
        lodash.isArrayLike = isArrayLike;
        lodash.isArrayLikeObject = isArrayLikeObject;
        lodash.isBoolean = isBoolean;
        lodash.isBuffer = isBuffer;
        lodash.isDate = isDate;
        lodash.isElement = isElement;
        lodash.isEmpty = isEmpty;
        lodash.isEqual = isEqual;
        lodash.isEqualWith = isEqualWith;
        lodash.isError = isError;
        lodash.isFinite = isFinite;
        lodash.isFunction = isFunction;
        lodash.isInteger = isInteger;
        lodash.isLength = isLength;
        lodash.isMap = isMap;
        lodash.isMatch = isMatch;
        lodash.isMatchWith = isMatchWith;
        lodash.isNaN = isNaN;
        lodash.isNative = isNative;
        lodash.isNil = isNil;
        lodash.isNull = isNull;
        lodash.isNumber = isNumber;
        lodash.isObject = isObject;
        lodash.isObjectLike = isObjectLike;
        lodash.isPlainObject = isPlainObject;
        lodash.isRegExp = isRegExp;
        lodash.isSafeInteger = isSafeInteger;
        lodash.isSet = isSet;
        lodash.isString = isString;
        lodash.isSymbol = isSymbol;
        lodash.isTypedArray = isTypedArray;
        lodash.isUndefined = isUndefined;
        lodash.isWeakMap = isWeakMap;
        lodash.isWeakSet = isWeakSet;
        lodash.join = join;
        lodash.kebabCase = kebabCase;
        lodash.last = last;
        lodash.lastIndexOf = lastIndexOf;
        lodash.lowerCase = lowerCase;
        lodash.lowerFirst = lowerFirst;
        lodash.lt = lt;
        lodash.lte = lte;
        lodash.max = max;
        lodash.maxBy = maxBy;
        lodash.mean = mean;
        lodash.meanBy = meanBy;
        lodash.min = min;
        lodash.minBy = minBy;
        lodash.stubArray = stubArray;
        lodash.stubFalse = stubFalse;
        lodash.stubObject = stubObject;
        lodash.stubString = stubString;
        lodash.stubTrue = stubTrue;
        lodash.multiply = multiply;
        lodash.nth = nth;
        lodash.noConflict = noConflict;
        lodash.noop = noop;
        lodash.now = now;
        lodash.pad = pad;
        lodash.padEnd = padEnd;
        lodash.padStart = padStart;
        lodash.parseInt = parseInt;
        lodash.random = random;
        lodash.reduce = reduce;
        lodash.reduceRight = reduceRight;
        lodash.repeat = repeat;
        lodash.replace = replace;
        lodash.result = result;
        lodash.round = round;
        lodash.runInContext = runInContext;
        lodash.sample = sample;
        lodash.size = size;
        lodash.snakeCase = snakeCase;
        lodash.some = some;
        lodash.sortedIndex = sortedIndex;
        lodash.sortedIndexBy = sortedIndexBy;
        lodash.sortedIndexOf = sortedIndexOf;
        lodash.sortedLastIndex = sortedLastIndex;
        lodash.sortedLastIndexBy = sortedLastIndexBy;
        lodash.sortedLastIndexOf = sortedLastIndexOf;
        lodash.startCase = startCase;
        lodash.startsWith = startsWith;
        lodash.subtract = subtract;
        lodash.sum = sum;
        lodash.sumBy = sumBy;
        lodash.template = template;
        lodash.times = times;
        lodash.toFinite = toFinite;
        lodash.toInteger = toInteger;
        lodash.toLength = toLength;
        lodash.toLower = toLower;
        lodash.toNumber = toNumber;
        lodash.toSafeInteger = toSafeInteger;
        lodash.toString = toString;
        lodash.toUpper = toUpper;
        lodash.trim = trim;
        lodash.trimEnd = trimEnd;
        lodash.trimStart = trimStart;
        lodash.truncate = truncate;
        lodash.unescape = unescape;
        lodash.uniqueId = uniqueId;
        lodash.upperCase = upperCase;
        lodash.upperFirst = upperFirst;
        lodash.each = forEach;
        lodash.eachRight = forEachRight;
        lodash.first = head;
        mixin(lodash, function () {
          var source = {};
          baseForOwn(lodash, function (func, methodName) {
            if (!hasOwnProperty.call(lodash.prototype, methodName)) {
              source[methodName] = func;
            }
          });
          return source;
        }(), { 'chain': false });
        lodash.VERSION = VERSION;
        arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function (methodName) {
          lodash[methodName].placeholder = lodash;
        });
        arrayEach(['drop', 'take'], function (methodName, index) {
          LazyWrapper.prototype[methodName] = function (n) {
            n = n === undefined ? 1 : nativeMax(toInteger(n), 0);
            var result = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
            if (result.__filtered__) {
              result.__takeCount__ = nativeMin(n, result.__takeCount__);
            } else {
              result.__views__.push({
                'size': nativeMin(n, MAX_ARRAY_LENGTH),
                'type': methodName + (result.__dir__ < 0 ? 'Right' : '')
              });
            }
            return result;
          };
          LazyWrapper.prototype[methodName + 'Right'] = function (n) {
            return this.reverse()[methodName](n).reverse();
          };
        });
        arrayEach(['filter', 'map', 'takeWhile'], function (methodName, index) {
          var type = index + 1,
              isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
          LazyWrapper.prototype[methodName] = function (iteratee) {
            var result = this.clone();
            result.__iteratees__.push({
              'iteratee': getIteratee(iteratee, 3),
              'type': type
            });
            result.__filtered__ = result.__filtered__ || isFilter;
            return result;
          };
        });
        arrayEach(['head', 'last'], function (methodName, index) {
          var takeName = 'take' + (index ? 'Right' : '');
          LazyWrapper.prototype[methodName] = function () {
            return this[takeName](1).value()[0];
          };
        });
        arrayEach(['initial', 'tail'], function (methodName, index) {
          var dropName = 'drop' + (index ? '' : 'Right');
          LazyWrapper.prototype[methodName] = function () {
            return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
          };
        });
        LazyWrapper.prototype.compact = function () {
          return this.filter(identity);
        };
        LazyWrapper.prototype.find = function (predicate) {
          return this.filter(predicate).head();
        };
        LazyWrapper.prototype.findLast = function (predicate) {
          return this.reverse().find(predicate);
        };
        LazyWrapper.prototype.invokeMap = baseRest(function (path, args) {
          if (typeof path == 'function') {
            return new LazyWrapper(this);
          }
          return this.map(function (value) {
            return baseInvoke(value, path, args);
          });
        });
        LazyWrapper.prototype.reject = function (predicate) {
          return this.filter(negate(getIteratee(predicate)));
        };
        LazyWrapper.prototype.slice = function (start, end) {
          start = toInteger(start);
          var result = this;
          if (result.__filtered__ && (start > 0 || end < 0)) {
            return new LazyWrapper(result);
          }
          if (start < 0) {
            result = result.takeRight(-start);
          } else if (start) {
            result = result.drop(start);
          }
          if (end !== undefined) {
            end = toInteger(end);
            result = end < 0 ? result.dropRight(-end) : result.take(end - start);
          }
          return result;
        };
        LazyWrapper.prototype.takeRightWhile = function (predicate) {
          return this.reverse().takeWhile(predicate).reverse();
        };
        LazyWrapper.prototype.toArray = function () {
          return this.take(MAX_ARRAY_LENGTH);
        };
        baseForOwn(LazyWrapper.prototype, function (func, methodName) {
          var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName),
              isTaker = /^(?:head|last)$/.test(methodName),
              lodashFunc = lodash[isTaker ? 'take' + (methodName == 'last' ? 'Right' : '') : methodName],
              retUnwrapped = isTaker || /^find/.test(methodName);
          if (!lodashFunc) {
            return;
          }
          lodash.prototype[methodName] = function () {
            var value = this.__wrapped__,
                args = isTaker ? [1] : arguments,
                isLazy = value instanceof LazyWrapper,
                iteratee = args[0],
                useLazy = isLazy || isArray(value);
            var interceptor = function (value) {
              var result = lodashFunc.apply(lodash, arrayPush([value], args));
              return isTaker && chainAll ? result[0] : result;
            };
            if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
              isLazy = useLazy = false;
            }
            var chainAll = this.__chain__,
                isHybrid = !!this.__actions__.length,
                isUnwrapped = retUnwrapped && !chainAll,
                onlyLazy = isLazy && !isHybrid;
            if (!retUnwrapped && useLazy) {
              value = onlyLazy ? value : new LazyWrapper(this);
              var result = func.apply(value, args);
              result.__actions__.push({
                'func': thru,
                'args': [interceptor],
                'thisArg': undefined
              });
              return new LodashWrapper(result, chainAll);
            }
            if (isUnwrapped && onlyLazy) {
              return func.apply(this, args);
            }
            result = this.thru(interceptor);
            return isUnwrapped ? isTaker ? result.value()[0] : result.value() : result;
          };
        });
        arrayEach(['pop', 'push', 'shift', 'sort', 'splice', 'unshift'], function (methodName) {
          var func = arrayProto[methodName],
              chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
              retUnwrapped = /^(?:pop|shift)$/.test(methodName);
          lodash.prototype[methodName] = function () {
            var args = arguments;
            if (retUnwrapped && !this.__chain__) {
              var value = this.value();
              return func.apply(isArray(value) ? value : [], args);
            }
            return this[chainName](function (value) {
              return func.apply(isArray(value) ? value : [], args);
            });
          };
        });
        baseForOwn(LazyWrapper.prototype, function (func, methodName) {
          var lodashFunc = lodash[methodName];
          if (lodashFunc) {
            var key = lodashFunc.name + '',
                names = realNames[key] || (realNames[key] = []);
            names.push({
              'name': methodName,
              'func': lodashFunc
            });
          }
        });
        realNames[createHybrid(undefined, WRAP_BIND_KEY_FLAG).name] = [{
          'name': 'wrapper',
          'func': undefined
        }];
        LazyWrapper.prototype.clone = lazyClone;
        LazyWrapper.prototype.reverse = lazyReverse;
        LazyWrapper.prototype.value = lazyValue;
        lodash.prototype.at = wrapperAt;
        lodash.prototype.chain = wrapperChain;
        lodash.prototype.commit = wrapperCommit;
        lodash.prototype.next = wrapperNext;
        lodash.prototype.plant = wrapperPlant;
        lodash.prototype.reverse = wrapperReverse;
        lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
        lodash.prototype.first = lodash.prototype.head;
        if (symIterator) {
          lodash.prototype[symIterator] = wrapperToIterator;
        }
        return lodash;
      };
      var _ = runInContext();
      if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
        root._ = _;
        define(function () {
          return _;
        });
      } else if (freeModule) {
        (freeModule.exports = _)._ = _;
        freeExports._ = _;
      } else {
        root._ = _;
      }
    }).call(this);
  })($__require('@empty').Buffer, $__require('@empty'));
  return module.exports;
});
$__System.registerDynamic("10", ["11"], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  module.exports = $__require("11");
  return module.exports;
});
$__System.register('12', ['5', '6', '10', '13', '14', '15', '16', 'e'], function (_export) {
  var _createClass, _classCallCheck, defer, StateDb, _get, _inherits, _defineProperty, _extends, __hotReload, StreamGraph;

  return {
    setters: [function (_3) {
      _createClass = _3['default'];
    }, function (_4) {
      _classCallCheck = _4['default'];
    }, function (_7) {
      defer = _7.defer;
    }, function (_6) {
      StateDb = _6.StateDb;
    }, function (_) {
      _get = _['default'];
    }, function (_2) {
      _inherits = _2['default'];
    }, function (_5) {
      _defineProperty = _5['default'];
    }, function (_e) {
      _extends = _e['default'];
    }],
    execute: function () {
      'use strict';

      __hotReload = true;

      _export('__hotReload', __hotReload);

      StreamGraph = (function (_StateDb) {
        _inherits(StreamGraph, _StateDb);

        function StreamGraph(state, db, div) {
          var _this = this;

          _classCallCheck(this, StreamGraph);

          _get(Object.getPrototypeOf(StreamGraph.prototype), 'constructor', this).call(this, state, db);

          this.key = "subject";
          this.big = true;

          this.outerWidth = 1200;
          this.outerHeight = window.innerHeight - 500;
          this.outerHeightInitial = this.outerHeight;
          this.outerHeightSmall = 100;
          this.margin = { top: 10, right: 13, bottom: 10, left: 13 };

          this.x = d3.scaleTime();
          this.y = d3.scaleLinear();

          this.xAxis = d3.axisBottom();
          // .orient("bottom")
          // .ticks(d3.timeYear.every(20))

          this.yAxis = d3.axisLeft().ticks(5, "1f");

          this.area = d3.area().x(function (d) {
            return _this.x(d.data.key);
          }).y0(function (d) {
            return _this.y(d[0]);
          }).y1(function (d) {
            return _this.y(d[1]);
          });
          // .curve(d3.curveCardinal)
          //.curve(d3.curveStepAfter)

          this.div = div;
          this.svg = this.div.append("svg");
          this.g = this.svg.append("g");
          this.gBrush = this.g.append("g").attr("class", "brush");
          this.gXaxis = this.g.append("g").attr("class", "x axis");
          this.gYaxis = this.g.append("g").attr("class", "y axis");
          this.gGraph = this.g.append("g").attr("class", "graph");

          this.gBrushLegend = this.g.append("g").attr("class", "brushLegend");
          this.gBrushLegend.append("text").attr("class", "from").attr("text-anchor", "middle").attr("x", 0).attr("y", 3).text("");

          this.gBrushLegend.append("text").attr("class", "to").attr("text-anchor", "middle").attr("x", 0).attr("y", 3).text("");

          this.div.append("div").attr("class", "totals").html('<span id="active">-</span> of <span id="total">-</span> books selected').on("click", function () {
            _this.gBrush.call(_this.brush.move, null);
          });

          // this.offset = this.div.node().offsetTop;

          this.nest = d3.nest();
          this.data = [];

          this.brush = d3.brushX().on("start brush", this.brushmove.bind(this)).on("end", this.brushend.bind(this));

          // window.addEventListener('scroll', (e) => {
          //   const diff = this.outerHeightInitial - window.scrollY;
          //   const height = this.outerHeightInitial + diff;
          //   // console.log(diff, height)
          //   if(diff < 0 && height > 100){
          //     this.outerHeight = height;
          //     this.init().render(true);
          //   }
          //   this.div.classed("dropshadow", diff < this.outerHeightInitial); 

          // console.log(d3.select(".stream").node().getBoundingClientRect())   
          //})

          return this;
        }

        _createClass(StreamGraph, [{
          key: 'init',
          value: function init() {
            var _this2 = this;

            this.width = this.outerWidth - this.margin.left - this.margin.right, this.height = this.outerHeight - this.margin.top - this.margin.bottom;

            this.x.rangeRound([0, this.width]);
            this.y.range([this.height, 0]).clamp(true);

            this.xAxis.scale(this.x).tickSize(-this.height);
            this.yAxis.scale(this.y);

            this.svg.attr("width", this.outerWidth).attr("height", this.outerHeight);

            this.g.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
            this.brush.extent([[0, 0], [this.width, this.height]]);
            this.gBrush.call(this.brush).on("click", function () {
              _this2.gBrush.call(_this2.brush.move, null);
            });
            this.gBrush.selectAll("rect").attr("height", this.height);

            this.gBrushLegend.select(".from").attr("transform", "translate(" + this.x(this.state.state.brushStart) + "," + this.height / 2 + ")");
            this.gBrushLegend.select(".to").attr("transform", "translate(" + this.x(this.state.state.brushEnd) + "," + this.height / 2 + ")");

            // this.gBrush.selectAll(".resize rect")
            //   .style("visibility", "inherit")

            return this;
          }
        }, {
          key: 'brushmove',
          value: function brushmove() {
            if (!d3.event.selection) {
              this.gBrushLegend.style("opacity", 0);
              this.gXaxis.selectAll("text").style("opacity", 1);
              return;
            }
            if (d3.event.sourceEvent.type == "brush") return;

            var domain0 = d3.event.selection.map(this.x.invert);
            var domain1 = domain0.map(d3.timeYear.round);

            // If empty when rounded, use floor & ceil instead.
            if (domain1[0] >= domain1[1]) {
              domain1[0] = d3.timeYear.floor(domain0[0]);
              domain1[1] = d3.timeYear.ceil(domain0[1]);
            }

            this.gBrushLegend.style("opacity", 1).select(".from").attr("transform", "translate(" + this.x(domain1[0]) + "," + this.height / 2 + ")").text(domain1[0].getFullYear()).attr("y", function (d) {
              return domain1[1] - domain1[0] <= 186159996000 ? "-5" : "3";
            });

            this.gBrushLegend.select(".to").attr("transform", "translate(" + this.x(domain1[1]) + "," + this.height / 2 + ")").text(domain1[1].getFullYear()).attr("y", function (d) {
              return domain1[1] - domain1[0] <= 186159996000 ? "11" : "3";
            });

            this.gXaxis.selectAll("text").style("opacity", function (d) {
              var a = +d + 146159996000 >= +domain1[0] && +d - 146159996000 <= +domain1[1];
              return a ? 0 : 1;
            });

            this.gBrush.call(this.brush.move, domain1.map(this.x));
            this.state.push({ brushStart: domain1[0], brushEnd: domain1[1], event: "brushmove" });

            this.gGraph.classed("brushing", true);
          }
        }, {
          key: 'brushend',
          value: function brushend() {
            var _this3 = this;

            var s = d3.event.selection ? d3.event.selection.map(function (d) {
              return _this3.x.invert(d);
            }) : this.db.extent;
            this.state.push({ brushStart: s[0], brushEnd: s[1], event: "brushend" });
            this.gGraph.classed("brushing", false);
          }
        }, {
          key: 'load',
          value: function load() {
            // console.log(_data[0], this.key);

            this.data = this.db.stackedHistogram();
            // console.log(this.data);

            var max = d3.max(this.data, function (d) {
              return d3.max(d, function (d) {
                return d[1];
              });
            }); // do it better
            this.y.domain([0.1, max]).nice();

            this.x.domain(this.db.extent);
            // add the upper domain which is < 20 years to the axis
            var ticks = this.x.ticks(d3.timeYear.every(20)).concat(this.x.domain()[1]);
            this.xAxis.tickValues(ticks);

            // if(this.data.length > 20){
            //   const cutoff = 100;
            //   let filtered = this.data.filter(d => d.values.length > cutoff);
            //   let other = { key: "other", values: []};

            //   this.data.forEach((d,i)=>{
            //     if(d.values.length <= cutoff){
            //       d.values.forEach(d=> other.values.push(d));
            //     }
            //   })
            //   filtered.push(other);
            //   console.log(filtered, other);

            //   this.data = filtered;
            // }

            return this;
          }
        }, {
          key: 'stateChange',
          value: function stateChange(next, last) {
            // console.log("stream", last.loaded, next.loaded);

            if (next.loaded == !last.loaded) {
              this.load().render();
              this.gBrush.call(this.brush.move, null);
            }

            if (next.hover !== last.hover) {
              this.render();
            }
            if (next.active !== last.active) {
              // let data = this.db.date.top(Infinity);
              this.load().render();
            }
            if (next.activeItem !== last.activeItem) {
              console.log("load2");
              this.load().render(true);
            }
            if (next.filters !== last.filters) {
              console.log("load2");
              this.load().render(true);
            }

            if (this.big && next.brushStart !== last.brushStart) {
              //this.load().render();
            }

            if (next.brushStart !== last.brushStart || next.brushEnd !== last.brushEnd) {
              //this.load().render();
              d3.select("#total").text(this.db.crossfilter.size());
              d3.select("#active").text(this.db.all.value());
            }

            // if(next.activeItem !== last.activeItem){
            //   if(!next.activeItem) {
            //     // this.stack.offset("silhouette");
            //     this.load().render();
            //   } else {
            //     this.load().render();
            //     // let k = this.state.state.active.substring(0,this.state.state.active.length-1);
            //     // let data = this.db.data.filter(d => d[k] === next.activeItem);
            //     // this.stack.offset("zero");
            //     // this.load(data).render();
            //   }
            // }
            // if(next.brushStart.getYear() != last.brushStart.getYear()){

            // }
            // console.log(next.brushStart, last.brushStart);
          }
        }, {
          key: 'render',
          value: function render(transition) {
            var _this4 = this;

            //console.log("render stream")

            var s = this.gGraph.selectAll("path").data(this.data, function (d) {
              return d.key;
            });

            s.enter().append("path").on("mouseenter", function (d, i, e) {
              if (!_this4.big) return;

              var p = d3.select(e[i]).node().getBoundingClientRect();
              var p2 = d3.select(".container").node().getBoundingClientRect();
              var time = d.reduce(function (h, c) {
                return h[1] > c[1] ? h : c;
              }, {}).data.key;
              var tooltip = { name: d.key, pos: [p.left - p2.left + _this4.x(time), p.top - p2.top] };

              if (d.key == "other") {
                _this4.state.push({ tooltip: tooltip });
              } else {
                _this4.state.push({ hover: d.key, tooltip: tooltip });
              }
            }).on("mouseleave", function (d) {
              if (!_this4.big) return;
              _this4.state.push({ hover: null, tooltip: null });
            }).on("click", function (d) {
              if (d.key == "other" || !_this4.big) return;

              // console.log(this.state.state.active);
              var key = _this4.state.state.active;
              var active = _this4.state.state.filters[key] && _this4.state.state.filters[key] === d.key;
              // this is a good example why actions where invented:
              var filters = _extends({}, _this4.state.state.filters, _defineProperty({}, key, active ? null : d.key));
              _this4.state.push({ event: "click", active: key, filters: filters });

              // let active = this.state.state.activeItem === d.key;
              // this.state.push({ activeItem: active ? null : d.key, event: "brushend" });
            }).attr("d", this.area).style("opacity", 0)
            // .transition(transition)
            // .duration(notransition ? 0 : 800)
            .style("opacity", function (d) {
              return d.key == "other" && _this4.big ? 0.3 : 1;
            });

            s.exit().remove();

            // nasty quickhack
            if (transition) {
              s.classed("active", function (d) {
                return _this4.big && _this4.state.state.hover == d.key;
              }).transition()
              // .duration(notransition ? 0 : 800)
              .attr("d", this.area).style("opacity", function (d) {
                return d.key == "other" && _this4.big ? 0.3 : 1;
              });
            } else {
              s.classed("active", function (d) {
                return _this4.big && _this4.state.state.hover == d.key;
              })
              // .transition()
              // .duration(notransition ? 0 : 800)
              .attr("d", this.area).style("opacity", function (d) {
                return d.key == "other" && _this4.big ? 0.3 : 1;
              });
            }

            this.gXaxis.attr("transform", "translate(0," + this.height + ")").call(this.xAxis);

            this.gXaxis.selectAll("text").attr("dy", -this.height / 2);

            // this.gXaxis
            //   .selectAll("text")
            //   .attr("transform", function(d) {
            //        return "translate(" + this.getBBox().height*-2 + "," + this.getBBox().height + ")rotate(-45)";
            //    });

            if (transition) {
              this.gYaxis.transition().call(this.yAxis);
            } else {
              this.gYaxis.call(this.yAxis);
            }

            this.gYaxis
            // .style("opacity", 1-(this.outerHeightInitial-this.outerHeight-100)/100)
            .style("opacity", 0);
            //   // .attr("transform", "translate(-10,0)")
            //   .selectAll("text")
            //   .attr("transform", "rotate(-90)")
            //   .attr("x", "0")
            //   .attr("dy", "-10")
            //   .attr("text-anchor", "middle")

            //   .attr("dx", 30)
          }
        }]);

        return StreamGraph;
      })(StateDb);

      _export('StreamGraph', StreamGraph);
    }
  };
});
$__System.registerDynamic('8', ['17'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var defined = $__require('17');
  module.exports = function (it) {
    return Object(defined(it));
  };
  return module.exports;
});
$__System.registerDynamic('18', ['19', '8', '1a', '1b'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var $ = $__require('19'),
      toObject = $__require('8'),
      IObject = $__require('1a');
  module.exports = $__require('1b')(function () {
    var a = Object.assign,
        A = {},
        B = {},
        S = Symbol(),
        K = 'abcdefghijklmnopqrst';
    A[S] = 7;
    K.split('').forEach(function (k) {
      B[k] = k;
    });
    return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
  }) ? function assign(target, source) {
    var T = toObject(target),
        $$ = arguments,
        $$len = $$.length,
        index = 1,
        getKeys = $.getKeys,
        getSymbols = $.getSymbols,
        isEnum = $.isEnum;
    while ($$len > index) {
      var S = IObject($$[index++]),
          keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S),
          length = keys.length,
          j = 0,
          key;
      while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
    }
    return T;
  } : Object.assign;
  return module.exports;
});
$__System.registerDynamic('1c', ['1d', '18'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var $export = $__require('1d');
  $export($export.S + $export.F, 'Object', { assign: $__require('18') });
  return module.exports;
});
$__System.registerDynamic('1e', ['1c', 'b'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  $__require('1c');
  module.exports = $__require('b').Object.assign;
  return module.exports;
});
$__System.registerDynamic("1f", ["1e"], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  module.exports = { "default": $__require("1e"), __esModule: true };
  return module.exports;
});
$__System.registerDynamic("e", ["1f"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var define,
      global = this || self,
      GLOBAL = global;
  var _Object$assign = $__require("1f")["default"];
  exports["default"] = _Object$assign || function (target) {
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
  exports.__esModule = true;
  return module.exports;
});
$__System.registerDynamic("16", ["20"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var define,
      global = this || self,
      GLOBAL = global;
  var _Object$defineProperty = $__require("20")["default"];
  exports["default"] = function (obj, key, value) {
    if (key in obj) {
      _Object$defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  };
  exports.__esModule = true;
  return module.exports;
});
$__System.register("21", ["5", "6", "13", "14", "15", "16", "e"], function (_export) {
  var _createClass, _classCallCheck, StateDb, _get, _inherits, _defineProperty, _extends, __hotReload, BarList;

  return {
    setters: [function (_4) {
      _createClass = _4["default"];
    }, function (_5) {
      _classCallCheck = _5["default"];
    }, function (_7) {
      StateDb = _7.StateDb;
    }, function (_2) {
      _get = _2["default"];
    }, function (_3) {
      _inherits = _3["default"];
    }, function (_6) {
      _defineProperty = _6["default"];
    }, function (_e) {
      _extends = _e["default"];
    }],
    execute: function () {
      "use strict";

      __hotReload = true;

      _export("__hotReload", __hotReload);

      BarList = (function (_StateDb) {
        _inherits(BarList, _StateDb);

        function BarList(state, db, div) {
          var _this = this;

          _classCallCheck(this, BarList);

          _get(Object.getPrototypeOf(BarList.prototype), "constructor", this).call(this, state, db);

          this.div = div.append("div").classed("entity", true);
          this.div.append("div").classed("title", true).text(this.key);
          this.items = this.div.append("div").classed("items", true);
          this.data = [];
          this.key = "subjects";

          this.div.on("click", function () {
            _this.state.push({ active: _this.key });
          });

          return this;
        }

        _createClass(BarList, [{
          key: "Key",
          value: function Key(_) {
            if (!arguments.length) return this.key;
            this.key = _;
            return this;
          }
        }, {
          key: "stateChange",
          value: function stateChange(next, last) {
            if (!next.visible.StreamSection) return;
            // console.log(next,last);
            if (next.brushStart !== last.brushStart || next.brushEnd !== last.brushEnd || next.active !== last.active || next.activeItem !== last.activeItem || next.filters !== last.filters || next.hover !== last.hover || next.loaded !== last.loaded) {
              this.render();
            }
          }
        }, {
          key: "render",
          value: function render() {
            var _this2 = this;

            var size = this.db[this.key].size();
            this.div.select(".title").text(this.key);
            this.div.classed("active", this.state.state.active === this.key);
            this.div.classed("hover", this.state.state.hover === this.key);
            this.div.on("mouseenter", function (d) {
              _this2.state.push({ event: "enter", active: _this2.key });
            });
            // console.time("filter");
            // console.log(this.key);
            var group = this.db[this.key].top(20);
            var max = d3.max(group, function (d) {
              return d.value;
            });
            // console.timeEnd("filter");

            // console.log(group);

            var s = this.items.selectAll(".item").data(group, function (d) {
              //console.log(d);
              return d.key;
            });
            var e = s.enter().append("div").attr("class", "item").on("mouseenter", function (d, i, e) {
              var tooltip = null;
              if (d.value / max < 0.15) {
                // const p = d3.select(e[i]).select(".bar").node().getBoundingClientRect();
                // const p2 = d3.select(".container").node().getBoundingClientRect();
                // tooltip =  { name: d.value, pos: [p.left-p2.left, p.top-p2.top] };
                // d3.select(e[i]).select(".bar")
                //   .text(d => `${ d.value }` )
                //   // .transition()
                //   .style("width", d=> "20%");
                // console.log(d.value, d3.select(e[i]).select(".bar"))
              }
              _this2.state.push({ event: "enter", active: _this2.key, hover: d.key });
            }).on("mouseleave", function () {
              _this2.state.push({ event: "leave", active: _this2.key, hover: null });
            }).on("click", function (d) {
              var active = _this2.state.state.filters[_this2.key] && _this2.state.state.filters[_this2.key] === d.key;
              // this is a good example why actions where invented:
              var filters = _extends({}, _this2.state.state.filters, _defineProperty({}, _this2.key, active ? null : d.key));
              _this2.state.push({ event: "click", active: _this2.key, filters: filters });

              // this.state.push({ event: "click", active: this.key, activeItem: activeItem ? null : d.key });
              // this.state.push({ event: "click", active: this.key, filter: [d.key] });
              // this.state.push({ filter: { [this.key] : d.key }});
            });

            e.append("div").classed("left", true).append("div").classed("bar", true)
            // .classed("hidden", d=> d.value/max < 0.2 )
            .text(function (d) {
              return d.value / max < 0.15 ? "" : "" + d.value;
            }).style("width", function (d) {
              return 0 * 100 + "%";
            }).on("mouseenter", function (d) {
              _this2.state.push({ event: "enter", active: _this2.key, hover: d.key });
            });

            e.append("div").classed("right", true).text(function (d) {
              return "" + d.key;
            });

            if (this.state.state.event == "brushend" || this.state.state.event == "click") {
              // console.log(s.data())
              this.items.selectAll(".item").sort(function (a, b) {
                return b.value - a.value;
              });
            }

            s.classed("hover", function (d) {
              return !_this2.state.state.filters[_this2.key] && _this2.state.state.active === _this2.key && _this2.state.state.hover === d.key;
            });
            s.classed("active", function (d) {
              return _this2.state.state.filters[_this2.key] && _this2.state.state.filters[_this2.key] === d.key;
            });

            s.merge(e).select(".bar").text(function (d) {
              return "" + d.value;
            })
            // .transition()
            .style("width", function (d) {
              if (d.value / max < 0.15 && _this2.state.state.hover === d.key && _this2.state.state.active === _this2.key) {
                return "18%";
              } else {
                return d.value / max * 100 + "%";
              }
            });

            s.select(".right").text(function (d) {
              return "" + d.key;
            });

            s.exit().remove();
            // this.container.text(data.length);

            return this;
          }
        }]);

        return BarList;
      })(StateDb);

      _export("BarList", BarList);
    }
  };
});
$__System.register('22', ['5', '6', '12', '14', '15', '21', '23'], function (_export) {
  var _createClass, _classCallCheck, StreamGraph, _get, _inherits, BarList, Section, __hotReload, StreamSection;

  return {
    setters: [function (_3) {
      _createClass = _3['default'];
    }, function (_4) {
      _classCallCheck = _4['default'];
    }, function (_6) {
      StreamGraph = _6.StreamGraph;
    }, function (_) {
      _get = _['default'];
    }, function (_2) {
      _inherits = _2['default'];
    }, function (_7) {
      BarList = _7.BarList;
    }, function (_5) {
      Section = _5.Section;
    }],
    execute: function () {
      'use strict';

      __hotReload = true;

      _export('__hotReload', __hotReload);

      StreamSection = (function (_Section) {
        _inherits(StreamSection, _Section);

        function StreamSection(state, db) {
          _classCallCheck(this, StreamSection);

          _get(Object.getPrototypeOf(StreamSection.prototype), 'constructor', this).call(this, state, db);

          // this.title.html("<strong>GEORG ECKERT INSTITUTE</strong> / Visualized Collection Prototype");

          this.divStream = this.div.append("div").attr("class", "stream");
          this.divEntities = this.div.append("div").attr("class", "entities");

          this.stream = new StreamGraph(state, db, this.divStream);
          this.stream.paddingTop = 350;
          this.stream.outerHeight = this.height - this.stream.paddingTop;
          this.stream.outerHeightInitial = this.stream.outerHeight;
          this.stream.init();

          this.listSubjects = new BarList(state, db, this.divEntities).Key("subjects");
          this.listSchoollevels = new BarList(state, db, this.divEntities).Key("schoollevels");
          this.listPublishers = new BarList(state, db, this.divEntities).Key("publishers");
          this.listPlaces = new BarList(state, db, this.divEntities).Key("places");
        }

        _createClass(StreamSection, [{
          key: 'stateChange',
          value: function stateChange(next, last) {

            if (next.scrollY !== last.scrollY) {
              var bb = this.div.node().getBoundingClientRect();
              // console.log(bb.bottom, bb.top, this.height , this.stream.outerHeight,  this.height + bb.top - this.stream.outerHeight -88);
              var bottom = bb.bottom - 88 - this.stream.outerHeightInitial;
              var height = this.stream.outerHeightInitial + bottom;

              // console.log(bottom, height);

              if (bottom < 0 && height > this.stream.outerHeightSmall) {
                this.stream.outerHeight = height;
                this.stream.big = false;
                this.stream.init().render();
              } else {
                if (bottom > 0 && this.stream.outerHeight != this.stream.outerHeightInitial) {
                  this.stream.big = true;
                  this.stream.outerHeight = this.stream.outerHeightInitial;
                  this.stream.init().render();
                }
                if (height < this.stream.outerHeightSmall && this.stream.outerHeight != this.stream.outerHeightSmall) {
                  this.stream.big = false;
                  this.stream.outerHeight = this.stream.outerHeightSmall;
                  this.stream.init().render();
                }
              }

              this.stream.div.classed("dropshadow", bottom < this.stream.paddingTop);
              // this.stream.div.style("position", bottom < this.stream.paddingTop ? 'fixed': 'relative');
            }
          }
        }, {
          key: 'render',
          value: function render() {}
        }]);

        return StreamSection;
      })(Section);

      _export('StreamSection', StreamSection);
    }
  };
});
$__System.register("24", ["5", "6", "14", "15", "23"], function (_export) {
  var _createClass, _classCallCheck, _get, _inherits, Section, __hotReload, DummySection;

  return {
    setters: [function (_3) {
      _createClass = _3["default"];
    }, function (_4) {
      _classCallCheck = _4["default"];
    }, function (_) {
      _get = _["default"];
    }, function (_2) {
      _inherits = _2["default"];
    }, function (_5) {
      Section = _5.Section;
    }],
    execute: function () {
      "use strict";

      __hotReload = true;

      _export("__hotReload", __hotReload);

      DummySection = (function (_Section) {
        _inherits(DummySection, _Section);

        function DummySection(state, db) {
          _classCallCheck(this, DummySection);

          _get(Object.getPrototypeOf(DummySection.prototype), "constructor", this).call(this, state, db);

          this.title.text("Dummy");
          this.divDummy = this.div.append("div").attr("class", "dummy");
        }

        _createClass(DummySection, [{
          key: "stateChange",
          value: function stateChange(next, pev) {
            if (!next.visible.DummySection) return;
            // console.log("dummy",next);

            if (next.loaded == !pev.loaded) {
              console.log("init dummy");
            }

            if (next.visible.DummySection != pev.visible.DummySection) {
              console.log("dummy visible", next.visible.DummySection);
            }
          }
        }, {
          key: "render",
          value: function render() {}
        }]);

        return DummySection;
      })(Section);

      _export("DummySection", DummySection);
    }
  };
});
$__System.register('25', ['5', '6', '13', '14', '15'], function (_export) {
  var _createClass, _classCallCheck, StateDb, _get, _inherits, __hotReload, Bookshelf;

  return {
    setters: [function (_3) {
      _createClass = _3['default'];
    }, function (_4) {
      _classCallCheck = _4['default'];
    }, function (_5) {
      StateDb = _5.StateDb;
    }, function (_) {
      _get = _['default'];
    }, function (_2) {
      _inherits = _2['default'];
    }],
    execute: function () {
      'use strict';

      __hotReload = true;

      _export('__hotReload', __hotReload);

      Bookshelf = (function (_StateDb) {
        _inherits(Bookshelf, _StateDb);

        function Bookshelf(state, db, div) {
          var _this = this;

          _classCallCheck(this, Bookshelf);

          _get(Object.getPrototypeOf(Bookshelf.prototype), 'constructor', this).call(this, state, db);

          // this.openClass = 'open fadeInRightBig'
          // this.closeClass = 'closed fadeOutRightBig'

          // this.div = div.classed('animated ' + this.openClass, true)
          this.div = div.classed('open', false).on("mouseenter", function () {
            _this.state.push({ bookshelf: true });
          }).on("mouseleave", function () {
            _this.state.push({ bookshelf: false });
          });
          this.container = this.div.append("div").classed('bookshelf', true);
          // this.opener = this.div.append("div").classed('opener', true).on("mouseenter", this.open.bind(this) );
          // this.closeButton = this.div.append("a").classed("closeButton", true).text('Close')
          // this.closeButton.on("click", this.close.bind(this) )

          return this;
        }

        _createClass(Bookshelf, [{
          key: 'stateChange',
          value: function stateChange(next, last) {
            if (next.loaded !== last.loaded) {
              //this.state.push({ bookshelf: true });
            }
            if (next.bookshelf !== last.bookshelf) {
              if (next.bookshelf) {
                this.open();
              } else {
                this.close();
              }
            }
          }
        }, {
          key: 'open',
          value: function open() {
            this.div.classed("open", true);
            this.render();
          }
        }, {
          key: 'close',
          value: function close() {
            this.div.classed("open", false);
          }
        }, {
          key: 'render',
          value: function render() {
            // const data = customData==undefined ? this.db.date.top(150).filter(d => d.title != "") : customData;
            var data = this.db.bookshelf();
            var s = this.container.selectAll(".book").data(data, function (d) {
              return d.id;
            });

            s.enter().append("a").attr("class", "book").attr("href", function (d) {
              return d.url;
            }).attr("target", "_blank").html(function (d) {
              return d.title.replace('@', '') + ' <i>' + d.publisher + ' ' + d.year + '</i> ';
            });

            s.attr("href", function (d) {
              return d.url;
            }).html(function (d) {
              return d.title + ' <i>' + d.publisher + ' ' + d.year + '</i> ';
            });
            s.exit().remove();
            return this;
          }
        }]);

        return Bookshelf;
      })(StateDb);

      _export('Bookshelf', Bookshelf);
    }
  };
});
$__System.register('26', ['5', '6', '14', '15', '23', '25'], function (_export) {
  var _createClass, _classCallCheck, _get, _inherits, Section, Bookshelf, __hotReload, BookshelfSection;

  return {
    setters: [function (_3) {
      _createClass = _3['default'];
    }, function (_4) {
      _classCallCheck = _4['default'];
    }, function (_) {
      _get = _['default'];
    }, function (_2) {
      _inherits = _2['default'];
    }, function (_5) {
      Section = _5.Section;
    }, function (_6) {
      Bookshelf = _6.Bookshelf;
    }],
    execute: function () {
      'use strict';

      __hotReload = true;

      _export('__hotReload', __hotReload);

      BookshelfSection = (function (_Section) {
        _inherits(BookshelfSection, _Section);

        function BookshelfSection(state, db) {
          _classCallCheck(this, BookshelfSection);

          _get(Object.getPrototypeOf(BookshelfSection.prototype), 'constructor', this).call(this, state, db);

          this.title.text("Books");

          var bookshelf = new Bookshelf(state, db, this.div);
        }

        _createClass(BookshelfSection, [{
          key: 'stateChange',
          value: function stateChange(next, pev) {}
        }, {
          key: 'render',
          value: function render() {}
        }]);

        return BookshelfSection;
      })(Section);

      _export('BookshelfSection', BookshelfSection);
    }
  };
});
$__System.register("27", ["5", "6", "13", "14", "15"], function (_export) {
  var _createClass, _classCallCheck, StateDb, _get, _inherits, __hotReload, Geomap;

  return {
    setters: [function (_3) {
      _createClass = _3["default"];
    }, function (_4) {
      _classCallCheck = _4["default"];
    }, function (_5) {
      StateDb = _5.StateDb;
    }, function (_) {
      _get = _["default"];
    }, function (_2) {
      _inherits = _2["default"];
    }],
    execute: function () {
      // import topojson from 'topojson';

      "use strict";

      __hotReload = true;

      _export("__hotReload", __hotReload);

      Geomap = (function (_StateDb) {
        _inherits(Geomap, _StateDb);

        function Geomap(state, db, div) {
          _classCallCheck(this, Geomap);

          _get(Object.getPrototypeOf(Geomap.prototype), "constructor", this).call(this, state, db);

          this.div = div;
          this.outerWidth = 1200;
          this.outerHeight = window.innerHeight - 200;

          console.log(this.outerHeight);
          this.margin = { top: 0, right: 0, bottom: 0, left: 0 };

          this.projection = d3.geoMercator();

          this.path = d3.geoPath().projection(this.projection);

          div.selectAll("*").remove(); // temp fix

          this.svg = d3.select(div.node()).append("svg");
          this.g = this.svg.append("g");
          this.land = this.g.append("path").attr("class", "land");
          this.rivers = this.g.append("path").attr("class", "river");

          this.scale = d3v3.scale.linear().range([1, 20]);
          this.opacity = d3.scaleLog().range([0.2, 1]);
          this.fontscale = d3v3.scale.linear().range([10, 15]);

          this.geoFit = {
            "type": "FeatureCollection",
            "features": [{
              "type": "Feature",
              "geometry": {
                "type": "Polygon",
                "coordinates": [[[5.7952880859375, 54.16243396806779], [20.9124755859375, 55.07836723201514], [19.8577880859375, 47.27922900257082], [5.2679443359375, 46.92025531537451], [5.7952880859375, 54.16243396806779]]]
              },
              "properties": {}
            }]
          };

          console.log(this.geoFit);

          return this;
        }

        _createClass(Geomap, [{
          key: "init",
          value: function init() {
            this.width = this.outerWidth - this.margin.left - this.margin.right, this.height = this.outerHeight - this.margin.top - this.margin.bottom;

            this.projection
            // .center([15, 49])
            // .scale(3500)
            // .translate([this.outerWidth / 2, this.outerHeight / 2])
            .clipExtent([[0, 0], [this.outerWidth, this.outerHeight]]).fitSize([this.outerWidth, this.outerHeight], this.geoFit);

            this.svg.attr("width", this.outerWidth).attr("height", this.outerHeight);

            console.log(this.outerHeight);

            this.g.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

            return this;
          }
        }, {
          key: "stateChange",
          value: function stateChange(next, last) {
            if (next.loaded !== last.loaded) {
              this.rivers.datum(topojson.mesh(this.db.store.rivers)).attr("d", this.path);
              this.land.datum(this.db.store.land).attr("d", this.path);
            }

            if (!next.visible.GeomapSection) return;
            // console.log(next)

            if (next.brushStart !== last.brushStart || next.brushEnd !== last.brushEnd || next.active !== last.active || next.activeItem !== last.activeItem || next.hover !== last.hover || next.loaded !== last.loaded || next.visible.GeomapSection !== last.visible.GeomapSection) {
              this.render();
            }
          }
        }, {
          key: "render",
          value: function render() {
            var _this = this;

            // console.log("RENDER");
            //console.log(this.db.store)

            // this.rivers.datum(this.db.store.otherriver).attr("d", this.path);

            var places = this.db["places"].top(100);
            var max = d3v3.max(places, function (d) {
              return d.value;
            });

            this.opacity.domain([0.1, max]);
            this.scale.domain([0.1, max]).clamp(true);
            this.fontscale.domain(d3v3.extent(places, function (d) {
              return d.value;
            })).clamp(true);

            // console.log(d3v3.max(places, d=>d.value))

            places.forEach(function (d) {
              var geo = _this.db.geocode.find(function (g) {
                return g.name === d.key;
              });
              d.lat = geo ? geo.lat : 0;
              d.lon = geo ? geo.lon : 0;
            });

            var s = this.g.selectAll("g").data(places, function (d) {
              return d.key;
            });

            var e = s.enter().append("g").on("mouseenter", function (d, i, l) {
              d3.select(l[i]).each(function () {
                this.parentNode.appendChild(this);
              }).style("opacity", 1).select("text").text(function (d2) {
                return d.key + " (" + d.value + ")";
              });
            }).on("mouseleave", function (d, i, l) {
              d3.select(l[i]).style("opacity", function (d) {
                return _this.opacity(d.value);
              }).select("text").text(function (d2) {
                return "" + d.key;
              });
            }).on("click", function (d) {
              _this.db.place.filterExact(d.key);
              _this.state.push({ bookshelf: false });
              _this.state.push({ bookshelf: true });
              _this.db.place.filterExact(null);
            });

            e.append("circle").attr("fill", function (d) {
              return "#3C7C9B";
            }).attr("r", function (d) {
              return _this.scale(d.value);
            }).style("opacity", function (d) {
              return d.value ? 1 : 0;
            });

            e.append("text").attr("dx", function (d) {
              return _this.scale(d.value) + 2 + "px";
            }).attr("dy", function (d) {
              return _this.scale(d.value) + 2 + "px";
            }).text(function (d) {
              return d.key;
            }).style("font-size", function (d) {
              return _this.fontscale(d.value) + "px";
            });

            e.merge(s).attr("transform", function (d) {
              var p = _this.projection([d.lon, d.lat]);
              return "translate(" + p[0] + "," + p[1] + ")";
            }).style("opacity", function (d) {
              return _this.opacity(d.value);
            }).style("display", function (d) {
              return d.value ? "" : "none";
            });

            s.select("text").attr("dx", function (d) {
              return _this.scale(d.value) + 2 + "px";
            }).attr("dy", function (d) {
              return _this.scale(d.value) + 2 + "px";
            }).style("font-size", function (d) {
              return _this.fontscale(d.value) + "px";
            });

            s.select("circle").attr("fill", function (d) {
              return "#3C7C9B";
            }).attr("r", function (d) {
              return _this.scale(d.value);
            });

            // slow...
            // e.merge(s).select("text")
            //   .attr("dx", d=>(this.scale(d.value)+2)+"px")
            //   .attr("dy", d=>(this.scale(d.value)+2)+"px")
            //   .style("opacity", d=>((d.value/max)*4))
            //   .style("font-size", d=>(this.fontscale(d.value)+"px"))

            // e.merge(s).select("circle")
            //   .attr("fill", d=> "#3C7C9B")
            //   .attr("r", d => this.scale(d.value))
            //   .style("opacity", d=>d.value ? 1: 0)

            s.exit().remove();
          }
        }]);

        return Geomap;
      })(StateDb);

      _export("Geomap", Geomap);
    }
  };
});
$__System.register('28', ['5', '6', '14', '15', '23', '27'], function (_export) {
  var _createClass, _classCallCheck, _get, _inherits, Section, Geomap, __hotReload, GeomapSection;

  return {
    setters: [function (_3) {
      _createClass = _3['default'];
    }, function (_4) {
      _classCallCheck = _4['default'];
    }, function (_) {
      _get = _['default'];
    }, function (_2) {
      _inherits = _2['default'];
    }, function (_5) {
      Section = _5.Section;
    }, function (_6) {
      Geomap = _6.Geomap;
    }],
    execute: function () {
      'use strict';

      __hotReload = true;

      _export('__hotReload', __hotReload);

      GeomapSection = (function (_Section) {
        _inherits(GeomapSection, _Section);

        function GeomapSection(state, db) {
          _classCallCheck(this, GeomapSection);

          _get(Object.getPrototypeOf(GeomapSection.prototype), 'constructor', this).call(this, state, db);

          this.title.text('Places');
          this.div.append("div").attr("class", "intro").text('\n        Each book got a publisher and a place where it originated. In this visualization the geographical distribution\n        of the selection in time is shown as a bubble map. Each bubble represents the amout of books beeing \n        published at the geographical location. The big timestream above is now compressed into a small timeslider\n        which will work from now on as a tool to customize each visualization. By dragging on the timeline you can\n        select a specific timespan to be visualized underneath. Doubleclick on the selection to clear the start and \n        end time. \n      ');
          this.geomap = new Geomap(state, db, this.div.append("div"));
          //this.geomap.outerHeight = this.height;
          this.geomap.init();
        }

        _createClass(GeomapSection, [{
          key: 'stateChange',
          value: function stateChange(next, pev) {
            //	console.log(next.visible.GeomapSection);

            if (next.visible.GeomapSection != pev.visible.GeomapSection) {
              // console.log("GeomapSection", next.visible.GeomapSection);
            }
          }
        }, {
          key: 'render',
          value: function render() {}
        }]);

        return GeomapSection;
      })(Section);

      _export('GeomapSection', GeomapSection);
    }
  };
});
$__System.register("29", ["5", "6"], function (_export) {
  var _createClass, _classCallCheck, Tooltip;

  function __hotReload() {
    return true;
  }

  return {
    setters: [function (_) {
      _createClass = _["default"];
    }, function (_2) {
      _classCallCheck = _2["default"];
    }],
    execute: function () {
      "use strict";

      _export("__hotReload", __hotReload);

      Tooltip = (function () {
        function Tooltip(state) {
          _classCallCheck(this, Tooltip);

          this.name = this.constructor.name;
          this.state = state;
          this.state.subscribe(this);

          this.containerParent = d3.select(".container");
          this.containerParent.select(".ctooltip").remove();
          this.container = this.containerParent.append("div").attr("class", "ctooltip").style("visibility", "hidden");
          this.text = this.container.append("div").attr("class", "arrow_box");
        }

        _createClass(Tooltip, [{
          key: "stateChange",
          value: function stateChange(next, last) {
            // console.log(this.name, last.tooltip, next.tooltip);

            if (next.tooltip !== last.tooltip) {
              //console.log("tooltip", next.tooltip)

              if (next.tooltip !== null) {
                // const pos = d3.mouse(this.containerParent.node());
                var pos = next.tooltip.pos;
                this.container.style("transform", "translate(" + pos[0] + "px," + pos[1] + "px)").style("visibility", "visible");
                this.text.text(next.tooltip.name);
              } else {
                this.container.style("visibility", "hidden");
              }
            }
          }
        }]);

        return Tooltip;
      })();

      _export("Tooltip", Tooltip);
    }
  };
});
$__System.register("2a", [], function (_export) {
	"use strict";

	var classificationTags;
	return {
		setters: [],
		execute: function () {
			classificationTags = {
				"subject": {
					"u010": ["Muttersprachlicher  Unterricht", "Deutschland"],
					"u011": ["Erstleseunterricht"],
					"u020": ["Deutschunterricht"],
					"u030": ["Geographieunterricht", "Erdkundeunterricht", "Landeskunde", "Regionalkunde", "Heimatkundeunterricht", "Geografieunterricht"],
					"u031": ["Geographieunterricht", "Atlas"],
					"u050": ["Geschichtsunterricht"],
					"u051": ["Geschichtsunterricht", "Atlas"],
					"u060": ["Realien"],
					"u070": ["Sozialkundeunterricht", "Gemeinschaftskunde", "Sozialkunde <Unterricht>", "Soziallehreunterricht", "Sozialunterricht", "Sozialwissenschaften / Unterricht", "Sozialwissenschaftlicher Unterricht", "Gesellschaftslehreunterricht", "Gesellschaftskunde", "Politischer Unterricht", "Gegenwartskunde", "Politikunterricht", "Staatsbürgerkunde", "Staatskunde <Unterrichtsfach>", "Politische Bildung", "Politische Erziehung/ Pädagogik", "Politik, Gesellschaft, Wirtschaft", "Rechtskundeunterricht", "Recht / Politischer Unterricht", "Rechtsunterricht", "Wirtschaftslehre", "Wirtschafts- und Rechtslehre", "Wirtschaft und Recht <Unterrichtsfach>", "Wirtschafts- und Rechtskundeunterricht"],
					"u080": ["u080"],
					"u081": ["u081"],
					"u075": ["Sachunterricht"],
					"u075x": ["Sachunterricht", "Sachkundeunterricht", "Heimatkundeunterricht"],
					"u09x": ["Werterziehung", "Lebensgestaltung – Ethik – Religionskunde", "Humanistische Lebenskunde", "Natur-Mensch-Mitwelt"],
					"u091": ["Ethikunterricht"],
					"u092": ["Philosophieunterricht", "Praktische Philosophie"],
					"u093": ["Religionsunterricht", "Evangelischer Religionsunterricht", "Christenlehre", "Islamischer Religionsunterricht", "Jüdischer Religionsunterricht", "Israelitischer Religionsunterricht", "Bibelunterricht", "Katholischer Religionsunterricht", "Orthodoxer Religionsunterricht", "Russisch-orthodoxer Religionsunterricht", "Russisch-orthodoxe Kirche", "Syrisch-Orthodoxer Religionsunterricht", "Jakobitische Kirche", "Interreligiöses Lernen", "Interkulturelle Erziehung"]
				},
				"schooltype": {
					"s00": ["Grundschule"],
					"s01": ["Orientierungsstufe", "Förderstufe"],
					"s02": ["Hauptschule", "Volksschule", "Einklassige Schule", "Zweiklassige Schule", "Halbtagsschule", "Landschule"],
					"s03": ["Mittelschule", "Realschule", "Regionale Schule"],
					"s04": ["Realschule", "Mittlere-Reife-Zug"],
					"s05": ["Gymnasium", "Oberstufe", "Achtjähriges Gymnasium", "Höhere Schule", "Fachgymnasium", "Berufliches Gymnasium", "Abendgymnasium", "Kolleg"],
					"s06": ["Gesamtschule", "Integrierte Gesamtschule", "Kooperative Gesamtschule"],
					"s07": ["Berufsbildende Schule", "Berufsbildende Höhere Schule", "Berufsbildende Mittlere Schule", "Berufsfachschule", "Berufsgrundbildungsjahr", "Berufliches Gymnasium", "Berufskolleg", "Berufsoberschule", "Berufsschule", "Fachoberschule", "Fortbildungsschule", "Gewerbeschule", "Gewerbliche Berufsfachschule", "Gewerbliche Fortbildungsschule", "Heeres-Unteroffiziervorschule", "Handelsakademie (HAK)", "Handelsschule (HAS)", "Höhere Berufsfachschule", "Höhere Handelsschule", "Höhere Lehranstalt für wirtschaftliche Berufe (HLW)", "Höhere Lehranstalt für Tourismus (HLT)", "Höhere technische Lehranstalt (HTL)", "Kaufmännische Fortbildungsschule", "Marineschule", "Militärschule", "Technikerschule (Technikum)", "Technisches Gymnasium", "Wirtschaftsgymnasium"],
					"s09": ["Sonderschule", "Lernbehindertenschule", "Förderschule"],
					"s10": ["Lehrerbildungsanstalt", "Lehrerseminar", "Lehrerinnenseminar", "Deutsche Auslandsschule", "Polytechnische Oberschule", "Schule der Freundschaft"]
				},
				"schoollevel": {
					"k01": ["Grundschule", "Elementarbereich", "Eingangsstufe"],
					"k02": ["Sekundarstufe 1", "Polytechnische Oberschule", "POS –, Allgemeinbildende zehnjährige polytechnische Oberschule der DDR", "Polytechnische Oberschule", "Unterstufe", "Allgemein bildende höhere Schule", "(AHS) in Österreich", "Neue Mittelschule", "(NMS) in Österreich"],
					"k03": ["Sekundarstufe 2", "Reifeprüfung", "Mündliche Reifeprüfung", "Schriftliche Reifeprüfung", "Erweiterte Oberschule", "EOS", "Abiturstufe", "High School", "College"],
					"k04": ["k04"],
					"k05": ["Berufliche Bildungsgänge", "Berufsbildende Schule", "Berufsbildende Höhere Schule", "Berufsbildende Mittlere Schule", "Berufsfachschule", "Berufsgrundbildungsjahr", "Berufliches Gymnasium", "Berufskolleg", "Berufsoberschule", "Berufsschule", "Fachoberschule", "Fortbildungsschule", "Gewerbeschule", "Gewerbliche Berufsfachschule", "Gewerbliche Fortbildungsschule", "Heeres-Unteroffiziervorschule", "Handelsakademie (HAK)", "Handelsschule (HAS)", "Höhere Berufsfachschule", "Höhere Handelsschule", "Höhere Lehranstalt für wirtschaftliche Berufe (HLW)", "Höhere Lehranstalt für Tourismus (HLT)", "Höhere technische Lehranstalt (HTL)", "Kaufmännische Fortbildungsschule", "Marineschule", "Militärschule", "Technikerschule (Technikum)", "Technisches Gymnasium", "Wirtschaftsgymnasium"],
					"k06": ["Tertiärbereich", "Hochschulbildung", "College", "Erwachsenenbildung", "Selbststudium", "Selbstunterricht"],
					"k07": ["k07"],
					"k08": ["k08"],
					"k09": ["k09"]
				}
			};

			_export("classificationTags", classificationTags);
		}
	};
});
$__System.registerDynamic('2b', ['1d'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var $export = $__require('1d');
  $export($export.S, 'Number', { parseFloat: parseFloat });
  return module.exports;
});
$__System.registerDynamic('2c', ['2b'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  $__require('2b');
  module.exports = parseFloat;
  return module.exports;
});
$__System.registerDynamic("2d", ["2c"], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  module.exports = { "default": $__require("2c"), __esModule: true };
  return module.exports;
});
$__System.register("2e", ["5", "6", "2d", "2f"], function (_export) {
  var _createClass, _classCallCheck, _Number$parseFloat, GeiVisUtils, __hotReload, CirclePackedNetwork;

  return {
    setters: [function (_) {
      _createClass = _["default"];
    }, function (_2) {
      _classCallCheck = _2["default"];
    }, function (_d) {
      _Number$parseFloat = _d["default"];
    }, function (_f) {
      GeiVisUtils = _f;
    }],
    execute: function () {
      "use strict";

      __hotReload = true;

      _export("__hotReload", __hotReload);

      CirclePackedNetwork = (function () {
        function CirclePackedNetwork(properties) {
          _classCallCheck(this, CirclePackedNetwork);

          this.povNode = null;
          this.properties = properties;
          this.blacklist = [];
          this.years = [0, 0];
          this.monad = "";
          this.state = {};
          this.db = {};
          this.openBookshelfButton = {};
          return this;
        }

        _createClass(CirclePackedNetwork, [{
          key: "setState",
          value: function setState(state) {
            this.state = state;
          }
        }, {
          key: "setDB",
          value: function setDB(db) {
            this.db = db;
          }
        }, {
          key: "setOccurrenceScale",
          value: function setOccurrenceScale(scale) {
            this.occurrenceScale = scale;
            return this;
          }
        }, {
          key: "append",
          value: function append(selector) {
            var _this = this;

            this.containerName = selector.attr("id");
            this.parentContainer = selector;

            this.width = parseInt(this.parentContainer.style("width")) - this.properties.margin.left - this.properties.margin.right;
            this.height = window.innerHeight - 200 - this.properties.margin.top - this.properties.margin.bottom;

            this.outerWidth = this.width + this.properties.margin.left + this.properties.margin.right;
            this.outerHeight = this.height + this.properties.margin.top + this.properties.margin.bottom;

            this.container = selector.append("div").attr("id", this.containerName + "-visualization").style("width", this.width + "px").style("height", this.height + "px").style("position", "relative");
            //.style("transform",  d => `translate(${this.properties.margin.left}px,${this.properties.margin.top}px)`);

            this.openBookshelfButton = this.container.append('a').classed('openBookshelf', true).classed('hidden', true).html('show tagged books').on('click', function () {
              _this.state.push({ bookshelf: false });
              _this.db.bookshelfData = _this.bookshelfData;
              _this.state.push({ bookshelf: true });
            });

            this.pack = d3.pack().size([this.width, this.height]).padding(20);

            return this;
          }
        }, {
          key: "makeArrayUnique",
          value: function makeArrayUnique(a) {
            return a.reduce(function (p, c) {
              if (p.indexOf(c) < 0) p.push(c);
              return p;
            }, []);
          }
        }, {
          key: "updateData",
          value: function updateData(data) {
            var _this2 = this;

            this.data = data;

            this.data.forEach(function (d) {
              if (d[_this2.nodeAccessor] != undefined) {
                d[_this2.nodeAccessor] = _this2.makeArrayUnique(d[_this2.nodeAccessor]);
              }
            });

            this.generateLinksAndNodes();

            this.maxOccurrence = d3.max(this.transformedData.nodes, function (n) {
              return n.data.occurrence;
            });
            this.minOccurrence = d3.min(this.transformedData.nodes, function (n) {
              return n.data.occurrence;
            });

            // fix graph links to map to objects instead of indices
            this.transformedData.links.forEach(function (d, i) {
              d.source = isNaN(d.source) ? d.source : _this2.transformedData.nodes[d.source];
              d.target = isNaN(d.target) ? d.target : _this2.transformedData.nodes[d.target];
            });

            this.root = d3.hierarchy({
              children: this.transformedData.nodes.sort(function (a, b) {
                return b.data.occurrence - a.data.occurrence;
              })
            }).sum(function (d, i) {
              return d.data != undefined ? d.data.occurrence : 0;
            });

            this.pack(this.root);

            return this;
          }

          // every string in this array will be compared against the tags to add. if there is a match it will not be added
        }, {
          key: "setBlacklist",
          value: function setBlacklist(blacklist) {
            this.blacklist = blacklist.map(function (t) {
              return t.trim().toLowerCase();
            });
            return this;
          }

          // this defines the accessor string to the node-array
        }, {
          key: "setNodeAccessor",
          value: function setNodeAccessor(nodeAccessor) {
            this.nodeAccessor = nodeAccessor;return this;
          }

          // this function extracts a network from if given a array with
        }, {
          key: "generateLinksAndNodes",
          value: function generateLinksAndNodes() {
            var _this3 = this;

            var dataToAnalyze = this.data;
            //if (newData != undefined) { dataToAnalyze = newData; }
            //else { dataToAnalyze = this.data; }

            // extract ALL tags (with duplicates)
            var allTags = [];
            // push all tags of every entry into the global array
            dataToAnalyze.forEach(function (e) {
              if (e[_this3.nodeAccessor] != undefined) {
                allTags.push(e[_this3.nodeAccessor].map(function (t) {
                  return t.trim().toLowerCase();
                }).filter(function (f) {
                  return _this3.blacklist.indexOf(f) == -1;
                }));
              }
            });

            // reduce the duplicates
            var nodeSet = d3.set(d3.merge(allTags));
            var nodes = nodeSet.values();
            var nodeList = d3.map();
            nodes.forEach(function (e) {
              nodeList.set(e, { occurrence: 0, entryID: [] });
            });

            var linkList = d3.map();

            // extract all links
            dataToAnalyze.forEach(function (e, entryIndex) {

              var summary = d3.permute(e, ["subject", "schoollevel", "schooltype"]);

              // this array prevent duplicate links

              // if the entry has tags
              if (e[_this3.nodeAccessor] != undefined) {
                (function () {

                  var parsedLinks = [];
                  var addedTags = [];

                  var tags = e[_this3.nodeAccessor].map(function (t) {
                    return t.trim().toLowerCase();
                  }); // clean the tags again

                  //create a link for n-to-n connection
                  tags.filter(function (f) {
                    return _this3.blacklist.indexOf(f) == -1;
                  }).forEach(function (tagA) {
                    tags.filter(function (f) {
                      return _this3.blacklist.indexOf(f) == -1;
                    }).forEach(function (tagB) {
                      if (tagA != tagB) {

                        // get index to prevent duplications by
                        var indexA = nodes.indexOf(tagA);
                        var indexB = nodes.indexOf(tagB);

                        // sorting the indices and  construct a unique link ID with them
                        var linkIDs = [indexA, indexB].sort(function (a, b) {
                          return a - b;
                        });
                        var link = linkIDs[0] + "-" + linkIDs[1];

                        if (parsedLinks.indexOf(link) == -1) {

                          // increment the value of the connection
                          if (linkList.has(link)) {
                            linkList.set(link, linkList.get(link) + 1);
                          }
                          // create the link
                          else {
                              linkList.set(link, 1);
                            }

                          if (addedTags.indexOf(tagA) == -1) {
                            var tagReference = nodeList.get(tagA);
                            tagReference.occurrence++;
                            tagReference.entryID.push(entryIndex);
                            addedTags.push(tagA);
                          }
                          if (addedTags.indexOf(tagB) == -1) {
                            var tagReference = nodeList.get(tagB);
                            tagReference.occurrence++;
                            tagReference.entryID.push(entryIndex);
                            addedTags.push(tagB);

                            // nodeList.set(tagB, nodeList.get(tagB)+1);
                            // addedTags.push(tagB);
                          }

                          parsedLinks.push(link);
                        }
                      }
                    });
                  });
                })();
              }
            });

            var r = linkList.keys().map(function (l) {
              var s = l.split("-");
              return {
                'source': _Number$parseFloat(s[0]),
                'target': _Number$parseFloat(s[1]),
                'strength': linkList.get(l)
              };
            });

            var result = { 'nodes': nodes.map(function (n) {
                return { 'name': n, 'data': nodeList.get(n) };
              }), 'links': r };
            this.transformedData = result;
            return this;
          }

          // renders the whole scene
        }, {
          key: "render",
          value: function render(keyframe) {
            this.renderNodes(keyframe);
            return this;
          }
        }, {
          key: "setNodeDimensions",
          value: function setNodeDimensions(selection) {
            selection.style("width", function (d) {
              return d.r * 2 + 'px';
            }).style("height", function (d) {
              return d.r * 2 + 'px';
            }).style("border-radius", function (d) {
              return d.r + 'px';
            });
          }
        }, {
          key: "setOverflowClass",
          value: function setOverflowClass(selection) {

            // if (el.node().offsetWidth < 40)
            //     el.classed("overflow", true).classed("partial", true)

            // if (el.node().offsetWidth < 11)
            //     el.classed("overflow", true).classed("partial", false)

            selection.classed('overflow', function (d) {
              return d.r * 2 < 66;
            }).classed('partial', function (d) {
              return d.r * 2 > 11 && d.r * 2 < 66;
            });
          }
        }, {
          key: "setInitalNodePosition",
          value: function setInitalNodePosition(selection, el) {
            selection.style("transform", "translate3d(600px," + window.innerHeight / 2 + "px,0px)scale(0,0)");
          }
        }, {
          key: "setNodePosition",
          value: function setNodePosition(selection) {
            selection.style("transform", function (d) {
              return "translate3d(" + (d.x - d.r) + "px," + (d.y - d.r) + "px,0px)scale(1,1)";
            });
          }
        }, {
          key: "setNodeID",
          value: function setNodeID(selection) {
            selection.attr("id", function (d) {
              return GeiVisUtils.makeSafeForCSS(d.data.name);
            });
          }
        }, {
          key: "switchToMonad",
          value: function switchToMonad(data, index, elements) {
            var _this4 = this;

            var monadRadius = (this.height - 200) / 2;

            var linkedBooks = this.data.filter(function (d, i) {
              return data.data.data.entryID.indexOf(i) != -1;
            });
            var booksBySubject = d3.nest().key(function (d) {
              return d.subject;
            }).entries(linkedBooks);

            var clickedElement = d3.select(elements[index]);
            var d = data.data;

            if (this.monad == d.name) {

              this.monad = "";
              this.render('brushmove');
              this.render('brushend');
              this.openBookshelfButton.classed('hidden', true);
            } else {
              (function () {

                var linkedIDs = data.data.data.entryID;
                var taggedBooks = _this4.data.reduce(function (p, c, i, a) {
                  if (linkedIDs.indexOf(i) != -1) {
                    p.push(c);return p;
                  } else {
                    return p;
                  }
                }, []);

                console.log(data.data.data.occurrence);

                // copy the data into the bookshelf && show the button
                _this4.bookshelfData = taggedBooks;
                _this4.openBookshelfButton.classed('hidden', false).html("show all <span>" + data.data.data.occurrence + "</span> books <br/>tagged with <span>'" + data.data.name + "'</span>");

                _this4.monad = d.name;
                var center = [_this4.width / 2 - 50, _this4.height / 2];

                // reset all nodes
                _this4.container.selectAll(".node").classed("hidden", true).classed("overflow", false).classed("partial", false).classed("monad", false).classed("left", false).classed("right", false).attr("data-balloon", null).attr("data-balloon-pos", null);

                // center this node
                clickedElement.classed("hidden", false).classed("monad", true).classed("monadic-related", false).style("width", null).style("height", null).style("opacity", 1).style("transform", function (d) {
                  return "translate3d(" + center[0] + "px," + center[1] + "px,0px)";
                });

                var linkedNodes = _this4.transformedData.links.filter(function (l) {
                  return l.source.name == d.name || l.target.name == d.name;
                }).map(function (l) {
                  if (l.source.name == d.name) {
                    return { "strength": l.strength, "node": l.target };
                  }
                  if (l.target.name == d.name) {
                    return { "strength": l.strength, "node": l.source };
                  }
                });

                var linkMax = d3.max(linkedNodes, function (l) {
                  return l.strength;
                });
                var linkMin = d3.min(linkedNodes, function (l) {
                  return l.strength;
                });

                var range = linkedNodes.length < 3 ? [Math.PI * 0.5, Math.PI * 2.5] : [0, Math.PI * 2];

                var indexToPolar = d3.scaleLinear().domain([0, linkedNodes.length]).range(range);
                var occurenceToProximity = d3.scaleLinear().domain([linkMax, linkMin]).range([200, monadRadius]);
                //let occurenceToAlpha = d3.scaleLinear().domain([linkMin, linkMax]).range([0.125, 1.0])

                var sizeAdjustment = monadRadius / linkedNodes.reduce(function (p, c, i, a) {
                  var value = occurenceToProximity(c.strength) / _this4.occurrenceScale.domain([linkMin, c.node.data.occurrence])(c.strength);
                  return value > p ? value : p;
                }, 0);

                console.log(sizeAdjustment);

                linkedNodes.forEach(function (l, i) {

                  if (l.node.name != _this4.monad) {
                    (function () {

                      var n = d3.select("#" + GeiVisUtils.makeSafeForCSS(l.node.name)).style("opacity", 1).style("transition-delay", function (d, i) {
                        return i * 0.2 + "s";
                      }).classed("hidden", false).classed("monadic-related", true).classed("overflow", false).classed("partial", false);

                      console.log(monadRadius);

                      var relationDivision = _this4.occurrenceScale.domain([linkMin, l.node.data.occurrence])(l.strength) * 2;
                      var proximity = Math.min(occurenceToProximity(l.strength) / relationDivision, monadRadius);

                      var xBase = Math.sin(indexToPolar(i)) * proximity;
                      var yBase = Math.cos(indexToPolar(i)) * proximity;

                      var pos = [center[0] + xBase, center[1] + yBase];

                      var width = n.select(".label").node().offsetWidth;
                      var height = n.select(".label").node().offsetHeight;

                      var value = undefined;

                      // decide on the rotation
                      if (indexToPolar(i) >= Math.PI && indexToPolar(i) <= Math.PI * 2) {
                        n.classed("right", true);value = 90;
                      }
                      if (indexToPolar(i) >= 0 && indexToPolar(i) <= Math.PI) {
                        n.classed("left", true);value = 270;
                      }

                      n.style("width", null).style("height", null).style("transform", function (d) {
                        return "translate3d(" + pos[0] + "px," + pos[1] + "px,0px)rotate(-" + (indexToPolar(i) * 180 / Math.PI + value) + "deg)";
                      });
                    })();
                  }
                });
              })();
            }
          }
        }, {
          key: "nodeHover",
          value: function nodeHover(data, index, elements) {
            var _this5 = this;

            var hoveredElement = d3.select(elements[index]);
            this.container.selectAll(".node").classed("inactive", true); // deactive all nodes
            hoveredElement.classed("inactive", false); // activate the hovered
            var d = data.data;
            // search for links from and to this node
            var links = this.transformedData.links.filter(function (l) {
              return l.source.name == d.name || l.target.name == d.name;
            }).map(function (l) {
              if (l.source.name == d.name) {
                return { "commonOccurrence": l.strength, "node": l.target };
              }
              if (l.target.name == d.name) {
                return { "commonOccurrence": l.strength, "node": l.source };
              }
            });

            // get the min and max values
            var linkMax = d3.max(links, function (l) {
              return l.commonOccurrence;
            });
            var linkMin = d3.min(links, function (l) {
              return l.commonOccurrence;
            });

            // // highlight the nodesg
            links.forEach(function (link) {
              var selectedNode = d3.select("#" + GeiVisUtils.makeSafeForCSS(link.node.name));
              selectedNode.classed("inactive", false).classed('related', true).style("opacity", _this5.occurrenceScale.domain([linkMin, linkMax]).range([0.25, 1.0])(link.commonOccurrence));
              selectedNode.select(".count").text(link.commonOccurrence);
            });

            // show tooltip if needed
            if (hoveredElement.classed('overflow')) {
              var noun = d.data.occurrence > 1 ? 'Bücher' : 'Buch';
              var tooltip = { name: d.name + " : " + d.data.occurrence + " " + noun, pos: [data.x, this.container.node().offsetTop + this.container.node().parentElement.offsetTop + data.y - data.r - 5] };
              this.state.push({ hover: d.name, tooltip: tooltip });
            }
          }
        }, {
          key: "nodeUnhover",
          value: function nodeUnhover(data, index, elements) {
            this.container.selectAll(".inactive").classed("inactive", false).style("opacity", null);
            this.container.selectAll(".related").classed("related", false).style("opacity", null);
            this.container.selectAll('.node').select(".count").text(function (d) {
              return d.data.data.occurrence;
            });
            this.state.push({ tooltip: null });
          }
        }, {
          key: "checkOverflow",
          value: function checkOverflow(data, elements) {

            var el = d3.select(this);
            //let overflow = GeiVisUtils.checkPartialOverflow(el.node(), 11)

            if (el.node().offsetWidth < 40) el.classed("overflow", true).classed("partial", true);

            if (el.node().offsetWidth < 11) el.classed("overflow", true).classed("partial", false);

            // switch (overflow) {
            //   case "overflow":
            //     el.classed("overflow", true).classed("partial", false)
            //   break
            //   case "partial-overflow":
            //     el.classed("overflow", true).classed("partial", true)
            //   break
            // }
          }

          // this function gets called to re-render the layout
        }, {
          key: "renderNodes",
          value: function renderNodes(keyframe) {
            var _this6 = this;

            var that = this;

            this.nodes = this.container.selectAll(".node").data(this.root.children, function (e) {
              return e.data.name;
            });

            this.openBookshelfButton.classed('hidden', true);

            var enteredNodes = undefined,
                exitedNodes = undefined;

            switch (keyframe) {

              case "brushend":

                // set the previous data once the user finished brushing
                this.previousData = d3.map(this.root.children, function (d) {
                  return d.data.name;
                });

                // turn transitions on!
                d3.select("#NetworkSection").classed("hasTransition", true);

                // enter
                enteredNodes = this.nodes.enter().append("div").attr("id", function (d) {
                  return GeiVisUtils.makeSafeForCSS(d.data.name);
                }).classed("node", true).call(this.setNodeDimensions).call(this.setInitalNodePosition).call(this.setOverflowClass).on("mouseover", this.nodeHover.bind(this)).on("mouseleave", this.nodeUnhover.bind(this)).on("click", this.switchToMonad.bind(this)).call(this.setNodePosition);

                // add the labels and numbers
                enteredNodes.append("span").classed("label", true).text(function (d) {
                  return d.data.name;
                });
                enteredNodes.append("span").classed("count", true).text(function (d) {
                  return d.data.data.occurrence;
                });

                // update
                this.nodes.classed("hidden", false).classed("monadic-related", false).classed("monad", false).call(this.setNodePosition).call(this.setNodeDimensions).call(this.setOverflowClass);

                this.nodes.select(".label").text(function (d) {
                  return d.data.name;
                });
                this.nodes.select(".count").text(function (d) {
                  return d.data.data.occurrence;
                });

                // remove the old ones
                exitedNodes = this.nodes.exit();
                exitedNodes.remove();

                break;

              case "brushmove":

                d3.select("#NetworkSection").classed("hasTransition", false);

                this.nodes.style("opacity", 1).classed("monadic-related", false) // clear monadic
                .classed("monad", false).classed("temporary-hidden", false).call(this.setNodeDimensions).call(this.setOverflowClass).style("transform", function (d) {
                  var previusValues = _this6.previousData.get(d.data.name);
                  var translate = "translate3d(" + (previusValues.x - d.r) + "px," + (previusValues.y - d.r) + "px,0px)";
                  return translate;
                });

                this.nodes.select(".label").text(function (d) {
                  return d.data.name;
                });
                this.nodes.select(".count").text(function (d) {
                  return d.data.data.occurrence;
                });

                // .call( (d) => {
                //   d.nodes().forEach( n => this.checkOverflow.bind(n)() )
                // })

                exitedNodes = this.nodes.exit();
                exitedNodes.style("opacity", 0);

                break;

            }

            return this;
          }
        }]);

        return CirclePackedNetwork;
      })();

      _export("CirclePackedNetwork", CirclePackedNetwork);
    }
  };
});
$__System.register('30', ['5', '6', '14', '15', '23', '2a', '2e'], function (_export) {
  var _createClass, _classCallCheck, _get, _inherits, Section, classificationTags, CirclePackedNetwork, __hotReload, NetworkSection;

  return {
    setters: [function (_3) {
      _createClass = _3['default'];
    }, function (_4) {
      _classCallCheck = _4['default'];
    }, function (_) {
      _get = _['default'];
    }, function (_2) {
      _inherits = _2['default'];
    }, function (_5) {
      Section = _5.Section;
    }, function (_a) {
      classificationTags = _a.classificationTags;
    }, function (_e) {
      CirclePackedNetwork = _e.CirclePackedNetwork;
    }],
    execute: function () {
      'use strict';

      __hotReload = true;

      _export('__hotReload', __hotReload);

      NetworkSection = (function (_Section) {
        _inherits(NetworkSection, _Section);

        function NetworkSection(state, db) {
          var _this = this;

          _classCallCheck(this, NetworkSection);

          _get(Object.getPrototypeOf(NetworkSection.prototype), 'constructor', this).call(this, state, db);

          // gabriel modules init
          // create a blacklist of tags to ignore because they are part of the classification
          this.blacklist = [];
          d3.values(classificationTags).forEach(function (e1) {
            d3.values(e1).forEach(function (e2) {
              e2.forEach(function (e3) {
                _this.blacklist.push(e3);
              });
            });
          });

          this.div.append("div").attr("class", "intro").text("This visualization shows the distribution of tags throughout the currently selected timeframe. The size of a circle represent the number of books with that tag. On hover you can see the other tags that were given in conjunction. The opacity of the other circles indicates how often they were given in conjunction. By clicking on a circle you can see it’s neighbourhood: Other related tags form a circle around the selected tag. Their relation is caluclated by the number of shared occurrences and by how much of their own occurrence is shared together with the selected tag. Clicking on the link shows the corresponding books for each tag. Clicking on the centered node or changing the timeframe leaves this view.");

          this.title.html('Tags');

          var oh = 0;
          oh += parseInt(this.title.style("padding-top"));
          oh += parseInt(this.title.style("padding-bottom"));
          oh += parseInt(this.title.style("height"));
          this.margin = { 'top': oh, 'right': 0, 'bottom': 0, 'left': 0 };

          this.network = new CirclePackedNetwork({ 'margin': this.margin }).setBlacklist(this.blacklist).setNodeAccessor("RSWKTag").setOccurrenceScale(d3.scaleLinear().domain([0, 1]).range([0.5, 1.0])).append(this.div);

          this.network.setState(state);
          this.network.setDB(db);
        }

        _createClass(NetworkSection, [{
          key: 'stateChange',
          value: function stateChange(next, last) {

            // init
            if (next.loaded != last.loaded) {
              this.network.updateData(this.db.date.top(Infinity));
              this.network.render("brushend");
            }

            if (!next.visible.NetworkSection) return;
            this.db.bookshelfData = this.db.date.top(Infinity);

            if (next.brushStart !== last.brushStart || next.brushEnd !== last.brushEnd || next.visible.NetworkSection !== last.visible.NetworkSection) {
              this.render(next, last);
            }
          }
        }, {
          key: 'render',
          value: function render(next, last) {

            // this simple hack enables brushstart,brushmove and brushend events
            var event = last.event != next.event && next.event == "brushmove" ? "brushstart" : next.event;

            var data = this.db.date.top(Infinity);
            if (data.length > 0) {
              this.network.updateData(data);
              this.network.render(event);
            }
          }
        }]);

        return NetworkSection;
      })(Section);

      _export('NetworkSection', NetworkSection);
    }
  };
});
$__System.registerDynamic("31", [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var toString = {}.toString;

  module.exports = function (it) {
    return toString.call(it).slice(8, -1);
  };
  return module.exports;
});
$__System.registerDynamic('1a', ['31'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var cof = $__require('31');
  module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
    return cof(it) == 'String' ? it.split('') : Object(it);
  };
  return module.exports;
});
$__System.registerDynamic("17", [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  // 7.2.1 RequireObjectCoercible(argument)
  module.exports = function (it) {
    if (it == undefined) throw TypeError("Can't call method on  " + it);
    return it;
  };
  return module.exports;
});
$__System.registerDynamic('32', ['1a', '17'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var IObject = $__require('1a'),
      defined = $__require('17');
  module.exports = function (it) {
    return IObject(defined(it));
  };
  return module.exports;
});
$__System.registerDynamic("1b", [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  module.exports = function (exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };
  return module.exports;
});
$__System.registerDynamic('9', ['1d', 'b', '1b'], true, function ($__require, exports, module) {
    var define,
        global = this || self,
        GLOBAL = global;
    /* */
    var $export = $__require('1d'),
        core = $__require('b'),
        fails = $__require('1b');
    module.exports = function (KEY, exec) {
        var fn = (core.Object || {})[KEY] || Object[KEY],
            exp = {};
        exp[KEY] = exec(fn);
        $export($export.S + $export.F * fails(function () {
            fn(1);
        }), 'Object', exp);
    };
    return module.exports;
});
$__System.registerDynamic('33', ['32', '9'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var toIObject = $__require('32');
  $__require('9')('getOwnPropertyDescriptor', function ($getOwnPropertyDescriptor) {
    return function getOwnPropertyDescriptor(it, key) {
      return $getOwnPropertyDescriptor(toIObject(it), key);
    };
  });
  return module.exports;
});
$__System.registerDynamic('34', ['19', '33'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var $ = $__require('19');
  $__require('33');
  module.exports = function getOwnPropertyDescriptor(it, key) {
    return $.getDesc(it, key);
  };
  return module.exports;
});
$__System.registerDynamic("35", ["34"], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  module.exports = { "default": $__require("34"), __esModule: true };
  return module.exports;
});
$__System.registerDynamic("14", ["35"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var define,
      global = this || self,
      GLOBAL = global;
  var _Object$getOwnPropertyDescriptor = $__require("35")["default"];
  exports["default"] = function get(_x, _x2, _x3) {
    var _again = true;
    _function: while (_again) {
      var object = _x,
          property = _x2,
          receiver = _x3;
      _again = false;
      if (object === null) object = Function.prototype;
      var desc = _Object$getOwnPropertyDescriptor(object, property);
      if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);
        if (parent === null) {
          return undefined;
        } else {
          _x = parent;
          _x2 = property;
          _x3 = receiver;
          _again = true;
          desc = parent = undefined;
          continue _function;
        }
      } else if ("value" in desc) {
        return desc.value;
      } else {
        var getter = desc.get;
        if (getter === undefined) {
          return undefined;
        }
        return getter.call(receiver);
      }
    }
  };
  exports.__esModule = true;
  return module.exports;
});
$__System.registerDynamic('36', ['19'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var $ = $__require('19');
  module.exports = function create(P, D) {
    return $.create(P, D);
  };
  return module.exports;
});
$__System.registerDynamic("37", ["36"], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  module.exports = { "default": $__require("36"), __esModule: true };
  return module.exports;
});
$__System.registerDynamic('38', [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

  return module.exports;
});
$__System.registerDynamic('1d', ['38', 'b', '39'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var global = $__require('38'),
      core = $__require('b'),
      ctx = $__require('39'),
      PROTOTYPE = 'prototype';
  var $export = function (type, name, source) {
    var IS_FORCED = type & $export.F,
        IS_GLOBAL = type & $export.G,
        IS_STATIC = type & $export.S,
        IS_PROTO = type & $export.P,
        IS_BIND = type & $export.B,
        IS_WRAP = type & $export.W,
        exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
        target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE],
        key,
        own,
        out;
    if (IS_GLOBAL) source = name;
    for (key in source) {
      own = !IS_FORCED && target && key in target;
      if (own && key in exports) continue;
      out = own ? target[key] : source[key];
      exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key] : IS_BIND && own ? ctx(out, global) : IS_WRAP && target[key] == out ? function (C) {
        var F = function (param) {
          return this instanceof C ? new C(param) : C(param);
        };
        F[PROTOTYPE] = C[PROTOTYPE];
        return F;
      }(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
      if (IS_PROTO) (exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
    }
  };
  $export.F = 1;
  $export.G = 2;
  $export.S = 4;
  $export.P = 8;
  $export.B = 16;
  $export.W = 32;
  module.exports = $export;
  return module.exports;
});
$__System.registerDynamic('3a', [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  module.exports = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };
  return module.exports;
});
$__System.registerDynamic('3b', ['3a'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var isObject = $__require('3a');
  module.exports = function (it) {
    if (!isObject(it)) throw TypeError(it + ' is not an object!');
    return it;
  };
  return module.exports;
});
$__System.registerDynamic('3c', [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  module.exports = function (it) {
    if (typeof it != 'function') throw TypeError(it + ' is not a function!');
    return it;
  };
  return module.exports;
});
$__System.registerDynamic('39', ['3c'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var aFunction = $__require('3c');
  module.exports = function (fn, that, length) {
    aFunction(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 1:
        return function (a) {
          return fn.call(that, a);
        };
      case 2:
        return function (a, b) {
          return fn.call(that, a, b);
        };
      case 3:
        return function (a, b, c) {
          return fn.call(that, a, b, c);
        };
    }
    return function () {
      return fn.apply(that, arguments);
    };
  };
  return module.exports;
});
$__System.registerDynamic('3d', ['19', '3a', '3b', '39'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var getDesc = $__require('19').getDesc,
      isObject = $__require('3a'),
      anObject = $__require('3b');
  var check = function (O, proto) {
    anObject(O);
    if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
  };
  module.exports = {
    set: Object.setPrototypeOf || ('__proto__' in {} ? function (test, buggy, set) {
      try {
        set = $__require('39')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) {
        buggy = true;
      }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
    check: check
  };
  return module.exports;
});
$__System.registerDynamic('3e', ['1d', '3d'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var $export = $__require('1d');
  $export($export.S, 'Object', { setPrototypeOf: $__require('3d').set });
  return module.exports;
});
$__System.registerDynamic('b', [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var core = module.exports = { version: '1.2.6' };
  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

  return module.exports;
});
$__System.registerDynamic('3f', ['3e', 'b'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  $__require('3e');
  module.exports = $__require('b').Object.setPrototypeOf;
  return module.exports;
});
$__System.registerDynamic("40", ["3f"], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  module.exports = { "default": $__require("3f"), __esModule: true };
  return module.exports;
});
$__System.registerDynamic("15", ["37", "40"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var define,
      global = this || self,
      GLOBAL = global;
  var _Object$create = $__require("37")["default"];
  var _Object$setPrototypeOf = $__require("40")["default"];
  exports["default"] = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      } });
    if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };
  exports.__esModule = true;
  return module.exports;
});
$__System.register("13", ["5", "6"], function (_export) {
	var _createClass, _classCallCheck, __hotReload, StateDb;

	return {
		setters: [function (_) {
			_createClass = _["default"];
		}, function (_2) {
			_classCallCheck = _2["default"];
		}],
		execute: function () {
			"use strict";

			__hotReload = true;

			_export("__hotReload", __hotReload);

			StateDb = (function () {
				function StateDb(state, db) {
					_classCallCheck(this, StateDb);

					this.name = this.constructor.name;
					this.state = state;
					this.state.subscribe(this);
					this.db = db;
				}

				_createClass(StateDb, [{
					key: "stateChange",
					value: function stateChange(next, last) {
						console.log("Section state", next);
					}
				}]);

				return StateDb;
			})();

			_export("StateDb", StateDb);
		}
	};
});
$__System.register("23", ["6", "13", "14", "15"], function (_export) {
	var _classCallCheck, StateDb, _get, _inherits, __hotReload, Section;

	return {
		setters: [function (_3) {
			_classCallCheck = _3["default"];
		}, function (_4) {
			StateDb = _4.StateDb;
		}, function (_) {
			_get = _["default"];
		}, function (_2) {
			_inherits = _2["default"];
		}],
		execute: function () {
			"use strict";

			__hotReload = true;

			_export("__hotReload", __hotReload);

			Section = (function (_StateDb) {
				_inherits(Section, _StateDb);

				function Section(state, db) {
					_classCallCheck(this, Section);

					_get(Object.getPrototypeOf(Section.prototype), "constructor", this).call(this, state, db);

					d3.select("#" + this.name).remove(); //hotreload hotfix
					this.div = d3.select(".container").append("section").attr("id", this.name);
					this.title = this.div.append("h2").classed("title", true);
					this.type = "section";
					this.height = parseInt(this.div.style("height"));
				}

				return Section;
			})(StateDb);

			_export("Section", Section);
		}
	};
});
$__System.registerDynamic("19", [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var $Object = Object;
  module.exports = {
    create: $Object.create,
    getProto: $Object.getPrototypeOf,
    isEnum: {}.propertyIsEnumerable,
    getDesc: $Object.getOwnPropertyDescriptor,
    setDesc: $Object.defineProperty,
    setDescs: $Object.defineProperties,
    getKeys: $Object.keys,
    getNames: $Object.getOwnPropertyNames,
    getSymbols: $Object.getOwnPropertySymbols,
    each: [].forEach
  };
  return module.exports;
});
$__System.registerDynamic('41', ['19'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var $ = $__require('19');
  module.exports = function defineProperty(it, key, desc) {
    return $.setDesc(it, key, desc);
  };
  return module.exports;
});
$__System.registerDynamic("20", ["41"], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  module.exports = { "default": $__require("41"), __esModule: true };
  return module.exports;
});
$__System.registerDynamic("5", ["20"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var define,
      global = this || self,
      GLOBAL = global;
  var _Object$defineProperty = $__require("20")["default"];
  exports["default"] = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        _Object$defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  exports.__esModule = true;
  return module.exports;
});
$__System.registerDynamic("6", [], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var define,
      global = this || self,
      GLOBAL = global;
  exports["default"] = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  exports.__esModule = true;
  return module.exports;
});
$__System.register("2f", [], function (_export) {
  "use strict";

  var __hotReload;

  _export("checkPartialOverflow", checkPartialOverflow);

  _export("checkOverflow", checkOverflow);

  // have the size of the hierarchy at each level

  _export("makeSafeForCSS", makeSafeForCSS);

  // this takes a nested map and returns in treemap compatible format

  _export("countValues", countValues);

  _export("remap", remap);

  function checkPartialOverflow(el, min) {
    if (el.offsetHeight < min || el.offsetWidth < min) {
      return "overflow";
    } else {
      if (el.offsetHeight < el.scrollHeight || el.offsetWidth < el.scrollWidth) {
        return "partial-overflow";
      } else {
        return "no-overflow";
      }
    }
  }

  function checkOverflow(el) {
    if (el.offsetHeight < el.scrollHeight || el.offsetWidth < el.scrollWidth) {
      return "overflow";
    } else {
      return "no-overflow";
    }
  }

  function makeSafeForCSS(name) {
    return name.replace(/[^a-z0-9]/g, function (s) {
      var c = s.charCodeAt(0);
      if (c == 32) return '-';
      if (c >= 65 && c <= 90) return '_' + s.toLowerCase();
      return '__' + ('000' + c.toString(16)).slice(-4);
    });
  }

  function countValues(major) {
    var c = 0;major.forEach(function (minor) {
      minor.values == undefined ? c++ : c += countValues(minor.values);
    });return c;
  }

  function remap(root) {
    var newElement = { name: root.key };
    if (root.values) {
      newElement.size = countValues(root.values);
      newElement.children = root.values.map(function (value) {
        if (value.values) {
          return remap(value);
        } else {
          value.size = 1;
          return value;
        }
      });
    }
    return newElement;
  }

  return {
    setters: [],
    execute: function () {
      __hotReload = true;

      _export("__hotReload", __hotReload);
    }
  };
});
$__System.register("42", ["5", "6", "2f"], function (_export) {
	var _createClass, _classCallCheck, GeiVisUtils, __hotReload, NestedTreemap;

	return {
		setters: [function (_) {
			_createClass = _["default"];
		}, function (_2) {
			_classCallCheck = _2["default"];
		}, function (_f) {
			GeiVisUtils = _f;
		}],
		execute: function () {
			"use strict";

			__hotReload = true;

			_export("__hotReload", __hotReload);

			NestedTreemap = (function () {
				function NestedTreemap(props) {
					_classCallCheck(this, NestedTreemap);

					this.properties = props;
					this.container = {};
					this.svg = {};
					this.root = {};
					this.data;
					this.treemap = {};
					this.width = {};
					this.height = {};
					this.activeNest = [];
					this.nestings = [];
					this.state = {};
					this.db = {};
				}

				_createClass(NestedTreemap, [{
					key: "appendTo",
					value: function appendTo(selector) {
						var _this = this;

						this.container = selector;
						this.width = parseInt(this.container.style("width")) - this.properties.margin.left - this.properties.margin.right, this.height = window.innerHeight - 200 - 100 - this.properties.margin.top - this.properties.margin.bottom;

						this.svg = this.container.append("div").attr("class", "visualization").style("width", this.width + 'px').style("height", this.height + 'px').style("position", "relative");

						this.loadButton = this.container.append('a').classed('loadButton', true).on('click', function (d) {
							_this.render('brushmove');
							_this.render('brushend');
							_this.hideButton.bind(_this)();
						});

						this.connectionSVG = this.svg.append('svg').style('position', 'absolute').attr("class", "label-connections").style("width", this.width).style("height", 60);
						return this;
					}
				}, {
					key: "setState",
					value: function setState(state) {
						this.state = state;
					}
				}, {
					key: "setDB",
					value: function setDB(db) {
						this.db = db;
					}
				}, {
					key: "hideButton",
					value: function hideButton() {
						this.loadButton.classed('hidden', true);
					}
				}, {
					key: "showButton",
					value: function showButton() {
						this.loadButton.classed('hidden', false).text("Click to load " + this.nestings[1][this.activeNest[1]].name + " data");
					}
				}, {
					key: "relativeColorScale",
					value: function relativeColorScale(initial, value) {
						d3.scaleLinear.domain([-1.0, 0.0, 1.0]).range(["#ff0000, #cccccc", "#00ff00"]);
					}
				}, {
					key: "updateData",
					value: function updateData(data) {

						if (data != undefined) {
							this.data = data;
						}

						var nesting = d3.nest();
						var nstA = this.nestings[0][this.activeNest[0]].accessor;
						var nstB = this.nestings[1][this.activeNest[1]].accessor;
						nesting.key(nstA).key(nstB).rollup(function (d) {
							return d.length;
						});
						var nested = nesting.entries(this.data);

						this.root = d3.hierarchy({ key: "all values", values: nested }, function (d) {
							return d.values;
						}).sum(function (d) {
							return d.value;
						}).sort(function (b, a) {
							return Math.abs(a.x1 - a.x0 - Math.abs(b.x1 - b.x0)) || a.value - b.value;
						});

						this.treemap = d3.treemap().size([this.width, this.height - 60]).tile(d3.treemapSliceDice).round(true).paddingLeft(0).paddingRight(0).paddingTop(0).paddingBottom(0);

						this.treemap(this.root);
						return this;
					}
				}, {
					key: "setNodeDimensions",
					value: function setNodeDimensions(selection) {
						selection.style("transform", function (d) {
							return "translate3d(" + Math.round(d.x0) + "px," + Math.round(d.y0 + 60) + "px,0px)";
						}).style("width", function (d) {
							return Math.round(d.x1 - d.x0) + "px";
						}).style("height", function (d) {
							return Math.round(d.depth == 1 ? d.y1 - d.y0 : Math.max(1, d.y1 - d.y0)) + 'px';
						});
						selection.select(".label").text(function (d) {
							return d.depth != 0 ? d.data.key : null;
						});
						selection.select(".count").text(function (d) {
							return d.depth != 0 ? d.data.value : null;
						});
					}
				}, {
					key: "setNodeClass",
					value: function setNodeClass(selection) {
						selection.attr("class", function (d) {
							var c = GeiVisUtils.makeSafeForCSS(d.data.key) + " node " + "level-" + d.depth;
							c += (Math.abs(d.x1 - d.x0) < 3 || Math.abs(d.y1 - d.y0) < 3) && d.depth > 1 ? " other" : "";
							return c;
						});
					}
				}, {
					key: "setNodeID",
					value: function setNodeID(selection) {
						selection.attr("id", function (d) {
							if (d.depth === 1) return GeiVisUtils.makeSafeForCSS(d.data.key);
							if (d.depth === 2) return GeiVisUtils.makeSafeForCSS(d.parent.data.key + d.data.key);
						});
					}
				}, {
					key: "checkOverflow",
					value: function checkOverflow(d, i, array) {
						//let o = GeiVisUtils.checkOverflow( d3.select(this).node() )
						var w = 80;
						var h = 13;
						var el = d3.select(this).node();
						var o = el.offsetHeight < h || el.offsetWidth < w;
						d3.select(this).classed('overflow', o);
					}
				}, {
					key: "dKey",
					value: function dKey(d) {
						var k = d.data.key;
						k += d.parent != undefined ? d.parent.data.key : 'root';
						return k;
					}
				}, {
					key: "render",
					value: function render(mode) {
						var _this2 = this;

						function updateLabels(dataLevel1) {
							var nodesLevel1 = this.svg.selectAll(".node.level-1").data(dataLevel1, this.dKey);
							var labelLevel1 = this.svg.selectAll(".level-1-label").data(dataLevel1, this.dKey);
							var connections = this.connectionSVG.selectAll("path").data(dataLevel1, this.dKey);
							// enter l1-labels
							var enteredLabelLevel1 = labelLevel1.enter().append('div').classed('level-1-label', true).style('height', '60').style('transform', function (d, i) {
								return "translate3d(" + Math.round(i * w) + "px,0px,0px)scale(0,0)";
							});
							// update
							labelLevel1.style('width', Math.round(w) + 'px').html(function (d) {
								var label = d.data.key == '' ? 'unknown' : d.data.key;
								return label + "<br/><span>" + d.value + "</span>";
							}).style('transform', function (d, i) {
								return "translate3d(" + i * w + "px,0px,0px)scale(1,1)";
							});
							// exit
							labelLevel1.exit().style('transform', function (d, i) {
								return "translate3d(" + i * w + "px,0px,0px)scale(1,1)";
							}).remove();
							// enter connection lines
							var enteredConnections = connections.enter().append('path').attr('class', function (d) {
								return 'path ' + d.data.key;
							}).attr("d", connectionLinePath);
							// update
							connections.transition().duration(100).attr("d", connectionLinePath);
							// exit
							connections.exit().remove();
							// enter l1-nodes
							var enteredNodesLevel1 = nodesLevel1.enter().append('div').call(this.setNodeClass).call(this.setNodeID).call(this.setNodeDimensions);
							// update
							nodesLevel1.style('border-left', function (d, i, array) {
								return i == 0 ? '1px solid #efefef' : null;
							}).style('border-right', function (d, i, array) {
								return i == array.length - 1 ? '1px solid #efefef' : null;
							}).call(this.setNodeDimensions).call(this.setNodeID);
							// exit
							nodesLevel1.exit().remove();
						}

						function connectionLinePath(d, i, array) {
							var shift = 30;
							var amt = i / array.length;
							var vStart = [i * w + w, 0];
							var vEnd = [d.x0 + (d.x1 - d.x0) * 0.5, 60];
							var v0 = [vStart[0], vStart[1]];v0[1] += shift - shift * amt;
							var v1 = [vEnd[0], vEnd[1]];v1[1] -= shift * amt;
							return line([vStart, v0, v1, vEnd]);
						}

						var nodes = undefined;

						// data filtered depending on the brushevent
						var data = this.root.descendants();
						var dataLevel1 = data.filter(function (d) {
							return d.depth == 1;
						});
						var dataLevel2 = data.filter(function (d) {
							return d.depth == 2;
						});

						var m = 20;
						var w = (this.width - m) / dataLevel1.length;
						var line = d3.line().x(function (d) {
							return Math.round(d[0]);
						}).y(function (d) {
							return d[1];
						}).curve(d3.curveMonotoneY);

						switch (mode) {
							case "brushstart":
								// not mucho to do?
								break;
							case "brushmove":

								this.svg.selectAll(".node.level-2").remove();
								updateLabels.bind(this)(dataLevel1);

								break;
							case "brushend":

								this.hideButton();

								updateLabels.bind(this)(dataLevel1);

								var nodesLevel2 = this.svg.selectAll(".node.level-2").data(dataLevel2, this.dKey);

								// enter l2-nodes
								var enteredNodesLevel2 = nodesLevel2.enter().append('div').call(this.setNodeClass).call(this.setNodeID).call(this.setNodeDimensions).on("mouseover", function (d, i, array) {
									_this2.svg.selectAll(".node").classed("related", false);
									// only proceed if d.data is not empty
									if (d.data.key != '' && d.data.key != undefined) {
										_this2.svg.selectAll("." + GeiVisUtils.makeSafeForCSS(d.data.key)).classed("related", true);
										var el = d3.select(array[i]);
										if (el.classed('overflow') || el.classed('other')) {
											var tPos = d3.mouse(_this2.container.node());
											var tooltip = { name: d.data.key + " : " + d.data.value, pos: [tPos[0], _this2.container.node().offsetTop + tPos[1]] };
											_this2.state.push({ hover: d.data.key, tooltip: tooltip });
										}
									}
								}).on("mouseout", function (d) {
									_this2.svg.selectAll(".node").classed("related", false);
									_this2.state.push({ tooltip: null });
								}).on("click", function (d) {
									var indicesA = _this2.data.map(_this2.nestings[1][_this2.activeNest[1]].accessor).map(function (el, i) {
										return el == d.data.key ? i : -1;
									}).filter(function (el) {
										return el != -1;
									});
									var indicesB = _this2.data.map(_this2.nestings[0][_this2.activeNest[0]].accessor).map(function (el, i) {
										return el == d.parent.data.key ? i : -1;
									}).filter(function (el) {
										return el != -1;
									});
									var filteredData = _this2.data.filter(function (d, i) {
										return indicesA.indexOf(i) != -1 && indicesB.indexOf(i) != -1;
									});
									_this2.state.push({ bookshelf: false });
									_this2.db.bookshelfData = filteredData;
									_this2.state.push({ bookshelf: true });
								});
								// labels
								enteredNodesLevel2.append("span").classed("label", true).text(function (d) {
									return d.depth != 0 ? d.data.key : null;
								});
								enteredNodesLevel2.append("span").classed("count", true).text(function (d) {
									return d.depth != 0 ? d.data.value : null;
								});
								// check for overflow
								enteredNodesLevel2.call(function (d) {
									d.nodes().forEach(function (n) {
										_this2.checkOverflow.bind(n)();
									});
								});

								break;
						}

						return this;
					}
				}, {
					key: "createDropdowns",
					value: function createDropdowns(a, b) {

						var that = this;

						this.nestingA = a.append("span").attr("id", "nesting-0").call(createSwitchContent);
						this.nestingB = b.append("span").attr("id", "nesting-1").call(createSwitchContent);

						function createSwitchContent(selection) {

							var target = selection.attr('id');
							var targetID = target.replace('nesting-', '');
							var name = that.nestings[targetID][that.activeNest[targetID]].name;

							selection.append('a').attr('href', '#').classed('prev', true).classed(target, true).on("click", switchNesting).text('‹');
							selection.append('span').classed('name', true).text(name);
							selection.append('a').attr('href', '#').classed('next', true).classed(target, true).on("click", switchNesting).text('›');
						}

						function switchNesting() {
							d3.event.preventDefault();

							var direction = d3.select(this).classed('prev') ? -1 : 1;
							var target = d3.select(this).classed('nesting-0') ? 0 : 1;

							var newNest = that.activeNest[target] + 1 * direction;
							newNest = newNest > that.nestings[target].length - 1 ? 0 : newNest;
							newNest = newNest < 0 ? that.nestings[target].length - 1 : newNest;

							that.activeNest[target] = newNest;
							d3.select('#nesting-' + target).select('.name').text(that.nestings[target][newNest].name);
							that.updateData();
							that.render('brushmove');
							that.render('brushend');
						}

						return this;
					}
				}, {
					key: "setNesting",
					value: function setNesting(nestings) {
						this.nestings = nestings;
						// map-reduce to find the initally activated nestings
						this.activeNest = nestings.map(function (d) {
							return d.reduce(function (prev, current, i) {
								if (prev == -1 && current.isActive == true) {
									return i;
								} else {
									return prev;
								}
							}, -1);
						});
						return this;
					}
				}]);

				return NestedTreemap;
			})();

			_export("NestedTreemap", NestedTreemap);
		}
	};
});
$__System.register('43', ['5', '6', '14', '15', '23', '42'], function (_export) {
  var _createClass, _classCallCheck, _get, _inherits, Section, NestedTreemap, __hotReload, TreemapSection;

  return {
    setters: [function (_3) {
      _createClass = _3['default'];
    }, function (_4) {
      _classCallCheck = _4['default'];
    }, function (_) {
      _get = _['default'];
    }, function (_2) {
      _inherits = _2['default'];
    }, function (_5) {
      Section = _5.Section;
    }, function (_6) {
      NestedTreemap = _6.NestedTreemap;
    }],
    execute: function () {
      'use strict';

      __hotReload = true;

      _export('__hotReload', __hotReload);

      TreemapSection = (function (_Section) {
        _inherits(TreemapSection, _Section);

        function TreemapSection(state, db) {
          _classCallCheck(this, TreemapSection);

          _get(Object.getPrototypeOf(TreemapSection.prototype), 'constructor', this).call(this, state, db);

          // these accessor functions describe the nesting values
          var nestings = [[{ isActive: true, name: 'Subject', accessor: function accessor(d) {
              return d.subject == undefined ? 'Subject unknown' : d.subject;
            } }, { name: 'Schooltype', accessor: function accessor(d) {
              return d.schooltype == undefined ? 'Schooltype unknown' : d.schooltype;
            } }, { name: 'Schoollevel', accessor: function accessor(d) {
              return d.schoollevel == undefined ? 'Schoollevel unknown' : d.schoollevel;
            } }], [{ isActive: true, name: 'Place', accessor: function accessor(d) {
              return d.publisher_city == undefined ? 'Place unknown' : d.publisher_city;
            } }, { name: 'Publisher', accessor: function accessor(d) {
              return d.publisher == undefined ? 'Publisher unbekannt' : d.publisher;
            } }]];

          this.margin = { 'top': 0, 'right': 0, 'bottom': 0, 'left': 0 };

          this.title.text('Comparison');
          this.div.append("div").attr("class", "intro").text("In this visualization you can compare two of the aforementioned facets by grouping them in succession. The groupings show for example the ratio of certain places in all subjects and enable the search for trends and the already mentioned comparison. You can change the first and second level groupings through the switches on the lefthand bottom side. Hovering over a single highlights the cell (i.e. a publisher) and shows other cells of the same type (i.e. the same publisher in other subjects). You can also see all the books for any cell by clicking on it.");

          this.treemap = new NestedTreemap({ 'margin': this.margin });
          this.treemap.setState(state);
          this.treemap.setDB(db);
          this.treemap.appendTo(this.div);

          // selects
          this.selects = this.div.append("div").classed('selects', true);
          this.selects.append('span').text('Compare');
          var select1 = this.selects.append("div").classed("select-1 switch", true);
          this.selects.append('span').text('in');
          var select0 = this.selects.append("div").classed("select-0 switch", true);

          this.treemap.setNesting(nestings).createDropdowns(select0, select1);

          // let height = parseInt(select1.style("height"))

          // select1
          //   .style('transform', `rotate(-90deg)translate3d(-${this.treemap.height}px,0, 0)`)
          //   .style('width', this.treemap.height+'px')
        }

        _createClass(TreemapSection, [{
          key: 'stateChange',
          value: function stateChange(next, last) {

            // init
            if (next.loaded != last.loaded) {
              this.treemap.updateData(this.db.date.top(Infinity));
              this.treemap.render("brushmove");
              this.treemap.render("brushend");
            }

            // skip if not in viewport
            if (!next.visible.TreemapSection) return;
            this.db.bookshelfData = this.db.date.top(Infinity);

            // update if became visible
            if (next.visible.TreemapSection !== last.visible.TreemapSection) {
              this.treemap.updateData(this.db.date.top(Infinity));
              this.treemap.render("brushmove");
              this.treemap.showButton();
            } else {
              // update if in viewport and brush has changed
              if (next.brushStart !== last.brushStart || next.brushEnd !== last.brushEnd || next.loaded !== last.loaded || next.visible.TreemapSection !== last.visible.TreemapSection) {
                this.treemap.updateData(this.db.date.top(Infinity));
                this.render(next, last);
              }
            }
          }
        }, {
          key: 'render',
          value: function render(next, last) {
            // this simple hack enables brushstart,brushmove and brushend events
            var event = last.event != next.event && next.event == "brushmove" ? "brushstart" : next.event;
            this.treemap.updateData(this.db.date.top(Infinity));
            this.treemap.render(event);
          }
        }]);

        return TreemapSection;
      })(Section);

      _export('TreemapSection', TreemapSection);
    }
  };
});
$__System.register('1', ['4', '22', '24', '26', '28', '29', '30', '43', 'd', 'f'], function (_export) {
  'use strict';

  var StateMachine, StreamSection, DummySection, BookshelfSection, GeomapSection, Tooltip, NetworkSection, TreemapSection, DataBase, ScrollListener, __hotReload, state, db, scroll, tooltip, bookshelfSection, streamSection, geomapSection, treemapSection, networkSection;

  return {
    setters: [function (_) {
      StateMachine = _.StateMachine;
    }, function (_2) {
      StreamSection = _2.StreamSection;
    }, function (_3) {
      DummySection = _3.DummySection;
    }, function (_4) {
      BookshelfSection = _4.BookshelfSection;
    }, function (_5) {
      GeomapSection = _5.GeomapSection;
    }, function (_6) {
      Tooltip = _6.Tooltip;
    }, function (_7) {
      NetworkSection = _7.NetworkSection;
    }, function (_8) {
      TreemapSection = _8.TreemapSection;
    }, function (_d) {
      DataBase = _d.DataBase;
    }, function (_f) {
      ScrollListener = _f.ScrollListener;
    }],
    execute: function () {
      __hotReload = true;

      _export('__hotReload', __hotReload);

      state = new StateMachine();
      db = new DataBase(state);
      scroll = new ScrollListener(state);
      tooltip = new Tooltip(state);
      bookshelfSection = new BookshelfSection(state, db);
      streamSection = new StreamSection(state, db);
      geomapSection = new GeomapSection(state, db);
      treemapSection = new TreemapSection(state, db);
      networkSection = new NetworkSection(state, db);

      // let dummy = new DummySection(state, db);

      db.load();
    }
  };
});
})
(function(factory) {
  factory();
});
//# sourceMappingURL=build.js.map