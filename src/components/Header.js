import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-bold">SLKone</a>
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="/services"><a>Services</a></Link>
          <Link href="/industries"><a>Industries</a></Link>
          <Link href="/insights"><a>Insights</a></Link>
          <Link href="/culture"><a>Culture</a></Link>
          <Link href="/careers"><a>Careers</a></Link>
          <Link href="/brands"><a>Brands</a></Link>
          <Link href="/contact"><a>Contact</a></Link>
        </nav>
        <button className="md:hidden" onClick={toggleMenu}>Menu</button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col space-y-2 px-4 py-2">
            <Link href="/services"><a>Services</a></Link>
            <Link href="/industries"><a>Industries</a></Link>
            <Link href="/insights"><a>Insights</a></Link>
            <Link href="/culture"><a>Culture</a></Link>
            <Link href="/careers"><a>Careers</a></Link>
            <Link href="/brands"><a>Brands</a></Link>
            <Link href="/contact"><a>Contact</a></Link>
          </nav>
        </div>
      )}
    </header>
  )
}