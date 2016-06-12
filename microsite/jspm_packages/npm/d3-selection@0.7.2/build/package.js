/* */ 
"format cjs";
export var name = "d3-selection";
export var version = "0.7.2";
export var description = "Data-driven DOM manipulation: select elements and join them to data.";
export var keywords = ["d3","dom","selection","data-join"];
export var homepage = "https://github.com/d3/d3-selection";
export var license = "BSD-3-Clause";
export var author = {"name":"Mike Bostock","url":"http://bost.ocks.org/mike"};
export var main = "build/d3-selection.js";
export var repository = {"type":"git","url":"https://github.com/d3/d3-selection.git"};
export var scripts = {"pretest":"rm -rf build && mkdir build && json2module package.json > build/package.js && rollup -f umd -n d3_selection -o build/d3-selection.js -- index.js","test":"tape 'test/**/*-test.js' && eslint index.js src","prepublish":"npm run test && uglifyjs build/d3-selection.js -c -m -o build/d3-selection.min.js","postpublish":"VERSION=`node -e 'console.log(require(\"./package.json\").version)'`; git push && git push --tags && cp build/d3-selection.js ../d3.github.com/d3-selection.v0.7.js && cp build/d3-selection.min.js ../d3.github.com/d3-selection.v0.7.min.js && cd ../d3.github.com && git add d3-selection.v0.7.js d3-selection.v0.7.min.js && git commit -m \"d3-selection ${VERSION}\" && git push && cd - && zip -j build/d3-selection.zip -- LICENSE README.md build/d3-selection.js build/d3-selection.min.js"};
export var devDependencies = {"json2module":"0.0","rollup":"0.26","jsdom":"8","tape":"4","uglify-js":"2"};
