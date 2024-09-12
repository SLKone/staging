import Layout from '../components/Layout'
import Link from 'next/link'

const industries = [
  { name: 'Healthcare', slug: 'healthcare' },
  { name: 'Manufacturing', slug: 'manufacturing' },
  { name: 'Technology', slug: 'technology' },
  { name: 'Retail & Consumer Goods', slug: 'retail-consumer-goods' },
  { name: 'Private Equity', slug: 'private-equity' },
  { name: 'Energy & Resources', slug: 'energy-resources' }
]

export default function Industries() {
  return (
    <Layout title="Industries">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Industries We Serve</h1>
        <p className="text-xl mb-8">
          At SLKone, we blend deep industry knowledge with cross-sector insights to uncover—and deliver—the most effective solutions to complex challenges. In today's rapidly evolving business landscape, the best answer is rarely the most conventional one.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry) => (
            <Link href={`/industries/${industry.slug}`} key={industry.slug}>
              <a className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-semibold mb-4">{industry.name}</h2>
                <p className="text-gray-600">Learn more about our solutions for the {industry.name} industry</p>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}