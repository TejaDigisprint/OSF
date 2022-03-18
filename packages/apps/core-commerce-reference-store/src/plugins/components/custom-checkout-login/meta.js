/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import * as resourceBundle from '@oracle-cx-commerce/resources';

import {buildResources} from '@oracle-cx-commerce/resources/utils';
import defaultConfig from '@oracle-cx-commerce/react-widgets/config';

const widgetResourceKeys = [
  'actionCheckout',
  'actionCheckoutAsGuest',
  'alertLoginSuccessful',
  'alertLoginUnSuccessful',
  'headingReturningCustomer',
  'labelEmailAddress',
  'labelPassword',
  'textForgottenPassword'
];

export const CustomCheckoutLogin = {
  packageId: '@oracle-cx-commerce/react-widgets',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  availableToAllPages: false,
  pageTypes: ['checkout-login'],
  config: defaultConfig,
  actions: ['notify', 'login']
};
