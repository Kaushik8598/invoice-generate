'use client';

import React from 'react';
import type { InvoiceFormData } from '../../lib/types';

interface Props {
  data: Pick<InvoiceFormData, 'invoiceNo' | 'invoiceDate'>;
  onChange: (field: string, value: string) => void;
}

export default function InvoiceDetailsSection({ data, onChange }: Props) {
  return (
    <div className="form-section">
      <h2 className="section-title">
        <span className="section-icon">🧾</span>
        Invoice Information
      </h2>
      <div className="form-grid">
        {/* Invoice Number — editable with auto-generated default */}
        <div className="field-group">
          <label htmlFor="invoiceNo" className="field-label">
            Invoice Number <span className="required">*</span>
          </label>
          <input
            id="invoiceNo"
            type="text"
            className="form-input"
            placeholder="e.g. INV-20260821-001"
            value={data.invoiceNo}
            onChange={(e) => onChange('invoiceNo', e.target.value)}
          />
        </div>

        {/* Invoice Date — user sets this */}
        <div className="field-group">
          <label htmlFor="invoiceDate" className="field-label">
            Invoice Date <span className="required">*</span>
          </label>
          <input
            id="invoiceDate"
            type="date"
            className="form-input"
            value={data.invoiceDate}
            onChange={(e) => onChange('invoiceDate', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
