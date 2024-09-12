import Layout from '../components/Layout'

export default function Careers() {
  return (
    <Layout title="Careers">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Join Our Team of Strategic Implementers</h1>
        <p className="text-xl mb-8">
          At SLKone, we have redefined the purpose of a consultant by leveraging our expertise for greater client results as well as personal and professional satisfaction. Whereas a typical consultant is measured by the hours billed, a SLKone team member is driven by the desire to deliver successful outcomes for our clients.
        </p>
        <h2 className="text-3xl font-semibold mb-4">How We Do It Better</h2>
        <p className="mb-8">
          SLKone partners with clients to bridge data with decision making to generate enterprise value. What makes SLKone different is how we approach the intersection of business generalist and data scientist. Historically, that has been accomplished through the "data translator" model where management consultants work with data science teams to derive insights. We challenge that model and believe there have been enough advancements in open-source research, education, and resources to apply data science principles and models to our projects. In other words, we're consultants who can code and see that as the long-term model for success.
        </p>
        {/* Add more sections as needed */}
      </div>
    </Layout>
  )
}