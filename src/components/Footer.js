import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <p className="text-center mb-4">
          We partner with our clients and instill trust and integrity at the highest levels. Through this bond we drive accountability and cultivate lasting relationships.
        </p>
        <div className="flex justify-center space-x-4 mb-4">
          <Link href="/culture"><a>Culture</a></Link>
          <Link href="/careers"><a>Careers</a></Link>
          <Link href="/brands"><a>Brands</a></Link>
        </div>
        <div className="text-center">
          <a href="https://www.linkedin.com/company/slkone" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        <p className="text-center text-sm mt-4">
          © {new Date().getFullYear()} SLKone, LLC | 251 Little Falls Drive, Wilmington, DE 19808, USA
        </p>
      </div>
    </footer>
  )
}