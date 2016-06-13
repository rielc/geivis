/* */ 
"format cjs";
export var name = "d3-timer";
export var version = "0.4.4";
export var description = "An efficient queue capable of managing thousands of concurrent animations.";
export var keywords = ["d3","timer","transition","animation","requestAnimationFrame","setTimeout","setInterval"];
export var homepage = "https://github.com/d3/d3-timer";
export var license = "BSD-3-Clause";
export var author = {"name":"Mike Bostock","url":"http://bost.ocks.org/mike"};
export var main = "build/d3-timer.js";
export var repository = {"type":"git","url":"https://github.com/d3/d3-timer.git"};
export var scripts = {"pretest":"rm -rf build && mkdir build && json2module package.json > build/package.js && rollup -f umd -n d3_timer -o build/d3-timer.js -- index.js","test":"tape 'test/**/*-test.js' && eslint index.js src","prepublish":"npm run test && uglifyjs build/d3-timer.js -c -m -o build/d3-timer.min.js","postpublish":"VERSION=`node -e 'console.log(require(\"./package.json\").version)'`; git push && git push --tags && cp build/d3-timer.js ../d3.github.com/d3-timer.v0.4.js && cp build/d3-timer.min.js ../d3.github.com/d3-timer.v0.4.min.js && cd ../d3.github.com && git add d3-timer.v0.4.js d3-timer.v0.4.min.js && git commit -m \"d3-timer ${VERSION}\" && git push && cd - && zip -j build/d3-timer.zip -- LICENSE README.md build/d3-timer.js build/d3-timer.min.js"};
export var devDependencies = {"json2module":"0.0","rollup":"0.26","tape":"4","uglify-js":"2"};