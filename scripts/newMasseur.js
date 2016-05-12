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

// debugger;

var fs = require("fs");

var pathToDataFiles = "../data/raw2/";
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



var keywordClasses = {
	"subject" : {
		"u010" : ["Muttersprachlicher  Unterricht"],
		"u011" : ["Erstleseunterricht"],
		"u020" : ["Deutschunterricht"],
		"u030" : ["Geographieunterricht", "Erdkundeunterricht", "Landeskunde", "Regionalkunde", "Heimatkundeunterricht", "Geografieunterricht"],
		"u050" : ["Geschichtsunterricht"],
		"u060" : ["Realien"],
		"u070" : ["Sozialkundeunterricht","Gemeinschaftskunde", "Sozialkunde <Unterricht>","Soziallehreunterricht", "Sozialunterricht","Sozialwissenschaften / Unterricht","Sozialwissenschaftlicher Unterricht","Gesellschaftslehreunterricht","Gesellschaftskunde","Politischer Unterricht","Gegenwartskunde", "Politikunterricht","Staatsbürgerkunde", "Staatskunde <Unterrichtsfach>","Politische Bildung","Politische Erziehung/ Pädagogik","Politik, Gesellschaft, Wirtschaft","Rechtskundeunterricht","Recht / Politischer Unterricht", "Rechtsunterricht","Wirtschaftslehre","Wirtschafts- und Rechtslehre","Wirtschaft und Recht <Unterrichtsfach>","Wirtschafts- und Rechtskundeunterricht"],
		"u075x": ["Sachunterricht","Sachkundeunterricht","Heimatkundeunterricht"],
		"u09x" : ["Werterziehung","Lebensgestaltung – Ethik – Religionskunde","Humanistische Lebenskunde","Natur-Mensch-Mitwelt"],	
		"u091" : ["Ethikunterricht"],
		"u092" : ["Philosophieunterricht", "Praktische Philosophie"],
		"u093" : ["Religionsunterricht","Evangelischer Religionsunterricht","Christenlehre","Islamischer Religionsunterricht","Jüdischer Religionsunterricht","Israelitischer Religionsunterricht","Bibelunterricht","Katholischer Religionsunterricht","Orthodoxer Religionsunterricht","Russisch-orthodoxer Religionsunterricht","Russisch-orthodoxe Kirche","Syrisch-Orthodoxer Religionsunterricht","Jakobitische Kirche","Interreligiöses Lernen","Interkulturelle Erziehung"]
	},
	"schooltype" : {
		"s00" : ["Grundschule"],
		"s01" : ["Orientierungsstufe", "Förderstufe"],
		"s02" : ["Hauptschule","Volksschule","Einklassige Schule","Zweiklassige Schule","Halbtagsschule","Landschule"],
		"s03" : ["Mittelschule","Realschule","Regionale Schule"],
		"s04" : ["Realschule", "Mittlere-Reife-Zug"],
		"s05" : ["Gymnasium", "Oberstufe", "Achtjähriges Gymnasium", "Höhere Schule", "Fachgymnasium", "Berufliches Gymnasium", "Abendgymnasium", "Kolleg"],
		"s06" : ["Gesamtschule", "Integrierte Gesamtschule", "Kooperative Gesamtschule"],
		"s07" : ["Berufsbildende Schule", "Berufsbildende Höhere Schule", "Berufsbildende Mittlere Schule", "Berufsfachschule", "Berufsgrundbildungsjahr", "Berufliches Gymnasium", "Berufskolleg", "Berufsoberschule", "Berufsschule", "Fachoberschule", "Fortbildungsschule", "Gewerbeschule", "Gewerbliche Berufsfachschule", "Gewerbliche Fortbildungsschule", "Heeres-Unteroffiziervorschule", "Handelsakademie (HAK)", "Handelsschule (HAS)", "Höhere Berufsfachschule", "Höhere Handelsschule", "Höhere Lehranstalt für wirtschaftliche Berufe (HLW)", "Höhere Lehranstalt für Tourismus (HLT)", "Höhere technische Lehranstalt (HTL)", "Kaufmännische Fortbildungsschule", "Marineschule", "Militärschule", "Technikerschule (Technikum)", "Technisches Gymnasium", "Wirtschaftsgymnasium"],
		"s09" : ["Sonderschule","Lernbehindertenschule","Förderschule"],
		"s10" : ["Lehrerbildungsanstalt","Lehrerseminar","Lehrerinnenseminar","Deutsche Auslandsschule","Polytechnische Oberschule","Schule der Freundschaft"]
	},
	"schoollevel" : {
		"k01" : ["Grundschule","Elementarbereich","Eingangsstufe"],
		"k02" : ["Sekundarstufe 1","Polytechnische Oberschule"	,"POS –, Allgemeinbildende zehnjährige polytechnische Oberschule der DDR","Polytechnische Oberschule", "Unterstufe","Allgemein bildende höhere Schule","(AHS) in Österreich","Neue Mittelschule","(NMS) in Österreich"],
		"k03" : ["Sekundarstufe 2","Reifeprüfung","Mündliche Reifeprüfung","Schriftliche Reifeprüfung","Erweiterte Oberschule","EOS","Abiturstufe","High School","College"],
		"k05" : ["Berufliche Bildungsgänge","Berufsbildende Schule", "Berufsbildende Höhere Schule", "Berufsbildende Mittlere Schule", "Berufsfachschule", "Berufsgrundbildungsjahr", "Berufliches Gymnasium", "Berufskolleg", "Berufsoberschule", "Berufsschule", "Fachoberschule", "Fortbildungsschule", "Gewerbeschule", "Gewerbliche Berufsfachschule", "Gewerbliche Fortbildungsschule", "Heeres-Unteroffiziervorschule", "Handelsakademie (HAK)", "Handelsschule (HAS)", "Höhere Berufsfachschule", "Höhere Handelsschule", "Höhere Lehranstalt für wirtschaftliche Berufe (HLW)", "Höhere Lehranstalt für Tourismus (HLT)", "Höhere technische Lehranstalt (HTL)", "Kaufmännische Fortbildungsschule", "Marineschule", "Militärschule", "Technikerschule (Technikum)", "Technisches Gymnasium", "Wirtschaftsgymnasium"],
		"k06" : ["Tertiärbereich","Hochschulbildung","College","Erwachsenenbildung","Selbststudium","Selbstunterricht"]
	},
	"keyword" : {
		"all" : ["Audiovisuelle Medien","Aufgabe","Beurteilung","Bildung","Bildungsinhalt","Bildungskanon","Bildungspolitik","Bildungsstandard","Bildungswesen","Bildungssystem","Computerunterstützer Unterricht","Computerunterstützes Lernen","Curriculum","Curriculumentwicklung","Curriculumforschung","Curriculumplanung","Curriculumreform","Didaktik","E-Learning","Elektronische Bibliothek","Fähigkeit (Kompetenz)","Hausunterricht („Homeschooling“)","Interaktive Medien","Jahrgangsübergreifender Unterricht","Klassenlektüre","Kompetenzorientierter Unterricht","Lehrbuch","Lehrerhandbuch","Lehrplan","Lehrplanentwicklung","Lehrplanforschung","Lehrplanreform","Leistungsbeurteilung","Lernaufgabe","Lerngruppe","Lernmittelfreiheit","Lernprogramm","Mündliche Prüfung","Mündliche Reifeprüfung","Neue Medien","Online-Medien","Open educational Resources","Paratext","Schlüsselqualifikation","Schriftliche Prüfung","Schriftliche Reifeprüfung","Schule","Schulbildung","Schüler","Einstellung","Selbstgesteuertes Lernen","Selbstunterricht","Sprachlehrbuch","Stoffverteilungsplan","Unterricht","Unterrichtsfilm","Elektronisches Buch","Interaktive Medien","OER – Open Educational Resources","E-Learning","Open Source","Access","Fibel","Lehrbuch","Lehrmittel","Lesebuch","Schulatlas","Schulbuch","Auswahl","Autor","Buchproduktion","Entwicklung","Gestaltung","Illustration","Bild","Bildsprache","Reproduktion","Schulbuchverlag","Textverstehen","Verwendung","Historische Bildungsforschung","Unterrichtsforschung","Kontroverse","Kriterium","Methode","Methodologie","Schulbuch","Schulbuchanalyse","Schulbuchempfehlung","Schulbuchforschung","Schulbuchrevision","Schulbuchzulassung","Genehmigungsverfahren","Vergleich","Wirkung","Christentum","Demokratie","Deutschlandbild","Deutschlandbild Bundesrepublik","Deutschlandbild DDR","Drittes Reich","Erinnerung","Ethnische Identität","Europabild","Faschismus","Feindbild","Fremdbild","Geschichte","Geschichtsbewusstsein","Geschichtsbild","Geschichtsschreibung","Geschlechterbeziehung","Geschlechterrolle","Geschlechterstereotyp","Geschlechtsunterschied","Globalisierung","Grenzüberschreitende Kooperation","Islam","Islambild","Kollektives Gedächtnis","Kompetenzorientierung","Fähigkeit","Lernziel","Schlüsselqualifikation","Konflikt","Konfliktregelung","Mediation","Menschenrecht","Narrativität","Nation","Nationenbildung","Nationale (Ethnische) Minderheit","Nationalbewusstsein","Nationalismus","Nationalsozialismus","Osteuropabild","Politische Identität (Nationale Identität)","Postkommunismus","Regionale Identität","Schreib- und Lesefähgkeit","Schwarze","Selbstbild","Sprachanalyse","Türkeibild","Vergangenheitsbewältigung","Versöhnung","Völkerverständigung","Vorurteil","Council of Europe","UNESCO"]
	}
};


