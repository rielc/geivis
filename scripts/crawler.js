// npm install xml2js, request

var request = require('request');
var fs = require('fs');
var parseString = require('xml2js').parseString;


// first query:
//var url = "http://sru.gbv.de/opac-de-bs78?version=1.1&operation=searchRetrieve&query=pica.sww%3Dschulbuch&maximumRecords=100&recordSchema=picaxml&startRecord=";
//var recordOffset = 59501;

// var url = "http://sru.gbv.de/opac-de-bs78?version=1.1&operation=searchRetrieve&query=pica.lsy=l000%20AND%20(pica.lsy=z100%20OR%20pica.lsy=z200)%20AND%20(pica.mak=A*%20OR%20(%20pica.mak=O*%20AND%20pica.abr=gd77%20)%20)&maximumRecords=100&recordSchema=picaxml&startRecord=";
var url = "http://sru.gbv.de/opac-de-bs78?version=1.1&operation=searchRetrieve&query=pica.abr=gd* NOT pica.mak=oc* &maximumRecords=100&recordSchema=picaxml&startRecord=";
var recordOffset = 1;


function scrape() {
	var requestOptions = {
	  url: url + recordOffset,
	  headers: {
	    'User-Agent': 'Scraper for GEI-Visualization / University of Applied Sciences Potsdam'
	  }
	};
	request(requestOptions, requestCallback);
}


function requestCallback(error, response, body) {
  if (!error && response.statusCode == 200) {
  	parseString(body, function (err, result) {
		fs.writeFile("../data/download/" + recordOffset + ".json", JSON.stringify(result, null, "\t"), function(err) {
		    if(err) {
		        return console.log(err);
		    }
		    console.log("Saved Records: " + recordOffset + " - " + (recordOffset+100));
		    // setTimeout(scrape, Math.floor(Math.random() * 1000));
		    recordOffset += 100;
		    scrape();
		}); 
	});
  }
}

scrape();
