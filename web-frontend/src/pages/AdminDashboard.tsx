
import Layout from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { api } from '../services/api'
import { useEffect, useState } from 'react'

type Op = { operationId: string; date: string; sewerId: string; operationName: string; quantity: number; unitPrice: number; status: string }

export default function AdminDashboard() {
  const { apiKey } = useAuth()
  const [ops, setOps] = useState<Op[]>([])
  const [msg, setMsg] = useState('Load pending to begin')

  async function loadPending() {
    if (!apiKey) return
    const res = await api.listSewerOps(apiKey, 'Pending')
    if (res.success) { setOps(res.data || []); setMsg(`Loaded ${res.data?.length || 0} pending ops`) }
    else { setMsg('Error: ' + (res.message || '')) }
  }
  useEffect(() => { loadPending() }, [])

  async function decide(id: string, status: 'Approved'|'Rejected') {
    if (!apiKey) return
    const r = await api.approveOperation(id, status, apiKey)
    if (r.success) { setMsg(`${status} ${id}`); loadPending() } else setMsg('Error: ' + (r.message || ''))
  }

  return (
    <Layout title="Admin">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm opacity-80">{msg}</div>
        <button className="btn-outline" onClick={loadPending}>Refresh</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b border-slate-200 dark:border-slate-700">
              <th className="py-2 pr-4">ID</th><th className="py-2 pr-4">Date</th><th className="py-2 pr-4">Sewer</th><th className="py-2 pr-4">Operation</th><th className="py-2 pr-4">Qty</th><th className="py-2 pr-4">Unit Price</th><th className="py-2 pr-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {ops.map(op => (
              <tr key={op.operationId} className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-2 pr-4">{op.operationId}</td>
                <td className="py-2 pr-4">{op.date}</td>
                <td className="py-2 pr-4">{op.sewerId}</td>
                <td className="py-2 pr-4">{op.operationName}</td>
                <td className="py-2 pr-4">{op.quantity}</td>
                <td className="py-2 pr-4">{op.unitPrice}</td>
                <td className="py-2 pr-4 space-x-2">
                  <button className="btn-primary" onClick={()=>decide(op.operationId, 'Approved')}>Approve</button>
                  <button className="btn-outline" onClick={()=>decide(op.operationId, 'Rejected')}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}
