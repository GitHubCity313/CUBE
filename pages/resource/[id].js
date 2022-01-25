import Layout from "../../components/Layout/Layout";

export default function Resource({ resource }) {
    return (
        <Layout title={resource.name}>
            <p>{ resource._id }</p>
        </Layout>
    )
}

export async function getStaticProps({ params }) {
    // console.log(params);
    const resourceRequest = `http://localhost:3000/api/resources/${params.id}`;
    const fetchedResource = await fetch(resourceRequest);
    const JsonResource = await fetchedResource.json();
    //mongo me renvoie le json dans un tableau :|
    const resource = JsonResource.resource[0];

    return {
        props : {
            resource
        }
    }
}

export async function getStaticPaths() {
    const fetchedResources = await fetch("http://localhost:3000/api/resources/");
    const JsonResources = await fetchedResources.json();
    const resources = JsonResources.resources;

    return {
        paths: resources.map(resource => ({
            params: {id: resource._id.toString()}
        })),
        fallback: false,
    }
}
