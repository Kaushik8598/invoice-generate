'use client';

import React from 'react';
import type { ComputedProduct, InvoiceTotals, TaxType } from '../../lib/types';
import { formatCurrencyWithSymbol } from '../../lib/calculations';
import { amountInWords } from '../../lib/amountInWords';

interface Props {
  products: ComputedProduct[];
  totals: InvoiceTotals;
  taxType: TaxType;
  invoiceType: 'regular' | 'gst';
}

export default function SummarySection({ totals, taxType, invoiceType }: Props) {
  const showTax = invoiceType === 'gst' && taxType !== 'none';
  const showCGSTSGST = showTax && taxType === 'cgst_sgst';
  const showIGST = showTax && taxType === 'igst';
  const words = amountInWords(totals.grandTotal);

  return (
    <div className="form-section">
      <h2 className="section-title">
        <span className="section-icon">💰</span>
        Invoice Summary
      </h2>

      <div className="summary-grid">
        <div className="summary-table">
          <div className="summary-row">
            <span className="summary-label">Total Quantity</span>
            <span className="summary-value">{totals.totalQty.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Subtotal (Gross Amount)</span>
            <span className="summary-value">{formatCurrencyWithSymbol(totals.totalGross)}</span>
          </div>
          {totals.totalDiscount > 0 && (
            <div className="summary-row text-discount">
              <span className="summary-label">Total Discount</span>
              <span className="summary-value">− {formatCurrencyWithSymbol(totals.totalDiscount)}</span>
            </div>
          )}
          <div className="summary-row">
            <span className="summary-label">Taxable Amount</span>
            <span className="summary-value">{formatCurrencyWithSymbol(totals.totalTaxable)}</span>
          </div>

          {/* CGST + SGST */}
          {showCGSTSGST && (
            <>
              <div className="summary-row text-tax">
                <span className="summary-label">CGST</span>
                <span className="summary-value">{formatCurrencyWithSymbol(totals.totalCgst)}</span>
              </div>
              <div className="summary-row text-tax">
                <span className="summary-label">SGST</span>
                <span className="summary-value">{formatCurrencyWithSymbol(totals.totalSgst)}</span>
              </div>
            </>
          )}

          {/* IGST */}
          {showIGST && (
            <div className="summary-row text-tax">
              <span className="summary-label">IGST</span>
              <span className="summary-value">{formatCurrencyWithSymbol(totals.totalIgst)}</span>
            </div>
          )}

          <div className="summary-row summary-grand-total">
            <span className="summary-label">Grand Total</span>
            <span className="summary-value">{formatCurrencyWithSymbol(totals.grandTotal)}</span>
          </div>
        </div>
      </div>

      {totals.grandTotal > 0 && (
        <div className="amount-in-words">
          <span className="aiw-label">Amount in Words:</span>
          <span className="aiw-value">{words}</span>
        </div>
      )}
    </div>
  );
}
