/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import * as resourceBundle from '@oracle-cx-commerce/resources';

import {buildResources} from '@oracle-cx-commerce/resources/utils';
import defaultConfig from '@oracle-cx-commerce/react-widgets/config';

const widgetResourceKeys = [
  'textBackOrderable',
  'textInStock',
  'textOutOfStock',
  'textPreOrderable',
  'textSelectOptionOnline',
  'textBackOrderableWithAvailabilityDate',
  'textPreOrderableWithAvailabilityDate',
  'actionCheckout',
  'actionContinueShopping',
  'actionViewCart',
  'closeLinkAltText',
  'alertAddedToCart',
  'actionAddToCart',
  'alertAddToCartAdded',
  'alertAddToCartAdding',
  'actionAddToCartPreOrder',
  'alertPriceUnavailable',
  'alertTotalItemQuantityExceeded',
  'textSuccessGiftMessage',
  'textFailureGiftMessage',
  'textPleaseSelect',
  'textPriceRange',
  'alertPriceUnavailable',
  'textSalePriceNow',
  'textSalePriceWas',
  'textQuickView'
];

export const customProductResultImageQuickView = {
  packageId: '@oracle-cx-commerce/react-widgets',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  config: defaultConfig
};
