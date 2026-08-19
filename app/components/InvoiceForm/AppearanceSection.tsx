'use client';

import React, { useRef } from 'react';
import type { AppearanceSettings } from '../../lib/types';

interface Props {
  data: AppearanceSettings;
  onChange: (field: keyof AppearanceSettings, value: string) => void;
}

const FONT_OPTIONS = [
  { label: 'Arial (Default)', value: "'Arial', sans-serif" },
  { label: 'Times New Roman', value: "'Times New Roman', serif" },
  { label: 'Georgia', value: "'Georgia', serif" },
  { label: 'Calibri', value: "'Calibri', sans-serif" },
  { label: 'Verdana', value: "'Verdana', sans-serif" },
];

export default function AppearanceSection({ data, onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onChange('logoUrl', ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="form-section">
      <h2 className="section-title">
        <span className="section-icon">🎨</span>
        Invoice Appearance
      </h2>
      <div className="form-grid form-grid-3">
        <div className="field-group col-span-3">
          <label className="field-label">Company Logo</label>
          <div className="logo-upload-area">
            {data.logoUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.logoUrl} alt="Logo preview" className="logo-preview" />
            )}
            <div className="logo-upload-controls">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => fileInputRef.current?.click()}
              >
                📁 Upload Logo
              </button>
              {data.logoUrl !== '/logo.png' && (
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => onChange('logoUrl', '/logo.png')}
                >
                  Reset to Default
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleLogoChange}
            />
          </div>
        </div>

        <div className="field-group">
          <label htmlFor="primaryColor" className="field-label">Primary Color</label>
          <div className="color-input-group">
            <input
              id="primaryColor"
              type="color"
              className="color-picker"
              value={data.primaryColor}
              onChange={(e) => onChange('primaryColor', e.target.value)}
            />
            <input
              type="text"
              className="form-input"
              value={data.primaryColor}
              onChange={(e) => onChange('primaryColor', e.target.value)}
              placeholder="#8B1A1A"
            />
          </div>
        </div>

        <div className="field-group">
          <label htmlFor="tableHeaderColor" className="field-label">Table Header Color</label>
          <div className="color-input-group">
            <input
              id="tableHeaderColor"
              type="color"
              className="color-picker"
              value={data.tableHeaderColor}
              onChange={(e) => onChange('tableHeaderColor', e.target.value)}
            />
            <input
              type="text"
              className="form-input"
              value={data.tableHeaderColor}
              onChange={(e) => onChange('tableHeaderColor', e.target.value)}
              placeholder="#8B1A1A"
            />
          </div>
        </div>

        <div className="field-group">
          <label htmlFor="fontFamily" className="field-label">Font Family</label>
          <select
            id="fontFamily"
            className="form-input form-select"
            value={data.fontFamily}
            onChange={(e) => onChange('fontFamily', e.target.value)}
          >
            {FONT_OPTIONS.map((f) => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
