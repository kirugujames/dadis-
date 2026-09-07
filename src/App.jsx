import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { ROLES } from './data/roles'
import ProtectedRoute from './routes/ProtectedRoute'
import DashboardLayout from './components/layout/DashboardLayout'

import Login from './pages/auth/Login'
import ResetPassword from './pages/auth/ResetPassword'

// Admin
import AdminDashboard from './pages/admin/Dashboard'
import PropertyUnitManagement from './pages/admin/PropertyUnitManagement'
import TenantBillingManagement from './pages/admin/TenantBillingManagement'
import FinancialReports from './pages/admin/FinancialReports'
import PaymentReconciliation from './pages/admin/PaymentReconciliation'
import ArrearsManagement from './pages/admin/ArrearsManagement'
import TenantOnboarding from './pages/admin/TenantOnboarding'
import PropertyOnboarding from './pages/admin/PropertyOnboarding'
import VacancyManagement from './pages/admin/VacancyManagement'
import LandlordManagement from './pages/admin/LandlordManagement'
import CaretakerManagement from './pages/admin/CaretakerManagement'
import AccessManagement from './pages/admin/AccessManagement'
import DocumentManagement from './pages/admin/DocumentManagement'
import ConstructionManagement from './pages/admin/ConstructionManagement'
import SalaryManagement from './pages/admin/SalaryManagement'
import ExpenseManagement from './pages/admin/ExpenseManagement'
import WhatsappCommunication from './pages/admin/WhatsappCommunication'
import NotificationsCenter from './pages/admin/NotificationsCenter'
import AuditLog from './pages/admin/AuditLog'
import OrganizationSettings from './pages/admin/OrganizationSettings'
import TenantProfile from './pages/admin/TenantProfile'
import PropertyDetail from './pages/admin/PropertyDetail'

// Shared
import AccountSettings from './pages/shared/AccountSettings'

// Landlord
import LandlordDashboard from './pages/landlord/LandlordDashboard'
import LandlordProperties from './pages/landlord/LandlordProperties'
import LandlordBilling from './pages/landlord/LandlordBilling'
import LandlordFinancialReports from './pages/landlord/LandlordFinancialReports'

// Caretaker
import CaretakerDashboard from './pages/caretaker/CaretakerDashboard'
import CaretakerProperties from './pages/caretaker/CaretakerProperties'
import CaretakerMaintenance from './pages/caretaker/CaretakerMaintenance'

// Tenant
import TenantDashboard from './pages/tenant/TenantDashboard'
import TenantLease from './pages/tenant/TenantLease'
import TenantPayments from './pages/tenant/TenantPayments'
import TenantDocuments from './pages/tenant/TenantDocuments'

export default function App() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to={`/${user.role}`} replace /> : <Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Admin workspace */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={[ROLES.ADMIN]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="properties" element={<PropertyUnitManagement />} />
        <Route path="billing" element={<TenantBillingManagement />} />
        <Route path="financial-reports" element={<FinancialReports />} />
        <Route path="payment-reconciliation" element={<PaymentReconciliation />} />
        <Route path="arrears" element={<ArrearsManagement />} />
        <Route path="tenant-onboarding" element={<TenantOnboarding />} />
        <Route path="property-onboarding" element={<PropertyOnboarding />} />
        <Route path="vacancy" element={<VacancyManagement />} />
        <Route path="landlords" element={<LandlordManagement />} />
        <Route path="caretakers" element={<CaretakerManagement />} />
        <Route path="access-management" element={<AccessManagement />} />
        <Route path="documents" element={<DocumentManagement />} />
        <Route path="construction" element={<ConstructionManagement />} />
        <Route path="salaries" element={<SalaryManagement />} />
        <Route path="expenses" element={<ExpenseManagement />} />
        <Route path="whatsapp" element={<WhatsappCommunication />} />
        <Route path="notifications" element={<NotificationsCenter />} />
        <Route path="audit-log" element={<AuditLog />} />
        <Route path="settings" element={<OrganizationSettings />} />
        <Route path="tenants/:id" element={<TenantProfile />} />
        <Route path="properties/:id" element={<PropertyDetail />} />
        <Route path="profile" element={<AccountSettings />} />
      </Route>

      {/* Landlord workspace */}
      <Route
        path="/landlord"
        element={
          <ProtectedRoute roles={[ROLES.LANDLORD]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<LandlordDashboard />} />
        <Route path="properties" element={<LandlordProperties />} />
        <Route path="billing" element={<LandlordBilling />} />
        <Route path="financial-reports" element={<LandlordFinancialReports />} />
        <Route path="documents" element={<DocumentManagement />} />
        <Route path="notifications" element={<NotificationsCenter />} />
        <Route path="profile" element={<AccountSettings />} />
      </Route>

      {/* Caretaker workspace */}
      <Route
        path="/caretaker"
        element={
          <ProtectedRoute roles={[ROLES.CARETAKER]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<CaretakerDashboard />} />
        <Route path="properties" element={<CaretakerProperties />} />
        <Route path="tenant-onboarding" element={<TenantOnboarding />} />
        <Route path="maintenance" element={<CaretakerMaintenance />} />
        <Route path="whatsapp" element={<WhatsappCommunication />} />
        <Route path="notifications" element={<NotificationsCenter />} />
        <Route path="profile" element={<AccountSettings />} />
      </Route>

      {/* Tenant portal */}
      <Route
        path="/tenant"
        element={
          <ProtectedRoute roles={[ROLES.TENANT]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<TenantDashboard />} />
        <Route path="lease" element={<TenantLease />} />
        <Route path="payments" element={<TenantPayments />} />
        <Route path="documents" element={<TenantDocuments />} />
        <Route path="support" element={<WhatsappCommunication />} />
        <Route path="notifications" element={<NotificationsCenter />} />
        <Route path="profile" element={<AccountSettings />} />
      </Route>

      <Route
        path="/"
        element={user ? <Navigate to={`/${user.role}`} replace /> : <Navigate to="/login" replace />}
      />
      <Route
        path="*"
        element={user ? <Navigate to={`/${user.role}`} replace /> : <Navigate to="/login" replace />}
      />
    </Routes>
  )
}
