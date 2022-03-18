/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';
import config from './config';

export const widgetResourceKeys = [
  'alertAccountCreated',
  'headingCreateAnAccount',
  'actionCreateAnAccount',
  'alertCreateProfileEmailSentSuccessful',
  'alertCreateProfileSuccessful',
  'labelEmailAddress',
  'labelEmailUpdates',
  'labelFirstName',
  'labelGdprConsentGranted',
  'labelLastName',
  'textLogIn',
  'labelNo',
  'labelPassword',
  'labelPasswordConfirm',
  'alertPasswordNotMatched',
  'labelYes'
];

export const CustomProfileRegistration = {
  packageId: '@oracle-cx-commerce/react-widgets',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  config
};
