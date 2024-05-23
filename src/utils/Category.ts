import { Category } from '../interfaces/Category';
import { isEmpty } from 'lodash';

export const getCategoryPathFromArray = (
  categories: Category[],
  categoryID: number,
): Category | null => {
  for (let i = 0; i < categories.length; i += 1) {
    const foundPath = getCategoryPath(categories[i], categoryID);
    if (foundPath) {
      return foundPath;
    }
  }

  return null;
};

export const getCategoryPath = (
  rootCategory: Category,
  categoryID: number,
): Category | null => {
  if (rootCategory.id === categoryID) {
    return rootCategory;
  }

  for (let i = 0; i < rootCategory.subcategories.length; i += 1) {
    const foundCategory = getCategoryPath(
      rootCategory.subcategories[i],
      categoryID,
    );
    if (foundCategory) {
      return {
        ...rootCategory,
        subcategories: [foundCategory],
      };
    }
  }

  return null;
};

export const findCategoryInPath = (
  rootCategory: Category,
  categoryID: number,
): Category | null => {
  if (rootCategory.id === categoryID) {
    return rootCategory;
  }

  if (isEmpty(rootCategory.subcategories)) {
    return null;
  }

  return findCategoryInPath(rootCategory.subcategories[0], categoryID);
};

export const flattenCategoryPath = (
  rootCategory: Category,
  targetCategoryID: number,
): Category[] => {
  const categories: Category[] = [rootCategory];

  let category = rootCategory;
  while (!isEmpty(category.subcategories) && category.id !== targetCategoryID) {
    category = category.subcategories[0];
    categories.push(category);
  }

  return categories;
};
