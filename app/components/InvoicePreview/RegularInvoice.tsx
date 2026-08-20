'use client';

import React from 'react';
import type { ComputedProduct, InvoiceFormData, InvoiceTotals } from '../../lib/types';
import { COMPANY, APPEARANCE } from '../../lib/constants';
import { formatCurrency } from '../../lib/calculations';
import { amountInWords } from '../../lib/amountInWords';

interface Props {
  formData: InvoiceFormData;
  computedProducts: ComputedProduct[];
  totals: InvoiceTotals;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function RegularInvoice({ formData, computedProducts, totals }: Props) {
  const { billedTo, invoiceNo, invoiceDate } = formData;
  const pc = APPEARANCE.primaryColor;
  const words = amountInWords(totals.grandTotal);

  return (
    <div
      className="invoice-page regular-invoice"
      style={{ fontFamily: APPEARANCE.fontFamily }}
    >
      {/* ── HEADER ── */}
      <div className="inv-header">
        <div className="inv-header-left">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={APPEARANCE.logoUrl} alt="Company Logo" className="inv-logo" />
          <div className="inv-company-info">
            <div className="inv-tagline">{COMPANY.tagline}</div>
          </div>
        </div>
        <div className="inv-header-right">
          <div className="inv-title" style={{ color: pc }}>TAX INVOICE</div>
          <div className="inv-copy-boxes">
            <div className="copy-box"><span className="copy-check">☐</span> Original for Recipient</div>
            <div className="copy-box"><span className="copy-check">☐</span> Duplicate for Transporter</div>
            <div className="copy-box"><span className="copy-check">☐</span> Triplicate for Suppliers</div>
          </div>
        </div>
      </div>

      {/* ── ADDRESS BAR ── */}
      <div className="inv-address-bar">
        <div className="inv-addr-item">
          <span className="addr-icon">📍</span>
          <span>{COMPANY.address}</span>
        </div>
        <div className="inv-addr-item">
          <span className="addr-icon">📞</span>
          <span>{COMPANY.phone}</span>
        </div>
        <div className="inv-addr-item">
          <span className="addr-icon">✉</span>
          <span>{COMPANY.email}</span>
        </div>
      </div>

      {/* ── TAX INVOICE BANNER ── */}
      <div className="inv-banner" style={{ backgroundColor: pc }}>
        <span>TAX INVOICE</span>
        <span className="inv-banner-right">Original / Duplicate</span>
      </div>

      {/* ── BILL TO + BILL INFO ── */}
      <div className="inv-info-row">
        <div className="inv-bill-to-box">
          <div className="inv-box-header" style={{ backgroundColor: pc }}>
            <span className="box-icon">🧾</span> BILL TO
          </div>
          <div className="inv-box-body">
            <div className="inv-customer-name">{billedTo.name || 'Customer Name'}</div>
            <div className="inv-customer-address">
              {billedTo.address}
              {billedTo.city && `, ${billedTo.city}`}
              {billedTo.state && `, ${billedTo.state}`}
              {billedTo.pincode && ` - ${billedTo.pincode}`}
            </div>
            {billedTo.gstin && (
              <div className="inv-gst-pan">
                <span>GST NO. &nbsp;: &nbsp;{billedTo.gstin}</span>
              </div>
            )}
            {billedTo.gstin && COMPANY.pan && (
              <div className="inv-gst-pan">
                <span>PAN NO. &nbsp;: &nbsp;</span>
              </div>
            )}
          </div>
        </div>

        <div className="inv-bill-info-box">
          <div className="inv-box-header" style={{ backgroundColor: pc }}>
            <span className="box-icon">🧾</span>
          </div>
          <div className="inv-box-body">
            <table className="inv-info-table">
              <tbody>
                <tr>
                  <td className="info-label">Bill No.</td>
                  <td>:</td>
                  <td>{invoiceNo || '-'}</td>
                </tr>
                <tr>
                  <td className="info-label">Date</td>
                  <td>:</td>
                  <td>{formatDate(invoiceDate)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── PRODUCT TABLE ── */}
      <table className="inv-product-table" style={{ '--inv-header-color': pc } as React.CSSProperties}>
        <thead>
          <tr style={{ backgroundColor: pc, color: '#fff' }}>
            <th className="col-sr">Sr.</th>
            <th className="col-product-name">Product Name</th>
            <th className="col-size">Size</th>
            <th className="col-hsn">HSN</th>
            <th className="col-qty">Qty</th>
            <th className="col-rate">Rate</th>
            <th className="col-amount">Amount</th>
          </tr>
        </thead>
        <tbody>
          {computedProducts.map((p, i) => (
            <tr key={p.id} className={i % 2 === 1 ? 'row-alt' : ''}>
              <td className="text-center">{i + 1}</td>
              <td>
                <div className="prod-name">{p.name}</div>
                {p.description && <div className="prod-desc">{p.description}</div>}
              </td>
              <td className="text-center">{p.size || '-'}</td>
              <td className="text-center">{p.hsn || '-'}</td>
              <td className="text-center">{p.qty} {p.unit}</td>
              <td className="text-right">{formatCurrency(p.rate)}</td>
              <td className="text-right">{formatCurrency(p.taxableAmt)}</td>
            </tr>
          ))}
          {/* Blank rows for visual spacing */}
          {computedProducts.length < 6 && Array.from({ length: Math.max(0, 6 - computedProducts.length) }).map((_, i) => (
            <tr key={`blank-${i}`} className="blank-row">
              <td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="inv-gstin-row">
            <td colSpan={4}>
              <span>GSTIN : {COMPANY.gstin}</span>
              <span className="ml-4">PAN NO : {COMPANY.pan}</span>
            </td>
            <td colSpan={2} className="text-right font-bold">Total</td>
            <td className="text-right font-bold" style={{ color: pc }}>
              ₹ {formatCurrency(totals.totalTaxable)}
            </td>
          </tr>
        </tfoot>
      </table>

      {/* ── BOTTOM SECTION ── */}
      <div className="inv-bottom-row">
        {/* Bank Details */}
        <div className="inv-bank-box">
          <div className="inv-box-header" style={{ backgroundColor: pc }}>
            <span className="box-icon">🏦</span> BANK DETAILS
          </div>
          <div className="inv-box-body">
            <table className="inv-bank-table">
              <tbody>
                <tr><td>Bank Name</td><td>:</td><td>{COMPANY.bank.name}</td></tr>
                <tr><td>Account No</td><td>:</td><td>{COMPANY.bank.accountNo}</td></tr>
                <tr><td>IFSC Code</td><td>:</td><td>{COMPANY.bank.ifsc}</td></tr>
                <tr><td>Branch</td><td>:</td><td>{COMPANY.bank.branch}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals */}
        <div className="inv-totals-box">
          <table className="inv-totals-table">
            <tbody>
              <tr>
                <td>Sub Total</td>
                <td className="text-right">₹ {formatCurrency(totals.totalTaxable)}</td>
              </tr>
              <tr>
                <td>CGST (0.00%)</td>
                <td className="text-right">₹ 0.00</td>
              </tr>
              <tr>
                <td>SGST (0.00%)</td>
                <td className="text-right">₹ 0.00</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="grand-total-row" style={{ backgroundColor: pc, color: '#fff' }}>
                <td>Grand Total</td>
                <td className="text-right">₹ {formatCurrency(totals.grandTotal)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* ── AMOUNT IN WORDS ── */}
      <div className="inv-words-row">
        <strong>Amount in Words : </strong>
        <span>{words}</span>
      </div>

      {/* ── TERMS & SIGNATURE ── */}
      <div className="inv-footer-row">
        <div className="inv-terms-box">
          <div className="inv-box-header" style={{ backgroundColor: pc }}>
            <span className="box-icon">📋</span> TERMS &amp; CONDITIONS
          </div>
          <div className="inv-box-body">
            <ol className="terms-list">
              {COMPANY.terms.slice(0, 3).map((t, i) => <li key={i}>{t}</li>)}
            </ol>
          </div>
        </div>
        <div className="inv-signature-box">
          <div className="inv-for-label" style={{ color: pc }}>For, {COMPANY.shortName}</div>
          <div className="inv-signature-line"></div>
          <div className="inv-signatory-label">Authorised Signatory</div>
        </div>
      </div>

      {/* ── THANK YOU ── */}
      <div className="inv-thankyou" style={{ color: pc }}>
        — Thank you for your business! —
      </div>
    </div>
  );
}
