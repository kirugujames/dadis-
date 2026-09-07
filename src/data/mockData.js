// Centralised mock data. In a real app each of these would come from an API,
// but keeping it here means every page (and every role's filtered view of a
// page) reads from one consistent source.

export const properties = [
  { id: 'P-001', name: 'Greenview Apartments', location: 'Kilimani, Nairobi', units: 24, occupied: 21, landlord: 'David Kariuki', caretaker: 'Grace Wanjiru', type: 'Apartment' },
  { id: 'P-002', name: 'Riverside Court', location: 'Ruiru, Kiambu', units: 18, occupied: 14, landlord: 'Susan Njoroge', caretaker: 'Peter Otieno', type: 'Apartment' },
  { id: 'P-003', name: 'Palm Heights', location: 'Nyali, Mombasa', units: 30, occupied: 27, landlord: 'David Kariuki', caretaker: 'Fatuma Ali', type: 'Apartment' },
  { id: 'P-004', name: 'Cedar Villas', location: 'Runda, Nairobi', units: 8, occupied: 6, landlord: 'James Mutua', caretaker: 'Grace Wanjiru', type: 'Villa' },
  { id: 'P-005', name: 'Sunrise Court', location: 'Nakuru Town', units: 16, occupied: 10, landlord: 'Susan Njoroge', caretaker: 'John Kiptoo', type: 'Apartment' },
]

export const units = [
  { id: 'U-101', property: 'Greenview Apartments', unit: 'A1', tenant: 'Brian Mwangi', rent: 32000, status: 'Occupied', bedrooms: 2 },
  { id: 'U-102', property: 'Greenview Apartments', unit: 'A2', tenant: 'Mercy Achieng', rent: 32000, status: 'Occupied', bedrooms: 2 },
  { id: 'U-103', property: 'Greenview Apartments', unit: 'B4', tenant: 'Brian Mwangi', rent: 45000, status: 'Occupied', bedrooms: 3 },
  { id: 'U-104', property: 'Greenview Apartments', unit: 'C2', tenant: '—', rent: 32000, status: 'Vacant', bedrooms: 2 },
  { id: 'U-105', property: 'Riverside Court', unit: '12B', tenant: 'Samuel Kiplagat', rent: 28000, status: 'Occupied', bedrooms: 1 },
  { id: 'U-106', property: 'Riverside Court', unit: '14A', tenant: '—', rent: 28000, status: 'Under Maintenance', bedrooms: 1 },
  { id: 'U-107', property: 'Palm Heights', unit: '3C', tenant: 'Fatuma Hassan', rent: 55000, status: 'Occupied', bedrooms: 3 },
  { id: 'U-108', property: 'Cedar Villas', unit: 'V2', tenant: 'James Omondi', rent: 120000, status: 'Occupied', bedrooms: 4 },
]

export const tenants = [
  { id: 'T-001', name: 'Brian Mwangi', unit: 'Greenview · B4', phone: '+254 712 345 678', rent: 45000, balance: 0, status: 'Current' },
  { id: 'T-002', name: 'Mercy Achieng', unit: 'Greenview · A2', phone: '+254 722 111 222', rent: 32000, balance: 32000, status: 'Overdue' },
  { id: 'T-003', name: 'Samuel Kiplagat', unit: 'Riverside · 12B', phone: '+254 733 555 999', rent: 28000, balance: 0, status: 'Current' },
  { id: 'T-004', name: 'Fatuma Hassan', unit: 'Palm Heights · 3C', phone: '+254 700 888 444', rent: 55000, balance: 55000, status: 'Overdue' },
  { id: 'T-005', name: 'James Omondi', unit: 'Cedar Villas · V2', phone: '+254 711 909 090', rent: 120000, balance: 0, status: 'Current' },
  { id: 'T-006', name: 'Alice Wambui', unit: 'Sunrise · 4A', phone: '+254 706 234 567', rent: 24000, balance: 12000, status: 'Partial' },
]

export const payments = [
  { id: 'PM-2001', tenant: 'Brian Mwangi', method: 'M-Pesa', amount: 45000, date: '2026-09-01', status: 'Reconciled' },
  { id: 'PM-2002', tenant: 'Samuel Kiplagat', method: 'Bank Transfer', amount: 28000, date: '2026-09-02', status: 'Reconciled' },
  { id: 'PM-2003', tenant: 'Alice Wambui', method: 'M-Pesa', amount: 12000, date: '2026-09-03', status: 'Pending' },
  { id: 'PM-2004', tenant: 'James Omondi', method: 'Bank Transfer', amount: 120000, date: '2026-09-03', status: 'Reconciled' },
  { id: 'PM-2005', tenant: 'Mercy Achieng', method: 'M-Pesa', amount: 15000, date: '2026-08-29', status: 'Unmatched' },
]

