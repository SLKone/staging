import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>SLKone - Hello World</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main>
        <h1>Hello World from SLKone!</h1>
      </main>
      <style jsx>{`
        main {
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background-color: #f0f0f0;
        }
        h1 {
          color: #333;
        }
      `}</style>
    </div>
  )
}