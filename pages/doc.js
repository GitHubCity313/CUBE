import { createSwaggerSpec } from "next-swagger-doc";
import config from "../swagger";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const ApiDoc = ({ spec }) => {
  return <SwaggerUI spec={spec} filter={true} />;
};

export const getStaticProps = () => {
  const APIPaths = createSwaggerSpec(config);
  const { paths, components } = APIPaths;
  const spec = {...config, paths, components}
  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;
