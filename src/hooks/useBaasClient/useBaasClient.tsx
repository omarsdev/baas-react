import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

import { URL_PROD, URL_QA } from "../../config";

import { useBaasClientPropTypes } from "./useBaasClientPropTypes"

const useBaasClient = (props: useBaasClientPropTypes) => {
  const {
    route,
    domain,
    passAnalysis = false,
    pageNumber = 1,
    connectToProd = true,
  } = props
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlConnection = useMemo(
    () => (connectToProd ? URL_PROD : URL_QA),
    [connectToProd]
  );

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          `${urlConnection}/page?route=${route}&domain=${domain}&pass${passAnalysis}&page=${pageNumber}&referrer=${document.referrer}`
        )
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          setError(err.response.data);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchData();
  }, [urlConnection, route, domain, passAnalysis, pageNumber]);

  return { data, loading, error };
};  

export default useBaasClient