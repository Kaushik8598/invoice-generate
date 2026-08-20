'use client';

import React, { useState, useCallback, useMemo } from 'react';
import type { InvoiceFormData, ProductRow, ShippedToDetails } from '../../lib/types';
import { computeProduct, computeTotals } from '../../lib/calculations';
import InvoiceTypeSection from './InvoiceTypeSection';
import InvoiceDetailsSection from './InvoiceDetailsSection';
import TransportDetailsSection from './TransportDetailsSection';
import BilledToSection from './BilledToSection';
import ShippedToSection from './ShippedToSection';
import ProductTable from './ProductTable';
import SummarySection from './SummarySection';
import InvoicePreview from '../InvoicePreview';

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

function getDefaultProduct(): ProductRow {
  return {
    id: generateId(),
    name: '',
    description: '',
    hsn: '',
    size: '',
    qty: '',
    unit: 'PCS',
    rate: '',
    discountPct: '',
    taxPct: 18,
  };
}

const today = new Date().toISOString().split('T')[0];

const DEFAULT_FORM: InvoiceFormData = {
  invoiceType: 'gst',
  taxType: 'cgst_sgst',
  invoiceNo: '',
  invoiceDate: today,
  dueDate: '',
  placeOfSupply: '',
  referenceNo: '',
  paymentTerms: '',
  transport: {
    transporterName: '',
    vehicleNo: '',
    lrGrNo: '',
    transportDate: '',
    ewayBillNo: '',
    transportMode: '',
    poNo: '',
    dateOfSupply: '',
    placeOfSupply: '',
  },
  billedTo: {
    name: '',
    address: '',
    city: '',
    state: '',
    stateCode: '',
    pincode: '',
    phone: '',
    email: '',
    gstin: '',
  },
  shippedTo: {
    sameAsBilled: false,
    name: '',
    address: '',
    city: '',
    state: '',
    stateCode: '',
    pincode: '',
    phone: '',
    email: '',
    gstin: '',
  },
  products: [getDefaultProduct()],
};

interface ValidationErrors {
  [key: string]: string;
}

export default function InvoiceForm() {
  const [formData, setFormData] = useState<InvoiceFormData>(DEFAULT_FORM);
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Computed products and totals
  const computedProducts = useMemo(
    () => formData.products.map((p) => computeProduct(p, formData.invoiceType === 'gst' ? formData.taxType : 'none')),
    [formData.products, formData.taxType, formData.invoiceType]
  );
  const totals = useMemo(() => computeTotals(computedProducts), [computedProducts]);

  // Generic field updaters
  const handleTopField = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleTransport = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, transport: { ...prev.transport, [field]: value } }));
  }, []);

  const handleBilledTo = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, billedTo: { ...prev.billedTo, [field]: value } }));
  }, []);

  const handleShippedTo = useCallback((field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, shippedTo: { ...prev.shippedTo, [field]: value } as ShippedToDetails }));
  }, []);


  // Product operations
  const handleAddProduct = useCallback(() => {
    setFormData((prev) => ({ ...prev, products: [...prev.products, getDefaultProduct()] }));
  }, []);

  const handleRemoveProduct = useCallback((id: string) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
    }));
  }, []);

  const handleProductChange = useCallback((id: string, field: keyof ProductRow, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    }));
  }, []);

  // Validation
  function validate(): boolean {
    const errs: ValidationErrors = {};
    if (!formData.invoiceNo.trim()) errs.invoiceNo = 'Invoice number is required.';
    if (!formData.invoiceDate) errs.invoiceDate = 'Invoice date is required.';
    if (!formData.billedTo.name.trim()) errs['billedTo.name'] = 'Customer name is required.';
    if (!formData.billedTo.address.trim()) errs['billedTo.address'] = 'Billing address is required.';

    formData.products.forEach((p, i) => {
      if (!p.name.trim()) errs[`product.${i}.name`] = `Product ${i + 1}: name is required.`;
      const qty = parseFloat(String(p.qty));
      if (isNaN(qty) || qty <= 0) errs[`product.${i}.qty`] = `Product ${i + 1}: quantity must be > 0.`;
      const rate = parseFloat(String(p.rate));
      if (isNaN(rate) || rate < 0) errs[`product.${i}.rate`] = `Product ${i + 1}: rate must be ≥ 0.`;
      const disc = parseFloat(String(p.discountPct));
      if (!isNaN(disc) && (disc < 0 || disc > 100)) errs[`product.${i}.disc`] = `Product ${i + 1}: discount must be 0–100.`;
      const tax = parseFloat(String(p.taxPct));
      if (!isNaN(tax) && (tax < 0 || tax > 100)) errs[`product.${i}.tax`] = `Product ${i + 1}: GST% must be 0–100.`;
    });

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  const handleGenerate = () => {
    if (validate()) {
      setShowPreview(true);
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
    }
  };

  const handleReset = () => {
    if (confirm('Reset all form data? This cannot be undone.')) {
      setFormData(DEFAULT_FORM);
      setShowPreview(false);
      setErrors({});
    }
  };

  const handleBack = () => {
    setShowPreview(false);
  };

  if (showPreview) {
    return (
      <InvoicePreview
        formData={formData}
        computedProducts={computedProducts}
        totals={totals}
        onBack={handleBack}
      />
    );
  }

  const errorList = Object.values(errors);

  return (
    <div className="invoice-form-container">
      {/* Header */}
      <div className="form-header">
        <div className="form-header-content">
          <h1 className="form-title">Invoice Generator</h1>
          <p className="form-subtitle">Shiv Graphics &amp; Elevation — Professional Invoice System</p>
        </div>
      </div>

      {/* Validation Errors */}
      {errorList.length > 0 && (
        <div className="validation-errors" role="alert">
          <strong>⚠ Please fix the following errors:</strong>
          <ul>
            {errorList.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        </div>
      )}

      <div className="form-body">
        <InvoiceTypeSection
          data={{ invoiceType: formData.invoiceType, taxType: formData.taxType }}
          onChange={handleTopField}
        />

        <InvoiceDetailsSection
          data={{
            invoiceNo: formData.invoiceNo,
            invoiceDate: formData.invoiceDate,
            dueDate: formData.dueDate,
            placeOfSupply: formData.placeOfSupply,
            referenceNo: formData.referenceNo,
            paymentTerms: formData.paymentTerms,
          }}
          onChange={handleTopField}
        />

        {formData.invoiceType === 'gst' && (
          <TransportDetailsSection
            data={formData.transport}
            onChange={handleTransport}
          />
        )}

        <BilledToSection
          data={formData.billedTo}
          onChange={handleBilledTo}
        />

        {formData.invoiceType === 'gst' && (
          <ShippedToSection
            data={formData.shippedTo}
            billedTo={formData.billedTo}
            onChange={handleShippedTo}
          />
        )}

        <ProductTable
          products={formData.products}
          taxType={formData.invoiceType === 'gst' ? formData.taxType : 'none'}
          invoiceType={formData.invoiceType}
          onAdd={handleAddProduct}
          onRemove={handleRemoveProduct}
          onChange={handleProductChange}
        />

        <SummarySection
          products={computedProducts}
          totals={totals}
          taxType={formData.invoiceType === 'gst' ? formData.taxType : 'none'}
          invoiceType={formData.invoiceType}
        />


        {/* Action Buttons */}
        <div className="form-actions">
          <button type="button" className="btn-generate" onClick={handleGenerate}>
            <span>✨</span> Generate Invoice
          </button>
          <button type="button" className="btn-reset" onClick={handleReset}>
            🔄 Reset Form
          </button>
        </div>
      </div>
    </div>
  );
}
