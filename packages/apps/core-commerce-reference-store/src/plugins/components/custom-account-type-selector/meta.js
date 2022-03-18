/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';
import {widgetResourceKeys as accountRegistrationKeys} from '@oracle-cx-commerce/react-widgets/profile/accounts-contacts-registration/meta';
import {widgetResourceKeys as profileRegistrationKeys} from '@oracle-cx-commerce/react-widgets/profile/profile-registration/meta';
import defaultConfig from '@oracle-cx-commerce/react-widgets/config';

const widgetResourceKeys = [
  'personalAccountText',
  'selectAccountTypeTextSummary',
  'businessAccountText',
  'selectAccountTypeText',
  'siteTypeHelpText',
  ...accountRegistrationKeys,
  ...profileRegistrationKeys
];

export const CustomAccountTypeSelector = {
  packageId: '@oracle-cx-commerce/react-widgets-unreleased',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  availableToAllPages: false,
  pageTypes: ['Registration'],
  config: defaultConfig
};
