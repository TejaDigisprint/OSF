/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import * as resourceBundle from '@oracle-cx-commerce/resources';

import {buildResources} from '@oracle-cx-commerce/resources/utils';
import config from './config';

const widgetResourceKeys = [
  'headingReturningCustomer',
  'textCreateAnAccount',
  'labelEmail',
  'textForgottenPassword',
  'actionLogin',
  'alertLoginSuccessful',
  'alertLoginUnSuccessful',
  'labelPassword',
  'headingEmailMarketingPreferences',
  'textConfirmEmailAndMarkatingPreference',
  'labelShowPersonalizationConsent',
  'labelGetMarketingMails',
  'buttonContinue',
  'textAccountWithNoContractError'
];

export const CustomLogin = {
  packageId: '@oracle-cx-commerce/react-widgets',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  config
};
