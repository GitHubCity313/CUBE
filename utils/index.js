export function getMatchingCategories(resourceCategory, categories) {
  return categories.map((category) => {
    if (category._id === resourceCategory) {
      // console.log("if test .map in .map");
      // console.log(`category : ${category._id}`);
      // console.log(`resourceCategory : ${resourceCategory}`);
      // console.log(`MATCHING Category : ${category.name}`);
      return `${category.name} `;
    }
  });
}

export function indexResourceTypes(resources) {
  const types = [];
  resources.map((resource) => {
    if (!types.find((element) => element === resource.resourceType)) {
      types.push(resource.resourceType);
    }
  });
  return types;
}
