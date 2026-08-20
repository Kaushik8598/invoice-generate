export type InvoiceType = 'regular' | 'gst';
export type TaxType = 'none' | 'cgst_sgst' | 'igst';

export interface TransportDetails {
  transporterName: string;
  vehicleNo: string;
  lrGrNo: string;
  transportDate: string;
  ewayBillNo: string;
  transportMode: string;
  poNo: string;
  dateOfSupply: string;
  placeOfSupply: string;
}

export interface PartyDetails {
  name: string;
  address: string;
  city: string;
  state: string;
  stateCode: string;
  pincode: string;
  phone: string;
  email: string;
  gstin: string;
}

export interface ShippedToDetails extends PartyDetails {
  sameAsBilled: boolean;
}

export interface ProductRow {
  id: string;
  name: string;
  description: string;
  hsn: string;
  size: string;
  qty: number | string;
  unit: string;
  rate: number | string;
  discountPct: number | string;
  taxPct: number | string;
}

export interface ComputedProduct {
  id: string;
  name: string;
  description: string;
  hsn: string;
  size: string;
  qty: number;
  unit: string;
  rate: number;
  discountPct: number;
  taxPct: number;
  grossAmount: number;
  discountAmt: number;
  taxableAmt: number;
  cgstPct: number;
  sgstPct: number;
  igstPct: number;
  cgstAmt: number;
  sgstAmt: number;
  igstAmt: number;
  total: number;
}

export interface InvoiceTotals {
  totalQty: number;
  totalGross: number;
  totalDiscount: number;
  totalTaxable: number;
  totalCgst: number;
  totalSgst: number;
  totalIgst: number;
  grandTotal: number;
}


export interface InvoiceFormData {
  invoiceType: InvoiceType;
  taxType: TaxType;
  invoiceNo: string;
  invoiceDate: string;
  transport: TransportDetails;
  billedTo: PartyDetails;
  shippedTo: ShippedToDetails;
  products: ProductRow[];
}
