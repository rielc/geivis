export let __hotReload = true

import {Section} from '../../Section';
import {classificationTags} from '../../../data/classificationTags'
import {CirclePackedNetwork} from './CirclePackedNetwork'

export class NetworkSection extends Section {
  constructor(state, db){
    super(state,db);


  // gabriel modules init
  // create a blacklist of tags to ignore because they are part of the classification
  this.blacklist = []; 
  d3.values(classificationTags).forEach( e1 => {
    d3.values(e1).forEach( e2 => {
      e2.forEach( e3 => { 
        this.blacklist.push(e3);
      }); 
    });
  });

   this.div.append("div")
      .attr("class", "intro")
      .text("Cultural heritage institutions such as museums, archives, and libraries have been digitizing their inventories over the last two decades. The digitization process includes both the digital capture of the artifacts (for example via photography or 3d scanning) as well as the recording of the metadata about the artifact's historical context, material characteristics, and cultural significance. The main promises connected with digitization of cultural assets are long-term preservation and increased levels of access (Smith, 2002, pp.7). This paper is especially concerned with questions related to access, which so far has mostly relied on interface concepts from traditional information retrieval. However, there is an increased unease with a mode of access, which requires people to translate a possibly vague interest into a specific search query. Unlike museum exhibitions or library shelves that may lend themselves better to curiosity-driven browsing of cultural heritage, conventional search interfaces are arguable not particularly inviting. Instead, more 'generosity' is needed in the display of the artifacts' richness and their distribution in the collection")
 

    this.title.html(`All tags`);

    let oh = 0;
    oh+=parseInt(this.title.style("padding-top"));
    oh+=parseInt(this.title.style("padding-bottom"));
    oh+=parseInt(this.title.style("height"));
    this.margin = {'top':oh,'right':0,'bottom':0,'left':0};

    this.network = new
      CirclePackedNetwork( {'margin':this.margin} )
      .setBlacklist(this.blacklist)
      .setNodeAccessor("RSWKTag")
      .setOccurrenceScale( d3.scaleLinear().domain([0,1]).range([0.5, 1.0])  )
      .append(this.div);

  }

  stateChange(next, last){

    // init
    if (next.loaded != last.loaded) {
      this.network.updateData(this.db.date.top(Infinity))
      this.network.render("brushend");
    }

    if (!next.visible.NetworkSection) return;

    if (  next.brushStart !== last.brushStart
          || next.brushEnd !== last.brushEnd
          || next.visible.NetworkSection !== last.visible.NetworkSection ) {
        this.render(next, last);
    }
  }

  render(next, last){

    // this simple hack enables brushstart,brushmove and brushend events
    let event = (last.event != next.event && next.event == "brushmove") ? "brushstart" : next.event;

      let data = this.db.date.top(Infinity);
      if (data.length>0) {
        this.network.updateData(data);
        this.network.render(event);
      }
  }

}