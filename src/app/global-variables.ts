export const PUT = 'put';
export const GET = 'get';
export const POST = 'post';
export const DELETE = 'delete';
export const METHOD = '_method';
export const UPDATE = 'update';
export const STORE = 'store';
export const INDEX = 'index';
export const SHOW = 'show';
export const DOCUMENTS = [
  {
    id: 'factura',
    name: 'FACTURA'
  },
  {
    id: 'recibo',
    name: 'RECIBO'
  },
  {
    id: 'nota de venta',
    name: 'NOTA DE VENTA'
  },
  {
    id: 'cheque',
    name: 'CHEQUE'
  },
  {
    id: 'otro',
    name: 'OTRO'
  }
]
export const OBJECT_TYPE_DATA = {
  texto: 'texto',
  parrafo: 'parrafo',
  numerico: 'numerico',
  opciones: 'opciones'
}
export const TYPE_DATA = [
  {
    id: OBJECT_TYPE_DATA.texto,
    name: 'Texto'
  },
  {
    id: OBJECT_TYPE_DATA.numerico,
    name: 'Numérico'
  },
  {
    id: OBJECT_TYPE_DATA.parrafo,
    name: 'Párrafo'
  },
  {
    id: OBJECT_TYPE_DATA.opciones,
    name: 'Opciones'
  }
]
export type KindHttp = 'post' | 'put' | 'delete' | 'get';