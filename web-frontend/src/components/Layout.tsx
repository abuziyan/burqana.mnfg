
import { PropsWithChildren, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, LogOut, Timer, ScissorsSquare, Users, CheckSquare, DollarSign } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import clsx from 'clsx'

export default function Layout({ children, title }: PropsWithChildren<{title: string}>) {
  const [open, setOpen] = useState(true)
  const { user, logout } = useAuth()
  const nav = useNavigate()
  useEffect(() => { if (!user) nav('/login') }, [user])
  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100">
      <header className="sticky top-0 z-20 backdrop-blur bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/60 dark:border-slate-700/60">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button className="btn btn-outline" onClick={() => setOpen(!open)}><Menu size={18} className="mr-2" />Menu</button>
          <div className="font-semibold">{title}</div>
          <div className="flex items-center gap-3">
            <div className="text-sm opacity-80">{user?.name} • {user?.role}</div>
            <button className="btn btn-outline" onClick={logout}><LogOut size={16} className="mr-2" />Logout</button>
          </div>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-12 gap-6">
        <aside className={clsx('col-span-12 md:col-span-3 transition', open ? 'opacity-100' : 'opacity-0 md:opacity-100 md:!block')}>
          <nav className="card">
            <ul className="space-y-2">
              <li><Link to="/regular" className="btn btn-outline w-full justify-start"><Timer size={16} className="mr-2" /> Time Logs</Link></li>
              <li><Link to="/sewer" className="btn btn-outline w-full justify-start"><ScissorsSquare size={16} className="mr-2" /> Sewer Ops</Link></li>
              <li><Link to="/admin" className="btn btn-outline w-full justify-start"><CheckSquare size={16} className="mr-2" /> Admin</Link></li>
              <li><Link to="/hr" className="btn btn-outline w-full justify-start"><DollarSign size={16} className="mr-2" /> HR Payroll</Link></li>
              <li><a className="btn btn-outline w-full justify-start opacity-60 cursor-not-allowed"><Users size={16} className="mr-2" /> More (soon)</a></li>
            </ul>
          </nav>
        </aside>
        <main className="col-span-12 md:col-span-9"><div className="card">{children}</div></main>
      </div>
    </div>
  )
}
