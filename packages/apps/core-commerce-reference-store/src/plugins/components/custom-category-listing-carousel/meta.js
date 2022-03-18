/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import * as resourceBundle from '@oracle-cx-commerce/resources';

import {buildResources} from '@oracle-cx-commerce/resources/utils';
import config from '@oracle-cx-commerce/react-widgets/product-listing/category-listing-carousel/config';

const widgetResourceKeys = ['collectionCarouselLabel'];

export const CustomCategoryListingCarousel = {
  packageId: '@oracle-cx-commerce/react-widgets',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  config,
  actions: ['listProducts', 'getProductsPrices']
};
