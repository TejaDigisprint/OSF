/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import config from '@oracle-cx-commerce/react-widgets/product-listing/dynamic-product-listing-container/config';

export const customDynamicProductListingContainer = {
  packageId: '@oracle-cx-commerce/react-widgets',
  type: 'container',
  config,
  fetchers: ['fetchSearchResults'],
  pageTypes: ['search', 'category'],
  providesContext: ['pagination_context']
};
