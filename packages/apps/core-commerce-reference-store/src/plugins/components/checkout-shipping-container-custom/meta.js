/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';
import defaultConfig from '@oracle-cx-commerce/react-widgets/config';
import {widgetResourceKeys as cartValidationMessages} from '@oracle-cx-commerce/react-widgets/cart/cart-container/meta';

const widgetResourceKeys = ['headingShipping', ...cartValidationMessages];

export const CheckoutShippingContainerCustom = {
  packageId: '@oracle-cx-commerce/react-widgets',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  config: defaultConfig,
  type: 'container',
  availableToAllPages: false,
  pageTypes: ['checkout-shipping'],
  providesContext: ['checkout_shipping_context', 'scheduled_order_context', 'cart_context']
};
