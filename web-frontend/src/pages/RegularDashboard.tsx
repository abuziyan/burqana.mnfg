
import Layout from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { api } from '../services/api'
import { useState } from 'react'

export default function RegularDashboard() {
  const { user, apiKey } = useAuth()
  const [status, setStatus] = useState('Ready')
  const [history, setHistory] = useState<any[]>([])
  async function refresh() {
    if (!user || !apiKey) return
    const res = await api.getLogs(user.id, 'time', apiKey)
    if (res.success) setHistory(res.data || [])
  }
  return (
    <Layout title="Regular Employee">
      <div className="grid gap-4">
        <div className="flex gap-3">
          <button className="btn-primary" onClick={async ()=>{
            if (!user || !apiKey) return
            setStatus('Clocking in...')
            const r = await api.clock(user.id, true, apiKey)
            setStatus(r.success ? 'Clocked In' : ('Error: ' + (r.message || '')))
            refresh()
          }}>Clock In</button>
          <button className="btn-outline" onClick={async ()=>{
            if (!user || !apiKey) return
            setStatus('Clocking out...')
            const r = await api.clock(user.id, false, apiKey)
            setStatus(r.success ? 'Clocked Out' : ('Error: ' + (r.message || '')))
            refresh()
          }}>Clock Out</button>
          <button className="btn-outline" onClick={refresh}>Refresh History</button>
        </div>
        <div className="text-sm opacity-80">Status: {status}</div>
        <div>
          <h3 className="font-semibold mb-2">This User's Time Logs</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b border-slate-200 dark:border-slate-700">
                  <th className="py-2 pr-4">Date</th><th className="py-2 pr-4">Time In</th><th className="py-2 pr-4">Time Out</th><th className="py-2 pr-4">Hours</th>
                </tr>
              </thead>
              <tbody>
                {history.map((r, i)=> (
                  <tr key={i} className="border-b border-slate-100 dark:border-slate-800">
                    <td className="py-2 pr-4">{r['Date']}</td>
                    <td className="py-2 pr-4">{r['Time In']}</td>
                    <td className="py-2 pr-4">{r['Time Out']}</td>
                    <td className="py-2 pr-4">{Number(r['Total Hours']||0).toFixed(2)}</td>
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
