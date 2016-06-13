System.registerDynamic("npm:object-assign@4.1.0/index.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
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
      var test1 = new String('abc');
      test1[5] = 'de';
      if (Object.getOwnPropertyNames(test1)[0] === '5') {
        return false;
      }
      var test2 = {};
      for (var i = 0; i < 10; i++) {
        test2['_' + String.fromCharCode(i)] = i;
      }
      var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
        return test2[n];
      });
      if (order2.join('') !== '0123456789') {
        return false;
      }
      var test3 = {};
      'abcdefghijklmnopqrst'.split('').forEach(function(letter) {
        test3[letter] = letter;
      });
      if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }
  module.exports = shouldUseNative() ? Object.assign : function(target, source) {
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

System.registerDynamic("npm:object-assign@4.1.0.js", ["npm:object-assign@4.1.0/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:object-assign@4.1.0/index.js');
  return module.exports;
});

System.register('js/StateMachine.js', ['npm:babel-runtime@5.8.38/helpers/create-class.js', 'npm:babel-runtime@5.8.38/helpers/class-call-check.js', 'npm:object-assign@4.1.0.js'], function (_export) {
  var _createClass, _classCallCheck, objectAssign, __hotReload, StateMachine;

  return {
    setters: [function (_npmBabelRuntime5838HelpersCreateClassJs) {
      _createClass = _npmBabelRuntime5838HelpersCreateClassJs['default'];
    }, function (_npmBabelRuntime5838HelpersClassCallCheckJs) {
      _classCallCheck = _npmBabelRuntime5838HelpersClassCallCheckJs['default'];
    }, function (_npmObjectAssign410Js) {
      objectAssign = _npmObjectAssign410Js['default'];
    }],
    execute: function () {
      'use strict';

      __hotReload = true;

      _export('__hotReload', __hotReload);

      StateMachine = (function () {
        function StateMachine() {
          var _this = this;

          _classCallCheck(this, StateMachine);

          this.state = {
            brushStart: null,
            brushEnd: null,
            active: "subjects",
            activeItem: null,
            loaded: false,
            timestamp: null
          };
          this.history = [];
          this.history.push(objectAssign({}, this.state));
          this.size = 10;
          this.subscriber = [];

          window.addEventListener('scroll', function (e) {
            _this.subscriber.forEach(function (s) {
              if (s.type === "section") {

                var rect = s.div.node().getBoundingClientRect();
                var height = window.innerHeight || document.documentElement.clientHeight;

                var visible = rect.top >= -height && rect.top <= height;

                // console.log(s.name, visible)
              }
            });
          });
        }

        _createClass(StateMachine, [{
          key: 'push',
          value: function push(state) {
            if (this.history.length >= this.size) {
              this.history.pop();
            }
            this.lastState = this.history[0];
            var newState = objectAssign({}, this.state, state);
            // newState.timestamp = +new Date();
            this.history.unshift(newState);
            this.state = objectAssign({}, newState);
            this.broadcast();
            // console.log(newState);
          }
        }, {
          key: 'subscribe',
          value: function subscribe(c) {
            this.subscriber.push(c);
          }
        }, {
          key: 'broadcast',
          value: function broadcast() {
            var _this2 = this;

            // console.log(this.subscriber);
            this.subscriber.forEach(function (c) {
              return c.stateChange(_this2.state, _this2.lastState);
            });
          }
        }]);

        return StateMachine;
      })();

      _export('StateMachine', StateMachine);
    }
  };
});
System.register("js/DataBase.js", ["npm:babel-runtime@5.8.38/helpers/create-class.js", "npm:babel-runtime@5.8.38/helpers/class-call-check.js"], function (_export) {
  var _createClass, _classCallCheck, __hotReload, DataBase;

  return {
    setters: [function (_npmBabelRuntime5838HelpersCreateClassJs) {
      _createClass = _npmBabelRuntime5838HelpersCreateClassJs["default"];
    }, function (_npmBabelRuntime5838HelpersClassCallCheckJs) {
      _classCallCheck = _npmBabelRuntime5838HelpersClassCallCheckJs["default"];
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

          this.state.subscribe(this);
        }

        _createClass(DataBase, [{
          key: "load",
          value: function load() {
            var _this = this;

            this.state.push({ loading: true });

            d3.csv("../data/data.csv", function (data) {
              d3.csv("../data/geocode.csv", function (geocode) {

                _this.init(data, geocode);
                _this.state.push({ loaded: true, brushStart: _this.extent[0], brushEnd: _this.extent[1], keyframe: true });
              });
            });

            return this;
          }
        }, {
          key: "init",
          value: function init(_data, _geocode) {
            var _this2 = this;

            this.data = _data.filter(function (d) {
              return d.year && d.year <= 1920 && d.year >= 1720;
            });

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
            });

            console.log(this.data[0]);
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

            //this.filterTag("Deutschland")

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
          }
        }, {
          key: "add",
          value: function add(name, data) {
            this[name] = data;
            return this;
          }
        }, {
          key: "stackedHistogram",
          value: function stackedHistogram() {
            var activeItem = this.state.state.activeItem;

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

            return stack;
          }
        }, {
          key: "stateChange",
          value: function stateChange(next, curr) {

            if (next.brushStart !== curr.brushStart) {
              if (next.brushStart * 1 === next.brushEnd * 1) {
                this.date.filterAll();
              } else {
                this.date.filterRange([next.brushStart, next.brushEnd]);
              }

              d3.select("#total").text(this.crossfilter.size());
              d3.select("#active").text(this.all.value());
            }

            if (next.activeItem !== curr.activeItem) {
              var k2 = curr.active.substring(0, curr.active.length - 1);
              this[k2].filterExact(null);

              var k = next.active.substring(0, next.active.length - 1);
              this[k].filterExact(next.activeItem);

              console.log(curr.active, next.active);
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
System.register("js/container/stream/StreamGraph.js", ["npm:babel-runtime@5.8.38/helpers/get.js", "npm:babel-runtime@5.8.38/helpers/inherits.js", "npm:babel-runtime@5.8.38/helpers/create-class.js", "npm:babel-runtime@5.8.38/helpers/class-call-check.js", "js/StateDb.js"], function (_export) {
  var _get, _inherits, _createClass, _classCallCheck, StateDb, __hotReload, StreamGraph;

  return {
    setters: [function (_npmBabelRuntime5838HelpersGetJs) {
      _get = _npmBabelRuntime5838HelpersGetJs["default"];
    }, function (_npmBabelRuntime5838HelpersInheritsJs) {
      _inherits = _npmBabelRuntime5838HelpersInheritsJs["default"];
    }, function (_npmBabelRuntime5838HelpersCreateClassJs) {
      _createClass = _npmBabelRuntime5838HelpersCreateClassJs["default"];
    }, function (_npmBabelRuntime5838HelpersClassCallCheckJs) {
      _classCallCheck = _npmBabelRuntime5838HelpersClassCallCheckJs["default"];
    }, function (_jsStateDbJs) {
      StateDb = _jsStateDbJs.StateDb;
    }],
    execute: function () {
      "use strict";

      __hotReload = true;

      _export("__hotReload", __hotReload);

      StreamGraph = (function (_StateDb) {
        _inherits(StreamGraph, _StateDb);

        function StreamGraph(state, db, div) {
          var _this = this;

          _classCallCheck(this, StreamGraph);

          _get(Object.getPrototypeOf(StreamGraph.prototype), "constructor", this).call(this, state, db);

          this.key = "subject";

          this.outerWidth = 1060;
          this.outerHeight = 300;
          this.outerHeightInitial = this.outerHeight;
          this.margin = { top: 20, right: 30, bottom: 30, left: 40 };

          this.x = d3.scaleTime();
          this.y = d3.scaleLinear();

          this.xAxis = d3.axisBottom();
          // .orient("bottom")
          // .ticks(d3.time.years, 20)

          this.yAxis = d3.axisLeft().ticks(5, "1f");

          this.area = d3.area().x(function (d) {
            return _this.x(d.data.key);
          }).y0(function (d) {
            return _this.y(d[0]);
          }).y1(function (d) {
            return _this.y(d[1]);
          });
          // .curve(d3.curveCardinal)
          // .curve(d3.curveStepAfter)

          this.div = div;
          this.svg = this.div.append("svg");
          this.g = this.svg.append("g");
          this.gXaxis = this.g.append("g").attr("class", "x axis");
          this.gYaxis = this.g.append("g").attr("class", "y axis");
          this.gBrush = this.g.append("g").attr("class", "brush");
          this.gGraph = this.g.append("g").attr("class", "graph");

          this.offset = this.div.node().offsetTop;

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
          key: "brushmove",
          value: function brushmove() {
            var _this2 = this;

            var s = d3.event.selection.map(function (d) {
              return _this2.x.invert(d);
            });
            this.state.push({ brushStart: s[0], brushEnd: s[1], keyframe: false });
          }
        }, {
          key: "brushend",
          value: function brushend() {
            var _this3 = this;

            var s = d3.event.selection ? d3.event.selection.map(function (d) {
              return _this3.x.invert(d);
            }) : this.db.extent;
            console.log(s);
            this.state.push({ brushStart: s[0], brushEnd: s[1], keyframe: true });
          }
        }, {
          key: "init",
          value: function init() {
            this.width = this.outerWidth - this.margin.left - this.margin.right, this.height = this.outerHeight - this.margin.top - this.margin.bottom;

            this.x.rangeRound([0, this.width]);
            this.y.range([this.height, 0]).clamp(true);

            this.xAxis.scale(this.x).tickSize(-this.height);
            this.yAxis.scale(this.y);

            this.svg.attr("width", this.outerWidth).attr("height", this.outerHeight);

            this.g.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
            this.brush.extent([[0, 0], [this.width, this.height]]);
            this.gBrush.call(this.brush);
            this.gBrush.selectAll("rect").attr("height", this.height);

            // this.gBrush.selectAll(".resize rect")
            //   .style("visibility", "inherit")

            return this;
          }
        }, {
          key: "load",
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
          key: "stateChange",
          value: function stateChange(next, last) {
            // console.log(next);
            if (next.hover !== last.hover) {
              this.render();
            }
            if (next.active !== last.active) {
              // let data = this.db.date.top(Infinity);
              this.load().render();
            }
            if (next.activeItem !== last.activeItem) {
              if (!next.activeItem) {
                // this.stack.offset("silhouette");
                this.load().render();
              } else {
                this.load().render();
                // let k = this.state.state.active.substring(0,this.state.state.active.length-1);
                // let data = this.db.data.filter(d => d[k] === next.activeItem);
                // this.stack.offset("zero");
                // this.load(data).render();
              }
            }
            // if(next.brushStart.getYear() != last.brushStart.getYear()){

            // }
            // console.log(next.brushStart, last.brushStart);
          }
        }, {
          key: "render",
          value: function render(notransition) {
            var _this4 = this;

            var s = this.gGraph.selectAll("path").data(this.data, function (d) {
              return d.key;
            });

            s.enter().append("path").on("mouseenter", function (d) {
              _this4.state.push({ hover: d.key });
            }).on("mouseleave", function (d) {
              _this4.state.push({ hover: null });
            }).on("click", function (d) {
              var active = _this4.state.state.activeItem === d.key;
              _this4.state.push({ activeItem: active ? null : d.key });
            }).attr("d", this.area).style("opacity", 0)
            // .transition()
            // .duration(notransition ? 0 : 800)
            .style("opacity", function (d) {
              return d.key == "other" ? 0.3 : 1;
            });

            s.exit().remove();

            s.classed("active", function (d) {
              return _this4.state.state.hover == d.key;
            })
            // .transition()
            // .duration(notransition ? 0 : 800)
            .attr("d", this.area).style("opacity", function (d) {
              return d.key == "other" ? 0.3 : 1;
            });

            this.gXaxis.attr("transform", "translate(0," + this.height + ")").call(this.xAxis);

            this.gXaxis.selectAll("text").attr("dy", "1em");

            // this.gXaxis
            //   .selectAll("text")
            //   .attr("transform", function(d) {
            //        return "translate(" + this.getBBox().height*-2 + "," + this.getBBox().height + ")rotate(-45)";
            //    });

            this.gYaxis
            // .transition()
            // .duration(notransition ? 0 : 800)
            .call(this.yAxis);
          }
        }]);

        return StreamGraph;
      })(StateDb);

      _export("StreamGraph", StreamGraph);
    }
  };
});
System.registerDynamic("npm:babel-runtime@5.8.38/helpers/define-property.js", ["npm:babel-runtime@5.8.38/core-js/object/define-property.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var _Object$defineProperty = $__require('npm:babel-runtime@5.8.38/core-js/object/define-property.js')["default"];
  exports["default"] = function(obj, key, value) {
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

System.register("js/container/stream/BarList.js", ["npm:babel-runtime@5.8.38/helpers/get.js", "npm:babel-runtime@5.8.38/helpers/inherits.js", "npm:babel-runtime@5.8.38/helpers/create-class.js", "npm:babel-runtime@5.8.38/helpers/class-call-check.js", "npm:babel-runtime@5.8.38/helpers/define-property.js", "js/StateDb.js"], function (_export) {
  var _get, _inherits, _createClass, _classCallCheck, _defineProperty, StateDb, __hotReload, BarList;

  return {
    setters: [function (_npmBabelRuntime5838HelpersGetJs) {
      _get = _npmBabelRuntime5838HelpersGetJs["default"];
    }, function (_npmBabelRuntime5838HelpersInheritsJs) {
      _inherits = _npmBabelRuntime5838HelpersInheritsJs["default"];
    }, function (_npmBabelRuntime5838HelpersCreateClassJs) {
      _createClass = _npmBabelRuntime5838HelpersCreateClassJs["default"];
    }, function (_npmBabelRuntime5838HelpersClassCallCheckJs) {
      _classCallCheck = _npmBabelRuntime5838HelpersClassCallCheckJs["default"];
    }, function (_npmBabelRuntime5838HelpersDefinePropertyJs) {
      _defineProperty = _npmBabelRuntime5838HelpersDefinePropertyJs["default"];
    }, function (_jsStateDbJs) {
      StateDb = _jsStateDbJs.StateDb;
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

          this.container = div.append("div").classed("entity", true);
          this.container.append("div").classed("title", true).text(this.key);
          this.items = this.container.append("div").classed("items", true);
          this.data = [];
          this.key = "subjects";

          this.container.on("click", function () {
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
            // if(next.brushStart !== last.brushStart){
            //   this.render();
            // }
            if (next.loaded) {
              this.render();
            }

            // console.log(next.filter);
          }
        }, {
          key: "render",
          value: function render() {
            var _this2 = this;

            //console.log( this.state.state);
            var size = this.db[this.key].size();
            this.container.select(".title").text(this.key);
            this.container.classed("active", this.state.state.active === this.key);
            // this.container.classed("hover", this.state.state.hover === this.key);
            // console.time("filter");
            // console.log(this.key);
            var group = this.db[this.key].top(20);
            var max = d3.max(group, function (d) {
              return d.value;
            });
            // console.timeEnd("filter");

            var s = this.items.selectAll(".item").data(group, function (d) {
              return d.key;
            });
            var e = s.enter().append("div").classed("item", true).on("mouseenter", function (d) {
              _this2.state.push({ active: _this2.key, hover: d.key });
            }).on("mouseleave", function () {
              _this2.state.push({ active: _this2.key, hover: null });
            }).on("click", function (d) {
              var activeItem = _this2.state.state.activeItem === d.key;
              _this2.state.push({ active: _this2.key, activeItem: activeItem ? null : d.key });
              _this2.state.push({ filter: _defineProperty({}, _this2.key, d.key) });
            });

            e.append("div").classed("left", true).append("div").classed("bar", true);
            e.append("div").classed("right", true);

            if (this.state.state.keyframe) {
              s.sort(function (a, b) {
                return b.value - a.value;
              });
            }

            s.classed("hover", function (d) {
              return _this2.state.state.hover === d.key;
            });
            s.classed("active", function (d) {
              return _this2.state.state.activeItem === d.key;
            });

            s.select(".bar").text(function (d) {
              return "" + d.value;
            })
            // .transition()
            .style("width", function (d) {
              return d.value / max * 100 + "%";
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
System.register('js/container/stream/StreamSection.js', ['npm:babel-runtime@5.8.38/helpers/get.js', 'npm:babel-runtime@5.8.38/helpers/inherits.js', 'npm:babel-runtime@5.8.38/helpers/create-class.js', 'npm:babel-runtime@5.8.38/helpers/class-call-check.js', 'js/Section.js', 'js/container/stream/StreamGraph.js', 'js/container/stream/BarList.js'], function (_export) {
  var _get, _inherits, _createClass, _classCallCheck, Section, StreamGraph, BarList, __hotReload, StreamSection;

  return {
    setters: [function (_npmBabelRuntime5838HelpersGetJs) {
      _get = _npmBabelRuntime5838HelpersGetJs['default'];
    }, function (_npmBabelRuntime5838HelpersInheritsJs) {
      _inherits = _npmBabelRuntime5838HelpersInheritsJs['default'];
    }, function (_npmBabelRuntime5838HelpersCreateClassJs) {
      _createClass = _npmBabelRuntime5838HelpersCreateClassJs['default'];
    }, function (_npmBabelRuntime5838HelpersClassCallCheckJs) {
      _classCallCheck = _npmBabelRuntime5838HelpersClassCallCheckJs['default'];
    }, function (_jsSectionJs) {
      Section = _jsSectionJs.Section;
    }, function (_jsContainerStreamStreamGraphJs) {
      StreamGraph = _jsContainerStreamStreamGraphJs.StreamGraph;
    }, function (_jsContainerStreamBarListJs) {
      BarList = _jsContainerStreamBarListJs.BarList;
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

          this.divStream = this.div.append("div").attr("class", "stream");
          this.divEntities = this.div.append("div").attr("class", "entities");

          this.stream = new StreamGraph(state, db, this.divStream).init();

          this.listSubjects = new BarList(state, db, this.divEntities).Key("subjects");
          this.listSchoollevels = new BarList(state, db, this.divEntities).Key("schoollevels");
          this.listPublishers = new BarList(state, db, this.divEntities).Key("publishers");
          this.listPlaces = new BarList(state, db, this.divEntities).Key("places");
        }

        _createClass(StreamSection, [{
          key: 'stateChange',
          value: function stateChange(next, last) {
            // console.log(this.name, next)

            if (next.loaded == !last.loaded) {
              this.stream.x.domain(this.db.extent);
              this.stream.load().render();
            }

            //console.log(this.db.date.top(Infinity));
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
System.registerDynamic("npm:core-js@1.2.6/library/modules/$.cof.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var toString = {}.toString;
  module.exports = function(it) {
    return toString.call(it).slice(8, -1);
  };
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.iobject.js", ["npm:core-js@1.2.6/library/modules/$.cof.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var cof = $__require('npm:core-js@1.2.6/library/modules/$.cof.js');
  module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it) {
    return cof(it) == 'String' ? it.split('') : Object(it);
  };
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.defined.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = function(it) {
    if (it == undefined)
      throw TypeError("Can't call method on  " + it);
    return it;
  };
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.to-iobject.js", ["npm:core-js@1.2.6/library/modules/$.iobject.js", "npm:core-js@1.2.6/library/modules/$.defined.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var IObject = $__require('npm:core-js@1.2.6/library/modules/$.iobject.js'),
      defined = $__require('npm:core-js@1.2.6/library/modules/$.defined.js');
  module.exports = function(it) {
    return IObject(defined(it));
  };
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.fails.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = function(exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.object-sap.js", ["npm:core-js@1.2.6/library/modules/$.export.js", "npm:core-js@1.2.6/library/modules/$.core.js", "npm:core-js@1.2.6/library/modules/$.fails.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var $export = $__require('npm:core-js@1.2.6/library/modules/$.export.js'),
      core = $__require('npm:core-js@1.2.6/library/modules/$.core.js'),
      fails = $__require('npm:core-js@1.2.6/library/modules/$.fails.js');
  module.exports = function(KEY, exec) {
    var fn = (core.Object || {})[KEY] || Object[KEY],
        exp = {};
    exp[KEY] = exec(fn);
    $export($export.S + $export.F * fails(function() {
      fn(1);
    }), 'Object', exp);
  };
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/es6.object.get-own-property-descriptor.js", ["npm:core-js@1.2.6/library/modules/$.to-iobject.js", "npm:core-js@1.2.6/library/modules/$.object-sap.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var toIObject = $__require('npm:core-js@1.2.6/library/modules/$.to-iobject.js');
  $__require('npm:core-js@1.2.6/library/modules/$.object-sap.js')('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor) {
    return function getOwnPropertyDescriptor(it, key) {
      return $getOwnPropertyDescriptor(toIObject(it), key);
    };
  });
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/fn/object/get-own-property-descriptor.js", ["npm:core-js@1.2.6/library/modules/$.js", "npm:core-js@1.2.6/library/modules/es6.object.get-own-property-descriptor.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var $ = $__require('npm:core-js@1.2.6/library/modules/$.js');
  $__require('npm:core-js@1.2.6/library/modules/es6.object.get-own-property-descriptor.js');
  module.exports = function getOwnPropertyDescriptor(it, key) {
    return $.getDesc(it, key);
  };
  return module.exports;
});

System.registerDynamic("npm:babel-runtime@5.8.38/core-js/object/get-own-property-descriptor.js", ["npm:core-js@1.2.6/library/fn/object/get-own-property-descriptor.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = {
    "default": $__require('npm:core-js@1.2.6/library/fn/object/get-own-property-descriptor.js'),
    __esModule: true
  };
  return module.exports;
});

System.registerDynamic("npm:babel-runtime@5.8.38/helpers/get.js", ["npm:babel-runtime@5.8.38/core-js/object/get-own-property-descriptor.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var _Object$getOwnPropertyDescriptor = $__require('npm:babel-runtime@5.8.38/core-js/object/get-own-property-descriptor.js')["default"];
  exports["default"] = function get(_x, _x2, _x3) {
    var _again = true;
    _function: while (_again) {
      var object = _x,
          property = _x2,
          receiver = _x3;
      _again = false;
      if (object === null)
        object = Function.prototype;
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

System.registerDynamic("npm:core-js@1.2.6/library/fn/object/create.js", ["npm:core-js@1.2.6/library/modules/$.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var $ = $__require('npm:core-js@1.2.6/library/modules/$.js');
  module.exports = function create(P, D) {
    return $.create(P, D);
  };
  return module.exports;
});

System.registerDynamic("npm:babel-runtime@5.8.38/core-js/object/create.js", ["npm:core-js@1.2.6/library/fn/object/create.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = {
    "default": $__require('npm:core-js@1.2.6/library/fn/object/create.js'),
    __esModule: true
  };
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.global.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
  if (typeof __g == 'number')
    __g = global;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.export.js", ["npm:core-js@1.2.6/library/modules/$.global.js", "npm:core-js@1.2.6/library/modules/$.core.js", "npm:core-js@1.2.6/library/modules/$.ctx.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var global = $__require('npm:core-js@1.2.6/library/modules/$.global.js'),
      core = $__require('npm:core-js@1.2.6/library/modules/$.core.js'),
      ctx = $__require('npm:core-js@1.2.6/library/modules/$.ctx.js'),
      PROTOTYPE = 'prototype';
  var $export = function(type, name, source) {
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
    if (IS_GLOBAL)
      source = name;
    for (key in source) {
      own = !IS_FORCED && target && key in target;
      if (own && key in exports)
        continue;
      out = own ? target[key] : source[key];
      exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key] : IS_BIND && own ? ctx(out, global) : IS_WRAP && target[key] == out ? (function(C) {
        var F = function(param) {
          return this instanceof C ? new C(param) : C(param);
        };
        F[PROTOTYPE] = C[PROTOTYPE];
        return F;
      })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
      if (IS_PROTO)
        (exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
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

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.is-object.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = function(it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.an-object.js", ["npm:core-js@1.2.6/library/modules/$.is-object.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var isObject = $__require('npm:core-js@1.2.6/library/modules/$.is-object.js');
  module.exports = function(it) {
    if (!isObject(it))
      throw TypeError(it + ' is not an object!');
    return it;
  };
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.a-function.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = function(it) {
    if (typeof it != 'function')
      throw TypeError(it + ' is not a function!');
    return it;
  };
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.ctx.js", ["npm:core-js@1.2.6/library/modules/$.a-function.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var aFunction = $__require('npm:core-js@1.2.6/library/modules/$.a-function.js');
  module.exports = function(fn, that, length) {
    aFunction(fn);
    if (that === undefined)
      return fn;
    switch (length) {
      case 1:
        return function(a) {
          return fn.call(that, a);
        };
      case 2:
        return function(a, b) {
          return fn.call(that, a, b);
        };
      case 3:
        return function(a, b, c) {
          return fn.call(that, a, b, c);
        };
    }
    return function() {
      return fn.apply(that, arguments);
    };
  };
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.set-proto.js", ["npm:core-js@1.2.6/library/modules/$.js", "npm:core-js@1.2.6/library/modules/$.is-object.js", "npm:core-js@1.2.6/library/modules/$.an-object.js", "npm:core-js@1.2.6/library/modules/$.ctx.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var getDesc = $__require('npm:core-js@1.2.6/library/modules/$.js').getDesc,
      isObject = $__require('npm:core-js@1.2.6/library/modules/$.is-object.js'),
      anObject = $__require('npm:core-js@1.2.6/library/modules/$.an-object.js');
  var check = function(O, proto) {
    anObject(O);
    if (!isObject(proto) && proto !== null)
      throw TypeError(proto + ": can't set as prototype!");
  };
  module.exports = {
    set: Object.setPrototypeOf || ('__proto__' in {} ? function(test, buggy, set) {
      try {
        set = $__require('npm:core-js@1.2.6/library/modules/$.ctx.js')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) {
        buggy = true;
      }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy)
          O.__proto__ = proto;
        else
          set(O, proto);
        return O;
      };
    }({}, false) : undefined),
    check: check
  };
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/es6.object.set-prototype-of.js", ["npm:core-js@1.2.6/library/modules/$.export.js", "npm:core-js@1.2.6/library/modules/$.set-proto.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var $export = $__require('npm:core-js@1.2.6/library/modules/$.export.js');
  $export($export.S, 'Object', {setPrototypeOf: $__require('npm:core-js@1.2.6/library/modules/$.set-proto.js').set});
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.core.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var core = module.exports = {version: '1.2.6'};
  if (typeof __e == 'number')
    __e = core;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/fn/object/set-prototype-of.js", ["npm:core-js@1.2.6/library/modules/es6.object.set-prototype-of.js", "npm:core-js@1.2.6/library/modules/$.core.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  $__require('npm:core-js@1.2.6/library/modules/es6.object.set-prototype-of.js');
  module.exports = $__require('npm:core-js@1.2.6/library/modules/$.core.js').Object.setPrototypeOf;
  return module.exports;
});

System.registerDynamic("npm:babel-runtime@5.8.38/core-js/object/set-prototype-of.js", ["npm:core-js@1.2.6/library/fn/object/set-prototype-of.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = {
    "default": $__require('npm:core-js@1.2.6/library/fn/object/set-prototype-of.js'),
    __esModule: true
  };
  return module.exports;
});

System.registerDynamic("npm:babel-runtime@5.8.38/helpers/inherits.js", ["npm:babel-runtime@5.8.38/core-js/object/create.js", "npm:babel-runtime@5.8.38/core-js/object/set-prototype-of.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var _Object$create = $__require('npm:babel-runtime@5.8.38/core-js/object/create.js')["default"];
  var _Object$setPrototypeOf = $__require('npm:babel-runtime@5.8.38/core-js/object/set-prototype-of.js')["default"];
  exports["default"] = function(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = _Object$create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };
  exports.__esModule = true;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
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

System.registerDynamic("npm:core-js@1.2.6/library/fn/object/define-property.js", ["npm:core-js@1.2.6/library/modules/$.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var $ = $__require('npm:core-js@1.2.6/library/modules/$.js');
  module.exports = function defineProperty(it, key, desc) {
    return $.setDesc(it, key, desc);
  };
  return module.exports;
});

System.registerDynamic("npm:babel-runtime@5.8.38/core-js/object/define-property.js", ["npm:core-js@1.2.6/library/fn/object/define-property.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = {
    "default": $__require('npm:core-js@1.2.6/library/fn/object/define-property.js'),
    __esModule: true
  };
  return module.exports;
});

System.registerDynamic("npm:babel-runtime@5.8.38/helpers/create-class.js", ["npm:babel-runtime@5.8.38/core-js/object/define-property.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var _Object$defineProperty = $__require('npm:babel-runtime@5.8.38/core-js/object/define-property.js')["default"];
  exports["default"] = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        _Object$defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  exports.__esModule = true;
  return module.exports;
});

System.registerDynamic("npm:babel-runtime@5.8.38/helpers/class-call-check.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports["default"] = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  exports.__esModule = true;
  return module.exports;
});

System.register("js/StateDb.js", ["npm:babel-runtime@5.8.38/helpers/create-class.js", "npm:babel-runtime@5.8.38/helpers/class-call-check.js"], function (_export) {
	var _createClass, _classCallCheck, __hotReload, StateDb;

	return {
		setters: [function (_npmBabelRuntime5838HelpersCreateClassJs) {
			_createClass = _npmBabelRuntime5838HelpersCreateClassJs["default"];
		}, function (_npmBabelRuntime5838HelpersClassCallCheckJs) {
			_classCallCheck = _npmBabelRuntime5838HelpersClassCallCheckJs["default"];
		}],
		execute: function () {
			"use strict";

			__hotReload = true;

			_export("__hotReload", __hotReload);

			StateDb = (function () {
				function StateDb(state, db) {
					_classCallCheck(this, StateDb);

					this.state = state;
					this.state.subscribe(this);
					this.db = db;
					this.name = this.constructor.name;
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
System.register("js/Section.js", ["npm:babel-runtime@5.8.38/helpers/get.js", "npm:babel-runtime@5.8.38/helpers/inherits.js", "npm:babel-runtime@5.8.38/helpers/class-call-check.js", "js/StateDb.js"], function (_export) {
	var _get, _inherits, _classCallCheck, StateDb, __hotReload, Section;

	return {
		setters: [function (_npmBabelRuntime5838HelpersGetJs) {
			_get = _npmBabelRuntime5838HelpersGetJs["default"];
		}, function (_npmBabelRuntime5838HelpersInheritsJs) {
			_inherits = _npmBabelRuntime5838HelpersInheritsJs["default"];
		}, function (_npmBabelRuntime5838HelpersClassCallCheckJs) {
			_classCallCheck = _npmBabelRuntime5838HelpersClassCallCheckJs["default"];
		}, function (_jsStateDbJs) {
			StateDb = _jsStateDbJs.StateDb;
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
					this.type = "section";
				}

				return Section;
			})(StateDb);

			_export("Section", Section);
		}
	};
});
System.register("js/container/dummy/DummySection.js", ["npm:babel-runtime@5.8.38/helpers/get.js", "npm:babel-runtime@5.8.38/helpers/inherits.js", "npm:babel-runtime@5.8.38/helpers/create-class.js", "npm:babel-runtime@5.8.38/helpers/class-call-check.js", "js/Section.js"], function (_export) {
  var _get, _inherits, _createClass, _classCallCheck, Section, __hotReload, DummySection;

  return {
    setters: [function (_npmBabelRuntime5838HelpersGetJs) {
      _get = _npmBabelRuntime5838HelpersGetJs["default"];
    }, function (_npmBabelRuntime5838HelpersInheritsJs) {
      _inherits = _npmBabelRuntime5838HelpersInheritsJs["default"];
    }, function (_npmBabelRuntime5838HelpersCreateClassJs) {
      _createClass = _npmBabelRuntime5838HelpersCreateClassJs["default"];
    }, function (_npmBabelRuntime5838HelpersClassCallCheckJs) {
      _classCallCheck = _npmBabelRuntime5838HelpersClassCallCheckJs["default"];
    }, function (_jsSectionJs) {
      Section = _jsSectionJs.Section;
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

          this.divDummy = this.div.append("div").attr("class", "dummy");
        }

        _createClass(DummySection, [{
          key: "stateChange",
          value: function stateChange(next, last) {

            if (next.loaded == !last.loaded) {
              console.log("init dummy");
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
System.register('index.js', ['js/StateMachine.js', 'js/DataBase.js', 'js/container/stream/StreamSection.js', 'js/container/dummy/DummySection.js'], function (_export) {
  'use strict';

  var StateMachine, DataBase, StreamSection, DummySection, __hotReload, state, db, streamSection, dummySection;

  return {
    setters: [function (_jsStateMachineJs) {
      StateMachine = _jsStateMachineJs.StateMachine;
    }, function (_jsDataBaseJs) {
      DataBase = _jsDataBaseJs.DataBase;
    }, function (_jsContainerStreamStreamSectionJs) {
      StreamSection = _jsContainerStreamStreamSectionJs.StreamSection;
    }, function (_jsContainerDummyDummySectionJs) {
      DummySection = _jsContainerDummyDummySectionJs.DummySection;
    }],
    execute: function () {
      __hotReload = true;

      _export('__hotReload', __hotReload);

      state = new StateMachine();
      db = new DataBase(state).load();
      streamSection = new StreamSection(state, db);
      dummySection = new DummySection(state, db);

      // let treemapContainer = new TreemapContainer(state, db);

      // import {Map} from './js/stream/Map'
      // import {StreamGraph} from './js/stream/StreamGraph'

      // import {BarList} from './js/stream/BarList'
      // import {Bookshelf} from './js/stream/Bookshelf'

      // // gabriel imports
      // import {classificationTags} from './data/classificationTags'
      // import {CirclePackedNetwork} from './js/network/CirclePackedNetwork'
      // import {NestedTreemap} from './js/treemap/NestedTreemap'

      // // globals
      // const margin = {'top':180,'right':50,'bottom':50,'left':50};

      // // global init and modules
      // let state = new StateMachine();
      // let db = new DataBase(state);

      // // chris modules init
      // let stream = new StreamGraph(state, db).init();

      // d3.select(".entities").selectAll("*").remove() // temp fix
      // let list1 = new BarList(state, db);
      // let list2 = new BarList(state, db).Key("schoollevels");
      // let list3 = new BarList(state, db).Key("publishers");
      // let list4 = new BarList(state, db).Key("places");
      // let bookshelf = new Bookshelf(state, db);

      // // gabriel modules init
      // // create a blacklist of tags to ignore because they are part of the classification
      // let blacklist = [];
      // d3.values(classificationTags).forEach( e1 => {
      //   d3.values(e1).forEach( e2 => {
      //     e2.forEach( e3 => {
      //       blacklist.push(e3);
      //     });
      //   });
      // });

      // d3.selectAll("#network-visualization").remove();

      // let network;

      // d3.csv("../data/data.csv", function (data) {
      // 	d3.csv("../data/geocode.csv", function (geocode) {

      //     // global init
      //     db.add("geocode", geocode);
      //     db.load(data, geocode);
      //     // db.merge(data, data2);
      //     state.push({ brushStart: db.extent[0], brushEnd: db.extent[1], keyframe:true })

      //   // chris init
      //   stream.x.domain(db.extent);
      //   stream.load().render();

      //   // gabriel init
      //   // network = new
      //   //   CirclePackedNetwork( {'margin':margin} )
      //   //   .bindDatabase(db)
      //   //   .bindStateMachine(state)
      //   //   .setBlacklist(blacklist)
      //   //   //.setBlacklist(["Deutschland"])
      //   //   .setNodeAccessor("RSWKTag")
      //   //   .setOccurrenceScale( d3.scaleLinear().domain([0,1]).range([0.5, 1.0])  )
      //   //   .append("#network")
      //   //   .updateData(db.dates.top(Infinity))
      //   //   .render();

      // 	})
      // })
    }
  };
});
//# sourceMappingURL=build.js.map