
// import my module
import {nestedTreemap as ntr} from "./src/nestedTreemap.js";
console.log(ntr);

// define the initial nesting values
ntr.setLevelA("Schultyp");
ntr.setLevelB("Schullevel");

// add the nestings and accessor functions
ntr.addNesting("Schulfach", function (d) { return (d.subject==undefined) ? "Schulfach unbekannt" : d.subject });
ntr.addNesting("Schultyp", function levelA(d) { return (d.schooltype==undefined) ? "Schultyp unbekannt" : d.schooltype; });
ntr.addNesting("Schullevel", function (d) { return (d.schoollevel==undefined) ? "Schullevel unbekannt" : d.schoollevel });
ntr.addNesting("Ort", function (d) { return (d.publisher_city==undefined) ? "Ort unbekannt" : d.publisher_city; });
ntr.addNesting("Verlag", function (d) { return (d.publisher==undefined) ? "Verlag unbekannt" : d.publisher; });

// initialize with the selector of the parent element
ntr.init("#treemap");

// load the data 
ntr.loadData("../../data/better-data.json");