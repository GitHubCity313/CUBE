import { createSwaggerSpec } from "next-swagger-doc";
import config from "../swagger";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import Layout from "../components/Layout/Layout";
import { Box } from "@mui/material";

const ApiDoc = ({ spec }) => {
  return (
    <Layout title="Cube | API">
      <Box sx={{ mt: 20}}>
        <SwaggerUI spec={spec} filter={true} />
      </Box>
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

export default ApiDoc;
