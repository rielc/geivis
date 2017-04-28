export let __hotReload = true

import {Section} from '../../Section';

export class AboutSection extends Section {

  constructor(state, db){
    super(state,db);

    this.title.text(`Über`);

    this.setIntro([
      'Die prototypischen Visualisierungen auf dieser Webseite sind an der Fachhochschule Potsdam im Urban Complexity Lab im Rahmen eines Forschungsprojektes mit dem Georg-Eckert-Institut für internationale Schulbuchforschung enstanden.',
      `Design und Entwicklung: Christopher Pietsch & Gabriel Credico
      <br>
Wissenschaftliche Leitung: Prof. Dr. Marian Dörk
<br>
Wissenschaftliche Betreuung seitens des GEI: 
Dr. Anke Hertling, Lena Stahn, Prof. Dr.-Ing. Ernesto William De Luca
<br><br>
Die Visualisierungen basieren auf GEI-Digital, Stand February 2017.`,
      ])
  }

  stateChange(next, pev){
  //  console.log(next.visible.GeomapSection);
  }

  render(){

  }

}