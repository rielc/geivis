var request = require('request');
var parseString = require('xml2js').parseString;
var fs = require('fs');

var url = "http://sru.gbv.de/opac-de-bs78?version=1.1&operation=searchRetrieve&query=pica.sww%3Dschulbuch&maximumRecords=100&recordSchema=picaxml&startRecord=";
var recordOffset = 59501;


function scrape() {

	var requestOptions = {
	  url: url + recordOffset,
	  headers: {
	    'User-Agent': 'Scraper for GEI-Visualization / University of Applied Sciences Potsdam'
	  }
	};

	recordOffset += 100;

	request(requestOptions, requestCallback);

}


function requestCallback(error, response, body) {
  if (!error && response.statusCode == 200) {
  	parseString(body, function (err, result) {

		fs.writeFile("./data/" + recordOffset + ".json", JSON.stringify(result), function(err) {
		    if(err) {
		        return console.log(err);
		    }
		    console.log("Saved Records: " + recordOffset + " - " + (recordOffset+100));
		    
		    setTimeout(scrape, Math.floor(Math.random() * 1000));
		}); 

	});
  
  }
}

scrape();

