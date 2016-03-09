<?php

ini_set('memory_limit','512M');

// FACET INFO
// https://www.gbv.de/vgm/info/mitglieder/02Verbund/01Erschliessung/02Richtlinien/01KatRicht/pica3.pdf

// $levels = array();
// $subjects = array("Geschichtsunterricht", "Mathematikunterricht", "Geografieunterricht", "Deutschunterricht", "Sachunterricht");
// $schools = array("Gymnasium", "Grundschule");
// $countries = array("Deutschland", "Polen");
// $types = array("Schulbuch", "Elektronische Publikation", "Online-Publikation");

$books = array();

if($dh = opendir("../data/")){
    while(($file = readdir($dh)) != false) {

		$file_parts = pathinfo($file);

			if ($file_parts['extension'] == "json") {

				echo $file."\n";

				$d = json_decode(file_get_contents("../data/".$file), true);

				$records = $d["zs:searchRetrieveResponse"]["zs:records"][0]["zs:record"];
				
				if (count($records)>0) foreach ($records as $r) {

					$fields = $r["zs:recordData"][0]["record"][0]["datafield"];

					$book = array(
						"id"					=> null,
						// "title"				=> null,
						"year"				=> null,	
						"lang"				=> null,
						"publisher"		=> null,
						"isbn"				=> null,
						"authors"			=> array(),
						"tags"				=> array()
						// "types"				=> array(),
						// "levels"			=> array(),
						// "subjects" 		=> array(),
						// "schools"			=> array(),
						// "countries" 	=> array(),
						// "topics"			=> array()
					);
	
					foreach ($fields as $f) {
		
						$tag = $f["$"]["tag"];
						$props = $f["subfield"];
		
						// ID
						if ($tag=="003@") {
							$book["id"] = $props[0]["_"];
						}
						// YEAR
						else if ($tag=="011@") {
							$book["year"] = $props[0]["_"];
						}		
						// LANG
						else if ($tag=="010@") {
							$book["lang"] = $props[0]["_"];
						}		
						// // TITLE
						// else if ($tag=="021A") {
						// 	$book["title"] = $props[0]["_"];
						// }
						// PUBLISHER
						else if ($tag=="033A") {
							$book["publisher"] = $props[0]["_"].", ".$props[1]["_"];
						}
						// ISBN
						else if ($tag=="004A") {
							$book["isbn"] = $props[0]["_"];
						}
						// AUTHORS
						else if ($tag=="028A" || $tag=="028C") {
							$name = $props[0]["_"]." ".$props[1]["_"];
							array_push($book["authors"], $name);
						}		
						// TAGS
						else if ($tag=="044K") {
							$t = "";
							if ($props[1]["$"]["code"]=="a") $t = trim($props[1]["_"]);
							if ($props[2]["$"]["code"]=="a") $t = trim($props[2]["_"]);
							if ($props[3]["$"]["code"]=="a") $t = trim($props[3]["_"]);

							if ($t!="") array_push($book["tags"], $t);
			
							// if ( strpos($t, "Sekundarstufe")>-1 || strpos($t, "Schuljahr")>-1) array_push($book["levels"], $t);
							// else if (in_array($t, $subjects)) array_push($book["subjects"], $t);
							// else if (in_array($t, $schools)) array_push($book["schools"], $t);
							// else if (in_array($t, $countries)) array_push($book["countries"], $t);
							// else if (in_array($t, $types)) array_push($book["types"], $t);
							// else {
							// 	error_log(print_r($t, true));
							// 	array_push($book["topics"], $t);
							// }

						}
	
					}
	
					array_push($books, $book);
				}				
    }
	}
}


	
error_log(print_r($books, true));
	
file_put_contents("../data/books.json", json_encode($books));


?>