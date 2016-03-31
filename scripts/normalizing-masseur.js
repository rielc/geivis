/*

Gives a normalized output which looks something like:

{ 
	books: [book-with-normalized-fields], 
	fields : { categorys:[fields-in-category] }
}

More Detail:
                                          BOOK
{
	books : [ … , {"l":12,"y":76,"p":[8271],"t":[1,20,454,2]}, … ],
	fields : { …, "t": ["Weltkrieg","Geschichtsunterricht","Schulbuch","Deutschunterricht",…] , …}
}
							TAGs defined in dictionary "t"	

	Currenty Dictionaries: ID (omitted) , l-anguage , y-ear , p-ublisher , t-ags

*/

var fs = require("fs");

var pathToDataFiles = "../data/raw/";
var interval;

var fileNames = [];


var books = []; // this array stores all the noramalized data
var stringDB = {}; // this object stores all the unique strings, structured by categegories

var parsedBooks = 0;
var loadedFiles = 0;

// adds the word to category and/or returns the ID of the word in category. it also creates a new dictionary if category does not exist. 
function add(category, string) {
	// create category
	if (stringDB[category] == undefined) { stringDB[category] = []; }
	// add string / get ID
	if (stringDB[category].indexOf(string) == -1) {
		stringDB[category].push(string);
		return (stringDB[category].length-1);
	} else { return stringDB[category].indexOf(string);}

}

// return the string from the chosen dictionary
function find(category, id) { return stringDB[category][id]; }

// accessor function
function returnBookID (entry) { return entry.id;}

// finishes the program once all files are loaded/parsed
function loop() {
	if (loadedFiles == fileNames.length-2) {
		var total = {'books' : books, 'fields' : stringDB};
		fs.writeFile("./normalizedBooks.json", JSON.stringify(total), function () { clearInterval(interval);});
		console.log("Finished!");
	}
}

// loads the files… huh?
function loadFiles (error, fn) {
	fileNames = fn;
	// loop through all files in dir
	for (var i=0; i<fileNames.length; i++) {
		var file = fileNames[i];
		if (file != '.DS_Store' && file != 'books.json' ) { rfClosure(file); }
	}
}

// closure for reading files with given string
function rfClosure (file) { fs.readFile(pathToDataFiles+file, 'utf8', function (error,data) { parseFile(data, file); });}

// callback which parses the content of the loaded file
function parseFile (content, file) {

	console.log("Parsed " + parsedBooks +" Books in " + loadedFiles +  " of " +  (fileNames.length-2) + " files.");

	// if the data actually exists         D:
	if (JSON.parse(content)['zs:searchRetrieveResponse']['zs:records'] != undefined) {
		// query through the overlong path to every entry and return only the useful facets (map)
		var data = JSON.parse(content)['zs:searchRetrieveResponse']['zs:records'][0]['zs:record'].map( function(d) { return d['zs:recordData'][0]['record'][0].datafield;  });

		// for every book
		data.forEach( function (book) {

			// these fields hold the values for the new generated book-data
			// ID (omitted) , l-anguage , y-ear , p-ublisher , t-ags
			var newBook = { /*id:"",*/ l:[], y:"", p:[], t:[] };

			// iteratate through all facets
			book.forEach( function (facet) {

				var type = facet['$'].tag;
				var subfield = facet.subfield;
				
				/* if (type == "003@") { newBook.id = subfield[0]._; } */ // ID
				if (type == "010@") { newBook.l = add("l", subfield[0]._) } // language
				if (type == "011@") { newBook.y = add("y", subfield[0]._); } // year

				// city (?) + publisher
				if (type == "033A") { var p = (subfield[1] != undefined) ? (subfield[0]._ + "," + subfield[1]._) : subfield[0]._; newBook.p.push(add("p", p)); }
				
				// tags
				if (type == "044K") {
					// the tags are organized in subfields ... 
					subfield.forEach( function (tField) {
						if (tField['$'].code == 'a') { 
							newBook.t.push( add( "t", tField._.trim() ) ); 
						}
					});
				}
			});

			// adding the books based on their uniqueness inside the list … needs ID!
			/* if (books.map(returnBookID).indexOf(newBook.id) == -1 ) { books.push(newBook); } */

			// add the book
			books.push(newBook);
			parsedBooks++;
		});
	}
	loadedFiles++;
}

// ready, set... go!
interval = setInterval(loop, 100);
fs.readdir(pathToDataFiles, loadFiles);
