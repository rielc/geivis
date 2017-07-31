export let __hotReload = true

import {Section} from '../../Section';

export class AboutSection extends Section {

  constructor(state, db){
    super(state,db);

    this.title.text(`Über`);

    this.setIntro([
      'Die prototypischen Visualisierungen auf dieser Webseite sind an der <a href="http://www.fh-potsdam.de/">Fachhochschule Potsdam</a> im <a href="http://uclab.fh-potsdam.de">Urban Complexity Lab</a> im Rahmen eines Forschungsprojektes mit dem <a href="http://www.gei.de/">Georg-Eckert-Institut</a> für internationale Schulbuchforschung entstanden.', 'Design und Entwicklung: <a href="https://chrispie.com/">Christopher Pietsch</a> & <a href="http://www.gabrielcredico.de/">Gabriel Credico</a>\n      <br>\nWissenschaftliche Leitung: Prof. Dr. Marian Dörk\n<br>\nWissenschaftliche Betreuung seitens des GEI: \nDr. Anke Hertling, Lena Stahn, Prof. Dr.-Ing. Ernesto William De Luca\n<br><br>\nDie Visualisierungen basieren auf <a href="http://gei-digital.gei.de/">GEI-Digital</a>, Stand February 2017.',
      ])
  }

  stateChange(next, pev){
  //  console.log(next.visible.GeomapSection);
  }

  render(){

  }

}