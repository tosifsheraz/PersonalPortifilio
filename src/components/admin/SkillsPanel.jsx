import { useState } from 'react'
import { useCRUD } from '../../hooks/useCRUD'
import { CRUDTable } from './CRUDTable'
import { Toast } from '../ui/Toast'
import { Button } from '../ui/Button'

const CATEGORIES = ['Languages', 'Frontend', 'Backend', 'AI/ML', 'Tools']

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'category', label: 'Category' },
  { key: 'proficiency', label: 'Proficiency' },
  { key: 'order_index', label: 'Order' },
]

const inputClass = 'w-full border border-mm-border bg-mm-card px-3 py-2 font-mono text-sm text-mm-white placeholder-mm-muted focus:outline-none focus:border-mm-orange transition-colors'
const labelClass = 'font-mono text-xs uppercase tracking-widest text-mm-muted block mb-1'
const selectClass = 'w-full border border-mm-border bg-mm-card px-3 py-2 font-mono text-sm text-mm-white focus:outline-none focus:border-mm-orange transition-colors'

function SkillForm({ item, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: item?.name || '',
    category: item?.category || CATEGORIES[0],
    proficiency: item?.proficiency || '',
    order_index: item?.order_index || 0,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...form,
      proficiency: form.proficiency ? Number(form.proficiency) : null,
      order_index: Number(form.order_index),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className={labelClass}>Name</label>
        <input type="text" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Category</label>
        <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} className={selectClass}>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className={labelClass}>Proficiency (1-100)</label>
        <input type="number" min={1} max={100} value={form.proficiency} onChange={(e) => setForm((p) => ({ ...p, proficiency: e.target.value }))} className={inputClass} />
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

export function SkillsPanel() {
  const { items, create, update, remove, toastMessage } = useCRUD('skills')

  return (
    <div>
      <h2 className="font-display font-black text-2xl mb-6 border-b border-mm-border pb-3 text-mm-white">Skills</h2>
      <CRUDTable
        items={items}
        columns={columns}
        onAdd={create}
        onEdit={update}
        onDelete={remove}
        renderForm={({ item, onSubmit, onCancel }) => (
          <SkillForm item={item} onSubmit={onSubmit} onCancel={onCancel} />
        )}
      />
      {toastMessage && <Toast message={toastMessage.message} type={toastMessage.type} />}
    </div>
  )
}
