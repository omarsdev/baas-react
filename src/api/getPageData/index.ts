import axios from 'axios'

import { useDomainStore } from '../../store/domain'

interface getPageDataPropsTypes {
  route: string
  pageNumber?: number
}

export const getPageData = async (props: getPageDataPropsTypes) => {
  const { route, pageNumber = 1 } = props

  const urlConnection = useDomainStore.getState().urlConnection
  const domain = useDomainStore.getState().domain
  const passAnalysis = useDomainStore.getState().passAnalysis
  const isSSR = useDomainStore.getState().isSSR

  if (!isSSR) {
    throw new Error(
      `Not Allow to use this function unless => isSSR: true, you can set it in initDomain({ ..., isSSR: true })`,
    )
  }

  const result = { data: null, error: null }

  if (!domain) {
    throw new Error(
      `Domain need to be set first, Please setup your domain first by using initDomain({ domain: 'orkabit.com' })`,
    )
  }

  await axios
    .get(`${urlConnection}/page?route=${route}&domain=${domain}&pass=${passAnalysis}&page=${pageNumber}`)
    .then((response) => {
      result.data = response.data
    })
    .catch((err) => {
      result.error = err.response.data
    })

  return result
}
