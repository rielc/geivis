console.log("is there someone");

import nestedTreemap from './src/nestedTreemap';

// define the initial nesting values
nestedTreemap.setLevelA("Schultyp");
nestedTreemap.setLevelB("Schullevel");

// add the nestings and accessor functions
nestedTreemap.addNesting("Schulfach", function (d) { return (d.subject==undefined) ? "Schulfach unbekannt" : d.subject });
nestedTreemap.addNesting("Schultyp", function levelA(d) { return (d.schooltype==undefined) ? "Schultyp unbekannt" : d.schooltype; });
nestedTreemap.addNesting("Schullevel", function (d) { return (d.schoollevel==undefined) ? "Schullevel unbekannt" : d.schoollevel });
nestedTreemap.addNesting("Ort", function (d) { return (d.publisher_city==undefined) ? "Ort unbekannt" : d.publisher_city; });
nestedTreemap.addNesting("Verlag", function (d) { return (d.publisher==undefined) ? "Verlag unbekannt" : d.publisher; });

// initialize with the selector of the parent element
nestedTreemap.init("#treemap");

// load the data 
nestedTreemap.loadData("../../data/better-data.json");