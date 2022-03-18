/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';

const widgetResourceKeys = ['headingReviewOrder'];

export const CheckoutReviewOrderContainerCustom = {
  packageId: '@oracle-cx-commerce/react-widgets',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  type: 'container',
  availableToAllPages: false,
  pageTypes: ['checkout', 'checkout-review-order', 'checkout-payment', 'checkout-quote-payment-and-review']
};
