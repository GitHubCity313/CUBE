// Route pour la manipulation des ressources
export default function ressources(req, res) {
  const getRessources = (res) => {
    return res.status(200).json({
      ressources: [
        {
          id: "1",
          resourceType: "1",
          categories: ["3", "7"],
          author: "10",
          hasParticipants: ["1", "6", "13", "10"],
          moderationValidation: true,
          publicationStatus: "public",
          name: "Distribution de fournitures scolaires pour la rentrée",
          contentId: "1",
          externalLinks: [
            {
              active: false,
              type: "twitter",
              link: "https://twitter.com/lillefrance/status/1409978077015388168?s=20",
            },
          ],
          createdAt: 1630792800,
          updatedAt: 1630855803,
          startDate: 1630913403,
          endDate: 1631291400,
          place: {
            city: "Lille",
            zipCode: "59000",
            region: "Hauts-de-France",
          },
          media: [
            {
              id: "1",
              url: "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5f27ddc8-6449-4017-abc3-8c8d9c5d5726/fournitures_sco_01.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220113T090856Z&X-Amz-Expires=86400&X-Amz-Signature=d9255c6e91dd297e7e3999141bcda55c77913ea1317d45413d309842de4c0397&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22fournitures_sco_01.webp%22&x-id=GetObject",
            },
            {
              id: "2",
              url: "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c5365e22-bb00-46c3-8497-239b11696e13/fournitures_sco_02.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220113T091449Z&X-Amz-Expires=86400&X-Amz-Signature=3066d221aa831a959ddd89ca9f84c01c11e79a5ba3e92f586d338b218fcd643c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22fournitures_sco_02.png%22&x-id=GetObject",
            },
          ],
          likes: 14,
        },
        {
          id: "2",
          moderationValidation: true,
          publicationStatus: "public",
          resourceType: "2",
          categories: ["2"],
          name: "Secours populaire",
          creator: "9",
          members: ["9", "2", "11"],
          contentId: "2",
          createdAt: 1617268271,
          updatedAt: 1641636671,
          place: {
            country: "France",
          },
          likes: 10,
          media: {
            logo: "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/445d771d-f78b-4e20-a2f4-e07824a05010/logoSecoursPopulaire.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220113T164246Z&X-Amz-Expires=86400&X-Amz-Signature=96db2e4694a0d67c1a5bf1755429d2335cfd4afb30bb862a22fecac19c5cd43b&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22logoSecoursPopulaire.png%22&x-id=GetObject",
            gallery: [
              {
                id: "1",
                alt: "Deux membres de l'association avec un chapeau de Noël tiennent un cadeau",
                url: "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c4df9b63-a06b-4b47-a671-c06559571612/secoursPop_ajacio.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220113T165050Z&X-Amz-Expires=86400&X-Amz-Signature=13a0853fb96471808ae90f5a0063b875a157170fd05f31433cfc143a8ea16c72&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22secoursPop_ajacio.jpeg%22&x-id=GetObject",
              },
              {
                id: "2",
                alt: "Quatres membres de l'association autour d'un sans-abri à Nice",
                url: "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/55177804-4c36-4c37-bedc-f17cd8b76cda/secoursPop_Nice.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220113T165609Z&X-Amz-Expires=86400&X-Amz-Signature=39b5d6f389c2f49bbeb228e7f3b8d639b98a503de378a9b9878ed74178cb3f7a&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22secoursPop_Nice.jpeg%22&x-id=GetObject",
              },
              {
                id: "3",
                alt: "Une éleveuse auprès de son troupeau de chèvres à Dagaba au Niger",
                url: "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/327c6f12-ecb5-4fa9-ba4b-f4ee61b88098/secoursPop_Niger.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220113T165818Z&X-Amz-Expires=86400&X-Amz-Signature=6c81bd9af02e413bb3d4f03df58bbfed0a15d81312b58eb7a338fa997d05b523&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22secoursPop_Niger.jpeg%22&x-id=GetObject",
              },
            ],
          },
          externalLinks: [
            {
              active: true,
              type: "website",
              value: "https://www.secourspopulaire.fr",
            },
            {
              active: true,
              type: "facebook",
              value: "https://www.facebook.com/secourspopulaire",
            },
            {
              active: true,
              type: "twitter",
              value: "https://twitter.com/secourspop",
            },
            {
              active: true,
              type: "youtube",
              value: "https://www.youtube.com/user/secourspopulaire",
            },
            {
              active: true,
              type: "instagram",
              value: "https://www.instagram.com/secourspop",
            },
          ],
        },
        {
          id: "3",
          resourceType: "1",
          categories: ["8"],
          author: "11",
          hasParticipants: ["11", "9"],
          association: "1",
          moderationValidation: false,
          publicationStatus: "public",
          name: "Le Secours Populaire lance des bus solidaires pour réduire la fracture numérique",
          contentId: "3",
          externalLinks: [],
          createdAt: 1634716800,
          updatedAt: 1634717160,
          startDate: 1640595600,
          place: {
            county: "Meurthe-et-Moselle",
          },
          media: [
            {
              id: "1",
              url: "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/1dc081e2-2d8f-408f-8882-bfe47f56b656/Screenshot_2022-01-13_at_18.46.02.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220113T181212Z&X-Amz-Expires=86400&X-Amz-Signature=2893c1c641cd30dab8559f1dde05d620ae19082b63fab753631560b50d3120cb&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Screenshot%25202022-01-13%2520at%252018.46.02.png%22&x-id=GetObject",
            },
            {
              id: "2",
              url: "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/786afed7-e9ad-4a5e-b8eb-b9e23daa03b0/secoursPop_solidaribus_inauguration_01.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220113T181340Z&X-Amz-Expires=86400&X-Amz-Signature=c2ea4d9ad15462aff3d9ec20e2421c1ea2310bcfab85568679c04601c6272c0d&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22secoursPop_solidaribus_inauguration_01.jpeg%22&x-id=GetObject",
            },
          ],
          likes: 6,
        },
      ],
    });
  };
  const getRoute = (method, res) => {
    switch (method) {
      case "GET": {
        return getRessources(res);
      }
      default:
        return res.status(404).json("Le service demandé n'est pas disponible");
    }
  };

  return getRoute(req.method, res);
}
