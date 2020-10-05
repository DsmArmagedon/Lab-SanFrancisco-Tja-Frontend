
export const PUT = 'put';
export const GET = 'get';
export const POST = 'post';
export const DELETE = 'delete';
export const METHOD = '_method';
export const UPDATE = 'update';
export const STORE = 'store';
export const INDEX = 'index';
export const SHOW = 'show';

export const enum Documents {
  INVOICE = 'invoice',
  SALE_NOTE = 'sale_note',
  OTHER = 'other',
  CHECK = 'check',
  RECEIPT = 'receipt',
  NO_DOCUMENT = 'no_document'
}
export const DOCUMENTS = [
  {
    id: Documents.INVOICE,
    name: 'FACTURA'
  },
  {
    id: Documents.SALE_NOTE,
    name: 'NOTA DE VENTA'
  },
  {
    id: Documents.OTHER,
    name: 'OTROS'
  },
  {
    id: Documents.CHECK,
    name: 'CHEQUE'
  },
  {
    id: Documents.RECEIPT,
    name: 'RECIBO'
  },
  {
    id: Documents.NO_DOCUMENT,
    name: 'SIN DOCUMENTO'
  }
]

export const enum TypeData {
  TEXT = 'text',
  PARAGRAPH = 'paragraph',
  OPTIONS = 'options',
  NUMERIC = 'numeric'
}
export const TYPE_DATA = [
  {
    id: TypeData.TEXT,
    name: 'TEXTO'
  },
  {
    id: TypeData.PARAGRAPH,
    name: 'PARRAFO'
  },
  {
    id: TypeData.OPTIONS,
    name: 'OPCIONES'
  },
  {
    id: TypeData.NUMERIC,
    name: 'NUMERICO'
  }
]
export type KindHttp = 'post' | 'put' | 'delete' | 'get';

export const DATE_FORMAT = 'DD-MM-YYYY';
export const CONFIG_RANGE_DATEPICKER: any = {
  rangeInputFormat: 'DD/MM/YYYY',
  isAnimated: true,
  containerClass: 'theme-blue'
}

export const CONFIG_DATEPICKER: any = {
  dateInputFormat: 'DD/MM/YYYY',
  isAnimated: true,
  containerClass: 'theme-blue'
}