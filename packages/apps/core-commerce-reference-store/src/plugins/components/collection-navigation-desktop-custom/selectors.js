/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import {useContext} from 'react';
import {getGlobalContext, getCategory} from '@oracle-cx-commerce/commerce-utils/selector';

/**
 * Returns expanded list of root categories
 *
 * @return {Array} root categories
 */
export const useRootCategoriesData = () => {
  const store = useContext(StoreContext);
  const rootCategoryIds = getGlobalContext(store.getState()).categories || [];

  return rootCategoryIds.map(categoryId => getCategory(store.getState(), {categoryId}));
};

/**
 * Returns expanded list of categories
 *
 * @param  {Array} categories
 * @return {Array} categories
 */
export const useExpandedCategoriesData = (categories = []) => {
  const store = useContext(StoreContext);

  return categories.map(({id}) => getCategory(store.getState(), {categoryId: id}));
};
