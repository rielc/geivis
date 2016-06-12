/* */ 
"format cjs";
export var name = "d3-zoom";
export var version = "0.0.2";
export var description = "";
export var keywords = ["d3","zoom","behavior","interaction"];
export var homepage = "https://github.com/d3/d3-zoom";
export var license = "BSD-3-Clause";
export var author = {"name":"Mike Bostock","url":"http://bost.ocks.org/mike"};
export var main = "build/d3-zoom.js";
export var repository = {"type":"git","url":"https://github.com/d3/d3-zoom.git"};
export var scripts = {"pretest":"rm -rf build && mkdir build && json2module package.json > build/package.js && rollup -g d3-dispatch:d3_dispatch,d3-interpolate:d3_interpolate,d3-selection:d3_selection,d3-transition:d3_transition -f umd -n d3_zoom -o build/d3-zoom.js -- index.js","test":"tape 'test/**/*-test.js' && eslint index.js src","prepublish":"npm run test && uglifyjs build/d3-zoom.js -c -m -o build/d3-zoom.min.js","postpublish":"VERSION=`node -e 'console.log(require(\"./package.json\").version)'`; git push && git push --tags && cp build/d3-zoom.js ../d3.github.com/d3-zoom.v0.0.js && cp build/d3-zoom.min.js ../d3.github.com/d3-zoom.v0.0.min.js && cd ../d3.github.com && git add d3-zoom.v0.0.js d3-zoom.v0.0.min.js && git commit -m \"d3-zoom ${VERSION}\" && git push && cd - && zip -j build/d3-zoom.zip -- LICENSE README.md build/d3-zoom.js build/d3-zoom.min.js"};
export var dependencies = {"d3-dispatch":"~0.4.3","d3-interpolate":"~0.7.0","d3-selection":"~0.7.2","d3-transition":"~0.2.8"};
export var devDependencies = {"eslint":"2","json2module":"0.0","rollup":"0.26","tape":"4","uglify-js":"2"};
