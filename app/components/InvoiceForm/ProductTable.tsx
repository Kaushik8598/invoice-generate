'use client';

import React from 'react';
import type { ProductRow, TaxType, InvoiceType } from '../../lib/types';
import { computeProduct, formatCurrency } from '../../lib/calculations';
import { UNITS, GST_RATES } from '../../lib/constants';

interface Props {
  products: ProductRow[];
  taxType: TaxType;
  invoiceType: InvoiceType;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onChange: (id: string, field: keyof ProductRow, value: string | number) => void;
}

export default function ProductTable({ products, taxType, invoiceType, onAdd, onRemove, onChange }: Props) {
  const showSize = invoiceType === 'regular' || invoiceType === 'both';
  const showTax = (invoiceType === 'gst' || invoiceType === 'both') && taxType !== 'none';
  const showCGSTSGST = showTax && taxType === 'cgst_sgst';
  const showIGST = showTax && taxType === 'igst';

  return (
    <div className="form-section">
      <h2 className="section-title">
        <span className="section-icon">📋</span>
        Product Details
      </h2>

      <div className="product-table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th className="col-sr">Sr.</th>
              <th className="col-product">Product / Description</th>
              {showSize && <th className="col-size">Size</th>}
              <th className="col-hsn">HSN/SAC</th>
              <th className="col-qty">Qty</th>
              <th className="col-unit">Unit</th>
              <th className="col-rate">Rate (₹)</th>
              <th className="col-disc">Disc%</th>
              {showTax && <th className="col-gst">GST%</th>}
              <th className="col-amount">Amount (₹)</th>
              <th className="col-action"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((row, idx) => {
              const computed = computeProduct(row, taxType);
              return (
                <React.Fragment key={row.id}>
                  <tr className="product-row">
                    <td className="col-sr text-center">{idx + 1}</td>
                    <td className="col-product">
                      <input
                        type="text"
                        className="table-input"
                        placeholder="Product name *"
                        value={row.name}
                        onChange={(e) => onChange(row.id, 'name', e.target.value)}
                      />
                      <input
                        type="text"
                        className="table-input table-input-desc"
                        placeholder="Description (optional)"
                        value={row.description}
                        onChange={(e) => onChange(row.id, 'description', e.target.value)}
                      />
                    </td>
                    {showSize && (
                      <td className="col-size">
                        <input
                          type="text"
                          className="table-input"
                          placeholder="-"
                          value={row.size}
                          onChange={(e) => onChange(row.id, 'size', e.target.value)}
                        />
                      </td>
                    )}
                    <td className="col-hsn">
                      <input
                        type="text"
                        className="table-input"
                        placeholder="HSN"
                        value={row.hsn}
                        onChange={(e) => onChange(row.id, 'hsn', e.target.value)}
                      />
                    </td>
                    <td className="col-qty">
                      <input
                        type="number"
                        className="table-input text-right"
                        min="0"
                        step="any"
                        placeholder="0"
                        value={row.qty}
                        onChange={(e) => onChange(row.id, 'qty', e.target.value)}
                      />
                    </td>
                    <td className="col-unit">
                      <select
                        className="table-input table-select"
                        value={row.unit}
                        onChange={(e) => onChange(row.id, 'unit', e.target.value)}
                      >
                        {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
                      </select>
                    </td>
                    <td className="col-rate">
                      <input
                        type="number"
                        className="table-input text-right"
                        min="0"
                        step="any"
                        placeholder="0.00"
                        value={row.rate}
                        onChange={(e) => onChange(row.id, 'rate', e.target.value)}
                      />
                    </td>
                    <td className="col-disc">
                      <input
                        type="number"
                        className="table-input text-right"
                        min="0"
                        max="100"
                        step="any"
                        placeholder="0"
                        value={row.discountPct}
                        onChange={(e) => onChange(row.id, 'discountPct', e.target.value)}
                      />
                    </td>
                    {showTax && (
                      <td className="col-gst">
                        <select
                          className="table-input table-select"
                          value={row.taxPct}
                          onChange={(e) => onChange(row.id, 'taxPct', e.target.value)}
                        >
                          {GST_RATES.map((r) => <option key={r} value={r}>{r}%</option>)}
                          <option value="3">3%</option>
                        </select>
                      </td>
                    )}
                    <td className="col-amount text-right">
                      <span className="computed-value">
                        {formatCurrency(computed.total)}
                      </span>
                    </td>
                    <td className="col-action">
                      <button
                        type="button"
                        className="btn-remove-row"
                        onClick={() => onRemove(row.id)}
                        title="Remove product"
                        disabled={products.length === 1}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                  {showTax && (
                    <tr className="product-tax-row">
                      <td>&nbsp;</td>
                      <td colSpan={9} className="tax-breakdown-cell">
                        <div className="tax-breakdown-line">
                          <span className="tax-info">
                            Taxable: ₹{formatCurrency(computed.taxableAmt)}
                            {computed.discountAmt > 0 && ` (Disc: ₹${formatCurrency(computed.discountAmt)})`}
                          </span>
                          {showCGSTSGST && (
                            <span className="tax-info">
                              CGST({computed.cgstPct}%): ₹{formatCurrency(computed.cgstAmt)}
                              &nbsp;|&nbsp;
                              SGST({computed.sgstPct}%): ₹{formatCurrency(computed.sgstAmt)}
                            </span>
                          )}
                          {showIGST && (
                            <span className="tax-info">
                              IGST({computed.igstPct}%): ₹{formatCurrency(computed.igstAmt)}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="product-actions">
        <button type="button" className="btn-add-product" onClick={onAdd}>
          <span>+</span> Add Product
        </button>
        <span className="product-count">{products.length} product{products.length !== 1 ? 's' : ''}</span>
      </div>
    </div>
  );
}
