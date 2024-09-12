import Layout from '../components/Layout'
import Link from 'next/link'

export default function Brands() {
  return (
    <Layout title="Brands">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Our Brands</h1>
        <p className="text-xl mb-8">
          At SLKone, we're not just consultants - we're innovators, accelerators, and value creators. Our family of brands represents our commitment to driving transformative change across industries.
        </p>
        <div className="space-y-12">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Amalgam Capital: Redefining Private Equity</h2>
            <p className="mb-4">Amalgam Capital is our independent sponsor arm, focused on acquiring and sustainably growing underrated businesses.</p>
            <Link href="/brands/amalgam-capital">
              <a className="text-blue-500 hover:underline">Learn more about Amalgam Capital</a>
            </Link>
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-4">SLK Catalyst Partners: Empowering Corporate Excellence</h2>
            <p className="mb-4">SLK Catalyst Partners offers a structured framework of actionable solutions to help corporate and operating entities tackle complex challenges.</p>
            <Link href="/brands/slk-catalyst-partners">
              <a className="text-blue-500 hover:underline">Explore SLK Catalyst Partners' solutions</a>
            </Link>
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-4">Abyss Analytics: Illuminating Healthcare Data</h2>
            <p className="mb-4">Abyss Analytics is our trailblazing healthcare analytics company, leveraging data science and AI to tackle the industry's most complex challenges.</p>
            <Link href="/brands/abyss-analytics">
              <a className="text-blue-500 hover:underline">Discover Abyss Analytics' capabilities</a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}