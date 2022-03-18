/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {mobileConfig, desktopConfig} from '@oracle-cx-commerce/react-widgets/cart/mini-cart/config';

import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';

const widgetResourceKeys = [
  'headingMiniShoppingCart',
  'actionCheckout',
  'actionContinueShopping',
  'actionViewCart',
  'closeLinkAltText',
  'alertAddedToCart',
  'alertPriceUnavailable',
  'headingYourCart',
  'textQuantity',
  'textFreeGift',
  'textFree',
  'textSubtotal',
  'textPreOrderable',
  'textBackOrderable',
  'messageStatusPreOrder',
  'messageStatusBackOrder',
  'messageAtTheRate'
];

export const customMiniCartDesktop = {
  packageId: '@oracle-cx-commerce/react-widgets',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  config: desktopConfig
};

// export const MiniCartMobile = {
//   packageId: '@oracle-cx-commerce/react-widgets',
//   resources: buildResources(resourceBundle, widgetResourceKeys),
//   config: mobileConfig
// };
