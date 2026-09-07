import { UserPlus } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import { Field, TextInput, Select, TextArea } from '../../components/ui/Field'
import Button from '../../components/ui/Button'
import DataTable from '../../components/ui/DataTable'
import { tenants, properties } from '../../data/mockData'

export default function TenantOnboarding() {
  return (
    <div>
      <PageHeader title="Tenant Onboarding" description="Add a new tenant and assign them to a unit." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <Card className="lg:col-span-2">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full name">
                <TextInput placeholder="e.g. Nancy Wairimu" />
              </Field>
              <Field label="Phone number">
                <TextInput placeholder="+254 7XX XXX XXX" />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="National ID">
                <TextInput placeholder="ID number" />
              </Field>
              <Field label="Email address">
                <TextInput type="email" placeholder="tenant@email.com" />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Assign property">
                <Select defaultValue="">
                  <option value="" disabled>Select property</option>
                  {properties.map((p) => (
                    <option key={p.id}>{p.name}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Unit">
                <TextInput placeholder="e.g. C2" />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Monthly rent (KSh)">
                <TextInput type="number" placeholder="32000" />
              </Field>
              <Field label="Lease start date">
                <TextInput type="date" />
              </Field>
            </div>
            <Field label="Notes">
              <TextArea placeholder="Emergency contact, special arrangements, etc." />
            </Field>
            <Button type="submit" icon={UserPlus}>Onboard Tenant</Button>
          </form>
        </Card>

        <Card className="bg-brand-50/60 border-brand-100">
          <h3 className="font-semibold text-slate-900 mb-2">Onboarding checklist</h3>
          <ul className="text-sm text-slate-600 space-y-2.5">
            <li>✓ Collect signed lease agreement</li>
            <li>✓ Verify ID and passport photo</li>
            <li>✓ Record deposit payment</li>
            <li>✓ Share move-in inspection report</li>
            <li>✓ Add tenant to WhatsApp updates</li>
          </ul>
        </Card>
      </div>

      <Card padded={false} className="p-5">
        <h3 className="font-semibold text-slate-900 mb-4">Recently Onboarded</h3>
        <DataTable
          columns={[
            { key: 'name', header: 'Tenant' },
            { key: 'unit', header: 'Unit' },
            { key: 'phone', header: 'Phone' },
            { key: 'status', header: 'Status' },
          ]}
          rows={tenants.slice(0, 4)}
          searchKeys={['name']}
          searchPlaceholder="Search recent tenants…"
        />
      </Card>
    </div>
  )
}
