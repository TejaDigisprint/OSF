/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import * as resourceBundle from '@oracle-cx-commerce/resources';

import {buildResources} from '@oracle-cx-commerce/resources/utils';
import config from './config';

const widgetResourceKeys = ['collectionCarouselLabel'];

export const CustomCategoryListingCarouselTwo = {
  packageId: '@oracle-cx-commerce/react-widgets',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  config,
  actions: ['listProducts', 'getProductsPrices']
};