function updateClassification(tag, book) {
  for (var classification in keywordClasses ) {
    if ( keywordClasses.hasOwnProperty(classification) ) {
      for (var detail in keywordClasses[classification] ) {
      	if (detail == tag) {
      		book[classification] = keywordClasses[classification][detail][0];
      	}
      }
    }
  }
}

// finishes the program once all files are loaded/parsed
function loop() {
	if (loadedFiles == fileNames.length-1) {
		var total = books;
		fs.writeFile("../data/better-data.json", JSON.stringify(total), function () { clearInterval(interval);});
		console.log("Finished!");
	}
}

// loads the files… huh?
function loadFiles (error, fn) {
	fileNames = fn;
	// loop through all files in dir
	for (var i=0; i<fileNames.length; i++) {
		var file = fileNames[i];
		if (file != '.DS_Store' ) { rfClosure(file); }
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

			// https://www.gbv.de/vgm/info/mitglieder/02Verbund/01Erschliessung/02Richtlinien/01KatRicht/pica3.pdf
			// Documentation of the facets

			// these fields hold the values for the new generated book-data
			// ID (omitted) , l-anguage , y-ear , p-ublisher , t-ags
			var newBook = { };

			// iteratate through all facets
			book.forEach( function (facet) {

				//console.log(facet);

				var type = facet['$'].tag;
				var subfield = facet.subfield;
				
				/* if (type == "003@") { newBook.id = subfield[0]._; } */ // ID
				if (type == "010@") { newBook.language = subfield[0]._; } // language
				if (type == "011@") { newBook.year = subfield[0]._; } // year

				// city (?) + publisher
				if (type == "033A") { 
					newBook.publisher_city = subfield[0]._;
					if (subfield[1] != undefined) {
						newBook.publisher = subfield[1]._;
					}
				}

				// read the local classification and set it as field if exisiting
				if (type == "145Z") {
					if (subfield[0]._ != "" && subfield[0]._ != undefined) {
						if ( !updateClassification( subfield[0]._, newBook) ) {
							if (newBook.unknownlocaleTags == undefined) { newBook.unknownLocalTags = []; }
							newBook.unknownLocalTags.push(subfield[0]._);
						}
					}
				}
				/*
				// tags
				if (type == "044K") {
					// the tags are organized in subfields ... 
					subfield.forEach( function (tField) {
						if (tField['$'].code == 'a') { 
							newBook.t.push( add( "t", tField._.trim() ) ); 
						}
					});
				}
				*/
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
