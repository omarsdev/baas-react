/* eslint-disable */

import React from 'react'
import { initDomain, usePageData, sendForm } from 'react-baas'

initDomain({
  domain: 'omars.dev',
})

function App() {
  const { loading, data, error } = usePageData({
    route: '/',
  })

  const clickMeHandler = async () => {
    const { data, error } = await sendForm({
      email: 'me@omars.dev',
      phoneNumber: '+962 797 261 632',
      message: 'Hello World!',
    })
  }

  return loading ? (
    <div>
      <button onClick={clickMeHandler}>Click me to submit you message</button>
    </div>
  ) : (
    <h1>Spinner</h1>
  )
}

export default App
