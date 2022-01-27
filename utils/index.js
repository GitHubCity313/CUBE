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
