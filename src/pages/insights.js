import Layout from '../components/Layout'
import Link from 'next/link'

// This would typically come from an API or CMS
const insights = [
  { title: 'The Future of Digital Transformation', slug: 'future-of-digital-transformation' },
  { title: 'Optimizing Supply Chains in a Post-Pandemic World', slug: 'optimizing-supply-chains' },
  { title: 'Leveraging AI in Healthcare', slug: 'ai-in-healthcare' },
  // Add more insights as needed
]

export default function Insights() {
  return (
    <Layout title="Insights">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Insights</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((insight) => (
            <Link href={`/insights/${insight.slug}`} key={insight.slug}>
              <a className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-semibold mb-4">{insight.title}</h2>
                <p className="text-gray-600">Read more</p>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}