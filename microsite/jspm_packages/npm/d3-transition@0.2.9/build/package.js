/* */ 
"format cjs";
export var name = "d3-transition";
export var version = "0.2.9";
export var description = "Animated transitions for D3 selections.";
export var keywords = ["d3","dom","transition","animation"];
export var homepage = "https://github.com/d3/d3-transition";
export var license = "BSD-3-Clause";
export var author = {"name":"Mike Bostock","url":"http://bost.ocks.org/mike"};
export var main = "build/d3-transition.js";
export var repository = {"type":"git","url":"https://github.com/d3/d3-transition.git"};
export var scripts = {"pretest":"rm -rf build && mkdir build && json2module package.json > build/package.js && rollup -f umd -g d3-color:d3_color,d3-interpolate:d3_interpolate,d3-ease:d3_ease,d3-dispatch:d3_dispatch,d3-selection:d3_selection,d3-timer:d3_timer -n d3_transition -o build/d3-transition.js -- index.js","test":"tape 'test/**/*-test.js' && eslint index.js src test","prepublish":"npm run test && uglifyjs build/d3-transition.js -c -m -o build/d3-transition.min.js","postpublish":"VERSION=`node -e 'console.log(require(\"./package.json\").version)'`; git push && git push --tags && cp build/d3-transition.js ../d3.github.com/d3-transition.v0.2.js && cp build/d3-transition.min.js ../d3.github.com/d3-transition.v0.2.min.js && cd ../d3.github.com && git add d3-transition.v0.2.js d3-transition.v0.2.min.js && git commit -m \"d3-transition ${VERSION}\" && git push && cd - && zip -j build/d3-transition.zip -- LICENSE README.md build/d3-transition.js build/d3-transition.min.js"};
export var dependencies = {"d3-color":"~0.4.0","d3-dispatch":"~0.4.0","d3-ease":"~0.7.0","d3-interpolate":"~0.7.0","d3-selection":"~0.7.0","d3-timer":"~0.4.0"};
export var devDependencies = {"eslint":"2","json2module":"0.0","rollup":"0.26","jsdom":"9","tape":"4","uglify-js":"2"};
