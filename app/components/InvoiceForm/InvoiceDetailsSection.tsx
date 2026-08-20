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
        {/* Invoice Number — auto-generated, read-only */}
        <div className="field-group">
          <label className="field-label">Invoice Number</label>
          <div className="auto-field">
            <span className="auto-field-value">{data.invoiceNo}</span>
            <span className="auto-field-badge">Auto Generated</span>
          </div>
          {/* <span className="field-hint">Will be assigned from the backend once implemented.</span> */}
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
