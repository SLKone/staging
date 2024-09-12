import { useRouter } from 'next/router'
import Layout from '../../components/Layout'

export default function Insight() {
  const router = useRouter()
  const { slug } = router.query

  return (
    <Layout title={`Insight: ${slug}`}>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Insight: {slug}</h1>
        {/* Add content for each insight here */}
      </div>
    </Layout>
  )
}