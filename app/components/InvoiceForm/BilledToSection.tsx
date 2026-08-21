'use client';

import React from 'react';
import type { PartyDetails } from '../../lib/types';
import { STATES } from '../../lib/constants';

interface Props {
  data: PartyDetails;
  onChange: (field: keyof PartyDetails, value: string) => void;
}

export default function BilledToSection({ data, onChange }: Props) {
  const handleStateChange = (stateName: string) => {
    onChange('state', stateName);
    const found = STATES.find((s) => s.name === stateName);
    if (found) onChange('stateCode', found.code);
  };

  return (
    <div className="form-section">
      <h2 className="section-title">
        <span className="section-icon">👤</span>
        Billed To
      </h2>
      <div className="form-grid form-grid-3">
        <div className="field-group col-span-2">
          <label htmlFor="billedName" className="field-label">
            Customer Name <span className="required">*</span>
          </label>
          <input
            id="billedName"
            type="text"
            className="form-input"
            placeholder="Company or person name"
            value={data.name}
            onChange={(e) => onChange('name', e.target.value)}
          />
        </div>

        <div className="field-group">
          <label htmlFor="billedPhone" className="field-label">Phone</label>
          <input
            id="billedPhone"
            type="tel"
            className="form-input"
            placeholder="Mobile number"
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
          />
        </div>

        <div className="field-group col-span-3">
          <label htmlFor="billedAddress" className="field-label">
            Address <span className="required">*</span>
          </label>
          <textarea
            id="billedAddress"
            className="form-input form-textarea"
            placeholder="Street address"
            rows={2}
            value={data.address}
            onChange={(e) => onChange('address', e.target.value)}
          />
        </div>

        <div className="field-group">
          <label htmlFor="billedCity" className="field-label">City</label>
          <input
            id="billedCity"
            type="text"
            className="form-input"
            placeholder="City"
            value={data.city}
            onChange={(e) => onChange('city', e.target.value)}
          />
        </div>

        <div className="field-group">
          <label htmlFor="billedState" className="field-label">State</label>
          <select
            id="billedState"
            className="form-input form-select"
            value={data.state}
            onChange={(e) => handleStateChange(e.target.value)}
          >
            <option value="">Select State</option>
            {STATES.map((s) => (
              <option key={s.code} value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>

        <div className="field-group">
          <label htmlFor="billedStateCode" className="field-label">State Code</label>
          <input
            id="billedStateCode"
            type="text"
            className="form-input"
            placeholder="e.g. 24"
            value={data.stateCode}
            onChange={(e) => onChange('stateCode', e.target.value)}
          />
        </div>

        <div className="field-group">
          <label htmlFor="billedPincode" className="field-label">Pincode</label>
          <input
            id="billedPincode"
            type="text"
            className="form-input"
            placeholder="6-digit pincode"
            maxLength={6}
            value={data.pincode}
            onChange={(e) => onChange('pincode', e.target.value)}
          />
        </div>

        <div className="field-group">
          <label htmlFor="billedGstin" className="field-label">GSTIN</label>
          <input
            id="billedGstin"
            type="text"
            className="form-input"
            placeholder="15-digit GSTIN"
            maxLength={15}
            value={data.gstin}
            onChange={(e) => onChange('gstin', e.target.value.toUpperCase())}
          />
        </div>

        <div className="field-group">
          <label htmlFor="billedEmail" className="field-label">Email</label>
          <input
            id="billedEmail"
            type="email"
            className="form-input"
            placeholder="customer@example.com"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
