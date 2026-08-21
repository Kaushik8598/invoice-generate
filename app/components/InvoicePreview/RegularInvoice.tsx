'use client';

import React from 'react';
import type { ComputedProduct, InvoiceFormData, InvoiceTotals } from '../../lib/types';
import { COMPANY, APPEARANCE } from '../../lib/constants';
import { formatCurrency } from '../../lib/calculations';
import { amountInWords } from '../../lib/amountInWords';
import {
  MapPin,
  Phone,
  Mail,
  FileText,
  Landmark,
  IndianRupee,
  UserCheck,
} from 'lucide-react';

interface Props {
  formData: InvoiceFormData;
  computedProducts: ComputedProduct[];
  totals: InvoiceTotals;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '-';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
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
      {/* ── 1. HEADER ── */}
      <div className="inv-header">
        <div className="inv-header-left inv-header-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={APPEARANCE.logoUrl} alt="Company Logo" className="inv-logo" />
        </div>
        {/* <div className="inv-header-right">
          <div className="inv-title" style={{ color: pc }}>TAX INVOICE</div>
          <div className="inv-copy-boxes">
            <div className="copy-box">
              <span className="copy-checkbox"></span>
              <span>Original for Recipient</span>
            </div>
            <div className="copy-box">
              <span className="copy-checkbox"></span>
              <span>Duplicate for Transporter</span>
            </div>
            <div className="copy-box">
              <span className="copy-checkbox"></span>
              <span>Triplicate for Suppliers</span>
            </div>
          </div>
        </div> */}
      </div>

      {/* ── 2. ADDRESS BAR ── */}
      <div className="inv-address-bar">
        <div className="inv-addr-item">
          <MapPin className="inv-icon" size={13} style={{ color: pc }} />
          <span>{COMPANY.address}</span>
        </div>
        <div className="inv-addr-divider">|</div>
        <div className="inv-addr-item">
          <Phone className="inv-icon" size={13} style={{ color: pc }} />
          <span>{COMPANY.phone}</span>
        </div>
        <div className="inv-addr-divider">|</div>
        <div className="inv-addr-item">
          <Mail className="inv-icon" size={13} style={{ color: pc }} />
          <span>{COMPANY.email}</span>
        </div>
      </div>

      {/* ── 3. TAX INVOICE BANNER ── */}
      <div className="inv-banner" style={{ backgroundColor: pc }}>
        <span>TAX INVOICE</span>
        <span className="inv-banner-right">Original / Duplicate</span>
      </div>

      {/* ── 4. BILL TO + BILL INFO (2-COLUMN) ── */}
      <div className="inv-detail-row">
        {/* Bill To Box */}
        <div className="inv-detail-box">
          <div className="inv-box-header" style={{ backgroundColor: pc }}>
            <FileText size={13} className="box-lucide-icon" />
            <span>BILL TO</span>
          </div>
          <div className="inv-box-body">
            <div className="inv-customer-name">{billedTo.name || 'M/S. CUSTOMER NAME'}</div>
            <div className="inv-customer-address">
              {billedTo.address}
              {billedTo.city && `, ${billedTo.city}`}
              {billedTo.state && `, ${billedTo.state}`}
              {billedTo.pincode && `-${billedTo.pincode}`}
            </div>
            {billedTo.phone && (
              <div className="inv-customer-phone">
                <span>Mo. &nbsp;:</span> <strong>{billedTo.phone}</strong>
              </div>
            )}
            <div className="inv-gst-pan mt-1 flex flex-col gap-0.5">
              <div><span>GST NO. &nbsp;:</span> <strong> {billedTo.gstin || '-'}</strong></div>
              <div><span>PAN NO. &nbsp;:</span> <strong> {COMPANY.pan || '-'}</strong></div>
            </div>
          </div>
        </div>

        {/* Invoice Info Box */}
        <div className="inv-detail-box">
          <div className="inv-box-header" style={{ backgroundColor: pc }}>
            <FileText size={13} className="box-lucide-icon" />
            <span>INVOICE DETAILS</span>
          </div>
          <div className="inv-box-body">
            <table className="inv-info-table">
              <tbody>
                <tr>
                  <td className="info-label">Bill No.</td>
                  <td className="info-sep">:</td>
                  <td className="info-val font-bold">{invoiceNo || '-'}</td>
                </tr>
                <tr>
                  <td className="info-label">Date</td>
                  <td className="info-sep">:</td>
                  <td className="info-val">{formatDate(invoiceDate)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── 5. PRODUCT TABLE ── */}
      <table className="inv-product-table regular-product-table">
        <thead>
          <tr style={{ backgroundColor: pc, color: '#fff' }}>
            <th className="col-sr">Sr.</th>
            <th className="col-desc">Product Name</th>
            <th className="col-size">Size</th>
            <th className="col-hsn">HSN</th>
            <th className="col-qty">Qty</th>
            <th className="col-rate">Rate</th>
            <th className="col-taxable">Amount</th>
          </tr>
        </thead>
        <tbody>
          {computedProducts.map((p, i) => (
            <tr key={p.id} className={`inv-product-row ${i % 2 === 1 ? 'row-alt' : ''}`}>
              <td className="text-center">{i + 1}</td>
              <td>
                <div className="prod-name">{p.name}</div>
                {p.description && <div className="prod-desc">{p.description}</div>}
              </td>
              <td className="text-center">{p.size || '-'}</td>
              <td className="text-center">{p.hsn || '-'}</td>
              <td className="text-center">{p.qty} {p.unit || ''}</td>
              <td className="text-right">{formatCurrency(p.rate)}</td>
              <td className="text-right">{formatCurrency(p.taxableAmt)}</td>
            </tr>
          ))}

