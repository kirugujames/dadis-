import { permissionsFor } from './modules'

// `locked: true` marks the built-in role every workspace ships with —
// it can be edited (description, permissions) but not deleted, since
// deleting it could leave existing users with no role.
export const accessRoles = [
  {
    id: 'ROLE-01',
    name: 'Administrator',
    description: 'Full access to every module across the workspace.',
    permissions: permissionsFor('all'),
    locked: true,
  },
  {
    id: 'ROLE-02',
    name: 'Property Manager',
    description: 'Runs day-to-day leasing, billing, and vacancy operations.',
    permissions: permissionsFor([
      'properties', 'billing', 'vacancy', 'tenantOnboarding', 'propertyOnboarding',
      'landlords', 'caretakers', 'documents', 'notifications',
    ]),
    locked: false,
  },
  {
    id: 'ROLE-03',
    name: 'Finance Officer',
    description: 'Handles financial reports, reconciliation, and payroll.',
    permissions: permissionsFor([
      'billing', 'financialReports', 'paymentReconciliation', 'arrears',
      'salaries', 'expenses', 'auditLog',
    ]),
    locked: false,
  },
  {
    id: 'ROLE-04',
    name: 'Support Staff',
    description: 'Front-line tenant communication with read-only access elsewhere.',
    permissions: permissionsFor(['billing', 'documents', 'whatsapp', 'notifications']),
    locked: false,
  },
]

export const accessUsers = [
  { id: 'AU-01', name: 'Amina Otieno', email: 'amina@nest.co.ke', roleId: 'ROLE-01', status: 'Active' },
  { id: 'AU-02', name: 'Peter Njenga', email: 'peter@nest.co.ke', roleId: 'ROLE-02', status: 'Active' },
  { id: 'AU-03', name: 'Lucy Adhiambo', email: 'lucy@nest.co.ke', roleId: 'ROLE-02', status: 'Active' },
  { id: 'AU-04', name: 'Kevin Mutiso', email: 'kevin@nest.co.ke', roleId: 'ROLE-03', status: 'Active' },
  { id: 'AU-05', name: 'Sarah Nekesa', email: 'sarah@nest.co.ke', roleId: 'ROLE-04', status: 'Suspended' },
]
