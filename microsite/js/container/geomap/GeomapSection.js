export let __hotReload = true

import {Section} from '../../Section';
import {Geomap} from './Geomap';

export class GeomapSection extends Section {

  constructor(state, db){
    super(state,db);

    this.title.text(`Places`);
    this.div.append("div")
      .attr("class", "intro")
      .text("Cultural heritage institutions such as museums, archives, and libraries have been digitizing their inventories over the last two decades. The digitization process includes both the digital capture of the artifacts (for example via photography or 3d scanning) as well as the recording of the metadata about the artifact's historical context, material characteristics, and cultural significance. The main promises connected with digitization of cultural assets are long-term preservation and increased levels of access (Smith, 2002, pp.7). This paper is especially concerned with questions related to access, which so far has mostly relied on interface concepts from traditional information retrieval. However, there is an increased unease with a mode of access, which requires people to translate a possibly vague interest into a specific search query. Unlike museum exhibitions or library shelves that may lend themselves better to curiosity-driven browsing of cultural heritage, conventional search interfaces are arguable not particularly inviting. Instead, more 'generosity' is needed in the display of the artifacts' richness and their distribution in the collection")
    this.geomap = new Geomap(state,db, this.div.append("div"))
    //this.geomap.outerHeight = this.height;
    this.geomap.init();
  }


  stateChange(next, pev){
  //	console.log(next.visible.GeomapSection);

  	if(next.visible.GeomapSection != pev.visible.GeomapSection){
  	  console.log("GeomapSection", next.visible.GeomapSection);
  	}
  }

  render(){

  }

}