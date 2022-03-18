/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import * as resourceBundle from '@oracle-cx-commerce/resources';

import {buildResources} from '@oracle-cx-commerce/resources/utils';
import config from '@oracle-cx-commerce/react-widgets/cart/cart-order-summary/config';
import {mergeDefaultConfig} from '@oracle-cx-commerce/react-widgets/config';

const widgetResourceKeys = [
  'headingOrderSummary',
  'textExcludingTax',
  'textFree',
  'textGiftCardBalance',
  'textIncludingTax',
  'textOrderDiscounts',
  'textShipping',
  'textShippingDiscount',
  'textShippingSurcharge',
  'textSubtotal',
  'textTax',
  'textTotal',
  'textRemainingTotal',
  'textGiftCard',
  'labelPayInStore',
  'labelInvoice',
  'textOrderSummaryGiftCard',
  'textPriceChangeMessage',
  'textConditionalTotal'
];

export const customReviewOrderSummary = {
  packageId: '@oracle-cx-commerce/react-widgets',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  config: mergeDefaultConfig(config),
  availableToAllPages: false,
  pageTypes: ['cart', 'checkout-shipping', 'checkout-payment', 'checkout-review-order']
};
