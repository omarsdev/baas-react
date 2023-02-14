import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

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
    console.log("Works");
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${urlConnection}/page?route=${route}&domain=${domain}&pass${passAnalysis}&page=${pageNumber}`
        );
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
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
