import Layout from '../../components/Layout'

export default function OperationalExcellence() {
  return (
    <Layout title="Operational Excellence">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Operational Excellence</h1>
        <p className="text-xl mb-8">
          SLKone simplifies operations, enhances decision-making, and improves performance in on-time delivery, cost control, and quality. We ensure your business can quickly adapt to market disruptions while maintaining consistency in customer satisfaction.
        </p>

        <h2 className="text-3xl font-semibold mb-4">Our Approach</h2>
        <p className="mb-8">
          We take a holistic view of your operations, understanding that true excellence comes from the seamless integration of people, processes, and technology. Our data-driven methodology allows us to identify bottlenecks, inefficiencies, and opportunities for improvement across your entire value chain.
        </p>

        <h2 className="text-3xl font-semibold mb-4">Our Impact</h2>
        <ul className="list-disc list-inside mb-8">
          <li>15-20% reduction in operational costs</li>
          <li>25-30% increase in overall productivity</li>
          <li>40-50% reduction in defects and errors</li>
          <li>30-40% decrease in order-to-delivery lead times</li>
          <li>20% boost in customer satisfaction scores</li>
        </ul>

        <h2 className="text-3xl font-semibold mb-4">Our Focus Areas</h2>
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-2">Performance Improvement</h3>
          <p className="mb-4">
            We don't just advise—we become an extension of your team, driving real-world solutions that boost your bottom line. From optimizing supply chains to spearheading digital transformations, we turn challenges into competitive advantages.
          </p>
          <ul className="list-disc list-inside">
            <li>Process Optimization</li>
            <li>Lean Six Sigma Implementation</li>
            <li>Performance Metrics and KPI Development</li>
            <li>Operational Cost Reduction</li>
            <li>Capacity Planning and Optimization</li>
          </ul>
        </div>
        {/* Add other focus areas similarly */}
      </div>
    </Layout>
  )
}