export const arrears = [
  { id: 'AR-01', tenant: 'Mercy Achieng', unit: 'Greenview · A2', daysOverdue: 18, amount: 32000, lastReminder: '2026-09-02' },
  { id: 'AR-02', tenant: 'Fatuma Hassan', unit: 'Palm Heights · 3C', daysOverdue: 34, amount: 55000, lastReminder: '2026-09-04' },
  { id: 'AR-03', tenant: 'Alice Wambui', unit: 'Sunrise · 4A', daysOverdue: 6, amount: 12000, lastReminder: '2026-09-01' },
]

export const landlords = [
  { id: 'L-01', name: 'David Kariuki', phone: '+254 720 001 002', properties: 2, units: 54, payoutMethod: 'Bank', status: 'Active' },
  { id: 'L-02', name: 'Susan Njoroge', phone: '+254 733 445 566', properties: 2, units: 34, payoutMethod: 'M-Pesa', status: 'Active' },
  { id: 'L-03', name: 'James Mutua', phone: '+254 700 223 344', properties: 1, units: 8, payoutMethod: 'Bank', status: 'Active' },
]

export const caretakers = [
  { id: 'C-01', name: 'Grace Wanjiru', phone: '+254 715 667 788', properties: 'Greenview, Cedar Villas', status: 'Active' },
  { id: 'C-02', name: 'Peter Otieno', phone: '+254 701 998 776', properties: 'Riverside Court', status: 'Active' },
  { id: 'C-03', name: 'Fatuma Ali', phone: '+254 722 334 455', properties: 'Palm Heights', status: 'Active' },
  { id: 'C-04', name: 'John Kiptoo', phone: '+254 733 221 100', properties: 'Sunrise Court', status: 'On Leave' },
]

export const vacancies = [
  { id: 'V-01', property: 'Greenview Apartments', unit: 'C2', rent: 32000, listedOn: '2026-08-20', views: 46, leads: 5 },
  { id: 'V-02', property: 'Riverside Court', unit: '14A', rent: 28000, listedOn: '2026-08-28', views: 31, leads: 3 },
  { id: 'V-03', property: 'Sunrise Court', unit: '4A', rent: 24000, listedOn: '2026-08-15', views: 58, leads: 7 },
]

export const documents = [
  { id: 'D-01', name: 'Lease Agreement - Brian Mwangi.pdf', category: 'Lease', uploadedBy: 'Grace Wanjiru', date: '2026-06-01' },
  { id: 'D-02', name: 'Title Deed - Greenview Apartments.pdf', category: 'Title Deed', uploadedBy: 'David Kariuki', date: '2026-01-14' },
  { id: 'D-03', name: 'ID Copy - Fatuma Hassan.pdf', category: 'Tenant ID', uploadedBy: 'Fatuma Ali', date: '2026-05-22' },
  { id: 'D-04', name: 'Inspection Report - Cedar Villas.pdf', category: 'Inspection', uploadedBy: 'Grace Wanjiru', date: '2026-08-30' },
]

export const constructionProjects = [
  { id: 'CP-01', name: 'Greenview Phase 2 Extension', location: 'Kilimani, Nairobi', budget: 8500000, spent: 5200000, progress: 61, status: 'In Progress' },
  { id: 'CP-02', name: 'Sunrise Court Renovation', location: 'Nakuru Town', budget: 2200000, spent: 2100000, progress: 95, status: 'In Progress' },
  { id: 'CP-03', name: 'Cedar Villas Perimeter Wall', location: 'Runda, Nairobi', budget: 1400000, spent: 1400000, progress: 100, status: 'Completed' },
]

export const salaries = [
  { id: 'S-01', name: 'Grace Wanjiru', role: 'Caretaker', property: 'Greenview / Cedar Villas', salary: 35000, lastPaid: '2026-08-31', status: 'Paid' },
  { id: 'S-02', name: 'Peter Otieno', role: 'Caretaker', property: 'Riverside Court', salary: 30000, lastPaid: '2026-08-31', status: 'Paid' },
  { id: 'S-03', name: 'Fatuma Ali', role: 'Caretaker', property: 'Palm Heights', salary: 32000, lastPaid: '2026-08-31', status: 'Paid' },
  { id: 'S-04', name: 'John Kiptoo', role: 'Caretaker', property: 'Sunrise Court', salary: 28000, lastPaid: '2026-07-31', status: 'Pending' },
]

