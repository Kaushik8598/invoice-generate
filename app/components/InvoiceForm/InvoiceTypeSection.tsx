'use client';

import React from 'react';
import type { InvoiceFormData } from '../../lib/types';

interface Props {
  data: Pick<InvoiceFormData, 'invoiceType' | 'taxType'>;
  onChange: (field: string, value: string) => void;
}

export default function InvoiceTypeSection({ data, onChange }: Props) {
  return (
    <div className="form-section">
      <h2 className="section-title">
        <span className="section-icon">📄</span>
        Invoice Type
      </h2>
      <div className="form-grid">
        <div className="field-group">
          <label className="field-label">Invoice Type <span className="required">*</span></label>
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="invoiceType"
                value="regular"
                checked={data.invoiceType === 'regular'}
                onChange={(e) => onChange('invoiceType', e.target.value)}
              />
              <span className="radio-label">Regular Invoice</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="invoiceType"
                value="gst"
                checked={data.invoiceType === 'gst'}
                onChange={(e) => onChange('invoiceType', e.target.value)}
              />
              <span className="radio-label">GST Invoice</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="invoiceType"
                value="both"
                checked={data.invoiceType === 'both'}
                onChange={(e) => onChange('invoiceType', e.target.value)}
              />
              <span className="radio-label">Both (Regular + GST)</span>
            </label>
          </div>
        </div>

        {(data.invoiceType === 'gst' || data.invoiceType === 'both') && (
          <div className="field-group">
            <label className="field-label">Tax Type <span className="required">*</span></label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="taxType"
                  value="none"
                  checked={data.taxType === 'none'}
                  onChange={(e) => onChange('taxType', e.target.value)}
                />
                <span className="radio-label">None</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="taxType"
                  value="cgst_sgst"
                  checked={data.taxType === 'cgst_sgst'}
                  onChange={(e) => onChange('taxType', e.target.value)}
                />
                <span className="radio-label">CGST + SGST</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="taxType"
                  value="igst"
                  checked={data.taxType === 'igst'}
                  onChange={(e) => onChange('taxType', e.target.value)}
                />
                <span className="radio-label">IGST</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
