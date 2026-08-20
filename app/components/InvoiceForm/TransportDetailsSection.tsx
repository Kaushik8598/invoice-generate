'use client';

import React from 'react';
import type { TransportDetails } from '../../lib/types';

interface Props {
  data: TransportDetails;
  onChange: (field: keyof TransportDetails, value: string) => void;
}

export default function TransportDetailsSection({ data, onChange }: Props) {
  return (
    <div className="form-section">
      <h2 className="section-title">
        <span className="section-icon">🚚</span>
        Transportation Details
      </h2>
      <div className="form-grid form-grid-3">
        <div className="field-group">
          <label htmlFor="transportMode" className="field-label">Transport Mode</label>
          <select
            id="transportMode"
            className="form-input form-select"
            value={data.transportMode}
            onChange={(e) => onChange('transportMode', e.target.value)}
          >
            <option value="">Select Mode</option>
            <option value="LOCAL">Local</option>
            <option value="ROAD">Road</option>
            <option value="RAIL">Rail</option>
            <option value="AIR">Air</option>
            <option value="SHIP">Ship</option>
          </select>
        </div>

        <div className="field-group">
          <label htmlFor="transporterName" className="field-label">Transporter Name</label>
          <input
            id="transporterName"
            type="text"
            className="form-input"
            placeholder="Transporter name"
            value={data.transporterName}
            onChange={(e) => onChange('transporterName', e.target.value)}
          />
        </div>

        <div className="field-group">
          <label htmlFor="vehicleNo" className="field-label">Vehicle Number</label>
          <input
            id="vehicleNo"
            type="text"
            className="form-input"
            placeholder="e.g. GJ-05-AB-1234"
            value={data.vehicleNo}
            onChange={(e) => onChange('vehicleNo', e.target.value)}
          />
        </div>
        <div className="field-group">
          <label htmlFor="poNo" className="field-label">PO Number</label>
          <input
            id="poNo"
            type="text"
            className="form-input"
            placeholder="Purchase order number"
            value={data.poNo}
            onChange={(e) => onChange('poNo', e.target.value)}
          />
        </div>

        <div className="field-group">
          <label htmlFor="dateOfSupply" className="field-label">Date of Supply</label>
          <input
            id="dateOfSupply"
            type="date"
            className="form-input"
            value={data.dateOfSupply}
            onChange={(e) => onChange('dateOfSupply', e.target.value)}
          />
        </div>

        <div className="field-group">
          <label htmlFor="transportPlaceOfSupply" className="field-label">Place of Supply</label>
          <input
            id="transportPlaceOfSupply"
            type="text"
            className="form-input"
            placeholder="e.g. SURAT"
            value={data.placeOfSupply}
            onChange={(e) => onChange('placeOfSupply', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
