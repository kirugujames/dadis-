import { Home } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import { Field, TextInput, Select, TextArea } from '../../components/ui/Field'
import Button from '../../components/ui/Button'
import { landlords } from '../../data/mockData'

export default function PropertyOnboarding() {
  return (
    <div>
      <PageHeader title="Property Onboarding" description="Register a new property and link it to a landlord." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Property name">
                <TextInput placeholder="e.g. Greenview Apartments" />
              </Field>
              <Field label="Location">
                <TextInput placeholder="e.g. Kilimani, Nairobi" />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Property type">
                <Select defaultValue="Apartment">
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>Bedsitter Block</option>
                  <option>Commercial</option>
                </Select>
              </Field>
              <Field label="Number of units">
                <TextInput type="number" placeholder="24" />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Landlord">
                <Select defaultValue="">
                  <option value="" disabled>Select landlord</option>
                  {landlords.map((l) => (
                    <option key={l.id}>{l.name}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Assign caretaker">
                <TextInput placeholder="e.g. Grace Wanjiru" />
              </Field>
            </div>
            <Field label="Description">
              <TextArea placeholder="Amenities, parking, security features…" />
            </Field>
            <Button type="submit" icon={Home}>Add Property</Button>
          </form>
        </Card>

        <Card className="bg-brand-50/60 border-brand-100">
          <h3 className="font-semibold text-slate-900 mb-2">Before you submit</h3>
          <ul className="text-sm text-slate-600 space-y-2.5">
            <li>✓ Title deed or lease upload ready</li>
            <li>✓ Unit list with bedrooms and rent</li>
            <li>✓ Landlord payout details on file</li>
            <li>✓ Caretaker assigned for day-to-day ops</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
