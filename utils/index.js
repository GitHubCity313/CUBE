import {capitalize} from "@mui/material";

export function getMatchingCategories(resourceCategory, categories) {
  return categories.map((category) => {
    if (category._id === resourceCategory) {
      return `${capitalize(category.name)} `;
    }
  });
}

export const getCategoryByName = (name, categories) =>
  categories.filter((cat) => name === cat.name);

export function indexResourceTypes(resources) {
  const types = [];
  resources.map((resource) => {
    if (!types.find((element) => element === resource.resourceType)) {
      types.push(resource.resourceType);
    }
  });
  return types;
}
