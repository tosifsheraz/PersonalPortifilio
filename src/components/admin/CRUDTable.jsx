import { useState } from 'react'
import { Pencil, Trash2, Plus, X } from 'lucide-react'
import { Button } from '../ui/Button'
import { motion, AnimatePresence } from 'framer-motion'

export function CRUDTable({ items, columns, onAdd, onEdit, onDelete, renderForm }) {
  const [showModal, setShowModal] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  const openCreate = () => { setEditItem(null); setShowModal(true) }
  const openEdit = (item) => { setEditItem(item); setShowModal(true) }
  const closeModal = () => { setShowModal(false); setEditItem(null) }

  const handleFormSubmit = async (data) => {
    if (editItem) {
      await onEdit(editItem.id, data)
    } else {
      await onAdd(data)
    }
    closeModal()
  }

  const handleDelete = async () => {
    await onDelete(deleteId)
    setDeleteId(null)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="font-mono text-xs text-mm-muted">{items.length} record{items.length !== 1 ? 's' : ''}</p>
        <Button onClick={openCreate} variant="primary">
          <Plus size={15} />
          Add New
        </Button>
      </div>

      <div className="border border-mm-border overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-mm-border bg-mm-surface">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-left font-mono text-xs uppercase tracking-widest text-mm-muted">
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-3 text-right font-mono text-xs uppercase tracking-widest text-mm-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-10 text-center font-mono text-sm text-mm-muted">
                  No records yet. Add one above.
                </td>
              </tr>
            ) : (
              items.map((item, i) => (
                <tr key={item.id} className={`border-b border-mm-border/50 ${i % 2 === 0 ? 'bg-mm-bg' : 'bg-mm-card'}`}>
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 font-mono text-xs text-mm-muted max-w-xs truncate">
                      {col.render ? col.render(item[col.key], item) : String(item[col.key] ?? '')}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => openEdit(item)}
                        className="border border-mm-border p-1.5 bg-mm-card text-mm-muted hover:border-mm-blue hover:text-mm-blue-light transition-colors"
                        aria-label="Edit"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={() => setDeleteId(item.id)}
                        className="border border-mm-border p-1.5 bg-mm-card text-mm-muted hover:border-mm-red hover:text-mm-red transition-colors"
                        aria-label="Delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-mm-surface border border-mm-border w-full max-w-lg max-h-[90vh] overflow-y-auto"
              style={{ boxShadow: '6px 6px 0px 0px #F6851B' }}
            >
              <div className="flex items-center justify-between p-6 border-b border-mm-border">
                <h3 className="font-display font-black text-lg text-mm-white">{editItem ? 'Edit Record' : 'Add New Record'}</h3>
                <button onClick={closeModal} className="border border-mm-border p-1 text-mm-muted hover:text-mm-white hover:border-mm-white transition-colors">
                  <X size={15} />
                </button>
              </div>
              <div className="p-6">
                {renderForm({ item: editItem, onSubmit: handleFormSubmit, onCancel: closeModal })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-mm-surface border border-mm-border p-8 max-w-sm w-full"
              style={{ boxShadow: '4px 4px 0px 0px #D73A49' }}
            >
              <h3 className="font-display font-black text-lg mb-3 text-mm-white">Confirm Delete</h3>
              <p className="font-mono text-sm text-mm-muted mb-6">This action cannot be undone. Are you sure?</p>
              <div className="flex gap-3">
                <Button onClick={handleDelete} variant="danger">
                  <Trash2 size={13} />
                  Delete
                </Button>
                <Button onClick={() => setDeleteId(null)} variant="secondary">
                  <X size={13} />
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
