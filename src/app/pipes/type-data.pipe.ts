import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeData'
})
export class TypeDataPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    switch (value) {
      case 'numeric':
        return 'Numérico';
        break;
      case 'paragraph':
        return 'Párrafo';
        break;
      case 'options':
        return 'Opciones';
        break;
      case 'text':
        return 'Texto';
        break;
      default:
        return null;
        break;
    }
  }

}
