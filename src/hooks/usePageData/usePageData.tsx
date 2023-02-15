import { useState, useEffect } from 'react'
import axios from 'axios'

import { useDomainStore } from '../../store/domain'

import { usePageDataPropTypes } from './usePageDataPropTypes'

const usePageData = (props: usePageDataPropTypes) => {
  const { route, pageNumber = 1 } = props
  const { domain, passAnalysis, urlConnection, isSSR } = useDomainStore()

  if (!domain) throw new Error(`Domain need to be set first, Please setup your domain first by using initDomain()`)

  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getPageWithSetAnalysis = async () => {
      await axios
        .get(
          `${urlConnection}/page?route=${route}&domain=${domain}&pass=${passAnalysis}&page=${pageNumber}&referrer=${document.referrer}`,
        )
        .then((response) => {
          setData(response.data)
        })
        .catch((err) => {
          setError(err.response.data)
        })
        .finally(() => {
          setLoading(false)
        })
    }

    const setPageAnalysis = async () => {
      await axios
        .get(`${urlConnection}/page/analysis?route=${route}&domain=${domain}&referrer=${document.referrer}`)
        .then(() => {
          setData(true)
        })
        .catch((err) => {
          setError(err.response.data)
        })
        .finally(() => {
          setLoading(false)
        })
    }

    if (isSSR) {
      setPageAnalysis()
    } else {
      getPageWithSetAnalysis()
    }
  }, [route, pageNumber, urlConnection, passAnalysis, domain, isSSR])

  return { data, loading, error }
}

export default usePageData
