// app/layout.jsx
import './globals.css'
import '@/styles/shadcn.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Announcement from '@/components/Announcement'

export const metadata = {
  title: 'EnviroCast — Quantum-Enhanced Environmental Insights',
  description: 'Saving the environment by promoting action and new technology.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Announcement />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
