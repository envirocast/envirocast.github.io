// components/Header.jsx
'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu } from 'lucide-react'

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-black/30 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.svg" alt="EnviroCast" className="h-8 w-8" />
          <span className="font-semibold">EnviroCast</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-slate-200">
          <Link className="hover:text-white" href="/">Home</Link>
          <Link className="hover:text-white" href="/about">About</Link>
          <Link className="hover:text-white" href="/models">Models</Link>
          <a className="hover:text-white" href="#team">Team</a>
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Open Menu"><Menu /></button>
      </div>
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <a href="/" className="block">Home</a>
          <a href="/about" className="block">About</a>
          <a href="/models" className="block">Models</a>
          <a href="#team" className="block">Team</a>
        </div>
      )}
    </header>
  )
}
