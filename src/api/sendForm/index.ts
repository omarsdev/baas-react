import axios from 'axios'

import { useDomainStore } from '../../store/domain'

export const sendForm = async (body: object) => {
  const urlConnection = useDomainStore.getState().urlConnection
  const domain = useDomainStore.getState().domain

  const result = { data: null, error: null }

  if (!domain) {
    throw new Error(`Domain need to be set first, Please setup your domain first by using initDomain()`)
  }

  await axios
    .post(`${urlConnection}/contact-us?domainName=${domain}`, body)
    .then((response) => {
      result.data = response.data.contactMessage
    })
    .catch((err) => {
      result.error = err.response.data
    })

  return result
}
