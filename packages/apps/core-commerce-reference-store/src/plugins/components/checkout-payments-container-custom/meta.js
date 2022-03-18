/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';

import defaultConfig from '@oracle-cx-commerce/react-widgets/config';

const widgetResourceKeys = ['headingPayment', 'textRetrievingPaymentDetails'];

export const CheckoutPaymentsContainerCustom = {
  packageId: '@oracle-cx-commerce/react-widgets',
  type: 'container',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  availableToAllPages: false,
  pageTypes: ['checkout-payment', 'pending-payment', 'checkout-quote-payment-and-review'],
  config: defaultConfig,
  providesContext: ['payment_context'],
  actions: ['checkOrderRequiresApproval', 'getOrder', 'notify']
};
