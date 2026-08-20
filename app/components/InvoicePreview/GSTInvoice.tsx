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

export default function GSTInvoice({ formData, computedProducts, totals }: Props) {
  const { billedTo, shippedTo, transport, invoiceNo, invoiceDate, taxType } = formData;
  const pc = APPEARANCE.primaryColor;
  const words = amountInWords(totals.grandTotal);

  const showCGSTSGST = taxType === 'cgst_sgst';
  const showIGST = taxType === 'igst';

  // Build shipping info
  const shippingParty = shippedTo.sameAsBilled ? billedTo : shippedTo;

  // Get distinct CGST/SGST rates from products (for summary)
  const cgstRates = [...new Set(computedProducts.map((p) => p.cgstPct))].filter((r) => r > 0);
  const igstRates = [...new Set(computedProducts.map((p) => p.igstPct))].filter((r) => r > 0);

  return (
    <div
      className="invoice-page gst-invoice"
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
        <div className="inv-addr-divider">|</div>
        <div className="inv-addr-item">
          <span className="addr-icon">📞</span>
          <span>{COMPANY.phone}</span>
        </div>
        <div className="inv-addr-divider">|</div>
        <div className="inv-addr-item">
          <span className="addr-icon">✉</span>
          <span>{COMPANY.email}</span>
        </div>
      </div>

      {/* ── GSTIN BANNER ── */}
      <div className="inv-gstin-banner">
        GSTIN : {COMPANY.gstin}
      </div>

      {/* ── INVOICE + TRANSPORT DETAILS ── */}
      <div className="inv-detail-row">
        {/* Invoice Details */}
        <div className="inv-detail-box">
          <div className="inv-box-header" style={{ backgroundColor: pc }}>
            <span className="box-icon">🧾</span> INVOICE DETAILS
          </div>
          <div className="inv-box-body">
            <table className="inv-info-table">
              <tbody>
                <tr>
                  <td className="info-label">Invoice No.</td>
                  <td>:</td>
                  <td>{invoiceNo || '-'}</td>
                </tr>
                <tr>
                  <td className="info-label">Invoice Date</td>
                  <td>:</td>
                  <td>{formatDate(invoiceDate)}</td>
                </tr>
                {formData.dueDate && (
                  <tr>
                    <td className="info-label">Due Date</td>
                    <td>:</td>
                    <td>{formatDate(formData.dueDate)}</td>
                  </tr>
                )}
                {formData.referenceNo && (
                  <tr>
                    <td className="info-label">Reference No.</td>
                    <td>:</td>
                    <td>{formData.referenceNo}</td>
                  </tr>
                )}
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
            <span className="box-icon">🚚</span> TRANSPORTATION DETAILS
          </div>
          <div className="inv-box-body">
            <table className="inv-info-table">
              <tbody>
                <tr>
                  <td className="info-label">Transportation Mode</td>
                  <td>:</td>
                  <td>{transport.transportMode || '-'}</td>
                </tr>
                <tr>
                  <td className="info-label">Transporter Name</td>
                  <td>:</td>
                  <td>{transport.transporterName || '-'}</td>
                </tr>
                <tr>
                  <td className="info-label">Vehicle Number</td>
                  <td>:</td>
                  <td>{transport.vehicleNo || '-'}</td>
                </tr>
                <tr>
                  <td className="info-label">PO No.</td>
                  <td>:</td>
                  <td>{transport.poNo || '-'}</td>
                </tr>
                <tr>
                  <td className="info-label">LR / GR No.</td>
                  <td>:</td>
                  <td>{transport.lrGrNo || '-'}</td>
                </tr>
                <tr>
                  <td className="info-label">Date of Supply</td>
                  <td>:</td>
                  <td>{transport.dateOfSupply ? formatDate(transport.dateOfSupply) : '-'}</td>
                </tr>
                <tr>
                  <td className="info-label">Place of Supply</td>
                  <td>:</td>
                  <td>{transport.placeOfSupply || formData.placeOfSupply || '-'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── BILLED TO + SHIPPED TO ── */}
      <div className="inv-detail-row">
        {/* Billed To */}
        <div className="inv-detail-box">
          <div className="inv-box-header" style={{ backgroundColor: pc }}>
            <span className="box-icon">👤</span> DETAILS OF RECEIVER / BILLED TO
          </div>
          <div className="inv-box-body">
            <table className="inv-info-table">
              <tbody>
                <tr>
                  <td className="info-label">Name</td>
                  <td>:</td>
                  <td className="font-bold">{billedTo.name || '-'}</td>
                </tr>
                <tr>
                  <td className="info-label">Address</td>
                  <td>:</td>
                  <td>
                    {billedTo.address}
                    {billedTo.city && `, ${billedTo.city}`}
                    {billedTo.state && `, ${billedTo.state}`}
                    {billedTo.pincode && `-${billedTo.pincode}`}
                  </td>
                </tr>
                <tr>
                  <td className="info-label">GSTIN</td>
                  <td>:</td>
                  <td>{billedTo.gstin || '-'}</td>
                </tr>
              </tbody>
            </table>
            <div className="inv-state-row">
              <span>State : {billedTo.state || '-'}</span>
              <span>State Code : {billedTo.stateCode || '-'}</span>
            </div>
          </div>
        </div>

        {/* Shipped To */}
        <div className="inv-detail-box">
          <div className="inv-box-header" style={{ backgroundColor: pc }}>
            <span className="box-icon">📦</span> DETAILS OF CONSIGNEE / SHIPPED TO
          </div>
          <div className="inv-box-body">
            <table className="inv-info-table">
              <tbody>
                <tr>
                  <td className="info-label">Name</td>
                  <td>:</td>
                  <td className="font-bold">{shippingParty.name || '-'}</td>
                </tr>
                <tr>
                  <td className="info-label">Address</td>
                  <td>:</td>
                  <td>
                    {shippingParty.address}
                    {shippingParty.city && `, ${shippingParty.city}`}
                    {shippingParty.state && `, ${shippingParty.state}`}
                    {shippingParty.pincode && `-${shippingParty.pincode}`}
                  </td>
                </tr>
                <tr>
                  <td className="info-label">GSTIN</td>
                  <td>:</td>
                  <td>{shippingParty.gstin || '-'}</td>
                </tr>
              </tbody>
            </table>
            <div className="inv-state-row">
              <span>State : {shippingParty.state || '-'}</span>
              <span>State Code : {shippingParty.stateCode || '-'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── PRODUCT TABLE ── */}
      <table className="inv-product-table gst-product-table" style={{ '--inv-header-color': pc } as React.CSSProperties}>
        <thead>
          <tr style={{ backgroundColor: pc, color: '#fff' }}>
            <th rowSpan={2} className="col-sr">Sr. No.</th>
            <th rowSpan={2} className="col-desc">Description of Goods</th>
            <th rowSpan={2} className="col-hsn-gst">HSN Code</th>
            <th rowSpan={2} className="col-qty">Qty</th>
            <th rowSpan={2} className="col-unit">Unit</th>
            <th rowSpan={2} className="col-rate">Rate</th>
            <th rowSpan={2} className="col-disc-gst">Disc.</th>
            <th rowSpan={2} className="col-taxable">Taxable Value</th>
            {showCGSTSGST && (
              <>
                <th colSpan={2} className="text-center">CGST</th>
                <th colSpan={2} className="text-center">SGST</th>
              </>
            )}
            {showIGST && (
              <th colSpan={2} className="text-center">IGST</th>
            )}
            {taxType === 'none' && <th rowSpan={2}>Amount</th>}
          </tr>
          {(showCGSTSGST || showIGST) && (
            <tr style={{ backgroundColor: pc, color: '#fff' }}>
              {showCGSTSGST && (
                <>
                  <th>%</th><th>Amount</th>
                  <th>%</th><th>Amount</th>
                </>
              )}
              {showIGST && (
                <>
                  <th>%</th><th>Amount</th>
                </>
              )}
            </tr>
          )}
        </thead>
        <tbody>
          {computedProducts.map((p, i) => (
            <tr key={p.id} className={i % 2 === 1 ? 'row-alt' : ''}>
              <td className="text-center">{i + 1}</td>
              <td>
                <div className="prod-name">{p.name}</div>
                {p.description && <div className="prod-desc">{p.description}</div>}
              </td>
              <td className="text-center">{p.hsn || '-'}</td>
              <td className="text-center">{p.qty}</td>
              <td className="text-center">{p.unit}</td>
              <td className="text-right">{formatCurrency(p.rate)}</td>
              <td className="text-center">{p.discountPct > 0 ? `${p.discountPct}%` : '-'}</td>
              <td className="text-right">{formatCurrency(p.taxableAmt)}</td>
              {showCGSTSGST && (
                <>
                  <td className="text-center">{p.cgstPct}</td>
                  <td className="text-right">{formatCurrency(p.cgstAmt)}</td>
                  <td className="text-center">{p.sgstPct}</td>
                  <td className="text-right">{formatCurrency(p.sgstAmt)}</td>
                </>
              )}
              {showIGST && (
                <>
                  <td className="text-center">{p.igstPct}</td>
                  <td className="text-right">{formatCurrency(p.igstAmt)}</td>
                </>
              )}
              {taxType === 'none' && <td className="text-right">{formatCurrency(p.total)}</td>}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="inv-total-row" style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
            <td colSpan={7} className="text-right">TOTAL</td>
            <td className="text-right">{formatCurrency(totals.totalTaxable)}</td>
            {showCGSTSGST && (
              <>
                <td></td>
                <td className="text-right">{formatCurrency(totals.totalCgst)}</td>
                <td></td>
                <td className="text-right">{formatCurrency(totals.totalSgst)}</td>
              </>
            )}
            {showIGST && (
              <>
                <td></td>
                <td className="text-right">{formatCurrency(totals.totalIgst)}</td>
              </>
            )}
            {taxType === 'none' && <td className="text-right">{formatCurrency(totals.grandTotal)}</td>}
          </tr>
        </tfoot>
      </table>

      {/* ── BOTTOM: AMOUNT IN WORDS + BANK + TOTALS ── */}
      <div className="inv-bottom-gst">
        {/* Left column */}
        <div className="inv-bottom-left">
          {/* Amount in Words */}
          <div className="inv-words-box">
            <div className="inv-box-header" style={{ backgroundColor: pc }}>
              <span className="box-icon">₹</span> AMOUNT IN WORDS
            </div>
            <div className="inv-box-body">
              <div className="aiw-text">{words}</div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="inv-bank-box-gst">
            <div className="inv-box-header" style={{ backgroundColor: pc }}>
              <span className="box-icon">🏦</span> BANK DETAILS
            </div>
            <div className="inv-box-body">
              <table className="inv-bank-table">
                <tbody>
                  <tr>
                    <td>NAME</td>
                    <td>:</td>
                    <td>{COMPANY.shortName}</td>
                    <td>IFSC</td>
                    <td>:</td>
                    <td>{COMPANY.bank.ifsc}</td>
                  </tr>
                  <tr>
                    <td>A/C</td>
                    <td>:</td>
                    <td>{COMPANY.bank.accountNo}</td>
                    <td>BANK</td>
                    <td>:</td>
                    <td>{COMPANY.bank.name}</td>
                  </tr>
                  <tr>
                    <td>BRANCH</td>
                    <td>:</td>
                    <td colSpan={4}>{COMPANY.bank.branch}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Declaration */}
          <div className="inv-declaration-box">
            <div className="inv-box-header" style={{ backgroundColor: pc }}>
              <span className="box-icon">📜</span> DECLARATION
            </div>
            <div className="inv-box-body">
              <p className="declaration-text">{COMPANY.declaration}</p>
            </div>
          </div>
        </div>

        {/* Right column: Tax summary */}
        <div className="inv-bottom-right">
          <table className="inv-tax-summary">
            <tbody>
              <tr>
                <td>Total Amount Before Tax</td>
                <td className="text-right">₹ {formatCurrency(totals.totalTaxable)}</td>
              </tr>
              {showCGSTSGST && cgstRates.map((rate) => (
                <React.Fragment key={`cgst-${rate}`}>
                  <tr>
                    <td>Add : CGST ({rate}%)</td>
                    <td className="text-right">
                      ₹ {formatCurrency(computedProducts.filter((p) => p.cgstPct === rate).reduce((s, p) => s + p.cgstAmt, 0))}
                    </td>
                  </tr>
                  <tr>
                    <td>Add : SGST ({rate}%)</td>
                    <td className="text-right">
                      ₹ {formatCurrency(computedProducts.filter((p) => p.sgstPct === rate).reduce((s, p) => s + p.sgstAmt, 0))}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
              {showIGST && igstRates.map((rate) => (
                <tr key={`igst-${rate}`}>
                  <td>Add : IGST ({rate}%)</td>
                  <td className="text-right">
                    ₹ {formatCurrency(computedProducts.filter((p) => p.igstPct === rate).reduce((s, p) => s + p.igstAmt, 0))}
                  </td>
                </tr>
              ))}
              {!showCGSTSGST && !showIGST && (
                <tr>
                  <td>Add : Tax</td>
                  <td className="text-right">₹ 0.00</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="grand-total-row" style={{ backgroundColor: pc, color: '#fff' }}>
                <td>Total Amount After Tax</td>
                <td className="text-right">₹ {formatCurrency(totals.grandTotal)}</td>
              </tr>
            </tfoot>
          </table>

          {/* Signature */}
          <div className="inv-signature-gst">
            <div className="inv-for-label" style={{ color: pc }}>For, {COMPANY.shortName}</div>
            <div className="inv-signature-line"></div>
            <div className="inv-signatory-label">Authorised Signatory</div>
          </div>
        </div>
      </div>

      {/* ── TERMS ── */}
      <div className="inv-terms-gst">
        <div className="inv-box-header" style={{ backgroundColor: pc }}>
          <span className="box-icon">📋</span> TERMS &amp; CONDITIONS
          <span className="terms-eo">(E. &amp; O.E.)</span>
        </div>
        <div className="inv-box-body">
          <div className="terms-cols">
            <ol className="terms-list">
              {COMPANY.terms.slice(0, 4).map((t, i) => <li key={i}>{t}</li>)}
            </ol>
            <ol className="terms-list" start={5}>
              {COMPANY.terms.slice(4).map((t, i) => <li key={i + 4}>{t}</li>)}
            </ol>
          </div>
        </div>
      </div>

      {/* ── THANK YOU ── */}
      <div className="inv-thankyou" style={{ color: pc }}>
        — Thank you for your business! —
      </div>
    </div>
  );
}
