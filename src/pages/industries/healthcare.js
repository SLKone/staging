import Layout from '../../components/Layout'

export default function Healthcare() {
  return (
    <Layout title="Healthcare">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Healthcare</h1>
        <p className="text-xl mb-8">
          In the ever-evolving healthcare landscape, SLKone helps providers, payers, and life sciences companies optimize operations, enhance patient outcomes, and navigate complex market dynamics.
        </p>

        <h2 className="text-3xl font-semibold mb-4">Our Expertise</h2>
        <ul className="list-disc list-inside mb-8">
          <li>Provider Practice Management Groups</li>
          <li>Pharma & Biotech</li>
          <li>Medical Devices & MedTech</li>
          <li>Health Tech</li>
        </ul>

        {/* Add more sections as needed, based on your site planning document */}
      </div>
    </Layout>
  )
}