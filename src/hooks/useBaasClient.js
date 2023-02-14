import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { URL_PROD, URL_QA } from "../config";

const useBaasClient = ({
  route,
  domain,
  passAnalysis,
  pageNumber,
  connectToProd,
}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlConnection = useMemo(
    () => (connectToProd ? URL_PROD : URL_QA),
    [connectToProd]
  );

  useEffect(() => {
    console.log({ referrer: document.referrer });
    const fetchData = async () => {
      await axios
        .get(
          `${urlConnection}/page?route=${route}&domain=${domain}&pass${passAnalysis}&page=${pageNumber}`
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

useBaasClient.propTypes = {
  route: PropTypes.string.isRequired,
  domain: PropTypes.number.isRequired,
  passAnalysis: PropTypes.bool,
  pageNumber: PropTypes.number,
  connectToProd: PropTypes.bool,
};

useBaasClient.defaultProps = {
  passAnalysis: false,
  pageNumber: 1,
  connectToProd: true,
};

export default useBaasClient;
