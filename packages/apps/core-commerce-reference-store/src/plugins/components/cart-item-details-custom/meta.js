/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import * as resourceBundle from '@oracle-cx-commerce/resources';

import {widgetResourceKeys as addToPurchaseListResourceKeys} from '@oracle-cx-commerce/react-widgets/profile/add-to-purchase-list/meta';
import {buildResources} from '@oracle-cx-commerce/resources/utils';
import cartItemConfig from '@oracle-cx-commerce/react-widgets/cart/cart-item-details/config';
import {widgetResourceKeys as moveToWishListResourceKeys} from '@oracle-cx-commerce/react-widgets/product/product-add-to-wishlist/meta';

export const cartItemDetailsWidgetResourceKeys = [
  'actionMoveToWishList',
  'messageEmptyCart',
  'messagePartialBackOrder',
  'messageInsufficientStock',
  'messageInsufficientStockAtStore',
  'messageItemNoLongerAvailable',
  'messageQuantityManditory',
  'labelProductQuantity',
  'actionRemoveItem',
  'shippingSurchargeText',
  'actionContinueShopping',
  'textTotal',
  'textItemDetails',
  'textItemPrice',
  'textQuantity',
  'textGiftItem',
  'textSelectGiftMessage',
  'actionSelect',
  'actionCancel',
  'textFreeProduct',
  'textFreeGift',
  'textFree',
  'textChange',
  'textSelectGift',
  'alertAddToCartAdding',
  'textInStock',
  'textOutOfStock',
  'textPreOrderable',
  'textBackOrderable',
  'textSelectOptionOnline',
  'actionAddToCartPreOrder',
  'alertTotalItemQuantityExceeded',
  'textGWPInvalidation',
  'alertOutOfStock',
  'alertCartHeading',
  'alertNoLongerForSale',
  'messageAtTheRate',
  'messagePriceChange',
  'alertPriceIncreased',
  'alertPriceDecreased',
  'messagePartialPreOrder',
  'messageStatusPreOrder',
  'messageStatusBackOrder',
  'closeLinkAltText',
  'textSiteIcon',
  'alertNoLongerForSaleQuote',
  'alertOrderHeading',
  'alertOutOfStockQuote',
  ...addToPurchaseListResourceKeys,
  ...moveToWishListResourceKeys
];
export const CartItemDetails = {
  packageId: '@oracle-cx-commerce/react-widgets',
  resources: buildResources(resourceBundle, cartItemDetailsWidgetResourceKeys),
  config: cartItemConfig,
  availableToAllPages: false,
  pageTypes: ['cart'],
  requiresContext: ['cart_context']
};
