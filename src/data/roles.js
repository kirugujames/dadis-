// Central definition of roles and what each one is allowed to see.
// Adding a new role or permission only requires editing this file.

export const ROLES = {
  ADMIN: 'admin',
  LANDLORD: 'landlord',
  CARETAKER: 'caretaker',
  TENANT: 'tenant',
}

export const ROLE_LABELS = {
  [ROLES.ADMIN]: 'Admin',
  [ROLES.LANDLORD]: 'Landlord',
  [ROLES.CARETAKER]: 'Caretaker',
  [ROLES.TENANT]: 'Tenant',
}

// Demo accounts used by the login screen (no real backend yet).
export const DEMO_USERS = [
  { id: 'u1', name: 'Amina Otieno', email: 'amina@nest.co.ke', role: ROLES.ADMIN, avatar: 'AO', org: 'Nest HQ' },
  { id: 'u2', name: 'David Kariuki', email: 'david@nest.co.ke', role: ROLES.LANDLORD, avatar: 'DK', org: 'Kariuki Properties' },
  { id: 'u3', name: 'Grace Wanjiru', email: 'grace@nest.co.ke', role: ROLES.CARETAKER, avatar: 'GW', org: 'Greenview Apartments' },
  { id: 'u4', name: 'Brian Mwangi', email: 'brian@nest.co.ke', role: ROLES.TENANT, avatar: 'BM', org: 'Unit B4 · Greenview' },
]
