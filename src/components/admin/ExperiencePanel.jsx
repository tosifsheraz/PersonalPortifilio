import { useState } from 'react'
import { useCRUD } from '../../hooks/useCRUD'
import { CRUDTable } from './CRUDTable'
import { Toast } from '../ui/Toast'
import { Button } from '../ui/Button'

const TYPES = ['work', 'volunteer', 'achievement']

const columns = [
  { key: 'role', label: 'Role' },
  { key: 'organization', label: 'Organization' },
  { key: 'duration', label: 'Duration' },
  { key: 'type', label: 'Type' },
  { key: 'order_index', label: 'Order' },
]

const inputClass = 'w-full border border-mm-border bg-mm-card px-3 py-2 font-mono text-sm text-mm-white placeholder-mm-muted focus:outline-none focus:border-mm-orange transition-colors'
const labelClass = 'font-mono text-xs uppercase tracking-widest text-mm-muted block mb-1'
const selectClass = 'w-full border border-mm-border bg-mm-card px-3 py-2 font-mono text-sm text-mm-white focus:outline-none focus:border-mm-orange transition-colors'

function ExperienceForm({ item, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    role: item?.role || '',
    organization: item?.organization || '',
    duration: item?.duration || '',
    description: item?.description || '',
    type: item?.type || TYPES[0],
    order_index: item?.order_index || 0,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ ...form, order_index: Number(form.order_index) })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {[['role', 'Role'], ['organization', 'Organization'], ['duration', 'Duration (e.g. Jan 2024 – Present)']].map(([key, label]) => (
        <div key={key}>
          <label className={labelClass}>{label}</label>
          <input type="text" value={form[key]} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))} required className={inputClass} />
        </div>
      ))}
      <div>
        <label className={labelClass}>Description</label>
        <textarea rows={3} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} className={`${inputClass} resize-none`} />
      </div>
      <div>
        <label className={labelClass}>Type</label>
        <select value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))} className={selectClass}>
          {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label className={labelClass}>Order Index</label>
        <input type="number" value={form.order_index} onChange={(e) => setForm((p) => ({ ...p, order_index: e.target.value }))} className={inputClass} />
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="submit" variant="primary">Save</Button>
        <Button type="button" onClick={onCancel} variant="secondary">Cancel</Button>
      </div>
    </form>
  )
}

export function ExperiencePanel() {
  const { items, create, update, remove, toastMessage } = useCRUD('experience')

  return (
    <div>
      <h2 className="font-display font-black text-2xl mb-6 border-b border-mm-border pb-3 text-mm-white">Experience</h2>
      <CRUDTable
        items={items}
        columns={columns}
        onAdd={create}
        onEdit={update}
        onDelete={remove}
        renderForm={({ item, onSubmit, onCancel }) => (
          <ExperienceForm item={item} onSubmit={onSubmit} onCancel={onCancel} />
        )}
      />
      {toastMessage && <Toast message={toastMessage.message} type={toastMessage.type} />}
    </div>
  )
}
