import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import Link from 'next/link'
import { getAllMarkdownData } from '../../lib/markdown'

const serviceData = {
  // ... (existing service data)
}

export default function Service({ service, relatedCaseStudies, relatedInsights }) {
  const router = useRouter()
  const { slug } = router.query

  if (!service) return <div>Loading...</div>

  return (
    <Layout title={service.title}>
      {/* ... (existing service content) */}
      
      <h2 className="text-3xl font-semibold mb-4">Related Case Studies</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {relatedCaseStudies.map((caseStudy) => (
          <Link href={`/case-studies/${caseStudy.slug}`} key={caseStudy.slug}>
            <a className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{caseStudy.title}</h3>
              <p className="text-gray-600">{caseStudy.intro}</p>
            </a>
          </Link>
        ))}
      </div>

      <h2 className="text-3xl font-semibold mb-4">Related Insights</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedInsights.map((insight) => (
          <Link href={`/insights/${insight.slug}`} key={insight.slug}>
            <a className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{insight.title}</h3>
              <p className="text-gray-600">{insight.intro}</p>
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = Object.keys(serviceData).map((slug) => ({
    params: { slug },
  }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const service = serviceData[params.slug]
  const allCaseStudies = getAllMarkdownData('_case-studies')
  const allInsights = getAllMarkdownData('_insights')

  const relatedCaseStudies = allCaseStudies.filter((caseStudy) =>
    caseStudy['services-performed']?.includes(params.slug)
  )

  const relatedInsights = allInsights.filter((insight) =>
    insight.tag?.includes(params.slug)
  )

  return { props: { service, relatedCaseStudies, relatedInsights } }
}