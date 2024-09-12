import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout title="Home">
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Bridge Strategy to Measurable Success</h1>
          <p className="text-xl mb-8">
            SLKone is more than a consulting firm—we're your partner in turning strategy into measurable success. Our hands-on approach means we work side-by-side with your team, delivering actionable solutions that directly impact your bottom line.
          </p>
          <a href="/contact" className="bg-blue-500 text-white px-6 py-2 rounded">Ready to Cross The Bridge?</a>
        </div>
      </section>
      {/* Add more sections for Our Approach, What sets SLKone apart, etc. */}
    </Layout>
  )
}