export const expenses = [
  { id: 'E-01', description: 'Plumbing repair - Unit C2', property: 'Greenview Apartments', category: 'Maintenance', amount: 8500, date: '2026-09-01' },
  { id: 'E-02', description: 'Security services - August', property: 'Palm Heights', category: 'Security', amount: 45000, date: '2026-08-31' },
  { id: 'E-03', description: 'Garden & landscaping', property: 'Cedar Villas', category: 'Grounds', amount: 12000, date: '2026-08-28' },
  { id: 'E-04', description: 'Water tank cleaning', property: 'Riverside Court', category: 'Maintenance', amount: 6000, date: '2026-08-25' },
]

export const whatsappThreads = [
  { id: 'W-01', name: 'Brian Mwangi', unit: 'Greenview · B4', lastMessage: 'Thank you, receipt received.', time: '09:12 AM', unread: 0 },
  { id: 'W-02', name: 'Mercy Achieng', unit: 'Greenview · A2', lastMessage: 'I will clear the balance by Friday.', time: 'Yesterday', unread: 2 },
  { id: 'W-03', name: 'Fatuma Hassan', unit: 'Palm Heights · 3C', lastMessage: 'Can someone check the water heater?', time: 'Yesterday', unread: 1 },
  { id: 'W-04', name: 'Grace Wanjiru (Caretaker)', unit: 'Greenview Apartments', lastMessage: 'Inspection done for unit C2.', time: '2 days ago', unread: 0 },
]

export const notifications = [
  { id: 'N-01', title: 'Rent overdue: Mercy Achieng', body: 'Unit A2 balance of KSh 32,000 is 18 days overdue.', time: '2h ago', type: 'alert' },
  { id: 'N-02', title: 'Payment received', body: 'James Omondi paid KSh 120,000 for Cedar Villas V2.', time: '5h ago', type: 'success' },
  { id: 'N-03', title: 'New maintenance request', body: 'Fatuma Hassan reported a water heater issue.', time: '1d ago', type: 'info' },
  { id: 'N-04', title: 'New lead on vacancy', body: 'Diana Chebet is interested in Sunrise Court · 4A.', time: '1d ago', type: 'info' },
]

export const auditLog = [
  { id: 'AL-01', actor: 'Amina Otieno', action: 'Updated organization billing settings', time: '2026-09-05 08:14' },
  { id: 'AL-02', actor: 'Grace Wanjiru', action: 'Uploaded inspection report for Cedar Villas', time: '2026-09-04 16:02' },
  { id: 'AL-03', actor: 'System', action: 'Auto-reconciled 3 M-Pesa payments', time: '2026-09-04 07:30' },
  { id: 'AL-04', actor: 'David Kariuki', action: 'Reviewed financial report for August', time: '2026-09-03 19:45' },
]

export const revenueTrend = [
  { month: 'Apr', revenue: 1240000, expenses: 410000 },
  { month: 'May', revenue: 1310000, expenses: 380000 },
  { month: 'Jun', revenue: 1280000, expenses: 460000 },
  { month: 'Jul', revenue: 1395000, expenses: 400000 },
  { month: 'Aug', revenue: 1452000, expenses: 512000 },
  { month: 'Sep', revenue: 980000, expenses: 260000 },
]

export const occupancyBreakdown = [
  { name: 'Occupied', value: 78, color: '#14b98a' },
  { name: 'Vacant', value: 14, color: '#f59e0b' },
  { name: 'Maintenance', value: 8, color: '#ef4444' },
]

export const tenantLease = {
  property: 'Greenview Apartments',
  unit: 'B4',
  rent: 45000,
  deposit: 45000,
  leaseStart: '2025-06-01',
  leaseEnd: '2027-05-31',
  landlord: 'David Kariuki',
  caretaker: 'Grace Wanjiru',
  balance: 0,
}

export const tenantPaymentHistory = [
  { id: 'TP-01', date: '2026-09-01', amount: 45000, method: 'M-Pesa', status: 'Paid' },
  { id: 'TP-02', date: '2026-08-01', amount: 45000, method: 'M-Pesa', status: 'Paid' },
  { id: 'TP-03', date: '2026-07-01', amount: 45000, method: 'Bank Transfer', status: 'Paid' },
  { id: 'TP-04', date: '2026-06-01', amount: 45000, method: 'M-Pesa', status: 'Paid' },
]

export function formatKsh(amount) {
  return `KSh ${Number(amount).toLocaleString('en-KE')}`
}
