import {
  LayoutDashboard, Building2, Receipt, BarChart3, Wallet, AlertTriangle,
  UserPlus, Home, Users, Store, UserCog, ShieldCheck, FileText, HardHat,
  Banknote, MessageCircle, Bell, ClipboardList, Settings, KeyRound, UserCircle, Lock,
} from 'lucide-react'
import { ROLES } from './roles'

// `group` clusters related items under a section label in the sidebar.
// Items without a group render at the top, ungrouped.
export const NAV_BY_ROLE = {
  [ROLES.ADMIN]: [
    { label: 'Dashboard', to: '/admin', icon: LayoutDashboard, end: true },

    { label: 'Properties & Units', to: '/admin/properties', icon: Building2, group: 'Leasing' },
    { label: 'Tenants & Billing', to: '/admin/billing', icon: Receipt, group: 'Leasing' },
    { label: 'Vacancy Management', to: '/admin/vacancy', icon: Store, group: 'Leasing' },
    { label: 'Tenant Onboarding', to: '/admin/tenant-onboarding', icon: UserPlus, group: 'Leasing' },
    { label: 'Property Onboarding', to: '/admin/property-onboarding', icon: Home, group: 'Leasing' },

    { label: 'Financial Reports', to: '/admin/financial-reports', icon: BarChart3, group: 'Finance' },
    { label: 'Payment Reconciliation', to: '/admin/payment-reconciliation', icon: Wallet, group: 'Finance' },
    { label: 'Arrears Tracking', to: '/admin/arrears', icon: AlertTriangle, group: 'Finance' },
    { label: 'Salary Management', to: '/admin/salaries', icon: Banknote, group: 'Finance' },
    { label: 'Expense Management', to: '/admin/expenses', icon: Wallet, group: 'Finance' },

    { label: 'Landlords', to: '/admin/landlords', icon: UserCog, group: 'People' },
    { label: 'Caretakers', to: '/admin/caretakers', icon: ShieldCheck, group: 'People' },
    { label: 'Access Management', to: '/admin/access-management', icon: Lock, group: 'People' },

    { label: 'Documents', to: '/admin/documents', icon: FileText, group: 'Operations' },
    { label: 'Construction Projects', to: '/admin/construction', icon: HardHat, group: 'Operations' },
    { label: 'WhatsApp Communication', to: '/admin/whatsapp', icon: MessageCircle, group: 'Operations' },

    { label: 'Notifications', to: '/admin/notifications', icon: Bell, group: 'System' },
    { label: 'Audit Log', to: '/admin/audit-log', icon: ClipboardList, group: 'System' },
    { label: 'Organization Settings', to: '/admin/settings', icon: Settings, group: 'System' },
  ],
  [ROLES.LANDLORD]: [
    { label: 'Dashboard', to: '/landlord', icon: LayoutDashboard, end: true },
    { label: 'My Properties', to: '/landlord/properties', icon: Building2, group: 'Portfolio' },
    { label: 'Tenants & Billing', to: '/landlord/billing', icon: Receipt, group: 'Portfolio' },
    { label: 'Financial Reports', to: '/landlord/financial-reports', icon: BarChart3, group: 'Portfolio' },
    { label: 'Documents', to: '/landlord/documents', icon: FileText, group: 'Portfolio' },
    { label: 'Notifications', to: '/landlord/notifications', icon: Bell, group: 'Account' },
    { label: 'My Profile', to: '/landlord/profile', icon: UserCircle, group: 'Account' },
  ],
  [ROLES.CARETAKER]: [
    { label: 'Dashboard', to: '/caretaker', icon: LayoutDashboard, end: true },
    { label: 'Properties & Units', to: '/caretaker/properties', icon: Building2, group: 'Operations' },
    { label: 'Tenant Onboarding', to: '/caretaker/tenant-onboarding', icon: UserPlus, group: 'Operations' },
    { label: 'Maintenance', to: '/caretaker/maintenance', icon: HardHat, group: 'Operations' },
    { label: 'WhatsApp Communication', to: '/caretaker/whatsapp', icon: MessageCircle, group: 'Operations' },
    { label: 'Notifications', to: '/caretaker/notifications', icon: Bell, group: 'Account' },
    { label: 'My Profile', to: '/caretaker/profile', icon: UserCircle, group: 'Account' },
  ],
  [ROLES.TENANT]: [
    { label: 'Dashboard', to: '/tenant', icon: LayoutDashboard, end: true },
    { label: 'My Lease & Unit', to: '/tenant/lease', icon: Home, group: 'My Rental' },
    { label: 'Payments & Billing', to: '/tenant/payments', icon: Receipt, group: 'My Rental' },
    { label: 'Documents', to: '/tenant/documents', icon: FileText, group: 'My Rental' },
    { label: 'Contact Caretaker', to: '/tenant/support', icon: MessageCircle, group: 'My Rental' },
    { label: 'Notifications', to: '/tenant/notifications', icon: Bell, group: 'Account' },
    { label: 'My Profile', to: '/tenant/profile', icon: UserCircle, group: 'Account' },
  ],
}

export const SETTINGS_LINK = { label: 'Reset Password', to: '/reset-password', icon: KeyRound }
