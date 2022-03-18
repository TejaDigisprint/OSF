/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';
import config from '@oracle-cx-commerce/react-widgets/profile/payment-information/config';

const widgetResourceKeys = [
  'actionProceedToPayment',
  'headingPaymentMethod',
  'textGiftCard',
  'textBillingAddress',
  'labelEdit',
  'textAdditionalPaymentInformationNeeded',
  'textExpiryDate',
  'textOrderPendingPayment',
  'textPayInStore',
  'textInvoice',
  'textPONumber',
  'textPayAfterApproval',
  'textPayOnline'
];

export const PaymentInformationCustom = {
  packageId: '@oracle-cx-commerce/react-widgets',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  availableToAllPages: false,
  pageTypes: ['profile', 'checkout', 'checkout-review-order', 'checkout-payment'],
  config
};
