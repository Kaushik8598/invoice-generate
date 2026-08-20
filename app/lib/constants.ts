export const COMPANY = {
  name: 'SHIV GRAPHICS & ELEVATION',
  shortName: 'SHIV GRAPHICS',
  tagline: 'We make Your Brands First Impression',
  address: 'Shop No. 8, Chitrakut Shopping Nr. Vitthal Nagar Soc, Varachha Main Road, Hira Baug, Surat - 395006, Gujarat',
  phone: 'M. 9998842333, 9033377931',
  email: 'shivgraphics111@gmail.com',
  gstin: '24CSQPM5914H1ZF',
  pan: 'AACCS1234A',
  bank: {
    name: 'HDFC BANK',
    accountNo: '50200073187088',
    ifsc: 'HDFC0001704',
    branch: 'PUNA KUMBHARIYA',
  },
  terms: [
    'Payment will be accepted only by A/c. Payee Draft/Cheque.',
    'Interest @18% p.a. will be charged on account if not paid within due period.',
    'Subject to SURAT Jurisdiction.',
    'Amount of Tax Subject to Reverse Charges.',
    'Our Liability & responsibility ceases as soon as the goods leave our premises.',
    'Goods once sold will not be taken back in any cases.',
    'No allowances for shortages or difference in quality will be allowed unless the notice for the same is given within 24 hrs after rejection of Goods.',
    'Subject to the Ankleshwar Jurisdiction.',
  ],
  declaration:
    'We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.',
} as const;

/**
 * INVOICE APPEARANCE CONFIGURATION
 * Edit these values to change the look of generated invoices.
 * These settings are NOT editable from the form UI — manage them here only.
 */
export const APPEARANCE = {
  /** Main brand color used for banners, headers, totals, and accents */
  primaryColor: '#8B1A1A',
  /** Light background color for alternating rows */
  secondaryColor: '#f5f5f5',
  /** Background color of product table header row */
  tableHeaderColor: '#8B1A1A',
  /** Font family applied to the generated invoice */
  fontFamily: "'Arial', sans-serif",
  /** Path or URL to the company logo shown on the invoice */
  logoUrl: '/logo.png',
} as const;

export const UNITS = [
  'PCS', 'NOS', 'JOB', 'KG', 'MTR', 'SQF', 'SQM', 'LTR', 'BOX', 'SET', 'PAIR', '-',
];

export const GST_RATES = [0, 5, 12, 18, 28];

export const STATES = [
  { name: 'Andhra Pradesh', code: '28' },
  { name: 'Arunachal Pradesh', code: '12' },
  { name: 'Assam', code: '18' },
  { name: 'Bihar', code: '10' },
  { name: 'Chhattisgarh', code: '22' },
  { name: 'Goa', code: '30' },
  { name: 'Gujarat', code: '24' },
  { name: 'Haryana', code: '06' },
  { name: 'Himachal Pradesh', code: '02' },
  { name: 'Jharkhand', code: '20' },
  { name: 'Karnataka', code: '29' },
  { name: 'Kerala', code: '32' },
  { name: 'Madhya Pradesh', code: '23' },
  { name: 'Maharashtra', code: '27' },
  { name: 'Manipur', code: '14' },
  { name: 'Meghalaya', code: '17' },
  { name: 'Mizoram', code: '15' },
  { name: 'Nagaland', code: '13' },
  { name: 'Odisha', code: '21' },
  { name: 'Punjab', code: '03' },
  { name: 'Rajasthan', code: '08' },
  { name: 'Sikkim', code: '11' },
  { name: 'Tamil Nadu', code: '33' },
  { name: 'Telangana', code: '36' },
  { name: 'Tripura', code: '16' },
  { name: 'Uttar Pradesh', code: '09' },
  { name: 'Uttarakhand', code: '05' },
  { name: 'West Bengal', code: '19' },
  { name: 'Delhi', code: '07' },
];
