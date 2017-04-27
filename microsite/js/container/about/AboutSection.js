export let __hotReload = true

import {Section} from '../../Section';

export class AboutSection extends Section {

  constructor(state, db){
    super(state,db);

    this.title.text(`Über`);

    this.setIntro(
      ['Die Visualisierung bezieht sich auf Verlagsorte in der Schulbuchsammlung GEI-Digital. Wählen Sie durch Ziehen mit gedrückter Maustaste auf der Zeitleiste eine Zeitspanne aus und es wird Ihnen die entsprechende geographische Verteilung der Verlagsorte angezeigt.','Die Größe der Blasen repräsentiert die Menge der Bücher, die an dem jeweiligen Verlagsort veröffentlicht wurden. Klicken Sie auf eine der Blasen, dann gelangen Sie zu den in GEI-Digital vorhandenen Schulbüchern. Start- und Endzeit können durch Doppelklick auf der Zeitleiste neu ausgewählt werden.'])
  }

  stateChange(next, pev){
  //  console.log(next.visible.GeomapSection);
  }

  render(){

  }

}