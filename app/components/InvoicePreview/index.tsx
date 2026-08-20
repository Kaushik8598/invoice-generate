'use client';

import React, { useState } from 'react';
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
  // Mode selection: both, regular only, or gst only
  const [activeTab, setActiveTab] = useState<'both' | 'regular' | 'gst'>(formData.invoiceType);

  const handlePrint = () => {
    window.print();
  };

  const isBoth = activeTab === 'both';
  const showRegular = isBoth || activeTab === 'regular';
  const showGST = isBoth || activeTab === 'gst';

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
          {formData.invoiceType === 'both' ? (
            <div className="preview-tab-group">
              <button
                type="button"
                className={`preview-tab-btn ${activeTab === 'both' ? 'active' : ''}`}
                onClick={() => setActiveTab('both')}
              >
                Both Invoices (2 Pages)
              </button>
              <button
                type="button"
                className={`preview-tab-btn ${activeTab === 'regular' ? 'active' : ''}`}
                onClick={() => setActiveTab('regular')}
              >
                Page 1: Regular
              </button>
              <button
                type="button"
                className={`preview-tab-btn ${activeTab === 'gst' ? 'active' : ''}`}
                onClick={() => setActiveTab('gst')}
              >
                Page 2: GST
              </button>
            </div>
          ) : (
            <h2 className="toolbar-title">
              {formData.invoiceType === 'gst' ? 'GST Invoice' : 'Regular Invoice'} Preview
            </h2>
          )}
        </div>

        <div className="toolbar-right">
          <button className="btn-print" onClick={handlePrint}>
            🖨️ Print / Save as PDF {isBoth ? '(Both Pages)' : ''}
          </button>
        </div>
      </div>

      {/* Invoice content */}
      <div className="invoice-wrapper">
        {showRegular && (
          <div className="invoice-page-container">
            {isBoth && (
              <div className="no-print page-indicator-badge">
                PAGE 1 &mdash; REGULAR INVOICE
              </div>
            )}
            <RegularInvoice
              formData={formData}
              computedProducts={computedProducts}
              totals={totals}
            />
          </div>
        )}

        {showGST && (
          <div className="invoice-page-container">
            {isBoth && (
              <div className="no-print page-indicator-badge">
                PAGE 2 &mdash; GST TAX INVOICE
              </div>
            )}
            <GSTInvoice
              formData={formData}
              computedProducts={computedProducts}
              totals={totals}
            />
          </div>
        )}
      </div>
    </div>
  );
}
