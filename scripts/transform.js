var fs = require("fs");

var bookData = require('../data/normalized-books2.json');
var keywordClasses = require('../data/keyword-classes.json');



function classification (keyword) {
  var r = undefined;
  for (var classification in keywordClasses ) {
    if ( keywordClasses.hasOwnProperty(classification) ) {
      for (var type in keywordClasses[classification] ) {
        if ( keywordClasses[classification].hasOwnProperty(type) ) {
          if (keywordClasses[classification][type].indexOf(keyword) != -1) {
            r = {"classification" : classification, "type" : type};
          }
        }
      }
    }
  }
  return r;
}

function getClassification (keywords) {
  var cl = {};
  if (keywords.length > 0 ) {
    keywords.forEach(function (k) {
      if (classification(k) != undefined) {
        if (cl == undefined) { cl = {}; }
        var tmp = classification(k);
        cl[tmp.classification] = keywordClasses[tmp.classification][tmp.type][0];
      }
    })
  }
  return cl;

};


var fields = bookData.fields;
var books = bookData.books;
var data = books.map(function (d) {
    return { 
      "year" : fields.y[d.y],
      "lang" : fields.l[d.l],
      "tags" : d.t.map(function (t) { return fields.t[t]; }),
      "publisher" : fields.p[d.p], 
      "classification" : getClassification( d.t.map( function (t) { return fields.t[t]; }) )
    }; 
  });

// console.log(data.length);
// console.log(books.length);


fs.writeFile("../data/data.json", JSON.stringify(data));


