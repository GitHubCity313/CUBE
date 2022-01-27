export function getMatchingCategories(resourceCategory, categories) {
    return categories.map(category => {
        if (category._id === resourceCategory) {
            // console.log("if test .map in .map");
            // console.log(`category : ${category._id}`);
            // console.log(`resourceCategory : ${resourceCategory}`);
            // console.log(`MATCHING Category : ${category.name}`);
            return `${category.name} `;
        }
    })
}
export function isCategoryChecked(category, checkedCategories) {
    console.log("isCategoryChecked checkedCategories");
    console.log(typeof checkedCategories)
    console.log(checkedCategories);
    console.log("isCategoryChecked category");
    console.log(category);
    return checkedCategories.find(categoryId => categoryId === category._id) !== undefined;
}
