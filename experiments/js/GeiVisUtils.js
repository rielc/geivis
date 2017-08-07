import * as d3 from "./d3.js";

export function generateTagBundles (entries) {

	// extract all tags
	let allTags = [];

	// push all tags of every entry into the global array
	entries.forEach( e => { if (e.RSWKTag) { allTags.push(e.RSWKTag); } } );
	
	// reduce the duplicates
	let nodes = d3.set( d3.merge( allTags )).values();

	//
	let linkList = d3.map();

	// extract all links
	entries.forEach( function (e) {

	if (e.RSWKTag) {
		let tags = e.RSWKTag;
		//create a link for every connection 
		tags.forEach( function(tagA) {

		tags.forEach( function (tagB) {
			if (tagA != tagB) {
	          	// sort them to prevent duplications
				let tempLink = [tagA, tagB].sort(function (a, b) { if (a<b) { return 1;} else {return -1; } });
				let link = nodes.indexOf(tempLink[0])+"-"+nodes.indexOf(tempLink[1]);

				if (linkList.has(link)) {
					linkList.set(link, linkList.get(link) + 1);
				} else {
					linkList.set(link, 1);
				}
			}
			});
		});
	}

	});

	let r = linkList.keys().map( 
	function (l) { 
	  let s = l.split("-"); 

	  let parent = Number.parseFloat(s[0]);
		return { 
		    'source' : { 'key' : Number.parseFloat(s[0]), 'name' : Number.parseFloat(s[0]), 'parent' : parent },
		    'target' : { 'key' : Number.parseFloat(s[1]), 'name' : Number.parseFloat(s[1]), 'parent' : parent },
		    'strength': linkList.get(l)	
		};
	});

	//console.log({'nodes' : nodes.map(function (n) {return { 'name' : n} ;}), 'links': r });
	let output = {'nodes' : nodes.map(function (n) {return { 'name' : n} ;}), 'links': r };
	//console.log(output);
	return output;
}

export function generateLinksAndNodes (entries) {

	// extract all tags
	let allTags = [];

	// push all tags of every entry into the global array
	entries.forEach( e => { if (e.RSWKTag) { allTags.push(e.RSWKTag); } } );
	
	// reduce the duplicates
	let nodes = d3.set( d3.merge( allTags )).values();

	//
	let linkList = d3.map();

	// extract all links
	entries.forEach( function (e) {

	if (e.RSWKTag) {
		let tags = e.RSWKTag;
		//create a link for every connection 
		tags.forEach( function(tagA) {

		tags.forEach( function (tagB) {
			if (tagA != tagB) {
	          	// sort them to prevent duplications
				let tempLink = [tagA, tagB].sort(function (a, b) { if (a<b) { return 1;} else {return -1; } });
				let link = nodes.indexOf(tempLink[0])+"-"+nodes.indexOf(tempLink[1]);

				if (linkList.has(link)) {
					linkList.set(link, linkList.get(link) + 1);
				} else {
					linkList.set(link, 1);
				}
			}
			});
		});
	}

	});

	let r = linkList.keys().map( 
	function (l) { 
	  let s = l.split("-"); 
	  	return { 
		    'source' : Number.parseFloat(s[0]),
		    'target' : Number.parseFloat(s[1]),
		    'strength': linkList.get(l)	
		};
	});

	//console.log({'nodes' : nodes.map(function (n) {return { 'name' : n} ;}), 'links': r });
	let output = {'nodes' : nodes.map(function (n) {return { 'name' : n} ;}), 'links': r };
	//console.log(output);
	return output;
}

export function makeSafeForCSS (name) {
	return name.replace(/[^a-z0-9]/g, function(s) {
	    var c = s.charCodeAt(0);
	    if (c == 32) return '-';
	    if (c >= 65 && c <= 90) return '_' + s.toLowerCase();
	    return '__' + ('000' + c.toString(16)).slice(-4);
	});
}
