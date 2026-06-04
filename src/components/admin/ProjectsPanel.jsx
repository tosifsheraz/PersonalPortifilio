import { useState } from 'react'
import { useCRUD } from '../../hooks/useCRUD'
import { CRUDTable } from './CRUDTable'
import { Toast } from '../ui/Toast'
import { Button } from '../ui/Button'

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'description', label: 'Description' },
  { key: 'tech_stack', label: 'Tech Stack', render: (v) => (v || []).join(', ') },
  { key: 'featured', label: 'Featured', render: (v) => (v ? 'Yes' : 'No') },
]

const inputClass = 'w-full border border-mm-border bg-mm-card px-3 py-2 font-mono text-sm text-mm-white placeholder-mm-muted focus:outline-none focus:border-mm-orange transition-colors'
const labelClass = 'font-mono text-xs uppercase tracking-widest text-mm-muted block mb-1'

function ProjectForm({ item, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: item?.title || '',
    description: item?.description || '',
    tech_stack: (item?.tech_stack || []).join(', '),
    github_url: item?.github_url || '',
    live_url: item?.live_url || '',
    image_url: item?.image_url || '',
    featured: item?.featured || false,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...form,
      tech_stack: form.tech_stack.split(',').map((s) => s.trim()).filter(Boolean),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {[['title', 'Title'], ['github_url', 'GitHub URL'], ['live_url', 'Live URL'], ['image_url', 'Image URL']].map(([key, label]) => (
        <div key={key}>
          <label className={labelClass}>{label}</label>
          <input type="text" value={form[key]} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))} className={inputClass} />
        </div>
      ))}
      <div>
        <label className={labelClass}>Description</label>
        <textarea rows={3} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} className={`${inputClass} resize-none`} />
      </div>
      <div>
        <label className={labelClass}>Tech Stack (comma-separated)</label>
        <input type="text" value={form.tech_stack} onChange={(e) => setForm((p) => ({ ...p, tech_stack: e.target.value }))} className={inputClass} />
      </div>
      <label className="flex items-center gap-2 font-mono text-sm text-mm-muted cursor-pointer">
        <input type="checkbox" checked={form.featured} onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))} className="w-4 h-4 accent-mm-orange" />
        Featured project
      </label>
      <div className="flex gap-3 pt-2">
        <Button type="submit" variant="primary">Save</Button>
        <Button type="button" onClick={onCancel} variant="secondary">Cancel</Button>
      </div>
    </form>
  )
}

export function ProjectsPanel() {
  const { items, create, update, remove, toastMessage } = useCRUD('projects')

  return (
    <div>
      <h2 className="font-display font-black text-2xl mb-6 border-b border-mm-border pb-3 text-mm-white">Projects</h2>
      <CRUDTable
        items={items}
        columns={columns}
        onAdd={create}
        onEdit={update}
        onDelete={remove}
        renderForm={({ item, onSubmit, onCancel }) => (
          <ProjectForm item={item} onSubmit={onSubmit} onCancel={onCancel} />
        )}
      />
      {toastMessage && <Toast message={toastMessage.message} type={toastMessage.type} />}
    </div>
  )
}
