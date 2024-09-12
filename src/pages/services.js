import Layout from '../components/Layout'
import Link from 'next/link'

const services = [
  { name: 'Operational Excellence', slug: 'operational-excellence' },
  { name: 'Corporate Finance & Revenue Management', slug: 'corporate-finance' },
  { name: 'Mergers & Acquisitions', slug: 'mergers-acquisitions' },
  { name: 'Digital Strategy and Technology', slug: 'digital-strategy' },
  { name: 'Organizational Design & Alignment', slug: 'organizational-design' },
  { name: 'Strategy', slug: 'strategy' },
  { name: 'Data & Advanced Analytics', slug: 'data-analytics' },
  { name: 'New Business Support', slug: 'new-business-support' }
]

export default function Services() {
  return (
    <Layout title="Services">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Our Services</h1>
        <p className="text-xl mb-8">
          At SLKone, we don't just advise—we become an extension of your team, driving real-world solutions that boost your bottom line. Our approach is hands-on, blending strategy with execution to turn challenges into competitive advantages.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link href={`/services/${service.slug}`} key={service.slug}>
              <a className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-semibold mb-4">{service.name}</h2>
                <p className="text-gray-600">Learn more about our {service.name} services</p>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}