          {/* Dynamic blank filler row to stretch vertical borders down */}
          <tr className="inv-blank-filler-row">
            <td className="text-center">&nbsp;</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
        <tfoot>
          <tr className="inv-total-row">
            {/* <td colSpan={5} className="font-bold" style={{ color: '#333' }}>
              <span className="mr-6">GSTIN : {COMPANY.gstin ? COMPANY.gstin : '-'}</span>
              <span>PAN NO : {COMPANY.pan ? COMPANY.pan : '-'}</span>
            </td> */}
            <td colSpan={6} className="text-right font-bold" style={{ color: pc }}>
              Total
            </td>
            <td className="text-right font-bold" style={{ color: pc }}>
              ₹ {formatCurrency(totals.totalTaxable)}
            </td>
          </tr>
        </tfoot>
      </table>

      {/* ── 6. BOTTOM: AMOUNT IN WORDS + BANK + RECEIVER SIGN & TAX SUMMARY + SIGNATURE ── */}
      <div className="inv-bottom-gst">
        {/* Left column */}
        <div className="inv-bottom-left">
          {/* Amount in Words */}
          <div className="inv-box-card">
            <div className="inv-box-header" style={{ color: pc }}>
              <IndianRupee size={13} className="box-lucide-icon" />
              <span>AMOUNT IN WORDS</span>
            </div>
            <div className="inv-box-body">
              <div className="aiw-text">{words}</div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="inv-box-card">
            <div className="inv-box-header" style={{ color: pc }}>
              <Landmark size={13} className="box-lucide-icon" />
              <span>BANK DETAILS</span>
            </div>
            <div className="inv-box-body">
              <table className="inv-bank-table">
                <tbody>
                  <tr>
                    <td className="bank-lbl">NAME</td>
                    <td className="bank-sep">:</td>
                    <td className="bank-val">{COMPANY.shortName}</td>
                    <td className="bank-lbl">IFSC</td>
                    <td className="bank-sep">:</td>
                    <td className="bank-val">{COMPANY.bank.ifsc}</td>
                  </tr>
                  <tr>
                    <td className="bank-lbl">A/C</td>
                    <td className="bank-sep">:</td>
                    <td className="bank-val">{COMPANY.bank.accountNo}</td>
                    <td className="bank-lbl">BANK</td>
                    <td className="bank-sep">:</td>
                    <td className="bank-val">{COMPANY.bank.name}</td>
                  </tr>
                  <tr>
                    <td className="bank-lbl">BRANCH</td>
                    <td className="bank-sep">:</td>
                    <td colSpan={4} className="bank-val">{COMPANY.bank.branch}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Receiver's Sign */}
          <div className="inv-box-card">
            <div className="inv-box-header" style={{ color: pc }}>
              <UserCheck size={13} className="box-lucide-icon" />
              <span>RECEIVER&apos;S SIGNATURE</span>
            </div>
            <div className="inv-box-body" style={{ minHeight: '34px', display: 'flex', alignItems: 'flex-end', padding: '4px 6px' }}>
              <div className="w-full flex items-center justify-between text-[7.5pt] text-gray-700">
                <span className="font-semibold">Receiver&apos;s Sign :</span>
                <span className="flex-1 ml-2 border-b border-dotted border-gray-400"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Tax summary & Signature */}
        <div className="inv-bottom-right">
          <table className="inv-tax-summary">
            <tbody>
              <tr>
                <td>Sub Total</td>
                <td className="text-right">₹&nbsp;&nbsp;{formatCurrency(totals.totalTaxable)}</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td className="text-right">&nbsp;&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td className="text-right">&nbsp;&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td className="text-right">&nbsp;&nbsp;</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="grand-total-row" style={{ backgroundColor: pc, color: '#fff' }}>
                <td className="font-bold">Grand Total</td>
                <td className="text-right font-bold">₹ {formatCurrency(totals.grandTotal)}</td>
              </tr>
            </tfoot>
          </table>

          {/* Signature */}
          <div className="inv-signature-gst">
            <div className="inv-for-label" style={{ color: pc }}>
              For, {COMPANY.shortName}
            </div>
            <div className="inv-signature-line"></div>
            <div className="inv-signatory-label">Authorised Signatory</div>
          </div>
        </div>
      </div>

      {/* ── 7. TERMS AND CONDITIONS (FULL WIDTH) ── */}
      <div className="inv-terms-gst">
        <div className="inv-box-header" style={{ color: pc }}>
          <div className="flex items-center gap-1.5">
            <FileText size={13} className="box-lucide-icon" />
            <span>TERMS AND CONDITIONS</span>
          </div>
          <span className="terms-eo">(E. &amp; O.E.)</span>
        </div>
        <div className="inv-box-body">
          <ol className="terms-list">
            {COMPANY.regularTerms.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ol>
        </div>
      </div>

      {/* ── 8. THANK YOU ── */}
      {/* <div className="inv-thankyou" style={{ color: pc }}>
        Thank you for your business!
      </div> */}
    </div>
  );
}
