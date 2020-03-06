import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeData'
})
export class TypeDataPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    switch (value) {
      case 'numerico':
        return 'Numérico';
        break;
      case 'parrafo':
        return 'Párrafo';
        break;
      case 'opciones':
        return 'Opciones';
        break;
      case 'texto':
        return 'Texto';
        break;
      default:
        return null;
        break;
    }
  }

}
