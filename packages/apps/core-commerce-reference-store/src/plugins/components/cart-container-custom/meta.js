/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import * as resourceBundle from '@oracle-cx-commerce/resources';

import {buildResources} from '@oracle-cx-commerce/resources/utils';
import defaultConfig from '@oracle-cx-commerce/react-widgets/config';

export const widgetResourceKeys = [
  'headingYourCart',
  'alertNoLongerForSale',
  'alertOutOfStock',
  'alertPriceIncreased',
  'messagePriceChange',
  'alertPriceDecreased',
  'alertCartHeading',
  'alertNoLongerForSaleQuote',
  'alertOrderHeading',
  'alertOutOfStockQuote'
];
export const CartContainerCustom = {
  packageId: '@oracle-cx-commerce/react-widgets',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  type: 'container',
  config: defaultConfig,
  availableToAllPages: false,
  pageTypes: ['cart'],
  providesContext: ['cart_context']
};
