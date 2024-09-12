import Layout from '../components/Layout'

export default function Culture() {
  return (
    <Layout title="Culture">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Feel at Home Among Strategic Problem-Solvers</h1>
        <p className="text-xl mb-8">
          At SLKone, we're driven by a passion for bridging strategy with execution. Our team of innovative problem-solvers thrives on challenging the status quo and delivering tangible results.
        </p>
        <h2 className="text-3xl font-semibold mb-4">Our Purpose</h2>
        <p className="mb-8">
          SLKone is a bespoke management consulting firm bridging Strategy, Leadership, and Knowledge to build lasting solutions. We consistently achieve client satisfaction and form long-term working relationships while empowering our consultants with stimulating learning opportunities, freedom to innovate, client exposure, and unparalleled work-life harmony.
        </p>
        <h2 className="text-3xl font-semibold mb-4">Our Five Pillars</h2>
        <ul className="list-disc list-inside mb-8">
          <li>Building a Firm for the Future</li>
          <li>Professionally Rewarding Work</li>
          <li>Financial Success</li>
          <li>Work-Life Harmony</li>
          <li>Giving Back to the Community</li>
        </ul>
        {/* Add more sections as needed */}
      </div>
    </Layout>
  )
}