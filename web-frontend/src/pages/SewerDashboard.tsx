
import Layout from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { api } from '../services/api'
import { useState } from 'react'

export default function SewerDashboard() {
  const { user, apiKey } = useAuth()
  const [operationName, setOperationName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [unitPrice, setUnitPrice] = useState('')
  const [msg, setMsg] = useState('Ready')
  const [ops, setOps] = useState<any[]>([])

  async function refresh() {
    if (!user || !apiKey) return
    const r = await api.getLogs(user.id, 'sewer', apiKey)
    if (r.success) setOps(r.data || [])
  }

  return (
    <Layout title="Sewer Operations">
      <div className="grid gap-4">
        <div className="grid md:grid-cols-4 gap-3">
          <div><label className="label">Operation Name</label><input className="input" value={operationName} onChange={e=>setOperationName(e.target.value)} placeholder="Topstitch" /></div>
          <div><label className="label">Quantity</label><input className="input" value={quantity} onChange={e=>setQuantity(e.target.value)} placeholder="50" /></div>
          <div><label className="label">Unit Price (optional)</label><input className="input" value={unitPrice} onChange={e=>setUnitPrice(e.target.value)} placeholder="5.5" /></div>
          <div className="flex items-end"><button className="btn-primary w-full" onClick={async ()=>{
            if (!user || !apiKey) return
            const qty = parseInt(quantity||'0', 10)
            const price = unitPrice.trim() ? Number(unitPrice) : undefined
            const res = await api.logOperation(user.id, operationName, qty, price, apiKey)
            setMsg(res.success ? 'Submitted (Pending)' : ('Error: ' + (res.message || '')))
            setOperationName(''); setQuantity(''); setUnitPrice('')
            refresh()
          }}>Submit</button></div>
        </div>
        <div className="text-sm opacity-80">Status: {msg}</div>
        <div className="flex gap-3"><button className="btn-outline" onClick={refresh}>Refresh History</button></div>
        <div>
          <h3 className="font-semibold mb-2">My Operations</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b border-slate-200 dark:border-slate-700">
                  <th className="py-2 pr-4">Date</th><th className="py-2 pr-4">Operation</th><th className="py-2 pr-4">Qty</th><th className="py-2 pr-4">Unit Price</th><th className="py-2 pr-4">Status</th><th className="py-2 pr-4">Pay</th>
                </tr>
              </thead>
              <tbody>
                {ops.map((r, i)=> (
                  <tr key={i} className="border-b border-slate-100 dark:border-slate-800">
                    <td className="py-2 pr-4">{r['Date']}</td>
                    <td className="py-2 pr-4">{r['Operation Name']}</td>
                    <td className="py-2 pr-4">{r['Quantity']}</td>
                    <td className="py-2 pr-4">{r['Unit Price']}</td>
                    <td className="py-2 pr-4">{r['Status']}</td>
                    <td className="py-2 pr-4">{(Number(r['Quantity']||0) * Number(r['Unit Price']||0)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}
