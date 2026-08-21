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
  Truck,
  User,
  UserCheck,
  IndianRupee,
  Landmark,
  ScrollText,
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
    // YYYY-MM-DD to DD/MM/YYYY
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function GSTInvoice({ formData, computedProducts, totals }: Props) {
  const { billedTo, shippedTo, transport, invoiceNo, invoiceDate, taxType } = formData;
  const pc = APPEARANCE.primaryColor;
  const words = amountInWords(totals.grandTotal);

  const showCGSTSGST = taxType === 'cgst_sgst';
  const showIGST = taxType === 'igst';

  // Build shipping info
  const shippingParty = shippedTo.sameAsBilled ? billedTo : shippedTo;

  // Distinct rates for breakdown if multiple products have different rates
  const cgstRates = [...new Set(computedProducts.map((p) => p.cgstPct))].filter((r) => r > 0);
  const igstRates = [...new Set(computedProducts.map((p) => p.igstPct))].filter((r) => r > 0);

  return (
    <div
      className="invoice-page gst-invoice"
      style={{ fontFamily: APPEARANCE.fontFamily }}
    >
      {/* ── 1. HEADER ── */}
      <div className="inv-header">
        <div className="inv-header-left">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={APPEARANCE.gstlogoUrl} alt="Company Logo" className="inv-logo" />
        </div>
        <div className="inv-header-right">
          <div className="inv-title" style={{ color: pc }}>
            TAX INVOICE
          </div>
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
        </div>
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

      {/* ── 3. GSTIN PILL BANNER ── */}
      <div className="inv-gstin-pill-container">
        <div className="inv-gstin-pill" style={{ backgroundColor: pc }}>
          GSTIN : {COMPANY.gstin}
        </div>
      </div>

      {/* ── 4. INVOICE DETAILS & TRANSPORTATION DETAILS (2-COLUMN) ── */}
      <div className="inv-detail-row">
        {/* Invoice Details */}
        <div className="inv-detail-box">
          <div className="inv-box-header" style={{ backgroundColor: pc }}>
            <FileText size={13} className="box-lucide-icon" />
            <span>INVOICE DETAILS</span>
          </div>
          <div className="inv-box-body">
            <table className="inv-info-table">
              <tbody>
                <tr>
                  <td className="info-label">Invoice No.</td>
                  <td className="info-sep">:</td>
                  <td className="info-val">{invoiceNo || '-'}</td>
                </tr>
                <tr>
                  <td className="info-label">Invoice Date</td>
                  <td className="info-sep">:</td>
                  <td className="info-val">{formatDate(invoiceDate)}</td>
                </tr>
              </tbody>
            </table>
            <div className="inv-state-row">
              <span>State : {billedTo.state || 'Gujarat'}</span>
              <span>State Code : {billedTo.stateCode || '24'}</span>
            </div>
          </div>
        </div>

        {/* Transportation Details */}
        <div className="inv-detail-box">
          <div className="inv-box-header" style={{ backgroundColor: pc }}>
            <Truck size={13} className="box-lucide-icon" />
            <span>TRANSPORTATION DETAILS</span>
          </div>
          <div className="inv-box-body">
            <table className="inv-info-table">
              <tbody>
                <tr>
                  <td className="info-label">Transportation Mode</td>
                  <td className="info-sep">:</td>
                  <td className="info-val">{transport.transportMode || 'LOCAL'}</td>
                </tr>
                <tr>
                  <td className="info-label">Transporter Name</td>
                  <td className="info-sep">:</td>
                  <td className="info-val">{transport.transporterName || 'LOCAL'}</td>
                </tr>
                <tr>
                  <td className="info-label">Vehicle Number</td>
                  <td className="info-sep">:</td>
                  <td className="info-val">{transport.vehicleNo || '-'}</td>
                </tr>
                <tr>
                  <td className="info-label">PO No.</td>
                  <td className="info-sep">:</td>
                  <td className="info-val">{transport.poNo || '-'}</td>
                </tr>
                <tr>
                  <td className="info-label">Date of Supply</td>
                  <td className="info-sep">:</td>
                  <td className="info-val">
                    {transport.dateOfSupply ? formatDate(transport.dateOfSupply) : '-'}
                  </td>
                </tr>
                <tr>
                  <td className="info-label">Place of Supply</td>
                  <td className="info-sep">:</td>
                  <td className="info-val">{transport.placeOfSupply || 'SURAT'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── 5. BILLED TO & SHIPPED TO (2-COLUMN) ── */}
      <div className="inv-detail-row">
        {/* Billed To */}
        <div className="inv-detail-box">
          <div className="inv-box-header" style={{ backgroundColor: pc }}>
            <User size={13} className="box-lucide-icon" />
            <span>DETAILS OF RECEIVER / BILLED TO</span>
          </div>
          <div className="inv-box-body">
            <table className="inv-info-table">
              <tbody>
                <tr>
                  <td className="info-label">Name</td>
                  <td className="info-sep">:</td>
                  <td className="info-val font-bold">{billedTo.name || '-'}</td>
                </tr>
                <tr>
                  <td className="info-label">Address</td>
                  <td className="info-sep">:</td>
                  <td className="info-val">
                    {billedTo.address}
                    {billedTo.city && `, ${billedTo.city}`}
                    {billedTo.pincode && `-${billedTo.pincode}`}
                  </td>
                </tr>
                {billedTo.phone && (
                  <tr>
                    <td className="info-label">Mobile No.</td>
                    <td className="info-sep">:</td>
                    <td className="info-val">{billedTo.phone}</td>
                  </tr>
                )}
                <tr>
                  <td className="info-label">GSTIN</td>
                  <td className="info-sep">:</td>
                  <td className="info-val">{billedTo.gstin || '-'}</td>
                </tr>
              </tbody>
            </table>
            <div className="inv-state-row">
              <span>State : {billedTo.state || 'GUJARAT'}</span>
              <span>State Code : {billedTo.stateCode || '24'}</span>
            </div>
          </div>
        </div>

        {/* Shipped To */}
        <div className="inv-detail-box">
          <div className="inv-box-header" style={{ backgroundColor: pc }}>
            <UserCheck size={13} className="box-lucide-icon" />
            <span>DETAILS OF CONSIGNEE / SHIPPED TO</span>
          </div>
          <div className="inv-box-body">
            <table className="inv-info-table">
              <tbody>
                <tr>
                  <td className="info-label">Name</td>
                  <td className="info-sep">:</td>
                  <td className="info-val font-bold">{shippingParty.name || '-'}</td>
                </tr>
                <tr>
                  <td className="info-label">Address</td>
                  <td className="info-sep">:</td>
                  <td className="info-val">
                    {shippingParty.address}
                    {shippingParty.city && `, ${shippingParty.city}`}
                    {shippingParty.pincode && `-${shippingParty.pincode}`}
                  </td>
                </tr>
                {shippingParty.phone && (
                  <tr>
                    <td className="info-label">Mobile No.</td>
                    <td className="info-sep">:</td>
                    <td className="info-val">{shippingParty.phone}</td>
                  </tr>
                )}
                <tr>
                  <td className="info-label">GSTIN</td>
                  <td className="info-sep">:</td>
                  <td className="info-val">{shippingParty.gstin || '-'}</td>
                </tr>
              </tbody>
            </table>
            <div className="inv-state-row">
              <span>State : {shippingParty.state || 'GUJARAT'}</span>
              <span>State Code : {shippingParty.stateCode || '24'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 6. PRODUCT TABLE ── */}
      <table className="inv-product-table gst-product-table">
        <thead>
          <tr style={{ backgroundColor: pc, color: '#fff' }}>
            <th rowSpan={2} className="col-sr">Sr.<br />No.</th>
            <th rowSpan={2} className="col-desc">Description of Goods</th>
            <th rowSpan={2} className="col-hsn">HSN<br />Code</th>
            <th rowSpan={2} className="col-qty">Qty</th>
            <th rowSpan={2} className="col-unit">Unit</th>
            <th rowSpan={2} className="col-rate">Rate</th>
            <th rowSpan={2} className="col-disc">Disc.</th>
            <th rowSpan={2} className="col-taxable">Taxable<br />Value</th>
            <th colSpan={2} className="text-center">CGST</th>
            <th colSpan={2} className="text-center">SGST</th>
            <th colSpan={2} className="text-center">IGST</th>
          </tr>
          <tr style={{ backgroundColor: pc, color: '#fff' }}>
            <th className="col-tax-pct">%</th>
            <th className="col-tax-amt">Amount</th>
            <th className="col-tax-pct">%</th>
            <th className="col-tax-amt">Amount</th>
            <th className="col-tax-pct">%</th>
            <th className="col-tax-amt">Amount</th>
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
              <td className="text-center">{p.hsn || '-'}</td>
              <td className="text-center">{p.qty}</td>
              <td className="text-center">{p.unit || '-'}</td>
              <td className="text-right">{formatCurrency(p.rate)}</td>
              <td className="text-center">{p.discountPct > 0 ? `${p.discountPct}%` : '-'}</td>
              <td className="text-right">{formatCurrency(p.taxableAmt)}</td>

              {/* CGST */}
              <td className="text-center">{showCGSTSGST ? `${p.cgstPct}%` : '-'}</td>
              <td className="text-right">{showCGSTSGST ? formatCurrency(p.cgstAmt) : '-'}</td>

              {/* SGST */}
              <td className="text-center">{showCGSTSGST ? `${p.sgstPct}%` : '-'}</td>
              <td className="text-right">{showCGSTSGST ? formatCurrency(p.sgstAmt) : '-'}</td>

              {/* IGST */}
              <td className="text-center">{showIGST ? `${p.igstPct}%` : '-'}</td>
              <td className="text-right">{showIGST ? formatCurrency(p.igstAmt) : '-'}</td>
            </tr>
          ))}

          {/* Dynamic blank filler row to stretch vertical borders to bottom */}
          <tr className="inv-blank-filler-row">
            <td className="text-center">&nbsp;</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
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
            <td colSpan={7} className="text-center font-bold" style={{ color: pc }}>
              TOTAL
            </td>
            <td className="text-right font-bold" style={{ color: pc }}>
              {formatCurrency(totals.totalTaxable)}
            </td>
            <td className="text-center"></td>
            <td className="text-right font-bold" style={{ color: pc }}>
              {showCGSTSGST ? formatCurrency(totals.totalCgst) : '-'}
            </td>
            <td className="text-center"></td>
            <td className="text-right font-bold" style={{ color: pc }}>
              {showCGSTSGST ? formatCurrency(totals.totalSgst) : '-'}
            </td>
            <td className="text-center"></td>
            <td className="text-right font-bold" style={{ color: pc }}>
              {showIGST ? formatCurrency(totals.totalIgst) : '-'}
            </td>
          </tr>
        </tfoot>
      </table>

      {/* ── 7. BOTTOM: AMOUNT IN WORDS + BANK + DECLARATION & TAX SUMMARY + SIGNATURE ── */}
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

          {/* Declaration */}
          <div className="inv-box-card">
            <div className="inv-box-header" style={{ color: pc }}>
              <ScrollText size={13} className="box-lucide-icon" />
              <span>DECLARATION</span>
            </div>
            <div className="inv-box-body">
              <p className="declaration-text">{COMPANY.declaration}</p>
            </div>
          </div>
        </div>

        {/* Right column: Tax summary & Signature */}
        <div className="inv-bottom-right">
          <table className="inv-tax-summary">
            <tbody>
              <tr>
                <td>Total Amount Before Tax</td>
                <td className="text-right">₹&nbsp;&nbsp;{formatCurrency(totals.totalTaxable)}</td>
              </tr>
              {showCGSTSGST && cgstRates.length > 0 && cgstRates.map((rate) => (
                <React.Fragment key={`cgst-${rate}`}>
                  <tr>
                    <td>Add : CGST ({rate}%)</td>
                    <td className="text-right">
                      ₹&nbsp;&nbsp;{formatCurrency(computedProducts.filter((p) => p.cgstPct === rate).reduce((s, p) => s + p.cgstAmt, 0))}
                    </td>
                  </tr>
                  <tr>
                    <td>Add : SGST ({rate}%)</td>
                    <td className="text-right">
                      ₹&nbsp;&nbsp;{formatCurrency(computedProducts.filter((p) => p.sgstPct === rate).reduce((s, p) => s + p.sgstAmt, 0))}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
              {showCGSTSGST && cgstRates.length === 0 && (
                <>
                  <tr>
                    <td>Add : CGST</td>
                    <td className="text-right">₹&nbsp;&nbsp;{formatCurrency(totals.totalCgst)}</td>
                  </tr>
                  <tr>
                    <td>Add : SGST</td>
                    <td className="text-right">₹&nbsp;&nbsp;{formatCurrency(totals.totalSgst)}</td>
                  </tr>
                </>
              )}
              {showIGST && igstRates.length > 0 && igstRates.map((rate) => (
                <tr key={`igst-${rate}`}>
                  <td>Add : IGST ({rate}%)</td>
                  <td className="text-right">
                    ₹&nbsp;&nbsp;{formatCurrency(computedProducts.filter((p) => p.igstPct === rate).reduce((s, p) => s + p.igstAmt, 0))}
                  </td>
                </tr>
              ))}
              {showIGST && igstRates.length === 0 && (
                <tr>
                  <td>Add : IGST</td>
                  <td className="text-right">₹&nbsp;&nbsp;{formatCurrency(totals.totalIgst)}</td>
                </tr>
              )}
              {!showCGSTSGST && !showIGST && (
                <tr>
                  <td>Add : Tax</td>
                  <td className="text-right">₹&nbsp;&nbsp;0.00</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="grand-total-row" style={{ backgroundColor: pc, color: '#fff' }}>
                <td className="font-bold">Total Amount After Tax</td>
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

      {/* ── 8. TERMS AND CONDITIONS (FULL WIDTH) ── */}
      <div className="inv-terms-gst">
        <div className="inv-box-header" style={{ color: pc }}>
          <div className="flex items-center gap-1.5">
            <FileText size={13} className="box-lucide-icon" />
            <span>TERMS AND CONDITIONS</span>
          </div>
          <span className="terms-eo">(E. &amp; O.E.)</span>
        </div>
        <div className="inv-box-body">
          <div className="terms-cols">
            <ol className="terms-list">
              {COMPANY.gstTermsLeft.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ol>
            <ol className="terms-list" start={4}>
              {COMPANY.gstTermsRight.map((t, i) => (
                <li key={i + 4}>{t}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
