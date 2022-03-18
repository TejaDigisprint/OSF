/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {getCatalogRepository, getProducts} from '@oracle-cx-commerce/commerce-utils/selector';

/*
 * @deprecated
 */
export const getCatalogDataForCarousel = state => {
  const products = getProducts(state);
  const catalog = getCatalogRepository(state);

  return {
    products,
    catalog
  };
};
