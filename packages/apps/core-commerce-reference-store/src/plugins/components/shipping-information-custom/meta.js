/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';

import config from '@oracle-cx-commerce/react-widgets/profile/shipping-information/config';

const widgetResourceKeys = [
  'labelEdit',
  'messageEmptyCart',
  'headingHomeDelivery',
  'headingInStorePickUp',
  'headingShippingMethod',
  'textShippingOption',
  'headingShippingTo',
  'headingStorePickUpAt',
  'textItemDetails',
  'textItemPrice',
  'textQuantity',
  'textTotal',
  'shippingSurchargeText',
  'textFreeGift',
  'textFree',
  'messageAtTheRate',
  'messageAvailableDate',
  'actionSelectItem',
  'actionSelectAll',
  'actionDeselectAll',
  'textPrice',
  'actionShowDetails',
  'actionHideDetails',
  'textSiteIcon'
];

export const ShippingInformationCustom = {
  packageId: '@oracle-cx-commerce/react-widgets',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  availableToAllPages: false,
  pageTypes: ['profile', 'checkout', 'checkout-review-order', 'checkout-payment'],
  config
};
