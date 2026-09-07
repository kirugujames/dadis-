import { useState } from 'react'
import {
  ShieldCheck, Users, Lock, Plus, Pencil, Trash2, UserPlus, KeyRound, Ban, CheckCircle2,
} from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import StatCard from '../../components/ui/StatCard'
import Card from '../../components/ui/Card'
import Tabs from '../../components/ui/Tabs'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Avatar from '../../components/ui/Avatar'
import DataTable from '../../components/ui/DataTable'
import FormModal from '../../components/patterns/FormModal'
import PermissionMatrix from '../../components/patterns/PermissionMatrix'
import { Field, TextInput, TextArea, Select } from '../../components/ui/Field'
import { useToast } from '../../context/ToastContext'
import { accessRoles, accessUsers } from '../../data/accessControl'
import { ALL_MODULE_KEYS, countGranted } from '../../data/modules'

const ROLE_BADGE_TONES = ['purple', 'blue', 'orange', 'green', 'red']
const emptyPermissions = () => Object.fromEntries(ALL_MODULE_KEYS.map((k) => [k, false]))

export default function AccessManagement() {
  const { showToast } = useToast()
  const [tab, setTab] = useState('Roles')
  const [roles, setRoles] = useState(accessRoles)
  const [users, setUsers] = useState(accessUsers)

  const [roleModal, setRoleModal] = useState({ open: false, editing: null })
  const [roleForm, setRoleForm] = useState({ name: '', description: '', permissions: emptyPermissions() })

  const [userModal, setUserModal] = useState({ open: false, editing: null })
  const [userForm, setUserForm] = useState({ name: '', email: '', roleId: roles[0]?.id, status: 'Active' })

  const roleName = (roleId) => roles.find((r) => r.id === roleId)?.name || 'Unknown'
  const roleTone = (roleId) => ROLE_BADGE_TONES[roles.findIndex((r) => r.id === roleId) % ROLE_BADGE_TONES.length]
  const userCountFor = (roleId) => users.filter((u) => u.roleId === roleId).length

  // ---- Role modal handlers ----
  const openCreateRole = () => {
    setRoleForm({ name: '', description: '', permissions: emptyPermissions() })
    setRoleModal({ open: true, editing: null })
  }
  const openEditRole = (role) => {
    setRoleForm({ name: role.name, description: role.description, permissions: { ...role.permissions } })
    setRoleModal({ open: true, editing: role })
  }
  const setPermission = (key, value) => {
    setRoleForm((f) => ({ ...f, permissions: { ...f.permissions, [key]: value } }))
  }
  const submitRole = () => {
    if (!roleForm.name) return
    if (roleModal.editing) {
      setRoles((prev) => prev.map((r) => (r.id === roleModal.editing.id ? { ...r, ...roleForm } : r)))
      showToast(`${roleForm.name} role updated.`)
    } else {
      const id = `ROLE-${String(roles.length + 1).padStart(2, '0')}`
      setRoles((prev) => [...prev, { id, ...roleForm, locked: false }])
      showToast(`${roleForm.name} role created.`)
    }
    setRoleModal({ open: false, editing: null })
  }
  const deleteRole = (role) => {
    if (role.locked) {
      showToast('The Administrator role can\u2019t be deleted.', 'info')
      return
    }
    if (userCountFor(role.id) > 0) {
      showToast('Reassign users before deleting this role.', 'info')
      return
    }
    setRoles((prev) => prev.filter((r) => r.id !== role.id))
    showToast(`${role.name} role deleted.`)
  }

  // ---- User modal handlers ----
  const openCreateUser = () => {
    setUserForm({ name: '', email: '', roleId: roles[0]?.id, status: 'Active' })
    setUserModal({ open: true, editing: null })
  }
  const openEditUser = (user) => {
    setUserForm({ name: user.name, email: user.email, roleId: user.roleId, status: user.status })
    setUserModal({ open: true, editing: user })
  }
  const submitUser = () => {
    if (!userForm.name || !userForm.email) return
    if (userModal.editing) {
      setUsers((prev) => prev.map((u) => (u.id === userModal.editing.id ? { ...u, ...userForm } : u)))
      showToast(`${userForm.name} updated.`)
    } else {
      const id = `AU-${String(users.length + 1).padStart(2, '0')}`
      setUsers((prev) => [{ id, ...userForm }, ...prev])
      showToast(`${userForm.name} added with the ${roleName(userForm.roleId)} role.`)
    }
    setUserModal({ open: false, editing: null })
  }
  const toggleStatus = (user) => {
    const next = user.status === 'Active' ? 'Suspended' : 'Active'
    setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, status: next } : u)))
    showToast(`${user.name} ${next === 'Active' ? 'reactivated' : 'suspended'}.`)
  }

  return (
    <div>
      <PageHeader
        title="Access Management"
        description="Create roles, control which modules they can reach, and manage who has access."
        actions={
          tab === 'Roles' ? (
            <Button icon={Plus} onClick={openCreateRole}>Create Role</Button>
          ) : (
            <Button icon={UserPlus} onClick={openCreateUser}>Add User</Button>
          )
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Roles" value={roles.length} icon={ShieldCheck} />
        <StatCard label="Users" value={users.length} icon={Users} tone="blue" />
        <StatCard label="Active Users" value={users.filter((u) => u.status === 'Active').length} icon={CheckCircle2} tone="brand" />
        <StatCard label="Suspended" value={users.filter((u) => u.status === 'Suspended').length} icon={Ban} tone="red" />
      </div>

      <Card padded={false} className="p-5">
        <Tabs tabs={['Roles', 'Users']} active={tab} onChange={setTab} />

        {tab === 'Roles' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {roles.map((role) => {
              const granted = countGranted(role.permissions)
              return (
                <Card key={role.id} className="flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900">{role.name}</h3>
                      {role.locked && (
                        <span title="Built-in role"><Lock size={13} className="text-slate-400" /></span>
                      )}
                    </div>
                    <Badge tone="blue">{userCountFor(role.id)} users</Badge>
                  </div>
                  <p className="text-sm text-slate-500 flex-1 mb-4">{role.description}</p>
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>Module access</span>
                      <span>{granted}/{ALL_MODULE_KEYS.length}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-brand-500 rounded-full"
                        style={{ width: `${(granted / ALL_MODULE_KEYS.length) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm" icon={Pencil} onClick={() => openEditRole(role)} className="flex-1">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" icon={Trash2} onClick={() => deleteRole(role)}>
                      Delete
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        ) : (
          <DataTable
            columns={[
              { key: 'name', header: 'User', render: (r) => (
                <div className="flex items-center gap-2.5">
                  <Avatar name={r.name} size={30} />
                  <div>
                    <p className="font-medium text-slate-800">{r.name}</p>
                    <p className="text-xs text-slate-400">{r.email}</p>
                  </div>
                </div>
              ) },
              { key: 'role', header: 'Role', render: (r) => <Badge tone={roleTone(r.roleId)}>{roleName(r.roleId)}</Badge> },
              { key: 'status', header: 'Status', render: (r) => <Badge>{r.status}</Badge> },
              { key: 'actions', header: '', render: (r) => (
                <div className="flex items-center gap-1.5">
                  <Button variant="ghost" size="sm" icon={Pencil} onClick={() => openEditUser(r)}>Edit</Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={r.status === 'Active' ? Ban : CheckCircle2}
                    onClick={() => toggleStatus(r)}
                  >
                    {r.status === 'Active' ? 'Suspend' : 'Activate'}
                  </Button>
                </div>
              ) },
            ]}
            rows={users}
            searchKeys={['name', 'email']}
            searchPlaceholder="Search users…"
          />
        )}
      </Card>

      {/* Create / Edit Role */}
      <FormModal
        open={roleModal.open}
        onClose={() => setRoleModal({ open: false, editing: null })}
        title={roleModal.editing ? `Edit ${roleModal.editing.name}` : 'Create Role'}
        description="Name the role, then choose which modules it can access."
        onSubmit={submitRole}
        submitLabel={roleModal.editing ? 'Save Changes' : 'Create Role'}
        size="lg"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Role name">
            <TextInput
              required
              value={roleForm.name}
              onChange={(e) => setRoleForm({ ...roleForm, name: e.target.value })}
              placeholder="e.g. Regional Manager"
              disabled={roleModal.editing?.locked}
            />
          </Field>
        </div>
        <Field label="Description">
          <TextArea
            value={roleForm.description}
            onChange={(e) => setRoleForm({ ...roleForm, description: e.target.value })}
            placeholder="What is this role responsible for?"
          />
        </Field>
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Module access</p>
          <PermissionMatrix permissions={roleForm.permissions} onChange={setPermission} />
        </div>
      </FormModal>

      {/* Create / Edit User */}
      <FormModal
        open={userModal.open}
        onClose={() => setUserModal({ open: false, editing: null })}
        title={userModal.editing ? 'Update User' : 'Add User'}
        description="Assign a role to control what this person can see and do."
        onSubmit={submitUser}
        submitLabel={userModal.editing ? 'Save Changes' : 'Add User'}
      >
        <Field label="Full name">
          <TextInput required value={userForm.name} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} placeholder="e.g. Peter Njenga" />
        </Field>
        <Field label="Email address">
          <TextInput type="email" required value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} placeholder="name@nest.co.ke" />
        </Field>
        <Field label="Role">
          <Select value={userForm.roleId} onChange={(e) => setUserForm({ ...userForm, roleId: e.target.value })}>
            {roles.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
          </Select>
        </Field>
        <Field label="Status">
          <Select value={userForm.status} onChange={(e) => setUserForm({ ...userForm, status: e.target.value })}>
            <option>Active</option>
            <option>Suspended</option>
          </Select>
        </Field>
        {userModal.editing && (
          <button
            type="button"
            onClick={() => showToast(`Password reset link sent to ${userForm.email}.`)}
            className="flex items-center gap-1.5 text-xs font-medium text-brand-600 hover:text-brand-700"
          >
            <KeyRound size={13} /> Send password reset link
          </button>
        )}
      </FormModal>
    </div>
  )
}
