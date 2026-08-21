'use client';

import React from 'react';
import type { PartyDetails, ShippedToDetails } from '../../lib/types';
import { STATES } from '../../lib/constants';

interface Props {
  data: ShippedToDetails;
  billedTo: PartyDetails;
  onChange: (field: keyof ShippedToDetails, value: string | boolean) => void;
}

export default function ShippedToSection({ data, billedTo, onChange }: Props) {
  const handleSameAsBilled = (checked: boolean) => {
    onChange('sameAsBilled', checked);
    if (checked) {
      onChange('name', billedTo.name);
      onChange('address', billedTo.address);
      onChange('city', billedTo.city);
      onChange('state', billedTo.state);
      onChange('stateCode', billedTo.stateCode);
      onChange('pincode', billedTo.pincode);
      onChange('phone', billedTo.phone);
      onChange('gstin', billedTo.gstin);
      onChange('email', billedTo.email);
    }
  };

  const handleStateChange = (stateName: string) => {
    onChange('state', stateName);
    const found = STATES.find((s) => s.name === stateName);
    if (found) onChange('stateCode', found.code);
  };

  return (
    <div className="form-section">
      <h2 className="section-title">
        <span className="section-icon">📦</span>
        Shipped To
      </h2>

      <div className="same-as-billed">
        <label className="checkbox-option">
          <input
            type="checkbox"
            id="sameAsBilled"
            checked={data.sameAsBilled}
            onChange={(e) => handleSameAsBilled(e.target.checked)}
          />
          <span className="checkbox-label">Same as Billed To</span>
        </label>
      </div>

      <div className="form-grid form-grid-3">
        <div className="field-group col-span-2">
          <label htmlFor="shippedName" className="field-label">Name</label>
          <input
            id="shippedName"
            type="text"
            className="form-input"
            placeholder="Recipient name"
            value={data.name}
            onChange={(e) => { onChange('sameAsBilled', false); onChange('name', e.target.value); }}
          />
        </div>

        <div className="field-group">
          <label htmlFor="shippedPhone" className="field-label">Phone</label>
          <input
            id="shippedPhone"
            type="tel"
            className="form-input"
            placeholder="Mobile number"
            value={data.phone}
            onChange={(e) => { onChange('sameAsBilled', false); onChange('phone', e.target.value); }}
          />
        </div>

        <div className="field-group col-span-3">
          <label htmlFor="shippedAddress" className="field-label">Address</label>
          <textarea
            id="shippedAddress"
            className="form-input form-textarea"
            placeholder="Shipping address"
            rows={2}
            value={data.address}
            onChange={(e) => { onChange('sameAsBilled', false); onChange('address', e.target.value); }}
          />
        </div>

        <div className="field-group">
          <label htmlFor="shippedCity" className="field-label">City</label>
          <input
            id="shippedCity"
            type="text"
            className="form-input"
            placeholder="City"
            value={data.city}
            onChange={(e) => { onChange('sameAsBilled', false); onChange('city', e.target.value); }}
          />
        </div>

        <div className="field-group">
          <label htmlFor="shippedState" className="field-label">State</label>
          <select
            id="shippedState"
            className="form-input form-select"
            value={data.state}
            onChange={(e) => { onChange('sameAsBilled', false); handleStateChange(e.target.value); }}
          >
            <option value="">Select State</option>
            {STATES.map((s) => (
              <option key={s.code} value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>

        <div className="field-group">
          <label htmlFor="shippedStateCode" className="field-label">State Code</label>
          <input
            id="shippedStateCode"
            type="text"
            className="form-input"
            placeholder="e.g. 24"
            value={data.stateCode}
            onChange={(e) => { onChange('sameAsBilled', false); onChange('stateCode', e.target.value); }}
          />
        </div>

        <div className="field-group">
          <label htmlFor="shippedPincode" className="field-label">Pincode</label>
          <input
            id="shippedPincode"
            type="text"
            className="form-input"
            placeholder="6-digit pincode"
            maxLength={6}
            value={data.pincode}
            onChange={(e) => { onChange('sameAsBilled', false); onChange('pincode', e.target.value); }}
          />
        </div>

        <div className="field-group">
          <label htmlFor="shippedGstin" className="field-label">GSTIN</label>
          <input
            id="shippedGstin"
            type="text"
            className="form-input"
            placeholder="15-digit GSTIN"
            maxLength={15}
            value={data.gstin}
            onChange={(e) => { onChange('sameAsBilled', false); onChange('gstin', e.target.value.toUpperCase()); }}
          />
        </div>

        <div className="field-group">
          <label htmlFor="shippedEmail" className="field-label">Email</label>
          <input
            id="shippedEmail"
            type="email"
            className="form-input"
            placeholder="contact@example.com"
            value={data.email}
            onChange={(e) => { onChange('sameAsBilled', false); onChange('email', e.target.value); }}
          />
        </div>
      </div>
    </div>
  );
}
