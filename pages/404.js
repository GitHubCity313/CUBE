import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout/Layout";

export default function Custom404() {
  const router = useRouter();

  useEffect(() => router.push("/home"));

  return <Layout title="Cube | 404" withSidebar={false} withFooter={true} />;
}
