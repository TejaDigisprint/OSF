/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';
import defaultConfig from '@oracle-cx-commerce/react-widgets/config';

export const widgetResourceKeys = [
  'textPriceRange',
  'alertPriceUnavailable',
  'textSalePriceNow',
  'textSalePriceWas',
  'textQuantity',
  'textPrice',
  'textQuantityAndAbove'
];

export const CustomProductPrice = {
  packageId: '@oracle-cx-commerce/react-widgets',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  config: defaultConfig,
  requiresContext: ['product_context', 'container_context']
};
