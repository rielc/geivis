const translations = {
	'subjects': { 
		de: 'Schulfächer'
	},
	'schoollevels' : {
		de: 'Bildungslevel'
	},
	'publishers': { 
		de: 'Verlage'
	},
	'places': { 
		de: 'Verlagsorte'
	}
}


export function translate(text, lang) {

	const translated = translations[text];

	if(!translated){
		console.warn(text, "is not translated");
	 	return text;
	}

	return translated[lang] || text;
}