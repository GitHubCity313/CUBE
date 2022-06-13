
import React from "react";
import PropTypes from "prop-types";
import { createSwaggerSpec } from "next-swagger-doc";"/"
import config from "../swagger";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import Layout from "../components/Layout/Layout";

const ApiDoc = ({ spec }) => {
  return (
    <Layout title="Cube | API">
      <SwaggerUI spec={spec} filter={true} />
    </Layout>
  );
};

export const getStaticProps = () => {
  const APIPaths = createSwaggerSpec(config);
  const { paths, components } = APIPaths;
  const spec = { ...config, paths, components };
  return {
    props: {
      spec,
    },
  };
};

ApiDoc.propTypes = {
  spec : PropTypes.any
}

export default ApiDoc;
