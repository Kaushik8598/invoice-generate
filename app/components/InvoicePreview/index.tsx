'use client';

import React from 'react';
import type { ComputedProduct, InvoiceFormData, InvoiceTotals } from '../../lib/types';
import RegularInvoice from './RegularInvoice';
import GSTInvoice from './GSTInvoice';

interface Props {
  formData: InvoiceFormData;
  computedProducts: ComputedProduct[];
  totals: InvoiceTotals;
  onBack: () => void;
}

export default function InvoicePreview({ formData, computedProducts, totals, onBack }: Props) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="preview-container">
      {/* Action bar - hidden on print */}
      <div className="preview-toolbar no-print">
        <div className="toolbar-left">
          <button className="btn-back" onClick={onBack}>
            ← Back to Form
          </button>
        </div>
        <div className="toolbar-center">
          <h2 className="toolbar-title">
            {formData.invoiceType === 'gst' ? 'GST Invoice' : 'Regular Invoice'} Preview
          </h2>
        </div>
        <div className="toolbar-right">
          <button className="btn-print" onClick={handlePrint}>
            🖨️ Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Invoice content */}
      <div className="invoice-wrapper">
        {formData.invoiceType === 'regular' ? (
          <RegularInvoice
            formData={formData}
            computedProducts={computedProducts}
            totals={totals}
          />
        ) : (
          <GSTInvoice
            formData={formData}
            computedProducts={computedProducts}
            totals={totals}
          />
        )}
      </div>
    </div>
  );
}
