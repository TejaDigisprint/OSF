/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {getCatalogRepository} from '@oracle-cx-commerce/commerce-utils/selector';

export const getPageData = state => {
  const {categories} = getCatalogRepository(state);

  return {
    categories
  };
};
