import type { ComputedProduct, InvoiceTotals, ProductRow, TaxType } from './types';

export function parseNum(val: number | string): number {
  const n = parseFloat(String(val));
  return isNaN(n) ? 0 : n;
}

export function computeProduct(row: ProductRow, taxType: TaxType): ComputedProduct {
  const qty = parseNum(row.qty);
  const rate = parseNum(row.rate);
  const discountPct = parseNum(row.discountPct);
  const taxPct = parseNum(row.taxPct);

  const grossAmount = qty * rate;
  const discountAmt = grossAmount * (discountPct / 100);
  const taxableAmt = grossAmount - discountAmt;

  let cgstPct = 0, sgstPct = 0, igstPct = 0;
  let cgstAmt = 0, sgstAmt = 0, igstAmt = 0;

  if (taxType === 'cgst_sgst') {
    cgstPct = taxPct / 2;
    sgstPct = taxPct / 2;
    cgstAmt = taxableAmt * (cgstPct / 100);
    sgstAmt = taxableAmt * (sgstPct / 100);
  } else if (taxType === 'igst') {
    igstPct = taxPct;
    igstAmt = taxableAmt * (igstPct / 100);
  }

  const total = taxableAmt + cgstAmt + sgstAmt + igstAmt;

  return {
    id: row.id,
    name: row.name,
    description: row.description,
    hsn: row.hsn,
    size: row.size,
    qty,
    unit: row.unit,
    rate,
    discountPct,
    taxPct,
    grossAmount,
    discountAmt,
    taxableAmt,
    cgstPct,
    sgstPct,
    igstPct,
    cgstAmt,
    sgstAmt,
    igstAmt,
    total,
  };
}

export function computeTotals(products: ComputedProduct[]): InvoiceTotals {
  const totals: InvoiceTotals = {
    totalQty: 0,
    totalGross: 0,
    totalDiscount: 0,
    totalTaxable: 0,
    totalCgst: 0,
    totalSgst: 0,
    totalIgst: 0,
    grandTotal: 0,
  };

  for (const p of products) {
    totals.totalQty += p.qty;
    totals.totalGross += p.grossAmount;
    totals.totalDiscount += p.discountAmt;
    totals.totalTaxable += p.taxableAmt;
    totals.totalCgst += p.cgstAmt;
    totals.totalSgst += p.sgstAmt;
    totals.totalIgst += p.igstAmt;
    totals.grandTotal += p.total;
  }

  return totals;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatCurrencyWithSymbol(amount: number): string {
  return '₹ ' + formatCurrency(amount);
}
