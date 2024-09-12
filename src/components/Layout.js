import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

export default function Layout({ children, title = 'SLKone' }) {
  return (
    <>
      <Head>
        <title>{title} | SLKone</title>
        <meta name="description" content="SLKone is a bespoke management consulting firm bridging Strategy, Leadership, and Knowledge to build lasting solutions." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}