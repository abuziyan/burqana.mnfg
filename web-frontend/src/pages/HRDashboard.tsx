
import Layout from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { api } from '../services/api'
import { useState } from 'react'

export default function HRDashboard() {
  const { user, apiKey } = useAuth()
  const [rows, setRows] = useState<any[]>([])
  const [msg, setMsg] = useState('Ready')

  async function fetchAll() {
    if (!apiKey) return
    const r = await api.payroll(apiKey)
    if (r.success) { setRows(r.data || []); setMsg(`Fetched ${r.data?.length || 0} rows`) }
    else setMsg('Error: ' + (r.message || ''))
  }
  async function fetchMine() {
    if (!apiKey || !user) return
    const r = await api.payroll(apiKey, user.id)
    if (r.success) { setRows(r.data || []); setMsg(`Fetched payroll for ${user.name}`) }
    else setMsg('Error: ' + (r.message || ''))
  }
  return (
    <Layout title="HR Payroll">
      <div className="flex gap-3 mb-3">
        <button className="btn-primary" onClick={fetchAll}>Fetch All</button>
        <button className="btn-outline" onClick={fetchMine}>My Payroll</button>
      </div>
      <div className="text-sm opacity-80 mb-3">{msg}</div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b border-slate-200 dark:border-slate-700">
              <th className="py-2 pr-4">ID</th><th className="py-2 pr-4">Name</th><th className="py-2 pr-4">Role</th><th className="py-2 pr-4">Total Pay</th><th className="py-2 pr-4">Period</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r,i) => (
              <tr key={i} className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-2 pr-4">{r.id}</td>
                <td className="py-2 pr-4">{r.name}</td>
                <td className="py-2 pr-4">{r.role}</td>
                <td className="py-2 pr-4">{Number(r.totalPay||0).toFixed(2)}</td>
                <td className="py-2 pr-4">{r.payPeriod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}
