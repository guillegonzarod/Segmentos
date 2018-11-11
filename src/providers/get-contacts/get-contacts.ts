import { Injectable } from '@angular/core';
// Importaciones:
import { CONTACTOS, IContacts } from './../../models/data-source.model';
import { ToastController } from 'ionic-angular';

@Injectable()
export class GetContactsProvider {

  // Propiedades:
  dataS: IContacts[] = [];
  contactosGenerales: IContacts[] = [];
  contactosPotenciales: IContacts[] = [];
  contactos: IContacts[][] = [];

  // Constructores:
  constructor(public toastCtrl: ToastController) {
    this.dataS = this.getOrderedContacts(CONTACTOS.slice(0));
  }

  // Métodos:
  showToast(position: string, mensaje: string): void {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: position
    });

    toast.present(toast);
  }

  getOrderedContacts(contactos: IContacts[]): IContacts[] {
    contactos.sort((contactoA, contactoB) => {
      return contactoA.razonSocial.localeCompare(contactoB.razonSocial);
    });

    return contactos;
  }

  getFilteredContactsByCrm(): IContacts[][] {

    this.dataS.filter((contacto) => {
      if (contacto.potencial) {
        this.contactosPotenciales.push(contacto);
      } else {
        this.contactosGenerales.push(contacto);
      }
    });

    this.contactos.push(this.contactosGenerales);
    this.contactos.push(this.contactosPotenciales);

    return this.contactos;
  }
}
