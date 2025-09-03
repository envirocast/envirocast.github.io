// components/Footer.jsx
export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-black/30">
      <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img src="/logo.svg" alt="EnviroCast" className="h-8 w-8" />
            <span className="font-semibold">EnviroCast</span>
          </div>
          <p className="text-slate-400">Quantum-enhanced environmental insights. Built with Next.js, Tailwind, and love.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Links</h4>
          <ul className="space-y-1 text-slate-300">
            <li><a className="link" href="/about">About</a></li>
            <li><a className="link" href="/models">Models</a></li>
            <li><a className="link" href="https://instagram.com/envirocast_tech" target="_blank" rel="noreferrer">Instagram</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p className="text-slate-300">hello@envirocast.github.io</p>
        </div>
      </div>
      <div className="text-center text-xs text-slate-500 pb-6">© {new Date().getFullYear()} EnviroCast</div>
    </footer>
  )
}
