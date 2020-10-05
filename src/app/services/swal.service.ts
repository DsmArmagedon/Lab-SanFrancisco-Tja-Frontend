import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

interface IParameters {
  name: string;
  title: string;
  verb: string;
}

@Injectable({
  providedIn: 'root'
})
export class SwalService {
  constructor() { }
  deleteOptions(name: string, title: string): {} {
    return this.options({ name: name, title: title, verb: 'Eliminar' });
  }
  deleteLoad(title: string): void {
    this.load(title, 'Eliminando');
  }

  revokeRestoreLoad(title: string, type: string): void {
    let typeVerb: string;
    switch (type) {
      case 'revoke':
        typeVerb = 'Anulando';
        break;
      case 'restore':
        typeVerb = 'Restaurando';
        break;
    }
    this.load(title, typeVerb);
  }

  load(title: string, type: string) {
    Swal.fire({
      title: `${type} ${title}`,
      text: 'Por Favor Espere...',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    })

  }

  revokeRestoreOptions(name: string, title: string, option: string): {} {
    return this.options({ name: name, title: title, verb: option });
  }


  private options(parameters: IParameters): {} {
    return {
      title: `¿Esta seguro que desea ${parameters.verb}?`,
      text: parameters.title + ': ' + parameters.name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: parameters.verb,
      cancelButtonText: 'Cancelar',
    }
  }
}
