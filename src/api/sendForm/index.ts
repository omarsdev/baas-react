import axios from 'axios'

import { useDomainStore } from '../../store/domain'

export const sendForm = async (body: object) => {
  const urlConnection = useDomainStore.getState().urlConnection
  const domain = useDomainStore.getState().domain

  const result = { data: null, error: null }

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
