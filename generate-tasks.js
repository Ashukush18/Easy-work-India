// generate-tasks.js
// Generates 400 tasks per category (1,200 total)
// - Data Entry: 400 extensive transcripts (120-180 words each)
// - Captcha Entry: 400 complex 8-char security tokens
// - Form Filling: 400 multi-field applicant records (12-14 fields each)

const { DatabaseSync } = require('node:sqlite');
const fs = require('node:fs');
const path = require('node:path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new DatabaseSync(dbPath);

console.log('Generating 1,200 tasks (400 per category)...');

// Arrays for realistic procedural data generation
const FIRST_NAMES = [
  'Aarav', 'Rajesh', 'Priya', 'Sunita', 'Vikram', 'Ananya', 'Ramesh', 'Kavita',
  'Deepak', 'Meena', 'Amit', 'Pooja', 'Suresh', 'Neha', 'Manoj', 'Shweta',
  'Arun', 'Sneha', 'Gaurav', 'Divya', 'Sanjay', 'Rekha', 'Alok', 'Pallavi',
  'Mahesh', 'Kiran', 'Nitin', 'Geeta', 'Ashok', 'Swati', 'Prakash', 'Bhavna',
  'Balwant', 'Harish', 'Meenakshi', 'Santosh', 'Vidya', 'Chetan', 'Usha', 'Girish'
];

const LAST_NAMES = [
  'Sharma', 'Patil', 'Joshi', 'Verma', 'Kumar', 'Singh', 'Deshmukh', 'Gupta',
  'Yadav', 'Nair', 'Pillai', 'Rao', 'Chavan', 'Kulkarni', 'Mehta', 'Reddy',
  'Choudhary', 'Iyer', 'Bhatt', 'Mishra', 'Pandey', 'Saxena', 'Trivedi', 'Jadhav',
  'Shinde', 'Pawar', 'More', 'Gaikwad', 'Bhosale', 'Sawant', 'Kale', 'Gore'
];

const CITIES_DATA = [
  { city: 'Pune', state: 'Maharashtra', pin: '410503', zone: 'Manchar Sub-Division' },
  { city: 'Mumbai', state: 'Maharashtra', pin: '400001', zone: 'Fort Central Zone' },
  { city: 'Nagpur', state: 'Maharashtra', pin: '440010', zone: 'Dharampeth Ward' },
  { city: 'Nashik', state: 'Maharashtra', pin: '422005', zone: 'Panchavati Circle' },
  { city: 'Ahmedabad', state: 'Gujarat', pin: '380015', zone: 'Navrangpura Zone' },
  { city: 'Surat', state: 'Gujarat', pin: '395007', zone: 'Athwa Gate Zone' },
  { city: 'Bengaluru', state: 'Karnataka', pin: '560001', zone: 'M.G. Road East' },
  { city: 'Hyderabad', state: 'Telangana', pin: '500034', zone: 'Banjara Hills Sector' },
  { city: 'Chennai', state: 'Tamil Nadu', pin: '600004', zone: 'Mylapore Central' },
  { city: 'Coimbatore', state: 'Tamil Nadu', pin: '641018', zone: 'R.S. Puram Ward' },
  { city: 'Indore', state: 'Madhya Pradesh', pin: '452001', zone: 'Palasia Sub-Division' },
  { city: 'Jaipur', state: 'Rajasthan', pin: '302001', zone: 'C-Scheme Civil Lines' },
  { city: 'Lucknow', state: 'Uttar Pradesh', pin: '226001', zone: 'Hazratganj Central' },
  { city: 'Chandigarh', state: 'Punjab & Haryana', pin: '160017', zone: 'Sector 17 Commercial' },
  { city: 'Kolkata', state: 'West Bengal', pin: '700001', zone: 'BBD Bagh Hub' },
  { city: 'Kochi', state: 'Kerala', pin: '682016', zone: 'Ernakulam Marine' }
];

const BANKS = [
  { name: 'State Bank of India', ifsc: 'SBIN0004812' },
  { name: 'HDFC Bank Ltd', ifsc: 'HDFC0001924' },
  { name: 'ICICI Bank Ltd', ifsc: 'ICIC0000341' },
  { name: 'Punjab National Bank', ifsc: 'PUNB0182400' },
  { name: 'Bank of Baroda', ifsc: 'BARB0MANCHA' },
  { name: 'Bank of Maharashtra', ifsc: 'MAHB0000198' },
  { name: 'Canara Bank', ifsc: 'CNRB0002819' },
  { name: 'Axis Bank Ltd', ifsc: 'UTIB0001402' }
];

const SCHEMES = [
  { name: 'PM Surya Ghar Muft Bijli Rooftop Solar Scheme', type: 'Solar Subsidy Grant', amount: 78000 },
  { name: 'Pradhan Mantri Mudra Micro-Enterprise Scheme', type: 'SME Working Capital Loan', amount: 150000 },
  { name: 'National Drip & Micro-Irrigation Grant Scheme', type: 'Agriculture Water Subsidy', amount: 95000 },
  { name: 'PM Awas Gramin Affordable Housing Subsidy', type: 'Rural Housing Sanction', amount: 130000 },
  { name: 'Stand-Up India Women & SC/ST Entrepreneur Grant', type: 'Commercial Term Grant', amount: 250000 },
  { name: 'PM Kisan Urja Suraksha Eva Utthan Solar Pump', type: 'Agricultural Solar Power', amount: 112000 },
  { name: 'Credit Linked Capital Subsidy Scheme (CLCSS)', type: 'Technology Modernization', amount: 185000 },
  { name: 'National Dairy Development Micro-Chiller Subsidy', type: 'Animal Husbandry Asset', amount: 84000 }
];

// 1. DATA ENTRY TEMPLATES GENERATOR (400 Tasks)
function generateDataEntryTasks() {
  const tasks = [];
  const domains = [
    'Clinical Medical Health Ledger',
    'Municipal Property Tax & Mutation Deed',
    'Logistics E-Way Transit & Freight Manifest',
    'Banking KYC & MSME Credit Underwriting',
    'Public Works Dept Civil Infrastructure Order',
    'Employees Provident Fund (EPFO) Registration',
    'State University Examination & Convocation Roll',
    'Crop Insurance Survey & Yield Loss Assessment'
  ];

  for (let i = 1; i <= 400; i++) {
    const id = `TSK-DE-${String(i).padStart(3, '0')}`;
    const domain = domains[(i - 1) % domains.length];
    const fn = FIRST_NAMES[(i * 3 + 2) % FIRST_NAMES.length];
    const ln = LAST_NAMES[(i * 7 + 5) % LAST_NAMES.length];
    const applicant = `${fn} ${ln}`;
    const ffn = FIRST_NAMES[(i * 5 + 7) % FIRST_NAMES.length];
    const parent = `${ffn} ${ln}`;
    const loc = CITIES_DATA[(i * 2 + 1) % CITIES_DATA.length];
    const bank = BANKS[(i * 4 + 3) % BANKS.length];
    const scheme = SCHEMES[(i * 2 + 5) % SCHEMES.length];
    const regNo = `EWI-${loc.city.slice(0,3).toUpperCase()}-2026-${String(1000 + i)}`;
    const date = `${String((i % 28) + 1).padStart(2, '0')}/${String((i % 12) + 1).padStart(2, '0')}/2026`;
    const amt = (scheme.amount + (i * 250)).toLocaleString('en-IN');
    const aadhaar = `${String(1000 + (i * 21) % 9000)} ${String(2000 + (i * 33) % 8000)} ${String(3000 + (i * 47) % 7000)}`;

    let content = '';
    let title = '';

    if (domain.includes('Clinical')) {
      title = `${domain} — File #${regNo}`;
      content = `PATIENT CLINICAL INTAKE DOSSIER — OFFICIAL CENTRAL HEALTH REGISTRY PAGE ${i}
[SECTION 1: PATIENT IDENTIFICATION & RESIDENTIAL RECORD]
Patient Full Name: ${applicant} | Date of Birth: ${10 + (i % 18)}/0${1 + (i % 9)}/19${65 + (i % 35)} | Age: ${(i % 45) + 22} Years | Gender: ${i % 2 === 0 ? 'Male' : 'Female'}
Blood Group: ${['O+', 'B+', 'A+', 'AB+', 'O-'][i % 5]} Positive | Marital Status: ${i % 3 === 0 ? 'Single' : 'Married'} | National Aadhaar ID: ${aadhaar}
Permanent Residential Domicile: Flat ${100 + i}, Shanti Vihar, ${loc.zone}, ${loc.city}, ${loc.state} - ${loc.pin}
Registered Mobile Contact: +91 98${String(10000000 + i * 491).slice(0, 8)} | Emergency Point of Contact: ${parent} (Relationship: Next of Kin)
Attending Chief Physician: Dr. ${LAST_NAMES[(i + 4) % LAST_NAMES.length]} (M.D. Medicine, State Medical Council Reg No: MH-${30000 + i})

[SECTION 2: CLINICAL VITALS & SYSTEMIC EXAMINATION]
Admission Category: Outpatient General Health Checkup & Comprehensive Preventive Diagnostics
Physical Vitals Summary: Pulse Rate: ${68 + (i % 14)} bpm (Regular Sinus Rhythm) | Systolic / Diastolic BP: 120/80 mmHg
Oxygen Saturation (SpO2): 99% Ambient Room Air | Body Temperature: 98.4°F Oral | Respiration: 16 breaths/min
Height: ${160 + (i % 25)} cm | Weight: ${(60 + (i % 30)).toFixed(1)} kg | Body Mass Index (BMI): 23.8 kg/m2 (Normal Ambulatory Range)
Systemic Observations: Bilateral vesicular breath sounds clear throughout all lung fields. S1 and S2 heart sounds normal with zero detectable cardiac murmurs. Abdominal palpation reveals soft, non-tender quadrants with no organomegaly. Cranial nerves and peripheral deep tendon reflexes intact.

[SECTION 3: LABORATORY INVESTIGATIONS & PRESCRIBED THERAPY]
Diagnostic Orders Dispatched: Complete Blood Count (CBC), Fasting Blood Sugar (FBS), Glycated Hemoglobin (HbA1c), Comprehensive Lipid Profile, Renal Function Panel (RFT), Serum Bilirubin, and Routine Urinalysis.
Prescription Regimen: Tab. Multivitamin & Essential Minerals 1 Tab OD after breakfast for 30 days; Cap. Cholecalciferol (Vitamin D3) 60,000 IU 1 Cap weekly for 8 weeks; Tab. Calcium Carbonate 500 mg with Vitamin D 1 Tab OD at bedtime for 30 days.
Lifestyle Directives: Minimum 45 minutes daily aerobic brisk walking, reduced dietary sodium and saturated fat intake, maintained daily oral hydration of at least 3.5 liters water, and 8 hours uninterrupted nocturnal sleep.

[SECTION 4: HEALTH INSURANCE CLEARANCE & REGISTRY ATTESTATION]
Third-Party Administrator (TPA): Star Health & Allied Insurance Co Ltd | Policy Ref: POL-MED-2026-${60000 + i}
Cashless Pre-Authorization Approval Code: CASHLESS-AUTH-${80000 + i} | Pre-Approved Limit: Rs. 15,000.00
Hospital Registry Ledger Record: Volume XXVI/2026, Ledger Folio No: ${100 + i} | Transcriptionist: S. P. Kulkarni
Statutory Medical Attestation: Certified that clinical intake parameters and diagnostic findings transcribed herein represent true and verified hospital archives. Duly authorized and ratified for permanent registry.`;
    } else if (domain.includes('Property')) {
      title = `${domain} — Deed #${regNo}`;
      content = `GOVERNMENT REVENUE & PROPERTY CONVEYANCE ASSESSMENT LEDGER — SHEET ${i}
[SECTION 1: PROPERTY CADASTRAL IDENTIFICATION & SITUATION]
Assessment Year: 2026-2027 | Government Survey Cadastral Plot No: ${120 + i}/B | Zone: ${loc.zone} Revenue Circle
Municipal Property Identification Code: MPIC-MH-2026-${String(100000 + i)} | Revenue Circle: ${loc.city} Sub-District Hub
Owner of Record: ${applicant} | Legal Co-Owner / Nominee: Smt. ${FIRST_NAMES[(i + 3) % FIRST_NAMES.length]} ${ln}
Physical Situation Address: Survey No. ${120 + i}/B, City Survey C.T.S. ${4000 + i}, ${loc.zone}, ${loc.city}, ${loc.state} - ${loc.pin}
Holding Nature: Absolute Freehold Residential Title | Master Conveyance Deed Registration: BND-2026-${90000 + i}
Original Document Execution Date: ${date} | Sub-Registrar Office: Sub-Registrar ${loc.city} Circle-04

[SECTION 2: STRUCTURAL SPECIFICATIONS & CARPET METRICS]
Structure Classification: Reinforced Cement Concrete (RCC-Grade IV) Residential Multi-Dwelling (G+2 Floors)
Total Plot Land Footprint: ${2800 + (i * 10)} Sq.Ft. | Total Built-up Ground Floor Area: ${1200 + (i * 5)} Sq.Ft.
First Floor Residential Carpet Area: ${1150 + (i * 5)} Sq.Ft. | Total Super Built-up Gross Area: ${2350 + (i * 10)} Sq.Ft.
Age of Civil Construction: 4 Years (Year of Completion: 2022) | Structural Stability Fitness Rating: Class A-1
Sanctioned Building Layout Plan: Town Planning Authority Approval Letter No. TPA/${loc.state.slice(0,2).toUpperCase()}/2022/${3000 + i}
Internal Amenities: Dedicated Municipal Potable Water Meter, 3-Phase Domestic Electricity Grid, Rainwater Harvesting Tank.

[SECTION 3: CAPITAL VALUATION & STATUTORY PROPERTY TAX DEMAND]
Current Capital Market Valuation: ₹${(4200000 + i * 25000).toLocaleString('en-IN')} | Municipal Ready Reckoner Unit Base Rate: ₹1,750.00 per Sq.Ft.
Annual Rateable Value (ARV): ₹${(42000 + i * 250).toLocaleString('en-IN')} | Applicable Municipal Assessment Index Factor: 0.085%
Net General Municipal Tax: ₹3,612.50 | Drinking Water Supply Cess: ₹750.00 | Solid Waste Management Cess: ₹200.00
Drainage & Sewerage Maintenance Surcharge: ₹350.00 | Maharashtra State Education & Employment Cess: ₹250.00
Gross Consolidated Municipal Demand: ₹5,162.50 | Net Payable Demand (Inclusive of 5% Early Settlement Rebate): ₹4,904.38
Designated Bank for Tax Remittance: ${bank.name}, ${loc.city} Main Branch (Account Code: PMC-TAX-2026-04).

[SECTION 4: ENCUMBRANCE SEARCH & REVENUE OFFICER RATIFICATION]
Encumbrance Certificate Period: 30 Years Search (1996 to 2026) | Caveats, Liens or Adverse Claims: Nil / Unencumbered
Town Planning Zoning Certificate: Pure Residential Zone (R-1 Category) with full statutory occupancy permission.
Municipal Assessment Officer: Shri D. V. Shinde (Assistant Municipal Commissioner, ${loc.city} Revenue Circle)
Attestation & Ratification: The property metrics, built-up dimensions, and statutory fiscal liabilities detailed above have been physically surveyed and validated. Duly confirmed and registered into permanent Municipal Land Revenue Records.`;
    } else if (domain.includes('Logistics')) {
      title = `${domain} — Waybill #${regNo}`;
      content = `NATIONAL LOGISTICS MULTI-MODAL FREIGHT TRANSIT MANIFEST — BATCH ${i}
[SECTION 1: CONSIGNMENT CONSIGNOR & CONSIGNEE PROFILE]
Consignment Waybill Tracking ID: CN-EXP-2026-${70000 + i} | Dispatch Timestamp: ${date} 09:30:00 IST
Consignor Corporate Name: Sahyadri Industrial Precision Components Pvt Ltd | GSTIN: 27AAACS${1000 + i}P1Z8
Dispatch Origin Hub: Freight Terminal Hub 04, Manchar Bypass Highway, Pune, Maharashtra - 410503
Consignee Business Enterprise: ${applicant} & Sons Logistics LLP | GSTIN: ${loc.state.slice(0,2).toUpperCase()}AABCB${2000 + i}K1Z4
Destination Distribution Terminal: Industrial Logistic Park, ${loc.zone}, ${loc.city}, ${loc.state} - ${loc.pin}
Statutory E-Way Bill Number: EWB-9921-2026-${100000 + i} | Valid From: ${date} 10:00 AM To: 30/10/2026 11:59 PM

[SECTION 2: CARGO COMPOSITION & WEIGHT SPECIFICATIONS]
Nature of Cargo: High-Precision Industrial Servo Motors & Electronic Automation CNC Driver Modules
Harmonized System of Nomenclature (HSN Code): 8504.40.90 | Number of Master Corrugated Pallets: 18 Pallets
Gross Shipping Weight: ${(142.5 + (i * 0.5)).toFixed(2)} KG | Net Tare Cargo Weight: ${(130.5 + (i * 0.5)).toFixed(2)} KG | Volumetric CBM: 5.40 CBM
Handling Directives: Heavy Machinery, Fragile Solid State Electronic Relays, Keep Moisture-Free at Ambient 22°C
Hazardous Material Declaration: Certified Non-Hazardous, Non-Flammable, Class-9 Dry Solid State Equipment.

[SECTION 3: INVOICE VALUATION & APPLICABLE TAX CLEARANCE]
Commercial Invoice Reference: INV-MH-2026-${40000 + i} | Declared Net Assessable Valuation: ₹${amt}
Integrated Goods & Services Tax (IGST @ 18%): ₹${Math.round((scheme.amount + (i * 250)) * 0.18).toLocaleString('en-IN')} | Total Invoice Value: ₹${Math.round((scheme.amount + (i * 250)) * 1.18).toLocaleString('en-IN')}
Freight Charges: ₹42,500.00 Paid by Consignee under Reverse Charge Mechanism (RCM Applicable: No)
Enroute Marine Transit Insurance: Tata AIG Comprehensive Carrier Policy No: TAC-CARGO-2026-${70000 + i}
Declared Transit Sum Insured: ₹25,00,000.00 | Deductible Excess: Nil for Total Loss or Enroute Collision.

[SECTION 4: FLEET DISPATCH & GATE-OUT AUTHORIZATION]
Primary Heavy Transport Carrier: Tata Prima Multi-Axle Containerized Truck | Vehicle Plate: MH-12-RN-${1000 + i}
Registered Driver Identity: Shri Mahendra Pratap Singh | Commercial Heavy Driving License: DL-04-2012-99014
GPS Tracking Beacon UUID: GPS-TRACK-${70000 + i}-V2 | GPS Heartbeat Interval: Every 60 Seconds Active
Warehouse Gate-Out Officer: K. R. Ramanathan (Lead Logistics Operations Supervisor)
Final Dispatch Clearance: Certified that cargo weights, security seal integrity (#SEAL-${70000 + i}), and statutory road permits match national transit regulatory standards. Duly authorized for interstate dispatch.`;
    } else if (domain.includes('Banking')) {
      title = `${domain} — File #${regNo}`;
      content = `PRIORITY SECTOR MSME CREDIT UNDERWRITING DOSSIER — CASE ${i}
[SECTION 1: BORROWER ENTITY PROFILE & REGULATORY STATUS]
Sanction Order ID: ${regNo} | Appraisement Date: ${date} | Approving Lending Institution: ${bank.name}
Principal Borrower Name: ${applicant} | Entity Legal Trade Name: ${applicant} Agro Industries LLP
Enterprise UDYAM Registration: UDYAM-MH-12-${String(100000 + i)} | Enterprise Category: Micro Small Business Enterprise
Operating Factory Address: Plot No. ${40 + (i % 50)}, MIDC Phase-II, ${loc.zone}, ${loc.city}, ${loc.state} - ${loc.pin}
Primary Current Banking Account: No. ${String(300000000000 + i * 1928)} | IFSC Code: ${bank.ifsc} | Branch: ${loc.city} Main

[SECTION 2: PROMOTER IDENTIFICATION & FINANCIAL AUDIT SUMMARY]
Promoter National Aadhaar: ${aadhaar} | Permanent Account Number (PAN): BKDPS${1000 + (i % 9000)}F
Annual Audited Business Turnover: ₹${(8500000 + i * 50000).toLocaleString('en-IN')} | Net Operating Profit Margin: 14.8%
Bureau Credit Appraisal (CIBIL Commercial Score): ${740 + (i % 80)} / 900 | Historical Default Instances: Zero / Clean Track Record
Goods & Services Tax Filing Compliance: GSTR-1 and GSTR-3B filed up to date with zero statutory penalty arrears.
Statutory Tax Auditor: M/s Deshpande & Kulkarni Chartered Accountants (Firm Reg No: 104921W).

[SECTION 3: CREDIT FACILITY APPRAISAL & COLLATERAL TERMS]
Facility Approved: Cash Credit Working Capital & Plant Equipment Term Loan | Total Sanction Amount: ₹${amt}
Applicable Interest Benchmark: RBI Repo Linked Lending Rate (RLLR + 1.85% p.a.) | Loan Tenor: 60 Equated Monthly Instalments
Primary Hypothecation Security: First floating charge over raw material stocks, finished goods inventory, and book debts.
Collateral Security: Equitable mortgage over industrial shed land situated at Survey No. ${140 + i}, MIDC Industrial Area.
Promoter Personal Guarantee: Irrevocable unconditional personal guarantee executed by ${applicant} and ${parent}.

[SECTION 4: SANCTION CONDITIONS & DISBURSEMENT CLEARANCE]
End-Use Stipulation: Exclusively allocated for procurement of CNC high-speed milling machinery and working capital rotation.
Insurance Directive: Comprehensive fire, burglary, and natural catastrophe coverage with bank mortgage clause endorsed.
Sanctioning Authority: Shri Prakash R. Joshi (Chief Regional Credit Manager, ${bank.name})
Attestation & Sign-off: Credit underwriting criteria, asset valuation, and borrower KYC documents verified in compliance with RBI guidelines. Loan account authorized for immediate phase-one fund disbursement.`;
    } else if (domain.includes('Civil')) {
      title = `${domain} — Tender #${regNo}`;
      content = `STATE PUBLIC INFRASTRUCTURE & MUNICIPAL WORKS REGISTRY — ORDER ${i}
[SECTION 1: TENDER NOTIFICATION & CONTRACTOR CREDENTIALS]
Contract Work Order ID: PWD-MH-2026-${regNo} | Tender Notification Reference: E-TENDER/2026/${String(4000 + i)}
Awarded Engineering Contractor: ${applicant} Infrastructure Projects & Builders Pvt Ltd | Class: Class-I PWD Contractor
Registered Corporate Office: Suite 302, Highway Heights, ${loc.zone}, ${loc.city}, ${loc.state} - ${loc.pin}
Contractor GSTIN: 27AABCP${3000 + i}K1Z2 | Permanent Account Number: AABCP${3000 + i}K
Executing Division: Public Works Division No. 02, Government of Maharashtra, ${loc.city} Circle.

[SECTION 2: ENGINEERING SCOPE & SITE DELIMITATIONS]
Project Title: Construction of Heavy-Duty Asphalt Road, Precast Stormwater Drainage & High-Efficiency LED Streetlights
Project Site Location: Municipal Ward Sector ${10 + (i % 20)}, Highway Link Corridor, ${loc.city}, ${loc.state}
Total Corridor Engineering Length: ${(1.2 + (i * 0.05)).toFixed(2)} Kilometers | Carriage Width: 7.50 Meters Dual-Lane
Drainage Cross-Section: 1.20m x 0.90m Precast RCC Box Conduits with silt trap manholes at every 30 meters.
Pavement Specification: 150mm Granular Sub-Base (GSB), 100mm Wet Mix Macadam (WMM), and 40mm Dense Bituminous Macadam (DBM).

[SECTION 3: FINANCIAL ESTIMATION & PERFORMANCE GUARANTEE]
Estimated Tender Valuation: ₹${(2400000 + i * 18000).toLocaleString('en-IN')} | Accepted Bid Value: ₹${(2280000 + i * 17000).toLocaleString('en-IN')}
Earnest Money Deposit (EMD): ₹48,000.00 | Performance Security Guarantee: ₹1,14,000.00 (Bank Guarantee No. BG-${bank.name.slice(0,3).toUpperCase()}-${9000 + i})
Measurement Book Allocation: M.B. Vol #${10 + (i % 15)}, Pages 44 to 78 | Field Sub-Divisional Officer: Shri R. K. Salve
Interim Running Account Bill: Mobilization advance of 10% cleared against hypothecation of road machinery.
Defect Liability Maintenance Retention: 5% retention money withheld for a statutory maintenance period of 36 months.

[SECTION 4: QUALITY COMPLIANCE & HANDOVER RATIFICATION]
Statutory Quality Standards: Work executed in strict accordance with Ministry of Road Transport & Highways (MORTH) specifications.
Third-Party Lab Validation: Core compression strength, aggregate impact value, and bitumen penetration index certified.
Executive Engineer In-Charge: Shri ${parent} (Executive Engineer, PWD Civil Infrastructure Circle)
Handover Ratification: Final inspection completed. Road alignment, stormwater gradients, and night illumination verified satisfactory. Certified for public vehicular commissioning.`;
    } else {
      title = `${domain} — Form #${regNo}`;
      content = `CENTRAL GOVERNMENT BENEFICIARY DIRECT TRANSIT RECORD — ENTRY ${i}
[SECTION 1: APPLICANT IDENTITY & DOMICILE CREDENTIALS]
Application Master Dossier ID: ${regNo} | National Welfare Scheme: ${scheme.name}
Beneficiary Full Name: ${applicant} | Guardian / Father / Spouse Name: ${parent}
Date of Birth: ${12 + (i % 15)}/0${1 + (i % 8)}/19${70 + (i % 30)} | Gender: ${i % 2 === 0 ? 'Male' : 'Female'} | Social Category: General
Residential Domicile: House No. ${40 + i}, Ward No. ${1 + (i % 12)}, ${loc.zone}, ${loc.city}, ${loc.state} - ${loc.pin}
Biometric Aadhaar Identifier: ${aadhaar} | Registered Mobile Link: 98${String(10000000 + i * 291).slice(0, 8)}

[SECTION 2: WELFARE SCHEME CRITERIA & ENTITLEMENT AUDIT]
Annual Family Household Income: ₹${(120000 + (i % 8) * 15000).toLocaleString('en-IN')} | Income Certificate Ref: INC-MH-2026-${70000 + i}
Socio-Economic Eligibility Score: Priority Grade-A | Ration Card Number: RC-27-PDS-${80000 + i}
Verification Level: Gram Panchayat / Urban Ward Officer physical inspection and bio-metric validation completed on ${date}.
Land Holding / Urban Housing Status: Meets mandated non-creamy layer criteria with zero conflicting central scheme benefits.
Local Scrutiny Committee Approval: Ratified by Village Talathi and Circle Revenue Inspector with unreserved clearance.

[SECTION 3: DIRECT BENEFIT DISBURSEMENT & BANKING GATEWAY]
Authorized Subsidy Allocation Grant: ₹${amt} | Sanction Clearance Code: GOI-SANCT-${50000 + i}
Disbursement Bank Account: ${bank.name} - Current/Savings A/C No. ${String(200000000000 + i * 3141)}
Bank Branch IFSC Code: ${bank.ifsc} | Direct Benefit Transfer (DBT) Status: Aadhaar Payment Bridge (APB) Mapped Active
Public Financial Management System (PFMS) Clearing Ref: PFMS-TXN-2026-${String(900000 + i)}
Disbursement Tranche: Single lumpsum digital transfer directly credited to beneficiary bank account.

[SECTION 4: STATUTORY DECLARATION & ADMINISTRATIVE ATTESTATION]
Beneficiary Legal Declaration: Declared that all information, domicile credentials, and income declarations are truthful and accurate.
Underlying Penalty Clause: Beneficiary acknowledges that false declarations shall incur recovery with 18% penal interest.
District Nodal Welfare Officer: Smt. Anuradha K. Patil (Deputy Director, Social Welfare Administration)
Final Government Attestation: Certified that application credentials have passed all multi-tier algorithmic audits. Duly approved and archived into National Direct Benefit Transfer permanent archives.`;
    }

    tasks.push({
      id,
      category: 'data_entry',
      categoryName: 'Data Entry',
      title,
      difficulty: i % 3 === 0 ? 'Advanced' : i % 2 === 0 ? 'Medium' : 'Standard',
      duration_sec: 120,
      rate: '₹150/page',
      unitRate: 150,
      dailyQuota: 350,
      updatedAt: '27 Oct 2026',
      status: 'active',
      content,
      instructions: 'Type the document transcript into your workspace word-for-word. Check names, numbers, codes, and punctuation with zero errors.'
    });
  }
  return tasks;
}

// 2. CAPTCHA ENTRY GENERATOR (400 Tasks)
function generateCaptchaTasks() {
  const tasks = [];
  const charsPool = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  const symbols = ['#', '@', '$', '%', '&', '*', '!'];

  for (let i = 1; i <= 400; i++) {
    const id = `TSK-CAP-${String(i).padStart(3, '0')}`;
    
    // Create an 8-character complex cryptographic code with at least 1 symbol and mixed case
    let codeArr = [];
    codeArr.push(charsPool[(i * 3 + 1) % 24]); // Upper
    codeArr.push(charsPool[24 + ((i * 5 + 3) % 24)]); // Lower
    codeArr.push(symbols[i % symbols.length]); // Symbol
    codeArr.push(charsPool[48 + ((i * 7 + 2) % 8)]); // Digit
    codeArr.push(charsPool[(i * 11 + 7) % 24]); // Upper
    codeArr.push(charsPool[24 + ((i * 13 + 9) % 24)]); // Lower
    codeArr.push(symbols[(i * 2 + 3) % symbols.length]); // Symbol
    codeArr.push(charsPool[48 + ((i * 17 + 5) % 8)]); // Digit

    // Deterministic shuffle
    const code = codeArr.join('');

    tasks.push({
      id,
      category: 'captcha',
      categoryName: 'Captcha Entry',
      title: `High-Precision Cryptographic Verification Token #${String(i).padStart(3, '0')}`,
      difficulty: i % 3 === 0 ? 'High' : 'Medium',
      duration_sec: 45,
      rate: '₹200/captcha',
      unitRate: 200,
      dailyQuota: 350,
      updatedAt: '27 Oct 2026',
      status: 'active',
      captchaCode: code,
      instructions: 'Solve the distorted verification token from the secure canvas. Transcribe all letters, numbers, and special symbols in exact case-sensitive order.'
    });
  }
  return tasks;
}

// 3. FORM FILLING GENERATOR (400 Tasks)
function generateFormFillingTasks() {
  const tasks = [];

  for (let i = 1; i <= 400; i++) {
    const id = `TSK-FF-${String(i).padStart(3, '0')}`;
    const fn = FIRST_NAMES[(i * 4 + 1) % FIRST_NAMES.length];
    const ln = LAST_NAMES[(i * 6 + 3) % LAST_NAMES.length];
    const fullName = `${fn} ${ln}`;
    const fatherSpouse = `${FIRST_NAMES[(i * 7 + 5) % FIRST_NAMES.length]} ${ln}`;
    const loc = CITIES_DATA[(i * 3 + 2) % CITIES_DATA.length];
    const bank = BANKS[(i * 5 + 4) % BANKS.length];
    const scheme = SCHEMES[(i * 3 + 1) % SCHEMES.length];
    const appNo = `APP-${scheme.type.slice(0, 3).toUpperCase()}-2026-${String(1000 + i)}`;
    const phone = `98${String(10000000 + i * 373).slice(0, 8)}`;
    const email = `${fn.toLowerCase()}.${ln.toLowerCase()}${1975 + (i % 25)}@gmail.com`;
    const aadhaar = `${String(1000 + (i * 29) % 9000)} ${String(2000 + (i * 41) % 8000)} ${String(3000 + (i * 53) % 7000)}`;
    const pan = `BKDPS${String(1000 + (i * 17) % 9000)}F`;
    const dob = `${String((i % 28) + 1).padStart(2, '0')}/${String((i % 12) + 1).padStart(2, '0')}/${1975 + (i % 25)}`;
    const amount = `₹${(scheme.amount + (i * 250)).toLocaleString('en-IN')}`;
    const fullAddress = `Flat ${101 + i}, Sai Siddhi Enclave, Near ${loc.zone}, ${loc.city}, ${loc.state} - ${loc.pin}`;

    tasks.push({
      id,
      category: 'form_filling',
      categoryName: 'Form Filling',
      title: `${scheme.name} — Client File #${appNo}`,
      difficulty: i % 3 === 0 ? 'Extensive' : 'Standard',
      duration_sec: 90,
      rate: '₹100/form',
      unitRate: 100,
      dailyQuota: 350,
      updatedAt: '27 Oct 2026',
      status: 'active',
      formData: {
        appNo,
        fullName,
        fatherSpouse,
        dob,
        gender: i % 2 === 0 ? 'Male' : 'Female',
        phone,
        email,
        aadhaar,
        pan,
        city: loc.city,
        state: loc.state,
        pin: loc.pin,
        address: fullAddress,
        bankName: bank.name,
        accountNo: String(300000000000 + i * 2718),
        ifsc: bank.ifsc,
        planType: scheme.name,
        subsidyAmount: amount
      },
      instructions: 'Carefully transcribe all 12 applicant and financial fields from the client master card into the standardized submission form with 100% precision.'
    });
  }
  return tasks;
}

// RUN GENERATION & SEED SQLITE
const deTasks = generateDataEntryTasks();
const capTasks = generateCaptchaTasks();
const ffTasks = generateFormFillingTasks();
const allTasks = [...deTasks, ...capTasks, ...ffTasks];

console.log(`Generated: ${deTasks.length} Data Entry, ${capTasks.length} Captcha, ${ffTasks.length} Form Filling = ${allTasks.length} Total Tasks`);

// Wipe existing tasks and insert all 1,200 tasks cleanly
db.exec('DELETE FROM tasks');
const insertStmt = db.prepare(`
  INSERT INTO tasks (id, category, title, difficulty, duration_sec, details_json, status, created_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

for (const t of allTasks) {
  const details = {};
  if (t.category === 'data_entry') {
    details.content = t.content;
    details.instructions = t.instructions;
    details.words = t.content.trim().split(/\\s+/).length;
  } else if (t.category === 'captcha') {
    details.captchaCode = t.captchaCode;
    details.instructions = t.instructions;
  } else if (t.category === 'form_filling') {
    details.formData = t.formData;
    details.instructions = t.instructions;
  }

  insertStmt.run(
    t.id,
    t.category,
    t.title,
    t.difficulty || 'Medium',
    t.duration_sec || 90,
    JSON.stringify(details),
    t.status || 'active',
    new Date().toISOString()
  );
}

// Save complete tasks pool to JSON
fs.writeFileSync(path.join(__dirname, 'tasks_pool.json'), JSON.stringify(allTasks, null, 2));

console.log('✓ Successfully seeded 1,200 tasks into database.sqlite and exported to tasks_pool.json!');
