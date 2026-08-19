'use client';

import React from 'react';
import type { InvoiceFormData } from '../../lib/types';

interface Props {
  data: Pick<InvoiceFormData, 'invoiceNo' | 'invoiceDate' | 'dueDate' | 'placeOfSupply' | 'referenceNo' | 'paymentTerms'>;
  onChange: (field: string, value: string) => void;
}

export default function InvoiceDetailsSection({ data, onChange }: Props) {
  return (
    <div className="form-section">
      <h2 className="section-title">
        <span className="section-icon">🧾</span>
        Invoice Information
      </h2>
      <div className="form-grid form-grid-3">
        <div className="field-group">
          <label htmlFor="invoiceNo" className="field-label">
            Invoice Number <span className="required">*</span>
          </label>
          <input
            id="invoiceNo"
            type="text"
            className="form-input"
            placeholder="e.g. GT-001"
            value={data.invoiceNo}
            onChange={(e) => onChange('invoiceNo', e.target.value)}
          />
        </div>

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

        <div className="field-group">
          <label htmlFor="dueDate" className="field-label">Due Date</label>
          <input
            id="dueDate"
            type="date"
            className="form-input"
            value={data.dueDate}
            onChange={(e) => onChange('dueDate', e.target.value)}
          />
        </div>

        <div className="field-group">
          <label htmlFor="placeOfSupply" className="field-label">Place of Supply</label>
          <input
            id="placeOfSupply"
            type="text"
            className="form-input"
            placeholder="e.g. Surat, Gujarat"
            value={data.placeOfSupply}
            onChange={(e) => onChange('placeOfSupply', e.target.value)}
          />
        </div>

        <div className="field-group">
          <label htmlFor="referenceNo" className="field-label">Reference Number</label>
          <input
            id="referenceNo"
            type="text"
            className="form-input"
            placeholder="e.g. PO-2024-001"
            value={data.referenceNo}
            onChange={(e) => onChange('referenceNo', e.target.value)}
          />
        </div>

        <div className="field-group">
          <label htmlFor="paymentTerms" className="field-label">Payment Terms</label>
          <input
            id="paymentTerms"
            type="text"
            className="form-input"
            placeholder="e.g. Net 30"
            value={data.paymentTerms}
            onChange={(e) => onChange('paymentTerms', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
