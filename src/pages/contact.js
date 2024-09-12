import Layout from '../components/Layout'

export default function Contact() {
  return (
    <Layout title="Contact Us">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="mb-4">
              At SLKone, we're passionate about bridging the gap between strategy and implementation. We're committed to understanding your unique challenges and delivering tangible, data-driven solutions that create lasting impact.
            </p>
            <p className="mb-4">
              Whether you're looking to discuss a specific operational challenge, seek strategic advice on performance improvement, explore how data analytics can drive your decision-making, or learn more about our unique approach to consulting, we're here to listen, collaborate, and drive results together.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="mb-4">Phone: 919.537.9189</p>
            <p className="mb-4">Email: hello@slkone.com</p>
            <p className="mb-4">
              SLKone LLC<br />
              251 Little Falls Drive<br />
              Wilmington, DE 19808, USA
            </p>
            {/* Add a contact form here if desired */}
          </div>
        </div>
      </div>
    </Layout>
  )
}