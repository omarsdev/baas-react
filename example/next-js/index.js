/* eslint-disable */

import Head from 'next/head'
import { initDomain, usePageData, getPageData, sendForm } from 'react-baas'

initDomain({
  domain: 'omars.dev',
  isSSR: true,
})

export default function Home({ data, error }) {
  // this for set analysis about how many visitors you got and so on
  usePageData({
    route: '/',
  })

  const clickMeHandler = async () => {
    const { data, error } = await sendForm({
      email: 'me@omars.dev',
      phoneNumber: '+962 797 261 632',
      message: 'Hello World!',
    })
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>Works</h1>
      <button onClick={clickMeHandler}>Click me to submit you message</button>
    </>
  )
}

export async function getStaticProps() {
  // this for get you page information
  const { data, error } = await getPageData({
    route: '/',
  })

  return {
    props: {
      data,
      error,
    },
    revalidate: 60,
  }
}