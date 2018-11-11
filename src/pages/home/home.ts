import { IContacts } from './../../models/data-source.model';
import { GetContactsProvider } from './../../providers/get-contacts/get-contacts';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  Contactos: IContacts[][];
  TipoCliente: string = 'Generales';

  constructor(public navCtrl: NavController,
    public getContactsProvider: GetContactsProvider) {
    this.Contactos = getContactsProvider.getFilteredContactsByCrm();

    this.Contactos.forEach( grupo => {
      console.log(`----------------------------------------------------------`);
      grupo.forEach( contacto => {
        console.log( `${ contacto.razonSocial }: ${ contacto.potencial }`)
      });
    });
  }

}
